"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import type { User, ServiceCategory, Notification } from "@/lib/types"

// Hook for service categories
export function useServiceCategories() {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from("service_categories")
          .select("*")
          .eq("is_active", true)
          .order("sort_order")

        if (error) throw error
        setCategories(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading categories")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

// Hook for system statistics
export function useSystemStats() {
  const [stats, setStats] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data, error } = await supabase.from("system_stats").select("stat_key, stat_value")

        if (error) throw error

        const statsObject =
          data?.reduce(
            (acc, stat) => {
              acc[stat.stat_key] = stat.stat_value
              return acc
            },
            {} as Record<string, number>,
          ) || {}

        setStats(statsObject)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}

// Hook for providers by location
export function useProviders(filters?: { state?: string; category?: string }) {
  const [providers, setProviders] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProviders() {
      try {
        let query = supabase
          .from("users")
          .select(`
            *,
            reviews:reviews!provider_id(rating, comment, created_at)
          `)
          .eq("user_type", "prestador")
          .eq("is_active", true)

        if (filters?.state) {
          query = query.ilike("location", `%${filters.state}%`)
        }

        const { data, error } = await query.order("average_rating", { ascending: false }).limit(20)

        if (error) throw error
        setProviders(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading providers")
      } finally {
        setLoading(false)
      }
    }

    fetchProviders()
  }, [filters?.state, filters?.category])

  return { providers, loading, error }
}

// Hook for Brazilian locations
export function useBrazilianLocations() {
  const [locations, setLocations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLocations() {
      try {
        const { data, error } = await supabase.from("brazilian_locations").select("*").order("state")

        if (error) throw error
        setLocations(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading locations")
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

  return { locations, loading, error }
}

// Hook for notifications
export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    async function fetchNotifications() {
      try {
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(50)

        if (error) throw error

        const notificationData = data || []
        setNotifications(notificationData)
        setUnreadCount(notificationData.filter((n) => !n.is_read).length)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading notifications")
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchNotifications()
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [userId])

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", notificationId)

      if (error) throw error

      setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n)))
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (err) {
      console.error("Error marking notification as read:", err)
    }
  }

  const markAllAsRead = async () => {
    if (!userId) return

    try {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", userId)
        .eq("is_read", false)

      if (error) throw error

      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error("Error marking all notifications as read:", err)
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
  }
}

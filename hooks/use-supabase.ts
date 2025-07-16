"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"
import { useAuth } from "@/contexts/auth-context"
import type { Service, Notification, Proposal } from "@/lib/types"

// Hook para gerenciar serviços
export function useServices() {
  const { user, profile } = useAuth()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !profile) return

    const fetchServices = async () => {
      try {
        setLoading(true)
        const column = profile.user_type === "cliente" ? "client_id" : "provider_id"
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq(column, user.id)
          .order("created_at", { ascending: false })

        if (error) throw error
        setServices(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar serviços")
      } finally {
        setLoading(false)
      }
    }

    fetchServices()

    // Subscription para mudanças em tempo real
    const subscription = supabase
      .channel("services")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "services",
          filter: profile.user_type === "cliente" ? `client_id=eq.${user.id}` : `provider_id=eq.${user.id}`,
        },
        () => {
          fetchServices()
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user, profile])

  return { services, loading, error, refetch: () => window.location.reload() }
}

// Hook para gerenciar notificações
export function useNotifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchNotifications = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error
        setNotifications(data || [])
        setUnreadCount(data?.filter((n) => !n.read).length || 0)
      } catch (err) {
        console.error("Erro ao carregar notificações:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()

    // Subscription para notificações em tempo real
    const subscription = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchNotifications()
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase.from("notifications").update({ read: true }).eq("id", notificationId)

      if (error) throw error

      setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (err) {
      console.error("Erro ao marcar notificação como lida:", err)
    }
  }

  const markAllAsRead = async () => {
    if (!user) return

    try {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("user_id", user.id)
        .eq("read", false)

      if (error) throw error

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error("Erro ao marcar todas as notificações como lidas:", err)
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
  }
}

// Hook para gerenciar propostas
export function useProposals(serviceId?: string) {
  const { user, profile } = useAuth()
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !profile) return

    const fetchProposals = async () => {
      try {
        setLoading(true)
        let query = supabase.from("proposals").select("*")

        if (serviceId) {
          query = query.eq("service_id", serviceId)
        } else if (profile.user_type === "prestador") {
          query = query.eq("provider_id", user.id)
        }

        const { data, error } = await query.order("created_at", { ascending: false })

        if (error) throw error
        setProposals(data || [])
      } catch (err) {
        console.error("Erro ao carregar propostas:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()

    // Subscription para propostas em tempo real
    const subscription = supabase
      .channel("proposals")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "proposals",
        },
        () => {
          fetchProposals()
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user, profile, serviceId])

  return { proposals, loading }
}

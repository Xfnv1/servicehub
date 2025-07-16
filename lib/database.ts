import { supabase } from "./supabase-client"
import type { User, Service, Notification, Proposal, Review, Message } from "./types"

// User operations
export const userOperations = {
  async create(userData: Partial<User>) {
    const { data, error } = await supabase.from("users").insert([userData]).select().single()
    return { data, error }
  },

  async getById(id: string) {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single()
    return { data, error }
  },

  async update(id: string, updates: Partial<User>) {
    const { data, error } = await supabase.from("users").update(updates).eq("id", id).select().single()
    return { data, error }
  },

  async getProviders(filters?: { category?: string; location?: string }) {
    let query = supabase.from("users").select("*").eq("user_type", "prestador")

    if (filters?.location) {
      query = query.ilike("location", `%${filters.location}%`)
    }

    const { data, error } = await query.order("average_rating", { ascending: false })
    return { data, error }
  },
}

// Service operations
export const serviceOperations = {
  async create(serviceData: Partial<Service>) {
    const { data, error } = await supabase.from("services").insert([serviceData]).select().single()
    return { data, error }
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("services")
      .select(
        `
        *,
        client:users!client_id(*),
        provider:users!provider_id(*)
      `,
      )
      .eq("id", id)
      .single()
    return { data, error }
  },

  async getByUserId(userId: string, userType: "cliente" | "prestador") {
    const column = userType === "cliente" ? "client_id" : "provider_id"
    const { data, error } = await supabase
      .from("services")
      .select(
        `
        *,
        client:users!client_id(*),
        provider:users!provider_id(*)
      `,
      )
      .eq(column, userId)
      .order("created_at", { ascending: false })
    return { data, error }
  },

  async getAvailable(filters?: { category?: string; location?: string }) {
    let query = supabase
      .from("services")
      .select(
        `
        *,
        client:users!client_id(*)
      `,
      )
      .eq("status", "novo")

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }

    if (filters?.location) {
      query = query.ilike("location", `%${filters.location}%`)
    }

    const { data, error } = await query.order("created_at", { ascending: false })
    return { data, error }
  },

  async update(id: string, updates: Partial<Service>) {
    const { data, error } = await supabase.from("services").update(updates).eq("id", id).select().single()
    return { data, error }
  },
}

// Notification operations
export const notificationOperations = {
  async create(notificationData: Partial<Notification>) {
    const { data, error } = await supabase.from("notifications").insert([notificationData]).select().single()
    return { data, error }
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
    return { data, error }
  },

  async markAsRead(id: string) {
    const { data, error } = await supabase.from("notifications").update({ read: true }).eq("id", id).select().single()
    return { data, error }
  },

  async markAllAsRead(userId: string) {
    const { data, error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", userId)
      .eq("read", false)
      .select()
    return { data, error }
  },

  async getUnreadCount(userId: string) {
    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("read", false)
    return { count, error }
  },
}

// Proposal operations
export const proposalOperations = {
  async create(proposalData: Partial<Proposal>) {
    const { data, error } = await supabase.from("proposals").insert([proposalData]).select().single()
    return { data, error }
  },

  async getByServiceId(serviceId: string) {
    const { data, error } = await supabase
      .from("proposals")
      .select(
        `
        *,
        provider:users!provider_id(*),
        service:services(*)
      `,
      )
      .eq("service_id", serviceId)
      .order("created_at", { ascending: false })
    return { data, error }
  },

  async getByProviderId(providerId: string) {
    const { data, error } = await supabase
      .from("proposals")
      .select(
        `
        *,
        service:services(*),
        client:users!services(client_id)
      `,
      )
      .eq("provider_id", providerId)
      .order("created_at", { ascending: false })
    return { data, error }
  },

  async update(id: string, updates: Partial<Proposal>) {
    const { data, error } = await supabase.from("proposals").update(updates).eq("id", id).select().single()
    return { data, error }
  },
}

// Review operations
export const reviewOperations = {
  async create(reviewData: Partial<Review>) {
    const { data, error } = await supabase.from("reviews").insert([reviewData]).select().single()
    return { data, error }
  },

  async getByProviderId(providerId: string) {
    const { data, error } = await supabase
      .from("reviews")
      .select(
        `
        *,
        client:users!client_id(*),
        service:services(*)
      `,
      )
      .eq("provider_id", providerId)
      .order("created_at", { ascending: false })
    return { data, error }
  },

  async getByServiceId(serviceId: string) {
    const { data, error } = await supabase
      .from("reviews")
      .select(
        `
        *,
        client:users!client_id(*),
        provider:users!provider_id(*)
      `,
      )
      .eq("service_id", serviceId)
      .single()
    return { data, error }
  },
}

// Message operations
export const messageOperations = {
  async create(messageData: Partial<Message>) {
    const { data, error } = await supabase.from("messages").insert([messageData]).select().single()
    return { data, error }
  },

  async getConversation(userId1: string, userId2: string, serviceId?: string) {
    let query = supabase
      .from("messages")
      .select(
        `
        *,
        sender:users!sender_id(*),
        receiver:users!receiver_id(*)
      `,
      )
      .or(`sender_id.eq.${userId1},sender_id.eq.${userId2}`)
      .or(`receiver_id.eq.${userId1},receiver_id.eq.${userId2}`)

    if (serviceId) {
      query = query.eq("service_id", serviceId)
    }

    const { data, error } = await query.order("created_at", { ascending: true })
    return { data, error }
  },

  async markAsRead(messageIds: string[]) {
    const { data, error } = await supabase.from("messages").update({ read: true }).in("id", messageIds).select()
    return { data, error }
  },
}

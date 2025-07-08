import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  return { user, error }
}

// Database helpers
export const createUserProfile = async (userId: string, profileData: any) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ id: userId, ...profileData }])
    .select()
  return { data, error }
}

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()
  return { data, error }
}

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select()
  return { data, error }
}

// Services
export const createService = async (serviceData: any) => {
  const { data, error } = await supabase.from("services").insert([serviceData]).select()
  return { data, error }
}

export const getServices = async (filters?: any) => {
  let query = supabase.from("services").select("*")

  if (filters?.client_id) {
    query = query.eq("client_id", filters.client_id)
  }

  if (filters?.provider_id) {
    query = query.eq("provider_id", filters.provider_id)
  }

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }

  const { data, error } = await query.order("created_at", { ascending: false })
  return { data, error }
}

export const updateService = async (serviceId: string, updates: any) => {
  const { data, error } = await supabase.from("services").update(updates).eq("id", serviceId).select()
  return { data, error }
}

// Notifications
export const createNotification = async (notificationData: any) => {
  const { data, error } = await supabase.from("notifications").insert([notificationData]).select()
  return { data, error }
}

export const getNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
  return { data, error }
}

export const markNotificationAsRead = async (notificationId: string) => {
  const { data, error } = await supabase.from("notifications").update({ read: true }).eq("id", notificationId).select()
  return { data, error }
}

export const markAllNotificationsAsRead = async (userId: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", userId)
    .eq("read", false)
    .select()
  return { data, error }
}

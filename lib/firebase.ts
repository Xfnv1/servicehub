import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  user_type: "cliente" | "prestador"
  avatar_url?: string
  bio?: string
  location?: string
  birth_date?: string
  cpf?: string
  created_at: string
  updated_at: string
}

export interface Provider extends User {
  profession?: string
  experience?: string
  specialties?: string[]
  work_radius?: string
  hourly_rate?: number
  average_rating?: number
  total_reviews?: number
  total_earnings?: number
  completed_services?: number
  response_time?: string
  acceptance_rate?: number
}

export interface Service {
  id: string
  title: string
  description: string
  category: string
  budget_min?: number
  budget_max?: number
  location: string
  urgency: "baixa" | "normal" | "alta" | "urgente"
  status: "novo" | "proposta_enviada" | "aceito" | "em_andamento" | "concluido" | "cancelado"
  client_id: string
  provider_id?: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: "service_request" | "message" | "payment" | "review" | "system"
  title: string
  message: string
  read: boolean
  urgent: boolean
  data?: any
  created_at: string
}

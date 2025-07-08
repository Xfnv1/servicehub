"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"

export interface Notification {
  id: string
  type: "service_request" | "message" | "payment" | "review" | "system" | "reminder"
  title: string
  message: string
  timestamp: Date
  read: boolean
  urgent: boolean
  data?: any
  avatar?: string
  actionUrl?: string
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAll: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Initialize with mock notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "service_request",
        title: "Nova Solicitação de Serviço",
        message: "João Silva solicitou um serviço de encanamento",
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false,
        urgent: true,
        avatar: "/placeholder.svg?height=40&width=40",
        actionUrl: "/dashboard/prestador",
        data: { clientId: "client1", serviceType: "encanamento" },
      },
      {
        id: "2",
        type: "message",
        title: "Nova Mensagem",
        message: 'Maria Santos: "Quando você pode começar o serviço?"',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        read: false,
        urgent: false,
        avatar: "/placeholder.svg?height=40&width=40",
        actionUrl: "/chat",
        data: { chatId: "chat1", senderId: "client2" },
      },
      {
        id: "3",
        type: "payment",
        title: "Pagamento Recebido",
        message: "Você recebeu R$ 150,00 pelo serviço de elétrica",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: true,
        urgent: false,
        data: { amount: 150, serviceId: "service1" },
      },
      {
        id: "4",
        type: "review",
        title: "Nova Avaliação",
        message: "Carlos Oliveira avaliou seu serviço com 5 estrelas",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        read: false,
        urgent: false,
        avatar: "/placeholder.svg?height=40&width=40",
        actionUrl: "/dashboard/prestador",
        data: { rating: 5, reviewId: "review1" },
      },
      {
        id: "5",
        type: "system",
        title: "Atualização do Sistema",
        message: "Nova versão disponível com melhorias de performance",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
        urgent: false,
        data: { version: "2.1.0" },
      },
      {
        id: "6",
        type: "reminder",
        title: "Lembrete de Agendamento",
        message: "Você tem um serviço agendado para hoje às 14:00",
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false,
        urgent: true,
        data: { appointmentId: "apt1", time: "14:00" },
      },
    ]
    setNotifications(mockNotifications)
  }, [])

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications (10% chance every 30 seconds)
      if (Math.random() < 0.1) {
        const newNotification = generateRandomNotification()
        addNotification(newNotification)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const generateRandomNotification = (): Omit<Notification, "id" | "timestamp"> => {
    const types = ["service_request", "message", "payment", "review"] as const
    const type = types[Math.floor(Math.random() * types.length)]

    const templates = {
      service_request: {
        title: "Nova Solicitação de Serviço",
        message: "Um cliente solicitou seus serviços",
        urgent: true,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      message: {
        title: "Nova Mensagem",
        message: "Você recebeu uma nova mensagem",
        urgent: false,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      payment: {
        title: "Pagamento Recebido",
        message: `Você recebeu R$ ${(Math.random() * 500 + 50).toFixed(2)}`,
        urgent: false,
      },
      review: {
        title: "Nova Avaliação",
        message: "Um cliente avaliou seu serviço",
        urgent: false,
        avatar: "/placeholder.svg?height=40&width=40",
      },
    }

    return {
      type,
      ...templates[type],
      read: false,
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const addNotification = (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast for urgent notifications
    if (notification.urgent) {
      toast({
        title: notification.title,
        description: notification.message,
        duration: 5000,
      })
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

"use client"

import { useState } from "react"
import { useNotifications } from "@/contexts/notifications-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bell,
  MessageSquare,
  CreditCard,
  Star,
  Settings,
  Trash2,
  CheckCheck,
  Clock,
  AlertTriangle,
  User,
  Calendar,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"

const notificationIcons = {
  service_request: User,
  message: MessageSquare,
  payment: CreditCard,
  review: Star,
  system: Settings,
  reminder: Calendar,
}

const notificationColors = {
  service_request: "text-blue-600 bg-blue-100",
  message: "text-green-600 bg-green-100",
  payment: "text-emerald-600 bg-emerald-100",
  review: "text-yellow-600 bg-yellow-100",
  system: "text-gray-600 bg-gray-100",
  reminder: "text-purple-600 bg-purple-100",
}

export function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications()
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Notificações</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} nova{unreadCount !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilter(filter === "all" ? "unread" : "all")}
              className="text-xs"
            >
              {filter === "all" ? "Não lidas" : "Todas"}
            </Button>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                <CheckCheck className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-96">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                {filter === "unread" ? "Nenhuma notificação não lida" : "Nenhuma notificação"}
              </p>
            </div>
          ) : (
            <div className="p-2">
              {filteredNotifications.map((notification, index) => {
                const Icon = notificationIcons[notification.type]
                const colorClass = notificationColors[notification.type]

                return (
                  <div key={notification.id}>
                    <div
                      className={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? "bg-blue-50/50" : ""
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex-shrink-0">
                        {notification.avatar ? (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              <Icon className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className={`p-2 rounded-full ${colorClass}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {notification.title}
                              </p>
                              {notification.urgent && <AlertTriangle className="h-3 w-3 text-red-500" />}
                              {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                            </div>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {formatDistanceToNow(notification.timestamp, {
                                  addSuffix: true,
                                  locale: ptBR,
                                })}
                              </span>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <span className="sr-only">Opções</span>
                                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.read && (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  <CheckCheck className="h-4 w-4 mr-2" />
                                  Marcar como lida
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                    {index < filteredNotifications.length - 1 && <Separator className="my-1" />}
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" asChild className="text-xs">
                  <Link href="/notificacoes">Ver todas</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Limpar tudo
                </Button>
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

"use client"

import React, { useState } from "react"
import { useNotifications } from "@/contexts/notifications-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  MessageSquare,
  CreditCard,
  Star,
  Settings,
  User,
  Calendar,
  CheckCheck,
  Trash2,
  Clock,
  AlertTriangle,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { formatDistanceToNow, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "@/hooks/use-toast"

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

const notificationLabels = {
  service_request: "Solicitações",
  message: "Mensagens",
  payment: "Pagamentos",
  review: "Avaliações",
  system: "Sistema",
  reminder: "Lembretes",
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications()
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [notificationSettings, setNotificationSettings] = useState({
    service_request: true,
    message: true,
    payment: true,
    review: true,
    system: false,
    reminder: true,
    email: true,
    push: true,
    sms: false,
  })

  const filteredNotifications = notifications.filter((notification) => {
    const matchesTab =
      activeTab === "all" || (activeTab === "unread" && !notification.read) || notification.type === activeTab

    const matchesSearch =
      searchTerm === "" ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesTab && matchesSearch
  })

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
  }

  const handleSettingChange = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }))
    toast({
      title: "Configuração atualizada",
      description: `Notificações de ${notificationLabels[key as keyof typeof notificationLabels] || key} ${value ? "ativadas" : "desativadas"}.`,
    })
  }

  const getTabCount = (type: string) => {
    if (type === "all") return notifications.length
    if (type === "unread") return unreadCount
    return notifications.filter((n) => n.type === type).length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notificações</h1>
          <p className="text-gray-600">Gerencie suas notificações e preferências de comunicação</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <TabsList className="grid grid-cols-3 lg:grid-cols-7 w-full sm:w-auto">
              <TabsTrigger value="all" className="text-xs">
                Todas ({getTabCount("all")})
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                Não lidas ({getTabCount("unread")})
              </TabsTrigger>
              <TabsTrigger value="service_request" className="text-xs">
                <User className="h-3 w-3 mr-1" />
                Serviços ({getTabCount("service_request")})
              </TabsTrigger>
              <TabsTrigger value="message" className="text-xs">
                <MessageSquare className="h-3 w-3 mr-1" />
                Mensagens ({getTabCount("message")})
              </TabsTrigger>
              <TabsTrigger value="payment" className="text-xs">
                <CreditCard className="h-3 w-3 mr-1" />
                Pagamentos ({getTabCount("payment")})
              </TabsTrigger>
              <TabsTrigger value="review" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                Avaliações ({getTabCount("review")})
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs">
                <Settings className="h-3 w-3 mr-1" />
                Config.
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar notificações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} size="sm">
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Marcar todas como lidas
                </Button>
              )}
            </div>
          </div>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Preferências de Notificação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Tipos de Notificação</h3>
                  <div className="space-y-4">
                    {Object.entries(notificationLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${notificationColors[key as keyof typeof notificationColors]}`}
                          >
                            {React.createElement(notificationIcons[key as keyof typeof notificationIcons], {
                              className: "h-4 w-4",
                            })}
                          </div>
                          <div>
                            <Label htmlFor={key} className="text-sm font-medium">
                              {label}
                            </Label>
                            <p className="text-xs text-gray-500">Receber notificações sobre {label.toLowerCase()}</p>
                          </div>
                        </div>
                        <Switch
                          id={key}
                          checked={notificationSettings[key as keyof typeof notificationSettings]}
                          onCheckedChange={(checked) => handleSettingChange(key, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Canais de Comunicação</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        <p className="text-xs text-gray-500">Receber notificações por email</p>
                      </div>
                      <Switch
                        id="email"
                        checked={notificationSettings.email}
                        onCheckedChange={(checked) => handleSettingChange("email", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push" className="text-sm font-medium">
                          Push Notifications
                        </Label>
                        <p className="text-xs text-gray-500">Receber notificações push no navegador</p>
                      </div>
                      <Switch
                        id="push"
                        checked={notificationSettings.push}
                        onCheckedChange={(checked) => handleSettingChange("push", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms" className="text-sm font-medium">
                          SMS
                        </Label>
                        <p className="text-xs text-gray-500">Receber notificações por SMS (apenas urgentes)</p>
                      </div>
                      <Switch
                        id="sms"
                        checked={notificationSettings.sms}
                        onCheckedChange={(checked) => handleSettingChange("sms", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {["all", "unread", "service_request", "message", "payment", "review"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Bell className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notificação encontrada</h3>
                    <p className="text-gray-500 text-center">
                      {searchTerm
                        ? "Tente ajustar sua busca ou filtros"
                        : tabValue === "unread"
                          ? "Todas as notificações foram lidas"
                          : "Você não tem notificações no momento"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => {
                    const Icon = notificationIcons[notification.type]
                    const colorClass = notificationColors[notification.type]

                    return (
                      <Card
                        key={notification.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          !notification.read ? "ring-2 ring-blue-100 bg-blue-50/30" : ""
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              {notification.avatar ? (
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    <Icon className="h-5 w-5" />
                                  </AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className={`p-3 rounded-full ${colorClass}`}>
                                  <Icon className="h-5 w-5" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3
                                      className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                                    >
                                      {notification.title}
                                    </h3>
                                    {notification.urgent && (
                                      <Badge variant="destructive" className="text-xs">
                                        <AlertTriangle className="h-3 w-3 mr-1" />
                                        Urgente
                                      </Badge>
                                    )}
                                    {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      <span>
                                        {formatDistanceToNow(notification.timestamp, {
                                          addSuffix: true,
                                          locale: ptBR,
                                        })}
                                      </span>
                                    </div>
                                    <span>•</span>
                                    <span>
                                      {format(notification.timestamp, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {notificationLabels[notification.type]}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        markAsRead(notification.id)
                                      }}
                                    >
                                      <CheckCheck className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotification(notification.id)
                                    }}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {notifications.length > 0 && activeTab !== "settings" && (
          <div className="flex justify-center pt-6">
            <Button
              variant="outline"
              onClick={clearAll}
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar todas as notificações
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

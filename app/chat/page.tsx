"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

interface Message {
  id: string
  text: string
  senderId: string
  senderName: string
  timestamp: Date
  type: "text" | "image" | "file"
  isRead?: boolean
  attachment?: {
    name: string
    type: string
    url: string
    size?: string
  }
}

interface Chat {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unread: number
  avatar: string
  status: "online" | "offline" | "away"
  service: string
  lastSeen?: string
  isTyping?: boolean
}

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const currentUserId = "user1"
  const currentUserName = "João Santos"

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "chat1",
      name: "Maria Silva",
      lastMessage: "Perfeito! Posso ir amanhã às 14h",
      timestamp: "14:30",
      unread: 2,
      avatar: "MS",
      status: "online",
      service: "Limpeza Residencial",
      lastSeen: "Agora",
      isTyping: false,
    },
    {
      id: "chat2",
      name: "Carlos Mendes",
      lastMessage: "Vou enviar o orçamento em breve",
      timestamp: "12:15",
      unread: 0,
      avatar: "CM",
      status: "away",
      service: "Pintura",
      lastSeen: "Há 2 horas",
      isTyping: false,
    },
    {
      id: "chat3",
      name: "Ana Costa",
      lastMessage: "Obrigada pela preferência!",
      timestamp: "Ontem",
      unread: 1,
      avatar: "AC",
      status: "offline",
      service: "Manicure",
      lastSeen: "Ontem às 18:30",
      isTyping: false,
    },
  ])

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nova mensagem de Maria Silva", time: "Agora", read: false },
    { id: 2, message: "Carlos Mendes enviou um arquivo", time: "5 min", read: false },
    { id: 3, message: "Ana Costa está online", time: "10 min", read: true },
    { id: 4, message: "Novo serviço solicitado", time: "1h", read: false },
  ])

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.service.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const unreadNotifications = notifications.filter((n) => !n.read).length

  // Simular mensagens iniciais
  useEffect(() => {
    if (selectedChat === "chat1") {
      setMessages([
        {
          id: "1",
          text: "Olá! Vi seu perfil e gostaria de contratar seus serviços de limpeza.",
          senderId: currentUserId,
          senderName: currentUserName,
          timestamp: new Date(Date.now() - 3600000),
          type: "text",
          isRead: true,
        },
        {
          id: "2",
          text: "Olá João! Fico feliz com seu interesse. Qual tipo de limpeza você precisa?",
          senderId: "maria",
          senderName: "Maria Silva",
          timestamp: new Date(Date.now() - 3500000),
          type: "text",
          isRead: true,
        },
        {
          id: "3",
          text: "Preciso de uma limpeza completa em um apartamento de 2 quartos. Quando você teria disponibilidade?",
          senderId: currentUserId,
          senderName: currentUserName,
          timestamp: new Date(Date.now() - 3400000),
          type: "text",
          isRead: true,
        },
        {
          id: "4",
          text: "Perfeito! Posso ir amanhã às 14h. O valor seria R$ 120 pela limpeza completa.",
          senderId: "maria",
          senderName: "Maria Silva",
          timestamp: new Date(Date.now() - 1800000),
          type: "text",
          isRead: false,
        },
      ])
    } else if (selectedChat === "chat2") {
      setMessages([
        {
          id: "5",
          text: "Oi Carlos! Preciso pintar minha sala. Você pode fazer um orçamento?",
          senderId: currentUserId,
          senderName: currentUserName,
          timestamp: new Date(Date.now() - 7200000),
          type: "text",
          isRead: true,
        },
        {
          id: "6",
          text: "Claro! Qual o tamanho da sala? E você já tem a tinta ou preciso incluir no orçamento?",
          senderId: "carlos",
          senderName: "Carlos Mendes",
          timestamp: new Date(Date.now() - 7000000),
          type: "text",
          isRead: true,
        },
        {
          id: "7",
          text: "A sala tem cerca de 20m². Preciso que você forneça a tinta também.",
          senderId: currentUserId,
          senderName: currentUserName,
          timestamp: new Date(Date.now() - 6800000),
          type: "text",
          isRead: true,
        },
        {
          id: "8",
          text: "Vou enviar o orçamento em breve. Que cor você gostaria?",
          senderId: "carlos",
          senderName: "Carlos Mendes",
          timestamp: new Date(Date.now() - 3600000),
          type: "text",
          isRead: false,
          attachment: {
            name: "orcamento_pintura.pdf",
            type: "application/pdf",
            url: "#",
            size: "245 KB",
          },
        },
      ])
    } else if (selectedChat === "chat3") {
      setMessages([
        {
          id: "9",
          text: "Oi Ana! Gostaria de agendar um horário para manicure.",
          senderId: currentUserId,
          senderName: currentUserName,
          timestamp: new Date(Date.now() - 86400000),
          type: "text",
          isRead: true,
        },
        {
          id: "10",
          text: "Olá! Claro, tenho disponibilidade amanhã à tarde. Que horário seria melhor para você?",
          senderId: "ana",
          senderName: "Ana Costa",
          timestamp: new Date(Date.now() - 86000000),
          type: "text",
          isRead: true,
        },
        {
          id: "11",
          text: "Às 15h seria perfeito!",
          senderId: currentUserId,
          senderName: currentUserName,
          timestamp: new Date(Date.now() - 85000000),
          type: "text",
          isRead: true,
        },
        {
          id: "12",
          text: "Perfeito! Agendado para amanhã às 15h. Obrigada pela preferência!",
          senderId: "ana",
          senderName: "Ana Costa",
          timestamp: new Date(Date.now() - 84000000),
          type: "text",
          isRead: false,
        },
      ])
    }
  }, [selectedChat])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simular indicador de digitação
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout
    if (newMessage.length > 0) {
      setIsTyping(true)
      typingTimeout = setTimeout(() => setIsTyping(false), 1000)
    }
    return () => clearTimeout(typingTimeout)
  }, [newMessage])

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      senderId: currentUserId,
      senderName: currentUserName,
      timestamp: new Date(),
      type: "text",
      isRead: false,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Atualizar último visto
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat ? { ...chat, lastMessage: newMessage, timestamp: "Agora", isTyping: true } : chat,
      ),
    )

    // Simular resposta automática após 2-3 segundos
    setTimeout(
      () => {
        const responses = [
          "Entendi! Vou verificar minha agenda.",
          "Perfeito! Podemos acertar os detalhes.",
          "Ótimo! Vou preparar tudo para você.",
          "Combinado! Até logo.",
          "Pode deixar comigo!",
          "Vou te enviar mais informações em breve.",
          "Obrigado pelo contato!",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        const selectedChatData = chats.find((c) => c.id === selectedChat)

        if (selectedChatData) {
          const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: randomResponse,
            senderId: selectedChat.replace("chat", ""),
            senderName: selectedChatData.name,
            timestamp: new Date(),
            type: "text",
            isRead: false,
          }
          setMessages((prev) => [...prev, responseMessage])

          // Parar indicador de digitação
          setChats((prev) =>
            prev.map((chat) =>
              chat.id === selectedChat ? { ...chat, lastMessage: randomResponse, isTyping: false } : chat,
            ),
          )

          // Adicionar notificação
          const newNotification = {
            id: Date.now(),
            message: `Nova mensagem de ${selectedChatData.name}`,
            time: "Agora",
            read: false,
          }
          setNotifications((prev) => [newNotification, ...prev])
        }
      },
      Math.random() * 2000 + 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && selectedChat) {
      const message: Message = {
        id: Date.now().toString(),
        text: `Arquivo enviado: ${file.name}`,
        senderId: currentUserId,
        senderName: currentUserName,
        timestamp: new Date(),
        type: "file",
        isRead: false,
        attachment: {
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file),
          size: `${(file.size / 1024).toFixed(1)} KB`,
        },
      }

      setMessages((prev) => [...prev, message])
      toast({
        title: "Arquivo enviado!",
        description: `${file.name} foi enviado com sucesso.`,
      })
    }
  }

  const markAsRead = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, isRead: true } : msg)))
  }

  const markNotificationAsRead = (notificationId: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif)))
  }

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return "fas fa-image"
    if (type.includes("pdf")) return "fas fa-file-pdf"
    if (type.includes("word")) return "fas fa-file-word"
    return "fas fa-file"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Mensagens</h1>
            <p className="text-gray-600">Converse com prestadores de serviços</p>
          </div>

          {/* Notifications Dropdown */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative bg-transparent">
                <i className="fas fa-bell mr-2"></i>
                Notificações
                {unreadNotifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
              <div className="p-3 border-b">
                <h3 className="font-semibold">Notificações</h3>
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <i className="fas fa-bell-slash text-2xl mb-2"></i>
                  <p>Nenhuma notificação</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex items-start space-x-3 p-3 cursor-pointer"
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${notification.read ? "bg-gray-300" : "bg-blue-500"}`}
                    ></div>
                    <div className="flex-1">
                      <p className={`text-sm ${notification.read ? "text-gray-600" : "font-medium text-gray-900"}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
              {notifications.some((n) => !n.read) && (
                <div className="p-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                  >
                    Marcar todas como lidas
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Lista de Chats */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <Input
                    placeholder="Buscar conversas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => {
                        setSelectedChat(chat.id)
                        // Marcar mensagens como lidas
                        setChats((prev) => prev.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c)))
                      }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                        selectedChat === chat.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-blue-500 text-white text-sm">{chat.avatar}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(chat.status)}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 text-sm truncate">{chat.name}</h3>
                            <span className="text-xs text-gray-500">{chat.timestamp}</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">{chat.service}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate flex-1">
                              {chat.isTyping ? (
                                <span className="text-blue-600 italic">
                                  <i className="fas fa-circle text-xs animate-pulse mr-1"></i>
                                  digitando...
                                </span>
                              ) : (
                                chat.lastMessage
                              )}
                            </p>
                            {chat.unread > 0 && (
                              <Badge className="bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center ml-2">
                                {chat.unread}
                              </Badge>
                            )}
                          </div>
                          {chat.status !== "online" && !chat.isTyping && (
                            <p className="text-xs text-gray-400 mt-1">Visto por último: {chat.lastSeen}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Área de Chat */}
          <div className="lg:col-span-3">
            {selectedChat ? (
              <Card className="h-full flex flex-col">
                {/* Header do Chat */}
                <CardHeader className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-blue-500 text-white">
                            {chats.find((c) => c.id === selectedChat)?.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(chats.find((c) => c.id === selectedChat)?.status || "offline")}`}
                        />
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900">
                          {chats.find((c) => c.id === selectedChat)?.name}
                        </h2>
                        <p className="text-sm text-gray-500">{chats.find((c) => c.id === selectedChat)?.service}</p>
                        <p className="text-xs text-gray-400">
                          {chats.find((c) => c.id === selectedChat)?.status === "online"
                            ? "Online agora"
                            : `Visto por último: ${chats.find((c) => c.id === selectedChat)?.lastSeen}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" title="Fazer ligação">
                        <i className="fas fa-phone text-green-600"></i>
                      </Button>
                      <Button variant="ghost" size="sm" title="Videochamada">
                        <i className="fas fa-video text-blue-600"></i>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <i className="fas fa-ellipsis-v"></i>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <i className="fas fa-user mr-2"></i>
                            Ver perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <i className="fas fa-bell-slash mr-2"></i>
                            Silenciar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <i className="fas fa-trash mr-2"></i>
                            Excluir conversa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                {/* Mensagens */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === currentUserId ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg cursor-pointer transition-opacity hover:opacity-90 ${
                            message.senderId === currentUserId ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
                          }`}
                          onClick={() => !message.isRead && markAsRead(message.id)}
                        >
                          {message.attachment && (
                            <div
                              className={`mb-2 p-3 rounded border ${
                                message.senderId === currentUserId
                                  ? "bg-blue-400 border-blue-300"
                                  : "bg-white border-gray-300"
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <i className={`${getFileIcon(message.attachment.type)} text-lg`}></i>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{message.attachment.name}</p>
                                  {message.attachment.size && (
                                    <p className="text-xs opacity-75">{message.attachment.size}</p>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`p-1 h-auto ${
                                    message.senderId === currentUserId
                                      ? "text-white hover:bg-blue-400"
                                      : "text-gray-600 hover:bg-gray-100"
                                  }`}
                                >
                                  <i className="fas fa-download text-xs"></i>
                                </Button>
                              </div>
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p
                              className={`text-xs ${
                                message.senderId === currentUserId ? "text-blue-100" : "text-gray-500"
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </p>
                            {message.senderId === currentUserId && (
                              <i
                                className={`fas ${
                                  message.isRead ? "fa-check-double text-blue-200" : "fa-check text-blue-300"
                                } text-xs ml-2`}
                                title={message.isRead ? "Lida" : "Entregue"}
                              ></i>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Indicador de digitação */}
                    {chats.find((c) => c.id === selectedChat)?.isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
                          <div className="flex items-center space-x-1">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 ml-2">digitando...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>

                {/* Input de Mensagem */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      title="Enviar arquivo"
                    >
                      <i className="fas fa-paperclip text-gray-600"></i>
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx,.txt"
                    />
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Digite sua mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        title="Emoji"
                      >
                        <i className="fas fa-smile text-gray-600"></i>
                      </Button>
                    </div>
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                      title="Enviar mensagem"
                    >
                      <i className="fas fa-paper-plane"></i>
                    </Button>
                  </div>
                  {isTyping && (
                    <p className="text-xs text-gray-500 mt-1 ml-12">
                      <i className="fas fa-circle text-xs animate-pulse mr-1"></i>
                      Você está digitando...
                    </p>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-comments text-gray-400 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Selecione uma conversa</h3>
                  <p className="text-gray-500">Escolha uma conversa para começar a trocar mensagens</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

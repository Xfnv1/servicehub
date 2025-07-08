"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import {
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  X,
  Heart,
  CreditCard,
  Plus,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  Bell,
  Settings,
  Camera,
  Edit,
  Save,
  User,
  Briefcase,
  Play,
  Wallet,
  Eye,
  Lightbulb,
  Shield,
  Download,
  Crown,
} from "lucide-react"

interface Service {
  id: string
  title: string
  provider: string
  status: "ativo" | "concluido" | "cancelado" | "pendente"
  progress: number
  price: string
  date: string
  description: string
  category: string
  location: string
  providerAvatar: string
  providerRating: number
  estimatedTime: string
}

interface Provider {
  id: string
  name: string
  service: string
  rating: number
  reviews: number
  price: string
  avatar: string
  verified: boolean
  responseTime: string
  completedJobs: number
  specialties: string[]
}

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showNewServiceModal, setShowNewServiceModal] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    bio: "Cliente ativo da plataforma ServiceHub, sempre em busca de serviços de qualidade.",
    location: "São Paulo, SP",
    birthDate: "1990-05-15",
    cpf: "123.456.789-00",
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: false,
    },
    privacy: {
      showPhone: true,
      showEmail: false,
      showLocation: true,
    },
  })

  const [newService, setNewService] = useState({
    title: "",
    category: "",
    description: "",
    budget: "",
    location: "",
    urgency: "normal",
  })

  // Dados simulados
  const stats = {
    totalServices: 24,
    activeServices: 3,
    totalSpent: 2850,
    averageRating: 4.8,
    monthlyGrowth: 12,
    completedServices: 21,
    favoriteProviders: 8,
    pendingPayments: 1,
  }

  const activeServices: Service[] = [
    {
      id: "1",
      title: "Limpeza Residencial Completa",
      provider: "Maria Silva",
      status: "ativo",
      progress: 75,
      price: "R$ 120",
      date: "2024-01-15",
      description: "Limpeza completa de apartamento 2 quartos, incluindo banheiros, cozinha e área de serviço",
      category: "Limpeza",
      location: "São Paulo, SP",
      providerAvatar: "MS",
      providerRating: 4.9,
      estimatedTime: "4 horas",
    },
    {
      id: "2",
      title: "Reparo Elétrico",
      provider: "João Santos",
      status: "pendente",
      progress: 0,
      price: "R$ 200",
      date: "2024-01-16",
      description: "Instalação de novos pontos de luz na sala e quarto",
      category: "Elétrica",
      location: "São Paulo, SP",
      providerAvatar: "JS",
      providerRating: 4.7,
      estimatedTime: "3 horas",
    },
    {
      id: "3",
      title: "Aula de Matemática",
      provider: "Pedro Oliveira",
      status: "ativo",
      progress: 50,
      price: "R$ 80",
      date: "2024-01-14",
      description: "Aulas particulares de matemática para ensino médio",
      category: "Educação",
      location: "Online",
      providerAvatar: "PO",
      providerRating: 4.9,
      estimatedTime: "2 horas",
    },
  ]

  const serviceHistory: Service[] = [
    {
      id: "4",
      title: "Pintura de Parede",
      provider: "Carlos Mendes",
      status: "concluido",
      progress: 100,
      price: "R$ 350",
      date: "2024-01-10",
      description: "Pintura completa da sala de estar",
      category: "Pintura",
      location: "São Paulo, SP",
      providerAvatar: "CM",
      providerRating: 5.0,
      estimatedTime: "6 horas",
    },
    {
      id: "5",
      title: "Manicure e Pedicure",
      provider: "Ana Costa",
      status: "concluido",
      progress: 100,
      price: "R$ 60",
      date: "2024-01-08",
      description: "Serviço completo de manicure e pedicure",
      category: "Beleza",
      location: "São Paulo, SP",
      providerAvatar: "AC",
      providerRating: 4.8,
      estimatedTime: "2 horas",
    },
  ]

  const favoriteProviders: Provider[] = [
    {
      id: "1",
      name: "Maria Silva",
      service: "Limpeza Residencial",
      rating: 4.9,
      reviews: 127,
      price: "R$ 80/h",
      avatar: "MS",
      verified: true,
      responseTime: "< 1h",
      completedJobs: 156,
      specialties: ["Limpeza Pesada", "Organização", "Limpeza Pós-Obra"],
    },
    {
      id: "2",
      name: "João Santos",
      service: "Reparos Gerais",
      rating: 4.7,
      reviews: 89,
      price: "R$ 120/h",
      avatar: "JS",
      verified: true,
      responseTime: "< 2h",
      completedJobs: 94,
      specialties: ["Elétrica", "Hidráulica", "Marcenaria"],
    },
    {
      id: "3",
      name: "Pedro Oliveira",
      service: "Professor Particular",
      rating: 4.9,
      reviews: 78,
      price: "R$ 50/h",
      avatar: "PO",
      verified: true,
      responseTime: "< 30min",
      completedJobs: 203,
      specialties: ["Matemática", "Física", "Química"],
    },
  ]

  const paymentHistory = [
    {
      id: "1",
      service: "Limpeza Residencial",
      provider: "Maria Silva",
      amount: "R$ 120,00",
      date: "15/01/2024",
      status: "pago",
      method: "Cartão de Crédito",
      transactionId: "TXN123456",
    },
    {
      id: "2",
      service: "Pintura de Parede",
      provider: "Carlos Mendes",
      amount: "R$ 350,00",
      date: "10/01/2024",
      status: "pago",
      method: "PIX",
      transactionId: "TXN123457",
    },
    {
      id: "3",
      service: "Reparo Elétrico",
      provider: "João Santos",
      amount: "R$ 200,00",
      date: "16/01/2024",
      status: "pendente",
      method: "Cartão de Débito",
      transactionId: "TXN123458",
    },
  ]

  const recentNotifications = [
    {
      id: "1",
      type: "service_request",
      title: "Proposta Recebida",
      message: "Maria Silva enviou uma proposta para limpeza residencial",
      time: "5 min atrás",
      urgent: true,
    },
    {
      id: "2",
      type: "message",
      title: "Nova Mensagem",
      message: "João Santos enviou uma mensagem",
      time: "15 min atrás",
      urgent: false,
    },
    {
      id: "3",
      type: "payment",
      title: "Pagamento Processado",
      message: "Seu pagamento de R$ 150,00 foi processado",
      time: "2h atrás",
      urgent: false,
    },
    {
      id: "4",
      type: "review",
      title: "Avalie o Serviço",
      message: "Avalie o serviço de limpeza realizado por Maria Silva",
      time: "4h atrás",
      urgent: false,
    },
  ]

  const filteredActiveServices = activeServices.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || service.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleNewServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Solicitação enviada!",
      description: "Sua solicitação foi enviada para os prestadores. Você receberá propostas em breve.",
    })
    setShowNewServiceModal(false)
    setNewService({
      title: "",
      category: "",
      description: "",
      budget: "",
      location: "",
      urgency: "normal",
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
        toast({
          title: "Foto atualizada",
          description: "Sua foto de perfil foi atualizada com sucesso!",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    setIsEditingProfile(false)
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso!",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePreferenceChange = (field: string, value: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }))
  }

  const handlePrivacyChange = (field: string, value: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value,
      },
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "concluido":
        return "bg-blue-100 text-blue-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pago":
        return "bg-green-100 text-green-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "service_request":
        return <User className="w-4 h-4" />
      case "message":
        return <MessageCircle className="w-4 h-4" />
      case "payment":
        return <DollarSign className="w-4 h-4" />
      case "review":
        return <Star className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getNotificationColor = (type: string, urgent: boolean) => {
    if (urgent) return "bg-red-50 border-red-200"
    switch (type) {
      case "service_request":
        return "bg-blue-50 border-blue-200"
      case "message":
        return "bg-green-50 border-green-200"
      case "payment":
        return "bg-yellow-50 border-yellow-200"
      case "review":
        return "bg-purple-50 border-purple-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const handleNotificationClick = () => {
    setShowNotificationsModal(true)
    setNotifications(0) // Zerar contador ao abrir
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard do Cliente</h1>
            <p className="text-gray-600 mt-1">Gerencie seus serviços e acompanhe seu histórico</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button onClick={handleNotificationClick} variant="outline" className="relative bg-white hover:bg-gray-50">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            <Dialog open={showNewServiceModal} onOpenChange={setShowNewServiceModal}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Solicitar Serviço
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Solicitar Novo Serviço</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleNewServiceSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título do Serviço</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Limpeza residencial"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={newService.category}
                      onValueChange={(value) => setNewService({ ...newService, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="limpeza">Limpeza</SelectItem>
                        <SelectItem value="eletrica">Elétrica</SelectItem>
                        <SelectItem value="hidraulica">Hidráulica</SelectItem>
                        <SelectItem value="pintura">Pintura</SelectItem>
                        <SelectItem value="jardinagem">Jardinagem</SelectItem>
                        <SelectItem value="beleza">Beleza</SelectItem>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva detalhadamente o que você precisa..."
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="budget">Orçamento Estimado</Label>
                    <Input
                      id="budget"
                      placeholder="R$ 100,00"
                      value={newService.budget}
                      onChange={(e) => setNewService({ ...newService, budget: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      placeholder="Cidade, Estado"
                      value={newService.location}
                      onChange={(e) => setNewService({ ...newService, location: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="urgency">Urgência</Label>
                    <Select
                      value={newService.urgency}
                      onValueChange={(value) => setNewService({ ...newService, urgency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa - Até 1 semana</SelectItem>
                        <SelectItem value="normal">Normal - Até 3 dias</SelectItem>
                        <SelectItem value="alta">Alta - Até 24h</SelectItem>
                        <SelectItem value="urgente">Urgente - Hoje</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <Lightbulb className="w-4 h-4 mr-2 inline" />
                      <strong>Dica:</strong> Seja específico na descrição para receber propostas mais precisas!
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    Enviar Solicitação
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="active">Serviços Ativos</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Serviços</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalServices}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />+{stats.monthlyGrowth}% este mês
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Serviços Ativos</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeServices}</p>
                      <p className="text-xs text-blue-600 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        Em andamento
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Gasto</p>
                      <p className="text-2xl font-bold text-gray-900">R$ {stats.totalSpent.toLocaleString()}</p>
                      <p className="text-xs text-gray-600 flex items-center mt-1">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Este ano
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avaliação Média</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Estatísticas Adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Concluídos</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.completedServices}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Prestadores Favoritos</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.favoriteProviders}</p>
                    </div>
                    <Heart className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pagamentos Pendentes</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingPayments}</p>
                    </div>
                    <CreditCard className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Prestadores Ativos</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Serviços Recentes */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeServices.slice(0, 3).map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-blue-500 text-white">{service.providerAvatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">{service.title}</h4>
                          <p className="text-sm text-gray-600">{service.provider}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                        <p className="text-sm text-gray-600 mt-1">{service.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar serviços..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="ativo">Ativos</SelectItem>
                    <SelectItem value="pendente">Pendentes</SelectItem>
                    <SelectItem value="concluido">Concluídos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredActiveServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-blue-500 text-white">{service.providerAvatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                          <p className="text-gray-600">{service.provider}</p>
                          <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{service.providerRating}</span>
                            <span className="text-gray-400 mx-2">•</span>
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 ml-1">{service.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{service.price}</p>
                        <p className="text-sm text-gray-500">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {service.estimatedTime}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{service.description}</p>

                    {service.status === "ativo" && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progresso</span>
                          <span className="text-sm text-gray-600">{service.progress}%</span>
                        </div>
                        <Progress value={service.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{service.category}</Badge>
                        <span className="text-sm text-gray-500">{service.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedService(service)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Detalhes
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Ligar
                        </Button>
                        {service.status === "ativo" && (
                          <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Reagendar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Modal de Detalhes do Serviço */}
            <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Detalhes do Serviço</DialogTitle>
                </DialogHeader>
                {selectedService && (
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-blue-500 text-white text-lg">
                          {selectedService.providerAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{selectedService.title}</h3>
                        <p className="text-gray-600">{selectedService.provider}</p>
                        <div className="flex items-center mt-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{selectedService.providerRating}</span>
                          <Badge className={`ml-4 ${getStatusColor(selectedService.status)}`}>
                            {selectedService.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{selectedService.price}</p>
                        <p className="text-sm text-gray-500">{selectedService.estimatedTime}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Descrição</h4>
                      <p className="text-gray-600">{selectedService.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Categoria</h4>
                        <Badge variant="outline">{selectedService.category}</Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Localização</h4>
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {selectedService.location}
                        </p>
                      </div>
                    </div>

                    {selectedService.status === "ativo" && (
                      <div>
                        <h4 className="font-semibold mb-2">Progresso</h4>
                        <Progress value={selectedService.progress} className="h-3" />
                        <p className="text-sm text-gray-600 mt-1">{selectedService.progress}% concluído</p>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Conversar
                      </Button>
                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Ligar
                      </Button>
                      {selectedService.status === "ativo" && (
                        <Button variant="outline">
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Serviços</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceHistory.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-blue-500 text-white">{service.providerAvatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">{service.title}</h4>
                          <p className="text-sm text-gray-600">{service.provider}</p>
                          <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{service.providerRating}</span>
                            <span className="text-sm text-gray-500 ml-4">{service.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{service.price}</p>
                        <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button variant="outline" size="sm">
                            Avaliar
                          </Button>
                          <Button variant="outline" size="sm">
                            Recontratar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="grid gap-6">
              {favoriteProviders.map((provider) => (
                <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="bg-blue-500 text-white text-lg">{provider.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                            {provider.verified && (
                              <Badge className="ml-2 bg-green-100 text-green-800">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Verificado
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{provider.service}</p>
                          <div className="flex items-center mt-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">
                              {provider.rating} ({provider.reviews} avaliações)
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span>
                              <Clock className="w-4 h-4 inline mr-1" />
                              Responde em {provider.responseTime}
                            </span>
                            <span>
                              <CheckCircle className="w-4 h-4 inline mr-1" />
                              {provider.completedJobs} trabalhos
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {provider.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{provider.price}</p>
                        <div className="flex items-center space-x-2 mt-4">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Chat
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4 mr-2" />
                            Ligar
                          </Button>
                          <Button size="sm">Contratar</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pagamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{payment.service}</h4>
                          <p className="text-sm text-gray-600">{payment.provider}</p>
                          <p className="text-xs text-gray-500">ID: {payment.transactionId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{payment.amount}</p>
                        <Badge className={getPaymentStatusColor(payment.status)}>{payment.status}</Badge>
                        <p className="text-sm text-gray-500 mt-1">{payment.date}</p>
                        <p className="text-xs text-gray-500">{payment.method}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informações Principais */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Informações Pessoais</CardTitle>
                    <Button
                      variant={isEditingProfile ? "default" : "outline"}
                      onClick={() => (isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true))}
                    >
                      {isEditingProfile ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Salvar
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Foto de Perfil */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={profileImage || undefined} />
                          <AvatarFallback className="bg-blue-500 text-white text-xl">
                            {profileData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {isEditingProfile && (
                          <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{profileData.name}</h3>
                        <p className="text-gray-500">Cliente ServiceHub</p>
                        <Badge className="bg-blue-100 text-blue-700 mt-1">Ativo</Badge>
                      </div>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    {/* Campos do Formulário */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Localização</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={profileData.birthDate}
                          onChange={(e) => handleInputChange("birthDate", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          value={profileData.cpf}
                          onChange={(e) => handleInputChange("cpf", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Sobre Você</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        disabled={!isEditingProfile}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Configurações de Notificações */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Preferências de Notificação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                        <p className="text-sm text-gray-500">Receba atualizações importantes por e-mail</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={profileData.preferences.emailNotifications}
                        onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                        <p className="text-sm text-gray-500">Receba alertas urgentes por SMS</p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={profileData.preferences.smsNotifications}
                        onCheckedChange={(checked) => handlePreferenceChange("smsNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications">Notificações Push</Label>
                        <p className="text-sm text-gray-500">Receba notificações no navegador</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={profileData.preferences.pushNotifications}
                        onCheckedChange={(checked) => handlePreferenceChange("pushNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketing-emails">E-mails de Marketing</Label>
                        <p className="text-sm text-gray-500">Receba ofertas e novidades</p>
                      </div>
                      <Switch
                        id="marketing-emails"
                        checked={profileData.preferences.marketingEmails}
                        onCheckedChange={(checked) => handlePreferenceChange("marketingEmails", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Configurações de Privacidade */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Configurações de Privacidade</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-phone">Mostrar Telefone</Label>
                        <p className="text-sm text-gray-500">Permitir que prestadores vejam seu telefone</p>
                      </div>
                      <Switch
                        id="show-phone"
                        checked={profileData.privacy.showPhone}
                        onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-email">Mostrar E-mail</Label>
                        <p className="text-sm text-gray-500">Permitir que prestadores vejam seu e-mail</p>
                      </div>
                      <Switch
                        id="show-email"
                        checked={profileData.privacy.showEmail}
                        onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-location">Mostrar Localização</Label>
                        <p className="text-sm text-gray-500">Permitir que prestadores vejam sua localização</p>
                      </div>
                      <Switch
                        id="show-location"
                        checked={profileData.privacy.showLocation}
                        onCheckedChange={(checked) => handlePrivacyChange("showLocation", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Estatísticas do Perfil */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas do Perfil</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Serviços Contratados</span>
                      <span className="font-semibold">{stats.totalServices}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Avaliação Média Dada</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold">{stats.averageRating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Investido</span>
                      <span className="font-semibold">R$ {stats.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Prestadores Favoritos</span>
                      <span className="font-semibold text-red-600">{stats.favoriteProviders}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Segurança da Conta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Settings className="w-4 h-4 mr-2" />
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Shield className="w-4 h-4 mr-2" />
                      Verificação em 2 Etapas
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Meus Dados
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conta Premium</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Crown className="text-white text-2xl" />
                      </div>
                      <h3 className="font-semibold mb-2">Upgrade para Premium</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Tenha acesso a recursos exclusivos e prioridade no atendimento
                      </p>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Assinar Premium
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showNotificationsModal} onOpenChange={setShowNotificationsModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Notificações</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recentNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-1 rounded-lg ${getNotificationColor(notification.type, notification.urgent)}`}
              >
                <CardContent className="p-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{notification.title}</h4>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

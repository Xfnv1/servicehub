"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { FullCalendar } from "@/components/ui/full-calendar"
import { toast } from "@/hooks/use-toast"
import {
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  CalendarIcon,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Bell,
  Camera,
  Edit,
  Save,
  Eye,
  ThumbsUp,
  Award,
  Target,
  Briefcase,
  BarChart3,
  Wallet,
  UserCheck,
  AlertCircle,
  FileText,
  Send,
  Shield,
  Download,
  Crown,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ServiceRequest {
  id: string
  title: string
  client: string
  clientAvatar: string
  description: string
  budget: string
  location: string
  urgency: "baixa" | "normal" | "alta" | "urgente"
  category: string
  date: string
  status: "novo" | "proposta_enviada" | "aceito" | "rejeitado"
  distance: string
}

interface ActiveService {
  id: string
  title: string
  client: string
  clientAvatar: string
  status: "em_andamento" | "pausado" | "aguardando_cliente" | "finalizado"
  progress: number
  price: string
  startDate: string
  estimatedEnd: string
  description: string
  category: string
  location: string
  clientRating?: number
}

interface Review {
  id: string
  client: string
  clientAvatar: string
  service: string
  rating: number
  comment: string
  date: string
  response?: string
}

interface CalendarEvent {
  id: string
  title: string
  start: string
  end?: string
  backgroundColor?: string
  borderColor?: string
  textColor?: string
}

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null)
  const [selectedService, setSelectedService] = useState<ActiveService | null>(null)
  const [showProposalModal, setShowProposalModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)
  const [notifications, setNotifications] = useState(5)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [proposalData, setProposalData] = useState({
    price: "",
    description: "",
    estimatedTime: "",
    startDate: "",
    materials: "",
  })

  const [providerData, setProviderData] = useState({
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 99999-1234",
    bio: "Profissional de limpeza com mais de 8 anos de experiência. Especializada em limpeza residencial e comercial.",
    location: "São Paulo, SP",
    birthDate: "1985-03-20",
    cpf: "987.654.321-00",
    profession: "Profissional de Limpeza",
    experience: "8 anos",
    specialties: ["Limpeza Residencial", "Limpeza Comercial", "Limpeza Pós-Obra"],
    workRadius: "15 km",
    hourlyRate: "R$ 80",
    availability: {
      monday: { available: true, start: "08:00", end: "18:00" },
      tuesday: { available: true, start: "08:00", end: "18:00" },
      wednesday: { available: true, start: "08:00", end: "18:00" },
      thursday: { available: true, start: "08:00", end: "18:00" },
      friday: { available: true, start: "08:00", end: "18:00" },
      saturday: { available: true, start: "09:00", end: "15:00" },
      sunday: { available: false, start: "", end: "" },
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      autoAcceptFavorites: true,
    },
  })

  // Dados simulados
  const stats = {
    totalEarnings: 12450,
    monthlyEarnings: 3200,
    activeServices: 4,
    completedServices: 127,
    averageRating: 4.9,
    totalReviews: 89,
    responseTime: "< 2h",
    acceptanceRate: 92,
    monthlyGrowth: 18,
    newClients: 12,
    repeatClients: 34,
    pendingPayments: 2,
  }

  const serviceRequests: ServiceRequest[] = [
    {
      id: "1",
      title: "Limpeza Residencial Completa",
      client: "João Santos",
      clientAvatar: "JS",
      description:
        "Preciso de limpeza completa em apartamento 3 quartos, incluindo banheiros, cozinha e área de serviço. Apartamento bem conservado.",
      budget: "R$ 150 - R$ 200",
      location: "Vila Madalena, São Paulo",
      urgency: "normal",
      category: "Limpeza",
      date: "2024-01-20",
      status: "novo",
      distance: "2.3 km",
    },
    {
      id: "2",
      title: "Limpeza Pós-Mudança",
      client: "Ana Costa",
      clientAvatar: "AC",
      description:
        "Apartamento que acabei de alugar precisa de uma limpeza pesada antes da mudança. Tem alguns pontos de mofo no banheiro.",
      budget: "R$ 200 - R$ 300",
      location: "Pinheiros, São Paulo",
      urgency: "alta",
      category: "Limpeza",
      date: "2024-01-19",
      status: "proposta_enviada",
      distance: "4.1 km",
    },
    {
      id: "3",
      title: "Limpeza Semanal",
      client: "Carlos Mendes",
      clientAvatar: "CM",
      description:
        "Procuro profissional para limpeza semanal de casa. Serviço recorrente, toda sexta-feira pela manhã.",
      budget: "R$ 120 - R$ 150",
      location: "Jardins, São Paulo",
      urgency: "baixa",
      category: "Limpeza",
      date: "2024-01-18",
      status: "aceito",
      distance: "1.8 km",
    },
  ]

  const activeServices: ActiveService[] = [
    {
      id: "1",
      title: "Limpeza Residencial - Casa 4 Quartos",
      client: "Pedro Oliveira",
      clientAvatar: "PO",
      status: "em_andamento",
      progress: 75,
      price: "R$ 180",
      startDate: "2024-01-15",
      estimatedEnd: "2024-01-15",
      description: "Limpeza completa de casa com 4 quartos, 3 banheiros, sala, cozinha e área de serviço",
      category: "Limpeza",
      location: "Moema, São Paulo",
      clientRating: 4.8,
    },
    {
      id: "2",
      title: "Limpeza Comercial - Escritório",
      client: "Empresa ABC Ltda",
      clientAvatar: "EA",
      status: "aguardando_cliente",
      progress: 100,
      price: "R$ 250",
      startDate: "2024-01-14",
      estimatedEnd: "2024-01-14",
      description: "Limpeza de escritório com 50m², incluindo 2 banheiros e copa",
      category: "Limpeza",
      location: "Centro, São Paulo",
    },
    {
      id: "3",
      title: "Limpeza Pós-Obra",
      client: "Lucia Fernandes",
      clientAvatar: "LF",
      status: "pausado",
      progress: 30,
      price: "R$ 320",
      startDate: "2024-01-16",
      estimatedEnd: "2024-01-17",
      description: "Limpeza pesada após reforma de banheiro e cozinha",
      category: "Limpeza",
      location: "Vila Olímpia, São Paulo",
      clientRating: 5.0,
    },
  ]

  const reviews: Review[] = [
    {
      id: "1",
      client: "João Santos",
      clientAvatar: "JS",
      service: "Limpeza Residencial",
      rating: 5,
      comment: "Excelente profissional! Muito caprichosa e pontual. Deixou minha casa impecável. Super recomendo!",
      date: "2024-01-10",
      response:
        "Muito obrigada pelo feedback! Foi um prazer trabalhar em sua casa. Fico à disposição sempre que precisar!",
    },
    {
      id: "2",
      client: "Ana Costa",
      clientAvatar: "AC",
      service: "Limpeza Pós-Mudança",
      rating: 5,
      comment:
        "Maria é incrível! Transformou meu apartamento. Trabalho impecável e preço justo. Já agendei o próximo serviço.",
      date: "2024-01-08",
    },
    {
      id: "3",
      client: "Carlos Mendes",
      clientAvatar: "CM",
      service: "Limpeza Semanal",
      rating: 4,
      comment:
        "Ótima profissional, sempre pontual e faz um trabalho de qualidade. Apenas gostaria que trouxesse mais produtos de limpeza.",
      date: "2024-01-05",
      response: "Obrigada pelo feedback! Vou trazer mais produtos na próxima visita. Obrigada pela confiança!",
    },
  ]

  const earnings = [
    { month: "Jan", amount: 3200, services: 12 },
    { month: "Dez", amount: 2800, services: 10 },
    { month: "Nov", amount: 2950, services: 11 },
    { month: "Out", amount: 3100, services: 13 },
    { month: "Set", amount: 2700, services: 9 },
    { month: "Ago", amount: 3400, services: 14 },
  ]

  // Eventos do calendário
  const calendarEvents: CalendarEvent[] = [
    {
      id: "1",
      title: "Limpeza - João Santos",
      start: "2024-01-20T09:00:00",
      end: "2024-01-20T13:00:00",
      backgroundColor: "#3b82f6",
      borderColor: "#2563eb",
    },
    {
      id: "2",
      title: "Limpeza - Ana Costa",
      start: "2024-01-20T14:00:00",
      end: "2024-01-20T18:00:00",
      backgroundColor: "#10b981",
      borderColor: "#059669",
    },
    {
      id: "3",
      title: "Limpeza Semanal - Carlos",
      start: "2024-01-21T10:00:00",
      end: "2024-01-21T14:00:00",
      backgroundColor: "#f59e0b",
      borderColor: "#d97706",
    },
    {
      id: "4",
      title: "Limpeza Comercial",
      start: "2024-01-22T08:30:00",
      end: "2024-01-22T12:30:00",
      backgroundColor: "#8b5cf6",
      borderColor: "#7c3aed",
    },
  ]

  const recentNotifications = [
    {
      id: "1",
      type: "service_request",
      title: "Nova Solicitação",
      message: "João Silva solicitou um serviço de limpeza",
      time: "5 min atrás",
      urgent: true,
    },
    {
      id: "2",
      type: "message",
      title: "Nova Mensagem",
      message: "Ana Costa enviou uma mensagem",
      time: "15 min atrás",
      urgent: false,
    },
    {
      id: "3",
      type: "payment",
      title: "Pagamento Recebido",
      message: "Você recebeu R$ 150,00",
      time: "2h atrás",
      urgent: false,
    },
    {
      id: "4",
      type: "review",
      title: "Nova Avaliação",
      message: "Carlos Oliveira avaliou seu serviço",
      time: "4h atrás",
      urgent: false,
    },
  ]

  const filteredRequests = serviceRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || request.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Proposta enviada!",
      description: "Sua proposta foi enviada para o cliente. Você será notificado sobre a resposta.",
    })
    setShowProposalModal(false)
    setProposalData({
      price: "",
      description: "",
      estimatedTime: "",
      startDate: "",
      materials: "",
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
    setProviderData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePreferenceChange = (field: string, value: boolean) => {
    setProviderData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }))
  }

  const handleNotificationClick = () => {
    setShowNotificationsModal(true)
    setNotifications(0) // Zerar contador ao abrir
  }

  const handleScheduleClick = () => {
    setShowScheduleModal(true)
  }

  const handleEventClick = (event: any) => {
    toast({
      title: "Evento selecionado",
      description: `${event.title} - ${event.start.toLocaleString()}`,
    })
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    toast({
      title: "Data selecionada",
      description: `${date.toLocaleDateString()} - Clique em um horário para agendar`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "novo":
        return "bg-blue-100 text-blue-800"
      case "proposta_enviada":
        return "bg-yellow-100 text-yellow-800"
      case "aceito":
        return "bg-green-100 text-green-800"
      case "rejeitado":
        return "bg-red-100 text-red-800"
      case "em_andamento":
        return "bg-green-100 text-green-800"
      case "pausado":
        return "bg-orange-100 text-orange-800"
      case "aguardando_cliente":
        return "bg-purple-100 text-purple-800"
      case "finalizado":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgente":
        return "bg-red-100 text-red-800"
      case "alta":
        return "bg-orange-100 text-orange-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "baixa":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "service_request":
        return <Briefcase className="w-4 h-4" />
      case "message":
        return <MessageCircle className="w-4 h-4" />
      case "payment":
        return <DollarSign className="w-4 h-4" />
      case "review":
        return <Star className="w-4 h-4" />
      case "shield":
        return <Shield className="w-4 h-4" />
      case "download":
        return <Download className="w-4 h-4" />
      case "crown":
        return <Crown className="w-4 h-4" />
      case "camera":
        return <Camera className="w-4 h-4" />
      case "eye":
        return <Eye className="w-4 h-4" />
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard do Prestador</h1>
            <p className="text-gray-600 mt-1">Gerencie seus serviços e acompanhe seus ganhos</p>
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

            <Button onClick={handleScheduleClick} className="bg-blue-600 hover:bg-blue-700">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Agenda
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="requests">Solicitações</TabsTrigger>
            <TabsTrigger value="active">Serviços Ativos</TabsTrigger>
            <TabsTrigger value="schedule">Agenda</TabsTrigger>
            <TabsTrigger value="earnings">Ganhos</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Estatísticas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ganhos Este Mês</p>
                      <p className="text-2xl font-bold text-gray-900">R$ {stats.monthlyEarnings.toLocaleString()}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />+{stats.monthlyGrowth}% vs mês anterior
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
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
                        <Briefcase className="w-3 h-3 mr-1" />
                        Em andamento
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
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
                        <span className="text-xs text-gray-600 ml-1">({stats.totalReviews})</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Taxa de Aceitação</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.acceptanceRate}%</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <Target className="w-3 h-3 mr-1" />
                        Excelente
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Estatísticas Secundárias */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Ganhos</p>
                      <p className="text-2xl font-bold text-gray-900">R$ {stats.totalEarnings.toLocaleString()}</p>
                    </div>
                    <Wallet className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Serviços Concluídos</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.completedServices}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Novos Clientes</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.newClients}</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tempo de Resposta</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.responseTime}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Atividade Recente */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Solicitações Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serviceRequests.slice(0, 3).map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback className="bg-blue-500 text-white">{request.clientAvatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-gray-900">{request.title}</h4>
                            <p className="text-sm text-gray-600">{request.client}</p>
                            <p className="text-xs text-gray-500">{request.distance}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(request.status)}>{request.status.replace("_", " ")}</Badge>
                          <p className="text-sm text-gray-600 mt-1">{request.budget}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Próximos Agendamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {calendarEvents.slice(0, 3).map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CalendarIcon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(event.start).toLocaleDateString()} às{" "}
                              {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">confirmado</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar solicitações..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="novo">Novas</SelectItem>
                    <SelectItem value="proposta_enviada">Proposta Enviada</SelectItem>
                    <SelectItem value="aceito">Aceitas</SelectItem>
                    <SelectItem value="rejeitado">Rejeitadas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-blue-500 text-white">{request.clientAvatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                          <p className="text-gray-600">{request.client}</p>
                          <div className="flex items-center mt-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 ml-1">{request.location}</span>
                            <span className="text-gray-400 mx-2">•</span>
                            <span className="text-sm text-gray-600">{request.distance}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getStatusColor(request.status)}>{request.status.replace("_", " ")}</Badge>
                          <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">{request.budget}</p>
                        <p className="text-sm text-gray-500">{request.date}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{request.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{request.category}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                        {request.status === "novo" && (
                          <Button size="sm" onClick={() => setShowProposalModal(true)}>
                            <Send className="w-4 h-4 mr-2" />
                            Enviar Proposta
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="grid gap-6">
              {activeServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-blue-500 text-white">{service.clientAvatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                          <p className="text-gray-600">{service.client}</p>
                          <div className="flex items-center mt-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 ml-1">{service.location}</span>
                            {service.clientRating && (
                              <>
                                <span className="text-gray-400 mx-2">•</span>
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600 ml-1">{service.clientRating}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(service.status)}>{service.status.replace("_", " ")}</Badge>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{service.price}</p>
                        <p className="text-sm text-gray-500">
                          {service.startDate} - {service.estimatedEnd}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{service.description}</p>

                    {service.status === "em_andamento" && (
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
                        {service.status === "aguardando_cliente" && (
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Finalizar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agenda Completa</CardTitle>
              </CardHeader>
              <CardContent>
                <FullCalendar
                  events={calendarEvents}
                  onDateSelect={handleDateSelect}
                  onEventClick={handleEventClick}
                  height={600}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Ganhos</p>
                      <p className="text-2xl font-bold text-gray-900">R$ {stats.totalEarnings.toLocaleString()}</p>
                    </div>
                    <Wallet className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Este Mês</p>
                      <p className="text-2xl font-bold text-gray-900">R$ {stats.monthlyEarnings.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-500" />
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
                    <AlertCircle className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Ganhos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earnings.map((earning, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{earning.month} 2024</h4>
                          <p className="text-sm text-gray-600">{earning.services} serviços realizados</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">R$ {earning.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">
                          Média: R$ {Math.round(earning.amount / earning.services)}/serviço
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avaliação Média</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Avaliações</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avaliações 5 Estrelas</p>
                      <p className="text-2xl font-bold text-gray-900">78%</p>
                    </div>
                    <ThumbsUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-blue-500 text-white">{review.clientAvatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.client}</h4>
                            <p className="text-sm text-gray-600">{review.service}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        {review.response && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-900 mb-1">Sua resposta:</p>
                            <p className="text-sm text-blue-800">{review.response}</p>
                          </div>
                        )}
                        {!review.response && (
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Responder
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informações Principais */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Informações Profissionais</CardTitle>
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
                            {providerData.name
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
                        <h3 className="text-lg font-semibold">{providerData.name}</h3>
                        <p className="text-gray-500">{providerData.profession}</p>
                        <div className="flex items-center mt-1">
                          <Badge className="bg-green-100 text-green-700 mr-2">Verificado</Badge>
                          <Badge className="bg-blue-100 text-blue-700">Ativo</Badge>
                        </div>
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
                          value={providerData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={providerData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={providerData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Localização</Label>
                        <Input
                          id="location"
                          value={providerData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="profession">Profissão</Label>
                        <Input
                          id="profession"
                          value={providerData.profession}
                          onChange={(e) => handleInputChange("profession", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience">Experiência</Label>
                        <Input
                          id="experience"
                          value={providerData.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hourlyRate">Valor por Hora</Label>
                        <Input
                          id="hourlyRate"
                          value={providerData.hourlyRate}
                          onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <Label htmlFor="workRadius">Raio de Atendimento</Label>
                        <Input
                          id="workRadius"
                          value={providerData.workRadius}
                          onChange={(e) => handleInputChange("workRadius", e.target.value)}
                          disabled={!isEditingProfile}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Sobre Você</Label>
                      <Textarea
                        id="bio"
                        value={providerData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        disabled={!isEditingProfile}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>Especialidades</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {providerData.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Configurações de Notificações */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Preferências</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                        <p className="text-sm text-gray-500">Receba novas solicitações por e-mail</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={providerData.preferences.emailNotifications}
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
                        checked={providerData.preferences.smsNotifications}
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
                        checked={providerData.preferences.pushNotifications}
                        onCheckedChange={(checked) => handlePreferenceChange("pushNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-accept">Auto-aceitar Clientes Favoritos</Label>
                        <p className="text-sm text-gray-500">
                          Aceitar automaticamente solicitações de clientes favoritos
                        </p>
                      </div>
                      <Switch
                        id="auto-accept"
                        checked={providerData.preferences.autoAcceptFavorites}
                        onCheckedChange={(checked) => handlePreferenceChange("autoAcceptFavorites", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Disponibilidade */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Horários de Disponibilidade</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(providerData.availability).map(([day, schedule]) => (
                      <div key={day} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-20">
                            <Label className="capitalize">
                              {day === "monday"
                                ? "Segunda"
                                : day === "tuesday"
                                  ? "Terça"
                                  : day === "wednesday"
                                    ? "Quarta"
                                    : day === "thursday"
                                      ? "Quinta"
                                      : day === "friday"
                                        ? "Sexta"
                                        : day === "saturday"
                                          ? "Sábado"
                                          : "Domingo"}
                            </Label>
                          </div>
                          <Switch
                            checked={schedule.available}
                            onCheckedChange={(checked) => {
                              setProviderData((prev) => ({
                                ...prev,
                                availability: {
                                  ...prev.availability,
                                  [day]: { ...schedule, available: checked },
                                },
                              }))
                            }}
                          />
                        </div>
                        {schedule.available && (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="time"
                              value={schedule.start}
                              onChange={(e) => {
                                setProviderData((prev) => ({
                                  ...prev,
                                  availability: {
                                    ...prev.availability,
                                    [day]: { ...schedule, start: e.target.value },
                                  },
                                }))
                              }}
                              className="w-24"
                            />
                            <span>às</span>
                            <Input
                              type="time"
                              value={schedule.end}
                              onChange={(e) => {
                                setProviderData((prev) => ({
                                  ...prev,
                                  availability: {
                                    ...prev.availability,
                                    [day]: { ...schedule, end: e.target.value },
                                  },
                                }))
                              }}
                              className="w-24"
                            />
                          </div>
                        )}
                      </div>
                    ))}
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
                      <span className="text-gray-600">Serviços Realizados</span>
                      <span className="font-semibold">{stats.completedServices}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Avaliação Média</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold">{stats.averageRating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total de Ganhos</span>
                      <span className="font-semibold">R$ {stats.totalEarnings.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Taxa de Aceitação</span>
                      <span className="font-semibold text-green-600">{stats.acceptanceRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Tempo de Resposta</span>
                      <span className="font-semibold text-blue-600">{stats.responseTime}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certificações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Identidade Verificada</p>
                        <p className="text-sm text-gray-500">Documento confirmado</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Telefone Verificado</p>
                        <p className="text-sm text-gray-500">Número confirmado</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">E-mail Verificado</p>
                        <p className="text-sm text-gray-500">Endereço confirmado</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modais */}
        <Dialog open={showProposalModal} onOpenChange={setShowProposalModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enviar Proposta</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSendProposal} className="space-y-4">
              <div>
                <Label htmlFor="price">Preço</Label>
                <Input
                  type="number"
                  id="price"
                  placeholder="R$ 0,00"
                  value={proposalData.price}
                  onChange={(e) => setProposalData({ ...proposalData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Detalhe sua proposta..."
                  value={proposalData.description}
                  onChange={(e) => setProposalData({ ...proposalData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="estimatedTime">Tempo Estimado</Label>
                  <Input
                    type="text"
                    id="estimatedTime"
                    placeholder="Ex: 2 horas"
                    value={proposalData.estimatedTime}
                    onChange={(e) => setProposalData({ ...proposalData, estimatedTime: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Data de Início</Label>
                  <Input
                    type="date"
                    id="startDate"
                    value={proposalData.startDate}
                    onChange={(e) => setProposalData({ ...proposalData, startDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="materials">Materiais (Opcional)</Label>
                <Input
                  type="text"
                  id="materials"
                  placeholder="Lista de materiais..."
                  value={proposalData.materials}
                  onChange={(e) => setProposalData({ ...proposalData, materials: e.target.value })}
                />
              </div>
              <Button type="submit">Enviar Proposta</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agendar Serviço</DialogTitle>
            </DialogHeader>
            <Card>
              <CardContent>
                <FullCalendar
                  events={calendarEvents}
                  onDateSelect={handleDateSelect}
                  onEventClick={handleEventClick}
                  height={400}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>

        <Dialog open={showNotificationsModal} onOpenChange={setShowNotificationsModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notificações</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`border-1 rounded-lg ${getNotificationColor(notification.type, notification.urgent)}`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">{notification.time}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

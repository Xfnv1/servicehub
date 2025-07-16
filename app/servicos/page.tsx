"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { SimpleCalendar } from "@/components/ui/simple-calendar"
import { toast } from "@/hooks/use-toast"
import {
  Search,
  Star,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  CalendarIcon,
  Heart,
  CheckCircle,
  Send,
  User,
  Briefcase,
  Shield,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// Interfaces
interface Provider {
  id: string
  name: string
  service: string
  category: string
  rating: number
  reviews: number
  price: string
  avatar: string
  verified: boolean
  responseTime: string
  completedJobs: number
  location: string
  distance: string
  specialties: string[]
  description: string
  joinedYear: number
  lat: number
  lng: number
  availability: {
    [key: string]: { available: boolean; slots: string[] }
  }
}

interface ChatMessage {
  id: string
  sender: "user" | "provider"
  message: string
  timestamp: Date
}

interface ActiveChat {
  providerId: string
  providerName: string
  messages: ChatMessage[]
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState("all")
  const [minRating, setMinRating] = useState(0)
  const [maxDistance, setMaxDistance] = useState(50)
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [responseTime, setResponseTime] = useState("all")
  const [minJobs, setMinJobs] = useState(0)
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [availableToday, setAvailableToday] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [showHireModal, setShowHireModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [activeChats, setActiveChats] = useState<ActiveChat[]>([])
  const [currentChatMessage, setCurrentChatMessage] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const mapRef = useRef<HTMLDivElement>(null)

  const [hireData, setHireData] = useState({
    serviceDescription: "",
    estimatedBudget: "",
    preferredDate: "",
    additionalNotes: "",
    urgency: "normal",
  })

  const [scheduleData, setScheduleData] = useState({
    serviceDescription: "",
    estimatedDuration: "",
    notes: "",
  })

  // Dados simulados de prestadores
  const providers: Provider[] = [
    {
      id: "1",
      name: "Maria Silva",
      service: "Limpeza Residencial",
      category: "limpeza",
      rating: 4.9,
      reviews: 127,
      price: "R$ 80/h",
      avatar: "MS",
      verified: true,
      responseTime: "< 1h",
      completedJobs: 156,
      location: "Vila Madalena, São Paulo",
      distance: "2.3 km",
      specialties: ["Limpeza Pesada", "Organização", "Limpeza Pós-Obra"],
      description:
        "Profissional experiente em limpeza residencial com mais de 8 anos no mercado. Especializada em limpeza pesada e organização.",
      joinedYear: 2018,
      lat: -23.5505,
      lng: -46.6333,
      availability: {
        "2024-01-20": { available: true, slots: ["09:00", "14:00", "16:00"] },
        "2024-01-21": { available: true, slots: ["08:00", "10:00", "15:00"] },
        "2024-01-22": { available: true, slots: ["09:00", "13:00"] },
      },
    },
    {
      id: "2",
      name: "João Santos",
      service: "Reparos Gerais",
      category: "reparos",
      rating: 4.7,
      reviews: 89,
      price: "R$ 120/h",
      avatar: "JS",
      verified: true,
      responseTime: "< 2h",
      completedJobs: 94,
      location: "Pinheiros, São Paulo",
      distance: "3.1 km",
      specialties: ["Elétrica", "Hidráulica", "Marcenaria"],
      description:
        "Técnico especializado em reparos residenciais e comerciais. Atendimento rápido e qualidade garantida.",
      joinedYear: 2019,
      lat: -23.5629,
      lng: -46.7006,
      availability: {
        "2024-01-20": { available: true, slots: ["10:00", "15:00"] },
        "2024-01-21": { available: true, slots: ["09:00", "14:00", "17:00"] },
        "2024-01-23": { available: true, slots: ["08:00", "11:00", "16:00"] },
      },
    },
    {
      id: "3",
      name: "Ana Costa",
      service: "Manicure e Pedicure",
      category: "beleza",
      rating: 4.8,
      reviews: 203,
      price: "R$ 60/sessão",
      avatar: "AC",
      verified: true,
      responseTime: "< 30min",
      completedJobs: 312,
      location: "Jardins, São Paulo",
      distance: "1.8 km",
      specialties: ["Manicure", "Pedicure", "Nail Art"],
      description:
        "Manicure profissional com certificação. Atendimento domiciliar com todos os equipamentos necessários.",
      joinedYear: 2017,
      lat: -23.5613,
      lng: -46.6565,
      availability: {
        "2024-01-20": { available: true, slots: ["11:00", "14:00", "17:00"] },
        "2024-01-21": { available: true, slots: ["10:00", "13:00", "16:00"] },
        "2024-01-22": { available: true, slots: ["09:00", "15:00"] },
      },
    },
    {
      id: "4",
      name: "Pedro Oliveira",
      service: "Professor Particular",
      category: "educacao",
      rating: 4.9,
      reviews: 78,
      price: "R$ 50/h",
      avatar: "PO",
      verified: false,
      responseTime: "< 30min",
      completedJobs: 203,
      location: "Centro, São Paulo",
      distance: "4.2 km",
      specialties: ["Matemática", "Física", "Química"],
      description: "Professor de matemática e ciências com 10 anos de experiência. Aulas presenciais e online.",
      joinedYear: 2020,
      lat: -23.5505,
      lng: -46.6333,
      availability: {
        "2024-01-20": { available: true, slots: ["19:00", "20:00"] },
        "2024-01-21": { available: true, slots: ["18:00", "19:00", "20:00"] },
        "2024-01-22": { available: true, slots: ["19:00"] },
      },
    },
    {
      id: "5",
      name: "Carlos Mendes",
      service: "Pintura Residencial",
      category: "pintura",
      rating: 5.0,
      reviews: 45,
      price: "R$ 150/dia",
      avatar: "CM",
      verified: true,
      responseTime: "< 3h",
      completedJobs: 67,
      location: "Moema, São Paulo",
      distance: "2.7 km",
      specialties: ["Pintura Interna", "Pintura Externa", "Textura"],
      description: "Pintor profissional com especialização em acabamentos. Trabalho limpo e pontual.",
      joinedYear: 2021,
      lat: -23.6024,
      lng: -46.6645,
      availability: {
        "2024-01-22": { available: true, slots: ["08:00", "13:00"] },
        "2024-01-23": { available: true, slots: ["08:00", "14:00"] },
        "2024-01-24": { available: true, slots: ["09:00"] },
      },
    },
    {
      id: "6",
      name: "Lucia Fernandes",
      service: "Jardinagem",
      category: "jardinagem",
      rating: 4.6,
      reviews: 92,
      price: "R$ 90/h",
      avatar: "LF",
      verified: true,
      responseTime: "< 4h",
      completedJobs: 128,
      location: "Vila Olímpia, São Paulo",
      distance: "3.5 km",
      specialties: ["Poda", "Paisagismo", "Manutenção"],
      description: "Jardineira com curso técnico em paisagismo. Cuidado especializado para plantas e jardins.",
      joinedYear: 2019,
      lat: -23.5955,
      lng: -46.6856,
      availability: {
        "2024-01-20": { available: true, slots: ["07:00", "15:00"] },
        "2024-01-21": { available: true, slots: ["07:00", "14:00"] },
        "2024-01-23": { available: true, slots: ["08:00", "16:00"] },
      },
    },
  ]

  const categories = [
    { value: "all", label: "Todas as Categorias", count: providers.length },
    { value: "limpeza", label: "Limpeza", count: providers.filter(p => p.category === "limpeza").length },
    { value: "reparos", label: "Reparos", count: providers.filter(p => p.category === "reparos").length },
    { value: "beleza", label: "Beleza", count: providers.filter(p => p.category === "beleza").length },
    { value: "educacao", label: "Educação", count: providers.filter(p => p.category === "educacao").length },
    { value: "pintura", label: "Pintura", count: providers.filter(p => p.category === "pintura").length },
    { value: "jardinagem", label: "Jardinagem", count: providers.filter(p => p.category === "jardinagem").length },
  ]

  const allSpecialties = Array.from(new Set(providers.flatMap(p => p.specialties)))
  const allLocations = Array.from(new Set(providers.map(p => p.location.split(', ')[1] || p.location)))

  const responseTimeOptions = [
    { value: "all", label: "Qualquer tempo" },
    { value: "30min", label: "Até 30 minutos" },
    { value: "1h", label: "Até 1 hora" },
    { value: "2h", label: "Até 2 horas" },
    { value: "4h", label: "Até 4 horas" },
  ]

  // Filtrar e ordenar prestadores
  const filteredProviders = providers
    .filter((provider) => {
      // Busca por texto
      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))

      // Categoria
      const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory

      // Faixa de preço (legacy)
      const matchesPriceRange = (() => {
        if (priceRange === "all") return true
        const price = Number.parseInt(provider.price.replace(/\D/g, ""))
        switch (priceRange) {
          case "low": return price <= 50
          case "medium": return price > 50 && price <= 100
          case "high": return price > 100
          default: return true
        }
      })()

      // Preço customizado
      const matchesCustomPrice = (() => {
        if (!priceMin && !priceMax) return true
        const price = Number.parseInt(provider.price.replace(/\D/g, ""))
        const min = priceMin ? Number.parseInt(priceMin) : 0
        const max = priceMax ? Number.parseInt(priceMax) : Number.POSITIVE_INFINITY
        return price >= min && price <= max
      })()

      // Avaliação mínima
      const matchesRating = provider.rating >= minRating

      // Distância máxima
      const matchesDistance = Number.parseFloat(provider.distance) <= maxDistance

      // Online apenas
      const matchesOnline = !onlineOnly || (provider as any).online !== false

      // Verificado apenas
      const matchesVerified = !verifiedOnly || provider.verified

      // Tempo de resposta
      const matchesResponseTime = (() => {
        if (responseTime === "all") return true
        const providerTime = provider.responseTime
        switch (responseTime) {
          case "30min": return providerTime.includes("30min") || providerTime.includes("< 30min")
          case "1h": return providerTime.includes("1h") || providerTime.includes("< 1h") || providerTime.includes("30min")
          case "2h": return !providerTime.includes("3h") && !providerTime.includes("4h")
          case "4h": return !providerTime.includes("24h")
          default: return true
        }
      })()

      // Trabalhos mínimos
      const matchesJobs = provider.completedJobs >= minJobs

      // Especialidades
      const matchesSpecialties = selectedSpecialties.length === 0 || 
        selectedSpecialties.some(specialty => provider.specialties.includes(specialty))

      // Localização
      const matchesLocation = !selectedLocation || selectedLocation === "all" || provider.location.includes(selectedLocation)

      // Disponível hoje
      const matchesAvailableToday = (() => {
        if (!availableToday) return true
        const today = new Date().toISOString().split('T')[0]
        return provider.availability[today]?.available || false
      })()

      return matchesSearch && matchesCategory && matchesPriceRange && matchesCustomPrice && 
             matchesRating && matchesDistance && matchesOnline && matchesVerified && 
             matchesResponseTime && matchesJobs && matchesSpecialties && matchesLocation && 
             matchesAvailableToday
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating": return b.rating - a.rating
        case "price": return Number.parseInt(a.price.replace(/\D/g, "")) - Number.parseInt(b.price.replace(/\D/g, ""))
        case "distance": return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
        case "reviews": return b.reviews - a.reviews
        case "jobs": return b.completedJobs - a.completedJobs
        case "newest": return b.joinedYear - a.joinedYear
        case "response": return a.responseTime.localeCompare(b.responseTime)
        default: return b.rating - a.rating
      }
    })

  useEffect(() => {
    // Import Leaflet CSS
    if (typeof window !== "undefined") {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      document.head.appendChild(link)
    }
  }, [])

  // Inicializar mapa
  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !map) {
      // Dynamic import for Leaflet
      import("leaflet")
        .then((L) => {
          // Fix para ícones do Leaflet
          delete (L.Icon.Default.prototype as any)._getIconUrl
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          })

          const mapInstance = L.map(mapRef.current!).setView([-23.5505, -46.6333], 12)

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(mapInstance)

          setMap(mapInstance)

          // Obter localização do usuário
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userPos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                }
                setUserLocation(userPos)

                // Adicionar marcador do usuário
                const userIcon = L.divIcon({
                  html: '<div style="background-color: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                  iconSize: [20, 20],
                  className: "user-location-marker",
                })

                L.marker([userPos.lat, userPos.lng], { icon: userIcon }).addTo(mapInstance).bindPopup("Sua localização")
              },
              (error) => {
                console.log("Erro ao obter localização:", error)
              },
            )
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar Leaflet:", error)
        })
    }
  }, [map])

  // Atualizar marcadores do mapa
  useEffect(() => {
    if (map) {
      // Dynamic import for Leaflet
      import("leaflet")
        .then((L) => {
          // Remover marcadores existentes
          markers.forEach((marker) => map.removeLayer(marker))

          // Adicionar novos marcadores
          const newMarkers = filteredProviders.map((provider) => {
            const markerIcon = L.divIcon({
              html: `
            <div style="
              background-color: ${provider.verified ? "#10b981" : "#6b7280"}; 
              width: 30px; 
              height: 30px; 
              border-radius: 50%; 
              border: 3px solid white; 
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 12px;
            ">
              ${provider.verified ? "✓" : "?"}
            </div>
          `,
              iconSize: [30, 30],
              className: "provider-marker",
            })

            const marker = L.marker([provider.lat, provider.lng], { icon: markerIcon }).addTo(map)

            marker.bindPopup(`
          <div style="min-width: 200px;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <div style="
                width: 40px; 
                height: 40px; 
                border-radius: 50%; 
                background-color: #3b82f6; 
                color: white; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-weight: bold; 
                margin-right: 12px;
              ">
                ${provider.avatar}
              </div>
              <div>
                <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${provider.name}</h3>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">${provider.service}</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <span style="color: #fbbf24; margin-right: 4px;">★</span>
              <span style="font-weight: bold; margin-right: 8px;">${provider.rating}</span>
              <span style="color: #6b7280; font-size: 14px;">(${provider.reviews} avaliações)</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-weight: bold; color: #059669;">${provider.price}</span>
              <span style="color: #6b7280; font-size: 14px;">${provider.distance}</span>
            </div>
            
            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button 
                onclick="window.openChat('${provider.id}')" 
                style="
                  flex: 1; 
                  background-color: #3b82f6; 
                  color: white; 
                  border: none; 
                  padding: 6px 12px; 
                  border-radius: 4px; 
                  cursor: pointer; 
                  font-size: 12px;
                "
              >
                Chat
              </button>
              <button 
                onclick="window.openHire('${provider.id}')" 
                style="
                  flex: 1; 
                  background-color: #059669; 
                  color: white; 
                  border: none; 
                  padding: 6px 12px; 
                  border-radius: 4px; 
                  cursor: pointer; 
                  font-size: 12px;
                "
              >
                Contratar
              </button>
            </div>
          </div>
        `)

            return marker
          })

          setMarkers(newMarkers)
        })
        .catch((error) => {
          console.error("Erro ao carregar Leaflet para marcadores:", error)
        })
    }
  }, [map, filteredProviders])

  // Funções globais para os botões do mapa
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).openChat = (providerId: string) => {
        const provider = providers.find((p) => p.id === providerId)
        if (provider) {
          setSelectedProvider(provider)
          setShowChatModal(true)
        }
      }
      ;(window as any).openHire = (providerId: string) => {
        const provider = providers.find((p) => p.id === providerId)
        if (provider) {
          setSelectedProvider(provider)
          setShowHireModal(true)
        }
      }
    }
  }, [providers])

  // Funções de chat
  const getCurrentChat = () => {
    if (!selectedProvider) return null
    return activeChats.find((chat) => chat.providerId === selectedProvider.id)
  }

  const sendMessage = () => {
    if (!selectedProvider || !currentChatMessage.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      message: currentChatMessage,
      timestamp: new Date(),
    }

    setActiveChats((prev) => {
      const existingChatIndex = prev.findIndex((chat) => chat.providerId === selectedProvider.id)

      if (existingChatIndex >= 0) {
        const updatedChats = [...prev]
        updatedChats[existingChatIndex].messages.push(newMessage)
        return updatedChats
      } else {
        return [
          ...prev,
          {
            providerId: selectedProvider.id,
            providerName: selectedProvider.name,
            messages: [newMessage],
          },
        ]
      }
    })

    setCurrentChatMessage("")

    // Simular resposta automática do prestador
    setTimeout(
      () => {
        const responses = [
          "Olá! Como posso ajudá-lo?",
          "Fico feliz em conversar com você! Em que posso ser útil?",
          "Obrigado pelo contato! Vamos conversar sobre seu projeto?",
          "Olá! Estou disponível para esclarecer suas dúvidas.",
          "Oi! Que bom que entrou em contato. Como posso ajudar?",
        ]

        const autoResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "provider",
          message: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        }

        setActiveChats((prev) => {
          const updatedChats = [...prev]
          const chatIndex = updatedChats.findIndex((chat) => chat.providerId === selectedProvider.id)
          if (chatIndex >= 0) {
            updatedChats[chatIndex].messages.push(autoResponse)
          }
          return updatedChats
        })
      },
      1000 + Math.random() * 2000,
    ) // Resposta entre 1-3 segundos
  }

  const handleHire = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Solicitação enviada!",
      description: `Sua solicitação foi enviada para ${selectedProvider?.name}. Você receberá uma resposta em breve.`,
    })
    setShowHireModal(false)
    setHireData({
      serviceDescription: "",
      estimatedBudget: "",
      preferredDate: "",
      additionalNotes: "",
      urgency: "normal",
    })
  }

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma data e horário.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Agendamento confirmado!",
      description: `Agendamento marcado com ${selectedProvider?.name} para ${selectedDate.toLocaleDateString()} às ${selectedTimeSlot}.`,
    })

    // Adicionar mensagem automática no chat
    if (selectedProvider) {
      const scheduleMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "user",
        message: `Agendamento confirmado para ${selectedDate.toLocaleDateString()} às ${selectedTimeSlot}. Serviço: ${scheduleData.serviceDescription}`,
        timestamp: new Date(),
      }

      setActiveChats((prev) => {
        const existingChatIndex = prev.findIndex((chat) => chat.providerId === selectedProvider.id)

        if (existingChatIndex >= 0) {
          const updatedChats = [...prev]
          updatedChats[existingChatIndex].messages.push(scheduleMessage)
          return updatedChats
        } else {
          return [
            ...prev,
            {
              providerId: selectedProvider.id,
              providerName: selectedProvider.name,
              messages: [scheduleMessage],
            },
          ]
        }
      })

      // Resposta automática do prestador
      setTimeout(() => {
        const confirmationMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "provider",
          message: "Perfeito! Agendamento confirmado. Estarei lá no horário combinado. Obrigado!",
          timestamp: new Date(),
        }

        setActiveChats((prev) => {
          const updatedChats = [...prev]
          const chatIndex = updatedChats.findIndex((chat) => chat.providerId === selectedProvider.id)
          if (chatIndex >= 0) {
            updatedChats[chatIndex].messages.push(confirmationMessage)
          }
          return updatedChats
        })
      }, 1500)
    }

    setShowScheduleModal(false)
    setScheduleData({
      serviceDescription: "",
      estimatedDuration: "",
      notes: "",
    })
  }

  const getAvailableSlots = () => {
    if (!selectedProvider || !selectedDate) return []

    const dateKey = selectedDate.toISOString().split("T")[0]
    const availability = selectedProvider.availability[dateKey]

    return availability?.available ? availability.slots : []
  }

  const currentChat = getCurrentChat()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Header da página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Encontre Prestadores de Serviços</h1>
          <p className="text-gray-600">Conecte-se com profissionais qualificados na sua região</p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          {/* Filtros Avançados */}
          <div className="bg-white rounded-lg shadow-sm border mb-8">
            {/* Filtros Básicos */}
            <div className="p-6 border-b">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar serviços ou prestadores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevância</SelectItem>
                    <SelectItem value="rating">Melhor Avaliação</SelectItem>
                    <SelectItem value="price">Menor Preço</SelectItem>
                    <SelectItem value="distance">Mais Próximo</SelectItem>
                    <SelectItem value="reviews">Mais Avaliações</SelectItem>
                    <SelectItem value="jobs">Mais Trabalhos</SelectItem>
                    <SelectItem value="newest">Mais Recente</SelectItem>
                    <SelectItem value="response">Resposta Rápida</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={showAdvancedFilters ? "default" : "outline"}
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center justify-center"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros Avançados
                  {showAdvancedFilters ? (
                    <ChevronUp className="w-4 h-4 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-2" />
                  )}
                </Button>
              </div>
            </div>

            {/* Filtros Avançados */}
            {showAdvancedFilters && (
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Preço Customizado */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Faixa de Preço (R$)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Mín"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        type="number"
                        className="flex-1"
                      />
                      <span className="text-gray-500">até</span>
                      <Input
                        placeholder="Máx"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        type="number"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Avaliação Mínima */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Avaliação Mínima</Label>
                    <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Qualquer avaliação</SelectItem>
                        <SelectItem value="3">3+ estrelas</SelectItem>
                        <SelectItem value="4">4+ estrelas</SelectItem>
                        <SelectItem value="4.5">4.5+ estrelas</SelectItem>
                        <SelectItem value="4.8">4.8+ estrelas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Distância Máxima */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Distância Máxima</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Até {maxDistance} km</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={maxDistance}
                        onChange={(e) => setMaxDistance(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Tempo de Resposta */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tempo de Resposta</Label>
                    <Select value={responseTime} onValueChange={setResponseTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {responseTimeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Trabalhos Mínimos */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Trabalhos Completados</Label>
                    <Select value={minJobs.toString()} onValueChange={(value) => setMinJobs(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Qualquer quantidade</SelectItem>
                        <SelectItem value="10">10+ trabalhos</SelectItem>
                        <SelectItem value="50">50+ trabalhos</SelectItem>
                        <SelectItem value="100">100+ trabalhos</SelectItem>
                        <SelectItem value="200">200+ trabalhos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Localização */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Localização</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as regiões" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as regiões</SelectItem>
                        {allLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Especialidades */}
                <div className="mt-6 space-y-2">
                  <Label className="text-sm font-medium">Especialidades</Label>
                  <div className="flex flex-wrap gap-2">
                    {allSpecialties.map((specialty) => (
                      <Button
                        key={specialty}
                        variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedSpecialties(prev => 
                            prev.includes(specialty) 
                              ? prev.filter(s => s !== specialty)
                              : [...prev, specialty]
                          )
                        }}
                        className="text-xs"
                      >
                        {specialty}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Filtros Booleanos */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="verifiedOnly"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="verifiedOnly" className="text-sm">Apenas verificados</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="onlineOnly"
                      checked={onlineOnly}
                      onChange={(e) => setOnlineOnly(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="onlineOnly" className="text-sm">Apenas online</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="availableToday"
                      checked={availableToday}
                      onChange={(e) => setAvailableToday(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="availableToday" className="text-sm">Disponível hoje</Label>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="mt-6 flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                      setPriceRange("all")
                      setMinRating(0)
                      setMaxDistance(50)
                      setOnlineOnly(false)
                      setVerifiedOnly(false)
                      setResponseTime("all")
                      setMinJobs(0)
                      setSelectedSpecialties([])
                      setSelectedLocation("all")
                      setAvailableToday(false)
                      setPriceMin("")
                      setPriceMax("")
                    }}
                  >
                    Limpar Filtros
                  </Button>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{filteredProviders.length} prestadores encontrados</span>
                    {(verifiedOnly || onlineOnly || availableToday || selectedSpecialties.length > 0) && (
                      <div className="flex items-center space-x-2">
                        <span>Filtros ativos:</span>
                        <div className="flex space-x-1">
                          {verifiedOnly && <Badge variant="secondary" className="text-xs">Verificados</Badge>}
                          {onlineOnly && <Badge variant="secondary" className="text-xs">Online</Badge>}
                          {availableToday && <Badge variant="secondary" className="text-xs">Hoje</Badge>}
                          {selectedSpecialties.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {selectedSpecialties.length} especialidade{selectedSpecialties.length > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Prestadores */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredProviders.length} prestadores encontrados
              </h2>
            </div>

            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={provider.name} />
                        <AvatarFallback className="bg-blue-500 text-white text-lg font-semibold">
                          {provider.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {provider.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                            {provider.verified && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                Verificado
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{provider.service}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">
                              {provider.rating} ({provider.reviews} avaliações)
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">{provider.price}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-gray-600 text-sm line-clamp-2">{provider.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {provider.specialties.slice(0, 3).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {provider.specialties.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{provider.specialties.length - 3} mais
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {provider.distance}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Responde em {provider.responseTime}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {provider.completedJobs} trabalhos
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            Desde {provider.joinedYear}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedProvider(provider)
                            setShowChatModal(true)
                          }}
                          className="flex-1"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const phone = "11999999999" // Número simulado
                            window.open(`tel:${phone}`, "_self")
                          }}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Ligar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedProvider(provider)
                            setShowHireModal(true)
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          Contratar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredProviders.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum prestador encontrado</h3>
                  <p className="text-gray-600">Tente ajustar os filtros ou buscar por outros termos.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Mapa */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Mapa dos Prestadores</CardTitle>
              </CardHeader>
              <CardContent>
                <div ref={mapRef} className="w-full h-96 rounded-lg" style={{ zIndex: 1 }}></div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                    <span>Sua localização</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                    <span>Prestador verificado</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-4 h-4 bg-gray-500 rounded-full mr-2"></div>
                    <span>Prestador não verificado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal de Chat */}
        <Dialog open={showChatModal} onOpenChange={setShowChatModal}>
          <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-blue-500 text-white">{selectedProvider?.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span>{selectedProvider?.name}</span>
                    {selectedProvider?.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </div>
                  <p className="text-sm text-gray-500 font-normal">{selectedProvider?.service}</p>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 flex flex-col min-h-0">
              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg max-h-80">
                {currentChat?.messages.length === 0 || !currentChat ? (
                  <div className="text-center text-gray-500 py-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Inicie uma conversa com {selectedProvider?.name}</p>
                  </div>
                ) : (
                  currentChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.sender === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-900 border"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input de mensagem */}
              <div className="flex items-center space-x-2 mt-4">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={currentChatMessage}
                  onChange={(e) => setCurrentChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Botões de ação */}
              <div className="flex space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowChatModal(false)
                    setShowScheduleModal(true)
                  }}
                  className="flex-1"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Agendar
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setShowChatModal(false)
                    setShowHireModal(true)
                  }}
                  className="flex-1"
                >
                  Contratar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Contratação */}
        <Dialog open={showHireModal} onOpenChange={setShowHireModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Contratar {selectedProvider?.name}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleHire} className="space-y-4">
              <div>
                <Label htmlFor="serviceDescription">Descrição do Serviço *</Label>
                <Textarea
                  id="serviceDescription"
                  placeholder="Descreva detalhadamente o que você precisa..."
                  value={hireData.serviceDescription}
                  onChange={(e) => setHireData({ ...hireData, serviceDescription: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="estimatedBudget">Orçamento Estimado</Label>
                <Input
                  id="estimatedBudget"
                  placeholder="R$ 150,00"
                  value={hireData.estimatedBudget}
                  onChange={(e) => setHireData({ ...hireData, estimatedBudget: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="preferredDate">Data Preferida</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={hireData.preferredDate}
                  onChange={(e) => setHireData({ ...hireData, preferredDate: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="urgency">Urgência</Label>
                <Select
                  value={hireData.urgency}
                  onValueChange={(value) => setHireData({ ...hireData, urgency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa - Até 1 semana</SelectItem>
                    <SelectItem value="normal">Normal - Até 3 dias</SelectItem>
                    <SelectItem value="alta">Alta - Até 24h</SelectItem>
                    <SelectItem value="urgente">Urgente - Hoje</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="additionalNotes">Observações Adicionais</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Informações extras, endereço, horário preferido..."
                  value={hireData.additionalNotes}
                  onChange={(e) => setHireData({ ...hireData, additionalNotes: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-500 text-white">{selectedProvider?.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900">{selectedProvider?.name}</h4>
                    <p className="text-sm text-blue-700">{selectedProvider?.service}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-blue-700 ml-1">
                        {selectedProvider?.rating} • {selectedProvider?.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowHireModal(false)
                    setShowChatModal(true)
                  }}
                  className="flex-1"
                >
                  Conversar Primeiro
                </Button>
                <Button type="submit" className="flex-1">
                  Enviar Solicitação
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Modal de Agendamento */}
        <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agendar com {selectedProvider?.name}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSchedule} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendário */}
                <div>
                  <Label>Selecione uma Data</Label>
                  <SimpleCalendar
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const dateKey = date.toISOString().split("T")[0]
                      const availability = selectedProvider?.availability[dateKey]
                      return !availability?.available || date < new Date()
                    }}
                    className="mt-2"
                  />
                </div>

                {/* Horários disponíveis */}
                <div>
                  <Label>Horários Disponíveis</Label>
                  <div className="mt-2 space-y-2">
                    {selectedDate ? (
                      getAvailableSlots().length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {getAvailableSlots().map((slot) => (
                            <Button
                              key={slot}
                              type="button"
                              variant={selectedTimeSlot === slot ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className="justify-center"
                            >
                              {slot}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 py-4">Nenhum horário disponível para esta data</p>
                      )
                    ) : (
                      <p className="text-sm text-gray-500 py-4">Selecione uma data para ver os horários</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="scheduleServiceDescription">Descrição do Serviço *</Label>
                <Textarea
                  id="scheduleServiceDescription"
                  placeholder="Descreva o que você precisa..."
                  value={scheduleData.serviceDescription}
                  onChange={(e) => setScheduleData({ ...scheduleData, serviceDescription: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="estimatedDuration">Duração Estimada</Label>
                <Select
                  value={scheduleData.estimatedDuration}
                  onValueChange={(value) => setScheduleData({ ...scheduleData, estimatedDuration: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a duração" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hora</SelectItem>
                    <SelectItem value="2h">2 horas</SelectItem>
                    <SelectItem value="3h">3 horas</SelectItem>
                    <SelectItem value="4h">4 horas</SelectItem>
                    <SelectItem value="meio-dia">Meio período</SelectItem>
                    <SelectItem value="dia-todo">Dia todo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="scheduleNotes">Observações</Label>
                <Textarea
                  id="scheduleNotes"
                  placeholder="Endereço, instruções especiais, etc..."
                  value={scheduleData.notes}
                  onChange={(e) => setScheduleData({ ...scheduleData, notes: e.target.value })}
                  rows={2}
                />
              </div>

              {selectedDate && selectedTimeSlot && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Resumo do Agendamento</h4>
                  <div className="space-y-1 text-sm text-green-800">
                    <p>
                      <strong>Prestador:</strong> {selectedProvider?.name}
                    </p>
                    <p>
                      <strong>Serviço:</strong> {selectedProvider?.service}
                    </p>
                    <p>
                      <strong>Data:</strong> {selectedDate.toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Horário:</strong> {selectedTimeSlot}
                    </p>
                    <p>
                      <strong>Preço:</strong> {selectedProvider?.price}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Button type="button" variant="outline" onClick={() => setShowScheduleModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" disabled={!selectedDate || !selectedTimeSlot}>
                  Confirmar Agendamento
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  )
}

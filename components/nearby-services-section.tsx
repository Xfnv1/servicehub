"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Filter, Users, Navigation } from "lucide-react"

// Dados dos prestadores por estado
const prestadoresPorEstado = {
  "São Paulo": [
    {
      id: 1,
      name: "Maria Silva",
      service: "Limpeza Residencial",
      location: "São Paulo, SP",
      rating: 4.9,
      reviews: 127,
      price: "R$ 80/h",
      distance: "2.1 km",
      verified: true,
      lat: -23.5505,
      lng: -46.6333,
      phone: "(11) 99999-1234",
      description: "Especialista em limpeza residencial com mais de 5 anos de experiência",
    },
    {
      id: 2,
      name: "Carlos Mendes",
      service: "Pintura Residencial",
      location: "São Paulo, SP",
      rating: 5.0,
      reviews: 203,
      price: "R$ 95/h",
      distance: "1.8 km",
      verified: true,
      lat: -23.5489,
      lng: -46.6388,
      phone: "(11) 99999-5678",
      description: "Pintor profissional com trabalhos em residências e comércios",
    },
  ],
  "Rio de Janeiro": [
    {
      id: 3,
      name: "João Santos",
      service: "Reparos Gerais",
      location: "Rio de Janeiro, RJ",
      rating: 4.7,
      reviews: 89,
      price: "R$ 120/h",
      distance: "3.5 km",
      verified: true,
      lat: -22.9068,
      lng: -43.1729,
      phone: "(21) 99999-9012",
      description: "Especialista em reparos elétricos, hidráulicos e marcenaria",
    },
  ],
  "Minas Gerais": [
    {
      id: 4,
      name: "Ana Costa",
      service: "Manicure e Pedicure",
      location: "Belo Horizonte, MG",
      rating: 4.8,
      reviews: 156,
      price: "R$ 60/h",
      distance: "1.2 km",
      verified: true,
      lat: -19.9167,
      lng: -43.9345,
      phone: "(31) 99999-3456",
      description: "Profissional de beleza com atendimento domiciliar",
    },
  ],
  Bahia: [
    {
      id: 5,
      name: "Pedro Oliveira",
      service: "Professor Particular",
      location: "Salvador, BA",
      rating: 4.9,
      reviews: 78,
      price: "R$ 50/h",
      distance: "2.8 km",
      verified: false,
      lat: -12.9714,
      lng: -38.5014,
      phone: "(71) 99999-7890",
      description: "Professor de matemática e física para ensino médio",
    },
  ],
  Paraná: [
    {
      id: 6,
      name: "Lucia Fernandes",
      service: "Jardinagem",
      location: "Curitiba, PR",
      rating: 4.6,
      reviews: 92,
      price: "R$ 70/h",
      distance: "4.1 km",
      verified: true,
      lat: -25.4284,
      lng: -49.2733,
      phone: "(41) 99999-2468",
      description: "Especialista em paisagismo e manutenção de jardins",
    },
  ],
}

// Estados brasileiros com coordenadas
const estadosBrasil = {
  Acre: { lat: -8.77, lng: -70.55 },
  Alagoas: { lat: -9.71, lng: -35.73 },
  Amapá: { lat: 1.41, lng: -51.77 },
  Amazonas: { lat: -3.07, lng: -61.66 },
  Bahia: { lat: -12.96, lng: -38.51 },
  Ceará: { lat: -3.71, lng: -38.54 },
  "Distrito Federal": { lat: -15.83, lng: -47.86 },
  "Espírito Santo": { lat: -19.19, lng: -40.34 },
  Goiás: { lat: -16.64, lng: -49.31 },
  Maranhão: { lat: -2.55, lng: -44.3 },
  "Mato Grosso": { lat: -12.64, lng: -55.42 },
  "Mato Grosso do Sul": { lat: -20.51, lng: -54.54 },
  "Minas Gerais": { lat: -19.92, lng: -43.94 },
  Pará: { lat: -5.53, lng: -52.29 },
  Paraíba: { lat: -7.06, lng: -35.55 },
  Paraná: { lat: -24.89, lng: -51.55 },
  Pernambuco: { lat: -8.28, lng: -35.07 },
  Piauí: { lat: -8.28, lng: -43.68 },
  "Rio de Janeiro": { lat: -22.84, lng: -43.15 },
  "Rio Grande do Norte": { lat: -5.22, lng: -36.52 },
  "Rio Grande do Sul": { lat: -30.01, lng: -51.22 },
  Rondônia: { lat: -11.22, lng: -62.8 },
  Roraima: { lat: 1.89, lng: -61.22 },
  "Santa Catarina": { lat: -27.33, lng: -49.44 },
  "São Paulo": { lat: -23.55, lng: -46.64 },
  Sergipe: { lat: -10.9, lng: -37.07 },
  Tocantins: { lat: -10.25, lng: -48.25 },
}

export function NearbyServicesSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [filteredProviders, setFilteredProviders] = useState<any[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const mapRef = useRef<any>(null)
  const mapInstanceRef = useRef<any>(null)

  // Carregar todos os prestadores
  const allProviders = Object.values(prestadoresPorEstado).flat()

  useEffect(() => {
    setFilteredProviders(allProviders)
  }, [])

  useEffect(() => {
    const loadMap = async () => {
      if (typeof window !== "undefined") {
        try {
          // Importar Leaflet dinamicamente
          const L = (await import("leaflet")).default

          // Configurar ícones do Leaflet
          delete (L.Icon.Default.prototype as any)._getIconUrl
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          })

          if (mapRef.current && !mapInstanceRef.current) {
            // Inicializar mapa centralizado no Brasil
            const map = L.map(mapRef.current).setView([-14.235, -51.9253], 4)

            // Adicionar camada do mapa
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map)

            // Criar ícones customizados
            const verifiedIcon = L.divIcon({
              html: '<div style="background-color: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
              className: "custom-marker",
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })

            const unverifiedIcon = L.divIcon({
              html: '<div style="background-color: #f59e0b; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
              className: "custom-marker",
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })

            // Adicionar marcadores dos prestadores
            allProviders.forEach((provider) => {
              const marker = L.marker([provider.lat, provider.lng], {
                icon: provider.verified ? verifiedIcon : unverifiedIcon,
              }).addTo(map)

              // Popup com informações do prestador
              const popupContent = `
                <div style="min-width: 200px;">
                  <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${provider.name}</h3>
                  <p style="margin: 0 0 4px 0; color: #666; font-size: 14px;">${provider.service}</p>
                  <p style="margin: 0 0 8px 0; color: #888; font-size: 12px;">📍 ${provider.location}</p>
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="color: #fbbf24; margin-right: 4px;">⭐</span>
                    <span style="font-size: 14px; font-weight: bold;">${provider.rating}</span>
                    <span style="color: #888; font-size: 12px; margin-left: 4px;">(${provider.reviews} avaliações)</span>
                  </div>
                  <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #059669;">${provider.price}</p>
                  <p style="margin: 0 0 12px 0; font-size: 12px; color: #666;">${provider.description}</p>
                  <div style="display: flex; gap: 8px;">
                    <button style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">Contratar</button>
                    <button style="background: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">Chat</button>
                  </div>
                </div>
              `

              marker.bindPopup(popupContent)
            })

            mapInstanceRef.current = map
            setMapLoaded(true)
          }
        } catch (error) {
          console.error("Erro ao carregar o mapa:", error)
        }
      }
    }

    loadMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const handleFilter = () => {
    let filtered = allProviders

    if (searchTerm) {
      filtered = filtered.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.service.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedState) {
      filtered = filtered.filter((provider) => provider.location.includes(selectedState))
    }

    setFilteredProviders(filtered)

    // Centralizar mapa no estado selecionado
    if (selectedState && mapInstanceRef.current && estadosBrasil[selectedState as keyof typeof estadosBrasil]) {
      const coords = estadosBrasil[selectedState as keyof typeof estadosBrasil]
      mapInstanceRef.current.setView([coords.lat, coords.lng], 8)
    }
  }

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })

          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 12)

            // Adicionar marcador da localização do usuário
            const L = require("leaflet")
            const userIcon = L.divIcon({
              html: '<div style="background-color: #ef4444; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
              className: "user-location-marker",
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            })

            L.marker([latitude, longitude], { icon: userIcon })
              .addTo(mapInstanceRef.current)
              .bindPopup("📍 Sua localização")
              .openPopup()
          }
        },
        (error) => {
          console.error("Erro ao obter localização:", error)
        },
      )
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Descubra Serviços no Brasil</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Use nosso mapa interativo para encontrar prestadores em todo o país
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Buscar por serviço ou prestador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Cidade, Estado..."
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleFilter} className="bg-blue-600 hover:bg-blue-700 px-6">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-96 relative">
                {!mapLoaded && (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">Mapa interativo do Brasil</h3>
                      <p className="text-gray-500">Carregando mapa...</p>
                    </div>
                  </div>
                )}
                <div ref={mapRef} className="w-full h-full" />
              </div>
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Selecionar Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(estadosBrasil).map((estado) => (
                          <SelectItem key={estado} value={estado}>
                            {estado}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={handleMyLocation} className="bg-transparent">
                      <Navigation className="w-4 h-4 mr-2" />
                      Minha Localização
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      Verificado
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      Não verificado
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Prestadores */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Prestadores no Brasil
                  </h3>
                  <Badge variant="secondary">{filteredProviders.length} encontrados</Badge>
                </div>

                <div className="space-y-4">
                  {filteredProviders.slice(0, 6).map((provider) => (
                    <div key={provider.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback className="bg-blue-500 text-white text-sm">
                              {provider.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <h4 className="font-semibold text-gray-900 text-sm">{provider.name}</h4>
                              {provider.verified && (
                                <Badge className="ml-2 bg-green-100 text-green-800 text-xs">✓</Badge>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">{provider.service}</p>
                            <p className="text-gray-500 text-xs flex items-center mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {provider.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600 text-sm">{provider.price}</p>
                          <p className="text-gray-500 text-xs">{provider.distance}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 ml-1">
                            {provider.rating} ({provider.reviews})
                          </span>
                        </div>
                        <Button size="sm" className="text-xs px-3 py-1">
                          Contratar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProviders.length > 6 && (
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="w-full bg-transparent">
                      Ver Todos os Prestadores
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Filter, Users, Navigation } from "lucide-react"
import { useProviders, useBrazilianLocations } from "@/hooks/use-database"
import { Skeleton } from "@/components/ui/skeleton"

export function NearbyServicesSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const mapRef = useRef<any>(null)
  const mapInstanceRef = useRef<any>(null)

  // Use database hooks
  const { providers, loading: providersLoading } = useProviders({ state: selectedState })
  const { locations, loading: locationsLoading } = useBrazilianLocations()

  // Get unique states from locations
  const states = locations.reduce((acc, location) => {
    if (!acc.find((state) => state.name === location.state)) {
      acc.push({
        name: location.state,
        code: location.state_code,
        lat: location.latitude,
        lng: location.longitude,
      })
    }
    return acc
  }, [] as any[])

  // Filter providers based on search
  const filteredProviders = providers.filter((provider) => {
    if (!searchTerm) return true
    return (
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.profession?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.specialties?.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

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
            providers.forEach((provider) => {
              // Get coordinates from location string or use default
              const coords = locations.find(
                (loc) => provider.location?.includes(loc.city) || provider.location?.includes(loc.state),
              )

              if (coords) {
                const marker = L.marker([coords.latitude, coords.longitude], {
                  icon: provider.is_verified ? verifiedIcon : unverifiedIcon,
                }).addTo(map)

                // Popup com informações do prestador
                const popupContent = `
                  <div style="min-width: 200px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${provider.name}</h3>
                    <p style="margin: 0 0 4px 0; color: #666; font-size: 14px;">${provider.profession || "Prestador de Serviços"}</p>
                    <p style="margin: 0 0 8px 0; color: #888; font-size: 12px;">📍 ${provider.location}</p>
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                      <span style="color: #fbbf24; margin-right: 4px;">⭐</span>
                      <span style="font-size: 14px; font-weight: bold;">${provider.average_rating?.toFixed(1) || "0.0"}</span>
                      <span style="color: #888; font-size: 12px; margin-left: 4px;">(${provider.total_reviews || 0} avaliações)</span>
                    </div>
                    <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #059669;">R$ ${provider.hourly_rate?.toFixed(2) || "0,00"}/h</p>
                    <p style="margin: 0 0 12px 0; font-size: 12px; color: #666;">${provider.bio || provider.experience || "Prestador qualificado"}</p>
                    <div style="display: flex; gap: 8px;">
                      <button style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">Contratar</button>
                      <button style="background: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">Chat</button>
                    </div>
                  </div>
                `

                marker.bindPopup(popupContent)
              }
            })

            mapInstanceRef.current = map
            setMapLoaded(true)
          }
        } catch (error) {
          console.error("Erro ao carregar o mapa:", error)
        }
      }
    }

    if (!providersLoading && !locationsLoading) {
      loadMap()
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [providers, locations, providersLoading, locationsLoading])

  const handleFilter = () => {
    // Filter is handled by the search term state
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
                    {locationsLoading ? (
                      <Skeleton className="h-10 w-48" />
                    ) : (
                      <Select value={selectedState} onValueChange={setSelectedState}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Selecionar Estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state.name} value={state.name}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
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
                  {providersLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start space-x-3">
                              <Skeleton className="w-10 h-10 rounded-full" />
                              <div className="flex-1">
                                <Skeleton className="h-4 w-24 mb-1" />
                                <Skeleton className="h-3 w-32 mb-1" />
                                <Skeleton className="h-3 w-20" />
                              </div>
                            </div>
                            <div className="text-right">
                              <Skeleton className="h-4 w-16 mb-1" />
                              <Skeleton className="h-3 w-12" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-8 w-20" />
                          </div>
                        </div>
                      ))
                    : filteredProviders.slice(0, 6).map((provider) => (
                        <div key={provider.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={provider.avatar_url || `/placeholder.svg?height=40&width=40`} />
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
                                  {provider.is_verified && (
                                    <Badge className="ml-2 bg-green-100 text-green-800 text-xs">✓</Badge>
                                  )}
                                </div>
                                <p className="text-gray-600 text-sm">
                                  {provider.profession || "Prestador de Serviços"}
                                </p>
                                <p className="text-gray-500 text-xs flex items-center mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {provider.location}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600 text-sm">
                                R$ {provider.hourly_rate?.toFixed(2) || "0,00"}/h
                              </p>
                              <p className="text-gray-500 text-xs">{provider.work_radius || 10}km raio</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(provider.average_rating || 0)
                                        ? "fill-current"
                                        : "stroke-current fill-transparent"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600 ml-1">
                                {(provider.average_rating || 0).toFixed(1)} ({provider.total_reviews || 0})
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

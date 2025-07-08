"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileData, setProfileData] = useState({
    name: "João Santos",
    email: "joao.santos@email.com",
    phone: "(11) 99999-9999",
    bio: "Profissional experiente em serviços gerais com mais de 5 anos de experiência. Especializado em reparos domésticos, pintura e manutenção.",
    location: "São Paulo, SP",
    birthDate: "1985-03-15",
    cpf: "123.456.789-00",
    services: ["Reparos Gerais", "Pintura", "Elétrica"],
    hourlyRate: "120",
    availability: "Segunda a Sexta, 8h às 18h",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  })

  const [privacy, setPrivacy] = useState({
    showPhone: true,
    showEmail: false,
    showLocation: true,
  })

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

  const handleSave = () => {
    setIsEditing(false)
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

  const reviews = [
    {
      id: 1,
      client: "Maria Silva",
      rating: 5,
      comment: "Excelente profissional! Muito pontual e caprichoso no trabalho.",
      date: "15/12/2024",
      service: "Pintura",
    },
    {
      id: 2,
      client: "Carlos Mendes",
      rating: 4,
      comment: "Bom trabalho, recomendo. Preço justo e qualidade.",
      date: "10/12/2024",
      service: "Reparos",
    },
    {
      id: 3,
      client: "Ana Costa",
      rating: 5,
      comment: "Superou minhas expectativas. Voltarei a contratar!",
      date: "05/12/2024",
      service: "Elétrica",
    },
  ]

  const stats = {
    totalJobs: 127,
    rating: 4.9,
    responseTime: "2h",
    completionRate: "98%",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
          <p className="text-gray-600">Gerencie suas informações pessoais e configurações</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <i className="fas fa-user"></i>
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <i className="fas fa-star"></i>
              <span className="hidden sm:inline">Avaliações</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <i className="fas fa-cog"></i>
              <span className="hidden sm:inline">Configurações</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <i className="fas fa-shield-alt"></i>
              <span className="hidden sm:inline">Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <i className="fas fa-credit-card"></i>
              <span className="hidden sm:inline">Pagamentos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informações Principais */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Informações Pessoais</CardTitle>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    >
                      {isEditing ? "Salvar" : "Editar"}
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
                        {isEditing && (
                          <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <i className="fas fa-camera"></i>
                          </Button>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{profileData.name}</h3>
                        <p className="text-gray-500">Prestador de Serviços</p>
                        <Badge className="bg-green-100 text-green-700 mt-1">Verificado</Badge>
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
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Localização</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={profileData.birthDate}
                          onChange={(e) => handleInputChange("birthDate", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hourlyRate">Valor por Hora (R$)</Label>
                        <Input
                          id="hourlyRate"
                          value={profileData.hourlyRate}
                          onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Sobre Você</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="availability">Disponibilidade</Label>
                      <Input
                        id="availability"
                        value={profileData.availability}
                        onChange={(e) => handleInputChange("availability", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Estatísticas */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Trabalhos Concluídos</span>
                      <span className="font-semibold">{stats.totalJobs}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Avaliação Média</span>
                      <div className="flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                        <span className="font-semibold">{stats.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Tempo de Resposta</span>
                      <span className="font-semibold">{stats.responseTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Taxa de Conclusão</span>
                      <span className="font-semibold text-green-600">{stats.completionRate}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Serviços Oferecidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profileData.services.map((service, index) => (
                        <Badge key={index} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Avaliações dos Clientes</CardTitle>
                <p className="text-gray-600">Veja o que seus clientes estão dizendo sobre você</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{review.client}</h4>
                          <div className="flex items-center mt-1">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fas fa-star ${i < review.rating ? "" : "text-gray-300"}`}></i>
                              ))}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {review.service}
                            </Badge>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <p className="text-gray-600">Configure como você quer receber notificações</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                    <p className="text-sm text-gray-500">Receba atualizações importantes por e-mail</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                    <p className="text-sm text-gray-500">Receba alertas urgentes por SMS</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Notificações Push</Label>
                    <p className="text-sm text-gray-500">Receba notificações no navegador</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacidade</CardTitle>
                <p className="text-gray-600">Controle quais informações são visíveis para outros usuários</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-phone">Mostrar Telefone</Label>
                    <p className="text-sm text-gray-500">Permitir que clientes vejam seu telefone</p>
                  </div>
                  <Switch
                    id="show-phone"
                    checked={privacy.showPhone}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showPhone: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-email">Mostrar E-mail</Label>
                    <p className="text-sm text-gray-500">Permitir que clientes vejam seu e-mail</p>
                  </div>
                  <Switch
                    id="show-email"
                    checked={privacy.showEmail}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showEmail: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-location">Mostrar Localização</Label>
                    <p className="text-sm text-gray-500">Permitir que clientes vejam sua localização</p>
                  </div>
                  <Switch
                    id="show-location"
                    checked={privacy.showLocation}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showLocation: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
                <p className="text-gray-600">Mantenha sua conta segura com uma senha forte</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Alterar Senha</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verificação em Duas Etapas</CardTitle>
                <p className="text-gray-600">Adicione uma camada extra de segurança à sua conta</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autenticação em Duas Etapas</Label>
                    <p className="text-sm text-gray-500">Usar SMS ou app autenticador</p>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Pagamento</CardTitle>
                <p className="text-gray-600">Gerencie como você recebe pagamentos</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                        PIX
                      </div>
                      <div>
                        <p className="font-medium">PIX</p>
                        <p className="text-sm text-gray-500">joao.santos@email.com</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Principal</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Adicionar Método de Pagamento
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pagamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Serviço de Pintura - Maria Silva</p>
                      <p className="text-sm text-gray-500">15/12/2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+ R$ 240,00</p>
                      <Badge variant="secondary" className="text-xs">
                        Concluído
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Reparos Gerais - Carlos Mendes</p>
                      <p className="text-sm text-gray-500">10/12/2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+ R$ 180,00</p>
                      <Badge variant="secondary" className="text-xs">
                        Concluído
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}

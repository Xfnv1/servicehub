"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SejaPrestadorPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    categoria: "",
    experiencia: "",
    descricao: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria o envio do formulário
    console.log("Dados do formulário:", formData)
    alert("Cadastro enviado com sucesso! Entraremos em contato em breve.")
    router.push("/")
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 py-16 md:py-24 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Seja um Prestador de Serviços</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
              Transforme suas habilidades em renda. Conecte-se com milhares de clientes que precisam dos seus serviços.
            </p>

            <div className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center mb-12 max-w-md md:max-w-none mx-auto">
              <Button
                onClick={() => document.getElementById("cadastro-form")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg h-12 font-semibold"
              >
                <i className="fas fa-user-plus mr-2"></i>
                Cadastrar Agora
              </Button>
              <Button
                onClick={() => router.push("/como-funciona")}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg h-12 font-semibold"
              >
                <i className="fas fa-play mr-2"></i>
                Ver Como Funciona
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Por que ser um prestador?</h2>
              <p className="text-lg md:text-xl text-gray-600">Vantagens exclusivas para profissionais como você</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-dollar-sign text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Renda Extra</h3>
                <p className="text-gray-600">Aumente sua renda oferecendo seus serviços para milhares de clientes</p>
              </div>

              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-calendar-alt text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexibilidade</h3>
                <p className="text-gray-600">Trabalhe quando quiser, defina seus próprios horários e preços</p>
              </div>

              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Clientes Qualificados</h3>
                <p className="text-gray-600">
                  Acesso a uma base de clientes verificados e interessados em seus serviços
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Crescimento</h3>
                <p className="text-gray-600">Ferramentas para fazer seu negócio crescer e se destacar no mercado</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works for Providers */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Como funciona para prestadores</h2>
              <p className="text-lg md:text-xl text-gray-600">Processo simples para começar a faturar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cadastre-se</h3>
                <p className="text-gray-600">Crie seu perfil profissional com suas informações e especialidades</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Seja aprovado</h3>
                <p className="text-gray-600">Nossa equipe verifica suas informações e aprova seu cadastro</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Receba pedidos</h3>
                <p className="text-gray-600">Comece a receber solicitações de clientes da sua região</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fature mais</h3>
                <p className="text-gray-600">Realize os serviços e aumente sua renda mensal</p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section id="cadastro-form" className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cadastre-se agora</h2>
              <p className="text-lg md:text-xl text-gray-600">
                Preencha o formulário e comece a receber pedidos hoje mesmo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo *</label>
                  <Input
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                  <Input
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria principal *</label>
                  <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="limpeza">Limpeza</SelectItem>
                      <SelectItem value="reparos">Reparos</SelectItem>
                      <SelectItem value="pintura">Pintura</SelectItem>
                      <SelectItem value="tecnico">Técnico</SelectItem>
                      <SelectItem value="beleza">Beleza</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Anos de experiência *</label>
                <Select value={formData.experiencia} onValueChange={(value) => handleInputChange("experiencia", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua experiência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="menos-1">Menos de 1 ano</SelectItem>
                    <SelectItem value="1-3">1 a 3 anos</SelectItem>
                    <SelectItem value="3-5">3 a 5 anos</SelectItem>
                    <SelectItem value="5-10">5 a 10 anos</SelectItem>
                    <SelectItem value="mais-10">Mais de 10 anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição dos seus serviços *</label>
                <Textarea
                  placeholder="Descreva os serviços que você oferece, sua experiência e diferenciais..."
                  rows={4}
                  value={formData.descricao}
                  onChange={(e) => handleInputChange("descricao", e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 py-3 text-lg font-semibold">
                <i className="fas fa-paper-plane mr-2"></i>
                Enviar Cadastro
              </Button>
            </form>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
                <div className="text-sm md:text-base opacity-80">Prestadores ativos</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">5000+</div>
                <div className="text-sm md:text-base opacity-80">Serviços realizados</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">R$ 2.500</div>
                <div className="text-sm md:text-base opacity-80">Renda média mensal</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">4.8</div>
                <div className="text-sm md:text-base opacity-80">Avaliação média</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

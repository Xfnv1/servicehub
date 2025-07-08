"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InteractiveMap } from "@/components/interactive-map"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const categories = [
    {
      name: "Limpeza",
      description: "Serviços de limpeza residencial e comercial",
      icon: "fas fa-broom",
      color: "text-blue-500",
    },
    {
      name: "Reparos",
      description: "Reparos gerais e manutenção",
      icon: "fas fa-wrench",
      color: "text-green-500",
    },
    {
      name: "Pintura",
      description: "Pintura residencial e comercial",
      icon: "fas fa-paint-roller",
      color: "text-yellow-500",
    },
    {
      name: "Técnico",
      description: "Serviços técnicos especializados",
      icon: "fas fa-laptop",
      color: "text-purple-500",
    },
    {
      name: "Beleza",
      description: "Serviços de beleza e estética",
      icon: "fas fa-cut",
      color: "text-pink-500",
    },
    {
      name: "Educação",
      description: "Aulas particulares e educação",
      icon: "fas fa-graduation-cap",
      color: "text-blue-600",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 py-16 md:py-24 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Encontre o serviço perfeito perto de você
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
              Conecte-se com prestadores de serviços qualificados na sua região. Desde limpeza doméstica até reparos
              técnicos.
            </p>

            <div className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center mb-12 max-w-md md:max-w-none mx-auto">
              <Button
                onClick={() => handleNavigation("/servicos")}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg h-12 font-semibold"
              >
                <i className="fas fa-search mr-2"></i>
                Buscar Serviços
              </Button>
              <Button
                onClick={() => handleNavigation("/solicitar-servico")}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg h-12 font-semibold"
              >
                Solicitar Serviço
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">4</div>
                <div className="text-sm md:text-base opacity-80">Usuários Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">2</div>
                <div className="text-sm md:text-base opacity-80">Prestadores</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">0</div>
                <div className="text-sm md:text-base opacity-80">Serviços Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">4.9</div>
                <div className="text-sm md:text-base opacity-80">Avaliação Média</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Categorias Populares</h2>
              <p className="text-lg md:text-xl text-gray-600">Explore os serviços mais procurados na sua região</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() => handleNavigation(`/servicos?categoria=${category.name.toLowerCase()}`)}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-all cursor-pointer hover:bg-gray-50 group"
                >
                  <div
                    className={`text-5xl md:text-6xl mb-4 ${category.color} group-hover:scale-110 transition-transform`}
                  >
                    <i className={category.icon}></i>
                  </div>
                  <h3 className="text-lg md:text-2xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <InteractiveMap />

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Como Funciona</h2>
              <p className="text-lg md:text-xl text-gray-600">Processo simples em 4 etapas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-edit text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Descreva o Serviço</h3>
                <p className="text-gray-600">Conte-nos o que você precisa e onde</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-envelope text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Receba Propostas</h3>
                <p className="text-gray-600">Prestadores qualificados enviam orçamentos</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check-circle text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Escolha o Melhor</h3>
                <p className="text-gray-600">Compare propostas e escolha o prestador</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-thumbs-up text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Serviço Realizado</h3>
                <p className="text-gray-600">Acompanhe o progresso e avalie</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Junte-se a milhares de clientes satisfeitos</h2>
            <Button
              onClick={() => handleNavigation("/servicos")}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              <i className="fas fa-rocket mr-2"></i>
              Solicitar Serviço Agora
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

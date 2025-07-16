"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InteractiveMap } from "@/components/interactive-map"
import { Button } from "@/components/ui/button"
import { useServiceCategories, useSystemStats } from "@/hooks/use-database"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Zap, Users, Star, TrendingUp } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const { categories, loading: categoriesLoading } = useServiceCategories()
  const { stats, loading: statsLoading } = useSystemStats()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/servicos?categoria=${categoryName.toLowerCase()}`)
  }

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
                <Search className="w-5 h-5 mr-2" />
                Buscar Serviços
              </Button>
              <Button
                onClick={() => handleNavigation("/solicitar-servico")}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg h-12 font-semibold"
              >
                <Zap className="w-5 h-5 mr-2" />
                Solicitar Serviço
              </Button>
            </div>

            {/* Dynamic Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="text-center">
                    <Skeleton className="h-10 w-16 mx-auto mb-2 bg-white/20" />
                    <Skeleton className="h-4 w-24 mx-auto bg-white/20" />
                  </div>
                ))
              ) : (
                <>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center">
                      <Users className="w-8 h-8 mr-2" />
                      {Math.round(stats.active_users || 0)}
                    </div>
                    <div className="text-sm md:text-base opacity-80">Usuários Ativos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 mr-2" />
                      {Math.round(stats.active_providers || 0)}
                    </div>
                    <div className="text-sm md:text-base opacity-80">Prestadores</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center">
                      <Zap className="w-8 h-8 mr-2" />
                      {Math.round(stats.completed_services || 0)}
                    </div>
                    <div className="text-sm md:text-base opacity-80">Serviços Concluídos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center">
                      <Star className="w-8 h-8 mr-2" />
                      {(stats.average_rating || 4.9).toFixed(1)}
                    </div>
                    <div className="text-sm md:text-base opacity-80">Avaliação Média</div>
                  </div>
                </>
              )}
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

            {categoriesLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="text-center p-6 rounded-lg">
                    <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full" />
                    <Skeleton className="h-6 w-32 mx-auto mb-2" />
                    <Skeleton className="h-4 w-48 mx-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                    className="text-center p-6 rounded-lg hover:shadow-lg transition-all cursor-pointer hover:bg-gray-50 group"
                  >
                    <div className={`text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform`}>
                      {category.emoji || "🔧"}
                    </div>
                    <h3 className="text-lg md:text-2xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{category.description}</p>
                  </div>
                ))}
              </div>
            )}
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
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Descreva o Serviço</h3>
                <p className="text-gray-600">Conte-nos o que você precisa e onde</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Receba Propostas</h3>
                <p className="text-gray-600">Prestadores qualificados enviam orçamentos</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Escolha o Melhor</h3>
                <p className="text-gray-600">Compare propostas e escolha o prestador</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
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
              <Zap className="w-5 h-5 mr-2" />
              Solicitar Serviço Agora
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

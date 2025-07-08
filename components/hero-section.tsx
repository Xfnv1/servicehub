"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-gray-50 py-8 md:py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
          Encontre o serviço perfeito perto de você
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
          Conecte-se com prestadores de serviços qualificados na sua região. Desde limpeza doméstica até reparos
          técnicos.
        </p>

        <div className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center mb-8 md:mb-12 max-w-md md:max-w-none mx-auto">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 md:px-8 py-3 md:py-3 text-base md:text-lg h-12 md:h-auto">
            <Search className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Buscar Serviços
          </Button>
          <Button
            variant="outline"
            className="px-6 md:px-8 py-3 md:py-3 text-base md:text-lg bg-transparent h-12 md:h-auto"
          >
            Solicitar Serviço
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="text-center p-3 md:p-0">
            <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">4</div>
            <div className="text-gray-600 text-sm md:text-base">Usuários Ativos</div>
          </div>
          <div className="text-center p-3 md:p-0">
            <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">2</div>
            <div className="text-gray-600 text-sm md:text-base">Prestadores</div>
          </div>
          <div className="text-center p-3 md:p-0">
            <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">0</div>
            <div className="text-gray-600 text-sm md:text-base">Serviços Concluídos</div>
          </div>
          <div className="text-center p-3 md:p-0">
            <div className="text-2xl md:text-4xl font-bold text-purple-600 mb-1 md:mb-2">4.9</div>
            <div className="text-gray-600 text-sm md:text-base">Avaliação Média</div>
          </div>
        </div>
      </div>
    </section>
  )
}

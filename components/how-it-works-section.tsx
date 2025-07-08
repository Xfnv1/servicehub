"use client"

import { Clock } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      title: "Descreva o Serviço",
      description: "Conte-nos o que você precisa e onde",
      step: 1,
    },
    {
      title: "Receba Propostas",
      description: "Prestadores qualificados enviam orçamentos",
      step: 2,
    },
    {
      title: "Escolha o Melhor",
      description: "Compare propostas e escolha o prestador",
      step: 3,
    },
    {
      title: "Serviço Realizado",
      description: "Acompanhe o progresso e avalie",
      step: 4,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h2>
          <p className="text-xl text-gray-600">Processo simples em 4 etapas</p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2 hidden lg:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Junte-se a milhares de clientes satisfeitos</h2>
        <Button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 text-lg">Solicitar Serviço Agora</Button>
      </div>
    </section>
  )
}

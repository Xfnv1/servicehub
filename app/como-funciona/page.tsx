"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ComoFuncionaPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 py-16 md:py-24 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Como Funciona o ServiceHub</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
              Conectar você aos melhores prestadores de serviços é simples e rápido. Veja como funciona nosso processo
              em 4 etapas.
            </p>

            <Button
              onClick={() => router.push("/servicos")}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg h-12 font-semibold"
            >
              <i className="fas fa-rocket mr-2"></i>
              Começar Agora
            </Button>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Processo Simples em 4 Etapas</h2>
              <p className="text-lg md:text-xl text-gray-600">
                Do pedido à conclusão, tudo pensado para sua comodidade
              </p>
            </div>

            <div className="space-y-16">
              {/* Step 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                      1
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Descreva seu serviço</h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    Conte-nos exatamente o que você precisa e onde o serviço deve ser realizado.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Escolha a categoria do serviço
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Descreva detalhadamente o que precisa
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Informe sua localização
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Defina sua disponibilidade
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-100 rounded-lg p-8 flex items-center justify-center h-64">
                  <i className="fas fa-edit text-6xl text-blue-600"></i>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-blue-100 rounded-lg p-8 flex items-center justify-center h-64 lg:order-1">
                  <i className="fas fa-envelope text-6xl text-blue-600"></i>
                </div>
                <div className="lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                      2
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Receba propostas</h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    Prestadores qualificados da sua região enviam orçamentos personalizados.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Receba até 5 propostas
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Compare preços e prazos
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Veja avaliações dos prestadores
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Tire dúvidas pelo chat
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                      3
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Escolha o melhor</h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    Compare as propostas e escolha o prestador que melhor atende suas necessidades.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Analise perfis completos
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Veja trabalhos anteriores
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Compare preços e condições
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Contrate com segurança
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-100 rounded-lg p-8 flex items-center justify-center h-64">
                  <i className="fas fa-check-circle text-6xl text-blue-600"></i>
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-blue-100 rounded-lg p-8 flex items-center justify-center h-64 lg:order-1">
                  <i className="fas fa-star text-6xl text-blue-600"></i>
                </div>
                <div className="lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                      4
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Acompanhe e avalie</h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    Monitore o progresso do serviço e avalie o prestador ao final.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Acompanhe o andamento
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Comunique-se diretamente
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Pagamento seguro
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      Avalie o serviço realizado
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Por que escolher o ServiceHub?</h2>
              <p className="text-lg md:text-xl text-gray-600">Vantagens que fazem a diferença na sua experiência</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Segurança garantida</h3>
                <p className="text-gray-600">Todos os prestadores são verificados e avaliados pela comunidade</p>
              </div>

              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-clock text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Economia de tempo</h3>
                <p className="text-gray-600">Encontre o prestador ideal sem sair de casa</p>
              </div>

              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-dollar-sign text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Melhor preço</h3>
                <p className="text-gray-600">Compare propostas e escolha a que oferece melhor custo-benefício</p>
              </div>

              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-headset text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Suporte 24/7</h3>
                <p className="text-gray-600">Nossa equipe está sempre disponível para ajudar</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para encontrar o serviço perfeito?</h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Junte-se a milhares de clientes satisfeitos que já encontraram os melhores prestadores
            </p>
            <div className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center max-w-md md:max-w-none mx-auto">
              <Button
                onClick={() => router.push("/servicos")}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              >
                <i className="fas fa-search mr-2"></i>
                Buscar Serviços
              </Button>
              <Button
                onClick={() => router.push("/seja-prestador")}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              >
                <i className="fas fa-star mr-2"></i>
                Seja um Prestador
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

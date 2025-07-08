"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">ServiceHub</h3>
            <p className="text-gray-400 mb-6">
              A plataforma que conecta você aos melhores prestadores de serviços da sua região. Serviços de qualidade,
              avaliações reais e preços justos.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <i className="fas fa-envelope mr-2"></i>
                contato@servicehub.com.br
              </div>
              <div className="flex items-center text-gray-400">
                <i className="fas fa-phone mr-2"></i>
                (11) 99999-9999
              </div>
              <div className="flex items-center text-gray-400">
                <i className="fas fa-map-marker-alt mr-2"></i>
                São Paulo, SP - Brasil
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <i className="fab fa-facebook text-gray-400 hover:text-white cursor-pointer text-xl"></i>
              <i className="fab fa-twitter text-gray-400 hover:text-white cursor-pointer text-xl"></i>
              <i className="fab fa-instagram text-gray-400 hover:text-white cursor-pointer text-xl"></i>
              <i className="fab fa-linkedin text-gray-400 hover:text-white cursor-pointer text-xl"></i>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Para Clientes</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("/servicos")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Buscar Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/como-funciona")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Como Funciona
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/precos")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Preços
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/avaliacoes")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Avaliações
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/suporte")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Suporte
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Para Prestadores</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("/seja-prestador")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Cadastrar-se
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/centro-ajuda")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Centro de Ajuda
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/dicas-sucesso")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Dicas de Sucesso
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/comunidade")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Comunidade
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/recursos")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Recursos
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 mb-6">
              <li>
                <button
                  onClick={() => handleNavigation("/sobre-nos")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/carreiras")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Carreiras
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/imprensa")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Imprensa
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/blog")} className="text-gray-400 hover:text-white text-left">
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/investidores")}
                  className="text-gray-400 hover:text-white text-left"
                >
                  Investidores
                </button>
              </li>
            </ul>

            <div>
              <h5 className="font-semibold mb-3">Newsletter</h5>
              <p className="text-sm text-gray-400 mb-3">Receba atualizações sobre novos serviços e promoções</p>
              <div className="flex">
                <Input placeholder="Seu e-mail" className="bg-gray-800 border-gray-700 text-white" />
                <Button className="bg-blue-500 hover:bg-blue-600 ml-2">
                  <i className="fas fa-envelope"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 ServiceHub. Todos os direitos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button
                onClick={() => handleNavigation("/termos-uso")}
                className="text-gray-400 hover:text-white text-sm"
              >
                Termos de Uso
              </button>
              <button
                onClick={() => handleNavigation("/politica-privacidade")}
                className="text-gray-400 hover:text-white text-sm"
              >
                Política de Privacidade
              </button>
              <button
                onClick={() => handleNavigation("/politica-cookies")}
                className="text-gray-400 hover:text-white text-sm"
              >
                Política de Cookies
              </button>
              <button onClick={() => handleNavigation("/seguranca")} className="text-gray-400 hover:text-white text-sm">
                Segurança
              </button>
              <button
                onClick={() => handleNavigation("/acessibilidade")}
                className="text-gray-400 hover:text-white text-sm"
              >
                Acessibilidade
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  Search,
  Menu,
  X,
  Settings,
  LogOut,
  MessageCircle,
  Heart,
  Calendar,
  Briefcase,
  User,
  Home,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { NotificationCenter } from "@/components/notifications/notification-center"

interface HeaderUser {
  id: string
  name: string
  email: string
  type: "cliente" | "prestador"
  avatar?: string
  service?: string
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<HeaderUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se há usuário logado
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("rememberLogin")
    sessionStorage.removeItem("user")
    setUser(null)
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })
    router.push("/")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const getDashboardLink = () => {
    if (!user) return "/login"
    return user.type === "cliente" ? "/dashboard/cliente" : "/dashboard/prestador"
  }

  const getServicesLink = () => {
    if (!user) return "/servicos"
    return user.type === "cliente" ? "/servicos" : "/dashboard/prestador?tab=requests"
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              ServiceHub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Início
            </Link>
            <Link href="/servicos" className="text-gray-700 hover:text-blue-600 transition-colors">
              Serviços
            </Link>
            <Link href="/como-funciona" className="text-gray-700 hover:text-blue-600 transition-colors">
              Como Funciona
            </Link>
            <Link href="/seja-prestador" className="text-gray-700 hover:text-blue-600 transition-colors">
              Seja Prestador
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input type="text" placeholder="Buscar serviços..." className="pl-10 pr-4 w-full" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <NotificationCenter />

                {/* Messages */}
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/chat">
                    <MessageCircle className="h-5 w-5" />
                  </Link>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-blue-500 text-white font-semibold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        {user.service && (
                          <p className="text-xs leading-none text-blue-600 font-medium">{user.service}</p>
                        )}
                        <div className="flex items-center mt-2">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${user.type === "cliente" ? "bg-green-500" : "bg-blue-500"}`}
                          ></div>
                          <span className="text-xs text-gray-500 capitalize">{user.type}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Dashboard */}
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardLink()} className="cursor-pointer">
                        <Home className="mr-3 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>

                    {/* Agenda */}
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          user.type === "cliente"
                            ? "/dashboard/cliente?tab=active"
                            : "/dashboard/prestador?tab=schedule"
                        }
                        className="cursor-pointer"
                      >
                        <Calendar className="mr-3 h-4 w-4" />
                        <span>Agenda</span>
                      </Link>
                    </DropdownMenuItem>

                    {/* Meus Serviços */}
                    <DropdownMenuItem asChild>
                      <Link href={getServicesLink()} className="cursor-pointer">
                        <Briefcase className="mr-3 h-4 w-4" />
                        <span>{user.type === "cliente" ? "Meus Serviços" : "Solicitações"}</span>
                      </Link>
                    </DropdownMenuItem>

                    {/* Perfil */}
                    <DropdownMenuItem asChild>
                      <Link href="/perfil" className="cursor-pointer">
                        <User className="mr-3 h-4 w-4" />
                        <span>Meu Perfil</span>
                      </Link>
                    </DropdownMenuItem>

                    {/* Configurações */}
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          user.type === "cliente"
                            ? "/dashboard/cliente?tab=profile"
                            : "/dashboard/prestador?tab=profile"
                        }
                        className="cursor-pointer"
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        <span>Configurações</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Notificações */}
                    <DropdownMenuItem asChild>
                      <Link href="/notificacoes" className="cursor-pointer">
                        <Bell className="mr-3 h-4 w-4" />
                        <span>Notificações</span>
                      </Link>
                    </DropdownMenuItem>

                    {/* Favoritos (apenas para clientes) */}
                    {user.type === "cliente" && (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/cliente?tab=favorites" className="cursor-pointer">
                          <Heart className="mr-3 h-4 w-4" />
                          <span>Favoritos</span>
                        </Link>
                      </DropdownMenuItem>
                    )}

                    {/* Chat */}
                    <DropdownMenuItem asChild>
                      <Link href="/chat" className="cursor-pointer">
                        <MessageCircle className="mr-3 h-4 w-4" />
                        <span>Mensagens</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Logout */}
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button asChild>
                  <Link href="/cadastro">Cadastrar</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="text" placeholder="Buscar serviços..." className="pl-10 pr-4 w-full" />
              </div>

              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                href="/servicos"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link
                href="/como-funciona"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Como Funciona
              </Link>
              <Link
                href="/seja-prestador"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Seja Prestador
              </Link>

              {/* Mobile User Menu */}
              {user ? (
                <div className="pt-4 border-t space-y-1">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Logado como: <span className="font-medium text-gray-900">{user.name}</span>
                  </div>

                  <Link
                    href={getDashboardLink()}
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="mr-3 h-5 w-5" />
                    Dashboard
                  </Link>

                  <Link
                    href={
                      user.type === "cliente" ? "/dashboard/cliente?tab=active" : "/dashboard/prestador?tab=schedule"
                    }
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calendar className="mr-3 h-5 w-5" />
                    Agenda
                  </Link>

                  <Link
                    href={getServicesLink()}
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Briefcase className="mr-3 h-5 w-5" />
                    {user.type === "cliente" ? "Meus Serviços" : "Solicitações"}
                  </Link>

                  <Link
                    href="/chat"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MessageCircle className="mr-3 h-5 w-5" />
                    Mensagens
                  </Link>

                  <Link
                    href={
                      user.type === "cliente" ? "/dashboard/cliente?tab=profile" : "/dashboard/prestador?tab=profile"
                    }
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    Configurações
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center w-full px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sair
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t">
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/cadastro"
                    className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

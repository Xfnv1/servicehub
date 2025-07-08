"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Eye, EyeOff, User, Briefcase, Mail, Lock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [clientData, setClientData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [providerData, setProviderData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("cliente")
  const [showClientPassword, setShowClientPassword] = useState(false)
  const [showProviderPassword, setShowProviderPassword] = useState(false)

  const handleClientInputChange = (field: string, value: string | boolean) => {
    setClientData((prev) => ({ ...prev, [field]: value }))
  }

  const handleProviderInputChange = (field: string, value: string | boolean) => {
    setProviderData((prev) => ({ ...prev, [field]: value }))
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(clientData.email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive",
      })
      return
    }

    if (clientData.password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await signIn(clientData.email, clientData.password)

      if (error) {
        toast({
          title: "Erro no login",
          description: error.message || "Credenciais inválidas",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta!",
      })

      router.push("/dashboard/cliente")
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleProviderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(providerData.email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive",
      })
      return
    }

    if (providerData.password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await signIn(providerData.email, providerData.password)

      if (error) {
        toast({
          title: "Erro no login",
          description: error.message || "Credenciais inválidas",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta!",
      })

      router.push("/dashboard/prestador")
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string, userType: string) => {
    toast({
      title: `Conectando com ${provider}`,
      description: `Funcionalidade em desenvolvimento...`,
    })
  }

  const handleForgotPassword = () => {
    toast({
      title: "Recuperação de senha",
      description: "Um link de recuperação será enviado para seu e-mail.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-white hover:text-blue-100 transition-colors">
            ServiceHub
          </Link>
          <p className="text-blue-100 mt-2">Entre na sua conta</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Fazer Login</CardTitle>
            <p className="text-gray-600 text-sm">Escolha seu tipo de conta</p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="cliente" className="text-sm flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Cliente
                </TabsTrigger>
                <TabsTrigger value="prestador" className="text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Prestador
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cliente" className="space-y-4 mt-6">
                <form onSubmit={handleClientSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-email" className="text-sm font-medium">
                      E-mail
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="client-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={clientData.email}
                        onChange={(e) => handleClientInputChange("email", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client-password" className="text-sm font-medium">
                      Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="client-password"
                        type={showClientPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={clientData.password}
                        onChange={(e) => handleClientInputChange("password", e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowClientPassword(!showClientPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showClientPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={clientData.rememberMe}
                        onChange={(e) => handleClientInputChange("rememberMe", e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span>Lembrar de mim</span>
                    </label>
                    <button type="button" onClick={handleForgotPassword} className="text-blue-600 hover:underline">
                      Esqueceu a senha?
                    </button>
                  </div>

                  <Button type="submit" className="w-full h-11" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Entrando...
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4 mr-2" />
                        Entrar como Cliente
                      </>
                    )}
                  </Button>
                </form>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full h-11 bg-transparent"
                    type="button"
                    onClick={() => handleSocialLogin("Google", "cliente")}
                    disabled={isLoading}
                  >
                    <Mail className="w-4 h-4 mr-2 text-red-500" />
                    Continuar com Google
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="prestador" className="space-y-4 mt-6">
                <form onSubmit={handleProviderSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider-email" className="text-sm font-medium">
                      E-mail Profissional
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="provider-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={providerData.email}
                        onChange={(e) => handleProviderInputChange("email", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="provider-password" className="text-sm font-medium">
                      Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="provider-password"
                        type={showProviderPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={providerData.password}
                        onChange={(e) => handleProviderInputChange("password", e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowProviderPassword(!showProviderPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showProviderPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={providerData.rememberMe}
                        onChange={(e) => handleProviderInputChange("rememberMe", e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span>Lembrar de mim</span>
                    </label>
                    <button type="button" onClick={handleForgotPassword} className="text-blue-600 hover:underline">
                      Esqueceu a senha?
                    </button>
                  </div>

                  <Button type="submit" className="w-full h-11 bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Entrando...
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-4 h-4 mr-2" />
                        Entrar como Prestador
                      </>
                    )}
                  </Button>
                </form>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full h-11 bg-transparent"
                    type="button"
                    onClick={() => handleSocialLogin("Google", "prestador")}
                    disabled={isLoading}
                  >
                    <Mail className="w-4 h-4 mr-2 text-red-500" />
                    Continuar com Google
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{" "}
                  <Link href="/cadastro" className="text-blue-600 hover:underline font-medium">
                    Cadastre-se aqui
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
            <i className="fas fa-arrow-left mr-2"></i>
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}

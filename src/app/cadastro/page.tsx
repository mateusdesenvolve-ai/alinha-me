"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/custom/logo"

export default function CadastroPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSocialAuth = async (provider: string) => {
    try {
      setLoading(true)
      setError("")
      
      const { signInWithProvider } = await import("@/lib/supabase")
      await signInWithProvider(provider as any)
    } catch (err: any) {
      if (err.message?.includes('Configuração do Supabase')) {
        setError("Por favor, configure suas credenciais do Supabase nas configurações do projeto.")
      } else {
        setError(`Erro ao autenticar com ${provider}. Tente novamente.`)
      }
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password || !name) {
      setError("Por favor, preencha todos os campos.")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    try {
      setLoading(true)
      setError("")

      const { signUpWithEmail } = await import("@/lib/supabase")
      await signUpWithEmail(email, password)
      
      router.push("/quiz-inicial")
    } catch (err: any) {
      if (err.message?.includes('Configuração do Supabase')) {
        setError("Por favor, configure suas credenciais do Supabase nas configurações do projeto.")
      } else {
        setError(err.message || "Erro ao criar conta. Tente novamente.")
      }
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block mb-6">
            <Logo size="lg" />
          </div>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Criar conta no Alinha.me
            </h1>
            <p className="text-gray-600">
              Comece sua jornada de evolução pessoal
            </p>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Botões Sociais */}
          <div className="space-y-3 mb-6">
            {/* Google */}
            <button
              onClick={() => handleSocialAuth('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 font-medium hover:border-[#1F75FE] hover:bg-blue-50 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continuar com Google</span>
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleSocialAuth('facebook')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 font-medium hover:border-[#1F75FE] hover:bg-blue-50 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Continuar com Facebook</span>
            </button>

            {/* Apple */}
            <button
              onClick={() => handleSocialAuth('apple')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 font-medium hover:border-[#1F75FE] hover:bg-blue-50 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span>Continuar com Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleEmailSignup} className="space-y-4">
            {/* Campo Nome */}
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
                required
                disabled={loading}
                className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-[#1F75FE] focus:outline-none focus:ring-2 focus:ring-[#1F75FE]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Campo Email */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                required
                disabled={loading}
                className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-[#1F75FE] focus:outline-none focus:ring-2 focus:ring-[#1F75FE]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Campo Senha */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha (mínimo 6 caracteres)"
                required
                disabled={loading}
                className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-[#1F75FE] focus:outline-none focus:ring-2 focus:ring-[#1F75FE]/20 transition-all pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F75FE] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[#0F65EE] transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          {/* Link para Login */}
          <div className="text-center mt-6">
            <Link href="/login" className="text-sm text-[#1F75FE] hover:text-[#0F65EE] font-medium transition-colors">
              Já tem conta? Fazer login
            </Link>
          </div>

          {/* Termos e Políticas */}
          <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
            Ao criar uma conta, você concorda com os{" "}
            <Link href="/terms" className="text-[#1F75FE] hover:underline">Termos de Uso</Link>{" "}
            e{" "}
            <Link href="/privacy" className="text-[#1F75FE] hover:underline">Política de Privacidade</Link>{" "}
            do Alinha.me.
          </p>
        </div>

        {/* Voltar para Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}

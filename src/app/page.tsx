"use client"

import { Check, Zap, Target, TrendingUp, Star, Twitter, Linkedin, Instagram, Sparkles, Brain, MessageCircle, Calendar, Wallet, Bell, Award, Shield, Rocket, X, Users, BarChart3, Heart, Lightbulb, Repeat } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation"

// Componente wrapper para animações
function AnimatedSection({ 
  children, 
  animation = "fade-up",
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode
  animation?: "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right"
  delay?: number
  className?: string
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  
  const animationClasses = {
    "fade-up": "opacity-0 translate-y-8",
    "fade-in": "opacity-0",
    "scale-in": "opacity-0 scale-95",
    "slide-left": "opacity-0 -translate-x-8",
    "slide-right": "opacity-0 translate-x-8"
  }

  const visibleClasses = "opacity-100 translate-y-0 translate-x-0 scale-100"

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? visibleClasses : animationClasses[animation]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const heroParallax = useParallax(0.3)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo com novo ícone SVG */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center gap-3">
                <Image 
                  src="/icon.svg" 
                  alt="Alinha.me" 
                  width={40} 
                  height={40}
                  className="hover:scale-105 transition-transform"
                />
                <div className="flex flex-col -space-y-1">
                  <span className="text-xl font-bold text-gray-900 tracking-tight">Alinha<span className="text-[#1F75FE]">.me</span></span>
                </div>
              </div>
            </Link>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#solucoes" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Soluções
              </a>
              <a href="#recursos" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Recursos
              </a>
              <Link href="/planos" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Preço
              </Link>
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Login
              </Link>
              <Link href="/login" className="bg-[#1F75FE] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0F65EE] transition-all hover:shadow-lg hover:scale-105">
                Comece grátis
              </Link>
            </nav>

            {/* Menu Mobile */}
            <button className="md:hidden text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <AnimatedSection animation="fade-up" delay={0}>
                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                    Clareza para evoluir.
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                    Organize tarefas, construa hábitos e alcance suas metas diárias com inteligência. 
                    O Alinha.me é seu parceiro de evolução pessoal.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <Link href="/login" className="bg-[#1F75FE] text-white px-8 py-4 rounded-xl text-base font-medium hover:bg-[#0F65EE] transition-all hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2">
                  Começar grátis
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </AnimatedSection>

              {/* Social Proof */}
              <AnimatedSection animation="fade-up" delay={400}>
                <div className="pt-8 space-y-4">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#1F75FE] text-[#1F75FE]" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">+50.000 usuários satisfeitos</span>
                  </div>
                  <div className="flex items-center gap-6 opacity-60">
                    <span className="text-xs text-gray-500 font-medium">DESTAQUE EM:</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-gray-700">TechCrunch</span>
                      <span className="text-sm font-semibold text-gray-700">Product Hunt</span>
                      <span className="text-sm font-semibold text-gray-700">Forbes</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Mockup */}
            <AnimatedSection animation="scale-in" delay={300}>
              <div className="relative" style={{ transform: `translateY(${heroParallax}px)` }}>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-2xl border border-gray-200">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Mockup Header */}
                    <div className="bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] p-6 text-white">
                      <h3 className="text-lg font-semibold mb-2">Hoje</h3>
                      <p className="text-sm opacity-90">Quinta, 27 de Janeiro</p>
                    </div>

                    {/* Mockup Tasks */}
                    <div className="p-6 space-y-4">
                      {[
                        { text: "Revisar apresentação do projeto", done: true },
                        { text: "Meditar por 10 minutos", done: true },
                        { text: "Ler 20 páginas do livro", done: false },
                        { text: "Fazer exercícios físicos", done: false },
                      ].map((task, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            task.done ? 'bg-[#1F75FE] border-[#1F75FE]' : 'border-gray-300'
                          }`}>
                            {task.done && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`text-sm ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                            {task.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Sequência</p>
                      <p className="text-lg font-bold text-gray-900">12 dias</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Aly Section - IA Assistente */}
      <section id="aly" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
                <Sparkles className="w-4 h-4 text-[#1F75FE]" />
                <span className="text-sm font-medium text-blue-900">Conheça a Aly</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Sua assistente inteligente de evolução pessoal.
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                A Aly analisa suas respostas no quiz, entende seus desafios e cria metas personalizadas 
                para você evoluir em todas as áreas da vida.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mockup da Aly */}
            <AnimatedSection animation="slide-right" delay={200}>
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-full flex items-center justify-center">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Aly</h3>
                      <p className="text-sm text-gray-500">Sua assistente inteligente</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                      <p className="text-sm text-gray-700">
                        Olá! Analisei suas respostas e identifiquei que você precisa focar em <span className="font-semibold text-[#1F75FE]">organização</span> e <span className="font-semibold text-[#1F75FE]">saúde</span>. Vou sugerir metas personalizadas! 🎯
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:border-[#1F75FE] transition-all">
                        Ver metas
                      </button>
                      <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:border-[#1F75FE] transition-all">
                        Ajustar análise
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Features da Aly */}
            <div className="space-y-6">
              {[
                {
                  icon: Brain,
                  title: "Análise Inteligente",
                  desc: "Aly analisa suas respostas do quiz e identifica áreas prioritárias para evolução"
                },
                {
                  icon: Target,
                  title: "Metas Personalizadas",
                  desc: "Sugere metas específicas baseadas no seu perfil, rotina e objetivos"
                },
                {
                  icon: MessageCircle,
                  title: "Mensagens Motivacionais",
                  desc: "Receba mensagens diárias de incentivo e dicas práticas para manter o foco"
                },
                {
                  icon: Sparkles,
                  title: "Recomendações Inteligentes",
                  desc: "Sugestões personalizadas de hábitos, tarefas e ajustes na rotina"
                }
              ].map((feature, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="flex gap-4 p-5 bg-white rounded-2xl border border-blue-100 hover:border-[#1F75FE] transition-all hover:shadow-lg">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-[#1F75FE]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <AnimatedSection animation="fade-up">
                <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                  <Check className="w-4 h-4 text-[#1F75FE]" />
                  <span className="text-sm font-medium text-blue-900">Quiz Inicial</span>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={100}>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                  Entenda sua vida em 8 áreas essenciais.
                </h2>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={200}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Após o login, você responde um quiz simples sobre sua rotina, finanças, emoções, 
                  relacionamentos, saúde, espiritualidade, hábitos e objetivos. A Aly usa essas 
                  informações para criar metas personalizadas.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "Organização",
                    "Financeiro",
                    "Emocional",
                    "Relacionamento",
                    "Saúde",
                    "Espiritualidade",
                    "Hábitos",
                    "Objetivos"
                  ].map((area, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#1F75FE] transition-all">
                      <div className="w-2 h-2 bg-[#1F75FE] rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={400}>
                <Link href="/login" className="inline-flex items-center gap-2 bg-[#1F75FE] text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-[#0F65EE] transition-all hover:shadow-lg hover:scale-105 mt-4">
                  Fazer o quiz agora
                  <Sparkles className="w-5 h-5" />
                </Link>
              </AnimatedSection>
            </div>

            {/* Quiz Mockup */}
            <AnimatedSection animation="scale-in" delay={200}>
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-500">Pergunta 3 de 8</span>
                        <span className="text-sm font-medium text-[#1F75FE]">38%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#1F75FE] h-2 rounded-full transition-all duration-500" style={{ width: '38%' }}></div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Como você avalia sua saúde física atualmente?
                      </h3>
                      <div className="space-y-3">
                        {[
                          "Excelente - pratico exercícios regularmente",
                          "Boa - poderia melhorar",
                          "Regular - preciso de mudanças",
                          "Ruim - preciso de ajuda urgente"
                        ].map((option, i) => (
                          <button key={i} className="w-full text-left p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#1F75FE] hover:bg-blue-50 transition-all">
                            <span className="text-sm text-gray-700">{option}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Metas Personalizadas Section */}
      <section id="metas" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-blue-200">
                <Target className="w-4 h-4 text-[#1F75FE]" />
                <span className="text-sm font-medium text-blue-900">Metas Personalizadas</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Metas criadas especialmente para você.
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                A Aly analisa suas respostas e cria metas práticas com passos iniciais, 
                prazos e prioridades. Você decide aceitar, ajustar ou recusar cada sugestão.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Criar rotina matinal",
                step: "Acordar 30 minutos mais cedo",
                deadline: "2 semanas",
                priority: "Alta",
                color: "red"
              },
              {
                title: "Economizar R$ 500",
                step: "Guardar R$ 125 por semana",
                deadline: "1 mês",
                priority: "Média",
                color: "yellow"
              },
              {
                title: "Meditar diariamente",
                step: "Começar com 5 minutos",
                deadline: "3 semanas",
                priority: "Alta",
                color: "red"
              }
            ].map((meta, i) => (
              <AnimatedSection key={i} animation="scale-in" delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#1F75FE] transition-all hover:shadow-xl">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{meta.title}</h3>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      meta.color === 'red' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {meta.priority}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-[#1F75FE] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Passo inicial</p>
                        <p className="text-sm text-gray-700">{meta.step}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-[#1F75FE] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Prazo</p>
                        <p className="text-sm text-gray-700">{meta.deadline}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#1F75FE] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0F65EE] transition-all">
                      Aceitar
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-[#1F75FE] transition-all">
                      Ajustar
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-red-500 hover:text-red-600 transition-all">
                      Recusar
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Cofrinho Section */}
      <section id="cofrinho" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Cofrinho Mockup */}
            <AnimatedSection animation="slide-right" delay={200}>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-2xl p-8 border border-green-100">
                  <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <Wallet className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Reserva de Emergência</h3>
                          <p className="text-sm text-gray-500">Meta: R$ 3.000</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold text-gray-900">R$ 1.250</span>
                          <span className="text-sm text-gray-500">42%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500" style={{ width: '42%' }}></div>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-[#1F75FE] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">Sugestão da Aly</p>
                            <p className="text-xs text-gray-600">Guarde R$ 175 por semana para atingir sua meta em 10 semanas!</p>
                          </div>
                        </div>
                      </div>

                      <button className="w-full bg-[#1F75FE] text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-[#0F65EE] transition-all">
                        Adicionar depósito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Content */}
            <div className="space-y-6">
              <AnimatedSection animation="fade-up">
                <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                  <Wallet className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Cofrinho Financeiro</span>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={100}>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                  Alcance suas metas financeiras com simplicidade.
                </h2>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={200}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Defina objetivos financeiros e acompanhe seu progresso de forma visual. 
                  A Aly sugere quanto guardar por semana e oferece dicas práticas de economia.
                </p>
              </AnimatedSection>

              <div className="space-y-4 pt-4">
                {[
                  {
                    icon: Target,
                    title: "Metas Simples",
                    desc: "Defina objetivos claros: guardar dinheiro, quitar dívidas ou montar reserva"
                  },
                  {
                    icon: TrendingUp,
                    title: "Progresso Visual",
                    desc: "Acompanhe seu avanço com barras e gráficos motivadores"
                  },
                  {
                    icon: Sparkles,
                    title: "Sugestões Inteligentes",
                    desc: "Aly analisa seu perfil e sugere valores semanais realistas"
                  },
                  {
                    icon: Calendar,
                    title: "Integração com Calendário",
                    desc: "Lembretes automáticos nas datas de depósito"
                  }
                ].map((feature, i) => (
                  <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                    <div className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#1F75FE] transition-all">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                        <feature.icon className="w-5 h-5 text-[#1F75FE]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendário Section */}
      <section id="calendario" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <AnimatedSection animation="fade-up">
                <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                  <Calendar className="w-4 h-4 text-[#1F75FE]" />
                  <span className="text-sm font-medium text-blue-900">Calendário Integrado</span>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={100}>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                  Visualize toda sua rotina em um só lugar.
                </h2>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={200}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Organize tarefas, metas, hábitos e compromissos financeiros em um calendário 
                  inteligente. Arraste eventos, receba lembretes e mantenha tudo sob controle.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="space-y-4 pt-4">
                  {[
                    "Vista mensal e semanal personalizável",
                    "Tarefas, metas e hábitos organizados por cor",
                    "Integração com cofrinho financeiro",
                    "Arrastar e soltar para reorganizar",
                    "Lembretes inteligentes automáticos",
                    "Adicionar tarefas direto no calendário"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[#1F75FE] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-[#1F75FE]" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Calendário Mockup */}
            <AnimatedSection animation="scale-in" delay={200}>
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Janeiro 2025</h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all">Mês</button>
                      <button className="px-3 py-1 text-sm bg-[#1F75FE] text-white rounded-lg">Semana</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {[...Array(35)].map((_, i) => {
                      const day = i - 2;
                      const hasEvent = [5, 8, 12, 15, 20, 25].includes(day);
                      const isToday = day === 15;
                      
                      return (
                        <div key={i} className={`aspect-square p-1 rounded-lg border transition-all ${
                          day < 1 || day > 31 ? 'bg-gray-50 border-transparent' :
                          isToday ? 'bg-[#1F75FE] text-white border-[#1F75FE]' :
                          hasEvent ? 'bg-blue-50 border-blue-200 hover:border-[#1F75FE]' :
                          'bg-white border-gray-200 hover:border-[#1F75FE]'
                        }`}>
                          {day >= 1 && day <= 31 && (
                            <div className="text-xs font-medium text-center">
                              {day}
                            </div>
                          )}
                          {hasEvent && day >= 1 && day <= 31 && (
                            <div className="mt-1 flex justify-center gap-0.5">
                              <div className="w-1 h-1 bg-[#1F75FE] rounded-full"></div>
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#1F75FE] rounded"></div>
                      <span className="text-gray-600">Tarefas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-gray-600">Hábitos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span className="text-gray-600">Metas</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Notificações Section */}
      <section id="notificacoes" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
                <Bell className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Notificações Animadas</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Lembretes que motivam e inspiram.
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Receba notificações com animações leves e mensagens motivacionais da Aly. 
                Alertas inteligentes para tarefas, hábitos, cofrinho e eventos do calendário.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Check,
                title: "Tarefas",
                desc: "Lembretes de tarefas importantes",
                color: "blue",
                animation: "bounce"
              },
              {
                icon: Target,
                title: "Hábitos",
                desc: "Hora de praticar seus hábitos",
                color: "green",
                animation: "pulse"
              },
              {
                icon: Wallet,
                title: "Cofrinho",
                desc: "Lembrete para guardar dinheiro",
                color: "yellow",
                animation: "shine"
              },
              {
                icon: Sparkles,
                title: "Check-in Diário",
                desc: "Aly pergunta como foi seu dia",
                color: "purple",
                animation: "confetti"
              }
            ].map((notif, i) => (
              <AnimatedSection key={i} animation="scale-in" delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#1F75FE] transition-all hover:shadow-xl">
                  <div className={`w-12 h-12 bg-${notif.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                    <notif.icon className={`w-6 h-6 text-${notif.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{notif.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{notif.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-[#1F75FE] rounded-full animate-pulse"></div>
                    <span>Animação {notif.animation}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Chat com Aly Section */}
      <section id="chat" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Chat Mockup */}
            <AnimatedSection animation="slide-right" delay={200}>
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] p-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Brain className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Aly</h3>
                        <p className="text-xs opacity-90">Online agora</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-6 space-y-4 bg-gray-50 min-h-[400px]">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#1F75FE] rounded-full flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%]">
                        <p className="text-sm text-gray-700">
                          Olá! Como foi seu dia hoje? Conseguiu completar suas tarefas? 😊
                        </p>
                        <span className="text-xs text-gray-400 mt-2 block">10:30</span>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <div className="bg-[#1F75FE] rounded-2xl rounded-tr-none p-4 shadow-sm max-w-[80%]">
                        <p className="text-sm text-white">
                          Sim! Completei 4 de 5 tarefas 🎉
                        </p>
                        <span className="text-xs text-blue-100 mt-2 block">10:32</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#1F75FE] rounded-full flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%]">
                        <p className="text-sm text-gray-700">
                          Parabéns! 🎊 Você está mantendo uma ótima sequência. Quer que eu crie uma tarefa para amanhã?
                        </p>
                        <div className="flex gap-2 mt-3">
                          <button className="bg-[#1F75FE] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#0F65EE] transition-all">
                            Sim, criar
                          </button>
                          <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-200 transition-all">
                            Não agora
                          </button>
                        </div>
                        <span className="text-xs text-gray-400 mt-2 block">10:33</span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Digite sua mensagem..."
                        className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#1F75FE]"
                      />
                      <button className="w-10 h-10 bg-[#1F75FE] rounded-full flex items-center justify-center hover:bg-[#0F65EE] transition-all">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Content */}
            <div className="space-y-6">
              <AnimatedSection animation="fade-up">
                <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full border border-purple-200">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Chat Proprietário</span>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={100}>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                  Converse com sua assistente a qualquer momento.
                </h2>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-up" delay={200}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Tenha conversas naturais com a Aly em um chat com identidade visual própria do Alinha.me. 
                  Crie tarefas pelo chat, receba resumos da semana, tire dúvidas e receba sugestões personalizadas.
                </p>
              </AnimatedSection>

              <div className="space-y-4 pt-4">
                {[
                  {
                    icon: MessageCircle,
                    title: "Conversa Natural",
                    desc: "Fale com Aly como se fosse um amigo"
                  },
                  {
                    icon: Zap,
                    title: "Criar Tarefas Rápido",
                    desc: "Digite e Aly cria tarefas automaticamente"
                  },
                  {
                    icon: TrendingUp,
                    title: "Resumos Semanais",
                    desc: "Receba análises do seu progresso"
                  },
                  {
                    icon: Sparkles,
                    title: "Sugestões Inteligentes",
                    desc: "Aly sugere melhorias na sua rotina"
                  }
                ].map((feature, i) => (
                  <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                    <div className="flex gap-4 p-4 bg-white rounded-xl border border-purple-100 hover:border-[#1F75FE] transition-all">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-[#1F75FE]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planos Section - ATUALIZADA COM LINKS */}
      <section id="planos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-blue-200">
                <Award className="w-4 h-4 text-[#1F75FE]" />
                <span className="text-sm font-medium text-blue-900">Planos</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Escolha o plano ideal para você.
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Comece grátis e evolua conforme suas necessidades. Todos os planos incluem 
                acesso à Aly e recursos essenciais de produtividade.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* PLANO GRÁTIS */}
            <AnimatedSection animation="scale-in" delay={0}>
              <Link href="/planos" className="block">
                <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 transition-all hover:shadow-lg h-full flex flex-col cursor-pointer hover:scale-105">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Grátis</h3>
                    <p className="text-sm text-gray-600">Para começar sua jornada</p>
                  </div>
                  
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-gray-900">R$ 0</span>
                    <span className="text-gray-600">/mês</span>
                  </div>

                  <div className="block w-full py-3 rounded-xl font-medium transition-all mb-8 text-center bg-gray-100 text-gray-900 hover:bg-gray-200">
                    Começar grátis
                  </div>

                  <ul className="space-y-3 flex-grow">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Tarefas básicas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Calendário básico</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Cofrinho limitado</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Metas simples</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Aly responde apenas 3 mensagens por dia</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Plano simples criado automaticamente</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Notificações básicas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Acesso restrito ao progresso</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">Sem relatórios</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">Sem análise emocional</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">Sem comunidade</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">Sem conquistas especiais</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">Sem recomendações personalizadas</span>
                    </li>
                  </ul>
                </div>
              </Link>
            </AnimatedSection>

            {/* PLANO PRO - MAIS POPULAR */}
            <AnimatedSection animation="scale-in" delay={100}>
              <Link href="/planos" className="block">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-500 shadow-2xl scale-105 transition-all hover:shadow-3xl h-full flex flex-col relative cursor-pointer hover:scale-110">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg">
                      ⭐ MAIS POPULAR
                    </div>
                  </div>

                  <div className="mb-6 mt-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                    <p className="text-sm text-gray-600">Para quem quer evoluir de verdade</p>
                  </div>
                  
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-gray-900">R$ 49,90</span>
                    <span className="text-gray-600">/mês</span>
                  </div>

                  <div className="block w-full py-3 rounded-xl font-medium transition-all mb-8 text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl">
                    Começar teste grátis
                  </div>

                  <ul className="space-y-3 flex-grow">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 font-medium">Chat completo com a Aly (respostas ilimitadas)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Aly cria planos personalizados (rotina, finanças, emocional, foco, saúde, produtividade)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Acompanhamento diário da Aly com mensagens motivacionais</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Recomendações personalizadas de tarefas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Calendário completo + integração com metas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Notificações animadas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Cofrinho inteligente com alertas financeiros</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Análise emocional básica</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Relatórios semanais de progresso</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Conquistas exclusivas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Acesso à comunidade</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Suporte prioritário</span>
                    </li>
                  </ul>
                </div>
              </Link>
            </AnimatedSection>

            {/* PLANO AVANÇADO */}
            <AnimatedSection animation="scale-in" delay={200}>
              <Link href="/planos" className="block">
                <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-500 transition-all hover:shadow-2xl h-full flex flex-col cursor-pointer hover:scale-105">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Avançado</h3>
                    <p className="text-sm text-gray-600">Transformação completa</p>
                  </div>
                  
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-gray-900">R$ 89,90</span>
                    <span className="text-gray-600">/mês</span>
                  </div>

                  <div className="block w-full py-3 rounded-xl font-medium transition-all mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl">
                    Começar teste grátis
                  </div>

                  <ul className="space-y-3 flex-grow">
                    <li className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 font-semibold">Tudo do Pro +</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 font-medium">Aly Mentor (respostas mais profundas + longas + análises emocionais avançadas)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Planejamento mensal completo com IA</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Automação inteligente de tarefas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Relatórios completos (produtividade, humor, prioridades, financeiro)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Acompanhamento emocional com gráficos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Regras personalizadas (gatilhos de foco, bloqueio de distrações)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Roadmap de vida com metas de longo prazo</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Sugestões 24/7 da Aly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Acesso antecipado a novos recursos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Temas premium</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Dados ilimitados</span>
                    </li>
                  </ul>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Rocket className="w-4 h-4" />
                <span className="text-sm font-medium">Comece Agora</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Pronto para evoluir com clareza?
              </h2>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Junte-se a milhares de pessoas que já transformaram suas vidas com o Alinha.me. 
                Comece grátis e descubra o poder da organização inteligente.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link href="/login" className="inline-flex items-center gap-2 bg-white text-[#1F75FE] px-8 py-4 rounded-xl text-base font-medium hover:shadow-2xl transition-all hover:scale-105">
                  Começar gratuitamente
                  <Sparkles className="w-5 h-5" />
                </Link>
                <Link href="/planos" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-base font-medium hover:bg-white/20 transition-all border border-white/20">
                  Ver planos
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <p className="text-sm text-white/70 pt-4">
                Sem cartão de crédito necessário • Cancele quando quiser
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <AnimatedSection animation="fade-up">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image 
                    src="/icon.svg" 
                    alt="Alinha.me" 
                    width={40} 
                    height={40}
                  />
                  <div className="flex flex-col -space-y-1">
                    <span className="text-xl font-bold text-gray-900 tracking-tight">Alinha<span className="text-[#1F75FE]">.me</span></span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Clareza para evoluir todos os dias.
                </p>
              </div>
            </AnimatedSection>

            {/* Links */}
            <AnimatedSection animation="fade-up" delay={100}>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Produto</h3>
                <ul className="space-y-2">
                  {[
                    { label: "Recursos", href: "#recursos" },
                    { label: "Preços", href: "/planos" },
                    { label: "Integrações", href: "#" },
                    { label: "Atualizações", href: "#" }
                  ].map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Empresa</h3>
                <ul className="space-y-2">
                  {["Sobre", "Blog", "Carreiras", "Contato"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Suporte</h3>
                <ul className="space-y-2">
                  {["Central de ajuda", "Comunidade", "Status", "API"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Política de Privacidade
              </a>
            </div>

            <div className="flex items-center gap-4">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Instagram, label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#1F75FE] hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              © 2025 Alinha.me. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

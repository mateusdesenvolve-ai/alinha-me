"use client"

import { ArrowLeft, MessageCircle, Send, Sparkles, Lock } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePlan } from "@/hooks/usePlan"
import { useRouter } from "next/navigation"

export default function ChatAlyPage() {
  const router = useRouter()
  const { userPlan, hasAccess, getFeature } = usePlan()
  const [messages, setMessages] = useState([
    { id: 1, sender: "aly", text: "Olá! Sou a Aly, sua assistente pessoal. Como posso te ajudar hoje?" },
    { id: 2, sender: "user", text: "Oi Aly! Como está meu progresso?" },
    { id: 3, sender: "aly", text: "Seu progresso está ótimo! Você completou 85% das suas tarefas esta semana e manteve uma sequência de 12 dias. Continue assim! 🎉" }
  ])
  const [inputText, setInputText] = useState("")
  const [messagesUsedToday, setMessagesUsedToday] = useState(0)
  const [showLimitWarning, setShowLimitWarning] = useState(false)

  const maxMessages = getFeature('alyMessagesPerDay')
  const isUnlimited = maxMessages === 'unlimited'
  const hasReachedLimit = !isUnlimited && messagesUsedToday >= maxMessages

  useEffect(() => {
    // Carregar mensagens usadas hoje
    const today = new Date().toDateString()
    const savedData = localStorage.getItem('alyMessagesData')
    if (savedData) {
      const data = JSON.parse(savedData)
      if (data.date === today) {
        setMessagesUsedToday(data.count)
      } else {
        // Novo dia, resetar contador
        localStorage.setItem('alyMessagesData', JSON.stringify({ date: today, count: 0 }))
        setMessagesUsedToday(0)
      }
    } else {
      localStorage.setItem('alyMessagesData', JSON.stringify({ date: today, count: 0 }))
    }
  }, [])

  const sendMessage = () => {
    if (!inputText.trim()) return

    // Verificar limite
    if (hasReachedLimit) {
      setShowLimitWarning(true)
      setTimeout(() => setShowLimitWarning(false), 3000)
      return
    }

    // Adicionar mensagem do usuário
    setMessages([...messages, { id: Date.now(), sender: "user", text: inputText }])
    setInputText("")
    
    // Incrementar contador
    if (!isUnlimited) {
      const newCount = messagesUsedToday + 1
      setMessagesUsedToday(newCount)
      const today = new Date().toDateString()
      localStorage.setItem('alyMessagesData', JSON.stringify({ date: today, count: newCount }))
    }

    // Resposta da Aly
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: "aly",
        text: "Entendi! Deixe-me analisar isso para você..."
      }])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Voltar</span>
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Aly</h1>
                <p className="text-xs text-gray-500">Assistente IA</p>
              </div>
            </div>
            <div className="w-20"></div>
          </div>

          {/* Contador de mensagens */}
          {!isUnlimited && (
            <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-[#1F75FE]">{maxMessages - messagesUsedToday}</span> mensagens restantes hoje
                </p>
                {hasReachedLimit && (
                  <Link href="/planos">
                    <button className="text-xs bg-[#1F75FE] text-white px-3 py-1 rounded-lg hover:bg-[#0F65EE] transition-colors">
                      Upgrade
                    </button>
                  </Link>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div 
                  className="bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${((maxMessages - messagesUsedToday) / maxMessages) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Aviso de limite atingido */}
          {showLimitWarning && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-slideDown">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900 mb-1">
                    Limite de mensagens atingido
                  </p>
                  <p className="text-xs text-red-700 mb-3">
                    Você usou todas as suas {maxMessages} mensagens de hoje. Faça upgrade para mensagens ilimitadas!
                  </p>
                  <Link href="/planos">
                    <button className="text-xs bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Ver Planos
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`
                max-w-[80%] rounded-2xl px-4 py-3
                ${message.sender === "user"
                  ? "bg-[#1F75FE] text-white"
                  : "bg-white border border-gray-200 text-gray-900"
                }
              `}>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}

          {/* Mensagem de bloqueio se atingiu limite */}
          {hasReachedLimit && (
            <div className="flex justify-center">
              <div className="max-w-md bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-200 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Limite Diário Atingido
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Você usou suas {maxMessages} mensagens de hoje. Volte amanhã ou faça upgrade para mensagens ilimitadas!
                </p>
                <Link href="/planos">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] text-white rounded-xl font-medium hover:shadow-lg transition-all">
                    Desbloquear Ilimitado
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder={hasReachedLimit ? "Limite de mensagens atingido..." : "Digite sua mensagem..."}
              disabled={hasReachedLimit}
              className={`
                flex-1 px-4 py-3 border border-gray-300 rounded-xl 
                focus:ring-2 focus:ring-[#1F75FE] focus:border-transparent outline-none
                ${hasReachedLimit ? 'bg-gray-100 cursor-not-allowed' : ''}
              `}
            />
            <button
              onClick={sendMessage}
              disabled={hasReachedLimit}
              className={`
                p-3 rounded-xl transition-colors
                ${hasReachedLimit 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#1F75FE] text-white hover:bg-[#0F65EE]'
                }
              `}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

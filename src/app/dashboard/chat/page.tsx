"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Send, Smile, MoreVertical } from "lucide-react"
import { useRouter } from "next/navigation"

interface Message {
  id: number
  text: string
  sender: "user" | "aly"
  timestamp: Date
}

export default function ChatAlyPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Primeira mensagem automática ao abrir o chat
  useEffect(() => {
    const timer = setTimeout(() => {
      const welcomeMessage: Message = {
        id: Date.now(),
        text: "Oi, que bom ter você aqui! 💙 Como você está se sentindo hoje?",
        sender: "aly",
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
      
      // Mostrar "digitando..." após a primeira mensagem
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }, 1000)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const getAlyResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos para melhor detecção

    // Respostas empáticas e motivadoras
    if (lowerMessage.includes("mal") || lowerMessage.includes("triste") || lowerMessage.includes("ruim")) {
      return "Sinto muito que você esteja se sentindo assim. 💙 Lembre-se que dias difíceis fazem parte da jornada. Que tal começarmos com algo pequeno hoje? Uma tarefa simples pode fazer toda a diferença!"
    }

    if (lowerMessage.includes("bem") || lowerMessage.includes("otimo") || lowerMessage.includes("feliz") || lowerMessage.includes("bom")) {
      return "Que maravilha! 🎉 Fico muito feliz em saber! Continue assim, você está no caminho certo. Vamos aproveitar essa energia positiva para conquistar mais hoje?"
    }

    if (lowerMessage.includes("tarefa") || lowerMessage.includes("fazer") || lowerMessage.includes("atividade")) {
      return "Ótimo! Organizar suas tarefas é o primeiro passo para o sucesso. 📝 Que tal começar pela mais importante? Lembre-se: progresso, não perfeição!"
    }

    if (lowerMessage.includes("ajuda") || lowerMessage.includes("socorro") || lowerMessage.includes("nao sei")) {
      return "Estou aqui para te ajudar! 💪 Pode me contar o que está acontecendo? Juntos vamos encontrar uma solução. Você não está sozinho nessa jornada!"
    }

    if (lowerMessage.includes("obrigad") || lowerMessage.includes("valeu")) {
      return "Por nada! 💙 Estou sempre aqui para você. Conte comigo sempre que precisar!"
    }

    if (lowerMessage.includes("plano") || lowerMessage.includes("premium") || lowerMessage.includes("pago")) {
      return "Que bom que você se interessou! 🌟 Com o plano premium você tem acesso a análises mais profundas, relatórios personalizados e muito mais recursos para potencializar seus resultados. Quer saber mais detalhes?"
    }

    if (lowerMessage.includes("conquista") || lowerMessage.includes("consegui") || lowerMessage.includes("terminei")) {
      return "Parabéns pela conquista! 🎊 Você está arrasando! Cada passo conta e você está provando que é capaz. Continue assim!"
    }

    if (lowerMessage.includes("cansad") || lowerMessage.includes("exaust") || lowerMessage.includes("desistir")) {
      return "Entendo que você está cansado. 😔 Mas lembre-se: descansar não é desistir. Que tal fazer uma pausa, respirar fundo e voltar quando se sentir melhor? Eu acredito em você!"
    }

    if (lowerMessage.includes("motivacao") || lowerMessage.includes("animo")) {
      return "Você é mais forte do que imagina! 💪✨ Cada dia é uma nova oportunidade de ser melhor. Não desista dos seus sonhos, eles estão mais perto do que você pensa!"
    }

    // Resposta padrão empática
    return "Entendo você! 💙 Estou aqui para te apoiar em tudo. Como posso te ajudar hoje? Podemos conversar sobre suas tarefas, seus objetivos ou qualquer coisa que esteja em sua mente."
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")

    // Simular "digitando..." da Aly
    setIsTyping(true)

    // Resposta da Aly após 1-2 segundos
    setTimeout(() => {
      setIsTyping(false)
      
      const alyMessage: Message = {
        id: Date.now() + 1,
        text: getAlyResponse(inputValue),
        sender: "aly",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, alyMessage])
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* Header estilo WhatsApp */}
      <header className="bg-[#1F75FE] text-white px-4 py-3 flex items-center gap-4 shadow-md">
        <button
          onClick={() => router.push("/dashboard")}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 flex-1">
          {/* Avatar da Aly */}
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold">A</span>
          </div>

          <div className="flex-1">
            <h1 className="font-semibold text-base">Aly</h1>
            <p className="text-xs text-white/80">online</p>
          </div>
        </div>

        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Área de mensagens */}
      <div 
        className="flex-1 overflow-y-auto px-4 py-6 space-y-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slideIn`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={`max-w-[75%] sm:max-w-[60%] px-4 py-2.5 rounded-lg shadow-sm ${
                message.sender === "user"
                  ? "bg-[#DCF8C6] text-gray-900"
                  : "bg-white text-gray-900"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                {message.text}
              </p>
              <span className="text-[10px] text-gray-500 mt-1 block text-right">
                {message.timestamp.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </span>
            </div>
          </div>
        ))}

        {/* Indicador "digitando..." */}
        {isTyping && (
          <div className="flex justify-start animate-slideIn">
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Campo de input fixo */}
      <div className="bg-[#F0F2F5] px-4 py-3 border-t border-gray-200">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          {/* Botão emoji */}
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors mb-1">
            <Smile className="w-6 h-6" />
          </button>

          {/* Campo de texto */}
          <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-200 px-4 py-2.5 flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite uma mensagem..."
              className="flex-1 outline-none text-sm text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Botão enviar */}
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className={`p-3 rounded-full transition-all mb-1 ${
              inputValue.trim()
                ? "bg-[#1F75FE] text-white hover:bg-[#0F65EE] shadow-lg hover:scale-110"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

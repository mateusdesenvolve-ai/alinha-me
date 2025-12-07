"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/custom/logo"

// Perguntas do quiz na ordem exata solicitada
const quizQuestions = [
  {
    id: 0,
    question: "Como você se identifica?",
    options: [
      "Homem",
      "Mulher",
      "Prefiro não dizer",
      "Outro"
    ]
  },
  {
    id: 1,
    question: "Como você está vivendo sua vida hoje?",
    options: [
      "Muito bem, estou no caminho certo",
      "Bem, mas poderia melhorar",
      "Regular, sinto que falta algo",
      "Mal, preciso de mudanças urgentes"
    ]
  },
  {
    id: 2,
    question: "Qual área mais dói na sua vida?",
    options: [
      "Organização e produtividade",
      "Finanças e dinheiro",
      "Saúde física e mental",
      "Relacionamentos e conexões"
    ]
  },
  {
    id: 3,
    question: "O que você sente com mais frequência?",
    options: [
      "Ansiedade e preocupação",
      "Cansaço e exaustão",
      "Frustração e estagnação",
      "Confusão e falta de direção"
    ]
  },
  {
    id: 4,
    question: "Como é sua rotina?",
    options: [
      "Organizada e produtiva",
      "Razoável, mas desorganizada",
      "Caótica e sem controle",
      "Não tenho rotina definida"
    ]
  },
  {
    id: 5,
    question: "Quando tenta melhorar, o que acontece?",
    options: [
      "Consigo manter por um tempo",
      "Começo bem, mas desisto rápido",
      "Não sei por onde começar",
      "Tento, mas nada funciona"
    ]
  },
  {
    id: 6,
    question: "Como está sua confiança hoje?",
    options: [
      "Alta, acredito em mim",
      "Média, tenho altos e baixos",
      "Baixa, duvido muito de mim",
      "Muito baixa, não acredito mais"
    ]
  },
  {
    id: 7,
    question: "Qual área você quer transformar agora?",
    options: [
      "Carreira e finanças",
      "Saúde e bem-estar",
      "Relacionamentos e social",
      "Propósito e espiritualidade"
    ]
  },
  {
    id: 8,
    question: "O que mais te trava hoje?",
    options: [
      "Falta de tempo",
      "Falta de dinheiro",
      "Falta de motivação",
      "Falta de clareza"
    ]
  },
  {
    id: 9,
    question: "Quanto tempo por dia você pode dedicar?",
    options: [
      "Menos de 15 minutos",
      "15 a 30 minutos",
      "30 minutos a 1 hora",
      "Mais de 1 hora"
    ]
  },
  {
    id: 10,
    question: "Como prefere ser guiado pela Aly?",
    options: [
      "Com metas claras e prazos",
      "Com lembretes e incentivos",
      "Com análises e insights",
      "Com conversas e suporte"
    ]
  }
]

export default function QuizInicialPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const totalQuestions = quizQuestions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100
  const isLastQuestion = currentQuestion === totalQuestions - 1
  const isQuizComplete = answers.length === totalQuestions

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const handleNext = () => {
    if (selectedOption === null) return

    // Salvar resposta
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedOption
    setAnswers(newAnswers)

    // Animação de transição
    setIsAnimating(true)

    setTimeout(() => {
      if (isLastQuestion) {
        // Quiz completo - não avança mais
        setIsAnimating(false)
      } else {
        // Próxima pergunta
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
        setIsAnimating(false)
      }
    }, 300)
  }

  const handleGeneratePlan = () => {
    // Salvar as respostas no localStorage para usar depois
    localStorage.setItem("quizAnswers", JSON.stringify(answers))
    
    // Redirecionar para a tela de loading
    router.push("/loading-quiz")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block mb-6">
            <Logo size="lg" />
          </div>
        </div>

        {/* Card Principal do Quiz */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
          {!isQuizComplete ? (
            <>
              {/* Barra de Progresso */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Pergunta {currentQuestion + 1}/{totalQuestions}
                  </span>
                  <span className="text-sm font-semibold text-[#1F75FE]">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Pergunta */}
              <div
                className={`transition-all duration-300 ${
                  isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 leading-tight">
                  {quizQuestions[currentQuestion].question}
                </h2>

                {/* Opções de Resposta */}
                <div className="space-y-3 mb-8">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all duration-200 ${
                        selectedOption === index
                          ? "border-[#1F75FE] bg-blue-50 shadow-md scale-[1.02]"
                          : "border-gray-200 bg-white hover:border-[#1F75FE] hover:bg-blue-50 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            selectedOption === index
                              ? "border-[#1F75FE] bg-[#1F75FE]"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedOption === index && (
                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span
                          className={`text-base font-medium transition-colors ${
                            selectedOption === index ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Botão Próximo */}
                {selectedOption !== null && (
                  <button
                    onClick={handleNext}
                    className="w-full bg-[#1F75FE] text-white px-6 py-4 rounded-2xl font-semibold hover:bg-[#0F65EE] transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 animate-fadeIn"
                  >
                    <span>{isLastQuestion ? "Finalizar" : "Próxima"}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </>
          ) : (
            // Tela Final do Quiz
            <div className="text-center py-8 animate-fadeIn">
              <div className="w-20 h-20 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
                <Sparkles className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Quiz Completo!
              </h2>

              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Agora a Aly vai analisar suas respostas e criar um plano personalizado para você evoluir.
              </p>

              <button
                onClick={handleGeneratePlan}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all hover:scale-[1.05] active:scale-[0.98]"
              >
                <Sparkles className="w-6 h-6" />
                <span>Gerar meu plano com a Aly</span>
              </button>
            </div>
          )}
        </div>

        {/* Voltar */}
        {!isQuizComplete && (
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Voltar
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

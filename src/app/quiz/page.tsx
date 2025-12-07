"use client"

import { useState } from "react"
import { Check, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const quizAreas = [
  {
    id: "organizacao",
    title: "Organização",
    questions: [
      "Como você avalia sua organização diária?",
      "Você consegue cumprir suas tarefas no prazo?",
      "Sente que perde tempo procurando coisas?"
    ]
  },
  {
    id: "financeiro",
    title: "Financeiro",
    questions: [
      "Como está sua saúde financeira?",
      "Você tem controle dos seus gastos?",
      "Consegue poupar mensalmente?"
    ]
  },
  {
    id: "emocional",
    title: "Emocional",
    questions: [
      "Como você se sente emocionalmente?",
      "Consegue lidar bem com o estresse?",
      "Tem momentos de autocuidado?"
    ]
  },
  {
    id: "relacionamento",
    title: "Relacionamento",
    questions: [
      "Como estão seus relacionamentos?",
      "Você dedica tempo para pessoas importantes?",
      "Sente-se conectado com quem ama?"
    ]
  },
  {
    id: "saude",
    title: "Saúde",
    questions: [
      "Como está sua saúde física?",
      "Você pratica exercícios regularmente?",
      "Sua alimentação é equilibrada?"
    ]
  },
  {
    id: "espiritualidade",
    title: "Espiritualidade",
    questions: [
      "Você tem práticas espirituais?",
      "Sente propósito no que faz?",
      "Dedica tempo para reflexão?"
    ]
  },
  {
    id: "habitos",
    title: "Hábitos",
    questions: [
      "Você mantém hábitos saudáveis?",
      "Consegue ser consistente com suas rotinas?",
      "Tem hábitos que gostaria de mudar?"
    ]
  },
  {
    id: "metas",
    title: "Metas",
    questions: [
      "Você tem metas claras?",
      "Está progredindo em direção aos seus objetivos?",
      "Sente que está evoluindo?"
    ]
  }
]

export default function QuizPage() {
  const [currentArea, setCurrentArea] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number[]>>({})
  const [completed, setCompleted] = useState(false)

  const handleAnswer = (questionIndex: number, value: number) => {
    const areaId = quizAreas[currentArea].id
    const areaAnswers = answers[areaId] || []
    const newAnswers = [...areaAnswers]
    newAnswers[questionIndex] = value
    
    setAnswers({
      ...answers,
      [areaId]: newAnswers
    })
  }

  const canProceed = () => {
    const areaId = quizAreas[currentArea].id
    const areaAnswers = answers[areaId] || []
    return areaAnswers.length === quizAreas[currentArea].questions.length
  }

  const handleNext = () => {
    if (currentArea < quizAreas.length - 1) {
      setCurrentArea(currentArea + 1)
    } else {
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentArea > 0) {
      setCurrentArea(currentArea - 1)
    }
  }

  const progress = ((currentArea + 1) / quizAreas.length) * 100

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF6A3D] to-[#FF8C5A] rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Análise concluída!
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            A Aly está analisando suas respostas e criando metas personalizadas para você. 
            Vamos começar sua jornada de evolução!
          </p>

          <div className="pt-6">
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-[#FF6A3D] text-white px-8 py-4 rounded-xl text-base font-medium hover:bg-[#FF5A2D] transition-all hover:shadow-xl hover:scale-105"
            >
              Ver minhas metas
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentQuizArea = quizAreas[currentArea]
  const areaAnswers = answers[currentQuizArea.id] || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Área {currentArea + 1} de {quizAreas.length}
            </span>
            <span className="text-sm font-medium text-[#FF6A3D]">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#FF6A3D] to-[#FF8C5A] h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 space-y-8">
          {/* Area Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-[#FF6A3D] px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {currentQuizArea.title}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Vamos entender sua área de {currentQuizArea.title}
            </h2>
          </div>

          {/* Questions */}
          <div className="space-y-8">
            {currentQuizArea.questions.map((question, qIndex) => (
              <div key={qIndex} className="space-y-4">
                <p className="text-lg font-medium text-gray-900">
                  {qIndex + 1}. {question}
                </p>
                
                {/* Rating Scale */}
                <div className="flex items-center justify-between gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleAnswer(qIndex, value)}
                      className={`flex-1 h-12 rounded-xl border-2 transition-all font-medium ${
                        areaAnswers[qIndex] === value
                          ? 'border-[#FF6A3D] bg-[#FF6A3D] text-white shadow-lg scale-105'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-[#FF6A3D] hover:bg-orange-50'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Muito ruim</span>
                  <span>Excelente</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-100">
            <button
              onClick={handlePrevious}
              disabled={currentArea === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentArea === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all ${
                canProceed()
                  ? 'bg-[#FF6A3D] text-white hover:bg-[#FF5A2D] hover:shadow-lg hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentArea === quizAreas.length - 1 ? 'Finalizar' : 'Próxima'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

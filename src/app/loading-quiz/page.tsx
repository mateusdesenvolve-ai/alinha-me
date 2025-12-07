"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Brain, Target, Zap } from "lucide-react"
import { generatePersonalizedRoutine } from "@/lib/routineGenerator"

export default function LoadingQuizPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { icon: Brain, text: "Analisando suas respostas...", duration: 2000 },
    { icon: Target, text: "Identificando suas dores principais...", duration: 2000 },
    { icon: Zap, text: "Definindo seus objetivos...", duration: 2000 },
    { icon: Sparkles, text: "Criando rotinas personalizadas...", duration: 2000 }
  ]

  useEffect(() => {
    // Recuperar respostas do quiz
    const quizAnswers = localStorage.getItem("quizAnswers")
    
    if (!quizAnswers) {
      router.push("/quiz-inicial")
      return
    }

    // Simular progresso
    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + (100 / (totalDuration / 100))
      })
    }, 100)

    // Avançar pelos steps
    let currentTime = 0
    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index)
      }, currentTime)
      currentTime += step.duration
    })

    // Gerar rotina e redirecionar
    setTimeout(() => {
      try {
        const answers = JSON.parse(quizAnswers)
        const routine = generatePersonalizedRoutine(answers)
        
        // Salvar rotina gerada
        localStorage.setItem("personalizedRoutine", JSON.stringify(routine))
        
        // Redirecionar para dashboard
        router.push("/dashboard")
      } catch (error) {
        console.error("Erro ao gerar rotina:", error)
        router.push("/dashboard")
      }
    }, totalDuration)

    return () => clearInterval(interval)
  }, [router])

  const CurrentIcon = steps[currentStep]?.icon || Sparkles

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F75FE] via-[#3B8BFF] to-[#5BA3FF] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Card Principal */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Ícone Animado */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <CurrentIcon className="w-12 h-12 text-[#1F75FE] animate-spin-slow" />
            </div>
          </div>

          {/* Texto do Step Atual */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 animate-fadeIn">
              {steps[currentStep]?.text}
            </h2>
            <p className="text-white/80 text-sm">
              A Aly está criando seu plano personalizado
            </p>
          </div>

          {/* Barra de Progresso */}
          <div className="mb-6">
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-white h-3 rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-white/90 text-sm font-medium mt-2">
              {Math.round(progress)}%
            </p>
          </div>

          {/* Steps Indicator */}
          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep
                    ? "w-8 bg-white"
                    : "w-2 bg-white/30"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Mensagem Motivacional */}
        <div className="text-center mt-6 animate-fadeIn">
          <p className="text-white/90 text-sm">
            ✨ Preparando uma experiência única para você
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-spin-slow {
          animation: spinSlow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}

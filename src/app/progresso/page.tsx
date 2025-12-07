"use client"

import { ArrowLeft, TrendingUp, Target, Award, Calendar } from "lucide-react"
import Link from "next/link"

export default function ProgressoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Voltar</span>
              </button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Progresso</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Estatísticas Gerais</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-3xl font-bold text-[#1F75FE]">156</p>
              <p className="text-sm text-gray-600 mt-1">Tarefas</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-3xl font-bold text-green-600">12</p>
              <p className="text-sm text-gray-600 mt-1">Dias</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <p className="text-3xl font-bold text-purple-600">8</p>
              <p className="text-sm text-gray-600 mt-1">Hábitos</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <p className="text-3xl font-bold text-orange-600">85%</p>
              <p className="text-sm text-gray-600 mt-1">Taxa</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Conquistas</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
              <Award className="w-10 h-10 text-yellow-600" />
              <div>
                <p className="font-bold text-gray-900">Sequência de 12 dias</p>
                <p className="text-sm text-gray-600">Continue assim!</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <Target className="w-10 h-10 text-blue-600" />
              <div>
                <p className="font-bold text-gray-900">100 tarefas concluídas</p>
                <p className="text-sm text-gray-600">Parabéns!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

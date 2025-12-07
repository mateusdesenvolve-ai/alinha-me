"use client"

import { TrendingUp, Target, Award, BarChart3 } from "lucide-react"

export function ProductivitySettings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Produtividade</h1>
        <p className="text-sm text-gray-500 mt-1">Acompanhe suas estatísticas e evolução</p>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Tarefas concluídas</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">247</p>
          <p className="text-xs text-gray-600 mt-1">Este mês</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Sequência</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-xs text-gray-600 mt-1">Dias seguidos</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Conquistas</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-xs text-gray-600 mt-1">Desbloqueadas</p>
        </div>
      </div>

      {/* Histórico de Metas */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-900">Histórico de metas</h3>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Ler 12 livros em 2024</span>
              <span className="text-xs text-green-600 font-medium">Concluída</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">12 de 12 livros</p>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Economizar R$ 3.000</span>
              <span className="text-xs text-blue-600 font-medium">Em progresso</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "42%" }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">R$ 1.250 de R$ 3.000</p>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Meditar 30 dias seguidos</span>
              <span className="text-xs text-orange-600 font-medium">Em progresso</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "40%" }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">12 de 30 dias</p>
          </div>
        </div>
      </div>

      {/* Registro de Hábitos */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Registro de hábitos</h3>
        
        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
          <div className="grid grid-cols-7 gap-2 mb-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Dom</p>
              <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto" />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Seg</p>
              <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto" />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Ter</p>
              <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto" />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Qua</p>
              <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto" />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Qui</p>
              <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto" />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Sex</p>
              <div className="w-8 h-8 bg-gray-200 rounded-lg mx-auto" />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Sáb</p>
              <div className="w-8 h-8 bg-gray-200 rounded-lg mx-auto" />
            </div>
          </div>
          <p className="text-sm text-gray-700 text-center">
            <span className="font-bold text-green-600">5 dias</span> de consistência esta semana
          </p>
        </div>
      </div>
    </div>
  )
}

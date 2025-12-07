"use client"

import { useState } from "react"
import { Zap, Calendar, Clock } from "lucide-react"

export function QuickAddSettings() {
  const [autoRecognition, setAutoRecognition] = useState(true)
  const [shortcuts, setShortcuts] = useState(true)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Adição rápida</h1>
        <p className="text-sm text-gray-500 mt-1">Configure atalhos e reconhecimento automático</p>
      </div>

      {/* Atalhos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Atalhos de teclado</p>
              <p className="text-xs text-gray-500">Ativar atalhos para adicionar tarefas rapidamente</p>
            </div>
          </div>
          <button
            onClick={() => setShortcuts(!shortcuts)}
            className={`
              relative w-12 h-6 rounded-full transition-colors
              ${shortcuts ? "bg-[#1F75FE]" : "bg-gray-300"}
            `}
          >
            <span
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                ${shortcuts ? "translate-x-6" : "translate-x-0"}
              `}
            />
          </button>
        </div>
      </div>

      {/* Lista de Atalhos */}
      {shortcuts && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Atalhos disponíveis</label>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700">Adicionar tarefa</span>
              <kbd className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                Ctrl + N
              </kbd>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700">Buscar</span>
              <kbd className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                Ctrl + K
              </kbd>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700">Abrir calendário</span>
              <kbd className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                Ctrl + C
              </kbd>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700">Chat com Aly</span>
              <kbd className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                Ctrl + A
              </kbd>
            </div>
          </div>
        </div>
      )}

      {/* Reconhecimento Automático */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Reconhecimento automático</p>
              <p className="text-xs text-gray-500">Detectar datas e horários automaticamente</p>
            </div>
          </div>
          <button
            onClick={() => setAutoRecognition(!autoRecognition)}
            className={`
              relative w-12 h-6 rounded-full transition-colors
              ${autoRecognition ? "bg-[#1F75FE]" : "bg-gray-300"}
            `}
          >
            <span
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                ${autoRecognition ? "translate-x-6" : "translate-x-0"}
              `}
            />
          </button>
        </div>
      </div>

      {/* Exemplos de Reconhecimento */}
      {autoRecognition && (
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Exemplos de reconhecimento
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-700 mb-1">"Reunião amanhã às 14h"</p>
              <p className="text-xs text-gray-500">→ Detecta: Data (amanhã) + Horário (14:00)</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-700 mb-1">"Ligar para João na próxima segunda"</p>
              <p className="text-xs text-gray-500">→ Detecta: Data (próxima segunda-feira)</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-700 mb-1">"Treino todo dia às 18h"</p>
              <p className="text-xs text-gray-500">→ Detecta: Recorrência (diária) + Horário (18:00)</p>
            </div>
          </div>
        </div>
      )}

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-[#1F75FE] text-white rounded-lg text-sm font-medium hover:bg-[#0F65EE] transition-colors">
          Salvar alterações
        </button>
      </div>
    </div>
  )
}

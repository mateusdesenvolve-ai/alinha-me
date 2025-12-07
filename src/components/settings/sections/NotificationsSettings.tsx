"use client"

import { useState } from "react"
import { BellRing, Smartphone, Mail, Volume2 } from "lucide-react"

export function NotificationsSettings() {
  const [pushEnabled, setPushEnabled] = useState(true)
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie como você recebe notificações</p>
      </div>

      {/* Notificações Push */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Notificações push</p>
              <p className="text-xs text-gray-500">Receber notificações no dispositivo</p>
            </div>
          </div>
          <button
            onClick={() => setPushEnabled(!pushEnabled)}
            className={`
              relative w-12 h-6 rounded-full transition-colors
              ${pushEnabled ? "bg-[#1F75FE]" : "bg-gray-300"}
            `}
          >
            <span
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                ${pushEnabled ? "translate-x-6" : "translate-x-0"}
              `}
            />
          </button>
        </div>
      </div>

      {/* Notificações por E-mail */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Notificações por e-mail</p>
              <p className="text-xs text-gray-500">Receber resumos e atualizações por e-mail</p>
            </div>
          </div>
          <button
            onClick={() => setEmailEnabled(!emailEnabled)}
            className={`
              relative w-12 h-6 rounded-full transition-colors
              ${emailEnabled ? "bg-[#1F75FE]" : "bg-gray-300"}
            `}
          >
            <span
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                ${emailEnabled ? "translate-x-6" : "translate-x-0"}
              `}
            />
          </button>
        </div>
      </div>

      {/* Sons */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Sons de notificação</p>
              <p className="text-xs text-gray-500">Reproduzir som ao receber notificações</p>
            </div>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`
              relative w-12 h-6 rounded-full transition-colors
              ${soundEnabled ? "bg-[#1F75FE]" : "bg-gray-300"}
            `}
          >
            <span
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                ${soundEnabled ? "translate-x-6" : "translate-x-0"}
              `}
            />
          </button>
        </div>
      </div>

      {/* Preferências de E-mail */}
      {emailEnabled && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Preferências de e-mail</h3>
          
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#1F75FE] rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">Resumo diário</p>
                <p className="text-xs text-gray-500">Receber resumo das tarefas do dia</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#1F75FE] rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">Resumo semanal</p>
                <p className="text-xs text-gray-500">Estatísticas e progresso da semana</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" className="w-4 h-4 text-[#1F75FE] rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">Dicas e novidades</p>
                <p className="text-xs text-gray-500">Receber dicas de produtividade e atualizações</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" className="w-4 h-4 text-[#1F75FE] rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">Ofertas e promoções</p>
                <p className="text-xs text-gray-500">Receber ofertas especiais do Alinha.me</p>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Preferências de Push */}
      {pushEnabled && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Preferências de push</h3>
          
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#1F75FE] rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">Tarefas urgentes</p>
                <p className="text-xs text-gray-500">Notificar sobre tarefas com prazo próximo</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#1F75FE] rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">Conquistas</p>
                <p className="text-xs text-gray-500">Notificar quando desbloquear conquistas</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#1F75FE] rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">Atividade de amigos</p>
                <p className="text-xs text-gray-500">Ver quando amigos completam metas</p>
              </div>
            </label>
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

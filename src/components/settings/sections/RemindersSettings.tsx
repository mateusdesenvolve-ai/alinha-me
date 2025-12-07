"use client"

import { useState } from "react"
import { Bell, Clock } from "lucide-react"

export function RemindersSettings() {
  const [defaultReminder, setDefaultReminder] = useState("30min")
  const [enableReminders, setEnableReminders] = useState(true)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lembretes</h1>
        <p className="text-sm text-gray-500 mt-1">Configure suas preferências de lembretes</p>
      </div>

      {/* Ativar Lembretes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Ativar lembretes</p>
              <p className="text-xs text-gray-500">Receber notificações de tarefas e eventos</p>
            </div>
          </div>
          <button
            onClick={() => setEnableReminders(!enableReminders)}
            className={`
              relative w-12 h-6 rounded-full transition-colors
              ${enableReminders ? "bg-[#1F75FE]" : "bg-gray-300"}
            `}
          >
            <span
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                ${enableReminders ? "translate-x-6" : "translate-x-0"}
              `}
            />
          </button>
        </div>
      </div>

      {/* Lembrete Padrão */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Lembrete padrão
        </label>
        <select
          value={defaultReminder}
          onChange={(e) => setDefaultReminder(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F75FE] focus:border-transparent"
          disabled={!enableReminders}
        >
          <option value="none">Sem lembrete</option>
          <option value="5min">5 minutos antes</option>
          <option value="15min">15 minutos antes</option>
          <option value="30min">30 minutos antes</option>
          <option value="1hour">1 hora antes</option>
          <option value="1day">1 dia antes</option>
        </select>
      </div>

      {/* Preferências de Horário */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Horários de notificação</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Lembrete matinal</p>
              <p className="text-xs text-gray-500">Resumo das tarefas do dia</p>
            </div>
            <input
              type="time"
              defaultValue="08:00"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              disabled={!enableReminders}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Lembrete noturno</p>
              <p className="text-xs text-gray-500">Revisão do dia e preparação para amanhã</p>
            </div>
            <input
              type="time"
              defaultValue="20:00"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              disabled={!enableReminders}
            />
          </div>
        </div>
      </div>

      {/* Tipos de Lembretes */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Tipos de lembretes</h3>
        
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" defaultChecked disabled={!enableReminders} className="w-4 h-4 text-[#1F75FE] rounded" />
            <div>
              <p className="text-sm font-medium text-gray-900">Tarefas pendentes</p>
              <p className="text-xs text-gray-500">Lembrar de tarefas não concluídas</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" defaultChecked disabled={!enableReminders} className="w-4 h-4 text-[#1F75FE] rounded" />
            <div>
              <p className="text-sm font-medium text-gray-900">Eventos do calendário</p>
              <p className="text-xs text-gray-500">Notificar sobre compromissos agendados</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" defaultChecked disabled={!enableReminders} className="w-4 h-4 text-[#1F75FE] rounded" />
            <div>
              <p className="text-sm font-medium text-gray-900">Metas e hábitos</p>
              <p className="text-xs text-gray-500">Lembrar de registrar progresso</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" disabled={!enableReminders} className="w-4 h-4 text-[#1F75FE] rounded" />
            <div>
              <p className="text-sm font-medium text-gray-900">Mensagens de amigos</p>
              <p className="text-xs text-gray-500">Notificar quando receber mensagens</p>
            </div>
          </label>
        </div>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-[#1F75FE] text-white rounded-lg text-sm font-medium hover:bg-[#0F65EE] transition-colors">
          Salvar alterações
        </button>
      </div>
    </div>
  )
}

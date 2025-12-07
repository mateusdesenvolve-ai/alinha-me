"use client"

import { useState } from "react"
import { X, Bell, Moon, Globe, Shield, Trash2, Download, Upload } from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("pt-BR")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Configurações</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Notificações */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#1F75FE]" />
              Notificações
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-900">Ativar notificações</span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-5 h-5 text-[#1F75FE] rounded focus:ring-2 focus:ring-[#1F75FE]"
                />
              </label>
            </div>
          </div>

          {/* Aparência */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Moon className="w-5 h-5 text-[#1F75FE]" />
              Aparência
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-900">Modo escuro</span>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="w-5 h-5 text-[#1F75FE] rounded focus:ring-2 focus:ring-[#1F75FE]"
                />
              </label>
            </div>
          </div>

          {/* Idioma */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#1F75FE]" />
              Idioma
            </h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1F75FE] focus:border-transparent"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>

          {/* Privacidade */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#1F75FE]" />
              Privacidade e Segurança
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-900">Alterar senha</span>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-900">Privacidade dos dados</span>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          {/* Dados */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-[#1F75FE]" />
              Gerenciar Dados
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Exportar meus dados</span>
                </div>
                <span className="text-blue-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Upload className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Fazer backup</span>
                </div>
                <span className="text-green-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-900">Excluir minha conta</span>
                </div>
                <span className="text-red-400">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-[#1F75FE] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#0F65EE] transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  )
}

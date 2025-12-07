"use client"

import { useState } from "react"
import { Globe, Moon, Calendar, Volume2 } from "lucide-react"

export function GeneralSettings() {
  const [theme, setTheme] = useState("light")
  const [language, setLanguage] = useState("pt-BR")
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY")
  const [firstDayOfWeek, setFirstDayOfWeek] = useState("monday")
  const [soundsEnabled, setSoundsEnabled] = useState(true)

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Geral</h1>

      {/* Idioma */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Idioma
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F75FE] focus:border-transparent"
        >
          <option value="pt-BR">Português (Brasil)</option>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Español</option>
          <option value="fr-FR">Français</option>
        </select>
      </div>

      {/* Tema */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Moon className="w-4 h-4" />
          Tema
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTheme("light")}
            className={`
              p-4 border-2 rounded-lg transition-all
              ${theme === "light"
                ? "border-[#1F75FE] bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
              }
            `}
          >
            <div className="w-full h-20 bg-white border border-gray-200 rounded mb-2"></div>
            <p className="text-sm font-medium text-gray-900">Claro</p>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`
              p-4 border-2 rounded-lg transition-all
              ${theme === "dark"
                ? "border-[#1F75FE] bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
              }
            `}
          >
            <div className="w-full h-20 bg-gray-900 border border-gray-700 rounded mb-2"></div>
            <p className="text-sm font-medium text-gray-900">Escuro</p>
          </button>
        </div>
      </div>

      {/* Formato de Data */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Formato de data
        </label>
        <select
          value={dateFormat}
          onChange={(e) => setDateFormat(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F75FE] focus:border-transparent"
        >
          <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
          <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
        </select>
      </div>

      {/* Primeiro Dia da Semana */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Primeiro dia da semana</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setFirstDayOfWeek("sunday")}
            className={`
              px-4 py-3 border-2 rounded-lg transition-all text-sm font-medium
              ${firstDayOfWeek === "sunday"
                ? "border-[#1F75FE] bg-blue-50 text-[#1F75FE]"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Domingo
          </button>
          <button
            onClick={() => setFirstDayOfWeek("monday")}
            className={`
              px-4 py-3 border-2 rounded-lg transition-all text-sm font-medium
              ${firstDayOfWeek === "monday"
                ? "border-[#1F75FE] bg-blue-50 text-[#1F75FE]"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Segunda-feira
          </button>
        </div>
      </div>

      {/* Sons e Vibrações */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Sons e vibrações</p>
              <p className="text-xs text-gray-500">Ativar feedback sonoro e tátil</p>
            </div>
          </div>
          <button
            onClick={() => setSoundsEnabled(!soundsEnabled)}
            className={`
              relative w-12 h-6 rounded-full transition-colors
              ${soundsEnabled ? "bg-[#1F75FE]" : "bg-gray-300"}
            `}
          >
            <span
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                ${soundsEnabled ? "translate-x-6" : "translate-x-0"}
              `}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

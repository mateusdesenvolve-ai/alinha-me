"use client"

import { useState } from "react"
import { Palette, Check } from "lucide-react"

export function ThemeSettings() {
  const [selectedTheme, setSelectedTheme] = useState("blue")
  const [selectedPalette, setSelectedPalette] = useState("default")

  const themes = [
    { id: "blue", name: "Azul", primary: "#1F75FE", secondary: "#5BA3FF" },
    { id: "purple", name: "Roxo", primary: "#8B5CF6", secondary: "#A78BFA" },
    { id: "green", name: "Verde", primary: "#10B981", secondary: "#34D399" },
    { id: "orange", name: "Laranja", primary: "#F97316", secondary: "#FB923C" },
    { id: "pink", name: "Rosa", primary: "#EC4899", secondary: "#F472B6" },
    { id: "red", name: "Vermelho", primary: "#EF4444", secondary: "#F87171" }
  ]

  const palettes = [
    { id: "default", name: "Padrão", description: "Cores equilibradas" },
    { id: "vibrant", name: "Vibrante", description: "Cores intensas" },
    { id: "pastel", name: "Pastel", description: "Cores suaves" },
    { id: "dark", name: "Escuro", description: "Tons profundos" }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tema</h1>
        <p className="text-sm text-gray-500 mt-1">Personalize a aparência do Alinha.me</p>
      </div>

      {/* Cores Principais */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Cor principal do app
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`
                relative p-4 border-2 rounded-xl transition-all
                ${selectedTheme === theme.id
                  ? "border-gray-900 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                />
                <span className="text-sm font-medium text-gray-900">{theme.name}</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: theme.secondary }} />
              </div>
              {selectedTheme === theme.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Paleta de Cores */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700">Paleta de cores</label>
        <div className="grid md:grid-cols-2 gap-3">
          {palettes.map((palette) => (
            <button
              key={palette.id}
              onClick={() => setSelectedPalette(palette.id)}
              className={`
                p-4 border-2 rounded-xl transition-all text-left
                ${selectedPalette === palette.id
                  ? "border-[#1F75FE] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{palette.name}</span>
                {selectedPalette === palette.id && (
                  <div className="w-5 h-5 bg-[#1F75FE] rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">{palette.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Preview</h3>
        <div className="space-y-3">
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-lg" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Exemplo de Card</p>
                <p className="text-xs text-gray-500">Visualize como ficará</p>
              </div>
            </div>
            <button className="w-full py-2 bg-[#1F75FE] text-white rounded-lg text-sm font-medium">
              Botão de Exemplo
            </button>
          </div>
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

"use client"

import { useState } from "react"
import { Eye, EyeOff, GripVertical } from "lucide-react"

export function SidebarSettings() {
  const [sections, setSections] = useState([
    { id: "dashboard", name: "Dashboard", visible: true, icon: "📊" },
    { id: "tarefas", name: "Tarefas", visible: true, icon: "✅" },
    { id: "chat", name: "Chat da Aly", visible: true, icon: "💬" },
    { id: "progresso", name: "Progresso", visible: true, icon: "📈" },
    { id: "cofrinho", name: "Cofrinho", visible: true, icon: "💰" },
    { id: "calendario", name: "Calendário", visible: true, icon: "📅" },
    { id: "amigos", name: "Amigos", visible: true, icon: "👥" },
    { id: "configuracoes", name: "Configurações", visible: true, icon: "⚙️" }
  ])

  const [showIcons, setShowIcons] = useState(true)

  const toggleVisibility = (id: string) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, visible: !section.visible } : section
    ))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Barra lateral</h1>
        <p className="text-sm text-gray-500 mt-1">Personalize o menu de navegação</p>
      </div>

      {/* Alternar Ícones */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-900">Mostrar ícones</p>
            <p className="text-xs text-gray-500">Exibir ícones ao lado dos itens do menu</p>
          </div>
          <button
            onClick={() => setShowIcons(!showIcons)}
            className={`
              relative w-12 h-6 rounded-full transition-colors
              ${showIcons ? "bg-[#1F75FE]" : "bg-gray-300"}
            `}
          >
            <span
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                ${showIcons ? "translate-x-6" : "translate-x-0"}
              `}
            />
          </button>
        </div>
      </div>

      {/* Reordenar e Mostrar/Ocultar */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Itens do menu</label>
        <p className="text-xs text-gray-500">Arraste para reordenar ou clique no ícone de olho para mostrar/ocultar</p>
        
        <div className="space-y-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`
                flex items-center gap-3 p-4 bg-white border-2 rounded-lg transition-all
                ${section.visible ? "border-gray-200" : "border-gray-100 opacity-50"}
              `}
            >
              <button className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                <GripVertical className="w-5 h-5" />
              </button>

              {showIcons && (
                <span className="text-xl">{section.icon}</span>
              )}

              <span className="flex-1 text-sm font-medium text-gray-900">
                {section.name}
              </span>

              <button
                onClick={() => toggleVisibility(section.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {section.visible ? (
                  <Eye className="w-5 h-5 text-gray-600" />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Preview da barra lateral</h3>
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-1">
          {sections.filter(s => s.visible).map((section) => (
            <div
              key={section.id}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              {showIcons && <span className="text-base">{section.icon}</span>}
              <span className="text-sm text-gray-700">{section.name}</span>
            </div>
          ))}
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

"use client"

import { Link2, Check, X } from "lucide-react"

export function IntegrationsSettings() {
  const integrations = [
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Sincronize suas tarefas com o Google Calendar",
      icon: "📅",
      connected: true,
      color: "blue"
    },
    {
      id: "apple-calendar",
      name: "Apple Calendar",
      description: "Integre com o calendário da Apple",
      icon: "",
      connected: false,
      color: "gray"
    },
    {
      id: "notion",
      name: "Notion",
      description: "Exporte tarefas e notas para o Notion",
      icon: "📝",
      connected: false,
      color: "gray"
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Conecte com milhares de aplicativos",
      icon: "⚡",
      connected: false,
      color: "orange"
    },
    {
      id: "slack",
      name: "Slack",
      description: "Receba notificações no Slack",
      icon: "💬",
      connected: false,
      color: "purple"
    },
    {
      id: "trello",
      name: "Trello",
      description: "Sincronize boards e cards",
      icon: "📋",
      connected: false,
      color: "blue"
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Integrações</h1>
        <p className="text-sm text-gray-500 mt-1">Conecte o Alinha.me com seus aplicativos favoritos</p>
      </div>

      {/* Integrações Disponíveis */}
      <div className="grid md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className={`
              p-6 bg-white border-2 rounded-xl transition-all hover:shadow-lg
              ${integration.connected ? "border-green-200 bg-green-50" : "border-gray-200"}
            `}
          >
            <div className="flex items-start gap-4">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0
                ${integration.connected ? "bg-green-100" : "bg-gray-100"}
              `}>
                {integration.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-gray-900">{integration.name}</h3>
                  {integration.connected && (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium px-2 py-0.5 bg-green-100 rounded-full">
                      <Check className="w-3 h-3" />
                      Conectado
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                
                {integration.connected ? (
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      Configurar
                    </button>
                    <button className="px-4 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors">
                      Desconectar
                    </button>
                  </div>
                ) : (
                  <button className="px-4 py-2 bg-[#1F75FE] text-white rounded-lg text-sm font-medium hover:bg-[#0F65EE] transition-colors">
                    Conectar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detalhes da Integração Conectada */}
      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Check className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Google Calendar conectado</h3>
            <p className="text-sm text-gray-600">
              Suas tarefas estão sendo sincronizadas automaticamente com o Google Calendar.
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-600" />
            <span>Sincronização bidirecional ativa</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-600" />
            <span>Última sincronização: há 5 minutos</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-600" />
            <span>247 eventos sincronizados</span>
          </div>
        </div>
      </div>

      {/* Informações */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Link2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">Sobre as integrações</p>
            <p className="text-sm text-blue-800">
              As integrações permitem que você conecte o Alinha.me com outros aplicativos que você usa no dia a dia. 
              Seus dados são sincronizados de forma segura e você pode desconectar a qualquer momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

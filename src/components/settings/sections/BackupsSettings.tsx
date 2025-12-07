"use client"

import { Database, Download, Upload, Clock } from "lucide-react"

export function BackupsSettings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Backups</h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie seus backups e restaurações</p>
      </div>

      {/* Criar Backup */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Criar backup manual</h3>
            <p className="text-sm text-gray-600 mb-4">
              Faça um backup completo de todas as suas tarefas, metas, configurações e dados.
            </p>
            <button className="px-6 py-2.5 bg-[#1F75FE] text-white rounded-lg text-sm font-medium hover:bg-[#0F65EE] transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Criar backup agora
            </button>
          </div>
        </div>
      </div>

      {/* Restaurar Backup */}
      <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Upload className="w-6 h-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Restaurar backup</h3>
            <p className="text-sm text-gray-600 mb-4">
              Restaure seus dados a partir de um backup anterior. Esta ação substituirá seus dados atuais.
            </p>
            <button className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Escolher arquivo de backup
            </button>
          </div>
        </div>
      </div>

      {/* Histórico de Backups */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-900">Histórico de backups</h3>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Backup automático</p>
                <p className="text-xs text-gray-500">30 de dezembro de 2024, 03:00</p>
              </div>
              <span className="text-xs text-green-600 font-medium px-3 py-1 bg-green-50 rounded-full">
                Completo
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Tamanho: 2.4 MB</span>
              <span>•</span>
              <span>247 tarefas</span>
              <span>•</span>
              <span>12 metas</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="px-4 py-2 bg-[#1F75FE] text-white rounded-lg text-xs font-medium hover:bg-[#0F65EE] transition-colors">
                Restaurar
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                Baixar
              </button>
            </div>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Backup manual</p>
                <p className="text-xs text-gray-500">25 de dezembro de 2024, 18:30</p>
              </div>
              <span className="text-xs text-green-600 font-medium px-3 py-1 bg-green-50 rounded-full">
                Completo
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Tamanho: 2.3 MB</span>
              <span>•</span>
              <span>240 tarefas</span>
              <span>•</span>
              <span>11 metas</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="px-4 py-2 bg-[#1F75FE] text-white rounded-lg text-xs font-medium hover:bg-[#0F65EE] transition-colors">
                Restaurar
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                Baixar
              </button>
            </div>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Backup automático</p>
                <p className="text-xs text-gray-500">20 de dezembro de 2024, 03:00</p>
              </div>
              <span className="text-xs text-green-600 font-medium px-3 py-1 bg-green-50 rounded-full">
                Completo
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Tamanho: 2.1 MB</span>
              <span>•</span>
              <span>235 tarefas</span>
              <span>•</span>
              <span>10 metas</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="px-4 py-2 bg-[#1F75FE] text-white rounded-lg text-xs font-medium hover:bg-[#0F65EE] transition-colors">
                Restaurar
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                Baixar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Aviso */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Importante:</strong> Ao restaurar um backup, todos os seus dados atuais serão substituídos. 
          Recomendamos criar um backup manual antes de restaurar.
        </p>
      </div>
    </div>
  )
}

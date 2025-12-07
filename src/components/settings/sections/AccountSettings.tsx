"use client"

import { useState } from "react"
import { User, Mail, Lock, Shield, Link2 } from "lucide-react"

export function AccountSettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Conta</h1>
        <button className="px-4 py-2 bg-[#1F75FE] text-white rounded-lg text-sm font-medium hover:bg-[#0F65EE] transition-colors">
          Gerenciar plano
        </button>
      </div>

      {/* Foto de Perfil */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Foto de perfil</label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Trocar foto
            </button>
            <button className="px-4 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors">
              Remover foto
            </button>
          </div>
        </div>
      </div>

      {/* Nome */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          defaultValue="Mateus"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F75FE] focus:border-transparent"
        />
      </div>

      {/* E-mail */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">E-mail</label>
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">mateus@exemplo.com</span>
          </div>
          <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Alterar
          </button>
        </div>
      </div>

      {/* Senha */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Senha</label>
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50">
            <Lock className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">••••••••</span>
          </div>
          <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Alterar senha
          </button>
        </div>
      </div>

      {/* Autenticação de Dois Fatores */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Autenticação de dois fatores</p>
              <p className="text-xs text-gray-500">Adicione uma camada extra de segurança</p>
            </div>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`
              relative w-12 h-6 rounded-full transition-colors
              ${twoFactorEnabled ? "bg-[#1F75FE]" : "bg-gray-300"}
            `}
          >
            <span
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                ${twoFactorEnabled ? "translate-x-6" : "translate-x-0"}
              `}
            />
          </button>
        </div>
      </div>

      {/* Contas Conectadas */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Contas conectadas</label>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xl">G</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Google</p>
                <p className="text-xs text-gray-500">Não conectado</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Conectar
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-xl text-white"></span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Apple</p>
                <p className="text-xs text-gray-500">Não conectado</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Conectar
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl text-white">f</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Facebook</p>
                <p className="text-xs text-gray-500">Não conectado</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Conectar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

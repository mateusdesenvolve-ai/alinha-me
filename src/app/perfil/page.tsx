"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Calendar, Edit2, ArrowLeft, Camera, Save } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: "Mateus",
    email: "mateus@alinha.me",
    phone: "(11) 98765-4321",
    location: "São Paulo, SP",
    joinDate: "Janeiro 2024",
    bio: "Focado em produtividade e crescimento pessoal. Sempre em busca de melhorar 1% a cada dia."
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Voltar</span>
              </button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Meu Perfil</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Cover */}
            <div className="h-32 bg-gradient-to-r from-[#1F75FE] to-[#5BA3FF] relative">
              <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#1F75FE] to-[#5BA3FF] rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                  <p className="text-gray-500 mt-1">{userData.email}</p>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1F75FE] text-white rounded-xl hover:bg-[#0F65EE] transition-colors"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4" />
                      Salvar
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4" />
                      Editar Perfil
                    </>
                  )}
                </button>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sobre mim</label>
                {isEditing ? (
                  <textarea
                    value={userData.bio}
                    onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1F75FE] focus:border-transparent resize-none"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-600">{userData.bio}</p>
                )}
              </div>

              {/* Info Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="text-sm font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#1F75FE] outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-900">{userData.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Telefone</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        className="text-sm font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#1F75FE] outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-900">{userData.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Localização</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.location}
                        onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                        className="text-sm font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#1F75FE] outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-900">{userData.location}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Membro desde</p>
                    <p className="text-sm font-medium text-gray-900">{userData.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Estatísticas</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-2xl font-bold text-[#1F75FE]">156</p>
                <p className="text-xs text-gray-600 mt-1">Tarefas concluídas</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-2xl font-bold text-green-600">12</p>
                <p className="text-xs text-gray-600 mt-1">Dias de sequência</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <p className="text-2xl font-bold text-purple-600">8</p>
                <p className="text-xs text-gray-600 mt-1">Hábitos ativos</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ações</h3>
            <div className="space-y-3">
              <Link href="/planos">
                <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-all">
                  <span className="font-medium text-gray-900">Ver Planos</span>
                  <span className="text-[#1F75FE]">→</span>
                </button>
              </Link>
              <Link href="/configuracoes">
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <span className="font-medium text-gray-900">Configurações</span>
                  <span className="text-gray-400">→</span>
                </button>
              </Link>
              <Link href="/login">
                <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all">
                  <span className="font-medium text-red-600">Sair</span>
                  <span className="text-red-400">→</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

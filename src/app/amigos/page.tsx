"use client"

import { ArrowLeft, Users, UserPlus, Circle, MessageCircle, Trophy, Target } from "lucide-react"
import Link from "next/link"

export default function AmigosPage() {
  const friends = [
    { 
      id: 1, 
      name: "Ana Silva", 
      avatar: "🌸", 
      level: 12, 
      online: true,
      streak: 15,
      tasksCompleted: 89
    },
    { 
      id: 2, 
      name: "Carlos Mendes", 
      avatar: "⚡", 
      level: 8, 
      online: true,
      streak: 8,
      tasksCompleted: 56
    },
    { 
      id: 3, 
      name: "Julia Costa", 
      avatar: "🌟", 
      level: 15, 
      online: false,
      streak: 22,
      tasksCompleted: 134
    },
    { 
      id: 4, 
      name: "Pedro Santos", 
      avatar: "🚀", 
      level: 6, 
      online: false,
      streak: 5,
      tasksCompleted: 42
    }
  ]

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
            <h1 className="text-xl font-bold text-gray-900">Amigos</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Add Friend Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Adicionar Amigos</h2>
                  <p className="text-sm text-gray-600">Convide pessoas para se juntarem a você</p>
                </div>
              </div>
              <button className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                Convidar
              </button>
            </div>
          </div>

          {/* Friends List */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Seus Amigos ({friends.length})</h3>
            <div className="space-y-4">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-2xl">
                        {friend.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-bold text-gray-900">{friend.name}</h4>
                          <Circle 
                            className={`w-3 h-3 ${friend.online ? 'text-green-500 fill-current' : 'text-gray-400 fill-current'}`} 
                          />
                        </div>
                        <p className="text-sm text-gray-600">Nível {friend.level}</p>
                      </div>
                    </div>

                    <button className="p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 bg-orange-50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Trophy className="w-4 h-4 text-orange-600" />
                        <span className="text-lg font-bold text-orange-600">{friend.streak}</span>
                      </div>
                      <p className="text-xs text-gray-600">dias seguidos</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="text-lg font-bold text-green-600">{friend.tasksCompleted}</span>
                      </div>
                      <p className="text-xs text-gray-600">tarefas</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-lg font-bold text-purple-600">{friend.level}</span>
                      </div>
                      <p className="text-xs text-gray-600">nível</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

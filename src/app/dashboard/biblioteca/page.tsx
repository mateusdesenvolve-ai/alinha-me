"use client"

import { useState } from "react"
import { ArrowLeft, Search, UserPlus, Send, X, Circle, MessageCircle, Trophy, Star, Zap, Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface Friend {
  id: string
  name: string
  level: number
  progress: number
  isOnline: boolean
  avatar: string
  lastSeen?: string
  streak: number
  tasksCompleted: number
}

interface Message {
  id: number
  friendId: string
  text: string
  timestamp: Date
  read: boolean
}

const mockFriends: Friend[] = [
  {
    id: "ALY001",
    name: "Ana Silva",
    level: 12,
    progress: 75,
    isOnline: true,
    avatar: "🌸",
    streak: 15,
    tasksCompleted: 89
  },
  {
    id: "ALY002",
    name: "Carlos Mendes",
    level: 8,
    progress: 45,
    isOnline: true,
    avatar: "⚡",
    streak: 7,
    tasksCompleted: 52
  },
  {
    id: "ALY003",
    name: "Beatriz Costa",
    level: 15,
    progress: 90,
    isOnline: false,
    avatar: "🎯",
    lastSeen: "2h atrás",
    streak: 22,
    tasksCompleted: 134
  },
  {
    id: "ALY004",
    name: "Diego Santos",
    level: 6,
    progress: 30,
    isOnline: false,
    avatar: "🚀",
    lastSeen: "1 dia atrás",
    streak: 4,
    tasksCompleted: 38
  }
]

export default function AmigosPage() {
  const router = useRouter()
  const [friends, setFriends] = useState<Friend[]>(mockFriends)
  const [searchQuery, setSearchQuery] = useState("")
  const [addFriendId, setAddFriendId] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successText, setSuccessText] = useState("")

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const onlineFriends = friends.filter(f => f.isOnline)
  const offlineFriends = friends.filter(f => !f.isOnline)

  const handleAddFriend = () => {
    if (addFriendId.trim().length < 6) {
      alert("ID inválido! O ID deve ter pelo menos 6 caracteres.")
      return
    }

    // Simular adição de amigo
    const newFriend: Friend = {
      id: addFriendId.toUpperCase(),
      name: "Novo Amigo",
      level: 1,
      progress: 0,
      isOnline: Math.random() > 0.5,
      avatar: ["🌟", "💫", "✨", "🎨", "🎭"][Math.floor(Math.random() * 5)],
      streak: 0,
      tasksCompleted: 0
    }

    setFriends([...friends, newFriend])
    setAddFriendId("")
    setShowAddModal(false)
    
    setSuccessText(`🎉 ${newFriend.name} foi adicionado aos seus amigos!`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const handleSendMessage = () => {
    if (!selectedFriend || !messageText.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      friendId: selectedFriend.id,
      text: messageText,
      timestamp: new Date(),
      read: false
    }

    setMessages([...messages, newMessage])
    setMessageText("")
    
    setSuccessText(`✉️ Mensagem enviada para ${selectedFriend.name}!`)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const getLevelColor = (level: number) => {
    if (level >= 15) return "from-purple-500 to-pink-500"
    if (level >= 10) return "from-blue-500 to-cyan-500"
    if (level >= 5) return "from-green-500 to-emerald-500"
    return "from-gray-400 to-gray-500"
  }

  const getLevelBadge = (level: number) => {
    if (level >= 15) return "🏆 Mestre"
    if (level >= 10) return "⭐ Avançado"
    if (level >= 5) return "🌟 Intermediário"
    return "🌱 Iniciante"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-7 h-7 text-blue-600" />
                Meus Amigos
              </h1>
              <p className="text-sm text-gray-600">Conecte-se e evolua junto com seus amigos 💙</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <UserPlus className="w-5 h-5" />
              <span className="hidden sm:inline">Adicionar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl px-6 py-3 shadow-lg">
            <p className="text-sm font-medium text-green-800">{successText}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar amigos por nome ou ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Estatísticas */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{friends.length}</p>
                <p className="text-sm text-gray-600">Total de amigos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Circle className="w-6 h-6 text-green-600 fill-current" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{onlineFriends.length}</p>
                <p className="text-sm text-gray-600">Online agora</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                <p className="text-sm text-gray-600">Mensagens enviadas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Amigos Online */}
        {onlineFriends.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Circle className="w-4 h-4 text-green-500 fill-current animate-pulse" />
              Online Agora ({onlineFriends.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {onlineFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all border-2 border-green-200 group cursor-pointer"
                  onClick={() => setSelectedFriend(friend)}
                >
                  {/* Avatar e Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                        {friend.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getLevelColor(friend.level)} shadow-md`}>
                      Nv. {friend.level}
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{friend.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">ID: {friend.id}</p>

                  {/* Badge */}
                  <div className="mb-3">
                    <span className="text-xs font-medium text-gray-700">{getLevelBadge(friend.level)}</span>
                  </div>

                  {/* Progresso */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progresso</span>
                      <span className="font-semibold">{friend.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${getLevelColor(friend.level)} transition-all duration-500`}
                        style={{ width: `${friend.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-orange-500" />
                      <span>{friend.streak} dias</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-yellow-500" />
                      <span>{friend.tasksCompleted} tarefas</span>
                    </div>
                  </div>

                  {/* Botão */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedFriend(friend)
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enviar mensagem
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amigos Offline */}
        {offlineFriends.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Circle className="w-4 h-4 text-gray-400" />
              Offline ({offlineFriends.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {offlineFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-200 group cursor-pointer opacity-90"
                  onClick={() => setSelectedFriend(friend)}
                >
                  {/* Avatar e Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-3xl shadow-md group-hover:scale-105 transition-transform">
                        {friend.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getLevelColor(friend.level)} shadow-md`}>
                      Nv. {friend.level}
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-bold text-gray-900 mb-1">{friend.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">ID: {friend.id}</p>
                  <p className="text-xs text-gray-400 mb-3">Visto {friend.lastSeen}</p>

                  {/* Badge */}
                  <div className="mb-3">
                    <span className="text-xs font-medium text-gray-700">{getLevelBadge(friend.level)}</span>
                  </div>

                  {/* Progresso */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progresso</span>
                      <span className="font-semibold">{friend.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 transition-all duration-500"
                        style={{ width: `${friend.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-gray-400" />
                      <span>{friend.streak} dias</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-gray-400" />
                      <span>{friend.tasksCompleted} tarefas</span>
                    </div>
                  </div>

                  {/* Botão */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedFriend(friend)
                    }}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enviar mensagem
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredFriends.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Nenhum amigo encontrado</p>
            <p className="text-sm text-gray-400 mt-2">Adicione amigos usando o ID deles!</p>
          </div>
        )}
      </div>

      {/* Modal - Adicionar Amigo */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-slideUp">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-blue-600" />
                Adicionar Amigo
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID do Amigo
                </label>
                <input
                  type="text"
                  placeholder="Ex: ALY001, ALY002..."
                  value={addFriendId}
                  onChange={(e) => setAddFriendId(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  maxLength={10}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Cada usuário do Alinha.me tem um ID único. Peça o ID do seu amigo para adicioná-lo!
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddFriend}
                  disabled={addFriendId.trim().length < 6}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Perfil do Amigo e Mensagem */}
      {selectedFriend && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-4xl shadow-lg">
                    {selectedFriend.avatar}
                  </div>
                  {selectedFriend.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedFriend.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">ID: {selectedFriend.id}</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getLevelColor(selectedFriend.level)} shadow-md`}>
                      {getLevelBadge(selectedFriend.level)}
                    </span>
                    {selectedFriend.isOnline ? (
                      <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <Circle className="w-2 h-2 fill-current" />
                        Online
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">Visto {selectedFriend.lastSeen}</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedFriend(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6 space-y-6">
              {/* Estatísticas */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${getLevelColor(selectedFriend.level)} bg-clip-text text-transparent mb-1`}>
                    {selectedFriend.level}
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Nível</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1 flex items-center justify-center gap-1">
                    <Zap className="w-6 h-6" />
                    {selectedFriend.streak}
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Dias de Streak</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-1 flex items-center justify-center gap-1">
                    <Trophy className="w-6 h-6" />
                    {selectedFriend.tasksCompleted}
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Tarefas</p>
                </div>
              </div>

              {/* Progresso */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Progresso Atual</span>
                  <span className="text-sm font-bold text-gray-900">{selectedFriend.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getLevelColor(selectedFriend.level)} transition-all duration-500 shadow-lg`}
                    style={{ width: `${selectedFriend.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Enviar Mensagem */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-5 border-2 border-purple-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  Enviar Mensagem
                </h3>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Digite sua mensagem de motivação..."
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  rows={4}
                  maxLength={500}
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">{messageText.length}/500 caracteres</span>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Enviar
                  </button>
                </div>
              </div>

              {/* Dica */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Dica:</strong> Mensagens motivacionais ajudam seus amigos a manterem o foco! Envie palavras de incentivo e cresçam juntos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

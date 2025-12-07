"use client"

import { Bell, Check, X, ArrowLeft, Sparkles, TrendingUp, Wallet, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function NotificacoesPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      icon: Check,
      color: "green",
      title: "Tarefa concluída!",
      message: "Você completou 'Revisar apresentação do projeto'",
      time: "Há 5 minutos",
      read: false
    },
    {
      id: 2,
      type: "money",
      icon: Wallet,
      color: "emerald",
      title: "Cofrinho atualizado",
      message: "+R$ 50,00 adicionados ao seu cofrinho",
      time: "Há 1 hora",
      read: false
    },
    {
      id: 3,
      type: "progress",
      icon: TrendingUp,
      color: "blue",
      title: "Progresso semanal",
      message: "Você completou 85% das suas metas esta semana!",
      time: "Há 3 horas",
      read: true
    },
    {
      id: 4,
      type: "aly",
      icon: Sparkles,
      color: "purple",
      title: "Nova análise da Aly",
      message: "A Aly preparou recomendações personalizadas para você",
      time: "Há 5 horas",
      read: true
    },
    {
      id: 5,
      type: "friend",
      icon: Users,
      color: "pink",
      title: "Novo amigo",
      message: "Ana Silva começou a seguir você",
      time: "Ontem",
      read: true
    },
    {
      id: 6,
      type: "reminder",
      icon: Calendar,
      color: "orange",
      title: "Lembrete",
      message: "Reunião de equipe em 30 minutos",
      time: "Ontem",
      read: true
    }
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Voltar</span>
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-900" />
              <h1 className="text-xl font-bold text-gray-900">Notificações</h1>
              {unreadCount > 0 && (
                <span className="bg-[#1F75FE] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-[#1F75FE] hover:text-[#0F65EE] font-medium transition-colors"
              >
                Marcar todas
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma notificação</h3>
            <p className="text-gray-600">Você está em dia com tudo!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon
              const colorClasses = {
                green: "bg-green-100 text-green-600",
                emerald: "bg-emerald-100 text-emerald-600",
                blue: "bg-blue-100 text-blue-600",
                purple: "bg-purple-100 text-purple-600",
                pink: "bg-pink-100 text-pink-600",
                orange: "bg-orange-100 text-orange-600"
              }

              return (
                <div
                  key={notification.id}
                  className={`
                    bg-white rounded-xl p-4 border-2 transition-all hover:shadow-md
                    ${notification.read ? "border-gray-200" : "border-[#1F75FE] shadow-sm"}
                  `}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${colorClasses[notification.color as keyof typeof colorClasses]}
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`
                          font-bold
                          ${notification.read ? "text-gray-700" : "text-gray-900"}
                        `}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-[#1F75FE] rounded-full flex-shrink-0 mt-1.5"></div>
                        )}
                      </div>
                      <p className={`
                        text-sm mb-2
                        ${notification.read ? "text-gray-500" : "text-gray-700"}
                      `}>
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{notification.time}</span>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-[#1F75FE] hover:text-[#0F65EE] font-medium transition-colors"
                          >
                            Marcar como lida
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

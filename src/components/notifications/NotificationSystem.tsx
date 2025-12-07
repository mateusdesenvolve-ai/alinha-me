"use client"

import { useEffect, useState } from "react"
import { X, Sparkles, CheckCircle2, Target, DollarSign, Calendar, Heart } from "lucide-react"

export type NotificationType = 
  | "motivation" 
  | "task" 
  | "habit" 
  | "savings" 
  | "calendar" 
  | "checkin"
  | "success"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  icon?: React.ReactNode
  duration?: number
}

interface NotificationSystemProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
}

const notificationStyles = {
  motivation: {
    bg: "bg-gradient-to-r from-purple-500 to-pink-500",
    icon: <Sparkles className="w-5 h-5" />,
    animation: "animate-bounce-gentle"
  },
  task: {
    bg: "bg-gradient-to-r from-blue-500 to-cyan-500",
    icon: <Target className="w-5 h-5" />,
    animation: "animate-slide-in"
  },
  habit: {
    bg: "bg-gradient-to-r from-green-500 to-emerald-500",
    icon: <CheckCircle2 className="w-5 h-5" />,
    animation: "animate-pop"
  },
  savings: {
    bg: "bg-gradient-to-r from-yellow-500 to-orange-500",
    icon: <DollarSign className="w-5 h-5" />,
    animation: "animate-shine"
  },
  calendar: {
    bg: "bg-gradient-to-r from-indigo-500 to-purple-500",
    icon: <Calendar className="w-5 h-5" />,
    animation: "animate-pulse-soft"
  },
  checkin: {
    bg: "bg-gradient-to-r from-pink-500 to-rose-500",
    icon: <Heart className="w-5 h-5" />,
    animation: "animate-heartbeat"
  },
  success: {
    bg: "bg-gradient-to-r from-green-500 to-teal-500",
    icon: <CheckCircle2 className="w-5 h-5" />,
    animation: "animate-confetti"
  }
}

export function NotificationSystem({ notifications, onDismiss }: NotificationSystemProps) {
  return (
    <div className="fixed top-4 right-4 z-[100] space-y-3 max-w-sm w-full pointer-events-none">
      {notifications.map((notification) => {
        const style = notificationStyles[notification.type]
        
        return (
          <div
            key={notification.id}
            className={`${style.bg} ${style.animation} text-white rounded-2xl shadow-2xl p-4 pointer-events-auto transform transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                {notification.icon || style.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm mb-1">{notification.title}</h4>
                <p className="text-sm text-white/90 leading-relaxed">{notification.message}</p>
              </div>
              
              <button
                onClick={() => onDismiss(notification.id)}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Hook para gerenciar notificações
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substring(7)
    const newNotification = { ...notification, id }
    
    setNotifications(prev => [...prev, newNotification])

    // Auto-dismiss após duração especificada ou 5 segundos
    const duration = notification.duration || 5000
    setTimeout(() => {
      dismissNotification(id)
    }, duration)
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return {
    notifications,
    addNotification,
    dismissNotification
  }
}

// Notificações pré-definidas da Aly
export const alyNotifications = {
  motivation: [
    {
      type: "motivation" as NotificationType,
      title: "Mensagem da Aly 💫",
      message: "Você está indo muito bem! Continue assim!"
    },
    {
      type: "motivation" as NotificationType,
      title: "Lembrete da Aly ✨",
      message: "Pequenos passos levam a grandes conquistas!"
    },
    {
      type: "motivation" as NotificationType,
      title: "Aly diz 🌟",
      message: "Acredite no seu potencial. Você é capaz!"
    },
    {
      type: "motivation" as NotificationType,
      title: "Motivação da Aly 🚀",
      message: "Cada dia é uma nova oportunidade de crescer!"
    }
  ],
  
  taskReminder: (taskName: string) => ({
    type: "task" as NotificationType,
    title: "Lembrete de Tarefa 📋",
    message: `Não esqueça: ${taskName}`
  }),
  
  habitReminder: (habitName: string) => ({
    type: "habit" as NotificationType,
    title: "Hora do Hábito! 💪",
    message: `Está na hora de: ${habitName}`
  }),
  
  savingsReminder: (amount: number) => ({
    type: "savings" as NotificationType,
    title: "Cofrinho 💰",
    message: `Lembre-se de guardar R$ ${amount.toFixed(2)} hoje!`
  }),
  
  calendarEvent: (eventName: string, time: string) => ({
    type: "calendar" as NotificationType,
    title: "Evento Próximo 📅",
    message: `${eventName} às ${time}`
  }),
  
  dailyCheckin: () => ({
    type: "checkin" as NotificationType,
    title: "Check-in Diário ❤️",
    message: "Como você está se sentindo hoje?"
  }),
  
  goalCompleted: (goalName: string) => ({
    type: "success" as NotificationType,
    title: "Parabéns! 🎉",
    message: `Você completou: ${goalName}!`
  })
}

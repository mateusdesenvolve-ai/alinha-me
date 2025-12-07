"use client"

import { useState, useEffect } from "react"
import { 
  Wallet,
  Plus,
  Minus,
  Trash2,
  Check,
  ArrowUp,
  ArrowDown,
  TrendingUp
} from "lucide-react"
import Link from "next/link"

interface Transaction {
  id: number
  date: string
  value: number
  type: "entrada" | "saida"
}

export default function CofrinhoPage() {
  const [balance, setBalance] = useState<number | null>(null)
  const [displayValue, setDisplayValue] = useState("")
  const [operation, setOperation] = useState<"add" | "remove" | null>(null)
  const [showInitialMessage, setShowInitialMessage] = useState(true)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationType, setNotificationType] = useState<"success" | "warning">("success")
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Verificar se já tem saldo inicial configurado
    const savedBalance = localStorage.getItem("cofrinhoBalance")
    const savedTransactions = localStorage.getItem("cofrinhoTransactions")
    
    if (savedBalance !== null) {
      setBalance(parseFloat(savedBalance))
      setShowInitialMessage(false)
    }
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }
  }, [])

  const handleNumberClick = (num: string) => {
    if (displayValue === "0") {
      setDisplayValue(num)
    } else {
      setDisplayValue(displayValue + num)
    }
  }

  const handleClear = () => {
    setDisplayValue("")
    setOperation(null)
  }

  const handleConfirm = () => {
    const value = parseFloat(displayValue)
    
    if (!displayValue || value <= 0) return

    if (balance === null) {
      // Primeiro uso - definir saldo inicial
      setBalance(value)
      localStorage.setItem("cofrinhoBalance", value.toString())
      setShowInitialMessage(false)
      showSuccessNotification("🎉 Saldo inicial configurado!")
      setDisplayValue("")
      return
    }

    if (!operation) return

    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      value: value,
      type: operation === "add" ? "entrada" : "saida"
    }

    const newTransactions = [newTransaction, ...transactions]
    setTransactions(newTransactions)
    localStorage.setItem("cofrinhoTransactions", JSON.stringify(newTransactions))

    if (operation === "add") {
      const newBalance = balance + value
      setBalance(newBalance)
      localStorage.setItem("cofrinhoBalance", newBalance.toString())
      showSuccessNotification("🎉 Mandou bem! Seu cofrinho cresceu!")
    } else {
      const newBalance = balance - value
      setBalance(newBalance)
      localStorage.setItem("cofrinhoBalance", newBalance.toString())
      
      if (newBalance < 0 || value > balance * 0.3) {
        showWarningNotification("⚠️ Você gastou um pouco. Respire e mantenha o foco. Você consegue!")
      } else {
        showSuccessNotification("✅ Valor removido do cofrinho.")
      }
    }

    setDisplayValue("")
    setOperation(null)
  }

  const showSuccessNotification = (message: string) => {
    setNotificationMessage(message)
    setNotificationType("success")
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 4000)
  }

  const showWarningNotification = (message: string) => {
    setNotificationMessage(message)
    setNotificationType("warning")
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 5000)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cofrinho</h1>
                <p className="text-sm text-gray-500">Controle suas finanças</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Notificação */}
      {showNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className={`
            px-6 py-4 rounded-xl shadow-2xl border-2 flex items-center gap-3 max-w-md
            ${notificationType === "success" 
              ? "bg-green-50 border-green-200" 
              : "bg-orange-50 border-orange-200"
            }
          `}>
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${notificationType === "success" ? "bg-green-500" : "bg-orange-500"}
            `}>
              {notificationType === "success" ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <TrendingUp className="w-5 h-5 text-white" />
              )}
            </div>
            <p className={`
              text-sm font-medium
              ${notificationType === "success" ? "text-green-800" : "text-orange-800"}
            `}>
              {notificationMessage}
            </p>
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Coluna Esquerda - Saldo e Calculadora */}
          <div className="space-y-6">
            {/* Card Saldo */}
            <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <p className="text-sm font-medium opacity-90 mb-2">Saldo Atual</p>
                <h2 className="text-4xl font-bold mb-4">
                  {balance !== null ? formatCurrency(balance) : "R$ 0,00"}
                </h2>
                
                {balance !== null && transactions.length > 0 && (
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <TrendingUp className="w-4 h-4" />
                    <span>{transactions.length} transações realizadas</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mensagem Inicial */}
            {showInitialMessage && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 animate-fadeIn">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Bem-vindo ao Cofrinho!</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Antes de começar, coloque quanto dinheiro você tem hoje no seu banco para deixar tudo organizado.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Calculadora */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Calculadora</h3>
              
              {/* Display */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6 border-2 border-gray-200">
                <p className="text-3xl font-bold text-gray-900 text-right">
                  {displayValue ? formatCurrency(parseFloat(displayValue)) : "R$ 0,00"}
                </p>
                {operation && (
                  <p className="text-sm text-gray-500 text-right mt-2">
                    {operation === "add" ? "Adicionar ao saldo" : "Remover do saldo"}
                  </p>
                )}
              </div>

              {/* Botões Numéricos */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num.toString())}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-xl py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => handleNumberClick("0")}
                  className="col-span-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-xl py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  0
                </button>
                <button
                  onClick={() => handleNumberClick(".")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-xl py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  ,
                </button>
              </div>

              {/* Botões de Ação */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  onClick={() => setOperation("add")}
                  className={`
                    flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95
                    ${operation === "add" 
                      ? "bg-green-500 text-white shadow-lg" 
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                    }
                  `}
                >
                  <Plus className="w-5 h-5" />
                  Adicionar
                </button>
                <button
                  onClick={() => setOperation("remove")}
                  className={`
                    flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95
                    ${operation === "remove" 
                      ? "bg-red-500 text-white shadow-lg" 
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                    }
                  `}
                >
                  <Minus className="w-5 h-5" />
                  Gastei
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleClear}
                  className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Trash2 className="w-5 h-5" />
                  Limpar
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!displayValue || (!operation && balance !== null)}
                  className="flex items-center justify-center gap-2 bg-[#1F75FE] text-white py-3 rounded-xl font-medium hover:bg-[#0F65EE] transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Check className="w-5 h-5" />
                  Confirmar
                </button>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Histórico */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Histórico</h3>
            
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">Nenhuma transação ainda</p>
                <p className="text-xs text-gray-400 mt-1">Suas movimentações aparecerão aqui</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${transaction.type === "entrada" 
                          ? "bg-green-100" 
                          : "bg-red-100"
                        }
                      `}>
                        {transaction.type === "entrada" ? (
                          <ArrowUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowDown className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.type === "entrada" ? "Entrada" : "Saída"}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <p className={`
                      text-lg font-bold
                      ${transaction.type === "entrada" 
                        ? "text-green-600" 
                        : "text-red-600"
                      }
                    `}>
                      {transaction.type === "entrada" ? "+" : "-"}
                      {formatCurrency(transaction.value)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

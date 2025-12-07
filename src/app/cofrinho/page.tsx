"use client"

import { ArrowLeft, Wallet, Plus, Minus, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CofrinhoPage() {
  const [balance, setBalance] = useState(1250)
  const [goal] = useState(3000)
  const percentage = (balance / goal) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Voltar</span>
              </button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Cofrinho</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Wallet className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Seu Cofrinho</h2>
          </div>
          <div className="mb-4">
            <p className="text-4xl font-bold mb-2">R$ {balance.toFixed(2).replace(".", ",")}</p>
            <p className="text-green-100">Meta: R$ {goal.toFixed(2).replace(".", ",")}</p>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-green-100 mt-2">{percentage.toFixed(0)}% da meta alcançada</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button className="bg-white rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition-all flex items-center justify-center gap-3">
            <Plus className="w-6 h-6 text-green-600" />
            <span className="font-bold text-gray-900">Adicionar</span>
          </button>
          <button className="bg-white rounded-xl p-6 border-2 border-red-200 hover:border-red-400 transition-all flex items-center justify-center gap-3">
            <Minus className="w-6 h-6 text-red-600" />
            <span className="font-bold text-gray-900">Retirar</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Histórico</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Depósito</p>
                  <p className="text-sm text-gray-500">Hoje, 14:30</p>
                </div>
              </div>
              <span className="font-bold text-green-600">+R$ 50,00</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Depósito</p>
                  <p className="text-sm text-gray-500">Ontem, 10:15</p>
                </div>
              </div>
              <span className="font-bold text-green-600">+R$ 100,00</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

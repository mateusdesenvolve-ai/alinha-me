"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import SettingsModal from "@/components/settings/SettingsModal"
import { useState } from "react"

export default function ConfiguracoesPage() {
  const [isOpen, setIsOpen] = useState(true)

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
            <h1 className="text-xl font-bold text-gray-900">Configurações</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <SettingsModal isOpen={isOpen} onClose={() => window.location.href = '/dashboard'} />
    </div>
  )
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Criar cliente apenas se as credenciais estiverem disponíveis E válidas
let supabase: ReturnType<typeof createClient> | null = null

// Validar se as URLs são válidas antes de criar o cliente
const isValidUrl = (url: string) => {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

if (supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

// Função helper para obter o cliente
function getSupabaseClient() {
  if (!supabase) {
    throw new Error('Configuração do Supabase não encontrada. Por favor, configure suas credenciais.')
  }
  return supabase
}

// Tipos para autenticação
export type AuthProvider = 'google' | 'facebook' | 'apple'

// Função para login social
export async function signInWithProvider(provider: AuthProvider) {
  const client = getSupabaseClient()

  const { data, error } = await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error(`Erro ao autenticar com ${provider}:`, error.message)
    throw error
  }

  return data
}

// Função para login com email e senha
export async function signInWithEmail(email: string, password: string) {
  const client = getSupabaseClient()

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Erro ao fazer login:', error.message)
    throw error
  }

  return data
}

// Função para criar conta com email e senha
export async function signUpWithEmail(email: string, password: string) {
  const client = getSupabaseClient()

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    console.error('Erro ao criar conta:', error.message)
    throw error
  }

  return data
}

// Função para logout
export async function signOut() {
  const client = getSupabaseClient()

  const { error } = await client.auth.signOut()

  if (error) {
    console.error('Erro ao fazer logout:', error.message)
    throw error
  }
}

// Função para obter usuário atual
export async function getCurrentUser() {
  if (!supabase) {
    return null
  }

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Erro ao obter usuário:', error.message)
    return null
  }

  return user
}

// Função para verificar se usuário está autenticado
export async function isAuthenticated() {
  const user = await getCurrentUser()
  return !!user
}

// Exportar o cliente (pode ser null)
export { supabase }

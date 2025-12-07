// Sistema de geração de rotinas personalizadas baseado no quiz inicial

export interface QuizAnswers {
  gender: 'male' | 'female'
  currentLife: number // 0-3 (muito bem, bem, regular, mal)
  painArea: number // 0-3 (organização, finanças, saúde, relacionamentos)
  mainFeeling: number // 0-3 (ansiedade, cansaço, frustração, confusão)
  routineStatus: number // 0-3 (organizada, razoável, caótica, sem rotina)
  improvementAttempt: number // 0-3 (mantém, desiste, não sabe, nada funciona)
  confidence: number // 0-3 (alta, média, baixa, muito baixa)
  transformArea: number // 0-3 (carreira, saúde, relacionamentos, propósito)
  mainBlock: number // 0-3 (tempo, dinheiro, motivação, clareza)
  availableTime: number // 0-3 (<15min, 15-30min, 30-60min, >1h)
  guidancePreference: number // 0-3 (metas, lembretes, análises, conversas)
}

export interface DailyTask {
  id: string
  title: string
  description: string
  category: 'social' | 'emotional' | 'practical' | 'evolution'
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: string
  impact: string
}

export interface PersonalizedRoutine {
  mainPain: string
  mainGoal: string
  emotionalLevel: string
  actionLevel: string
  socialBehavior: string
  dailyMainRoutine: string
  dailyTasks: DailyTask[]
  weeklyEvolutionTask: DailyTask
  motivationalMessage: string
}

// Identificar dor principal baseado nas respostas
function identifyMainPain(answers: QuizAnswers): string {
  const { gender, painArea, mainFeeling, confidence, transformArea } = answers

  if (gender === 'male') {
    if (transformArea === 2 && confidence >= 2) {
      return 'dificuldade para conversar com mulheres'
    }
    if (confidence >= 2 && mainFeeling === 0) {
      return 'baixa confiança e ansiedade social'
    }
    if (painArea === 2 && confidence >= 2) {
      return 'sentir-se feio e inseguro'
    }
    if (transformArea === 2 && mainFeeling === 0) {
      return 'medo de rejeição'
    }
    if (painArea === 0 && mainFeeling === 3) {
      return 'vida bagunçada e sem direção'
    }
    if (transformArea === 2 && painArea === 3) {
      return 'solidão e isolamento social'
    }
    return 'baixa confiança e falta de direção'
  } else {
    if (confidence >= 2 && transformArea === 1) {
      return 'insegurança corporal'
    }
    if (mainFeeling === 0 && transformArea === 2) {
      return 'medo de julgamento'
    }
    if (transformArea === 2 && confidence >= 2) {
      return 'dificuldade de estabelecer limites'
    }
    if (mainFeeling === 0 && painArea === 3) {
      return 'ansiedade social'
    }
    if (confidence >= 2 && mainFeeling === 2) {
      return 'sentimento de não ser suficiente'
    }
    if (confidence >= 2 && mainFeeling === 1) {
      return 'autocrítica excessiva'
    }
    return 'insegurança e autocrítica'
  }
}

// Definir objetivo central
function defineMainGoal(answers: QuizAnswers): string {
  const { transformArea, painArea, mainBlock } = answers

  if (transformArea === 2) return 'melhorar vida social'
  if (transformArea === 0) return 'organizar carreira e finanças'
  if (transformArea === 1) return 'melhorar saúde e bem-estar'
  if (painArea === 0) return 'organizar a vida'
  if (mainBlock === 2) return 'aumentar motivação e energia'
  if (mainBlock === 3) return 'ter mais clareza e direção'
  
  return 'ter mais confiança e equilíbrio'
}

// Gerar tarefas personalizadas para homens
function generateMaleTasks(pain: string, goal: string, answers: QuizAnswers): DailyTask[] {
  const tasks: DailyTask[] = []

  // Tarefas baseadas na dor específica
  if (pain.includes('conversar com mulheres') || pain.includes('rejeição')) {
    tasks.push({
      id: 'social-1',
      title: 'Diga "bom dia" para 2 pessoas desconhecidas',
      description: 'Pratique iniciar conversas simples. Não precisa ser longo, apenas um cumprimento genuíno.',
      category: 'social',
      difficulty: 'easy',
      estimatedTime: '5 minutos',
      impact: 'Reduz ansiedade social e aumenta confiança gradualmente'
    })
    tasks.push({
      id: 'social-2',
      title: 'Mantenha contato visual por 2 segundos',
      description: 'Com alguém que você acha atraente. Não precisa falar nada, apenas pratique o contato visual.',
      category: 'social',
      difficulty: 'medium',
      estimatedTime: '2 minutos',
      impact: 'Desenvolve presença e confiança não-verbal'
    })
    tasks.push({
      id: 'social-3',
      title: 'Faça um elogio simples e neutro',
      description: 'Exemplo: "Gostei desse corte" ou "Essa cor combina com você". Seja genuíno.',
      category: 'social',
      difficulty: 'medium',
      estimatedTime: '3 minutos',
      impact: 'Pratica iniciativa e quebra barreiras sociais'
    })
  }

  if (pain.includes('confiança') || pain.includes('inseguro')) {
    tasks.push({
      id: 'emotional-1',
      title: 'Liste 3 qualidades suas',
      description: 'Escreva 3 coisas que você faz bem ou características positivas suas. Seja honesto.',
      category: 'emotional',
      difficulty: 'easy',
      estimatedTime: '5 minutos',
      impact: 'Reconstrói autoimagem e autoestima'
    })
    tasks.push({
      id: 'practical-1',
      title: 'Corrija sua postura por 5 minutos',
      description: 'Ombros para trás, peito aberto, queixo levemente levantado. Sinta a diferença.',
      category: 'practical',
      difficulty: 'easy',
      estimatedTime: '5 minutos',
      impact: 'Postura afeta confiança e como outros te veem'
    })
  }

  if (pain.includes('bagunçada') || pain.includes('direção')) {
    tasks.push({
      id: 'practical-2',
      title: 'Arrume só a mesa',
      description: 'Não precisa limpar tudo. Apenas organize sua mesa de trabalho ou estudo.',
      category: 'practical',
      difficulty: 'easy',
      estimatedTime: '10 minutos',
      impact: 'Ambiente organizado = mente organizada'
    })
    tasks.push({
      id: 'practical-3',
      title: 'Planeje 3 prioridades da semana',
      description: 'Escolha apenas 3 coisas mais importantes para focar esta semana.',
      category: 'practical',
      difficulty: 'medium',
      estimatedTime: '15 minutos',
      impact: 'Clareza sobre o que importa reduz sobrecarga'
    })
  }

  if (pain.includes('solidão') || pain.includes('isolamento')) {
    tasks.push({
      id: 'social-4',
      title: 'Mande mensagem para um amigo',
      description: 'Pergunte como ele está ou compartilhe algo interessante. Reconecte-se.',
      category: 'social',
      difficulty: 'easy',
      estimatedTime: '5 minutos',
      impact: 'Fortalece vínculos e reduz isolamento'
    })
  }

  // Tarefa emocional universal para homens
  tasks.push({
    id: 'emotional-2',
    title: 'Respire fundo por 2 minutos',
    description: 'Inspire por 4 segundos, segure por 4, expire por 6. Repita.',
    category: 'emotional',
    difficulty: 'easy',
    estimatedTime: '2 minutos',
    impact: 'Reduz ansiedade e aumenta foco'
  })

  // Retornar apenas 3 tarefas principais
  return tasks.slice(0, 3)
}

// Gerar tarefas personalizadas para mulheres
function generateFemaleTasks(pain: string, goal: string, answers: QuizAnswers): DailyTask[] {
  const tasks: DailyTask[] = []

  if (pain.includes('insegurança corporal')) {
    tasks.push({
      id: 'emotional-1',
      title: 'Escreva 3 frases de autocuidado no espelho',
      description: 'Exemplos: "Eu sou suficiente", "Meu corpo me serve bem", "Eu mereço amor".',
      category: 'emotional',
      difficulty: 'easy',
      estimatedTime: '5 minutos',
      impact: 'Reconstrói relação positiva com o corpo'
    })
    tasks.push({
      id: 'practical-1',
      title: 'Vista algo que te faz sentir bem',
      description: 'Não precisa ser especial. Apenas algo que você gosta e se sente confortável.',
      category: 'practical',
      difficulty: 'easy',
      estimatedTime: '5 minutos',
      impact: 'Reforça autoimagem positiva'
    })
  }

  if (pain.includes('ansiedade social') || pain.includes('julgamento')) {
    tasks.push({
      id: 'social-1',
      title: 'Mande mensagem para uma amiga que você confia',
      description: 'Compartilhe como você está se sentindo ou apenas converse sobre algo leve.',
      category: 'social',
      difficulty: 'easy',
      estimatedTime: '10 minutos',
      impact: 'Fortalece vínculos de confiança'
    })
    tasks.push({
      id: 'emotional-2',
      title: 'Pratique respiração consciente por 3 minutos',
      description: 'Inspire contando até 4, segure por 4, expire por 6. Foque apenas na respiração.',
      category: 'emotional',
      difficulty: 'easy',
      estimatedTime: '3 minutos',
      impact: 'Reduz ansiedade e acalma o sistema nervoso'
    })
  }

  if (pain.includes('limites')) {
    tasks.push({
      id: 'social-2',
      title: 'Diga "não" a algo que você não quer fazer',
      description: 'Pode ser algo pequeno. Pratique estabelecer seus limites com gentileza.',
      category: 'social',
      difficulty: 'medium',
      estimatedTime: '5 minutos',
      impact: 'Fortalece autoestima e respeito próprio'
    })
  }

  if (pain.includes('não ser suficiente') || pain.includes('autocrítica')) {
    tasks.push({
      id: 'emotional-3',
      title: 'Liste 3 coisas que você fez bem hoje',
      description: 'Podem ser pequenas: acordar no horário, fazer uma refeição, ser gentil com alguém.',
      category: 'emotional',
      difficulty: 'easy',
      estimatedTime: '5 minutos',
      impact: 'Reduz autocrítica e reconhece progresso'
    })
    tasks.push({
      id: 'emotional-4',
      title: 'Perdoe-se por algo pequeno',
      description: 'Escolha algo que você se cobra. Diga em voz alta: "Eu me perdoo por isso".',
      category: 'emotional',
      difficulty: 'medium',
      estimatedTime: '5 minutos',
      impact: 'Reduz peso emocional e autocobrança'
    })
  }

  // Tarefa prática universal para mulheres
  tasks.push({
    id: 'practical-2',
    title: '10 minutos de autocuidado',
    description: 'Pode ser: alongamento, skincare, chá, música relaxante. Algo só para você.',
    category: 'practical',
    difficulty: 'easy',
    estimatedTime: '10 minutos',
    impact: 'Reforça valor próprio e reduz estresse'
  })

  return tasks.slice(0, 3)
}

// Gerar tarefa de evolução semanal
function generateWeeklyTask(answers: QuizAnswers, goal: string): DailyTask {
  const { gender, transformArea } = answers

  if (gender === 'male') {
    if (transformArea === 2) {
      return {
        id: 'weekly-1',
        title: 'Inicie uma conversa de 5 minutos com alguém novo',
        description: 'Pode ser no trabalho, academia, ou evento social. Pratique manter uma conversa.',
        category: 'evolution',
        difficulty: 'hard',
        estimatedTime: '30 minutos',
        impact: 'Desenvolve habilidades sociais reais'
      }
    }
    return {
      id: 'weekly-2',
      title: 'Defina 1 meta clara para o mês',
      description: 'Escolha algo específico e alcançável. Escreva os passos para chegar lá.',
      category: 'evolution',
      difficulty: 'medium',
      estimatedTime: '30 minutos',
      impact: 'Clareza gera ação e resultados'
    }
  } else {
    if (transformArea === 2) {
      return {
        id: 'weekly-3',
        title: 'Participe de uma atividade social que te interessa',
        description: 'Pode ser aula, grupo, evento. Algo onde você possa conhecer pessoas.',
        category: 'evolution',
        difficulty: 'hard',
        estimatedTime: '1-2 horas',
        impact: 'Expande círculo social de forma autêntica'
      }
    }
    return {
      id: 'weekly-4',
      title: 'Faça algo que você adia há tempo',
      description: 'Escolha uma coisa que você quer fazer mas sempre deixa para depois.',
      category: 'evolution',
      difficulty: 'medium',
      estimatedTime: '1 hora',
      impact: 'Reduz procrastinação e aumenta autoconfiança'
    }
  }
}

// Função principal de geração de rotina
export function generatePersonalizedRoutine(quizAnswers: number[]): PersonalizedRoutine {
  // Mapear respostas do quiz para estrutura tipada
  const answers: QuizAnswers = {
    gender: quizAnswers[0] === 0 ? 'male' : 'female', // 0 = Homem, 1 = Mulher
    currentLife: quizAnswers[1],
    painArea: quizAnswers[2],
    mainFeeling: quizAnswers[3],
    routineStatus: quizAnswers[4],
    improvementAttempt: quizAnswers[5],
    confidence: quizAnswers[6],
    transformArea: quizAnswers[7],
    mainBlock: quizAnswers[8],
    availableTime: quizAnswers[9],
    guidancePreference: quizAnswers[10]
  }

  const mainPain = identifyMainPain(answers)
  const mainGoal = defineMainGoal(answers)
  
  // Determinar níveis
  const emotionalLevel = answers.confidence <= 1 ? 'alto' : answers.confidence === 2 ? 'médio' : 'baixo'
  const actionLevel = answers.improvementAttempt <= 1 ? 'ativo' : answers.improvementAttempt === 2 ? 'iniciante' : 'travado'
  
  let socialBehavior = ''
  if (answers.mainFeeling === 0) socialBehavior = 'ansioso'
  else if (answers.confidence >= 2) socialBehavior = 'inseguro'
  else if (answers.transformArea === 2 && answers.painArea === 3) socialBehavior = 'introvertido'
  else socialBehavior = 'em desenvolvimento'

  // Gerar tarefas baseadas no gênero
  const dailyTasks = answers.gender === 'male' 
    ? generateMaleTasks(mainPain, mainGoal, answers)
    : generateFemaleTasks(mainPain, mainGoal, answers)

  const weeklyTask = generateWeeklyTask(answers, mainGoal)

  // Rotina diária principal
  const dailyMainRoutine = answers.gender === 'male'
    ? 'Comece o dia com postura confiante, pratique uma interação social e organize uma área da sua vida.'
    : 'Comece o dia com autocuidado, pratique autocompaixão e estabeleça um limite saudável.'

  // Mensagem motivacional
  const motivationalMessage = answers.gender === 'male'
    ? 'Confiança se constrói com pequenas ações diárias. Você está no caminho certo.'
    : 'Você é suficiente exatamente como está. Cada passo conta.'

  return {
    mainPain,
    mainGoal,
    emotionalLevel,
    actionLevel,
    socialBehavior,
    dailyMainRoutine,
    dailyTasks,
    weeklyEvolutionTask: weeklyTask,
    motivationalMessage
  }
}

// Exportar para JSON
export function routineToJSON(routine: PersonalizedRoutine): string {
  return JSON.stringify(routine, null, 2)
}

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <section class="bg-white p-4 rounded shadow">
      <h1 class="text-xl font-semibold mb-3">Nova Redação</h1>
      <div class="space-y-3">
        <input v-model="title" placeholder="Título" class="w-full bg-gray-200 border rounded px-3 py-2" />
        <textarea v-model="content" rows="14" placeholder="Escreva aqui..." class="w-full bg-gray-200 border rounded px-3 py-2"></textarea>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
          <div class="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            <input ref="fileInputRef" type="file" accept=".txt,.doc,.docx" @change="handleFile" class="block w-full" />
            <button type="button" class="px-3 py-2 rounded border text-gray-700 hover:bg-gray-50" @click="clearFile">Limpar Redação</button>
          </div>
          <button :disabled="!canSubmit" @click="submitEssay" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-white font-medium shadow-sm transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-60" :class="canSubmit ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-400'">
            <svg v-if="submitting" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span>{{ submitting ? 'Enviando...' : 'Enviar para correção' }}</span>
          </button>
        </div>
        <div class="text-sm text-gray-600">Correções restantes: <span class="font-medium">{{ remaining }}</span></div>
        <p v-if="!content.trim() || !title.trim()" class="text-xs text-red-600">Preencha título e conteúdo antes de enviar.</p>
      </div>
    </section>

    <section class="bg-white p-4 rounded shadow" v-if="feedback">
      <h2 class="text-lg font-medium mb-2">Feedback</h2>
      <div class="mb-3">Nota: <span class="font-semibold">{{ feedback.score }}</span></div>
      <p class="mb-3">{{ feedback.summary }}</p>
      <div class="mb-3">
        <h3 class="font-medium">Erros</h3>
        <ul class="list-disc pl-5 text-sm">
          <li v-for="(err, idx) in feedback.errors" :key="idx">
            <span class="px-1 rounded bg-red-100 text-red-700">{{ err.type }}</span>
            — {{ err.message }}
          </li>
        </ul>
      </div>
      <div>
        <h3 class="font-medium">Sugestões</h3>
        <ul class="list-disc pl-5 text-sm">
          <li v-for="(s, i) in feedback.suggestions" :key="i">{{ s }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useEssaysStore } from '../stores/essays.js'

const auth = useAuthStore()
auth.loadFromStorage()

const essays = useEssaysStore()
essays.load()

const DRAFT_KEY = 'tf_draft_v1'
const title = ref('Minha Redação')
const content = ref('')
const fileInputRef = ref(null)
const canSubmit = computed(() => {
  if (submitting.value) return false
  if ((remaining.value || 0) <= 0) return false
  return title.value.trim().length > 0 && content.value.trim().length > 0
})
const submitting = ref(false)
const feedback = ref(null)
const remaining = computed(() => auth.currentUser?.remainingCorrections ?? 0)

function handleFile(ev) {
  const input = ev.target
  const file = input && input.files ? input.files[0] : null
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    content.value = String(reader.result || '')
  }
  reader.readAsText(file)
}

function clearFile() {
  if (fileInputRef.value) fileInputRef.value.value = ''
  content.value = ''
}

async function submitEssay() {
  if (!auth.currentUser) return
  if (!canSubmit.value) return
  submitting.value = true
  const e = essays.add({ userId: auth.currentUser.id, title: title.value, content: content.value })
  // Simula correção por IA
  setTimeout(() => {
    const fb = {
      summary: 'Texto com boa argumentação, mas precisa revisar pontuação e coesão.',
      errors: [
        { start: 10, end: 15, message: 'Vírgula fora de lugar', type: 'Pontuação' },
        { start: 30, end: 35, message: 'Concordância verbal inadequada', type: 'Gramática' },
      ],
      suggestions: [
        'Revisar o uso de vírgulas em orações subordinadas.',
        'Utilizar conectivos para melhorar a coesão.',
      ],
      score: Math.round(600 + Math.random() * 400) / 100,
    }
    essays.updateFeedback(e.id, fb)
    feedback.value = fb
    auth.decrementCorrection()
    submitting.value = false
  }, 800)
}

// Autosave draft (debounced)
let timer
watch([title, content], () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    const draft = { title: title.value, content: content.value }
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  }, 400)
})

onMounted(() => {
  const raw = localStorage.getItem(DRAFT_KEY)
  if (!raw) return
  try {
    const draft = JSON.parse(raw)
    if (draft.title) title.value = draft.title
    if (draft.content) content.value = draft.content
  } catch {}
})
</script>



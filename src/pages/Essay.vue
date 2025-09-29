<template>
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
    <section class="bg-white p-4 rounded shadow">
      <h1 class="text-xl font-semibold mb-3">Nova Redação</h1>
      <div class="space-y-3">
        <input v-model="title" placeholder="Título" class="w-full bg-gray-200 border rounded px-3 py-2" />
        <textarea v-model="content" rows="14" placeholder="Escreva aqui..." class="w-full bg-gray-200 border rounded px-3 py-2"></textarea>
        <div class="flex items-center justify-between text-sm">
          <div>
            <input type="file" accept=".txt,.doc,.docx" @change="handleFile" class="block" />
          </div>
          <button :disabled="submitting || remaining <= 0" @click="submitEssay" class="px-4 py-2 rounded text-white" :class="remaining>0 ? 'bg-primary-600' : 'bg-gray-400'">
            {{ submitting ? 'Enviando...' : 'Enviar para correção' }}
          </button>
        </div>
        <div class="text-sm text-gray-600">Correções restantes: <span class="font-medium">{{ remaining }}</span></div>
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
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useEssaysStore } from '../stores/essays.js'

const auth = useAuthStore()
auth.loadFromStorage()

const essays = useEssaysStore()
essays.load()

const title = ref('Minha Redação')
const content = ref('')
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

async function submitEssay() {
  if (!auth.currentUser) return
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
</script>



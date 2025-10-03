<template>
  <div class="bg-white rounded shadow">
    <div class="p-4 border-b flex items-center justify-between">
      <h1 class="text-xl font-semibold">Histórico de Correções</h1>
      <div class="text-sm text-gray-500">{{ items.length }} itens</div>
    </div>
    <div v-if="items.length === 0" class="p-8 text-center text-gray-500">
      <div class="mx-auto mb-3 w-14 h-14 rounded-full bg-gray-100 grid place-items-center">📄</div>
      <div class="font-medium mb-1">Nenhuma redação corrigida ainda</div>
      <div class="text-sm mb-4">Envie sua primeira redação para ver o histórico aqui.</div>
      <router-link class="inline-block px-4 py-2 rounded bg-primary-600 text-white" to="/essay">Enviar redação</router-link>
    </div>
    <ul v-else>
      <li v-for="it in items" :key="it.id" class="p-4 border-b last:border-none">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="font-medium">{{ it.title }}</div>
            <div class="text-sm text-gray-500">{{ new Date(it.createdAt).toLocaleString() }}</div>
          </div>
          <div v-if="it.feedback" class="text-right">
            <div class="text-sm">Nota: <span class="font-semibold">{{ it.feedback.score }}</span></div>
            <div class="text-xs text-gray-500">{{ it.feedback.summary }}</div>
          </div>
        </div>
        <details class="mt-2">
          <summary class="cursor-pointer text-sm text-primary-700">Ver correção</summary>
          <pre class="mt-2 whitespace-pre-wrap text-sm">{{ renderAnnotated(it) }}</pre>
        </details>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useEssaysStore } from '../stores/essays.js'

const auth = useAuthStore()
auth.loadFromStorage()
const essays = useEssaysStore()
essays.load()

const items = computed(() => essays.listByUser(auth.currentUser?.id || ''))

function renderAnnotated(it) {
  if (!it.feedback) return it.content
  // simple annotation marker output for demo
  let out = it.content
  it.feedback.errors.forEach((e, idx) => {
    out += `\n[${idx + 1}] ${e.type}: ${e.message}`
  })
  return out
}
</script>



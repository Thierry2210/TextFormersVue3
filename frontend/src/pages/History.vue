<template>
  <div class="bg-white rounded shadow">
    <div class="p-4 border-b flex items-center justify-between">
      <h1 class="text-xl font-semibold">Histórico de Correções</h1>
      <div class="text-sm text-gray-500">{{ items.length }} itens</div>
    </div>
    <ul>
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

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEssaysStore } from '../stores/essays'

const auth = useAuthStore()
auth.loadFromStorage()
const essays = useEssaysStore()
essays.load()

const items = computed(() => essays.listByUser(auth.currentUser?.id || ''))

function renderAnnotated(it: any) {
  if (!it.feedback) return it.content
  // simple annotation marker output for demo
  let out = it.content
  it.feedback.errors.forEach((e: any, idx: number) => {
    out += `\n[${idx + 1}] ${e.type}: ${e.message}`
  })
  return out
}
</script>



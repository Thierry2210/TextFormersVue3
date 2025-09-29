<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-semibold">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white p-4 rounded shadow">
        <div class="text-sm text-gray-500">Textos corrigidos</div>
        <div class="text-3xl font-semibold">{{ totalCorrigidos }}</div>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <div class="text-sm text-gray-500">Erros frequentes</div>
        <ul class="text-sm list-disc pl-5">
          <li v-for="e in principaisErros" :key="e">{{ e }}</li>
        </ul>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <div class="text-sm text-gray-500">Limite do plano</div>
        <div>
          Restantes: <span class="font-medium">{{ auth.currentUser?.remainingCorrections ?? 0 }}</span>
        </div>
      </div>
    </div>

    <div class="bg-white p-4 rounded shadow">
      <h2 class="font-medium mb-2">Evolução</h2>
      <canvas ref="chartRef" height="120" aria-label="Gráfico de evolução"></canvas>
    </div>

    <div class="bg-white p-4 rounded shadow">
      <h2 class="font-medium mb-2">Histórico recente</h2>
      <ul>
        <li v-for="it in recent" :key="it.id" class="py-2 border-b last:border-none">
          <div class="font-medium">{{ it.title }}</div>
          <div class="text-sm text-gray-500">{{ new Date(it.createdAt).toLocaleString() }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js'
import { useAuthStore } from '../stores/auth.js'
import { useEssaysStore } from '../stores/essays.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale)

const auth = useAuthStore()
const essays = useEssaysStore()
const chartRef = ref(null)

onMounted(() => {
  auth.loadFromStorage()
  essays.load()
  if (chartRef.value) {
    const byDay = {}
    essays.listByUser(auth.currentUser?.id || '').forEach((e) => {
      const d = new Date(e.createdAt).toLocaleDateString()
      byDay[d] = (byDay[d] || 0) + 1
    })
    const labels = Object.keys(byDay)
    const values = Object.values(byDay)
    new Chart(chartRef.value, {
      type: 'line',
      data: { labels, datasets: [{ label: 'Correções', data: values, borderColor: '#6366f1' }] },
      options: { responsive: true, plugins: { legend: { display: false } } }
    })
  }
})

const totalCorrigidos = computed(() => essays.listByUser(auth.currentUser?.id || '').length)
const recentes = computed(() => essays.listByUser(auth.currentUser?.id || '').slice(0, 5))
const recent = recentes
const principaisErros = computed(() => ['Pontuação', 'Concordância', 'Coesão'])
</script>



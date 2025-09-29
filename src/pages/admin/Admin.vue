<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-semibold">Administração</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <section class="bg-white p-4 rounded shadow">
        <h2 class="font-medium mb-2">Usuários</h2>
        <ul class="text-sm max-h-64 overflow-auto">
          <li v-for="u in users" :key="u.id" class="py-1 flex justify-between">
            <span>{{ u.name }} — {{ u.email }}</span>
            <span class="text-gray-500">{{ u.plan }}</span>
          </li>
        </ul>
      </section>

      <section class="bg-white p-4 rounded shadow">
        <h2 class="font-medium mb-2">Uso da plataforma</h2>
        <div class="text-sm">Correções totais: <span class="font-semibold">{{ total }}</span></div>
      </section>

      <section class="bg-white p-4 rounded shadow">
        <h2 class="font-medium mb-2">Planos</h2>
        <ul class="text-sm">
          <li v-for="p in plans.plans" :key="p.id" class="py-1 flex justify-between">
            <span>{{ p.name }}</span>
            <span>Limite: {{ p.limit }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEssaysStore } from '../../stores/essays.js'
import { usePlansStore } from '../../stores/plans.js'

const users = JSON.parse(localStorage.getItem('tf_users') || '[]')
const essays = useEssaysStore(); essays.load()
const plans = usePlansStore(); plans.load()
const total = computed(() => essays.items.length)
</script>



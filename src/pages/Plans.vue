<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">Planos de Assinatura</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div v-for="p in plans.plans" :key="p.id" class="bg-white rounded shadow p-4">
        <div class="text-sm uppercase text-gray-500">{{ p.name }}</div>
        <div class="text-3xl font-semibold my-2">{{ p.price === 0 ? 'Grátis' : 'R$ ' + p.price.toFixed(2) }}</div>
        <div class="text-sm text-gray-600 mb-2">Limite: {{ p.limit }}/mês</div>
        <ul class="text-sm list-disc pl-5 mb-3">
          <li v-for="b in p.benefits" :key="b">{{ b }}</li>
        </ul>
        <button @click="activate(p.id)" class="w-full py-2 rounded text-white" :class="isActive(p.id) ? 'bg-gray-400' : 'bg-primary-600'">
          {{ isActive(p.id) ? 'Plano ativo' : 'Assinar' }}
        </button>
      </div>
    </div>

    <div class="mt-8 bg-white p-4 rounded shadow">
      <h2 class="font-medium mb-2">Pagamento</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button class="border rounded p-3 hover:bg-gray-50">Cartão de crédito</button>
        <button class="border rounded p-3 hover:bg-gray-50">Boleto</button>
        <button class="border rounded p-3 hover:bg-gray-50">PIX</button>
      </div>
      <p class="text-sm text-gray-500 mt-3">Simulação de checkout. Integração real pode ser adicionada.</p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.js'
import { usePlansStore } from '../stores/plans.js'

const auth = useAuthStore()
auth.loadFromStorage()
const plans = usePlansStore()
plans.load()

function isActive(id) {
  return auth.currentUser?.plan === id
}

function activate(id) {
  auth.setPlan(id)
  alert('Plano alterado para ' + id)
}
</script>



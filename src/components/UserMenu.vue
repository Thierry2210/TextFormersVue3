<template>
  <div class="flex items-center gap-3">
    <div v-if="auth.isAuthenticated" class="flex items-center gap-3">
      <div class="text-right text-sm leading-tight">
        <div class="font-medium">{{ auth.currentUser?.name }}</div>
        <div class="text-gray-500">Plano: {{ auth.currentUser?.plan }}</div>
      </div>
      <button @click="logout" class="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-sm">Sair</button>
    </div>
    <div v-else>
      <router-link to="/login" class="px-3 py-1.5 rounded bg-primary-600 text-white text-sm">Entrar</router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth.js'

const auth = useAuthStore()
onMounted(() => auth.loadFromStorage())

async function logout() {
  await auth.logout()
}
</script>



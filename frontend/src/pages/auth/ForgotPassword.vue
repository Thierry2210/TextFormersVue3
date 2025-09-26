<template>
  <div class="max-w-md mx-auto bg-white shadow rounded-lg p-6">
    <h1 class="text-2xl font-semibold mb-4">Recuperar senha</h1>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm mb-1">E-mail</label>
        <input v-model="email" type="email" required class="w-full border rounded px-3 py-2" />
      </div>
      <button class="w-full bg-primary-600 text-white py-2 rounded">Enviar link</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const email = ref('')
const auth = useAuthStore()

async function handleSubmit() {
  await auth.requestPasswordReset(email.value)
  alert('Se este e-mail existir, enviaremos as instruções.')
}
</script>



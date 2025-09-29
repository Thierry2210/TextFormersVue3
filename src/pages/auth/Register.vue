<template>
  <div class="max-w-md mx-auto bg-white shadow rounded-lg p-4 sm:p-6">
    <h1 class="text-2xl font-semibold mb-4">Criar conta</h1>
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="block text-sm mb-1">Nome</label>
        <input v-model="name" type="text" required class="w-full bg-gray-200 border rounded px-3 py-3" />
      </div>
      <div>
        <label class="block text-sm mb-1">E-mail</label>
        <input v-model="email" type="email" required class="w-full bg-gray-200 border rounded px-3 py-3" />
      </div>
      <div>
        <label class="block text-sm mb-1">Senha</label>
        <input v-model="password" type="password" required class="w-full bg-gray-200 border rounded px-3 py-3" />
      </div>
      <button class="w-full bg-primary-600 text-white py-3 rounded">Cadastrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'

const auth = useAuthStore()
const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

async function handleRegister() {
  await auth.register(email.value, password.value, name.value)
  router.push('/dashboard')
}
</script>



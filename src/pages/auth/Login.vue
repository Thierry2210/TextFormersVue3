<template>
    <div class="max-w-md mx-auto bg-white shadow rounded-lg p-4 sm:p-6">
    <h1 class="text-2xl font-semibold mb-4">Entrar</h1>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <p v-if="error" class="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{{ error }}</p>
      <div>
        <label class="block text-sm mb-1">E-mail</label>
        <input v-model="email" type="email" required class="w-full bg-gray-200 border rounded px-3 py-3" />
      </div>
      <div>
        <label class="block text-sm mb-1">Senha</label>
        <input v-model="password" type="password" required class="w-full bg-gray-200 border rounded px-3 py-3" />
      </div>
      <button class="w-full bg-primary-600 text-white py-3 rounded">Entrar</button>
    </form>
    <div class="mt-4 grid grid-cols-1 gap-2">
      <button class="w-full border py-2 rounded" @click="auth.socialLogin('google')">Continuar com Google</button>
      <button class="w-full border py-2 rounded" @click="auth.socialLogin('facebook')">Continuar com Facebook</button>
    </div>
    <div class="mt-4 text-sm flex justify-between">
      <router-link class="text-primary-600" to="/register">Criar conta</router-link>
      <router-link class="text-primary-600" to="/forgot">Esqueci a senha</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  error.value = ''
  try {
    await auth.login(email.value, password.value)
    const redirect = (route.query.redirect) || '/dashboard'
    router.push(redirect)
  } catch (e) {
    error.value = e.message || 'Falha no login. Verifique suas credenciais.'
  }
}
</script>



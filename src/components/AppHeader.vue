<template>
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button class="lg:hidden p-2 rounded hover:bg-gray-100" @click="$emit('toggle-sidebar')" aria-label="Abrir menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
        </button>
        <router-link to="/" class="flex items-center gap-2 font-semibold text-primary-700">
          <span class="inline-block w-8 h-8 rounded bg-primary-600 text-white grid place-items-center">Tf</span>
          <span>TextFormers</span>
        </router-link>
      </div>
      <nav class="hidden lg:flex items-center gap-6 text-sm">
        <router-link class="hover:text-primary-600" to="/dashboard">Dashboard</router-link>
        <router-link class="hover:text-primary-600" to="/essay">Redação</router-link>
        <router-link class="hover:text-primary-600" to="/plans">Planos</router-link>
        <router-link class="hover:text-primary-600" to="/history">Histórico</router-link>
        <router-link class="hover:text-primary-600" to="/admin">Admin</router-link>
      </nav>
      <UserMenu />
    </div>
  </header>
  
</template>

<script setup>
import UserMenu from './UserMenu.vue'
</script>



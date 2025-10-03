<template>
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button class="sm:hidden p-2 rounded hover:bg-gray-100" @click="isOpen = !isOpen" aria-label="Abrir menu" :aria-expanded="isOpen">
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        </button>
        <router-link to="/" class="flex items-center gap-2 font-semibold text-primary-700">
          <span class="inline-block w-8 h-8 rounded bg-primary-600 text-white grid place-items-center">Tf</span>
          <span>TextFormers</span>
        </router-link>
      </div>
      <nav class="hidden sm:flex items-center gap-6 text-sm">
        <router-link :class="navClass('/dashboard')" to="/dashboard" aria-current="page">Dashboard</router-link>
        <router-link :class="navClass('/essay')" to="/essay">Redação</router-link>
        <router-link :class="navClass('/plans')" to="/plans">Planos</router-link>
        <router-link :class="navClass('/history')" to="/history">Histórico</router-link>
        <router-link :class="navClass('/admin')" to="/admin">Admin</router-link>
      </nav>
      <UserMenu />
    </div>
    <nav v-if="isOpen" ref="menuRef" class="sm:hidden border-t" role="menu">
      <div class="max-w-7xl mx-auto px-4 py-2 flex flex-col gap-2 text-sm">
        <router-link @click="isOpen = false" :class="mobileNavClass('/dashboard')" to="/dashboard">Dashboard</router-link>
        <router-link @click="isOpen = false" :class="mobileNavClass('/essay')" to="/essay">Redação</router-link>
        <router-link @click="isOpen = false" :class="mobileNavClass('/plans')" to="/plans">Planos</router-link>
        <router-link @click="isOpen = false" :class="mobileNavClass('/history')" to="/history">Histórico</router-link>
        <router-link @click="isOpen = false" :class="mobileNavClass('/admin')" to="/admin">Admin</router-link>
      </div>
    </nav>
  </header>
  
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import UserMenu from './UserMenu.vue'

const isOpen = ref(false)
const route = useRoute()
const menuRef = ref(null)

watch(() => route.fullPath, () => { isOpen.value = false })

function navClass(prefix) {
  const base = 'hover:text-primary-600'
  return route.path.startsWith(prefix) ? base + ' text-primary-700 font-medium' : base
}

function mobileNavClass(prefix) {
  const base = 'py-2 hover:text-primary-600'
  return route.path.startsWith(prefix) ? base + ' text-primary-700 font-medium' : base
}

function onKeydown(e) {
  if (e.key === 'Escape') isOpen.value = false
}

function onClickOutside(e) {
  if (!isOpen.value) return
  const el = menuRef.value
  if (el && !el.contains(e.target)) isOpen.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('click', onClickOutside)
})
</script>



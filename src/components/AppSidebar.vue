<template>
  <aside class="hidden lg:block w-64 border-r bg-white">
    <div class="p-4 text-xs uppercase tracking-wider text-gray-500">Navegação</div>
    <nav class="px-2 space-y-1">
      <router-link to="/dashboard" class="block px-3 py-2 rounded hover:bg-gray-100">Dashboard</router-link>
      <router-link to="/essay" class="block px-3 py-2 rounded hover:bg-gray-100">Redação</router-link>
      <router-link to="/plans" class="block px-3 py-2 rounded hover:bg-gray-100">Planos</router-link>
      <router-link to="/history" class="block px-3 py-2 rounded hover:bg-gray-100">Histórico</router-link>
      <router-link to="/admin" class="block px-3 py-2 rounded hover:bg-gray-100">Admin</router-link>
    </nav>
  </aside>
</template>

<script setup>
</script>



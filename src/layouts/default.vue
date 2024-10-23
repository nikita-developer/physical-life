<template>
  <div class="layout">
    <Header />
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
  import Header from '@/components/Header.vue'
</script>

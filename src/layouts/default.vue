<template>
  <v-main>
    <nav-bar v-if="!isLoginPage" />
    <router-view />
  </v-main>

  <AppFooter v-if="!isLoginPage" />
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const isLoginPage = computed(() => {
    // Check if the current route is either '/sign' or '/login'
    return route.path === '/sign' || route.path === '/login' || route.path === '/signup' || route.path === '/forgotPassword' || route.path === '/varification'
  })
</script>

<!--suppress ES6PreferShortImport -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/useAuth'
import LoadingIcon from '../../components/LoadingIcon.vue'

const router = useRouter()
const { supabase } = useAuthStore()

onMounted(() => {
  if (supabase.auth.user()) {
    console.log('arrived on callback page with an existing user, so going home')
    setTimeout(() => {
      router.push('/')
    }, 0)
  }
})
</script>
<template>
  <loading-icon class="mx-auto w-16" />
</template>

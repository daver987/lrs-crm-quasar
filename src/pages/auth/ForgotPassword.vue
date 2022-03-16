<!--suppress ES6PreferShortImport -->
<script setup lang="ts">
import { useAuthStore } from '../../stores/useAuth'
import { ref } from 'vue'

const email = ref('')
const loading = ref(false)
async function onSubmit() {
  loading.value = true
  const { supabase } = useAuthStore()
  const { data, error } = await supabase.auth.api.resetPasswordForEmail(
    email.value,
    {
      redirectTo: `${window.location.origin}/resetpassword`,
    }
  )
  if (data) {
    alert('please follow the link in your email')
  } else if (error) {
    alert(error.message)
  }
  loading.value = false
}
</script>
<template>
  <q-card-section>
    <div class="font-bold text-center q-mb-md text-h6 text-grey-9">
      Lost your password?
    </div>
    <div class="text-subtitle1 text-center q-mb-md text-grey-9">
      Let's sort that for you
    </div>
  </q-card-section>
  <q-card-section>
    <q-form class="q-gutter-md" @submit.prevent="onSubmit">
      <q-input
        v-model="email"
        required
        :disabled="loading"
        name="email"
        type="email"
        placeholder="Enter your email"
        outlined
        dense
      />
      <div>
        <q-btn
          :loading="loading"
          type="submit"
          class="full-width"
          color="primary"
          unelevated
        >
          Reset
        </q-btn>
      </div>
    </q-form>
  </q-card-section>
  <q-card-section>
    <q-btn to="/signup" label="Sign up" flat no-caps />
    <q-btn to="/signin" label="Sign in" flat no-caps />
  </q-card-section>
</template>

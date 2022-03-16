<!--suppress ES6PreferShortImport -->
<script setup lang="ts">
import { useAuthStore } from '../stores/useAuth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  signUp: {
    type: Boolean,
    default: null,
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  emailPlaceholder: {
    type: String,
    default: '',
  },
  passwordPlaceholder: {
    type: String,
    default: '',
  },
})

const credentials = ref({
  email: '',
  password: '',
})

const router = useRouter()

const emailLoading = ref(false)
async function emailAuth() {
  emailLoading.value = true
  const { supabase } = useAuthStore()
  const { user, error } = props.signUp
    ? await supabase.auth.signUp(credentials.value)
    : await supabase.auth.signIn(credentials.value)
  if (user) await router.push('/dashboard')
  else if (error) {
    alert(error.message)
    emailLoading.value = false
  }
}

const appleLoading = ref(false)
async function appleAuth() {
  appleLoading.value = true
  const { supabase } = useAuthStore()
  const { user, error } = await supabase.auth.signIn(
    { provider: 'github' },
    {
      redirectTo: `${window.location.origin}/callback`,
    }
  )
  if (user) await router.push('/dashboard')
  else if (error) {
    alert(error.message)
    appleLoading.value = false
  }
}

const googleLoading = ref(false)
async function googleAuth() {
  googleLoading.value = true
  const { supabase } = useAuthStore()
  const { user, error } = await supabase.auth.signIn(
    { provider: 'google' },
    {
      redirectTo: `${window.location.origin}/callback`,
    }
  )
  if (user) await router.push('/dashboard')
  else if (error) {
    alert(error.message)
    googleLoading.value = false
  }
}

const twitterLoading = ref(false)
async function twitterAuth() {
  twitterLoading.value = true
  const { supabase } = useAuthStore()
  const { user, error } = await supabase.auth.signIn(
    { provider: 'twitter' },
    {
      redirectTo: `${window.location.origin}/callback`,
    }
  )
  if (user) await router.push('/dashboard')
  else if (error) {
    alert(error.message)
    twitterLoading.value = false
  }
}

const facebookLoading = ref(false)
async function facebookAuth() {
  facebookLoading.value = true
  const { supabase } = useAuthStore()
  const { user, error } = await supabase.auth.signIn(
    { provider: 'facebook' },
    {
      redirectTo: `${window.location.origin}/callback`,
    }
  )
  if (user) await router.push('/dashboard')
  else if (error) {
    alert(error.message)
    facebookLoading.value = false
  }
}

const loading = computed(
  () =>
    appleLoading.value ||
    emailLoading.value ||
    googleLoading.value ||
    twitterLoading.value ||
    facebookLoading.value
)
</script>
<template>
  <q-card-section>
    <h2 class="font-bold text-center q-mb-md text-h5 text-grey-9">
      {{ title }}
    </h2>
    <p class="text-center text-subtitle1 q-mb-md text-grey-9">
      {{ subtitle }}
    </p>
  </q-card-section>
  <q-card-section>
    <q-form class="q-gutter-md" @submit.prevent="emailAuth">
      <q-input
        v-model="credentials.email"
        label="Email"
        name="email"
        for="email"
        color="grey-9"
        outlined
        dense
        required
        :disabled="loading"
        type="email"
        :placeholder="emailPlaceholder"
      />

      <q-input
        v-model="credentials.password"
        outlined
        dense
        label="Password"
        :disabled="loading"
        name="password"
        for="password"
        type="password"
        :placeholder="passwordPlaceholder"
        color="grey-9"
      />
      <div class="space-y-2 col">
        <q-btn
          v-if="!signUp"
          to="/forgotpassword"
          label="Forgot your password"
          flat
          no-caps
          class="row q-mb-md"
        />
        <q-btn
          no-caps
          :loading="emailLoading"
          :disabled="loading"
          type="submit"
          class="row full-width"
          color="primary"
          unelevated
          >{{ signUp ? 'Sign Up' : 'Sign In' }}</q-btn
        >
      </div>
    </q-form>
  </q-card-section>

  <q-card-section class="row justify-evenly">
    <q-btn
      :loading="appleLoading"
      :disabled="loading"
      type="button"
      round
      flat
      size="1.2rem"
      icon="fa-brands fa-apple"
      color="grey-9"
      @click="appleAuth"
    >
    </q-btn>
    <q-btn
      :loading="googleLoading"
      :disabled="loading"
      type="button"
      round
      flat
      size="1.2rem"
      icon="fa-brands fa-google"
      color="red-7"
      @click="googleAuth"
    />
    <q-btn
      :loading="twitterLoading"
      :disabled="loading"
      type="button"
      round
      flat
      size="1.2rem"
      icon="fa-brands fa-twitter"
      color="blue-7"
      @click="twitterAuth"
    >
    </q-btn>
    <q-btn
      :loading="facebookLoading"
      :disabled="loading"
      type="button"
      round
      flat
      size="1.2rem"
      icon="fa-brands fa-facebook"
      color="light-blue-9"
      @click="facebookAuth"
    >
    </q-btn>
  </q-card-section>
  <q-card-section class="q-pa-none">
    <slot name="actions" />
  </q-card-section>
</template>

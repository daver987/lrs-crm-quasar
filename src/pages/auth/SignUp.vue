<script setup lang="ts">
import AuthForm from '../../components/AuthForm.vue'
</script>

<template>
  <auth-form
    :sign-up="true"
    title="Good to have you"
    subtitle="We just need some details from you"
    email-placeholder="Enter your email"
    password-placeholder="Choose a password"
  >
    <template #actions>
      <q-card-section>
        <span class="text-subtitle1">
          Already registered?
          <router-link to="/signin" class="font-bold q-ml-sm text-blue-9"
            >Sign in here!</router-link
          ></span
        >
      </q-card-section></template
    >
  </auth-form>
</template>

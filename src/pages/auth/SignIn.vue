<template>
  <auth-form
    :sign-up="false"
    title="Welcome back"
    subtitle="Please enter your details"
    email-placeholder="Enter your email"
    password-placeholder="Enter your password"
  >
    <template #actions>
      <q-card-section>
        <span class="text-subtitle1">
          Don't have an account?
          <router-link to="/signup" class="font-bold q-ml-sm text-blue-9"
            >Sign up here!</router-link
          ></span
        ></q-card-section
      ></template
    >
  </auth-form>
</template>

<script setup lang="ts">
import AuthForm from '../../components/AuthForm.vue'
</script>

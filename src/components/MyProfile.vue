<template>
  <q-card class="q-pa-md" style="max-width: 30rem">
    <q-form @submit.prevent="useUser.updateProfile">
      <d-avatar
        v-model:path="useUser.userAvatarUrl"
        @upload="useUser.updateProfile"
      />

      <q-input
        id="email"
        v-model="user.email"
        type="text"
        disable
        label="Email"
        flat
        borderless
      />

      <q-input
        v-model="userUserName"
        name="username"
        type="text"
        label="Username"
        flat
        borderless
      />

      <q-input
        v-model="userCompanyName"
        name="company_name"
        type="text"
        label="Company Name"
        flat
        borderless
      />
      <q-input
        v-model="userCompanyAddress"
        name="company_address"
        type="text"
        label="Company Address"
        flat
        borderless
      />
      <q-input
        v-model="userCompanyPhone"
        name="company_phone"
        type="text"
        label="Company Phone"
        flat
        borderless
      />
      <q-input
        v-model="userCompanyEmail"
        name="company_email"
        type="text"
        label="Company Email"
        flat
        borderless
      />
      <q-input
        v-model="userCompanyWebsite"
        name="company_website"
        type="text"
        label="Company Website"
        flat
        borderless
      />
      <q-btn
        type="submit"
        :disabled="loading"
        :label="loading ? 'Loading ...' : 'Update'"
        color="primary"
      />
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/useUserStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import DAvatar from '../components/DAvatar.vue'

const useUser = useUserStore()
const {
  user,
  loading,
  userCompanyWebsite,
  userUserName,
  userCompanyName,
  userCompanyAddress,
  userCompanyPhone,
  userCompanyEmail,
} = storeToRefs(useUser)

onMounted(() => {
  useUser.getProfile()
})

// const profileInputs = ref([
//   {
//     id: 1,
//     name: 'username',
//     model: useUser.userUserName,
//     label: 'Username',
//     type: 'text',
//     required: false,
//     disabled: false,
//   },
//   {
//     id: 2,
//     name: 'company_name',
//     model: useUser.userCompanyName,
//     label: 'Company Name',
//     type: 'text',
//     required: false,
//     disabled: false,
//   },
//   {
//     id: 3,
//     name: 'company_address',
//     model: userCompanyAddress.value,
//     label: 'Company Address',
//     type: 'text',
//     required: false,
//     disabled: false,
//   },
//   {
//     id: 4,
//     name: 'company_phone',
//     model: userCompanyPhone.value,
//     label: 'Company Phone',
//     type: 'text',
//     required: false,
//     disabled: false,
//   },
//   {
//     id: 5,
//     name: 'company_website',
//     model: userCompanyWebsite.value,
//     label: 'Company Website',
//     type: 'text',
//     required: false,
//     disabled: false,
//   },
// ])
</script>

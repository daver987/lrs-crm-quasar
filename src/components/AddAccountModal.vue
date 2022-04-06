<script setup lang="ts">
import { supabase } from '../services/supabase'
import { useAccounts } from '../stores/useAccounts'
import { storeToRefs } from 'pinia'
import { data } from '../data/useData'
import { onMounted, ref } from 'vue'

defineProps({
  openValue: {
    default: false,
    type: Boolean,
  },
})

const accounts = useAccounts()
const prefs = data()

const onSubmit = () => {
  accounts.saveAccount()
  onReset()
}
const onReset = () => {
  accounts.$reset()
  accounts.getRows()
}

const {
  isOpen,
  companyName,
  companyAddress,
  companyPhone,
  companyEmail,
  companyNotes,
  companyPaymentMethod,
  companyPaymentTerms,
  companyAccountNumber,
  individualFirstName,
  individualLastName,
  individualEmail,
  individualPhone,
} = storeToRefs(accounts)

//get current account number from supabase
const loading = ref(true)
const user = ref(null)
async function getAccountNumber() {
  try {
    loading.value = true
    user.value = supabase.auth.user()
    const { data, error, status } = await supabase
      .from('profiles')
      .select('account_number')
      .eq('user_id', user.value.id)
      .single()

    if (error && status !== 406) {
      console.log(error)
      return
    }

    if (data) {
      const { account_number } = data
      companyAccountNumber.value = account_number
      console.log(account_number)
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  getAccountNumber()
})
</script>

<template>
  <q-dialog v-model="isOpen">
    <q-layout view="hHh lpR fFf" container class="bg-white">
      <q-page-container>
        <q-page>
          <q-card
            tag="form"
            class="bg-white col q-pa-sm"
            flat
            @reset="onReset"
            @submit="onSubmit"
          >
            <!--            Modal Header-->
            <q-toolbar>
              <span class="text-bold text-subtitle2 q-mr-sm">
                Account Number </span
              ><span class="text-bold text-subtitle1 text-red-7">
                {{ companyAccountNumber }}
              </span>
              <q-space />

              <q-space /><q-btn v-close-popup icon="close" flat round dense />
            </q-toolbar>

            <q-card-section class="col q-gutter-md">
              <q-input
                v-model="companyName"
                bg-color="white"
                outlined
                dense
                class="row"
                type="text"
                label="Company Name"
                name="company_name"
                for="company_name"
                hide-bottom-space
              />
              <q-input
                v-model="companyAddress"
                bg-color="white"
                outlined
                dense
                class="row"
                type="text"
                label="Company Address"
                name="company_address"
                for="company_address"
                hide-bottom-space
              />
              <div class="row">
                <q-input
                  v-model="companyPhone"
                  mask="phone"
                  fill-mask
                  bg-color="white"
                  class="col-4 q-mr-sm"
                  outlined
                  dense
                  type="tel"
                  label="Company Phone"
                  name="company_phone"
                  for="company_phone"
                  hide-bottom-space
                />
                <q-input
                  v-model="companyEmail"
                  mask="email"
                  bg-color="white"
                  class="col"
                  outlined
                  dense
                  type="email"
                  label="Company Email"
                  name="company_email"
                  for="company_email"
                  hide-bottom-space
                />
              </div>
            </q-card-section>
            <q-card-section class="q-py-none">
              <div class="text-bold">Main Contact</div>
            </q-card-section>
            <q-card-section class="q-gutter-sm">
              <div class="row">
                <q-input
                  v-model="individualFirstName"
                  bg-color="white"
                  class="col q-mr-sm"
                  outlined
                  dense
                  type="text"
                  label="First Name"
                  name="individual_first_name"
                  for="individual_first_name"
                  hide-bottom-space
                />
                <q-input
                  v-model="individualLastName"
                  bg-color="white"
                  class="col"
                  outlined
                  dense
                  type="text"
                  label="Last Name"
                  name="individual_last_name"
                  for="individual_last_name"
                  hide-bottom-space
                />
              </div>
              <div class="row">
                <q-input
                  v-model="individualPhone"
                  mask="phone"
                  fill-mask
                  bg-color="white"
                  class="col-4 q-mr-sm"
                  outlined
                  dense
                  type="tel"
                  label="Contact Phone"
                  name="individual_phone"
                  for="individual_phone"
                  hide-bottom-space
                />
                <q-input
                  v-model="individualEmail"
                  mask="email"
                  bg-color="white"
                  class="col"
                  outlined
                  dense
                  type="email"
                  label="Contact Email"
                  name="individual_email"
                  for="individual_email"
                  hide-bottom-space
                />
              </div>
            </q-card-section>

            <!--Company Financial Entry -->
            <q-card-section class="q-py-none">
              <div class="text-bold">Payment Info</div>
            </q-card-section>
            <q-card-section class="q-gutter-sm">
              <div class="row">
                <q-select
                  v-model="companyPaymentMethod"
                  bg-color="white"
                  class="col q-mr-sm"
                  outlined
                  dense
                  type="text"
                  label="Payment Method"
                  name="company_payment_method"
                  for="company_payment_method"
                  :options="prefs.paymentMethod"
                  options-dense
                  transition-show="fade"
                  transition-hide="fade"
                />
                <q-select
                  v-model="companyPaymentTerms"
                  bg-color="white"
                  class="col"
                  outlined
                  dense
                  type="text"
                  label="Payment Terms"
                  name="company_payment_terms"
                  for="company_payment_terms"
                  :options="prefs.paymentTerms"
                  options-dense
                  transition-show="fade"
                  transition-hide="fade"
                />
              </div>

              <q-input
                v-model="companyNotes"
                bg-color="white"
                class="row"
                outlined
                dense
                type="textarea"
                label="Account Notes"
                name="company_notes"
                for="company_notes"
                hide-bottom-space
              />
            </q-card-section>

            <q-card-section class="q-gutter-md">
              <q-btn
                outline
                color="primary"
                label="Save Account"
                type="submit"
              />
              <q-btn outline color="primary" label="Reset" type="reset" />
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

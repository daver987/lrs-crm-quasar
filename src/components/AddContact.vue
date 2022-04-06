<template>
  <q-dialog>
    <q-layout view="hHh lpR fFf" container class="bg-white">
      <q-page-container>
        <q-page>
          <q-card>
            <q-card-section>
              <q-input
                v-model="contactName"
                bg-color="white"
                outlined
                dense
                class="row"
                type="text"
                label="Contact Name"
                name="contact_name"
                for="contact_name"
                hide-bottom-space
              />
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
const contactName = ref('')
</script>

<style scoped></style>

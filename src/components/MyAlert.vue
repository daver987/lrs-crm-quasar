<template>
  <q-dialog auto-close>
    <q-card>
      <q-card-section>
        <div class="text-h6">Saved Quote!</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ message }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="OK" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: '',
    required: true,
  },
})
</script>

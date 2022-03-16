<template>
  <q-img
    v-if="src"
    :src="src"
    alt="Avatar"
    class="object-fit"
    :width="size"
    :height="size"
    fit="contain"
  />
  <div v-else class="avatar no-image" :style="{ height: size, width: size }" />

  <div :style="{ width: size }">
    <label class="cursor-pointer button primary block" for="single">
      {{ uploading ? 'Uploading ...' : 'Upload' }}
    </label>
    <input
      id="single"
      style="visibility: hidden; position: absolute"
      type="file"
      accept="image/*"
      :disabled="uploading"
      @change="uploadAvatar"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { supabase } from '../services/supabase'

interface Props {
  path?: string
}
const props = withDefaults(defineProps<Props>(), {
  path: '',
})

const emit = defineEmits(['upload', 'update:path'])

const { path } = toRefs(props)
const size = ref('10em')
const uploading = ref(false)
const src = ref('')
const files = ref()

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(path.value)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

const uploadAvatar = async (evt) => {
  files.value = evt.target.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    let { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) throw uploadError
    emit('update:path', filePath)
    emit('upload')
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}

watch(path, () => {
  if (path.value) downloadImage()
})
</script>

<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card rounded="xl" elevation="2" class="pa-4">
      <v-card-title class="text-h5 font-weight-bold pb-0">{{ formTitle }}</v-card-title>
      <v-divider class="mb-4"></v-divider>
      <v-card-text>
        <v-form class="d-flex flex-column ga-4">
          <v-text-field v-model="editedTask.title" label="Task Title" variant="outlined" rounded="lg" color="orange-darken-2" bg-color="grey-lighten-4"></v-text-field>
          <v-row>
            <v-col cols="12" sm="6">
              <v-select v-model="editedTask.priority" :items="['medium', 'low', 'high']" label="Priority" variant="outlined" rounded="lg" color="orange-darken-2" bg-color="grey-lighten-4"></v-select>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex align-center">
              <v-checkbox v-model="editedTask.is_done" label="Done?" color="orange-darken-2" hide-details></v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pt-2 pb-2">
        <v-spacer></v-spacer>
        <v-btn variant="text" color="grey-darken-1" @click="close">Cancel</v-btn>
        <v-btn color="orange-darken-2" class="text-white font-weight-bold px-6" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  task: Object
})

const emit = defineEmits(['update:modelValue', 'save'])

const dialog = ref(props.modelValue)
const editedTask = ref({})

const formTitle = computed(() => (props.task && props.task.id ? 'Edit Task' : 'New Task'))

watch(() => props.modelValue, (val) => {
  dialog.value = val
  if (val) {
    editedTask.value = { ...props.task }
  }
})

watch(dialog, (val) => {
  if (!val) {
    close()
  }
})

function close() {
  dialog.value = false
  emit('update:modelValue', false)
}

function save() {
  emit('save', editedTask.value)
  close()
}
</script>

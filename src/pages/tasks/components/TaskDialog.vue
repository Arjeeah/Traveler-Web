<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="editedTask.text" label="Task"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="editedTask.status" :items="['To do', 'In Progress', 'Done']" label="Status"></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="editedTask.priority" :items="['Urgent', 'Medium', 'Regular']" label="Priority"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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

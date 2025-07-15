<template>
  <v-container>
    <PageHeader title="Check List" />

    <div class="d-flex align-center mb-5">
      <v-icon color="orange" class="mr-2">mdi-circle-small</v-icon>
      <span class="font-weight-bold">Add To Do Tasks</span>
    </div>

    <v-row class="text-grey mb-2">
      <v-col cols="6">Task</v-col>
      <v-col cols="2">Status</v-col>
      <v-col cols="2">Priority</v-col>
      <v-col cols="2">Edit</v-col>
    </v-row>

    <TaskItem :tasks="tasks" @add="openNewTaskDialog" @edit="openEditTaskDialog" @delete="deleteTask" />

    <ActionButtons />

    <TaskDialog v-model="dialog" :task="editedTask" @save="saveTask" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '../../components/PageHeader.vue'
import TaskItem from './components/TaskItem.vue'
import ActionButtons from './components/ActionButtons.vue'
import TaskDialog from './components/TaskDialog.vue'

const tasks = ref([
  { id: 1, text: 'Bringing food', status: 'To do', priority: 'Urgent' },
  { id: 2, text: 'Camping tools', status: 'To do', priority: 'Medium' },
  { id: 3, text: 'Car Check', status: 'To do', priority: 'Regular' },
  { id: 4, text: 'Water', status: 'To do', priority: 'Regular' }
])

const dialog = ref(false)
const editedTask = ref({})

function openNewTaskDialog() {
  editedTask.value = {}
  dialog.value = true
}

function openEditTaskDialog(task) {
  editedTask.value = { ...task }
  dialog.value = true
}

function deleteTask(taskToDelete) {
  tasks.value = tasks.value.filter(task => task.id !== taskToDelete.id)
}

function saveTask(savedTask) {
  if (savedTask.id) {
    const index = tasks.value.findIndex(task => task.id === savedTask.id)
    if (index !== -1) {
      tasks.value.splice(index, 1, savedTask)
    }
  } else {
    savedTask.id = Date.now()
    tasks.value.push(savedTask)
  }
}
</script>

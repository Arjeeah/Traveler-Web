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

    <ActionButtons :trip-id="tripId" />

    <TaskDialog v-model="dialog" :task="editedTask" @save="saveTask" />
  </v-container>
</template>

<script setup>
import auth from '@/middleware/auth'
import { useRouter } from 'vue-router'
auth({ next: () => {}, router: useRouter() })
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import PageHeader from '../../components/PageHeader.vue'
import TaskItem from './components/TaskItem.vue'
import ActionButtons from './components/ActionButtons.vue'
import TaskDialog from './components/TaskDialog.vue'

const route = useRoute()
const taskStore = useTaskStore()
const tripId = route.query.trip_id

const tasks = ref([])
const dialog = ref(false)
const editedTask = ref({
  title: '',
  is_done: false,
  priority: 'medium',
})

onMounted(async () => {
  if (tripId) {
    await taskStore.fetchTasks(tripId)
    tasks.value = taskStore.getTasks
  }
})

function openNewTaskDialog() {
  editedTask.value = {
    title: '',
    is_done: false,
    priority: 'medium',
  }
  dialog.value = true
}

function openEditTaskDialog(task) {
  editedTask.value = {
    id: task.id,
    title: task.title,
    is_done: !!task.is_done,
    priority: task.priority || 'medium',
  }
  dialog.value = true
}

async function deleteTask(taskToDelete) {
  if (tripId && taskToDelete.id) {
    await taskStore.deleteTask(taskToDelete.id)
    tasks.value = taskStore.getTasks
  }
}

async function saveTask(savedTask) {
  if (tripId) {
    if (savedTask.id) {
      await taskStore.updateTask(savedTask.id, savedTask)
    } else {
      await taskStore.createTask(tripId, savedTask)
    }
    await taskStore.fetchTasks(tripId)
    tasks.value = taskStore.getTasks
    dialog.value = false
  }
}
</script>

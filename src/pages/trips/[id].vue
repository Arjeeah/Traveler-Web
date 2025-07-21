<template>
  <v-container>
    <div class="d-flex align-center mb-6">
      <v-btn icon @click="$router.back()" class="mr-2">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="text-h5 font-weight-bold flex-grow-1">Trip Details</h1>
      <v-btn icon color="red" class="mr-2"><v-icon>mdi-delete</v-icon></v-btn>
      <v-btn icon color="grey" class="mr-2"><v-icon>mdi-share-variant</v-icon></v-btn>
      <v-btn color="orange text-white" class="mr-2">Mark as done</v-btn>
    </div>
    <v-card class="mb-6" rounded="lg" elevation="0">
      <v-img :src="tripImage" height="536" class="mb-4" cover></v-img>
      <div class="px-6 pb-6">
        <div class="d-flex align-center mb-2">
          <h1 class="text-h4 font-weight-bold mb-0 flex-grow-1">{{ trip.title }}</h1>
          <v-chip color="green" class="mr-2">Active</v-chip>
          <v-btn color="orange text-white" outlined class="mr-2" @click="openEditDialog">Edit</v-btn>
        </div>
        <div class="mb-4 text-grey">{{ trip.description }}</div>
        <div class="mb-4 d-flex gap-4">
          <div class="info-chip">
            <div class="font-weight-bold mb-1">Starting Date</div>
            <div>{{ trip.start_date }}</div>
          </div>
          <div class="info-chip">
            <div class="font-weight-bold mb-1">End Date</div>
            <div>{{ trip.end_date }}</div>
          </div>
          <div class="info-chip">
            <div class="font-weight-bold mb-1">Budget</div>
            <div>{{ trip.budget }} LYD</div>
          </div>
          <div class="info-chip">
            <div class="font-weight-bold mb-1">Attendance</div>
            <div>{{ trip.number_of_people }}</div>
          </div>
        </div>
      </div>
    </v-card>
    <!-- Edit Trip Dialog -->
    <v-dialog v-model="editDialog" max-width="600">
      <v-card rounded="xl" elevation="2" class="pa-4">
        <v-card-title class="text-h5 font-weight-bold pb-0">Edit Trip</v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text>
          <v-form ref="editForm" @submit.prevent="submitEdit" class="d-flex flex-column ga-4">
            <v-text-field v-model="editTrip.title" label="Title" variant="outlined" rounded="lg" color="orange-darken-2" bg-color="grey-lighten-4" :rules="[v => !!v || 'Name is required']"></v-text-field>
            <v-textarea v-model="editTrip.description" label="Description" variant="outlined" rounded="lg" color="orange-darken-2" bg-color="grey-lighten-4" rows="3" :rules="[v => !!v || 'Description is required']"></v-textarea>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model.number="editTrip.budget" label="Budget" type="number" prefix="$" variant="outlined" rounded="lg" color="orange-darken-2" bg-color="grey-lighten-4" :rules="[v => !!v || 'Budget is required', v => v > 0 || 'Budget must be positive']"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model.number="editTrip.number_of_people" label="Attendance" type="number" variant="outlined" rounded="lg" color="orange-darken-2" bg-color="grey-lighten-4" :rules="[v => !!v || 'Attendance is required', v => v > 0 || 'Attendance must be positive']"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editTrip.start_date" label="Start Date" type="date" variant="outlined" rounded="lg" color="orange-darken-2" bg-color="grey-lighten-4" :rules="[v => !!v || 'Starting date is required', v => isFutureDate(v) || 'Start date must be in the future']"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editTrip.end_date" label="End Date" type="date" variant="outlined" rounded="lg" color="orange-darken-2" bg-color="grey-lighten-4" :rules="[v => !!v || 'End date is required', v => isEndAfterStart(editTrip.start_date, v) || 'End date must be after start date']"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pt-2 pb-2">
          <v-spacer></v-spacer>
          <v-btn variant="text" color="grey-darken-1" @click="editDialog = false">Cancel</v-btn>
          <v-btn color="orange-darken-2" class="text-white font-weight-bold px-6" @click="submitEdit" :loading="tripStore.getLoading" :disabled="tripStore.getLoading">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="section-title-row mb-2">
      <span class="section-title">Trip Tasks</span>
      <v-spacer></v-spacer>

    </div>
    <div class="tasks-list">
      <div v-for="task in tasks" :key="task.id" class="task-row">
        <span class="task-title">{{ task.title }}</span>
        <span class="task-status">
          <v-chip :color="white" class="status-chip" text-color="white">
            {{ task.is_done ? 'Done' : 'To do' }}
          </v-chip>
        </span>
        <span class="task-priority" :class="task.priority">
          <span v-if="task.priority === 'high'" style="color:#FF3A3A">High</span>
          <span v-else-if="task.priority === 'medium'" style="color:#FF9900">Medium</span>
          <span v-else style="color:#222">Low</span>
        </span>
        <v-btn class="ml-4"  variant="plain" color="grey-darken-2" size="mid" style="min-width:32px;padding:0;" @click="openTaskEdit(task)">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </div>
      <TaskDialog v-model="taskDialog" :task="selectedTask" @save="saveTaskEdit" />
    </div>

    <h2 class="text-h6 font-weight-bold mb-2">Trip Checklist</h2>
    <v-card class="mb-6" rounded="lg" v-for="(area, index) in areas" :key="area.id">
      <v-row align="center">
        <v-col cols="auto">
          <v-img :src="getRandomImage()" width="60" height="60" class="rounded-lg mr-4"></v-img>
        </v-col>
        <v-col>
          <div class="font-weight-bold">{{ area.name }}</div>
          <div class="text-caption text-grey">{{ area.description }}</div>
        </v-col>
        <v-col cols="auto">
          <v-chip class="mr-2" outlined>{{ index + 1 }}{{ index === 0 ? 'st' : index === 1 ? 'nd' : 'th' }} place to go</v-chip>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import auth from '@/middleware/auth'
import { useRoute, useRouter } from 'vue-router'
auth({ next: () => {}, router: useRouter() })
import { ref, onMounted } from 'vue'
import { useTripStore } from '@/stores/tripStore'
import { useTaskStore } from '@/stores/taskStore'
import PageHeader from '../../components/PageHeader.vue'
import TaskDialog from '../tasks/components/TaskDialog.vue'
import kornishImg from '@/assets/kornish.png'
import tebistiImg from '@/assets/tebisti.png'
import venesiaImg from '@/assets/venesia.png'

const images = [kornishImg, tebistiImg, venesiaImg]
function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)]
}
function getPriorityColor(priority) {
  if (priority === 'high') return 'red'
  if (priority === 'medium') return 'orange'
  return 'grey'
}

const route = useRoute()
const tripStore = useTripStore()
const taskStore = useTaskStore()
const tripId = route.params.id
const trip = ref({})
const tripImage = ref('')
const tasks = ref([])
const areas = ref([])
const editDialog = ref(false)
const editTrip = ref({})
const editForm = ref(null)
const taskDialog = ref(false)
const selectedTask = ref(null)

onMounted(async () => {
  await tripStore.fetchTripById(tripId)
  const tripData = tripStore.getCurrentTrip
  trip.value = tripData
  tripImage.value = getRandomImage()
  tasks.value = tripData.tasks || []
  areas.value = tripData.areas || []
})

function openEditDialog() {
  editTrip.value = {
    title: trip.value.title,
    description: trip.value.description,
    budget: trip.value.budget,
    number_of_people: trip.value.number_of_people,
    start_date: trip.value.start_date,
    end_date: trip.value.end_date
  }
  editDialog.value = true
}

function openTaskEdit(task) {
  selectedTask.value = { ...task }
  taskDialog.value = true
}

function saveTaskEdit(edited) {
  const idx = tasks.value.findIndex(t => t.id === edited.id)
  if (idx !== -1) {
    tasks.value[idx] = { ...edited }
  }
  taskDialog.value = false
}

function isFutureDate(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0,0,0,0);
  const inputDate = new Date(dateStr);
  return inputDate > today;
}
function isEndAfterStart(start, end) {
  if (!start || !end) return false;
  return new Date(end) > new Date(start);
}

async function submitEdit() {
  if (editForm.value && !(await editForm.value.validate()).valid) return
  try {
    await tripStore.updateTrip(tripId, editTrip.value)
    await tripStore.fetchTripById(tripId)
    trip.value = tripStore.getCurrentTrip
    editDialog.value = false
  } catch (error) {
    // Optionally show error
    console.error('Failed to update trip:', error)
  }
}
</script>

<style scoped>
.v-card {
  border-color: #E0E0E0;
}
.info-chip {
  background: #FFEEDB;
  border-radius: 10px;
  padding: 16px 24px;
  min-width: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 24px;
}
.gap-4 > *:not(:last-child) {
  margin-right: 24px;
}
.section-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 32px;
}
.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #A3A3A3;
  margin-right: 12px;
}
.edit-btn {
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  padding: 4px 18px;
  border: 1px solid #FFA94D;
  color: #FFA94D;
  background: #fff;
}
.tasks-list {
  background: none;
  margin-bottom: 32px;
}
.task-row {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 0 0 #000;
  border: 1px solid #F5F5F5;
  margin-bottom: 12px;
  padding: 18px 24px;
}
.task-title {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #222;
}
.task-status {
  margin-right: 18px;
}
.status-chip {
  background: #FFA94D;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  border-radius: 6px;
  padding: 0 18px;
}
.task-priority {
  font-size: 15px;
  font-weight: 500;
  min-width: 70px;
  text-align: right;
}
.task-priority.high {
  color: #FF3A3A;
}
.task-priority.medium {
  color: #FF9900;
}
.task-priority.low, .task-priority.regular {
  color: #222;
}
</style>

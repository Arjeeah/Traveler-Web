<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-4" rounded="lg">
          <div class="d-flex align-center mb-2">
            <v-icon color="orange" class="mr-2">mdi-circle-small</v-icon>
            <span class="font-weight-bold">Add Your Blocks</span>
          </div>
          <p class="text-caption text-grey mb-4">Press the plus button to add one of the recommended areas!</p>

          <div class="font-weight-bold mb-2">Libya/Benghazi</div>

          <AreaCard v-for="area in availableAreas" :key="area.id" :area="area" @add="addArea" />

          <v-btn block color="orange" to="/trips/" dark large class="mt-4">Done</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <div class="d-flex justify-space-between align-center mb-4">
          <h2 class="text-h5 font-weight-bold">The journey to Benghazi</h2>
          <v-btn color="orange" dark>
            Add Area Manual
            <v-icon right>mdi-plus</v-icon>
          </v-btn>
        </div>

        <SelectedAreaCard v-for="area in selectedAreas" :key="area.id" :area="area" @remove="removeArea" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import AreaCard from './components/AreaCard.vue'
import SelectedAreaCard from './components/SelectedAreaCard.vue'
import venesiaImg from '@/assets/heropic.png' // Replace with actual image path

const availableAreas = ref([
  { id: 1, name: 'Venesia', location: 'Libya/Benghazi', description: 'Map your trip, set your budget and share it with your travel friends for more organised and fun trip', image: venesiaImg },
  { id: 2, name: 'Tebisti', location: 'Libya/Benghazi', description: 'Map your trip, set your budget and share it with your travel friends for more organised and fun trip', image: venesiaImg },
  { id: 3, name: 'Al kornish', location: 'Libya/Benghazi', description: 'Map your trip, set your budget and share it with your travel friends for more organised and fun trip', image: venesiaImg }
])

const selectedAreas = ref([])

function addArea(area) {
  if (!selectedAreas.value.find(a => a.id === area.id)) {
    const order = selectedAreas.value.length === 0 ? '1st place to go' : '2nd place to go'
    selectedAreas.value.push({ ...area, order })
  }
}

function removeArea(area) {
  selectedAreas.value = selectedAreas.value.filter(a => a.id !== area.id)
}
</script>

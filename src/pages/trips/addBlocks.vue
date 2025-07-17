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

          <div class="font-weight-bold mb-2">{{ countryName }}/{{ cityName }}</div>

          <AreaCard v-for="area in availableAreas" :key="area.id" :area="area" @add="addArea" />

          <v-btn block color="orange" to="/trips/" dark large class="mt-4">Done</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <div class="d-flex justify-space-between align-center mb-4">
          <h2 class="text-h5 font-weight-bold">The journey to {{ cityName }}</h2>
          <v-btn color="orange" dark>
            Add Area Manual
            <v-icon right>mdi-plus</v-icon>
          </v-btn>
        </div>

        <SelectedAreaCard v-for="(area, index) in selectedAreas" :key="area.id" :area="area" @remove="removeArea" :index="index" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCountriesStore } from '@/stores/countriesStore'
import { useTripStore } from '@/stores/tripStore'
import AreaCard from './components/AreaCard.vue'
import SelectedAreaCard from './components/SelectedAreaCard.vue'
import venesiaImg from '@/assets/heropic.png'

const route = useRoute()
const countriesStore = useCountriesStore()
const tripStore = useTripStore()

const tripId = route.query.trip_id
const availableAreas = ref([])
const selectedAreas = ref([])
const countryName = ref('')
const cityName = ref('')

onMounted(async () => {
  if (tripId) {
    await tripStore.fetchTripById(tripId)
    const trip = tripStore.getCurrentTrip
    console.log('Current Trip:', trip)
    if (trip && trip.city) {
      countryName.value = trip.city.country.name || ''
      cityName.value = trip.city.name || ''
      // Use getAreasByCity to show areas for the current city
      availableAreas.value = trip.city.areas || []
      console.log('Available Areas:', availableAreas.value)
    }
    await tripStore.fetchTripAreas(tripId)
    selectedAreas.value = tripStore.getCurrentTripAreas
  }
})

async function addArea(area) {
  if (!selectedAreas.value.find(a => a.id === area.id)) {
    await tripStore.addAreaToTrip(tripId, area.id, selectedAreas.value.length)
    await tripStore.fetchTripAreas(tripId)
    selectedAreas.value = tripStore.getCurrentTripAreas
  }
}

async function removeArea(area) {
  await tripStore.removeAreaFromTrip(tripId, area.id)
  await tripStore.fetchTripAreas(tripId)
  selectedAreas.value = tripStore.getCurrentTripAreas
}
</script>

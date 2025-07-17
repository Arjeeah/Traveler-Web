<template>
  <v-container>
    <PageHeader title="Your Trips" />
    <TripCard v-for="(trip, index) in trips" :key="index" :trip="trip" @view="viewTrip(trip.id)" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTripStore } from '@/stores/tripStore'
import PageHeader from '../../components/PageHeader.vue'
import TripCard from './components/TripCard.vue'
import kornishImg from '@/assets/kornish.png'
import tebistiImg from '@/assets/tebisti.png'
import venesiaImg from '@/assets/venesia.png'
import { useRouter } from 'vue-router'

const images = [kornishImg, tebistiImg, venesiaImg]
function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)]
}

const tripStore = useTripStore()
const router = useRouter()
const trips = ref([])

onMounted(async () => {
  await tripStore.fetchTrips()
  trips.value = tripStore.getTrips.map(trip => ({
    ...trip,
    image: getRandomImage()
  }))
})

function viewTrip(id) {
  router.push({ path: `/trips/${id}` })
}
</script>





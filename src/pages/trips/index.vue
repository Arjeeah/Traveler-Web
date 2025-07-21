<template>
  <v-container>
    <PageHeader title="Your Trips" />
    <TripCard v-for="(trip, index) in trips" :key="index" :trip="trip" @view="viewTrip(trip.id)" />
    <v-row justify="center" v-if="paginationMeta">
      <v-pagination
        v-model="currentPage"
        :length="paginationMeta.last_page"
        :total-visible="5"
        @update:modelValue="goToPage"
        color="orange-darken-2"
        class="mt-6"
      />
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import auth from '@/middleware/auth'
auth({ next: () => {}, router: useRouter() })

import { ref, onMounted, watch } from 'vue'
import { useTripStore } from '@/stores/tripStore'
import PageHeader from '../../components/PageHeader.vue'
import TripCard from './components/TripCard.vue'
import kornishImg from '@/assets/kornish.jpg'
import tebistiImg from '@/assets/tebisti.jpg'
import venesiaImg from '@/assets/venesia.jpg'

const images = [kornishImg, tebistiImg, venesiaImg]
function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)]
}

const tripStore = useTripStore()
const router = useRouter()
const trips = ref([])
const paginationMeta = ref(null)
const isLoading = ref(false)

const currentPage = ref(1)
const perPage = ref(10)

async function fetchTrips(page = 1) {
  isLoading.value = true
  await tripStore.fetchTrips({ page, per_page: perPage.value })
  trips.value = tripStore.getTrips.map(trip => ({
    ...trip,
    image: getRandomImage()
  }))
  paginationMeta.value = tripStore.getPaginationMeta
  isLoading.value = false
}

onMounted(() => {
  fetchTrips(currentPage.value)
})

function viewTrip(id) {
  router.push({ path: `/trips/${id}` })
}

function goToPage(page) {
  if (page < 1 || (paginationMeta.value && page > paginationMeta.value.last_page)) return
  fetchTrips(page)
}

watch(currentPage, (page) => {
  fetchTrips(page)
})
</script>





<template>
  <v-row justify="end" class="mt-5">
    <v-btn variant="outlined" class="mr-2" @click="skip">Skip</v-btn>
    <v-btn variant="outlined" class="mr-2" @click="goBack">Back</v-btn>
    <v-btn color="orange" variant="flat" @click="goNext">Next</v-btn>
  </v-row>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
  tripId: {
    type: [String, Number],
    required: true
  }
})
const router = useRouter()

function goNext() {
  router.push({ path: '/trips/checkPoint', query: { trip_id: props.tripId } })
}
function goBack() {
  router.back()
}
function skip() {
  // Example: go to trips page, pass trip_id if needed
  router.push({ path: '/trips', query: { trip_id: props.tripId } })
}
</script>

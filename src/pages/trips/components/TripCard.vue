<template>
  <v-card class="mb-5" elevation="2" rounded="lg">
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <v-img :src="trip.image" height="354px" class="rounded-s-lg" cover></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <div class="pa-4">
          <v-chip :color="chipColor" text-color="white" size="small" class="mb-2">{{ chipText }}</v-chip>
          <h2 class="text-h5 font-weight-bold mb-2">{{ trip.title }}</h2>
          <p class="text-body-1 mb-4">{{ trip.description }}</p>
          <v-row>
            <v-col cols="6">
              <div class="text-grey">Budget</div>
              <div class="font-weight-bold">{{ trip.budget }}</div>
            </v-col>
            <v-col cols="6">
              <div class="text-grey">Attendance</div>
              <div class="font-weight-bold">{{ trip.attendance }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <div class="text-grey">Starting Date</div>
              <div class="font-weight-bold">{{ trip.start_date }}</div>
            </v-col>
            <v-col cols="6">
              <div class="text-grey">End Date</div>
              <div class="font-weight-bold">{{ trip.end_date }}</div>
            </v-col>
          </v-row>
          <v-card-actions class="pa-0 mt-4">
            <v-spacer></v-spacer>
            <v-btn
              color="orange text-white"
              variant="flat"
              large
              tile
              elevation="2"
              rounded="3"
              @click="$emit('view')"
            >
              view Trip
            </v-btn>
          </v-card-actions>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  trip: {
    type: Object,
    required: true
  }
})
defineEmits(['view'])

const chipText = computed(() => {
  if (!props.trip.end_date) return 'Active'
  const endDate = new Date(props.trip.end_date)
  const now = new Date()
  now.setHours(0,0,0,0)
  return endDate < now ? 'Done' : 'Active'
})
const chipColor = computed(() => {
  if (!props.trip.end_date) return 'green'
  const endDate = new Date(props.trip.end_date)
  const now = new Date()
  now.setHours(0,0,0,0)
  return endDate < now ? 'grey' : 'green'
})
</script>

<style scoped>
.rounded-s-lg {
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
</style>

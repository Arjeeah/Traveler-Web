<template>
  <v-container>
    <PageHeader title="Your Trips" />
    <TripCard v-for="(trip, index) in trips" :key="index" :trip="trip" />
  </v-container>
</template>

<script setup>
import PageHeader from '../../components/PageHeader.vue'
import TripCard from './components/TripCard.vue'
import heropic from '@/assets/heropic.png'

const trips = [
  {
    image: heropic,
    title: 'The journey to al baida',
    description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    budget: '3000 LYD',
    attendance: 6,
    startDate: '20 / 12 / 2026',
    endDate: '27 / 12 / 2026'
  },
  {
    image: heropic,
    title: 'The journey to al baida',
    description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    budget: '3000 LYD',
    attendance: 6,
    startDate: '20 / 12 / 2026',
    endDate: '27 / 12 / 2026'
  }
]
</script>





<template>
  <v-row align="center" class="mb-5">
    <v-col cols="auto">
      <v-btn icon variant="text" @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-col>
    <v-col>
      <h1 class="text-h4 font-weight-bold">{{ title }}</h1>
    </v-col>
  </v-row>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

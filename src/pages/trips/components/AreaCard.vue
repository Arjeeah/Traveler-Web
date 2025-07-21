<template>
  <v-card class="mb-3 area-card" outlined>
    <v-card-text>
      <v-row no-gutters align="center">
        <v-col cols="auto">
          <v-img :src="getRandomImage()" width="60" height="60" class="rounded-lg mr-4"></v-img>
        </v-col>
        <v-col>
          <div class="font-weight-bold">{{ area.name }}</div>
          <div class="text-caption text-grey">{{ area.location }}</div>
        </v-col>
        <v-col cols="auto">
          <v-btn icon small variant="text" class="drag-handle">
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
          <v-btn icon small variant="text" @click="$emit('add', area)">
            <v-icon color="orange">mdi-plus-circle</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import kornishImg from '@/assets/kornish.jpg'
import tebistiImg from '@/assets/tebisti.jpg'
import venesiaImg from '@/assets/venesia.jpg'

const images = [kornishImg, tebistiImg, venesiaImg]

function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)]
}

defineProps({
  area: {
    type: Object,
    required: true
  }
})
defineEmits(['add'])
</script>

<style scoped>
.area-card {
  border-color: #E0E0E0;
  cursor: grab;
}
.drag-handle {
  cursor: grab;
}
</style>

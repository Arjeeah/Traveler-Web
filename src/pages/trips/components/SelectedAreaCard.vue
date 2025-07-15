<template>
  <v-card class="mb-3 selected-area-card" outlined>
    <v-card-text>
      <v-row no-gutters align="center">
        <v-col cols="auto">
          <v-img :src="area.image" width="60" height="60" class="rounded-lg mr-4"></v-img>
        </v-col>
        <v-col>
          <div class="font-weight-bold">{{ area.name }}</div>
          <div class="text-caption text-grey">{{ area.location }}</div>
        </v-col>
        <v-col cols="auto" class="d-flex align-items-center">
          <v-chip small class="mr-2" outlined>{{ area.order }}</v-chip>
          <v-btn icon small variant="text" @click="$emit('remove', area)">
            <v-icon color="orange">mdi-minus-circle</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  area: {
    type: Object,
    required: true
  }
})
defineEmits(['remove'])
</script>

<style scoped>
.selected-area-card {
  border-color: orange;
  border-width: 1px;
  border-style: solid;
}
</style>

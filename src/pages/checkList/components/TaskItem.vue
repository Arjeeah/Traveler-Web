<template>
  <div>
    <v-row align="center" class="py-2">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="task.text"
          placeholder="Add Task"
          variant="solo"
          flat
          dense
          hide-details
          class="dashed-input"
        >
          <template v-slot:prepend-inner>
            <v-icon color="orange">mdi-plus-circle-outline</v-icon>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <!-- Status placeholder -->
      </v-col>
      <v-col cols="12" md="2">
        <!-- Priority placeholder -->
      </v-col>
      <v-col cols="12" md="2">
        <!-- Edit placeholder -->
      </v-col>
    </v-row>
    <v-divider class="dashed-divider"></v-divider>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const task = ref({ text: '' })
</script>

<style scoped>
.dashed-input .v-input__control {
  border: 1px dashed #ccc;
  border-radius: 8px;
}
.dashed-divider {
  border-style: dashed;
  border-color: #ccc;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>

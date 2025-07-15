<template>
  <div>
    <v-row align="center" class="py-2" v-for="(task, index) in tasks" :key="index">
      <v-col cols="6">
        <span>{{ task.text }}</span>
      </v-col>
      <v-col cols="2">
        <v-chip :color="getStatusColor(task.status)" dark>{{ task.status }}</v-chip>
      </v-col>
      <v-col cols="2">
        <span :class="getPriorityClass(task.priority)">{{ task.priority }}</span>
      </v-col>
      <v-col cols="2">
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$emit('edit', task)">
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$emit('delete', task)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>
    <v-row align="center" class="py-2">
      <v-col cols="12">
        <v-btn
          block
          variant="text"
          class="add-task-btn"
          @click="$emit('add')"
          height="56"
        >
          <v-icon color="orange">mdi-plus-circle-outline</v-icon>
          <span class="ml-2 text-grey">Add Task</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
defineProps({
  tasks: Array
})
defineEmits(['add', 'edit', 'delete'])

const getStatusColor = (status) => {
  if (status === 'To do') return 'orange'
  return 'grey'
}

const getPriorityClass = (priority) => {
  if (priority === 'Urgent') return 'text-red'
  if (priority === 'Medium') return 'text-orange'
  return ''
}
</script>

<style scoped>
.add-task-btn {
  border: 1px dashed orange;
  border-radius: 8px;
  justify-content: start;
  text-transform: none;
}
.text-red {
  color: red;
}
.text-orange {
  color: orange;
}
</style>

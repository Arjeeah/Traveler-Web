<template>
    <v-container class="py-6 px-6" >
        <!-- Header -->
        <header class="d-flex align-center mb-8">
            <v-btn icon variant="text" @click="goBack" class="mr-4">
            <v-icon size="x-large">mdi-arrow-left</v-icon>
            </v-btn>
            <h1 class="text-h3 font-weight-bold">Check List</h1>
        </header>

        <!-- Sub-header -->
        <v-row align="center" class="mb-8">
            <v-icon color="orange" class="mr-2">mdi-alert-circle-outline</v-icon>
            <span class="font-weight-medium">Add To Do Tasks</span>
        </v-row>

        <!-- Task Table -->
        <v-card variant="flat">
            <!-- Table Header -->
            <v-row class="text-grey-darken-1 mb-2 px-3">
                <v-col cols="6">
                    <span class="text-subtitle-2">Task</span>
                </v-col>
                <v-col cols="2">
                    <span class="text-subtitle-2">Status</span>
                </v-col>
                <v-col cols="2">
                    <span class="text-subtitle-2">Priority</span>
                </v-col>
                <v-col cols="2">
                    <span class="text-subtitle-2">Edit</span>
                </v-col>
            </v-row>

            <!-- Task List Area -->
            <div class="dashed-border pa-4">
                <v-row align="center">
                    <v-col cols="12">
                        <v-btn variant="text" @click="addTask" class="px-0">
                            <v-icon color="orange" class="mr-2">mdi-plus-circle</v-icon>
                            Add Task
                        </v-btn>
                    </v-col>
                    <!-- Added tasks would be listed here -->
                </v-row>
            </div>
        </v-card>

        <!-- Action Buttons -->
        <v-row justify="end" class="mt-4">
            <v-btn variant="outlined" class="mr-4 text-capitalize" color="orange">Skip</v-btn>
            <v-btn variant="outlined" class="mr-4 text-capitalize" color="orange">Back</v-btn>
            <v-btn color="orange" class="text-capitalize text-white" flat>next</v-btn>
        </v-row>
    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};

const addTask = () => {
    // Logic to add a new task
    console.log('Add Task clicked');
};
</script>

<style scoped>
.dashed-border {
    border: 2px dashed #FFA726; /* Using a shade of orange */
    border-radius: 8px;
    min-height: 50px;
}

.text-h4 {
        font-size: 2.125rem !important;
}

.v-btn {
        letter-spacing: normal;
}
</style>
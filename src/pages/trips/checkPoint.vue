<template>
    <v-container fluid class="checkpoint-container fill-height">
        <v-row align="center" justify="center">
            <v-col cols="12" md="8" lg="6" class="text-center">
                <v-img src="@/assets/doneicon.png" alt="Icon" max-height="60" max-width="60" class="mx-auto mb-6"></v-img>

                <h1 class="text-h3 text-sm-h2 font-weight-bold mb-6">
                    Let's Start To <span class="text-orange-darken-1">Priorities</span><br />Your Trip
                </h1>

                <p class="text-body-1 text-grey-darken-1 mx-auto mb-8" style="max-width: 450px;">
                    is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever since the 1500s.
                </p>

                <div class="d-flex justify-center ga-4">
                    <v-btn variant="outlined" color="orange-darken-1" to="" size="large">Skip</v-btn>
                    <v-btn variant="outlined" color="orange-darken-1" size="large">Back</v-btn>
                    <v-btn color="orange-darken-1" to="/trips/addBlocks" size="large">Next</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
// No script logic needed for this static component
</script>

<style scoped>
.checkpoint-container {
    background-color: #ffffff;
    background-image: url('@/assets/pattern.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    min-height: 100vh;
}
</style>

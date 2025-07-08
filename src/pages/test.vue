<template>
    <v-container class="text-center" fluid>
        <v-row justify="center" align="center" class="mt-10">
            <v-col cols="12">
                <h1 class="font-weight-bold">
                    Let’s Start To draw <br />
                    Your Trip <span class="text-warning">diagram</span>
                </h1>
                <p class="mt-4">
                    is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever since the 1500s,
                </p>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-6">
            <v-btn outlined color="warning" class="mx-2">Skip</v-btn>
            <v-btn outlined color="warning" class="mx-2">Back</v-btn>
            <v-btn color="warning" class="mx-2">Next</v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "TestPage",
};
</script>

<style scoped>
.text-warning {
    color: #f9a825;
}
</style>


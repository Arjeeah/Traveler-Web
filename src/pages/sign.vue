<template>
    <v-container fluid class="login-page fill-height pa-5">
        <v-row align="center" justify="center" class="fill-height pl-5 pr-5">
            <v-col cols="12" md="10" lg="8">
                <v-card class="elevation-12">
                    <v-row no-gutters>
                        <v-col cols="12" md="5" class="d-none d-md-flex align-center justify-center mr-10">
                            <v-img
                                src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fHww&w=1000&q=80"
                                alt="Travel background"
                                height="100%"
                                cover
                            ></v-img>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-card-text class="pa-8 pa-md-12">
                                <div class="d-flex align-center mb-8">
                                    <v-img src="@/assets/blacklogo.png" alt="Traveler Logo" max-height="120" max-width="120" contain class="mx-auto pb-10"></v-img>
                                </div>

                                <div class="d-flex flex-column justify-center" style="padding-top: 50px; padding-bottom: 50px;">
                                    <h1 class="text-h5 font-weight-bold mb-4">
                                        Welcome Dear <span class="text-orange">Traveler</span><br />
                                        -Few Steps And You're<br />
                                        All Set
                                    </h1>
                                    <p class="text-body-1 text-grey-darken-1 mb-10">
                                        If this is your first time in the app please sign up, and enjoy your well organized trip.
                                    </p>
                                    <v-row>
                                        <v-col cols="12" sm="6">
                                            <v-btn block color="orange" dark large class="mb-3 mb-sm-0" style="color: white !important;">Sign In</v-btn>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-btn block color="black" dark large>Sign Up</v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'LoginPage',
    show2: false, // State for toggling password visibility
    data() {
        return {
            show2: false, // Initialize the show2 state
        };
    },
};
</script>

<style scoped>
.login-page {
    background-color: #f0f2f5; /* A light background for the page */
}

/* You can add more specific styles here if Vuetify's utility classes aren't enough */
.text-orange {
    color: #f39c12 !important; /* Vuetify orange or your custom orange */
}
</style>


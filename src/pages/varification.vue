<template>
    <v-container fluid class="login-page fill-height pa-5">
        <v-row align="center" justify="center" class="fill-height pl-5 pr-5">
            <v-col cols="12" md="10" >
                <v-card class="elevation-12">
                    <v-row no-gutters>
                        <v-col cols="12" md="4" class="d-none d-md-flex align-center justify-center mr-10">
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

                                <div class="d-flex flex-column justify-center text-center" style="padding-top: 50px; padding-bottom: 50px;">
                                    <h1 class="text-h5 font-weight-bold mb-4">
                                        Verify Your Email
                                    </h1>
                                    <p class="text-body-1 mb-4">
                                        We have sent email to <span class="text-orange">Myemail@gmail.com</span> to confirm the validity of our email address
                                    </p>
                                    <v-btn text color="orange" class="text-white font-weight-bold">
                                        Send Again
                                    </v-btn>
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

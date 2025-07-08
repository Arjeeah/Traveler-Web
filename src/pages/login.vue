<template>
    <v-container fluid class="login-page fill-height pa-5">
        <v-row align="center" justify="center" class="fill-height pl-5 pr-5">
            <v-col cols="12" md="10">
                <v-card class="elevation-12">
                    <v-row no-gutters>
                        <v-col cols="12" md="4" class="d-none d-md-flex align-center justify-center mr-10">
                            <v-img
                                src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fHww&w=1000&q=80"
                                alt="Travel background" height="100%" cover></v-img>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-card-text class="pa-8 pa-md-12">
                                <div class="d-flex align-center mb-8">
                                    <v-img src="@/assets/blacklogo.png" alt="Traveler Logo" max-height="120"
                                        max-width="120" contain class="mx-auto pb-10"></v-img>
                                </div>

                                <div class="d-flex flex-column justify-center"
                                    style="padding-top: 50px; padding-bottom: 50px;">
                                    <h1 class="text-h5 font-weight-bold mb-4">
                                        Welcome Back!
                                    </h1>
                                    <v-alert v-if="error" type="error" dense text class="mb-4">{{ error }}</v-alert>
                                    <v-text-field v-model="email" label="Email Address" outlined dense clearable></v-text-field>
                              
                                    <v-text-field v-model="password" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'"
                                        class="input-group--focused" hint="At least 8 characters" label="Password"
                                        name="input-10-2" @click:append="show2 = !show2" @keyup.enter="handleLogin"></v-text-field>
                                    <div class="text-right mb-4">
                                        <router-link to="/forgotPassword" class="text-orange">Forgot
                                            Password?</router-link>
                                    </div>
                                    <v-btn :loading="userStore.isLoading" :disabled="userStore.isLoading" block color="orange" dark large class="mb-3"
                                        style="color: white !important;" @click="handleLogin">Login</v-btn>
                                    <div class="text-center">
                                        New Here? <router-link to="/signup" class="text-orange">Create
                                            Account</router-link>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const show2 = ref(false);
const error = ref(null);

const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
    error.value = null; // Reset error on new login attempt
    try {
        await userStore.login({
            email: email.value,
            password: password.value,
        });
        // Redirect to a protected route on success, e.g., home or dashboard
        router.push('/'); 
    } catch (err) {
        error.value = err || 'An unexpected error occurred.';
    }
};
</script>

<style scoped>
.login-page {
    background-color: #f0f2f5;
    /* A light background for the page */
}

/* You can add more specific styles here if Vuetify's utility classes aren't enough */
.text-orange {
    color: #f39c12 !important;
    /* Vuetify orange or your custom orange */
}
</style>

<template>
    <v-app-bar app class="padded-app-bar">
        <v-toolbar-title class="d-flex align-center">
            <img src="/src/assets/sitelogo.svg" alt="Logo" style="height: 40px; margin-right: 10px;" />
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <template v-if="isLoggedIn">
            <v-btn variant="text" to="/trips">Trips</v-btn>
            <v-btn variant="text" to="/">Home</v-btn>
            <v-avatar class="user-avatar mr-6" color="#F5A623" style="border: 2px solid #F5A623; background-color: white;" @click="goToProfile">
                <span class="user-initial" style="color: black;">{{ userInitial }}</span>
            </v-avatar>
        </template>
        <template v-else>
            <v-btn variant="text" href="#join-us">Join Us</v-btn>
            <v-btn variant="text" href="#benefits">Benefits</v-btn>
            <v-btn variant="text" href="#who-are-we">Who Are We</v-btn>
            <v-btn class="custom-login-btn mr-8 pr-10 pl-10" rounded="squire" href="/login">Log In</v-btn>
        </template>
    </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

export default {
    name: "NavBar",
    computed: {
        ...mapState(useUserStore, ['isLoggedIn', 'userInitial']),
    },
    methods: {
        ...mapActions(useUserStore, ['fetchCurrentUser', 'logout']),
        goToProfile() {
            this.$router.push('/profile');
        },
    },
    created() {
        this.fetchCurrentUser();
    },
};
</script>

<style scoped>
.traveler-text {
    font-weight: bold;
    font-size: 24px;
}

.v-btn--variant-text {
    color: black;
}

.custom-login-btn {
    background-color: #F5A623 !important;
    color: white !important;
}

.padded-app-bar {
    padding-left: 16px;
    padding-right: 16px;
}

.user-avatar {
    margin: 0 8px;
    cursor: pointer;
}

.user-initial {
    font-weight: bold;
}
</style>

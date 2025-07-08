<template>
    <v-container class="hero-section" fluid>
        <v-row align="center" justify="space-between">
            <v-col cols="12" md="6">
            <div class="hero-content">
                <h1 class="hero-title">Welcome, Dear Traveler</h1>
                <p class="hero-description">
                Embark on a journey of discovery and adventure. Let us guide you to the most breathtaking destinations around the world.
                </p>
                <v-btn color="orange" class="cta-button" large>
                Start Your Journey
                </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "LandingPage",
};
</script>

<style scoped>
.hero-section {
    background-image: url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: white;
    direction: ltr; /* Changed to LTR layout */
}

.hero-content {
    max-width: 400px;
    text-align: left; /* Adjusted for LTR */
    padding: 20px;
    margin: 40px; /* Added padding */
}

.hero-title {
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.hero-description {
    font-size: 1.2rem;
    margin-bottom: 30px;
}

.cta-button {
    font-weight: bold;
    color: white;
    padding: 10px 20px; /* Added padding */
}
</style>

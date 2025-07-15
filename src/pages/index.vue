<template>
    <v-container fluid class="hero-section pa-0 mt-4">
        <v-row align="center" justify="center" class="fill-height text-center">
            <v-col cols="12">
                <h1 class="text-h2 font-weight-bold mb-4" style="color: #2c3e50;">
                    The Way to Make <br /> Your Trip Much <span style="color: #f39c12;">Easier</span>
                </h1>
                <v-img
                    src="../assets/heropic.png"
                    alt="Traveler looking at a map"
                    max-height="400"
                    contain
                    class="my-8 rounded-xl"
                >
                    <template v.slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="grey-lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
                <p class="text-subtitle-1 mb-8" style="color: #7f8c8d;">
                    Map your trip, set your budget and share it with your travel <br /> friends for more organised and fun trip
                </p>
                <v-btn
                    color="#f39c12"
                    class="white--text pl-10 pr-10 "
                    x-large
                    suire
                    elevation="2"
                    @click="goToCreateTrip"
                >
                    Create A Trip
                </v-btn>
            </v-col>
        </v-row>
    </v-container>

    <!-- New parent container for grouping sections -->
    <v-container class="grouped-sections-wrapper ">
      <!-- First section -->
      <v-container class="pt-0 pb-8">
        <v-row align="center">
          <v-col cols="12" md="6">
            <v-img
              src="../assets/ss.png"
              alt="Description of your image"
              max-height="400"
              contain
              class="rounded-lg"
            >
              <template v.slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey-lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>

          <v-col cols="12" md="6">
            <h2 class="text-h4 font-weight-bold mb-4 ml-10" style="color: #2c3e50;">
              Discover Effortless Trip Planning
            </h2>
            <p class="text-body-1 ml-10"  style="color: #7f8c8d;">
              Our platform provides intuitive tools to map your journey, manage expenses, and collaborate with fellow travelers, all in one place. Simplify your adventures from start to finish.
            </p>
          </v-col>
        </v-row>
      </v-container>

      <!-- Second section with tabs -->
      <v-container class="text-center pt-8 pb-0">
        <v-row justify="center">
            <v-col cols="12">
                <h2 class="text-h4 font-weight-bold mb-8" style="color: #2c3e50;">
                    Traveler's benefits
                </h2>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-tabs v-model="activeTab" centered background-color="transparent" grow>
                    <v-tab
                        v-for="tab in tabs"
                        :key="tab.name"
                        :value="tab.name"
                        @click="activeTab = tab.name"
                        :class="{ 'active-tab': activeTab === tab.name, 'inactive-tab': activeTab !== tab.name }"
                        class="rounded-lg mx-1"
                    >
                        {{ tab.name }}
                    </v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        <v-window v-model="activeTab">
            <v-window-item value="Budget">
                <!-- Content for Budget tab -->
                <v-card flat class="pa-4 mt-4">
                    <v-row class="pa-4 mt-4 align-left">
                        <v-col cols="12" md="6" class="align-left" align="left">
                            <h3 class="text-h5 font-weight-bold mb-3" style="color: #2c3e50;">Manage Your Travel Budget</h3>
                            <p class="text-body-1 mb-6" style="color: #7f8c8d;">
                                Keep track of your expenses and stay within your budget for a stress-free vacation.
                            </p>
                            <v-list dense class="transparent-list">
                                <v-list-item class="mb-2">
                                    <template v-slot:prepend>
                                        <v-icon color="#f39c12">mdi-circle-medium</v-icon>
                                    </template>
                                    <v-list-item-title class="text-body-1" style="color: #2c3e50;">Set overall trip budget</v-list-item-title>
                                </v-list-item>
                                <v-list-item class="mb-2">
                                    <template v-slot:prepend>
                                        <v-icon color="#f39c12">mdi-circle-medium</v-icon>
                                    </template>
                                    <v-list-item-title class="text-body-1" style="color: #2c3e50;">Track expenses by category</v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <template v-slot:prepend>
                                        <v-icon color="#f39c12">mdi-circle-medium</v-icon>
                                    </template>
                                    <v-list-item-title class="text-body-1" style="color: #2c3e50;">View spending summaries</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-img
                                src="../assets/budget-planning.png"
                                alt="Budget planning"
                                max-height="350"
                                contain
                                class="rounded-lg"
                            >
                                <template v.slot:placeholder>
                                    <v-row
                                        class="fill-height ma-0"
                                        align="center"
                                        justify="center"
                                    >
                                        <v-progress-circular
                                            indeterminate
                                            color="grey-lighten-5"
                                        ></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row>
                </v-card>
            </v-window-item>
            <v-window-item value="Trips">
                <!-- Content for Trips tab -->
                <v-card flat class="pa-4 mt-4">
                    <v-row class="pa-4 mt-4 align-left">
                        <v-col cols="12" md="6" class="align-left" align="left">
                            <h3 class="text-h5 font-weight-bold mb-3" style="color: #2c3e50;">Plan Your Perfect Trips</h3>
                            <p class="text-body-1 mb-6" style="color: #7f8c8d;">
                                Organize your itineraries, save points of interest, and collaborate with travel companions.
                            </p>
                            <v-list dense class="transparent-list">
                                <v-list-item class="mb-2">
                                    <template v-slot:prepend>
                                        <v-icon color="#f39c12">mdi-circle-medium</v-icon>
                                    </template>
                                    <v-list-item-title class="text-body-1" style="color: #2c3e50;">Create detailed daily itineraries</v-list-item-title>
                                </v-list-item>
                                <v-list-item class="mb-2">
                                    <template v-slot:prepend>
                                        <v-icon color="#f39c12">mdi-circle-medium</v-icon>
                                    </template>
                                    <v-list-item-title class="text-body-1" style="color: #2c3e50;">Save and map locations</v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <template v-slot:prepend>
                                        <v-icon color="#f39c12">mdi-circle-medium</v-icon>
                                    </template>
                                    <v-list-item-title class="text-body-1" style="color: #2c3e50;">Share plans with friends</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-img
                                src="../assets/trip-planning.png"
                                alt="Trip planning"
                                max-height="350"
                                contain
                                class="rounded-lg"
                            >
                                <template v.slot:placeholder>
                                    <v-row
                                        class="fill-height ma-0"
                                        align="center"
                                        justify="center"
                                    >
                                        <v-progress-circular
                                            indeterminate
                                            color="grey-lighten-5"
                                        ></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row>
                </v-card>
            </v-window-item>
            <v-window-item value="To do list">
                <!-- Content for To do list tab -->
                <v-card flat class="pa-4 mt-4">
                    <v-row  class="pa-4 mt-4 align-left">
                        <v-col cols="12" md="6" class="align-left" align="left">
                            <h3 class="text-h5 font-weight-bold mb-3" style="color: #2c3e50;">Stay Organized with To-Do Lists</h3>
                            <p class="text-body-1 mb-6" style="color: #7f8c8d;">
                                Never forget an important task. Create and manage to-do lists for packing, bookings, and pre-travel preparations.
                            </p>
                            <v-list dense class="transparent-list">
                                <v-list-item class="mb-2">
                                    <template v-slot:prepend>
                                        <v-icon color="#f39c12">mdi-circle-medium</v-icon>
                                    </template>
                                    <v-list-item-title class="text-body-1" style="color: #2c3e50;">Create multiple to-do lists</v-list-item-title>
                                </v-list-item>
                                <v-list-item class="mb-2">
                                    <template v-slot:prepend>
                                        <v-icon color="#f39c12">mdi-circle-medium</v-icon>
                                    </template>
                                    <v-list-item-title class="text-body-1" style="color: #2c3e50;">Set due dates and reminders</v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <template v-slot:prepend>
                                        <v-icon color="#f39c12" >mdi-circle-medium</v-icon>
                                    </template>
                                    <v-list-item-title class="text-body-1" style="color: #2c3e50;">Mark tasks as complete</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-img
                                src="../assets/to_do_list.png"
                                alt="To-do list illustration"
                                max-height="350"
                                contain
                                class="rounded-lg"
                            >
                                <template v.slot:placeholder>
                                    <v-row
                                        class="fill-height ma-0"
                                        align="center"
                                        justify="center"
                                    >
                                        <v-progress-circular
                                            indeterminate
                                            color="grey-lighten-5"
                                        ></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row>
                </v-card>
            </v-window-item>
        </v-window>
      </v-container>
    </v-container> <!-- End of new parent container -->

    <!-- Try It Now Section -->
    <v-container  class="try-it-now-section my-8" >
        <v-row align="center" class="fill-height">
            <!-- Left Column for Image -->
            <v-col cols="12" md="6">
                <v-img
                    src="../assets/person.png"
                    alt="Person using the app"
                    max-height="400"
                    contain
                    class="rounded-lg"
                >
                    <template v.slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="grey-lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-col>

            <!-- Right Column for Text and Button -->
            <v-col cols="12" md="6" class="text-md-left text-center pa-md-10">
                <h2 class="text-h3 font-weight-bold mb-4 white--text">
                    Try It Now...
                </h2>
                <p class="text-h6 mb-8 white--text font-weight-regular">
                    Map your trip, set your budget and share it with your travel friends for more organised and fun trip.
                </p>
                <v-btn
                    color="white"
                    class="black--text mb-4 pl-10 pr-10"
                    large
                    tile
                    elevation="2"
                    rounded="3"
                    @click="goToCreateTrip"
                >
                    Create A Trip
                </v-btn>
            </v-col>
        </v-row>
    </v-container>

    <!-- Popular Places Section -->
    <v-container class="popular-places-section text-center pt-12 pb-8">
        <v-row justify="center">
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold mb-2" style="color: #2c3e50;">
              <span style="color: #f39c12;">Popular</span> Places
            </h2>
            <h2 class="text-h4 font-weight-bold mb-8" style="color: #2c3e50;">
              To Keep In Mind
            </h2>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <v-carousel
              cycle
              height="300"
              hide-delimiter-background
              show-arrows="hover"
              class="rounded-lg"
            >
              <v-carousel-item
                v-for="(place, i) in popularPlaces"
                :key="i"
              >
                <v-img :src="place.src" aspect-ratio="16/9" cover class="rounded-lg">
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey-lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-8">
          <v-col cols="12" md="8">
            <p class="text-subtitle-1" style="color: #7f8c8d;">
              Map your trip, set your budget and share it with your travel friends for more organised and fun trip
            </p>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-6">
          <v-col cols="auto">
            <v-btn
              color="#f39c12"
              class="white--text pl-10 pr-10"
              large
              elevation="2"
              rounded="3"
              tile
            >
              Discover more
            </v-btn>
          </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToCreateTrip = () => {
  router.push('/trips/create');
};

const activeTab = ref('Trips'); // Set 'Trips' as the default active tab
const tabs = ref([
    { name: 'Budget' },
    { name: 'Trips' },
    { name: 'To do list' },
]);

const popularPlaces = ref([
  { src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg' }, // Placeholder image
  { src: 'https://cdn.vuetifyjs.com/images/cards/hotel.jpg' },   // Placeholder image
  { src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' }, // Placeholder image
  { src: 'https://picsum.photos/seed/picsum1/800/450' }, // Placeholder image
  { src: 'https://picsum.photos/seed/picsum2/800/450' }, // Placeholder image
]);
</script>

<style scoped>
.hero-section {
    min-height: 100vh; /* Or a fixed height like 800px */
    background-color: #FFFFFFFF; /* Light background color similar to the image */
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 60px; /* Adjust as needed if you have a navbar */
    padding-bottom: 60px;
}

/* Ensure text color contrasts with the button color if needed */
.white--text {
    color: white !important;
}

.active-tab {
    background-color: #f39c12 !important; /* Orange background for active tab */
    color: white !important; /* White text for active tab */
    border-radius: 8px;
}

.inactive-tab {
    background-color: #f5f5f5 !important; /* Light grey background for inactive tabs */
    color: #757575 !important; /* Darker grey text for inactive tabs */
    border-radius: 8px;
}

/* Remove the default Vuetify tab slider */
.v-tabs-slider {
    display: none !important;
}

/* Style for the v-tab to ensure background color covers the whole tab */
.v-tab {
    text-transform: none; /* Keep tab text case as is */
    font-weight: 500;
}

/* New style for the wrapper container */
.grouped-sections-wrapper {
  border: 1px solid #e0e0e0; /* Light grey border */
  border-radius: 16px;       /* Rounded corners */
  padding: 20px 100px 60px;  /* Adjusted padding: top/bottom, left/right */
  margin-top: 32px;          /* Margin above the wrapper */
  margin-bottom: 32px;       /* Margin below the wrapper */
  background-color: #FFFFFF; /* White background for the content area */
}

.popular-places-section .v-carousel .v-img {
  border-radius: 12px; /* Ensure images inside carousel also have rounded corners */
}

.try-it-now-section {
    background-color: #f39c12; /* Orange background */
    border-radius: 18px; /* Rounded corners */
    padding: 10px; /* Updated: 100px top/bottom, 100px left/right. Explicitly sets horizontal padding. */
    color: white; /* Default text color for this section */
    margin-right:120px;
    margin-left: 120px;

}

/* Ensure button text color is black if not inheriting correctly */
.black--text {
    color: #2c3e50 !important; /* Dark text for the button */
}
</style>

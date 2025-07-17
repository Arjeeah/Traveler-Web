<template>
    <v-container fluid class="pa-md-10">
        <header class="d-flex align-center mb-8">
            <v-btn icon variant="text" @click="goBack" class="mr-4">
                <v-icon size="x-large">mdi-arrow-left</v-icon>
            </v-btn>
            <h1 class="text-h3 font-weight-bold">Trips</h1>
        </header>
        <v-row>
            <v-col cols="12" md="6">
            <div class="d-flex align-center mb-6">
                <v-icon color="orange-darken-2" class="mr-2">mdi-information-outline</v-icon>
                <h2 class="text-h6 font-weight-medium text-grey-darken-1">Fill Your Trip Informations</h2>
            </div>

            <v-form @submit.prevent="submitTrip">
                <v-text-field
                v-model="trip.name"
                label="Name of the Trip"
                variant="outlined"
                rounded="lg"
                bg-color="grey-lighten-4"
                color="orange-darken-2"
                ></v-text-field>

                <v-textarea
                v-model="trip.description"
                label="Description"
                variant="outlined"
                rounded="lg"
                bg-color="grey-lighten-4"
                rows="3"
                color="orange-darken-2"
                ></v-textarea>

                <v-text-field
                v-model.number="trip.budget"
                label="Budget"
                type="number"
                prefix="$"
                variant="outlined"
                rounded="lg"
                bg-color="grey-lighten-4"
                color="orange-darken-2"
                ></v-text-field>

                <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="trip.country"
                    :items="countries"
                    item-title="label"
                    item-value="value"
                    label="Country"
                    variant="outlined"
                    rounded="lg"
                    bg-color="grey-lighten-4"
                    color="orange-darken-2"
                    :loading="countriesStore.getLoading"
                    :disabled="countriesStore.getLoading"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="trip.city"
                    :items="cities"
                    item-title="label"
                    item-value="value"
                    label="City"
                    variant="outlined"
                    rounded="lg"
                    bg-color="grey-lighten-4"
                    color="orange-darken-2"
                    :disabled="!trip.country || cities.length === 0"
                  ></v-select>
                </v-col>
                </v-row>

                <v-row>
                <v-col cols="12" sm="4">
                    <v-text-field
                    v-model="trip.startDate"
                    label="Starting Date"
                    type="date"
                    variant="outlined"
                    rounded="lg"
                    bg-color="grey-lighten-4"
                    color="orange-darken-2"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                    v-model="trip.endDate"
                    label="End Date"
                    type="date"
                    variant="outlined"
                    rounded="lg"
                    bg-color="grey-lighten-4"
                    color="orange-darken-2"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                    v-model.number="trip.attendance"
                    label="Attendance"
                    type="number"
                    variant="outlined"
                    rounded="lg"
                    bg-color="grey-lighten-4"
                    color="orange-darken-2"
                    ></v-text-field>
                </v-col>
                </v-row>

                <div class="d-flex ga-4 mt-4">
                <v-btn size="large" variant="outlined" color="orange-darken-2" class="flex-grow-1">Back</v-btn>
                <v-btn size="large" type="submit" color="orange-darken-2" class="flex-grow-1">Next</v-btn>
                </div>
            </v-form>
            </v-col>

            <v-col cols="12" md="6">
                <v-card
                    class="d-flex align-center justify-center fill-height"
                    variant="outlined"
                    color="orange-lighten-4"
                    style="border-style: none; border-width: 2px;"
                    rounded="xl"
                >
                    <v-img
                        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"
                        cover
                        class="fill-height"
                        style="border-radius: inherit;"
                    >

                    </v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCountriesStore } from '@/stores/countriesStore';
import { useTripStore } from '@/stores/tripStore';

const router = useRouter();
const countriesStore = useCountriesStore();
const tripStore = useTripStore();

const trip = ref({
  name: '',
  description: '',
  budget: null,
  country: '', // country id
  city: '',    // city id
  startDate: '',
  endDate: '',
  attendance: null,
});

const countries = computed(() => countriesStore.getCountries.map(c => ({ label: c.name, value: c.id })));
const cities = computed(() => {
  if (!trip.value.country) return [];
  const country = countriesStore.getCountries.find(c => c.id === trip.value.country);
  return country ? country.cities.map(city => ({ label: city.name, value: city.id })) : [];
});

onMounted(() => {
  countriesStore.fetchCountries();
});

watch(() => trip.value.country, (newCountryId) => {
  trip.value.city = '';
});

const goBack = () => {
  router.back();
};

const submitTrip = async () => {
  // Prepare payload for API
  const payload = {
    city_id: trip.value.city,
    title: trip.value.name,
    description: trip.value.description,
    budget: trip.value.budget,
    start_date: trip.value.startDate,
    end_date: trip.value.endDate,
    number_of_people: trip.value.attendance,
  };
  try {
    const createdTrip = await tripStore.createTrip(payload);
    // Pass trip id to tasks route
    router.push({
      path: '/tasks',
      query: { trip_id: createdTrip.id }
    });
  } catch (error) {
    // Handle error (show message, etc.)
    console.error('Failed to create trip:', error);
  }
};
</script>

<style scoped>
/* Custom styles can be added here if needed, but Vuetify handles most of it. */
.v-text-field, .v-textarea, .v-select {
    margin-bottom: 0.5rem;
}
.v-btn {
    text-transform: none;
    font-weight: 600;
    letter-spacing: normal;
}
</style>

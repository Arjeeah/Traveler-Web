<template>
  <v-container fluid class="login-page fill-height pa-5">
    <v-row align="center" justify="center" class="fill-height pl-5 pr-5">
      <v-col cols="12" md="10">
        <v-card class="elevation-12">
          <v-row no-gutters>
            <v-col
              cols="12"
              md="6"
              class="d-none d-md-flex align-center justify-center"
            >
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
                  <v-img
                    src="@/assets/blacklogo.png"
                    alt="Traveler Logo"
                    max-height="120"
                    max-width="120"
                    contain
                    class="mx-auto pb-10"
                  ></v-img>
                </div>

                <div
                  class="d-flex flex-column justify-center"
                  style="padding-top: 50px; padding-bottom: 50px"
                >
                  <h1 class="text-h5 font-weight-bold mb-4">
                    Let’s get to know you
                  </h1>
                  <p class="mb-4">
                    Welcome! Begin by telling us a bit about yourself. This
                    basic information helps us set up your initial profile.
                  </p>
                  <v-text-field
                    v-model="form.name"
                    label="Name"
                    outlined
                    dense
                    clearable
                    :rules="[(v) => !!v || 'Name is required']"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    outlined
                    dense
                    clearable
                    :rules="[(v) => !!v || 'Email is required']"
                  ></v-text-field>
                  <v-date-input
                    v-model="form.birth_date"
                    clearable
                    label="Date input"
                  ></v-date-input>
                  <v-select
                    v-model="form.sex"
                    label="Sex"
                    outlined
                    dense
                    clearable
                    :items="['male', 'female']"
                    :rules="[(v) => !!v || 'Sex is required']"
                  ></v-select>
                  <v-text-field
                    v-model="form.password"
                    :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    class="input-group--focused"
                    hint="At least 8 characters"
                    label="Password"
                    name="input-10-2"
                    @click:append-inner="show2 = !show2"
                    :rules="[(v) => !!v || 'Password is required']"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.password_confirmation"
                    :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    class="input-group--focused"
                    hint="At least 8 characters"
                    label="Confirm Password"
                    name="input-10-2"
                    @click:append-inner="show2 = !show2"
                    :rules="[(v) => !!v || 'Confirm password is required']"
                  ></v-text-field>
                  <v-btn
                    block
                    color="orange"
                    dark
                    large
                    class="mb-3"
                    style="color: white !important"
                    @click="registerUser"
                  >
                    Register
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
import { VDateInput } from "vuetify/labs/VDateInput";
import { useUserStore } from "@/stores/userStore";

export default {
  components: {
    VDateInput,
  },
  name: "LoginPage",
  data() {
    return {
      show2: false, // State for toggling password visibility
      form: {
        name: "",
        email: "",
        birth_date: "", // Changed from dateOfBirth to birth_date
        sex: "",
        password: "",
        password_confirmation: "", // Confirm password field
      },
    };
  },
  methods: {
    async registerUser() {
      const userStore = useUserStore();
      try {
        await userStore.addUser(this.form); // No need to rename, already using birth_date
        this.$router.push("/login"); // Navigate to login page
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Failed to register. Please try again.");
      }
    },
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

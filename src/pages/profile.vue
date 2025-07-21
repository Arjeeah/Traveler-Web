<template>
  <v-container fluid class="profile-container">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" class="d-flex justify-center">
        <div class="profile-avatar-box">
          <v-avatar size="180" class="user-avatar" color="#F5A623" style="border: 4px solid #F5A623; background-color: white;">
            <span class="profile-initial">{{ userInitial }}</span>
          </v-avatar>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="profile-form-box">
          <h2 class="font-weight-bold mb-6">Personal Data</h2>
          <v-form @submit.prevent="saveProfile">
            <v-text-field
              v-model="form.name"
              label="Your name"
              variant="outlined"
              rounded="lg"
              color="orange-darken-2"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="form.birthdate"
              label="Birthdate"
              variant="outlined"
              rounded="lg"
              color="orange-darken-2"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="form.sex"
              label="Sex"
              variant="outlined"
              rounded="lg"
              color="orange-darken-2"
              class="mb-4"
            ></v-text-field>
            <div class="d-flex justify-end align-center mt-8">
              <v-btn variant="text" color="black" class="mr-4" @click="goBack">Back</v-btn>
              <v-btn color="teal" type="submit" class="save-btn mr-4">Save</v-btn>
              <v-btn color="red" class="logout-btn" @click="logout">
                <v-icon left>mdi-logout</v-icon>
                Logout
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import auth from '@/middleware/auth'
auth({ next: () => {}, router: useRouter() })
const router = useRouter()
const userStore = useUserStore()
const userInitial = userStore.userInitial

const form = ref({
  name: '',
  birthdate: '',
  sex: '',
})

onMounted(async () => {
  await userStore.fetchCurrentUser()
  if (userStore.currentUser) {
    form.value.name = userStore.currentUser.name || ''
    form.value.birthdate = userStore.currentUser.birth_date || ''
    form.value.sex = userStore.currentUser.sex || ''
  }
})

function goBack() {
  router.back()
}

async function saveProfile() {
  if (userStore.currentUser) {
    await userStore.updateUser(userStore.currentUser.id, {
      name: form.value.name,
      birth_date: form.value.birthdate,
      sex: form.value.sex,
    })
    await userStore.fetchCurrentUser()
  }
}

function logout() {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: #fff;
  border-radius: 20px;
}
.profile-avatar-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.user-avatar {
  border-radius: 32px;
  border: 4px solid #F5A623 !important;
  width: 180px !important;
  height: 180px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-initial {
  font-size: 72px;
  font-weight: bold;
  color: #222;
  background: #fff;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-form-box {
  margin-top: 32px;
}
.save-btn {
  min-width: 140px;
  font-weight: 600;
  font-size: 18px;
  border-radius: 8px;
}
.logout-btn {
  min-width: 140px;
  font-weight: 600;
  font-size: 18px;
  border-radius: 8px;
  color: #fff;
}
</style>

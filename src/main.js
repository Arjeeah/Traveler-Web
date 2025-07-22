/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'


// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

const app = createApp(App)
app.use(Toast)

registerPlugins(app)

app.mount('#app')

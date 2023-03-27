// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { loadFonts } from '~/plugins/webfontloader'

await loadFonts()

export default createVuetify()

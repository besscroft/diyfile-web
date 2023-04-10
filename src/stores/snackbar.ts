import { acceptHMRUpdate, defineStore } from 'pinia'
import piniaPersistConfig from '~/config/piniaPersist'

export const useSnackbarStore = defineStore('snackbarStore', {
  state: (): any => ({
    // active
    active: false,
    // color
    color: 'blue',
    // text
    text: '',
  }),
  actions: {
    /** success */
    success(text: string) {
      this.color = 'light-blue'
      this.text = text
      this.active = true
    },
    /** warning */
    warning(text: string) {
      this.color = 'orange-lighten-2'
      this.text = text
      this.active = true
    },
    /** message */
    message(text: string) {
      this.color = 'grey-lighten-2'
      this.text = text
      this.active = true
    },
    /** error */
    error(text: string) {
      this.color = 'red'
      this.text = text
      this.active = true
    },
  },
  persist: piniaPersistConfig('snackbarStore'),
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot))

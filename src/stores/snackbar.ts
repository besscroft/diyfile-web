import { acceptHMRUpdate, defineStore } from 'pinia'
import piniaPersistConfig from '~/config/piniaPersist'

export const useSnackbarStore = defineStore('snackbarStore', {
  state: (): any => ({
    // active
    active: false,
    // type
    type: 'blue',
    // text
    text: '',
  }),
  actions: {
    /** active */
    setActive(active: boolean) {
      this.active = active
    },
    /** type */
    setType(type: string) {
      this.type = type
    },
    /** text */
    setText(text: string) {
      this.text = text
      this.avtive = true
    },
  },
  persist: piniaPersistConfig('snackbarStore'),
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot))

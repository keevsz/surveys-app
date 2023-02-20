import { defineStore } from 'pinia'

interface SurveyStore {
    flag: boolean,
    toggle: boolean
}

export const useSurveyStore = defineStore('survey', {
    state: () : SurveyStore => ({
        flag: false,
        toggle: false
    }),

    actions: {
        setFlag() {
            this.flag = !this.flag
        },

        falseFlag() {
            this.flag = false
        },

        setToggleInit() {
            this.toggle = false
        },
        changeToggle() {
            if (this.toggle) { /* visible */
                this.toggle = false
            } else { /* no visible */
                this.toggle = true
            }
        }
    }
})
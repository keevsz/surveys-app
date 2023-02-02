import { defineStore } from 'pinia'

interface SurveyStore {
    flag: boolean
}

export const useSurveyStore = defineStore('survey', {
    state: () : SurveyStore => ({
        flag: false
    }),

    actions: {
        setFlag() {
            this.flag = !this.flag
        },

        falseFlag() {
            this.flag = false
        }
    }
})
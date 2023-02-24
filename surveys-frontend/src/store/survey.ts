import { defineStore } from 'pinia'

interface SurveyStore {
    showModal: boolean,
    flag: boolean,
    toggle: boolean,
    title: string,
    questions: any

}

export const useSurveyStore = defineStore('survey', {
    state: () : SurveyStore => ({
        showModal: false,
        flag: false,
        toggle: false,
        title: '',
        questions: []
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
            if (this.toggle) {
                this.toggle = false
            } else {
                this.toggle = true
            }
        },
        clearStore() {
            this.showModal = false,
            this.flag = false,
            this.toggle = false,
            this.title = '',
            this.questions = []
        }
    }
})
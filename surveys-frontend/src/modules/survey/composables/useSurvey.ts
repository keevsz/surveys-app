import { computed } from 'vue'
import api from '../../../api'
import { useSurveyStore } from '../../../store/survey'

const surveyStore = useSurveyStore()

export const useSurvey = () => {

    const handleSidebar = () => {
        surveyStore.setFlag()
    }

    const changeFalseSidebar = () => {
        surveyStore.falseFlag()
    }

    const createQuestion = ( data : any ) => {
        return new Promise(async (resolve, reject) => {
            try {
                await api.post('/surveys', data, { withCredentials: true })
                resolve(true)
            } catch (error) {
                reject(false)
            }
        })
    }

    return {
        handleSidebar,
        changeFalseSidebar,
        flagValue : computed(() => surveyStore.flag),
        createQuestion
    }
}
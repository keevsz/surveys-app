import { computed } from 'vue'
import { useSurveyStore } from '../../../store/survey'

const surveyStore = useSurveyStore()

export const useSurvey = () => {

    const handleSidebar = () => {
        surveyStore.setFlag()
    }

    const changeFalseSidebar = () => {
        surveyStore.falseFlag()
    }

    return {
        handleSidebar,
        changeFalseSidebar,
        flagValue : computed(() => surveyStore.flag)
    }
}
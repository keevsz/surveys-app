import { computed } from 'vue'
import api from '../../../api'
import { useSurveyStore } from '../../../store/survey'
import { useUserStore } from '../../../store/user'

const surveyStore = useSurveyStore()
const userStore = useUserStore()

export const useSurvey = () => {

    const handleSidebar = () => {
        surveyStore.setFlag()
    }

    const changeFalseSidebar = () => {
        surveyStore.falseFlag()
    }

    const allSurvey = ( offset : number ) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api.get(`/surveys/all?limit=10&offset=${offset}`, { withCredentials: true })
                resolve(res)
            } catch (error) {
                reject(false)
            }
        })
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

    const updateSurvey = ( id : string, data : any ) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api.patch('/surveys/'+id, data, { withCredentials: true })
                console.log(res)
                resolve(res)
            } catch (error) {
                console.log(error);
                
                reject(error)
            }
        })
    }

    const getSurveysByUser = () => {
        return new Promise( async (resolve, reject) => {
            try {
                const res = await api.get(`/surveys/user/${userStore.id}`, { withCredentials: true })
                
                resolve(res)
            } catch (error) {
                
                reject(error)
            }
        } )
    }

    const getOneSurvey = ( id: string ) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api.get(`/surveys/${id}`, { withCredentials: true })
                resolve(res)
            } catch (error) {
                reject(error)
            }
        })
    }

    const saveAnswer = ( data : any ) => {
        return new Promise(async (resolve, reject) => {
            try {
                await api.post('/answers', data, { withCredentials: true })
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const deleteSurvey = ( id : string ) => {
        return new Promise(async (resolve, reject) => {
            try {
                await api.delete('/surveys/'+id, { withCredentials: true })
                
                resolve(true)
            } catch (error) {
                reject(false)
            }
        } )
    }

    return {
        handleSidebar,
        changeFalseSidebar,
        flagValue : computed(() => surveyStore.flag),
        createQuestion,
        updateSurvey,
        getSurveysByUser,
        getOneSurvey,
        deleteSurvey,
        allSurvey,
        saveAnswer
    }
}
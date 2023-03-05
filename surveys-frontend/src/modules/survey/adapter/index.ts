import { Survey1 } from '../interfaces/survey';

export const createSurveyAdapter = ( store: any ) : Survey1 => {
    return {title: store.title,
            questions: store.questions.map(
                (item : any) => ({
                    item: item.title === undefined ? item.item : item.title,
                    alternatives: item.alternatives.map((i: any) => ({
                        description: i.description,
                        value: i.value
                    })),
                    required: item.required,
                    valuable: item.valuable
                }))
        }
}

export const createxSurveyAdapter = ( store: any ) : Survey1 => {
    return {title: store.xtitle,
            questions: store.xquestions.map(
                (item : any) => ({
                    item: item.title === undefined ? item.item : item.title,
                    alternatives: item.alternatives.map((i: any) => ({
                        description: i.description,
                        value: i.value
                    })),
                    required: item.required,
                    valuable: item.valuable
                }))
        }
}

export const createAnswerAdapter = ( data : any, id : string ) => {
    const convert = Object.keys(data).map((key) => {
        return {
            questionId: key,
            alternativeId: data[key]
        }
    })
    return {
        surveyId: id,
        answers: convert
    }
}
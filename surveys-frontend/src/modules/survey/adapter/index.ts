import { Survey1 } from '../interfaces/survey';

export const createSurveyAdapter = ( store: any ) : Survey1 => {
    return {title: store.title,
            questions: store.questions.map(
                (item : any) => ({
                    item: item.title,
                    alternatives: item.alternatives.map((i: any) => ({
                        description: i.description,
                        value: i.value
                    })),
                    required: item.required,
                    valuable: item.valuable
                }))
        }
}
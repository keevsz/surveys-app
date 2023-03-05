import { IUser } from "../../user/interfaces"

export interface Survey1 {
    id?: string,
    title:      string;
    start_date?: string;
    end_date?:   string;
    questions:  Question[];
    user?: IUser
}

export interface Question {
    id?: string
    item:         string;
    valuable:     boolean;
    required:     boolean;
    alternatives: Alternative[];
}

export interface Alternative {
    id?: string,
    description: string;
    value:       number;
    answers?: Answer[]
}

export interface Squeleton {
    uid: string,
    description: string,
    value: number
}

interface Answer {
    id?: string,
    userId?: string,
    alternativeId?: string,
    surveyId?: string,
    userQuestionIndex: string
}
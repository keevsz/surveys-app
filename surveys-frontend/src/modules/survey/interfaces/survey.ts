export interface Survey1 {
    title:      string;
    start_date?: string;
    end_date?:   string;
    questions:  Question[];
}

export interface Question {
    item:         string;
    valuable:     boolean;
    required:     boolean;
    alternatives: Alternative[];
}

export interface Alternative {
    description: string;
    value:       number;
}

export interface Squeleton {
    uid: string,
    description: string,
    value: number
}
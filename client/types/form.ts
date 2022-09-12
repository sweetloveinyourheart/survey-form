export enum AnswerType {
    Text,
    MultipleText,
    Radio,
    Select,
    Checkbox
}

export interface SelectionInterface {
    text: string
    id?: number
}

export interface AnswerInterface {
    text: string | null 
    selections: SelectionInterface[] | null
}

export interface QuestionInterface {
    id?: number
    question: string
    image: string | null
    answerType: AnswerType
    answer: AnswerInterface
}

export interface FormInterface {
    id?: number
    title: string
    author: string
    code?: string
    questions: QuestionInterface[]
    questionCount?: number
}
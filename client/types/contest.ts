import { FormInterface } from "./form"

export interface ContestInterface {
    id?: number
    form: FormInterface
    createdAt: Date
    code: string
}
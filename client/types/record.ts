import { ContestInterface } from "./contest"
import { UserInterface } from "./user"

export interface RecordItemSelection {
    id: number
    text: string | null
}

export interface RecordItem {
    id: number
    text: string | null
    selections: RecordItemSelection[] | null
}

export interface RecordInterface {
    id: number
    contest: ContestInterface
    user: UserInterface
    submitAt: Date
    items: RecordItem[]
}
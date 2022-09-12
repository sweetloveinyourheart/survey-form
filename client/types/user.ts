export interface UserInterface {
    id?: number
    phone: string
    password: string
    birthday: Date | null
    name: string
    email: string | null
    address: string | null
    roles: UserRoles[]
}

export interface UserRoles {
    id: number
    name: string
}
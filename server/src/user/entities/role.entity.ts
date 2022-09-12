import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserRoles {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
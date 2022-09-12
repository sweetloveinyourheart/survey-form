import { Record } from "src/record/entities/record.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    phone: string

    @Column()
    password: string

    @Column({ nullable: true })
    birthday: Date

    @Column()
    name: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    address: string

    @ManyToMany(() => UserRoles, { cascade: true })
    @JoinTable()
    roles: UserRoles[]

    @OneToMany(() => Record, record => record.user)
    @JoinColumn()
    records: Record[]
}
import { Form } from "src/form/entities/form.entity";
import { Record } from "src/record/entities/record.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contest {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => Form, form => form.contest)
    @JoinColumn()
    form: Form

    @ManyToMany(() => User)
    @JoinTable()
    users: User[]

    @OneToMany(() => Record, record => record.contest)
    @JoinColumn()
    records: Record[]
}
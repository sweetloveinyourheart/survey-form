import { Contest } from "src/contest/entities/contest.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    code: string

    @Column()
    author: string

    @Column({nullable: true })
    description: string

    @OneToMany(() => Question, (question) => question.form, { cascade: true })
    questions: Question[]

    @OneToOne(() => Contest, contest => contest.form)
    contest: Contest

}
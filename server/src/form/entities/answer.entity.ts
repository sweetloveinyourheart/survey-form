import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnswerSelection } from "./answer-selection.entity";
import { Question } from "./question.entity";

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    text: string

    @OneToOne(() => Question, question => question.answer, { onDelete: 'CASCADE' })
    question: Question

    @OneToMany(() => AnswerSelection, answerSelection => answerSelection.answer, { cascade: true, nullable: true })
    selections: AnswerSelection[]
}
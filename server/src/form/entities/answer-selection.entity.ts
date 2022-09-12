import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";

@Entity()
export class AnswerSelection {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @ManyToOne(() => Answer, answer => answer.selections, { onDelete: 'CASCADE' })
    answer: Answer
}
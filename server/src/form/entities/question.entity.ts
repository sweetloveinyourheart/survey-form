import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";
import { Form } from "./form.entity";

export enum AnswerType {
    Text,
    MultipleText,
    Radio,
    Select,
    Checkbox    
}

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @Column({ nullable: true })
    image: string

    @Column({ 
        type: 'enum',
        enum: AnswerType,
        default: AnswerType.Text
    })
    answerType: AnswerType

    @ManyToOne(() => Form, (form) => form.questions, { onDelete: 'CASCADE' })
    form: Form

    @OneToOne(() => Answer, answer => answer.question, { cascade: true })
    @JoinColumn()
    answer: Answer
}
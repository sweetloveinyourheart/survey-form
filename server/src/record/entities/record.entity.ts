import { Contest } from "src/contest/entities/contest.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecordItem } from "./record-item.entity";

@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    submitAt: Date

    @Column({ default: false, type: 'boolean' })
    finished: boolean

    @ManyToOne(() => User, user => user.records)
    user: User

    @ManyToOne(() => Contest, contest => contest.records)
    contest: Contest

    @OneToMany(() => RecordItem, item => item.record)
    @JoinColumn()
    items: RecordItem[]
}
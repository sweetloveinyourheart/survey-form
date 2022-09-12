import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Record } from "./record.entity";
import { RecordSelectionItem } from "./selection-item";

@Entity()
export class RecordItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    text: string | null

    @OneToMany(() => RecordSelectionItem, selection => selection.recordItem, { cascade: true, nullable: true })
    selections: RecordSelectionItem[] | null

    @ManyToOne(() => Record, record => record.items)
    record: Record
}
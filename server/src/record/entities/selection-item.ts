import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RecordItem } from "./record-item.entity";

@Entity()
export class RecordSelectionItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @ManyToOne(() => RecordItem, item => item.selections)
    recordItem: RecordItem
}

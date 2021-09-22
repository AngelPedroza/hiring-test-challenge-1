import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Type {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    value: string
}
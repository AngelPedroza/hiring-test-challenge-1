import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Alien {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({name: "name"})
    name: string
}
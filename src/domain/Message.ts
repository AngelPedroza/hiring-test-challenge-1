import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Type} from './Type'
import {Alien} from './Alien'

@Entity({name: 'message'})
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'timestamptz',
        name: 'created_at'
    })
    createdAt: Date;

    @Column()
    text: string

    @Column()
    valid: boolean

    @Column()
    invalid_reason: string

    @ManyToOne(() => Alien, (alien: Alien) => alien.id, {cascade: true})
    @JoinColumn({name: 'alien_id', referencedColumnName: 'id'})
    alien: string

    @ManyToOne(() => Type, {cascade: true})
    @JoinColumn({name: 'type_id', referencedColumnName: 'id'})
    type: Type
}
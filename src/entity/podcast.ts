import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, ManyToOne, Long  } from 'typeorm';
import { Length } from 'class-validator';
import { Users } from './user.js'
import { Category } from './category.js'

@Entity({ name: "podcast" })
export class Podcast extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => Users, (user) => user.id, { nullable: false })
    admin!: Users

    @ManyToOne(() => Category, (category) => category.podcast, { nullable: false })
    category!: Category

    @Column()
    @Length(2, 256) 
    name!: string
    
    @Column()
    @Length(2, 128)
    speaker!: string

    @Column({ type: "bytea" })
    picture!: Long              // buffer qilganda ham ishladi 

    @Column({ type: "bytea" })
    file!: Long                 // buffer qilganda ham ishladi tekshirish kerak
    
    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @DeleteDateColumn()
    deleted_at!: Date
}
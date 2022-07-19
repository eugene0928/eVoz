import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, ManyToOne, Admin  } from 'typeorm';
import { Length } from 'class-validator';
import { Admins } from './admin.js'
import { Category } from './category.js'

@Entity({ name: "podcast" })
export class Podcast extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => Admins, (admin) => admin.id, { nullable: false })
    admin!: Admin

    @ManyToOne(() => Category, (category) => category.id, { nullable: false })
    category!: Category

    @Column()
    @Length(2, 256)
    name!: string
    
    @Column()
    @Length(2, 128)
    speaker!: string

    @Column()
    picture!: string
    
    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @DeleteDateColumn()
    deleted_at!: Date
} 
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn  } from 'typeorm';
import { Length } from 'class-validator';
import { Podcast } from "./podcast.js"

@Entity({ name: "category" })
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    @Length(2, 256)
    name!: string

    @OneToMany(() => Podcast, (podcast) => podcast.category)
    podcast!: Podcast

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @DeleteDateColumn()
    deleted_at!: Date
}
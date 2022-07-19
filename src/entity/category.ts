import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn  } from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    @Length(2, 256)
    name!: string

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @DeleteDateColumn()
    deleted_at!: Date
}
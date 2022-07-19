import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import { IsEmail, Length } from 'class-validator'

@Entity()
@Unique(["email"])
export class Users extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    @Length(2, 32)
    name!: string

    @Column({ name: "email" })
    @IsEmail()
    email!: string

    @Column()
    @Length(8, 16)
    password!: string

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @DeleteDateColumn()
    deleted_at!: Date
}
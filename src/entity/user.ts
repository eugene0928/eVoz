import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, CreateDateColumn, DeleteDateColumn, UpdateDateColumn,
BeforeInsert } from 'typeorm'
import { IsEmail, Length } from 'class-validator'
import bcrypt from "bcrypt"

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
    password!: string 
    @BeforeInsert()
     hashPassw() {
        bcrypt.hash(this.password, 5,  (err, hash) => {
            if(err) throw new Error(err.message)
            this.password = hash
          });
    }

    @Column("boolean", { default: false })
    is_admin!: boolean
 
    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @DeleteDateColumn()
    deleted_at!: Date
}
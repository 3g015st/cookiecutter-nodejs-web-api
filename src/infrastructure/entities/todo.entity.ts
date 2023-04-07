import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { User } from './user.entity'

export interface ITodo {
  id: number
  title: string
  isDeleted: boolean
}

@Entity()
export class Todo implements ITodo {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({ type: 'varchar', length: 60 })
  public title!: string

  @Column({ type: 'boolean', default: false })
  public isDeleted!: boolean

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date

  @ManyToOne(() => User, (user) => user.todos)
  user: User
}

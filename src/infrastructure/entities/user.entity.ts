import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Todo } from './todo.entity'

export interface IUser {
  id: number
  name: string
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({ type: 'varchar', length: 120 })
  public name!: string

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[]
}

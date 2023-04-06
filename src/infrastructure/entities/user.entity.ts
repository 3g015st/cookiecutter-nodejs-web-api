import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

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
}

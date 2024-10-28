import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  link: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}

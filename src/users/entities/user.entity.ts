import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
  synchronize: true,
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'member' })
  permission: string;

  @Column({ default: true })
  isActive: boolean;
}

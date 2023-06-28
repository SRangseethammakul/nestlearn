import { Blog } from 'src/blogs/entities/blog.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column({ select: false })
  password: string;

  @Column({ default: 'member' })
  permission: string;

  @Column({ default: true })
  isActive: boolean;

  //relation
  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];
}

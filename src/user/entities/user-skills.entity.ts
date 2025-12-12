import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '../../common/entity/base.entity';
@Entity()
export class UserSkill extends BaseEntity {
  @Column()
  skill: string; 

  @ManyToOne(() => User, (user) => user.skills, {
    onDelete: 'CASCADE',
  })
  user: User;
}

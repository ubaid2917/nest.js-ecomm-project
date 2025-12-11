import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../enums/role.enum';
import { BaseEntity } from '../../common/entity/base.entity';
@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false})
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CANDIDATE,
  })
  role: Role; 

  @Column()
  phone: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  resumeUrl: string;
}

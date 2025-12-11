import { BaseEntity } from "../../common/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity('auth')
export class Auth extends BaseEntity {

    @Column()
    refreshToken: string; 

    @Column('uuid')
    userId: string
}
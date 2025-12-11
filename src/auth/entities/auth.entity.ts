import { BaseEntity } from "src/common/entity/base.entity";
import { Column } from "typeorm";

export class Auth extends BaseEntity {

    @Column()
    refreshToken: string; 

    @Column('uuid')
    userId: string
}
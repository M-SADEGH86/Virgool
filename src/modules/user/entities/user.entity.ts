import { BaseEntity } from "src/common/abstracts/base-entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { OtpEntity } from "./otp.entity";

@Entity(EntityNames.User)
export class UserEntity extends BaseEntity {
  @Column({unique : true , nullable : true})
  username: string ;
  @Column({unique : true , nullable : true})
  phone : string ;
  @Column({unique : true , nullable : true})
  email: string
  @Column({nullable : true})
  new_email: string
  @Column({nullable: true,default : false})
  verify_email: boolean
  @Column({nullable: true,default : false})
  verify_phone: boolean
  @Column({nullable : true})
  password: string;
  @CreateDateColumn()
  created_at:Date
  @UpdateDateColumn()
  updated_at:Date
  @Column({nullable : true})
  profileId: number
  @OneToOne(() => ProfileEntity , profile => profile.user , {nullable : true})
  @JoinColumn({name : "profileId"})
  profile: ProfileEntity
  @Column({ nullable: true })
  otpId: number ;
  @OneToOne(() => OtpEntity , otp => otp.user, {nullable : true})
  @JoinColumn({name : "otpId"})
  otp: OtpEntity
}
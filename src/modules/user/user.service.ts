import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { ProfileDto } from './dto/profile.dto';
import { UserEntity } from './entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
@Injectable({scope : Scope.REQUEST})
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository:Repository<UserEntity> ,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository:Repository<ProfileEntity> ,
    @Inject(REQUEST) private readonly request:Request
  ) {}
  async chengeProfile (profileDto:ProfileDto) {
    const {id:userId , profileId} = this.request.user
    let profile = await this.profileRepository.findOneBy({userId})
    if(profile) {

    } else {
      profile = this.profileRepository.create({
        
      })
    }
    profile = await this.profileRepository.save(profile)
    if (!profileId) {
      await this.userRepository.update({id : userId} , {profileId : profile.id})
    }
  }
}

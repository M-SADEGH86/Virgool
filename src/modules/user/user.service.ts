import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { ProfileDto } from './dto/profile.dto';
import { UserEntity } from './entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { isDate } from 'class-validator';
import { Gender } from './enum/gender.enum';
@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}
  async chengeProfile(files:any ,profileDto: ProfileDto) {
    console.log(files)
    const { id: userId, profileId } = this.request.user;
    const { bio, birthday, gender, linkedin_profile, nick_name, x_profile } = profileDto;
    let profile = await this.profileRepository.findOneBy({ userId });
    if (profile) {
      if (bio) profile.bio = bio;
      if (birthday && isDate(new Date(birthday))) profile.birthday = new Date(birthday);
      if (gender && Object.values(Gender).includes(gender)) profile.gender = gender;
      if (linkedin_profile) profile.linkedin_profile = linkedin_profile
      if(x_profile) profile.x_profile = x_profile
    } else {
      profile = this.profileRepository.create({
        bio,
        nick_name,
        birthday,
        gender,
        linkedin_profile,
        x_profile,
        userId
      });
    }
    profile = await this.profileRepository.save(profile);
    if (!profileId) {
      await this.userRepository.update({ id: userId }, { profileId: profile.id });
    }
  }
}

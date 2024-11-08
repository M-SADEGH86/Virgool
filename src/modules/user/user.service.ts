import { ConflictException, Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { ProfileDto } from './dto/profile.dto';
import { UserEntity } from './entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { isDate } from 'class-validator';
import { Gender } from './enums/gender.enum';
import { profileImages } from './types/files';
import { ConflictMessage, PublicMessage } from 'src/common/enums/message.enum';
import { AuthService } from '../auth/auth.service';
import { TokensService } from '../auth/tokens.service';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @Inject(REQUEST) private readonly req: Request,
    private readonly authService:AuthService,
    private readonly tokensService:TokensService
  ) {}

  async changeProfile(files: profileImages, profileDto: ProfileDto) {
    if (files?.image_profile?.length > 0) {
      let [image] = files?.image_profile;
      profileDto.image_profile = image?.path?.slice(7);
    }
    if (files?.bg_image?.length > 0) {
      let [image] = files?.bg_image;
      profileDto.bg_image = image?.path?.slice(7);
    }
    const { id: userId, profileId } = this.req.user;
    let profile = await this.profileRepository.findOneBy({ userId });

    const { bio, birthday, gender, linkedin_profile, nick_name, x_profile, bg_image, image_profile } = profileDto;
    if (profile) {
      if (nick_name) profile.nick_name = nick_name;
      if (bio) profile.bio = bio;
      if (birthday && isDate(new Date(birthday))) profile.birthday = new Date(birthday);
      if (gender && Object.values(Gender).includes(gender)) profile.gender = gender;
      if (linkedin_profile) profile.linkedin_profile = linkedin_profile;
      if (x_profile) profile.x_profile = x_profile;
      if (image_profile) profile.image_profile = image_profile;
      if (bg_image) profile.bg_image = bg_image;
    } else {
      profile = this.profileRepository.create({
        nick_name,
        bio,
        gender,
        birthday,
        linkedin_profile,
        x_profile,
        userId,
        image_profile,
        bg_image,
      });
    }
    profile = await this.profileRepository.save(profile);
    if (!profileId) {
      await this.userRepository.update({ id: userId }, { profileId: profile.id });
    }
    return {
      message: PublicMessage.Updated,
    };
  }

  async profile() {
    const { id } = this.req.user;
    return this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }

  async changeEmail(email: string) {
    const { id } = this.req.user;
    const user = await this.userRepository.findOneBy({ email });
    if (user && user.id !== id) {
      throw new ConflictException(ConflictMessage.Email);
    } else if (user && user.id == id) {
      return { message: PublicMessage.Updated };
    }
    user.new_email = email;
    const otp = await this.authService.saveOtp(user.id)
    const token = this.tokensService.createEmailToken({email})
    return {
      otp:otp.code ,
      token,
    }
  }
}

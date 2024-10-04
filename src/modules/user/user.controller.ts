import { Body, Controller, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';

@Controller('/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Put("/profile")
  chengeProfile (@Body() profileDto:ProfileDto) {
    return this.userService.chengeProfile(profileDto)
  }
}

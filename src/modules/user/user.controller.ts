import { Body, Controller, Put, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';
import { SwaggerConsumes } from 'src/common/decorators/consumes.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MulterDestination } from 'src/common/utils/multer.utils';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/profile')
  @SwaggerConsumes()
  @UseInterceptors(FileFieldsInterceptor([
    {name : "image_profile" , maxCount: 1},
    {name : "bg_image" , maxCount: 1}
  ],{
    storage : diskStorage({
      destination : MulterDestination("user-profile"),
      filename:() => {}
    })
  }))
  changeProfile(@Body() profileDto: ProfileDto) {
    return this.userService.changeProfile(profileDto);
  }
}

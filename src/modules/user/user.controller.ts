import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';
import { SwaggerConsumes } from 'src/common/decorators/consumes.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterStorage } from 'src/common/utils/multer.utils';
import { profileImages } from './types/files';
import { UploadedOptionalFile } from 'src/common/decorators/upload-file.decorator';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/profile')
  @SwaggerConsumes()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image_profile', maxCount: 1 },
        { name: 'bg_image', maxCount: 1 },
      ],
      {
        storage: MulterStorage('user-profile'),
      },
    ),
  )
  changeProfile(@UploadedOptionalFile() files: profileImages, @Body() profileDto: ProfileDto) {
    return this.userService.changeProfile(files, profileDto);
  }
  
  @Get("/profile")
  profile () {
    return this.userService.profile()
  }
}

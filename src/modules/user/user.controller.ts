import {
  Body,
  Controller,
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
import { diskStorage } from 'multer';
import { MulterDestination, MulterFileName } from 'src/common/utils/multer.utils';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/profile')
  @SwaggerConsumes()
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image_profile', maxCount: 1 },
        { name: 'bg_image', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: MulterDestination('user-profile'),
          filename: MulterFileName,
        }),
      },
    ),
  )
  changeProfile(
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [],
      }),
    )
    files: unknown,
    @Body() profileDto: ProfileDto,
  ) {
    return this.userService.changeProfile(files ,profileDto);
  }
}

import { PartialType } from '@nestjs/swagger';
import { CreateCategoriDto } from './create-categori.dto';

export class UpdateCategoriDto extends PartialType(CreateCategoriDto) {}

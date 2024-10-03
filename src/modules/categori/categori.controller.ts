import { Controller } from '@nestjs/common';
import { CategoriService } from './categori.service';

@Controller('categori')
export class CategoriController {
  constructor(private readonly categoriService: CategoriService) {}
}

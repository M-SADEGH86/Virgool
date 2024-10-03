import { Module } from '@nestjs/common';
import { CategoriService } from './categori.service';
import { CategoriController } from './categori.controller';

@Module({
  controllers: [CategoriController],
  providers: [CategoriService],
})
export class CategoriModule {}

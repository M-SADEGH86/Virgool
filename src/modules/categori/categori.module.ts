import { Module } from '@nestjs/common';
import { CategoriService } from './categori.service';
import { CategoriController } from './categori.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriEntity } from './entities/categori.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports : [TypeOrmModule.forFeature([CategoriEntity]) , UserModule , AuthModule] ,
  controllers: [CategoriController],
  providers: [CategoriService],
})
export class CategoriModule {}

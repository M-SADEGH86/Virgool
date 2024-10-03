import { Injectable } from '@nestjs/common';
import { CreateCategoriDto } from './dto/create-categori.dto';
import { UpdateCategoriDto } from './dto/update-categori.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriEntity } from './entities/categori.entity';
import { Repository } from 'typeorm';
import { PublicMessage } from 'src/common/enums/message.enum';

@Injectable()
export class CategoriService {
  constructor(
    @InjectRepository(CategoriEntity)
    private readonly categoriRepository:Repository<CategoriEntity>
  ) {

  }
  async create(createCategoriDto: CreateCategoriDto) {
    const  {priority , title} = createCategoriDto
    const categori = this.categoriRepository.create({
      title ,
      priority 
    })
    await this.categoriRepository.save(categori)
    return {
      message : PublicMessage.Created
    }
  }

  findAll() {
    return `This action returns all categori`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categori`;
  }

  update(id: number, updateCategoriDto: UpdateCategoriDto) {
    return `This action updates a #${id} categori`;
  }

  remove(id: number) {
    return `This action removes a #${id} categori`;
  }
}

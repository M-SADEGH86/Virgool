import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoriDto } from './dto/create-categori.dto';
import { UpdateCategoriDto } from './dto/update-categori.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriEntity } from './entities/categori.entity';
import { Repository } from 'typeorm';
import { ConflictMessage, PublicMessage } from 'src/common/enums/message.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CategoriService {
  constructor(
    @InjectRepository(CategoriEntity)
    private readonly categoriRepository: Repository<CategoriEntity>,
  ) {}

  async create(createCategoriDto: CreateCategoriDto) {
    let { priority, title } = createCategoriDto;
    title = await this.checkExistAndResolveTitle(title)
    const categori = this.categoriRepository.create({
      title,
      priority,
    });
    await this.categoriRepository.save(categori);
    return {
      message: PublicMessage.Created,
    };
  }
  async checkExistAndResolveTitle (title: string) {
    title = title?.trim()?.toLowerCase()
    const categori = await this.categoriRepository.findOneBy({title})
    if (categori) throw new ConflictException(ConflictMessage.CategoriTitle)
    return title
  }
  findAll(paginationDto:PaginationDto) {
    console.log(paginationDto)
    return this.categoriRepository.findBy({});
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

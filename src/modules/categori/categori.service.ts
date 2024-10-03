import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoriDto } from './dto/create-categori.dto';
import { UpdateCategoriDto } from './dto/update-categori.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriEntity } from './entities/categori.entity';
import { Repository } from 'typeorm';
import { ConflictMessage, PublicMessage } from 'src/common/enums/message.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginationGenerator, PaginationSolver } from 'src/common/utils/pagination.util';

@Injectable()
export class CategoriService {
  constructor(
    @InjectRepository(CategoriEntity)
    private readonly categoriRepository: Repository<CategoriEntity>,
  ) {}

  async create(createCategoriDto: CreateCategoriDto) {
    let { priority, title } = createCategoriDto;
    title = await this.checkExistAndResolveTitle(title);
    const categori = this.categoriRepository.create({
      title,
      priority,
    });
    await this.categoriRepository.save(categori);
    return {
      message: PublicMessage.Created,
    };
  }
  async checkExistAndResolveTitle(title: string) {
    title = title?.trim()?.toLowerCase();
    const categori = await this.categoriRepository.findOneBy({ title });
    if (categori) throw new ConflictException(ConflictMessage.CategoriTitle);
    return title;
  }
  async findAll(paginationDto: PaginationDto) {
    const { limit, page, skip } = PaginationSolver(paginationDto);
    const [categories , count] = await this.categoriRepository.findAndCount({
      where : {} ,
      skip , 
      take : limit , 
    });
    return {
      pagination: paginationGenerator(count , page , limit) , 
      categories
    }
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

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriDto } from './dto/create-categori.dto';
import { UpdateCategoriDto } from './dto/update-categori.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriEntity } from './entities/categori.entity';
import { Repository } from 'typeorm';
import { ConflictMessage, NotFoundMessage, PublicMessage } from 'src/common/enums/message.enum';
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
    const [categories, count] = await this.categoriRepository.findAndCount({
      where: {},
      skip,
      take: limit,
    });
    return {
      pagination: paginationGenerator(count, page, limit),
      categories,
    };
  }

  async findOne(id: number) {
    const categori = await this.categoriRepository.findOneBy({ id });
    if (!categori) throw new NotFoundException(NotFoundMessage.NotFoundCategori);
    return categori;
  }

  async update(id: number, updateCategoriDto: UpdateCategoriDto) {
    const categori = await this.findOne(id);
    const { priority, title } = updateCategoriDto;
    if (title) categori.title = title;
    if (priority) categori.priority = priority;
    await this.categoriRepository.save(categori);
    return {
      message: PublicMessage.Updated,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.categoriRepository.delete({ id });
    return {
      message: PublicMessage.Deleted,
    };
  }
}

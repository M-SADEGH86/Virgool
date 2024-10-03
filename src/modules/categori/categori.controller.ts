import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriService } from './categori.service';
import { CreateCategoriDto } from './dto/create-categori.dto';
import { UpdateCategoriDto } from './dto/update-categori.dto';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Pagination } from 'src/common/decorators/pagination.decorator';

@Controller('categori')
@ApiTags("Categori")
export class CategoriController {
  constructor(private readonly categoriService: CategoriService) {}
  
  @Post()
  @ApiConsumes( SwaggerConsumes.UrlEncoded , SwaggerConsumes.Json)
  create(@Body() createCategoriDto: CreateCategoriDto) {
    return this.categoriService.create(createCategoriDto);
  }

  @Get()
  @Pagination()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.categoriService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriDto: UpdateCategoriDto) {
    return this.categoriService.update(+id, updateCategoriDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriService.remove(+id);
  }
}

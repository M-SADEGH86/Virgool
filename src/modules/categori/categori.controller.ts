import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriService } from './categori.service';
import { CreateCategoriDto } from './dto/create-categori.dto';
import { UpdateCategoriDto } from './dto/update-categori.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('categori')
@ApiTags("Categori")
export class CategoriController {
  constructor(private readonly categoriService: CategoriService) {}

  @Post()
  create(@Body() createCategoriDto: CreateCategoriDto) {
    return this.categoriService.create(createCategoriDto);
  }

  @Get()
  findAll() {
    return this.categoriService.findAll();
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

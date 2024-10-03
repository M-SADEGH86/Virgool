import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCategoriDto {
  @ApiProperty()
  title: string
  @ApiPropertyOptional()
  priority: number
}

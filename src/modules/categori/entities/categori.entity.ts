import { BaseEntity } from "src/common/abstracts/base-entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, Entity } from "typeorm";

@Entity(EntityName.Categori)
export class CategoriEntity extends BaseEntity {
  @Column()
  title: string 
  @Column({nullable : true})
  priority: number
}

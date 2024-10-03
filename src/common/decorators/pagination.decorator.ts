import { applyDecorators } from "@nestjs/common"
import { ApiQuery } from "@nestjs/swagger"

export const Pagination = () => {
  return applyDecorators(
    ApiQuery({name : "page" , example : 1}) ,
    ApiQuery({name : "limit" , example : 10})
  )
}
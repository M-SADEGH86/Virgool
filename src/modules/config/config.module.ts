import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { TypeOrmDbConfig } from "src/configs/typeorm.config";

@Module({
  imports : [
    ConfigModule.forRoot({
      envFilePath : [join(process.cwd() , '.env')] ,
      isGlobal : true
    }) , 
    TypeOrmModule.forRootAsync({
      useClass : TypeOrmDbConfig , 
      inject : [TypeOrmDbConfig]
    })
  ] , 
  providers : [TypeOrmDbConfig]
})
export class ConfigsModule {}
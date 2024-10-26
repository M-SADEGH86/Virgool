import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const TypeOrmConfig = (): TypeOrmModuleOptions => {
  const {DB_HOST , DB_NAME , DB_PASSWORD , DB_PORT , DB_USERNAME} = process.env;
  return {
    type: 'postgres',
    database : DB_NAME , 
    host : DB_HOST,
    port:DB_PORT , 
    username : DB_USERNAME , 
    password : DB_PASSWORD , 
    autoLoadEntities : false , 
    entities : ["dist/modules/**/entities/*.entity.{ts,js}"],
    synchronize : true
  };
};

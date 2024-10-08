import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
export class TypeOrmDbConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;
    return {
      type : "postgres" ,
      port: DB_PORT,
      host: DB_HOST,
      database: DB_NAME,
      password: DB_PASSWORD,
      username: DB_USERNAME,
      autoLoadEntities: false,
      entities: ['dist/modules/**/entities/*.entity.{js,ts}'],
      synchronize: true,
    };
  }
}

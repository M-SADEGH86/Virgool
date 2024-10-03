import { Module } from "@nestjs/common";
import { ConfigsModule } from "../config/config.module";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { CategoriModule } from "../categori/categori.module";

@Module({
  imports : [ConfigsModule , UserModule , AuthModule , CategoriModule]
})
export class AppModule {}
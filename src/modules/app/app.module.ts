import { Module } from "@nestjs/common";
import { ConfigsModule } from "../config/config.module";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports : [ConfigsModule , UserModule , AuthModule]
})
export class AppModule {}
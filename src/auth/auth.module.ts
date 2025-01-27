import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtAuthService } from "./jwt.service";
import { UserModule } from "../user/user.module"; // Import UserModule
import { JwtGuard } from "./jwt.guard";
import { JwtStrategy } from "./jwt-strategy";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: "123456", // Use a stronger secret
        signOptions: { expiresIn: "1h" },
      }),
    }),
    UserModule, // Import UserModule here
  ],
  providers: [JwtAuthService, JwtGuard, JwtStrategy],
  exports: [JwtAuthService],
})
export class AuthModule {}

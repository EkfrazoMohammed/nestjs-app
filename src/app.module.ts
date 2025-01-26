import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "tayib_database",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    CategoryModule,
    ProductModule,
    UserModule,
    FileUploadModule,
    MailModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

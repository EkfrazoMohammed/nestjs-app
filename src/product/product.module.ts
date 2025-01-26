import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';
import { JwtModule } from '@nestjs/jwt';  // Add this import
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
     ConfigModule.forRoot(),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
          }),
        }),
  ],
  providers: [ProductService],  
  controllers: [ProductController],
})
export class ProductModule {}

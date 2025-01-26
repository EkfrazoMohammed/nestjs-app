// update-category.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
   @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNumber()
    @IsNotEmpty()
    price: number;
  
    @IsNumber()
    @IsOptional()
    categoryId: number;
  }
  
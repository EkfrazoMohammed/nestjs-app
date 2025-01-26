import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional() 
  @IsNotEmpty() 
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

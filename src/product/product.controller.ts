import {
  UseGuards,
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./product.entity";
import { JwtGuard } from "../auth/jwt.guard";
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtGuard) // Protect routes using the custom JWT guard
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @UseGuards(JwtGuard) // Protect routes using the custom JWT guard
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @UseGuards(JwtGuard) // Protect routes using the custom JWT guard
  @Get("paginated")
  async findAllByFilter(
    @Query("page") page = 1,
    @Query("limit") limit = 10,
    @Query("sort") sort = "id",
    @Query("order") order: "ASC" | "DESC" = "ASC"
  ) {
    // Convert page and limit to numbers
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    // Call the service to fetch paginated and sorted results
    return this.productService.findAllByFilter(
      pageNumber,
      limitNumber,
      sort,
      order
    );
  }

  @UseGuards(JwtGuard) // Protect routes using the custom JWT guard
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.productService.remove(id);
  }
}

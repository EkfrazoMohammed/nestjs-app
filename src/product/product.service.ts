import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '../category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Existing create method
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, categoryId } = createProductDto;

    // Find category first
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new Error('Category not found');
    }

    // Create and save the product
    const product = this.productRepository.create({ name, price, category });
    return this.productRepository.save(product);
  }

  // Find all products
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  // Find all products with pagination, sorting, and count
  async findAllByFilter(page: number, limit: number, sort: string, order: 'ASC' | 'DESC') {
    const [products, total] = await this.productRepository.findAndCount({
      relations: ['category'],
      take: limit,
      skip: (page - 1) * limit,
      order: { [sort]: order },
    });

    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Update a product
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const { name, price, categoryId } = updateProductDto;

    // Find product first
    const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    // Find category if provided
    if (categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
      if (!category) {
        throw new Error('Category not found');
      }
      product.category = category;
    }

    // Update the product
    product.name = name || product.name;
    product.price = price || product.price;

    return this.productRepository.save(product);
  }

  // Remove a product
  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    await this.productRepository.remove(product);
  }
  
}

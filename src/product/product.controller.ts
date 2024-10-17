import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    this.productRepository.save(productData);

    return {
      data: productData,
      status: 'product created successfully!',
    };
  }

  @Get()
  async listProducts() {
    return this.productRepository.list();
  }
}

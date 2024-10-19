import { v4 as uuidv4 } from 'uuid';

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductEntity } from './product.entity';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productEntity = new ProductEntity();

    productEntity.id = uuidv4();
    productEntity.userId = productData.userId;
    productEntity.value = productData.value;
    productEntity.quantityAvaliable = productData.quantityAvaliable;
    productEntity.description = productData.description;
    productEntity.characteristics = productData.characteristics;
    productEntity.images = productData.images;
    productEntity.category = productData.category;

    this.productRepository.save(productEntity);

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

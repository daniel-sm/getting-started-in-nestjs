import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  async save(product: ProductEntity) {
    this.products.push(product);
  }

  async list() {
    return this.products;
  }

  async update(id: string, updateData: Partial<ProductEntity>) {
    const possibleProduct = this.products.find(
      (savedProduct) => savedProduct.id === id,
    );

    if (!possibleProduct) {
      throw new Error('Product does not exist');
    }

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id' || key === 'userId') {
        return;
      }
      possibleProduct[key] = value;
    });

    return possibleProduct;
  }
}

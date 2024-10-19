import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  private async searchById(id: string) {
    const possibleProduct = this.products.find(
      (savedProduct) => savedProduct.id === id,
    );

    if (!possibleProduct) {
      throw new Error('Product does not exist');
    }

    return possibleProduct;
  }

  async save(product: ProductEntity) {
    this.products.push(product);
  }

  async list() {
    return this.products;
  }

  async update(id: string, updateData: Partial<ProductEntity>) {
    const product = await this.searchById(id);

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id' || key === 'userId') {
        return;
      }
      product[key] = value;
    });

    return product;
  }

  async remove(id: string) {
    const product = await this.searchById(id);

    this.products = this.products.filter((savedUser) => savedUser.id !== id);

    return product;
  }
}

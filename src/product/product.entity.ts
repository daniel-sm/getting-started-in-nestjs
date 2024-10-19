class ProductCharacteristics {
  name: string;
  description: string;
}

class ProductImages {
  url: string;
  description: string;
}

export class ProductEntity {
  id: string;
  userId: string;
  name: string;
  value: number;
  quantityAvaliable: number;
  description: string;
  characteristics: ProductCharacteristics[];
  images: ProductImages[];
  category: string;
}

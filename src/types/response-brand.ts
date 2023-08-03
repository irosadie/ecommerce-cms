interface Product {
  brand: string;
  category: string;
}

export interface GetBrandResponse {
  products: Product[];
}

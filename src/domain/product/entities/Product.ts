export interface Product {
  id: string;
  name: string;
  price: number;
}

export function createProduct(input: Product): Product {
  if (input.price < 0) {
    throw new Error(`Product price cannot be negative: received ${input.price}`);
  }
  if (input.name.trim().length === 0) {
    throw new Error('Product name cannot be empty');
  }
  return input;
}

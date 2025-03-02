import { Product } from '../types';

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    currency: "USD"
  },
  {
    id: 2,
    name: "Smartphone",
    price: 499.99,
    currency: "EUR"
  }
];

export const fetchProducts = async (): Promise<Product[]> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
}; 
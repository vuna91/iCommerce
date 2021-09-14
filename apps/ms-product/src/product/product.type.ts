import { Brand } from '../brand/brand.type';

export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  color: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCreation {
  name: string;
  description?: string;
  price: number;
  color: string;
  brand: string;
}

export interface ProductFilter {
  name?: string;
  price?: number;
  brand?: string;
  color?: string;
}

export interface ProductSortBy {
  key: string;
  value: 'asc' | 'desc' | '';
}

export type ProductResponse = Omit<Product, 'description'>;

export type ProductDetail = Omit<Product, 'brand'> & {
  brand: string | Brand;
};

export type ProductDetailResponse = Omit<Product, 'brand'> & {
  brand: { id: string; name: string };
};

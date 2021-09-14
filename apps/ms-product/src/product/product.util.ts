import {
  Product,
  ProductDetail,
  ProductDetailResponse,
  ProductResponse,
  ProductSortBy,
} from './product.type';
import { get } from 'lodash';

export const parseSortByQuery = (query = ''): ProductSortBy => {
  const result: ProductSortBy = {
    key: '',
    value: '',
  };
  const sortByChunks = query.split(':');
  if (
    sortByChunks.length === 2 &&
    (sortByChunks[1] === 'asc' || sortByChunks[1] === 'desc')
  ) {
    result.key = sortByChunks[0];
    result.value = sortByChunks[1];
  }
  return result;
};

export const toProductResponse = (product: Product): ProductResponse => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    color: product.color,
    brand: product.brand,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

export const toProductDetailResponse = (
  product: ProductDetail
): ProductDetailResponse => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    color: product.color,
    brand: {
      id: get(product.brand, 'id'),
      name: get(product.brand, 'name'),
    },
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

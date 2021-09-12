import { ProductSortBy } from './product.type';

export const parseSortByQuery = (query: string): ProductSortBy => {
  const result: ProductSortBy = {
    key: '',
    value: 'asc',
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

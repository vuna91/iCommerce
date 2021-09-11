export interface Product {
  id?: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCreation {
  name: string;
  description: string;
}

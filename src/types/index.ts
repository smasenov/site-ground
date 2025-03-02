export enum Permission {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  currency: string;
}

export interface Permissions {
  permissions: string[];
} 
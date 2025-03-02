import { type FC } from 'react';
import { Product } from '../../types';
import ProductTableAction from './ProductTableAction';
import { Permission } from '../../types/index';

interface ProductTableProps {
  products: Product[];
  permissions: Permission[];
  onUpdate: (product: Product) => void;
  onDelete: (id: number | undefined, onSuccess?: () => void) => void;
  isDeleting: boolean;
}

const ProductTable: FC<ProductTableProps> = ({
  products,
  permissions,
  onUpdate,
  onDelete,
  isDeleting
}) => {
  
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Currency</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.name}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.currency}</td>
            <td>
              <ProductTableAction
                product={product}
                permissions={permissions}
                onUpdate={onUpdate}
                onDelete={onDelete}
                isDeleting={isDeleting}
                products={products}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable; 
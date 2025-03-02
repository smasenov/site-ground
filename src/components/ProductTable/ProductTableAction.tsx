import { type FC, useState } from 'react';
import { Button } from '../common';
import { Product, Permission } from '../../types';
import ProductUpdate from '../Modals/ProductUpdate/ProductUpdate';
import DeleteProduct from '../Modals/DeleteProduct/DeleteProduct';

interface ProductTableActionProps {
  product: Product;
  permissions: Permission[];
  onUpdate: (product: Product) => void;
  onDelete: (id: number | undefined, onSuccess?: () => void) => void;
  isDeleting: boolean;
  products: Product[];
}

const ProductTableAction: FC<ProductTableActionProps> = ({
  product,
  permissions,
  onUpdate,
  onDelete,
  isDeleting,
  products
}) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      {permissions.includes(Permission.UPDATE) && (
        <Button 
          variant="primary" 
          size="small" 
          onClick={() => setShowUpdate(true)}
        >
          Update
        </Button>
      )}
      {permissions.includes(Permission.DELETE) && (
        <Button 
          variant="danger" 
          size="small" 
          onClick={() => setShowDelete(true)}
        >
          Delete
        </Button>
      )}

      {showUpdate && (
        <ProductUpdate
          product={product}
          onUpdate={onUpdate}
          onClose={() => setShowUpdate(false)}
          products={products}
        />
      )}

      {showDelete && (
        <DeleteProduct
          productName={product.name}
          onConfirm={() => onDelete(product.id, () => setShowDelete(false))}
          onClose={() => setShowDelete(false)}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
};

export default ProductTableAction; 
import { type FC, useState, useEffect } from 'react';
import ProductForm from './components/ProductForm/ProductForm';
import ProductTable from './components/ProductTable/ProductTable';
import { fetchPermissions } from './services/permissionService';
import { fetchProducts } from './services/productService';
import { Product, Permission } from './types';
import { ModalSpinner } from './components/common';
import './styles/global.scss';

const App: FC = () => {
  // TODO: improve state management 
  const [products, setProducts] = useState<Product[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nameError, setNameError] = useState<string | null>(null);
  // TODO: this can be a hook and moved to a new file
  useEffect(() => {
    const loadData = async () => {
      try {
        const [perms, prods] = await Promise.all([
          fetchPermissions(),
          fetchProducts()
        ]);
        setPermissions(perms);
        setProducts(prods);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCreate = (product: Omit<Product, 'id'>) => {
    const exists = products.some(p => p.name.toLowerCase() === product.name.toLowerCase());
    
    if (exists) {
      setNameError('A product with this name already exists');
      return;
    }

    setNameError(null);
    const newProduct = {
      ...product,
      id: products.length + 1
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdate = (updatedProduct: Product) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDelete = async (id: number | undefined, onSuccess?: () => void) => {
    try {
      setIsDeleting(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(prev => prev.filter(product => product.id !== id));
      onSuccess?.();
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const hasPermission = (permissions: Permission[], permission: Permission) => 
    permissions.some(p => p === permission);

  return (
    <div className="app">
      <h1>Product Management</h1>
      
      {isLoading ? (
        <div className="loading">
          <ModalSpinner />
        </div>
      ) : (
        <>
          {hasPermission(permissions, Permission.CREATE) && (
            <ProductForm onSubmit={handleCreate} error={nameError} />
          )}

          {hasPermission(permissions, Permission.READ) && (
            <ProductTable
              products={products}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              permissions={permissions}
              isDeleting={isDeleting}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;

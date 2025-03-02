import { type FC, useState } from 'react';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { Product } from '../../../types';
import styles from './ProductUpdate.module.scss';

interface ProductUpdateProps {
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
  onClose: () => void;
  products: Product[];
}

const ProductUpdate: FC<ProductUpdateProps> = ({
  product,
  onUpdate,
  onClose,
  products,
}) => {
  const [formData, setFormData] = useState<Product>({
    ...product,
  });
  const [nameError, setNameError] = useState<string | null>(null);

  if (!product) {
    return null;
  }

  const hasChanges = () => {
    return (
      product.name !== formData.name ||
      product.price !== formData.price ||
      product.currency !== formData.currency
    );
  };

  const isDuplicateName = (name: string) => {
    return products.some(p => 
      p.id !== product.id && 
      p.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setNameError(isDuplicateName(value) ? 'A product with this name already exists' : null);
    }
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const isFormValid = formData.name && formData.price && formData.currency;
  const isSubmitDisabled = !isFormValid || !hasChanges() || !!nameError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      id: product.id,
      ...formData
    });
    onClose();
  };
  // TODO: the inputs from this component and the update modal can be one separate component
  return (
    <Modal onClose={onClose}>
      <div className={styles.updateForm}>
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              label="Name"
              required
              error={nameError}
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="number"
              name="price"
              value={formData.price || 0}
              onChange={handleInputChange}
              label="Price"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="text"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              label="Currency"
              required
            />
          </div>
          <div className={styles.buttons}>
            <Button type="submit" variant="primary" disabled={isSubmitDisabled}>
              Save Changes
            </Button>
            <Button type="button" onClick={onClose} variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProductUpdate; 
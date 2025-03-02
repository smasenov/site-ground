import { type FC, useState, useEffect } from 'react';
import { Product } from '../../types';
import { Button, Input } from '../common';
import styles from './ProductForm.module.scss';

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id'>) => void;
  error: string | null;
  initialValues?: Omit<Product, 'id'>;
  submitText?: string;
  onCancel?: () => void;
}

const ProductForm: FC<ProductFormProps> = ({
  onSubmit,
  error,
  initialValues = { name: '', price: 0, currency: 'USD' },
  submitText = 'Add Product',
  onCancel
}) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(initialValues);
  const [errorState, setErrorState] = useState<string | null>(error || null);

  useEffect(() => {
    setErrorState(error);
  }, [error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrorState(null);
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorState(null);
    onSubmit(formData);
    setFormData({ name: '', price: 0, currency: 'USD' });
  };
  
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Product name"
          error={errorState || undefined}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <Input
          type="number"
          name="price"
          value={formData.price || 0}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <Input
          type="text"
          name="currency"
          value={formData.currency}
          onChange={handleInputChange}
          placeholder="Currency"
          required
        />
      </div>
      <div className={styles.buttonGroup}>
        <Button type="submit" variant="primary" disabled={!formData.name || !formData.price || !formData.currency}>
          {submitText}
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProductForm; 
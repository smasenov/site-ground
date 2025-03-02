import { type FC } from 'react';
import { Button, Modal } from '../../common';
import styles from './DeleteProduct.module.scss';

interface DeleteProductProps {
  productName: string;
  onConfirm: () => void;
  onClose: () => void;
  isDeleting?: boolean;
}

const DeleteProduct: FC<DeleteProductProps> = ({
  productName,
  onConfirm,
  onClose,
  isDeleting = false,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.deleteModal}>
        <h2>Delete Product</h2>
        <p>Are you sure you want to delete "{productName}"?</p>
        <div className={styles.buttons}>
          <Button 
            variant="danger" 
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProduct;

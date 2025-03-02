import { type FC } from 'react';
import styles from './ModalSpinner.module.scss';

const ModalSpinner: FC = () => (
  <div className={styles.overlay}>
    <div className={styles.spinner} data-testid="modal-spinner" />
  </div>
);

export default ModalSpinner; 
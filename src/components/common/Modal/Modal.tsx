import { type FC, useState } from 'react';
import { createPortal } from 'react-dom';
import CrossIcon from '../../icons/CrossIcon';
import ModalSpinner from '../Spinner/ModalSpinner';
import styles from './Modal.module.scss';

interface ModalProps {
  contentLoading?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal: FC<ModalProps> = ({
  contentLoading = false,
  children,
  onClose,
  className,
}) => {
  const [clickStartedInside, setClickStartedInside] = useState(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement && event.target.closest(`.${styles.content}`)) {
      setClickStartedInside(true);
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.target instanceof HTMLElement &&
      !event.target.closest(`.${styles.content}`) &&
      !clickStartedInside
    ) {
      onClose();
    }
    setClickStartedInside(false);
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`${styles.wrapper} ${className || ''}`}
      data-testid="modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div
        className={styles.content}
        onClick={e => e.stopPropagation()}
        data-testid="modal-container"
      >
        {contentLoading && <ModalSpinner />}
        <button
          className={styles.closeIcon}
          onClick={() => onClose()}
        >
          <CrossIcon
            width="1.25rem"
            height="1.25rem"
            thickness="1.5"
          />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal; 
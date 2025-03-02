import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from '../../../../src/components/common/Modal/Modal';

const renderModal = (props: React.ComponentProps<typeof Modal>) => {
  return render(<Modal {...props} />);
};

describe('Modal Component', () => {
  it('renders children content', () => {
    const { getByText } = renderModal({
      onClose: () => {},
      children: <div>Modal Content</div>
    });
    
    expect(getByText('Modal Content')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const handleClose = jest.fn();
    const { getByTestId } = renderModal({
      onClose: handleClose,
      children: <div>Modal Content</div>
    });

    fireEvent.click(getByTestId('modal-backdrop'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('does not close when modal content is clicked', () => {
    const handleClose = jest.fn();
    const { getByTestId } = renderModal({
      onClose: handleClose,
      children: <div>Modal Content</div>
    });

    fireEvent.click(getByTestId('modal-container'));
    expect(handleClose).not.toHaveBeenCalled();
  });
});

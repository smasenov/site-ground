import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input, { type InputProps } from '../../../../src/components/common/Input/Input';

const renderInput = (props: Partial<InputProps>) => {
  const defaultProps: InputProps = {
    type: 'text',
    name: 'test',
    value: '',
    onChange: () => {},
  };
  
  return render(<Input {...defaultProps} {...props} />);
};

describe('Input Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = renderInput({
      placeholder: 'Test Input'
    });
    expect(getByPlaceholderText('Test Input')).toBeInTheDocument();
  });

  it('shows error message when error prop is provided', () => {
    const { getByText } = renderInput({
      error: 'Error message'
    });
    expect(getByText('Error message')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    const { getByRole } = renderInput({
      onChange: handleChange
    });
    
    fireEvent.change(getByRole('textbox'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });
  it('handles number input correctly', () => {
    const handleChange = jest.fn();
    const { getByRole } = renderInput({
      type: 'number',
      value: 0,
      onChange: handleChange
    });

    fireEvent.change(getByRole('spinbutton'), { target: { value: '42' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('prevents non-numeric input', () => {
    const { getByRole } = renderInput({
      type: 'number',
      value: 0
    });

    const input = getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
  });
});

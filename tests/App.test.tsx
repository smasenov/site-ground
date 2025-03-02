import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/App';
import { fetchPermissions } from '../src/services/permissionService';
import { fetchProducts } from '../src/services/productService';
import { Permission } from '../src/types';

jest.mock('../src/services/permissionService');
jest.mock('../src/services/productService');

const mockPermissions = [
  Permission.CREATE,
  Permission.READ,
  Permission.UPDATE,
  Permission.DELETE
];

const mockProducts = [
  { id: 1, name: 'Test Product', price: 99.99, currency: 'USD' }
];
// TODO: tests can be improved  
describe('App Component', () => {
  beforeEach(() => {
    (fetchPermissions as jest.Mock).mockResolvedValue(mockPermissions);
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  it('shows loading state initially', async () => {
    render(<App />);
    expect(screen.getByTestId('modal-spinner')).toBeInTheDocument();
  });

  it('renders product form when CREATE permission exists', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Product name')).toBeInTheDocument();
    });
  });

  it('renders product table when READ permission exists', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('99.99')).toBeInTheDocument();
      expect(screen.getByText('USD')).toBeInTheDocument();
    });
  });

  it('prevents creating duplicate product names', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Product name')).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText('Product name');
    const priceInput = screen.getByPlaceholderText('Price');
    const currencyInput = screen.getByPlaceholderText('Currency');
    const submitButton = screen.getByText('Add Product');

    fireEvent.change(nameInput, { target: { value: 'Test Product' } });
    fireEvent.change(priceInput, { target: { value: '199.99' } });
    fireEvent.change(currencyInput, { target: { value: 'EUR' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('A product already exists')).toBeInTheDocument();
    });
  });

  it('allows deleting a product', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    const deleteButton = screen.getByText('Delete', { selector: 'button.danger.small' });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByText('Delete', { selector: 'button.danger.medium' });
    
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
    });
  });
});

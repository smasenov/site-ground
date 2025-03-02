import { Permission } from '../types';

export const fetchPermissions = async (): Promise<Permission[]> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        Permission.CREATE,
        Permission.READ,
        Permission.UPDATE,
        Permission.DELETE
      ]);
    }, 500);
  });
}; 
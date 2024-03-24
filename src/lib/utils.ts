import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePaginationRange = (
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const text = `${startItem}-${endItem} of ${totalItems} items`;

  return text;
};

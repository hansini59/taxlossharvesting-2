/**
 * Format a number as currency in INR format
 */
export const formatCurrency = (value: number): string => {
  // Handle very small numbers by showing them in scientific notation
  if (Math.abs(value) < 0.0001 && value !== 0) {
    return value.toExponential(2);
  }

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  
  return formatter.format(value);
};
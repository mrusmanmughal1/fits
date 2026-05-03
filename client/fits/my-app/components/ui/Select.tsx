import React from 'react';
import { cn, generateId } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { label: string; value: string | number }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  options,
  ...props
}) => {
  const inputId = id || generateId();
  const errorClass = error ? 'border-error ring-error/20' : 'border-gray-300 focus:ring-primary/20 focus:border-primary';
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          'block w-full px-4 py-3 text-gray-900 border rounded-xl shadow-sm transition-all focus:ring-4 focus:outline-none bg-white appearance-none',
          errorClass,
          className
        )}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

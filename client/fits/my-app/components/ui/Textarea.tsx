import React from 'react';
import { cn, generateId } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
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
      <textarea
        id={inputId}
        className={cn(
          'block w-full px-4 py-3 text-gray-900 border rounded-xl shadow-sm transition-all focus:ring-4 focus:outline-none placeholder:text-gray-400',
          errorClass,
          className
        )}
        rows={4}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

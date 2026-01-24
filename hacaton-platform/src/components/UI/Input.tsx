import React from 'react';
import type { ChangeEvent } from 'react';

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder = '', type = 'text', error }) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded px-2 py-1 w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Input;
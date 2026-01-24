import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string; //опциональный className для кастомных стилей
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  className = '' // ← Default пустой
}) => {
  const baseClass = `px-4 py-2 rounded font-semibold ${className}`; //добавляем переданный className
  const variantClass = variant === 'primary' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-black hover:bg-gray-400';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseClass} ${variantClass} ${disabledClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
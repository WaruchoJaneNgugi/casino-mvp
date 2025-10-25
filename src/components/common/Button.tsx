import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  onClick,
                                                  variant = 'primary',
                                                  disabled = false,
                                                  size = 'md',
                                              }) => {
    const baseClasses = 'font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95';

    const variantClasses = {
        primary: 'bg-gradient-to-r from-stake-orange to-stake-orange-dark hover:from-stake-orange-dark hover:to-stake-orange-dark text-white glow-orange',
        secondary: 'bg-stake-gray hover:bg-stake-light-gray text-white border border-stake-border',
        success: 'bg-gradient-to-r from-stake-green to-green-600 hover:from-green-600 hover:to-green-700 text-white',
        danger: 'bg-gradient-to-r from-stake-red to-red-600 hover:from-red-600 hover:to-red-700 text-white',
    };

    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-6 py-3',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
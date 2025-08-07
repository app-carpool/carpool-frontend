import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'google' | 'outline'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const baseClasses =
    'px-4 py-2 rounded-md font-regular focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary:
      'bg-dark-2 text-white hover:bg-dark-3 dark:bg-gray-1 dark:text-dark-1 dark:hover:bg-gray-4 cursor-pointer',
    google: 'bg-gray-1/25 border border-gray-4/50 dark:bg-gray-1 dark:text-dark-1 dark:hover:bg-gray-4 cursor-pointer',
    secondary:
      'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline:
      'bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-100 dark:border-gray-5 dark:text-white dark:hover:bg-gray-2 focus:ring-gray-400 cursor-pointer',
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

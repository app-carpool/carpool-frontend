import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
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
      'bg-zinc-950 dark:bg-light text-white hover:bg-zinc-800 focus:ring-zinc-500',
    secondary:
      'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
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

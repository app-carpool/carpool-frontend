import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-dark-4 dark:text-gray-1 font-regular font-inter text-sm">
          {label}
        </label>
      )}
      <input
        className={`border border-gray-300 rounded-md px-3 py-2 dark:bg-background dark:border-gray-2 dark:placeholder-gray-400 dark:text-white
          ${error ? 'border-red-500' : ''}
          ${className ?? ''}
        `}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

'use client'

import React from 'react'

export default function Spinner({
  size = 24,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-t-transparent dark:border-gray-2 border-gray-3 ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

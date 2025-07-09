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
        className={`animate-spin rounded-full border-2 border-t-transparent border-zinc-800 dark:border-white ${className}`}
        style={{ width: size, height: size }}
    />
  )
}

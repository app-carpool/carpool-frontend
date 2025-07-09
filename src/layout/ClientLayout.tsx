'use client'

import MobileNavbar from '@/components/navbar/MobileNavbar'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MobileNavbar />
    </>
  )
}

import DesktopNavbar from "@/components/navbar/DesktopNavbar";

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <DesktopNavbar />
        {children}
    </>
  )
}

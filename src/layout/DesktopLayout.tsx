import DesktopSidebar from "@/components/navbar/DesktopSidebar";


export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DesktopSidebar />
      <main className="ml-64 flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

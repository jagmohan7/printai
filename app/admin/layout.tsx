// Studio has its own layout — no Navbar, Footer, or analytics
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

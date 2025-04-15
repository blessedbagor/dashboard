import Footer from "@/components/footer"
import Header from "@/components/shared/dashboard"


export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex-1 wrapper">
            {children}
        </main>
        <Footer /> 
      </div>
    )
  }
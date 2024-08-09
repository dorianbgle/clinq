import { Header } from "./components/header";
import { Metadata } from "next/types";
import Sidebar from "./components/sidebar";
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "ClinQ | Dashboard",
  description: "Creating better physicians",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="relative">
                <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      
      <nav className="h-screen flex-shrink-0 flex-col justify-between fixed top-0 ml-4 pb-4 items-center hidden md:flex">
        <div className="xflex flex-col items-center justify-center mt-6">
          <div className="flex flex-col gap-1.5">
            {/* Consider placing Tool Tip */}
          <Sidebar />
          </div>
          {/* <IoExitSharp className="items-end flex-end self-end"/> */}
        </div>
      </nav>
      <div className="mx-4 md:ml-[95px] md:mr-10 pb-8">
        <Header />
        {children}
      </div>
      </ThemeProvider>

    </div>
  );
}

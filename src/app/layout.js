import { Inter_Tight } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import EmailProvider from "@/providers/EmailProvider";
import Header from "@/components/Header/Header";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Marginalia",
  description: "A quiet place to discuss things slowly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interTight.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans">
        <AuthProvider>
          <EmailProvider>
            <Header />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </EmailProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./globals.css";
import StoreProvider from "./store/storeProvider";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-family",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}

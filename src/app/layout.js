import { Inter } from "next/font/google";
import "./globals.css";
import NavbarDemo from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather App",
  description: "Developed by Ganesh Mangla",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarDemo />
        {children}
      </body>
    </html>
  );
}

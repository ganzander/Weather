import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather Forecast App",
  description:
    "A modern weather forecast application with detailed information and forecasts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark ${inter.className}`}>{children}</body>
    </html>
  );
}

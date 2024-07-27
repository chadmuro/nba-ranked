import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { cn } from "@/lib/utils";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "NBA, Ranked - Daily NBA Game",
  description: "Rank the players based on the season and stat provided",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
        suppressHydrationWarning={true}
      >
        <ConvexClientProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            {children}
            <footer className="self-center">Chad Murobayashi 2024</footer>
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

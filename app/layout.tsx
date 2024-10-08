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
          <div className="flex min-h-screen flex-col items-center">
            <Header />
            {children}
            <footer className="self-center py-4">
              ©{" "}
              <a
                href="https://www.chadmuro.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Chad Murobayashi
              </a>{" "}
              2024
            </footer>
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

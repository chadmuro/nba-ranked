import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className} suppressHydrationWarning={true}>
        <ConvexClientProvider>
          <div className="flex min-h-screen flex-col">
            <header className="self-end">
              <button>How to play</button>
              <button>Settings</button>
              <select>
                <option>2024-07-26</option>
              </select>
            </header>
            {children}
            <footer className="self-center">Chad Murobayashi 2024</footer>
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

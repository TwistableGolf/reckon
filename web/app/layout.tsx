import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./_trpc/provider";
import TProvider from "./theme/theme-provider";

const inter = Inter({ weight: "200", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reckon",
  description: "Reddit clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <TProvider>
          <Provider>
            {children}
          </Provider>
        </TProvider>
      </body>
    </html>
  );
}

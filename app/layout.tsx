import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Dynamic Form",
  description: "A dynamic form with validation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-y-scroll">
          <Toaster richColors closeButton />
          {children}
      </body>
    </html>
  );
}

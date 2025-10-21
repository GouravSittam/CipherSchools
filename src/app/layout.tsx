import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import Script from "next/script";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "CipherStudio - Browser-Based React IDE",
  description:
    "A fully functional browser-based React IDE that runs entirely in the browser",
  authors: [{ name: "Gourav Chaudhary" }],
  creator: "Gourav Chaudhary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-screen w-screen overflow-hidden">
      <body className="antialiased h-screen w-screen overflow-hidden m-0 p-0">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Script
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
          />
          <div className="h-screen w-screen overflow-hidden">
            {children}
          </div>
          <Toaster />
          <VisualEditsMessenger />
        </ThemeProvider>
      </body>
    </html>
  );
}

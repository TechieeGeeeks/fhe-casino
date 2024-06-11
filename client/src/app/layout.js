import "@/app/globals.css";
import "@/app/expressive-code.css";

import { DM_Sans } from "next/font/google";

import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Navbar />
        {children}
        <div id="drawer"></div>
        <div id="modal"></div>
        <Toaster />
      </body>
    </html>
  );
}

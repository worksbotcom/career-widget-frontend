import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Career Widget",
  description: "Career Widget Saas",
};

export default function RootLayout({ children }) {
 
    return (

        <html lang="en">

            <body>

                <AuthProvider>

                    {children}

                    <Toaster position="top-right" />

                </AuthProvider>

            </body>

        </html>

    );
}

import { Metadata } from "next";
import {Geist} from 'next/font/google';
import '@/assets/styles/global.css';
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from '@next/third-parties/google';

const geist = Geist({subsets: ['latin']});

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description: `${APP_DESCRIPTION}`,
  metadataBase: SERVER_URL ? new URL(SERVER_URL) : undefined
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className}`}>
        <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        >
        {children}
        <Toaster />
        </ThemeProvider>
        </body>
        <GoogleAnalytics gaId="G-T4S69STPFC" />
    </html>
    </>
  )
}

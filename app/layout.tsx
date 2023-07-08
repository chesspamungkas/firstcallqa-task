import './globals.css'
import { Providers } from "@/redux/provider";

export const metadata = {
  title: 'FirstCall QA Technical Challenge',
  description: 'Build a User Management Dashboard using React, Redux, and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body> 
    </html>
  )
}

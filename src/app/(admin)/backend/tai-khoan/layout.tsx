
import type { Metadata } from 'next'

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Login - Admin',
  description: 'Login - Admin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
    {/*${inter.className}*/}
      {children}
    </section>
  )
}

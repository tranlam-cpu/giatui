
import type { Metadata } from 'next'

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'tài khoản - Cửa hàng giặt ủi tiện lợi 151',
  description: 'Dịch vụ giặt ủi ở địa bàn thành phố vĩnh long',
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
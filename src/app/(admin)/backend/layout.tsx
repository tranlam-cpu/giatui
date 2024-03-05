import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';                                   
import 'primereact/resources/primereact.css';  

import type { Metadata } from 'next'
import '../../../styles-admin/globals.scss'
import AdminLayout from '../../../layout/AdminLayout/AdminLayout'
import { ProgressBar } from '../../../components/backend/progressBar'
// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })
import { auth } from '../../../../auth'
// PrimeReactContext - prime
import { PrimeReactProvider } from 'primereact/api';


export const metadata: Metadata = {
  title: 'Admin',
  description: 'Dashboard - Admin',
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  const isAuth=await auth()

  if(!isAuth || isAuth.user.role!=="ADMIN"){
    return (
      <PrimeReactProvider>
        <AdminLayout includeLayout={false}>
          {children}
        </AdminLayout>
      </PrimeReactProvider>
    )
  }

  return (
    <AdminLayout includeLayout={true}>
    {/*${inter.className}*/}
          <ProgressBar />       
        {children}
    </AdminLayout>
  )
}

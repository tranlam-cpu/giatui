'use client'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'





export function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
        
        NProgress.start()
    }, [pathname ]);

    useEffect(() => {
        NProgress.done()
       
    }, [ searchParams]);
    

   
  return null
}

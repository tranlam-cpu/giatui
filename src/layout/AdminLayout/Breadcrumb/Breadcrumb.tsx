'use client'
import React,  {  useState,useEffect } from 'react'
import { Breadcrumb as BSBreadcrumb } from 'react-bootstrap'
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  const [path,setPath]=useState(()=>{
    const bc=pathname.split('/');
    return bc
  })
  
  
  useEffect(() => {
        const bc=pathname.split('/');
        setPath(bc)
  }, [pathname]);
  
  const lang={
    'users': 'danh sách người dùng',
    'banned': 'danh sách người dùng bị cấm',
    'collected': 'Thời gian thu thập'
  }



  return (
    <BSBreadcrumb listProps={{ className: 'mb-0 align-items-center' }}>
    {path?.map((value,idx)=>{
      if(value && path.length-1 === idx){
        return (<BSBreadcrumb.Item key={idx} active>{value==="backend"?"trang chủ":lang[value as keyof typeof lang]}</BSBreadcrumb.Item>)
      }else if(value){
         return (<BSBreadcrumb.Item
          key={idx}
          linkProps={{ className: 'text-decoration-none' }}
          href={`/${lang[value as keyof typeof lang]}`} // Add 'as keyof typeof lang' to allow indexing with a string
        >
          {value==="backend"?"trang chủ":lang[value as keyof typeof lang]}
        </BSBreadcrumb.Item>)
      }
      
    })}
     
      
    </BSBreadcrumb>
  )
}

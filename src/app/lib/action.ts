"use server"

import { redirect } from 'next/navigation';
import { signIn, getStorageSuspended  } from '../../../auth';





export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const data=Object.fromEntries(formData)
    if(data.role==='ADMIN'){
      formData.append('redirectTo', '/backend')
    }

    formData.append('redirectTo', '/don-hang')
   
    await signIn('credentials', data)
    
  } catch (error) {
    
    if ((error as Error).message.includes('CredentialsSignin')) {
      const suspended=await getStorageSuspended()
      if(suspended){
        return 'Tai khoan bi khoa';
      }
    
      return 'CredentialSignin';
    }
    throw error;
  }
}


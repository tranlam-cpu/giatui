'use server'
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { PrismaClient , users } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';



const prisma = new PrismaClient();

let suspended = false;

export async function setStorageSuspended (value:any) {
  suspended = value;
};

export async function getStorageSuspended () {
  return suspended;
};

export async function getUser(email: string) {
  try {
   const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUser(user: any) {
  try {
   const updateUser = await prisma.users.update({
    where: {
      email: user.email,
    },
    data: user,
  })
    return updateUser;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw new Error('Failed to update user.');
  } finally {
    await prisma.$disconnect();
  }
}


export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
      async authorize(credentials) {
        setStorageSuspended(false);
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6), role: z.string() })
          .safeParse(credentials);

          if (parsedCredentials.success) {
            const now = new Date();
            
            const { email, password, role } = parsedCredentials.data;
            
            const user = await getUser(email);


            if (!user) return null

            //banned
            if(user.banned) return null

            if(role !== user.role) return null;
            
            
            if(!user.isActived) return null;
            var time=null;
            if(user.loginAttemptsAt){ 
              time=new Date(user.loginAttemptsAt)
              time.setMinutes(time.getMinutes()+Number(process.env.SUSPENDED))
            }else{
              time=0;
            }
           //suspended

            if(user.isSuspended){
              
              if(now>time){
                // du 15 phut ok
                user.isSuspended=false;
                await updateUser(user);
                console.log("update Suspended")
              }else{
                setStorageSuspended(true);
                return null;
              }
                
               
              
              
            }

            //all ok
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch){
              setStorageSuspended(false);
              user.loginAttempts=0;
              await updateUser(user);
              return user;
            } 

            if(now>time){
              user.loginAttempts=0;
            }

            user.loginAttempts+=1;
            
            user.loginAttemptsAt=now;

            if(user.loginAttempts>5){
              user.isSuspended = true;

              user.loginAttempts=0;
            }

            await updateUser(user);
            console.log('dont update');

          }



          console.log('Invalid credentials');
          return null;
      },
    })],
  callbacks: {
      async session({ session, token }) {  
        session.user.role=token.role
        session.user.banned=token.banned
     
        return session;
      },
      async jwt({ token }) {       
        
        if(token){
          const user = await getUser(token.email as string);
          return user
        }

        return token
      },
      async redirect({ url, baseUrl }) { 
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
            
      },

    }
});


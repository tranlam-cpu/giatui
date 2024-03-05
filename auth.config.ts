import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'
import { auth } from './auth';
import { PrismaClient } from '@prisma/client'




export const authConfig  = {
  pages: {
    signIn: "/tai-khoan" || "/backend/tai-khoan",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
   
      const isLoggedIn = !!auth?.user;
      if(isLoggedIn && auth.user?.banned){
        return false
      }
      
      if(nextUrl.pathname.startsWith('/backend')){
        if(auth && auth.user?.role==='ADMIN'){
          return true
        }else{
          return NextResponse.rewrite(new URL('/backend/tai-khoan', nextUrl)) 
        }
      }
      
      if(isLoggedIn && auth.user?.role==='ADMIN'){
        if(nextUrl.pathname.startsWith('/backend')) return true
      }

      if(isLoggedIn && auth.user?.role==='USER'){
        
        if(nextUrl.pathname.startsWith('/')) return true
      }

      
      
      return false

      // const isOnDashboard = nextUrl.pathname.startsWith('/');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Promise.resolve(new URL('/', nextUrl));
      // }
      // return true;
    },
    session({ session, token }) {  
      
        session.user.role = token.role
        session.user.banned = token.banned

        return session;
      },
  },
  providers: [],
} satisfies NextAuthConfig;



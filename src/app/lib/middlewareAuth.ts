import { NextResponse } from "next/server";
import { auth } from '../../../auth';


type UserRole = "ADMIN" | "USER"

export async function  middlewareAuth (userRole:UserRole) {
    const isAuth=await auth();
    //ADMIN || USER
    if(isAuth && isAuth.user.role===userRole){
        return NextResponse.next();
    }

    return NextResponse.redirect('/login');
   
    
     
 }

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcryptjs';
// import { z } from 'zod';
import { auth } from '../../../../auth'



export async function POST(request:Request) {
	if(request.method == 'POST'){
		const prisma = new PrismaClient()
		const isAuth=await auth();

		
		try {
			if(isAuth && isAuth.user.role==="ADMIN"){
				const req = await request.json()

				const updateUser = await prisma.users.updateMany({
				where: {
					id: { in: req.users },
				},
				data: {
					banned: req.banned,
				},
				}) 	
				return NextResponse.json({success: true, updateUser})
				
			}

			return NextResponse.json({success: false, messages:"not found"})

		}catch(error){
			return NextResponse.json({success: false, messages:"not found"})
		}finally {
		await prisma.$disconnect();
		}
	}
    
}
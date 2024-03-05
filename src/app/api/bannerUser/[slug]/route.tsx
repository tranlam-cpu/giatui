import { NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
// import bcrypt from 'bcryptjs';
// import { z } from 'zod';
import { auth } from '../../../../../auth'



export async function POST(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	const prisma = new PrismaClient()
	const isAuth=await auth();

  	
	try {
		if(isAuth && isAuth.user.role==="ADMIN"){
			if(request.method == 'PUT'){
				const slugId = params.slug
				const req = await request.json()

				const updateUser = await prisma.users.update({
				  where: {
				    id: slugId,
				  },
				  data: {
				    banned: !req.banned,
				  },
				}) 	
				return NextResponse.json({success: true, updateUser})
			}
			
		}

		return NextResponse.json({success: false, messages:"error"}, {
			status: 400,
		  })

	}catch(error){
		return NextResponse.json({success: false, messages:"error"}, {
			status: 400,
		  })
	}finally {
	  await prisma.$disconnect();
	}
  	
    
}
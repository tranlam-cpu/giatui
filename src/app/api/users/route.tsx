import { NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { auth } from '../../../../auth'


export async function GET() {
	const prisma = new PrismaClient()
	const isAuth=await auth();
	try {
		if(isAuth && isAuth.user.role==="ADMIN"){
			const users = await prisma.users.findMany({
				where:{
					role:'USER'
				}
			});
			return NextResponse.json({success: true, users})
		}
		return NextResponse.json({success: false, messages:"not found"})
	}catch(error){
  		console.log(error);
    }finally {
      await prisma.$disconnect();
    }
	
}

const userSchema=z
	.object({
		email: z.string().email('Invalid email'), 
		password: z.string().min(6,'password must have than 6 character').max(16)
	})


export async function POST(request:Request) {
	const prisma = new PrismaClient()
	 // const { searchParams } = new URL(request.url)
  //request.method == DELETE
  // const id = searchParams.get('id')
  	if(request.method == 'POST'){
  		try {
			const res = await request.json() 		

			const {email, password} = userSchema.parse(res);

			const user = await prisma.users.findUnique({
				where: {
					email: email,
				},
			})

			//invalid email
			if(user) return NextResponse.json({success: false, message: 'Missing username and password'},{ status: 400 })

			// Hash the password
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);

			const data = await prisma.users.create({
			data: {
				email: email,
				password: hashedPassword,
				isActived: true
			},
			})

			return NextResponse.json({success:true,data})

	    }catch(error){
			return NextResponse.json({success: false, messages:"error"}, {
				status: 400,
			  })
	    }finally {
	      await prisma.$disconnect();
	    }
  	}
    
}
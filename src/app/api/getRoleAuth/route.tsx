import { NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'

export async function POST(request:Request) {
	const prisma = new PrismaClient()
	
  	if(request.method == 'POST'){
		try {
  		const res = await request.json() 		

		return NextResponse.json({success:true,res})

	    }catch(error){
			return NextResponse.json({success: false, messages:"error"}, {
				status: 400,
			  })
	    }finally {
	      await prisma.$disconnect();
	    }
  	}
    
}
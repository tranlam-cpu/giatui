import { middlewareAuth } from "@/app/lib/middlewareAuth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    
    // await middlewareAuth("ADMIN");
    
	const prisma = new PrismaClient()
	
	try {
        const collecteds = await prisma.collected.findMany({ 
            include:{
                daytime:{
                    select:{
                        name:true
                    }
                },
            },
            orderBy:{
                daytimeId:'asc'
            }
        });
        
        const flattenedCollectedsArray = collecteds.map((collected) => {
            const flattenedCollectedItem={
                'id':collected.id,
                'start':collected.start,
                'end':collected.end,
                'daytime':collected.daytime.name
            }


            return flattenedCollectedItem
        })
        
        return NextResponse.json({'collecteds':flattenedCollectedsArray},{status:200})
	}catch(error){
  		return NextResponse.json({success: false, messages:"not found"},{status:404})
    }finally {
      await prisma.$disconnect();
    }
}

export async function POST(request:NextRequest){
    //check if user is admin
    await middlewareAuth("ADMIN");

    const prisma = new PrismaClient()
    try{
        const body = await request.json();
        
        const collected =await prisma.collected.create({
            data:body
        });
        
        return NextResponse.json({collected},{status:201})
    }catch(error){
        return NextResponse.json({success: false, messages:"not found"},{status:404})
    }finally{
        await prisma.$disconnect();
    }
    
   
}
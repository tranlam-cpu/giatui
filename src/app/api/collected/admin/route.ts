

import { middlewareAuth } from "@/app/lib/middlewareAuth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function GET() {
    await middlewareAuth("ADMIN");
    
	const prisma = new PrismaClient()

    try{
        const collecteds=await prisma.collected.findMany({
            include:{
                daytime:{
                    select:{
                        name:true,
                        image:true
                    }
                }
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
                'active':collected.active,
                'daytimeId':collected.daytimeId,
                'daytimeName':collected.daytime.name,
                'daytimeImage':collected.daytime.image,
                
            }

            return flattenedCollectedItem
        })

        return NextResponse.json({'collecteds':flattenedCollectedsArray},{status:200})
    }catch(error){
        return NextResponse.json({success: false, messages:"not found"},{status:404})
    }finally{
        await prisma.$disconnect();
    }

}
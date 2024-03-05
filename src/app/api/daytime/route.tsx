import { middlewareAuth } from "@/app/lib/middlewareAuth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { setStorageStateUpload } from "@/app/utils/storageState";


const s3Client=new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY+"",
        secretAccessKey: process.env.S3_SECRET_KEY+"",
    }
})

export async function GET() {
    
    await middlewareAuth("ADMIN");
    
	const prisma = new PrismaClient()
	
	try {
        const daytimes = await prisma.daytime.findMany();
        return NextResponse.json({daytimes})
	}catch(error){
  		return NextResponse.json({success: false, messages:"not found"},{status:404})
    }finally {
      await prisma.$disconnect();
    }
}


async function updateFileOnSql(image:any,name:string,id:string){
    const prisma = new PrismaClient()	

    try {
        const daytime = await prisma.daytime.update({
            where: {id: id},
            data: {
                name:name,
                image:image
            }
        })
        
        return daytime
        
    }catch(error){
        return NextResponse.json({success: false, messages:"not found"}, {
            status: 400,
          })
    }finally {
      await prisma.$disconnect();
    }
}


export async function PUT(request:NextRequest){
    await middlewareAuth("ADMIN");

    const body = await request.formData(); 
    console.log(body)
    const file:any= body.get('Image')
    const name=body.get('name')
    const image=body.get('image')
    const id = body.get('id')
    //check if input is not found
    if(!name || !image){
        return NextResponse.json({success: false, messages:"file not found"}, {
            status: 400,
        })
    }

    let imageUpdate:any=image
    //check if has file 
    if(file){
        //upload new file to S3 - AWS
        const buffer = Buffer.from(await file?.arrayBuffer())
        const filename = Date.now() + file.name.replaceAll(" ", "_");
        imageUpdate=await upLoadFileToS3(buffer,filename)

        //delete old file on s3
        const imageId=(image as string).split('images/')[1]
        const arrImageId=[imageId]
        await deleteFileonS3(arrImageId as [])

    }
    
    //update file on sql
    try{
        const daytime=await updateFileOnSql(imageUpdate,name?.toString() as string,id?.toString() as string)
        return NextResponse.json(daytime)
    }catch(error){
        return NextResponse.json({success: false, messages:"error upload file"}, {
            status: 400,
          })
    }
        
    
}


async function deleteFileonS3(arrayFilename:[]){
    //data= [
    //     {
    //         key: `images/imageID`
    //     },
    //     {
    //         key: `images/imageID`
    //     }
    // ]

    try{
        const data=arrayFilename.reduce((acc:any,cur:any,index:any)=>{
            acc[index]={Key: `images/${cur}`}
            return acc
        },[])
    
        const params={
            Bucket: process.env.S3_STORE_NAME+"",
            Delete:{
                Objects: data
            }
        }
        // delete marker s3
        const command=new DeleteObjectsCommand(params);
        await s3Client.send(command);
    }catch(error){
        throw new Error("error delete file on s3")
    }
    
   
}


export async function DELETE(request:NextRequest){
    await middlewareAuth("ADMIN");
    
    const req = await request.json()
    const prisma = new PrismaClient()
    try{
        
        await deleteFileonS3(req)
             

        const deleteDaytime=await prisma.daytime.deleteMany({
            where: {
                id: { in: req }
            }
        })

        return NextResponse.json({deleteDaytime})
    }catch(error){
        return NextResponse.json({success: false, messages:"not found"}, {
            status: 400,
          })
    }finally {
      await prisma.$disconnect();
    }

}
//upload file - add daytime to sql
export async function POST(request:NextRequest){
    //check if user is admin
    await middlewareAuth("ADMIN");

    
    try{
        const body = await request.formData(); 
        const file:any= body.get('image[]')
	    const name=body.get('name')
        //check if file is not found
        if(!file){
            return NextResponse.json({success: false, messages:"file not found"}, {
                status: 400,
            })
        }

        //upload file to S3 - AWS     
        const buffer = Buffer.from(await file?.arrayBuffer())
        const filename = Date.now() + file.name.replaceAll(" ", "_");
        const upload=await upLoadFileToS3(buffer,filename)

        //upload file to sql
        const uploadSql=await uploadFileOnSql(upload,name?.toString() as string)
        return await Promise.all([upload,uploadSql])
            .then((result) => {
                setStorageStateUpload(false);
                return NextResponse.json(result[1])
            })
            .catch(error => {
                console.log(error)
                throw new Error("error upload file to sql")
            });

    }catch(error){
        return NextResponse.json({success: false, messages:"error upload file"}, {
            status: 400,
          })
    }
}

//upload file to S3
async function upLoadFileToS3(file:any,filename:string){
    try{
        const fileBuffer=file;
        const key=`${filename}-${Date.now()}`
        const params={
            Bucket: process.env.S3_STORE_NAME+"",
            Key: `images/${key}`,
            Body: fileBuffer,
            ContentType: "image/jpeg"
        }

        const command=new PutObjectCommand(params);
        await s3Client.send(command);
        
        return new Promise(async (resolve)=>{
            //set storage state upload
            await setStorageStateUpload(true);
            setTimeout(()=>{resolve(`${process.env.S3_LINK}${key}`)},0)
            
        })
    }catch(error){
        console.log(error)
        throw new Error("error upload file to s3")
    } 
}

//upload file to sql
async function uploadFileOnSql(ImageFromUploadFile:any,name:string){
	const prisma = new PrismaClient()	

try {

    const daytime = await prisma.daytime.create({
        data:{
            name: name,
            image: ImageFromUploadFile as string
        }
    })
    
    return daytime
    
}catch(error){
		return NextResponse.json({success: false, messages:"not found"}, {
			status: 400,
		  })
    }finally {
      await prisma.$disconnect();
    }
}

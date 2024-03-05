
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { google } from 'googleapis';
import { promises } from 'fs';
import fs from 'fs';
import { auth } from '../../../../auth';
import path from "path";
import { setStorageStateUpload } from '../../utils/storageState';







export async function GET() {
	const prisma = new PrismaClient()
	const isAuth=await auth();
	try {
		if(isAuth && isAuth.user.role==="ADMIN"){
			const daytimes = await prisma.daytime.findMany();
			return NextResponse.json({daytimes})
		}
		return NextResponse.json({success: false, messages:"not found"})
	}catch(error){
  		console.log(error);
    }finally {
      await prisma.$disconnect();
    }
	
}

//google drive upload
const oauth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.REDIRECT_URL
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

//task 0 -upload file to server
async function uploadFileToServer(file:any){
	//upload file to server
	try{
		const buffer = Buffer.from(await file.arrayBuffer());
		const filename = Date.now() + file.name.replaceAll(" ", "_");
		await promises.writeFile(
			path.join(process.cwd(), "public/uploads/" + filename),
			buffer
		);

		return new Promise(resolve=>{
			setStorageStateUpload(true);
			resolve(filename)
		})
	}catch(error){
		NextResponse.json({success: false, messages:"error"}, {
			status: 400,
		  })
	}
	
}

//task 1 - upload image to google drive
async function uploadFile(file:any,filename:any){
	
	//upload file to google drive
	const response = await drive.files.create({
	requestBody: {
		name: file.name,
		mimeType: file.type,
	},
	media: {
		mimeType: file.type,
		body: await fs.createReadStream(path.join(process.cwd(),"public/uploads/" + filename)),
	},
	});
	
	//delete file in server
	await promises.unlink(path.join(process.cwd(),"public/uploads/" + filename));

	return new Promise(resolve=>{
		resolve(response.data.id)
	})
}

//task 2 - upload image to sql
async function uploadFileOnSql(ImageFromUploadFile:any,name:string){
	const prisma = new PrismaClient()	

	try {

		const daytime = await prisma.daytime.create({
			data:{
				name:name,
				image:ImageFromUploadFile
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



export async function POST(request:any) {
	const prisma = new PrismaClient()
	// const { searchParams } = new URL(request.url)
    //request.method == DELETE
    // const id = searchParams.get('id')
  	if(request.method == 'POST'){
  		try {
			const isAuth=await auth();

			//check role
			if(isAuth && isAuth.user.role==="ADMIN"){
				const body = await request.formData(); 	
				const file= body.get('image[]')
				const name=body.get('name')
				
				
				

				//upload file to server
				const task0=await uploadFileToServer(file);
				//upload file to google drive
				const task1=await uploadFile(file,task0);
				
				//upload file to sql
				const task2=await uploadFileOnSql(task1,name);

				return await Promise.all([task0,task1,task2])
					.then((result) => {
						setStorageStateUpload(false);
						return NextResponse.json(result[2])
					})
					.catch(error => {
						console.error('Error:', error);
					});
				

				
				
			}
			return NextResponse.json({success: false, messages:"not found"})

	    }catch(error){
	  		console.log(error);
			return NextResponse.json({success: false, messages:"error"}, {
				status: 400,
			  })
	    }finally {
	      await prisma.$disconnect();
	    }
  	}
    
}





//delete AWS image
// const params ={
//     Bucket:process.env.AWS_BUCKET_NAME,
//     Key:req.params.imageName
// }
// try {
//     const data = await s3.send(new DeleteObjectCommand(params));
//     return res.status(200).json({ success: data, status: true });
//     // console.log("Success. Object deleted.", data);
//     // return data; // For unit tests.
//   } catch (err) {
//     return res.status(404).json({ error: err, status: false  });
//   }
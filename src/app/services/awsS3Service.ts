import { S3Client, PutObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";

const s3Client=new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY+"",
        secretAccessKey: process.env.S3_SECRET_KEY+"",
    }
})

export async function deleteFileonS3(arrayFilename:[]){
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


//upload file to S3
export async function upLoadFileToS3(file:any,filename:string){
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
            setTimeout(()=>{resolve(`${process.env.S3_LINK}${key}`)},0)
            
        })
    }catch(error){
        console.log(error)
        throw new Error("error upload file to s3")
    } 
}
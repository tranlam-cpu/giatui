
// import { useContext } from 'react';
import { getStorageStateUpload } from '../../utils/storageState';
// import { StateContext } from '@/app/contexts/StateContext';
// import { NextResponse } from 'next/server';


export async function GET(request: Request) {
    // const  state  = useContext(StateContext);
    // console.log(state)
  
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    
    console.log("server running111")

    let statusWriter=false;
    // Set headers for SSE
    const response = new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    
    
    // Send a message every second
    // const intervalId = setInterval(async () => {
    //   let state=await getStorageStateUpload()
    //   console.log("state: "+ state)
    //   if (state === true) {
    //     const data = `data: ${JSON.stringify({ state })}\n\n`;
    //     writer.write(data);
    //     console.log("send mess")
    //     writer.close();
    //     clearInterval(intervalId);
    //   }
      
    // }, 1000);

    const timeout = (ms:number) => {
      return new Promise((_, reject) => {
        setTimeout(() => {
          clearTimeout(timeoutId);
          if(statusWriter==false){
            statusWriter=true;
            writer.close();
          }
          reject(new Error('Timed out'))
        }, ms);
      });
    };

    let timeoutId:any;
    const sendEvent = async () => {
      try {
        let state = await Promise.race([await getStorageStateUpload(), timeout(6000)]);
        
        console.log("state: " + state);
        if (state === true) {
          const data = `data: ${JSON.stringify({ state })}\n\n`;
          writer.write(data);
          console.log("send mess");
          writer.close();
          statusWriter=true;
        } else {
          // Schedule the next event
          timeoutId = setTimeout(sendEvent, 1000);
        }
      } catch (error) {
        console.error("Failed to get storage state upload:", error);
        writer.close();
      }
    };


    //Stop sending messages when the client disconnects
    // request.signal.addEventListener('abort', () => {
    //   console.log("clear")
    //   clearInterval(intervalId);
    //   writer.close();
    // });

    // Start sending events
    sendEvent();

    // Stop sending messages when the client disconnects
    request.signal.addEventListener('abort', () => {
      console.log("clear");
      clearTimeout(timeoutId);
      if(statusWriter==false){
        statusWriter=true;
        writer.close();
      }
      
    });
  
    return response;
  }


 
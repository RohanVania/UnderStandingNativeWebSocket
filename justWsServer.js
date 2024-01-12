import http from "http";
import  { WebSocketServer } from "ws";

const server=http.createServer((req,res)=>{
    res.end("I am connected");
})

const ws=new WebSocketServer({server:server});

ws.on('connection',(websocket,req)=>{
    // console.log(websocket);
    websocket.send("Welcome to the web Socket Sercer")
    websocket.on('message', (data) => {
        // const message = data.toString('utf-8');
        console.log("Data received from frontend", data.toString());
    });
    

})


ws.on('headers',(headers,req)=>{
    console.log(headers);
})




server.listen(8000);


const express=require("express");
const socketio=require("socket.io");

const app=express();
app.use(express.static('public'))

app.get("/",(req,res)=>{
    res.end("Backend Server Running at 8003")
})

const expressServer=app.listen(8003,()=>console.log("Server Started Running"))

//** IO equals the server Object */
const io=socketio(expressServer,{
    // transports:['websocket'],
    // allowUpgrades:false,
    // serveClient:false
});

io.on('connection',(socket)=>{

    console.log("Socket Id at Server Side ",socket.id)
    // socket.emit('messageFromServer',{data:"Are you excited to learn Socket Io ?"})
  
    // socket.on("replytoMessageFromServer",(data)=>{
    //     console.log(data)
    // })

    socket.on('messageToServer',(dataFromClient)=>{
        io.emit('replyFromServer',{text:dataFromClient.text});
    })
    
})
const express=require("express");
const socketio=require("socket.io");

const app=express();
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.end('I am Inside the Server');        
})

const expressServer=app.listen(8001,()=>console.log("Server Started Running on 8001"));
const io=socketio(expressServer);

io.on('connection',(socket)=>{
    console.log(socket.id," has Connected")
    socket.emit()
    socket.send()
})
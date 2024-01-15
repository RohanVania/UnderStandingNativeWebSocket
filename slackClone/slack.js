import express from "express";
import {Server} from "socket.io";
import {namespacesArray as namespacesData} from "./data/Namespaces.js"

const app=express();
app.use(express.static('public'))

app.get("/",(req,res)=>{
    res.end("Backend Server Started Running")
})

const expressServer=app.listen(8004,()=>console.log("Server Running on Local Host :8004"))

const socketio=new Server(expressServer);

socketio.on('connection',(socket)=>{
    socket.emit('welcome',"Welcome to Socket IO Server : Connected")
    socket.on('clientFirstMessage',(data)=>{
        console.log(data)
    })

    socket.emit('nsList',namespacesData);

})
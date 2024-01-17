const express=require("express");
const socketio=require("socket.io");

const app=express();
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.end('I am Inside the Server');        
})

const expressServer=app.listen(8001,()=>console.log("Server Started Running on 8001"));
const io=socketio(expressServer);

//** Room are just server thing client does not known anything about room */
//** Namespace is multiplexing concept */

io.on('connection',(socket)=>{
    console.log(socket.id," has Connected")
    socket.on('messagetoClientonFormSubmit',(data)=>{
        io.emit('emittingtoallClients',data)
    })
})
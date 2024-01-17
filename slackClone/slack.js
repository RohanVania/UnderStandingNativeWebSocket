import express from "express";
import { Server } from "socket.io";
import { namespacesArray, namespacesArray as namespacesData } from "./data/Namespaces.js"
import RoomClass from "./class/RoomClass.js";

const app = express();
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.end("Backend Server Started Running")
})

const expressServer = app.listen(8004, () => console.log("Server Running on Local Host :8004"))

const socketio = new Server(expressServer);

socketio.on('connection', (socket) => {
    console.log(socket.id, ' has connected ')
    socket.emit('welcome', "Welcome to Socket IO Server : Connected")
    socket.on('clientFirstMessage', (data) => {
        console.log(data)
    })

    socket.emit('nsList', namespacesData);
})


namespacesData.forEach((el, indx) => {
    socketio.of(el.ns).on('connection', (socket) => {
        // console.log(socket.id,' has connected to ',el.ns);
        //* Join Room
        socket.on('joinRoom', (data) => {
            console.log(data)
            socket.join(data);
        })
    })
})



app.get('/change-ns', (req, res) => {
    namespacesArray[0].addRoom(new RoomClass(3, 'Delete Article', 0))
    res.json(namespacesArray[0]);
    socketio.of(namespacesArray[0].ns).emit('nsChange', namespacesArray[0]);
})

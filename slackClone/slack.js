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

         //* Submitted Message and then emit to all sockets connected to the room
         socket.on('newMessageToRoom', messageobj => {
            console.log(messageobj);
            //* Broadcast this to all the connected clients ... to this room only
            const socketrooms=socket.rooms;
            const currentRoom=[...socketrooms][1];

            socketio.of(el.ns).in(currentRoom).emit('messageToRoom',messageobj);
            // console.log(currentRoom);
            console.log(el)
            const thisRoom=el.room.find(room=>room.roomTitle===currentRoom);
            thisRoom.addMessage(messageobj); 
        })

        //* Join Room
        socket.on('joinRoom', async (roomObj, ackCallBack) => {

            //* fetch History
            console.log(roomObj)

            const thisNs=el
            // console.log(thisNs)
            const thisRoomObj=thisNs.room.find(room=>room.roomTitle===roomObj.roomTitle);
            const thisRoomHistory=thisRoomObj.history;



            //* Before Jining a new room , make sure the client leaves other rooms

            const socketrooms = socket.rooms;

            let i = 0;
            socketrooms.forEach(room => {
                if (!i == 0) {
                    socket.leave(room)
                }
                i++;
            })

            socket.join(roomObj.roomTitle);

            //** IF someone joins emit it to all clients connected to that socket  */
            // socket.of()

            //* fetch number of sockets in the room
            const sockets = await socketio.of(el.ns).in(roomObj.roomTitle).fetchSockets();
            ackCallBack({
                numberofClientsConnectedtoThisRoom: sockets.length,
                thisRoomHistory
            })

            //** Need to fetch History */
            //** Note Room Title is coming from the browser which is not safe */
            //** Do some kind of auth */

        })

    })

})





app.get('/change-ns', (req, res) => {
    namespacesArray[0].addRoom(new RoomClass(3, 'Delete Article', 0))
    res.json(namespacesArray[0]);
    socketio.of(namespacesArray[0].ns).emit('nsChange', namespacesArray[0]);
})

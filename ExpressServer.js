import express from "express";
// import {createServer} from "http"
import {WebSocketServer} from "ws";

const app = express();
// const server = createServer(app);

const server=app.listen(8001, () => {
    console.log("Server Started");
});


const ws = new WebSocketServer({ server:server });

ws.on('connection', (websocket, req) => {
    websocket.send("Welcome to the WebSocket Server");
    // 1. One way to Receive Message from Client. In this we get data in Human Readable Format
    // websocket.onmessage=(data)=>{console.log(data.data)}
    // 2. Second way to Receieve Message from the Client, In this we get data in Buffered Forat, We have to convert it to humanReadable Format
    websocket.on('message',(data)=>{
        console.log(data.toString())
    })
});

ws.on('headers', (headers, req) => {
    console.log(headers);
});

app.get('/', (req, res) => {
    res.end("I am Express Server Running on Localhost:8001");
});


const express = require('express');
const path = require('path');
const {Server} = require('socket.io')
const http = require('http');

require('dotenv').config();

const app = express(); 
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const io = new Server(server);
app.use(express.static(path.resolve("./public")))

io.on('connection', (socket)=>{
    socket.on('message',message=>{
        io.emit("message", message)
    })
})

app.get('/',(req,res)=>{
    return res.sendFile('/public/index.html')
})

server.listen(PORT, ()=> console.log('server runs on the server'))
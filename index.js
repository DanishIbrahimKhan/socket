const express = require('express');
const path = require('path');
const {Server} = require('socket.io')
const http = require('http');

require('dotenv').config();

const app = express(); 
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const io = new Server(server);
app.use(express.json())
app.use(express.static(path.resolve("./public")))

io.on('connection', (socket)=>{
    socket.on('message',message=>{
        io.emit("message", message)
    })
})
app.post('/webhook', (req, res) => {
    const response = req.body; // Access the body of the incoming request
    console.log(response.repository); // Log the request body to the console
    return res.status(200).send('Webhook received'); // Send a response back to the client
});
app.get('/api',(req,res) =>{
    return res.status(200).json({message:"hello"})
})

app.get('/',(req,res)=>{
    return res.sendFile('/public/index.html')
})

server.listen(PORT, ()=> console.log('server runs on the server'))
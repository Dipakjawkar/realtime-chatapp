const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require('cors')
const socket = require('socket.io')
const path = require('path')
require("dotenv").config();
require("./db/Connect")


const app = express();

app.use(cookieParser())
app.use(cors())
app.use(express.static(path.resolve(__dirname,'build')))
app.use(express.json());
app.use('/api/v1/user',require('./routes/userRoutes'))
app.use('/api/v1/message',require('./routes/messageRoutes'))

const PORT = process.env.PORT || 8080

const server = app.listen(PORT,()=>{
    console.log(`Server Start on Port : ${PORT}`)
})

const io = socket(server,{
    cors:{
        origin:"/",
        credentials:true
    }

})
io.on("connection", (socket) => {
    console.log("Socket io connected");

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`Socket joined room: ${room}`);
    });

    socket.on('sendMsg', (msg) => {
        const { to, from, message } = msg;
      
        socket.to(to).emit('getMessage', message);
    });
});

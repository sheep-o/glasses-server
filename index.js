const express = require('express')
const app = express()
const server = require('http').Server(app)
const { Server } = require("socket.io");

const io = new Server({});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('user connected')
})

server.listen(80, _ => {
  console.log('listening')
})
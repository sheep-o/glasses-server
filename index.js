const express = require('express')
const app = express()
const server = require('http').Server(app)
const { Server } = require("socket.io");
const fs = require('fs')
const NodeWebcam = require('node-webcam')
const opts = {
  width: 720,
  height: 10,
  quality: 10,
  frames: 1,
  delay: 0,
  saveShots: false,
  callbackReturn: 'base64',
  device: false
}
const Webcam = NodeWebcam.create( opts )

const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('user connected')
})

server.listen(80, _ => {
  console.log('listening')

  setInterval(_ => {
  //  io.emit('update img', brandonData)
      NodeWebcam.capture( "test_picture", opts, (err, data) => {
      //io.emit('update img', data)
        io.emit('update img', data)
        //io.emit('update img', image.getBase64())
      })
      .catch(err => {
        console.error(err)
      })
  }, 500)
})
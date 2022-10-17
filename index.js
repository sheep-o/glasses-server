const express = require('express')
const app = express()
const server = require('http').Server(app)
const { Server } = require("socket.io");
const fs = require('fs')

const tesseract = require("node-tesseract-ocr")

const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('user connected')

  const config = {
    lang: "eng"
  }

  tesseract
    .recognize('./eng_bw.png', config)
    .then((text) => {
      console.log("Result:", text)
    })
    .catch((error) => {
      console.log(error.message)
    })

})

var brandonData

server.listen(80, _ => {
  console.log('listening')

  brandonData = fs.readFileSync('brandonshoe.jpg').toString('base64')

  toggle = false

  setInterval(_ => {
    io.emit('update img', brandonData)
  }, 100)
})
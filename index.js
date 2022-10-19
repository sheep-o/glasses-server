const express = require('express')
const app = express()
const server = require('http').Server(app)
const { Server } = require("socket.io");
const fs = require('fs')
const jimp = require('jimp')
//const tesseract = require("node-tesseract-ocr")
const NodeWebcam = require('node-webcam')
const opts = {
  width: 1280,
  height: 720,
  quality: 10,
  frames: 1,
  delay: 0,
  saveShots: false,
  callbackReturn: 'buffer',
  device: false
}
const Webcam = NodeWebcam.create( opts )

const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('user connected')
  
  // const config = {
  //   lang: "eng"
  // }

  // tesseract
  //   .recognize('./eng_bw.png', config)
  //   .then((text) => {
  //     console.log("Result:", text)
  //   })
  //   .catch((error) => {
  //     console.log(error.message)
  //   })

})

function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}

server.listen(80, _ => {
  console.log('listening')

  //brandonData = fs.readFileSync('brandonshoe.jpg').toString('base64')

  toggle = false

  setInterval(_ => {
  //  io.emit('update img', brandonData)
    NodeWebcam.capture( "test_picture", opts, (err, data) => {
      //io.emit('update img', data)
      jimp.read(data)
      .then(image => {
        image.mirror(true, false, (err, image) => {
          image.getBase64Async(jimp.AUTO)
          .then(base64 =>
          {
              io.emit('update img', base64)
          })
          .catch(err =>
          {
              console.error(err);
          });
        })

        
        //io.emit('update img', image.getBase64())
      })
      .catch(err => {
        console.error(err)
      })
    })
  }, 500)
})
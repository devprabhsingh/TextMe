const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')
const mongoose = require('mongoose')
const upload = require('express-fileupload');
const {ExpressPeerServer} = require('peer')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config()


const app = express()
const server = http.Server(app)

const io = socketio(server, {
  cors: {
    origin: '*',
  }
})

const peerServer = ExpressPeerServer(server,{
  debug:true,
  allow_discovery:true
})

app.use('/peerjs',peerServer)
app.use(upload())
app.use(cors())
app.use(express.json())


let usersList = []
let peerList = []
io.on('connection',socket=>{
  console.log('new conn..')
  

  socket.on('email',email=>{
    usersList.push({
      id:socket.id,
      email
    })
    io.emit('usersList',usersList)
  })

  
  socket.on('message',msg=>{
    socket.broadcast.to(msg.recieverId).emit('message',msg)
  })

  socket.on('enableVideo',(enableVideo,id)=>[
    socket.broadcast.to(id).emit('isEnableVideo',enableVideo)
  ])
  socket.on('newConn',(peerId,email)=>{
    console.log('new peer conn')
    peerList.push({
      peerId,email
    })
    io.emit('peerList',peerList)

  })

  socket.on('disconnect',()=>{
    for(let i=0; i < usersList.length; i++){
                    
      if(usersList[i].id === socket.id){
          for(let j=0; j < peerList.length; j++){
                    
            if(peerList[j].email === usersList[i].email){
                peerList.splice(j,1); // at position i remove one item
            }
          }
          usersList.splice(i,1); // at position i remove one item
        
      }
    }
    io.emit('exit',usersList); 
  })

})




//connecting to Database
mongoose
  .connect(process.env.CONNECT_DB)
  .then(()=>console.log('MongoDB Connected'))
  .catch(err => console.error(err))
  

app.use('/auth',authRoutes)
app.use('/',userRoutes)



// serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'))

  app.get ('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

const port = process.env.PORT || 5000
server.listen(port, ()=>{`server running on port ${port}`})
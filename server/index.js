const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const { addUser , removeUser ,  getUser , getUsersInRoom } =require('./users')

const PORT = process.env.PORT || 5000 ;


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', (socket) => {
 // la une fois que l'evenement join est activé par le login d'un utilisateur le serveur socket
 //envoie directement un message de bienvenu 
    socket.on('join',({ name, room } , callback ) => {
        
        const {error , user } = addUser({ id : socket.id , name,room} );
        if(error) return callback(error);
        socket.emit('message',{ user : 'admin' , text : `${user.name},welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user : 'admin' , text : `${user.name},has joined now  ! `});
        //io.to(user.room).emit('roomData', { room : user.room , users : getUsersInRoom(user.room)});    

        
        socket.join(user.room);

        callback(); 
    })
    // aussi la une fois l'evenement sendMessage est la  le serveur socket prend le paramètre envoyé qui est le message
    // et l'envoie vers la partie FrontEnd vers la user.room 
     socket.on('sendMessage' , (message,callback) => {
         const user = getUser(socket.id);
         io.to(user.room).emit('message', { user : user.name , text : message});

         callback();
     })

    socket.on('disconnect',() => {
        console.log('user had left')
        const user = removeUser(socket.id);
        //cette partie st responsable de la suprssion du user aprés son logout 
        if(user){
            socket.broadcast.to(user.room).emit('message',{user : 'admin' , text : `${user.name},has left  ! `});  
            //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }

        
    })
});

server.listen(PORT,() => console.log(`servere has started on port ${PORT}`)); 


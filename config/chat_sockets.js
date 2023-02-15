module.exports.chatSockets = function(socketServer){

    console.log("this is soketServer", socketServer);

    let io = require("socket.io")(socketServer, {
        cors: {
            origin: "http://localhost:3000",
            method: ["GET", "POST"]
        }
    });

    io.sockets.on('connection', function(socket){
      console.log("new connection received", socket.id);
      socket.on("disconnect", function () {
        console.log("socket disconnected!");
      });

      socket.on("join_room", function (data) {
        console.log("joining req rec.", data);
        socket.join(data.chatroom);

        io.in(data.chatroom).emit("user_joined", data);
      });

      socket.on("user_joined", function (data) {
        console.log("a user joined", data);
      });

      // CHANGE :: detect send_message and broadcast to everyone in the room
      socket.on("send_message", function (data) {
        io.in(data.chatroom).emit("receive_message", data);

      });
              
    })
} 
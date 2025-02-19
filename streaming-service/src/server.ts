import net from 'net';
import { WebSocket, WebSocketServer } from 'ws';

const TCP_PORT = parseInt(process.env.TCP_PORT || '12000', 10);

const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: 8080 });

const fs = require('fs');


tcpServer.on('connection', (socket) => {
    console.log('TCP client connected');
    
    socket.on('data', (msg) => {
        console.log(msg.toString());

        // HINT: what happens if the JSON in the received message is formatted incorrectly?
        // HINT: see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        try {
            // console.log(msg.toString());
            let ReceivedMsg = msg.toString(); //making the buffer into a string
            // console.log("This is the sliced string"+msg.toString().slice(0,-1));
            if(ReceivedMsg.endsWith("}}")) { //checking the format of the JSON
                let NewMsg = ReceivedMsg.slice(0,-1); // slicing last bracket to fix JSON syntax
                ReceivedMsg = NewMsg //storing the correct msg JSON syntax into the message
            }
            let currJSON = JSON.parse(ReceivedMsg); //parsing the received messsage

            if ((currJSON.battery_temperature > 80) || (currJSON.battery_temperature < 20)) {
                let TempTime = Date.now()/1000; //time in seconds
                // let myfile = open('Battery-Temp.txt','r');
                fs.appendFileSync("Battery-Temp.txt", TempTime); //append time to the file

                // write the time at which the battery exceded the temperature ot a file
                // when this if statement is accessed again, read the third last line (time),
                // (which would now be the third newest time) in the file and then compare it with the newest time (which we just received).
                // subtract the newwest time we just received and the now third newest time from the file and check whether 5 seconds has elapsed
            }
        }
        catch(error1){
        console.error(error1);}

        websocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(msg.toString());
            }
          });
    });

    socket.on('end', () => {
        console.log('Closing connection with the TCP client');
    });
    
    socket.on('error', (err) => {
        console.log('TCP client error: ', err);
    });
});

websocketServer.on('listening', () => console.log('Websocket server started'));

websocketServer.on('connection', async (ws: WebSocket) => {
    console.log('Frontend websocket client connected to websocket server');
    ws.on('error', console.error);  
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP server listening on port ${TCP_PORT}`);
});



const server = require('http').createServer()

const os = require('os-utils');

const io = require('socket.io')(server, {
    transports:['websocket','polling']
});
let time = new Date();
time.getSeconds();

//1. listen for socket connectins
io.on('connection', (client)=>{
    //2. every second, emit a 'cpu' event to  user
    setInterval(()=>{
        
        os.cpuUsage((cpuPercent)=>{
            // console.log(cpuPercent)
            client.emit('cpu', {
                name:new Date().getSeconds(),
                value:cpuPercent
            })
        })
    }, 1000)
})

// setInterval(()=>{
//     os.cpuUsage(data =>console.log(data))
// }, 2000)
console.log('connetion is establised at port 8080')
server.listen(8080)
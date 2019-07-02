var net = require('net');
var fs = require('fs');

var server = net.createServer(function (socket) {

    // data event： 到收到資料傳輸時觸發事件 ， argument 為對象傳輸的物件
    socket.on('data', function (data) {

        // write event: 傳輸資料的事件
        socket.write('hi', function () {
            console.log('server:收到 client端 傳輸資料為'+data);

            fs.appendFile('HL7_receive.txt', data + '\t' + new Date() + '\n', function (err) {
                if (err)
                    console.log(err);
                else
                    console.log('Write Success');
            });
        })

    })
})


//用 net method listen() 方法讓 本機的 8124 port  給此 TCP server 使用
server.listen(8124, function () {
    console.log('TCP Server start')
})

//使用 connection 事件
server.on('connection', function () {
    console.log('server端：收到 client 端連線請求，並通知 client 端可以開始傳送資料')
})
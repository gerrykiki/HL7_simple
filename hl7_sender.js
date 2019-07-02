var hl7 = require('simple-hl7');

///////////////////CLIENT/////////////////////
var client = hl7.Server.createTcpClient('172.19.1.58', 5555);
 
//create a message
var msg = new hl7.Message(
                    "EPIC",
                    "EPICADT",
                    "SMS",
                    "199912271408",
                    "CHARRIS",
                    ["ADT", "A04"], //This field has 2 components
                    "1817457",
                    "D",
                    "2.5"
                );
 
console.log('******sending message*****')
client.send(msg, function(err, ack) {
  console.log('******ack received*****')
});
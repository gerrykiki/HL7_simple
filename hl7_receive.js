var hl7 = require('simple-hl7');
var fs = require('fs');
var app = hl7.tcp();
///////////////////SERVER/////////////////////
 
app.use(function(req, res, next) {
  //req.msg is the HL7 message
  console.log('******message received*****')
  console.log(req.msg.log());
  fs.appendFile('HL7_receive.txt', req.msg.log() + '\n', function (err) {
    if (err)
        console.log(err);
    else
        console.log('Write Success');
  });
  next();
})
 
app.use(function(req, res, next){
  //res.ack is the ACK
  //acks are created automatically
 
  //send the res.ack back
  console.log('******sending ack*****')
  res.end()
})
 
app.use(function(err, req, res, next) {
  //error handler
  //standard error middleware would be
  console.log('******ERROR*****')
  console.log(err);
  var msa = res.ack.getSegment('MSA');
  msa.editField(1, 'AR');
  res.ack.addSegment('ERR', err.message);
  res.end();
});

//Listen on port 7777
app.start(5555);
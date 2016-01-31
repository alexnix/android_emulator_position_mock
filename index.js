var express = require('express');
var open = require('open');
var telnet = require('telnet-client');
var emulator = new telnet();

var app = express();
var enable = false;

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.post('/api/latLng/:lat/:lng', function(req, res){
	if(enable)
		emulator.exec("geo fix "+req.params.lat+" "+req.params.lng);
	res.status(200).send();
});


emulator.on('ready', function(){
 	open('http://localhost:3000');
 	enable = true;
});

app.listen(3000, function () {
	console.log('Location Mocker started...');
	emulator.connect({
	  host: '127.0.0.1',
	  port: 5554,
	  shellPrompt: '',
	  timeout: 1500,
	});
});
//setup requires
const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
const port = 3000;

//setup express server
var app = express();

//parse incoming requests bodies
app.use(body_parser.json()); // application/json
app.use(body_parser.urlencoded({extended: true})); // application/x-www-form-urlencoded

//set up the HTML content to be served
app.use(express.static(__dirname));

//-----BACKEND CODE BEGINS-----//

var payload = {
	"configurations": [
		{
			"name": "host1",
			"hostname": "nessus-ntp.lab.com",
			"port": 1241,
			"username": "toto"
		},
		{
			"name": "host2",
			"hostname": "nessus-xml.lab.com",
			"port": 3384,
			"username": "admin"
		}
	]
};

//set up a router for incoming requests
var router = express.Router();

//these router request paths are appended to the request paths that the express server directs to this router
router.get('/', function(theReq, theRes) {
	theRes.json({
		message: 'root message'
	})
});

router.get('/request', function(theReq, theRes) {

	if(theReq.query.host) {

		if(isFinite(theReq.query.host)) {
			theRes.json({
				message: 'Successful download request!',
				data: payload
			});
		} else {
			theRes.json({
				message: 'Download request failed. \'Host\' parameter specified, but was not a number.'
			});
		}

	} else {
		theRes.json({
			message: 'Download request failed. \'Host\' parameter was not specified.'
		});
	}
});

//incoming requests on http://[ourserver]/download/** will be directed to our router above.
//this use rule is declared here after the router is established
app.use('/download', router);

//-----BACKEND CODE ENDS-----//

//-----FRONTEND CODE BEGINS-----//

//This code handles intercepting URL requests and forwarding along the correct HTML files to be displayed
//in the user's browser

// app.get('/', function(theReq, theRes) {
// 	theRes.sendFile(path.join(__dirname + '/index.html'));
// });

// app.get('/req1', function(theReq, theRes) {
// 	theRes.sendFile(path.join(__dirname + '/req1/index.html'));
// });

// app.get('/req2', function(theReq, theRes) {
// 	theRes.sendFile(path.join(__dirname + '/req1/index.html'));
// });

// app.get('/req3', function(theReq, theRes) {
// 	theRes.sendFile(path.join(__dirname + '/req3/index.html'));
// });

//-----FRONTEND CODE ENDS-----//

//set the server to listen for incoming requests
app.listen(port);

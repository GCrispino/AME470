//function that parses the user inputs
function parseInput(userInput){
	userInput = decodeURIComponent(userInput);
	console.log(userInput);
	var result;

	//has to get line which contains the 'return' keyword and remove it
	if (userInput.search("return") != -1){
		console.log("user input: " + userInput);
		var resVar = userInput.replace(/(.*)return(\s)/,"");
		userInput = userInput.replace(/return(.*)/g,"");
		console.log("after");
		console.log(resVar,userInput);
		result = eval(resVar);
	}
	else
    	result = eval(userInput);


	return result;
}


var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;

app.get("/", function (req, res) {
      res.redirect("/index.html");
});

app.get("/eval", function (req, res) {
    var result = parseInput(req.query.code)
    res.send(result.toString()); // send response bodyParser
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);

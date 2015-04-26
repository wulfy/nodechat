var http = require('http');
var url = require('url');
var root = require('./rooting');
var userTools = require('./users');
var htmlPage = require('./htmlpage');
var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    var rr	=	root.rooting(page);
    var response_data = rr.html;
    if(rr.type=='html')
    	response_data = htmlPage.buildHtmlPage(response_data);
    
    res.writeHead(rr.response, {"Content-Type": "text/html"});
	res.write(response_data);
    res.end();
});

// Chargement de socket.io
var io = require('../node_modules/socket.io').listen(server);

// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
	socket.pseudo = false;
    socket.emit('message', 'Vous êtes bien connecté !');
	/**setInterval(function() {
		socket.emit('message', 'BIM');
	}, 3000);**/
	socket.on('petit_nouveau', function(pseudo) {
		console.log("new user");
		if(userTools.userList.addUser(pseudo) == false)
			socket.emit('connection_error', 'Utilisateur existe!');
		else{
			socket.pseudo = pseudo;
			socket.broadcast.emit('new_user', {pseudo:pseudo});
			socket.emit('list_users', userTools.userList.getUsers());
		}
	});
	
	socket.on('message', function (message) {
		if(socket.pseudo != false)
		{
			var currentdate = new Date(); 
			var datetime = currentdate.getDate() + "/"
							+ (currentdate.getMonth()+1)  + "/" 
							+ currentdate.getFullYear() + " @ "  
							+ currentdate.getHours() + ":"  
							+ currentdate.getMinutes() + ":" 
							+ currentdate.getSeconds();
			console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
			socket.broadcast.emit('thread_update',{user:socket.pseudo,datetime:datetime,message:message});
		}
		else
			console.log('un utilisateur non connecté essaye de parler');
	});

	socket.on('disconnect', function () {
		userTools.userList.removeUser(socket.pseudo)
	    socket.broadcast.emit('remove_user',{pseudo:socket.pseudo});
	  });

});

	




server.listen(1337);
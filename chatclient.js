var socket = io.connect('http://192.168.1.18:1337');
var chat_send_box = null;
var chat_thread = null;
var user_list = null;
var pseudo = null;
var send_button = null;
var serverMessages = null;

function displayChatMessage(pseudo,datetime,message,classname)
{
	var formatedMessage = "<br/> <div class='"+classname+"'><span class='little'><b>"+pseudo+'</b> <i>'+datetime+'</i> </span>'+message+ '</div>';

	return formatedMessage;
}

function getFormatedDate()
{
	var currentdate = new Date(); 
	return currentdate.getDate() + '/'	+ (currentdate.getMonth()+1)  + '/' + currentdate.getFullYear() +  '@'   + currentdate.getHours() + 
	':'  + currentdate.getMinutes() + ':' + currentdate.getSeconds();
}

function displayServerMessage(message,type){
	var node = document.createElement("div");
	var dateTime = getFormatedDate();
	node.innerHTML = dateTime + " > " + message;
	node.className = "message";

	if(typeof(type) != 'undefined')
		node.className += " " + type;

	serverMessages.appendChild(node);
	//setTimeout(function(){serverMessages.removeChild(node)},3000);
}

function addConnectedUser(newpseudo,currentPseudo){
		var node = document.createElement("LI");

		if(typeof(currentPseudo) != 'undefined')
		{
			var userClass = (newpseudo == currentPseudo)?"blue":"";
			node.className += userClass;
		}

		node.id = newpseudo;
		node.innerHTML = newpseudo;
		user_list.appendChild(node);
}

window.onload = function ()
{
	chat_thread = document.getElementById('chat_thread');
	chat_send_box = document.getElementById('chat_message');
	user_list = document.getElementById('user_list');
	send_button = document.getElementById('send_button');
	serverMessages = document.getElementById('serverMessages');
	send_button.disabled = true;
	//On opening page
	pseudo = prompt('Quel est votre pseudo ?');
	socket.emit('petit_nouveau', pseudo);
}

socket.on('message', function(message) {
	displayServerMessage('Le serveur a un message pour vous : ' + message);
});

socket.on('list_users', function(list) {

	for(i=0; i<list.length;i++)
	{
		addConnectedUser(list[i].pseudo,pseudo);
		
	}
});

socket.on('new_user', function(message) {
	addConnectedUser(message.pseudo,pseudo);
});

socket.on('remove_user', function(message) {
	user_list.removeChild(document.getElementById(message.pseudo));
});

socket.on('connect', function(message) {
	displayServerMessage("vous etes désormais connecté","notice");
	send_button.disabled = false;
});

socket.on('disconnect', function(message) {
	displayServerMessage("Vous avez été déconnecté","error");
	send_button.disabled = true;
});

socket.on('connection_error', function(message) {
	displayServerMessage('ERREUR: ' + message,"error");
	pseudo = prompt(message + ' \r\n Quel est votre pseudo ?');
	socket.emit('petit_nouveau', pseudo);
});

function sendText() {
	socket.emit('message',chat_send_box.value);
	var datetime = getFormatedDate();
	chat_thread.innerHTML  += displayChatMessage(pseudo,datetime,chat_send_box.value,"self_msg"); 
	chat_send_box.value = "";
};

socket.on('thread_update', function(threadObj) {
	chat_thread.innerHTML  += displayChatMessage(threadObj.user,threadObj.datetime,threadObj.message);
});		


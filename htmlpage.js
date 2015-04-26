module.exports = {

  buildHtmlPage: function(body,title) {
	var htmlPage = 
	'<html>'+
		'    <head>'+
		'       <meta charset="utf-8" />'+
		'       <title>'+title+
		'		</title>'+
		'<link href="chat.css" rel="stylesheet" type="text/css" />'+
		'			<script src="./socket.io/socket.io.js"></script>'+
        '			<script src="chatclient.js"></script>'+
		'    </head>'+ 
		'    <body>'+body+
		'	 <div>'+
		'    <div id="chat_thread" width="300px" height="500px" ></div>'+ 
		'		<ul id="user_list">'+
		'		</ul>'+
		'	</div>'+
		'	<div>'+
		'		<div id="serverMessages"></div>'+
		'		<textarea id="chat_message"></textarea> '+
		'		<input id="send_button" type="button" value="Envoyer" onclick="sendText();"/> '+
		'	</div>'+
		'	</body>'+
	'</html>';
	
	return htmlPage;

  }
};



var fs = require("fs");

module.exports = {

  rooting: function(page) {
    var response = 200;
	var html = "";
	var type = "html";
	switch(page){
		case '/':	html = 'Vous êtes à l\'accueil, que puis-je pour vous ?'; break;
		case '/sous-sol':	html = 'Vous êtes dans la cave à vins, ces bouteilles sont à moi !'; break;
		case '/etage/1/chambre' :	html = 'Hé ho, c\'est privé ici !'; break;
		case '/list' :	html = "<ul><li><a href='../sous-sol'>Sous sol</a></li><li><a href='../etage/1/chambre'>Chambre</a></li></ul>"; break;
		case '/chatclient.js' : html = fs.readFileSync("./chatclient.js", "utf8");type="script";break;
		case '/chat.css' : html = fs.readFileSync("./chat.css", "utf8");type="script";break;
		default : response = 404; html = "<img src='http://www.pouledesign.com/poule/wp-content/uploads/2013/08/exemple-page-erreur-404.png'/>"; break;
	}
	
	return {response:response, html:html, type:type};

  }
};
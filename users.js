function User(pseudo) { 
    this.pseudo = pseudo; 
} 

/**var UserList = {
	users : [],
	addUser : function(pseudo) {
		if(! this.userExists(pseudo))
			return (users[users.length] = new User(pseudo));
		else
			return false;
	},
	userExists : function(pseudo){
		for(i=0;i<users.length;i++)
			if(users[i].pseudo == pseudo) return true;
		
		return false;
	}
}**/

module.exports = {

  userList: {
	users : [],
	addUser : function(pseudo) {
		if(! this.userExists(pseudo))
			return (this.users[this.users.length] = new User(pseudo));
		else
			return false;
	},
	userExists : function(pseudo){
		for(i=0;i<this.users.length;i++)
			if(this.users[i].pseudo == pseudo) return true;
		
		return false;
	},
	getUsers : function(){
		return this.users;
	},
	removeUser : function(pseudo){
		for(i=0;i<this.users.length;i++)
			if(this.users[i].pseudo == pseudo){ 
				this.users.splice(i, 1);
				return true;
			}
	}
  }
};
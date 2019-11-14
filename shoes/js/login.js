class Login {
	constructor(options) {
		this.login = options.login;
		this.addEvent();
	}
	addEvent(){
		var that = this;
		this.login.onclick = function(e) {
			if (e.target.className == "btn") {
				that.user = e.target.parentNode.firstElementChild.nextElementSibling.value;
				that.pass = e.target.previousElementSibling.value;
				// console.log(that.user);
				// console.log(that.pass);
				that.getCookie();
			}
		}
	}
	getCookie(){
		this.member = getCookie("member") ? JSON.parse(getCookie("member")) : [];
		for(var i=0;i<this.member.length;i++){
			// console.log(this.user)
			if(this.user == "" || this.pass== ""){
					alert("用户名或密码不能为空！");
					break;
			}
			else if(this.user == this.member[i].user && this.pass == this.member[i].pass){
				alert("登录成功！");
				window.location.href="list.html";
				break;
			}
			else if((this.user == this.member[i].user && this.pass != this.member[i].pass)){
				alert("用户名或密码错误！！");
				// break;
			}
		}
	}
}

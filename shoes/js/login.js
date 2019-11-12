class Login {
	constructor() {
		this.user = document.querySelector(".user");
		this.pass = document.querySelector(".pass");
		this.login = document.querySelector(".btn");
		this.p = document.querySelector(".warn");
		this.url = "http://localhost/shoes/data/login.pbp";
		this.init();
		this.addEvent();
	}
	init() {
		var that = this;
		this.login.onclick = function() {
			console.log(2);
			ajaxGet(that.url, function(res) {
				that.res = JSON.parse(res)
				that.display();
			}, {
				user: that.user.value,
				pass: that.pass.value
			})
		}
	}
	this.addEvent(){
		
	}
	display() {
		console.log(1);
		switch (this.res.statu) {
			case 0:
				this.p.innerHTML = "登录成功";
				break;
			case 1:
				this.p.innerHTML = '密码错误';
				break;
			case 2:
				this.span.innerHTML = "该用户名不存在" + "<a href='register.html'>去注册</a>";
				break;
		}
	}
}

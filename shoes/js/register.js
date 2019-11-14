class Register {
	constructor(options) {
		this.sub = document.querySelector(".sub");
		this.tbody = options.tbody;
		this.addEvent();
	}
	addEvent() {
		var that = this;
		this.tbody.onclick = function(e) {
			if (e.target.className == "sub") {
				that.user = e.target.parentNode.parentNode.parentNode.firstElementChild.lastElementChild.firstElementChild.value;
				that.pass = e.target.parentNode.parentNode.parentNode.firstElementChild.nextElementSibling.lastElementChild.firstElementChild.value;
				if(that.user != "" && that.pass != ""){
					that.setCookie();	
				}
			}
		}
	}
	setCookie() {
		this.member = getCookie("member") ? JSON.parse(getCookie("member")) : [];
		//第一次加入购物车：cookie为空，直接加入
		if (this.member.length == 0) {
			this.member.push({
				user: this.user,
				pass: this.pass
			})
			window.location.href = "login.html"
		} else {
			var onoff = true; //true表示是新用户
			for (var i = 0; i < this.member.length; i++) {
				//判断当前用户，新还是旧
				if (this.member[i].user === this.user) {
					alert("该该用户名已经存在！")
					this.user = "";
					this.pass = "";
					onoff = false;
				}
			}
			if (onoff) {
				this.member.push({
					user: this.user,
					pass: this.pass
				});
				window.location.href = "login.html"
			}
		}
		setCookie("member", JSON.stringify(this.member));
	}

}

class List {
	constructor(options) {
		//1.准备属性
		this.cont = options.cont;
		this.url = options.url;
		this.min = options.min;
		this.max = options.max;
		//2.开启请求
		this.load();
		//4.事件委托绑定事件,点击按钮时,按钮可能还没有在树上,但是父元素cont一定在
		this.addEvent();
	}
	load() {
		var that = this;
		ajaxGet(this.url, function(res) {
			that.res = JSON.parse(res);
			// 3.渲染页面
			that.display();
		})
	}
	display() {
		var str = "";
		for (var i = this.min; i < this.max; i++) {
			str +=
				`
				<dd index="${this.res[i].goodsId}">
					<a href="msg.html"><img src="${this.res[i].img}"/></a>
					<p>${this.res[i].name}</p>
					<span>￥&nbsp;${this.res[i].price}</span>
				</dd>
					`;
		}
		this.cont.innerHTML = str;
	}
	addEvent() {
		var that = this;
		this.cont.onclick = function(e) {
			if (e.target.tagName == "IMG") {
				//5.记录id
				that.id = e.target.parentNode.parentNode.getAttribute("index");
				console.log(that.id);
				//6.准备存cookie
				that.setCookie();
			}
		}
	}
	setCookie() {
		this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
		//第一次加入购物车：cookie为空，直接加入
		if (this.goods.length == 0) {
			this.goods.push({
				id: this.id,
				num: 1
			})
		} else {
			var onoff = true; //true表示是新商品
			for (var i = 0; i < this.goods.length; i++) {
				//判断当前商品，新还是旧
				if (this.goods[i].id === this.id) {
					// 旧：修改数据,同时修改是否是新商品的状态
					this.goods[i].num++;
					onoff = false;
				}
			}
			//循环结束后,判断是否是新商品的状态,是否发生了改变,没有找到老商品,说明是新商品
			if (onoff) {
				//新：增加数据
				this.goods.push({
					id: this.id,
					num: 1
				});
			}
		}
		//数组的操作结束后,一定要再存回cookie
		setCookie("goods", JSON.stringify(this.goods));
	}
}


class ListAll {
	constructor(options) {
		//1.准备属性
		this.cont = options.cont;
		this.url = options.url;
		//2.开启请求
		this.load();
		//4.事件委托绑定事件,点击按钮时,按钮可能还没有在树上,但是父元素cont一定在
		this.addEvent();
	}
	load() {
		var that = this;
		ajaxGet(this.url, function(res) {
			that.res = JSON.parse(res);
			// 3.渲染页面
			that.display();
		})
	}
	display() {
		var str = "";
		for (var i = 0; i < this.res.length; i++) {
			str +=
				`
				<li index="${this.res[i].goodsId}">
					<a href="msg.html"><img src="${this.res[i].img}"/></a>
					<span>￥${this.res[i].price}</span>
					<p>${this.res[i].name}</p>
					<div class="li-c">
						<span class="ku"></span>
						<span class="zf"></span>
						<span class="wz">温州</span>
					</div>
					<div class="li-b clear">
						<a href="car.html" class="add"></a>
						<span>2色全码起批</span>
					</div>
				</li>
				`;
		}
		this.cont.innerHTML = str;
	}
	addEvent() {
		var that = this;
		this.cont.onclick = function(e) {
			if (e.target.tagName == "IMG") {
				//5.记录id
				that.id = e.target.parentNode.parentNode.getAttribute("index");
				console.log(that.id);
				//6.准备存cookie
				that.setgoodsCookie();
			}
			if(e.target.className == "add"){
				that.id = e.target.parentNode.parentNode.getAttribute("index");
				that.setshopcarCookie();
			}
		}
	}
	setshopcarCookie() {
		this.shopcar = getCookie("shopcar") ? JSON.parse(getCookie("shopcar")) : [];
		//第一次加入购物车：cookie为空，直接加入
		if (this.shopcar.length == 0) {
			this.shopcar.push({
				id: this.id,
				num: 1
			})
		} else {
			var onoff = true; //true表示是新商品
			for (var i = 0; i < this.shopcar.length; i++) {
				//判断当前商品，新还是旧
				if (this.shopcar[i].id === this.id) {
					// 旧：修改数据,同时修改是否是新商品的状态
					this.shopcar[i].num++;
					onoff = false;
				}
			}
			if (onoff) {
				//新：增加数据
				this.shopcar.push({
					id: this.id,
					num: 1
				});
			}
		}
		//数组的操作结束后,一定要再存回cookie
		setCookie("shopcar", JSON.stringify(this.shopcar));
	}
	setgoodsCookie() {
		this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
		//第一次加入购物车：cookie为空，直接加入
		if (this.goods.length == 0) {
			this.goods.push({
				id: this.id,
				num: 1
			})
		} else {
			var onoff = true; //true表示是新商品
			for (var i = 0; i < this.goods.length; i++) {
				//判断当前商品，新还是旧
				if (this.goods[i].id === this.id) {
					// 旧：修改数据,同时修改是否是新商品的状态
					this.goods[i].num++;
					onoff = false;
				}
			}
			if (onoff) {
				//新：增加数据
				this.goods.push({
					id: this.id,
					num: 1
				});
			}
		}
		//数组的操作结束后,一定要再存回cookie
		setCookie("goods", JSON.stringify(this.goods));
	}
}

class Msg {
	constructor(options) {
		this.url = options.url;
		this.banner = options.banner;
		//1.读取到所有商品数据
		this.load();
		//5.事件委托绑定事件
		this.addEvent();
	}
	load() {
		var that = this;
		ajaxGet(this.url, function(res) {
			that.res = JSON.parse(res);
			that.getCookie();
		})
	}
	getCookie() {
		this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
		this.display();
	}
	display() {
		var str = "";
		for (var i = 0; i < this.res.length; i++) {
			for (var j = 0; j < this.goods.length; j++) {
				if (this.res[i].goodsId == this.goods[this.goods.length-1].id) {
					str =
						`
						<div class="aside" index="${this.res[i].goodsId}">
							<div class="cont">
								<img src="${this.res[i].img1}" class="i1 active"/>
								<img src="${this.res[i].img2}" class="i1"/>
								<img src="${this.res[i].img3}" class="i1"/>
							</div>
							<div class="big"></div>
							<ul>
								<li class="active"/><img src="${this.res[i].img1}"/></li>
								<li><img src="${this.res[i].img2}"/></li>
								<li><img src="${this.res[i].img3}"/></li>
							</ul>
							<div class="article">
								<p>${this.res[i].name}</p>
								<span>销售价：<b>￥${this.res[i].price}</b></span>
								<span>温州走俏鞋店购买享受三包</span>
								<s>购买数量：</s><input  type="number" min="1" class="num" value="1"/><br/>
								<input type="button" value="立即购买" class="buy"/>
								<input type="button" class="car" value="加入购物车">
							</div>
						</div>
					`;
				}
			}
		}
		this.banner.innerHTML = str;
	}

	addEvent() {
		//委托修改的事件
		var that = this;
		this.banner.onclick = function(e) {
			if(e.target.className == "car"){
				that.id = e.target.parentNode.parentNode.getAttribute("index");
				that.num = e.target.value;
				that.setshopcarCookie();
			}
			if(e.target.className == "num"){
				that.id = e.target.parentNode.parentNode.getAttribute("index");
				that.num = e.target.value;
				that.setshopcarCookie();
			}
		}
	}

	setshopcarCookie() {
		this.shopcar = getCookie("shopcar") ? JSON.parse(getCookie("shopcar")) : [];
		// console.log(this.num)
		//第一次加入购物车：cookie为空，直接加入
		if (this.shopcar.length == 0) {
			this.shopcar.push({
				id: this.id,
				num: this.num
			})
		} else {
			var onoff = true; //true表示是新商品
			for (var i = 0; i < this.shopcar.length; i++) {
				//判断当前商品，新还是旧
				if (this.shopcar[i].id == this.id) {
					// 旧：修改数据,同时修改是否是新商品的状态
					this.shopcar[i].num = parseInt(this.num) + 1;
					// console.log(this.shopcar[i].num)
					onoff = false;
				}
			}
			//循环结束后,判断是否是新商品的状态,是否发生了改变,没有找到老商品,说明是新商品
			if (onoff) {
				//新：增加数据
				this.shopcar.push({
					id: this.id,
					num: this.num
				});
			}
		}
		//数组的操作结束后,一定要再存回cookie
		setCookie("shopcar", JSON.stringify(this.shopcar));
	}
}


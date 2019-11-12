class Car {
	constructor(options) {
		this.url = options.url;
		this.tbody = options.tbody;
		//1.读取到所有商品数据
		this.load();
		//5.事件委托绑定事件
		this.addEvent();
	}
	load() {
		var that = this;
		ajaxGet(this.url, function(res) {
			that.res = JSON.parse(res);
			//2.读取到cookie
			that.getCookie();
		})
	}
	getCookie() {
		this.shopcar = getCookie("shopcar") ? JSON.parse(getCookie("shopcar")) : [];
		this.display();
	}
	display() {
		var str = "";
		var num = 0;
		for (var i = 0; i < this.res.length; i++) {
			for (var j = 0; j < this.shopcar.length; j++) {
				//3.拿到cookie中的id与所有的商品数据的goodId做比较
				if (this.res[i].goodsId == this.shopcar[j].id) {
					//4.相同了,渲染这个数据(就是添加到购物车的商品)
					str +=
						`
								<tr index=${this.res[i].goodsId}>
									<td><input type="checkbox"/></td>
									<td><img src="${this.res[i].img}" ></td>
									<td>${this.res[i].name}</td>
									<td>￥${this.res[i].price}</td>
									<td>购买数量：<input type="number" min="1" class="num"/></td>
									<td>小计:</td>
									<td><span>&times;</span></td>
								</tr>
								
								`;
				}
			}
		}
		this.tbody.innerHTML = str;
	}
	addEvent() {
		//委托删除的事件
		var that = this;
		this.tbody.addEventListener("click", function(e) {
			if (e.target.tagName == "SPAN") {
				//保存要删除的数据的id
				that.id = e.target.parentNode.parentNode.getAttribute("index");
				//删除dom元素
				e.target.parentNode.parentNode.remove();
				//调用更新方法,传入删除操作
				that.updateCookie(function(i) {
					that.shopcar.splice(i, 1);
				});
			}
		})
		//委托修改的事件
		this.tbody.addEventListener("input", function(e) {
			if (e.target.className == "num") {
				//保存要修改的id
				that.id = e.target.parentNode.parentNode.getAttribute("index");
				//调用更新cookie的方法,传入修改操作
				that.updateCookie(function(i) {
					that.shopcar[i].num = e.target.value;
				});
			}
		})
	}
	updateCookie(cb) {
		//更新cookie的功能方法
		//不是真正的删除cookie,只是从这条cookie中剔除这个数据,还得再存回去
		//遍历数组,拿到所有数据,
		for (var i = 0; i < this.goods.length; i++) {
			// 和当前id做比较
			if (this.goods[i].id === this.id) {
				//符合,执行传入的更新操作
				cb(i);
			}
		}
		//还得将数据存回
		setCookie("goods", JSON.stringify(this.goods));
	}
}

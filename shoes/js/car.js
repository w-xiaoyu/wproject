class Car {
	constructor(options) {
		this.url = options.url;
		this.tbody = options.tbody;
		this.table = options.table;
		this.checkAll = document.querySelector(".checkAll");
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
		this.check = document.querySelector(".check");
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
									<td><input type="checkbox" class="check"/></td>
									<td><img src="${this.res[i].img}" ></td>
									<td>${this.res[i].name}</td>
									<td>${this.res[i].price}</td>
									<td>购买数量：<input type="number" min="1" class="num" value= "${this.shopcar[j].num}"/></td>
									<td>小计:<b></b></td>
									<td><span>&times;</span></td>
								</tr>
								
								`;
				}
			}
		}
		str += `<tr class="sum">
						<td colspan="7">总计：<em></em></td>
					</tr>`
		this.tbody.innerHTML = str;
	}
	addEvent() {
		//委托删除的事件
		var that = this;
		var count = 0;
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
					that.price = e.target.parentNode.previousElementSibling.innerHTML;
					that.ob = e.target.parentNode.nextElementSibling.firstElementChild;
					count = that.price * e.target.value;
					that.ob.innerHTML = count;
				});
			}
			
		})
		this.table.addEventListener("input",function(e){
			var check1 = document.querySelectorAll(".check");
			if(e.target.className == "check" ){
				that.id = e.target.parentNode.parentNode.getAttribute("index");
				that.check = e.target.parentNode.parentNode.firstElementChild.firstElementChild;
				that.ob = e.target.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild;
				that.price = e.target.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
				that.num = e.target.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.value;
				that.ob.innerHTML = "";
				if(e.target.checked){
					that.ob.innerHTML = that.price * that.num;
				}
			}
			var em = document.querySelector("em");
			em.innerHTML = "";
			if(e.target.className == "checkAll"){
				var ob1 = document.querySelectorAll("b");
				// em.innerHTML = "";
				count = 0;
				// for(var i=0;i<that.shopcar.length;i++){
				// 	check1[i].checked = e.target.checked;
				// 	if(check1[i].checked){
				// 		// that.ob[i].innerHTML = that.price * that.num;
				// 	}
				// }
				// if(e.target.checked){
				// 	for(var i=0;i<that.shopcar.length;i++){
				// 		console.log(that.shopcar[i].num);
				// 		count += that.shopcar[i].num * ob1[i].innerHTML;
				// 	}
				// 	em.innerHTML = count;
				// }
				for(var i=0;i<that.shopcar.length;i++){
					check1[i].checked = e.target.checked;
					var num = that.shopcar[i].num;
					for(var j=0;j<that.res.length;j++){
						if(that.shopcar[i].id == that.res[j].goodsId){
							var price = that.res[j].price;
						}
					}
					count +=  num * price;
				}
				em.innerHTML = count;
				if(!e.target.checked){
					em.innerHTML = "";
				}
			}
		})
		
	}
	updateCookie(cb) {
		//更新cookie的功能方法
		//遍历数组,拿到所有数据,
		// console.log(this.shopcar);
		for (var i = 0; i < this.shopcar.length; i++) {
			// 和当前id做比较
			if (this.shopcar[i].id === this.id) {
				//符合,执行传入的更新操作
				cb(i);
			}
		}
		//还得将数据存回
		setCookie("shopcar", JSON.stringify(this.shopcar));
	}
}

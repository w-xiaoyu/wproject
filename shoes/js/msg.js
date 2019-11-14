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
				if (this.res[i].goodsId == this.goods[this.goods.length - 1].id) {
					str =
						`
						<div class="aside" index="${this.res[i].goodsId}">
							<div class="aside-c">
								<div class="cont">
									<img src="${this.res[i].img1}" class="i1 active"/>
									<img src="${this.res[i].img2}" class="i1"/>
									<img src="${this.res[i].img3}" class="i1"/>
									<div class="min"></div>
								</div>
								<div class="big">
									<img src="${this.res[i].img1}" class="big2 active"/>
									<img src="${this.res[i].img2}" class="active"/>
									<img src="${this.res[i].img3}" class="active"/>
								</div>
								<ul>
									<li class="active"/><img src="${this.res[i].img1}"/></li>
									<li><img src="${this.res[i].img2}"/></li>
									<li><img src="${this.res[i].img3}"/></li>
								</ul>
							</div>
							<div class="article">
								<p>${this.res[i].name}</p>
								<span>销售价：<b>￥${this.res[i].price}</b></span>
								<span>温州走俏鞋店购买享受三包</span>
								<s>购买数量：</s>
								<input  type="number" min="1" class="num" value="1"/><br/>
								<input type="button" value="立即购买" class="buy"/>
								<input type="button" class="car" value="加入购物车">
							</div>
						</div>
					`;
				}
			}
		}
		this.banner.innerHTML = str;
		$(".aside-c").children("ul").children("li").hover(function() {
			$(this).addClass("active").siblings().removeClass("active");
			$(".aside-c").children(".cont").children("img").removeClass(" active").eq($(this).index()).addClass(" active");
			$(".aside-c").children(".big").children("img").removeClass("big2").eq($(this).index()).addClass(" big2");
		})
		this.big();
	}

	addEvent() {
		//委托修改的事件
		var that = this;
		this.banner.onclick = function(e) {
			if (e.target.className == "car") {
				that.id = e.target.parentNode.parentNode.getAttribute("index");
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
				num: 1
			})
		} else {
			var onoff = true; //true表示是新商品
			for (var i = 0; i < this.shopcar.length; i++) {
				//判断当前商品，新还是旧
				if (this.shopcar[i].id == this.id) {
					// 旧：修改数据,同时修改是否是新商品的状态
					this.shopcar[i].num++;
					// console.log(this.shopcar[i].num)
					onoff = false;
				}
			}
			//循环结束后,判断是否是新商品的状态,是否发生了改变,没有找到老商品,说明是新商品
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

	//放大镜功能
	big() {
		var wrap = document.querySelector(".cont");
		var box = document.querySelector(".min");
		var bigArea = document.querySelector(".big");
		var big2 = document.querySelector(".big2");
		console.log(wrap);
		wrap.onmouseenter = function() {
            box.style.display = "block";
			big2.style.display = "block";
			bigArea.style.display = "block";
			
            var r = (wrap.clientWidth - box.clientWidth) / (800 - bigArea.clientWidth);
            // 绑定mousemove事件
            document.onmousemove = function(e) {
                // 计算鼠标在页面中的距离
                var mouseX =  e.pageX;
                var mouseY = e.pageY;
                // 计算元素在视口中的距离
                var elementX = offset(wrap).left;
                var elementY = offset(wrap).top;
                // 计算鼠标在元素中的距离
                var resultX = mouseX - elementX - wrap.clientLeft - box.clientWidth / 2;
                var resultY = mouseY - elementY - wrap.clientTop - box.clientHeight / 2;
                if (resultX < 0) {
                    resultX = 0;
                } else if (resultX > wrap.clientWidth - box.clientWidth) {
                    resultX = wrap.clientWidth - box.clientWidth;
                }
                if (resultY < 0) {
                    resultY = 0;
                } else if (resultY > wrap.clientHeight - box.clientHeight) {
                    resultY = wrap.clientHeight - box.clientHeight;
                }
                box.style.left = resultX + "px";
                box.style.top = resultY + "px";
                big2.style.left = -resultX / r + "px";
                big2.style.top = -resultY / r + "px";   
            }
        }
        wrap.onmouseleave = function() {
            box.style.display = "none";
            bigArea.style.display = "none";
        }
        function offset(dom) {
            // 返回一个对象
            var obj = {
                left: 0,
                top: 0
            }
            // 先让这个对象加上 dom的自己得到定位父元素的距离
            obj.left = dom.offsetLeft;
            obj.top = dom.offsetTop;
            // 判定浏览器是否是IE8 
            var isIE8 = window.navigator.userAgent.indexOf("MSIE 8") != -1;
            // 循环往上走 累加每一个offsetParent的offsetLeft和clientLeft 
            // 加每一个offsetParent的offsetTop和clientTop
            var offsetParent = dom.offsetParent;
            while (offsetParent != document.body) {
                if (isIE8) {
                    obj.left += offsetParent.offsetLeft;
                    obj.top += offsetParent.offsetTop;
                } else {
                    obj.left += offsetParent.offsetLeft + offsetParent.clientLeft;
                    obj.top += offsetParent.offsetTop + offsetParent.clientTop;
                }
                offsetParent = offsetParent.offsetParent;
            }
            return obj;
        }
	}
}

;(function($){
	"use strict";
	$.fn.extend({
		banner:function(options){
			//因为this指向jq的DOM对象，防止重复属性，慎用
			this.obj = {};
			//给this自定义对象，以供面向使用
			var that = this.obj;
			//解析参数
			that.imgs = options.imgs;
			that.list = options.list == false ? false :true;
			that.autoPlay = options.autoPlay == false ? false : true;
			that.delayTime = options.delayTime || 3000;
			that.moveTime = options.moveTime || 300;
			//假设当前索引为零，
			that.index = 0; //当前所在的索引
			//上一次走的是最后一张
			that.iPrev = that.imgs.length -1; //上一次的索引
			function btnLeft(){ //左按钮  右移
				//点击后，如果当前索引为零，让当前的索引为3，上一次的索引值为0 
				if(that.index == 0){ 
					that.index = that.imgs.length-1;
					that.iPrev = 0;
				}else{ //当前索引值减一，移走的索引值加一
					that.index--;
					that.iPrev = that.index + 1;
				}
				//开始移动，传入方向
				that.btnMove(1);
			}
			function btnRight(){  //左移
				//点击后，如果当前的索引值为最后一位，将当前的索引值为0，从头开始轮播，前一个值为当前值减一得到，
				if(that.index == that.imgs.length-1){
					that.index = 0;
					that.iPrev = that.imgs.length -1;
				}else{
					that.index++;
					that.iPrev = that.index - 1;
				}
				that.btnMove(-1);
			}
			that.btnMove= function(t){
				//要移动的that.iPrev，从定位0-> 一个图片的宽度
				that.imgs.eq(that.iPrev).css({
					left:0
				}).stop().animate({
					left:that.imgs.eq(0).width() * t
				})
				that.imgs.eq(that.index).css({
					left:-that.imgs.eq(0).width() * t
				}).stop().animate({
					left:0
				})
				//取消所有，给当前加背景
				if(that.list){
					ul.children("li").css({
						background:"#ccc"
					}).eq(that.index).css({
						background:"#f10582"
					})
				}
			}
			//判断是否存在按钮
			if(options.left != undefined && options.left.length >0 && options.right != undefined && options.right.length >0 ){
				//绑定左右按钮事件
				//左按钮向右移动
				options.left.click(btnLeft)
				options.right.click(btnRight)
			}
			if(that.list){
				var str = "";
				for(var i=0;i<options.imgs.length;i++){
					str += `<li>${i+1}</li>`;
				}
				var ul = $("<ul>").html(str);
				this.append(ul);
				ul.css({
					width:"100%",
					height:30,
					display:"flex",
					justifyContent:"flex-end",
					position:"absolute",
					left:0,
					bottom:0,
					listStyle:"none",
					margin:0,
					padding:0,
					textAlign:"center",
					lineHeight:"30px"
				}).children("li").css({
					width:15,
					height:15,
					borderRadius:"50%",
					background:"#ccc",
					margin:"0 3px",
					textAlign:"center",
					lineHeight:"15px",
					color:"white",
					cursor:"pointer"
				}).eq(that.index).css({
					background:"#f10582"
				});
				ul.children("li").click(function(){
					//点击时，通过点击的索引的大小和当前索引的大小比较，判断是左移还是右移
					if($(this).index() > that.index){
						// console.log("左");
						that.listMove($(this).index(),1);
					}else if($(this).index() < that.index){
						// console.log("右");
						that.listMove($(this).index(),-1);
					}
					
					$(this).css({
						background:"#f10582"
					}).siblings().css({
						background:"#ccc"
					})
					//点击之后，当前的索引就是下一次的当前索引
					that.index = $(this).index();
				})
				that.listMove = function(iNow,t){
					options.imgs.eq(that.index).css({
						left:0
					}).stop().animate({
						left:-options.imgs.eq(0).width() * t
					})
					options.imgs.eq(iNow).css({
						left:options.imgs.eq(0).width() * t
					}).stop().animate({
						left:0
					})
				}
			}
			//判断是否需要自动轮播
			if(that.autoPlay){
				that.timer = setInterval(()=>{
					//options.right.trigger("click");
					btnRight();
				},that.delayTime);
				this.hover(function(){
					clearInterval(that.timer);
				},function(){
					that.timer = setInterval(()=>{
						// options.right.trigger("click");
						btnRight();
					},that.delayTime);
				})
			}
		}
	})
})(jQuery);



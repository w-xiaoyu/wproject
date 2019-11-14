//选项卡
$(".select").children("ul").children("li").hover(function() {
	$(this).addClass("active").siblings().removeClass("active");
	$(".cont").children("p").removeClass("active").eq($(this).index()).addClass("active");
})

//轮播图
$(".banner1").banner({
	imgs: $(".banner1").find("img"),
	list: true,
	autoPlay: true,
	delayTime: 2500,
	moveTime: 200
})
console.log($(".banner2").find(".btns").find(".left"))
$(".banner2").banner({
	imgs: $(".banner2").find("img"),
	right: $(".banner2").find(".btns").find(".left"),
	left: $(".banner2").find(".btns").find(".right"),
	list: false,
	autoPlay: true,
	delayTime: 2000,
	moveTime: 200
})


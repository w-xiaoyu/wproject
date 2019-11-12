/* get方式:
		数据必须在URL上拼接
		只要在URL上拼接数据,那必然是get
	post方式:
		数据在send中发送,格式与get一致
*/
function ajaxGet(url,callback,data){
				//bug1 默认参数的处理,undefined不能被for in
				data = data || {};
				var str = "";
				for(var i in data){
					str += `${i}=${data[i]}&`;
				}

				//bug2 浏览器缓存问题
				//每次打开一个新的页面或地址,浏览器会下载到浏览器的缓存中
				//为了提升下次打开同一个页面的速度
				//欺骗浏览器缓存 ,改变请求地址,但是在服务中是同一个地址
				//在URL后拼接时间戳
				var d = new Date();
				url = url + "?" + str + "__wxyt123798="+ d.getTime();
				var xhr = new XMLHttpRequest();
				xhr.open("get",url,true);
				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4 && xhr.status == 200){
						callback(xhr.responseText);
					}else if(xhr.readyState == 4 &&xhr.status != 200){
							console.log(xhr.status);
					}
				}
				xhr.send();
}
function ajaxPost(url,callback,data){
				data = data || {};
				var str = "";
				for(var i in data){
					str +=`${i}=${data[i]}&`;
				}
				//post没有缓存的问题，这里可以不需要写随机的数即不需要拼接时间戳，下面两句可省略；
				var d = new Date();
				//2-1发送数据的位置不再是url
				url = url + "?__wxyt123="+ d.getTime();
				
				var xhr = new XMLHttpRequest();
				//1.open 的参数
				xhr.open("POST",url,true);
				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4 && xhr.status == 200){
						callback(xhr.responseText);
					}
				}
				//3.send会原模原样的发送自己接收的数据,所以在发送之前要设置发送数据的格式:表单格式
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				//2-2发送数据的位置放在send内
				xhr.send(str);
}
//jsonp只能在url上拼接信息
		function jsonp(url,callback,data){
			//解析要发送的数据
			data = data || {};
			var str = "";
			for(var i in data){
				str += `${i}=${data[i]}&`;
			}
			//将数据拼接成url
			url = url + "?" + str.slice(0,str.length-1);
			//jsonp的功能:1,创建script
			var script = document.createElement("script");
			script.src = url;
			document.body.appendChild(script);
			//全局函数
			//jsonp功能:2.创建准备被资源执行的全局函数
			window[data[data.columnName]] = function(res){
				callback(res);
			}
		}			
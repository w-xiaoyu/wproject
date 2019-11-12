//设置cookie的封装
		function setCookie(key,value,options){
			options = options || {};
			
			var path = options.path ? ";path="+options.path : "";
			var exp = "";
			if(options.expires){
				var d = new Date();
				d.setDate(d.getDate() + options.expires);
				exp = ";expires="+d;
			}
			
			document.cookie = `${key}=${value}${exp}${path}`;
		}
		
		
		//移除cookie的封装
		function removeCookie(key,options){
			options = options || {};
			//在任何情况下,都给options加expires属性为-1
			options.expires = -1;
			//借助设置cookie,将option传入,实现将有限期设置为昨天,依次删除.
			setCookie(key,null,options);
		}
		
		//获取cookie
		function getCookie(key){
			//获取所有的cookie
			var data = document.cookie;
			var arr = data.split("; "); //得到数组:["d=4", "b=2", "e=5"]
			//遍历数组
			for(var i=0;i<arr.length;i++){
				//二次分隔每组cookie,分隔出独立的名字和值
				if(arr[i].split("=")[0] === key){
					//根据名字,拿到值,同时结束循环
					return arr[i].split("=")[1];
				}
			}
			//如果循环结束后,还在执行,说明没有找到符合信息,那么返回空字符
			return "";
		}
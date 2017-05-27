/*
	入口文件
*/
require(['../../config'],function(){
	require(['jquery',"layer","public"],function($,layer,public){
		$(".header-btn.prev").on("click",function(){
			window.history.back();
		})
		var detail = function () {
			var url = window.location.href;
			//console.log(url);
			var params = url.split("?")[1];	//params参数	（goodsID=xx）
			var goodsID = params.split("=")[1];

		    return {
		        init:function () {

		            this.getData();
		        },
		        getData:function () {
		            $.getJSON("https://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{"goodsID":goodsID},function (data) {     
		            	console.log(data);
		            	console.log(1);
		            	var result = data[0].detail;		         
		            	var newData = result.split("。");
		            	var str1 = '';
		            	var imgs =JSON.parse(data[0].imgsUrl)
		            	for(var i=0;i<imgs.length;i++){
		            		str1 += `
		            				<img src="${imgs[i]}"/>
		            				`;
		            	}
		            	$(".section .img-wrap").html(str1);

		            	var str2 = '';
		            	for(var i=0;i<newData.length;i++){
		            		str2 += `							        
							        <li>${newData[i]}</li>
		            				`;
		            	}
		            	$(".section .list").html(str2);
		            })
		           
		        }

		    }
		}();

		detail.init();

	});
});
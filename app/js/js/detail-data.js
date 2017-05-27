/*
	入口文件
*/
require(['../../config'],function(){
	require(['jquery','swiper'],function($,swiper){

		$(".header-btn.next  .iconfont").on("click",function(){
			window.location.href="http://localhost:81/app/cart.html";
		});
		$(".detail  .right").on("click",function () {
            window.location.href="http://localhost:81/app/detail-data.html";
        })

		var detail = function () {
		    var $wrapper = $(".swiper-wrapper");
		    /*创建siwper*/
		    var swiper = new Swiper('.swiper-container', {
		        pagination: '.my-pagination',
		        slidesPerView: 3,
		        loop:true
		    });
		    return {
		        init:function () {
		            this.getData();
		        },
		        getData:function () {
                    /*var urlquery=window.location.href.split("?")[1];
                    var goodsID = urlquery.split("=")[1];*/

		            $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{"goodsID":10},function (data) {
		            	console.log(data);
		                var goodsData = data;
		                var Imgs = JSON.parse (goodsData[0].imgsUrl);
		                console.log(Imgs)
		                var str = "";
		                for(var i=0;i<Imgs.length;i++){
		                    str+='<div class="swiper-slide"><img src="'+Imgs[i]+'"></div>'
		                }
		                var goodsdetail="";
						goodsdetail=`<p class="pro-name">${goodsData[0].goodsName}</p>
            							<p calss="price">
                						<span class="new">￥${goodsData[0].price}</span>
                						<span class="old">￥</span>
										</p>
										<p class="num">购买人数:
										   <span>${goodsData[0].buynumber}</span>
										</p>`;
						$(".word").html(goodsdetail);
		                $wrapper.html(str);
		                swiper.update();  // 更新Swiper
		                swiper.reLoop(); // 重新对需要循环的slide个数进行计算
		            })
		        }
		    }
		}();

		detail.init();

	});
});
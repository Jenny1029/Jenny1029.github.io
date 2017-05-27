/*
	入口文件
*/
require(['../../config'],function(){
	require(['jquery','swiper',"layer","public"],function($,swiper,layer,public){
        layer.config({
            path: "js/plugin/layer/"
        });

        $(".header-btn.prev").on("click",function () {
            console.log(1);
            window.history.back();
        })

		$(".header-btn.next  .iconfont").on("click",function(){
			window.location.href="cart.html";
		});
		

        layer.ready(function () {
            layer.load(1);
        });

		var detail = function () {
            var $wrapper = $(".swiper-wrapper");
            var goodsData = null;
            var userID = JSON.parse(localStorage.getItem("user") || "[]").userID;
            var allCartData = null;
            var urlquery = window.location.href.split("?")[1];
            var goodsID = urlquery.split("=")[1];
            /*创建swiper*/
            var swiper = new Swiper('.swiper-container', {
                pagination: '.my-pagination',
                slidesPerView: 3,
                loop: true
            });
            return {
                init: function () {
                    $(".detail  .right").on("click",function () {
                        window.location.href="detailData.html?goodsID="+goodsID;
                     });
                    this.getData();
                    this.addCart();
                },
                getData: function () {
                    $.getJSON("https://datainfo.duapp.com/shopdata/getGoods.php?callback=?", {"goodsID": goodsID}, function (data) {
                        layer.closeAll("loading")
                        goodsData = data;
                        var Imgs = JSON.parse(goodsData[0].imgsUrl);
                        var str = "";
                        for (var i = 0; i < Imgs.length; i++) {
                            str += '<div class="swiper-slide"><img src="' + Imgs[i] + '"></div>'
                        }
                        var goodsdetail = "";
                        var old = ( parseFloat(goodsData[0].price) / parseFloat("0." + goodsData[0].discount) ).toFixed(2);
                        goodsdetail = `<p class="pro-name">${goodsData[0].goodsName}</p>
            							<p calss="price">
                						<span class="new">￥${goodsData[0].price}</span>
                						<del class="old">￥${old}</del>
										</p>
										<p class="num">购买人数:
										   <span>${goodsData[0].buynumber}</span>
										</p>`;
                        $(".word").html(goodsdetail);
                        $wrapper.html(str);
                        swiper.update();  // 更新Swiper
                        swiper.reLoop(); // 重新对需要循环的slide个数进行计算

                    })

                },
                addCart: function () {
                    var number;
                    $(".add").on("click", function () {
                        //获取用户的所有的购物车信息
                        $.getJSON("https://datainfo.duapp.com/shopdata/getCar.php?callback=?", {userID: userID}, function (data) {
                            allCartData = data;
                            for (var i = 0, len = allCartData.length; i < len; i++) {
                                if (allCartData[i].goodsID == goodsID) {
                                    console.log(true);
                                    number = allCartData[i].number;
                                    number++;
                                } else {
                                    number = 1;
                                }
                            }

                            //更新购物车信息
                            $.ajax({
                                url: "https://datainfo.duapp.com/shopdata/updatecar.php",
                                data: {
                                    goodsID: goodsID,
                                    userID: userID,
                                    number: number
                                },
                                success: function (data) {
                                    if (data == "1") {
                                        layer.alert("添加购物车成功")
                                    }
                                }
                            });

                        })
                        /*添加购物车事件结束*/
                    })
                }
            }
            }();
            detail.init();

        })
});
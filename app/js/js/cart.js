/**
 * Created by Administrator on 2017/5/25.
 */

require(["../../config"],function () {
        require(["jquery","iScroll","layer","public"],function ($,IScroll,layer,public) {
            layer.config({
                path: "js/plugin/layer/"
            });
                var cart = {
                    userID: JSON.parse(localStorage.getItem("user") || "[]").userID,
                    cartData: [],
                    goodsID: null,
                    totalmoney: 0,
                    totalNum:0,
                    number: 0,
                    // 滚动条
                    myScroll :new IScroll(".cart-content", {
                        scrollbars: true, /*是否显示滚动条*/
                        shrinkScrollbars: 'scale', /*滚动条弹性*/
                        fadeScrollbars: true, /*自动隐藏滚动条*/
                        click: true/*内容可以点击*/
                    }),
                    init: function (){
                        console.log( this.userID)
                        this.getData();
                    },
                    getData: function () {
                       /* layer.ready(function () {
                            layer.load(1);
                        })*/
                        var html = "";

                        var _this = this;
                        if(!this.userID){
                            html = $("<div class='info'>您还没有登录！请登录</div>")
                            $(".section").html(html);
                        }
                        $.getJSON("https://datainfo.duapp.com/shopdata/getCar.php?callback=?", {userID: this.userID}, function (data) {
                           layer.closeAll("loading");
                            _this.cartData = data;
                            _this.totalNum = data.length;
                            console.log(_this.cartData);
                            if (_this.cartData == 0) {

                            } else {
                                for (var i = 0, len = _this.cartData.length; i < len; i++) {
                                    _this.totalmoney += parseInt(_this.cartData[i].number) * _this.cartData[i].price;
                                    html += ` <li class="cart-item"  data-id="${ _this.cartData[i].goodsID}">
                                    <span class="proimg"><img src="${_this.cartData[i].goodsListImg}"/></span>
                                    <div class="prolist">
                                    <p class="proname">${_this.cartData[i].goodsName}</p>
                                    <p class="protype">T恤</p>
                                    <p class="proprice">单价：¥<span class="price">${_this.cartData[i].price}</span></p>
                                    <p class="procount">数量：<a href="javascript:;" class="decrease">-</a><input type="text" disabled 
                                    value="${_this.cartData[i].number}" class="count"/><a class="increase" href="javascript:;">+</a></p>
                                    </div>
                                    <span class="iconfont cartdel">&#xe63e;</span>
                                    </li>`
                                }
                                var bar = $(`<div class="bar">
                                            商品数量：<span class="shopcount">${ _this.totalNum }</span>
                                            应付金额(不含运费)：¥<span class="tolmoney">${_this.totalmoney}</span>
                                    </div>`);
                                $(".cart-content").before(bar);
                                $(".cart-list").html(html);
                            }
                            _this.myScroll.refresh();
                            _this.cartNum();
                        })
                    },
                    cartNum: function () {
                        var _this = this;
                        $(".cart-list").on("click", ".increase", function (e) {
                            e.preventDefault();
                            _this.goodsID = $(this).parents(".cart-item").data("id");
                            _this.number = parseInt($(this).prev().val());
                            _this.number++;
                            $(this).prev().val(_this.number);
                            console.log(_this.goodsID, _this.number);
                            _this.updateCartData();
                            _this.totalmoney +=  parseFloat( $(this).parents(".cart-item").find(".price").html() );
                            $(".tolmoney").html( _this.totalmoney );
                        });

                        $(".cart-list").on("click",".decrease",function (e) {
                            e.preventDefault();
                            _this.goodsID = $(this).parents(".cart-item").data("id");
                            _this.number = parseInt($(this).next().val());
                            if(_this.number<=1) return;
                            _this.number--;
                            $(this).next().val(_this.number);
                            _this.updateCartData();
                            console.log( _this.number );
                            _this.totalmoney -=  parseFloat(  $(this).parents(".cart-item").find(".price").html());
                            $(".tolmoney").html( _this.totalmoney );
                        });

                        $(".cart-list").on("click",".cartdel",function (e) {
                            e.preventDefault();
                            var res = confirm("确定删除该件商品吗？");
                            if(!res) return;
                            _this.goodsID = $(this).parents(".cart-item").data("id");
                            $(this).parents(".cart-item").remove();
                            _this.myScroll.refresh();
                            _this.number =parseInt( $(this).parents(".cart-item").find(".count").val());
                            _this.totalNum--;
                            _this.totalmoney -= _this.number * parseFloat( $(this).parents(".cart-item").find(".price").html() );
                            $(".tolmoney").html( _this.totalmoney );
                            $(".shopcount").html( _this.totalNum );
                                _this.number =0;
                                _this.updateCartData();
                        })
                    },
                    updateCartData: function () {

                        $.ajax({
                            url: " https://datainfo.duapp.com/shopdata/updatecar.php",
                            data: {
                                userID: this.userID,
                                goodsID: this.goodsID,
                                number: this.number
                            },
                            dataType:"json",
                            success: function (data) {
                                console.log(data);
                                if(data == "1") return;
                                if(data =="0"){
                                    alert("添加失败，商品库存不足啦！")
                                }
                            }
                        })

                    }
                }
                cart.init();

})
})

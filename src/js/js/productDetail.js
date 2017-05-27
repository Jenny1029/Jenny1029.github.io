require(["../../config"], function() {
	require(["jquery", "template", "banner","jquery.cookie","jquery.layer","header","search"], function($, template, banner,cookie,layer,header,search) {

		layer.config({
			path:"js/plugin/layer/"
		});
		
		$(function() {
			$.getJSON("json/menu.json", function(data) {
				var menu = template("kindsall", {
					menu: data
				});
				$(".kindsall ul").html(menu);
			});
			
			$(".kindsall").mouseenter(function(){
				$(".kindsall ul").show();
			});
			$(".kindsall").mouseleave(function(){
				$(".kindsall ul").hide();
			})

			//		点击物品小图，切换中图，当鼠标进入middle区域，滤镜显示，放大镜显示
			var glass = {
				imgItem: $(".imgWrap li img"),
				filter: $(".filter"),
				middle: $(".middleimg"),
				//proImg:$(".proimg"),
				middleImg: $(".proimg img"),
				midW: $(".proimg").width(),
				midH: $(".proimg").height(),
				filterW: $(".filter").width(),
				filterH: $(".filter").height(),
				largeImg: $(".largeimg img "),
				largeBox: $(".largeimg"),
				large: $(".large"),
				init: function() {
					this.imgSwitch();
					this.filtermove();
				},
				imgSwitch: function() {
					var _this = this;
					this.imgItem.mouseenter(function() {
						var imgSrc = $(this).data("src");
						_this.imgItem.removeClass("active");
						$(this).addClass("active");
//						不在同一个li里,无法给兄弟元素添加active
						//$(this).addClass("active").siblings().removeClass("active");
						_this.middleImg.attr("src", imgSrc);
						_this.largeImg.attr("src", imgSrc);
					});
				},
				filtermove: function() {
					var _this = this;
					this.middle.mousemove(function(e) {
						_this.filter.show();
						_this.large.show();
						var x = e.clientX;
						var y = e.clientY;
						//console.log(x,y);
						var ot = _this.middle.offset().top;
						var ol = _this.middle.offset().left;
						//console.log(ot,ol);
						var l = x - ot - 90;
						var t = y - ol - 90;
						//console.log(_this.l,_this.t);
						//console.log(l,t);
						l = l < 0 ? 0 : (l > _this.midW - _this.filterW ? _this.midW - _this.filterW : l);
						t = t < 0 ? 0 : (t > _this.midH - _this.filterH ? _this.midH - _this.filterH : t);
						_this.filter.css({
							'left': l,
							"top": t
						});
						_this.largeBox.css({
							left: -2 * l,
							top: -2 * t
						})
					});
					this.middle.mouseleave(function() {
						_this.filter.hide();
						_this.large.hide();
					})
				}
			}
			glass.init();

			var prodetail = {
				data: {},
				init: function() {
					var _this = this;
					//使用模板+json数据添加商品的信息
					$.getJSON("json/data.json", function(data) {
						_this.data = data;
						var prointro = template("prointro", data);
						//console.log(prointro);
						$(".prointro").html(prointro);
						var first = $('.type-content li:first');
						first.addClass('selected');
						var id = first.data('id');
						var src = first.data('large');
						$('.goods-price').html(data.type[id].sale_price);
						$('.stock-num').html(data.type[id].stock);
						$(".proimg img").attr("src", src);
						$(".largeimg img").attr("src",src);
					});

					this.typeSwitch();
					this.increase();
					this.decrease();
					this.input();
					this.addCart();
				},
				typeSwitch: function() {
					var _this = this;
					//事件委托  JQ对象（父元素）.on("事件"，"子选择器"，事件操作)
					$('.prointro').on('click', '.tb-con-item', function() {
						$(".amount-input").val(1);
						$(this).addClass('selected').siblings().removeClass('selected');
						var id = $(this).data('id');
						$('.goods-price').html(_this.data.type[id].sale_price);
						$('.stock-num').html(_this.data.type[id].stock);
						$(".proimg img").attr("src", _this.data.type[id].pic_large);
						$(".largeimg img").attr("src",_this.data.type[id].pic_large);
					});
				},
				increase: function() {

					$('.amount-increase').click(function() {
						var amount = parseInt($(this).prev().val());
						var stock = $('.stock-num').html();
						if(amount >= stock) return;
						amount++;
						$(this).prev().val(amount);
					});
				},
				decrease: function() {
					$(".amount-decrease").click(function() {
						var amount = parseInt($(this).next().val());
						var stock = $('.stock-num').html();
						if(amount <= 1) {
							layer.alert("商品数量不能小于1");
							return;
						}
						amount--;
						$(this).next().val(amount);
					})
				},
				input:function(){
					$(".amount-input").on("input",function(){
						var amount=$(this).val();
						var stock = $('.stock-num').html();
						if(amount==="") return;
						amount = parseInt(amount);
						if(isNaN(amount)){
							amount=1;
						}
						$(this).val(amount);
						if(amount >= stock){
							amount = stock;
						}
						$(this).val(amount);
					})
				},
				addCart:function(){
					$(".addcart").click(function(){
						var goods = $(".tb-con-item.selected");
						var id=goods.data("id");
//						console.log(id);
						var amount = parseInt( $('.amount-input').val() );
//						在cookie里查找是否有cart名的cookie值
						var cart= $.cookie("cart")||'{}';
//						将cart转化为对象
						var cart = JSON.parse(cart);
//						如果cart不存在,就给cart添加内容,然后再重新设置cookie
						if(!cart[id]){
							cart[id]={
								id:id,
								amount:amount
							};
						}else{
							cart[id].amount += amount;
						};
						
						layer.alert("添加购物车成功！")
						$.cookie("cart",JSON.stringify(cart),{expires:365,path:"/"})
						
					});
				}
			}
			prodetail.init();
		})
	})
})
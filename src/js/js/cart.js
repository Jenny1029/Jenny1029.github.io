require(["../../config"], function() {

	require(["jquery", "header", "jquery.cookie", "template", "jquery.layer","search"], function($, header, cookie, template, layer,search) {

		layer.config({
			path: "js/plugin/layer/"
		})
		$(function() {
			var cartItem = {
				data: {},
				cart: {},
				totalNum:0,
				totalMoney:0,
				goodsContain: $(".goods-container"),
				init: function() {
					var _this = this;
					$.getJSON("json/data.json", function(data) {
						_this.data = data;
						//console.log(_this.data,_this.cart);
						var goodsdata = {
							data: _this.data,
							cart: _this.cart
						};
						var cartItem = template("goodsitem", goodsdata);
						//console.log(cartItem);
						_this.goodsContain.html(cartItem);
						_this.readoffset();
					});
					this.readCookie();
					this.increase();
					this.decrease();
					this.input();
					this.delete();
					this.deleteSelect();
					this.select();
					this.selectAll();
				},
				setCookie: function() {
					$.cookie("cart", JSON.stringify(this.cart), {
						expires: 364,
						path: "/"
					})
				},
				readCookie: function() {
					this.cart = $.cookie("cart") || '{}';
					this.cart = JSON.parse(this.cart);
				},
				increase: function() {
					var _this = this;
					this.goodsContain.on("click", ".increase", function() {
						var amount = parseInt($(this).prev().val());
						var stock = $(this).parents(".goods_amount").data("stock");
						//					console.log(stock);
						if(amount >= stock){
							return;
						};
						amount++;
						$(this).prev().val(amount);
						_this.handleMoney($(this), amount);
					})
				},
				decrease: function() {
					var _this = this;
					this.goodsContain.on("click", ".decrease", function() {
						var that = this;
						var amount = parseInt( $(this).next().val() );
						if(amount <= 1) {
							$(this).parents(".goods-item").find(".delete").click();
							return;
						};
						amount--;
						$(this).next().val(amount);
						_this.handleMoney($(this), amount);
					})
				},
				input: function() {
					var _this = this;
					this.goodsContain.on("input", ".amount", function() {
						var amount = parseInt($(this).val());
						console.log(amount);
						if(amount===""){
							amount=1;
						}
						if(isNaN(amount)){
							amount=1;
							console.log(amount);
						}
						$(this).val(amount);
						_this.handleMoney($(this), amount);
					})

				},
				handleMoney: function(obj, amount) {
					var money = amount * obj.parents(".goods-item").find(".goods_price span").html();
					obj.parents(".goods-item").find(".totalmoney").html(money.toFixed(2));
					var id = obj.parents('.goods-item').data('id');
					this.cart[id].amount = amount;
					this.setCookie();
					this.handleInfo();
				},
				
				delete: function() {
					var _this = this;
					this.goodsContain.on('click', '.delete', function() {
						var that = this;
						layer.confirm('确定删除宝贝吗？', function() {
							layer.closeAll();
							$(that).parents('.goods-item').remove();
							var id = $(that).parents('.goods-item').data('id');
							delete _this.cart[id];
							_this.setCookie();
							_this.handleInfo();
						});
					});
				},
				handleInfo: function() {
					var _this=this;
					var totalNum=0;
					var totalMoney=0;
					var allChecked = this.goodsContain.find('input[type=checkbox]:checked');
					console.log(allChecked);
					allChecked.each(function() {
						totalNum++;
						var money = $(this).parents('.goods-item').find('.totalmoney').html();
						totalMoney += parseFloat(money);
					});

					if(this.totalNum > 0) {
						$('.paymoney').addClass('active');
					} else {
						$('.paymoney').removeClass('active');
					}
					$('.cart-toolar .totalnum span').html(totalNum);
					$('.cart-toolar .totalmoney span').html(totalMoney.toFixed(2));
				},
				deleteSelect: function() {
					var _this = this;
					$('.cart-toolar .delete').click(function() {
						var allChecked = _this.goodsContain.find('input[type=checkbox]:checked');
						//判断是否选中
						if(allChecked.length <= 0) {
							layer.alert('请选择商品');
							return;
						}
						layer.confirm('确认删除选中的商品吗？', function() {
							allChecked.each(function() {
								layer.closeAll();
								$(this).parents('.goods-item').remove();
								var id = $(this).parents('.goods-item').data('id');
								delete _this.cart[id];
								_this.setCookie();
								_this.handleInfo();
								$('.cart-toolar input').prop('checked', false);
							});
						});
					});
				},
				select: function() {
					var _this = this;
					this.goodsContain.on('change', 'input[type=checkbox]', function() {
						_this.handleInfo();
						var allChecked = _this.goodsContain.find('input[type=checkbox]:checked');
						var allCheckBox = _this.goodsContain.find('input[type=checkbox]');
						if(allChecked.length === allCheckBox.length) {
							$('.cart-checkedall').prop('checked', true);
						} else {
							$('.cart-checkedall').prop('checked', false);
						}
					});
				},
				
				selectAll: function() {
					var _this = this;
					$('.cart-checkedall').click(function() {
						var status = $(this).prop('checked');
						_this.goodsContain.find('input').prop('checked', status);
						_this.goodsContain.find('input').change();
						$('.cart-checkedallt').prop('checked', status);
					});
				},
				readoffset: function() {
					//设置cart-toolbar的位置
					var ot = $(".cart-toolar").offset().top;
					var docW = document.documentElement.clientHeight;
					$(window).on("scroll", function() {
						var scrolltop = $("body").scrollTop();
						if(ot > docW + scrolltop) {
							$(".cart-toolar").css({
								"position": "fixed",
								"bottom": 0
							})
						} else {
							$(".cart-toolar").css({
								"position": "relative"
							})
							$(".cartmain").append($(".cart-toolcart")[0]);
						}
					})
				}
			}
			cartItem.init();
		})
	})
})
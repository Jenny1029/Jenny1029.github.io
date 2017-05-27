require(["../../config"], function() {

	require(["jquery", "jquery.swiper", "banner", "template", "floor", "jquery.cookie","header","search"], function($, js, banner, template, cookie,header,search) {
			/*随机生成颜色*/
			
			function randomColor(){
				var str="0123456789abcdef";
				var color="#";
				for(var i=0;i<6;i++){
					var r=parseInt(Math.random()*16);
					color+=str[r];
				}
				return color;
			}
			
			$(".yxtmenu-content").on("mouseenter",".menu-item",function(){
				$(".icon").css({
					color:"#636363"
				})
				$(".icon").eq( $(this).index() ).css({
					color:randomColor()
				});
			})
			
			
			/*banner左侧菜单*/
			$.getJSON("json/menu.json", function(data) {
				var html = template("menu", {
					menu: data
				});
				$(".yxtmenu .yxtmenu-content ").html(html);
			});

			banner.init();

			//		选项卡+轮播
			var tabcontrolbanner = $(".tabcontrol-content .tabcontrol-banner");
			$(".tabs-menu .tab-menu-item").mouseenter(function() {
				/*this指的是当前点击的.tab-menu .tab-menu-item 元素,不是JQ对象,用$()将其转化为JQ对象*/
				$(".tabs-menu .tab-menu-item").eq($(this).index()).addClass("active").siblings().removeClass("active");
				tabcontrolbanner.eq($(this).index()).addClass("active").siblings().removeClass("active");
			});

			/*楼层选型卡+轮播*/
			var floor1tabs = $(".floor.f1 .floorlinks li");
			var floor1items = $(".floor.f1 .fr-item");
			floor1tabs.mouseenter(function() {
				floor1tabs.eq($(this).index()).addClass("active").siblings().removeClass("active");
				floor1items.eq($(this).index()).show().siblings().hide();
			});

			var floor2tabs = $(".floor.f2 .floorlinks li");
			var floor2items = $(".floor.f2 .fr-item");
			floor2tabs.mouseenter(function() {
				floor2tabs.eq($(this).index()).addClass("active").siblings().removeClass("active");
				floor2items.eq($(this).index()).show().siblings().hide();
			});

			var floor3tabs = $(".floor.f3 .floorlinks li");
			var floor3items = $(".floor.f3 .fr-item");
			floor3tabs.mouseenter(function() {
				floor3tabs.eq($(this).index()).addClass("active").siblings().removeClass("active");
				floor3items.eq($(this).index()).show().siblings().hide();
			});

			var floor4tabs = $(".floor.f4 .floorlinks li");
			var floor4items = $(".floor.f4 .fr-item");
			floor4tabs.mouseenter(function() {
				floor4tabs.eq($(this).index()).addClass("active").siblings().removeClass("active");
				floor4items.eq($(this).index()).show().siblings().hide();
			});

			var floor5tabs = $(".floor.f5 .floorlinks li");
			var floor5items = $(".floor.f5 .fr-item");
			floor5tabs.mouseenter(function() {
				floor5tabs.eq($(this).index()).addClass("active").siblings().removeClass("active");
				floor5items.eq($(this).index()).show().siblings().hide();
			});

			var floor6tabs = $(".floor.f6 .floorlinks li");
			var floor6items = $(".floor.f6 .fr-item");
			floor6tabs.mouseenter(function() {
				floor6tabs.eq($(this).index()).addClass("active").siblings().removeClass("active");
				floor6items.eq($(this).index()).show().siblings().hide();
			});

			var floor7tabs = $(".floor.f7 .floorlinks li");
			var floor7items = $(".floor.f7 .fr-item");
			floor7tabs.mouseenter(function() {
				floor7tabs.eq($(this).index()).addClass("active").siblings().removeClass("active");
				floor7items.eq($(this).index()).show().siblings().hide();
			});

			var floor8tabs = $(".floor.f8 .floorlinks li");
			var floor8items = $(".floor.f8 .fr-item");
			floor8tabs.mouseenter(function() {
				floor8tabs.eq($(this).index()).addClass("active").siblings().removeClass("active");
				floor8items.eq($(this).index()).show().siblings().hide();
			});

			var floor9tabs = $(".floor.f9 .floorlinks li");
			var floor9items = $(".floor.f9 .fr-item");
			floor9tabs.mouseenter(function() {
				floor9tabs.eq($(this).index()).addClass("active").siblings().removeClass("active");
				floor9items.eq($(this).index()).show().siblings().hide();
			});

			var floor10tabs = $(".floor.f10 .floorlinks li");
			var floor10items = $(".floor.f10 .fr-item");
			floor10tabs.mouseenter(function() {
				floor10tabs.eq($(this).index()).addClass("active").siblings().removeClass("active");
				floor10items.eq($(this).index()).show().siblings().hide();
			});

			/*给楼层每个选项卡下面添加内容*/
			//		一楼
			var html1 = "";
			for(var i = 0; i <= 3; i++) {
				for(var j = 0; j <= 11; j++) {
					html1 += `<li>
					<a href="###">
					<div class="img"><img src="src/../img/f0item${j==i+2?j:i+2}-1.jpg" /></div>
					<p class="proname">妇科千金胶囊</p>
					<p class="proprice">立即购买</p>
					</a>
				</li>`;
				}
				$(".f1 .fr-item.itemother").eq(i).append(html1);
				html1 = "";
			};

			/*二楼*/
			var html2 = "";
			for(var i = 0; i <= 3; i++) {
				for(var j = 0; j <= 11; j++) {
					html2 += `<li>
					<a href="###">
					<div class="img"><img src="src/../img/f1item${j==i+2?j:i+2}-2.jpg" /></div>
					<p class="proname">妇科千金胶囊</p>
					<p class="proprice">立即购买</p>
					</a>
				</li>`;
				}
				$(".f2 .fr-item.itemother").eq(i).append(html2);
				html2 = "";
			};

			/*三楼*/
			var html3 = "";
			for(var i = 0; i <= 2; i++) {
				for(var j = 0; j <= 11; j++) {
					html3 += `<li>
					<a href="###">
					<div class="img"><img src="src/../img/f3item${j==i+2?j:i+2}-2.jpg" /></div>
					<p class="proname">妇科千金胶囊</p>
					<p class="proprice">立即购买</p>
					</a>
				</li>`;
				}
				$(".f3 .fr-item.itemother").eq(i).append(html3);
				html3 = "";
			};

			//		四楼
			var html4 = "";
			for(var i = 0; i <= 3; i++) {
				for(var j = 0; j <= 11; j++) {
					html4 += `<li>
					<a href="###">
					<div class="img"><img src="src/../img/f4item${j==i+2?j:i+2}-2.jpg" /></div>
					<p class="proname">妇科千金胶囊</p>
					<p class="proprice">立即购买</p>
					</a>
				</li>`;
				}
				$(".f4 .fr-item.itemother").eq(i).append(html4);
				html4 = "";
			};

			var html5 = "";
			for(var i = 0; i <= 0; i++) {
				for(var j = 0; j <= 11; j++) {
					html5 += `<li>
					<a href="###">
					<div class="img"><img src="src/../img/f5item${j==i+2?j:i+2}-2.jpg" /></div>
					<p class="proname">妇科千金胶囊</p>
					<p class="proprice">立即购买</p>
					</a>
				</li>`;

				}
				$(".f5 .fr-item.itemother").eq(i).append(html5);
				html5 = "";
			};

			//		六楼		
			var html6 = "";
			for(var i = 0; i <= 4; i++) {
				for(var j = 0; j <= 11; j++) {
					html6 += `<li>
					<a href="###">
					<div class="img"><img src="src/../img/f6item${j==i+2?j:i+2}-2.jpg" /></div>
					<p class="proname">妇科千金胶囊</p>
					<p class="proprice">立即购买</p>
					</a>
				</li>`;

				}
				$(".f6 .fr-item.itemother").eq(i).append(html6);
				html6 = "";
			};

			var html7 = "";
			for(var i = 0; i <= 1; i++) {
				for(var j = 0; j <= 11; j++) {
					html7 += `<li>
					<a href="###">
					<div class="img"><img src="src/../img/f7item${j==i+2?j:i+2}-2.jpg" /></div>
					<p class="proname">妇科千金胶囊</p>
					<p class="proprice">立即购买</p>
					</a>
				</li>`;

				}
				$(".f7 .fr-item.itemother").eq(i).append(html7);
				html7 = "";
			};

			var html8 = "";
			for(var i = 0; i <= 5; i++) {
				for(var j = 0; j <= 11; j++) {
					html8 += `<li>
					<a href="###">
					<div class="img"><img src="src/../img/f8item${j==i+2?j:i+2}-2.jpg" /></div>
					<p class="proname">妇科千金胶囊</p>
					<p class="proprice">立即购买</p>
					</a>
				</li>`;

				}
				$(".f8 .fr-item.itemother").eq(i).append(html8);
				html8 = "";
			};

			var html9 = "";
			for(var i = 0; i <= 4; i++) {
				for(var j = 0; j <= 11; j++) {
					html9 += `<li>
					<a href="###">
					<div class="img"><img src="src/../img/f9item${j==i+2?j:i+2}-2.jpg" /></div>
					<p class="proname">妇科千金胶囊</p>
					<p class="proprice">立即购买</p>
					</a>
				</li>`;

				}
				$(".f9 .fr-item.itemother").eq(i).append(html9);
				html9 = "";
			};

			var html10 = "";
			for(var i = 0; i <= 4; i++) {
				for(var j = 0; j <= 11; j++) {
					html10 += `<li>
					<a href="###">
					<div class="img"><img src="src/../img/f10item${j==i+2?j:i+2}-2.jpg" /></div>
					<p class="proname">妇科千金胶囊</p>
					<p class="proprice">立即购买</p>
					</a>
				</li>`;

				}
				$(".f10 .fr-item.itemother").eq(i).append(html10);
				html10 = "";
			};

			$(".floorcontent  .f3").after($('<div class="floorafter"><a href="###" class="clearfix"><img src="src/../img/f3after.jpg"><a><div>'));
			$(".floorcontent  .f6").after($('<div class="floorafter"><a href="###" class="clearfix"><img src="src/../img/f6after.jpg"><a><div>'));
			$(".floorcontent .f10").after($('<div class="floorafter"><a href="###" class="clearfix"><img src="src/../img/f10after.jpg"><a><div>'));
		
	});
});
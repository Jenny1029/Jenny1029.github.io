define(["jquery"], function() {
	/*一心堂楼层导航*/
	var flag = true;
	var floormenuItem = $(".floormenu .floormenu-item");
	var floorItem = $(".floor");
	floormenuItem.mouseenter(function() {
		$(this).addClass("active").siblings().removeClass("active");
	});
	floormenuItem.mouseleave(function() {
		$(this).removeClass("active");
	});
	floormenuItem.click(function() {
		flag=false;
		$(this).addClass("active").siblings().removeClass("active");
		var ft = floorItem.eq($(this).index()).offset().top;
		$("html,body").animate({
			scrollTop: ft
		}, function() {
			flag = true;
		});
	});

	var ch = document.documentElement.clientHeight;
	
	var t;
	function floor(){
			t = $("body").scrollTop();
			var f1top = $(".floor").eq(0).offset().top;

			if( t>f1top) {
				$(".floormenu").fadeIn();
			} else {
				$(".floormenu").fadeOut();
			}
	}
	function scroll() {
		floor()
		$(window).on("scroll", function() {
			floor();
			if(!flag) return;
			floorItem.each(function(i) {
				var ot = $(this).offset().top;
				var h = $(this).height();
				if((ot < t + ch / 2) &&
					(t + h > ot)) {
					floormenuItem.eq(i).addClass("active").siblings().removeClass("active");
				}
			})

		});
	}
	scroll();
	
	
	/*回到顶部*/
	$(".floormenu-itembottom").click(function(){
		flag=false;
		$("html,body").animate({
			scrollTop:0
		},function(){
			flag=true;
		})
	})
})
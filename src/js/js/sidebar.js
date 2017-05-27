define(["jquery"], function($) {
	/*侧边栏鼠标滑过*/
	var sideicon = $(".sideicon");
	var hovercontent = $(".sidehovercontent");
	sideicon.mouseenter(function() {
		$(this).css({
			"background": "#d40715"
		});
		$(this).next().stop(true).animate({
			left: -75
		}, 500);
	});
	sideicon.mouseleave(function() {
		$(this).css({
			"background": "black"
		});
		$(this).next().stop(true).animate({
			left: 41
		}, 500);
	});

	/*控制侧栏的位置居中*/

	var sideTreeH = $(".sidebar-tree").height();
	var docH = document.documentElement.clientHeight;
	$(".sidebar-tree").css({
		top: (docH - sideTreeH) / 2
	});
	$(window).resize(function() {
		var docHtotal = document.documentElement.clientHeight;
		$(".sidebar-tree").css({
			top: (docHtotal - sideTreeH) / 2
		});
	});
	
	$(".sidebar-tabs-item.bottom .sideicon").click(function(){
		
		$("html,body").animate({
			scrollTop:0
		})
	});
})
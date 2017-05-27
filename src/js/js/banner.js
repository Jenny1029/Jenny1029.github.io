define(["jquery", "jquery.swiper"], function($, swiper) {
	
	function Banner(banner,imgWrap,imgItem,preBtn,nextBtn,circleItem) {
		this.banner=banner||$();
		this.imgWrap=imgWrap||$();
		this.imgItem=imgItem||$();
		this.preBtn=preBtn||$();
		this.nextBtn=nextBtn||$();
		this.circleItem=circleItem||$();
		this.imgWidth=this.imgItem.outerWidth();
		this.timer=null;
		this.index=0;
		this.init=function(){
			this.click();
		};
		this.imgSwitch=function(){
			if(this.index>=this.imgItem.length){
				this.imgWrap.css({"margin-left":0});
				this.index=1;
			}
			if(this.index<=-1){
				this.imgWrap.css({
					"margin-left":-(this.imgWidth*this.imgItem.length-1)
				});
				this.index=this.imgItem.length-2;
			}
			this.imgWrap.stop(true).animate({"margin-left":-(this.imgWidth*this.index)});
			this.circleItem.removeClass("active");
			this.circleItem.eq(this.index).addClass("active");
		};
		this.click=function(){
			var _this=this;
			this.preBtn.click(function(){
				_this.index--;
				_this.imgSwitch();
			});
			this.nextBtn.click(function(){
				_this.index++;
				_this.imgSwitch();
			});
		}
	}
	
	var carousel = new Banner($(".carousel-banner-content"),$(".carousel-container"),$(".carousel-slider"),$(".carousel-btn.pre"),$(".carousel-btn.next"));
	carousel.init();
	
	var rightB1 = new Banner($(".rightbanner.b1"),$(".rightbanner-container.b1"),$(".rightbanner-slider.b1"),$(".rightbanner-btn.next.next1"),$(".rightbanner-btn.prev.prev1"));
	rightB1.init();
	
	var rightB2 = new Banner($(".rightbanner.b2"),$(".rightbanner-container.b2"),$(".rightbanner-slider.b2"),$(".rightbanner-btn.next.next2"),$(".rightbanner-btn.prev.prev2"));
	rightB2.init();
	
	var rightB3 = new Banner($(".rightbanner.b3"),$(".rightbanner-container.b3"),$(".rightbanner-slider.b3"),$(".rightbanner-btn.next.next3"),$(".rightbanner-btn.prev.prev3"));
	rightB3.init();
	
	/*楼层轮播*/
	var floor1Banner=new Banner($(".f1 .fllogocontainer"),$(".f1 .fllogoWrap"),$(".f1 .fllogoslider"),$(".f1 .fllogoBtn.pre"),$(".f1 .fllogoBtn.next"));
	floor1Banner.init();
	
	var floor2Banner=new Banner($(".f2 .fllogocontainer"),$(".f2 .fllogoWrap"),$(".f2 .fllogoslider"),$(".f2 .fllogoBtn.pre"),$(".f2 .fllogoBtn.next"));
	floor2Banner.init();
	
	var floor3Banner=new Banner($(".f3 .fllogocontainer"),$(".f3 .fllogoWrap"),$(".f3 .fllogoslider"),$(".f3 .fllogoBtn.pre"),$(".f3 .fllogoBtn.next"));
	floor3Banner.init();
	
	var floor3Banner=new Banner($(".f3 .fllogocontainer"),$(".f3 .fllogoWrap"),$(".f3 .fllogoslider"),$(".f3 .fllogoBtn.pre"),$(".f3 .fllogoBtn.next"));
	floor3Banner.init();
	
	var floor4Banner=new Banner($(".f4 .fllogocontainer"),$(".f4 .fllogoWrap"),$(".f4 .fllogoslider"),$(".f4 .fllogoBtn.pre"),$(".f4 .fllogoBtn.next"));
	floor4Banner.init();
	
	var floor5Banner=new Banner($(".f5 .fllogocontainer"),$(".f5 .fllogoWrap"),$(".f5 .fllogoslider"),$(".f5 .fllogoBtn.pre"),$(".f5 .fllogoBtn.next"));
	floor5Banner.init();
	
	var floor6Banner=new Banner($(".f6 .fllogocontainer"),$(".f6 .fllogoWrap"),$(".f6 .fllogoslider"),$(".f6 .fllogoBtn.pre"),$(".f6 .fllogoBtn.next"));
	floor6Banner.init();
	
	var floor7Banner=new Banner($(".f7 .fllogocontainer"),$(".f7 .fllogoWrap"),$(".f7 .fllogoslider"),$(".f7 .fllogoBtn.pre"),$(".f7 .fllogoBtn.next"));
	floor7Banner.init();
	
	var floor8Banner=new Banner($(".f8 .fllogocontainer"),$(".f8 .fllogoWrap"),$(".f8 .fllogoslider"),$(".f8 .fllogoBtn.pre"),$(".f8 .fllogoBtn.next"));
	floor8Banner.init();
	
	var floor9Banner=new Banner($(".f9 .fllogocontainer"),$(".f9 .fllogoWrap"),$(".f9 .fllogoslider"),$(".f9 .fllogoBtn.pre"),$(".f9 .fllogoBtn.next"));
	floor9Banner.init();
	
	var floor10Banner=new Banner($(".f10 .fllogocontainer"),$(".f10 .fllogoWrap"),$(".f10 .fllogoslider"),$(".f10 .fllogoBtn.pre"),$(".f10 .fllogoBtn.next"));
	floor10Banner.init();
	
	//productdetail详情页物品图片轮播
	var detailBanner = new Banner($(".imgcontainer"),$(".imgWrap"),$(".imgWrap li"),$(".proimg-btn.prev"),$(".proimg-btn.next"));
	detailBanner.init();
	
	
	var bannerimg = {
		imgItem: $(".bannerImg ul li img"),
		imgWidth: $(".bannerImg ul li").width(),
		bannerImg: $(".bannerImg"),
		banner: $(".bannerImg ul"),
		pagination: $(".pagination .pagination-item"),
		index: 0,
		timer: null,
		init: function() {
			this.autoplay();
			this.mouseEvent();
			this.paginationEnter();
		},
		autoplay: function() {
			var _this = this;
			this.timer = setInterval(function() {
				_this.imgSwitch();
			},2000)
		},
		imgSwitch: function() {
			var _this = this;
			this.banner.stop(true).animate({
				"margin-left": -(this.index * this.imgWidth)
			},1000);
			this.pagination.removeClass("active");
			this.pagination.eq(this.index).addClass("active");
			this.index++;
			this.index %= this.imgItem.length;
		},
		mouseEvent: function() {
			var _this = this;
			this.bannerImg.mouseenter(function() {
				clearInterval(_this.timer);
			});
			this.bannerImg.mouseleave(function() {
				_this.autoplay();
			});
		},
		paginationEnter: function() {
			var _this = this;
			for(var i = 0; i < this.pagination.length; i++) {
				(function(j) {
					_this.pagination.eq(j).mouseenter(function() {
						_this.index = j;
						_this.imgSwitch();
					})
				})(i);
			}
		}
	};
	bannerimg.init();
	
	function headerService() {
		$('.swiper-container').swiper({
			loop: true, //是否无缝
			autoplay: 2000, //自动轮播
			paginationType: "custom",
			pagination: '.swiper-pagination',
			nextButton: '.arrow-left',
			prevButton: '.arrow-right'
		});
	}
	return {
		init: headerService
	};
});
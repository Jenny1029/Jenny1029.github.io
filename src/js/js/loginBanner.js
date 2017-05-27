define(["jquery"],function(){
	
	/*登录页面背景切换*/
	var loginBanner={
		loginBanner : $(".loginbody"),
		loginWrap : $(".loginbgWrap"),
		loginItem : $(".loginbgWrap  .loginbg"),
		index:0,
		timer:null,
		itemWidth :$(".loginbgWrap  .loginbg").width(),
		init:function(){
			this.autoplay();
		},
		autoplay:function(){
			var _this=this;
			this.timer=setInterval(function(){
				_this.index++;
				if(_this.index >= _this.loginItem.length){
					_this.loginWrap.css({"margin-left":0});
					_this.index=1;
				}
				_this.loginWrap.stop(true).animate({"margin-left":-(_this.itemWidth*_this.index)},500);
			},2000);
			
		}
	};
	loginBanner.init();
	
})

	
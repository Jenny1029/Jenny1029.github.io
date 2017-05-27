require.config({
	
	baseUrl:"js",
	
	paths: {
		"jquery":"lib/jquery",
		"iScroll":"plugin/iscroll",
		"swiper":"plugin/swiper.min",
		"layer":"plugin/layer/layer",
		"public":"js/public"
	},
	//处理非AMD规范的模块
	shim: {
		/*"swiper":["zepto"],
		"iscroll":["zepto"]*/
	}
});
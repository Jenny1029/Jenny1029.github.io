require.config({
	
	baseUrl:"js",
	
	paths: {
		"jquery":"lib/jquery",
		"jquery.swiper":"plugin/swiper.jquery.min",
		"banner":"js/banner",
		"template":"plugin/template",
		"floor":"js/floor",
		"loginBanner":"js/loginBanner",
		"jquery.layer":"plugin/layer/layer",
		"header":"js/header",
		"jquery.cookie":"plugin/jquery.cookie",
		"sidebar":"js/sidebar",
		"search":"js/search"
	},
	//处理非AMD规范的模块
	shim: {
		"jquery.swiper":["jquery"],
		"jquery.layer":["jquery"],
		"jquery.cookie":["jquery"]
	}
});
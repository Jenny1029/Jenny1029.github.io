define(["jquery","jquery.cookie"],function($,cookie){
	$("header").load("header.html", function() {
				//读取cookie，判断用户是否登录，填充信息
				var userinfo = $.cookie("userinfo");
				if(userinfo) {
					userinfo = JSON.parse(userinfo);
					//用户处于登录状态,更改信息
					if(userinfo.login_status) {
						$('.toplinks .loginlinks').html($('<a href=" ">' + userinfo.account + '</a>'));
						$(".toplinks .regesiterlinks").html($('<a href="" class="logoutBtn">退出</a>'));
					} else {
						$('.toplinks .loginlinks').html($('<a href=" ">' + userinfo.account + '</a>   <a href="login.html">请登录</a>'));
					}
				}
				$('.toplinks .logoutBtn').click(function() {
					var info = {
						account: userinfo.account,
						login_status: 0
					};
					$.cookie('userinfo', JSON.stringify(info), {
						expires: 365,
						path: '/'
					});
					location.href = "login.html";
				});

				/*鼠标经过手机一心堂图标变化*/
				$(".fixtop .toplinks li:nth-child(6)").mouseenter(function() {
					$(".fixtop .toplinks span").stop(true).animate({
						"background-position-y": "-33px"
					})
				});
				$(".fixtop .toplinks li:nth-child(6)").mouseleave(function() {
					$(".fixtop .toplinks span").stop(true).animate({
						"background-position-y": "-2px"
					})
				});
			});
			/*添加公共的header、footer、sidebar*/
			
			$("footer").load("footer.html");
			$(".sidebar").load("sidebar.html",function(){
				require(["sidebar",function(){
					
				}])
			});
})
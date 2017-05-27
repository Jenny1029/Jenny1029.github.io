require(["../../config"], function() {
	require(["jquery", "loginBanner", 'jquery.layer', "jquery.cookie"], function($, banner, layer, cookie) {

		layer.config({
			path: "js/plugin/layer/"
		});
		//生成验证码
		function createVerify() {
			var verify = "";
			var num = "0123456789abcdefghijklmnopqrstuvwxyz";
			for(var i = 0; i < 6; i++) {
				var index = parseInt(Math.random() * 35);
				verify += num[index];
			}
			$(".verify .verifynum").html(verify);
			return verify;
		}
		createVerify();
		$(".verify a").click(function() {
			createVerify();
		});

		function judgeVerify() {
			var verify = $(".verify input").val().toLowerCase();
			var verifyNum = $(".verify .verifynum").html();
			console.log(verify, verifyNum);
			if(verify != verifyNum) {
				layer.alert("请输入正确的验证码！")
			}
		}
		$(".verify input").blur(function() {
			judgeVerify();
		})
		$('.loginbtn').click(function() {
			var account = $('.user input').val();
			var psw = $('.password input').val();
			var verify = $(".verify input").val();
			//判断是否输入为空
			if(account == '' || psw == '' || verify == '') {
				layer.alert('用户名、密码、验证码不能为空');
				return;
			}

			judgeVerify();

			function remember() {
				//使用ajax进行登录
				$.ajax({
					type: 'post',
					url: 'http://10.9.151.199/PC-Project-Admin/login.php',
					data: {
						account: account,
						password: psw
					},
					dataType: 'jsonp',
					success: function(data) {
						console.log(data);
						if(data.status) {
							layer.alert('登录成功');
							var userinfo = {
								account: account,
								login_status: 1
							};
							//创建一个cookie	 $.cookie("cookieName","cookieValue",有效时间，地址)
							$.cookie('userinfo', JSON.stringify(userinfo), {
								expires: 365,
								path: '/'
							});
							location.href = 'index.html';
						} else {
							layer.alert('登录失败');
						}
					}
				});
			}
			if($(".autologin  input[type=checkbox]").prop("checked", true)) {
				remember();
			}

		});
		//		点击登录按钮事件结束
	})
})
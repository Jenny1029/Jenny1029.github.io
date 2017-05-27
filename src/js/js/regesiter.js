require(["../../config"], function() {
	require(["jquery", "loginBanner", "jquery.layer"], function($, banner, layer) {
		layer.config({
			path: "js/plugin/layer/"
		});

		//		随机生成验证码
		function createVerify() {
			var verify = "";
			var num = "0123456789abcdefghijklmnopqrstuvwxyz";
			for(var i = 0; i < 6; i++) {
				var index = parseInt(Math.random() * 35);
				verify += num[index];
			}
			$(".verify .verifynum").html(verify);
		}
		createVerify();
		$(".verify a").click(function() {
			createVerify();
		});

		//		随机生成短信验证码
		var messVerify = "";

		function createmessVerify() {
			messVerify = ("0000" + parseInt(Math.random() * Math.pow(10, 4))).substr(-4);
			return messVerify;
		}
		$(".messageVerify .messagebtn").click(function() {
			createmessVerify();
			console.log(messVerify);
		});

		//		判断用户名是否合法，是否存在
		//		定义需要用到的信息
		var userInfo = {
			uname: false,
			phone: false,
			verify: false,
			messVerify: false,
			pwd: false,
			conPwd: false
		}

		var unameInput = $(".user input");
		var phoneInput = $(".phone input");
		var verifyInput = $(".verify input");
		var messVerifyInput = $(".messageVerify input");
		var pwdInput = $(".password input");
		var conPwdInput = $(".password input");
		var regBtn = $(".regesiterbtn");

		//		账号验证
		var regUname = /^[a-zA-Z_]\w{5,15}$/;
		unameInput.blur(function() {
			var uname = unameInput.val();
			userInfo.uname = true;
			if(!regUname.test(uname)) {
				layer.alert("用户名输入不合法！请输入6-16位的由字母和数字组成的用户名，且不能以数字开头");
				userInfo.uname = false;
				return;
			}

			//			验证用户名是否存在
			$.ajax({
				url: 'http://10.9.151.199/PC-Project-Admin/checkAccount.php',
				data: {
					account: uname
				},
				dataType: 'jsonp',
				success: function(data) {
					console.log(data);
					if(data.status) {
						layer.alert('用户名可用');
					} else {
						layer.alert('用户名已存在');
						userInfo.uname = false;
						return;
					}
				}
			});

		});

		//		验证手机号是否合法
		var regPhone = /^1[3578]\d{9}$/;
		phoneInput.blur(function() {
			var phone = phoneInput.val();
			userInfo.phone = true;
			if(!regPhone.test(phone)) {
				layer.alert("请输入正确的电话号码！");
				userInfo.phone = false;
				return;
			}
		});

		//		验证码判断
		verifyInput.blur(function() {
			var verify = verifyInput.val().toLowerCase();
			var verifyNum = $(".verify .verifynum").html();
			//var regVerify= new RegExp(verify,[i]);
			userInfo.verify = true;
			if(verify != verifyNum) {
				layer.alert("验证码输入不正确！");
				userInfo.verify = false;
				return;
			}
		});

		//		短信验证码
		messVerifyInput.blur(function() {
			var messageVerify = messVerifyInput.val();
			userInfo.messVerify = true;
			if(messageVerify != messVerify) {
				layer.alert("请输入正确的短信验证码");
				userInfo.messVerify = false;
				return;
			}
		});

		//		密码验证
		var regPwd1 = /^\d+$/;
		var regPwd2 = /^[\da-zA-Z]+$/;
		var regPwd3 = /^[@#$%*&\w]+$/;
		pwdInput.on("input", function() {
			var pwd = pwdInput.val();
			userInfo.pwd = true;
			if(pwd.length >= 6 && pwd.length <= 16) {
				if(pwd.match(regPwd1)) {
					$(".pwdprogress .danger").show().siblings().hide();
				} else if(pwd.match(regPwd2)) {
					$(".pwdprogress .waning").show().siblings().hide();
				} else if(pwd.match(regPwd3)) {
					$(".pwdprogress .safe").show().siblings().hide();
				}
			}
		});

		pwdInput.blur(function() {
			var pwd = pwdInput.val();
			userInfo.pwd = true;
			if(pwd.length < 6 || pwd.length > 16) {
				layer.alert("请输入6-16位的密码");
				$(".pwdprogress").find("span").hide();
				pwdInput.val("");
				userInfo.pwd = false;
				return;
			}
		})

		//		确认密码
		conPwdInput.blur(function() {
			userInfo.conPwd = true;
			var conPwd = conPwdInput.val();
			if(conPwd != pwdInput.val()) {
				layer.alert("两次输入的密码不一样！");
				userInfo.conPwd = false;
				return;
			}
		});

		//	点击注册按钮
		regBtn.click(function() {
			for(var i in userInfo) {
				//如果找到某个输入不合法，做出相应的提示并返回
				if(!userInfo[i]) {
					layer.alert('部分数据不合法');
					return;
				}
			}
			$.ajax({
				type: 'post',
				url: 'http://10.9.151.199/PC-Project-Admin/register.php',
				data: {
					account: unameInput.val(),
					password: pwdInput.val()
				},
				dataType: 'jsonp',
				success: function(data) {
					if(data.status) {
						layer.alert('注册成功');
						location.href="login.html"
					} else {
						alert('注册失败');
					}
				}
			});
		});
	})
})
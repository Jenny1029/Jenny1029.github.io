/*
	入口文件
*/

require(['../../config'],function(){
	require(['jquery'],function(){
		//var regBtn = document.getElementsByClassname("reg-btn");

		$(".header-btn.prev").on("click",function () {
			console.log(1);
			window.history.back();
        })
		$(".reg-btn").on("click",function(){
			var $uname = $("#username").val(),
				$psw = $("#password").val(),
				$confirmPsw =$(".item-text.confirm").val();
				if($psw!=$confirmPsw){
					alert('俩次密码输入不一致,请重新输入');
				}
			$.get("https://datainfo.duapp.com/shopdata/userinfo.php",{'status':'register','userID':$uname,'password':$psw},function(data){
				if(data=1){
					window.location.href = "login.html";
				}
			})
		});	
	});
});
/**
 * Created by Administrator on 2017/5/25.
 */

require(["../../config"],function () {
    require(["jquery","layer"],function ($,layer) {
        layer.config({
            path: "js/plugin/layer/"
        });

        $(".login").on("click",function () {
            window.location.href="list.html";
        })
        $(".reg").on("click",function () {
            window.location.href="regesiter.html"
        })
        var showPwd = $(".showPwd input");
        showPwd.click(function () {
            if(showPwd.prop("checked")==true){
                $(".password input").attr("type","text")
            }else{
                $(".password input").attr("type","password")
            }
        })
        $(".login").on("click",function () {
            var user = $(".user input").val();
            var pwd =$(".password input").val();
            console.log(user,pwd);
            $.getJSON("https://datainfo.duapp.com/shopdata/userinfo.php?",
                {status:"login",userID:user,password:pwd},function (data) {
                console.log(data);
                    if(data=="0") {
                        alert("您还没有注册，请快快注册吧！")
                    }else if( data=="2" ){
                        alert("您的密码错误！")
                    }else{
                        alert("登录成功！")
                        var userData = data;
                        var localData = localStorage.getItem( "user");
                        localData = JSON.parse( localData||'[]' );
                        if(userData.userID == localData.userID) return;
                            localStorage.setItem("user",JSON.stringify(userData));

                    }

                })
        })


    })
})

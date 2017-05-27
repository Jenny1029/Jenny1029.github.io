/**
 * Created by Administrator on 2017/5/25.
 */

require(["../../config"],function () {
    require(["jquery","layer","public"], function ($,layer,public) {

        layer.config({
            path: "js/plugin/layer/"
        });

        $(".userpic").on("click",function () {
            $(".model").show();
        })

        $(".model  .choice-item").on("click",function () {
            $(".model").hide();
        })

        var userID =JSON.parse( localStorage.getItem("user")).userID;
        console.log(userID);
        $.getJSON("https://datainfo.duapp.com/shopdata/getuser.php?callback=?",{userID:userID},function (data) {
            console.log(data);
            var user = data;
            console.log(user[0].userimg_url,user[0].userID);
            $(".userpic  img").attr("src",user[0].userimg_url);
            $(".name").html(user[0].userID);
            $(".usermoney .red").html()
        })

        // $(".usermoney  .red").html(userData.)

    })
})

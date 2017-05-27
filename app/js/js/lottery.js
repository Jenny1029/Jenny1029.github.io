/**
 * Created by Administrator on 2017/5/26.
 */

require(["../../config"],function () {
    require(["jquery","layer"],function ($,layer) {
        layer.config({
            path: "js/plugin/layer/"
        });

        layer.ready(function () {
            layer.load();
        })

        var str="";
        $.getJSON("https://datainfo.duapp.com/lottery/getsuerfr.php?callback=?",function (data) {
            console.log(data);
            for(var i=0;i<data.length;i++){

            }
            str+=
            layer.closeAll();
        })

    })
})

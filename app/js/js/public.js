/**
 * Created by Administrator on 2017/5/27.
 */

define(["jquery"],function ($) {
    $("footer li a").on("click",function () {
        $("footer li a").removeClass("active");
        $(this).addClass("active");
    })
})
/*
	入口文件
*/

require(['../../config'],function(){
	require(['jquery','iScroll','layer',"public"],function($,IScroll,layer,public){
		layer.config({
			path:"js/plugin/layer/"
		});


        var myScroll = new IScroll(".cart-content", {
            scrollbars: true, /*是否显示滚动条*/
            shrinkScrollbars: 'scale', /*滚动条弹性*/
            fadeScrollbars: true, /*自动隐藏滚动条*/
            click: true/*内容可以点击*/
        });
        var myScroll = new IScroll(".title", {
            scrollbars: true, /*是否显示滚动条*/
            shrinkScrollbars: 'scale', /*滚动条弹性*/
            fadeScrollbars: true, /*自动隐藏滚动条*/
            click: true/*内容可以点击*/
        });


		var list = function(){
		    var classID = 0; //默认的分类id
		    var pageCode=0;
		    var linenumber =6;
		    var aData = [];
		    return {
		    	init:function () {
		            this.getClassData();
		            this.getData();
		            this.bindEvent();
		        },
		        getClassData:function () {
		          	$.get("http://datainfo.duapp.com/shopdata/getclass.php",function (data) {
				        var str = "";
				        for(var i=0;i<data.length;i++){
			              	str+='<li data-id="'+data[i].classID+'">'+data[i].className+'</li>'
			          	}
				        $(".section-title").html(str);
				    },"json")
		        },
		        getData:function () {
		    		var _this = this;
		        	/*layer.ready(function(){
		        	    layer.load(1);
		        	})*/
		            $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?&classID="+classID+"&pageCode="+pageCode+"&linenumber="+linenumber,function (data){
		            	aData = data;
		            	layer.closeAll( "loading" );
						var str = "";
			            /*字符串拼接*/
			            for(var i=0;i<data.length;i++){
			            	str +=  '<li>'+
					                    '<a href="javascript:;" data-id="'+data[i].goodsID+'"><img src="'+data[i].goodsListImg+'" alt="">'+
											'<p class="pro-name">'+data[i].goodsName+'</p>'+
											'<p class="price">'+
												'<span>'+data[i].price+'</span>'+
												'<del>'+data[i].price+'</del>'+
											'</p>' +
										'</a>'+
					                '</li>'
			            }
			            if(pageCode==0){
		                    //替换数据
		                    $(".cart-list").html(str);
		                }else {
		                    $(".cart-list").html($(".cart-list").html()+str);
		                }
		                myScroll.refresh();
                        _this.href();
					})
		        },
		        bindEvent:function () {
		            var _this = this;
		            /*切换分类*/
		            $(".section-title").on("click","li",function () {
		               classID =  $(this).attr("data-id");
		                pageCode = 0;
		                _this.getData()
		            });
                    myScroll.on("scrollEnd",function () {
                        if(this.y==this.maxScrollY){
                            pageCode++;
                            _this.getData()
                        }
                    })
		        },
		        href:function(){
		        	$(".cart-list").on("click","a",function(){
		        		console.log(1)
						var id = $(this).attr("data-id");
						var proData = {};
						for(var i=0,len=aData.length;i<len;i++){
							if(aData[i].goodsID == id){
								proData = aData[i];
								break;
							}
						}
						var proHistory = JSON.parse(localStorage.getItem("proHistory") || '[]');
						for(var i=0;i<proHistory.length;i++){
							console.log( proHistory )
							if(proHistory[i].goodsID==id){
								proHistory.splice(i,1);
								break;
							}
						}
						proHistory.unshift(proData);
						console.log(proHistory)
						localStorage.setItem("proHistory",JSON.stringify(proHistory));
						
						window.location.href = "detail.html?goodsID="+id;
					});
		        }


		    }
		}();
		list.init();

	});
});
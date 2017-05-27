define(["jquery"],function($){
	$(".search-suggest  .search-input").on("input",function(){
		$(".search-result").show();
		$.ajax({
			type:"get",
			url:'http://suggestion.baidu.com/su',
			data:{
				wd:$(this).val()
			},
			dataType:"jsonp",
			jsonp:"cb",
			success:function(data){
				$(".search-result").show();
				$(".search-result").empty();
				for(var i in data.s){
					var li = $('<li class="result-item"><a href="http://www.baidu.com/s?wd='+data.s[i]+'">'+data.s[i]+'</a></li>');
					$(".search-result").append(li);
				}
			}
		});
	});
	$(".search-suggest  .search-input").blur(function(){
		$(".search-result").hide();
	})
	
})
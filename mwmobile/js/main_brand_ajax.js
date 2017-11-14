$(document).ready(function(){
	// 브랜드 더보기
	$(".box_brand .btn_more").on("click", function(e){
		var $box = $(this).parents('.box_brand');

		if($box.hasClass('on') !== true){
			$box.addClass('on');
		}else{
			$box.removeClass('on');
		}
	});

});

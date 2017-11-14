var MobileFlower = {
	name : "MobileFlower",
	init : function(){
		MobileFlower.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_detail").unbind("click").click(function(event){
				var id = $(this).attr("id");
				var img = "";
				if(id == "laneige"){
					img = GLOBAL_IMG_URL+"event/event2015/01_laneige_pop.jpg";
				}else if(id == "primera"){
					img = GLOBAL_IMG_URL+"event/event2015/02_primera_pop.jpg";
				}else if(id == "iope"){
					img = GLOBAL_IMG_URL+"event/event2015/03_iope_pop.jpg";
				}else if(id == "hanyul"){
					img = GLOBAL_IMG_URL+"event/event2015/04_hanyul_pop.jpg";
				}
					
				$("#modal_img_detail").attr("src",img);
				MobileFlower.fn.modalPopup("#modalPopupFlowerDetail");
			});
		},
		modalPopup : function (e){
		    
		    var $modalContentW = $(e).find(".modal-content").width();
		    var $modalContentH = $(e).find(".modal-content").height();
		    var $conPosW = ($modalContentW / 2);
		    var $conPosH = ($modalContentH / 2);
		    
		    $(e).find(".modal-content").css({
		        "marginLeft":-$conPosW
		        ,"marginTop" :-$conPosH
		    });

		    if ( $winH - 100  < $modalContentH ){
		        $(e).find(".modal-content").css({
		            "marginTop":50,
		            "top":0
		        });
		    }
		    
		    $("body").addClass("modal-open");
		    $("<div class='pop-overlay'></div>").insertAfter($(e));
		    
		    $(e).show();
		    $(e).addClass("open");

//		      modalPopUp시 닫고 열때 스크롤 사라지게 하는 원인
//		    	$("body, html").css({"overflow-y" : "hidden"});
		//    
		//    
		//    
//		    var scrollChk = $('.pop-inner .content > div');
//		    if ( scrollChk.hasClass('scrollArea') ) {
//		        $(".scrollArea").mCustomScrollbar();
//		    } 
		    
		}
	}
};
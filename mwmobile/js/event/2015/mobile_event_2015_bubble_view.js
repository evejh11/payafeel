var MobileBubble = {
	name : "MobileBubble",
	init : function(){
		MobileBubble.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			
			
			$(".btnList").unbind("click").click(function(event){
				event.preventDefault();
				location.href=GLOBAL_WEB_URL + "mobile/event/mobile_event_event_list.do";
			});
		},
	
	}
};
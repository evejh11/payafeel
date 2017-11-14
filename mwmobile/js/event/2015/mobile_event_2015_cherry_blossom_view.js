var MobileCherryBlossom = {
	name : "MobileCherryBlossom",
	init : function(){
		MobileCherryBlossom.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			
			$(".btn_apply").unbind("click").click(function(event){
				event.preventDefault();
				showMessageBox({
					message : "댓글로 응모 가능합니다."
				});
			});
			
			$(".btnList").unbind("click").click(function(event){
				event.preventDefault();
				location.href=GLOBAL_WEB_URL + "mobile/event/mobile_event_event_list.do";
			});
		},
	}
};
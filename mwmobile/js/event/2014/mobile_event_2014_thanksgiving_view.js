var flagsuccess = false;
var MobileThanksGiving = {
	name : "MobileThanksGiving",
	init : function(){
		MobileThanksGiving.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_luck").unbind("click").click(function(event){
				event.preventDefault();
				MobileThanksGiving.fn.goChoose();
			});
			$(".btn_cgv").unbind("click").click(function(event){
				event.preventDefault();
				modalPopup("#modalPopupEventCgv_m");
			});
		},
		
		goChoose : function(){
			if(flagsuccess){
				return false;
			}else{
				flagsuccess = true;
			}
			cmAjax({
				url : GLOBAL_WEB_ROOT +"mobile/event/2014/mobile_event_2014_thanksgiving_event_save_ajax.do",
				data : {i_sEventcd : $("input[name='i_sEventcd']").val()},
				type : "post",
				dataType: "json",
				success : function(data,textStatus){
					if(data.status == "succ"){
						if(data.object == "CGV"){
							modalPopup("#modalPopupEventCgv_m");
						}else if(data.object == "CP01"){
							modalPopup("#modalPopupEventMoney5000_m");
						}else if(data.object == "CP02"){
							modalPopup("#modalPopupEventMoney10000_m");
						}else if(data.object == "POINT"){
							modalPopup("#modalPopupEventBlueribon_m");
						}
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function(){
									document.frm_login.submit(); 
								}
							});
						}else{
							if(data.object == "end"){
								showMessageBox({
									message : "추석기간내(8월25일~9월10일)에 추석선물 구입내역이 없습니다."
								});
							}else{
								showMessageBox({
									message : data.message
								});
							}
							
						}
					}
					flagsuccess = false;
				}
			});
		}
	}
};
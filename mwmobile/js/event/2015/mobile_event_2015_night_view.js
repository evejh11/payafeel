var MobileNightSkin = {
	name : "MobileNightSkin",
	init : function(){
		MobileNightSkin.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			
			$(".btn_coupon").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							document.frm_login.submit();
						}
					});
				}else{
					MobileNightSkin.fn.goCheck();
				}
			});
			
			$(".btnList").unbind("click").click(function(event){
				event.preventDefault();
				location.href=GLOBAL_WEB_URL + "mobile/event/mobile_event_event_list.do";
			});
		},
		goCheck : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_night_save_ajax.do",
				type : "post",
				data : {
							i_sEventcd : $(".span_eventcd").text(),
						},
				dataType : "json",
				success : function(data, textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : data.message,
						});
						
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									document.frm_login.submit();
								}
							});
						}else{
							showMessageBox({
								message : data.message
							});
						}
					}
				}
			});
		}
	}
};
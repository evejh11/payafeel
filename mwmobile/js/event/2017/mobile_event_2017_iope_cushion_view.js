var MobileIopeCushion = {
	name : "MobileIopeCushion",
	init : function(){
		MobileIopeCushion.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_apply").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_iope_cushion_check_ajax.do",
						dataType :"json",
						data : {i_sEventcd : $(".span_eventcd").text()
							, i_sCouponcd : "CPU20170327000024407"},
						success : function(data,textStatus){
							if(data.status == "succ"){
								modalPopup('#pop_cushion_01');
							}else{
								if(data.object =="login"){
									modalPopupClose('#pop_cushion_01');
									showConfirmBox({
										message : "로그인 하시면 서비스 이용이 가능하세요!"
										, ok_func : function(){
											MobileBodyStart.goLoginPage();
										}
									});
								}else{
									modalPopupClose('#pop_cushion_01');
									showMessageBox({
										message : data.message
									});
								}
								
							}
						}
							
					});
				}
			});
			$(".btn_check").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					modalPopupClose('#pop_cushion_01');
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					MobileIopeCushion.fn.saveCouponCushion($("input:radio[name='iopeCushion']:checked").val());
				}
			});
		},
		saveCouponCushion : function(flag){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_iope_cushion_save_ajax.do",
				dataType :"json",
				data : {i_sEventcd : $(".span_eventcd").text()
					, i_sCouponcd : "CPU20170327000024407"
					, i_sFlagCorrect : flag},
				success : function(data,textStatus){
					if(data.status == "succ"){
						if(flag == "Y"){
							modalPopupClose('#pop_cushion_01');
							modalPopup('#pop_cushion_02');
						}else{
							modalPopupClose('#pop_cushion_01');
							modalPopup('#pop_cushion_03');
						}
					}else{
						if(data.object == "login"){
							modalPopupClose('#pop_cushion_01');
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else{
							modalPopupClose('#pop_cushion_01');
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
var MobileAppDiscount = {
	name : "MobileAppDiscount",
	init : function(){
		MobileAppDiscount.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_send").unbind("click").click(function(event){
				
				MobileAppDiscount.fn.sendSmsUrl();
			});
			
			$(".btn_check").unbind("click").click(function(event){
				event.preventDefault();
				MobileAppDiscount.fn.usercheck();
			});
		},
		usercheck : function(){
			if(!IS_LOGIN){
				showConfirmBox({
					message : "로그인 하시면 서비스 이용이 가능하세요!"
					, ok_func : function(){
						document.frm_login.submit();
					}
				});
			}else{
				cmAjax({
					url : GLOBAL_WEB_ROOT + "/mobile/event/2015/mobile_event_2015_app_blue_ribbon_check_ajax.do",
					dataType : "json",
					success : function(data, textStatus){
						if(data.status == "succ"){
							var result = data.object;
							if(data.object =="YES"){
								showMessageBox({
									message : "아직 APP에서 구매이력이 없으시네요! </br> 구매시 웰컴 포인트가 지급됩니다."
								});
							}else{
								showMessageBox({
									message : "이런, 이전에 APP에서 구매하셨어요 </br> 아쉽지만 웰컴 포인트 대상자가 아닙니다. </br></br> <span style='color:#3262b7'>최종 구매일 : "+dateStrucChange(result.v_pay_dtm,4)+"</br>"+[result.v_ordernm]+"</span></br></br>앞으로도 아모레퍼시픽몰 APP에 </br> 많이 사랑 부탁드립니다."
								});
							}
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
		},
		sendSmsUrl : function(){
			var mobile = String($("input[name='i_sMobileno1']").val()) + String($("input[name='i_sMobileno2']").val())+String($("input[name='i_sMobileno3']").val());
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_app_discount_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd_appdis").text(),
						i_sMobileNo : mobile},
				success : function(data, textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : "전송되었습니다."
						});
					}else{
					
						showMessageBox({
							message : data.message
						});
				
						
					}
				}
					
			});
		}
	}
};
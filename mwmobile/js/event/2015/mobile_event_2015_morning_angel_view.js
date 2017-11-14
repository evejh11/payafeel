var	MobileMorningAngel = {
	name : "MobileMorningAngel",
	init : function() {
		MobileMorningAngel.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_coupon").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!",
						ok_func : function(){
							document.frm_login.submit(); 
						}
					});	
				}else{
					var issueCnt = $("#issueCnt").val();
					if((5 - issueCnt) > 0){
						MobileMorningAngel.fn.getCoupon();
					}else{
						showMessageBox({
							message : "모든 쿠폰이 발행되었습니다. 내일 다시 도전해주세요!"
						});
					}
				}
			});
		},
	
		getCoupon : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_morning_angel_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : "쿠폰 발급 되었습니다.<br/>발급 된 쿠폰은 마이파우치>쿠폰북에서 확인 가능합니다."
						});
					}else{
						if(data.object =="all"){
							showMessageBox({
								message : "모든 쿠폰이 발행되었습니다. 내일 다시 도전해주세요!"
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
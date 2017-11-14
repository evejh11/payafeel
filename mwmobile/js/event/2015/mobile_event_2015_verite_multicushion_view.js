var	MobileVeriteMultiCushion = {
	name : "MobileVeriteMultiCushion",
	init : function() {
		MobileVeriteMultiCushion.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_reserve_coupon").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							document.frm_login.submit();
						}
					});
				}else{
					var id = $(this).attr("id");
					MobileVeriteMultiCushion.fn.getCoupon(id);
				}
				
			});
		},
		getCoupon : function(id){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_verite_multicushion_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						  i_sCouponId : id
						  },
				success : function(data, textStatus){
					if(data.status == "succ"){
						var brand = "";
						
						showMessageBox({
							message : "짝짝짝! AP몰에서 기분 좋은 쇼핑하세요!<br/><span style='color:#4d7bd0;'>베리떼 멀티쿠션 예약 쿠폰</span>이 발급되었습니다!"
							, close : function(){
								document.frm_reload.submit();
							}
						});
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									document.frm_login.submit();
								}
							});
						}else if(data.object == "already"){
							showMessageBox({
								message : "이미 쿠폰을 받으셨어요.<br/><span style='color:#4d7bd0;'>마이 파우치 > 쿠폰북</span>을 확인해주세요."
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
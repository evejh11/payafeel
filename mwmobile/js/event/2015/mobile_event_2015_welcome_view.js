var MobileWelcome = {
	name : "MobileWelcome",
	init : function(){
		MobileWelcome.fn.addBtnEvent();
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
					var id = $(this).attr("id");
					MobileWelcome.fn.getCoupon(id);
				}
				
			});
		},
		getCoupon : function(id){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_welcome_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
							i_sCouponId: id
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						var brand = "";
						if(id == "welcome"){
							brand = "웰컴 쿠폰";
						}else if(id == "giftiope"){
							brand = "[아이오페] 기프트 쿠폰";
						}else if(id == "giftlan"){
							brand = "[라네즈] 기프트 쿠폰";
						}else if(id == "gifthan"){
							brand = "[한율] 기프트 쿠폰";
						}
						showMessageBox({
							message : "짝짝짝! AP몰에서 기분 좋은 쇼핑하세요!<br/><span style='color:#4d7bd0;'>"+brand+"</span>이 발급되었습니다!"
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
							if(data.object.reason == "notfirst"){
								var lastday = data.object.v_order_dtm;
								
								var str = "";
								str += "이런, 이전에 AP몰에서 구매하셨어요.<br/>아쉽지만 웰컴 쿠폰 대상자가 아닙니다.<br/><br/>";
								str += "<span style='color:#4d7bd0;'>최종 구매일 : " +dateStrucChange(lastday,4)+ "<br/>"; 
								str += "[" + data.object.v_ordernm + "]</span><br/><br/>";
								str += "앞으로도 아모레퍼시픽몰에<br/>많은 사랑 부탁드립니다.";
								
								showMessageBox({
									message : str
								});
							}else{
								showMessageBox({
									message : data.message
								});
							}
						}
					}
				}
					
			});
		}
	}
};
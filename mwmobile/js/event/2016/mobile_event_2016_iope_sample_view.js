var MobileIopeSample = {
	name : "MobileIopeSample",
	init : function(){
		MobileIopeSample.fn.addBtnEvent();
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
					showMessageBox({
						message : "쿠폰이 모두 소진되었습니다. 감사합니다."
					});
//					MobileIopeSample.fn.getCoupon();
				}
				
			});
		},
		getCoupon : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_iope_sample_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : "쿠폰이 발급 되었습니다"
							, close : function(){
								location.href = GLOBAL_WEB_URL + "mobile/my/mobile_my_coupon_list.do";
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
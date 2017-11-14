var MobileSyrupOcb = {
	name : "MobileSyrupOcb",
	init : function(){
		MobileSyrupOcb.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_coupon1").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					var id = $(this).attr("id");
					MobileSyrupOcb.fn.getCoupon(id);
				}
				
			});
			
			$(".btn_coupon2").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					var id = $(this).attr("id");
					MobileSyrupOcb.fn.getCoupon(id);
				}
				
			});
		},
		getCoupon : function(flag){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_syrupocb_coupon_check_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						i_sFlag : flag
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						if(flag == "SYRUP01_EVENT"){
							modalPopup('#pop_coupon_1');
						}else if(flag == "SYRUP02_EVENT"){
							modalPopup('#pop_coupon_2');
						}
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else{
							if(data.object == "end"){
								modalPopup('#pop_coupon_f');
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
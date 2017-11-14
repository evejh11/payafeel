var	MobileIopeDeoma = {
	name : "MobileIopeDeoma",
	init : function() {
		MobileIopeDeoma.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_apply").unbind("click").click(function(event){
				event.preventDefault();
				var id = $(this).attr("id");
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_iopedeoma_coupon_check_ajax.do",
						dtatType :"json",
						data : {i_sEventcd : $(".span_eventcd").text(),
								i_sCouponcd : "CPU20170802000026681"
							},
						success : function(data,textStatus){
							if(data.status == "succ"){
//								MobileIopeDeoma.fn.getCoupon(id,data.object);
								modalPopup("#pop_iopeDeoma_01");
							}else{
								if(data.object == "login"){
									showConfirmBox({
										message : "로그인 하시면 서비스 이용이 가능하세요!"
										, ok_func : function(){
											MobileBodyStart.goLoginPage();
										}
									});
								}else if(data.object == "end"){	//이미 소진되었어요.
									modalPopup("#pop_iopeDeoma_04");
								}else{
									showMessageBox({
										message : data.message
									});
								}
							}
						}
					});
				}
			});
			
			//정답 확인
			$(".btn_confirm").unbind("click").click(function(event){
				event.preventDefault();
				var check = $(".lineCheck a.on");
				modalPopupClose("#pop_iopeDeoma_01");
				
				if(check.hasClass("deoma")){
					MobileIopeDeoma.fn.getCoupon();
				}else{
					modalPopup("#pop_iopeDeoma_03");
				}
			});
		},
		getCoupon : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_iopedeoma_coupon_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						i_sCouponcd  : "CPU20170802000026681"
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						modalPopup("#pop_iopeDeoma_02");
//						showMessageBox({
//							message : "쿠폰이 발급되었습니다.<br/> 발급 된 쿠폰은 마이파우치>쿠폰북 에서 확인가능합니다."
//						});
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else if(data.object == "end"){	//이미 소진되었어요.
							modalPopup("#pop_iopeDeoma_04");
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
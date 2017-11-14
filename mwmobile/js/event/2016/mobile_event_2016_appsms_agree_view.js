var MobileAppSmsAgree = {
	name : "MobileAppSmsAgree",
	init : function(){
		MobileAppSmsAgree.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".btn_coupon1").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							document.frm_login.submit();
						}
					});
				}else{
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_sms_agree_check_ajax.do",
						dtatType :"json",
						data : {i_sEventcd : $(".span_eventcd").text()
							},
						success : function(data,textStatus){
							if(data.status == "succ"){
								showMessageBox({
									message: "이미 SMS 수신동의하셔서 이벤트 참여가 불가능하십니다.<br/>즐거운 쇼핑되세요!"
									, close : function(){
										return ;
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
									showConfirmBox({
										message : "이미 블루리본 포인트가<br/>발급 되셨습니다.<br/>(블루리본 포인트는<br/>1ID당 1회 발급 가능합니다.)<br/>수신동의를 진행하시겠습니까?"
										, ok_func : function(){
											MobileAppSmsAgree.fn.getSmsAgreeSave("already", data.message);
										}
										, cancel_func : function(){
											return ;
										}
									});
								}else if(data.object == "allnot"){
									MobileAppSmsAgree.fn.getSmsAgreeSave("allnot", "");
								}else if(data.object == "noagree"){
									MobileAppSmsAgree.fn.getSmsAgreeSave("noagree", "");
								}else if(data.object == "nofavor"){
									MobileAppSmsAgree.fn.getSmsAgreeSave("nofavor", "");
								}else if(data.object == "havefavor"){
									MobileAppSmsAgree.fn.getSmsAgreeSave("havefavor", "");
								}else if(data.object == "no26mt"){
									MobileAppSmsAgree.fn.getSmsAgreeSave("no26mt", "");
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
			
			$(".btn_coupon2").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function(){
							document.frm_login.submit();
						}
					});
				}else{
					if(GLOBAL_MOBILE_APP == 'APP'){
						//앱이니까 로직 수행
						cmAjax({
							url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_app_agree_check_ajax.do",
							dtatType :"json",
							data : {i_sEventcd : $(".span_eventcd").text()},
							success : function(data,textStatus){
								if(data.status == "succ"){
									showMessageBox({
										message : "이미 마케팅 수신동의하셔서 이벤트 참여가 불가능하십니다.<br/>즐거운 쇼핑되세요!"
										, close : function(){
											return ;
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
										if(data.object == "noagree"){
											MobileAppSmsAgree.fn.getUpdateAgree("Y");
										}else if(data.object == "reagree"){
											showConfirmBox({
												message : "이미 쿠폰발급이 되셨습니다.<br/>(쿠폰은 1ID당 1회 발급가능합니다.)<br/>수신동의를 진행하시겠습니까?"
												, ok_func : function(){
													MobileAppSmsAgree.fn.getUpdateAgree("N");
												}
												, cancel_func : function(){
													return ;
												}
											});
										}
										else{
											showMessageBox({
												message : data.message
											});
										}
									}
								}
							}
						});
					}else{
						//모웹이니까 알럿
						showConfirmBox({
							message : "모바일 APP에서만<br/>참여가능한 이벤트 입니다.<br/>APP에서 실행하시겠습니까?"
							, ok_func : function(){
								//goapp
								var url = "http://www.amorepacificmall.com/mobile/event/mobile_event_view.do?i_sEventcd=EVT201610_pushApmall";
								location.href = "http://www.amorepacificmall.com/mobile/goApp.do?target="+ url;
							}
							,cancel_func : function(){
								return ;
							}
						});
					}
					
				}
				
			});
		},
		getUpdateAgree : function(flag){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_app_agree_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						i_sFlagFirst : flag
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						if(flag == "Y"){
							showMessageBox({
								message : "마케팅 수신동의 감사쿠폰을 지급하였습니다.<br/>알뜰한 쇼핑되세요!"
							});
						}else{
							showMessageBox({
								message : "마케팅 수신동의가<br/>완료되었습니다.<br/>즐거운 쇼핑되세요!"
							});
						}
					}else{
						showMessageBox({
							message : data.message
						});
					}
				}
					
			});
		},
		getSmsAgreeSave : function(flag, alreadyFlag){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_sms_agree_save_ajax.do",
				dataType : "json",
				data : {i_sEventcd : $(".span_eventcd").text(),
						i_sFlagNoAgree : flag
						, i_sFlagAlready : alreadyFlag
						},
				success : function(data, textStatus){
					if(data.status == "succ"){
						if(flag == "already"){
							showMessageBox({
								message : "SMS 수신동의가<br/>완료되었습니다.<br/>즐거운 쇼핑되세요!"
							});
						}else{
							showMessageBox({
								message : "* SMS 수신동의 완료 *<br/><br/>블루리본 1,000점이<br/>적립되었습니다."
									, close : function(){
										return ;
									}	
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
	}
};
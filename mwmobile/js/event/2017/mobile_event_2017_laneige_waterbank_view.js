var MobileLaneigeWaterBank = {
	name : "MobileLaneigeWaterBank",
	init : function(){
		MobileLaneigeWaterBank.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			//스튜디오 예약 버튼
			$(".btn_apply").unbind("click").click(function(event){
				if(!IS_LOGIN){
					showMessageBox({
						message : "로그인 하셔야 이용이 가능합니다."
						, close : function(){
							MobileBodyStart.goLoginPage();
						}	
					});
				}else{
//					showMessageBox({
//						message : "응모 이벤트가 종료되었습니다."
//						, close : function(){
//							return ;
//						}	
//					});
					var flag = true;
					
					if(flag){
						MobileLaneigeWaterBank.fn.goCheck();
					}
				}
			});
			
		},
		
		goCheck : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_laneige_waterbank_apply_ajax.do"
				, type : "post"
				, dataType : "json"
				, data : {i_sEventcd : $(".span_eventcd").text()
					, i_sWantDay : $("select[name='i_sWantDay']").val()
				}
				, success : function(data,textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : "예약 되셨습니다.<br/>당첨자 선정을 기다려주세요!"
							, close : function(){
								modalPopupClose("#pop_laneige_wb");
							}	
						});
					}else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							});
						}else if(data.object == "already"){
							showMessageBox({
								message : "이미 예약하셨습니다.<br/>확인 부탁드립니다."
								, close : function(){
									modalPopupClose("#pop_laneige_wb");
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
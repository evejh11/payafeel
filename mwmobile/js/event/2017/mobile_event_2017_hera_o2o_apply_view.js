var MobileHeraO2O = {
	name : "MobileHeraO2O",
	init : function(){
		MobileHeraO2O.fn.addBtnEvent();
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
					
					var day = $("select[name='i_sWantDay']").val();
					var store = $("select[name='i_sWantStore']").val();
					var array = [];
					if(store == "롯데백화점 노원점"){
						if(day == "20170718"){
							flag = false;
							showMessageBox({
								message : "롯데백화점 노원점은 19일, 20일 예약만 가능합니다.<br/>다시 선택해주세요."
								, close : function(){
									return ;
								}	
							});
						}
					}
					
					if(flag){
						MobileHeraO2O.fn.goCheck();
					}
				}
			});
			
			$("select[name='i_sWantDay']").change(function(event){
				event.preventDefault();
				var day = $(this).val();
				var store = $("select[name='i_sWantStore']").val();
				var array = [];
				if(store == "롯데백화점 노원점"){
					if(day == "20170718"){
						showMessageBox({
							message : "롯데백화점 노원점은 19일, 20일 예약만 가능합니다.<br/>다시 선택해주세요."
							, close : function(){
								return ;
							}	
						});
					}
				}
			});
		},
		
		goCheck : function(){
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_hera_o2o_apply_ajax.do"
				, type : "post"
				, dataType : "json"
				, data : {i_sEventcd : $(".span_eventcd").text()
					, i_sWantDay : $("select[name='i_sWantDay']").val()
					, i_sWantTime : $("select[name='i_sWantTime']").val()
					, i_sWantStore : $("select[name='i_sWantStore']").val()
				}
				, success : function(data,textStatus){
					if(data.status == "succ"){
						showMessageBox({
							message : "예약 신청 완료<br/>(선정되신 분들께는 LMS 문자 발송됩니다.)"
							, close : function(){
								modalPopupClose("#pop_hera_o2o");
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
									modalPopupClose("#pop_hera_o2o");
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
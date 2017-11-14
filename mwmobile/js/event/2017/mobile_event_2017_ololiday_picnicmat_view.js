var	MobileOlolidayPicnicmat = {
	name : "MobileOlolidayPicnicmat",
	init : function() {
		MobileOlolidayPicnicmat.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			$(".kit_apply").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하셔야 신청이 가능합니다.",
						ok_func : function(){
							MobileBodyStart.goLoginPage();
						}						
					});
				}else{
					cmAjax({
						url : GLOBAL_WEB_ROOT+"mobile/event/2017/mobile_event_2017_ololiday_picnicmat_check_ajax.do"
						,data : {
									i_sEventcd : $(".span_evtcode").text() 
								}
						,dataType : "json"
						,success : function(data, textStatus){
							if(data.status == "succ"){
								modalPopup("#modalPopupMobileDefaultAddr");
							}else{
								if(data.object == "notyet"){
									showMessageBox({
										message : "아쉽지만 신청 조건에 해당하지 않습니다.<br/>7월 결제완료 금액을 다시 확인 후 신청해주세요."
									});
								}else if(data.object == "login"){ 
									showConfirmBox({
										message : "로그인 하셔야 신청이 가능합니다.",
										ok_str : "로그인",
										ok_func : function(){
											MobileBodyStart.goLoginPage();
										}
									});
								} else if(data.object == "already"){
									modalPopup("#modalPopupSpecialApplyFlag");
									/*showMessageBox({
										message : "이미 신청하셨습니다.<br/><span style='color:#5395ed;'>배송지 변경은</span>로 신청내역을 확인하실 수 있습니다."
									});*/
								}else if(data.object == "NotAddr"){
									showMessageBox({
										message : "기본 배송지 정보가 없습니다.<br/>피크닉 매트를 신청하시려면 기본배송지가 필요합니다.<br/>마이파우치에서 기본 배송지를 등록한 후 신청해주세요."
										,close : function(){
											location.href = GLOBAL_WEB_URL + "mobile/my/mobile_my_shipping.do"
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
					});
				}
			});
			
			$(".mobile_kit_apply").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하셔야 신청이 가능합니다.",
						ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}else{
					cmAjax({
						url : GLOBAL_WEB_ROOT+"mobile/event/2017/mobile_event_2017_ololiday_picnicmat_save_ajax.do",
						type: "post",
						data: {
								i_sEventcd : $(".span_evtcode").text()
								, i_sFlagAction : "R"
						}, 
						dataType: "json",
						animation : false,
						async : false,
						success : function(data,textStatus,jqXHR){
							
							modalPopupClose('#modalPopupMobileDefaultAddr');
							
							if(data.status == 'succ'){
								
								showMessageBox({
									message : "짝짝짝! 피크닉 매트 신청이 완료 되었습니다.<br>자세한 배송 일정은 이벤트 페이지를 확인해주세요."
									, close : function(){
//																		parent.location.reload();
										parent.document.frm_reload.submit();
										parent.cmDialogClose("my_shipping_write_pop");
									}
								});
							}else{
								showMessageBox({
									message : "스페셜 키트에 대한 삽입 실패"
									, close : function(){
										parent.document.frm_reload.submit();
										parent.cmDialogClose("my_shipping_write_pop");
									}
								});
							}
						}
					});
				}
			});
			
			$(".confirm_myInfo").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하셔야 신청이 가능합니다.",
						ok_str : "로그인",
						ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					});
				}
				else{
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_specialkit_1st_confirm_myinfo.do"
						,data : {
							i_sEventcd : $(".span_evtcode").text()
							, i_sLoginKey : GLOBAL_LOGIN_KEY
							, i_sLoginType : GLOBAL_LOGIN_TYPE
							, i_sDeviceNum : GLOBAL_DEVICE_NUM
						}
					,dataType : "json"
						,success : function(data, textStatus){
							if(data.status == "succ"){
								modalPopup("#modalPopupSpecialApplyFlag");
							}else{
								if(data.object == "levelerror"){
									showMessageBox({
										message : "아쉽지만 고객 등급이 일치하지 않습니다.<br/>고객님의 등급을 확인 후 신청해주세요."
									});
								}else{
									//아직 신청 안햇다는 메세지박스
									var str = "";
									str += "아직 멤버십 키트를 신청하지 않으셨어요.<br/>";
									str += "<strong>멤버십 키트 신청하기</strong> 버튼을 눌러 신청해주세요.";
									showMessageBox({
										message : str
									});
								}
							}
						}	
					});
				}
			});
		}
	}
};
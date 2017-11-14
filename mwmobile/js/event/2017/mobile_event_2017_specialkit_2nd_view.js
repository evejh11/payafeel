var clickflag = false;
var	MobileSpecialkit2ndEvent = {
	name : "MobileSpecialkit2ndEvent",
	init : function() {
		MobileSpecialkit2ndEvent.fn.addBtnEvent();
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
						url : GLOBAL_WEB_ROOT+"mobile/event/2017/mobile_event_2017_specialkit_2nd_checkGrade_ajax.do"
						,data : {
									i_sEventcd : $(".span_evtcode").text() 
								}
						,dataType : "json"
						,success : function(data, textStatus){
							if(data.status == "succ"){
								modalPopup("#modalPopupMobileDefaultAddr");
							}else{
								if(data.object == "normal"){
									showMessageBox({
										message : "아쉽지만 고객 등급이 일치하지 않습니다.<br/>고객님의 등급을 확인 후 신청해주세요."
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
									showMessageBox({
										message : "이미 신청하셨습니다.<br/><span style='color:#5395ed;'>'내 신청내역 확인하기'</span>로 신청내역을 확인하실 수 있습니다."
									});
								}else if(data.object == "NotAddr"){
									showMessageBox({
										message : "기본 배송지 정보가 없습니다.<br/>우수고객 키트를 신청하시려면 기본배송지가 필요합니다.<br/>마이파우치에서 기본 배송지를 등록한 후 신청해주세요."
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
						url : GLOBAL_WEB_ROOT+"mobile/event/2017/mobile_event_2017_specialkit_2nd_checkGrade_ajax.do"
						,data : {
							i_sEventcd : $(".span_evtcode").text() 
						}
					,dataType : "json"
						,success : function(data, textStatus){
							if(data.status == "succ"){
								
								if(clickflag){
									return false;
								}else{
									clickflag = true;
								}
								
								var i_sKitNm = "";
								
								if(data.object == "VIP"){
									i_sKitNm = "VIP";
								}else if(data.object == "VVIP"){
									i_sKitNm = "VVIP";
								}
								
								cmAjax({
									url : GLOBAL_WEB_ROOT+"mobile/event/2017/mobile_event_2017_specialkit_2nd_save_ajax.do",
									type: "post",
									data: {
										i_sEventcd : $(".span_evtcode").text()
										, i_sFlagKit : i_sKitNm
										, i_sFlagKitNm : i_sKitNm + "키트"
										, i_sFlagAction : "R"
									}, 
									dataType: "json",
									animation : false,
									async : false,
									success : function(data,textStatus,jqXHR){
										
										modalPopupClose('#modalPopupMobileDefaultAddr');
										
										if(data.status == 'succ'){
											
											showMessageBox({
												message : "짝짝짝! 우수고객 키트 신청이 완료 되었습니다.<br>키트는 <strong>8월 14일</strong> 이후 일괄 배송될 예정입니다."
													, close : function(){
//													parent.location.reload();
														parent.document.frm_reload.submit();
														parent.cmDialogClose("my_shipping_write_pop");
													}
											});
										}else{
											clickflag = false;
											showMessageBox({
												message : data.message
												, close : function(){
													parent.document.frm_reload.submit();
													parent.cmDialogClose("my_shipping_write_pop");
												}
											});
										}
									}
								});
							}else{
								if(data.object == "normal"){
									showMessageBox({
										message : "아쉽지만 고객 등급이 일치하지 않습니다.<br/>고객님의 등급을 확인 후 신청해주세요."
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
									showMessageBox({
										message : "이미 신청하셨습니다.<br/><span style='color:#5395ed;'>'내 신청내역 확인하기'</span>로 신청내역을 확인하실 수 있습니다."
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
			
			$(".confirm_myInfo").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하셔야 신청이 가능합니다.",
						ok_func : function(){
							document.frm_login.submit(); 
						}
					});
				}
				else{
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/event/2017/mobile_event_2017_specialkit_2nd_confirm_myinfo.do"
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
									var str = [];
									str.push("아직 우수고객 키트를 신청하지 않으셨어요.<br/>");
									str.push("<strong>우수고객 키트 신청하기</strong> 버튼을 눌러 신청해주세요.");
									showMessageBox({
										message : str.join("")
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
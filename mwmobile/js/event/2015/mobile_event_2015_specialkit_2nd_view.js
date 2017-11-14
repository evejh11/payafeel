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
						message : "로그인 하시면 서비스 이용이 가능하세요!",
						ok_func : function(){
							document.frm_login.submit(); 
						}
					});
				}else{
					cmAjax({
						url : GLOBAL_WEB_ROOT+"mobile/event/2015/mobile_event_2015_specialkit_2nd_checkGrade_ajax.do"
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
										message : "로그인 하시면 서비스 이용이 가능하세요!",
										ok_func : function(){
											document.frm_login.submit(); 
										}
									});
								} else if(data.object == "already"){
									showMessageBox({
										message : "이미 신청하셨습니다.<br/><span style='color:#5395ed;'>'내 신청내역 확인하기'</span>로 신청내역을 확인하실 수 있습니다."
									});
								}else if(data.object == "NotAddr"){
									showMessageBox({
										message : "기본 배송지 정보가 없습니다.<br/>멤버십 키트를 신청하시려면 기본배송지가 필요합니다.<br/>마이파우치에서 기본 배송지를 등록한 후 신청해주세요."
										/*,close : function(){
											document.frm_reload.submit();
										}*/
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
						message : "로그인 하시면 서비스 이용이 가능하세요!",
						ok_func : function(){
							document.frm_login.submit(); 
						}
					});
				}else{
					cmAjax({
						url : GLOBAL_WEB_ROOT+"mobile/event/2015/mobile_event_2015_specialkit_2nd_checkGrade_ajax.do"
						,data : {
									i_sEventcd : $(".span_evtcode").text() 
								}
						,dataType : "json"
						,success : function(data, textStatus){
							if(data.status == "succ"){
								if(data.object == "VIP"){
									modalPopupClose("#modalPopupMobileDefaultAddr");
									modalPopup("#modalPopupSpecialVIPkit");
								}else if(data.object == "VVIP"){
									modalPopupClose("#modalPopupMobileDefaultAddr");
									modalPopup("#modalPopupSpecialVVIPkit");
								}
							}else{
								if(data.object == "normal"){
									showMessageBox({
										message : "아쉽지만 고객 등급이 일치하지 않습니다.<br/>고객님의 등급을 확인 후 신청해주세요."
									});
								}else if(data.object == "login"){ 
									showConfirmBox({
										message : "로그인 하시면 서비스 이용이 가능하세요!",
										ok_func : function(){
											document.frm_login.submit(); 
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
			
			$(".btn_shipping_write").unbind("click").click(function(event){
				event.preventDefault();
				var kitNm = $("input[name='i_sKitNm']:checked").val();
				
				modalPopupClose("#modalPopupSpecialVIPkit");
				modalPopupClose("#modalPopupSpecialVVIPkit");
				cmDialogOpen("my_shipping_write_pop", {
					url : GLOBAL_WEB_ROOT + "my/my_shipping_write_pop.do?i_sKitNm=" + kitNm + "&i_sEventcd=" + $(".span_evtcode").text()
					
					, width : "830px"
					, height : "600px"
					, changeViewAutoSize : true
				});
				
			});
			
			$(".confirm_myInfo").unbind("click").click(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!",
						ok_func : function(){
							document.frm_login.submit(); 
						}
					});
				}
				else{
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_specialkit_2nd_confirm_myinfo.do"
						,data : {i_sEventcd : $(".span_evtcode").text()} 
					,dataType : "json"
						,success : function(data, textStatus){
							if(data.status == "succ"){
								modalPopup("#modalPopupSpecialApplyFlag");
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
					});
				}
			});
			
			$(".btn_addr_chg").unbind("click").click(function(event){
				event.preventDefault();
				var kitNm = $("input[name='i_sKitNm']:checked").val();
				modalPopupClose("#modalPopupSpecialApplyFlag");
				cmDialogOpen("my_shipping_write_pop", {
					url : GLOBAL_WEB_ROOT + "my/my_shipping_write_pop.do?i_sKitNm=" + kitNm + "&i_sEventcd=" + $(".span_evtcode").text() + "&i_sFlagChange=Y"
					
					, width : "830px"
					, height : "600px"
					, changeViewAutoSize : true
				});
			});
			
			$(".btn_complete").unbind("click").click(function(event){
				event.preventDefault();
				cmAjax({
					url : GLOBAL_WEB_ROOT+"mobile/event/2015/mobile_event_2015_specialkit_2nd_save_ajax.do",
					type: "post",
					data: {	i_sEventcd : $(".span_evtcode").text()
								,i_sFlagKit : $("input[name='i_sKitNm']:checked").val() 
								,i_sFlagAction : "R"
						}, 
					dataType: "json",
					animation : false,
					async : false,
					success : function(data,textStatus,jqXHR){
						if(data.status == 'succ'){
							modalPopupClose("#modalPopupSpecialVIPkit");
							modalPopupClose("#modalPopupSpecialVVIPkit");
							showMessageBox({
								message : "짝짝짝! 멤버십 키트 신청이 완료 되었습니다.<br>키트는 <strong>8월 10일</strong> 이후 일괄 배송될 예정입니다."
								, close : function(){
//									parent.location.reload();
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
			});
		}
		
	}
};
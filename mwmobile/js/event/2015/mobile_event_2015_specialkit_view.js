var	MobileSpecialkitEvent = {
	name : "MobileSpecialkitEvent",
	init : function() {
		MobileSpecialkitEvent.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function(){
			 $("#btn_vip_skin").unbind("click").click(function(event){
				   event.preventDefault();
				   var id = "vip_skincare";
				   var level = "LV12";
				   MobileSpecialkitEvent.fn.setKitApply(id, level);
			   });
			   
			   $("#btn_vip_makeup").unbind("click").click(function(event){
				   event.preventDefault();
				   var id = "vip_makeup";
				   var level = "LV12";
				   MobileSpecialkitEvent.fn.setKitApply(id, level);
			   });
			   
			   $("#btn_vvip_skin").unbind("click").click(function(event){
				   event.preventDefault();
				   var id = "vvip_skincare";
				   var level = "LV13";
				   MobileSpecialkitEvent.fn.setKitApply(id, level);
			   });
			   
			   $("#btn_vvip_makeup").unbind("click").click(function(event){
				   event.preventDefault();
				   var id = "vvip_makeup";
				   var level = "LV13";
				   MobileSpecialkitEvent.fn.setKitApply(id, level);
			   });
			   
			   $("#btn_check").unbind("click").click(function(event){
				   event.preventDefault();
				   if (!IS_LOGIN) {
						showConfirmBox({
							message : "로그인 하시면 서비스 이용이 가능하세요!",
							ok_func : function() {
								document.frm_login.submit();
							}
						});
					}else{
						MobileSpecialkitEvent.fn.eventCheck();						
					}
			   });
		},
		
		addPopupBtnEvent : function(){
			$(".btn_modify").unbind("click").click(function(event){
				event.preventDefault();
				location.href=GLOBAL_WEB_URL+"mobile/my/mobile_my_shipping.do";
			});
			
			$(".btn_cancel").unbind("click").click(function(event){
				event.preventDefault();
				var frm = $("form[name='frm']");
			    var eventcd = $("#i_sEventcd", frm).val();
			    modalPopupClose("#modalPopupApplyCheck");
				cmAjax({
					url : GLOBAL_WEB_ROOT+"event/2015/event_2015_specialkit_cancel_ajax.do",
					data : {i_sEventcd : eventcd},
					type : "post",
					dataType : "json",
					success : function(data, textStatus){
						if(data.status =="succ"){
							showMessageBox({
								message : "신청 내역이 삭제되었습니다."
								, close : function(){
								}
							});
						}else{
						}
					}
				});
			});
			
			$(".btn_ok").unbind("click").click(function(event){
				event.preventDefault();
				modalPopupClose("#modalPopupApplyCheck");
			});
		},
		
		eventCheck : function(){
			var frm = $("form[name='frm']");
		    var eventcd = $("#i_sEventcd", frm).val();
			cmAjax({
				   url : GLOBAL_WEB_ROOT+"event/2015/event_2015_specialkit_check_ajax.do",
				   data : {i_sEventcd : eventcd},
				   type : "post",
				   dataType : "json",
				   success : function(data, textStatus){
					   if(data.status =="succ"){
						   var info = data.object.evtInfo;
						   if(info.v_tel1 == undefined){
							   info.v_tel1 = '010';
						   }
						   var arrHtml = [];
						   arrHtml.push("<div class=\"section\">");
						   arrHtml.push("	<div style=\"text-align:left;\">");
						   arrHtml.push("		고객님께서 신청하신 키트는 <strong>["+data.object.kitName+"]</strong> 이며 배송지는 다음과 같습니다<br/><br/>");
						   arrHtml.push("		- 받을사람 : "+info.v_addressee+"<br/>");
						   arrHtml.push("		- 주소 : "+info.v_address1+""+info.v_address2+"<br/>");
						   arrHtml.push("		- 전화번호 : "+info.v_tel1+"-"+info.v_tel2+"-"+info.v_tel3+"<br/><br/>");
						   arrHtml.push("		※ 배송지 변경은 1월 14일(수)까지 가능하며, 이후 변경 불가합니다.<br/>");
						   arrHtml.push("		※ 키트는 기본 배송지 기준으로 배송되오니 발송 전 다시 확인해주세요.<br/><br/>");
						   arrHtml.push("	</div>");
						   arrHtml.push("	<div class=\"submit-a\">");
						   arrHtml.push("		<span class=\"btn_ty3 v3\" style=\"display:inline;\"><a href=\"#\" class=\"btn_modify\" style=\"border:1px solid #b8b8b8;background:#c5c5c5;color:#fff;\">배송지 수정 </a></span>");
						   arrHtml.push("		<span class=\"btn_ty3 v3\" style=\"display:inline;\"><a href=\"#\" class=\"btn_cancel\" style=\"border:1px solid #f47a9b;background:#ff8eac;color:#fff;\">신청 취소 </a></span>");
						   arrHtml.push("		<span class=\"btn_ty v3\" style=\"display:inline;\"><a href=\"#\" class=\"btn_ok\">확인 </a></span>");
						   arrHtml.push("	</div>");
						   arrHtml.push("</div>");
						   
						   $(".div_notice").html(arrHtml.join(""));
						   modalPopup("#modalPopupApplyCheck");
						   MobileSpecialkitEvent.fn.addPopupBtnEvent();
					   }else{
							if(data.object == "login"){
								showConfirmBox({
									message : "로그인 하시면 서비스 이용이 가능하세요!",
									ok_func : function(){
										document.frm_login.submit(); 
									}
								});
							}else if(data.object == "notReg"){
								showConfirmBox({
									message : "기본 배송지가 등록되지 않았습니다</br>기본 배송지를 등록하시겠습니까?",
									ok_func : function(){
										location.href = GLOBAL_WEB_ROOT+"mobile/my/mobile_my_shipping.do";
									}
								});
							}else {
								showMessageBox({
									message : data.message
								});
							}
					   }
				   }				   
			   });
		},
		
		setKitApply : function(info, level){
		   var frm = $("form[name='frm']");
		   var eventcd = $("#i_sEventcd", frm).val();
		   cmAjax({
			   url : GLOBAL_WEB_ROOT+"mobile/event/2015/mobile_event_2015_specialkit_ajax.do",
			   data : {i_sKitInfo : info,
				   		 i_sKitLevelcd : level,
				   		 i_sEventcd : eventcd},
			   type : "post",
			   dataType : "json",
			   success : function(data, textStatus){
				   if(data.status =="succ"){
					   if(info == "vip_skincare"){
						   showMessageBox({
								message : "[VIP] 스킨케어 KIT 신청완료! <br/> 2015.01.27 이후 일괄발송됩니다."
							});						   
					   }else if(info == "vip_makeup"){
						   showMessageBox({
							   message : "[VIP] 메이크업 KIT 신청완료! <br/> 2015.01.27 이후 일괄발송됩니다."
							});						   
					   }else if(info == "vvip_skincare"){
						   showMessageBox({
							   message : "[VVIP] 스킨케어 KIT 신청완료! <br/> 2015.01.27 이후 일괄발송됩니다."
							});						   
					   }else if(info == "vvip_makeup"){
						   showMessageBox({
							   message : "[VVIP] 메이크업 KIT 신청완료! <br/> 2015.01.27 이후 일괄발송됩니다."
							});						   
					   }
				   }else{
						if(data.object == "login"){
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!",
								ok_func : function(){
									document.frm_login.submit(); 
								}
							});
						}else {
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
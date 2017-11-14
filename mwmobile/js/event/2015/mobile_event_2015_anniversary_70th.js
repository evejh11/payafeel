
var MobileAnniversary70th = {
	name : "MobileAnniversary70th",
	init : function() {
		MobileAnniversary70th.fn.addBtnEvent();
		MobileAnniversary70th.fn.setAppList(1);
	},
	fn : {
		setAppList : function(pg) {
			if (pg == null || pg == '') {
				pg = 1;
			}

			var frm = $("form[name='frm']");
			
			var i_iTotalPageCnt = $("input[name='i_iTotalPageCnt']", frm).val();
			var i_iNowPageNo = $("input[name='i_iNowPageNo']", frm).val();
			if (parseInt(i_iNowPageNo) >= parseInt(i_iTotalPageCnt)) {
				$(".btn_more").hide();
			} else {
				$(".btn_more").show();
			}

			$("input[name='i_iNowPageNo']", frm).val(pg);
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/event/2015/mobile_event_2015_anniversary_70th_include_ajax.do",
				type : "post",
				data : {
					i_sEventcd : $(".span_eventcd_anni").text(),
					i_iNowPageNo : pg,
					i_iPageSize : 5,
					i_sCallback : "MobileAnniversary70th.fn.setAppList"
				},
				dataType : "html",
				success : function(html) {
					
					if(pg == 1){
						$("#commentArea").html(html);
					}else{
						$("#commentArea").append(html);
					}
					var frm_evt = $("form[name='frm_evt']");
					var i_iRecordCnt = $("#i_iRecordCnt_Evt",frm_evt).val();
					$(".span_commentCnt").text(i_iRecordCnt);
					// Anniversary4th.fn.addBtnEvent();
				}
			});
		},

		addBtnEvent : function() {
			
			$(".btn_more").unbind("click").click(function(event) {
				event.preventDefault();
				var i_iNowPageNo = parseInt($("#i_iNowPageNo").val()) + 1;
				$('#i_iNowPageNo').val(i_iNowPageNo);

				MobileAnniversary70th.fn.setAppList(i_iNowPageNo);
			});
			
			$(".btn_apply70th").unbind("click").click(function(event){
				event.preventDefault();
				var nowpage = $("input[name='i_iNowPageNo']", frm).val();
				$("input[name='i_sContents']").val($(".i_sComment").val());
				
				var text = $(".i_sComment").val();
				text = EmptyReplace(text);
				var length = text.length;
				
				if(length > 200){
					showMessageBox({
						message : "댓글은 200자 이하로 입력해주세요"
						, close : function(){
							$(".i_sComment").focus();
						}
					});
				}else if(length < 10){
					showMessageBox({
						message : "댓글은 10자 이상 입력해주세요"
						, close : function(){
							$(".i_sComment").focus();
						}
					});
				}
				else{
					var eventcd = $(".span_eventcd_anni").text();
					if(!IS_LOGIN){
						showConfirmBox({
							message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									document.frm_login.submit();
								}
						});
					}else{
						cmAjax({
							url : GLOBAL_WEB_ROOT +"mobile/event/2015/mobile_event_2015_anniversary_70th_save_ajax.do",
							type : "post",
							dataType : "json",
							data : {i_sEventcd : eventcd, 
								i_sFlagAction : "R",
								i_sRecordid : eventcd,
								i_sComment : $("input[name='i_sContents']").val(),
								i_iNowPageNo : 1,
								i_sCallback : MobileAnniversary70th.fn.setAppList(1),
								i_sTable : "CMC_REPLY",
								i_sReturnUrl : $("input[name='i_sReturnUrl']",frm).val(),
								i_sFlagEvent : "Y"
							},
							success : function(data, textStatus){
								var winKind = "";
								var str = [];
								if(data.status == "succ"){
									if(data.object.msg != "sorry"){
										var result = data.object.result;
										if(result == "PRD01"){
											winKind = "라네즈 워터뱅크 젤크림 대용량";
										}else if(result == "PRD02"){
											winKind = "마몽드 빅 아이 마스카라";
										}else if(result == "PRD03"){
											winKind = "라네즈 세럼 인텐스 립스틱";
										}else if(result == "PRD04"){
											winKind = "마몽드 에이지컨트롤까멜리아오일 15ML";
										}else if(result == "PRD05"){
											winKind = "마몽드 포어클린블랙헤드스틱 18G";
										}else if(result == "PRD06"){
											winkind = "마몽드 로즈워터토너AD 150ML";
										}else if(result == "PRD07"){
											winKind = "아이오페 UV쉴드선.클리닉SPF30PA++ 60ML";
										}else if(result == "PRD08"){
											winKind = "아이오페 바이오에센스페이셜마스크 1매";
										}else if(result == "PRD09"){
											winKind ="아이오페 엔자임파우더리.에디션type2 1g*5";
										}else if(result == "PRD10"){
											winKind = "해피바스 내추럴24아쿠아쿨링젤 450ML";
										}
										else if(result == "PRD11"){
											winKind = "해피바스 쿨링선스프레이 150ML";
										}
										else if(result == "PRD12"){
											winKind = "해피바스 로즈에센스바디워시 500G";
										}
										else if(result == "PRD13"){
											winKind = "미쟝센 머그샷파파라치글루왁스 100G";
										}
										else if(result == "PRD14"){
											winKind = "라네즈 미니포어워터클레이마스크 70ML";
										}
										else if(result == "PRD15"){
											winKind = "아리따움 컬러래스팅틴트07호 5G";
										}
										else if(result == "GIFTCARD"){
											winKind = "아모레퍼시픽몰 기프트카드 7000원권";
										}
										$(".winKind").text(winKind);
										
										if(result != "GIFTCARD"){
											if(data.object.msg == "addrExist"){
												var obj = data.object;
												str.push(obj.v_addressee + "<br/>");
												str.push("[" + obj.v_post_code1 + "-" + obj.v_post_code2 + "] ");
												str.push(obj.v_address1 + " " + obj.v_address2 +"<br/>");
												if(obj.v_tel3 == undefined || obj.v_tel3 == ''){
													str.push(obj.v_mobile1 + "-" + obj.v_mobile2 +"-" + obj.v_mobile3 +"<br/>");
												}else{
													str.push(obj.v_tel1 + "-" + obj.v_tel2 +"-" + obj.v_tel3 +", ");
													str.push(obj.v_mobile1 + "-" + obj.v_mobile2 +"-" + obj.v_mobile3 +"<br/>");
												}
											}else{
												str.push("기본 배송지 정보가 없습니다. 배송지를 등록해주세요.");
											}
											$(".userAddr").html(str.join("")); 
											$(".eventtxt").text("경품은 다음 배송지로 9/23 이후 일괄배송됩니다.");
										}else{
											$(".eventtxt").html("경품은 당첨일의 익일 순차적으로 발송됩니다. (단, 9/4~6일 당첨자는 7일 일괄증정)");
										}
										modalPopup("#modalPopup70thReplyWinUser");
										
										$(".btn_close").click(function(event){
											event.preventDefault();
											MobileAnniversary70th.fn.setAppList(nowpage);
										});
									}else{
										showMessageBox({
											message : "고객님의 따뜻한 축하에 감사드립니다.<br/>하지만, 아쉽게도 당첨되지 않으셨습니다.<br/>다음 기회에 참여해주시기 바랍니다."
											, close : function(){
												MobileAnniversary70th.fn.setAppList(nowpage);
											}
										});
									}
									$(".i_sComment").val("");
								}else{
									if(data.object.v_eventcd == "EVT20150904_70th"){
										var giftcd = data.object.v_giftcd; 
										if(giftcd == "PRODUCT01"){
											winKind = "라네즈 워터뱅크 젤크림 대용량";
										}else if(giftcd == "PRODUCT02"){
											winKind = "마몽드 빅 아이 마스카라";
										}else if(giftcd == "PRODUCT03"){
											winKind = "라네즈 세럼 인텐스 립스틱";
										}
										else if(result == "PRODUCT04"){
											winKind = "마몽드 에이지컨트롤까멜리아오일 15ML";
										}else if(result == "PRODUCT05"){
											winKind = "마몽드 포어클린블랙헤드스틱 18G";
										}else if(result == "PRODUCT06"){
											winkind = "마몽드 로즈워터토너AD 150ML";
										}else if(result == "PRODUCT07"){
											winKind = "아이오페 UV쉴드선.클리닉SPF30PA++ 60ML";
										}else if(result == "PRODUCT08"){
											winKind = "아이오페 바이오에센스페이셜마스크 1매";
										}else if(result == "PRODUCT09"){
											winKind ="아이오페 엔자임파우더리.에디션type2 1g*5";
										}else if(result == "PRODUCT10"){
											winKind = "해피바스 내추럴24아쿠아쿨링젤 450ML";
										}
										else if(result == "PRODUCT11"){
											winKind = "해피바스 쿨링선스프레이(14) 150ML";
										}
										else if(result == "PRODUCT12"){
											winKind = "해피바스 로즈에센스바디워시(15) 500G";
										}
										else if(result == "PRODUCT13"){
											winKind = "미쟝센 머그샷파파라치글루왁스 100G";
										}
										else if(result == "PRODUCT14"){
											winKind = "라네즈 미니포어워터클레이마스크 70ML";
										}
										else if(result == "PRODUCT15"){
											winKind = "아리따움 컬러래스팅틴트07호 5G";
										}
										else if(giftcd == "GIFTCARD"){
											winKind = "아모레퍼시픽몰 기프트카드 7000원권";
										}
										$(".winUserKind").text(winKind);
										modalPopup("#modalPopup70thReplyWinAlready");
										
									}else{
										showMessageBox({
											message : data.message
											,close : function(){
												MobileAnniversary70th.fn.setAppList(nowpage);
											}
										});
									}
									$(".i_sComment").val("");
								}
							}
						});
					}
				}
			});

			$(".i_sComment").focus(function(event){
				event.preventDefault();
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 하셔야 작성이 가능합니다. 로그인하시겠습니까?"
							, ok_func : function(){
								document.frm_login.submit();
							}
					});
				}
			});
			
			$(".i_sComment").unbind("keyup").keyup(function(event){
				event.preventDefault();
				var text = $(this).val();
				text = EmptyReplace(text);
				var length = text.length;
				if(length < 10){
					$(".span_textLength").html("<font color='red'>" + length + "</font>");
				}else if(length > 200 && event.keyCode != 8){
					$(".span_textLength").html("<font color='red'>" + length + "</font>");
					showMessageBox({
						message : "댓글은 200자 이하로 입력해주세요"
						, close : function(){
							$(".i_sComment").focus();
						}
					});
				}else{
					$(".span_textLength").html(length);
				}
			});
			
		}
	}
};

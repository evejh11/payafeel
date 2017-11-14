
var MobileAnniversary5th = {
	name : "MobileAnniversary5th",
	init : function() {
		MobileAnniversary5th.fn.addBtnEvent();
		MobileAnniversary5th.fn.setAppList(1);
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
				url : GLOBAL_WEB_ROOT + "mobile/event/2016/mobile_event_2016_anniversary_5th_include_ajax.do",
				type : "post",
				data : {
					i_sEventcd : $(".span_eventcd_anni").text(),
					i_iNowPageNo : pg,
					i_iPageSize : 5,
					i_sCallback : "MobileAnniversary5th.fn.setAppList"
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

				MobileAnniversary5th.fn.setAppList(i_iNowPageNo);
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
							message : "로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
								, ok_func : function(){
									document.frm_login.submit();
								}
						});
					}else{
						cmAjax({
							url : GLOBAL_WEB_ROOT +"mobile/event/2016/mobile_event_2016_anniversary_5th_save_ajax.do",
							type : "post",
							dataType : "json",
							data : {i_sEventcd : eventcd, 
								i_sFlagAction : "R",
								i_sRecordid : eventcd,
								i_sComment : $("input[name='i_sContents']").val(),
								i_iNowPageNo : 1,
								i_sCallback : MobileAnniversary5th.fn.setAppList(1),
								i_sTable : "CMC_REPLY",
								i_sReturnUrl : $("input[name='i_sReturnUrl']",frm).val(),
								i_sFlagEvent : "Y"
							},
							success : function(data, textStatus){
								var winKind = "";
								var str = [];
								if(data.status == "succ"){
									if(data.object != "sorry"){
										var result = data.object.result;
										
										winKind = "아모레퍼시픽몰 기프트카드 5000원권";
										$(".winKind").text(winKind);
										$(".eventtxt").html("기프트카드는 익일 오후 3시 일괄지급됩니다.");
										
										modalPopup("#modalPopup70thReplyWinUser");
										
										$(".btn_close").click(function(event){
											event.preventDefault();
											MobileAnniversary5th.fn.setCommentList(nowpage);
										});
									}else{
										showMessageBox({
											message : "고객님의 따뜻한 축하에 감사드립니다.<br/>하지만, 아쉽게도 당첨되지 않으셨습니다.<br/>다음 기회에 참여해주시기 바랍니다."
										});
									}
									$(".i_sComment").val("");
								}else{
									if(data.object == "over"){
										showMessageBox({
											message : data.message
										});
									}else if(data.object == "notWin"){
										showMessageBox({
											message : "고객님의 따뜻한 축하에 감사드립니다.<br/>하지만, 아쉽게도 당첨되지 않으셨습니다.<br/>다음 기회에 참여해주시기 바랍니다."
										});
									}
									else if(data.object =="already"){
										showMessageBox({
											message : "고객님은 이미 당첨되셨습니다.<br/>더 많은 고객님을 위해 더 이상 참여가 힘든 점<br/>양해 부탁드립니다.<br/>감사합니다."
										});
									}
									else{
										showMessageBox({
											message : data.message
											,close : function(){
												MobileAnniversary5th.fn.setCommentList(nowpage);
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

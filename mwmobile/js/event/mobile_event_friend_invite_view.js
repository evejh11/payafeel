/**
 * 모바일 친구초대 프로모션 Javascript
 */
var parameter = {
};

var MobileFriendInvite = {
	name : "MobileFriendInvite",
	init : function() {
		$('.btn_back').attr('href', '/mobile/main.do');
		MobileFriendInvite.fn.addBtnEvent();

		$("input[name='i_sInviteUsercd']").val($("input[name='i_sInviteUsercdTemp']").val());
		$("input[name='i_sInviteType']").val(isEmpty($("input[name='i_sInviteTypeTemp']").val()) ? "EVENT_MO" : $("input[name='i_sInviteTypeTemp']").val());
		$("input[name='i_sInviteMethod']").val($("input[name='i_sInviteMethodTemp']").val());
	},

	fn : {

		addBtnEvent : function() {

			$(document).on("click", ".btn_go_login", function(){
				showConfirmBox({
					message : "로그인 후 참여가능합니다."
					,ok_str  : "로그인"
					,ok_func : function(){
						MobileBodyStart.goLoginPage();
					}
					,cancel_str : "닫기"
					,cancel_func : function(){
					}
				});
			});

			$(document).on("click", ".btn_kakao", function(){
				$('.inputArea').slideUp('fast');
				MobileFriendInvite.fn.sendKakaoTalk();
				$("input[name='i_sFrdMobile']").val("");
			});

			$(document).on("click", ".btn_kakao2", function(){
				$('.inputArea').slideUp('fast');
				MobileFriendInvite.fn.sendKakaoLink();
				$("input[name='i_sFrdMobile']").val("");
			});

			$(document).on("click", ".sms_send", function(){
				MobileFriendInvite.fn.sendLms();
			});

			$(document).on("click", ".btn_lms_pop", function(){
				MobileFriendInvite.fn.openLmsPop();
			});

			$(document).on("click", ".btn_end", function(){
				showMessageBox({
					message : "이벤트 기간이 아닙니다."
				});
			});

			$(document).on("click", ".btn_reg_code", function(){
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 후 참여가능합니다."
							,ok_str  : "로그인"
							,ok_func : function(){
									MobileBodyStart.goLoginPage();
								}
							,cancel_str : "닫기"
							,cancel_func : function(){
							}
					});
				}
				else {
					MobileFriendInvite.fn.sendGiftCard();
				}
			});
			
			$(document).on("focus", "input[name='i_sInviteUsercd']", function(){
				if(!IS_LOGIN){
					showConfirmBox({
						message : "로그인 후 참여가능합니다."
						,ok_str  : "로그인"
						,ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
						,cancel_str : "닫기"
						,cancel_func : function(){
						}
					});
				}
			});

		}
		/* 카카오톡 발송 - 사용안함 */
		, sendKakaoLink : function() {

			var msg = MobileFriendInvite.fn.makeTalkMsg();

			try {
				Kakao.Link.sendDefault({
					objectType : 'feed'
					, content : {
						title : 'test'
						, link : {
							mobileWebUrl : "https://www.amorepacificmall.com/mobile/mbr/mobile_mbr_member_login.do"
						}
						, description : msg
						, imageUrl : "http://images.amorepacificmall.com/mobile/images/common/ico_apmallApp.png"
					}
					, buttons: [
						{
							title : '웹으로 보기'
							, link : {
								mobileWebUrl : "https://www.amorepacificmall.com/mobile/mbr/mobile_mbr_member_login.do"
							}
						}
					]
					, fail : function(error) {
						alert("error");
						alert(JSON.stringify(error))
					}
					, success : function(res) {
						alert("success");
						alert(JSON.stringify(res));
					}
				});
			}
			catch(e) {
				alert("catch");
				alert(e)
			}

		}
		/* 카카오톡 발송 */
		, sendKakaoTalk : function() {

			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/event/mobile_event_friend_invite_code_ajax.do"
				, type : "POST"
				, dataType : "json"
				, data : {
					i_sInviteMethod	: "KAKAO"
					, i_sInviteType	: $("input[name='i_sInviteType']").val()
					, i_sOrdercd	: $("input[name='i_sOrdercd']").val()
					, i_sEventcd	: $("input[name='i_sEventcd']").val()
					, i_sEventStDt	: $("input[name='i_sEventStDt']", $("form[name='frm_event']")).val()
					, i_sEventEnDt	: $("input[name='i_sEventEnDt']", $("form[name='frm_event']")).val()
				}
				, animation : false
				, success : function ( data, textStatus, jqXHR) {

					if (data.status == "succ") {

						var msg = MobileFriendInvite.fn.makeTalkMsg(data.object);

						try {
							Kakao.Link.sendTalkLink({
								label : msg
								, webButton: {
									text: '웹으로 보기',
									url: GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd=" + $("input[name='i_sEventcd']").val() + "&i_sInviteType=" + $("input[name='i_sInviteType']").val() + "&i_sInviteUsercd=" + data.object + "&i_sInviteMethod=KAKAO"
								}
								, fail : function(error) {
									alert(JSON.stringify(error))
								}
							});
						}
						catch(e) {
							alert(e);
						}

					}
					else {
						showMessageBox({
							message : data.message
						});
						return;
					}
				}
				, error : function(e) {
				}
			});

		}
		/* 카카오톡 메시지 생성 */
		, makeTalkMsg : function(code) {

			var arrMsg = [];

			if ($("input[name='i_sInviteType']").val() == "IT0002") {
				arrMsg.push($("input[name='i_sUsernm']").val() + "님이 보내신 꿀정보♡");
				arrMsg.push("아모레퍼시픽몰은 처음이지요?");
				arrMsg.push("\n");
				arrMsg.push("아모레퍼시픽몰에서 생애 첫 로그인시");
				arrMsg.push("기프트카드 3,000원을 쏜대요~!");
				arrMsg.push("\n");
				arrMsg.push("다시없는 기회이니 꼭 득템 하시길");
				arrMsg.push("\n");
				arrMsg.push("기프트카드 득템하시고 꼬옥~!");
				arrMsg.push("마이파우치 > 기프트카드에서 확인하세요!");
				arrMsg.push("\n");
				arrMsg.push("아모레퍼시픽몰 로그인하러가기");
			}
			else {
				arrMsg.push($("input[name='i_sUsernm']").val() + "님이 보내신 꿀정보♡");
				arrMsg.push("\n");
				arrMsg.push("아모레퍼시픽몰은 처음이신가요? 반가워요!!");
				arrMsg.push("아모레퍼시픽몰에서 생애 첫 로그인하고, 친구의 추천코드 입력하면");
				arrMsg.push("\"시원한 쇼핑지원금 5,000원 쿠폰\" 드려요!");
				arrMsg.push("\n");
				arrMsg.push("추천코드 :");
				arrMsg.push(code);
				arrMsg.push("\n");
				arrMsg.push("추천코드 복사하고 이벤트참여 고고!");
				arrMsg.push("\n");
				arrMsg.push("이벤트 참여하러가기>");
			}
			arrMsg.push(GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd=" + $("input[name='i_sEventcd']").val() + "&i_sInviteType=" + $("input[name='i_sInviteType']").val() + "&i_sInviteUsercd=" + code + "&i_sInviteMethod=KAKAO");

			return arrMsg.join("\n");

		}
		/* LMS 발송 */
		, sendLms : function() {

			var mobileno = $("input[name='i_sFrdMobile']");
			if(isEmpty(mobileno.val()) || typeof mobileno == "undefined"){
				showMessageBox({
					message : "친구 분의 휴대폰 번호를 입력해주세요."
					, close : function(){
					}
				});
				return ;
			}

			var testMobileno = /^01[0-9]{8,9}$/;
			if(!testMobileno.test(mobileno.val())) {
				showMessageBox({
					message : "휴대폰 번호를 정확히 입력하세요."
					, close : function(){
					}
				});
				return ;
			}

			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/event/mobile_event_friend_invite_send_lms_ajax.do"
				, type : "POST"
				, dataType : "json"
				, data : {
					i_sInviteMethod : "LMS"
					, i_sInviteType		: $("input[name='i_sInviteType']", $("form[name='frm_event']")).val()
					, i_sFrdMobile		: $("input[name='i_sFrdMobile']").val()
					, i_sOrdercd		: $("input[name='i_sOrdercd']", $("form[name='frm_event']")).val()
					, i_sEventcd		: $("input[name='i_sEventcd']", $("form[name='frm_event']")).val()
					, i_sEventStDt		: $("input[name='i_sEventStDt']", $("form[name='frm_event']")).val()
					, i_sEventEnDt		: $("input[name='i_sEventEnDt']", $("form[name='frm_event']")).val()
					, i_sInviteUsercd	: $(".invite_code").text()
				}
				, animation : false
				, success : function ( data, textStatus, jqXHR) {
					if (data.status == "succ") {
						showMessageBox({
							message : "친구에게 추천문자가 발송되었어요!"
							, close : function() {
								document.frm_reload.submit();
							}
						});
					}
					else {
						showMessageBox({
							message : data.message
						});
						return;
					}
				}
				, error : function(e) {
				}
			});
		}
		/* 기프트카드 발송 */
		, sendGiftCard : function() {

			if(isEmpty($("input[name='i_sInviteUsercd']").val())) {
				showMessageBox({
					message : "추천인 코드를 입력하세요."
				});
				return ;
			}

			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/event/mobile_event_friend_invite_send_giftcard_ajax.do"
				, type : "POST"
				, dataType : "json"
				, data : {
					i_sInviteUsercd		: $("input[name='i_sInviteUsercd']").val()
					, i_sInviteType		: $("input[name='i_sInviteType']", $("form[name='frm_event']")).val()
					, i_sInviteMethod	: $("input[name='i_sInviteMethod']", $("form[name='frm_event']")).val()
					, i_sEventcd		: $("input[name='i_sEventcd']", $("form[name='frm_event']")).val()
					, i_sEventStDt		: $("input[name='i_sEventStDt']", $("form[name='frm_event']")).val()
					, i_sEventEnDt		: $("input[name='i_sEventEnDt']", $("form[name='frm_event']")).val()
					, i_sEventDiv		: $("input[name='i_sEventDiv']", $("form[name='frm_event']")).val()
				}
				, animation : false
				, success : function ( data, textStatus, jqXHR) {
					if (data.status == "succ") {
						showMessageBox({
							message : "친구에게 추천메시지가 발송되었어요!"
							, close : function() {
								document.location.reload();
							}
						});
					}
					else {
						showMessageBox({
							message : data.message
						});
						return;
					}
				}
				, error : function(e) {
				}
				
			});

		}
		, openLmsPop : function() {

			if($('.inputArea').css("display") == "none") {

				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "mobile/event/mobile_event_friend_invite_code_ajax.do"
					, type : "POST"
					, dataType : "json"
					, data : {
						i_sInviteMethod			: "LMS"
						, i_sInviteType			: $("input[name='i_sInviteType']").val()
						, i_sOrdercd			: $("input[name='i_sOrdercd']").val()
						, i_sEventcd			: $("input[name='i_sEventcd']").val()
						, i_sEventStDt			: $("input[name='i_sEventStDt']", $("form[name='frm_event']")).val()
						, i_sEventEnDt			: $("input[name='i_sEventEnDt']", $("form[name='frm_event']")).val()
					}
					, animation : false
					, success : function ( data, textStatus, jqXHR) {

						if (data.status == "succ") {
							$(".invite_code").text(data.object);
							$('.inputArea').slideDown('fast');
						}
						else {
							showMessageBox({
								message : data.message
							});
							return;
						}
					}
					, error : function(e) {
					}
				});

			}
			else {
				$('.inputArea').slideUp('fast');
				$(".invite_code").text("");
				$("input[name='i_sFrdMobile']").val("");
			}

		}
	}

};
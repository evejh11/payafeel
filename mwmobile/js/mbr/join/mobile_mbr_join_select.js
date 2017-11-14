/**
 * 
 */
var mobileMbrJoinSelect = {
	init : function() {
		mobileMbrJoinSelect.fn.addBtnEvent();
//		alert($("#plusHeadcontent").offset().top)
		//var boxTop = $("#plusHeadcontent").offset().top + 150;
		//$("body,html,document").stop().animate({ scrollTop: boxTop }, 800);
	},
	fn : {
		addBtnEvent : function() {
			var _chk_benefit = $('.li_check');
			var _chk_chkArea = _chk_benefit.find('.chkArea');
			var _chk_label = _chk_benefit.find('label');
			
			_chk_label.unbind("click").click(function() {
				_chk_benefit.removeClass('selected');
				_chk_chkArea.removeClass('on');
				$(this).parent('li').addClass('selected');
				$(this).find('.chkArea').addClass('on');
				$(this).find("input[name='i_sBenefitFlag']").prop("checked", true);
			});
			
			$(".btn_select").unbind("click").click(function(event) {
				event.preventDefault();

				var tab = $(this).parent();
				$(".select_cate").removeClass("active");
				tab.addClass("active");
				
				$(".div_plus_con").hide();
				tab.next().show();
			});
			
			$(".btn_join").unbind("click").click(function(event) {
				event.preventDefault();
				if(IS_LOGIN) {
					var levelcd = $("input[name='i_sLevelcd']").val();
					if(/LV15|LV16|LV17|LV18|LV19|LV20/.test(levelcd)) {
						showMessageBox({
							message : "이미 멤버십 가입신청이 되어있습니다."
						});
						return;
					}
					var idx = $(".btn_join").index($(this));
					var ul = $(".checkList").eq(idx);
					/*if(ul.find("input[name='i_sBenefitFlag']:checked").length == 0) {
						showMessageBox({
							message : "받으실 혜택을 선택해주세요."
						});
						return;
					}*/
					
					var productcd = $(this).attr("id");
					
					var frm = $("form[name='frm']");
					frm.find("input[name='i_sVipProduct']").val(productcd);
					if (GLOBAL_FLAG_APP_NEW == "Y") {
						try {
							if(GLOBAL_MOBILE_OS == "AND") {
								MobileBodyStart.setLoginUserInfo();
							}
							else {
								window.webkit.messageHandlers.requestUserInfo.postMessage(null);
							}
						}catch(e){
							console.log(e);
						}
						var arrParam = [];
						if(GLOBAL_LOGIN_KEY != "") {
							$("input[name='i_sLoginKey']", frm).remove();
							arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
						}
						if(GLOBAL_LOGIN_TYPE != "") {
							$("input[name='i_sLoginType']", frm).remove();
							arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
						}
						$("input[name='i_sDeviceNum']", frm).remove();
						arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
						$(arrParam.join("")).appendTo(frm);
					}
					var today = $("input[name='i_sDay']").val();
					var intToday = parseInt(today);
					var today_hour = $("input[name='i_sDay_hour']").val();
					
					if(today_hour >= 2017080101 && today_hour < 2017080102){
						showMessageBox({
							message : "현재 기프트카드 서버 점검으로 가입이 불가능합니다.<br/>이용에 불편을 드려 죄송합니다.<br/>점검시간 : 8월 01일 01시 ~ 8월 01일 02시 "
						});
						return;
					}
					
					if(intToday >= 20161101){
						if($(this).hasClass("btn_three")){
							showConfirmBox({
								message : "17년 1월 +회원 등급이 변경됩니다.<br/>가입을 계속 진행하시겠습니까?"
								, ok_func : function(){
									frm.attr("action", GLOBAL_SSL_URL + "mobile/mbr/join/mobile_mbr_join_reg.do").submit();
								}	
								, cancel_func : function(){
									return ;
								}
							});
						}else{
							frm.attr("action", GLOBAL_SSL_URL + "mobile/mbr/join/mobile_mbr_join_reg.do").submit();
						}
					}else{
						frm.attr("action", GLOBAL_SSL_URL + "mobile/mbr/join/mobile_mbr_join_reg.do").submit();
					}
				} else {
					if(IS_LOGIN_SNS){
						showConfirmBox({
							message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
							, ok_func : function(){
								MobileBodyStart.goLoginPage();
//								document.frm_login.submit();
							}
						    , cancel_func: function(){
								return ;
							}
						});
					}else{
						showConfirmBox({
							message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function(){
									MobileBodyStart.goLoginPage();
//									document.frm_login.submit();
								}
						});
					}
				}
			});
			
			$(".btn_back").unbind("click").click(function(event) {
				event.preventDefault();
				document.location.href = GLOBAL_WEB_ROOT + "mobile/main.do";
			});
			
			$(".btn_gradeInfo").unbind("click").click(function(event) {
				event.preventDefault();
				
				modalPopup("#modalPopGrade");
			});
		}
	}
};
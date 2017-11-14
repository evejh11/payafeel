var MobileGiftCardList = {
		name : "MobileGiftCardList",
		param : undefined,
		giftcard_url : "",
		init : function(){

			MobileGiftCardList.fn.makeparameter();
			MobileGiftCardList.fn.addBtnEvent();
			MobileGiftCardList.fn.setSubMenuChange();

		},
		fn :  {
			 addBtnEvent : function() {
				$(".btn_giftcard_buy").unbind("click").click(function(event) {
					event.preventDefault();

					var card_kind = $(this).attr("id");
					var server_type = "${SERVER_TYPE}";
					var gift_card_form = $("#gift_card_form");

					if (!MobileGiftCardList.fn.isLoginCheck()) {
						return;
					}

					var mobile1    = MobileGiftCardList.param.v_mobileno1 != undefined ? MobileGiftCardList.param.v_mobileno1 : "";
					var mobile2    = MobileGiftCardList.param.v_mobileno2 != undefined ? MobileGiftCardList.param.v_mobileno2 : "";
					var mobile3    = MobileGiftCardList.param.v_mobileno3 != undefined ? MobileGiftCardList.param.v_mobileno3 : "";
					var email      = MobileGiftCardList.param.v_user_email != undefined ?  MobileGiftCardList.param.v_user_email : "";
					var userid     = MobileGiftCardList.param.v_userid != undefined ?  MobileGiftCardList.param.v_userid : "";
					var shauserid  = MobileGiftCardList.param.v_secret_userid != undefined ?  MobileGiftCardList.param.v_secret_userid : "";
					var usernm     = MobileGiftCardList.param.v_usernm != undefined ?  MobileGiftCardList.param.v_usernm : "";

					$("#gift_card_form").html("");
					var arrHtml = new Array();
					arrHtml.push("<div id='div_giftcard_parameter'>");
					arrHtml.push("	<input type='hidden' name='user_id'     	value='"+userid+"'/>");
					arrHtml.push("	<input type='hidden' name='user_name'   	value='"+usernm+"'/>");
					arrHtml.push("	<input type='hidden' name='user_phone'  	value='"+mobile1 + "-" + mobile2 + "-" + mobile3+"'/>");
					arrHtml.push("	<input type='hidden' name='user_phone1' 	value='"+mobile1+"'/>");
					arrHtml.push("	<input type='hidden' name='user_phone2' 	value='"+mobile2+"'/>");
					arrHtml.push("	<input type='hidden' name='user_phone3' 	value='"+mobile3+"'/>");
					arrHtml.push("	<input type='hidden' name='user_email'  	value='"+email+"'/>");
					arrHtml.push("	<input type='hidden' name='card_kind'   	value='"+card_kind+"'/>");
					arrHtml.push("	<input type='hidden' name='secret_user_id'  value='"+shauserid+"'/>");
					if(GLOBAL_MOBILE_APP == "APP"){
						arrHtml.push("	<input type='hidden' name='browser'  value='app'/>");
					}else{
						arrHtml.push("	<input type='hidden' name='browser'  value='mobile'/>");
					}
					arrHtml.push("</div>");

					$(arrHtml.join("")).appendTo($("#gift_card_form"));

//					var popup = window.open("","gift_card_form","width=730, height=810, toolbar=no, menubar=no, scrollbars=yes, resizable=no" );
//					location.href = MobileGiftCardList.giftcard_url+"?secret_user_id="+shauserid;
					document.gift_card_form.action = MobileGiftCardList.giftcard_url+"?secret_user_id="+shauserid;
					document.gift_card_form.target = "_self";
					document.gift_card_form.submit();
//					document.gift_card_form.target = "";

					//초기화
//					$("#div_giftcard_parameter").remove();

					try {
						popup.focus();
					} catch (e) {}

				});
			},
			isLoginCheck: function() {
				if (!IS_LOGIN) {

					showMessageBox({message : "해당서비스는 통합회원으로 로그인 하셔야 이용 가능해요."
						,close : function(){
							MobileBodyStart.goLoginPage();
						}
					});
					return false;
				}

				return true;
			},

			makeparameter : function(){

				cmAjax({
					url			: GLOBAL_WEB_ROOT+"mobile/sale/mobile_sale_giftcard_list_ajax.do",
					type		: "POST",
					dataType	: "json",
					animation	: false,
					success		: function (data, textStatus) {
						if ("succ" == data.status) {

							if(data.object.userInfoVo != undefined){

								MobileGiftCardList.param = data.object.userInfoVo;
								MobileGiftCardList.giftcard_url = data.object.giftcard_url;

							}
						}
					}
				});

			},
			/**
			 * 핫세일 서브 메뉴 처리
			 */
			setSubMenuChange : function() {
				var	select_input	= $('div.selectList>ul>li>input[type=radio]');
				select_input.click(function() {
					if($(this).val() == "mobile_shop_product_br_store") {
						location.href	= "/mobile/shop/" + $(this).val() + ".do";
					} else if($(this).val() == "mobile_event_billing_beautypropose_view") {
						location.href	= "/mobile/event/" + $(this).val() + ".do";
					} else {
						location.href	= "/mobile/sale/" + $(this).val() + ".do";
					}
				});
			}
		}
}

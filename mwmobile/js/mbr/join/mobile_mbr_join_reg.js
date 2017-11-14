/**
 * 
 */
var mobileMbrJoinReg = {
	init : function() {
		addOnlyNumberEvent($(".onlyNumber"),{isComma:false,isStringNumber:true});
		mobileMbrJoinReg.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function() {
			$("input[name='i_sVipProduct']").unbind("click").click(function() {
				if($(this).is(":checked")) {
					var productcd = $(this).val();
					var price = $("#span_price_" + productcd).text();
					
					$("#span_totalPrice").text(SetNumComma(price));
					var frm = $("form[name='frm']");
					frm.find("input[name='i_iSumPrice']").val(price);
				}
			});
			
			$("#i_sPayTypecd").unbind("change").change(function(event) {
				event.preventDefault();
				
				var value = $(this).val();
				
				if(value == "0001") {
					$(".div_paycard").show();
				} else {
					$(".div_paycard").hide();
				}
				
				if(value != "") {
					removeErrorMessageBox($(this));
				} else {
					addErrorMessageBox($(this),"결제 수단을 선택해주세요.");
				}
			});

			$("select[name='i_sPayCardTypecd']").unbind("change").change(function() {
				
				if($(this).val() != "") {
					removeErrorMessageBox($(this));
				} else {
					addErrorMessageBox($(this),"결제하실 카드를 선택해주세요.");
				}
			});
			
			$("select[name='i_sOrderMobile1']").unbind("change").change(function() {
				var val = $(this).val();
				removeErrorMessageBox($(this));
				
				if(val == ""){
					addErrorMessageBox($(this),"휴대전화를 선택해 주세요.");
				}
			});
			
			$("input[name='i_sOrderMobile2']").unbind("change").change(function() {
				var val = $(this).val();
				removeErrorMessageBox($(this));
				
				if(val == ""){
					addErrorMessageBox($(this),"휴대전화를 선택해 주세요.");
				}
			});
			
			$("input[name='i_sOrderMobile3']").unbind("change").change(function() {
				var val = $(this).val();
				removeErrorMessageBox($(this));
				
				if(val == ""){
					addErrorMessageBox($(this),"휴대전화를 선택해 주세요.");
				}
			});
			
			$("#btn_payment").unbind("click").click(function(event) {
				event.preventDefault();
				
				if(!mobileMbrJoinReg.fn.isValidation()) {
					return;
				}
				
				mobileMbrJoinReg.fn.setPaymentStatus("ING");
				
				var payMoney = SetNum($(".sum_pay_money").text());
				
				var frm = $("form[name='frm']");
				frm.find("input[name='i_iSumPrice']").val(payMoney);
				
				if(IS_LOGIN) {
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT + "mobile/mbr/join/mobile_mbr_join_vip_save_ajax.do"
						, type : "POST"
						, dataType : "json"
						, data : $("form[name='frm']").serialize()
						, animate : false
						, success : function(data) {
							if(data.status == "succ") {

								var vo = data.object;
								var i_sPayTypecd = $("select[name='i_sPayTypecd']").val();
								if(i_sPayTypecd == "0021") {
									mobileMbrJoinReg.fn.kakaopayCall(vo);
								} else {
									mobileMbrJoinReg.fn.lguplusCall(vo);
								}
							} else if(data.status == "isNotLogin") {
								if(IS_LOGIN_SNS){
									showConfirmBox({
										message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
										, ok_func : function(){
											MobileBodyStart.goLoginPage();
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
											}
									});
								}
							} else {
								mobileMbrJoinReg.fn.setPaymentStatus("");
								showMessageBox({
									message : data.message
								});
							}
						}
					});
				} else {
					if(IS_LOGIN_SNS){
						showConfirmBox({
							message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
							, ok_func : function(){
								MobileBodyStart.goLoginPage();
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
								}
						});
					}
				}
			});
			
			$("#btn_card_info").unbind("click").click(function(event) {
				event.preventDefault();

				var target = $(".conview_card_info");
				
				if(target.css("display") != "none"){
					
					target.hide();
					$("#btn_card_info").text("카드사 할인정보");
					
				}else{
					
					target.show();
					$("#btn_card_info").text("카드사 할인정보 닫기");
				}
			});
			
			$(".btn_back").unbind("click").click(function(event) {
				event.preventDefault();
				
				document.location.href = GLOBAL_WEB_ROOT + "mobile/mbr/join/mobile_mbr_join_select.do";
			});
		},
		kakaopayCall : function(vo) {
			if(vo.resultcode == "00"){

				var frm_kakao_pay = $("form[name='frm_kakao_pay']");
				
				$("input[name='GoodsCnt']",frm_kakao_pay).val("1");
				$("input[name='GoodsName']",frm_kakao_pay).val(vo.goodsname);
				$("input[name='Amt']",frm_kakao_pay).val(vo.amount);
				$("input[name='MID']",frm_kakao_pay).val(vo.mid);
				$("input[name='BuyerName']",frm_kakao_pay).val(vo.buyername);
				//$("input[name='BuyerEmail']",frm_kakao_pay).val(vo.buyeremail);
				$("input[name='EdiData']",frm_kakao_pay).val(vo.ediData);
				$("input[name='EncryptData']",frm_kakao_pay).val(vo.encryptdata);
				$("input[name='merchantTxnNum']",frm_kakao_pay).val(vo.moid);
				$("input[name='RESULT_MSG']",frm_kakao_pay).val(vo.resultmsg);
				$("input[name='RESULT_CODE']",frm_kakao_pay).val(vo.resultcode);
				$("input[name='FnNo']",frm_kakao_pay).val();
				
				frm_kakao_pay.attr("action","/mobile/mbr/join/mobile_mbr_join_kakaopay_next.do?i_sOrdercd="+vo.ordercd);
				
		        kakaopayDlp.setTxnId(vo.txnid);
		        kakaopayDlp.callDlp('kakaopay_layer', document.frm_kakao_pay, submitFunc);
		        
			}else{

				showMessageBox({message : vo.resultMsg
					,close : function(){
						
					}
				});
				
				return;
			}
		},
		setPaymentStatus : function(status) {
			if(status == "ING") {
				$("#btn_payment").removeClass("c-blue").addClass("c-gray").text("결제 진행중");
				$("<div class='overlay'></div>").clone().appendTo("#wrap");
			} else if("FINISH") {
				$("#btn_payment").removeClass("c-blue").addClass("c-gray").text("결제 완료 처리중");
				$("<div class='overlay'></div>").clone().appendTo("#wrap");
			} else {
				$("#btn_payment").removeClass("c-gray").addClass("c-blue").text("결제하기");
			}
		},
		isValidation : function() {
			var isResult = true;
			var target = undefined;
			var frm = $("form[name='frm']");
			
			var mobile1 = frm.find("select[name='i_sOrderMobile1']");
			var mobile2 = frm.find("input[name='i_sOrderMobile2']");
			var mobile3 = frm.find("input[name='i_sOrderMobile3']");
			
			if (mobile1.val() == "") {
				addErrorMessageBox($("*[name='i_sOrderMobile1']", frm),"휴대전화를 입력해 주세요");
				isResult = false;
				if (target == undefined) {
					target = mobile1.eq(0);
				}
			}
			
			if (mobile2.val() == "" || mobile2.val().length < 3) {
				addErrorMessageBox($("*[name='i_sOrderMobile2']", frm),"휴대전화를 입력해 주세요");
				isResult = false;
				if (target == undefined) {
					target = mobile2.eq(0);
				}	
			}
			if (mobile3.val() == "" || mobile3.val().length < 4) {
				
				addErrorMessageBox($("*[name='i_sOrderMobile3']", frm),"휴대전화를 입력해 주세요");
				isResult = false;
				if (target == undefined) {
					target = mobile3.eq(0);
				}
			}
			
			var payType = frm.find("*[name='i_sPayTypecd']").val();
			
			if (payType == undefined || payType == "") {
				
				addErrorMessageBox($("*[name='i_sPayTypecd']", frm).eq(0), "결제방법을 선택해 주세요", "");
				isResult = false;
				if (target == undefined) {
					target = $("*[name='i_sPayTypecd']", frm).focus();
				}
			}else if(payType == "0001"){
				
				var selectvalue = $("select[name='i_sPayCardTypecd']").val();
				
				if(selectvalue == ""){
					
					addErrorMessageBox($("*[name='i_sPayCardTypecd']", frm).eq(0), "카드 종류를 선택해주세요.", "");
					isResult = false;
					if (target == undefined) {
						target = $("*[name='i_sPayCardTypecd']", frm).focus();
					}
				}
			}
			
			var check_agree = $("input[name='check_agree']").is(":checked");
			if(check_agree == false) {
				showMessageBox({
					message : "서비스 이용약관 동의는 필수입니다."
				});
				return;
			}
			
			var i_sPaymentMsg = $("input[name='i_sPaymentMsgChk']").is(':checked');
			if(i_sPaymentMsg == false){
				showMessageBox({message : "위 상품의 판매조건을 명확히 확인하였으며,구매 진행에 동의합니다.(전자상거래법 제8조 2항)에 체크해주세요."});
				return;
			}
			
			if (!isResult) {
				showMessageBox({
					message : "필수 입력사항을 확인해 주세요."
					, close : function () {
						target.focus();						
					}
				});
			}
			
			return isResult;
		},
		lguplusCall : function(vo) {
			$("input[name='CST_PLATFORM']").val(vo.cstplatform);
			$("input[name='CST_MID']").val(vo.cstmid);
			$("input[name='LGD_MID']").val(vo.lgdmid);
			$("input[name='LGD_PRODUCTINFO']").val(vo.productinfo);
			$("input[name='LGD_OID']").val(vo.ordercd);
			$("input[name='LGD_TIMESTAMP']").val(vo.timestamp);
			$("input[name='LGD_HASHDATA']").val(vo.hashdata);
			$("input[name='LGD_CLOSEDATE']").val(vo.closedate);
			$("input[name='LGD_CASNOTEURL']").val(vo.casnoteurl);
			$("input[name='LGD_RETURNURL']").val(vo.returnurl);
			
			var mobileKeyWords = new Array('iPhone', 'iPod', 'iPad');
			
			for (var word in mobileKeyWords){
				if (navigator.userAgent.match(mobileKeyWords[word]) != null){
					if(GLOBAL_MOBILE_APP=="APP"){
						$("#LGD_KVPMISPAUTOAPPYN").val("A");
						$("#LGD_MTRANSFERAUTOAPPYN").val("A");
						
						if(word != 'Android'){
							$("#LGD_KVPMISPWAPURL").val("apmall://");
							$("#LGD_KVPMISPCANCELURL").val("apmall://");
							$("#LGD_MTRANSFERWAPURL").val("apmall://");
						}
						
					}else{
						
						$("#LGD_KVPMISPAUTOAPPYN").val("N");
						$("#LGD_MTRANSFERAUTOAPPYN").val("N");
					}
				}
			}
			
			if(vo.paytypecd == "SC0010"){

				//신용카드 시에는 카드번호
				$("input[name='LGD_USABLECARD']").val(vo.subtypecd);
				$("input[name='LGD_AFFILIATECARDINFO']").val("");
				$("input[name='LGD_AFFILIATECARDONLY']").val("N");
				
			}else if(vo.paytypecd == "SC0010_1" 
				   ||vo.paytypecd == "SSCD_01"
				   ||vo.paytypecd == "SHCD_02"
				   ||vo.paytypecd == "LOCD_01"
				   ||vo.paytypecd == "LOCD_02"){ 

				var affiliateCardInfo = "";
				var affiliateCardOnly = "N";

				if(vo.paytypecd == "SC0010_1"){
					affiliateCardInfo = "11-002055";
					affiliateCardOnly = "Y";
					vo.subtypecd = "11";
				}else if(vo.paytypecd  == "SSCD_01"){
					vo.subtypecd = "51";
				}else if(vo.paytypecd  == "SHCD_02"){
					vo.subtypecd = "41";
				}else if(vo.paytypecd  == "LOCD_01"||vo.paytypecd  == "LOCD_02"){
					vo.subtypecd = "71";
				}else{
					vo.subtypecd = "";
				}
				
				vo.paytypecd = "SC0010";
				
				$("input[name='LGD_AFFILIATECARDINFO']").val(affiliateCardInfo);
				$("input[name='LGD_AFFILIATECARDONLY']").val(affiliateCardOnly);
				$("input[name='LGD_USABLECARD']").val(vo.subtypecd);
				
			}else if(vo.paytypecd == "SC0030" || vo.paytypecd == "SC0040"){
				
				var escrowYn = $("input[name='i_sFlagEscrowYn']:checked").val();
				
				//에스크로 결제 여부
				$("input[name='LGD_ESCROW_USEYN']").val(escrowYn);

			}else if(vo.paytypecd == "PAYNOW"){
				
				$("input[name='LGD_EASYPAY_ONLY']").val("PAYNOW");
				
				if(GLOBAL_MOBILE_APP !=""){
					
					$("input[name='LGD_MONEPAYAPPYN']").val("Y");
					$("input[name='LGD_MONEPAY_RETURNURL']").val("");
					
				}else{
					
					$("input[name='LGD_MONEPAYAPPYN']").val("N");
					
				}
				
			}
			
			if(vo.paytypecd != "PAYNOW"){
				//결제수단 설정
				var cusTomUsa = $("input[name='LGD_CUSTOM_USABLEPAY']");
				
				if(cusTomUsa.size() > 0){
					
					$("input[name='LGD_CUSTOM_USABLEPAY']").val(vo.paytypecd);
					
				}else{
					
					var frm = $("#frm_lguplus");
					var arrHtml = [];
					arrHtml.push("<input type='hidden' name='LGD_CUSTOM_USABLEPAY' id='lgd_custom_usablepay' value='' />");
					$(arrHtml.join("")).appendTo(frm);
				}			

			}else{
				$("input[name='LGD_CUSTOM_USABLEPAY']").remove();
			}
			
			$("input[name='LGD_AMOUNT']").val(vo.lgdamount);

			//구매자 정보
			$("input[name='LGD_BUYER']").val(vo.username);
			$("input[name='LGD_BUYERID']").val(vo.userid);
			$("input[name='LGD_BUYEREMAIL']").val(vo.useremail);
			$("input[name='LGD_BUYERPHONE']").val(vo.usermobile);
			
			//YCHOI : 결제화면 호출
			launchCrossPlatform();
			
			$(".page_info").hide();
			$(".order").hide();
		}
	}
};

function launchCrossPlatform(){
	location.href="#";
	document.getElementById("container").style.height = "1200px";
	lgdwin = open_paymentwindow(document.getElementById('frm_lguplus'), $("#cst_platform").val(), "submit");
}

var submitFunc = function cnspaySubmit(data){
    
    if(data.RESULT_CODE == '00') {
        document.frm_kakao_pay.submit();
    }else {
        alert("결제요청 실패입니다.["+data.RESULT_MSG+"]");
		
		if (status == "ING") {
			
			$(".btn_payment").removeClass("c-blue").addClass("c-gray").text("결제 진행중");
			$("<div class='overlay'></div>").clone().appendTo("#wrap");
		}
		else if (status == "FINISH") {
			
			$(".btn_payment").removeClass("c-blue").addClass("c-gray").text("결제 완료 처리중");
			$("<div class='overlay'></div>").clone().appendTo("#wrap");
		}
		else {
			$(".overlay").remove();
			$(".btn_payment").removeClass("c-gray").addClass("c-blue").text("결제하기");
			
		}
    }
    
};
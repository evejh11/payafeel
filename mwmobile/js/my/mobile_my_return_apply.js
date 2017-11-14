var MobileMyReturnApply = {
		name : "MobileMyReturnApply"
	   ,init : function(){
		
		   MobileMyReturnApply.setting();
		   MobileMyReturnApply.addBtnEvent();
		    
		   var paytypecd = $("input[name='i_sPayTypecd']").val();
		   var i_sMobileMonthFlag = $("input[name='i_sMobileMonthFlag']").val();
		   $(".contView").eq(1).show();
		   
		   if(paytypecd == "0003" || (paytypecd == "0005" && i_sMobileMonthFlag == "Y")){
			   $(".contView").eq(2).show();
		   }
	   }
	   ,addBtnEvent : function(){
		   
			$(".btn_return_save").click(function(event) {
				event.preventDefault();
				var validate = true;
				var paytypecd = $("input[name='i_sPayTypecd']").val();
				var i_sMobileMonthFlag = $("input[name='i_sMobileMonthFlag']").val();
				if(paytypecd == "0003" || (paytypecd == "0005" && i_sMobileMonthFlag == "Y")){
					if($("input[name='i_sRefundBankUsernm']").val() == undefined || $("input[name='i_sRefundBankUsernm']").val() == "" || $("input[name='i_sRefundBankUsernm']").val() ==  "undefined"){
						validate = false;
						showMessageBox({message : "예금주명을 입력해주세요."});
						return ;
					}
					
					if($("select[name='i_sRefundBankCode']").val() == undefined || $("select[name='i_sRefundBankCode']").val() == "" || $("select[name='i_sRefundBankCode']").val() == "undefined"){
						validate = false;
						showMessageBox({message : "환불할 은행명을 선택해주세요."});
						return ;
					}
					
					if($("input[name='i_sRefundBankNumber']").val() == undefined || $("input[name='i_sRefundBankNumber']").val() == "" || $("input[name='i_sRefundBankNumber']").val() ==  "undefined"){
						validate = false;
						showMessageBox({message : "환불할 계좌번호를 작성해주세요."});
						return ;
					}
				}
				
				//전체 삭제
				removeErrorMessage();
				
				var isResult = true;
				var target 	 = undefined;
				var resObj 	 = undefined;
				
				if(isResult){

					resObj = MobileMyReturnApply.isValidationDeliveryUser();
					isResult = resObj.isResult;
					
					target = resObj.target;
				}
				
				if (!isResult) {
					showMessageBox({message : "회수지 정보를 입력해주세요."});
					target.focus();						
				}
				
				if(validate && isResult){
					MobileMyReturnApply.returnSave();
				}
			});
			
			$(".btn_zip2").unbind("click").click(function(event){
				event.preventDefault();
			
				MobileZip.field = $(".allcont").eq(0);
				
				var ordercd = $(this).attr("id");
				
				var addr = {
						type : "my",
						orgZip1Name : "i_sDeliveryZip1",
						orgZip2Name : "i_sDeliveryZip2",
						orgAddr1Name : "i_sDeliveryAddress1",
						orgAddr2Name : "i_sDeliveryAddress2"
					};
				
				MobileZip.fn.zipProgress(addr);
			});
		   
			$(".btn_back").unbind("click").click(function(event){
				var ordercd = $("input[name='i_sUordercd']").val();
				var url = "/mobile/my/mobile_my_return_step1.do?i_sOrdercd=" + ordercd;
				$(this).attr('href', url);
			});
			
			//배송완료일 때, 상품전체선택 기능
			$(".totalSelBox").on("click", "input[name='i_sCheckAllProd']" ,function(event) {
				var chk_all = $(this).find("input:checkbox + label");
				var len = $("span.inputChk6").find("input:checkbox").length;
				if($(this).is(":checked")) {
					chk_all.prop("checked", true);
	    		   $(this).addClass("active");
	    		   for(var i = 0; i < len; i++){
	    			   $("span.inputChk6").find("input:checkbox").eq(i).prop("checked", true);
	    			   $("span.inputChk6").find("label").eq(i).addClass("active");
	    		   }
				} else {
					chk_all.prop("checked", false);
	    		   $(this).removeClass("active");
	    		   for(var i = 0; i < len; i++){
	    			   $("span.inputChk6").find("input:checkbox").eq(i).prop("checked", false);
	    			   $("span.inputChk6").find("label").eq(i).removeClass("active");
	    		   }
				}
			});
			
			$(".btn_return").unbind("click").click(function(event){
				event.preventDefault();
				
				if($("input[name='i_arrSeqno']:checked").length == 0) {
					
					showMessageBox({message : "반품하실 상품을 선택해주세요."});
					return;
				}
				
				var installMonth = $("input[name='i_iCardInstallMonth']").val();
				var paytype      = $("input[name='i_sPayTypecd']").val();
				
				if(installMonth != undefined && installMonth != ""){
					
					var monthInt = parseInt(installMonth);
					
					if(monthInt >= 80){
					
						var isMpointFlag = false;
						
						$("input[name='i_arrSeqno:checked']").each(function() {	
							var id 	  = $(this).attr("id");
							var target = $(this);

							var chk = $(target).find("input").is(":checked");
							if(!chk) {
								isMpointFlag = true;
						    }
							
						});

						if(isMpointFlag){
							
							showMessageBox({message : "M포인트로 결제하신 주문은 부분 반품이 불가해요.<br/>반품을 원하시는 상품에 체크해주세요."});
							return;							
						}
					}		
				}
				
				var today = new Date();
				var tyear = String(today.getFullYear());
				var tmonth =String(today.getMonth()+1);
				var tday   = String(today.getDate());
				var td = tyear + ""+tmonth+tday;
				
				if(parseInt(td)>= 20150515 && parseInt(td) <= 20150605 && paytype == "0021"){
//				if(paytype == "0021"){
					
				
					var isKakaoFlag = false;
					
					$("input[name='i_arrSeqno']:checked").each(function() {	
						var id 	  = $(this).attr("id");
						var target = $(this).parents("label[for='"+id+"']");

						var chk = $(target).find("input").is(":checked");
						if(!chk) {
							isKakaoFlag = true;
					    }
						
					});

					if(isKakaoFlag){
						
						showMessageBox({message : "5.15 ~ 6.5 카카오페이 결제 시 부분 반품은 불가능합니다. 반품을 원하실 경우 모든 상품을 체크해주세요."});
						return;							
					}
//				}
				}	
				
				var p010cnt	 =	0;
				var p025list = [];

				$("input[name='i_arrSeqno':checked]").each(function() {
					if(($(this).attr("class")).indexOf("check_P010") > -1
					 ||($(this).attr("class")).indexOf("check_P021") > -1
					 ||($(this).attr("class")).indexOf("check_P022") > -1	 
					 ||($(this).attr("class")).indexOf("check_P023") > -1
					 ||($(this).attr("class")).indexOf("check_P024") > -1
					 ||($(this).attr("class")).indexOf("check_P025") > -1) {
						p010cnt++;
					}
					
					if(($(this).attr("class")).indexOf("check_P025") > -1){
						
						var div		  = $(this).parents(".prodbox_new").eq(0);
						var productcd = $("input[name='i_arrProductcd']",div).val();
						
						var size = p025list.length;
						
						if(size > 0){
							
							for(var i=0; i<size; i++){
								
								if(p025list[i].productcd != productcd){
									p025list.push({productcd : productcd});
								}
							}
							
						}else{
							
							p025list.push({productcd : productcd});
						}
					}					
				});
				
				if(p010cnt == 0) {
					
					showMessageBox({
						message : "사은품은 반품대상이 아니에요."
					});
					return;
					
				}else{
					
					var size = p025list.length;
				
					if(size > 0){

						var productSize =  $("input[name='i_arrProductcd']").size();
						
						for(var i=0; i<size; i++){
					
							for(var j=0; j<productSize; j++){
								
								if(p025list[i].productcd  == $("input[name='i_arrProductcd']").eq(j).val()){
									
									var tr 	   = $("input[name='i_arrProductcd']").eq(j).parents(".prodbox_new").eq(0);
									var target = $("input[name='i_arrSeqno']",tr);
									
									target.attr("checked",true);
							    	target.addClass("active");
							    	target.parents("label").addClass("active");
								}
							}
						}
			
					}
				}
				
				var addParam	=	[];
				var ordercd	=	$("input[name='i_sOrdercd']", "#frm").val();
				var returnCnt	=	0;
				
				$("input[name='i_arrSeqno']:checked").each(function(i) {
					
					var seqno	= $(this).val();
					var area    = $(this).parents(".prodImg");
					
					addParam.push(seqno);
					
					if((area.find("input[name='i_sSetno']").attr("class")).indexOf("0") == -1) {
						
						var classnm	=	area.find("input[name='i_sSetno']").attr("class");
						
						$("." + classnm).each(function(j) {
							var setSeqno = $(this).val();
							var product_cnt	= $("#prod_" + seqno).val();
							$("#prod_" + setSeqno).val(product_cnt);
							
							if(setSeqno != addParam[i]) {
								addParam.push($(this).val());
							}
						});
					}
				});
				
				$("input[name='i_arrSeqnoSub']").each(function(i) {
					
					addParam.push($(this).val());
				});
				
				var totalCnt	=	0;
				$(".cntOrigin").each(function() {
					totalCnt	=	totalCnt + parseInt($(this).val());
				});
				
				if(totalCnt == returnCnt) {
					
					if($("input[name='i_arrSeqnoSubVip']").size() > 0) {
						$("input[name='i_arrSeqnoSubVip']").each(function() {
							addParam.push($(this).val());
						});
					}	
					
				}
			
				location.href = GLOBAL_WEB_ROOT + "mobile/my/mobile_my_return_apply.do?i_sOrdercd=" + ordercd + "&i_sSeqno=" + addParam + "&i_iTotalCnt=" + totalCnt;
			});
			
			$(".btn_change").click(function(event){
				event.preventDefault();
				
				if($("input[name='i_arrSeqno']:checked").length == 0) {
					showMessageBox({
						message : "교환하실 상품을 선택해주세요."
					});
					return;
				}
				
				var addParam	=	[];
				var ordercd		=	$("input[name='i_sOrdercd']", "#frm").val();
				
				$("input[name='i_arrSeqno']:checked").each(function(i) {
					addParam[i]	=	jQuery(this).val();
				});
								
				var totalCnt	=	0;
				$(".cntOrigin").each(function() {
					totalCnt	=	totalCnt + parseInt($(this).val());
				});
				
				location.href = GLOBAL_WEB_ROOT + "mobile/my/mobile_my_change_apply.do?i_sOrdercd=" + ordercd + "&i_sSeqno=" + addParam + "&i_iTotalCnt=" + totalCnt;
				
			});
			
			$(".orderProdBox").on("change", "input[name='i_arrSeqno']", function(event){
				event.preventDefault();
				var val = $(this).val();
				var index = $("input[name='i_arrSeqno']").index($(this));
				
				if ($(this).prop("checked")) {
					
					//스페셜기프트가 있으면 해당 스페셜기프트를 다 체크되게 하기
					if($(".check_P012", $(".orderProdBox").eq(index)).size() > 0){
							
						$(".check_P012", $(".orderProdBox").eq(index)).each(function(){
							var id = $(this).attr("id");
							$(this).addClass("active");
							$(this).prop("checked", true);
							$("label[for='"+id+"']").addClass("active");
						});
					}
				}
				else {

					if($(".check_P012", $(".orderProdBox").eq(index)).size() > 0){
							
						$(".check_P012", $(".orderProdBox").eq(index)).each(function(){
							var id = $(this).attr("id");
							$(this).removeClass("active");
							$(this).prop("checked", false);
							$("label[for='"+id+"']").removeClass("active");
						});
					}
				}
				
				
			});
	   }
	   ,setting : function(){
		   
			$(".prodbox_new").each(function() {
				
				var id	=	$(this).attr("id");
				var cnt	=	parseInt(parent.$("#prod_"+id).val());
		
				var mi_price	=	parseInt($("#" + id + "_mi_price").text());
				var price		=	parseInt($("#" + id + "_price").text());
				var bpoint		=	parseInt($("#" + id + "_bpoint").text());
				var mpoint		=	parseInt($("#" + id + "_mpoint").text());
				var card		=	parseInt($("#" + id + "_card").text());
				var coupon		=	parseInt($("#" + id + "_coupon").text());
				var pay			=	parseInt($("#" + id + "_pay").text());
				
				$("#" + id + "_mi_price").text(SetNumComma(mi_price*cnt));
				$("#" + id + "_price").text(SetNumComma(price*cnt));   
				$("#" + id + "_bpoint").text(SetNumComma(bpoint*cnt));  
				$("#" + id + "_mpoint").text(SetNumComma(mpoint*cnt));  
				$("#" + id + "_card").text(SetNumComma(card*cnt));    
				$("#" + id + "_coupon").text(SetNumComma(coupon*cnt));  
				$("#" + id + "_pay").text(SetNumComma(pay*cnt));     
			});
			
			var totalCnt	=	$("input[name='i_iTotalCnt']").val();
//			parent.$(".cntOrigin").each(function() {
//				totalCnt	=	totalCnt + parseInt($(this).val());
//			});
			
			var changeCnt	=	0;
			$("input[name='i_arrProductCnt']").each(function() {
				changeCnt	=	changeCnt + parseInt($(this).val());
			});
			
			if(changeCnt == totalCnt) {
				$("input[name='i_sCheckAll']").val("Y");
			} else {
				$("input[name='i_sCheckAll']").val("N");
			}
			
			var returnMoney	=	0;
			$(".span_return").each(function() {
				var money	=	$(this).text();
				returnMoney	=	returnMoney + parseInt(money.replace(",", ""));
			});
			
			if($("input[name='i_sCheckAll']").val() == "Y") {
				returnMoney	=	returnMoney + parseInt($("input[name='i_iDeliveryPrice']").val());
			}
			
			$(".span_price").text(SetNumComma(returnMoney));
			
		   
	   }
	   ,returnSave : function(){
		   showConfirmBox({
			   message : "사은품을 모두 보내주셔야 반품처리가 가능합니다.<br/>반품하실 상품과 회수지 정보를 모두 확인하셨습니까?"
			   , ok_func : function(){
				   cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_order_return_save.do"
						, type : "POST"
						, data : $("form[name='frm']").serialize()
						, dataType : "json"
						, animation : false
						, success : function(data, textStatus, jqXHR) {
							if(data.status == "succ") {
								var ordercd = data.object;
								
								showMessageBox({
									message : "반품신청이 완료되었습니다."
									, close : function(){
										if(IS_LOGIN) {
											location.href = GLOBAL_SSL_URL+"mobile/my/mobile_my_return_list.do";
										} else {
											if(IS_LOGIN_SNS){
												location.href = GLOBAL_SSL_URL+"mobile/my/mobile_my_order_list.do";
											}else{
												location.href = GLOBAL_SSL_URL+"mobile/my/mobile_my_order_view.do?i_sOrdercd=" +ordercd;
											}
										}
									}	
								});
								
							} else {
								
								showMessageBox({message : data.message});
								
							}
						}
					});
			   }  
		   		, cancel_func : function(){
		   			return ;
		   		}
		   });
			
	   }
	   , isValidationDeliveryUser : function () {
			
			var frm = $("form[name='frm']");
			var isResult = true;
			var target = undefined;
			
			var receivernm = $("input[name='i_sDeliveryUsernm']", frm);
			var zip1 = $("input[name='i_sDeliveryZip1']", frm);
			var zip2 = $("input[name='i_sDeliveryZip2']", frm);
			var addr1 = $("input[name='i_sDeliveryAddress1']", frm);
			var addr2 = $("input[name='i_sDeliveryAddress2']", frm);
			var phone1 = $("*[name='i_sPhone1']", frm);
			var phone2 = $("input[name='i_sPhone2']", frm);
			var phone3 = $("input[name='i_sPhone3']", frm);
			var mobile1 = $("*[name='i_sMobile1']", frm);
			var mobile2 = $("input[name='i_sMobile2']", frm);
			var mobile3 = $("input[name='i_sMobile3']", frm);

			if (receivernm.val() == "" || receivernm.val().length < 2) {
				
				addErrorMessageBox(receivernm.eq(0),"받는사람 이름을 2자 이상 입력해주세요.");
				isResult = false;
				if (target == undefined) {
					target = receivernm.eq(0);
				}
			}
			else if (calculate_byte(receivernm.val()) > 30 ) {
				
				addErrorMessageBox(receivernm.eq(0),"받는사람 이름이 너무 깁니다. (최대 30byte : 영문 1byte 한글 3byte)");
				isResult = false;
				if (target == undefined) {
					target = receivernm.eq(0);
				}
			}
			
			if (zip1.val() == "") {
				
				addErrorMessageBox(zip1.eq(0),"배송지 주소를 입력해 주세요.");
				isResult = false;
				if (target == undefined) {
					target = zip1.eq(0);
				}

			}
			if (zip2.val() == "") {
				
				addErrorMessageBox(zip2.eq(0),"배송지 주소를 입력해 주세요.");
				isResult = false;
				if (target == undefined) {
					target = zip2.eq(0);
				}

			}
			if (addr1.val() == "") {
				addErrorMessageBox(addr1.eq(0),"배송지 주소를 입력해 주세요.");
				isResult = false;
				if (target == undefined) {
					target = addr1.eq(0);
				}
			}
			
			if (addr2.val() == "") {
				addErrorMessageBox(addr2.eq(0), "배송지 주소를 입력해 주세요.");
				isResult = false;
				if (target == undefined) {
					target = addr2.eq(0);
				}
			}
			
			var phone = phone1.val() + "" + phone2.val() + "" + phone3.val();
			var mobile = mobile1.val() + "" + mobile2.val() + "" + mobile3.val();
			var isPassPhone		= false;
			var isPassMobile	= false;
			
//			if (phone.length >= 9) {
//				isPassPhone = true;
//			}
			if (mobile.length >= 9) {
				isPassMobile = true;
			}
			
			if (!isPassMobile && mobile1.val() == "") {
				addErrorMessageBox(mobile1.eq(0), "배송지 앞자리 연락처를 입력해 주세요.");
				isResult = false;
				if (target == undefined) {
					target = mobile1.eq(0);
				}
			}
			if (!isPassMobile && (mobile2.val() == "" || mobile2.val().length < 3 || mobile2.val() == "undefined" || mobile2.val()== undefined)) {
				addErrorMessageBox(mobile2.eq(0), "배송지 중간자리 연락처를 입력해 주세요.");
				isResult = false;
				if (target == undefined) {
					target = mobile2.eq(0);
				}
			}
			if (!isPassMobile && (mobile3.val() == "" || mobile3.val().length < 4 || mobile3.val()=="undefined" || mobile3.val()== undefined)) {
				addErrorMessageBox(mobile3.eq(0), "배송지 뒷자리 연락처를 입력해 주세요.");
				isResult = false;
				if (target == undefined) {
					target = mobile3.eq(0);
				}
			}
			
			var resObj = {
				target : target
				, isResult : isResult
			};
			
			return resObj;
		}
};
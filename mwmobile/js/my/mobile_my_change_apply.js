var MobileMyChangeApply = {
		name : "MobileMyChangeApply"
	   ,init : function(){
		
		   MobileMyChangeApply.setting();
		   MobileMyChangeApply.addBtnEvent();
		   
		   var paytypecd = $("input[name='i_sPayTypecd']").val();
		   $(".contView").eq(1).show();
		   
		   if(paytypecd == "0003" || (paytypecd == "0005" && i_sMobileMonthFlag == "Y")){
			   $(".contView").eq(2).show();
		   }
	   }
	   ,addBtnEvent : function(){
		   
			$(".btn_change_save").click(function(event) {
				event.preventDefault();
				
				//전체 삭제
				removeErrorMessage();
				
				var isResult = true;
				var target 	 = undefined;
				var resObj 	 = undefined;
				
				if(isResult){

					resObj = MobileMyChangeApply.isValidationDeliveryUser();
					isResult = resObj.isResult;
					
					target = resObj.target;
				}
				
				if (!isResult) {
					showMessageBox({message : "회수지 정보를 입력해주세요."});
					target.focus();						
				}
				
				if(isResult){
					MobileMyChangeApply.changeSave();
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
				var url = "/mobile/my/mobile_my_change_step1.do?i_sOrdercd=" + ordercd;
				$(this).attr('href', url);
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
	   ,changeSave : function(){
		  
		   showConfirmBox({
			   message : "교환 상품을 모두 확인하셨습니까?"
				, ok_func : function(){
					cmAjax({
						url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_order_change_save.do"
						, type : "POST"
						, data : $("form[name='frm']").serialize()
						, dataType : "json"
						, animation : false
						, success : function(data, textStatus, jqXHR) {
							if(data.status == "succ") {
								var ordercd = data.object;
								showMessageBox({
									message : "교환신청이 완료되었습니다."
									, close: function(){
										if(IS_LOGIN) {
											location.href = GLOBAL_SSL_URL+"mobile/my/mobile_my_change_list.do";
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
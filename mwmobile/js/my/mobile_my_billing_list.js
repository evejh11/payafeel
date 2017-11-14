var MobileMyBillingList ={
	name : "MobileMyBillingList"
	, i_iNowPageNo : 1
	, i_iRecordCnt : 0
	,init : function(){
		
		var stdt = $("input[name='i_sStDt']").val();
		var endt = $("input[name='i_sEnDt']").val();
		
		var statuscd = $("input[name='i_sStatuscd']").val();
		
		if(stdt == "" && endt == ""){
			
			var searchDt = "2week";
			
			if(statuscd != ""){
				searchDt = "1month";
			}
		
			MobileMyBillingList.fnChangeDateTerm(searchDt);
			
		}else{
			
			MobileMyBillingList.fnMoreAjax();
			
		}
		
		MobileMyBillingList.addBtnEvent();
		//MobileReviewCommStyle.init();
		

	}
	,addBtnEvent : function(){
		
		$(".btn_billing_cancel_confirm").unbind("click").click(function(event){
			event.preventDefault();
			
			var mseqno = $("input[name='i_sMseqno']", $("form[name='frm_billing_cancel']")).val();
			var billkey = $("input[name='i_sBillkey']", $("form[name='frm_billing_cancel']")).val();
			
			MobileCommon.ajax({  
    			url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_billing_cancel_ajax.do"
    			, type : "POST"
    			, dataType : "json"
    			, data : {
    				i_sMseqno : mseqno,
    				i_sBillkey : billkey
    				// 빌키
    				// 아이디
    				// 해당mst주문
    			}
    			, animation : false
    			, success : function(data, textStatus, jqXHR) {
    				
    				if (data.status == 'succ'){
    					modalPopupClose("#pop_cancel_subscription");
    					
    					document.location.href = GLOBAL_WEB_URL + "mobile/my/mobile_my_billing_cancel_list.do";
//    					$("form[name='frm_reload']").submit();
    				} else {
    					showMessageBox({message : data.message});
    					modalPopupClose("#pop_cancel_subscription");
    				}
    			}
    		});
			
		});
		
		
		
		$(".btn_payInfo_change").unbind("click").click(function(event){
			event.preventDefault();
			
			var frm = $("form[name='frm']")
			var mseqno = $("input[name='i_sMseqno']", frm).val();
			
			MobileCommon.ajax({  
    			url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_billkey_change_ajax.do"
    			, type : "POST"
    			, dataType : "json"
    			, animation : false
    			, success : function(data, textStatus, jqXHR) {
    				
    				if (data.status == 'succ'){
    					
    					var vo = data.object;
    					
    					var frm = $("form[name='frm_lguplus_billing_change']");

//	    					var str = "";
//	    					
//	    					str += "\n" + vo.cst_platform;
//	    					str += "\n" + vo.cst_mid;
//	    					str += "\n" + vo.lgd_mid;
//	    					str += "\n" + vo.lgd_buyerssn;
//	    					str += "\n" + vo.lgd_checkssnyn;
//	    					str += "\n" + vo.lgd_returnurl;
//	    					str += "\n" + vo.lgd_paywindowtype;
//	    					str += "\n" + vo.lgd_custom_switchingtype;
//	    					str += "\n" + vo.lgd_window_type;
//	    					
//	    					alert(str);
    					
    					
    					$("input[name='CST_PLATFORM']", frm).val(vo.cst_platform);
//    					$("input[name='CST_MID']", frm).val(vo.cst_mid);
//    					$("input[name='LGD_MID']", frm).val(vo.lgd_mid);
    					$("input[name='LGD_BUYERSSN']", frm).val(vo.lgd_buyerssn);
    					$("input[name='LGD_CHECKSSNYN']", frm).val(vo.lgd_checkssnyn);
    					$("input[name='LGD_RETURNURL']", frm).val(vo.lgd_returnurl + "?i_sMseqno=" + mseqno);
    					$("input[name='LGD_PAYWINDOWTYPE']", frm).val(vo.lgd_paywindowtype);
    					$("input[name='LGD_WINDOW_TYPE']", frm).val(vo.lgd_window_type);
    					
    					$("input[name='CST_MID']", frm).val("apmall_auto16");
    					$("input[name='LGD_MID']", frm).val("apmall_auto16");
    					
    					
    					
//	    					alert($("input[name='CST_PLATFORM']", frm).val());
//	    					alert($("input[name='CST_MID']", frm).val());
//	    					alert($("input[name='LGD_MID']", frm).val());
//	    					alert($("input[name='LGD_BUYERSSN']", frm).val());
//	    					alert($("input[name='LGD_CHECKSSNYN']", frm).val());
//	    					alert($("input[name='LGD_RETURNURL']", frm).val());
//	    					alert($("input[name='LGD_PAYWINDOWTYPE']", frm).val());
//	    					alert($("input[name='LGD_CUSTOM_SWITCHINGTYPE']", frm).val());
//	    					alert($("input[name='LGD_WINDOW_TYPE']", frm).val());
    					
    					//lgdwin = open_paymentwindow(document.getElementById('frm_lguplus_billing_change'), 'test', 'iframe', null, "", "");
    					lgdwin = open_paymentwindow(document.getElementById('frm_lguplus_billing_change'), "service", "submit");
    					
    					
    				} else {
    					showMessageBox({message : data.object.i_sJsonMessage});
    				}
    			}
    		});
			
		});
		
		
		
		$(".btn_search").click(function(event){
			
			event.preventDefault();
			var id = $(this).attr("id");
			$(".tab_search").removeClass("active");
			$(this).parents(".tab_search").eq(0).addClass("active");
			
			MobileMyBillingList.i_iNowPageNo = 1;
			MobileMyBillingList.i_iRecordCnt = 0;
			
			$("input[name='i_sStatuscd']").val("");
			
			MobileMyBillingList.fnChangeDateTerm(id);
			
		});
		
		$(".btn_more_billing").click(function(event) {
			event.preventDefault();
			MobileMyBillingList.fnMore();			
		});
		
		
//		$(".listContent").on("click",".btn_order_view",function(event){
//			event.preventDefault();
//			
//			var ordercd = $(this).attr("id");
//			MobileMyBillingList.fnOrderView(ordercd);
//		});
		
		$(".listContent").on("click",".btn_receipt",function(event){
			event.preventDefault();
			var value = $(this).attr("id").split(";");
			
			showReceiptByTID(value[0],value[1],'authdata');
		});
		
		$(".listContent").on("click",".btn_escrow_accept",function(event){
			event.preventDefault();
			var value = $(this).attr("id").split(";");

			checkDacomESC(value[0],value[1],"");

			
		});
		
		$(".listContent").on("click",".btn_accept",function(event){
			event.preventDefault();
			
			var ordercd = $(this).attr("id");
			var idx = $(".btn_accept").index($(this));
			var uordercd = $("input[name='i_arrUordercd']").eq(idx).val();
			
			if(uordercd != undefined && uordercd != "" && uordercd != "undefined"){
				showConfirmBox({
					message : "교환완료 하시겠습니까?"
					,ok_func : function(){
						MobileMyBillingList.fnAccept(ordercd,"0022","change");
					}
				});
			}else{
				showConfirmBox({
					message : "수취확인 하시겠어요?"
					,ok_func : function(){
						MobileMyBillingList.fnAccept(ordercd,"0022","normal");
					}
				});
			}
			
		});

		$(".listContent").on("click",".btn_naver_accept",function(event){
			
			event.preventDefault();
			var ordercd = $(this).attr("id");
			var idx = $(".btn_accept").index($(this));
			var uordercd = $("input[name='i_arrUordercd']").eq(idx).val();
			if(uordercd != undefined && uordercd != "" && uordercd != "undefined"){
				showConfirmBox({
					message : "교환완료 하시겠습니까?"
						,ok_func : function(){
							MobileMyBillingList.fnAccept(ordercd, "0022", "change", "NAVERPAY");
						}
				});
			}else{
				showConfirmBox({
					message : "수취확인 하시겠어요?"
						,ok_func : function(){
							
							MobileMyBillingList.fnAccept(ordercd, "0022", "normal", "NAVERPAY");
							
						}
				});
			}
			
			
			
		});
		
		$(".btn_review_reg").unbind("click").click(function(event) {
			event.preventDefault();
			
			if(MobileReviewComm.fn.fnValidate()) {
				var obj = {
					i_iRecomPoint : $("input[name='i_iRecomPoint']:checked").val()
					, i_sContent : $("#i_sContent").val()
					, i_sOrdercd : $("#i_sReviewOrdercd").val()
					, i_sProductcd : $("#i_sProductcd").val()
					, i_sFlagAction : "R"
					, i_sFlagRebuy : $("input[name='i_sFlagRebuy']:checked").val()
					, i_arrOptioncd : []
				};
				
				$("input[name='i_arrOptioncd']").each(function() {
					if(!$(this).is(":disabled")) {
						obj.i_arrOptioncd.push($(this).val());
					}
				});
				
				MobileReviewComm.fn.goSave(obj, "");
			}
		});
		
		$(".btn_delivery_reg").click(function(event){
			
			var frm = $("form[name='frm_delivery_addr']");
			
			var addrnm = $("input[name='i_sAddressnm']", frm);
			var addrsee = $("input[name='i_sAddressee']", frm);
			var tel1 = $("select[name='i_sTel1']", frm);
			var tel2 = $("input[name='i_sTel2']", frm);
			var tel3 = $("input[name='i_sTel3']", frm);
			var mobile1 = $("select[name='i_sMobile1']", frm);
			var mobile2 = $("input[name='i_sMobile2']", frm);
			var mobile3 = $("input[name='i_sMobile3']", frm);
			var zip1 = $("input[name='i_sZip1']", frm);
			var zip2 = $("input[name='i_sZip2']", frm);
			var addr1 = $("input[name='i_sAddr1']", frm);
			var addr2 = $("input[name='i_sAddr2']", frm);
			
			isCheck = true;
			/*if(addrnm.val()  == ""){
				addErrorMessageBox(addrnm, "배송지명을 입력해주세요");
				alert(1);
				isCheck=false;
			}else{
				removeErrorMessageBox(addrnm);
			}*/
			if(addrsee.val()  == ""){
				addErrorMessageBox(addrsee, "수신인 이름을 입력해주세요");
				isCheck=false;
			}else{
				removeErrorMessageBox(addrsee);
			}
			
			if(mobile1.val()  == ""){
				addErrorMessageBox(mobile1, "배송지 앞자리 연락처를 입력해 주세요.");
				isCheck=false;
			}else{
				removeErrorMessageBox(mobile1);
			}
			if(mobile2.val()  == ""){
				addErrorMessageBox(mobile2, "배송지 중간자리 연락처를 입력해 주세요.");
				isCheck=false;
			}else{
				removeErrorMessageBox(mobile2);
			}
			if(mobile3.val()  == ""){
				addErrorMessageBox(mobile3, "배송지 뒷자리 연락처를 입력해 주세요.");
				isCheck=false;
			}else{
				removeErrorMessageBox(mobile3);
			}
			if(zip1.val()  == ""){
				addErrorMessageBox(zip1, "우편번호를 넣어주세요");
				isCheck=false;
			}else{
				removeErrorMessageBox(zip1);
			}
			if(zip2.val()  == ""){
				addErrorMessageBox(zip2, "우편번호를 넣어주세요");
				isCheck=false;
			}else{
				removeErrorMessageBox(zip2);
			}
			if(addr1.val()  == ""){
				addErrorMessageBox(addr1, "주소를 넣어주세요");
				isCheck=false;
			}else{
				removeErrorMessageBox(addr1);
			}
			if(addr2.val()  == ""){
				addErrorMessageBox(addr2, "주소를 넣어주세요");
				isCheck=false;
			}else{
				removeErrorMessageBox(addr2);
			}
			if(!isCheck){
				return;
			}
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"my/my_billing_addr_change_save.do"
				, type : "POST"
				, data : frm.serialize()
				, dataType : "json"
				, animation	: false
				, success : function ( data, textStatus, jqXHR) {
					
					if(data.status == "succ"){
						
						showMessageBox({
							message : "주소지가 변경 되었어요."
							, close : function(){
								parent.document.frm_reload.submit();
								//parent.cmDialogClose("my_billing_shipping_pop");
							}
						})
						
					}				
				}
			});
			
		});

	
		
	}
	,fnAccept : function(ordercd, status, orderflag, payType) {
		
		
		MobileCommon.ajax({
    		url : GLOBAL_WEB_ROOT+"mobile/my/mobile_my_accept_save.do"
    		, type : "POST"
    		, dataType : "json"
    		, data : {
    			i_sOrdercd : ordercd
    			, i_sCompleteStatuscd : status
    			, i_sOrderFlag : orderflag
    			, i_sPayType : payType
    		}
    		,animation : false
    		, success : function(data, textStatus, jqXHR) {
    			
    			if(data.status == "succ") {
    				
    				if(orderflag == "change"){
    					showMessageBox({
        					message : "교환이 완료되었어요."
        					, close : function() {
        						
        						document.frm_reload.submit();
        					}
        				});
    				}else{
    					showMessageBox({
        					message : "수취확인이 완료되었어요."
        					, close : function() {
        						
        						document.frm_reload.submit();
        					}
        				});
    				}

    			} else if(data.status == "isNotLogin") {
    				if(IS_LOGIN_SNS){
						showConfirmBox({
							message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
							, ok_func : function(){
								document.location.href = GLOBAL_SSL_URL + "mobile/mbr/mobile_mbr_member_login.do";
							}
						    , cancel_func: function(){
								return ;
							}
						});
					}else{
						showMessageBox({
							message : "로그인 하시면 서비스 이용이 가능하세요!"
								, close : function() {
									
									document.location.href = GLOBAL_SSL_URL + "mobile/mbr/mobile_mbr_member_login.do";
									
								}
						});
					}
    				
    			} else {
    				
    				showMessageBox({
    					message : data.message
    				});
    			}
    		}
    	});
    }
	,fnOrderView : function(ordercd, mseqno, sseqno) {
		
		$("input[name='i_sOrdercd']").val(ordercd);
		$("input[name='i_sMseqno']").val(mseqno);
		$("input[name='i_iSseqno']").val(sseqno);
		
		var frm	=	$("form[name='frm']");
		
		frm.attr("action", GLOBAL_SSL_URL + "mobile/my/mobile_my_order_view.do");
		frm.submit();

	}
	,fnBillingView : function(ordercd, mseqno, sseqno) {
		
		$("input[name='i_sOrdercd']").val(ordercd);
		$("input[name='i_sMseqno']").val(mseqno);
		$("input[name='i_iSseqno']").val(sseqno);
		
		var frm	=	$("form[name='frm']");
		
		frm.attr("action", GLOBAL_SSL_URL + "mobile/my/mobile_my_billing_view.do");
		frm.submit();

	}
	,fnMore : function(){
		
		var lastpage = Math.ceil(MobileMyBillingList.i_iRecordCnt / 3);
		
		MobileMyBillingList.i_iNowPageNo++;
		
		MobileMyBillingList.fnMoreAjax();
		
		if(lastpage == MobileMyBillingList.i_iNowPageNo) {
			
			$(".btn_more").fadeOut("slow");
		}
	}
	,fnMoreAjax : function(){
		
		console.log(MobileMyBillingList.i_iNowPageNo);
		
		MobileCommon.ajax({  
			url : GLOBAL_WEB_ROOT+"mobile/my/mobile_my_billing_list_ajax.do"
			, type : "POST"
			, dataType : "json"
			, data : {
				  i_sStDt : $("input[name='i_sStDt']").val()
				, i_sEnDt : $("input[name='i_sEnDt']").val()
				, i_sStatuscd : $("input[name='i_sStatuscd']").val()
				, i_iBillingCnt : $("input[name='i_iBillingCnt']").val()
				, i_iBillingCancelCnt : $("input[name='i_iBillingCancelCnt']").val()
				, i_iNowPageNo : MobileMyBillingList.i_iNowPageNo
				, i_iRecordCnt : MobileMyBillingList.i_iRecordCnt
			}
			, animation : false
			, success : function( data, textStatus, jqXHR) {
				
				$(".listContent").hide();
				
				MobileMyBillingList.i_iRecordCnt = data.object.i_iRecordCnt;
				MobileMyBillingList.i_iNowPageNo = data.object.i_iNowPageNo;
				
				var billingMap = data.object;
				
				var billingList = billingMap.billingList;
				var mstSize;
				
				if (billingList == undefined || billingList == '' || billingList == null){
					mstSize = 0
				} else {
					mstSize = billingList.length;
				}
				
				var arrHtml = new Array();
				var firstFlag = false;
				
				if(mstSize > 0){
					
					for (var i = 0; i < mstSize; i++){
						
						var billingVo = billingList[i];
						var mstInfo = billingVo.mstinfo;
						var subList = billingVo.sublist;
						var subSize = subList.length;
						
						firstFlag =		i == 0 ? true : false;
				
						arrHtml.push("<div class=\"accoSec\">                                                                                                                                                  ");
	                    arrHtml.push("<section id=\"accoTab\" class=\"accordion\">                                                                                                                             ");
	                    
	                    if (firstFlag){
	                    	arrHtml.push("	<h2 class=\"tit active\">                                                                                                                                              ");
	                    } else {
	                    	arrHtml.push("	<h2 class=\"tit\">                                                                                                                                              ");
	                    }
	                    
	                    arrHtml.push("        <a href=\"#none\" class=\"btn_billing_detail\">신청번호 <span class=\"f_st2\">" + mstInfo.n_mseqno + "</span></a>                                                                                       ");
	                    
	                    if (mstInfo.v_billkey_seq != 3){
	                    	arrHtml.push("        <span class=\"btn_ty2 v3 as_new\"><a href=\"#\" class=\"btn_billing_cancel_pop\" data-mseqno=\"" + mstInfo.n_mseqno + "\">서비스 해지신청</a></span>                                     ");
	                    }
	                    
	                    arrHtml.push("    </h2>                                                                                                                                                                ");

	                    if (firstFlag){
	                    	arrHtml.push("    <div class=\"contView active\" style=\"\">                                                                                                                           ");
	                    } else {
	                    	arrHtml.push("    <div class=\"contView\" style=\"display:none;\">                                                                                                                           ");
	                    }
	                    
	                    arrHtml.push("    	<div class=\"productAddInfo\">                                                                                                                                     ");
	                    arrHtml.push("        	<div class=\"tabletype\">                                                                                                                                      ");
	                    arrHtml.push("            	<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">                                                                                    ");
	                    arrHtml.push("                    <caption><span>상품추가정보 안내 표</span></caption>                                                                                                 ");
	                    arrHtml.push("                    <colgroup>                                                                                                                                           ");
	                    arrHtml.push("                        <col width=\"75px\">                                                                                                                             ");
	                    arrHtml.push("                        <col width=\"*\">                                                                                                                                ");
	                    arrHtml.push("                    </colgroup>                                                                                                                                          ");
	                    arrHtml.push("                    <tbody class=\"productAddLawInfo \">                                                                                                                 ");
	                    arrHtml.push("                    	<tr>                                                                                                                                               ");
	                    arrHtml.push("                            <th scope=\"row\"><p>신청수량</p></th>                                                                                                       ");
	                    arrHtml.push("                            <td>매월 1 BOX</td></tr><tr>                                                                                                                 ");
	                    arrHtml.push("                            <th scope=\"row\"><p>구독기간</p></th>                                                                                                       ");
	                    arrHtml.push("                            <td class=\"pal_new\">3개월                                                                                                                  ");
	                    arrHtml.push("                            </td>                                                                                                                                        ");
	                    arrHtml.push("                        </tr>                                                                                                                                            ");
	                    arrHtml.push("                        <tr>                                                                                                                                             ");
	                    arrHtml.push("                            <th scope=\"row\"><p>결제수단</p></th>                                                                                                       ");
	                    arrHtml.push("                            <td>신용카드_" + mstInfo.v_financename);
	                    
	                    if (mstInfo.v_billkey_seq != 3){
	                    	arrHtml.push("                            <span class=\"btn_ty3 v4\"><a href=\"#\" class=\"btn_autopay_change\" data-mseqno=\"" + mstInfo.n_mseqno + "\">자동결제 정보 변경</a></span> ");
	                    }
	                    
	                    arrHtml.push("						  </td>                                                                                                                  ");
	                    arrHtml.push("                        </tr>                                                                                                                                            ");
	                    arrHtml.push("                        <tr>                                                                                                                                             ");
	                    arrHtml.push("                            <th scope=\"row\"><p>결제방식</p></th>                                                                                                       ");
	                    arrHtml.push("                            <td>매월 자동결제 (* 첫결제 이후 2번째 박스부터 자동결제)</td>                                                                               ");
	                    arrHtml.push("                        </tr>                                                                                                                                            ");
	                    arrHtml.push("                        <tr>                                                                                                                                             ");
	                    arrHtml.push("                        	<th scope=\"row\"><p>신청일</p></th>                                                                                                           ");
	                    arrHtml.push("                            <td>" + dateStrucChange(mstInfo.v_reg_dtm, 1) + "</td>                                                                                                                    ");
	                    arrHtml.push("                        </tr>                                                                                                                                            ");
	                    arrHtml.push("                        <tr>                                                                                                                                             ");
	                    arrHtml.push("                            <th scope=\"row\"><p>배송주소</p></th>                                                                                                       ");
	                    arrHtml.push("                            <td class=\"pal_new1\">" + mstInfo.v_delivery_address1 + mstInfo.v_delivery_address2 + "                                                                ");
	                    
	                    if (mstInfo.v_billkey_seq != 3){
	                    	arrHtml.push("                            	<span class=\"btn_ty3 v4\"><a href=\"#\" mseq=\""+ mstInfo.n_mseqno +"\" class=\"btn_billing_delivery_change\">배송지변경</a></span>");
	                    }
	                    
	                    arrHtml.push("								    <span class='span_hide span_"+mstInfo.n_mseqno+"'>");
	                    arrHtml.push("								    <span class='span_flag_default'>N</span>");
	                    arrHtml.push("								    <span class='span_addressnm'></span>");
	                    arrHtml.push("								    <span class='span_receivernm'>"+mstInfo.v_delivery_receivernm+"</span>");
	                    arrHtml.push("								    <span class='span_zip1'>"+mstInfo.v_delivery_zip1+"</span>");
						arrHtml.push("								    <span class='span_zip2'>"+mstInfo.v_delivery_zip2+"</span>");
						arrHtml.push("								    <span class='span_addr1'>"+mstInfo.v_delivery_address1+"</span>");
						arrHtml.push("								    <span class='span_addr2'>"+mstInfo.v_delivery_address2+"</span>");
						arrHtml.push("								    <span class='span_phone1'>"+mstInfo.v_tel1+"</span>");
						arrHtml.push("								    <span class='span_phone2'>"+mstInfo.v_tel2+"</span>");
						arrHtml.push("								    <span class='span_phone3'>"+mstInfo.v_tel3+"</span>");
						arrHtml.push("								    <span class='span_mobile1'>"+mstInfo.v_mobile1+"</span>");
						arrHtml.push("								    <span class='span_mobile2'>"+mstInfo.v_mobile2+"</span>");
						arrHtml.push("								    <span class='span_mobile3'>"+mstInfo.v_mobile3+"</span>");
						arrHtml.push("								    <span class='span_militaryYn'>"+mstInfo.v_delivery_millitery+"</span>");
						arrHtml.push("								    <span class='span_deliverycomment'>"+mstInfo.v_delivery_comment+"</span>");
						arrHtml.push("								</span>");
	                    arrHtml.push("                            </td>                                                                                                                                        ");
	                    arrHtml.push("                        </tr>                                                                                                                                            ");
	                    arrHtml.push("                    </tbody>                                                                                                                                             ");
	                    arrHtml.push("                </table>                                                                                                                                                 ");
	                    arrHtml.push("            </div>                                                                                                                                                       ");
	                    arrHtml.push("        <div>                                                                                                                                                            ");
	                    arrHtml.push("        <!-- // productAddInfo -->                                                                                                                                       ");
		                arrHtml.push("    </div>                                                                                                                                                               ");
		                arrHtml.push("    <div class=\"listContent\">                                                                                                                                          ");
		                arrHtml.push("        <strong>주문내역</strong>                                                                                                                                        ");
		                arrHtml.push("        <ul>                                                                                                                                                             ");
		                
		                for (var j = 0; j < subSize; j++){
		                	
		                	var subVo = subList[j];
		                	
		                	arrHtml.push("        	<li>                                                                                                                                                           ");
		                	arrHtml.push("                <div class=\"bundle\">                                                                                                                                   ");
		                	arrHtml.push("                    <p class=\"t1\">                                                                                                                                     ");
		                	arrHtml.push("                        <a href=\"#\" class=\"btn_order_view\" id=\"" + subVo.v_ordercd + "\" data-mseqno=\"" + subVo.n_mseqno + "\" data-sseqno=\"" + subVo.n_sseqno + "\">" + subVo.v_ordercd + " </a>                                                                                             ");
		                	arrHtml.push("                        <span class=\"state\">" + subVo.v_ordernm + " (" + subVo.v_statusnm + ")</span>                                                                                          ");
		                	arrHtml.push("                    </p>                                                                                                                                                 ");
		                	arrHtml.push("                    <p class=\"t2\">                                                                                                                                     ");
		                	arrHtml.push("                        <span class=\"price\">" + SetNumComma(subVo.n_price) + "원</span>                                                                                                            ");
		                	arrHtml.push("                        <span class=\"date\">" + dateStrucChange(subVo.v_reg_dtm) + "</span>                                                                                                           ");
		                	arrHtml.push("                    </p>                                                                                                                                                 ");
		                	arrHtml.push("                </div>                                                                                                                                                   ");
		                	arrHtml.push("            </li>                                                                                                                                                        ");
		                }
		                
		                arrHtml.push("        </ul>                                                                                                                                                            ");
		                arrHtml.push("    </div>                                                                                                                                                               ");
		                arrHtml.push("    <!-- // listContent -->                                                                                                                                              ");
		                arrHtml.push("    </div>                                                                                                                                                               ");
		                arrHtml.push("</section>                                                                                                                                                               ");
		                arrHtml.push("</div>                                                                                                                                                                   ");
					}
					
					var lastpage = Math.ceil(MobileMyBillingList.i_iRecordCnt == 0 ? 1 : MobileMyBillingList.i_iRecordCnt/ 3);
	        		
					if(lastpage == MobileMyBillingList.i_iNowPageNo) {
						
						$(".btn_more").fadeOut("slow");
						
					} else {
						
						$(".btn_more").fadeIn("slow");
					}
					
				}else{
					
					arrHtml.push("	<div class='nodata'>");
					arrHtml.push("		<p class='sp_bg s5'>주문정보가 없습니다.</p>");
					arrHtml.push("	</div>");
					$(".btn_more").hide();
					$(".listContent").html(arrHtml.join("")).fadeIn("slow");
					
				}
				
				$(".tab_cont_new").append(arrHtml.join(""));
				
				MobileMyBillingList.addBtnBillingEvent();
			}

		});	
	},
	addBtnBillingEvent : function(event){
		
		$(".btn_billing_detail").unbind("click").click(function(event){
        	event.preventDefault();
        	
        	var h2_title = $(this).parent();
        	var isActive = h2_title.hasClass("active");
        	
        	var div_contView = $(this).parents(".accordion").find(".contView");
        	
        	if (isActive == true){
        		h2_title.removeClass("active");
        		div_contView.removeClass("active");
        		div_contView.css("display", "none");
        	} else {
        		h2_title.addClass("active");
        		div_contView.addClass("active");
        		div_contView.show();
        		div_contView.css("display", "block");
        	}
        });
		
		$(".btn_billing_cancel_pop").unbind("click").click(function(event){
			event.preventDefault();
			var mseqno = $(this).attr("data-mseqno");
			$("input[name='i_sMseqno']", $("form[name='frm_billing_cancel']")).val(mseqno);
			$("input[name='i_sBillkey']", $("form[name='frm_billing_cancel']")).val(mseqno);
			modalPopup('#pop_cancel_subscription');
		});
		
		$(".btn_billing_view").unbind("click").click(function(event){
			event.preventDefault();
			
			var ordercd = $(this).attr("id");
			
			var mseqno = $(this).attr("data-mseqno");
			var sseqno = $(this).attr("data-sseqno");
			
			MobileMyBillingList.fnBillingView(ordercd, mseqno, sseqno);
		});
		
		$(".btn_autopay_change").unbind("click").click(function(event){
			event.preventDefault();
			
			var frm = $("form[name='frm']");
			
			$("input[name='i_sMseqno']", frm).val($(this).attr("data-mseqno")) 
			
			modalPopup('#pop_autopay_info');
		});
		
		
		$(".btn_billing_delivery_change").unbind("click").click(function(event){
			event.preventDefault();
			
			MobileAddress.field = $("#container").eq(0);
			
			var ordercd = "A160429000015566";
			
			var mseq = $(this).attr("mseq");
			
		    var	delievery = {
				flag : "M"
				,addresscd : mseq
				,type : "mybilling"
				,ordercd : ordercd
				,mseq : mseq
			};
			
			MobileAddress.deliveryProgress(delievery);
		});
		
		$(".btn_order_view").unbind("click").click(function(event){
			event.preventDefault();
			
			var ordercd = $(this).attr("id");
			var mseqno = $(this).attr("data-mseqno");
			var sseqno = $(this).attr("data-sseqno");
			
			MobileMyBillingList.fnOrderView(ordercd, mseqno, sseqno);
		});
		
		
	},
	fnChangeDateTerm : function(term) {
		var nowDate  = new Date();
	    var nowYear  = nowDate.getFullYear();
	    var nowMonth = nowDate.getMonth() + 1;
	    var nowDay  = nowDate.getDate();
	    
	    if(nowMonth < 10 ) {
	    	nowMonth = "0" + nowMonth;
	    }
	    
	    if(nowDay < 10) {
	    	nowDay = "0" + nowDay;
	    }
	    
	    var thisDate = nowYear + "." + nowMonth + "." + nowDay;
		
		if(term == "all") {
			
			$("#i_sStDt").val("");
			$("#i_sEnDt").val("");
		}
		
		if(term == "2week"){
			
			var weekDate = nowDate.getTime() - (2 * 7 * 24 * 60 * 60 * 1000);
			nowDate.setTime(weekDate);
			var weekYear  = nowDate.getFullYear();
			var weekMonth = nowDate.getMonth() + 1;
			var weekDay   = nowDate.getDate();  
			
			if(weekMonth < 10 ){
				weekMonth = "0" + weekMonth;
			}
			if(weekDay < 10 ){
				weekDay = "0" + weekDay;
			}
			
			var week = weekYear + "." + weekMonth + "." + weekDay;
			
			$("#i_sStDt").val(week);
			$("#i_sEnDt").val(thisDate);
			
		} else if(term == "1month") {
			
			var monthDate = nowDate.getTime() - (30 * 24 * 60 * 60 * 1000);
			nowDate.setTime(monthDate);
			var monthYear  = nowDate.getFullYear();
			var monthMonth = nowDate.getMonth() + 1;
			var monthDay   = nowDate.getDate();  
			
			if(monthMonth < 10 ) {
   				monthMonth = "0" + monthMonth;
   			}
			if(monthDay < 10 ) {
				monthDay = "0" + monthDay;
   			}
			
			var month = monthYear + "." + monthMonth + "." + monthDay;
			$("#i_sStDt").val(month);
			$("#i_sEnDt").val(thisDate);
			
		} else if(term == "3month") {
			
			var monthDate = nowDate.getTime() - (3 * 30 * 24 * 60 * 60 * 1000);
			nowDate.setTime(monthDate);
			var monthYear  = nowDate.getFullYear();
			var monthMonth = nowDate.getMonth() + 1;
			var monthDay   = nowDate.getDate();  
			
			if(monthMonth < 10 ) {
   				monthMonth = "0" + monthMonth;
   			}
			if(monthDay < 10 ) {
				monthDay = "0" + monthDay;
   			}
			
			var month = monthYear + "." + monthMonth + "." + monthDay;
			$("#i_sStDt").val(month);
			$("#i_sEnDt").val(thisDate);
			
		} else if (term == "6month") {
			
			var monthDate = nowDate.getTime() - (6 * 30 * 24 * 60 * 60 * 1000);
			var monthDay   = nowDay;  
			nowDate.setTime(monthDate);
			var monthYear  = nowDate.getFullYear();
			var monthMonth = nowDate.getMonth() + 1;
			
			if(monthMonth < 10 ) {
   				monthMonth = "0" + monthMonth;}
			
			var month_six = monthYear + "." + monthMonth + "." + monthDay;
			$("#i_sStDt").val(month_six);
			$("#i_sEnDt").val(thisDate);
			
		} else if (term == "year") {
			var beforeYear  = nowDate.getFullYear() - 1;
			var beforeYearMonth = nowDate.getMonth() + 1;
			var beforeYearDay   = nowDay;  
			if(beforeYearMonth < 10 ) {
				beforeYearMonth = "0" + beforeYearMonth;
			}
			
			var year = beforeYear + "." + beforeYearMonth + "." + beforeYearDay;
			
			$("#i_sStDt").val(year);
			$("#i_sEnDt").val(thisDate);
		}
		
		MobileMyBillingList.fnMoreAjax();
	}
	
};

/*
* Smart XPay의 내부 스마트폰 함수명과 맵핑되어 사용됨
* 으로 반드시 자바스크립트 함수는 위와 같은 명명된 함수명으로 사용
*/
function launchCrossPlatform(){
	location.href="#";
	document.getElementById("container").style.height = "1200px";
	lgdwin = open_paymentwindow(document.getElementById('frm_lguplus'), $("#cst_platform").val(), "submit");
}

/*
* FORM 명만  수정 가능
*/
function getFormObject() {
        return document.getElementById("frm_lguplus");
}

var submitFunc = function cnspaySubmit(data){
    
    if(data.RESULT_CODE == '00') {
        document.frm_kakao_pay.submit();
    }else {
        alert("결제요청 실패입니다.["+data.RESULT_MSG+"]");
        MobileOrderBillingStep1.status = status;
		
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

/*
* payco 결제 진행
*/
function payco_next(reserveOrderNo, sellerOrderReferenceKey, paymentCertifyToken, totalPaymentAmt, code){
	
	$("#payco_layer").css("display","none");
	MobileOrderBillingStep1.setPaymentStatus("");	
	
	if (code == "0"){
		$("#reserveOrderNo").val(reserveOrderNo);
		$("#sellerOrderReferenceKey").val(sellerOrderReferenceKey);
		$("#paymentCertifyToken").val(paymentCertifyToken);
		$("#totalPaymentAmt").val(totalPaymentAmt);
		
		$("form[name='frm_payco']").attr("action", GLOBAL_WEB_ROOT+"mobile/order/mobile_order_payco_return.do");
		$("form[name='frm_payco']").submit();
		    
	}else{
		showMessageBox({message : "ERRCODE:" + code + " ,MSG: 결제에 실패하였습니다"});	
	}
	
}

/*
* payco 결제창 닫기
*/
function payco_close(){
	MobileOrderBillingStep1.setPaymentStatus("");
	$("#payco_layer").css("display","none");
	$(".overlay").remove();	
	
}

function payment_return() {
	var fDoc;
	
	fDoc = lgdwin.contentWindow || lgdwin.contentDocument;
	
//	var frm = $("input[name='frm_lguplus']");
	var frm = parent.document.getElementById("frm_lguplus");
	
	if (fDoc.document.getElementById('LGD_RESPCODE').value == "0000") {
		
			$("input[name='LGD_RESPCODE']", frm).val(fDoc.document.getElementById('LGD_RESPCODE').value);
			$("input[name='LGD_RESPMSG']", frm).val(fDoc.document.getElementById('LGD_RESPMSG').value);
			$("input[name='LGD_BILLKEY']", frm).val(fDoc.document.getElementById('LGD_BILLKEY').value);
			$("input[name='LGD_PAYTYPE']", frm).val(fDoc.document.getElementById('LGD_PAYTYPE').value);
			$("input[name='LGD_PAYDATE']", frm).val(fDoc.document.getElementById('LGD_PAYDATE').value);
			$("input[name='LGD_FINANCECODE']", frm).val(fDoc.document.getElementById('LGD_FINANCECODE').value);
			$("input[name='LGD_FINANCENAME']", frm).val(fDoc.document.getElementById('LGD_FINANCENAME').value);
			$("input[name='LGD_PAN']", frm).val(fDoc.document.getElementById('LGD_BILLKEY').value);
			$("input[name='VBV_ECI']", frm).val("010");
			$("input[name='LGD_RETURNURL']", frm).val(GLOBAL_SSL_URL + "mobile/order/mobile_order_lguplus_return.do");
			
			
			var testStr = "";
			
			testStr += "\n" + $("input[name='LGD_RESPCODE']", frm).val();
			testStr += "\n" + $("input[name='LGD_RESPMSG']", frm).val();
			testStr += "\n" + $("input[name='LGD_BILLKEY']", frm).val();
			testStr += "\n" + $("input[name='LGD_PAYTYPE']", frm).val();
			testStr += "\n" + $("input[name='LGD_PAYDATE']", frm).val();
			testStr += "\n" + $("input[name='LGD_FINANCECODE']", frm).val();
			testStr += "\n" + $("input[name='LGD_FINANCENAME']", frm).val();
			testStr += "\n" + $("input[name='LGD_PAN']", frm).val();
			testStr += "\n" + $("input[name='VBV_ECI']", frm).val();
			testStr += "\n" + $("input[name='LGD_RETURNURL']", frm).val();
			
//			alert(testStr);
//			return;
			
			closeIframe();
			$(".pop-overlay").remove();
			
			var ret = xpay_card(frm);
			
			$("input[name='LGD_RESPCODE']", frm).val("");
			$("input[name='LGD_RESPMSG']", frm).val("");
			
			$("input[name='KVP_CURRENCY']", frm).val("");
            $("input[name='KVP_OACERT_INF']", frm).val("");
            $("input[name='KVP_RESERVED1']", frm).val("");
            $("input[name='KVP_RESERVED2']", frm).val("");
            $("input[name='KVP_RESERVED3']", frm).val("");
            $("input[name='KVP_GOODNAME']", frm).val("");
            $("input[name='KVP_CARDCOMPANY']", frm).val("");
            $("input[name='KVP_PRICE']", frm).val("");
            $("input[name='KVP_PGID']", frm).val("");
            $("input[name='KVP_QUOTA']", frm).val("");
            $("input[name='KVP_NOINT']", frm).val("");
            $("input[name='KVP_SESSIONKEY']", frm).val("");
            $("input[name='KVP_ENCDATA']", frm).val("");
            $("input[name='KVP_CARDCODE']", frm).val("");
            $("input[name='KVP_CONAME']", frm).val("");
            $("input[name='LGD_INSTALL']", frm).val("00");
            $("input[name='LGD_AUTHTYPE']", frm).val("");
			
			if( "0000" == ret ) { //인증성공
				frm.submit();
			} else { //인증실패
				MobileOrderBillingStep1.setPaymentStatus("");
			}
			
	} else {
		
		var message = "";
		
		message += "결과코드 : " + fDoc.document.getElementById('LGD_RESPCODE').value + "<br/>";
		message += "결과메시지 : " + fDoc.document.getElementById('LGD_RESPMSG').value;
		showMessageBox({message : message});
		closeIframe();
		$(".pop-overlay").remove();
		$(".btn_payment").removeClass("c-gray").addClass("c-blue").text("결제하기");
		MobileOrderBillingStep1.setPaymentStatus("");
	}
}


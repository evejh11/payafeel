var MobileMyOrderList ={
	name : "MobileMyOrderList"
	, i_iNowPageNo : 1
	, i_iRecordCnt : 0
	,isAcceptFlag : true
	,init : function(){
		
		var stdt = $("input[name='i_sStDt']").val();
		var endt = $("input[name='i_sEnDt']").val();
		
		var statuscd = $("input[name='i_sStatuscd']").val();
		
		if(stdt == "" && endt == ""){
			
			var searchDt = "2week";
			
			if(statuscd != ""){
				searchDt = "1month";
			}
		
			MobileMyOrderList.fnChangeDateTerm(searchDt);
			
		}else{
			
			MobileMyOrderList.fnMoreAjax();
			
		}
		
		MobileMyOrderList.addBtnEvent();
		MobileReviewCommStyle.init();
		

	}
	,addBtnEvent : function(){
		
		$(".btn_search").click(function(event){
			
			event.preventDefault();
			var id = $(this).attr("id");
			$(".tab_search").removeClass("active");
			$(this).parents(".tab_search").eq(0).addClass("active");
			
			MobileMyOrderList.i_iNowPageNo = 1;
			MobileMyOrderList.i_iRecordCnt = 0;
			
			$("input[name='i_sStatuscd']").val("");
			
			MobileMyOrderList.fnChangeDateTerm(id);
			
		});
		
		$(".btn_more_order").click(function(event) {
			event.preventDefault();
			MobileMyOrderList.fnMore();			
		});
		
		
		$(".listContent").on("click",".btn_order_view",function(event){
			event.preventDefault();
			
			var ordercd = $(this).attr("id");
			
			
			MobileMyOrderList.fnOrderView(ordercd);
		});
		
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
			$(this).hide();
			
			if(uordercd != undefined && uordercd != "" && uordercd != "undefined"){
				showConfirmBox({
					message : "교환완료 하시겠습니까?"
					,ok_func : function(){
						MobileMyOrderList.fnAccept(ordercd,"0022","change");
					}
					,cancel_func : function(){
						$(".btn_accept").eq(idx).show();
					}
				});
			}else{
				showConfirmBox({
					message : "수취확인 하시겠어요?"
					,ok_func : function(){
						MobileMyOrderList.fnAccept(ordercd,"0022","normal");
					},cancel_func : function(){
						$(".btn_accept").eq(idx).show();
					}
				});
			}
			
		});
		$(".listContent").on("click",".btn_delivery_search",function(event){
			event.preventDefault();
			var deliverynum = $(this).attr("id");
			fnDeliverySearch(deliverynum);
		});
		$(".listContent").on("click",".btn_naver_accept",function(event){
			
			event.preventDefault();
			var ordercd = $(this).attr("id");
			var idx = $(".btn_accept").index($(this));
			var uordercd = $("input[name='i_arrUordercd']").eq(idx).val();
			$(this).hide();
			if(uordercd != undefined && uordercd != "" && uordercd != "undefined"){
				showConfirmBox({
					message : "교환완료 하시겠습니까?"
						,ok_func : function(){
							MobileMyOrderList.fnAccept(ordercd, "0022", "change", "NAVERPAY");
						},cancel_func : function(){
							$(".btn_accept").eq(idx).show();
						}
				});
			}else{
				showConfirmBox({
					message : "수취확인 하시겠어요?"
						,ok_func : function(){
							
							MobileMyOrderList.fnAccept(ordercd, "0022", "normal", "NAVERPAY");
							
						},cancel_func : function(){
							$(".btn_accept").eq(idx).show();
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
		
	}
	,fnAccept : function(ordercd, status, orderflag, payType) {
		
		if(MobileMyOrderList.isAcceptFlag){
			
			MobileMyOrderList.isAcceptFlag = false;
			
			
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
							, close : function() {
	    	    				document.frm_reload.submit();
	    					}
						});
						
						MobileMyOrderList.isAcceptFlag = false;
					}
				}
			});
		}
    }
	,fnOrderView : function(ordercd) {
		
		$("input[name='i_sOrdercd']").val(ordercd);
		var frm	=	$("form[name='frm']");
		if(GLOBAL_FLAG_APP_NEW == "Y") {
			var arrParam = [];
			arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='"+GLOBAL_LOGIN_KEY+"'/>");
			arrParam.push("<input type='hidden' name='i_sLoginType'		value='"+GLOBAL_LOGIN_TYPE+"'/>");
			arrParam.push("<input type='hidden' name='i_sDeviceNum' 	value='"+GLOBAL_DEVICE_NUM+"'/>");
			$(arrParam.join("")).appendTo(frm);
		}
		frm.attr("action", GLOBAL_SSL_URL + "mobile/my/mobile_my_order_view.do");
		try { trackClicksEx('모바일 마이파우치^주문/배송조회^주문내역','주문내역 상세', true); } catch(e){}
		frm.submit();

	}
	,fnMore : function(){
		
		var lastpage = Math.ceil(MobileMyOrderList.i_iRecordCnt/ 4);
		
		MobileMyOrderList.i_iNowPageNo++;
		
		MobileMyOrderList.fnMoreAjax();
		
		if(lastpage == MobileMyOrderList.i_iNowPageNo) {
			
			$(".btn_more").fadeOut("slow");
		}
	}
	,fnMoreAjax : function(){
		
		MobileCommon.ajax({  
			url : GLOBAL_WEB_ROOT+"mobile/my/mobile_my_order_list_ajax.do"
			, type : "POST"
			, dataType : "json"
			, data : {
				  i_sStDt : $("input[name='i_sStDt']").val()
				, i_sEnDt : $("input[name='i_sEnDt']").val()
				, i_sStatuscd : $("input[name='i_sStatuscd']").val()
				, i_iNowPageNo : MobileMyOrderList.i_iNowPageNo
				, i_iRecordCnt : MobileMyOrderList.i_iRecordCnt
			}
			, animation : false
			, success : function( data, textStatus, jqXHR) {
				
				$(".listContent").hide();
				
				MobileMyOrderList.i_iRecordCnt = data.object.i_iRecordCnt;
				MobileMyOrderList.i_iNowPageNo = data.object.i_iNowPageNo;
			
				var vo 		= data.object.list;
				var size 	= vo.length;
				var arrHtml = new Array();
				
				if(size>0){
				
					arrHtml.push("<ul style='border-top: 1px dotted #dedede;'>");
					
					for(var i=0; i<size; i++){
						
						arrHtml.push("	<li>");
						arrHtml.push("		<div class='bundle'>");
						arrHtml.push("			<p class='t1'>");
						arrHtml.push("				<a href='#' class='btn_order_view' id='"+vo[i].v_ordercd+"'>"+vo[i].v_ordercd.substring(7,20)+"</a>");
						arrHtml.push("				<span class='state'>("+vo[i].v_statusnm+")</span>");
						arrHtml.push("			</p>");
						arrHtml.push("			<p class='t2'>");
						arrHtml.push("				<span class='price'>"+SetNumComma(vo[i].n_total_pay)+"원</span>");
						arrHtml.push("				<span class='date'>"+dateStrucChange(vo[i].v_order_dtm,"")+"</span>");
						arrHtml.push("			</p>");
						
						if(vo[i].v_delivery_number != undefined){						
							arrHtml.push("			<p class='t3'>송장 : <span>"+vo[i].v_delivery_number+"</span></p>");
						}
						
						arrHtml.push("		</div>");
						arrHtml.push("		<div class='method'>");
						if(vo[i].v_pay_typecd != vo[i].v_pay_sub_typecd && (vo[i].n_balance_giftcard > 0 || vo[i].n_pay_bpoint > 0) && vo[i].v_pay_typecd != '0017' && vo[i].v_pay_typecd == "0019"){
							arrHtml.push("			<p>페이나우 외 1건</p>");
						}
						else if(vo[i].v_pay_typecd != vo[i].v_pay_sub_typecd){
							arrHtml.push("			<p>"+vo[i].v_pay_typenm+" 외 1건</p>");
						}else{
							arrHtml.push("			<p>"+vo[i].v_pay_typenm+"</p>");
						}
						
						if((vo[i].v_statuscd == '0005') && vo[i].v_escrowyn == "Y"){
							arrHtml.push("<input type='hidden' name='i_arrUordercd' value='"+vo[i].v_uordercd+"'/>");
							if(vo[i].v_pay_typecd == "0023"){
								arrHtml.push("<span class='btn_ty3 v3'><a href='#' class='btn_naver_accept' id='"+vo[i].v_ordercd+"'>수취확인</a></span>");
							}else{
								arrHtml.push("<span class='btn_ty3 v3'><a href='#' class='btn_accept' id='"+vo[i].v_ordercd+"'>수취확인</a></span>");
							}
							
						}else if(vo[i].v_statuscd == '0005'){
							arrHtml.push("<input type='hidden' name='i_arrUordercd' value='"+vo[i].v_uordercd+"'/>");
							if(vo[i].v_pay_typecd == "0023"){
								arrHtml.push("<span class='btn_ty3 v3'><a href='#' class='btn_naver_accept' id='"+vo[i].v_ordercd+"'>수취확인</a></span>");
							}else{
								arrHtml.push("<span class='btn_ty3 v3'><a href='#' class='btn_accept' id='"+vo[i].v_ordercd+"'>수취확인</a></span>");
							}

						}else if(vo[i].v_statuscd == "0004"){
							arrHtml.push("<span class='btn_ty3 v3'><a href='#' class='btn_delivery_search' id='"+vo[i].v_delivery_number+"'>배송지조회</a></span>");
						}
						else if(vo[i].v_statuscd == "0022"){
							if(vo[i].v_flag_review == "Y"){
								arrHtml.push("<span class='btn_ty3 v3'><a href='#' class='btn_commentWrite' id='"+vo[i].v_ordercd+"//order' style='border:1px solid #999;background: #ececec;color:#999999'>구매후기 작성</a></span>");
							}else{
								arrHtml.push("<span class='btn_ty3 v3'><a href='#' class='btn_commentWrite' id='"+vo[i].v_ordercd+"//order'>구매후기 작성</a></span>");
							}
						} 					
						
						arrHtml.push("		</div>");
						
						if(vo[i].v_pay_typecd == "0003" && vo[i].v_closedate != undefined){
							
							arrHtml.push("	<div class='txt'>");
							arrHtml.push("		<p>입금 예정일 : "+dateStrucChange(vo[i].v_closedate,"")+"</p>");
							arrHtml.push("		<p>7일 후 입금확인이 되지 않을 경우 자동 취소됩니다.</p>");
							arrHtml.push("	</div>");
						}
						
						arrHtml.push("	</li>");
						
					}
					
					arrHtml.push("</ul>");
					
					if(MobileMyOrderList.i_iNowPageNo == 1) {
						
						$(".listContent").html($(arrHtml.join(""))).fadeIn("slow");
						
					} else {
						
						$($(".listContent").html($(".listContent").html() + arrHtml.join(""))).fadeIn("slow");
						
					}
				
					var lastpage = Math.ceil(MobileMyOrderList.i_iRecordCnt == 0 ? 1 : MobileMyOrderList.i_iRecordCnt/ 10);
		
					if(lastpage == MobileMyOrderList.i_iNowPageNo) {
						
						$(".btn_more").fadeOut("slow");
						
					} else {
						
						$(".btn_more").fadeIn("slow");
						
					}
					
					MobileReviewComm.init();
					
				}else{
					
					arrHtml.push("	<div class='nodata'>");
					arrHtml.push("		<p class='sp_bg s5'>주문정보가 아직 없습니다.</p>");
					arrHtml.push("	</div>");
					$(".btn_more").hide();
					$(".listContent").html(arrHtml.join("")).fadeIn("slow");
					
				}
			}

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
		
		MobileMyOrderList.fnMoreAjax();
	}
	
};
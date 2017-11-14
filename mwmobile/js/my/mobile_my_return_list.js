var MobileMyReturnList ={
	name : "MobileMyReturnList"
	, i_iNowPageNo : 1
	, i_iRecordCnt : 0
	, init : function(){

		var stdt = $("input[name='i_sStDt']").val();
		var endt = $("input[name='i_sEnDt']").val();
		
		if(stdt == "" && endt == ""){
			MobileMyReturnList.fnChangeDateTerm("2week");
		}else{
			MobileMyReturnList.fnMoreAjax();
		}
		
		MobileMyReturnList.addBtnEvent();
		
		
	}
	,addBtnEvent : function(){
		
		$(".btn_search").click(function(event){
			event.preventDefault();
			var id = $(this).attr("id");
			$(".tab_search").removeClass("active");
			$(this).parents(".tab_search").eq(0).addClass("active");
			
			MobileMyReturnList.i_iNowPageNo = 1;
			MobileMyReturnList.i_iRecordCnt = 0;
			
			MobileMyReturnList.fnChangeDateTerm(id);
			
		});
		
		$(".btn_more_order").click(function(event) {
			event.preventDefault();
			MobileMyReturnList.fnMore();			
		});
		
		
		$(".listContent").on("click",".btn_return_view",function(event){
			event.preventDefault();
			
			var value = $(this).attr("id").split(";");
			var ordercd = value[0];
			var statuscd = value[1];
			
			
			MobileMyReturnList.fnReturnView(ordercd,statuscd);
		});
		
		$(".listContent").on("click",".btn_receipt",function(event){
			event.preventDefault();
			var value = $(this).attr("id").split(";");
			
			showReceiptByTID(value[0],value[1],'authdata');
		});
		
	}
	,fnReturnView : function(ordercd, statuscd) {
		
		$("input[name='i_sOrdercd']").val(ordercd);
		$("input[name='i_sStatuscd']").val(statuscd);
		
		var frm	=	$("form[name='frm']");
		if(GLOBAL_FLAG_APP_NEW == "Y") {
			var arrParam = [];
			arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='"+GLOBAL_LOGIN_KEY+"'/>");
			arrParam.push("<input type='hidden' name='i_sLoginType'		value='"+GLOBAL_LOGIN_TYPE+"'/>");
			arrParam.push("<input type='hidden' name='i_sDeviceNum' 	value='"+GLOBAL_DEVICE_NUM+"'/>");
			$(arrParam.join("")).appendTo(frm);
		}
		frm.attr("action", GLOBAL_SSL_URL + "mobile/my/mobile_my_return_view.do");
		try { trackClicksEx('모바일 마이파우치^주문/배송조회^반품현황','반품현황 상세', true); } catch(e){}
		frm.submit();

	}
	,fnMore : function(){
		
		var lastpage = Math.ceil(MobileMyReturnList.i_iRecordCnt/ 4);
		
		MobileMyReturnList.i_iNowPageNo++;
		
		MobileMyReturnList.fnMoreAjax();

		if(lastpage == MobileMyReturnList.i_iNowPageNo) {
			
			$(".btn_more").fadeOut("slow");
		}
	}
	,fnMoreAjax : function(){

		MobileCommon.ajax({  
			url : GLOBAL_WEB_ROOT+"mobile/my/mobile_my_return_list_ajax.do"
			, type : "POST"
			, dataType : "json"
			, data : {
				  i_iNowPageNo : MobileMyReturnList.i_iNowPageNo
				, i_iRecordCnt : MobileMyReturnList.i_iRecordCnt
				, i_sStDt : $("input[name='i_sStDt']").val()
				, i_sEnDt : $("input[name='i_sEnDt']").val()
			}
			, animation : false
			, success : function( data, textStatus, jqXHR) {
				
				$(".listContent").hide();
				
				MobileMyReturnList.i_iRecordCnt = data.object.i_iRecordCnt;
				MobileMyReturnList.i_iNowPageNo = data.object.i_iNowPageNo;
			
				var vo 		= data.object.list;
				var size 	= vo.length;
				var arrHtml = new Array();
				
				if(size>0){
				
					arrHtml.push("<ul style='border-top: 1px dotted #dedede;'>");
					
					for(var i=0; i<size; i++){
						
						arrHtml.push("	<li>");
						arrHtml.push("		<div class='bundle'>");
						arrHtml.push("			<p class='t1'>");
						arrHtml.push("				"+vo[i].v_uordercd.substring(7,20)+"");
						arrHtml.push("				<a href='#' class='btn_return_view' id='"+vo[i].v_ordercd+";"+vo[i].v_statuscd+"'>"+vo[i].v_ordercd.substring(7,20)+"</a>");
						arrHtml.push("				<span class='state'>("+vo[i].v_statusnm+")</span>");
						arrHtml.push("			</p>");
						arrHtml.push("			<p class='t2'>");
						arrHtml.push("				<span class='price'>"+SetNumComma(vo[i].n_total_pay)+"원</span>");
						arrHtml.push("				<span class='date'>"+dateStrucChange(vo[i].v_order_dtm,"")+"</span>");
						arrHtml.push("			</p>");
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
						
						if(vo[i].v_statuscd == '0004' || vo[i].v_statuscd == '0005'){
							
							arrHtml.push("<span class='btn_ty3 v3'><a href='#'>수취확인</a></span>");

						}else if(vo[i].v_statuscd == "0022"){

							arrHtml.push("<span class='btn_ty3 v3'><a href='#'>구매후기 작성</a></span>");
						} 					
						
						arrHtml.push("		</div>");
						
						if(vo[i].v_pay_typecd == "0003" && vo[i].v_closedate != undefined){
							
							arrHtml.push("	<div class='txt'>");
							arrHtml.push("		<p>입금 예정일 : "+dateStrucChange(vo[i].v_closedate,"")+"</p>");
							arrHtml.push("		<p>3일 후 입금확인이 되지 않을 경우 자동 취소됩니다.</p>");
							arrHtml.push("	</div>");
						}
						
						arrHtml.push("	</li>");
						
					}
					
					arrHtml.push("</ul>");
					
					if(MobileMyReturnList.i_iNowPageNo == 1) {
						
						$(".listContent").html($(arrHtml.join(""))).fadeIn("slow");
						
					} else {
						
						$($(".listContent").html($(".listContent").html() + arrHtml.join(""))).fadeIn("slow");
						
					}
				
					var lastpage = Math.ceil(MobileMyReturnList.i_iRecordCnt == 0 ? 1 : MobileMyReturnList.i_iRecordCnt/ 10);
		
					if(lastpage == MobileMyReturnList.i_iNowPageNo) {
						
						$(".btn_more").fadeOut("slow");
						
					} else {
						
						$(".btn_more").fadeIn("slow");
						
					}
					
				}else{
					
					arrHtml.push("	<div class='nodata'>");
					arrHtml.push("		<p class='sp_bg s5'>반품주문정보가 아직 없습니다.</p>");
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
			
			jQuery("#i_sStDt").val("");
			jQuery("#i_sEnDt").val("");
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
			
			jQuery("#i_sStDt").val(week);
			jQuery("#i_sEnDt").val(thisDate);
			
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
			jQuery("#i_sStDt").val(month);
			jQuery("#i_sEnDt").val(thisDate);
			
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
			jQuery("#i_sStDt").val(month);
			jQuery("#i_sEnDt").val(thisDate);
			
		} else if (term == "6month") {
			
			var monthDate = nowDate.getTime() - (6 * 30 * 24 * 60 * 60 * 1000);
			var monthDay   = nowDay;  
			nowDate.setTime(monthDate);
			var monthYear  = nowDate.getFullYear();
			var monthMonth = nowDate.getMonth() + 1;
			
			if(monthMonth < 10 ) {
   				monthMonth = "0" + monthMonth;}
			
			var month_six = monthYear + "." + monthMonth + "." + monthDay;
			jQuery("#i_sStDt").val(month_six);
			jQuery("#i_sEnDt").val(thisDate);
			
		} else if (term == "year") {
			var beforeYear  = nowDate.getFullYear() - 1;
			var beforeYearMonth = nowDate.getMonth() + 1;
			var beforeYearDay   = nowDay;  
			if(beforeYearMonth < 10 ) {
				beforeYearMonth = "0" + beforeYearMonth;
			}
			
			var year = beforeYear + "." + beforeYearMonth + "." + beforeYearDay;
			
			jQuery("#i_sStDt").val(year);
			jQuery("#i_sEnDt").val(thisDate);
		}
		
		MobileMyReturnList.fnMoreAjax();
	}
	
};
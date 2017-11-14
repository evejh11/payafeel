var MobileMyBillingCancelList ={
	name : "MobileMyBillingCancelList"
	, i_iNowPageNo : 1
	, i_iRecordCnt : 0
	,init : function(){
		
		var stdt = $("input[name='i_sStDt']").val();
		var endt = $("input[name='i_sEnDt']").val();
		
		if(stdt == "" && endt == ""){
			MobileMyBillingCancelList.fnChangeDateTerm("2week");
		}else{
			MobileMyBillingCancelList.fnMoreAjax();
		}
		
		MobileMyBillingCancelList.addBtnEvent();
		
	}
	,addBtnEvent : function(){
		
		$(".btn_search").click(function(event){
			event.preventDefault();
			var id = $(this).attr("id");
			$(".tab_search").removeClass("active");
			$(this).parents(".tab_search").eq(0).addClass("active");
			
			MobileMyBillingCancelList.i_iNowPageNo = 1;
			MobileMyBillingCancelList.i_iRecordCnt = 0;
			
			MobileMyBillingCancelList.fnChangeDateTerm(id);
			
		});
		
		$(".btn_more_order").click(function(event) {
			event.preventDefault();
			MobileMyBillingCancelList.fnMore();			
		});
		
		
		$(".listContent").on("click",".btn_cancel_view",function(event){
			event.preventDefault();
			
			var ordercd = $(this).attr("id");
			MobileMyBillingCancelList.fnCancelView(ordercd);
		});
		
		$(".listContent").on("click",".btn_receipt",function(event){
			event.preventDefault();
			var value = $(this).attr("id").split(";");
			
			showReceiptByTID(value[0],value[1],'authdata');
		});
		
	}
	,fnBillingCancelView : function(ordercd, mseqno, sseqno) {
		
		$("input[name='i_sOrdercd']").val(ordercd);

		var frm	=	$("form[name='frm']");
		frm.attr("action", GLOBAL_SSL_URL + "mobile/my/mobile_my_cancel_view.do");
		frm.submit();

	}
	,fnMore : function(){
		
		var lastpage = Math.ceil(MobileMyBillingCancelList.i_iRecordCnt/ 4);
		
		MobileMyBillingCancelList.i_iNowPageNo++;
		
		MobileMyBillingCancelList.fnMoreAjax();
		
		if(lastpage == MobileMyBillingCancelList.i_iNowPageNo) {
			
			$(".btn_more").fadeOut("slow");
		}
	}
	,fnMoreAjax : function(){
		
		MobileCommon.ajax({  
			url : GLOBAL_WEB_ROOT+"mobile/my/mobile_my_billing_cancel_list_ajax.do"
			, type : "POST"
			, dataType : "json"
			, data : {
				  i_iNowPageNo : MobileMyBillingCancelList.i_iNowPageNo
				, i_iRecordCnt : MobileMyBillingCancelList.i_iRecordCnt
				, i_sStDt : $("input[name='i_sStDt']").val()
				, i_sEnDt : $("input[name='i_sEnDt']").val()
				, i_iBillingCnt : $("input[name='i_iBillingCnt']").val()
				, i_iBillingCancelCnt : $("input[name='i_iBillingCancelCnt']").val()
			}
			, animation : false
			, success : function( data, textStatus, jqXHR) {
				
				$(".listContent").hide();
				
//				MobileMyBillingCancelList.i_iRecordCnt = data.object.i_iRecordCnt;
//				MobileMyBillingCancelList.i_iNowPageNo = data.object.i_iNowPageNo;
//			
//				var vo 		= data.object.list;
//				var size 	= vo.length;
				
				var billingList = data.object;
				
				var mstSize = billingList.length;
				
				var arrHtml = new Array();
				
				var firstFlag = false;
				
				if(mstSize > 0){
					
					for (var i = 0; i < mstSize; i++){
						
						firstFlag =		i == 0 ? true : false;
						
						var billingVo = billingList[i];
						var mstInfo = billingVo.mstinfo;
						var subList = billingVo.sublist;
						var subSize = subList.length;
				
						arrHtml.push("<div class=\"accoSec\">                                                                                  ");
						arrHtml.push("	<section id=\"accoTab\" class=\"accordion\">                                                           ");
						
						if (firstFlag){
							arrHtml.push("		<h2 class=\"tit active\">                                                                                 ");
						} else {
							arrHtml.push("		<h2 class=\"tit\">                                                                                 ");
						}
						
						arrHtml.push("			<a href=\"#none\" class=\"btn_billing_detail\">신청번호 <span class=\"f_st2\">" + mstInfo.n_mseqno + "</span></a>                     ");
						arrHtml.push("		</h2>                                                                                              ");
						
						if (firstFlag){
							arrHtml.push("		<div class=\"contView active\" style=\"display:block;\">                                                                ");
						} else {
							arrHtml.push("		<div class=\"contView \" style=\"display:none;\">                                                                ");
						}
						
						arrHtml.push("			<div class=\"productAddInfo\">                                                                 ");
						arrHtml.push("			<div class=\"tabletype\">                                                                      ");
	                    arrHtml.push("            <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">                      ");
		                arrHtml.push("                <caption><span>신청내역 안내표</span></caption>                                          ");
		                arrHtml.push("                <colgroup>                                                                               ");
		                arrHtml.push("                    <col width=\"75px\">                                                                 ");
		                arrHtml.push("                    <col width=\"*\">                                                                    ");
		                arrHtml.push("                </colgroup>                                                                              ");
		                arrHtml.push("                <tbody class=\"productAddLawInfo \">                                                     ");
		                arrHtml.push("                	<tr>                                                                                   ");
			            arrHtml.push("                    	<th scope=\"row\"><p>신청수량</p></th>                                             ");
			            arrHtml.push("                        <td>매월 1 BOX</td></tr><tr>                                                     ");
			            arrHtml.push("                        <th scope=\"row\"><p>구독기간</p></th>                                           ");
			            arrHtml.push("                        <td class=\"pal_new\">3개월</td>                                                 ");
			            arrHtml.push("                    </tr>                                                                                ");
		                arrHtml.push("                    <tr>                                                                                 ");
			            arrHtml.push("                        <th scope=\"row\"><p>결제수단</p></th>                                           ");
			            arrHtml.push("                        <td>신용카드_" + mstInfo.v_financename + "</td>                                                      ");
		                arrHtml.push("                    </tr>                                                                                ");
		                arrHtml.push("                    <tr>                                                                                 ");
		                arrHtml.push("                    	<th scope=\"row\"><p>결제방식</p></th>                                             ");
		                arrHtml.push("                    	<td>매월 자동결제 (* 첫결제 이후 2번째 박스부터 자동결제)</td></tr>                ");
		                arrHtml.push("                    <tr>                                                                                 ");
		                arrHtml.push("                     	<th scope=\"row\"><p>신청일</p></th>                                               ");
		                arrHtml.push("                     	<td>" + dateStrucChange(mstInfo.v_cancel_dtm, 1) + "</td>                                                          ");
		                arrHtml.push("                    </tr>                                                                                ");
		                arrHtml.push("                    <tr>                                                                                 ");
		                arrHtml.push("                    	<th scope=\"row\"><p>배송주소</p></th>                                             ");
		                arrHtml.push("                    	<td class=\"pal_new1\">" + mstInfo.v_delivery_address1 + mstInfo.v_delivery_address2 + "</td> ");
		                arrHtml.push("                    </tr>                                                                                ");
		                arrHtml.push("                </tbody>                                                                                 ");
		                arrHtml.push("            </table>                                                                                     ");
		                arrHtml.push("        </div>                                                                                           ");
		                arrHtml.push("        <div>                                                                                            ");
		                arrHtml.push("          <!-- // productAddInfo -->                                                                     ");
		                arrHtml.push("        </div>                                                                                           ");
		                arrHtml.push("    </div>                                                                                               ");
		                arrHtml.push("    <div class=\"listContent\">                                                                          ");
	                   	arrHtml.push("	<strong>주문내역</strong>                                                                              ");
	                    arrHtml.push("    <ul>                                                                                                 ");
	                    
	                    for (var j = 0; j < subSize; j++){
	                    	
	                    	var subVo = subList[j];
	                    	
	                    	arrHtml.push("    	<li>                                                                                               ");
	                    	arrHtml.push("            <div class=\"bundle\">                                                                       ");
	                    	arrHtml.push("                <p class=\"t1\">                                                                         ");
	                    	arrHtml.push("                    <a href=\"#\" class=\"btn_billing_cancel_view\" id=\"" + subVo.v_ordercd + "\" data-mseqno=\"" + subVo.n_mseqno + "\" data-sseqno=\"" + subVo.n_sseqno + "\">" + subVo.v_ordercd + "</a>                                 ");
	                    	arrHtml.push("                    <span class=\"state\">" + subVo.v_ordernm + " (" + subVo.v_statusnm + ")</span>                              ");
	                    	arrHtml.push("                </p>                                                                                     ");
	                    	arrHtml.push("                <p class=\"t2\">                                                                         ");
	                    	arrHtml.push("                    <span class=\"price\">" + SetNumComma(subVo.n_price) + "원</span>                                                ");
	                    	arrHtml.push("                    <span class=\"date\">" + dateStrucChange(subVo.v_reg_dtm) + "</span>                                               ");
	                    	arrHtml.push("                </p>                                                                                     ");
	                    	arrHtml.push("            </div>                                                                                       ");
	                    	arrHtml.push("        </li>                                                                                            ");
	                    }
	                    
	                    arrHtml.push("    </ul>                                                                                                ");
		                arrHtml.push("    </div>                                                                                               ");
		                arrHtml.push("    <!-- // listContent -->                                                                              ");
			            arrHtml.push("    </div>                                                                                               ");
				        arrHtml.push("    </section>                                                                                           ");
			            arrHtml.push("</div>                                                                                                   ");
					}
				} else {
					
					arrHtml.push("	<div class='nodata'>");
					arrHtml.push("		<p class='sp_bg s5'>취소주문정보가 없습니다.</p>");
					arrHtml.push("	</div>");
					$(".btn_more").hide();
					$(".listContent").html(arrHtml.join("")).fadeIn("slow");
				}
				
				$(".tab_cont_new").html(arrHtml.join(""));
				
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
				
				$(".btn_billing_cancel_view").unbind("click").click(function(event){
                	event.preventDefault();
                	
                	var ordercd = $(this).attr("id");
                	var mseqno = $(this).attr("data-mseqno");
                	var sseqno = $(this).attr("data-sseqno");
                	
                	MobileMyBillingCancelList.fnBillingCancelView(ordercd, mseqno, sseqno);
                	
                });
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
		
		MobileMyBillingCancelList.fnMoreAjax();
	}
	
};
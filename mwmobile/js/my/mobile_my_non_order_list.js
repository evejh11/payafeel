var MobileMyNonOrderList ={
	name : "MobileMyNonOrderList"
	,init : function(){
		
		MobileMyNonOrderList.fnMoreAjax();
		MobileMyNonOrderList.addBtnEvent();
		
	}
	,addBtnEvent : function(){
		
		$(".listContent").on("click",".btn_order_view",function(event){
			event.preventDefault();
			
			var ordercd = $(this).attr("id");
			MobileMyNonOrderList.fnOrderView(ordercd);
		});
		
		$(".listContent").on("click",".btn_receipt",function(event){
			event.preventDefault();
			var value = $(this).attr("id").split(";");
			
			showReceiptByTID(value[0],value[1],'authdata');
		});
		
		$(".listContent").on("click",".btn_accept",function(event){
			event.preventDefault();
			var ordercd = $(this).attr("id");
			MobileMyNonOrderList.fnAccept(ordercd);
			
		});
		
	}
	,fnAccept : function(ordercd) {
    	mobileAjax({
    		url : GLOBAL_WEB_ROOT+"mobile/my/mobile_my_accept_save.do"
    		, type : "POST"
    		, dataType : "json"
    		, data : {
    			i_sOrdercd : ordercd
    			, i_sCompleteStatuscd : "0022"
    		}
    		,animation : false
    		, success : function(data, textStatus, jqXHR) {
    			
    			if(data.status == "succ") {
    				
    				showMessageBox({
    					message : "수취확인이 완료되었어요."
    					, close : function() {
    						
    						document.location.href = GLOBAL_WEB_ROOT + "mobile/my/mobile_my_order_list.do";
    						
    					}
    				});
    				
    				document.frm_reload.submit();
    				
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
	,fnOrderView : function(ordercd) {
		
		$("input[name='i_sOrdercd']").val(ordercd);
		var frm	=	$("form[name='frm']");
		frm.attr("action", GLOBAL_SSL_URL + "mobile/my/mobile_my_order_view.do");
		frm.submit();

	}
	,fnMoreAjax : function(){
		
		MobileCommon.ajax({  
			url : GLOBAL_WEB_ROOT+"mobile/my/mobile_my_non_order_list_ajax.do"
			, type : "POST"
			, dataType : "json"
			, data : {
				 i_sOrdercd : $("input[name='i_sOrdercd']").val()
			}
			, animation : false
			, success : function( data, textStatus, jqXHR) {
				
				$(".listContent").hide();

				var vo 		= data.object;
				var size 	= vo.length;
				var arrHtml = new Array();
				
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
					
					//arrHtml.push("			<p class='t3'>송장 : <span>4393-2934-3029-0399</span></p>");
					
					arrHtml.push("		</div>");
					arrHtml.push("		<div class='method'>");
					arrHtml.push("			<p>"+vo[i].v_pay_typenm+"</p>");
					
					if(vo[i].v_statuscd == '0004' || vo[i].v_statuscd == '0005'){
						
						arrHtml.push("<span class='btn_ty3 v3'><a href='#' class='btn_accept' id='"+vo[i].v_ordercd+"'>수취확인</a></span>");

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

				$(".listContent").html($(arrHtml.join(""))).fadeIn("slow");

			}
		});	
	}	
};
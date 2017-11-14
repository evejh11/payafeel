/* 모바일 주문 이벤트 처리를 위한 Javascript*/

var MobileOrderBillingFinish = {
	  name : "MobileOrderBillingFinish" 
	, init : function(){
		
        window.adbannerSwipe = new Swipe(document.getElementById('adbannerSwipe'), {
            continuous: true,
            stopPropagation: true,
            callback: function(event, element) {
                $("#adbanner-nav > span").removeClass().eq(event).addClass("active");
            }
        });
        
        MobileOrderBillingFinish.orderFinishList();
        MobileOrderBillingFinish.addBtnEvent();
        if(IS_LOGIN){
        	if($("#i_sFlagAlert").val() == "Y"){
        		showConfirmBox({
        			message : "가족오락관 포츈카드를 받으셨어요!<br/>포츈카드 확인하시고 혜택 받아가세요!"
        			, ok_str : "포츈카드 확인하기"
        			, cancel_str : "취소"
        			, ok_func : function(){
        				location.href=GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd=EVT20160505_family&i_sFlagLink=Y";
        			}
        		});
        	}
        }
	}
	,addBtnEvent : function(){
		
		$(".btn_lettering_confirm").click(function(event){
			event.preventDefault();

			MobileOrderBillingFinish.NamingLayerPopup();

		});

	}
	,orderFinishList : function(){
		
		
		var ordercd = $("input[name='i_sOrdercd']").val();
		
		MobileCommon.ajax({  
			url : GLOBAL_WEB_ROOT+"mobile/order/mobile_order_order_finish_view_ajax.do"
			, type : "POST"
			, dataType : "json"
			, data : {i_sOrdercd : ordercd}
			, animation : false
			, success : function( data, textStatus, jqXHR) {
			
				if(data.status == "succ"){
					
					if(data.object.PROD_TAG != undefined){

						//YHCHOI :  태깅
						try {
							s.products 		= data.object.PROD_TAG;
							s.events		= "purchase"; 					 // 주문/구매완료
							s.purchaseID	= data.object.orderVo.v_ordercd; // 구매 완료시 주문번호
							s.eVar15 		= data.object.orderVo.v_pay_typenm; // 결제수단
							void(s.t());
						} catch (e) {}
						
					}
					
					var rvo  = data.object.orderVo;
					var pgVo = data.object.pgVo;
					var giftcardVo = data.object.giftcardVo;
					var giftboxCnt = 0;
					
					var vo 		= data.object.prodList;
					var size	= vo.length;
					
					if(size > 0){
						
						var target	= $(".contView").eq(0);
						var arrHtml	= new Array();
						
						for(var i=0; i<size; i++){
							
							var productno = vo[i].n_seqno;
							
							if(vo[i].v_flag_giftbox == "Y" || vo[i].v_flag_free_giftbox == "Y" ){
								
								giftboxCnt += 1;
								
							}

							arrHtml.push("<div class='orderProdBox'>");
							arrHtml.push("	<div class='prodbox'>");
							arrHtml.push("		<div class='prodImg'><img src='"+vo[i].v_img_web_path+"' alt=''/></div>");
							arrHtml.push("		<div class='detail'>");
							arrHtml.push("			<p class='prodNm'>"+vo[i].v_brandnm+"   "+vo[i].v_productnm+" <span class='count'>/<em>"+vo[i].n_product_cnt+"개</em></span></p>");
							arrHtml.push("			<div class='srvArea'>");							
							arrHtml.push(			getFilterHtmlTag(vo[i].v_feature_tag));
							arrHtml.push("			</div>");
							
							if(parseInt(vo[i].n_option_cnt)> 1){
								
								arrHtml.push("		<div class='option'>옵션 : "+vo[i].v_optionnm+"</div>");
							}
							
							arrHtml.push("		<p class='priceZone'>");
							
							var n_list_price	= parseInt(vo[i].n_list_price);
							var n_dis_price		= parseInt(vo[i].n_dis_price);
							var n_minus_coupon  = parseInt(vo[i].n_minus_coupon);
							var n_pay_bpoint	= parseInt(vo[i].n_pay_bpoint);
							
							if(n_list_price>0 && n_dis_price>0 && n_minus_coupon == 0 && $("input[name='i_sFlagHotdeal']").val() == "N" ){
								if(vo[i].v_flag_beauty == "Y"){
									arrHtml.push("			<span class='price' style='color: #ea5279;'><em style='color: #ea5279;'><span class='row_sale_price'>"+SetNumComma(vo[i].n_sale_price)+"</span></em>P</span>");
								}else{
									arrHtml.push("			<span class='sale'><em><span class='row_pay_price'>"+SetNumComma(n_list_price * vo[i].n_product_cnt)+"</span></em>원</span>");
									arrHtml.push("			<span class='price'><em><span class='row_sale_price'>"+SetNumComma(vo[i].n_sale_price)+"</span></em>원</span>");
								}
							}else if(n_list_price>0 && n_dis_price>0 && n_pay_bpoint>0 && $("input[name='i_sFlagHotdeal']").val() == "Y" ){
								arrHtml.push("			<span class='sale' style='color: #ea5279;'><em style='color: #ea5279;'><span class='row_pay_price'>"+SetNumComma(n_list_price * vo[i].n_product_cnt)+"</span></em>P</span>");
								arrHtml.push("			<span class='price' style='color: #ea5279;'><em style='color: #ea5279;'><span class='row_sale_price'>"+SetNumComma(vo[i].n_sale_price)+"</span></em>P</span>");
							}
							else{
								if(vo[i].v_flag_beauty == "Y"){
									arrHtml.push("			<span class='price' style='color: #ea5279;'><em style='color: #ea5279;'><span class='row_sale_price'>"+SetNumComma(vo[i].n_sale_price)+"</span></em>P</span>");
								}else{
									arrHtml.push("			<span class='price'><em><span class='row_sale_price'>"+SetNumComma(vo[i].n_sale_price)+"</span></em>원</span>");
								}
								
							}
							
							arrHtml.push("		</p>");
							arrHtml.push("		<p class='pointTxt'>");
							if(vo[i].n_save_bpoint != "0" && vo[i].n_save_mpoint != "0"){
							arrHtml.push("			<span class='sp_point beautytxt v2 row_save_bpoint'>"+SetNumComma(vo[i].n_save_bpoint)+"P</span>");
							arrHtml.push("			<span class='sp_point blueRebontxt v2 row_save_mpoint'>"+SetNumComma(vo[i].n_save_mpoint)+"P</span>");
							}
							arrHtml.push("		</p>");
							arrHtml.push("		</div>");
							arrHtml.push("	</div>");
						
							
							//YHCHOI : 본품 / 자체세트 사은품
							var freeVo = data.object.prodFreeList;
							var freesize = freeVo.length;
							
							var productno_temp = "";
							var isDivFlag = false;
							
							if(freesize>0){
								
								for(var j=0; j<freesize; j++){
									
									var uproductno = freeVo[j].n_useqno;
									
									if(productno == uproductno){
										
										if(productno_temp != uproductno){
											isDivFlag = true;
											arrHtml.push("<div class='bskGiftbox'>");
											arrHtml.push("	<p class='ttl'>스페셜기프트</p>");
											arrHtml.push("	<ul>");
										}
									
										arrHtml.push("		<li>");
										arrHtml.push("			<div class='prodImg'>");	
										arrHtml.push("			<img src='"+freeVo[j].v_img_web_path+"' alt=''>");
										arrHtml.push("			</div>");	
										arrHtml.push("			<div class='prodDetail'>");	
										
										var brandnm = freeVo[j].v_brandnm != undefined ? freeVo[j].v_brandnm : '아모레퍼시픽';
										
										arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");	
										arrHtml.push("			<p class='prodNm'>"+getByteString(freeVo[j].v_productnm,12)+"</p>");	
										
										if(freeVo[j].v_capacity != undefined){
											arrHtml.push("  		<p class='ml'>"+freeVo[j].v_capacity+"</p>");
											
										}
										
										arrHtml.push("			</div>");	
										arrHtml.push("			<span class='span_fg_cnt'>"+freeVo[j].n_product_cnt+"</span>");		
										arrHtml.push("		</li>");
										
										productno_temp = productno;
									
									}
								}
								
							}
							
							if(isDivFlag){
								arrHtml.push("	</ul>");
								arrHtml.push("</div>");									
							}

							arrHtml.push("	</div>");
						}
						
						target.html($(arrHtml.join("")));	
					}		
					
					//YHCHOI : 쿠폰 사은품 들어가는 부분
					var cpVo   = data.object.cpList;
					var cpsize = cpVo.length;
				
					if(cpsize > 0){
						
						var target 	= $("#div_cpfreegood");
						var arrHtml = new Array();
						
						arrHtml.push("<ul>");
						
						for(var i=0; i<cpsize; i++){
							
							arrHtml.push("	<li>");
							arrHtml.push("		<div class='prodImg'>");
							arrHtml.push("			<img src='"+cpVo[i].v_img_web_path+"' alt='' />");
							arrHtml.push("		</div>");
							arrHtml.push("		<div class='prodDetail'>");
							
							var brandnm = cpVo[i].v_brandnm != undefined ? cpVo[i].v_brandnm : '아모레퍼시픽';
							
							arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
							arrHtml.push("			<p class='prodNm'>"+getByteString(cpVo[i].v_productnm,12)+"</p>");
							
							if(cpVo[i].v_capacity !="" && cpVo[i].v_capacity != undefined && cpVo[i].n_product_cnt > 0){								
								arrHtml.push("			<p class='ml'>"+cpVo[i].v_capacity+"*"+cpVo[i].n_product_cnt+"개</p>");								
							}else{
								arrHtml.push("			<p class='ml'>"+cpVo[i].n_product_cnt+"개</p>");								
							}
							
							arrHtml.push("		</div>");
							arrHtml.push("	</li>");
						
						}
						
						arrHtml.push("</ul>");
						
						target.html("");	
						target.html($(arrHtml.join("")));	
						$(".div_coupon_freegood").show();
							
					}
					
					//YHCHOI : 구매 금액대별 사은품 들어가는 부분
					var giftVo	= data.object.giftList;
					var giftsize = giftVo.length;
				
					if(giftsize > 0){
						
						var target 	= $("#div_bfreegood");
						var arrHtml = new Array();
						
						arrHtml.push("<ul>");
						
						for(var i=0; i<giftsize; i++){
							
							arrHtml.push("	<li>");
							arrHtml.push("		<div class='prodImg'>");
							arrHtml.push("			<img src='"+giftVo[i].v_img_web_path+"' alt='' />");
							arrHtml.push("		</div>");
							arrHtml.push("		<div class='prodDetail'>");
							
							var brandnm = giftVo[i].v_brandnm != undefined ? giftVo[i].v_brandnm : '아모레퍼시픽';
							
							arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
							arrHtml.push("			<p class='prodNm'>"+getByteString(giftVo[i].v_productnm,12)+"</p>");
							
							if(giftVo[i].v_capacity !="" && giftVo[i].v_capacity != undefined && giftVo[i].n_product_cnt > 0){
								arrHtml.push("			<p class='ml'>"+giftVo[i].v_capacity+"*"+giftVo[i].n_product_cnt+"개</p>");
							}else{
								arrHtml.push("			<p class='ml'>"+giftVo[i].n_product_cnt+"개</p>");
							}
							
							arrHtml.push("		</div>");
							arrHtml.push("	</li>");
						
						}
						
						arrHtml.push("</ul>");
						
						target.html("");	
						target.html($(arrHtml.join("")));	
						$(".div_between_freegood").show();
							
					}
					
					//YHCHOI : 스폐셜 사은품 들어가는 부분
					var specialVo	= data.object.spList;
					var specialsize = specialVo.length;
				
					if(specialsize > 0){
						
						var target 	= $("#div_spfreegood");
						var arrHtml = new Array();
						
						arrHtml.push("<ul>");
						
						for(var i=0; i<specialsize; i++){
							
							arrHtml.push("	<li>");
							arrHtml.push("		<div class='prodImg'>");
							arrHtml.push("			<img src='"+specialVo[i].v_img_web_path+"' alt='' />");
							arrHtml.push("		</div>");
							arrHtml.push("		<div class='prodDetail'>");
							
							var brandnm = specialVo[i].v_brandnm != undefined ? specialVo[i].v_brandnm : '아모레퍼시픽';
							
							arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
							arrHtml.push("			<p class='prodNm'>"+getByteString(specialVo[i].v_productnm,12)+"</p>");
							
							if(specialVo[i].v_capacity !="" && specialVo[i].v_capacity != undefined && specialVo[i].n_product_cnt > 0){
								arrHtml.push("			<p class='ml'>"+specialVo[i].v_capacity+"*"+specialVo[i].n_product_cnt+"개</p>");						
							}else{
								arrHtml.push("			<p class='ml'>"+specialVo[i].n_product_cnt+"개</p>");
							}
							
							arrHtml.push("		</div>");
							arrHtml.push("	</li>");
						
						}
						
						arrHtml.push("</ul>");
						
						target.html("");	
						target.html($(arrHtml.join("")));	
						$(".div_special_freegood").show();
							
					}
					
					//YHCHOI : 블루리본 스토어 들어가는 부분
					var pointVo	= data.object.pointList;
					var pointsize = pointVo.length;
				
					if(pointsize > 0){
						
						var target 	= $("#div_rbfreegood");
						var arrHtml = new Array();
						
						arrHtml.push("<ul>");
						
						for(var i=0; i<pointsize; i++){
							
							arrHtml.push("	<li>");
							arrHtml.push("		<div class='prodImg'>");
							arrHtml.push("			<img src='"+pointVo[i].v_img_web_path+"' alt='' />");
							arrHtml.push("		</div>");
							arrHtml.push("		<div class='prodDetail'>");
							
							var brandnm = pointVo[i].v_brandnm != undefined ? pointVo[i].v_brandnm : '아모레퍼시픽';
							
							arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
							arrHtml.push("			<p class='prodNm'>"+getByteString(pointVo[i].v_productnm,12)+"</p>");
							
							if(pointVo[i].v_capacity !="" && pointVo[i].v_capacity != undefined && pointVo[i].n_product_cnt > 0){
								arrHtml.push("			<p class='ml'>"+pointVo[i].v_capacity+"*"+pointVo[i].n_product_cnt+"개</p>");
							}else{
								arrHtml.push("			<p class='ml'>"+pointVo[i].n_product_cnt+"개</p>");
							}
							
							arrHtml.push("		</div>");
							arrHtml.push("	</li>");
						
						}
						
						arrHtml.push("</ul>");
						
						target.html("");	
						target.html($(arrHtml.join("")));	
						$(".div_rebon_freegood").show();
							
					}	
					
					//YHCHOI : CLUB AP 추가 사은품 들어가는 부분
					var clubVo	= data.object.clList;
					var clubsize = clubVo.length;
				
					if(clubsize > 0){
						
						var target 	= $("#div_clfreegood");
						var arrHtml = new Array();
						
						arrHtml.push("<ul>");
						
						for(var i=0; i<clubsize; i++){
							
							arrHtml.push("	<li>");
							arrHtml.push("		<div class='prodImg'>");
							arrHtml.push("			<img src='"+clubVo[i].v_img_web_path+"' alt='' />");
							arrHtml.push("		</div>");
							arrHtml.push("		<div class='prodDetail'>");
							arrHtml.push("			<p class='brandNm ellipsis'>"+clubVo[i].v_brandnm+"</p>");
							arrHtml.push("			<p class='prodNm'>"+getByteString(clubVo[i].v_productnm,12)+"</p>");
							
							if(clubVo[i].v_capacity !="" && clubVo[i].v_capacity != undefined && clubVo[i].n_product_cnt > 0){
								
								arrHtml.push("			<p class='ml'>"+clubVo[i].v_capacity+"*"+clubVo[i].n_product_cnt+"개</p>");
								
							}else{
								
								arrHtml.push("			<p class='ml'>"+clubVo[i].n_product_cnt+"개</p>");
								
							}
							
							arrHtml.push("		</div>");
							arrHtml.push("	</li>");
						
						}
						
						arrHtml.push("</ul>");
						
						target.html("");	
						target.html($(arrHtml.join("")));	
						$(".div_clubap_freegood").show();
							
					}
					
					//YHCHOI : VIP 사은품 들어가는 부분
					var vipVo	= data.object.vipList;
					var vipsize = vipVo.length;
				
					if(vipsize > 0){
						
						var target 	= $("#div_vipfreegood");
						var arrHtml = new Array();
						
						arrHtml.push("<ul>");
						
						for(var i=0; i<vipsize; i++){
							
							arrHtml.push("	<li>");
							arrHtml.push("		<div class='prodImg'>");
							arrHtml.push("			<img src='"+vipVo[i].v_img_web_path+"' alt='' />");
							arrHtml.push("		</div>");
							arrHtml.push("		<div class='prodDetail'>");
							
							var brandnm = vipVo[i].v_brandnm != undefined ? vipVo[i].v_brandnm : '아모레퍼시픽';
							
							arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
							arrHtml.push("			<p class='prodNm'>"+getByteString(vipVo[i].v_productnm,12)+"</p>");
							
							if(vipVo[i].v_capacity !="" && vipVo[i].v_capacity != undefined && vipVo[i].n_product_cnt > 0){
								
								arrHtml.push("			<p class='ml'>"+vipVo[i].v_capacity+"*"+vipVo[i].n_product_cnt+"개</p>");
								
							}else{
								
								arrHtml.push("			<p class='ml'>"+vipVo[i].n_product_cnt+"개</p>");
								
							}
							
							arrHtml.push("		</div>");
							arrHtml.push("	</li>");
						
						}
						
						arrHtml.push("</ul>");
						
						target.html("");	
						target.html($(arrHtml.join("")));	
						$(".div_vip_freegood").show();
							
					}
					
					if(rvo.v_userid != "99999999999999999999"){

						//YCHOI : 쿠폰 사용 목록
						var couponVo = data.object.couponList.cplist;
						var frVo     = data.object.couponList.cpfrlist;
						var couponSize = couponVo.length;
						
						if(couponSize > 0){
							
							var target = $("#div_coupon_list");
							var arrHtml = new Array();
							
							for(var i=0; i<couponSize; i++){
								
								arrHtml.push("<dl>");
								
								arrHtml.push("	<dt>사용쿠폰</dt>");
								arrHtml.push("	<dd class='ftxt'>["+couponVo[i].v_typenm+"]"+couponVo[i].v_couponnm+"</dd>");
								
								if(couponVo[i].n_price>0 && couponVo[i].v_typecd != "0005"){
									arrHtml.push("	<dt>할인금액</dt>");
									arrHtml.push("	<dd>"+SetNumComma(couponVo[i].n_price)+"원</dd>");					
								}else if(couponVo[i].v_typecd == "0005"){
									arrHtml.push("	<dt>지급사은품</dt>");
									for(var j=0; j<frVo.length; j++){
										if(frVo[j].v_couponcd == couponVo[i].v_couponcd){
											arrHtml.push("	<dd style='float:right;'>"+frVo[j].v_productnm+"</dd>");
										}
									}
								}

								arrHtml.push("</dl>");
								
							}	

							target.show();
							target.html("");	
							target.html($(arrHtml.join("")));	
						}
						
					}
					
					MobileOrderBillingFinish.setPayStats(rvo, pgVo, giftcardVo, giftboxCnt);
					
				}else{
					
					showMessageBox({message : data.message
						,close : function(){
							
						}
					});
				}			
			}
		});		
	}
	,NamingLayerPopup : function(){
		
		var odercd = $("input[name='i_sOrdercd']").val();
		var naming_price = $("input[name='i_sNamingPrice']").val();
		var naming_cnt 	 = $("input[name='i_sNamingCnt']").val();
		
		var target 	 = $("#div_naming_list");
	
		MobileCommon.ajax({
			url : GLOBAL_WEB_ROOT+"mobile/order/mobile_order_order_naming_view_ajax.do"
			, type : "POST"
			, data : {i_sOrdercd : odercd}
			, dataType : "json"
			, animation: false
			, success  : function (data, textStatus, jqXHR) {
				if (data.status == "succ") {

					var vo 		  	   = data.object;
					var size		   = vo.length;
					var productcd 	   = "";
					var optioncd	   = "";
					var arrHtml	  	   = new Array();
					
					arrHtml.push("<div id='modalPopupLetteringSrv' class='modal-wrap'>");
					arrHtml.push("	<section class='modal-content popupLetteringSrv'>");
					arrHtml.push("		<div class='head'>");
					arrHtml.push("			<p class='ttl'>레터링 서비스 신청내역</p>");
					arrHtml.push("		</div>");
					arrHtml.push("		<div class='content'>");
					arrHtml.push("			<p class='tit'>"+vo.length+"개의 상품에 레터링을 신청하셨습니다.</p>");

					var cnt = 0;
					
					for(var i=0; i<size; i++){
						
						if(vo[i].v_productcd != productcd || (vo[i].v_productcd == productcd && vo[i].v_optioncd != optioncd)){
							
							cnt += 1;
							arrHtml.push("			<div class='letteringBox'>");
							arrHtml.push("				<div class='prodImg'>");
							arrHtml.push("					<img src='"+vo[i].v_img_web_path+"' alt=''>");
							arrHtml.push("				</div>");
							arrHtml.push("				<div class='detail'>");
							arrHtml.push("					<p class='brandNm'>"+vo[i].v_brandnm+"</p>");
							arrHtml.push("					<p class='prodNm'>"+vo[i].v_productnm+"</p>");
							arrHtml.push("					<p class='option'>"+vo[i].v_optionnm+"</p>");
							arrHtml.push("				</div>");
							
						}
							
							arrHtml.push("		    	<div class='div_input_naming'>");	
							arrHtml.push("					<div class='inputbar' style='padding: 0 28px 0 134px;'>");
							arrHtml.push("						<div class='select' style='width:120px;'>");
							arrHtml.push("							<span class='span_lettering_no'>#"+cnt+"</span>");
							arrHtml.push("							<select id='i_arrNamingArea' name='i_arrNamingArea' class='selectBox3'><option>"+vo[i].v_naming_area+"</option></select>");
							arrHtml.push("						</div>");
							arrHtml.push("						<input type='text' name='i_arrNamingMessage' class='inputtxt' value='"+vo[i].v_message+"' placeholder='문구를 적어주세요.' readOnly='readOnly'>");
							arrHtml.push("					</div>");
							arrHtml.push("		    	</div>");
			
							
						if((vo[i].v_productcd != productcd || (vo[i].v_productcd == productcd && vo[i].v_optioncd != optioncd) && i>0) || ((size -1 == i))){
							
							arrHtml.push("		    </div>");
							cnt = 0;
							
						}							

						productcd = vo[i].v_productcd;
						optioncd  = vo[i].v_optioncd;

					}

					arrHtml.push("		    <div class='result'>");
					arrHtml.push("		    	<p>레터링 신청 총 <em class='span_naming_cnt'>"+naming_cnt+"</em><span class='ftxt2'>건</span></p>");
					arrHtml.push("		    	<p>추가비용 : <em class='span_naming_price'>"+naming_price+"</em><span class='ftxt2'>원</span></p>");
					arrHtml.push("		    </div>");
					arrHtml.push("		    <div class='btnArea2'>");
					arrHtml.push("		    	<span class='btn_ty btn_lettering_pop_apply'><a href='#' onclick=\"modalPopupClose('#modalPopupLetteringSrv');return false;\">닫기</a></span>");
					arrHtml.push("		    </div>");
					arrHtml.push("		</div>");
					arrHtml.push("		<a href='#' class='btn_modalpopupClose' onclick=\"modalPopupClose('#modalPopupLetteringSrv');return false;\"><img src='/mobile/images/common/btn_modalpopupClose.png' alt='닫기'></a>");
					arrHtml.push("	</section>");
					arrHtml.push("</div>");
					
					target.html("");	
					target.html($(arrHtml.join("")));	
					
					//팝업열기
					modalPopup("#modalPopupLetteringSrv");

				}
			}
		});
	}
	,setPayStats : function(rvo, pgVo, giftcardVo, giftboxCnt){
		
		try{
			var _amt = rvo.n_pay_money ;              // 총 구매액 
			AEC_B_L();
		}catch(e) {}
		
		$("input[name='i_sOrdercd']").val(rvo.v_ordercd);
		$("input[name='i_sNamingPrice']").val(rvo.n_naming_price);
		$("input[name='i_sNamingCnt']").val(rvo.n_naming_cnt);
		
		$(".rvo_ordercd").text(rvo.v_ordercd);
		if(rvo.v_pay_typecd == "0006" && $("input[name='i_sFlagHotdeal']").val() == "Y"){
			$(".rvo_price").text(SetNumComma(rvo.n_pay_bpoint)+"P");
		}else{
			$(".rvo_price").text(SetNumComma(rvo.n_pay_money));
		}
		$(".rvo_order_usernm").text(rvo.v_order_usernm);
		$(".rvo_order_mobile").text(getMobileHidden(rvo.v_order_mobile));
		$(".rvo_order_email").text(getEmailHidden(rvo.v_order_email,2));
		
		$(".rvo_dlv_receivernm").text(rvo.v_delivery_receivernm);
		$(".rvo_dlv_phone").text(getMobileHidden(rvo.v_delivery_phone));
		$(".rvo_dlv_mobile").text(getMobileHidden(rvo.v_delivery_mobile));
		
		$(".rvo_dlv_address").text("("+rvo.v_delivery_zip1+"-"+rvo.v_delivery_zip2+") "+rvo.v_delivery_address1+" "+getHidden(rvo.v_delivery_address2,rvo.v_delivery_address2.length));
		
		if(rvo.v_flag_military == "Y"){
			$(".rvo_dlv_military").html("<span>(군부대발송요청)</span>");					
		}
		
		$(".rvo_dlv_comment").text(rvo.v_delivery_comment);
		
		if(rvo.v_userid != "99999999999999999999"){

			$(".rvo_n_pay_giftcard").text(SetNumComma(rvo.n_pay_giftcard)+"원");
			$(".rvo_giftcard_total_price").text(SetNumComma(giftcardVo.total_price)+"원");
			
		}else{

			$(".rvo_n_pay_giftcard").text(SetNumComma(0)+"원");
			$(".rvo_giftcard_total_price").text(SetNumComma(0)+"원");

		}
		
		if(rvo.n_naming_cnt > 0){
			
			$(".btn_lettering_confirm").show();
			$(".rvo_naming_cnt").text(rvo.n_naming_cnt+"개의 상품에 레터링");
			$(".rvo_flag_naming").text("신청");
			
		}else{
			
			$(".btn_lettering_confirm").hide();
			$(".rvo_flag_naming").text("미신청");
		}
		
		if(rvo.v_flag_giftbox == "Y"){
			
			$(".rvo_giftbox_cnt").text(giftboxCnt +"개 상품에 유료선물포장");
			$(".rvo_flag_giftbox").text("신청");
			
		}else if(rvo.v_flag_free_giftbox == "Y"){
			
			$(".rvo_giftbox_cnt").text(giftboxCnt +"개 상품에 무료선물포장");
			$(".rvo_flag_giftbox").text("신청");
			
		}else{
			
			$(".rvo_flag_giftbox").text("미신청");
		}
		
		$(".rvo_n_price").text(SetNumComma(rvo.n_price));
		if(rvo.v_pay_typecd == "0006" && $("input[name='i_sFlagHotdeal']").val() == "Y"){
			$(".rvo_n_pay_money").parent().html("<em class='rvo_n_pay_money'>"+SetNumComma(rvo.n_pay_bpoint)+"</em>P");
		}else{
			$(".rvo_n_pay_money").text(SetNumComma(rvo.n_pay_money));
		}
		$(".rvo_dis_price").text(SetNumComma((rvo.n_minus_price - rvo.n_minus_coupon - rvo.n_minus_freegood) * -1)+"원");
		$(".rvo_giftcard_price").text(SetNumComma((rvo.n_minus_coupon + rvo.n_pay_giftcard + rvo.n_pay_giftcon) * -1)+"원");
		$(".rvo_pay_bpoint1").text(SetNumComma((rvo.n_pay_bpoint * -1))+"원");
		$(".rvo_suppl_price").text(SetNumComma(rvo.n_naming_price + rvo.n_giftbox_price)+"원");
		$(".rvo_delivery_price").text(SetNumComma(rvo.n_delivery_price)+"원");
		
		if(rvo.v_userid != "99999999999999999999"){

			$(".rvo_pay_bpoint2").text(SetNumComma(rvo.n_pay_bpoint)+"P");
			$(".rvo_pay_mpoint").text(SetNumComma(rvo.n_pay_mpoint)+"P");
			$(".rvo_balance_bpoint").text(SetNumComma(rvo.n_prev_bpoint - rvo.n_pay_bpoint)+"P");
			$(".rvo_balance_mpoint").text(SetNumComma(rvo.n_prev_mpoint - rvo.n_pay_mpoint)+"P");
			$(".rvo_save_bpoint").text(SetNumComma(rvo.n_save_bpoint)+"P");
			$(".rvo_save_mpoint").text(SetNumComma(rvo.n_save_mpoint)+"P");
			
		}else{
			
			$(".rvo_pay_bpoint2").text(0+"P");
			$(".rvo_pay_mpoint").text(0+"P");
			$(".rvo_balance_bpoint").text(0+"P");
			$(".rvo_balance_mpoint").text(0+"P");
			$(".rvo_save_bpoint").text(0+"P");
			$(".rvo_save_mpoint").text(0+"P");					
		}
//		if(rvo.v_pay_typecd == "0006" && $("input[name='i_sFlagHotdeal']").val() == "Y"){
//			var target = $("#tbody_order_pay_info");
//			var arrHtml = new Array();
//			arrHtml.push("<tr>");
//			arrHtml.push("	<th scope='row' class='th1'><p>뷰티포인트결제</p></th>");
//			arrHtml.push("	<td class='th1'><p>뷰티포인트결제</p></td>");
//			arrHtml.push("</tr>");
//			
//			arrHtml.push("<tr>");
//			arrHtml.push("	<th scope='row'><p>최종결제금액</p></th>");
//			arrHtml.push("  <td class='pri'><p>"+SetNumComma(rvo.n_pay_bpoint)+"원");
//			arrHtml.push("	</p></td>");
//			arrHtml.push("</tr>");
//			
//			target.html("");
//			target.html($(arrHtml.join("")));
//		}
		
		if(rvo.v_pay_typecd !=null && rvo.v_pay_typecd != undefined){
			
			var target = $("#tbody_order_pay_info");
			var arrHtml = new Array();
			
			var orderPayType  = rvo.v_pay_typecd;
			var orderPaynm	  = "";
			var orderPayPrice = rvo.n_pay_money;
			var hotdeal_flag = false;
			if(rvo.v_pay_typecd == "0006" && $("input[name='i_sFlagHotdeal']").val() == "Y"){
				hotdeal_flag = true;
//				arrHtml.push("<tr>");
//				arrHtml.push("	<th scope='row' class='th1'><p>뷰티포인트결제</p></th>");
//				arrHtml.push("	<td class='th1'><p>뷰티포인트결제</p></td>");
//				arrHtml.push("</tr>");
//				
//				arrHtml.push("<tr>");
//				arrHtml.push("	<th scope='row'><p>최종결제금액</p></th>");
//				arrHtml.push("  <td class='pri'><p>"+SetNumComma(rvo.n_pay_bpoint)+"원");
//				arrHtml.push("	</p></td>");
//				arrHtml.push("</tr>");
//				
//				target.html("");
//				target.html($(arrHtml.join("")));
			}
			arrHtml.push("<tr>");
			if(hotdeal_flag){
				arrHtml.push("	<th scope='row' class='th1'><p>결제정보</p></th>");
			}else{
				arrHtml.push("	<th scope='row' class='th1'><p>"+pgVo.v_pg_typenm+"</p></th>");
			}
			
			if(orderPayType == "0001" || orderPayType == "0007" || orderPayType == "0012"){
				orderPaynm = "신용카드";
			}else if(orderPayType == "0002"){
				orderPaynm = "실시간 계좌이체";
			}else if(orderPayType == "0003"){
				orderPaynm = "무통장입금(가상계좌)";
			}else if(orderPayType == "0005"){
				orderPaynm = "휴대폰 결제";
			}else if(orderPayType == "0006"){
				orderPaynm = "뷰티포인트 결제";
			}else if(orderPayType == "0019"){
				orderPaynm = "간편 결제";
			}else if(orderPayType == "0021"){
				orderPaynm = "카카오 페이";
			}else if(orderPayType == "0006"){
				orderPaynm = "뷰티포인트결제";
			}else if(orderPayType == "0023"){
				if(pgVo.v_paytype == "CARD"){
					orderPaynm += " 신용카드" 
				}else if(pgVo.v_paytype == "BANK"){
					orderPaynm += " 계좌이체"; 
				}
				if(typeof pgVo.v_paytype != "undefined" && parseInt(pgVo.v_npointpayamount) > 0){
					orderPaynm += " + 포인트";
				}
				if(typeof pgVo.v_paytype == "undefined" && parseInt(pgVo.v_npointpayamount) > 0){
					orderPaynm += " 포인트";
				}
			}else if(orderPayType == "0024"){
				orderPaynm = "신용카드";
			}
			
			arrHtml.push("	<td class='th1'><p>"+orderPaynm+"</p></td>");
			arrHtml.push("</tr>");
			
			arrHtml.push("<tr>");
			arrHtml.push("	<th scope='row'><p>최종결제금액</p></th>");
			if(hotdeal_flag){
				arrHtml.push("  <td class='pri'><p>"+SetNumComma(rvo.n_pay_bpoint)+"P");
			}else{
				arrHtml.push("  <td class='pri'><p>"+SetNumComma(orderPayPrice)+"원");
			}
			
			if(orderPayType == "0002" || orderPayType == "0003" ){
				arrHtml.push("<span>(입금해주실 금액입니다)</span>");
			}
			if(orderPayType == "0023"){
				if(parseInt(pgVo.v_npointpayamount) > 0){
					arrHtml.push("<br/><span>&nbsp;(네이버페이 포인트 : " + SetNumComma(pgVo.v_npointpayamount) + "원)</span>");
				}
			}
			
			arrHtml.push("	</p></td>");
			arrHtml.push("</tr>");
			
			if(orderPayType == "0001" || orderPayType == "0007" || orderPayType == "0012"){
				
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'>결제카드</th>");
				arrHtml.push("	<td><p>"+pgVo.v_financename+" 카드</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'>할부구분</th>");
				
				if(pgVo.v_cardinstallmonth == "00"){
					arrHtml.push("<td><p>일시불</p></td>");	
				}else{
					arrHtml.push("<td><p>"+pgVo.v_cardinstallmonth+"개월 할부</p></td>");
				}
				
				arrHtml.push("<tr>");

			}else if(orderPayType == "0002"){
				
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>출금은행명</p></th>");
				arrHtml.push("	<td><p>"+pgVo.v_financename+"은행</p></td>");
				arrHtml.push("</tr>");
				
			}else if(orderPayType == "0003"){
				
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>입금은행명</p></th>");
				arrHtml.push("	<td><p>"+pgVo.v_financename+"은행</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>입금계좌번호</p></th>");
				arrHtml.push("	<td><p>"+pgVo.v_accountnum+"</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>입금예금주</p></th>");
				arrHtml.push("	<td><p>"+pgVo.v_saowner+"</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>입금기한</p></th>");
				arrHtml.push("	<td><p>"+dateStrucChange(pgVo.v_closedate,1)+" 까지</p></td>");
				arrHtml.push("</tr>");
				
				$(".v_pay_type_0003").show();
				
			}else if(orderPayType == "0005"){
				
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>휴대폰 통신사</p></th>");
				arrHtml.push("	<td><p>"+pgVo.v_financename+"</p></td>");
				arrHtml.push("</tr>");				
				
			}else if(orderPayType == "0023"){

				if(pgVo.v_paytype == "CARD") {
					arrHtml.push("<tr>");
					arrHtml.push("	<th scope='row'>결제카드</th>");
					arrHtml.push("	<td><p>"+pgVo.v_financename+" 카드</p></td>");
					arrHtml.push("</tr>");
					arrHtml.push("<tr>");
					arrHtml.push("	<th scope='row'>할부구분</th>");
					
					if(pgVo.v_cardinstallmonth == "0"){
						arrHtml.push("<td><p>일시불</p></td>");	
					}else{
						arrHtml.push("<td><p>"+pgVo.v_cardinstallmonth+"개월 할부</p></td>");
					}
					
					arrHtml.push("<tr>");
				}else if(pgVo.v_paytype == "BANK") {
					arrHtml.push("<tr>");
					arrHtml.push("	<th scope='row'><p>출금은행명</p></th>");
					arrHtml.push("	<td><p>"+pgVo.v_financename+"</p></td>");
					arrHtml.push("</tr>");
				}

			}else if(orderPayType == "0024"){

				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'>결제카드</th>");
				arrHtml.push("	<td><p>"+pgVo.v_financename+" 카드</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'>할부구분</th>");
				
				if(pgVo.v_cardinstallmonth == "00" || pgVo.v_cardinstallmonth == "01"){
					arrHtml.push("<td><p>일시불</p></td>");	
				}else{
					arrHtml.push("<td><p>"+pgVo.v_cardinstallmonth+"개월 할부</p></td>");
				}
				
				arrHtml.push("<tr>");
			}
			
			target.html("");
			target.html($(arrHtml.join("")));
			
			
			
			var div_mypouchListDetail = $(".mypouchListDetail");
			var billHTML = [];
			
			billHTML.push("");
			billHTML.push("");
			billHTML.push("");
			billHTML.push("");
			
			
			billHTML.push("<dl>                                                                ");
	        billHTML.push("    <dt>신청번호</dt>                                               ");
	        billHTML.push("    <dd>" + rvo.n_mseqno + "</dd>                                         ");
	        billHTML.push("    <dt>신청수량</dt>                                               ");
	        billHTML.push("    <dd>매월 1 BOX</dd>                                             ");
	        billHTML.push("    <dt>구독기간</dt>                                               ");
	        billHTML.push("    <dd>3개월</dd>                                                  ");
	        billHTML.push("    <dt>결제수단</dt>                                               ");
	        billHTML.push("    <dd>신용카드_" + rvo.v_financename + "</dd>                                     ");
	        billHTML.push("    <dt>결제방식</dt>                                               ");
	        billHTML.push("    <dd>매월 자동결제</dd>                                          ");
	        billHTML.push("    <dd class=\"fifth\">(* 첫결제 이후 2번째 박스부터 자동결제)</dd>  ");
	        billHTML.push("    <dt>신청일</dt>                                                 ");
	        billHTML.push("    <dd>" + rvo.v_order_dtm.substring(0, 4) + "년 " + rvo.v_order_dtm.substring(4, 6) + "월 " + rvo.v_order_dtm.substring(6, 8) + "일" + "</dd>                                       ");
	        billHTML.push("</dl>                                                               ");
			
			
			div_mypouchListDetail.html("");
			div_mypouchListDetail.html($(billHTML.join("")));
			
			
			
		}
		
	}
};
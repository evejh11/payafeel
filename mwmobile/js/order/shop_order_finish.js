/* web 주문 이벤트 처리를 위한 Javascript*/

var WebOrderFinish = {
	  name : "WebOrderFinish"
	, init : function(){

        window.adbannerSwipe = new Swipe(document.getElementById('adbannerSwipe'), {
            continuous: true,
            stopPropagation: true,
            callback: function(event, element) {
                $("#adbanner-nav > span").removeClass().eq(event).addClass("active");
            }
        });
        
        OrderFinish.orderFinishList();
		
	}
	,orderFinishList : function(){
		
		var productTr 	 	 = $(".tr_prod_list");
		var freegoodTr	 	 = $(".tr_freegood_list");
		var productSize  	 = productTr.size();
		var freegoodlistSize = freegoodTr.size();
		
		if(productSize > 0){
			
			var target 		= $(".contView").eq(0);
			var arrHtml 	= new Array();
			
			for(var i=0; i<productSize; i++){
				
				    var Productno 	= $("input[name='i_arrProducseqNo']",productTr.eq(i));
					var Productcd 	= $("input[name='i_arrProductcd']",productTr.eq(i));
					var Productnm	= $("input[name='i_arrProductnm']",productTr.eq(i));
					var ProductImg 	= $("input[name='i_arrProductImg']",productTr.eq(i));
					var ProductCnt 	= $("input[name='i_arrProductCnt']",productTr.eq(i));
					var FlagNameing = $("input[name='i_arrFlagnNaming']",productTr.eq(i));
					var Optionnm   	= $("input[name='i_arrOptionnm']",productTr.eq(i));
					var OptionCnt   = $("input[name='i_arrOptionCnt']",productTr.eq(i));
					var SaveBpoint  = $("input[name='i_arrSaveBpoint']",productTr.eq(i));
					var SaveMpoint  = $("input[name='i_arrSaveMpoint']",productTr.eq(i));

					var price = 0;
					var sale_price = 0;
					
					var n_price			= parseInt($(".span_price",productTr.eq(i)).text());
					var n_list_price	= parseInt($(".span_list_price",productTr.eq(i)).text());
					var n_vip_price		= parseInt($(".span_vip_price",productTr.eq(i)).text());
					var n_dof_price		= parseInt($(".span_dof_price",productTr.eq(i)).text());
					var n_dof_vip_price	= parseInt($(".span_dof_vip_price",productTr.eq(i)).text());
					var span_sale_price	= parseInt($(".span_sale_price",productTr.eq(i)).text());
					
					if(n_dof_vip_price > 0 && n_list_price > n_dof_vip_price){
						
						price = n_list_price;
						sale_price = n_dof_vip_price;
						
					}else if(n_vip_price > 0 && n_list_price > n_vip_price){

						price = n_list_price;
						sale_price = n_vip_price;
						
					}else if(n_dof_price > 0 && n_list_price > n_dof_price){

						price = n_list_price;
						sale_price = n_dof_price;
						
					}else if(n_list_price > n_price){
						
						price = n_list_price;
						sale_price = n_price;
						
					}else{

						price = n_price;
					}
		
					arrHtml.push("<div class='orderProdBox div_product_list'>");
					arrHtml.push("	<div class='prodbox'>");
					arrHtml.push("		<div class='prodImg'><img src='"+ProductImg.val()+"' alt=''/></div>");
					arrHtml.push("		<div class='detail'>");
					arrHtml.push("			<p class='prodNm'>"+Productnm.val()+" <span class='count'>"+ProductCnt.val()+"개</span></p>");
					arrHtml.push("			<div class='srvArea'>");
					
					if(FlagNameing.val() == "Y"){
						arrHtml.push("			<span class='ico_srvAlim srv1'>레터링</span>");
					}

					arrHtml.push("				<span class='ico_srvAlim srv2'>CLUB AP</span>");
					arrHtml.push("				<span class='ico_srvAlim srv3'>스페셜세트</span>");
					
					arrHtml.push("			</div>");
					
					if(parseInt(OptionCnt.val())> 1){
						
						arrHtml.push("		<div class='option'>옵션 : "+Optionnm.val()+"</div>");
					}
					
					arrHtml.push("		<p class='priceZone'>");
					
					if(price>0 && sale_price>0){
						
						arrHtml.push("			<span class='sale'><em><span class='row_pay_price'>"+SetNumComma(price * ProductCnt.val())+"</span></em>원</span>");
						arrHtml.push("			<span class='price'><em><span class='row_sale_price'>"+SetNumComma(span_sale_price)+"</span></em>원</span>");
						
					}else{
						
						arrHtml.push("			<span class='price'><em><span class='row_sale_price'>"+SetNumComma(span_sale_price)+"</span></em>원</span>");
						
					}
					
					arrHtml.push("		</p>");
					arrHtml.push("		<p class='pointTxt'>");
					arrHtml.push("			<span class='sp_point beautytxt v2 row_save_bpoint'>"+SetNumComma(SaveBpoint.val())+"P</span>");
					arrHtml.push("			<span class='sp_point blueRebontxt v2 row_save_mpoint'>"+SetNumComma(SaveMpoint.val())+"P</span>");
					arrHtml.push("		</p>");
					arrHtml.push("		</div>");
					arrHtml.push("	</div>");

					var productno = "";
					var isDivFlag = false;

					if(freegoodlistSize>0){
						
						for(var j=0; j<freegoodlistSize; j++){
							
							var Uproductno			= $("input[name='i_arrUproductNo']",freegoodTr.eq(j));
							var Freegoodnm			= $("input[name='i_arrFreegoodnm']",freegoodTr.eq(j));
							var FreegoodImg 		= $("input[name='i_arrFreegoodImg']",freegoodTr.eq(j));
							var FreegoodCnt			= $("input[name='i_arrFreegoodCnt']",freegoodTr.eq(j));
							var Capacity			= $("input[name='i_arrCapacity']",freegoodTr.eq(j));
							
							if(Productno.val() == Uproductno.val()){
								
								if(productno != Uproductno.val()){
									isDivFlag = true;
									arrHtml.push("<div class='bskGiftbox'>");
									arrHtml.push("	<p class='ttl'>스페셜기프트</p>");
									arrHtml.push("	<ul>");									
								}

								arrHtml.push("		<li>");
								arrHtml.push("			<div class='prodImg'>");	
								arrHtml.push("			<img src='"+FreegoodImg.val()+"' alt=''>");
								arrHtml.push("			</div>");	
								arrHtml.push("			<div class='prodDetail'>");	
								arrHtml.push("			<p class='brandNm ellipsis'>브랜드명</p>");	
								arrHtml.push("			<p class='prodNm'>"+Freegoodnm.val()+"</p>");	
								arrHtml.push("  		<p class='ml'>"+Capacity.val()+"</p>");
								arrHtml.push("			</div>");	
								arrHtml.push("			<span class='span_fg_cnt'>"+FreegoodCnt.val()+"</span>");		
								arrHtml.push("		</li>");

								productno = Productno.val();
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
		var tr   = $(".tr_cpgift_list");
		var size = tr.size();
		
		if(size > 0){
			
			var target 	= $("#div_cpgift");
			var arrHtml = new Array();
			
			arrHtml.push("<ul>");
			
			for(var i=0; i<size; i++){
				
				var waterProductnm  = $("input[name='i_arrProductnm']",tr.eq(i));
				var waterBrandcd 	= $("input[name='i_arrProductBrandcd']",tr.eq(i));
				var waterProductimg = $("input[name='i_arrProductImg']",tr.eq(i));
				var waterProductcnt = $("input[name='i_arrProductCnt']",tr.eq(i));
				var waterCapacity   = $("input[name='i_arrProductCapacity']",tr.eq(i));
				
				arrHtml.push("	<li>");
				arrHtml.push("		<div class='prodImg'>");
				arrHtml.push("			<img src='"+waterProductimg.val()+"' alt='' />");
				arrHtml.push("		</div>");
				arrHtml.push("		<div class='prodDetail'>");
				arrHtml.push("			<p class='brandNm ellipsis'>"+waterBrandcd.val()+"</p>");
				arrHtml.push("			<p class='prodNm'>"+waterProductnm.val()+"</p>");
				
				if(waterCapacity.val() !="" && waterCapacity.val() != undefined && waterProductcnt > 0){
					
					arrHtml.push("			<p class='ml'>"+waterCapacity.val()+"*"+waterProductcnt.val()+"개</p>");
					
				}else{
					
					arrHtml.push("			<p class='ml'>"+waterProductcnt.val()+"개</p>");
					
				}
				
				
				arrHtml.push("		</div>");
				arrHtml.push("	</li>");
			}
			
			arrHtml.push("</ul>");
			
			target.html("");	
			target.html($(arrHtml.join("")));	
			
		}
		
		//YHCHOI : 구매금액대별 들어가는 부분
		tr   = $(".tr_gift_list");
		size = tr.size();
			
		if(size > 0){
			                                  
				var target 	= $("#div_gift");
				var arrHtml = new Array();
				
				arrHtml.push("<ul>");
				
				for(var i=0; i<size; i++){
	
					var waterProductnm  = $("input[name='i_arrProductnm']",tr.eq(i));
					var waterBrandcd 	= $("input[name='i_arrProductBrandcd']",tr.eq(i));
					var waterProductimg = $("input[name='i_arrProductImg']",tr.eq(i));
					var waterCapacity   = $("input[name='i_arrProductCapacity']",tr.eq(i));
				
					arrHtml.push("	<li>");
					arrHtml.push("		<div class='prodImg'>");
					arrHtml.push("			<img src='"+waterProductimg.val()+"' alt='' />");
					arrHtml.push("		</div>");
					arrHtml.push("		<div class='prodDetail'>");
					arrHtml.push("			<p class='brandNm ellipsis'>"+waterBrandcd.val()+"</p>");
					arrHtml.push("			<p class='prodNm'>"+waterProductnm.val()+"</p>");
					
					if(waterCapacity.val() !="" && waterCapacity.val() != undefined){
						arrHtml.push("			<p class='ml'>"+waterCapacity.val()+"</p>");							
					}
					
					arrHtml.push("		</div>");
					arrHtml.push("	</li>");
				}
				
				arrHtml.push("</ul>");
	
				target.html("");	
				target.html($(arrHtml.join("")));	
				
		}
		
		
		//YHCHOI : 수분 포인트 들어가는 부분
		tr   = $(".tr_water_point_list");
		size = tr.size();
			
		if(size > 0){
			                                  
				var target 	= $("#div_rebonfreegood");
				var arrHtml = new Array();
				
				arrHtml.push("<ul>");
				
				for(var i=0; i<size; i++){
	
					var waterProductnm  = $("input[name='i_arrProductnm']",tr.eq(i));
					var waterBrandcd 	= $("input[name='i_arrProductBrandcd']",tr.eq(i));
					var waterProductimg = $("input[name='i_arrProductImg']",tr.eq(i));
					var waterCapacity   = $("input[name='i_arrProductCapacity']",tr.eq(i));
				
					arrHtml.push("	<li>");
					arrHtml.push("		<div class='prodImg'>");
					arrHtml.push("			<img src='"+waterProductimg.val()+"' alt='' />");
					arrHtml.push("		</div>");
					arrHtml.push("		<div class='prodDetail'>");
					arrHtml.push("			<p class='brandNm ellipsis'>"+waterBrandcd.val()+"</p>");
					arrHtml.push("			<p class='prodNm'>"+waterProductnm.val()+"</p>");
					
					if(waterCapacity.val() !="" && waterCapacity.val() != undefined){
						arrHtml.push("			<p class='ml'>"+waterCapacity.val()+"</p>");							
					}
					
					arrHtml.push("		</div>");
					arrHtml.push("	</li>");
				}
				
				arrHtml.push("</ul>");
	
				target.html("");	
				target.html($(arrHtml.join("")));	
				
		}
		
		//YHCHOI : VIP 사은품 들어가는 부분
		tr 	= $(".tr_vip_gift_list");
		size	= tr.size();
			
		if(size > 0){
				
				var target 	= $("#div_vipfreegood");
				var arrHtml = new Array();
	
				arrHtml.push("<ul>");
				
				for(var i=0; i<size; i++){
	
					var vipBrandcd 	  = $("input[name='i_arrVipGiftBrandcd']",tr.eq(i));
					var vipProductnm  = $("input[name='i_arrVipGiftProductnm']",tr.eq(i));
					var vipProductimg = $("input[name='i_arrVipGiftImg']",tr.eq(i));
					var vipCapacity   = $("input[name='i_arrVipGiftCapacity']",tr.eq(i));
				
					arrHtml.push("	<li>");
					arrHtml.push("		<div class='prodImg'>");
					arrHtml.push("			<img src='"+vipProductimg.val()+"' alt='' />");
					arrHtml.push("		</div>");
					arrHtml.push("		<div class='prodDetail'>");
					arrHtml.push("			<p class='brandNm ellipsis'>"+vipBrandcd.val()+"</p>");
					arrHtml.push("			<p class='prodNm'>"+vipProductnm.val()+"</p>");
					
					if(vipCapacity.val() !="" && vipCapacity.val() != undefined){
						arrHtml.push("			<p class='ml'>"+vipCapacity.val()+"</p>");							
					}
					
					arrHtml.push("		</div>");
					arrHtml.push("	</li>");
				}					
				
				arrHtml.push("</ul>");
				
				target.show();
				target.html("");	
				target.html($(arrHtml.join("")));	
		}
		
		
		//YCHOI : 쿠폰 사용 목록
		var couponTr = $(".tr_coupon_list");
		var couponSize = couponTr.size();
		
		if(couponSize > 0){
			
			var target = $("#div_coupon_list");
			var arrHtml = new Array();
			
			for(var i=0; i<couponSize; i++){
				
				var couponnm  	  = $("input[name='i_arrCouponnm']",couponTr.eq(i)).val();
				var couponType	  = $("input[name='i_arrCouponType']",couponTr.eq(i)).val();
				var couponPrice   = $("input[name='i_arrCouponPrice']",couponTr.eq(i)).val();
				
				
				arrHtml.push("<dl>");
				
				arrHtml.push("	<dt>사용쿠폰</dt>");
				arrHtml.push("	<dd class='ftxt'>["+couponType+"]"+couponnm+"</dd>");
				
				if(couponPrice>0){
					arrHtml.push("	<dt>할인금액</dt>");
					arrHtml.push("	<dd>"+couponPrice+"원</dd>");					
				}

				arrHtml.push("</dl>");
				
			}	

			target.show();
			target.html("");	
			target.html($(arrHtml.join("")));	
		}
		
		
		var OrderPayTr = $(".tr_order_payinfo");
		
		var orderPayType  = $("input[name='i_sOrderPayType']",OrderPayTr).val();
		
		if(orderPayType != ""){
			
			var target = $("#tbody_order_pay_info");
			var arrHtml = new Array();
			
			var orderPaynm			= ""
			var orderPayPrice	 	= $("input[name='i_sOrderPayPrice']",OrderPayTr).val();
			var orderPaytCardnm  	= $("input[name='i_sOrderPayCardnm']",OrderPayTr).val();
			var orderPaytCardQuota  = $("input[name='i_sOrderPayCardQuota']",OrderPayTr).val();
			var orderPaytBanknm  	= $("input[name='i_sOrderPayBanknm']",OrderPayTr).val();
			var orderPaytVbanknm  	= $("input[name='i_sOrderPayVbankNm']",OrderPayTr).val();
			var orderPaytVbankNum   = $("input[name='i_sOrderPayVbankNum']",OrderPayTr).val();
			var orderPaytVbankName  = $("input[name='i_sOrderPayVbankName']",OrderPayTr).val();
			var orderPaytVbankDt  	= $("input[name='i_sOrderPayVbankDt']",OrderPayTr).val();
			var orderPaytHppCode    = $("input[name='i_sOrderPayHppCode']",OrderPayTr).val();

			arrHtml.push("<tr>");
			arrHtml.push("	<th scope='row' class'th1'><p>LGU+ 정보</p></th>");
			
			if(orderPayType == "0001" || orderPayType == "0007" || orderPayType == "0012"){
				orderPaynm = "신용카드";
			}else if(orderPayType == "0002"){
				orderPaynm = "실시간 계좌이체";
			}else if(orderPayType == "0003"){
				orderPaynm = "무통장입금(가상계좌)";
			}else if(orderPayType == "0005"){
				orderPaynm = "휴대폰 결제";
			}else if(orderPayType == "0019"){
				orderPaynm = "간편결제";
			}
			
			arrHtml.push("	<td class='th1'><p>"+orderPaynm+"</p></td>");
			arrHtml.push("</tr>");
			
			arrHtml.push("<tr>");
			arrHtml.push("	<th scope='row'><p>최종결제금액</p></th>");
			arrHtml.push("  <td class='pri'><p>"+SetNumComma(orderPayPrice)+"원");
			
			if(orderPayType == "0002" || orderPayType == "0003" ){
				arrHtml.push("<span>(입금해주실 금액입니다)</span>");				
			}
			
			arrHtml.push("	</p></td>");
			arrHtml.push("</tr>");
			
			if(orderPayType == "0001" || orderPayType == "0007" || orderPayType == "0012"){
				
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'>결제카드</th>");
				arrHtml.push("	<td><p>"+orderPaytCardnm+"</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'>할부구분</th>");
				
				if(orderPaytCardQuota == "00"){
					arrHtml.push("<td><p>일시불</p></td>");	
				}else{
					arrHtml.push("<td><p>"+orderPaytCardQuota+"할부</p></td>");
				}
				
				arrHtml.push("<tr>");

			}else if(orderPayType == "0002"){
				
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>출금은행명</p></th>");
				arrHtml.push("	<td><p>"+orderPaytBanknm+"</p></td>");
				arrHtml.push("</tr>");
				
			}else if(orderPayType == "0003"){
				
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>입금은행명</p></th>");
				arrHtml.push("	<td><p>"+orderPaytVbanknm+"</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>입금계좌번호</p></th>");
				arrHtml.push("	<td><p>"+orderPaytVbankNum+"</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>입금예금주</p></th>");
				arrHtml.push("	<td><p>"+orderPaytVbankName+"</p></td>");
				arrHtml.push("</tr>");
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>입금기한</p></th>");
				arrHtml.push("	<td><p>"+orderPaytVbankDt+"까지</p></td>");
				arrHtml.push("</tr>");						
				
			}else if(orderPayType == "0005"){
				
				arrHtml.push("<tr>");
				arrHtml.push("	<th scope='row'><p>휴대폰 통신사</p></th>");
				arrHtml.push("	<td><p>"+orderPaytHppCode+"까지</p></td>");
				arrHtml.push("</tr>");				
				
			}
			
			target.html("");
			target.html($(arrHtml.join("")));
			
		}
		
	}
};
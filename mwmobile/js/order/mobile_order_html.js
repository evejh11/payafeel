var MobileOrderHtml = {
	  name : "MobileOrderHtml"
	, init : function(){
		
	},BpointLayerPopup : function(){
		
		var arrHtml = new Array();
		var target	= $("#div_bpoint_list");
		
		var dispaly_bpoint = 0;
		var calcul_bpoint  = MobileOrderStep1.sum_min_bpoint_price - MobileOrderGiftCard.payment_total + MobileOrderStep1.sum_need_bpoint;
		
		if(MobileOrderStep1.sum_min_bpoint_price == 0 && MobileOrderStep1.sum_need_bpoint > 0){
			calcul_bpoint = MobileOrderStep1.sum_need_bpoint;
		}
		
		if(calcul_bpoint > MobileOrderUserInfo.bpoint){
			dispaly_bpoint = MobileOrderUserInfo.bpoint;
		}else{
			dispaly_bpoint = calcul_bpoint;
		}
		
		arrHtml.push("<div id='modalPopupBPointPay' class='modal-wrap'>");
		arrHtml.push("	<section class='modal-content popupBPointPay'>");
		arrHtml.push("		<div class='pop-inner'>");
		arrHtml.push("			<div class='head'>");
		arrHtml.push("				<p class='ttl'>뷰티포인트 결제</p>");
		arrHtml.push("			</div>");
		arrHtml.push("			<div class='content'>");
		arrHtml.push("				<div class='pointInpArea'>");
		arrHtml.push("					<p class='p_tit'>결제에 사용하실 포인트를 입력해주세요.</p>");
		arrHtml.push("					<p class='p_txt'>최대사용 가능한 포인트 : <em class='f_st2'>"+SetNumComma(dispaly_bpoint)+"P</em></p>");
		arrHtml.push("					<p class='pointInp'>");
		arrHtml.push("						<span class='inp'>");
		arrHtml.push("							<input type='text' name='i_iUseBpoint_temp' id='i_iUseBpoint_temp' class='inputtxt onlyNumber onlyNumberBeauty' value='0' style='text-align:right;padding: 5px 13px;'>");
		arrHtml.push("						</span>");
		arrHtml.push("						<span class='p'>P</span>");
		arrHtml.push("						<div><em class='error_hide errortxt error_i_iUseBpoint_temp'></em></div>");
		arrHtml.push("					</p>");
		arrHtml.push("				</div>");
		arrHtml.push("				<ul class='ulPointList'>");
		arrHtml.push("					<li>총 사용가능한 포인트 <span class='f_st2'><em id='em_total_use_bpoint'>"+SetNumComma(MobileOrderUserInfo.bpoint)+"</em>P</span></li>");
		arrHtml.push("					<li>사용 포인트 <span class='f_st2'><em id='em_use_bpoint'>0</em>P</span></li>");
		arrHtml.push("					<li>총 잔여포인트 <span class='f_st2'><em id='em_remain_bpoint'>"+SetNumComma(MobileOrderUserInfo.bpoint)+"</em>P</span></li>");
		arrHtml.push("					<li>최소 사용포인트 <span style='text-align:left;float: none;'><em class='f_st2'>5,000P</em></span>(최소 포인트단위 <span style='text-align:left;float: none;'><em class='f_st2'>100P</em></span>)</li>");
		arrHtml.push("					<li style='font-size:11px;'>*스페셜세트, 시크릿박스, 뷰티프로포즈 상품은 뷰티포인트 결제에서 제외됩니다.</li>");
		arrHtml.push("					<li style='font-size:11px;'>*뷰티포인트로 일부 결제하시더라도, 실제 결제하신 금액이 있는 경우 실 결제금액 기준으로 구매사은품을 받으실 수 있습니다.</li>");
		arrHtml.push("					<li style='font-size:11px;'>*최종 결제금액에서 포인트 결제 가능 상품들의 가격 비중 대비 자동 배분되어 결제됩니다.</li>");
		arrHtml.push("					<li style='font-size:11px;'><strong style='color:red;'>*뷰티포인트로 일부, 혹은 전액 결제시 스페셜기프트는 제공되지 않습니다.</strong></li>");
		arrHtml.push("				</ul>");
		arrHtml.push("			</div>");
		arrHtml.push("			<div class='btnArea'>");
		arrHtml.push("				<span class='btn_ty3'><a href='#' class='' onclick=\"modalPopupClose('#modalPopupBPointPay');return false;\">취소</a></span>");
		arrHtml.push("				<span class='btn_ty'><a href='#' class='' id='btn_bpoint_apply'>뷰티포인트 결제</a></span>");
		arrHtml.push("			</div>");
		arrHtml.push("		</div>");
		arrHtml.push("		<a href='#' class='btn_modalpopupClose' onclick=\"modalPopupClose('#modalPopupBPointPay');return false;\"><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_modalpopupClose.png' alt='닫기'></a>");
		arrHtml.push("	</section>");
		arrHtml.push("</div>");		

		target.html("");
		target.html($(arrHtml.join("")));
		
		//팝업열기
		modalPopup("#modalPopupBPointPay");
		addOnlyNumberEvent($(".onlyNumberBeauty"),{isComma:true,isStringNumber:true});
		
	},
	CouponLayerPopup : function(data){

		var arrHtml = new Array();
		var target	= $("#div_coupon_list");

		arrHtml.push("<div id='modalPopupCoupon' class='modal-wrap'>");
		arrHtml.push("	<section class='modal-content popupCoupon'>");
		arrHtml.push("		<div class='head' style='margin-top:0px;'>");
		arrHtml.push("			<p class='ttl'>쿠폰 적용</p>");
		arrHtml.push("		</div>");
		arrHtml.push("		<div class='content'>");
		arrHtml.push("			<p class='tit'>사용하실 쿠폰을 선택한 후 적용 버튼을 누르세요</p>");
		arrHtml.push("			<p style='font-size:0.9em;color:#4072cd;margin-top:5px;'>(* AP plus 멤버십 회원은 무조건 무료배송이므로 무료배송 쿠폰을 선택하지 않으셔도 됩니다.)</p>");
		arrHtml.push("			<div class='tabletype'>");
		arrHtml.push("				<table width='100%' cellpadding='0' cellspacing='0' border='0'>");
		arrHtml.push("				<caption><span>쿠폰적용 표</span></caption>");
		arrHtml.push("				<colgroup>");
		arrHtml.push("					<col width='10%'>");
		arrHtml.push("					<col width='44%'>");
		arrHtml.push("					<col width='19%'>");
		arrHtml.push("					<col width='*'>");
		arrHtml.push("				<colgroup>");
		arrHtml.push("				<thead>");
		arrHtml.push("					<tr>");
		arrHtml.push("						<th><p>선택</p></th>");
		arrHtml.push("						<th><p>할인쿠폰명</p></th>");
		arrHtml.push("						<th><p>할인혜택</p></th>");
		arrHtml.push("						<th><p>사용제한조건</p></th>");
		arrHtml.push("					</tr>");
		arrHtml.push("				</thead>");
		arrHtml.push("				<tbody>");

		var vo		= data.object;

		if (vo.length > 0) {

			for(var i=0; i < vo.length; i++){

				var cnt1 = i+1;

				arrHtml.push("					<tr class='tr_coupon_list'>");
				arrHtml.push("						<td>");
				arrHtml.push("							<span class='inputChk'>");
				arrHtml.push("								<input type='checkbox' id='c"+cnt1+"' name='i_arrCheckbox' class='checkbox' value='"+vo[i].v_user_couponcd+"'>");
				arrHtml.push("								<label for='c"+cnt1+"'></label>");
				arrHtml.push("							</span>");
				arrHtml.push("						</td>");
				arrHtml.push("						<td class='couponName'>");
				arrHtml.push("						<span class='span_hide span_user_couponcd'>"+vo[i].v_user_couponcd+"</span>");
				arrHtml.push("						<span class='span_hide span_couponcd'>"+vo[i].v_couponcd+"</span>");
				arrHtml.push("						<span class='span_hide span_couponnm'>"+vo[i].v_couponnm+"</span>");
				arrHtml.push("						<span class='span_hide span_typecd'>"+vo[i].v_typecd+"</span>");
				arrHtml.push("						<span class='span_hide span_pay_money'>"+vo[i].n_pay_money+"</span>");
				arrHtml.push("						<span class='span_hide span_flag_pay_money'>"+vo[i].v_flag_pay_money+"</span>");
				arrHtml.push("						<span class='span_hide span_min_money'>"+vo[i].n_min_money+"</span>");
				arrHtml.push("						<span class='span_hide span_flag_beauty'>"+vo[i].v_flag_beauty+"</span>");
				arrHtml.push("						<span class='span_hide span_flag_norpc_apply'>"+vo[i].v_flag_norprc_apply+"</span>");
				arrHtml.push("						<span class='span_hide span_out_brandcd'>"+vo[i].v_out_brandcd+"</span>");
				arrHtml.push("						<span class='span_hide span_max_dcprc'>"+vo[i].n_max_dcprc+"</span>");
				arrHtml.push("						<span class='span_hide span_flag_option'>"+vo[i].v_flag_option+"</span>");
				arrHtml.push("						<span class='span_hide span_prd_min_money'>"+vo[i].n_prd_min_money+"</span>");
				arrHtml.push("						<span class='span_hide span_flag_prod_all'>"+vo[i].v_flag_prod_all+"</span>");
				arrHtml.push("						<span class='span_hide span_coupon_free'>"+vo[i].v_coupon_freegood+"</span>");
				
				arrHtml.push("						"+vo[i].v_couponnm+"");
				arrHtml.push("						</td>");
				
				if(vo[i].n_pay_money != 0){
					
					if(vo[i].v_flag_pay_money == "M"){
						arrHtml.push("						<td class='ftxt3'>"+SetNumComma(vo[i].n_pay_money)+"원</td>");
					}else if(vo[i].v_flag_pay_money == "P"){
						arrHtml.push("						<td class='ftxt'>"+vo[i].n_pay_money+"%</td>");
					}
					
				}else{
					
					if(vo[i].v_typecd == "0003"){
						arrHtml.push("						<td class='ftxt'>배송비 무료</td>");
					}else if(vo[i].v_typecd == "0005"){
						arrHtml.push("						<td class='ftxt'>사은품 지급</td>");
					}
				}
				
				if(vo[i].n_prd_min_money >= 1){
					arrHtml.push("						<td>상품별 최소금액 "+SetNumComma(vo[i].n_prd_min_money)+"원 이상 구매시</td>");
				}
				else if(vo[i].n_min_money > 0 && vo[i].n_prd_min_money < 1){
					arrHtml.push("						<td>총 결제금액 "+SetNumComma(vo[i].n_min_money)+"원 이상 구매시</td>");
				}else{
					arrHtml.push("						<td>제한없음</td>");
				}
				
				arrHtml.push("					</tr>");
				
				var prodVo = vo[i].prod_list;
				var prodVocnt = 0;
				
				if(prodVo != undefined){
					
					if(prodVo.length>0){
						
						var flag_option_productcd = "";
						
						arrHtml.push("<tr class='tr_coupon_prod_list tr_"+vo[i].v_user_couponcd+"'  style='display: none;' id='"+vo[i].v_user_couponcd+"'>");
						arrHtml.push("	 <td colspan='4' class='couponPrdtList'>");
						arrHtml.push("		<ul>");
						
						for(var j=0; j<prodVo.length; j++){
							
							var isProdFlag = true;
							
							if(vo[i].v_flag_norprc_apply == "Y"){
								if((prodVo[j].v_flag_beauty == "Y") || (prodVo[j].n_plus_evt_buy_cnt > 0 && prodVo[j].n_plus_evt_give_cnt > 0) || prodVo[j].v_typecd == "0003" || prodVo[j].n_list_price <= vo[i].n_pay_money || prodVo[j].n_list_price < vo[i].n_prd_min_money){
									
									isProdFlag = false;
								}
								
								if((prodVo[j].v_flag_beauty == "Y"|| (prodVo[j].n_plus_evt_buy_cnt > 0 && prodVo[j].n_plus_evt_give_cnt > 0) || prodVo[j].v_typecd == "0003" || prodVo[j].n_list_price <= vo[i].n_pay_money) && vo[i].v_typecd == "0005"){
									
									isProdFlag = true;
								}
							}else{
								if((prodVo[j].v_flag_beauty == "Y") || (prodVo[j].n_plus_evt_buy_cnt > 0 && prodVo[j].n_plus_evt_give_cnt > 0) || prodVo[j].v_typecd == "0003" || prodVo[j].n_price <= vo[i].n_pay_money || prodVo[j].n_price < vo[i].n_prd_min_money){
									
									isProdFlag = false;
								}
								
								if((prodVo[j].v_flag_beauty == "Y" || (prodVo[j].n_plus_evt_buy_cnt > 0 && prodVo[j].n_plus_evt_give_cnt > 0) || prodVo[j].v_typecd == "0003" || prodVo[j].n_price <= vo[i].n_pay_money) && vo[i].v_typecd == "0005"){
									
									isProdFlag = true;
								}
							}
							if(isProdFlag){
								
								var cnt2 = j+1;
								prodVocnt++;
								
								if(vo[i].v_flag_option == "Y"){
									
									var display = "";
									
									if(flag_option_productcd == prodVo[j].v_productcd ){
										display = "display:none;";
									}
									
									arrHtml.push("<li style="+display+">");
									arrHtml.push("		<div class='radioArea'>");
									arrHtml.push("		<span class='inputRadio'>");
									arrHtml.push("			<input type='radio' id='couponRd_"+cnt1+"_"+cnt2+"' class='rab prdCpCkr' name='i_arrRadio"+cnt1+"' value='"+prodVo[j].v_productcd+'_'+prodVo[j].v_optioncd+"'>");
									arrHtml.push("			<label for='couponRd_"+cnt1+"_"+cnt2+"'>"+prodVo[j].v_productnm);								 
									arrHtml.push("			</label>");	
									arrHtml.push("		</span>");
									arrHtml.push("		</div>");
									arrHtml.push("</li>");
									
									flag_option_productcd = prodVo[j].v_productcd;
									
								}else{
									
									arrHtml.push("<li>");
									arrHtml.push("		<div class='radioArea'>");
									arrHtml.push("		<span class='inputRadio'>");
									
									arrHtml.push("			<input type='radio' id='couponRd_"+cnt1+"_"+cnt2+"' class='rab prdCpCkr' name='i_arrRadio"+cnt1+"' value='"+prodVo[j].v_productcd+'_'+prodVo[j].v_optioncd+"'>");
									arrHtml.push("			<label for='couponRd_"+cnt1+"_"+cnt2+"'>"+prodVo[j].v_productnm);
									
									if(prodVo[j].n_option_cnt >1){
										
										arrHtml.push("(옵션'"+prodVo[j].v_optionnm+"')");
									}
									arrHtml.push("			</label>");	
									arrHtml.push("		</span>");
									arrHtml.push("		</div>");
									arrHtml.push("</li>");
									
								}							 
							}						 
						}
						
						if(prodVocnt == 0){
							arrHtml.push("<li>");
							arrHtml.push(" 적용가능한 상품이 없습니다.");
							arrHtml.push("</li>");
						}
						
						arrHtml.push("		</ul>");
						arrHtml.push("	 </td>");
						arrHtml.push("</tr>");
						
					}else{
						arrHtml.push("<tr class='tr_coupon_prod_list tr_"+vo[i].v_user_couponcd+"' style='display: none;' id="+vo[i].v_user_couponcd+">");
						arrHtml.push("	 <td colspan='4' class='couponPrdtList'>");
						arrHtml.push("		<ul>");
						arrHtml.push("			<li>");
						arrHtml.push("				<p  style='text-align:center;'><span>적용가능한 상품이 없습니다.</span></p>");
						arrHtml.push("			</li>");
						arrHtml.push("		</ul>");
						arrHtml.push("	 </td>");
						arrHtml.push("</tr>");
					} 
					
				}
			}

		}
		else {
			arrHtml.push("<tr class='tr_coupon_prod_list'>");
			arrHtml.push("	 <td colspan='4' class='couponPrdtList'>");
			arrHtml.push("		<ul>");
			arrHtml.push("			<li>");
			arrHtml.push("				<p  style='text-align:center;'><span>적용가능한 쿠폰이 없습니다.</span></p>");
			arrHtml.push("			</li>");
			arrHtml.push("		</ul>");
			arrHtml.push("	 </td>");
			arrHtml.push("</tr>");
		}
		
		arrHtml.push("		<tr class='tr_coupon_prod_list' >");
		arrHtml.push("			<td> </td>");
		arrHtml.push("			<td><div class='ftxt'>할인예상 금액</div></td>");
		arrHtml.push("			<td><div class='ftxt3' id='amtDcRpc'>0원</div></td>");
		arrHtml.push("			<td> </td>");
		arrHtml.push("		</tr>");
		arrHtml.push("				</tbody>");
		arrHtml.push("				</table>");
		arrHtml.push("			</div>");
		arrHtml.push("			<div class='couponRule'>");
		arrHtml.push("				<p class='ttl'>※쿠폰 사용 주의 사항</p>");
		arrHtml.push("				<ul>");
		arrHtml.push("					<li><span>-</span><span>주문취소시 해당 주문의 사용된 쿠폰은 복원됩니다. <br/>(교환/반품시 복원불가)</span></li>");
		arrHtml.push("					<li><span>-</span><span>할인쿠폰은 정상가에서 적용됩니다.</span></li>");
		arrHtml.push("					<li><span>-</span><span>할인쿠폰은 중복사용이 불가능합니다.</span></li>");
		arrHtml.push("					<li><span>-</span><span>사은품쿠폰은 중복사용이 가능합니다.</span></li>");
		arrHtml.push("					<li><span>-</span><span>뷰티포인트 전용상품인 경우, 포인트로만 교환 가능합니다(쿠폰 사용불가).</span></li>");
		arrHtml.push("					<li><span>-</span><span>뷰티포인트로 일부 결제하시더라도, 실 결제한 금액이 있는 경우, 실 결제금액 기준으로 구매사은품을 받을 수 있습니다.</span></li>");
		arrHtml.push("					<li><span>-</span><span>뷰티포인트로 일부 결제하시더라도, 실 결제한 금액에 대해서는 포인트 적립이 가능합니다.</span></li>");
		arrHtml.push("					<li><span>-</span><span>쿠폰할인, 할인상품, 1+1 상품은 뷰티포인트로 일부 결제대상에서 제외됩니다.</span></li>");
		arrHtml.push("					<li><span>-</span><span>정기구독 서비스 B&B박스의 경우, 일반 구매시에도 쿠폰, 뷰티포인트사용이 제한됩니다.</span></li>");
		arrHtml.push("					<li><span>-</span><span>스페설세트와 같이 세트상품의 경우, 쿠폰적용이 불가능합니다.</span></li>");
		arrHtml.push("				</ul>");
		arrHtml.push("			</div>");
		arrHtml.push("			<div class='btnArea2'>");
		arrHtml.push("				<span class='btn_ty'><a href='#' class='btn_coupon_apply'>선택 쿠폰 적용</a></span>");
		arrHtml.push("			</div>");
		arrHtml.push("		</div>");
		arrHtml.push("		<a href='#' class='btn_modalpopupClose' onclick=\"modalPopupClose('#modalPopupCoupon');return false;\"><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_modalpopupClose.png' alt='닫기'></a>");
		arrHtml.push("	</section>");
		arrHtml.push("</div>");
		
		target.html("");
		target.html($(arrHtml.join("")));	
		
		//팝업열기
		modalPopup("#modalPopupCoupon");
		MobileOrderCoupon.setApplyCouponCheck();
		
	}
	, AbsCouponLayerPopup : function(data){

		var arrHtml = new Array();
		var target	= $("#div_abs_coupon_list");
		var pay_price = MobileOrderStep1.sum_pay_price;

		arrHtml.push("<div id='modalPopupAbsCoupon' class='modal-wrap'>");
		arrHtml.push("	<section class='modal-content popupCoupon'>");
		arrHtml.push("		<div class='head' style='margin-top:0px;'>");
		arrHtml.push("			<p class='ttl'>쿠폰 적용</p>");
		arrHtml.push("		</div>");
		arrHtml.push("		<div class='content'>");
		arrHtml.push("			<p class='tit'>사용하실 쿠폰을 선택한 후 적용 버튼을 누르세요</p>");
		arrHtml.push("			<p style='font-size:0.9em;color:#4072cd;margin-top:5px;'>(* AP plus 멤버십 회원은 무조건 무료배송이므로 무료배송 쿠폰을 선택하지 않으셔도 됩니다.)</p>");
		arrHtml.push("			<div class='tabletype'>");
		arrHtml.push("				<table width='100%' cellpadding='0' cellspacing='0' border='0'>");
		arrHtml.push("				<caption><span>쿠폰적용 표</span></caption>");
		arrHtml.push("				<colgroup>");
		arrHtml.push("					<col width='10%'>");
		arrHtml.push("					<col width='44%'>");
		arrHtml.push("					<col width='19%'>");
		arrHtml.push("					<col width='*'>");
		arrHtml.push("				<colgroup>");
		arrHtml.push("				<thead>");
		arrHtml.push("					<tr>");
		arrHtml.push("						<th><p>선택</p></th>");
		arrHtml.push("						<th><p>할인쿠폰명</p></th>");
		arrHtml.push("						<th><p>할인혜택</p></th>");
		arrHtml.push("						<th><p>사용제한조건</p></th>");
		arrHtml.push("					</tr>");
		arrHtml.push("				</thead>");
		arrHtml.push("				<tbody>");

		var vo		= data.object;

		if (vo.length > 0) {

			for(var i=0; i < vo.length; i++){

				var cnt1 = i+1;
				arrHtml.push("					<tr class='tr_coupon_list'>");
				if (pay_price >= vo[i].n_min_money && pay_price >= vo[i].n_pay_money) {
					arrHtml.push("						<td>");
					arrHtml.push("							<span class='inputChk'>");
					arrHtml.push("								<input type='checkbox' id='abs_c"+cnt1+"' name='i_arrAbsCheckbox' class='checkbox' value='"+vo[i].v_user_couponcd+"'>");
					arrHtml.push("								<label for='abs_c"+cnt1+"'></label>");
					arrHtml.push("							</span>");
					arrHtml.push("						</td>");
				}
				else {
					arrHtml.push("						<td>");
					arrHtml.push("							<span class='inputChk disabled'>");
					arrHtml.push("								<input type='checkbox' id='abs_c"+cnt1+"' name='i_arrAbsCheckbox' class='checkbox' value='"+vo[i].v_user_couponcd+"' disabled='disabled'>");
					arrHtml.push("								<label class='disabled' for='abs_c"+cnt1+"'></label>");
					arrHtml.push("							</span>");
					arrHtml.push("						</td>");
					
				}
				arrHtml.push("						<td class='couponName'>");
				arrHtml.push("						<span class='span_hide span_user_couponcd'>"+vo[i].v_user_couponcd+"</span>");
				arrHtml.push("						<span class='span_hide span_couponcd'>"+vo[i].v_couponcd+"</span>");
				arrHtml.push("						<span class='span_hide span_couponnm'>"+vo[i].v_couponnm+"</span>");
				arrHtml.push("						<span class='span_hide span_typecd'>"+vo[i].v_typecd+"</span>");
				arrHtml.push("						<span class='span_hide span_pay_money'>"+vo[i].n_pay_money+"</span>");
				arrHtml.push("						<span class='span_hide span_flag_pay_money'>"+vo[i].v_flag_pay_money+"</span>");
				arrHtml.push("						<span class='span_hide span_min_money'>"+vo[i].n_min_money+"</span>");
				arrHtml.push("						<span class='span_hide span_flag_beauty'>"+vo[i].v_flag_beauty+"</span>");
				arrHtml.push("						<span class='span_hide span_flag_norpc_apply'>"+vo[i].v_flag_norprc_apply+"</span>");
				arrHtml.push("						<span class='span_hide span_out_brandcd'>"+vo[i].v_out_brandcd+"</span>");
				arrHtml.push("						<span class='span_hide span_max_dcprc'>"+vo[i].n_max_dcprc+"</span>");
				arrHtml.push("						<span class='span_hide span_flag_option'>"+vo[i].v_flag_option+"</span>");
				arrHtml.push("						<span class='span_hide span_prd_min_money'>"+vo[i].n_prd_min_money+"</span>");
				arrHtml.push("						<span class='span_hide span_flag_prod_all'>"+vo[i].v_flag_prod_all+"</span>");
				arrHtml.push("						<span class='span_hide span_coupon_free'>"+vo[i].v_coupon_freegood+"</span>");
				arrHtml.push("						"+vo[i].v_couponnm+"");
				arrHtml.push("						</td>");

				if(vo[i].v_flag_pay_money == "M"){
					arrHtml.push("						<td class='ftxt3'>"+SetNumComma(vo[i].n_pay_money)+"원</td>");
				}
				else if(vo[i].v_flag_pay_money == "P"){
					arrHtml.push("						<td class='ftxt'>"+vo[i].n_pay_money+"%</td>");
				}

				if(vo[i].n_prd_min_money >= 1){
					arrHtml.push("						<td>상품별 최소금액 "+SetNumComma(vo[i].n_prd_min_money)+"원 이상 구매시</td>");
				}
				else if(vo[i].n_min_money > 0 && vo[i].n_prd_min_money < 1){
					arrHtml.push("						<td>총 결제금액 "+SetNumComma(vo[i].n_min_money)+"원 이상 구매시</td>");
				}else{
					arrHtml.push("						<td>제한없음</td>");
				}

				arrHtml.push("					</tr>");

			}

		}
		else {
			arrHtml.push("<tr class='tr_coupon_prod_list'>");
			arrHtml.push("	 <td colspan='4' class='couponPrdtList'>");
			arrHtml.push("		<ul>");
			arrHtml.push("			<li>");
			arrHtml.push("				<p  style='text-align:center;'><span>적용가능한 쿠폰이 없습니다.</span></p>");
			arrHtml.push("			</li>");
			arrHtml.push("		</ul>");
			arrHtml.push("	 </td>");
			arrHtml.push("</tr>");
		}
		
		arrHtml.push("		<tr class='tr_coupon_prod_list' >");
		arrHtml.push("			<td> </td>");
		arrHtml.push("			<td><div class='ftxt'>할인예상 금액</div></td>");
		arrHtml.push("			<td><div class='ftxt3' id='amtDcRpc2'>0원</div></td>");
		arrHtml.push("			<td> </td>");
		arrHtml.push("		</tr>");
		arrHtml.push("				</tbody>");
		arrHtml.push("				</table>");
		arrHtml.push("			</div>");
		arrHtml.push("			<div class='couponRule'>");
		arrHtml.push("				<p class='ttl'>※슈퍼쿠폰 사용 주의 사항</p>");
		arrHtml.push("				<ul>");
		arrHtml.push("					<li><span>-</span><span>슈퍼쿠폰적용시 일반쿠폰  -> 뷰티포인트-> 슈퍼쿠폰 순으로 적용해주세요</span></li>");
		arrHtml.push("					<li><span>-</span><span>기프트카드는 슈퍼쿠폰 적용 후 사용 가능합니다. (선 적용 시 초기화됩니다)</span></li>");
		arrHtml.push("					<li><span>-</span><span>주문취소 시 해당 주문의 사용된 쿠폰은 복원됩니다. (교환/반품 시 복원 불가)</span></li>");
		arrHtml.push("					<li><span>-</span><span>사은품 쿠폰 중복사용 가능합니다.</span></li>");
		arrHtml.push("					<li><span>-</span><span>할인쿠폰 중복사용 가능합니다.</span></li>");
		arrHtml.push("					<li><span>-</span><span>장바구니쿠폰은 중복사용 불가능합니다.</span></li>");
		arrHtml.push("					<li><span>-</span><span>슈퍼쿠폰 적용 시 \"최종결제금액 기준\"은 뷰티포인트 결제를 제외한 실제 고객님이 결제수단으로 결제한 금액을 말합니다.<br/>(결제수단: 간편결제, 무통장입금, 신용카드, 계좌이체, 휴대폰결제, 기프트카드)</span></li>");
		arrHtml.push("				</ul>");
		arrHtml.push("			</div>");
		arrHtml.push("			<div class='btnArea2'>");
		arrHtml.push("				<span class='btn_ty'><a href='#' class='btn_abs_coupon_apply'>선택 쿠폰 적용</a></span>");
		arrHtml.push("			</div>");
		arrHtml.push("		</div>");
		arrHtml.push("		<a href='#' class='btn_modalpopupClose' onclick=\"modalPopupClose('#modalPopupAbsCoupon');return false;\"><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_modalpopupClose.png' alt='닫기'></a>");
		arrHtml.push("	</section>");
		arrHtml.push("</div>");
		
		target.html("");
		target.html($(arrHtml.join("")));	
		
		//팝업열기
		modalPopup("#modalPopupAbsCoupon");
		
	}
	,CouponSubList : function(data, flag){
		var sublist = data;
		if(sublist != undefined){
			
			var target  = (typeof flag == "undefined") ? $("#dl_coupon_list") : $("#dl_abs_coupon_list");
			var arrHtml = new Array();
			
			var flag_option_product = "";
		
			for(var i=0; i<sublist.length; i++){
				
				var dis_coupon_price  	= 0;
				var flag_option_coupon_price = 0;

				if(sublist[i].v_flag_option == "Y"){
					
					if(sublist[i].v_productcd.split("_")[0] != flag_option_product){
						arrHtml.push("<dt>"+getByteString(sublist[i].v_couponnm, 16)+"</dt>");
					}
					
				}else{
					arrHtml.push("<dt>"+getByteString(sublist[i].v_couponnm, 16)+"</dt>");					
				}
				
				if(sublist[i].n_pay_money > 0){
					
					if(sublist[i].v_flag_pay_money == "M"){
						
						dis_coupon_price = sublist[i].n_pay_money;

					}else if(sublist[i].v_flag_pay_money == "P"){
						
						if(sublist[i].v_typecd == "0004" || sublist[i].v_typecd == "0006"){
							
							dis_coupon_price = MobileOrderStep1.sum_dis_coupon_price;
							
						}else{
						
							var tr      = $(".tr_product_list");
							var feild 	= $(".div_product_list");

							for(var j=0; j<tr.size(); j++){
								
								var productcd = $("input[name='i_arrProductcd']",tr.eq(j)).val();
								var optioncd  = $("input[name='i_arrOptioncd']",tr.eq(j)).val();
								
								var cnt 	  	 = fnOnlyNumber($("input[name='i_arrProductCnt']", tr.eq(j)).val()).number;
								var pay_bpoint	 = fnOnlyNumber($("*[name='i_arrPayBpoint']", feild.eq(j)).val()).number;
								var beauty_price = fnOnlyNumber($(".span_beauty_price", tr.eq(j)).text()).number;
								
								var flag_bpoint	 = $("input[name='i_arrFlagBpoint']", tr.eq(j)).val();
								
								var bpoint_cnt	 = flag_bpoint == "Y" && pay_bpoint > 0 ? pay_bpoint / beauty_price : 0;

								if(productcd == sublist[i].v_productcd.split("_")[0] && sublist[i].v_flag_option == "Y"){
									
									var price = fnOnlyNumber($(".span_price", tr.eq(j)).text()).number;
									
									var cnt_temp = cnt - bpoint_cnt;
									
									var dcprc = Math.round(price * sublist[i].n_pay_money / 100);
										
									if(sublist[i].n_max_dcprc < dcprc && sublist[i].n_max_dcprc !=0){
											
										flag_option_coupon_price += sublist[i].n_max_dcprc * cnt_temp;
											
									}else{
										
										flag_option_coupon_price += dcprc * cnt_temp;
										
									}
									
								}else{

									var checkcd = productcd+"_"+optioncd;
									
									if(checkcd == sublist[i].v_productcd){
										
										var price = fnOnlyNumber($(".span_price", tr.eq(j)).text()).number;
										
										var dcprc = Math.round(price * sublist[i].n_pay_money / 100);
										
										if(data[i].n_max_dcprc < dcprc && sublist[i].n_max_dcprc !=0){
											dis_coupon_price = sublist[i].n_max_dcprc;
										}else{
											dis_coupon_price = dcprc;
										}
										
										break;
									}
								}
								
							}
						}					
					}
					
					if(sublist[i].v_flag_option == "Y"){
						
						if(sublist[i].v_productcd.split("_")[0] != flag_option_product){
							
							arrHtml.push("<dd>-"+SetNumComma(flag_option_coupon_price)+"원<a href='#' class='btn_delete " + ((typeof flag == "undefined") ? "btn_delete_coupon" : "btn_delete_abs_coupon") + "' id='"+sublist[i].v_typecd+";"+sublist[i].v_productcd.split("_")[0]+"'><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_delete2.png' alt='삭제'></a></dd>");
						}
						
						flag_option_product = sublist[i].v_productcd.split("_")[0];
						
					}else{
						arrHtml.push("<dd>-"+SetNumComma(dis_coupon_price)+"원<a href='#' class='btn_delete " + ((typeof flag == "undefined") ? "btn_delete_coupon" : "btn_delete_abs_coupon") + "' id='"+sublist[i].v_typecd+";"+sublist[i].v_productcd+"'><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_delete2.png' alt='삭제'></a></dd>");					
					}
					
				}else{

					if(sublist[i].v_typecd == "0003"){
						
						arrHtml.push("<dd>배송비 무료<a href='#' class='btn_delete btn_delete_coupon' id='"+sublist[i].v_typecd+"'><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_delete2.png' alt='삭제'></a></dd>");
						
					}else if(sublist[i].v_typecd == "0005"){
						var cpfreegood = [];
						if(sublist[i].v_coupon_freegood != undefined && sublist[i].v_coupon_freegood != ""){
							cpfreegood = sublist[i].v_coupon_freegood.split(";");
						}
						
						if(cpfreegood.length >0){
							arrHtml.push("<dd>사은품 지급<a href='#' class='btn_delete btn_delete_coupon' id='"+sublist[i].v_typecd+";"+sublist[i].v_user_couponcd+"'><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_delete2.png' alt='삭제'></a>");
							arrHtml.push("</dd>");
							for(var j=0; j<cpfreegood.length; j++){
								arrHtml.push("<span class='span_"+sublist[i].v_user_couponcd+"'>- "+cpfreegood[j]+"</span>");
							}
						}else{
							arrHtml.push("<dd>사은품 지급<a href='#' class='btn_delete btn_delete_coupon' id='"+sublist[i].v_typecd+";"+sublist[i].v_user_couponcd+"'><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_delete2.png' alt='삭제'></a></dd>");
						}
						
					}
				}

			}
			target.html("");
			target.html($(arrHtml.join("")));

		}
	}
	,CouponFreedHtml : function(data , usercouponcd){
		
		var vo 		= data.object;
		var size	= vo.length;
		var target  = $("#div_cpfreegood");
		var arrHtml = new Array();
		if($(".tr_order_coupon_freegood").size() > 0){
			var  target2 = $("ul:first",target);
			
			for(var i=0; i<size; i++){
				if($(".tr_cpfr_li_"+usercouponcd).size() > 0){
					$(".tr_cpfr_li_"+usercouponcd).remove();
				}
				arrHtml.push("<span class='tr_cpfr_"+vo[i].v_productcd+"'>");
				arrHtml.push("     <li class='li_order_gift tr_order_coupon_freegood tr_cpfr_li_"+usercouponcd+" tr_cpfr_"+vo[i].v_productcd+"'>");
				arrHtml.push("		   <span class='span_hide span_price'>"+vo[i].n_price+"</span>                             ");
				arrHtml.push("		   <span class='span_hide span_fg_price'>"+vo[i].n_fg_price+"</span>");
				arrHtml.push("		   <span class='span_hide span_mpoint'>"+vo[i].n_point+"</span>                            ");
				arrHtml.push("		   <span class='span_hide span_fg_cnt'>"+vo[i].n_cnt+"</span>                              ");
				arrHtml.push("         <div class='sampleTy v2'>                                                               ");
				arrHtml.push("             <div class='thumbImg ClfreeGoodChk'>                                                ");
				arrHtml.push("                 <img src='"+vo[i].v_img_web_path+"' alt='' onerror='fnNoImage(this);'>                                    ");
				arrHtml.push("             </div>                                                                             ");
				arrHtml.push("             <div class='prodDetail'>                                                           ");
				arrHtml.push("                 <p class='brandNm'>"+vo[i].v_brandnm+"</p>                                     ");
				arrHtml.push("                 <p class='prodNm'>"+vo[i].v_productnm                                           );
				if(vo[i].v_capacity !="" && vo[i].v_capacity != undefined && vo[i].v_capacity > 0){
					arrHtml.push(" "+vo[i].v_capacity                                                                          );
				}
				arrHtml.push("                 </p>                                                                           ");
				arrHtml.push("                 <p class='count'>"+vo[i].n_cnt+"개</p>                                          ");
				arrHtml.push("             </div>                                                                             ");
				arrHtml.push("         </div>                                                                                 ");
				arrHtml.push("     </li>                                                                                      ");
				arrHtml.push("</span>");
			}
			
			$(arrHtml.join("\n")).appendTo(target2);
		}else{
			arrHtml.push("<ul class='giftList' id='cp_freegood_ul'>");

			for(var i=0; i<size; i++){
				
				arrHtml.push("	<li class='li_order_gift tr_order_coupon_freegood tr_cpfr_li_"+usercouponcd+" tr_cpfr_"+vo[i].v_productcd+"'>");
				arrHtml.push("		<span class='span_hide span_price'>"+vo[i].n_price+"</span>");
				arrHtml.push("		<span class='span_hide span_fg_price'>"+vo[i].n_fg_price+"</span>");
				arrHtml.push("		<span class='span_hide span_mpoint'>"+vo[i].n_point+"</span>");
				arrHtml.push("		<span class='span_hide span_fg_cnt'>"+vo[i].n_cnt+"</span>");
				arrHtml.push("		<div class='prodImg'>");
				arrHtml.push("			<img src='"+vo[i].v_img_web_path+"' alt='"+vo[i].v_productnm+"'onerror='fnNoImage(this);'/>");
				arrHtml.push("		</div>");
				arrHtml.push("		<div class='prodDetail'>");
				arrHtml.push("			<p class='brandNm ellipsis'>"+vo[i].v_brandnm+"</p>");
				arrHtml.push("			<p class='prodNm'>"+vo[i].v_productnm+"</p>");
				
				if(vo[i].v_capacity !="" && vo[i].v_capacity != undefined && vo[i].n_cnt > 0){
					
					arrHtml.push("			<p class='ml'>"+vo[i].v_capacity+" * "+vo[i].n_cnt+"개</p>");
					
				}else{
					
					arrHtml.push("			<p class='ml'>"+vo[i].n_cnt+"개</p>");
					
				}
				
				arrHtml.push("		</div>");
				arrHtml.push("	</li>");							
			}

			arrHtml.push("</ul>");
			target.html("");	
			target.html($(arrHtml.join("")));	
		}
	}
	,NamingLayerPopup : function(flag){
		
		var target 	 = $("#div_naming_list");
		
		var namingcd = $("input[name='i_sNamingcd']","#frm").val();
		var arrTr	 = $(".tr_product_list");
		var arrProductcd = $("input[name='i_arrProductcd']",arrTr);
		var arrOptioncd	 = $("input[name='i_arrOptioncd']",arrTr);
		var arrProductCnt= $("input[name='i_arrProductCnt']",arrTr);
		
		var size = arrProductcd.size();
		var arrParam = new Array();
		var arrCnt	 = new Array();
		
		arrParam.push("i_sTargetDtm=" + MobileOrderStep1.getPageParam().targetDt);
		arrParam.push("i_sNamingcd=" + namingcd);
		arrParam.push("i_iSumPayPrice=" + MobileOrderStep1.sum_pay_price);
		
		for (var i = 0; i < size; i++) {
			
			arrParam.push("i_arrProductcd=" + arrProductcd.eq(i).val());
			arrParam.push("i_arrOptioncd=" + arrOptioncd.eq(i).val());
			arrParam.push("i_arrProductCnt=" + arrProductCnt.eq(i).val());

			arrCnt[i] = arrProductCnt.eq(i).val();
			
		}
		
		MobileCommon.ajax({
			url : GLOBAL_WEB_ROOT+"mobile/order/mobile_order_order_naming_reg_ajax.do"
			, type : "POST"
			, data : arrParam.join("&")
			, dataType : "json"
			, animation: false
			, success  : function (data, textStatus, jqXHR) {
				if (data.status == "succ") {

					var vo 		  	   = data.object.list;
					var productcd 	   = "";
					var optioncd	   = "";
					var namingVo       = data.object.namingList;
					var arrHtml	  	   = new Array();
					var namingCntIndex = 0;
					
					arrHtml.push("<div id='modalPopupLetteringSrv' class='modal-wrap'>");
					arrHtml.push("	<section class='modal-content popupLetteringSrv'>");
					arrHtml.push("		<div class='head'>");
					arrHtml.push("			<p class='ttl'>레터링 서비스 신청</p>");
					arrHtml.push("		</div>");
					arrHtml.push("		<div class='content'>");
					arrHtml.push("			<p class='tit'>레터링을 원하는 상품을 먼저 체크하고 레터링을 상세하게 신청해 주세요.</p>");
					
					for(var i=0; i<vo.length; i++){

						if(vo[i].v_productcd != productcd || (vo[i].v_productcd == productcd && vo[i].v_optioncd != optioncd)){
				
							arrHtml.push("			<div class='letteringBox'>");
							arrHtml.push("				<input type='hidden' name='i_arrFlagNaming' value='"+vo[i].v_ont_flag_naming+"'/>");
							arrHtml.push("				<input type='hidden' name='i_arrNamingProductcd' value='"+vo[i].v_productcd+"'/>");
							arrHtml.push("				<input type='hidden' name='i_arrNamingPrdArea'   value='"+vo[i].v_naming_area+"'/>");
							arrHtml.push("				<input type='hidden' name='i_arrNamingOptioncd'  value='"+vo[i].v_optioncd+"'/>");
							arrHtml.push("				<input type='hidden' name='i_arrNamingCnt' value='"+arrCnt[namingCntIndex]+"'/>");
							arrHtml.push("				<div class='prodImg'>");
							arrHtml.push("					<span class='inputChk2'>");
							
							var check = "";
							
							if(vo[i].v_ont_flag_naming == "Y" && vo[i].v_ont_naming_area !="" && vo[i].v_ont_message !=""){
								
								check = "checked=checked";
								
							}else if(vo[i].v_flag_naming == "Y" && vo[i].v_flag_opt_naming == "N"){		//옵션이 리필인 경우 레터링 불가 : v_flag_opt_naming = N
							
								check = "disabled=disabled";
								
							}else if(vo[i].v_flag_naming == "Y" && vo[i].v_naming_area !=""){
								
								check = "";
								
							}else{
								
								check = "disabled=disabled";
								
							}
							
							arrHtml.push("						<input type='checkbox' id='chk"+i+"' name='i_arrFlagNaming_temp' class='checkbox' "+check+">");
							
							
							arrHtml.push("						<label for='chk2"+i+"'></label>");
							arrHtml.push("					</span>");
							arrHtml.push("					<img src='"+vo[i].v_img_web_path+"' alt='' onerror='fnNoImage(this);'>");
							arrHtml.push("				</div>");
							arrHtml.push("				<div class='detail'>");
							arrHtml.push("					<p class='brandNm'>"+vo[i].v_brandnm+"</p>");
							arrHtml.push("					<p class='prodNm'>"+vo[i].v_productnm+"</p>");
							
							if(vo[i].n_option_cnt > 1){								
								arrHtml.push("					<p class='option'>"+vo[i].v_optionnm+"</p>");
							}
							
							arrHtml.push("					<select id='' name='i_arrNamingArea_temp' class='selectBox3'>");
							
							if(vo[i].v_typecd != '0001' || vo[i].v_flag_naming != 'Y' || vo[i].v_flag_opt_naming == 'N'){	//옵션이 리필인 경우 레터링 불가 : v_flag_opt_naming = N
								
								arrHtml.push("						<option value=''>레터링 불가</option>");	
								
							}else{

								arrHtml.push("						<option value='0'>선택</option>");
								for(var j=0; j<vo[i].n_cnt; j++){
									
									var letteringcnt = j+1;
									
									var selected = letteringcnt == vo[i].n_naming_cnt ? 'selected=selcted' : '';
									
									arrHtml.push("						<option value='"+letteringcnt+"' "+selected+">"+letteringcnt+"개</option>");
								} 
								
							}
							
							arrHtml.push("					</select>");
							arrHtml.push("				</div>");
							arrHtml.push("		    	<div class='div_input_naming'>");
							
							if(flag == "M"){
								
								var cnt = 0;
								//[S]YHCHOI : 레터링 옵션 시작
								for(var k=0; k<vo.length; k++){
									
									if(vo[i].v_productcd == vo[k].v_productcd && vo[i].v_optioncd == vo[k].v_optioncd && vo[k].v_ont_flag_naming == "Y"){
										
										cnt += 1;
										
										arrHtml.push("<div class='inputbar'>");
										arrHtml.push("	<div class='select'>");
										arrHtml.push("		<span class='span_lettering_no'>#"+cnt+"</span>");
										arrHtml.push("		<select id='i_arrNamingArea' name='i_arrNamingArea' class='selectBox3'>");

										for(var j=0; j<namingVo.length; j++){
											
											if(vo[k].v_ont_naming_area != undefined && vo[k].v_ont_naming_area != ""){
												
												var select = "";

												if(vo[k].v_ont_naming_area == namingVo[j].v_sub_code1){										
													select = "selected=selected";									
												}
												
												arrHtml.push("<option value='"+namingVo[j].v_sub_code1+"' "+select+">"+namingVo[j].v_sub_codenm+"</option>");

											}
										}

										arrHtml.push("		</select>");
										arrHtml.push("	</div>");
										arrHtml.push("	<input type='text' name='i_arrNamingMessage' class='inputtxt' value='"+vo[k].v_ont_message+"' placeholder='문구를 적어주세요.'>");
										arrHtml.push("	<a href='#none' class='btn_delete btn_naming_delete'><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_delete4.png' alt='삭제'></a>");
										arrHtml.push("</div>");
										
									}
								}
								//[E]YHCHOI : 레터링 옵션 종료					
								
							}

							arrHtml.push("		    	</div>");
							arrHtml.push("		    </div>");
							
							namingCntIndex++;
						}

						productcd = vo[i].v_productcd;
						optioncd  = vo[i].v_optioncd;
					}
					
					arrHtml.push("		    <div class='letteringRule'>");
					arrHtml.push("		    	<p class='txt'>※국문 10자, 영문 20자 이내만 가능합니다. (띄어쓰기 포함)</p>");
					arrHtml.push("		    	<p class='txt'>※특수문자의 경우, 제한적으로 적용 가능합니다. (♠♤♥♡♬♪☆★♣♧ ^^ :) 만 가능)</p>");
					arrHtml.push("		    	<p class='txt'>※서비스받은 상품 한 개당 1,000원의 비용이 추가됩니다. (프로모션시 제외)</p>");
					arrHtml.push("		    	<p class='txt'>※레터링 서비스 신청 시 고객 변심에 의한 교환/반품이 불가능합니다.</p>");
					arrHtml.push("		    	<p class='txt'>※레터링 서비스 신청된 제품이 포함된 주문은 당일배송이 불가능합니다.</p>");
					arrHtml.push("		    	<p class='txt'>※레터링 서비스는 본품만 가능합니다. (리필 제품에는 레터링 서비스 불가)</p>");
					arrHtml.push("		    </div>");
					
					arrHtml.push("		    <div class='result'>");
					arrHtml.push("		    	<p>레터링 신청 총 <em class='span_naming_cnt'>0</em><span class='ftxt2'>건</span></p>");
					arrHtml.push("		    	<p>추가비용 : <em class='span_naming_price'>0</em><span class='ftxt2'>원</span></p>");
					arrHtml.push("		    </div>");
					
					arrHtml.push("		    <div class='btnArea2'>");
					arrHtml.push("		    	<span class='btn_ty btn_lettering_pop_apply'><a href='#none'>신청완료</a></span>");
					arrHtml.push("		    </div>");
					arrHtml.push("		</div>");
					arrHtml.push("		<a href='#' class='btn_modalpopupClose' onclick=\"modalPopupClose('#modalPopupLetteringSrv');return false;\"><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_modalpopupClose.png' alt='닫기'></a>");
					arrHtml.push("	</section>");
					arrHtml.push("</div>");
					
					target.html("");	
					target.html($(arrHtml.join("")));	
					
					//팝업열기
					modalPopup("#modalPopupLetteringSrv");
					
					$("select[name='i_arrNamingArea_temp']").change(function(event){
						
						var obj       = $(this);
						var parentObj = obj.parents(".letteringBox");
						var target    = $(".div_input_naming",parentObj);
						
						var checkbox = $("input[name=i_arrFlagNaming_temp]",parentObj);
						
						if(checkbox.is(":checked") == false){
							
							showMessageBox({message : "레터링을 원하는 상품을 먼저 체크 하세요.",
								close: function(){
									$("<div class='overlay'></div>").clone().appendTo("#wrap");
									obj.val(0);
								}
									
							});
							
							return;
						}
						
						if(obj.val() != 0){
							
							var arrAreaHtml   = new Array();
							
							var prev_lettering_size = $(".inputbar", parentObj).size();
							var curr_lettering_size = obj.val() - prev_lettering_size;
							
							var nmPrdArea   = $("input[name='i_arrNamingPrdArea']", parentObj).val();
							
							var size = curr_lettering_size;
						
							if(size > 0){

								for(var i =0; i<size; i++){
									
									arrAreaHtml.push("<div class='inputbar'>");
									arrAreaHtml.push("	<div class='select'>");
									arrAreaHtml.push("		<span class='span_lettering_no'></span>");
									arrAreaHtml.push("		<select id='i_arrNamingArea' name='i_arrNamingArea' class='selectBox3'>");
												
										for(var j=0; j<namingVo.length; j++){
											
											if(nmPrdArea != "undefined" && nmPrdArea.indexOf(namingVo[j].v_sub_code1) > -1){
												
												arrAreaHtml.push("<option value='"+namingVo[j].v_sub_code1+"'>"+namingVo[j].v_sub_codenm+"</option>");
										
											}
											
										}

									arrAreaHtml.push("		</select>");
									arrAreaHtml.push("	</div>");
									arrAreaHtml.push("	<input type='text' name='i_arrNamingMessage' class='inputtxt' value='' placeholder='문구를 적어주세요.'>");
									arrAreaHtml.push("	<a href='#none' class='btn_delete btn_naming_delete'><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_delete4.png' alt='삭제'></a>");
									arrAreaHtml.push("</div>");

								}
				
							}else{
								
								size = Math.abs(size);
								
								var inputSize = $(".inputbar",parentObj).size() -1;
					
								for(var i=0; i<size; i++){
									
									$(".inputbar",parentObj).eq(inputSize -i).remove();
									
								}
								
							}

							$(arrAreaHtml.join("")).appendTo(target);
							MobileOrderNaming.setNamingStatus(parentObj);
							
						}else{
							
							$("input[name='i_arrFlagNaming_temp']",parentObj).prop("checked",false);
							target.html("");
							MobileOrderNaming.setNamingStatus();
						}						
					});
					
					MobileOrderNaming.setNamingStatus();	
					
				}
			}
		});
	}
	,GiftCardLayerPopup : function(){
		
		if(MobileOrderGiftCard.isDuple){
			
			MobileOrderGiftCard.isDuple = false;
			
			var frm = $("form[name='frm']");
			var arrParam = new Array();
			
			arrParam.push("i_sGiftcardTempcd=" + $("input[name='i_sGiftcardTempcd']", frm).val());
			arrParam.push("i_iSumPayPrice=" + MobileOrderStep1.sum_pay_price);
			
			MobileCommon.ajax({
				url :  GLOBAL_WEB_ROOT+"mobile/order/mobile_order_order_giftcard_use_ajax.do"
				, type : "POST"
				, data : arrParam.join("&")
				, dataType  : "json"
				, animation :false
				, success : function ( data, textStatus, jqXHR) {

					if(data.status == "succ"){
						
						var target  = $("#div_giftcard_list");
						var arrHtml = new Array();
						var vo      = data.object.list;
						
						arrHtml.push("<div id='modalPopupGiftcard' class='modal-wrap'>");
						arrHtml.push("	<form name='frm_giftcard_pop' id='frm_giftcard_pop' action='' method='post'>");
						arrHtml.push("	<input type='hidden' name='i_sGiftcardTempcd' value='"+$("input[name='i_sGiftcardTempcd']", frm).val()+"'/>");
						arrHtml.push("	<input type='hidden' name='i_sFlagAction' value='USE'/>");
						arrHtml.push("	<input type='hidden' name='i_iSumPayPrice' value='"+MobileOrderStep1.sum_pay_price+"'/>");
						arrHtml.push("	<section class='modal-content popupGifrcard'>");
						arrHtml.push("		<div class='head'>");
						arrHtml.push("			<p class='ttl'>기프트카드 적용</p>");
						arrHtml.push("		</div>");
						arrHtml.push("		<div class='content'>");
						arrHtml.push("			<p class='tit'>사용하실 기프트카드를 선택한 후 사용금액을 입력해주세요.</p>");
						arrHtml.push("			<div class='tabletype'>");
						arrHtml.push("				<table width='100%' cellpadding='0' cellspacing='0' border='0'>");
						arrHtml.push("					<caption><span>쿠폰적용 표</span></caption>");
						arrHtml.push("					<colgroup>");
						arrHtml.push("						<col width='10%'>");
						arrHtml.push("						<col width='30%'>");
						arrHtml.push("						<col width='30%'>");
						arrHtml.push("						<col width='*'>");
						arrHtml.push("					</colgroup>");
						arrHtml.push("					<thead>");
						arrHtml.push("						<tr>");
						arrHtml.push("							<th><p>선택</p></th>");
						arrHtml.push("							<th><p>기프트 카드 No.</p></th>");
						arrHtml.push("							<th><p>사용금액</p></th>");
						arrHtml.push("							<th><p>잔액</p></th>");
						arrHtml.push("						</tr>");
						arrHtml.push("					</thead>");
						arrHtml.push("					<tbody>");
						
						var sum_giftcard = 0;
						var sum_use_giftcard = 0;
						var sum_balance_giftcard = 0;
						
						for(var i=0; i<vo.length; i++){
							
							var use_giftcard =  0;
							
							//총 사용 금액
							sum_use_giftcard += use_giftcard;

							//총 잔여금액
							sum_balance_giftcard += parseInt(vo[i].balance); 
							
							arrHtml.push("					<tr class='tr_giftcard_pop_list'>");
							arrHtml.push("						<td>");
							arrHtml.push("						<input type='hidden' name='i_arrGiftcardNo' value='"+vo[i].card_no+"'   disabled='disabled'>");
							arrHtml.push("						<input type='hidden' name='i_arrGiftAmount' value='"+vo[i].amount+"'    disabled='disabled'>");
							arrHtml.push("						<input type='hidden' name='i_arrPreBalance' value='"+vo[i].balance+"'   disabled='disabled'>");
							arrHtml.push("						<input type='hidden' name='i_arrExpiryDt'   value='"+vo[i].expiry_dt+"' disabled='disabled'>");						
							arrHtml.push("							<span class='inputChk'>");
							arrHtml.push("								<input type='checkbox' id='g1' name='i_arrGiftChk' class='checkbox'>");
							arrHtml.push("								<label for='g1'></label>");
							arrHtml.push("							</span>");
							arrHtml.push("						</td>");
							arrHtml.push("						<td class='number'>"+vo[i].card_no+"</td>");
							arrHtml.push("						<td>");
							arrHtml.push("							<div class='inputbar'>");
							arrHtml.push("								<input type='text' name='i_arrPayGiftcard' value='"+SetNumComma(use_giftcard)+"' class='inputtxt' maxlength='6' disabled='disabled'/>");
							arrHtml.push("								<span>원</span>");
							arrHtml.push("							</div>");
							arrHtml.push("						</td>");
							arrHtml.push("						<td class='ftxt2'><span class='span_gap'>"+SetNumComma(vo[i].balance)+"</span>원</td>");
							arrHtml.push("					</tr>");
							
						}
						
						//총 사용가능 금액
						sum_giftcard = sum_use_giftcard + sum_balance_giftcard;
						
						arrHtml.push("					</tbody>");
						arrHtml.push("				</table>");
						arrHtml.push("			</div>");
						arrHtml.push("			<div class='tabletype2'>");
						arrHtml.push("				<table width='100%' cellpadding='0' cellspacing='0' border='0'>");
						arrHtml.push("					<caption><span>기프티카드 금액 표</span></caption>");
						arrHtml.push("					<colgroup>");
						arrHtml.push("						<col width='*'>");
						arrHtml.push("						<col width='30%'>");
						arrHtml.push("						<col width='30%'>");
						arrHtml.push("					</colgroup>");
						arrHtml.push("					<thead>");
						arrHtml.push("						<tr>");
						arrHtml.push("							<th scope='col'><p>총 사용가능금액</p></th>");
						arrHtml.push("							<th scope='col'><p>사용금액</p></th>");
						arrHtml.push("							<th scope='col'><p>총 잔여금액</p></th>");
						arrHtml.push("						</tr>");
						arrHtml.push("					</thead>");
						arrHtml.push("					<tbody>");
						arrHtml.push("						<tr>");
						arrHtml.push("							<td><p class='span_balance_total'>"+SetNumComma(sum_giftcard)+"원</p></td>");
						arrHtml.push("							<td><p class='ftxt3 span_payment_total'>"+SetNumComma(sum_use_giftcard)+"원</p></td>");
						arrHtml.push("							<td><p class='span_gap_total'>"+SetNumComma(sum_balance_giftcard)+"원</p></td>");
						arrHtml.push("						</tr>");
						arrHtml.push("					</tbody>");
						arrHtml.push("				</table>");
						arrHtml.push("			</div>");
						arrHtml.push("		    <div class='btnArea2'>");
						arrHtml.push("		    	<span class='btn_ty'><a href='javascript:;' class='btn_giftcard_apply'>해당금액 사용하기</a></span>");
						arrHtml.push("		    </div>");
						arrHtml.push("		</div>");
						arrHtml.push("		<a href='#' class='btn_modalpopupClose' onclick=\"modalPopupClose('#modalPopupGiftcard');return false;\"><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_modalpopupClose.png' alt='닫기'></a>");
						arrHtml.push("	</section>");
						arrHtml.push("	</form>");
						arrHtml.push("</div>");
						
						target.html("");
						target.html($(arrHtml.join("")));
						
						//팝업열기
						modalPopup("#modalPopupGiftcard");
						addOnlyNumberEvent($(".onlyNumber"),{isComma:false,isStringNumber:true});
						//MobileOrderGiftCard.sum();
					}				

				}
			});	
		}else{
			
			modalPopup("#modalPopupGiftcard");
			MobileOrderGiftCard.sum();
			
		}
	}
	,GiftBoxLayerPopup : function(){
		
		if(MobileOrderGiftBox.isDuple){
			
			MobileOrderGiftBox.isDuple = false;
			
			var arrHtml = new Array();
			var target	= $("#div_giftbox_list");
			
			arrHtml.push("<div id='modalPopupgGiftPackingSrv' class='modal-wrap' style='display:none;'>");
			arrHtml.push("	<section class='modal-content popGiftPackingSrv'>");
			arrHtml.push("		<div class='head'>");
			arrHtml.push("			<p class='ttl'>선물포장 서비스</p>");
			arrHtml.push("		</div>");
			arrHtml.push("		<div class='content'>");
			arrHtml.push(" 			<div class='ttlbox'>");
			arrHtml.push("				<p class='ttl'>유료 또는 무료 서비스 중 원하시는 선물포장 서비스를 선택해주세요.</p>");
			arrHtml.push("			</div>");
			arrHtml.push("			<p class='pckingImg' id='pckingImg01'><img src='"+GLOBAL_MOBILE_IMG_URL+"content/img_giftPacking01.jpg' alt='' /></p>");
			var today = new Date();
			var tyear = String(today.getFullYear());
			var tmonth =String(today.getMonth()+1);
			var tday   = String(today.getDate());
			
			if(tmonth <10){
				tmonth = "0"+tmonth;
			}
			if(tday <10){
				tday = "0"+tday;
			}
			
			var date = tyear + tmonth+ tday;
			
			if(parseInt(date) >= 20150406){
				arrHtml.push("			<p class='pckingImg' id='pckingImg02'><img src='"+GLOBAL_MOBILE_IMG_URL+"content/img_giftPacking03.jpg' alt='' /></p>");
			}else{
				arrHtml.push("			<p class='pckingImg' id='pckingImg02'><img src='"+GLOBAL_MOBILE_IMG_URL+"content/img_giftPacking02.jpg' alt='' /></p>");
			}
			
			arrHtml.push("			<div class='radioArea'>");
			arrHtml.push("				<span class='inputRadio'>");
			arrHtml.push("					<input type='radio' id='packing01' class='rab' name='i_sPacking' value='F'/>");
			arrHtml.push("					<label for='packing01'>무료포장</label>");
			arrHtml.push("				</span>");
			arrHtml.push("				<span class='inputRadio'>");
			arrHtml.push("					<input type='radio' id='packing02' class='rab' name='i_sPacking'  value='P' checked='checked' />");
			arrHtml.push("					<label for='packing02'>유료포장(+1,500원)</label>");
			arrHtml.push("				</span>");
			arrHtml.push("			</div>");
			arrHtml.push("			<div class='infoBox' id='packingInfo01'>");
			arrHtml.push("				<div class='listTy02'>");
			arrHtml.push("					<ul>");
			arrHtml.push("						<li>케이스(단상자)에 담겨있는 제품에 한해 선물포장이 가능합니다.</li>");
			arrHtml.push("					</ul>");
			arrHtml.push("				</div>");
			arrHtml.push("				<div class='listTy01'>");
			arrHtml.push("					<ul>");
			arrHtml.push("						<li>생활용품류, 네일제품, 시트마스크, 립글로스 및 립스틱은 포장이 불가능합니다.</li>");
			arrHtml.push("						<li>당일배송 상품은 선물 포장 서비스 선택 시, 당일 배송이 불가합니다.</li>");
			arrHtml.push("					</ul>");
			arrHtml.push("					<p>* 고객 등급에 따라 일반 회원 1개, VIP 회원 2개, VVIP회원 3개 상품을 선택하실 수 있습니다.<span class='span_gift_cnt' style='display:none'></span></p>");
			arrHtml.push("				</div>");
			arrHtml.push("			</div>");
			arrHtml.push("			<div class='infoBox' id='packingInfo02'>");
			arrHtml.push("				<div class='listTy02'>");
			arrHtml.push("					<ul>");
			arrHtml.push("						<li>유료 선물박스는 크기에 상관없이 결제금액에 1,500원이 추가됩니다.</li>");
			arrHtml.push("						<li>유료 포장서비스를 신청한 상품이 다수일 경우, 모두 한 개의 선물 박스에 포장됩니다.</li>");
			arrHtml.push("					</ul>");
			arrHtml.push("				</div>");
			arrHtml.push("				<div class='listTy01'>");
			arrHtml.push("					<ul>");
			arrHtml.push("						<li>당일배송 상품은 선물 포장 서비스 선택 시, 당일 배송이 불가합니다.</li>");
			arrHtml.push("						<li>선물 박스 크기 참고 (가로 * 세로 * 높이) <br/>소형 : 14.5 * 9 * 17.5<br/>대형 : 29 * 18 * 11cm</li>");
			arrHtml.push("						<li>대형 선물박스 크기보다 큰 상품은 포장이 불가합니다. 선택하신 상품이 대형선물박스에 모두 담기지 않을 경우 임의로 담을 수 있는 만큼만 담겨지는 점 주의하세요. </li>");
			arrHtml.push("					</ul>");
			arrHtml.push("				</div>");
			arrHtml.push("			</div>");
			arrHtml.push("			<div class='bskGiftbox' id='ul_giftbox_list'>");
			arrHtml.push("			</div>");
			arrHtml.push("			<div class='btnArea'>");
			arrHtml.push("				<span class='btn_ty'><a href='#' class='btn_giftbox_apply'>신청완료</a></span>");
			arrHtml.push("				<span class='btn_ty3'><a href='#' class='btn_giftbox_cancel'>취소</a></span>");
			arrHtml.push("			</div>");
			arrHtml.push("		</div>");
			arrHtml.push("		<a href='#' class='btn_modalpopupClose' onclick=\"modalPopupClose('#modalPopupgGiftPackingSrv');return false;\"><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_modalpopupClose.png' alt='닫기'></a>	");
			arrHtml.push("	</section>");
			arrHtml.push("</div>");
			
			target.html("");
			target.html($(arrHtml.join("")));			
			
			MobileOrderGiftBox.premiumGiftProduct();

			var giftcnt = (MobileOrderUserInfo.levelcd == "LV11" || MobileOrderUserInfo.levelcd == "LV15" || MobileOrderUserInfo.levelcd == "LV18") ? 1 : (MobileOrderUserInfo.levelcd == "LV12" || MobileOrderUserInfo.levelcd == "LV16" || MobileOrderUserInfo.levelcd == "LV19") ? 2 : (MobileOrderUserInfo.levelcd == "LV13" || MobileOrderUserInfo.levelcd == "LV17" || MobileOrderUserInfo.levelcd == "LV20") ? 3 : 0;
			$(".span_gift_cnt").text(giftcnt);
		}
		
		modalPopup("#modalPopupgGiftPackingSrv");
		
	}
	,GiftBoxLayerSubList : function(flag){
		
		var productTr		 = $(".tr_product_list");
		var productlistSize  = productTr.size();
		var arrHtml			 = new Array();
		var target			 = $("#ul_giftbox_list");
		var giftbox_sub_cnt  = 0;
		var paygiftbox_sub_cnt = 0;
		
		if(productlistSize > 0){
			
			arrHtml.push("				<p class='ttl'>선물포장 받고 싶은 상품을 선택해주세요.</p>");
			arrHtml.push("					<ul>");
			
			for(var i=0; i<productlistSize; i++){
				
				var productcd	= $("input[name='i_arrProductcd']",productTr.eq(i));
				var optioncd	= $("input[name='i_arrOptioncd']",productTr.eq(i));
				var productnm	= $("input[name='i_arrProductnm']",productTr.eq(i));
				var productimg 	= $("input[name='i_arrProductImg']",productTr.eq(i));
				var barndnm  	= $("input[name='i_arrBrandnm']",productTr.eq(i));
				var flagbox  	= $("input[name='i_arrFlagGiftbox']",productTr.eq(i));
				var payflagbox  = $("input[name='i_arrFlagPayGiftbox']",productTr.eq(i));
				
				if(flag == "" && payflagbox.val() == "Y"){
					paygiftbox_sub_cnt++;

					arrHtml.push("					<li>");
					arrHtml.push("						<div class='prodImg'>");
					arrHtml.push("							<span class='inputChk4'>");
					arrHtml.push("								<input type='checkbox' id='blu"+i+"' name='i_arrGiftProductChk' class='checkbox' value='"+productcd.val()+";"+optioncd.val()+"'>");
					arrHtml.push("								<label for='blu"+i+"'><img src='"+productimg.val()+"' alt='' onerror='fnNoImage(this);'/></label>");
					arrHtml.push("							</span>");
					arrHtml.push("						</div>");
					arrHtml.push("						<div class='prodDetail'>");
					arrHtml.push("							<p class='brandNm ellipsis'>"+barndnm.val()+"</p>");
					arrHtml.push("							<p class='prodNm'>"+productnm.val()+"</p>");
					arrHtml.push("						</div>");
					arrHtml.push("					</li>");
				}
				
				if(flag == "Y" && flagbox.val() == "Y"){
					giftbox_sub_cnt++;

					arrHtml.push("					<li>");
					arrHtml.push("						<div class='prodImg'>");
					arrHtml.push("							<span class='inputChk4'>");
					arrHtml.push("								<input type='checkbox' id='blu"+i+"' name='i_arrGiftProductChk' class='checkbox' value='"+productcd.val()+";"+optioncd.val()+"'>");
					arrHtml.push("								<label for='blu"+i+"'><img src='"+productimg.val()+"' alt='' onerror='fnNoImage(this);'/></label>");
					arrHtml.push("							</span>");
					arrHtml.push("						</div>");
					arrHtml.push("						<div class='prodDetail'>");
					arrHtml.push("							<p class='brandNm ellipsis'>"+barndnm.val()+"</p>");
					arrHtml.push("							<p class='prodNm'>"+productnm.val()+"</p>");
					arrHtml.push("						</div>");
					arrHtml.push("					</li>");
				}
				
				
			}
			
			arrHtml.push("					</ul>");

			target.html("");
			target.html(arrHtml.join(""));
			
			$("input:checkbox[name='i_arrGiftProductChk']").unbind("click").click(function(event){

				   var flag = $("input[name='i_sPacking']:checked").val();
				
				   if(flag == "F"){
				
					   var cnt  = $("input[name='i_arrGiftProductChk']:checked").size();
					   var maxCnt = fnOnlyNumber($(".span_gift_cnt").text()).number; 
					   
					   if(cnt > maxCnt){
						   
						   showMessageBox({message: "선택하실 수 있는 무료포장 개수를 초과하셨어요.<br/>"+maxCnt+"개까지 무료포장을 신청하실 수 있어요."});
						   $(this).prop("checked",false);
						   return;
						   
					   }
				   }

			});

		}
		//상품이 없으면 초기화 시키고 없는 값 표시
		if(giftbox_sub_cnt == 0 && flag == "Y"){
			
			arrHtml.push("<div class='nodata'>");
			arrHtml.push("	<p class='sp_bg s5'>무료 선물 포장이 가능한 상품이 없습니다.</p>");
			arrHtml.push("</div>");
			
			target.html("");
			target.html(arrHtml.join(""));
		}
		
		if(paygiftbox_sub_cnt == 0 && flag == ""){
			
			arrHtml.push("<div class='nodata'>");
			arrHtml.push("	<p class='sp_bg s5'>유료 선물 포장이 가능한 상품이 없습니다.</p>");
			arrHtml.push("</div>");
			
			target.html("");
			target.html(arrHtml.join(""));
		}
		//상품이 없으면 초기화 시키고 없는 값 표시
		if(giftbox_sub_cnt == 0){

			
			
		}
		
	}
	,SyrupLayerPopup : function(){
		
		var arrHtml = new Array();
		var target	= $("#div_syrup_list");
		
		var dispaly_syrup_point = 0;
		var calcul_syrup_point  = MobileOrderStep1.sum_min_syrup_point_price;
		if(calcul_syrup_point > MobileOrderUserInfo.syrup_point){
			dispaly_syrup_point = MobileOrderUserInfo.syrup_point;
		}else{
			dispaly_syrup_point = calcul_syrup_point;
		}
		
		dispaly_syrup_point = Math.floor(dispaly_syrup_point/10)*10;
		
		arrHtml.push("<div id='modalPopupSyrupPay' class='modal-wrap'>");
		arrHtml.push("	<section class='modal-content popupBPointPay'>");
		arrHtml.push("		<div class='pop-inner'>");
		arrHtml.push("			<div class='head'>");
		arrHtml.push("				<p class='ttl'>두툼포인트 결제</p>");
		arrHtml.push("			</div>");
		arrHtml.push("			<div class='content'>");
		arrHtml.push("				<input type='hidden' name='i_iUseSyrupPoint_temp' id='i_iUseSyrupPoint_temp' class='inputtxt onlyNumber onlyNumberBeauty' value='"+dispaly_syrup_point+"' style='text-align:right;padding: 5px 13px;'>");
		arrHtml.push("				<ul class='ulPointList'>");
		arrHtml.push("					<li>총 사용가능한 포인트 <span class='f_st2'><em id='em_total_use_bpoint'>"+SetNumComma(MobileOrderUserInfo.syrup_point)+"</em>P</span></li>");
		arrHtml.push("					<li>사용 포인트 <span class='f_st2'><em id='em_use_bpoint'>"+SetNumComma(dispaly_syrup_point)+"</em>P</span></li>");
		arrHtml.push("					<li>총 잔여포인트 <span class='f_st2'><em id='em_remain_bpoint'>"+SetNumComma(MobileOrderUserInfo.syrup_point-dispaly_syrup_point)+"</em>P</span></li>");
		arrHtml.push("					<li style='font-size:11px;'>*스페셜세트,  시크릿박스, 뷰티프로포즈 상품은 두툼포인트 결제에서 제외됩니다.</li>");
		arrHtml.push("					<li style='font-size:11px;'>*두툼포인트로 결제하시더라도, 실제 결제하신 금액이 있는 경우 실 결제금액 기준으로 구매사은품을 받으실 수 있습니다.</li>");
		arrHtml.push("					<li style='font-size:11px;'>*최종 결제금액에서 포인트 결제 가능 상품들의 가격 비중 대비 자동 배분되어 결제됩니다.</li>");
		arrHtml.push("					<li style='font-size:11px;'><strong style='color:red;'>*두툼포인트로 결제하시는 경우, 뷰티포인트는 적립 및 사용이  불가합니다.</strong></li>");
		arrHtml.push("					<li style='font-size:11px;'><strong style='color:red;'>*두툼포인트로 일부 결제시, 스페셜 기프트는 제공되지 않습니다.</strong></li>");
		arrHtml.push("				</ul>");
		arrHtml.push("			</div>");
		arrHtml.push("			<div class='btnArea'>");
		arrHtml.push("				<span class='btn_ty3'><a href='#' class='' onclick=\"modalPopupClose('#modalPopupSyrupPay');return false;\">취소</a></span>");
		arrHtml.push("				<span class='btn_ty'><a href='#' class='' id='btn_syrup_point_apply'>두툼포인트 결제</a></span>");
		arrHtml.push("			</div>");
		arrHtml.push("		</div>");
		arrHtml.push("		<a href='#' class='btn_modalpopupClose' onclick=\"modalPopupClose('#modalPopupSyrupPay');return false;\"><img src='"+GLOBAL_MOBILE_IMG_URL+"common/btn_modalpopupClose.png' alt='닫기'></a>");
		arrHtml.push("	</section>");
		arrHtml.push("</div>");		

		target.html("");
		target.html($(arrHtml.join("")));
		
		//팝업열기
		modalPopup("#modalPopupSyrupPay");
		addOnlyNumberEvent($(".onlyNumberBeauty"),{isComma:true,isStringNumber:true});
	}
};
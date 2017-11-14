var MobileOrderBpoint = {
	name : "MobileOrderBpoint"
   ,is_chk : true
   ,init : function(){
	   MobileOrderBpoint.addBtnEvent();
   }
   ,addBtnEvent : function(){
   
		//YHCHOI : 뷰티포인트 적용 창
		$("#btn_user_bpoint_pop").click(function(event){
			event.preventDefault();
			
			var obj = $(this);
			
			if(obj.hasClass("use")){
				
				if(!MobileOrderStep1.isLogin) {
					showMessageBox({message : "뷰티포인트를 사용하시려면 로그인을 해야해요.<br/>로그인 하시겠어요?"});
					return;
				}
				
				var calcul_remain_bpoint = MobileOrderStep1.sum_min_bpoint_price - MobileOrderGiftCard.payment_total + MobileOrderStep1.sum_need_bpoint;
				
				if(calcul_remain_bpoint < 5000){
					showMessageBox({message : "<p style='font-size:12px;'>뷰티포인트로 결제 가능한 상품이 없어요.<br/> 뷰티포인트 결제가 가능한 상품가격은 <br/>최소 5,000원 이상이어야 합니다.<br/><span style='font-size:11px;color:#8C8C8C;text-align:center;'>(스페셜세트, 시크릿박스, 뷰티프로포즈 상품은 뷰티포인트 결제에서 제외됩니다.)</span></p>"});
					return;					
				}
				
				MobileOrderBpoint.is_chk = true;
				MobileOrderCoupon.clearAbsCoupon();
				MobileOrderHtml.BpointLayerPopup();
			}else{
				obj.addClass("use");
				obj.removeClass("refund");
				obj.text("포인트사용");
				$(".span_bpoint_temp_cnt").text(0);
				$(".span_bpoint_temp_price").text(0);
				$("#inp_bpoint_price").val(0);
				MobileOrderStep1.total_apply_bpoint = 0;
				MobileOrderCoupon.clearAbsCoupon();
				MobileOrderStep1.clearPayBpoint();
//				MobileOrderStep1.sum();
			}
		});
		
		//YHCHOI : 뷰티포인트 입력 이벤트
		$("#div_bpoint_list").on("blur","#i_iUseBpoint_temp",function(event){
			var obj 	   = $(this);
			var use_bpoint = Math.floor(obj.val()/100) * 100;
			
			removeErrorMessageBox(obj);
			
			MobileOrderBpoint.is_chk = true;
			
			if(5000 > use_bpoint){
				addErrorMessageBox(obj,"5,000P 이하는 입력이 불가능합니다.");
				MobileOrderBpoint.is_chk = false;
				return;
			}
			
			if(MobileOrderStep1.sum_need_bpoint > use_bpoint){
				addErrorMessageBox(obj, "뷰티포인트 전용 상품이 존재합니다.<br/>" + SetNumComma(MobileOrderStep1.sum_need_bpoint)+"P 포인트 이하는 입력이 불가능합니다.");
				MobileOrderBpoint.is_chk = false;
				return;
			}
			
			if(MobileOrderStep1.sum_need_bpoint < use_bpoint){
				if(parseInt(use_bpoint - MobileOrderStep1.sum_need_bpoint) < 5000){
					addErrorMessageBox(obj, "뷰티포인트 전용 상품 포인트보다 많은 포인트를 사용하실경우 <br/>뷰티포인트 전용 상품 포인트를 제외한 추가 결제 포인트가 5000포인트 이상이어야 합니다.");
					MobileOrderBpoint.is_chk = false;
					return;
				}
			}
			
			var calcul_remain_bpoint = MobileOrderStep1.sum_min_bpoint_price - MobileOrderGiftCard.payment_total + MobileOrderStep1.sum_need_bpoint;

			if(calcul_remain_bpoint < use_bpoint){
				addWebErrorMessageBox(obj,"현재 장바구니에서 최대 사용가능한 포인트는\""+SetNumComma(calcul_remain_bpoint)+"P\" 입니다.<br/> \""+ SetNumComma(calcul_remain_bpoint)+"P\" 이하로 입력해주세요");
				MobileOrderBpoint.is_chk = false;
				return;
			}
			
			if(MobileOrderUserInfo.bpoint < use_bpoint){
				addErrorMessageBox(obj,"보유 포인트 보다 더 많은 포인트는 사용할 수 없습니다.");
				MobileOrderBpoint.is_chk = false;
				return;
			}

			var total_use_bpoint = $("#em_total_use_bpoint");
			var remain_bpint 	 = $("#em_remain_bpoint");
			var using_bpoint 	 = $("#em_use_bpoint");
			var bpoint		 	 = MobileOrderUserInfo.bpoint - use_bpoint;
			
			obj.val(use_bpoint);
			remain_bpint.text(SetNumComma(bpoint));
			using_bpoint.text(SetNumComma(use_bpoint));
			total_use_bpoint.text(SetNumComma(MobileOrderUserInfo.bpoint));
		});
		
		//YHCHOI : 뷰티포인트 적용 이벤트
		$("#div_bpoint_list").on("click","#btn_bpoint_apply",function(event){
			event.preventDefault();

			var tr			  = $(".tr_product_list");
			var size 	 	  = tr.size();
			var use_bpoint    = fnOnlyNumber($("#i_iUseBpoint_temp").val()).number;

			if(use_bpoint == 0){
				showMessageBox({message : "보유 포인트 중 사용하실 포인트를 입력해주세요.<br/> 최소 5,000P 이상 시 사용 가능합니다."});
				MobileOrderBpoint.is_chk = false;
				return;
			}
			
			if(MobileOrderBpoint.is_chk){
				
				var total_apply_bpoint = use_bpoint;
				
//				if(size > 0){
//					
//					var arrBpoint		  = [];
//					var total_use_bpoint  = 0;
//					var total_need_bpoint = MobileOrderStep1.sum_need_bpoint;
//					
//					tr.sort(function(a, b){
//						var a_flag = $(a).find("input[name='i_arrFlagBeauty']").val();
//						var b_flag = $(b).find("input[name='i_arrFlagBeauty']").val();
//						if (a_flag > b_flag){return -1;}
//					  	if (b_flag > a_flag){return 1;}
//					  	return 0; 
//					});
//					
//					for(var i=0; i<size; i++){
//						
//						var bpoint_cnt = fnOnlyNumber(tr.eq(i).find(".span_bpoint_temp_cnt").text()).number;
//
//						if(bpoint_cnt > 0){
//							
//							arrBpoint.push({
//								n_index	: i
//							});
//						}
//					}
//					
//					size = arrBpoint.length;
//					
//					if(size > 0){
//						
//						for(var i=0; i<size; i++){
//							
//							var index 			  = arrBpoint[i].n_index;
//							var bpoint_cnt 		  = fnOnlyNumber(tr.eq(index).find(".span_bpoint_temp_cnt").text()).number;
//							var flag_beauty  	  = tr.eq(index).find("input[name='i_arrFlagBeauty']").val();
//							var productnm	 	  = tr.eq(index).find("input[name='i_arrProductnm']").val();
//							var division_price	  = 0;
//							var bpoint_price 	  = 0;
//							var bpoint_solo_price = 0;						
//						
//							if(flag_beauty  == "Y"){
//								
//								var beauty_price = fnOnlyNumber($(".span_beauty_price", tr.eq(index)).text()).number;
//								
//								bpoint_price = beauty_price * bpoint_cnt; 
//								bpoint_solo_price = Math.round((bpoint_price/bpoint_cnt)/100) * 100;
//								
//								//사용하는 포인트에서 뷰티포인트 전용 상품 가격만큼 차감시켜준다.
//								use_bpoint-=bpoint_price;
//								
//								division_price = bpoint_price;
//								
//							}else{
//								
//								var price = fnOnlyNumber(tr.eq(index).find(".span_price").text()).number;
//								
//								bpoint_price = Math.round((((price * bpoint_cnt)/MobileOrderStep1.sum_min_bpoint_price) * use_bpoint)/100) * 100;	
//								bpoint_solo_price = Math.round((bpoint_price/bpoint_cnt)/100) * 100;
//								
//								//뷰티포인트 사용할수 있는 총 상품 가격에 사용하는 뷰티포인트를 포함해서 N% 계산해서 나눈다.
//								total_use_bpoint+=bpoint_price;
//
//								if(i == size -1){
//									division_price = (bpoint_price + (use_bpoint - total_use_bpoint));
//								}else{
//									division_price = bpoint_price;
//								}
//							}
//
//							var feild_bpoint = tr.eq(index).find(".span_bpoint_temp_price");
//							
//							if(division_price > 0){
//								feild_bpoint.text(division_price);
//								tr.eq(index).find("input[name='i_arrFlagBpoint']").val("Y");
//								tr.eq(index).find("input[name='i_arrPayBpoint']").val(division_price);
//								tr.eq(index).find("input[name='i_arrPayBpointCnt']").val(bpoint_cnt);							
//							}else{
//								feild_bpoint.text(0);
//								tr.eq(index).find("input[name='i_arrFlagBpoint']").val("N");
//								tr.eq(index).find("input[name='i_arrPayBpoint']").val(0);
//								tr.eq(index).find("input[name='i_arrPayBpointCnt']").val(0);							
//							}
//						}
//					}
//					
//				}
				
				$("#inp_bpoint_price").val(SetNumComma(total_apply_bpoint));
				modalPopupClose("#modalPopupBPointPay");
				$("#btn_user_bpoint_pop").removeClass("use");
				$("#btn_user_bpoint_pop").addClass("refund");
				$("#btn_user_bpoint_pop").text("포인트취소");
				MobileOrderStep1.total_apply_bpoint = total_apply_bpoint;
				MobileOrderStep1.setGiftcardClear();
				MobileOrderStep1.sum();	
				
			}else{
				showMessageBox({message : "뷰티포인트 사용에 대해 다시 확인해주세요."});
				MobileOrderBpoint.is_chk = false;
				return;				
			}
		});
   }
};

var MobileWishUserInfo = {
		  name   : "MobileWishUserInfo"
		, levelcd : ""
		, init : function(){
			
			MobileWishUserInfo.levelcd = $("input[name='i_sUserLevelcd']").val();			
		}
};

var MobileWishList = {
		name : "MobileWishList"
	   ,isRunningAddCart : false
	   ,isRunningDelWish : false
	   ,init : function(){
		   MobileWishUserInfo.init();
		   MobileWishList.wishList();
		   MobileWishList.Object.init();
		   MobileWishList.addBtnEvent();
		   MobileWishList.wishListCheck();
		}
	   ,Object : {
			init : function() {
				MobileWishList.Object.arrStatuscd = new Array();
				MobileWishList.Object.arrSeqno = new Array();
				MobileWishList.Object.arrProductcd = new Array();
				MobileWishList.Object.arrOptioncd = new Array();
				MobileWishList.Object.arrCnt = new Array();
				MobileWishList.Object.arrProductnm = new Array();
				MobileWishList.Object.arrProductCtg = new Array();
				MobileWishList.Object.arrFlagUseSolo = new Array();
				MobileWishList.Object.arrProductnm = new Array();
				MobileWishList.Object.arrBrandnm = new Array();
				MobileWishList.Object.arrTagPrice = new Array();
				MobileWishList.Object.arrTagCategory = new Array();		
				MobileWishList.Object.arrTagSalePrice = new Array();
				MobileWishList.Object.arrBrandcd = new Array();
			}
			, arrStatuscd : undefined
			, arrSeqno : undefined
			, arrProductcd : undefined
			, arrOptioncd : undefined
			, arrCnt : undefined
			, arrProductnm : undefined
			, arrBrandnm : undefined
			, arrProductCtg : undefined
			, arrFlagUseSolo : undefined
			, arrTagPrice : undefined
			, arrTagCategory : undefined
			, arrTagSalePrice : undefined
			, arrBrandcd : undefined 
		}
	   ,wishListCheck : function(){
		   
		   var tr 	       = $(".tr_product_list");
		   var size 	   = tr.size();
		   var isCheckflag = false;

		   
		   for(var i=0; i<size; i++){
			   
			   var statuscd    = $("input[name='i_arrStatuscd']",tr.eq(i)).val();
			   var optstatuscd = $("input[name='i_arrOptStatuscd']",tr.eq(i)).val();
			   var seqno	   = $("input[name='i_arrSeqNo']",tr.eq(i)).val();
			   var productnm	   = $("input[name='i_arrProductnm']",tr.eq(i)).val();
			   var brandnm	   = $("input[name='i_arrBrandnm']",tr.eq(i)).val();
			   
			   
			   if(statuscd == "0003" || optstatuscd == "0003" ){
				   
				   MobileWishList.Object.arrSeqno.push(seqno);
				   MobileWishList.Object.arrProductnm.push(productnm);
				   MobileWishList.Object.arrBrandnm.push(brandnm);
				   isCheckflag = true;
			   }
			
		   }
			  
		   if(isCheckflag){
			   
				showConfirmBox({
					message : "고객님의 위시리스트에 포함되어있는 판매중지 상품을 삭제하시겠어요?"
					, ok_func : function() {
						MobileWishList.delWishList();
						return ;
					}
					, cancel_func : function() {
						MobileWishList.Object.init();
						return ;
					}
				});
		   }

	   }
	   ,addBtnEvent : function(){
		   
		   $("#div_wish_list").on("click",".btn_add_cart",function(event){
			   event.preventDefault();
				
			   var tr = $(this).parents(".tr_product_list").eq(0);
			   
			   var statuscd  = $("*[name='i_arrStatuscd']",tr).val();
			   var productcd = $("*[name='i_arrProductcd']",tr).val();
			   var optioncd  = $("*[name='i_arrOptioncd']",tr).val();
			   var cnt		 = $("*[name='i_arrProductCnt']",tr).val();
			   var productnm = $("*[name='i_arrProductnm']",tr).val();
			   var brandnm = $("*[name='i_arrBrandnm']",tr).val();
			   var flagUseSolo = $("*[name='i_arrFlagUseSolo']",tr).val();
			   var productctg= $(".span_prod_ctg",tr).text();
			   var tagPrice = $("*[name='i_arrTagPrice']", tr).val();
			   var tagCategory = $("*[name='i_arrTagCategory']", tr).val();
			   var tagSalePrice = fnOnlyNumber($(".span_sale_price", tr).text()).number;
			   var brandcd = $("*[name='i_arrBrandcd']",tr).val();
			   
			   MobileWishList.Object.arrStatuscd.push(statuscd);
			   MobileWishList.Object.arrProductcd.push(productcd);
			   MobileWishList.Object.arrOptioncd.push(optioncd);
			   MobileWishList.Object.arrCnt.push(cnt);
			   MobileWishList.Object.arrProductnm.push(productnm);
			   MobileWishList.Object.arrBrandnm.push(brandnm);
			   MobileWishList.Object.arrProductCtg.push(productctg);
			   MobileWishList.Object.arrFlagUseSolo.push(flagUseSolo);
			   MobileWishList.Object.arrTagPrice.push(tagPrice);
			   MobileWishList.Object.arrTagCategory.push(tagCategory);
			   MobileWishList.Object.arrTagSalePrice.push(tagSalePrice);
			   MobileWishList.Object.arrBrandcd.push(brandcd);
			   MobileWishList.addCartList();
			   
		   });
		   
		   /**gypark : AP몰 개선 - 위시리스트에서 바로구매하면 상품정보 안 뜨는 오류 수정*/
		   $("#div_wish_list").on("click",".btn_payment",function(event){
			  event.preventDefault();
			  
			  var tr = $(this).parents(".tr_product_list").eq(0);
			   
			   var statuscd  = $("*[name='i_arrStatuscd']",tr).val();
			   var productcd = $("*[name='i_arrProductcd']",tr).val();
			   var optioncd  = $("*[name='i_arrOptioncd']",tr).val();
			   var cnt		 = $("*[name='i_arrProductCnt']",tr).val();
			   var productnm = $("*[name='i_arrProductnm']",tr).val();
			   var flagUseSolo = $("*[name='i_arrFlagUseSolo']",tr).val();
			   var productctg= $(".span_prod_ctg",tr).text();
			   var brandnm = $("*[name='i_arrBrandnm']",tr).val();
			   var tagCategory  = $("*[name='i_arrTagCategory']",tr).val();
			   var tagPrice = $("*[name='i_arrTagPrice']", tr).val();
			   var tagSalePrice = fnOnlyNumber($(".span_sale_price", tr).text()).number;
			   var brandcd = $("*[name='i_arrBrandcd']",tr).val();
			   var productcd1 = $("*[name='i_arrProductcd']",tr).val();
			   var optioncd1  = $("*[name='i_arrOptioncd']",tr).val();
			   
			   MobileWishList.Object.arrStatuscd.push(statuscd);
			   MobileWishList.Object.arrProductcd.push(productcd);
			   MobileWishList.Object.arrOptioncd.push(optioncd);
			   MobileWishList.Object.arrCnt.push(cnt);
			   MobileWishList.Object.arrProductnm.push(productnm);
			   MobileWishList.Object.arrProductCtg.push(productctg);
			   MobileWishList.Object.arrFlagUseSolo.push(flagUseSolo);
			   MobileWishList.Object.arrBrandnm.push(brandnm);
			   MobileWishList.Object.arrTagPrice.push(tagPrice);
			   MobileWishList.Object.arrTagCategory.push(tagCategory);
			   MobileWishList.Object.arrTagSalePrice.push(tagSalePrice);
			   MobileWishList.Object.arrBrandcd.push(brandcd);
			  
			  MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"order/order_complete_count_ajax.do"
					, type : "POST"
					, dataType : "json"
					, animation	: false
					, success : function ( data, textStatus, jqXHR) {
						
						if(data.status == "succ"){

							if(data.object >= 3){
								showMessageBox({message : "하루에 주문 3회만 가능해요.<br/>내일 주문 부탁드릴게요!"});
								return;
							}else{
								   var tr  = $(this).parents(".tr_product_list").eq(0);
									  
								   var statuscd  = MobileWishList.Object.arrStatuscd;
								   var productcd = MobileWishList.Object.arrProductcd;
								   var optioncd  = MobileWishList.Object.arrOptioncd;
								   var cnt		 = MobileWishList.Object.arrCnt;
								   var flagUseSolo = MobileWishList.Object.arrFlagUseSolo;
								 
								   var list = undefined;
							
								   if(statuscd != "0002") {
									   
									   list = [{
										    productcd : productcd
										  , optioncd : optioncd
										  , cnt : cnt
										  , typecd :"PROD_0001"
										  , flagSoloPack : flagUseSolo
										 }];
									   
									   //SmartOffer - 개인화 추천 태깅 (바로구매)
								    	try{
								        	var orderList = [];
											var list_price = parseInt(MobileWishList.Object.arrTagPrice);
											var price = parseInt(MobileWishList.Object.arrTagSalePrice);
											var productCnt = parseInt(MobileWishList.Object.arrCnt);
											orderList.push({
								    			  ITEM_VALUE : productcd1
								    			, name : productnm
								    			, brand  : brandcd
								    			, category : tagCategory
								    			, price : Number(list_price * productCnt)
								    		    , qty   : productCnt
								    			, prodOptionCode : optioncd1
								    			, discountPrice : Number(price * productCnt)
								    		});
								    		orderListTagEvent(orderList,'MOBILE');
								    	}catch(e){}
								   }
								   try{trackClicksMall('상품','모바일 마이마우치^위시리스트^바로구매','위시리스트^바로구매','event5',true,productcd);} catch(e){}
								   MobileBodyStart.immediatelyPurchage({list : list});

							}
						}		
					}
				});
			  
		   });
		   
		   $("#div_wish_list").on("click",".btn_wish_del",function(event){
			  event.preventDefault();
			  
			    var value = $(this).attr("id").split(";");
			  
			  	var seqno = value[0];
			  	var productcd = value[1];
			  	var brandnm = value[2];
			  	var productnm = value[3];
			  
				showConfirmBox({
					message : "해당 상품을 위시리스트에서 삭제하시겠어요?"
					, ok_func : function() {
						
					   MobileWishList.Object.arrSeqno.push(seqno);
					   MobileWishList.Object.arrProductcd.push(productcd);
					   MobileWishList.Object.arrProductnm.push(productnm);
					   MobileWishList.Object.arrBrandnm.push(brandnm);
					   MobileWishList.delWishList();
					}
					, cancel_func : function() {
						
						return ;
						
					}
				});			  
		   });
		   
		   $("#div_wish_list").on("change","select[name='i_arrProductCnt_temp']",function(event){
			  
			   var obj = $(this);
			   var tr = obj.parents(".tr_product_list").eq(0);
			   
			   var cnt		  = fnOnlyNumber(obj.val()).number;
			   var stockqty   = fnOnlyNumber($(".span_stockqty",tr).text()).number;
			   var maxcartcnt = fnOnlyNumber($(".span_max_cart_cnt",tr).text()).number;
			   
			   var dayoffcd 	  = fnOnlyNumber($(".span_dayoffcd",tr).text()).number;
			   var dayoffStockqty = fnOnlyNumber($(".span_dayoff_stockqty",tr).text()).number;
			   
			   var isStockFlag = false;
			   var message	   = "";
			   
			   if(cnt <= maxcartcnt && cnt <= stockqty) {
				   
					if(dayoffcd != "" && dayoffcd !="undefined" && dayoffStockqty != 0) {
						
						if(cnt > dayoffStockqty) {
							isStockFlag = true;
							message = "구매하시려는 수량보다 상품 재고가 부족해요.<br/>더 좋은 상품으로 찾아뵐게요.";
							
						}
						
					}				   
				   
			   }else{

					if(cnt > maxcartcnt && cnt < stockqty) {
						
						isStockFlag = true;
						message = "1회 주문시의 구매제한 수량을 초과하였어요.";
						
					} else if(cnt > stockqty) {
						
						isStockFlag = true;
						message = "구매하시려는 수량보다 상품 재고가 부족해요.<br/>더 좋은 상품으로 찾아뵐게요.";
						
					}
					
			   }

				if(isStockFlag){
					
					showMessageBox({message : message
						,close: function(){
						
							obj.val($("input[name='i_arrProductCnt']",tr).val());
						}
					});
					
					return;				
					
				}
			   
			   $("*[name='i_arrProductCnt']",tr).val(cnt);
			   
			   MobileWishList.sum();
			   
		   });
		   
		   $(".btn_add_cart_select").unbind("click").click(function(event){
			  event.preventDefault();
			  
			  var checkbox = $("input[name='i_arrChkProd001']");
			  var checkedCnt = 0;
			  var checkedSoldCnt = 0;
				
			  checkbox.each(function(i){
				 
				  if(checkbox.eq(i).prop("checked")){
					  checkedCnt++;
					  var tr = $(".tr_product_list").eq(i);
					  
					  var statuscd  = $("*[name='i_arrStatuscd']",tr).val();
					  var productcd = $("*[name='i_arrProductcd']",tr).val();
					  var optioncd  = $("*[name='i_arrOptioncd']",tr).val();
					  var flagUseSolo = $("*[name='i_arrFlagUseSolo']",tr).val();
					  var cnt		= $("*[name='i_arrProductCnt']",tr).val();
					  var productnm = $("*[name='i_arrProductnm']",tr).val();
					  var brandnm = $("*[name='i_arrBrandnm']",tr).val();
					  var tagPrice = $("*[name='i_arrTagPrice']", tr).val();
					  var tagCategory = $("*[name='i_arrTagCategory']", tr).val();
					  var tagSalePrice = fnOnlyNumber($(".span_sale_price", tr).text()).number;
					  var brandcd = $("*[name='i_arrBrandcd']",tr).val();
					  
					  if(statuscd != '0002'){
						  MobileWishList.Object.arrStatuscd.push(statuscd);
						  MobileWishList.Object.arrProductcd.push(productcd);
						  MobileWishList.Object.arrOptioncd.push(optioncd);
						  MobileWishList.Object.arrCnt.push(cnt);	
						  MobileWishList.Object.arrFlagUseSolo.push(flagUseSolo);
						  MobileWishList.Object.arrProductnm.push(productnm);
						  MobileWishList.Object.arrBrandnm.push(brandnm);
						  MobileWishList.Object.arrTagPrice.push(tagPrice);
						  MobileWishList.Object.arrTagCategory.push(tagCategory);						  
						  MobileWishList.Object.arrTagSalePrice.push(tagSalePrice);
						  MobileWishList.Object.arrBrandcd.push(brandcd);
					  }else{
						  checkedSoldCnt++;
					  }					  
				  }  
			  });
			  
			  
				if(checkedCnt == 0 && checkedSoldCnt == 0) {
					showMessageBox({message : "상품을 선택해주세요."});
					MobileWishList.Object.init();
					return ;
					
				} else if(checkedCnt == 0 && checkedSoldCnt > 0) {
					
					showMessageBox({message : "일시품절된 상품은 장바구니에 담으실 수 없습니다."});
					MobileWishList.Object.init();
					return ;
					
				} else if(checkedCnt > 0 && checkedSoldCnt > 0) {
					
					showMessageBox({
						message : "선택하신 상품 중에 일시품절 상품이 포함 되어있어요.<br/>일시품절 상품을 제외하고 장바구니에 담아주세요!"
						, cancel_func : function() {
							MobileWishList.Object.init();
							return ;
						}
					});
					
				} else if(checkedCnt > 0 && checkedSoldCnt == 0) {
					MobileWishList.addCartList();
					return ;
				}
		   });
		   
		   $(".btn_add_cart_all").unbind("click").click(function(event){
			   
				  event.preventDefault();
				  
				  var checkbox = $("input[name='i_arrChkProd001']");
				  
				  checkbox.each(function(i){

					  var tr = $(".tr_product_list").eq(i);
					  
					  var statuscd  = $("*[name='i_arrStatuscd']",tr).val();
					  var productcd = $("*[name='i_arrProductcd']",tr).val();
					  var optioncd  = $("*[name='i_arrOptioncd']",tr).val();
					  var flagUseSolo = $("*[name='i_arrFlagUseSolo']",tr).val();
					  var cnt		= $("*[name='i_arrProductCnt']",tr).val();
					  var productnm = $("*[name='i_arrProductnm']",tr).val();
					  var brandnm = $("*[name='i_arrBrandnm']",tr).val();
					  var tagPrice = $("*[name='i_arrTagPrice']", tr).val();
					  var tagCategory = $("*[name='i_arrTagCategory']", tr).val();					  
					  var tagSalePrice = fnOnlyNumber($(".span_sale_price", tr).text()).number;
					  var brandcd = $("*[name='i_arrBrandcd']",tr).val();
					  
					  MobileWishList.Object.arrStatuscd.push(statuscd);
					  MobileWishList.Object.arrProductcd.push(productcd);
					  MobileWishList.Object.arrOptioncd.push(optioncd);
					  MobileWishList.Object.arrCnt.push(cnt);			
					  MobileWishList.Object.arrFlagUseSolo.push(flagUseSolo);
					  MobileWishList.Object.arrProductnm.push(productnm);
					  MobileWishList.Object.arrBrandnm.push(brandnm);
					  MobileWishList.Object.arrTagPrice.push(tagPrice);
					  MobileWishList.Object.arrTagCategory.push(tagCategory);
					  MobileWishList.Object.arrTagSalePrice.push(tagSalePrice);
					  MobileWishList.Object.arrBrandcd.push(brandcd);
				  });
				  
				  MobileWishList.addCartList();
				  return ;
			   
		   });

	   }
	   ,wishList : function(){
		   
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/my/mobile_my_wish_list_ajax.do"
				, type : "POST"
				, dataType : "json"
				, data : {i_sFlagWish : "L"}
				, animation : false
				, success : function ( data, textStatus, jqXHR) {
					if (data.status == "succ") {
						
						var vo = data.object.wishList;
						var size = vo.length;
						var target = $("#div_wish_list");
						
						var ahbArr = new Array();
						var sum_price_ah = 0;
						
						if(size>0){
							
							for(var i=0; i<size; i++){
								
								// 스토어 서비스 
								try {
									ahbArr.push(
									vo[i].v_productcd
									);
									sum_price_ah += vo[i].n_sale_price * vo[i].n_cnt;
								} catch (e) {}
								// end 스토어 서비스
									
								
								var arrHtml = new Array();
								
								var statuscd    = vo[i].n_stockqty <= 0 ? '0002' : vo[i].v_statuscd;
								var optstatuscd = vo[i].v_opt_statuscd;
								
								arrHtml.push("<div class='tr_product_list tr_wish_list'>");
								arrHtml.push("	<input type='hidden' name='i_arrProductnm'  value='"+vo[i].v_productnm+"'/>");
								arrHtml.push("	<input type='hidden' name='i_arrBrandnm'  value='"+vo[i].v_brandnm+"'/>");
								arrHtml.push("	<input type='hidden' name='i_arrProductcd'  value='"+vo[i].v_productcd+"'/>");
								arrHtml.push("	<input type='hidden' name='i_arrProductImg' value='"+vo[i].v_img_path+"'/>");
								arrHtml.push("  <input type='hidden' name='i_arrOptioncd'   value='"+vo[i].v_optioncd+"'/>");
								arrHtml.push("  <input type='hidden' name='i_arrOptionnm'   value='"+vo[i].v_optionnm+"'/>");
								arrHtml.push("  <input type='hidden' name='i_arrOptionCnt'  value='"+vo[i].n_option_cnt+"'/>");
								
								var maxcartcnt     = vo[i].n_opt_max_cart_cnt;
								var stockqty   	   = vo[i].n_stockqty;
								var dayoffStockqty = vo[i].n_dof_stockqty;
								var dayoffcd	   = vo[i].v_dayoffcd;
								
								var productOriCnt = vo[i].n_cnt;

							    if(vo[i].n_cnt > stockqty || (vo[i].n_cnt > dayoffStockqty && dayoffStockqty > 0 && dayoffcd != "undefined")){
								   if(stockqty > dayoffStockqty && dayoffStockqty > 0 && dayoffcd != "undefined"){
									   productOriCnt = dayoffStockqty;
								   }else{
									   
									   if(stockqty < 0){
										   productOriCnt = 1;
									   }else{
										   productOriCnt = stockqty;   
									   }
								   }				   
							    }else if(vo[i].n_cnt > maxcartcnt){
								   productOriCnt = maxcartcnt;
							    }
								
								arrHtml.push("  <input type='hidden' name='i_arrProductCnt' value='"+productOriCnt+"'/>");
								
								arrHtml.push("  <input type='hidden' name='i_arrFlagBeauty' value='"+vo[i].v_flag_beauty+"' />");
								arrHtml.push("  <input type='hidden' name='i_arrSetdiycd' 	value='"+vo[i].v_setdiycd+"'/>");
								arrHtml.push("  <input type='hidden' name='i_arrSetdiyKey' 	value='"+vo[i].v_setdiy_key+"'/>");
								arrHtml.push("  <input type='hidden' name='i_arrStatuscd' 	value='"+statuscd+"'/>");
								arrHtml.push("  <input type='hidden' name='i_arrOptStatuscd'value='"+optstatuscd+"'/>");
								arrHtml.push("  <input type='hidden' name='i_arrFlagSolo'	value='"+vo[i].v_flag_solopack+"'/>");
								arrHtml.push("  <input type='hidden' name='i_arrFlagUseSolo'value='"+vo[i].v_flag_use_solopack+"'/>");
								arrHtml.push("	<input type='hidden' name='i_arrFlagEvent'	value='"+vo[i].v_flag_event+"'/>");
								arrHtml.push("  <input type='hidden' name='i_arrSeqNo' 		value='"+vo[i].n_seqno+"'/>");
								arrHtml.push("  <input type='hidden' name='i_arrFeatureTag' value='"+vo[i].v_feature_tag+"'/>");
								arrHtml.push("  <input type='hidden' name='i_arrBrandnm' 	value='"+vo[i].v_brandnm+"'/>");
								arrHtml.push("	<input type='hidden' name='i_arrTagPrice'     value='"+vo[i].n_price+"'/>			  ");
								arrHtml.push("	<input type='hidden' name='i_arrTagCategory'  value='"+vo[i].v_tag_categorycd+"'/>        ");
								arrHtml.push("  <input type='hidden' name='i_arrBrandcd' 	value='"+vo[i].v_brandcd+"'/>");
								
								arrHtml.push("	<span class='span_hide span_key'>"+vo[i].v_setdiy_key+"</span>");
								arrHtml.push("	<span class='span_hide span_typecd'>"+vo[i].v_typecd+"</span>");
								arrHtml.push("	<span class='span_hide span_price'>"+vo[i].n_price+"</span>");
								arrHtml.push("	<span class='span_hide span_sale_price'>"+vo[i].n_sale_price+"</span>");
								arrHtml.push("	<span class='span_hide span_beauty_price'>"+vo[i].n_beauty_price+"</span>");
								arrHtml.push("	<span class='span_hide span_today_price'>"+vo[i].n_today_price+"</span>");
								arrHtml.push("  <span class='span_hide span_status'>"+statuscd+"</span>");
								arrHtml.push("  <span class='span_hide span_prod_ctg'>"+vo[i].v_prod_ctg+"</span>");
								
								arrHtml.push("  <span class='span_hide span_stockqty'>"+vo[i].n_stockqty+"</span>");
								arrHtml.push("	<span class='span_hide span_dayoff_stockqty'>"+vo[i].n_dof_stockqty+"</span>");
								arrHtml.push("	<span class='span_hide span_dayoffcd'>"+vo[i].v_dayoffcd+"</span>");
								
								arrHtml.push("	<span class='span_hide span_max_cart_cnt'>"+vo[i].n_opt_max_cart_cnt+"</span>");
																
								arrHtml.push("  <span class='span_hide span_oneplus_buy_cnt'>"+vo[i].n_plus_evt_buy_cnt+"</span>");
								arrHtml.push("  <span class='span_hide span_oneplus_give_cnt'>"+vo[i].n_plus_evt_give_cnt+"</span>");
								
								var isDisabled	= statuscd == "0003" || optstatuscd == "0003" ? 'disabled=disabled' : '';

								   arrHtml.push("<div class='bskBox div_product_list'>");
								   
								   arrHtml.push("<div class='ttlbox'>");
								   arrHtml.push("	<p class='prodNm'>");
								   arrHtml.push("		<span class='inputChk2'>");
								   arrHtml.push("			<input type='checkbox' id='chk"+i+"' name='i_arrChkProd001' class='checkbox' "+isDisabled+"/>");					   
								   arrHtml.push("   		<label for='chk"+i+"'>");
								   
								   if(statuscd != "0001" && statuscd != "0003"){
									   
									   arrHtml.push("<span style='color:red;'>(일시품절)</span>");   
									   
								   }else if(statuscd == "0003"){
									   
									   arrHtml.push("<span style='color: red;'>(판매중지)</span>");   
								   }
								   
								   arrHtml.push("			<span class='brandNm'>"+vo[i].v_brandnm+"</span>");   
								   arrHtml.push("			"+vo[i].v_productnm+"</label>");
								   arrHtml.push("		</span>");
								   arrHtml.push("	</p>");
								   arrHtml.push("	<div class='srvArea'>");	
								   
								   if(vo[i].v_feature_tag != undefined){

									   if(vo[i].v_flag_solopack == "Y" && vo[i].v_flag_use_solopack == "N"){
											
										   arrHtml.push(			getFilterHtmlTag(vo[i].v_feature_tag.replace("DG_P006","")));						  
									   }else{
										   arrHtml.push(			getFilterHtmlTag(vo[i].v_feature_tag));
									   }
								   }
								   
								   arrHtml.push("	</div>");
								   arrHtml.push("</div>");
							
								   var price		= parseInt(vo[i].n_price);
								   var sale_price	= parseInt(vo[i].n_sale_price);
								   var today_price	= parseInt(vo[i].n_today_price);
								   
								   var onePlusBuyCnt   = parseInt(vo[i].n_plus_evt_buy_cnt);
								   var onePlusGiveCnt  = parseInt(vo[i].n_plus_evt_give_cnt);
								   var isonePlusFlag   = onePlusBuyCnt > 0 && onePlusGiveCnt > 0 ? true : false;
								   
								   var dayoffcd		   = vo[i].v_dayoffcd;
								   var dayoffStockqty  = parseInt(vo[i].n_dof_stockqty);								   

								   arrHtml.push("<div class='prodbox'>");
								   arrHtml.push("	<div class='prodImg'>");
								   arrHtml.push("		<span class='btn_delete'><a href='#none' class='btn_wish_del' id='"+vo[i].n_seqno+";"+vo[i].v_productcd+";" + vo[i].v_brandnm + ";" + vo[i].v_productnm +"'><img src='/mobile/images/common/btn_delete3.png' alt='삭제'/></a></span>");
								   arrHtml.push("		<a href=\"javascript:MobileBodyStart.goProductDetail('" + vo[i].v_productcd + "');\"><img src='" + vo[i].v_img_path + "' alt=''></a>");
								   arrHtml.push("	</div>");
								   arrHtml.push("   <div class='detail'>");
								   arrHtml.push("		<dl>"); 
						
								   if((dayoffStockqty > 0 && dayoffcd !=undefined && today_price > 0)
								   ||((price>0 && sale_price > 0 && price > sale_price) && (dayoffStockqty == 0 && dayoffcd ==undefined))
								   ||(isonePlusFlag)){
									   var unit = "원";
										var color = "";
										
										if(vo[i].v_flag_beauty == "Y"){
											unit = "P";
											color = "color: #ea5279";
											arrHtml.push("		<dt class='ttl price'>판매금액</dt>");
											arrHtml.push("		<dd style='"+color+"'><em class='row_pay_price'>0</em>"+unit+"</dd>");
										}else{
											arrHtml.push("			<dt class='ttl sale'>판매금액</dt>");
											arrHtml.push("			<dd><em class='row_dis_price'>0</em>원</dd>");
											arrHtml.push("			<dt class='ttl price'>할인금액</dt>");
											arrHtml.push("			<dd><em class='row_pay_price'>0</em>원</dd>");
										}
									
								   }else{
									   
										var unit = "원";
										var color = "";
										
										if(vo[i].v_flag_beauty == "Y"){
											unit = "P";
											color = "color: #ea5279";
										}

										   arrHtml.push("		<dt class='ttl price'>판매금액</dt>");
										   arrHtml.push("		<dd style='"+color+"'><em class='row_pay_price'>0</em>"+unit+"</dd>");
									   
								   }

								   arrHtml.push("		</dl>");
								   
								   if(vo[i].n_option_cnt > 1){
									   
									   arrHtml.push("		<div class='sel'>");
									   arrHtml.push("			<span class='ttl'>옵션</span>");
									   arrHtml.push("			<input name='' value='"+vo[i].v_optionnm+"' style='width:100%;' readOnly='readOnly'/>");
									   arrHtml.push("		</div>");									   
									   
								   }else{
									   
									   if(vo[i].v_feature_tag != undefined){
										
										   if(vo[i].v_feature_tag.indexOf("DG_P003") > -1 || vo[i].v_feature_tag.indexOf("DG_P004") > -1){
											   
											   arrHtml.push("		<div class='sel'>");
											   arrHtml.push("			<span class='ttl'>옵션</span>");
											   arrHtml.push("			<input name='' value='"+vo[i].v_optionnm+"' style='width:100%;' readOnly='readOnly'/>");
											   arrHtml.push("		</div>");
											   
										   }
										   
									   }
								   }
								   
								   arrHtml.push("		<div class='sel'>");
								   arrHtml.push("			<span class='ttl'>수량</span>");
								   arrHtml.push("			<select id='' name='i_arrProductCnt_temp' class='selectBox3'>");
								   
								   for(var j=0; j<vo[i].n_opt_max_cart_cnt; j++){
									   
									   var productCount = j+1;
									   arrHtml.push("				<option value='"+productCount+"' "+(vo[i].n_cnt == productCount ? 'selected=selected' : '')+">"+productCount+"</option>");	
									   
								   }
								   
								   arrHtml.push("           </select>");								   
								   arrHtml.push("       </div>");
								   
								   if(vo[i].n_plus_evt_buy_cnt !=0 && vo[i].n_plus_evt_give_cnt !=0){
									   
									   arrHtml.push("		<div class='sel'>");
									   arrHtml.push("		<span style='color:#4c7ed6;'>이 상품을 <em class='row_plus_buy_cnt'>"+vo[i].n_plus_evt_buy_cnt+"</em>개 구매시  <em class='row_plus_give_cnt'>"+vo[i].n_plus_evt_give_cnt+"</em>개를 무료 추가선택 가능합니다.</span>");
									   arrHtml.push("		</div>");
								   }								   
								   
								   arrHtml.push("		<div class='btnArea'>");
								   arrHtml.push("			<span class='btn_ty3 v3'><a href='#' class='btn_add_cart'>장바구니담기</a></span>");
								   
								   
								   if(statuscd != "0001" && statuscd != "0003"){
									   
									   arrHtml.push("			<span class='btn_ty2 v3'><a href='#'  style='color: #acacac;background: #efefef;'>일시품절</a></span>");   
									   
								   }else if(statuscd == "0003"){
									   
									   arrHtml.push("			<span class='btn_ty2 v3'><a href='#'>판매중지</a></span>");
									   
								   }else{
									   
									   arrHtml.push("			<span class='btn_ty2 v3'><a href='#' class='btn_payment'>바로구매</a></span>");
									   
								   }
								   
								   arrHtml.push("		</div>");
								   arrHtml.push("   </div>");
								   arrHtml.push("</div>");						
								   arrHtml.push("</div>");
								   
							   arrHtml.push("</div>");
							   
							   target.html(target.html() + arrHtml.join(""));
							   $(".wishbtn").show();
							}							
						} else{
							$(".nowish").show();
							$(".wishbtn").hide();
						}
						// 스토어 서비스 
						try {
							awq('track','add_to_wishlist', 'a1627cefe9caa9adf47f244c5aeeb1e5', {"price":sum_price_ah,"currency":"KRW","content_type":"product","product_ids":ahbArr});
						} catch (e) {}
						// end 스토어 서비스
						
						MobileWishList.sum();
						
						var sameRecomList = data.object.recomList;
						
						if(sameRecomList != undefined && sameRecomList.length > 0) {
							var sameHtml = [];
							var sameNav = [];
							
							var len = sameRecomList.length;
							for(var i=0; i<len; i++) {
								if(i % 3 == 0) {
									sameHtml.push("<div class=\"prodAlbumType v2\">");
									sameHtml.push("	<ul>");
								}
								
								sameHtml.push("<li>");
								sameHtml.push("	<a href=\"javascript:MobileBodyStart.goProductDetail('" + sameRecomList[i].v_productcd + "');\">");
								sameHtml.push("		<div class=\"thumbImg\">");
								sameHtml.push("			<img src=\""+sameRecomList[i].v_img_path+"\" onclick=\"trackClicksMall('상품','모바일 위시리스트^고객이 눈 여겨본 상품','고객이 눈 여겨본 상품','event5',true,'"+ sameRecomList[i].v_productcd +"');productClickTagEvent('reco-dp-7','"+sameRecomList[i].v_productcd+"','MOBILE');\" alt=\"\" />");
								sameHtml.push("		</div>");
								sameHtml.push("		<div class=\"prodDetail\">");
								sameHtml.push("			<p class=\"prodNm\">"+getByteString(sameRecomList[i].v_productnm, 15)+"</p>");
								sameHtml.push("			<p class=\"priceZone\">");
								if(sameRecomList[i].n_list_price != sameRecomList[i].n_price) {
									sameHtml.push("				<span class=\"sale\"><em>"+SetNumComma(sameRecomList[i].n_list_price)+"</em> 원</span>");
								}
								sameHtml.push("				<span class=\"price\"><em>"+SetNumComma(sameRecomList[i].n_price)+"</em> 원</span>");
								sameHtml.push("			</p>");
								sameHtml.push("			<div class=\"prodEvalu\">");
								sameHtml.push("				<span class=\"gradeType2 grade0"+Math.round(sameRecomList[i].n_single_point)+"\"><span class=\"hide\">평점 "+sameRecomList[i].n_single_point+"</span></span>");
								sameHtml.push("				<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+SetNumComma(sameRecomList[i].n_review_cnt)+")</span>");
								sameHtml.push("			</div>");
								sameHtml.push("		</div>");
								sameHtml.push("	</a>");
								sameHtml.push("</li>");
								
								if(i % 3 == 2 || i == len-1) {
									sameHtml.push("	</ul>");
									sameHtml.push("</div>");
								}
							}
							
							var navi_no = 0;
							if(len > 3) {
								for(var i = 0; i<len; i++) {
									var active = "";
									if(i % 3 == 0) {
										navi_no++;
										if(navi_no == 1) {
											active = "class=\"active\"";
										} else {
											active = "";
										}
										
										
										sameNav.push("<span "+active+" style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
									}
								}
								$(".basketAdbanner-nav").html(sameNav.join(""));
							}
							
							$(".basketAdbanner-wrap").html(sameHtml.join(""));
							
							window.latestSwipe = new Swipe(document.getElementById('latestSwipe'), {
		                        continuous: true,
		                        stopPropagation: true,
		                        callback: function(event, element) {
		                        	var idx = setNaviIndex($("#adbanner-nav > span"), event);
		                            $("#adbanner-nav > span").removeClass().eq(idx).addClass("active");
		                        }
		                    });
						} else {
							$(".p_recomTitle").hide();
							$(".recomSec").hide();
						}

					}
				}
			});

	   }
		, addCartList : function() {
			
			if(MobileWishList.isRunningAddCart) {
				return ;
			}
			
			MobileWishList.isRunningAddCart = true;

			if(MobileWishList.Object.arrProductcd.length == 0 || MobileWishList.Object.arrOptioncd.length == 0 || MobileWishList.Object.arrCnt.length == 0) {
				showMessageBox({message : "System Error - [arrProductcd is null]"});
				return ;
			}
			
			var arrParams = new Array();
			var trackArrProdcd = "";
			
			arrParams.push("i_sFlagPlus=N");
			for(var i=0; i<MobileWishList.Object.arrProductcd.length; i++) {
				if(MobileWishList.Object.arrStatuscd[i] != "0002") {
					arrParams.push("i_arrProductcd=" + MobileWishList.Object.arrProductcd[i]);
					arrParams.push("i_arrOptioncd=" + MobileWishList.Object.arrOptioncd[i]);
					arrParams.push("i_arrFlagUseSolo=" + MobileWishList.Object.arrFlagUseSolo[i]);
					arrParams.push("i_arrCnt=" + MobileWishList.Object.arrCnt[i]);
					trackArrProdcd += MobileWishList.Object.arrBrandnm[i] +";"+MobileWishList.Object.arrProductnm[i] +";;;event54="+MobileWishList.Object.arrCnt[i]+"|event55="+MobileWishList.Object.arrTagSalePrice[i]*MobileWishList.Object.arrCnt[i]+";eVar31="+ MobileWishList.Object.arrProductcd[i]+",";
				}
			}
			
			//SmartOffer - 개인화 추천 태깅 (장바구니 담기)
	    	try{
	        	var cartList = [];
	        	for(var i=0; i<MobileWishList.Object.arrProductcd.length; i++) {
					if(MobileWishList.Object.arrStatuscd[i] != "0002") {
						var list_price = parseInt(MobileWishList.Object.arrTagPrice[i]);
						var price = parseInt(MobileWishList.Object.arrTagSalePrice[i]);
						var productCnt = parseInt(MobileWishList.Object.arrCnt[i]);
						cartList.push({
			    			  ITEM_VALUE : MobileWishList.Object.arrProductcd[i]
			    			, name : MobileWishList.Object.arrProductnm[i]
			    			, brand  : MobileWishList.Object.arrBrandcd[i]
			    			, category : MobileWishList.Object.arrTagCategory[i]
			    			, price : Number(list_price * productCnt)
			    		    , qty   : productCnt
			    			, prodOptionCode : MobileWishList.Object.arrOptioncd[i]
			    			, discountPrice : Number(price * productCnt)
			    		});
					}
				}
	        	cartListTagEvent(cartList,'MOBILE');
	    	}catch(e){}
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/cart/mobile_cart_add_cart_ajax.do"
				, type : "POST"
				, dataType : "json"
				, data : arrParams.join("&")
				, animation : false
				, success : function ( data, textStatus, jqXHR) {
					if (data.status == "succ") {
						
						trackArrProdcd = trackArrProdcd.replace(/&/gi,"_");
						try{trackPurchaseClick( trackArrProdcd,'scAdd, event54, event55');}catch(e){}
						
						showConfirmBox({
							message : "장바구니에 상품이 추가 되었어요."
							, ok_str : "장바구니로 이동"
							, cancel_str : "계속 쇼핑하기"
							, ok_func : function() {
								document.location.href = GLOBAL_SSL_URL+"mobile/cart/mobile_cart_cart_list.do";
							}
							, cancel_func : function() {
								
								MobileWishList.fnReload();
							}
						});
						MobileWishList.Object.init();
						MobileWishList.isRunningAddCart = false;
					} else {
						showMessageBox({
							message : data.message
							, close : function() {
								MobileWishList.Object.init();
								MobileWishList.isRunningAddCart = false;
							}
						});
					}
				}
				, error : function(e) {
					showMessageBox({
						message : "add Cart Ajax error!"
						, close : function() {
							MobileWishList.Object.init();
							MobileWishList.isRunningAddCart = false;
						}
					});
				}
			});
		}
		, delWishList : function() {
			
			if(MobileWishList.isRunningDelWish) {
				return ;
			}
			
			MobileWishList.isRunningDelWish = true;
			
			var arrParam = new Array();
			
			var trackArrProdcd = "";
			
			for(var i=0; i<MobileWishList.Object.arrSeqno.length; i++) {
				
				arrParam.push("i_arrSeqno=" + MobileWishList.Object.arrSeqno[i]);
				
				trackArrProdcd += MobileWishList.Object.arrBrandnm[i] + ";" + MobileWishList.Object.arrProductnm[i] + ";;;;eVar31="+ MobileWishList.Object.arrProductcd[i] +",";
			}
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/wish/mobile_wish_remove_wishlist_ajax.do"
				, type : "post"
				, dataType : "json"
				, data : arrParam.join("&")
				, isModal : true
				, isModalEnd : true
				, success : function(data, textStatus, jqXHR) {
					if(data.status == "succ") {
						
						MobileWishList.isRunningDelWish = false;
						MobileWishList.Object.init();
						trackArrProdcd = trackArrProdcd.replace(/&/gi,"_");
						trackPurchaseClick(trackArrProdcd,'event12');
						
						MobileWishList.fnReload();
						
					} else {
						
						MobileWishList.isRunningDelWish = false;
						showMessageBox({message : data.message
							, close : function() {
								MobileWishList.Object.init();
							}
						});
					}
				}
				, error : function(e) {
					MobileWishList.isRunningDelWish = false;
					showMessageBox({message : e.message
						, close : function() {
							MobileWishList.Object.init();
						}
					});
				}
			});
		}
		,
		fnReload : function() {
			
			var returnUrl = $("input[name='i_sReturnUrl']").val();
			var returnParam = $("input[name='i_sReturnParam']").val();
			
			document.location.href = returnUrl+"?"+returnParam; 
		}
		, sum : function () {
			
			var arrTr = $(".tr_product_list");
			var size = arrTr.size();
			
			var price = 0;
			var sale_price = 0;
			var beauty_price = 0;
			var cnt ,qtyCnt;
			
			var product_temp 	= "";  // 1+1 전 구매 상품.
			var preCnt_temp  	= 0;   // 1+1 전 구매 상품 갯수.
			var pre_price_temp  = 0;
			
			for (var i = 0; i < size; i++) {
					
				price 			= fnOnlyNumber($(".span_price", arrTr.eq(i)).text()).number;
				sale_price		= fnOnlyNumber($(".span_sale_price", arrTr.eq(i)).text()).number;
				beauty_price	= fnOnlyNumber($(".span_beauty_price", arrTr.eq(i)).text()).number;
				qtyCnt			= fnOnlyNumber($(".span_stockqty", arrTr.eq(i)).text()).number;
				
				var totalCnt		= 0;
				var onePlusBuyCnt   = fnOnlyNumber($(".span_oneplus_buy_cnt", arrTr.eq(i)).text()).number;
				var onePlusGiveCnt  = fnOnlyNumber($(".span_oneplus_give_cnt", arrTr.eq(i)).text()).number;
				var isonePlusFlag   = onePlusBuyCnt > 0 && onePlusGiveCnt > 0 ? true : false;
				
				var dayoffStockqty  = fnOnlyNumber($(".span_dayoff_stockqty",arrTr.eq(i)).text()).number;
				var dayoffcd		= $(".span_dayoffcd",arrTr.eq(i)).text();
				
			    if(dayoffStockqty > 0 && dayoffcd !="undefined"){
			    	sale_price	= fnOnlyNumber($(".span_today_price", arrTr.eq(i)).text()).number;
				}
			    
			    if($("*[name='i_arrFlagBeauty']", arrTr.eq(i)).val() == "Y") {
			    	sale_price  = beauty_price;
			    }
			    
			    cnt				= fnOnlyNumber($("*[name='i_arrProductCnt']", arrTr.eq(i)).val()).number;
			    
			    var productcd   = $("*[name='i_arrProductcd']", arrTr.eq(i)).val();
			    
			    if(isonePlusFlag){
			    	
					var list = [];
					var onplus_sale_price = 0;
					
					var cnt_object     = $("input[name='i_arrProductCnt']");
					var product_object = $("input[name='i_arrProductcd']");
					var flagEvent	   = $("input[name='i_arrFlagEvent']");
					var price_object   = $(".span_price");
					var cntSize        = cnt_object.size();
					
					for(var j=0; j<cntSize; j++){
						
						var price_object_val = fnOnlyNumber(price_object.eq(j).text()).number;
						
						if(productcd == product_object.eq(j).val() && price == price_object_val){
							
							if(flagEvent.eq(j).val() == "Y"){
								totalCnt += parseInt(cnt_object.eq(j).val());								
							}
						}
						
					}
					
					if(product_temp != productcd || (pre_price_temp != price && product_temp == productcd)){
						preCnt_temp = 0;	
					}
					
					preCnt_temp += cnt;
					
					if(product_temp != productcd || (pre_price_temp != price && product_temp == productcd)){
						
						preCnt = 0;
						
					}else{
						
						preCnt = preCnt_temp - cnt; 
					}

					list.push({cnt: cnt, preCnt : preCnt, index : i});
					
					var obj = onePlusPriceResult(totalCnt, price, onePlusBuyCnt, onePlusGiveCnt, list);
			    	
					if(obj.length > 0) {
						
						for(var j=0; j<obj.length; j++) {
							
							onplus_sale_price += parseInt(obj[j].price * obj[j].cnt);
							
						}
						
					}
					
					product_temp   = productcd;
					pre_price_temp = price;
					
					$(".row_pay_price", arrTr.eq(i)).text(SetNumComma(onplus_sale_price));
					
					if(price * cnt == onplus_sale_price){
						
						$(".row_dis_price", arrTr.eq(i)).parents("dl").find(".sale").hide();
						$(".row_dis_price", arrTr.eq(i)).parents("dd").hide();
						
					}else{
						
						$(".row_dis_price", arrTr.eq(i)).parents("dl").find(".sale").show();
						$(".row_dis_price", arrTr.eq(i)).parents("dd").show();
						$(".row_dis_price", arrTr.eq(i)).text(SetNumComma(price * cnt));
						
					}
					
			    }else{
	
			    	$(".row_pay_price", arrTr.eq(i)).text(SetNumComma(sale_price * cnt));			    		
			    	$(".row_dis_price", arrTr.eq(i)).text(SetNumComma(price * cnt));	
			    	
			    }
			}
		}
		,
};
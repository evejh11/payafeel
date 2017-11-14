/**
 * Coding script
 */

var prodlistIscroller,
offset = 0;
var winW = $(window).width();
var $aw = 0;

/**
 * 모바일 상품목록의 이벤트 처리를 위한 Javascript
 */
var parameter = {
	i_iNowPageNo	: parseInt($('#i_iNowPageNo').val() || "1", 10),
	i_iPageSize		: parseInt($('#i_iPageSize').val() || "30", 10),
	i_iTotalPageCnt	: parseInt($('#i_iTotalPageCnt').val() || "1", 10),
	i_iRecordCnt	: parseInt($('#i_iRecordCnt').val() || "1", 10),
	i_sFlagPageInit	: "N",
	i_sCategorycd1	: $('#i_sCategorycd1').val(),
	i_sCategorycd2	: "",
	i_sCategorycd3	: "",
	i_sBrandcd		: "",
	i_sFlagBrand	: "",
	pageStack		: [],
	i_sPrdBrandcd	: "",
	i_sPrdSkin		: "",
	i_sPrdFeature	: "",
	i_sSelectSkin	: "",
	i_sSelectFeature: "",
	i_sPrdService	: "",
	i_sSelectService: "",
	i_sPrdPrice		: "",
	i_sSelectPrice	: "",
	i_sPrdFunc		: "",
	i_sSelectFunc	: "",
	i_sPrdPopular	: "",
	i_sPrdTrubleType : "",
	i_sSelectPrdTrubleType : "",
	i_sPrdTexture	: "",
	i_sOptMakeupeft	: "",
	i_sSelectMakeup	: "",
	i_sSaleSt		: "",
	i_sSaleEn		: "",
	i_sPriceSt		: "",
	i_sPriceEn		: "",
	i_sSpfSt		: "",
	i_sSpfEn		: "",
	i_sOptPA		: "",
	i_sRgb			: "",
	i_sFlagSort		: "",
	i_sFlagFilter	: "",
	i_sStatuscd		: "",
	i_sOptDeliveryTypecd : "",
	i_sOptSapstcd	: ""
};


////////// 상품 리스트 /////////////////
var MobileShopProductList1 = {
	name : "MobileShopProductList1",
	
	init : function() {
		MobileShopProductList1.fn.setSubMenuChange();
		MobileShopProductList1.fn.getPageInit();
		//MobileShopProductList1.fn.addScrollEvent(); //기존
		
		if(GLOBAL_FLAG_APP_NEW != 'Y'){
			MobileShopProductList1.fn.setScroll();
		}

	    $(".btn_sorticon").click(function() {
	    	var id  = $(this).attr("id");

	    	if (id == "list") {
	    		MobileShopProductList1.fn.resortList();
	    	} else {
	    		MobileShopProductList1.fn.resortAlbum();
	    	}
	    });
	},
	isLoadingPrdList : false,
	
	fn : {
		/**
		 * 버튼 제어를 위한 function
		 */
		addBtnEvent : function() {
			$(".btn_like").unbind("click").click(function(event){
				event.preventDefault();
				var idx = $(".btn_like").index($(this));
				var productcd  = $("input[name='i_arrProductcd']").eq(idx).val();
				var optioncd   = $("input[name='i_arrOptioncd']").eq(idx).val();
				var flagsolopack   = $("input[name='i_arrFlagSoloPack']").eq(idx).val();
				var flagreser   = $("input[name='i_arrFlagReser']").eq(idx).val();
				var cnt		   = 1;
				var productnm   = $("input[name='i_arrProductnm']").eq(idx).val();
				var brandnm   = $("input[name='i_arrBrandnm']").eq(idx).val();
				var categorycd = $("input[name='i_arrCategorycd']").eq(idx).val();
				var list_price = $("input[name='i_arrListPrice']").eq(idx).val();
				var price = $("input[name='i_arrPrice']").eq(idx).val();
				var brandcd   = $("input[name='i_arrBrandcd']").eq(idx).val();
				
				if(flagreser == "Y"){
					showConfirmBox({
						message : "이 상품은 상세페이지에서 예약 가능해요!<br/>이동하시겠어요?"
						, ok_func : function(){
							MobileBodyStart.goProductDetail(productcd);
//							location.href = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+productcd;
						} 
					});
				}
				else if(productcd == "SPR20170124000026690"){
					showMessageBox({
						message : "현재 이 상품은 위시리스트에 담으실 수 없습니다!"
						, close : function(){
							return ;
						}
					});
				}
				else{
					if(IS_LOGIN) {
						
						var list = [];
						
						list.push({
							productcd : productcd
							, optioncd : optioncd
							, cnt : cnt
							, flagSoloPack : flagsolopack
							, productnm : productnm
							, brandnm : brandnm
						});
							
						
						//SmartOffer - 개인화 추천 태깅 (위시리스트 담기)
                    	try{
            	        	var wishList = [];
    		        		wishList.push({
    		        			  ITEM_VALUE : productcd
    			    			, name : productnm
    			    			, brand  : brandcd
    			    			, category : categorycd
    			    			, price : list_price
    			    			, qty   : 1
    			    			, prodOptionCode : optioncd
    			    			, discountPrice : price
    		        		});
    		        		wishListTagEvent(wishList,'MOBILE');
                    	}catch(e){}
						
						MobileBodyStart.addUserWish({
							list : list
							, sourceFlag : "BLANK"
							, flagSoloPack : $(".span_soloPack").text()
							, callback : function(){
								showConfirmBox({
									message : "위시리스트에 상품을 담았습니다.",
									ok_str  : "위시리스트로 이동",
									cancel_str : "계속 쇼핑하기",
									flag : "wishlist",
									ok_func : function(){
										location.href=GLOBAL_WEB_URL+"mobile/my/mobile_my_wish_list.do";
									}
								});
							}						
						});
						
					} 
					else if(IS_LOGIN_SNS){
						var list = [];
	
						list.push({
							productcd : productcd
							, optioncd : optioncd
							, cnt : cnt
							, flagSoloPack : flagsolopack
							, productnm : productnm
							, brandnm : brandnm
						});
							
						
						MobileBodyStart.addUserWish({
							list : list
							, sourceFlag : "BLANK"
							, flagSoloPack : $(".span_soloPack").text()
							, callback : function(){
								showConfirmBox({
									message : "위시리스트에 상품을 담았습니다.",
									ok_str  : "위시리스트로 이동",
									cancel_str : "계속 쇼핑하기",
									flag : "wishlist",
									ok_func : function(){
										location.href=GLOBAL_WEB_URL+"mobile/my/mobile_my_wish_list.do";
									}
								});
							}						
						});
					}
					else {
						var options = {
							type : "reload"	
						};
						MobileBodyStart.fnLoginCheck(options);
					}
				}
//				if(productcd == "SPR20160426000017893"){
//					showMessageBox({
//						message : "현재 이 상품은 위시리스트에 담으실 수 없습니다!"
//						, close : function(){
//							return ;
//						}
//					});
//				}else{
					
//				}
			});
			
			$(".btn_cart").unbind("click").click(function(event){
				event.preventDefault();
				var idx = $(".btn_cart").index($(this));
				var productcd = $("input[name='i_arrProductcd']").eq(idx).val();
				var optioncd = $("input[name='i_arrOptioncd']").eq(idx).val();
				var solopack = $("input[name='i_arrFlagSoloPack']").eq(idx).val();
				var flagreser = $("input[name='i_arrFlagReser']").eq(idx).val();
				var productnm = $("input[name='i_arrProductnm']").eq(idx).val();
				var brandnm = $("input[name='i_arrBrandnm']").eq(idx).val();
				var price = $("input[name='i_arrPrice']").eq(idx).val();
				var list_price = $("input[name='i_arrListPrice']").eq(idx).val();
				var categorycd = $("input[name='i_arrCategorycd']").eq(idx).val();
				var brandcd   = $("input[name='i_arrBrandcd']").eq(idx).val();
				
				if(flagreser == "Y"){
					showConfirmBox({
						message : "이 상품은 상세페이지에서 예약 가능해요!<br/>이동하시겠어요?"
						, ok_func : function(){
							MobileBodyStart.goProductDetail(productcd);
//							location.href = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+productcd;
						} 
					});
				}
				else if(productcd == "SPR20170124000026690"){
					showMessageBox({
						message : "현재 이 상품은 장바구니에 담으실 수 없습니다!"
						,close : function(){
							return ;
						}
					});
				}
				else{
					var list = [{
						productcd : productcd
						, optioncd : optioncd
						, cnt : 1
						, flagSoloPack : solopack
					}];
					
					//SmartOffer - 개인화 추천 태깅 (장바구니 담기)
                	try{
        	        	var cartList = [];
        	        	cartList.push({
        	        		  ITEM_VALUE : productcd
			    			, name : productnm
			    			, brand  : brandcd
			    			, category : categorycd
			    			, price : list_price
			    			, qty   : 1
			    			, prodOptionCode : optioncd
			    			, discountPrice : price
		        		});        		        	
        	        	cartListTagEvent(cartList,'MOBILE');
                	}catch(e){}
                	
					MobileBodyStart.addUserCart({
						list : list
						, callback : function(){
							var str = brandnm + ";" + productnm +";;;event54=1|event55="+price+";eVar31="+ productcd;
        					str = str.replace(/&/gi,"_");
        					
							try{trackPurchaseClick(str,'scAdd,event54,event55');}catch(e){}
							
							var target = "#balloonBasket";
							
							var winW = $(window).width();
							var winH = $(window).height();
							
							var lyW = $(target).width();
							var lyH = $(target).height();
							
							var scrollTop = $(window).scrollTop();
							var scrollLeft = $(window).scrollLeft();
							
							var eLeft = ((winW - lyW) / 2);
							var eTop = ((winH - lyH) / 2) + scrollTop;
							
							$(target).css({
								"left": eLeft + "px",
								"top" : eTop + "px"
							});
							
							$(target).show();
							setTimeout(function(){$(target).addClass("active");}, 800);
							setTimeout(function(){$(target).removeClass('active').hide();},1200);
						}
					});
				}
//				if(productcd =="SPR20160426000017893"){
//					showMessageBox({
//						message : "현재 이 상품은 장바구니에 담으실 수 없습니다!"
//						,close : function(){
//							return ;
//						}
//					});
//				}else{
					
//				}
				
			});
			$(".btn_nowBuy").unbind("click").click(function(event){
				event.preventDefault();
				var idx = $(".btn_nowBuy").index($(this));
				var productcd = $("input[name='i_arrProductcd']").eq(idx).val();
				var optioncd = $("input[name='i_arrOptioncd']").eq(idx).val();
				var solopack = $("input[name='i_arrFlagSoloPack']").eq(idx).val();
				var flagreser = $("input[name='i_arrFlagReser']").eq(idx).val();
				var productnm = $("input[name='i_arrProductnm']").eq(idx).val();
				var brandnm = $("input[name='i_arrBrandnm']").eq(idx).val();
				var price = $("input[name='i_arrPrice']").eq(idx).val();
				var list_price = $("input[name='i_arrListPrice']").eq(idx).val();
				var categorycd = $("input[name='i_arrCategorycd']").eq(idx).val();
				var brandcd   = $("input[name='i_arrBrandcd']").eq(idx).val();
				var flag = $(this).hasClass("soldout");
				
				if(flagreser == "Y"){
					showConfirmBox({
						message : "이 상품은 상세페이지에서 예약 가능해요!<br/>이동하시겠어요?"
						, ok_func : function(){
							MobileBodyStart.goProductDetail(productcd);
//							location.href = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+productcd;
						} 
					});
				}
				else if(productcd == "SPR20170124000026690"){
					showMessageBox({
						message : "이 상품은 상품상세에서 바로구매로 구매가능하세요!"
					});
				}
				else if(flag){
                    //일시품절일 경우 아무 동작하지 않음
                }
				else{
					if(IS_LOGIN){
						var list = [{
							productcd : productcd
							, optioncd : optioncd
							, cnt : 1
							, flagSoloPack : solopack
						}];
						
						//SmartOffer - 개인화 추천 태깅 (바로 구매)
	                	try{
	        	        	var orderList = [];
	        	        	orderList.push({
	        	        		  ITEM_VALUE : productcd
				    			, name : productnm
				    			, brand  : brandcd
				    			, category : categorycd
				    			, price : list_price
				    			, qty   : 1
				    			, prodOptionCode : optioncd
				    			, discountPrice : price
			        		});        		        	
	        	        	orderListTagEvent(orderList,'PC');
	                	}catch(e){}
	                	
						MobileBodyStart.addUserCart({
							list : list
							, callback : function(){
								location.href= GLOBAL_WEB_URL+"mobile/cart/mobile_cart_cart_list.do";
							}
						});
					}else{
						if(IS_LOGIN_SNS){
							var list = [{
								productcd : productcd
								, optioncd : optioncd
								, cnt : 1
								, flagSoloPack : solopack
							}];
							
							MobileBodyStart.addUserCart({
								list : list
								, callback : function(){
									location.href= GLOBAL_WEB_URL+"mobile/cart/mobile_cart_cart_list.do";
								}
							});
						}else{
							showConfirmBox({
								message : "로그인 후 구매하시면<br/>쿠폰과 포인트로<br/>알뜰한 쇼핑 가능하세요!"
									,ok_str  : "로그인 구매"
										,ok_func : function(){
											MobileBodyStart.goLogin();
										}
							,cancel_str : "비로그인 구매"
								,cancel_func : function(){
									var list = [{
										productcd : productcd
										, optioncd : optioncd
										, cnt : 1
										, flagSoloPack : solopack
									}];
									
									MobileBodyStart.addUserCart({
										list : list
										, callback : function(){
											location.href= GLOBAL_WEB_URL+"mobile/cart/mobile_cart_cart_list.do";
										}
									});
								}
							});
						}
					}
				}
				
			});
			$(".btn_filter").unbind("click").click(function(event) {
				/*event.preventDefault();
				var frm = $("form[name='frm']");
				if (GLOBAL_FLAG_APP_NEW == "Y") {
					try {
						if(GLOBAL_MOBILE_OS == "AND") {
							MobileBodyStart.setLoginUserInfo();
						}
						else {
							window.webkit.messageHandlers.requestUserInfo.postMessage(null);
						}
					}catch(e){
						console.log(e);
					}
					var arrParam = [];
					if(GLOBAL_LOGIN_KEY != "") {
						$("input[name='i_sLoginKey']", frm).remove();
						arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
					}
					if(GLOBAL_LOGIN_TYPE != "") {
						$("input[name='i_sLoginType']", frm).remove();
						arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
					}
					$("input[name='i_sDeviceNum']", frm).remove();
					arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
					$(arrParam.join("")).appendTo(frm);
				}
				frm.attr("action", "/mobile/shop/mobile_shop_product_list.do");  
				frm.submit();*/
				//기존소스 2017/10/20
				MobileShopSearchFilter1.fn.getFilterList(); //새로 추가 2017/10/20
			});
			
			$(".btn_filter_del").unbind("click").click(function(event) {
				event.preventDefault();
				var tagid = $(this).attr("id").split("/")[0];
				var tagcd = $(this).attr("id").split("/")[1];
				
				showConfirmBox({
					message : "해당 필터를 검색조건에서 제외하시겠어요?"
					, ok_func : function() {
						if(tagcd == "feature") {
							$('input:checkbox[name="i_sPrdFeature"]').each(function() {
							      if(this.value ==tagid){//checked 처리된 항목의 값
							          //alert(tagid);  
							    	  this.checked = false; 
							    	  $("#span_"+""+tagid).removeClass("chkbox chked").addClass("chkbox unchked");
							      }
							});
							
							/*var prd_feature = $(".i_sPrdFeature").val().replace(tagid+";", "");
							$(".i_sPrdFeature").val(prd_feature);
							
							var num = getProdBitFilter(prd_feature, "i_sPrdFeature");
							$(".i_sSelectFeature").val(num);*/
						} /*else if(tagcd == "skin") {
							var prd_skin = $(".i_sPrdSkin").val().replace(tagid+";", "");
							$(".i_sPrdSkin").val(prd_skin);
							
							var num = getProdBitFilter(prd_skin, "i_sPrdSkin");
							$(".i_sSelectSkin").val(num);
						}*/ else if(tagcd == "price") {
							$('input:checkbox[name="i_sPrdPrice"]').each(function() {
							      if(this.value ==tagid){//checked 처리된 항목의 값
							          //alert(tagid);  
							    	  this.checked = false; 
							    	  $("#span_"+""+tagid).removeClass("chkbox chked").addClass("chkbox unchked");
							      }
							});
							
							/*var prd_price = $(".i_sPrdPrice").val().replace(tagid+";", "");
							$(".i_sPrdPrice").val(prd_price);
							
							var num = getProdBitFilter(prd_price, "i_sPrdPrice");
							$(".i_sSelectPrice").val(num);*/
						} 
						/*else if(tagcd == "popular") {
							var prd_popular = $(".i_sPrdPopular").val().replace(tagid+";", "");
							$(".i_sPrdPopular").val(prd_popular);
						}*/ 
						else if(tagcd == "service") {
							$('input:checkbox[name="i_sPrdService"]').each(function() {
							      if(this.value ==tagid){//checked 처리된 항목의 값
							          //alert(tagid);  
							    	  this.checked = false;
							    	  $("#span_"+""+tagid).removeClass("chkbox chked").addClass("chkbox unchked");
							      }
							});
							
							/*var prd_service = $(".i_sPrdService").val().replace(tagid+";", "");
							$(".i_sPrdService").val(prd_service);
							
							var num = getProdBitFilter(prd_service, "i_sPrdService");
							$(".i_sSelectService").val(num);*/
						} else if(tagcd == "func") {
							$('input:checkbox[name="i_sPrdFunc"]').each(function() {
							      if(this.value ==tagid){//checked 처리된 항목의 값
							          //alert(tagid);  
							    	  this.checked = false; 
							    	  $("#span_"+""+tagid).removeClass("chkbox chked").addClass("chkbox unchked");
							      }
							});
							
							/*var prd_func = $(".i_sPrdFunc").val().replace(tagid+";", "");
							$(".i_sPrdFunc").val(prd_func);
							
							var num = getProdBitFilter(prd_func, "i_sPrdFunc");
							$(".i_sSelectFunc").val(num);*/
						} /*else if(tagcd == "trouble") {
							var prd_trouble = $(".i_sPrdTrubleType").val().replace(tagid+";", "");
							$(".i_sPrdTrubleType").val(prd_trouble);
							
							var num = getProdBitFilter(prd_trouble, "i_sPrdTrubleType");
							$(".i_sSelectPrdTrubleType").val(num);
						} else if(tagcd == "texture") {
							var prd_texture = $(".i_sPrdTexture").val().replace(tagid+";", "");
							$(".i_sPrdTexture").val(prd_texture);
						} else if(tagcd == "makeup") {
							var prd_makeup = $(".i_sOptMakeupeft").val().replace(tagid+";", "");
							$(".i_sOptMakeupeft").val(prd_makeup);
							
							var num = getProdBitFilter(prd_makeup, "i_sOptMakeupeft");
							$(".i_sSelectMakeup").val(num);
						}*/ else if(tagcd == "brand") {
							 $('input:checkbox[name="i_arrBrandcd"]').each(function() {
							      if(this.value ==tagid){//checked 처리된 항목의 값
							          //alert(tagid);  
							    	  this.checked = false; 
							    	  $("#span_"+""+tagid).removeClass("chkbox chked").addClass("chkbox unchked");
							      }
							 });
							//var prd_brandcd = $(".i_sPrdBrandcd").val().replace(tagid+";", "");
							//$(".''").val(prd_brandcd);
						} /*else if(tagcd == "pa") {
							var prd_pa = $(".i_sOptPA").val().replace(tagid+";", "");
							$(".i_sOptPA").val(prd_pa);
						} else if(tagcd == "status") {
							$(".i_sStatuscd").val("");
						} else if(tagcd == "delivery") {
							$(".i_sOptDeliveryTypecd").val("");
						} else if(tagcd == "sapstcd") {
							$(".i_sOptSapStcd").val("");
						}*/
						
						$(this).remove();
						
						parameter.i_sFlagPageInit = "Y";
						parameter.pageStack = new Array();
						//MobileShopProductList1.fn.getShoppingProductList(1); //기존
						
						fn_filterItems(1); //신규
					}
				});
			});
			
			$(".btn_range_del").unbind("click").click(function(event) {
				event.preventDefault();
				var id = $(this).attr("id");
				
				showConfirmBox({
					message : "해당 필터를 검색조건에서 제외하시겠어요?"
					, ok_func : function() {
						if(id == "price") {
							$(".i_sPriceSt").val("");
							$(".i_sPriceEn").val("");
						} else if(id == "sale") {
							$(".i_sSaleSt").val("");
							$(".i_sSaleEn").val("");
						} else if(id == "spf") {
							$(".i_sSpfSt").val("");
							$(".i_sSpfEn").val("");
						}
						
						$(this).remove();
						parameter.i_sFlagPageInit = "Y";
						parameter.pageStack = new Array();
						MobileShopProductList1.fn.getShoppingProductList(1);
					}
				});
			});
			
			$(".btn_category").unbind("click").click(function(event) {
				event.preventDefault();
				//parameter.i_sCategorycd1 = $("#i_sCategorycd1").val(); //추가
				//parameter.i_sCategorycd2 = $("#i_sCategorycd2").val();  //추가
				
				var id = $(this).attr("id") == "ALL" ? "" : $(this).attr("id");
				
				$(".btn_category").removeClass("on");
				$(this).addClass("on");
				
				var level = $(this).attr("level");
				
				if(level == 1) {
					parameter.i_sCategorycd1 = id;
					$("input[name='i_sCategorycd1']").val(id);
				} else if(level == 2) {
					parameter.i_sCategorycd2 = id;
					$("input[name='i_sCategorycd2']").val(id);
				} else if(level == 3) {
					parameter.i_sCategorycd3 = id;
					$("input[name='i_sCategorycd3']").val(id);
				}
				
				parameter.i_sFlagPageInit = "N";
				
				parameter.pageStack = new Array();
				//MobileShopProductList1.fn.getShoppingProductList(1);
				
				fn_filterItems(1);
				
			});
			// 상품 상세 페이지 이동
			$(".prod_item a").unbind("click").click(function(event) {
				event.preventDefault();
				MobileBodyStart.goProductDetail($(this).attr("id"));

//				var id = $(this).attr("id");
//				location.href = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd=" + id;
			});
			
			$(".select_sort").unbind("change").change(function(event) {
				event.preventDefault();
				var value = $(this).val();
				$("input[name='i_sFlagSort']").val(value);
				
				parameter.i_sFlagSort = value;
				
				MobileShopProductList1.fn.getShoppingProductList(1);
			});
		},
		/**
		 * 스크롤 더보기를 위한 function
		 */
		addScrollEvent : function() {
			$(window).bind("scroll", function(event) {
				if(!MobileShopProductList1.isLoadingPrdList && ($(window).scrollTop() >= ($(document).height() - $(window).height() - 600) )&& 
						parameter.i_iNowPageNo < parameter.i_iTotalPageCnt && parameter.i_iRecordCnt > $(".prod_item").size() &&
						$(".prod_item").size() > 0) {
					
					if(MobileShopProductList1.isLoadingPrdList) {
						return;
					}
					
					MobileShopProductList1.isLoadingPrdList = true;
					
					showScrollLoadingBox($(".div_spinArea"));
					
					var result = parameter.pageStack[0];
					
					for(var i in parameter.pageStack) {
						if(parseInt(result) < parseInt(parameter.pageStack[i])) {
							result = parameter.pageStack[i];
						}
					}
					
					parameter.i_iNowPageNo = parseInt(result) + 1;
					
					parameter.i_sFlagPageInit = "N";
					setTimeout(function() {
						//MobileShopProductList1.fn.getShoppingProductList(parameter.i_iNowPageNo); //기존
						
						fn_filterItems(parameter.i_iNowPageNo); //신규
					}, 1000);
				} else if(!MobileShopProductList1.isLoadingPrdList && $(window).scrollTop() == 0 &&
					parameter.i_iNowPageNo > 1 && parameter.i_iRecordCnt > 0 &&
					$(".prod_item").size() > 0) {
					showScrollLoadingBox($(".div_spinArea"));
					
					var result = parameter.pageStack[0];
					for(var i in parameter.pageStack) {
						if(parseInt(result) > parseInt(parameter.pageStack[i])) {
							result = parameter.pageStack[i];
						}
					}
					
					if(parseInt(result) > 1) {
						parameter.i_iNowPage = parseInt(result) - 1;
						
						parameter.i_sFlagPageInit = "N";
						//MobileShopProductList1.fn.getShoppingProductList(parameter.i_iNowPageNo); //기존
						
						fn_filterItems(parameter.i_iNowPageNo); //신규
					}
				}
			});
		},
		/**
		 * 서브메뉴 이벤트 function
		 */
		setSubMenuChange : function() {
			
			$(".option", ".nav_mcate").unbind("click").click(function(event) {
				event.preventDefault();
				var val = $(this).val();
				var ucategory = $(this).attr("ucategory");
				if($("input[name='i_sFlagBrand']").val() == "Y") {
					location.href	= GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_list.do?i_sFlagBrand=Y&i_sBrandcd=" + val;
				} else {
					if($(this).hasClass("option_depth1")) {
						location.href	= GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_list.do?i_sFlagCategory=Y&i_sCategorycd1=" + val;
					} else if($(this).hasClass("option_depth2")) {
						location.href	= GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_list.do?i_sFlagCategory=Y&i_sCategorycd1=" + ucategory + "&i_sCategorycd2=" +val;
					} else{
						location.href	= GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_list.do?i_sFlagCategory=Y&i_sCategorycd1=" + ucategory + "&i_sCategorycd3=" +val + "&i_sCushionZone=Y";
					}
				}
			});
		},
		setParameter : function() {
			parameter.i_sCategorycd1 = $("#i_sCategorycd1").val();
			parameter.i_sCategorycd2 = $("#i_sCategorycd2").val();
			parameter.i_sCategorycd3 = $("#i_sCategorycd3").val();
			parameter.i_sFlagBrand = $("#i_sFlagBrand").val();
			parameter.i_sBrandcd = $("#i_sBrandcd").val();
			
			parameter.i_sPrdSkin = $(".i_sPrdSkin").val();
			parameter.i_sPrdFeature = $(".i_sPrdFeature").val();
			parameter.i_sSelectSkin = $(".i_sSelectSkin").val();
			parameter.i_sSelectFeature = $(".i_sSelectFeature").val();
			parameter.i_sPrdService = $(".i_sPrdService").val();
			parameter.i_sSelectService = $(".i_sSelectService").val();
			parameter.i_sPrdPrice = $(".i_sPrdPrice").val();
			parameter.i_sSelectPrice = $(".i_sSelectPrice").val();
			parameter.i_sPrdFunc = $(".i_sPrdFunc").val();
			parameter.i_sSelectFunc = $(".i_sSelectFunc").val();
			parameter.i_sPrdPopular = $(".i_sPrdPopular").val();
			parameter.i_sPrdTrubleType = $(".i_sPrdTrubleType").val();
			parameter.i_sSelectPrdTrubleType = $(".i_sSelectPrdTrubleType").val();
			parameter.i_sPrdTexture = $(".i_sPrdTexture").val();
			parameter.i_sOptMakeupeft = $(".i_sOptMakeupeft").val();
			parameter.i_sSelectMakeup = $(".i_sSelectMakeup").val();
			parameter.i_sPrdBrandcd = $(".i_sPrdBrandcd").val();
			parameter.i_sSaleSt = $(".i_sSaleSt").val();
			parameter.i_sSaleEn = $(".i_sSaleEn").val();
			parameter.i_sPriceSt = $(".i_sPriceSt").val();
			parameter.i_sPriceEn = $(".i_sPriceEn").val();
			parameter.i_sSpfSt = $(".i_sSpfSt").val();
			parameter.i_sSpfEn = $(".i_sSpfEn").val();
			parameter.i_sOptPA = $(".i_sOptPA").val();
			parameter.i_sRgb = $(".i_sRgb").val();
			parameter.i_sFlagFilter = $("input[name='i_sFlagFilter']").val();
			parameter.i_sStatuscd = $(".i_sStatuscd").val();
			parameter.i_sOptDeliveryTypecd = $(".i_sOptDeliveryTypecd").val();
			parameter.i_sOptSapStcd = $(".i_sOptSapStcd").val();
			parameter.i_sFlagSort = $("input[name='i_sFlagSort']").val();
		},
		/**
		 * 최초 페이지 로딩 시 실행 function
		 */
		getPageInit : function() {
			
			fn_filterItems(1); //신규
			/*if(MobileShopProductList1.isLoadingPrdList) {
				return;
			}
			
			MobileShopProductList1.isLoadingPrdList = true;
			
			parameter.i_sFlagPageInit = "Y";
			MobileShopProductList1.fn.setParameter();
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_list_ajax.do",
				type : "POST",
				dataType : "json",
				data : parameter,
				animation : true,
				isModalEnd : true,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						
						MobileShopProductList1.isLoadingPrdList = false;
						MobileShopProductList1.fn.setShopProductList(data.object);
						
						var shop = data.object.shopprd;
						if($.inArray(parseInt(shop.page.i_iNowPageNo), parseInt(parameter.pageStack)) == -1) {
							parameter.pageStack.push(shop.page.i_iNowPageNo);
						}
						
						if($("#i_sBrandcd").val() != "") {
							var youtubeList = data.object.youtubeList;
							
							MobileShopProductList1.fn.setYoutubeList(youtubeList);
						} else {
							$(".brandGallSec").remove();
						} 2017/10/20
						
						MobileShopProductList1.fn.addBtnEvent();
					} else {
						alert(data.message);
					}
				}
			});*/
		},
		setYoutubeList : function(youtubeList) {
			if(youtubeList != undefined && youtubeList.length > 0) {
				var arrHtml = [];
				var arrNavi = [];
				
				var active = "";
				for(var i=0; i<youtubeList.length; i++) {
					if(i == 0) {
						active = "active";
					} else {
						active = "";
					}
					
					var row = youtubeList[i];
					arrHtml.push("<div>");
					arrHtml.push("	<a href=\"#\" data-src=\""+row.v_youtubeid+"\">");
					arrHtml.push("		<span class=\"btn_mvplay\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"content/btn_mvplay.png\" alt=\"\" /></span>");
					arrHtml.push("		<img src=\"http://img.youtube.com/vi/"+row.v_youtubeid+"/0.jpg\" alt=\""+row.v_title+"\" />");
					arrHtml.push("	</a>");
					arrHtml.push("</div>");
					
					arrNavi.push("<span class=\""+active+"\" style=\"margin-right:2px;\"><span class=\"hide\">"+parseInt(i+1)+"</span></span>");
				}
				
				$(".brandGallery-wrap").html(arrHtml.join(""));
				$(".brandGallery-nav").html(arrNavi.join(""));
				
				$.mvURL = function(data) {
                    mvUrl = (
                            '<iframe class="remove" src="http://www.youtube-nocookie.com/embed/'+data+'?wmode=transparent" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
                    );
                };
				
				window.brandGallerySwipe = new Swipe(document.getElementById('brandGallerySwipe'), {
                    continuous: true,
                    stopPropagation: true,
                    callback: function(event, element) {
                        $(".brandGallery-nav > span").removeClass().eq(event).addClass("active");
                        $(".videoFrm").remove();
                    }
                });
                $(".brandGallery-wrap > div > a").unbind("click").click(function(event){
                	event.preventDefault();
                	
                    var data = $(this).attr('data-src');
                    var target = $(this).parent();
                    $.mvURL(data);
                    $("<div class='videoFrm'>"+ mvUrl +"</div>").clone().prependTo(target);
                    return false;
                });
                $(".btnPrev").unbind("click").click(function(event){
                	event.preventDefault();
                	
                    brandGallerySwipe.prev();
                    return false;
                });
                $(".btnNext").unbind("click").click(function(event){
                	event.preventDefault();
                	
                    brandGallerySwipe.next();
                    return false;
                });
			} else {
				$(".brandGallSec").remove();
			}
		},
		/**
		 * 상품목록 ajax function
		 * @param i_iNowPageNo : 현재 페이지
		 */
		getShoppingProductList : function(i_iNowPageNo) {
			parameter.i_iNowPageNo  = i_iNowPageNo;
			var i_arrBrandcd= new Array();
			$("input[name='i_arrBrandcd']:checked").each(function(i){
				i_arrBrandcd.push($(this).val());
			}); 
			parameter.i_sPrdBrandcd = i_arrBrandcd; //브랜드
			//parameter.i_sPrdService = i_sPrdService; //서비스
			//parameter.i_sPrdFeature = i_sPrdFeature; //특징
			//parameter.i_sPrdPrice = i_sPrdPrice; //쇼핑찬스
			//parameter.i_sPrdFunc = i_sPrdFunc; //기능성
			parameter.i_sFlagPageInit = "Y";
			
			MobileShopProductList1.fn.setParameter();
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_category_product_list_ajax.do",
				type : "POST", 
				dataType : "json",
				data : parameter,
				animation : false,
				isModalEnd : false,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						
						MobileShopProductList1.isLoadingPrdList = false;
						MobileShopProductList1.fn.setShopProductList(data.object);
						
						var shop = data.object.shopprd;
						
						if($.inArray(parseInt(shop.page.i_iNowPageNo), parseInt(parameter.pageStack)) == -1) {
							parameter.pageStack.push(shop.page.i_iNowPageNo);
						}
						
						MobileShopProductList1.fn.addBtnEvent();
						hideScrollLoadingBox();
					} else {
						showMessageBox({
              				message : data.message
              			});
					}
				}, error : function() {
					MobileShopProductList1.isLoadingPrdList = false;
				}
			});
		},
		/**
		 *  loazy loding 이미지 로딩
		 */
		lazyLoading : function() {
			$("img.lazy").lazyload({
				event: "scrollstop",
				threshold : 600
			});
		},
		/**
		 * 리턴된 데이터를 이용해 화면에 뿌리는 function
		 * @param object : ajax 리턴된 데이터
		 */
		setShopProductList : function(object) {
			var arrHtml = [];
			
			var brand = object.brand;
			var feature = object.feature;
			var skin = object.skin;
			var popular = object.popular;
			var price = object.price;
			var service = object.service;
			var func = object.func;
			var trouble = object.trouble;
			var texture = object.texture;
			var makeup = object.makeup;
			var pa = object.pa;
			var cate = object.category;
			var list = object.shopprd.list;
			var page = object.shopprd.page;
			
			var brandnm = object.brandnm;
			var ctgnm = object.ctgnm;
			
			$('#i_iNowPageNo').val(page.i_iNowPageNo);
			$('#i_iTotalPageCnt').val(page.i_iTotalPageCnt);
			$('#i_iRecordCnt').val(page.i_iRecordCnt);
			
			try {
				if(brandnm != undefined && brandnm != "") {
					PAGE_TAG.PAGE_NAME = "HOME^"+brandnm;
				} else if(ctgnm != undefined && ctgnm != "") {
					PAGE_TAG.PAGE_NAME = "HOME^"+ctgnm;
				} else {
					PAGE_TAG.PAGE_NAME = "HOME^상품";
				}
			} catch(e) {}
			
			parameter.i_iNowPage = page.i_iNowPageNo;
			parameter.i_iTotalPageCnt = page.i_iTotalPageCnt;
			parameter.i_iRecordCnt = page.i_iRecordCnt;
			
			var arrParam = [];
			if(feature != undefined && feature.length > 0) {
				for(var i=0; i<feature.length; i++) {
					//arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+feature[i].v_sub_code1+"/feature\">"+feature[i].v_sub_codenm+"</a>");
					arrParam.push("<span class='item'>"+feature[i].v_sub_codenm+"<button type='button' id=\""+feature[i].v_sub_code1+"/feature\" class='btn_filter_del'><i class='i-sort close'>필터조건 삭제</i></button></span>");
				}
			}

			if(service != undefined && service.length > 0) {
				for(var i=0; i<service.length; i++) {
					//arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+service[i].v_sub_code1+"/service\">"+service[i].v_sub_codenm+"</a>");
					arrParam.push("<span class='item'>"+service[i].v_sub_codenm+"<button type='button' id=\""+service[i].v_sub_code1+"/service\" class='btn_filter_del'><i class='i-sort close'>필터조건 삭제</i></button></span>");
				}
			}

			if(price != undefined && price.length > 0) {
				for(var i=0; i<price.length; i++) {
					//arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+price[i].v_sub_code1+"/price\">"+price[i].v_sub_codenm+"</a>");
					arrParam.push("<span class='item'>"+price[i].v_sub_codenm+"<button type='button' id=\""+price[i].v_sub_code1+"/price\" class='btn_filter_del'><i class='i-sort close'>필터조건 삭제</i></button></span>");
				}
			}
			
			if(brand != undefined && brand.length > 0) {
				//$(".i_sPrdBrandcd").val(i_sPrdBrandcd);
				for(var i=0; i<brand.length; i++) {
					//arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\" id=\""+brand[i].v_brandcd+"/brand\">"+brand[i].v_brandnm+"</a>");
					arrParam.push("<span class='item'>"+brand[i].v_brandnm+"<button type='button' id=\""+brand[i].v_brandcd+"/brand\" class='btn_filter_del'><i class='i-sort close'>필터조건 삭제</i></button></span>");
				}
			}

			if(func != undefined && func.length > 0) {
				for(var i=0; i<func.length; i++) {
					//arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\""+func[i].v_sub_code1+"/func\">"+func[i].v_sub_codenm+"</a>");
					arrParam.push("<span class='item'>"+func[i].v_sub_codenm+"<button type='button' id=\""+func[i].v_sub_code1+"/func\" class='btn_filter_del'><i class='i-sort close'>필터조건 삭제</i></button></span>");
				}
			}
			
			var statuscd = $(".i_sStatuscd").val();
			if(statuscd != undefined && statuscd != "") {
				arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\"  id=\"0002/status\">일시품절</a>");
			}
			
			//$(".div_checked").html(arrParam.join("")); 기존
			$("#selectedItems").html(arrParam.join("")); //필터 적용 항목 표시되는 곳
			
			if(parameter.i_sFlagPageInit == "Y" && GLOBAL_FLAG_APP_NEW != 'Y') {
				/*var arrCate = [];
				if(cate != undefined && cate.length > 0) {
					if(parameter.i_sFlagBrand == "Y") {
						var categorycd1 = $("input[name='i_sCategorycd1']").val();
						
						arrCate.push("<li class=\"btn_category "+((categorycd1 == "" || categorycd1 == "ALL") ? "active" : "")+"\" id=\"ALL\"><a href=\"#\">전체<span>("+cate[0].n_total_cnt+")</span></a></li>");
						for(var i=0; i<cate.length; i++) {
							arrCate.push("<li class=\"btn_category "+(categorycd1 == cate[i].v_categorycd ? "active" : "")+"\" id=\""+cate[i].v_categorycd+"\"><a href=\"#\">"+cate[i].v_categorynm+"<span>("+cate[i].n_cnt+")</span></a></li>");
						}
					} else {
						var categorycd2 = $("input[name='i_sCategorycd2']").val();
						
						arrCate.push("<li class=\"btn_category "+((categorycd2 == "" || categorycd2 == "ALL") ? "active" : "")+"\" id=\"ALL\"><a href=\"#\">전체<span>("+cate[0].n_total_cnt+")</span></a></li>");
						for(var i=0; i<cate.length; i++) {
							arrCate.push("<li class=\"btn_category "+(categorycd2 == cate[i].v_categorycd ? "active" : "")+"\" id=\""+cate[i].v_categorycd+"\"><a href=\"#\">"+cate[i].v_categorynm+"<span>("+cate[i].n_cnt+")</span></a></li>");
						}
					}
					
					arrCate.push("<li class=\"btn_category\" id=\"ALL\" level=\""+cate[0].n_level+"\"><a href=\"#\">전체<span>("+cate[0].n_total_cnt+")</span></a></li>");
					for(var i=0; i<cate.length; i++) {
						arrCate.push("<li class=\"btn_category\" id=\""+cate[i].v_categorycd+"\" level=\""+cate[i].n_level+"\"><a href=\"#\">"+cate[i].v_categorynm+"<span>("+cate[i].n_cnt+")</span></a></li>");
					}
					
					$(".prodCategoryList").html(arrCate.join(""));
					var nowCategory = $("input[name='i_sCategorycd"+cate[0].n_level+"']").val();
					
					if(nowCategory != "") {
						$("#"+nowCategory).addClass("active");
					} else {
						$("#ALL").addClass("active");
					}
					
					MobileShopProductList1.fn.addCategoryStyleEvent();
				}*/
				
				var arrCate = [];
				if(cate != undefined && cate.length > 0) {
					for(var i=0; i<cate.length; i++) {
						arrCate.push('<li class="btn_category" id="'+cate[i].v_categorycd+'" level="'+cate[i].n_level+'"><a href="#">'+cate[i].v_categorynm+'('+cate[i].n_cnt+')</a></li>');
					}
					$(".nav_scate ul").html(arrCate.join(""));
					
					var nowCategory = $("input[name='i_sCategorycd"+cate[0].n_level+"']").val();
					
					if(nowCategory != "") {
						$("#"+nowCategory).addClass("on");
					} else {
						
					}
				}
			}
			
			var criArr = new Array();
			if(list != undefined && list.length > 0) {
				for(var i=0; i<list.length; i++) {
					var row = list[i];
					
					var bannerhtml = "";
					if(row.v_banner != undefined && row.v_banner != "") {
						var banner = row.v_banner;
						if(banner.split(",")[1].length == 2) {
							bannerhtml = "<span class=\"ico_label la"+banner.split(",")[2]+"\"><em>"+banner.split(",")[1]+"</em><em></em></span>";
						} else {
							bannerhtml = "<span class=\"ico_label la"+banner.split(",")[2]+"\"><em>"+banner.split(",")[1].substring(0,2)+"</em><em>"+banner.split(",")[1].substring(2,4)+"</em></span>";
						}
					}
					
					var point = parseInt(row.n_single_point);
					
					arrHtml.push("<input type='hidden' name='i_arrProductcd' value='"+row.v_productcd+"'/>");
					arrHtml.push("<input type='hidden' name='i_arrOptioncd' value='"+row.v_optioncd+"'/>");
					arrHtml.push("<input type='hidden' name='i_arrFlagReser' value='"+row.v_flag_reser_real+"'/>");
					arrHtml.push("<input type='hidden' name='i_arrProductnm' value='"+row.v_productnm+"'/>");
					arrHtml.push("<input type='hidden' name='i_arrBrandnm' value='"+row.v_brandnm+"'/>");
					arrHtml.push("<input type='hidden' name='i_arrPrice' value='"+row.n_price+"'/>");
					arrHtml.push("<input type='hidden' name='i_arrListPrice' value='"+row.n_list_price+"'/>");
					arrHtml.push("<input type='hidden' name='i_arrCategorycd' value='"+row.v_categorycd+"'/>");
					arrHtml.push("<input type='hidden' name='i_arrBrandcd' value='"+row.v_brandcd+"'/>");
					/*arrHtml.push("<div class=\"prod_item\">");
					arrHtml.push("	<div class=\"thumbImg\">");
					arrHtml.push("		<a href=\"#\" class=\"btn_detail\" id=\""+row.v_productcd+"\" onClick=\"trackClicksMall('상품','모바일 상품리스트^상품리스트','상품 상세','event5',true,'"+row.v_productcd+"');\">");*/
					/*기존소스 주석처리 2017/10/20*/
					
					var img_path = row.v_img_path || "";
					
					if(row.v_feature_tag != undefined && row.v_feature_tag != "" && row.v_feature_tag.indexOf("DG_P009") >-1){
						if(row.v_free_img_path != undefined && row.v_free_img_path != ""){
							img_path = row.v_free_img_path;
						}
					}
					
					if (img_path.indexOf("_155") > -1) {
						img_path = img_path.replace("_155", "_356");
					}
					
					/*arrHtml.push("			<img src=\""+img_path+"\" alt=\""+row.v_productnm+"\" onerror=\"fnNoImage(this);\">");                                                    
					arrHtml.push(bannerhtml);
					//모바일 세일가아아아
					arrHtml.push(			getFilterHtmlTag2(row.v_feature_tag));
					arrHtml.push("			<span class='info_like'><em class='em_ico_like'>"+SetNumComma(row.n_vote_cnt)+"</em><em class='em_ico_photo'>"+SetNumComma(row.n_photo_cnt)+"</em></span>");
					//모바일 세일이이링링
					arrHtml.push("		</a>");        
					arrHtml.push("		</div>");                                             
					arrHtml.push("		<div class=\"prodDetail\">");                                                      
					arrHtml.push("			<p class=\"brandNm ellipsis\">"+row.v_brandnm+"</p>");                        
					arrHtml.push("			<p class=\"prodNm\">"+row.v_productnm+"</p>");                          
					arrHtml.push("			<p class=\"priceZone\">");
					
					if(row.n_list_price > row.n_price && row.n_plus_evt_give_cnt <= 0) {
						if(row.v_flag_beauty == "Y"){
							arrHtml.push("				<span class=\"price\" style='color:#ea5279'><em>"+SetNumComma(row.n_price)+"</em>P</span>");
						}else{
							var salePer = parseInt((parseInt(row.n_list_price) - parseInt(row.n_price)) / parseInt(row.n_list_price) * 100);
							arrHtml.push("				<span class='salePct'>");
							
							if(row.v_flag_upto == "Y"){
								arrHtml.push("<em class=\"upTo2\">UP TO</em>");
							}
							
							arrHtml.push("<em>"+salePer+"</em>%</span>");
							arrHtml.push("				<del>"+SetNumComma(row.n_list_price)+"원</del>");             
							arrHtml.push("				<span class=\"price\"><em>"+SetNumComma(row.n_price)+"</em>원</span>");
						}
					}else if(row.n_plus_evt_give_cnt > 0){
						arrHtml.push("				<span class='salePct'>");
						arrHtml.push("<em>"+row.n_plus_evt_buy_cnt + "<em style='font-size: 1.1em;font-weight: normal;'>+</em>" +row.n_plus_evt_give_cnt+"</em></span>");
						arrHtml.push("				<del>"+SetNumComma(row.n_list_price*parseInt(row.n_plus_evt_buy_cnt + row.n_plus_evt_give_cnt))+"원</del>");             
						arrHtml.push("				<span class=\"price\"><em>"+SetNumComma(row.n_price*parseInt(row.n_plus_evt_buy_cnt))+"</em>원</span>");
					}else {
						if(row.v_flag_beauty == "Y"){
							arrHtml.push("				<span class=\"price\" style='color:#ea5279'><em>"+SetNumComma(row.n_price)+"</em>P</span>");
						}else{
							arrHtml.push("				<span class=\"price\"><em>"+SetNumComma(row.n_price)+"</em>원</span>");              
						}
					}
				
				if(row.v_statuscd == "0002") {
					arrHtml.push("				<span class=\"ico_state st1\">품절</span>");   
				}
					arrHtml.push("			</p>");
					arrHtml.push("			<div class='btn_shoppingCart'>");
					if(row.v_statuscd =="0002"){
						arrHtml.push("				<a href='#' class='btn_like'></a>");
						arrHtml.push("				<a href='#' class='btn_cart' style='display:none;'></a>");
						arrHtml.push("				<a href='#' class='btn_nowBuy soldout' style='width:82%;border:1px solid #b8b8b8; background-color:#c5c5c5;'>일시품절</a>");
					}else{
						arrHtml.push("				<a href='#' class='btn_like'></a>");
						arrHtml.push("				<a href='#' class='btn_cart'></a>");
						if(row.v_flag_reser_real == "Y"){
							arrHtml.push("				<a href='#' class='btn_nowBuy'>예약주문</a>");
						}else{
							arrHtml.push("				<a href='#' class='btn_nowBuy'>바로구매</a>");
						}
						
					}
					arrHtml.push("			</div>");                           
					arrHtml.push("	</div>");     
					arrHtml.push("</div>");
					
					//크리테오 리스팅 트래커 스크립트
					if(i < 3){
						try{
							criArr.push(row.v_productcd);
						}catch(e){}
					}
				}
				
				if(1 == page.i_iNowPageNo) {
					$(".div_product_list").html(arrHtml.join(""));
					
				} else {
					$(arrHtml.join("")).appendTo($(".div_product_list"));
				}
				
				//크리테오 리타겟팅
				try{
					var email = $(".semail").text();
					var md5Email = "";
					if(email != ""){
						md5Email = $.md5($.trim(email));
					}
					window.criteo_q = window.criteo_q || [];
					window.criteo_q.push(
					        { event: "setAccount", account: 28654 },
					        { event: "setHashedEmail", email: md5Email },
					        { event: "setSiteType", type: "m" },
					        { event: "viewList", item: criArr }
					);
				}catch(e){}
			} else {
				arrHtml.push("<div class=\"noResult\">");
				arrHtml.push("<p>검색된 <span class=\"ftxt\">상품이 없습니다.</span></p>");
				arrHtml.push("</div>");
				
				$(".div_product_list").html(arrHtml.join(""));
			}*/ //기존소스 주석처리 2017/10/20
					
					// 상품 li 만들기
					arrHtml.push('<li>');
					arrHtml.push('<div class="prod_item">');
					arrHtml.push('	<a href="#none" id="'+row.v_productcd+'">');
					arrHtml.push('		<div class="thumb"><img data-original="'+img_path+'" class="lazy img-responsive" alt="'+row.v_productnm+'"></div>');
					arrHtml.push('		<div class="details">');
					arrHtml.push('			<p class="brand_nm">'+row.v_brandnm+'</p>');
					arrHtml.push('			<p class="prod_nm">'+row.v_productnm+'</p>');
					// 금액 정보
					arrHtml.push('			<div class="price_area">');
					if(row.n_list_price > row.n_price && row.n_plus_evt_give_cnt <= 0) {
						//뷰티 포인트
						if(row.v_flag_beauty == "Y"){
							arrHtml.push('		<strong class="price point"><span>'+SetNumComma(row.n_price)+'</span>P</strong>');
						}else{
							var salePer = parseInt((parseInt(row.n_list_price) - parseInt(row.n_price)) / parseInt(row.n_list_price) * 100);
							arrHtml.push('		<em class="sale">'+salePer+'%</em>');
							arrHtml.push('		<strong class="price"><span>'+SetNumComma(row.n_price)+'</span>원</strong>');
							arrHtml.push('		<del class="base"><span>'+SetNumComma(row.n_list_price)+'</span>원</del>');
						}
					}else if(row.n_plus_evt_give_cnt > 0){
						// 0+0 이벤트
						arrHtml.push('				<em class="sale">'+row.n_plus_evt_buy_cnt + '<em style="font-size: 1.1em;font-weight: normal;">+</em>'+row.n_plus_evt_give_cnt+'</em></span>');
						arrHtml.push('				<strong class="price"><span>'+SetNumComma(row.n_price*parseInt(row.n_plus_evt_buy_cnt))+'</span>원</strong>');
						arrHtml.push('				<del class="base"><span>'+SetNumComma(row.n_list_price*parseInt(row.n_plus_evt_buy_cnt + row.n_plus_evt_give_cnt))+'</span>원</del>');
					}else {
						if(row.v_flag_beauty == "Y"){
							arrHtml.push('			<strong class="price point"><span>'+SetNumComma(row.n_price)+'</span>P</strong>');
						}else{
							arrHtml.push('			<strong class="price"><span>'+SetNumComma(row.n_price)+'</span>원</strong>');
						}
					}
					if(row.v_statuscd == "0002") {
						arrHtml.push("				<span class=\"ico_state st1\">품절</span>");   
					}
					arrHtml.push("			</div>");
					arrHtml.push('			<div class="tag_area">');
					arrHtml.push(			getProductListTag(row.v_feature_tag));
					arrHtml.push('			</div>');
					arrHtml.push('			<div class="info">');
					arrHtml.push('				<div class="grade"><i class="i-grade grade0'+row.n_single_point+'">'+row.n_single_point+'점</i></div>');
					arrHtml.push('				<div class="review">리뷰 <em>'+SetNumComma(row.n_photo_cnt)+'</em></div>');
					arrHtml.push('			</div>');
					arrHtml.push('			<button type="button" class="btn_aplike"><i class="i-prod heart">좋아요</i></button>');
					arrHtml.push('		</div>');
					arrHtml.push('	</a>');
					arrHtml.push('</div>');
					arrHtml.push('</li>');
				}
				
				if(1 == page.i_iNowPageNo) {
					$(".prod_list_box .list").html(arrHtml.join(""));
				} else {
					$(arrHtml.join("")).appendTo($(".prod_list_box .list"));
				}
				
			} else {
				arrHtml.push('<div class="prod_list_empty">');
				arrHtml.push('	<p class="txt">더 좋은 상품을 준비중입니다</p>');
				arrHtml.push('</div>');
				$(".prod_list_box .list").html(arrHtml.join(""));
			}
					
			
			//SmartOffer - 개인화 추천 태깅 (검색필터)
			try{
				paramList ="?prdBrandcd=" + $("input[name='i_sPrdBrandcd']").val();			// 브랜드
				paramList +="&selectService=" + $(".i_sSelectService").val();				// 서비스
				paramList +="&prdFeature=" + $("input[name='i_sPrdFeature']").val();		// 상품특징
				paramList +="&prdPrice=" + $("input[name='i_sPrdPrice']").val();			// 쇼핑찬스
				paramList +="&prdPopular=" + $("input[name='i_sPrdPopular']").val();		// 인기
				paramList +="&statuscd=" + $("input[name='i_sStatuscd']").val();			// 판매상태
				paramList +="&prdFunc=" + $("input[name='i_sPrdFunc']").val();				// 기능성
				paramList +="&optPa=" + $("input[name='i_sOptPA']").val();					// PA
				paramList +="&prdSkin=" + $("input[name='i_sPrdSkin']").val();				// 피부타입
				paramList +="&prdTruble=" + $("input[name='i_sPrdTrubleType']").val();		// 피부고민
				paramList +="&prdTexture=" + $("input[name='i_sPrdTexture']").val();		// 텍스쳐
				paramList +="&optMakeup=" + $("input[name='i_sOptMakeupeft']").val();		// 메이크업 효과
				paramList +="&saleSt=" + $("input[name='i_sSaleSt']").val();				// SALE S
				paramList +="&saleEn=" + $("input[name='i_sSaleEn']").val();				// SLAE E
				paramList +="&priceSt=" + $("input[name='i_sPriceSt']").val();				// 가격 S
				paramList +="&priceEn=" + $("input[name='i_sPriceEn']").val();		    	// 가격 E
				paramList +="&spfSt=" + $("input[name='i_sSpfSt']").val();					// SPF S
				paramList +="&spfEn=" + $("input[name='i_sSpfEn']").val();					// SPF E
				paramList +="&rgb=" + $("input[name='i_sRgb']").val();						// 색상
				paramList +="&flagBrand=" + $("input[name='i_sFlagBrand']").val();			// 브랜드 정렬여부		
				paramList +="&flagSort=" + $("input[name='i_sFlagSort']").val();			// 상품정렬					
				paramList +="&categorycd1=" + $("input[name='i_sCategorycd1']").val();		// 카테고리1
				paramList +="&categorycd2=" + $("input[name='i_sCategorycd2']").val();		// 카테고리2
				paramList +="&categorycd3=" + $("input[name='i_sCategorycd3']").val();		// 카테고리3
				searchFilterTagEvent(paramList,'MOBILE');
			}catch(e){}
			MobileShopProductList1.fn.lazyLoading();	 //추가 2017/10/20
			//$(".txtTotal>em").text(SetNumComma(page.i_iRecordCnt)); 기존
			$("#totalCntEm").text(SetNumComma(page.i_iRecordCnt)); //수정 2017/10/20
		},

		addCategoryStyleEvent : function() {
			$( '.btn_iscrollNext' ).unbind("click").click( function(event) {
				event.preventDefault();
				MobileShopProductList1.fn.next();
	        });
	        
		    $( '.btn_iscrollPrev' ).unbind("click").click( function(event) {
		    	event.preventDefault();
		    	MobileShopProductList1.fn.prev();
	        });
	        
		    $(window).resize(function(){
	            winW = $(window).width();
	            $aw = 0;
	            $(".prodCategoryList li").each(function(){
	                var $eW = $(this).width();
	                $aw = $aw + $eW;
	            });

	            if($aw > winW){
	                $('button.btn_iscrollNext').addClass('in');
	                $('button.btn_iscrollNext').show();
	            } else {
	                $('button').removeClass('in');
	                $('button').hide();
	            }
	        });
		}, 

		setScroll : function() {
			MobileShopProductList1.fn.scrollWidth();
		    
		    prodlistIscroller = new iScroll('prodlistIscroller', {
		        zoom:false,
		        momentum: true,
		        vScroll:false,
		        hScrollbar:false,
		        onBeforeScrollStart:function(e){
		            e.preventDefault();
		            e.stopPropagation();
		        },
		        onScrollMove: MobileShopProductList1.fn.scrollHandler,
		        onScrollEnd: function(){
		            winW = $(window).width();
		            var $thisX = this.x;

		            var $positionX = winW - $aw;
		            if($thisX < 0 && $positionX < $thisX -1){
		                $('button.btn_iscrollPrev').addClass('in');
		                //$('button.btn_iscrollPrev').show();
		                $('button.btn_iscrollNext').addClass('in');
		                //$('button.btn_iscrollNext').show();
		            } else if($thisX == 0){
		                $('button.btn_iscrollPrev').removeClass('in');
		                //$('button.btn_iscrollPrev').hide();
		                $('button.btn_iscrollNext').addClass('in');
		                //$('button.btn_iscrollNext').show();
		            } else if($positionX > $thisX -1){
		                $('button.btn_iscrollPrev').addClass('in');
		                //$('button.btn_iscrollPrev').show();
		                $('button.btn_iscrollNext').removeClass('in');
		                //$('button.btn_iscrollNext').hide();
		            }
		        }
		    });
			
		},
		scrollWidth : function() {
			//var $prodCategoryList = $(".prodCategoryList li");
	        $(".prodCategoryList li").each(function(){
	            var $eW = $(this).width();
	            $aw = $aw + $eW;
	        });
	        if($aw > winW){
	            $('button.btn_iscrollNext').addClass('in');
	            //$('button.btn_iscrollNext').show();
	        } else {
	            $('button.btn_iscrollNext').removeClass('in');
	            //$('button.btn_iscrollNext').hide();
	        }
	        $('.prodCategoryList').css('width',$aw);
		},
		scrollHandler : function() {
			if(this.x || this.x === 0) {
	            offset = this.x;
	        }
		},
		next : function() {
			offset -= (48 * 5);
	        if ( offset < - $aw + winW ) {
	            offset = - $aw + winW; // don't exceed this limit
	        }
	        prodlistIscroller.scrollTo(offset,0,400);
		},
		prev : function() {
			offset += (48 * 5);
	        if ( offset > 0 ) {
	            offset = 0; // don't exceed this limit
	        }
	        prodlistIscroller.scrollTo(offset,0,400);
		},
		masonry : function() {
			var $sortContainer = $("#sortContainer");
            $sortContainer.masonry({
                columnWidhth:'.prod_item',
                itemSelector:'.prod_item',
                animate:true
            });
            return false;
		},
		resortList : function() {
			$(".prodtListBox").removeClass("albumType");
		},
		resortAlbum : function() {
			$(".prodtListBox").addClass("albumType");
		}
	}
};



/**
 * 검색필터 
 */
var MobileShopSearchFilter1 = {
	name : "MobileShopSearchFilter1",
	
	init : function() {
		MobileShopSearchFilter1.fn.getFilterList();
		MobileShopSearchFilter1.fn.getProductCount();
	},
	fn : {
		/**
		 * 클릭 이벤트 제어 function
		 */
		addBtnEvent : function() {
			
			$(".btn_submit").unbind("click").click(function(event) {
				event.preventDefault();
				
				if($("input[type='checkbox']:checked").length == 0) {
					$("input[name='i_sFlagFilter']").val("N");
				} else {
					$("input[name='i_sFlagFilter']").val("Y");
				}
				
				var frm = $("form[name='frm']");
				var url = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_list.do";
				
				if($("#i_sFlagBrand").val() == "Y") {
					url += "?i_sFlagBrand=Y&i_sBrandcd=" + $("#i_sBrandcd").val() + "&i_sCategorycd1=" + $("#i_sCategorycd1").val();
				} else {
					url += "?i_sFlagCategory=Y&i_sCategorycd1=" + $("#i_sCategorycd1").val() + "&i_sCategorycd2=" + $("#i_sCategorycd2").val();
				}

				if (GLOBAL_FLAG_APP_NEW == "Y") {
					try {
						if(GLOBAL_MOBILE_OS == "AND") {
							MobileBodyStart.setLoginUserInfo();
						}
						else {
							window.webkit.messageHandlers.requestUserInfo.postMessage(null);
						}
					}catch(e){
						console.log(e);
					}
					var arrParam = [];
					if(GLOBAL_LOGIN_KEY != "") {
						$("input[name='i_sLoginKey']", frm).remove();
						arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
					}
					if(GLOBAL_LOGIN_TYPE != "") {
						$("input[name='i_sLoginType']", frm).remove();
						arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
					}
					$("input[name='i_sDeviceNum']", frm).remove();
					arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
					$(arrParam.join("")).appendTo(frm);
				}
				frm.attr("action", url);
				frm.submit();
			});
			
			$(".btn_reset").unbind("click").click(function(event) {
				event.preventDefault();
				$("input[type='checkbox']").prop("checked", false);
				$('#filtBrand span').removeClass("chkbox chked").addClass("chkbox unchked");
				//$(".input_range").val("");
				//$("input[name='i_sRgb']").val("");
				//$(".li_filter_color").removeClass("active");
				//MobileShopSearchFilter1.fn.slideReset();
				MobileShopSearchFilter1.fn.getProductCount();
			});
			
			$(".btn_cancel").unbind("click").click(function(event) {
				event.preventDefault();
				
				$("input[type='checkbox']").prop("checked", false);
				
				$("input[name='i_sFlagFilter']").val("N");
				var frm = $("form[name='frm']");
				var url = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_list.do";
				
				if($("#i_sFlagBrand").val() == "Y") {
					url += "?i_sFlagBrand=Y&i_sBrandcd=" + $("#i_sBrandcd").val() + "&i_sCategorycd1=" + $("#i_sCategorycd1").val();
				} else {
					url += "?i_sFlagCategory=Y&i_sCategorycd1=" + $("#i_sCategorycd1").val() + "&i_sCategorycd2=" + $("#i_sCategorycd2").val();
				}

				if (GLOBAL_FLAG_APP_NEW == "Y") {
					try {
						if(GLOBAL_MOBILE_OS == "AND") {
							MobileBodyStart.setLoginUserInfo();
						}
						else {
							window.webkit.messageHandlers.requestUserInfo.postMessage(null);
						}
					}catch(e){
						console.log(e);
					}
					var arrParam = [];
					if(GLOBAL_LOGIN_KEY != "") {
						$("input[name='i_sLoginKey']", frm).remove();
						arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
					}
					if(GLOBAL_LOGIN_TYPE != "") {
						$("input[name='i_sLoginType']", frm).remove();
						arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
					}
					$("input[name='i_sDeviceNum']", frm).remove();
					arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
					$(arrParam.join("")).appendTo(frm);
				}
				frm.attr("action", url);
				frm.submit();
			});
			
			$("input[type='checkbox']").unbind("click").click(function() {
				MobileShopSearchFilter1.fn.getProductCount();
			});
			
			$(".li_filter_color").unbind("click").click(function(event) {
				event.preventDefault();
				var checked_color = $("#i_sRgb").val();
				var id = $(this).attr("id");
				if($(this).hasClass("active")) {
					$("#i_sRgb").val($("#i_sRgb").val().replace(id + ";", ""));
					$(this).removeClass("active");
				} else {
					$("#i_sRgb").val(checked_color + id + ";");
					$(this).addClass("active");
				}
				
				MobileShopSearchFilter1.fn.getProductCount();
			});
		},
		getProductCount : function() {
			
			/*추가 2017/10/23*/
			var i_sFlagFilter = ""
				$("input[name='i_sFlagFilter']").attr("value",'Y');
				
				var i_arrBrandcd= new Array();
				
				$("input[name='i_arrBrandcd']:checked").each(function(i){
					i_arrBrandcd.push($(this).val());
				}); 
				//alert("brand : "+i_arrBrandcd);
				
				var i_sPrdService= new Array();
				$("input[name='i_sPrdService']:checked").each(function(i){
					i_sPrdService.push($(this).val());
				}); 
				//alert("service : "+i_sPrdService);
				
				var i_sPrdFeature= new Array();
				$("input[name='i_sPrdFeature']:checked").each(function(i){
					i_sPrdFeature.push($(this).val());
				});
				//alert("feature : "+i_sPrdFeature);
				
				
				var i_sPrdPrice= new Array();
				$("input[name='i_sPrdPrice']:checked").each(function(i){
					i_sPrdPrice.push($(this).val());
				});
				//alert("price : "+i_sPrdPrice);
				
				var i_sPrdFunc= new Array();
				$("input[name='i_sPrdFunc']:checked").each(function(i){
					i_sPrdFunc.push($(this).val());
				}); 
				//alert("func : "+i_sPrdFunc);
				
				MobileShopProductList1.fn.setParameter();
				
				//parameter.i_sBrandcd = i_sBrandcd; //브랜드
				parameter.i_sPrdBrandcd = i_arrBrandcd; //브랜드
				parameter.i_sPrdService = i_sPrdService; //서비스
				parameter.i_sPrdFeature = i_sPrdFeature; //특징
				parameter.i_sPrdPrice = i_sPrdPrice; //쇼핑찬스
				parameter.i_sPrdFunc = i_sPrdFunc; //기능성
				
				parameter.i_sFlagPageInit = "Y";
				//parameter.i_iNowPageNo  = i_iNowPageNo; //pageNo막고 stack 에러 사라짐
				/*추가 2017/10/23*/
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_category_product_count_ajax.do" //url 수정 2017/10/23
				, type : "POST"
				, dataType : "json"
				//, data : $("form[name='frm1']").serialize() //기존
				, data : parameter //수정
				, animation : false
				, async : false
				, success : function(data, textStatus) {
					if(data.status == "succ") {
						$(".checked_txt").text(data.object);
					}
				}
			});
		},
		/**
		 * 검색 필터 ajax function
		 */
		getFilterList : function() {
			parameter.i_sFlagBrand = $("#i_sFlagBrand").val();
			parameter.i_sBrandcd = $("#i_sBrandcd").val();
			parameter.i_sCategorycd1 = $("#i_sCategorycd1").val();
			parameter.i_sCategorycd2 = $("#i_sCategorycd2").val();
			
			//alert("i_sFlagBrand :"+$("#i_sFlagBrand").val());
			//alert("i_sBrandcd :"+$("#i_sBrandcd").val());
			//alert("i_sCategorycd1 :"+$("#i_sCategorycd1").val());
			//alert("i_sCategorycd2 :"+$("#i_sCategorycd2").val());
			
			MobileCommon.ajax({
				//url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_search_filter_list_ajax.do",
				url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_common_filter_ajax.do",
				type : "POST",
				dataType : "json",
				data : parameter,
				animation : false,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						
						MobileShopSearchFilter1.fn.setFilterList(data.object);
					} else {
						alert(data.message);
					}
				}, error : function() {
					
				}
			});
		},
		/**
		 * ajax 리턴 데이터로 화면에 뿌려주는 function
		 * @param obj
		 */
		setFilterList : function(obj) {
			var filter = obj.filter;
			var reqVo = obj.reqVo;
			
			MobileShopSearchFilter1.fn.setRangeInit(filter);
			
			var div_service = $(".div_service");
			var service = reqVo.i_sCheckedService;
			
			$(".chkbox", div_service).each(function() {
				var id = $(this).attr("id").replace("span_", "");
				
				if(service.indexOf(id) == -1) {
					$(this).hide();
				}
			});
			
			if($(".chkbox", div_service).not(":hidden").length == 0) {
				div_service.hide();
				$(".tit_service").hide();
			}
			
			var div_feature = $(".div_feature");
			var feature = reqVo.i_sCheckedFeature;
			
			$(".chkbox", div_feature).each(function() {
				var id = $(this).attr("id").replace("span_", "");
				
				if(feature.indexOf(id) == -1) {
					$(this).hide();
				}
			});
			
			if($(".chkbox", div_feature).not(":hidden").length == 0) {
				div_feature.hide();
				$(".tit_feature").hide();
			}
			
			var div_price = $(".div_price");
			var price = reqVo.i_sCheckedPrice;
			
			$(".chkbox", div_price).each(function() {
				var id = $(this).attr("id").replace("span_", "");
				
				if(price.indexOf(id) == -1) {
					$(this).hide();
				}
			});
			
			if($(".chkbox", div_price).not(":hidden").length == 0) {
				div_price.hide();
				$(".tit_price").hide();
			}
			
			/*var div_popular = $(".div_popular");
			var popular = reqVo.i_sCheckedPopular;
			$(".chkbox", div_popular).each(function() {
				var id = $(this).attr("id").replace("span_", "");
				
				if(popular.indexOf(id) == -1) {
					$(this).hide();
				}
			});
			
			if($(".chkbox", div_popular).not(":hidden").length == 0) {
				div_popular.hide();
				$(".tit_popular").hide();
			}*/
			
			var div_func = $(".div_func");
			var func = reqVo.i_sCheckedFunc;
			$(".chkbox", div_func).each(function() {
				var id = $(this).attr("id").replace("span_", "");
				
				if(func.indexOf(id) == -1) {
					$(this).hide();
				}
			});
			
			if($(".chkbox", div_func).not(":hidden").length == 0) {
				div_func.hide();
				$(".tit_func").hide();
			}
			
			if($("#i_sFlagBrand").val() != "Y") {
				var div_brand = $(".div_brand");
				var brand = reqVo.i_sCheckedBrand;
				
				$(".chkbox", div_brand).each(function() {
					var id = $(this).attr("id").replace("span_", "");
					
					if(brand.indexOf(id) == -1) {
						$(this).hide();
					}
				});
			}
			
			/*var div_pa = $(".div_pa");
			var pa = reqVo.i_sCheckedPA;
			
			$(".chkbox", div_pa).each(function() {
				var id = $(this).attr("id").replace("span_", "");
				
				if(pa.indexOf(id) == -1) {
					$(this).hide();
				}
			});
			
			if($(".chkbox", div_pa).not(":hidden").length == 0) {
				div_pa.hide();
				$(".tit_pa").hide();
			}
			
			var div_skin = $(".div_skin");
			var skin = reqVo.i_sCheckedSkin;

			$(".chkbox", div_skin).each(function() {
				var id = $(this).attr("id").replace("span_", "");
				
				if(skin.indexOf(id) == -1) {
					$(this).hide();
				}
			});
			
			if($(".chkbox", div_skin).not(":hidden").length == 0) {
				div_skin.hide();
				$(".tit_skin").hide();
			}
			
			var div_trouble = $(".div_trouble");
			var trouble = reqVo.i_sCheckedTrouble;

			$(".chkbox", div_trouble).each(function() {
				var id = $(this).attr("id").replace("span_", "");
				
				if(trouble.indexOf(id) == -1) {
					$(this).hide();
				}
			});
			
			if($(".chkbox", div_trouble).not(":hidden").length == 0) {
				div_trouble.hide();
				$(".tit_trouble").hide();
			}
			
			var div_texture = $(".div_texture");
			var texture = reqVo.i_sCheckedTexture;

			$(".chkbox", div_texture).each(function() {
				var id = $(this).attr("id").replace("span_", "");
				
				if(texture.indexOf(id) == -1) {
					$(this).hide();
				}
			});
			
			if($(".chkbox", div_texture).not(":hidden").length == 0) {
				div_texture.hide();
				$(".tit_texture").hide();
			}
			
			var div_makeup = $(".div_makeup");
			var makeup = reqVo.i_sCheckedOptMakeup;
			
			$(".chkbox", div_makeup).each(function() {
				var id = $(this).attr("id").replace("span_", "");
				
				if(makeup.indexOf(id) == -1) {
					$(this).hide();
				}
			});
			
			if($(".chkbox", div_makeup).not(":hidden").length == 0) {
				div_makeup.hide();
				$(".tit_makeup").hide();
			}*/
			
			/*var div_status = $(".div_status");
			var status = reqVo.i_sCheckedStatuscd;
			
			$(".chkbox", div_status).each(function() {
				var id = $(this).attr("id").replace("span_", "");
				
				if(status.indexOf(id) == -1) {
					$(this).hide();
				}
			});
			
			if($(".chkbox", div_status).not(":hidden").length == 0) {
				div_status.hide();
				$(".tit_status").hide();
			}*/
			
			var arrRgbColor = obj.arrRgbColor;
			
			if(arrRgbColor != undefined && arrRgbColor != "") {
				var arrColor = [];
				var active = "";
				var colors = sortColors(arrRgbColor);
				
				for(var i=0; i<colors.length; i++) {
					if(colors[i] != undefined && colors[i] != "") {
						if($("input[name='i_sRgb']").val().indexOf(colors[i]) > -1) {
							active = "active";
						} else {
							active = "";
						}
						
						arrColor.push("<li class=\"li_filter_color "+active+"\" id=\""+colors[i].color+"\">");
						arrColor.push("	<a href=\"#\" class=\"btn_filter_color\">");
						arrColor.push("		<span class=\"color\" style=\"background:#"+colors[i].color+"\"></span>");
						arrColor.push("	</a>");
						arrColor.push("</li>");
					}
				}
				
				$(".div_colorArea>ul").html(arrColor.join(""));
			} else {
				$(".div_colorArea").remove();
				$(".color_tit").remove();
			}
			
			MobileShopSearchFilter1.fn.addBtnEvent();
			
		},
		setRangeInit : function(filter) {
			
			$("#i_sFilterMinPrice").val(filter.n_min_price);
			$("#i_sFilterMaxPrice").val(filter.n_max_price);
			$("#i_sFilterMinSale").val(filter.n_min_sale);
			$("#i_sFilterMaxSale").val(filter.n_max_sale);
			$("#i_sFilterMinSpf").val(filter.n_min_spf);
			$("#i_sFilterMaxSpf").val(filter.n_max_spf);
			
			var Link = $.noUiSlider.Link;
			var priceSt = parseInt($("input[name='i_sPriceSt']").val() == "" ? $("#i_sFilterMinPrice").val() : $("input[name='i_sPriceSt']").val());
			var priceEn = parseInt($("input[name='i_sPriceEn']").val() == "" ? $("#i_sFilterMaxPrice").val() : $("input[name='i_sPriceEn']").val());
	        $('#priceSlider').noUiSlider({
	            start: [ priceSt , priceEn ],
	            connect: true,
	            step: 1,
	            range: {
	                'min': [ 0 ],
	                'max': [ 1000000 ]
	            },
	            serialization: {
	                resolution: 1,
	                lower: [
	                    new Link ({
	                        target: $('#priceL #span1a'),
	                        method: MobileShopSearchFilter1.fn.priceleftValue
	                    })
	                ],
	                upper: [
	                    new Link ({
	                        target: $('#priceR #span1b'),
	                        method: MobileShopSearchFilter1.fn.pricerightValue
	                    })
	                ]
	            }
	        });
	        
	        var Link = $.noUiSlider.Link;
	        var spfSt = parseInt($("input[name='i_sSpfSt']").val() == "" ? $("#i_sFilterMinSpf").val() : $("input[name='i_sSpfSt']").val());
			var spfEn = parseInt($("input[name='i_sSpfEn']").val() == "" ? $("#i_sFilterMaxSpf").val() : $("input[name='i_sSpfEn']").val());
	        $('#spfSlider').noUiSlider({
	            start: [ spfSt , spfEn ],
	            connect: true,
	            step: 1,
	            range: {
	                'min': [ 0 ],
	                'max': [ 50 ]
	            },
	            serialization: {
	                resolution: 1,
	                lower: [
	                    new Link ({
	                        target: $('#spfL #span1a'),
	                        method: MobileShopSearchFilter1.fn.spfleftValue
	                    })
	                ],
	                upper: [
	                    new Link ({
	                        target: $('#spfR #span1b'),
	                        method: MobileShopSearchFilter1.fn.spfrightValue
	                    })
	                ]
	            }
	        });
	        
	        var Link = $.noUiSlider.Link;
	        var saleSt = parseInt($("input[name='i_sSaleSt']").val() == "" ? $("#i_sFilterMinSale").val() : $("input[name='i_sSaleSt']").val());
			var saleEn = parseInt($("input[name='i_sSaleEn']").val() == "" ? $("#i_sFilterMaxSale").val() : $("input[name='i_sSaleEn']").val());
	        $('#saleSlider').noUiSlider({
	            start: [ saleSt , saleEn ],
	            connect: true,
	            step: 1,
	            range: {
	                'min': [ 0 ],
	                'max': [ 100 ]
	            },
	            serialization: {
	                resolution: 1,
	                lower: [
	                    new Link ({
	                        target: $('#saleL #span1a'),
	                        method: MobileShopSearchFilter1.fn.saleleftValue
	                    })
	                ],
	                upper: [
	                    new Link ({
	                        target: $('#saleR #span1b'),
	                        method: MobileShopSearchFilter1.fn.salerightValue
	                    })
	                ]
	            }
	        });

	        $("#priceSlider").change(function() {
	        	var low_value = $("#priceL>#span1a").text();
	        	var high_value = $("#priceR>#span1b").text();
	        	
	        	$("input[name='i_sPriceSt']").val(SetNum(low_value));
        		$("input[name='i_sPriceEn']").val(SetNum(high_value));
        		
	        	/*if(SetNum(low_value) != $("#i_sFilterMinPrice").val() || SetNum(high_value) != $("#i_sFilterMaxPrice").val()) {
	        		
	        	} else {
	        		$("input[name='i_sPriceSt']").val("");
	        		$("input[name='i_sPriceEn']").val("");
	        	}
	        	*/
	        	MobileShopSearchFilter1.fn.getProductCount();
	        });
	        
	        $("#spfSlider").change(function() {
	        	var low_value = $("#spfL>#span1a").text();
	        	var high_value = $("#spfR>#span1b").text();
	        	
	        	$("input[name='i_sSpfSt']").val(low_value);
	        	$("input[name='i_sSpfEn']").val(high_value);
	        	
	        	/*if(low_value != $("#i_sFilterMinSpf").val() || SetNum(high_value) != $("#i_sFilterMaxSpf").val()) {
	        		
	        	} else {
	        		$("input[name='i_sSpfSt']").val("");
	        		$("input[name='i_sSpfEn']").val("");
	        	}*/
	        	
	        	MobileShopSearchFilter1.fn.getProductCount();
	        });
	        
	        $("#saleSlider").change(function() {
            	var low_value = $("#saleL>#span1a").text();
            	var high_value = $("#saleR>#span1b").text();
            	
            	$("input[name='i_sSaleSt']").val(low_value);
	        	$("input[name='i_sSaleEn']").val(high_value);
	        	
            	/*if(low_value != $("#i_sFilterMinSale").val() || SetNum(high_value) != $("#i_sFilterMaxSale").val()) {
	        		
	        	} else {
	        		$("input[name='i_sSaleSt']").val("");
	        		$("input[name='i_sSaleEn']").val("");
	        	}*/
            	
            	MobileShopSearchFilter1.fn.getProductCount();
            });
		},
		slideReset : function() {
			 $('#priceSlider').val([$("#i_sFilterMinPrice").val(), $("#i_sFilterMaxPrice").val()]);
			 $('#spfSlider').val([$("#i_sFilterMinSpf").val(), $("#i_sFilterMaxSpf").val()]);
			 $('#saleSlider').val([$("#i_sFilterMinSale").val(), $("#i_sFilterMaxSale").val()]);
		},
		priceleftValue : function(value, handle, slider) {
			var $price = parseInt(value);
            var price = MobileShopSearchFilter1.fn.GetCommaValue($price);
            $(this).text(price);
            $("#priceL").appendTo('#priceSlider .noUi-handle-lower');

            var str = String($('#priceSlider').val());
            var strArr = str.split(",");

            if(value == strArr[1]){
                $('#priceR').hide();
            } else {
                $('#priceR').show();
            }
		},
		pricerightValue : function( value, handle, slider ) {
            var $price = parseInt(value);
            var price = MobileShopSearchFilter1.fn.GetCommaValue($price);
            $(this).text(price);
            $("#priceR").appendTo('#priceSlider .noUi-handle-upper');

            var str = String($('#priceSlider').val());
            var strArr = str.split(",");

            if(value == strArr[0]){
                $('#priceR').hide();
            } else {
                $('#priceR').show();
            }
        //$("#priceR").css("left", $(".noUi-handle-upper").parent().css("left"));
        },
        GetCommaValue : function (n) {      
            var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
            n += '';                          // 숫자를 문자열로 변환
            while (reg.test(n))
            n = n.replace(reg, '$1' + ',' + '$2');
            return n;
        },
        spfleftValue : function ( value, handle, slider ) {
            var $price = parseInt(value);
            var price = MobileShopSearchFilter1.fn.GetCommaValue($price);
            $(this).text(price);
            $("#spfL").appendTo('#spfSlider .noUi-handle-lower');

            var str = String($('#spfSlider').val());
            var strArr = str.split(",");

            if(value == strArr[1]){
                $('#spfR').hide();
            } else {
                $('#spfR').show();
            }
        //$("#spfL").css("left", $(".noUi-origin").css("left"));
        },
        spfrightValue : function ( value, handle, slider ) {
            var $price = parseInt(value);
            var price = MobileShopSearchFilter1.fn.GetCommaValue($price);
            $(this).text(price);
            $("#spfR").appendTo('#spfSlider .noUi-handle-upper');

            var str = String($('#spfSlider').val());
            var strArr = str.split(",");

            if(value == strArr[0]){
                $('#spfR').hide();
            } else {
                $('#spfR').show();
            }
        //$("#spfR").css("left", $(".noUi-handle-upper").parent().css("left"));
        },
        saleleftValue :function ( value, handle, slider ) {
            var $price = parseInt(value);
            var price = MobileShopSearchFilter1.fn.GetCommaValue($price);
            $(this).text(price);
            $("#saleL").appendTo('#saleSlider .noUi-handle-lower');

            var str = String($('#saleSlider').val());
            var strArr = str.split(",");

            if(value == strArr[1]){
                $('#saleR').hide();
            } else {
                $('#saleR').show();
            }
        //$("#spfL").css("left", $(".noUi-origin").css("left"));
        },
        salerightValue : function ( value, handle, slider ) {
            var $price = parseInt(value);
            var price = MobileShopSearchFilter1.fn.GetCommaValue($price);
            $(this).text(price);
            $("#saleR").appendTo('#saleSlider .noUi-handle-upper');

            var str = String($('#saleSlider').val());
            var strArr = str.split(",");

            if(value == strArr[0]){
                $('#saleR').hide();
            } else {
                $('#saleR').show();
            }
        //$("#spfR").css("left", $(".noUi-handle-upper").parent().css("left"));
        }
	}
};
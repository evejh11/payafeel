/*
 * 모바일 블루리본 스토어 JavaScript 
 */

var MobileBRStore = {
	name : "MobileBRStore",
	init : function(){
//		MobileBRStore.fn.addBtnEvent();
		MobileBRStore.fn.setSubMenuChange();
//		MobileBRStore.fn.setBrandInit();
		MobileBRStore.fn.setPageInit();
		
	},
	
	fn : {
		
		setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');
			select_input.click(function() {
				if($(this).val() == "mobile_shop_product_br_store") {
					location.href	= "/mobile/shop/" + $(this).val() + ".do";
				} else {
					location.href	= "/mobile/sale/" + $(this).val() + ".do";
				}
			});
		},
		
		setBrandInit : function(){
			var brand = $("#i_sCheckBrand").val();
			$("#brd_select option").each(function(){
				if(brand.indexOf($(this).val()) == -1){
					$(this).hide();
				} else{
					$(this).show();
				}
			});
		},
		
		addBtnEvent : function(){
	        $(document).ready(function(){
	            var chkLength = $("input:checkbox[name='i_arrProduct']").length;
	            $("input:checkbox[name='i_arrProduct']").click(function() {
	            	var idx = $("input:checkbox[name='i_arrProduct']").index($(this));
	            	var statuscd = $("input[name='i_arrStatuscd']").eq(idx).val();
	            	var stockqty = $("input[name='i_arrStockqty']").eq(idx).val();
	            	if(statuscd == "0002" || statuscd == "0001" && stockqty <= 0){
	            		$("input:checkbox[name='i_arrProduct']").eq(idx).attr("checked", false);
	            		showMessageBox({
	            			message :"선택하신 상품은 일시품절이에요."
	            			, close : function(){
	            				return ;
	            			}	
	            		});
	            	}
	                $("input:checkbox[name='i_arrProduct']").each(function(){
	                    if ( $("input:checkbox[name='i_arrProduct']:checked").length > 0 ) {
	                        $('button.btnRegister2').addClass("active").removeAttr("disabled");
	                    } else {
	                        $('button.btnRegister2').removeClass("active").attr("disabled","disabled");
	                    }
	                });
	            });
	        });
	        
	        $(".btn_check").unbind("click").click(function(event){
				event.preventDefault();
				MobileBRStore.fn.usercheck();
			});
	        
	        // 블루리본 포인트란? 팝업창 띄우기
	        $(".btn_popup").unbind("click").click(function(event){
	        	event.preventDefault();
	        	modalPopup("#modalPopupBlueRebonPoint");
	        });
	        
	        // 브랜드 선택 select box
	        $(".selectBox").unbind("change").change(function(evnet){
	        	$("#prod_list").html("");
	        	$("input[name='i_sBrandcd']").val($(this).val());
	        	$("#i_iNowPageNo").val(1);
	        	MobileBRStore.fn.setPageInit();
	        });
	        
	        // 더보기
	        
	        $(".btn_more").unbind("click").click(function(event){
	        	event.preventDefault();
	        	$("#i_iNowPageNo").val(parseInt($("#i_iNowPageNo").val(), 10) +1);
	        	MobileBRStore.fn.setPageInit();
	        });
	        
	        // 장바구니 담기
	        $(".btn_shopbag").unbind("click").click(function(event){
	        	event.preventDefault();
	        	if(!IS_LOGIN) {
	        		if(IS_LOGIN_SNS){
						showConfirmBox({
							message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
							, ok_func : function(){
								MobileBodyStart.goLoginPage();
//								document.location.href = GLOBAL_SSL_URL + "mobile/mbr/mobile_mbr_member_login.do?returnUrl=/mobile/shop/mobile_shop_product_br_store.do";
							}
						    , cancel_func: function(){
								return ;
							}
						});
					}else{
						showConfirmBox({
							message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function() {
									MobileBodyStart.goLoginPage();
//							var returnUrl = GLOBAL_WEB_URL +"mobile/shop/mobile_shop_product_br_store.do";
//							MobileBodyStart.goLogin(returnUrl);
//									document.location.href = GLOBAL_SSL_URL + "mobile/mbr/mobile_mbr_member_login.do?returnUrl=/mobile/shop/mobile_shop_product_br_store.do"; 
									
								}
						});
					}
				} else {
					
		        	var len = $("input:checkbox[name='i_arrProduct']").length;
		        	var list = [];
		        	var productcd = "";
		        	var str = "";
		        	
		        	for(var i=0; i < len; i++){
		        		var all_productcd = $("input:checkbox[name='i_arrProduct']").eq(i);
		        		if(all_productcd.is(":checked")){
		        			
		        			var sumCnt = 0;
				        	var sumPrice = 0;
		        			productcd = all_productcd.val();
		        			list.push({
			        			productcd : all_productcd.val()
			        			, optioncd : $("input[name='i_arrOptioncd']").eq(i).val()
		        				, cnt		:  $("input[name='i_arrProductCnt']").eq(i).val()
			        			, flagPlus	:  'Y'
			        			, flagSoloPack : $("input[name='i_arrFlagSoloPack']").eq(i).val()
		        			});
		        			sumCnt += fnOnlyNumber($("input[name='i_arrProductCnt']").eq(i).val()).number;
		        			sumPrice += fnOnlyNumber($(".blueRebontxt").eq(i).text()).number * fnOnlyNumber($("input[name='i_arrProductCnt']").eq(i).val()).number;
		        			
		        			var brandnm = $(".brandNm").eq(i+1).text(); 	//brandnm, productnm은 i+1로 해야 순서가 맞음..
		        			var productnm = $(".prodNm").eq(i+1).text();
		        			
		        			var price = fnOnlyNumber($(".blueRebontxt").eq(i).text()).number;
		        			str += brandnm + ";" + productnm + ";;;event54="+sumCnt+"|event55="+sumPrice+";eVar31=" +productcd+",";
		        		}
		        		
		        	}
		        	
		        	
	        		MobileBodyStart.addUserCart({
	        			list : list
	        			, callback : function(vo){
	        				if(vo.v_cartcd != "" && vo.v_cartcd != null){
	        					showConfirmBox({
	            					message : "장바구니에 상품이 추가 되었어요.",
	            					ok_str  : "장바구니로 이동",
	            					cancel_str : "계속 쇼핑하기",
	            					ok_func : function(){
	            						location.href=GLOBAL_WEB_URL+"mobile/cart/mobile_cart_cart_list.do";
	            					}
	            				});
	        				}
	        			}
	        		});
	        		
//	        		var trackProdcd = ";"+productcd;
	      		  try{trackPurchaseClick( str,'scAdd,event54,event55');}catch(e){}
				}
	        });
	        
	        $(".btn_open_popup").unbind("click").click(function(event){
	        	event.preventDefault();
	        	var id = $(this).attr("id");
            	cmAjax({
            		url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_prod_brstore_product_info.do" 
            		, data : {i_sProductcd : id}
            		, dataType : "json"
            		, type : "post"
            		, success : function(data, textStatus){
            			if(data.status == "succ"){
            				var obj = data.object;
            				$(".prdImg").attr("src", obj.v_img_web_path);
            				/*if(obj.v_brandnm != undefined && obj.v_brandnm != 'undefined'){
            					$(".brandNm").text(obj.v_brandnm);
            				}else{
            					$(".brandNm").text("아모레퍼시픽몰");
            				}*/
            				$(".productNm").text(obj.v_productnm);
            				$(".pointNum em").text(obj.n_point);
            				if(obj.v_product_desc != undefined && obj.v_product_desc != 'undefined'){
            					$(".descText").html(obj.v_product_desc);
            				}else{
            					$(" .descText").text("제품 상세설명 참조");
            				}
            				
            				//상품정보고시 채워야함.
            				$(".f_productnm").text(obj.v_productnm);
            				if(obj.v_productnm_en != undefined && obj.v_productnm_en != 'undefined' && obj.v_productnm_en != ""){
            					$(".f_productnm_nm").text(obj.v_productnm_en);
            				}else{
            					$(".f_productnm_nm").text("제품 상세설명 참조");
            				}
            				if(obj.v_quantity != undefined && obj.v_quantity != 'undefined'){
            					$(".f_quantity").text(obj.v_quantity);
            				}else{
            					$(".f_quantity").text("제품 상세설명 참조");
            				}
            				if(obj.v_material != undefined && obj.v_material != 'undefined'){
            					$(".f_material").text(obj.v_material);
            				}else{
            					$(".f_material").text("제품 상세설명 참조");
            				}
            				
            				if(obj.v_purpose != undefined && obj.v_purpose != 'undefined'){
            					$(".f_purpose").text(obj.v_purpose);
            				}else{
            					$(".f_purpose").text("제품 상세설명 참조");
            				}
            				
            				if(obj.v_origin != undefined && obj.v_origin != 'undefined'){
            					$(".f_origin").text(obj.v_origin);
            				}else{
            					$(".f_origin").text("제품 상세설명 참조");
            				}
            				if(obj.v_manufacture != undefined && obj.v_manufacture != 'undefined'){
            					$(".f_manufacture").text(obj.v_manufacture);
            				}else{
            					$(".f_manufacture").text("제품 상세설명 참조");
            				}
            				if(obj.v_pack_info != undefined && obj.v_pack_info != 'undefined'){
            					$(".f_packinfo").text(obj.v_pack_info);
            				}else{
            					$(".f_packinfo").text("제품 상세설명 참조");
            				}
            				if(obj.v_pack_law != undefined && obj.v_pack_law != 'undefined'){
            					$(".f_packlaw").text(obj.v_pack_law);
            				}else{
            					$(".f_packlaw").text("제품 상세설명 참조");
            				}
            				if(obj.v_caution != undefined && obj.v_caution != 'undefined'){
            					$(".f_caution").html(fnChangeBr(obj.v_caution));
            				}else{
            					$(".f_caution").text("제품 상세설명 참조");
            				}
            				if(obj.v_use_method != undefined && obj.v_use_method != 'undefined'){
            					$(".f_usemethod").html(fnChangeBr(obj.v_use_method));
            				}else{
            					$(".f_usemethod").text("제품 상세설명 참조");
            				}
            				modalPopup("#modalPopupBrstoreProdInfo");
            				
            			}else{
            				 showMessageBox({
            					 message : data.message
            				 });
            			}
            		}
            	});
	        	
	        });
		},
		
		//APP구매 이력 체크
		usercheck : function(){
			if(!IS_LOGIN){
				if(IS_LOGIN_SNS){
					showConfirmBox({
						message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
						, ok_func : function(){
							document.location.href = GLOBAL_SSL_URL + "mobile/mbr/mobile_mbr_member_login.do?returnUrl=/mobile/shop/mobile_shop_product_br_store.do";
						}
					    , cancel_func: function(){
							return ;
						}
					});
				}else{
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
							, ok_func : function(){
								document.frm_login.submit();
							}
					});
				}
			}else{
			MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "event/2015/event_2015_app_blue_ribbon_check_ajax.do",
					dataType : "json",
					success : function(data, textStatus){
						if(data.status == "succ"){
							var result = data.object;
							if(data.object =="YES"){
								showMessageBox({
									message : "아직 APP에서 구매이력이 없으시네요! </br> 구매시 웰컴 포인트가 지급됩니다."
								});
							}else{
								showMessageBox({
									message : "이런, 이전에 APP에서 구매하셨어요 </br> 아쉽지만 웰컴 포인트 대상자가 아닙니다. </br></br> <span style='color:#3262b7'>최종 구매일 : "+dateStrucChange(result.v_order_dtm,4)+"</br>"+[result.v_ordernm]+"</span></br></br>앞으로도 아모레퍼시픽몰 APP에 </br> 많이 사랑 부탁드립니다."
								});
							}
						}else{
							if(data.object == "login"){
								if(IS_LOGIN_SNS){
									showConfirmBox({
										message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
										, ok_func : function(){
											document.frm_login.submit();
										}
									    , cancel_func: function(){
											return ;
										}
									});
								}else{
									showConfirmBox({
										message : "로그인 하시면 서비스 이용이 가능하세요!"
											, ok_func : function(){
												document.frm_login.submit();
											}
									});
								}
							}else{
								showMessageBox({
									message : data.message
								});
							}
							
						}
					}
						
				});
			}
		},
		
		setPageInit : function(){
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_br_store_ajax.do",
				type 		: "POST",
				data		: { i_sBrandcd : $("input[name='i_sBrandcd']").val()
								, i_iNowPageNo : $("#i_iNowPageNo").val() },
				dataType 	: "json",
				animation : false,
				async	: false,
				success  	: function ( data, textStatus, jqXHR) {
					if(data.status == 'succ'){
						$("#i_iRecordCnt").val(data.object.recordCnt);
//						var prodlist = data.object.prodlist;
						MobileBRStore.fn.setProductList(data.object);
					}
					MobileBRStore.fn.addBtnEvent();
				}
			});
			
		},
		
		/**
		 * 상품 리스트 화면에 뿌려주는 function
		 */
		setProductList : function(object){
			
			var list = object.prodlist;
			var arrHtml = Array();
			var page = object.page;
			
			if(list != undefined && list.length > 0){
				$(".noResult").hide();
				for(var i=0; i < list.length; i++){
					var row = list[i];
					
					arrHtml.push("<li>");
					arrHtml.push("<div class='prodbox row'>");
					arrHtml.push("    <div class='prodImg cell'>");
					arrHtml.push("		<a href='#none' class='btn_open_popup' id='"+row.v_productcd+"'>");
					arrHtml.push("			<img src='"+row.v_img_web_path+"' alt='"+row.v_productnm+"' class='br_img'>");
					arrHtml.push("		</a>");		
					arrHtml.push("	</div>");
                    arrHtml.push("    <div class='detail cell' style=\"width:87%;\">");
                    if(row.v_brandnm == undefined){
                    	arrHtml.push("        <p class='brandNm'>아모레퍼시픽몰</p>");
                    } else{
                    	arrHtml.push("        <p class='brandNm'>"+row.v_brandnm+"</p>");
                    }
                    arrHtml.push("        <p class='prodNm'>"+row.v_productnm+"</p>");
                    arrHtml.push("        <p class='sp_point blueRebontxt'>"+SetNumComma(row.n_point)+"<span>P</span></p>");
                    arrHtml.push("    </div>");
                    arrHtml.push("    <div class='checkArea cell'>");
                    if(row.v_statuscd == "0002" || (row.v_statuscd == "0001" && row.n_stockqty <= 0)){
                    	arrHtml.push("        <span class='inputChk2 disabled'>");
                    	arrHtml.push("            <input type='checkbox' id='chk"+i+"' name='i_arrProduct' class='checkbox' value='"+row.v_productcd+"'/>");
                    	arrHtml.push("            <label for='chk"+i+"'></label>");
                    	
                    	arrHtml.push("			  <input type='hidden' name='i_arrOptioncd' value='"+row.v_optioncd+"'/>");
                    	arrHtml.push("			  <input type='hidden' name='i_arrProductCnt' value='1'/>");
                    	arrHtml.push("			  <input type='hidden' name='i_arrStatuscd' value='"+row.v_statuscd+"'/>");
                    	arrHtml.push("			  <input type='hidden' name='i_arrStockqty' value='"+row.n_stockqty+"'/>");
                    	var featureTag = row.v_feature_tag == undefined ? "" : row.v_feature_tag;
                    	var flagSoloPack = featureTag.indexOf("DG_P006") > -1 ? "Y" : "N";
                    	arrHtml.push("			  <input type='hidden' id='i_arrFlagSoloPack' value='"+flagSoloPack+"'/>");		
                    	arrHtml.push("        </span>");
                    }else{
                    	arrHtml.push("        <span class='inputChk2'>");
                    	arrHtml.push("            <input type='checkbox' id='chk"+i+"' name='i_arrProduct' class='checkbox' value='"+row.v_productcd+"'/>");
                    	arrHtml.push("            <label for='chk"+i+"'></label>");
                    	
                    	arrHtml.push("			  <input type='hidden' name='i_arrOptioncd' value='"+row.v_optioncd+"'/>");
                    	arrHtml.push("			  <input type='hidden' name='i_arrProductCnt' value='1'/>");
                    	arrHtml.push("			  <input type='hidden' name='i_arrStatuscd' value='"+row.v_statuscd+"'/>");
                    	arrHtml.push("			  <input type='hidden' name='i_arrStockqty' value='"+row.n_stockqty+"'/>");
                    	var featureTag = row.v_feature_tag == undefined ? "" : row.v_feature_tag;
                    	var flagSoloPack = featureTag.indexOf("DG_P006") > -1 ? "Y" : "N";
                    	arrHtml.push("			  <input type='hidden' id='i_arrFlagSoloPack' value='"+flagSoloPack+"'/>");		
                    	arrHtml.push("        </span>");
                    }
                  	arrHtml.push("    </div>");
                    arrHtml.push("</div>");
                    arrHtml.push("</li>");
				}
				$(arrHtml.join("\n")).appendTo($("#prod_list"));
			}
			if(page.i_iRecordCnt == 0){
				$(".noResult").show();
			}
			
			if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)){
				$(".btn_more").hide();
			} else{
				$(".btn_more").show();
			}
		},
	}
};

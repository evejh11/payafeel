var	MobileBillingBeautyProposeView = {
		
	name : "MobileBillingBeautyProposeView",
	init : function() {
        $('body, html').animate({
 			scrollTop: $(".beautyTop").height()
 		}, 800);
		MobileBillingBeautyProposeView.fn.init();
		MobileBillingBeautyProposeView.fn.addBtnEvent();
		MobileBillingBeautyProposeView.fn.setSubMenuChange();
	},
	fn : {
		
		init : function() {
			var $apPlusCate = $(".beautyTab li"); 
            var $apPlusCont = $(".beautyTabCont");

            $apPlusCont.hide();
            
            var eventCatecd = $("input[name='i_sEventCatecd']").val();
            
            var frm = $("form[name='frm']");
            
            var today = $("input[name='i_sToday']", frm).val();
	        
	        var li_EP001 = $("#li_EP001");
	        var flagRegSkin = $("input[name='i_sFlagRegSkin']", frm).val();
	        var statusSkin = $("input[name='i_sStatusSkin']", frm).val();
	        var eventStDtSkin = parseInt($("input[name='i_sEventStDtSkin']", frm).val());
	        
	        
	        var li_EP002 = $("#li_EP002");
	        var flagRegHair = $("input[name='i_sFlagRegHair']", frm).val();
	        var statusHair = $("input[name='i_sStatusHair']", frm).val();
	        var eventStDtHair = parseInt($("input[name='i_sEventStDtHair']", frm).val());
	        
	        var li_EP003 = $("#li_EP003");
	        var flagRegInner = $("input[name='i_sFlagRegInner']", frm).val();
	        var statusInner = $("input[name='i_sStatusInner']", frm).val();
	        var eventStDtInner = parseInt($("input[name='i_sEventStDtInner']", frm).val());
	        
	        var tab_default = "";
	        
	        if (flagRegSkin == 'N' && flagRegHair == 'N' && flagRegInner == 'N'){
	        	
	        	tab_default = "EP001";
	        	
	        } else if (flagRegSkin == 'Y' && flagRegHair == 'N' && flagRegInner == 'N') {
	        	
	        	if ((statusSkin == 'S' && eventStDtSkin + 5 >= today) || statusSkin == 'C' || statusSkin == 'Y'){
	        		
	        		tab_default = "EP001";
		        	
	        	} else {
	        		
	        		tab_default = "EP002";
	        		
	        	}
	        	
	        } else if (flagRegSkin == 'Y' && flagRegHair == 'Y' && flagRegInner == 'N') {
	        	
	        	if (statusHair == 'C'){
	        		
	        		if (eventStDtSkin + 5 >= today){
	        			
	        			tab_default = "EP001";
			        	
	        		} else {
	        			
	        			tab_default = "EP002";
	        			
	        		}
	        		
	        	} else if (statusHair == 'Y'){
	        		
	        		tab_default = "EP002";
	        		
	        	} else if (statusHair == 'S'){
	        		
	        		if (eventStDtHair + 5 >= today){
	        			
	        			tab_default = "EP002";
			        	
	        		} else {
	        			
	        			tab_default = "EP003";
			        	
	        		}
	        	}
	        	
	        } else if (flagRegSkin == 'Y' && flagRegHair == 'Y' && flagRegInner == 'Y') {
	        	
	        	if (statusSkin == 'S' && statusHair == 'S' && (statusInner == 'C' && eventStDtHair + 5 >= today)){
	        		
	        		tab_default = "EP002";
	        		
	        	} else {
	        		
	        		tab_default = "EP003";
	        	}
	        }
	        
	        if (tab_default == 'EP001'){
	        	
	        	$apPlusCont.eq(0).show();
	        	li_EP001.addClass("active");
	        	li_EP001.find("img").prop("src", li_EP001.find("img").attr("src").replace(".jpg","_on.jpg"));
	        	
	        } else if (tab_default == 'EP002'){
	        	
	        	$apPlusCont.eq(1).show();
	    		li_EP002.addClass("active");
	    		li_EP002.find("img").prop("src", li_EP002.find("img").attr("src").replace(".jpg","_on.jpg"));
	    		
	        } else if (tab_default == 'EP003'){
	        	
	        	$apPlusCont.eq(2).show();
	    		li_EP003.addClass("active");
	    		li_EP003.find("img").prop("src", li_EP003.find("img").attr("src").replace(".jpg","_on.jpg"));
	    		
	        } else {
	        	
	        	$apPlusCont.eq(0).show();
	    		li_EP001.addClass("active");
	    		li_EP001.find("img").prop("src", li_EP001.find("img").attr("src").replace(".jpg","_on.jpg"));
	    		
	        }

            $apPlusCate.unbind("click mouseenter").mouseenter(function(event){
              event.preventDefault();
                var $idxTab = $apPlusCate.index(this);
                $apPlusCont.hide().eq($idxTab).show(); 
                
                $apPlusCate.each(function(event){
                	$(this).find("img").prop("src", $(this).find("img").attr("src").replace("_on.jpg", ".jpg"));
                	$(this).removeClass("active");
                });
                
                $(this).find("img").prop("src",$(this).find("img").attr("src").replace(".jpg","_on.jpg"));
                
//                if($(this).hasClass("active") == false){
//                  $(".beautyTab li.tab01").find("img").prop("src",$(".beautyTab li.tab01").find("img").attr("src").replace("_on.jpg",".jpg"));
//                  $(".beautyTab li.tab01").removeClass("active");
//                }
//                $(this).find("img").prop("src",$(this).find("img").attr("src").replace(".jpg","_on.jpg"));
                return false;                         
            });

            $apPlusCate.unbind("click mouseleave").mouseleave(function(event){
              event.preventDefault();
                var $idxTab = $apPlusCate.index(this);
                $apPlusCont.hide().eq($idxTab).show(); 
                $(this).find("img").prop("src",$(this).find("img").attr("src").replace("_on.jpg",".jpg"));
                return false;                         
            });
            
		}
		
		, setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');
			select_input.click(function() {
				if($(this).val() == "mobile_shop_product_br_store") {
					location.href	= "/mobile/shop/" + $(this).val() + ".do";
				} else if ($(this).val() == "mobile_event_billing_beautypropose_view") {
					location.href	= "/mobile/event/" + $(this).val() + ".do";
				} else {
					location.href	= "/mobile/sale/" + $(this).val() + ".do";
				}
			});
		}
		
		, addBtnEvent : function(){
			
			
			$(".btn_billing_purchase").unbind("click").click(function(event){
				event.preventDefault();

				var frm_test = $("form[name='frm_test']");
				var testBilling = $("input[name='i_sTestBilling']", frm_test).val();
				
				var frm_billing = $("form[name='frm_billing']");
				var eventStatus = $("input[name='i_sEventStatus']", frm_billing).val();
				
				if (eventStatus != 'Y' || eventStatus == undefined || eventStatus == ''){
					
					if (testBilling != 'dongerame'){
						showMessageBox({message : "뷰티프로포즈 기간이 아니에요."});
						return;
					}
				}
				
				if (testBilling == 'dongerame'){
					frm_billing = frm_test;
				}
				
				var evtCategory = $("input[name='i_sEventCatecd']", frm_billing).val();
				var eventcd = $("input[name='i_sEventcd']", frm_billing).val();
				
				var productcd = $("input[name='i_sProductcd']", frm_billing).val();
				var optioncd = $("input[name='i_sBillingOptioncd']", frm_billing).val();
				
				var productCnt = "1";
				var flagSoloPack = "N";
				
				var server_type = $(".SERVER_TYPE").val();
				
				if (IS_LOGIN){
					
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT+"mobile/event/mobile_event_billing_info_check_ajax.do"
						, type : "POST"
						, dataType : "json"
						, data : {
							i_sEventcd : eventcd
							, i_sEventCatecd : evtCategory
						}
						, animation	: false
						, success : function ( data, textStatus, jqXHR) {
							
							if(data.status == "succ"){
								
								var checkMap = data.object;
								
								var duplChk = checkMap.i_sduplchk;
								var dateChk = checkMap.i_sdatechk;
								
								if (server_type != 'LOCAL'){
									if (evtCategory == dateChk){
										showMessageBox({message : "정기구독신청은 이전 구독해지로부터 6개월 이후 다시 신청가능하세요."});
										return;
									}
									
									if (evtCategory == duplChk) {
										showMessageBox({message : "이미 신청하신 정기구독 서비스에요."});
										return;
									}
								}
								
								MobileBillingBeautyProposeView.fn.addBillingPurchaseEvent(productcd, optioncd, productCnt, evtCategory, eventcd);
							} else {
								showMessageBox({message : "작업중 오류"});
							}
						}
					});
				} else {
					showConfirmBox({
						message: "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
						, ok_func : function(){
							document.frm_login.submit();
						}
					})
				}
			});
			
			$(".btn_normal_purchase").unbind("click").click(function(event){
				event.preventDefault();
				
				var frm_test = $("form[name='frm_test']");
				var testBilling = $("input[name='i_sTestBilling']", frm_test).val();
				
				var frm_billing = $("form[name='frm_billing']");
				var eventStatus = $("input[name='i_sEventStatus']", frm_billing).val();
				
				if (eventStatus != 'Y' || eventStatus == undefined || eventStatus == ''){
					
					if (testBilling != 'dongerame'){
						showMessageBox({message : "뷰티프로포즈 기간이 아니에요."});
						return;
					}
				}
				
				if (testBilling == 'dongerame'){
					frm_billing = frm_test
				}
				
				var evtCategory = $("input[name='i_sEventCatecd']", frm_billing).val();
				var eventcd = $("input[name='i_sEventcd']", frm_billing).val();
				
				var productcd = $("input[name='i_sProductcd']", frm_billing).val();
				var optioncd = $("input[name='i_sNormalOptioncd']", frm_billing).val();
				
				var productCnt = "1";
				var flagSoloPack = "N";
				
				var productCnt = "1";
				var flagSoloPack = "N";
				var chkFlag = "CHK";
				
				if (IS_LOGIN){
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT+"mobile/event/mobile_event_billing_stock_check_ajax.do"
						, type : "POST"
						, dataType : "json"
						, data : {
							i_sEventcd : eventcd
							, i_sProductcd : productcd
							, i_sOptioncd : optioncd
							, i_sChkFlag : chkFlag
						}
						, animation	: false
						, success : function ( data, textStatus, jqXHR) {
							
							if(data.status == "succ"){
								
								var restrictCnt = data.object;
								
								if (restrictCnt <= 0){
									showMessageBox({message : "재고수량이 없습니다."});
									return;
								} else {
									MobileBillingBeautyProposeView.fn.addNormalPurchaseEvent(productcd, optioncd, productCnt, eventcd, evtCategory);
								}
							}		
						}
					});
				} else {
					showConfirmBox({
						message: "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
						, ok_func : function(){
							document.frm_login.submit();
						}
					})
				}
			});
			
		}
		, addBillingPurchaseEvent : function(productcd, optioncd, cnt, evtCategorycd, eventcd){
			var frm_billing = $("form[name='frm_billing']");
			
			var list = [];
			
			list.push({
				productcd : productcd
				, optioncd : optioncd
				, cnt : cnt
				, typecd : "PROD_0001"
				, flagSoloPack : "N"
				, flagaction : "purchase"
			});
			
			MobileBodyStart.immediatelyBillingPurchage({list : list}, evtCategorycd, eventcd);
		}
		, addNormalPurchaseEvent : function(productcd, optioncd, cnt, eventcd, evtCategorycd) {
			var list = [];
			
	//    	for(var i=0;i<optioncd.size(); i++) {
	//    		
	//    		var option = optioncd.eq(i).val();
	//    		var optioninfo = $("#span_option_"+option);
	//    		
	    		list.push({
	    			productcd : productcd
	    			, optioncd : optioncd
	    			, cnt : cnt
	    			, typecd : "PROD_0001"
	    			, flagSoloPack : "N"
	    			, flagaction : "purchase"
	    		});
	//    	}
	    	
	    	MobileBodyStart.immediatelyBillingNormalPurchage({list : list}, eventcd, evtCategorycd);
	    	$(".btn_layer_close").unbind("click").click(function(event){
	    		clickFlag = false;
	    	});
		}
	
		
	}
};

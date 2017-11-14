/**
 * 모바일 상품상세의 이벤트 처리를 위한 Javascript
 */
var flag_slide = false;
var clickFlag = false;
var clickFlag2 = false;

var MobileShopProductDetail = {
	name : "MobileShopProductDetail",
	val : {
		v_st_content		: null
		, v_en_content		: null
		, v_content_type	: null
		, v_optionnm		: null
		, v_dis_type		: null
		, n_cnt				: 0
	},
	init : function() {

		if($("#i_sFlagReser").val() == "Y" || $("#i_sProductKaKao").val() == "SPR20170124000026690"){
			//$(".btn_purchase").css("cursor", "not-allowed");
			//$(".btn_purchase").addClass("btn_purchase_not").removeClass("btn_purchase");
			
			$(".btn_add_cart").css("cursor", "not-allowed");
			$(".btn_add_cart").addClass("btn_add_cart_not").removeClass("btn_add_cart");
			
			$(".btn_wish_add").css("cursor", "not-allowed");
			$(".btn_wish_add ").addClass("btn_wish_add_not").removeClass("btn_wish_add");
			
		}
		
		if(GLOBAL_MOBILE_APP == "APP"){
			$(".apAppBanner").hide();
		}
		
		MobileShopProductDetail.fn.getPageInit();
		MobileProductDetailStyle.init();
		$(".tit","#accoTab").eq(5).click();
		
		window.adbannerSwipe = new Swipe(document.getElementById('adbannerSwipe'), {
           continuous: true,
           stopPropagation: true,
           callback: function(event, element) {
        	   if($(".Adbanner_div").size() == 4 && $("#prodViewAdbanner-nav > span").size() == 2){
        		   if(event == 2){
        			   $("#prodViewAdbanner-nav > span").removeClass().eq(0).addClass("active");
        		   }else if(event == 3){
        			   $("#prodViewAdbanner-nav > span").removeClass().eq(1).addClass("active");
        		   }else{
        			   $("#prodViewAdbanner-nav > span").removeClass().eq(event).addClass("active");
        		   }
        	   }else{
            	   $("#prodViewAdbanner-nav > span").removeClass().eq(event).addClass("active");
               }
           }
       });
		if (!isEmpty(MobileShopProductDetail.val.v_content_type)) {
			MobileShopProductDetail.fn.setDisplay();
		}
		

	},
	fn : {
		
		/**
		 * 버튼 이벤트 핸들링
		 */
		addBtnEvent : function() {
			
			$(".btn_hotDeal").unbind("click").click(function(event){
				event.preventDefault();
				if(clickFlag2){
					return;
				}else{
					clickFlag2 = true;
				}
				var frm = $("form[name='frm']");
				cmAjax({
					url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_hotdeal_check_ajax.do",
					type : "POST",
					data : {i_sProductcd : $("#i_sProductKaKao").val(),i_sHotdealcd : $(".span_hotdealcd").text()},
					dataType : "json",
					success : function(data,textStatus){
						if(data.status == "succ"){
							//구매하기 페이지 연결
							MobileShopProductDetail.fn.purchaseBeautyHotdeal(MobileShopProductDetail.fn.addPurchaseEvent,data.object);
						}else{
							if(data.message =="login"){
								showConfirmBox({
									message : "뷰티포인트 특가 구매는 로그인시 가능합니다.<br/>로그인하시겠습니까?"
										, ok_func : function(){
											document.frm_login.submit();
										}
								});
							}else{
								showMessageBox({
									message : data.message,
									close: function(){
										clickFlag2 = false;
									}
								});
							}
						}
					}
				});
			});
			
			$(".a_goApp_sns").unbind("click").click(function(event){
				event.preventDefault();
				var url = "http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd="+$("#i_sProductcd").val();

				location.href = "http://www.amorepacificmall.com/mobile/goApp.do?target="+ url;
			});
			
			$(".a_goApp_sns2").unbind("click").click(function(event){
				event.preventDefault();
				var id = $(this).attr("id");
				var url = "http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd="+$("#i_sProductcd").val()+"&channeltype="+id;

				location.href = "http://www.amorepacificmall.com/mobile/goApp.do?target="+ url;
			});
			//SNS 공유
			 $(".btn_fb").unbind("click").click(function(event){
				event.preventDefault();
				var shareCon = $(this).attr("id");
				var img = $("#i_sFbThumbPath").val();
				var name = shareCon.split(",")[1];
				var desc = shareCon.split(",")[2];
				
				if(GLOBAL_MOBILE_APP == "APP") {
					var link = "http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd="+$("#i_sProductcd").val()+"&i_sFlagSnsBrowser=Y";
					var str = "facebook::i_sName::"+encodeURI(name)+"::i_sLink::"+link+"::i_sDescription::"+encodeURI(desc)+"::i_sPicture::"+img;
					
					window.location = str; 
				}else{
					var rvo = {
							 name : name
							 ,link : "http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd="+$("#i_sProductcd").val()+"&i_sFlagSnsBrowser=Y"
							,picture : img
							,description : desc
						};
						
						MobileShopProductDetail.fn.facebookShare(rvo,"Y");
				}
				
			});
//			 $(".btn_fb_test").unbind("click").click(function(event){
//					event.preventDefault();
//					var shareCon = $(this).attr("id");
//					var img = $("#i_sFbThumbPath").val();
//					var name = shareCon.split(",")[1];
//					var desc = shareCon.split(",")[2];
//					var link = "http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd="+$("#i_sProductcd").val()+"&i_sFlagSnsBrowser=Y";
//					var str = "facebook::i_sName::"+encodeURI(name)+"::i_sLink::"+link+"::i_sDescription::"+encodeURI(desc)+"::i_sPicture::"+img;
//					
//					window.location = str; 
//			});
	        
	        $(".btn_pinit").unbind("click").click(function(event) {
				event.preventDefault();
				var productnm = $("#i_sProductnm").val();
				var imgpath   = $("#i_sThumbnailPath").val();
				var productcd = $("#i_sProductKaKao").val();
				if(GLOBAL_MOBILE_APP == "APP") {
					var url = "http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd="+productcd+"&i_sFlagSnsBrowser=Y";
					
					var str = "pinterest::i_sUrl::"+url+"::i_sImgPath::"+imgpath+"::i_sDescription::"+encodeURI(productnm);
					window.location = str; 
				}else{
					var arrPars = new Array();
					arrPars.push("url=" + encodeURI("http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd=")+productcd+"&i_sFlagSnsBrowser=Y");
					arrPars.push("media=" + encodeURI(imgpath));
					arrPars.push("description=" + encodeURI(productnm));
					
					window.open("//pinterest.com/pin/create/button/?" + arrPars.join("&"));
					  
				}
				
			});
	       
			$(".kakaostory_share").unbind("click").click(function(event){
				event.preventDefault();
				if(GLOBAL_MOBILE_APP == "APP") {
					var longurl = "http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sFlagSnsBrowser=Y&i_sProductcd="+$("#i_sProductKaKao").val();
					var shortstr = MobileShopProductDetail.fn.setShortenUrl(longurl);
					var str = "kakaostory::i_sUrl::"+shortstr+"::i_sImgPath::"+$("#i_sKsThumbPath").val()+"::i_sText::"+encodeURI("[APmall] \"아모레퍼시픽몰에서 뷰티잇템 만나보세요 :)\"")+"::i_sTitle::"+encodeURI($("#i_sProductnm").val())+"::i_sDescription::"+encodeURI($("#i_sComment").val());
					 
			    	window.location = str;
				}else{
					 Kakao.Story.share({
					        url: 'http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sFlagSnsBrowser=Y&i_sProductcd='+$("#i_sProductKaKao").val(),
					        text: '[APmall] "아모레퍼시픽몰에서 뷰티잇템 만나보세요 :)"'
					  });
				}
				
			});
			
	        $(".btn_url").unbind("click").click(function(event){
	        	event.preventDefault();
	        	modalPopup("#modalPopupCopyUrl");
	        	document.getElementById("i_sCopyUrl").focus();
	    		document.getElementById("i_sCopyUrl").select();
	        });
			// 알림박스 닫기
			$(".btn_spClose").unbind("click").click(function(event) {
				event.preventDefault();
				var idx = $(".btn_spClose").index($(this));
				$(".alimDetailBox").eq(idx).remove();
			});
			
//			옵션리스트 펼치기 & 닫기
			$(".div_optionListBox").unbind("click").click(function(event){
				event.preventDefault();
	    		
	    		$(".div_optionList table").slideToggle("fast");
			});
			
//			옵션 선택
			$(".tr_option").unbind("click").click(function(event) {
				event.preventDefault();
				
				var optioncd = $(this).attr("id");
				
				if(optioncd != "") {
					MobileShopProductDetail.fn.setOptionSelect(optioncd);
				} else {
					$(".div_todaydeli").html("");
					$(".div_makeupArea").hide();
				}
				
				//gypark : 쿠션 리필
				var cnt = 0;
				var size = $("input[name='i_arrOptioncd']", $(".selectNumbox")).size();
				
				for(var i = 0; i < size; i++){
					var optval = $("input[name='i_arrOptioncd']", $(".selectNumbox")).eq(i).val();
					
					if($(".cusion_"+optval).size() > 0){
						cnt++;
					}
				}
				
				if(cnt > 0){	
					$(".notice_txt_pink").show();
				}else{
					$(".notice_txt_pink").hide();
				}
				
				$(".sec_choice_opt .sec.optionBox .sec_optionList .sec_optionListBox").click();
			});
			
			// 구매후기 아코디언 클릭시
			$(".btn_textReview").unbind("click").click(function(event) {
				event.preventDefault();
				
				$("input[name='i_sTypecd']").val("0004");
				
				if($(".div_textReviewBox", ".div_textReviewArea").length == 0 &&  $(".nodata", ".div_textReviewArea").length == 0) {
					MobileShopProductDetail.fn.getReviewList();
				}
			});
			
			// 포토리뷰 아코디언 클릭시
			$(".btn_photoReview").unbind("click").click(function(event) {
				event.preventDefault();
				
				$("input[name='i_sTypecd']").val("0001");
				
				if($(".div_photoReviewBox", ".div_photoReviewArea").length == 0 && $(".nodata", ".div_photoReviewArea").length == 0) {
					MobileShopProductDetail.fn.getReviewList();
				}
			});
			
			// 상품추가 정보 버튼 클릭시
			$(".btn_prodAddInfo").unbind("click").click(function(event) {
				event.preventDefault();
				
				modalPopup("#modalPopupProdAddInfo");
			});
			
			$(".btn_con_report").unbind("click").click(function(event){
				event.preventDefault();

				var recordid = $(this).attr("id");
				var returnUrl = $("input[name='i_sReturnUrl']").val()+"?"+$("input[name='i_sReturnParam']").val();
				var table   = "CMC_REVIEW";

				var frm = document.frm_report;

				$("input[name='i_sTable']",frm).val(table);
				$("input[name='i_sReportcont']",frm).val(recordid);
				$("input[name='i_sReturnUrl']",frm).val(returnUrl);

				if (GLOBAL_FLAG_APP_NEW == "Y") {
					try {
						if(GLOBAL_MOBILE_OS == "AND") {
							MobileBodyStart.setLoginUserInfo();
						}
						else {
							window.webkit.messageHandlers.requestUserInfo.postMessage(null);
						}
					}catch(e){
						alert(e);
					}
					var arrParam = [];
					if(GLOBAL_LOGIN_KEY != "") {
						$("input[name='i_sLoginKey']", $("form[name='frm_report']")).remove();
						arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
					}
					if(GLOBAL_LOGIN_TYPE != "") {
						$("input[name='i_sLoginType']", $("form[name='frm_report']")).remove();
						arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
					}
					$("input[name='i_sDeviceNum']", $("form[name='frm_report']")).remove();
					arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
					$(arrParam.join("")).appendTo($("form[name='frm_report']"));
				}
				frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_report.do";
				frm.submit();
				
			});
			
			// 전성분 확인하기 버튼 클릭시
			$(".btn_ingredient").unbind("click").click(function(event) {
				event.preventDefault();
				
				modalPopup("#modalPopupIngredient");
			});
			
			// 구매후기 더보기
			$(".btn_text_more").unbind("click").click(function(event) {
				event.preventDefault();
				
				$("input[name='i_sTypecd']").val("0004");
				$("#i_iNowPageNo_0004").val(parseInt($('#i_iNowPageNo_0004').val(), 10) + 1);
				MobileShopProductDetail.fn.getReviewList();
			});
			
			// 포토리뷰 더보기
			$(".btn_photo_more").unbind("click").click(function(event) {
				event.preventDefault();
				
				$("input[name='i_sTypecd']").val("0001");
				$("#i_iNowPageNo_0001").val(parseInt($('#i_iNowPageNo_0001').val(), 10) + 1);
				MobileShopProductDetail.fn.getReviewList();
			});
			
			// 상품 좋아요
			$(".btn_productLike").unbind("click").click(function(event){
				event.preventDefault();
				
				if(!IS_LOGIN) {
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function() {
							var returnUrl = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$("input[name='i_sProductcd']").val();
							MobileBodyStart.goLogin(returnUrl);
						}
					});
				} else {
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_like_ajax.do"
						, type : "POST"
						, dataType : "json"
						, data : {
							i_sProductcd : $("input[name='i_sProductcd']").val()
						}
						, animation : false
						, async : false
						, success : function(data, textStatus) {
							if(data.status == "succ") {
								var voteCnt = SetNum($(".em_ico_like").text());
								
								if(data.object == "like") {
									$(".em_ico_like").removeClass("ico_splikeOff");
									$(".em_ico_like").addClass("ico_splikeOn");
									
									$(".em_ico_like").text(parseInt(voteCnt)+1);
								} else {
									$(".em_ico_like").removeClass("ico_splikeOn");
									$(".em_ico_like").addClass("ico_splikeOff");
									
									$(".em_ico_like").text(parseInt(voteCnt)-1);
								}
								
								var flag = data.object;
								MobileShopProductDetail.fn.balloonLike(flag);
							} else if(data.status == "isNotLogin") {
								showConfirmBox({
									message : "로그인 하시면 서비스 이용이 가능하세요!"
									, ok_func : function() {
										var returnUrl = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$("input[name='i_sProductcd']").val();
										MobileBodyStart.goLogin(returnUrl);
									}
								});
							} else {
								showMessageBox({
									message : data.message
								});
							}
						}
					});
				}
			}); 
			
			
			// 메이크업 제품 컬러 선택시 이벤트
			$(".li_color").unbind("click").click(function(event) {
				event.preventDefault();
				var id = $(this).attr("id");
				
				if($("img", this).size() > 0) {
					$("img", ".li_color").css("border", "");
					$(".li_color").removeClass("active");
					$("img", this).css("border", "2px solid #5a95ff");
				} else {
					$(".li_color").removeClass("active");
					$("img", ".li_color").css("border", "");
					$(this).addClass("active");
				}
				
				
				$("option", ".sel_option").each(function() {
					if($(this).val() == id) {
						$(this).prop("selected", true);
					}
				});
				
				var optioninfo = $("#span_option_"+id);
				var optionnm = $(".span_optionnm", optioninfo).text();
				
				$(".p_selectOptionTxt").show();
				$(".p_selectOptionTxt").text(optionnm + "을(를) 선택하셨습니다.");
				
				MobileShopProductDetail.fn.setOptionSelect(id);
			});
			
			// 구매후기, 포토리뷰 추천
			$(".btn_vote").unbind("click").click(function(event) {
				event.preventDefault();
				
				var reviewcd = $(this).attr("id").split("/")[0];
				var type = $(this).attr("id").split("/")[1];
				var idx = $(".btn_vote").index($(this));
				
				updateMobileVoteCnt(reviewcd, type, idx);
			});
			
			// 재고알림 신청
			$(".btn_alrim").unbind("click").click(function(event) {
				event.preventDefault();
				
				if(GLOBAL_MOBILE_APP == "APP") {
					if(!IS_LOGIN) {
						showConfirmBox({
							message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function() {
									var returnUrl = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$("input[name='i_sProductcd']").val();
									MobileBodyStart.goLogin(returnUrl);
								}
						});
					} else {
						modalPopup("#modalPopupReceivePush");
					}
				} else {
					showMessageBox({
						message : "해당 서비스는 아모레퍼시픽몰 어플에서만 신청가능합니다."
						, btn_message : "다운로드"
						, close : function() {
							appDownloadProc();
						}
					});
				}
			});
			
			// 재고알림 신청
			$(".btn_push_receive").unbind("click").click(function(event) {
				event.preventDefault();
				if(!IS_LOGIN) {
					$("#modalPopupReceivePush").hide();
					/*showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
						, ok_func : function() {
							var returnUrl = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$("input[name='i_sProductcd']").val();
							MobileBodyStart.goLogin(returnUrl);
						}
					});*/
					var options = {
						type : "reload"	
					};
					
					MobileBodyStart.getLoginCheck(options);
				} else {
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_push_ajax.do"
						, dataType : "json"
						, data : {
							"i_sProductcd" : $("#i_sProductcd").val()
							, "i_sOptioncd" : $("#i_sSoldOutOption").val()
						}
						, animation : false
						, async : false
						, success : function(data) {
							if(data.status == "succ") {
								$("#modalPopupReceivePush").hide();
								showMessageBox({
									message : "신청완료!!"
									, close : function() {
										modalPopupClose('#modalPopupReceivePush');
									}
								});
							} else if (data.status == "isNotLogin") {
								$("#modalPopupReceivePush").hide();
								var options = {
									type : "reload"	
								};
								
								MobileBodyStart.getLoginCheck(options);
							} else {
								$("#modalPopupReceivePush").hide();
								showMessageBox({
									message : data.message
								});
							}
						}
					});
				}
			});
			
			// 포토리뷰 상세화면으로 이동
			$(".btn_review_detail").unbind("click").click(function(event) {
            	event.preventDefault();
				var id = $(this).attr("id");				
				var productcd = $('#i_sProductcd').val();
				var returnurl = $("input[name='i_sReturnUrl']").val()+"?"+$("input[name='i_sReturnParam']").val();
				var url = GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_view.do?i_sFlagReply=N&i_sShopViewFlag=Y&i_sReviewcd="+id+"&i_sProductcd="+productcd+"&i_sReturnUrl="+returnurl;
				
				location.href = url;
			});
			
			//상세내용 보기
			$(".btn_bigImg").unbind("click").click(function(event) {
				event.preventDefault();
				var productcd = $('#i_sProductcd').val();
				
				if(GLOBAL_MOBILE_APP == "APP") {
					if(GLOBAL_MOBILE_OS == "iOS" || GLOBAL_MOBILE_OS == "IOS"){
						window.location="apjscall://jsShowSubWebView?"+GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_img_detail.do&&i_sProductcd="+productcd;
					}else{
						window.aMain.jsNewWebView(GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_img_detail.do?i_sProductcd="+productcd);
					}
				}else{
					var frm = $("#frm_move");
					frm.attr("action", GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_img_detail.do");
					frm.submit();
				}
				
			});
			
			$(".btn_beautyProfile").unbind("click").click(function(event){
				event.preventDefault();
				var id = $(this).attr("id");
				MobileBeautyProfile.fn.addPopupBtnEvent(id);
			});
			
			$(".btn_add_cart").unbind("click").click(function(event) {
				event.preventDefault();
				MobileShopProductDetail.fn.purchaseOnePlusCheck(MobileShopProductDetail.fn.addCartEvent,"cart");
			});
			
			//gypark
            try{
            	
            	$(".btn_add_cart").unbind("mousedown").mousedown(function(event){
            		event.preventDefault();
//            		var productcd = $("input[name='i_sProductcd']", "#frm");
            		var productcd = $("input[name='i_sProductcd']", "#frm").val();
            		var cnt = $("input[name='i_arrProductCnt']").not(":disabled");
            		var sum = 0;
            		for(var i = 0; i < cnt.length; i++){
            			sum = sum + cnt.eq(i).val();
            		}
//            		AEC_F_D1(productcd,'i', '1');
            	});
            	
            	$(".btn_purchase").unbind("mousedown").mousedown(function(event){
            		event.preventDefault();
            		var productcd = $("input[name='i_sProductcd']", "#frm");
            		var cnt = $("input[name='i_arrProductCnt']").not(":disabled");
            		var sum = 0;
            		for(var i = 0; i < cnt.length; i++){
            			sum = sum + cnt.eq(i).val();
            		}
//            		AEC_F_D(productcd, 'i', sum);
            	});
            	
            }catch(e){}
            
			$(".btn_add_cart_not").unbind("click").click(function(event) {
				event.preventDefault();
				if($("#i_sFlagReser").val() == "Y"){
					showMessageBox({
						message : "이 상품은 사전예약 상품으로 예약주문만 가능해요!"
					});
				}else{
					showMessageBox({
						message : "이 상품은 현재 장바구니에 담으실 수 없습니다."
					});
				}
			});
			
			$(".btn_wish_add_not").unbind("click").click(function(event){
				event.preventDefault();
				if($("#i_sFlagReser").val() == "Y"){
					showMessageBox({
						message : "이 상품은 사전예약 상품으로 예약주문만 가능해요!"
					});
				}else{
					showMessageBox({
						message : "이 상품은 현재 위시리스트에 담으실 수 없습니다."
					});
				}
			});
			
			$(".btn_wish_add").unbind("click").click(function(event) {
				event.preventDefault();
				var productcd  = $("input[name='i_sProductcd']");
				var optioncd   = $(".span_wishOptioncd");
				var cnt		   = $(".span_wishCnt");
				
				if (productcd.val() == "SPR20170124000026690"){
					showMessageBox({message : "이 상품은 현재 위시리스트에 담으실 수 없습니다."});
					return;
				}
				
				
				var size = optioncd.size();
				
				if(size == 0){
					showMessageBox({message : "위시리스트에 담기 위해서는 옵션을 선택해주세요."});
					return;
				}
				
				if(IS_LOGIN || IS_LOGIN_SNS) {
					
					var list = [];
					
					for(var i=0; i<size; i++){
						var option = optioncd.eq(i).text();
                		var optioninfo = $("#span_option_"+option);
						list.push({
							productcd : productcd.val()
							, optioncd : optioncd.eq(i).text()
							, cnt : cnt.eq(i).text()
							, flagSoloPack : $(".span_flag_solopack", optioninfo).text()
						});
						
					}
					
            		//SmartOffer - 개인화 추천 태깅 (위시리스트 담기)
                	try{
        	        	var wishList = [];
        	        	var optcd = $("input[name='i_arrOptioncd']").not(":disabled");
    		        	for(var i=0; i<optcd.size(); i++) {
    		        		var option = optcd.eq(i).val();
    		        		var optioninfo = $("#span_option_"+option);
    		        		var list_price = parseInt($(".span_option_price", optioninfo).text());
    		        		var price = parseInt($(".span_option_dc_price", optioninfo).text());
    		        		var productCnt = parseInt($("input[name='i_arrProductCnt']").eq(i).val());
    		        		var clickUrl = ""; 
    		        		
    		        		if(_A_dp != "" && _A_dp != null) { 
    		        			clickUrl = _A_url + "&cust=" +_A_cust+ "&recommendId=" +_A_recommendId+ "&dp=" +_A_dp+ "&planId=" +_A_planId+ "&scenarioId=" +_A_scenarioId+ "&itemSetId=" +_A_itemSetId+ "&channelId=" + _A_channelId + "&targetGroupId=" +_A_targetGroupId+ "&abTestKey=" +_A_abTestKey+ "&ITEM_VALUE=" + _A_ITEM_VALUE;
    		        		} 
    		        		
    		        		wishList.push({
    		        			  ITEM_VALUE : productcd.val()
    		        			, name : _SL_pn[0]
    		        			, brand  : _SL_br[0]
    		        			, category : _SL_ct[0]
    		        			, price : Number(list_price * productCnt)
    		        			, qty   :  productCnt
    		        			, prodOptionCode : option
    		        			, discountPrice : Number(price * productCnt)
    		        			, clickUrl : clickUrl
    		        		});
    		        	}
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
								ok_func : function(){
									location.href=GLOBAL_WEB_URL+"mobile/my/mobile_my_wish_list.do";
								}
							});
						}						
					});
					
					
					try{
						var fbobj = 
    					{id : "197208744125070"
    					 , type : "category_custom"
    					 , tracktype : "Btn_wishlist"};
						goReserveFacebook(fbobj);
    			
					}catch(e){}
    					//헤라 루즈홀릭 슬릭 
	        		try{
	        			if(productcd.val() == "SPR20170524000029672"){
    	        			goog_report_conversion(undefined,'xOXyCKz9jnMQ4LaBlgM','851467104');
    	        		}
    	        		if(productcd.val() == "SPR20170412000028808"){
    	        			goog_report_conversion(undefined,'LT2YCK_wp3MQ4LaBlgM','851467104');
    	        		}
    	        		if(productcd.val() == "000026129"){
    	        			goog_report_conversion(undefined,'JCXkCMT83XMQ4LaBlgM','851467104');
    	        		}
    	        		
    	        		if(productcd.val() == "SPR20170801000031216"){
    	        			goog_report_conversion(undefined,'WEjoCJum6XMQ4LaBlgM','851467104');
    	        		}
    	        		
    	        		//gypark : 아이오페 슈퍼바이탈 크림
    	        		if(productcd.val() == "SPR20150825000010927"){
    	        			goog_report_conversion(undefined,'mqKeCL2Cv3QQ4LaBlgM','851467104');
    	        		}
	        		}catch(e){}
				} 
				else {
					var options = {
						type : "reload"	
					};
					var list = [];
					
					for(var i=0; i<size; i++){
						var option = optioncd.eq(i).text();
                		var optioninfo = $("#span_option_"+option);
						list.push({
							productcd : productcd.val()
							, optioncd : optioncd.eq(i).text()
							, cnt : cnt.eq(i).text()
							, flagSoloPack : $(".span_flag_solopack", optioninfo).text()
							, flagaction : "wish"
						});
						
					}
					MobileBodyStart.fnLoginPageCheck(options,list);
				}
				
			});		
			
			$(".btn_purchase").unbind("click").click(function(event) {
				event.preventDefault();
				if(IS_LOGIN || IS_LOGIN_SNS) {
					MobileCommon.ajax({
    					url : GLOBAL_WEB_ROOT+"order/order_complete_count_ajax.do"
    					, type : "POST"
    					, data : {i_sProductcd : $("#i_sProductKaKao").val()}
    					, dataType : "json"
    					, animation	: false
    					, success : function ( data, textStatus, jqXHR) {
    						
    						if(data.status == "succ"){
    							
    							if($("#i_sProductKaKao").val() == "SPR20161228000025917"){
    								if(data.object > 0){
        								showMessageBox({message : "하루에 주문 1회만 가능해요.<br/>내일 주문 부탁드릴게요!"});
        								return;
        							}else{
        								MobileShopProductDetail.fn.purchaseOnePlusCheck(MobileShopProductDetail.fn.addPurchaseEvent,"purchase");
        							}
    							}else{
        							if(data.object >= 3){
        								showMessageBox({message : "하루에 주문 3회만 가능해요.<br/>내일 주문 부탁드릴게요!"});
        								return;
        							}else{
        								MobileShopProductDetail.fn.purchaseOnePlusCheck(MobileShopProductDetail.fn.addPurchaseEvent,"purchase");
        							}
    							}

    						}		
    					}
    				});
            	}else{
            		MobileShopProductDetail.fn.purchaseOnePlusCheck(MobileShopProductDetail.fn.addPurchaseEvent,"purchase");
            	}
				
			});

			$(".btn_onepay_purchase").unbind("click").click(function(event) {
				event.preventDefault();
				if(IS_LOGIN) {
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT + "app/api/shop/app_api_shop_order_limit_check_ajax.do"
						, type : "POST"
						, data : {
							i_sProductcd		: $("input[name='i_sProductcd']").val()
							, i_sFlagSecret		: $("input[name='i_sFlagSecret']").val()
							, i_iDayOrderLimit	: $("input[name='i_iDayOrderLimit']").val()
							, i_sDeviceNum		: '5f21bb94722dd291'
							, i_sOrderType		: 'onepay'
							, i_sLoginType		: 'BT'
						}
						, beforeSend	: function() {
							alert("111");
						}
						, dataType : "json"
						, animation	: false
						, success : function ( data, textStatus, jqXHR) {

							if(data.status == "succ") {

								if($("#i_sProductKaKao").val() == "SPR20161228000025917"){
									if(data.object > 0){
										showMessageBox({message : "하루에 주문 1회만 가능해요.<br/>내일 주문 부탁드릴게요!"});
										return;
									}else{
										MobileShopProductDetail.fn.purchaseOnePlusCheck(MobileShopProductDetail.fn.addOnePayPurchaseEvent,"purchase");
									}
								}else{
									if(data.object >= 3){
										showMessageBox({message : "하루에 주문 3회만 가능해요.<br/>내일 주문 부탁드릴게요!"});
										return;
									}else{
										MobileShopProductDetail.fn.purchaseOnePlusCheck(MobileShopProductDetail.fn.addOnePayPurchaseEvent,"purchase");
									}
								}
								
							}
							else if (data.status == "needInfo") {
								if(data.object.regInfo.v_flag_shipping == "N") {
									location.href = "/mobile/my/mobile_my_shipping.do";
								}
								else if (data.object.regInfo.v_flag_onepay == "N") {
									location.href = "/mobile/my/mobile_my_card_billkey_list.do";
								}
							}
							else {
								showMessageBox({message : data.message});
							}
						}
						, error : function(e) {
							
						}
					});
				}
				else {
					showMessageBox({message : "로그인"});
					return;
				}
			});

			$(".btn_purchase_not").unbind("click").click(function(event) {
				event.preventDefault();
				
				showMessageBox({
					message : "이 상품은 현재 구매하실 수 없습니다."
				});
			});
			$(".btn_text_modify").unbind("click").click(function(event) {
				event.preventDefault();
				
				var reviewcd = $(this).attr("id");
				
				var obj = {
					i_sReviewcd : reviewcd
				};
				$("input[name='i_sReviewcd']").val(reviewcd);
				if(!flag_slide){
					MobileReviewCommStyle.init();
					flag_slide = true;
				}
				
				cmAjax({
					url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_review_reg_ajax.do"
					, dataType : "json"
					, data : obj
					, animation : false
					, async : false
					, success : function(data, textStatus) {
						if(data.status == "succ") {
							var product = data.object.product;
							var option = data.object.option;
							var info = data.object.info;
							
							MobileShopProductDetail.fn.setReviewReg(product, option, "Y");
							
							var grade = info.n_recom_point;
							$('.noUi-target').eq(0).removeClass('grade-00 grade-01 grade-02 grade-03 grade-04 grade-05');

							$(".noUi-target").eq(0).addClass('grade-0'+grade);
							
							$("input", "#range0"+grade).attr("checked", true);
							
							$("textarea[name='i_sContent']").val(info.v_content);
							$(".p_byte>em").text(info.v_content.length);
							
							if(info.v_flag_rebuy == "Y") {
								$("#label_flagRebuy").addClass("active");
								$("input[name='i_sFlagRebuy']").attr("checked", true);
							}
							
							$("#i_sReviewcd").val(info.v_reviewcd);
							
							$(".btn_review_reg", ".btnArea").hide();
							$(".btn_review_mod", ".btnArea").show();
							addInputMessageEvent();
							
							modalPopup("#productReviewWrite");
							
						} else {
							showMessageBox({
								message : data.message
							});
						}
					}
				});
			});
			$(".btn_review_cancel").unbind("click").click(function(event) {
				event.preventDefault();
				
				removeErrorMessage();
				modalPopupClose('#productReviewWrite');
			});
			
			$(".btn_modalpopupClose").unbind("click").click(function(event) {
				event.preventDefault();
				
				removeErrorMessage();
				modalPopupClose('#productReviewWrite');
			});
			
			$(".btn_option_del").unbind("click").click(function(event) {
				event.preventDefault();
				var product = $(this).parent().attr("class");
				
				if($("."+product).find(":disabled").length == 1) {
					$("option", ".selectBox").eq(0).prop("selected", true);
					$(".ul_option").hide();
				}
				
				var id = $(this).attr("id");
				$("#li_"+id).hide();
				$("input[type='hidden']", $("#li_"+id)).prop("disabled", true);
				
				//gypark : 쿠션 리필
				var cnt = 0;
				var size = $("input[name='i_arrOptioncd']", $(".selectNumbox")).size();
				
				for(var i = 0; i < size; i++){
					var optval = $("input[name='i_arrOptioncd']", $(".selectNumbox")).eq(i).val();
					
					if($(".cusion_"+optval).size() > 0){
						cnt++;
					}
				}
				
				if(cnt > 0){	
					$(".notice_txt_pink").show();
				}else{
					$(".notice_txt_pink").hide();
				}
			});
			
			$(".selectBox").unbind("change").change(function() {
				removeErrorMessageBox($("*[name='i_sProductcd']"));
				removeErrorMessageBox($("*[name='i_arrOptioncd']").eq(0));
				if($(this).val() != "") {
					var id = $(this).val();
					//$(".ul_option").show();
					$(".ul_option>li").hide();
					$("input[type='hidden']", ".ul_option>li").prop("disabled", true);
					
					var option_cnt = parseInt($("#input_option_cnt", $(".li_"+id)).val());
					if(option_cnt > 1) {
						$(".li_"+id).show();
						$(".ul_option").show();
					}
					$("input[type='hidden']", $(".li_"+id)).prop("disabled", false);
				} else {
					$(".ul_option>li").hide();
					$("input[type='hidden']", ".ul_option>li").prop("disabled", true);
					$(".ul_option").hide();
					
					addErrorMessageBox($("*[name='i_sProductcd']"), "등록하실 상품을 선택해 주세요.");
				}
			});
			
			$("#i_sContent").unbind("keyup").keyup(function() {
				var content = $(this).val();
				content = EmptyReplace(content);
				var length = content.length;
				removeErrorMessageBox($("*[name='i_sContent']"));
				if(length > 200) {
					$(".p_byte>em").html("<font color=\"red\">"+length+"</font>");
				} else {
					$(".p_byte>em").text(length);
					
					if(length == 0) {
						addErrorMessageBox($("*[name='i_sContent']"), "내용을 입력해주세요.");
					}
				}
			});
			
			$("#gradeSlider").unbind("click").click(function() {
				removeErrorMessageBox($("*[name='i_iRecomPoint']").eq(0));
			});
			
			$(".btn_review_modi").unbind("click").click(function(event){
				event.preventDefault();
				var obj = {
						i_iRecomPoint : $("input[name='i_iRecomPoint']:checked").val()
						, i_sContent : $("textarea[name='i_sContent']").val()
						, i_sProductcd : $("#i_sProductcd").val()
						, i_sFlagAction : "M"
						, i_sFlagRebuy : $("input[name='i_sFlagRebuy']:checked").val()
						, i_arrOptioncd : []
						, i_sReviewcd : $("#i_sReviewcd").val()
					};
				$("input[name='i_arrReviewOptioncd']").each(function() {
					if(!$(this).is(":disabled")) {
						obj.i_arrOptioncd.push($(this).val());
					}
				});
				
				MobileShopProductDetail.fn.goModifyReview(obj, function() {
					MobileShopProductDetail.fn.getReviewList("0004");
				});
			});
			$(".btn_review_delete").unbind("click").click(function(event){
				event.preventDefault();
				var obj = {
						 i_sFlagAction : "D"
						, i_sReviewcd : $(this).attr("id")
					};
				
				
				MobileShopProductDetail.fn.goModifyReview(obj, function() {
					MobileShopProductDetail.fn.getReviewList("0004");
				});
			});
//			 $('#makeShortURL').click(function(){
//	            var longURL = $('#longURL').val();    
//	            var request = gapi.client.urlshortener.url.insert({
//	                'resource' : {
//	                    'longUrl' : longURL
//	                }
//	            });
//	            request.execute(function(response) {
//	                if (response.id != null) {        
//	                    console.log(response.id);
//	                    $('#shortURL').val(response.id);
//	                } else {
//	                    alert("error: creating short url");
//	                }
//	            });
//	        }); 
			
			$(".btn_cupn_down").unbind("click").click(function(event){
            	event.preventDefault();
            	if(!IS_LOGIN) {
            		showConfirmBox({
            			message : "로그인 하시면 서비스 이용이 가능하세요!"
            			, ok_func : function() {
            				var returnUrl = "/mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$("input[name='i_sProductcd']").val();
    						MobileBodyStart.goLogin(returnUrl);
            			}, cancel_func : function(){
            				return ;
            			}
            		});
            	} else {
			    	cmAjax({
			    		url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_prod_coupon_check_ajax.do"
			    		, type : "post"
			    		, dataType : "json"
			    		, data : {
			    			i_sProductcd : $("input[name='i_sProductcd']").val()
			    			,i_sCouponcd : $(this).attr("id")
			    		}
			    		, success : function(data, textStatus){
			    			if(data.status == "succ"){
			    				showMessageBox({
			    					message : "쿠폰 발급이 되었습니다.<br/>확인은 마이파우치 > 쿠폰북에서 확인 가능하세요."
			    				});
			    			}else{
			    				if(data.object == "notLevel"){
			    					showConfirmBox({
			    						message : "AP몰 멤버십 회원만 받으실 수 있어요, 멤버십 가입하러 가시겠어요?"
			    						, ok_func : function (){
			    							location.href = GLOBAL_WEB_ROOT + "mobile/mbr/join/mobile_mbr_join_select.do";
			    						}
			    						, cancel_func : function(){
			    							return ;
			    						}
			    					});
			    				}else if(data.object == "notDay"){
			    					showMessageBox({
			    						message: "해당 쿠폰 발급기간이 아닙니다."
			    						, close : function(){
			    							return ;
			    						}	
			    					});
			    				}else if(data.object == "already"){
			    					showMessageBox({
			    						message: "이미 발급받으셨어요."
			    						, close : function(){
			    							return ;
			    						}	
			    					});
			    				}else{
			    					showMessageBox({
			    						message: data.message
			    						, close : function(){
			    							return ;
			    						}	
			    					});
			    				}
			    				
			    			}
			    		}	
			    	});
            	}
            });
			
			if($("#i_sFlagBrReview").val() == "Y"){
				/* 특정 파라미터로 접속시 구매후기 노출 & 상단으로 스크롤 이동 : s */
				$(".btn_textReview").parent('.tit').addClass('active');
				$(".btn_textReview").parent('.tit').next('.contView').show();
//				$(".btn_textReview").click();
				$("input[name='i_sTypecd']").val("0004");
				
				if($(".div_textReviewBox", ".div_textReviewArea").length == 0 &&  $(".nodata", ".div_textReviewArea").length == 0) {
					MobileShopProductDetail.fn.getReviewList();
				}
				setTimeout(function() {
	    		var reviewFocusY = $(".btn_textReview").parent('.tit').offset().top;
	    		$('html').animate({scrollTop : reviewFocusY}, 600); // for IE
	    		$('body').animate({scrollTop : reviewFocusY}, 600);
				}, 1000);
				/* 특정 파라미터로 접속시 구매후기 노출 & 상단으로 스크롤 이동 : e */
			}
		},
		
        /**
         * 단축 URL생성
         */
		purchaseBeautyHotdeal : function(callback,object){
			var list = [];
			var productcd = object.hotdealInfo.v_productcd;
			var optioncd  = object.hotdealInfo.v_optioncd;
    		list.push({
    			productcd : productcd
    			, optioncd : optioncd
    			, cnt : 1
    			, typecd : "PROD_0001"
    			, flagSoloPack : 'N'
    			, flagbeautyhd : 'Y'
    			, beautyhotdealcd    : object.hotdealInfo.v_hotdealcd
    			, flagaction : "purchase"
    		});
        	
    		MobileBodyStart.immediatelyPurchage({list : list});
		},
		setShortenUrl : function(url){
			var shortenUrl = "";
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_short_url_ajax.do"
				, dataType : "json"
				, data : {i_sUrl:url}
				, animation : true
				, async : false
				, success : function(data, textStatus) {
					if(data.status == "succ") {
						shortenUrl = data.object; 
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
			});
			return shortenUrl;
		},
		goModifyReview : function(obj, callback) {
			
			cmAjax({
				url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_review_save_ajax.do"
				, dataType : "json"
				, data : obj
				, animation : true
				, async : false
				, success : function(data, textStatus) {
					modalPopupClose("#productReviewWrite");
					if(data.status == "succ") {
						showMessageBox({
							message : data.message
							, close : function() {
								if(typeof callback != "function") {
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
											$("input[name='i_sLoginKey']", $("form[name='frm']")).remove();
											arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
										}
										if(GLOBAL_LOGIN_TYPE != "") {
											$("input[name='i_sLoginType']", $("form[name='frm']")).remove();
											arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
										}
										$("input[name='i_sDeviceNum']", $("form[name='frm']")).remove();
										arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
										$(arrParam.join("")).appendTo($("form[name='frm']"));
									}
									document.frm.submit();
								} else {
									callback();
								}
							}
						});
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},
		setReviewReg : function(product, option, flag) {
			var productHtml = [];
			
			var selected = "";
			
			if(flag == "Y") {
				selected = "selected=\"selected\"";
			}
			
				$(".selectBox").html("");
				if(product != undefined && product.length > 0) {
				productHtml.push("<option value=\"\">구매하신 상품을 선택하세요.</option>");
				for(var i=0; i<product.length; i++) {
					productHtml.push("<option value=\""+product[i].v_productcd+"\" "+selected+">"+product[i].v_productnm+"</option>");
				}
			}
			
			$(".selectBox").html(productHtml.join(""));
			
			var arrOption = [];
			
			if(option != undefined && option.length > 0) {
				for(var i = 0; i < option.length; i++) {
					for(var j=0; j<product.length; j++) {
						if(option[i].v_productcd == product[j].v_productcd) {
							arrOption.push("<li id=\"li_"+option[i].v_optioncd+"\" class=\"li_"+option[i].v_productcd+"\">");
							arrOption.push("	<input type=\"hidden\" name=\"i_arrReviewOptioncd\" value=\""+option[i].v_optioncd+"\"/>");
							arrOption.push("	<input type=\"hidden\" id=\"input_option_cnt\" value=\""+product[j].n_option_cnt+"\"/>");
							arrOption.push("	<p class=\"ttl\">"+option[i].v_optionnm+"</p>");
							arrOption.push("	<a href=\"#\" class=\"btn_delete btn_option_del\" id=\""+option[i].v_optioncd+"\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/btn_delete.png\" alt=\"삭제\"></a>");
							arrOption.push("</li>");
						}
					}
				}
				
				$(".ul_option").html(arrOption.join(""));
			}
			
			if(flag == "Y") {
				if(parseInt(product[0].n_option_cnt) > 1) {
					$(".ul_option").show();
					$(".ul_option>li").show();
				} else {
					$(".ul_option").hide();
				}
				$("input[type='hidden']", ".ul_option>li").prop("disabled", false);
			} else {
				$(".ul_option").hide();
				$(".ul_option>li").hide();
				$("input[type='hidden']", ".ul_option>li").prop("disabled", true);
			}
			
			MobileShopProductDetail.fn.addBtnEvent();
		},
		fnValidate : function() {
			var isResult = true;
			var target = undefined;
			removeErrorMessage();
			
			var productcd = $("option:selected", "*[name='i_sProductcd']");
			var optioncd = $("*[name='i_arrOptioncd']:not(':disabled')");
			var recomPoint = $("*[name='i_iRecomPoint']:checked");
			var content = $("*[name='i_sContent']");
			
			if(productcd.val() == "") {
				addErrorMessageBox($("*[name='i_sProductcd']"), "등록하실 상품을 선택해 주세요.");
				isResult = false;
				
				if(target == undefined) {
					target = productcd;
				}
			}
			if(optioncd.size() == 0) {
				if(productcd.val() != "") {
					addErrorMessageBox($("*[name='i_sProductcd']").eq(0), "등록하실 상품을 선택해 주세요.");
					$(".selectBox").val("");
					isResult = false;
					if(target == undefined) {
						target = $("*[name='i_sProductcd']").eq(0);
					}
				}
			}
			
			if(recomPoint.length == 0 || recomPoint.val() == 0) {
				
				addErrorMessageBox($("*[name='i_iRecomPoint']").eq(0), "평점을 선택해 주세요.");
				
				isResult = false;
				if(target == undefined) {
					target = $("*[name='i_iRecomPoint']").eq(0);
				}
			}
			
			if(content.val().length > 200) {
				addErrorMessageBox($("*[name='i_sContent']"), "200자 이하로 작성해주세요.");
				
				isResult = false;
				if(target == undefined) {
					target = $("*[name='i_sContent']");
				}
				
			} else if(content.val() == "") {
				addErrorMessageBox($("*[name='i_sContent']"), "내용을 입력해주세요.");
				
				isResult = false;
				if(target == undefined) {
					target = $("*[name='i_sContent']");
				}
			} else if(content.val().length < 20) {
				addErrorMessageBox($("*[name='i_sContent']"), "20자 이상 입력해 주세요.");
				
				isResult = false;
				if(target == undefined) {
					target = $("*[name='i_sContent']");
				}
				
			}
			
			if(!isResult) {
				target.focus();
			}
			
			return isResult;
		},
		purchaseOnePlusCheck : function(callback,flag) {
			if(clickFlag){
				return;
			}else{
				clickFlag = true;
			}
			var productcd  = $("input[name='i_sProductcd']");
			var optioncd   = $("input[name='i_arrOptioncd']");
			var cnt 		  = $("input[name='i_arrProductCnt']");
			var productnm  = $("input[name='i_arrProductnm']").val();
			var brandnm  = $("input[name='i_sBrandnm']").val();
			
			
			var size = optioncd.size();
			
			if(size == 0) {
//				showMessageBox({message : "상품의 옵션을 선택해주세요."});
				
				var optBox = $('.sec_choice_opt');
		    	var openOpt = $('.btn_boxToggle > a');
		    	
		    	if(optBox.hasClass("open") == false){
		    		$(optBox).removeClass("close");
		    		$(optBox).addClass("open");
		    		$(openOpt).find('img').attr("src",GLOBAL_MOBILE_IMG_URL+"common/prd_opt_arrow_up.png");
	    		}
				clickFlag = false;
				return;
			}else if(size == 1){
				var optBox = $('.sec_choice_opt');
		    	var openOpt = $('.btn_boxToggle > a');
		    	
		    	if(optBox.hasClass("open") == false){
		    		$(optBox).removeClass("close");
		    		$(optBox).addClass("open");
		    		$(openOpt).find('img').attr("src",GLOBAL_MOBILE_IMG_URL+"common/prd_opt_arrow_up.png");
		    		clickFlag = false;
		    		return;
	    		}else if(optBox.hasClass("open") == true){
	    			clickFlag = true;
	    		}
			}
			
        	//SmartOffer - 개인화 추천 태깅 (장바구니 담기)
        	try{
	        	var cartList = [];
	        	for(var i=0; i<optioncd.size(); i++) {
	        		var option = optioncd.eq(i).val();
	        		var optioninfo = $("#span_option_"+option);
	        		var list_price = parseInt($(".span_option_price", optioninfo).text());
	        		var price = parseInt($(".span_option_dc_price", optioninfo).text());
	        		var productCnt = parseInt($("input[name='i_arrProductCnt']").eq(i).val());
	        		var clickUrl = ""; 
	        		
	        		if(_A_dp != "" && _A_dp != null) { 
	        			clickUrl = _A_url + "&cust=" +_A_cust+ "&recommendId=" +_A_recommendId+ "&dp=" +_A_dp+ "&planId=" +_A_planId+ "&scenarioId=" +_A_scenarioId+ "&itemSetId=" +_A_itemSetId+ "&channelId=" + _A_channelId + "&targetGroupId=" +_A_targetGroupId+ "&abTestKey=" +_A_abTestKey+ "&ITEM_VALUE=" + _A_ITEM_VALUE;
	        		}
	        		
	        		cartList.push({
	        			  ITEM_VALUE : productcd.val()
	        			, name : _SL_pn[0]
	        			, brand  : _SL_br[0]
	        			, category : _SL_ct[0]
	        			, price : Number(list_price * productCnt)
	        			, qty   :  productCnt
	        			, prodOptionCode : option
	        			, discountPrice : Number(price * productCnt)
	        			, clickUrl : clickUrl
	        		});
	        	}
	        	if(flag == "cart") {
	        		cartListTagEvent(cartList,'MOBILE');
	        	} else if (flag == "purchase") {
	        		orderListTagEvent(cartList,'MOBILE');
	        	}
        	}catch(e){}
        	
			if($(".span_onePlusCheckYn").text() == "Y") {
				   
        		var onePlusBuyCnt = parseInt($(".span_buyCnt").text());
        		var onePlusGiveCnt = parseInt($(".span_giveCnt").text());
        		
        		var tempList = [];
        		$(".div_option_box").each(function(i) {
        			var optionPrice = parseInt($(".span_one_prod_price", $(this)).text());
        			var selOptioncd = $("input[name='i_arrOptioncd']", $(this)).val();
        			var selOptioninfo = $("#span_option_"+selOptioncd);
        			var optionnm = $(".span_optionnm", selOptioninfo).text();
        			var flagEvent = $(".span_flag_event", selOptioninfo).text();
        			var optionCnt = $("input[name='i_arrProductCnt']", $(this)).val();
        			
        			tempList.push({index : i
        				, optionPrice : optionPrice
        				, optionnm : optionnm
        				, flagEvent : flagEvent
        				, optionCnt : optionCnt
        			});
        			
        			tempList.sort(function(a, b) {return a.optionPrice - b.optionPrice;});
        		});
        		
        		if(tempList.length > 0) {
        			var prePrice = 0; 
        			var oneplusMessage = "";
        			var isonePlusFlag = false;
        			var size = tempList.length;
        			for(var i=0; i<size; i++) {
        				if(tempList[i].flagEvent == "Y") {
        					var totalCnt  = 0;
        					var optionnm  = "";
        					
        					for(var j=0; j<size; j++) {
        						
        						if(tempList[i].optionPrice == tempList[j].optionPrice){
        							
        							optionnm += "["+tempList[j].optionnm+"]";
        							
        							totalCnt += parseInt(tempList[j].optionCnt);	
        						}
        						
        					}
        					
        					var obj = onePlusCheck(totalCnt, onePlusBuyCnt, onePlusGiveCnt);
        					
        					if(parseInt(obj.buyGapCnt) > 0 && prePrice != tempList[i].optionPrice) {
        						isonePlusFlag = true;
        						if (oneplusMessage != "") oneplusMessage += "<br/>";
        						oneplusMessage += optionnm+"상품은 <em class=\"f_st2\">" +onePlusBuyCnt + "+" + onePlusGiveCnt + "</em> 행사 상품입니다. <em class=\"f_st2\">" + obj.buyGapCnt + "</em>개를 더 구매하시면 할인이 적용됩니다.<br/>현재 선택하신 수량은 " +onePlusBuyCnt + "+" + onePlusGiveCnt + "행사의 적용을 받지 못합니다.";
        						
        					}else if(parseInt(obj.giveGapCnt) > 0 && prePrice != tempList[i].optionPrice) {
        						isonePlusFlag = true;
        						if (oneplusMessage != "") oneplusMessage += "<br/>";
        						oneplusMessage += optionnm+"상품은 <em class=\"f_st2\">" +onePlusBuyCnt + "+" + onePlusGiveCnt + "</em> 행사 상품입니다. <em class=\"f_st2\">" + obj.giveGapCnt + "</em>개를 더 구매하셔도 같은 가격이 적용됩니다.<br/>현재 선택하신 수량은 " +onePlusBuyCnt + "+" + onePlusGiveCnt + "행사의 적용을 받지 못합니다.";
        					}
        					
        					prePrice  = tempList[i].optionPrice;
        					
        				}
        			}
        			
            		if(isonePlusFlag){
            			
            			showConfirmBox({
            				message : oneplusMessage+"</br><span style='color:red;'>상품재고가 부족할 시에는 할인 혜택을 받지 못하실 수 있어요.</span><br /> 계속 구매를 진행하시겠어요?"
            				, ok_func : function() {
            					if(flag == "cart"){
            						//try{
            						//	//장바구니태깅
            						//	var str = brandnm+";"+productnm;
        	        				//	str = str.replace(/&/gi,"_");
            						//	trackPurchaseClick(str,'scAdd');
            						//}catch(e){}
            						
            					}else if(flag =="purchase"){
            						
            					}
            					callback(productcd, optioncd, cnt);
            				}
            			});
            			clickFlag = false;
            			return;
            			
            		} else {
            			if(flag == "cart"){
            				//try{
            				//	//장바구니태깅
            				//	var str = brandnm + ";" + productnm;
	        				//	str = str.replace(/&/gi,"_");
            				//	trackPurchaseClick(str,'scAdd');
            				//}catch(e){}
            				
            			}else if(flag =="purchase"){
            				
            			}
            			callback(productcd, optioncd, cnt);
            		}
        		} 

        	} else {
        		if(flag == "cart"){
    				//try{
    				//	//장바구니태깅
    				//	var str = brandnm + ";" + productnm;
    				//	str = str.replace(/&/gi,"_");
    				//	trackPurchaseClick(str,'scAdd');
    				//}catch(e){}
    				
    			}else if(flag =="purchase"){
    				
    			}
        		callback(productcd, optioncd, cnt);
        	}
		},
		facebookShare : function(rvo, flag){
			if(rvo !=null && rvo !=undefined){
				
				FB.init({appId:"1532234350418822", status: true, cookie: true});

				FB.ui ({
							method: "feed",
							name: rvo.name,
			    			link: rvo.link,
			    			picture: rvo.picture,
			    			description: rvo.description
			    		},	function(response) {
			    				if(response && response.post_id){
						    		showMessageBox({
						    			message : "공유되었습니다."
						    		});
						    	}
			    		}
			    );
				
			}

		},
		//상품공유테스트용
		snsshare : function(){
			if(IS_LOGIN){
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "sns/sns_facebook_share_callback.do"
					, type : "POST"
						, dataType : "json"
							, data : {
								"i_sSnsFlag" : "Y"
							}
				, animation: false
				, success : function(data, textStatus, jqXHR) {

					showMessageBox({message : data.message});

				}
				});
			}else{
			}
		},
		addPurchaseEvent : function(productcd, optioncd, cnt) {
			var list = [];
			   
			for(var i=0; i<optioncd.size(); i++){
			   var option = optioncd.eq(i).val();
        	   var optioninfo = $("#span_option_"+option);
			   list.push({
					    productcd : productcd.val()
					  , optioncd : optioncd.eq(i).val()
					  , cnt : cnt.eq(i).val()
					  , typecd :"PROD_0001"
					  , flagSoloPack : $(".span_flag_solopack", optioninfo).text()
					  , flagaction : "purchase"
					 });					
			}
			
			if(productcd.val() == "SPR20170315000028211"){
				//헤라블랙쿠션
				try{
					goog_report_conversion(undefined,'j-jECOD-onAQ4tOgyAM','956836322');
				}catch(e){}
			}
						
			if(productcd.val() == "SPR20160226000016048"){
				//헤라선메이트
				try{
					goog_report_conversion(undefined,'rLfxCOj-33AQ4tOgyAM','956836322');
				}catch(e){}
			}
			
			var tracktype_var = "Btn_purchase";
			if($("#i_sFlagReser").val() == "Y"){
				tracktype_var = "Btn_reservation";
			}
			try{
				var fbobj = 
					{id : "197208744125070"
					 , type : "category_custom"
					 , tracktype : tracktype_var};
			
				goReserveFacebook(fbobj);
			}catch(e){}
				//헤라 루즈홀릭 슬릭 
			try{
				if(productcd.val() == "SPR20170524000029672"){
        			goog_report_conversion(undefined,'3wbUCMjup3MQ4LaBlgM','851467104');
        		}
        		if(productcd.val() == "SPR20170412000028808"){
        			goog_report_conversion(undefined,'SF9DCP7xp3MQ4LaBlgM','851467104');
        		}
        		if(productcd.val() == "000026129"){
        			goog_report_conversion(undefined,'e0uOCK2C1nMQ4LaBlgM','851467104');
        		}
        		
        		if(productcd.val() == "SPR20170801000031216"){
        			goog_report_conversion(undefined,'fcmxCM_E4XMQ4LaBlgM','851467104');
        		}
        		
        		if(productcd.val() == "SPR20170823000031948"){
    				goog_report_conversion(undefined,'5nvuCNHLoXQQ4LaBlgM','851467104');
    			}
			}catch(e){}
				
			if(productcd.val() == "SPR20150223000007263" || productcd.val() == "SPR20170417000028910"){
				//헤라선메이트
				try{
					goog_report_conversion(undefined,'O3o8CPnzj3EQ053CzgM','969969363');
        		}catch(e){}
			}
			
			if(productcd.val() == "SPR20170411000028796"){
				//헤라블랙시크릿박스17호
				try{
					goog_report_conversion(undefined,'psztCNG3xHAQ4tOgyAM','956836322');
				}catch(e){}
			}
			
			if(productcd.val() == "SPR20150825000010927"){
				//gypark : 아이오페 슈퍼바이탈 크림
				try{
					goog_report_conversion(undefined,'cc0YCLPHuXQQ4LaBlgM','851467104');
				}catch(e){}
			}
			MobileBodyStart.immediatelyPurchage({list : list});
		},
		addOnePayPurchaseEvent : function(productcd, optioncd, cnt) {
			var list = [];
			
			for(var i=0; i<optioncd.size(); i++){
				var option = optioncd.eq(i).val();
				var optioninfo = $("#span_option_"+option);
				list.push({
					productcd : productcd.val()
					, optioncd : optioncd.eq(i).val()
					, cnt : cnt.eq(i).val()
					, typecd :"PROD_0001"
						, flagSoloPack : $(".span_flag_solopack", optioninfo).text()
						, flagaction : "purchase"
				});					
			}
			
			MobileBodyStart.immediatelyOnePayPurchage({list : list});
		},
		addCartEvent : function(productcd, optioncd, cnt) {
			var list = [];
			var sumCnt = 0;
			var sumPrice = 0;
			
			for(var i=0; i<optioncd.size(); i++){
				var option = optioncd.eq(i).val();
				var optioninfo = $("#span_option_"+option);
				list.push({
					   productcd : productcd.val()
					  , optioncd : optioncd.eq(i).val()
					  , cnt : cnt.eq(i).val()
					  , flagPlus : "Y"
					  , flagSoloPack : $(".span_flag_solopack", optioninfo).text()
				 });
				var price = $(".span_option_dc_price", optioninfo).text();
        		sumCnt += parseInt(cnt.eq(i).val());
        		sumPrice += parseInt(price) * parseInt(cnt.eq(i).val());
			}
			
			MobileBodyStart.addUserCart({
				list : list
				, callback : function(vo){
					var obj = $(".btn_add_cart").eq(0);
					if(vo.v_cartcd !="" && vo.v_cartcd != null){
						//장바구니태깅
						PAGE_TAG.PRODUCTS = PAGE_TAG.PRODUCTS.replace(/&/gi,"_");
						PAGE_TAG.PRODUCTS = PAGE_TAG.PRODUCTS + ";;;event54="+sumCnt+"|event55="+sumPrice+";eVar31="+productcd.val();
						try{trackPurchaseClick(PAGE_TAG.PRODUCTS,'scAdd,event54,event55');}catch(e){}
						if(productcd.val() == "SPR20170315000028211"){
							//헤라블랙쿠션
							try{
								goog_report_conversion(undefined,'WGNWCJfWqHAQ4tOgyAM','956836322');
							}catch(e){}
						}
						
						if(productcd.val() == "SPR20160226000016048"){
							//헤라선메이트
							try{
								goog_report_conversion(undefined,'VHDdCN6w2XAQ4tOgyAM','956836322');
							}catch(e){}
						}
						
						try{
							var fbobj = 
								{id : "197208744125070"
								 , type : "category_custom"
								 , tracktype : "Btn_addtocart"};
							goReserveFacebook(fbobj);
						}catch(e){}
						
						//헤라 루즈홀릭 슬릭 
						try{
							if(productcd.val() == "SPR20170524000029672"){
        	        			goog_report_conversion(undefined,'veheCL-koXMQ4LaBlgM','851467104');
        	        		}
        	        		if(productcd.val() == "SPR20170412000028808"){
        	        			goog_report_conversion(undefined,'w75eCP2moXMQ4LaBlgM','851467104');
        	        		}
        	        		if(productcd.val() == "000026129"){
        	        			goog_report_conversion(undefined,'UEwpCMn1w3MQ4LaBlgM','851467104');
        	        		}
        	        		if(productcd.val() == "SPR20170801000031216"){
        	        			goog_report_conversion(undefined,'4OwCCNmHz3MQ4LaBlgM','851467104');
        	        		}
						}catch(e){}
						
						if(productcd.val() == "SPR20150223000007263" || productcd.val() == "SPR20170417000028910"){
							//마몽드쿠션
							try{
								goog_report_conversion(undefined,'bCbbCInjonEQ053CzgM','969969363');
			        		}catch(e){}
						}
						
						if(productcd.val() == "SPR20150825000010927"){
							//gypark : 아이오페 슈퍼바이탈 크림
							try{
								goog_report_conversion(undefined,'v33bCIWDv3QQ4LaBlgM','851467104');
			        		}catch(e){}
						}
						
						$(".btn_add_cart").eq(0).removeClass("active");
						balloonOpen(obj);
						clickFlag = false;
					}
				}
			});
		},
		addDetailEvent : function() {
			$(".btn_detail").unbind("click").click(function(event) {
            	event.preventDefault();
            	
            	var productcd = $(this).attr("id");
            	$("input[name='i_sProductcd']").val(productcd);
            	
            	var frm = $("#frm_move");
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
            	frm.attr("action", GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do");
            	frm.submit();
            });
		},
		/**
		 * 상품 수량 +, - 조절
		 */
		addProductCntEvent : function() {
			$(".btn_minus").unbind("click").click(function(event) {
				event.preventDefault();
				
				var idx = $(".btn_minus").index($(this));
				var optioncd = $(this).attr("id").replace("minus_", "");
				
				var optioninfo = $("#span_option_" + optioncd);
				var dc_prc = parseInt($(".span_option_dc_price", optioninfo).text());
				var dayoffcd = $(".span_dayoffcd", optioninfo).text();
				var flagEvent = $(".span_flag_event", optioninfo).text();
				
				if($("input[name='i_arrProductCnt']").eq(idx).val() != 1) {
					var cnt = parseInt($("input[name='i_arrProductCnt']").eq(idx).val()) -1;
					var minusPrice = 0;
					var originPrice = $(".span_origin_price", optioninfo).text();
					var dayoffStockqty = $(".span_dayoff_stockqty", optioninfo).text();
					
					$("input[name='i_arrProductCnt']").eq(idx).val(cnt);
					if($(".span_onePlusCheckYn").text() == "Y" && flagEvent == "Y") {
						MobileShopProductDetail.fn.setOnePlusPrice(dc_prc);
					} else {
						if((dayoffcd != undefined && dayoffcd != "" && parseInt(dayoffStockqty) > 0) || (dayoffcd == undefined || dayoffcd == "")) {
							minusPrice = dc_prc * cnt;
						} else {
							minusPrice = originPrice * cnt;
						}
						
						$(".span_prdPrice>em").eq(idx).text(SetNumComma(minusPrice));
					}
					
					$(".span_wishCnt").eq(idx).text(cnt);
					$(".span_productCnt").eq(idx).text(cnt);
				}
				
				MobileShopProductDetail.fn.getTotalPrice();
			});
			
			$(".btn_plus").unbind("click").click(function(event) {
				event.preventDefault();
				
				var idx = $(".btn_plus").index($(this));
				var optioncd = $(this).attr("id").replace("plus_", "");
				
				var optioninfo = $("#span_option_" + optioncd);
				var dc_prc = parseInt($(".span_option_dc_price", optioninfo).text());
				
				var productCnt = parseInt($("input[name='i_arrProductCnt']").eq(idx).val());
				var maxCnt = parseInt($(".span_max_cart_cnt", optioninfo).text());
				var stockqty = parseInt($(".span_stockqty", optioninfo).text());
				var dayoffcd = $(".span_dayoffcd", optioninfo).text();
				var flagEvent = $(".span_flag_event", optioninfo).text();
				
				if(productCnt + 1 <= maxCnt && productCnt + 1 <= stockqty) {
					var cnt = parseInt($("input[name='i_arrProductCnt']").eq(idx).val()) +1;
					var plusPrice = 0;
					var originPrice = parseInt($(".span_origin_price", optioninfo).text());
					var dayoffStockqty = parseInt($(".span_dayoff_stockqty", optioninfo).text());
					
					if((dayoffcd != undefined && dayoffcd != "" && parseInt(dayoffStockqty) > 0)) {
						if(cnt <= dayoffStockqty) {
							plusPrice = dc_prc * cnt;
							
							$("input[name='i_arrProductCnt']").eq(idx).val(cnt);
							$(".span_prdPrice>em").eq(idx).text(SetNumComma(plusPrice));
						} else {
							showMessageBox({
								message : "구매하시려는 수량보다 상품 재고가 부족해요.<br/>더 좋은 상품으로 찾아뵐게요."
							});
							return;
						}
					} else {
						$("input[name='i_arrProductCnt']").eq(idx).val(cnt);
						if($(".span_onePlusCheckYn").text() == "Y" && flagEvent == "Y") {
							MobileShopProductDetail.fn.setOnePlusPrice(dc_prc);
						} else {
							if((dayoffcd != undefined && dayoffcd != "") && parseInt(dayoffStockqty) < 1) {
								plusPrice = originPrice * cnt;
							} else {
								plusPrice = dc_prc * cnt;
							}
							
							$(".span_prdPrice>em").eq(idx).text(SetNumComma(plusPrice));
						}
					}
					
					$(".span_wishCnt").eq(idx).text(cnt);
					$(".span_productCnt").eq(idx).text(cnt);
					
					MobileShopProductDetail.fn.getTotalPrice();
				} else {
					if(productCnt+1 > maxCnt && productCnt+1 < stockqty) {
						showMessageBox({
							message : "1회 주문시의 구매제한 수량을 초과하였어요."
						});
					} else if(productCnt+1 > stockqty) {
						showMessageBox({
							message : "구매하시려는 수량보다 상품 재고가 부족해요.<br/>더 좋은 상품으로 찾아뵐게요."
						});
					}
				}
			});
			
			$(".btn_option_del").unbind("click").click(function(event) {
				event.preventDefault();
				
				$(this).closest(".div_option_box").remove();
				if($(".div_option_box").length == 0) {
					$(".div_countBox").hide();
				}
				
				if($(".span_onePlusCheckYn").text() == "Y") {
					var optioninfo = $("#span_option_" + $(this).attr("id"));
					var dc_prc = $(".span_option_dc_price", optioninfo).text();
					MobileShopProductDetail.fn.setOnePlusPrice(dc_prc);
				}
				
				MobileShopProductDetail.fn.getTotalPrice();
				
				//gypark : 쿠션 리필
				var cnt = 0;
				var size = $("input[name='i_arrOptioncd']", $(".selectNumbox")).size();
				
				for(var i = 0; i < size; i++){
					var optval = $("input[name='i_arrOptioncd']", $(".selectNumbox")).eq(i).val();
					
					if($(".cusion_"+optval).size() > 0){
						cnt++;
					}
				}
				
				if(cnt > 0){	
					$(".notice_txt_pink").show();
				}else{
					$(".notice_txt_pink").hide();
				}
			});
			
		},
		/**
		 * 상품 총합
		 */
		getTotalPrice : function() {
			var sum = 0;
			
			$(".span_prdPrice>em").each(function() {
				sum += parseInt(SetNum($(this).text()));
			});
			
			$(".dd_totalPrice>em").text(SetNumComma(sum));
			
			MobileShopProductDetail.fn.setDeliveryPrice(false);
		},
		/**
		 * 로딩 시 데이터 ajax
		 */
		getPageInit : function() {
			var parameter = MobileShopProductDetail.fn.getParameter();
			
			parameter.i_sProductcd = $("#i_sProductcd").val();
			parameter.i_sDeviceNum = $("#i_sDeviceNum").val();
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_detail_ajax.do",
				type : "POST",
				dataType : "json",
				data : parameter,
				animation : false,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						MobileShopProductDetail.fn.setShopProductDetail(data.object);
						MobileShopProductDetail.fn.addBtnEvent();
					} else {
						var beforeUrl = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_list.do?i_sFlagCategory=Y&i_sCategorycd1=CTG001";
						$(".shoppingDetail").html(addMobileNodata(beforeUrl));
					}
				}
			});
		},
		//20150707 gypark
		getPrdBrdNm : function(obj){
			var detail = obj.detail.prddetail;
			var str = detail.v_productnm + " " + detail.v_brandnm;
			return str;
		},
		setOnePlusPrice : function(price) {
			var productbuyCnt = parseInt($(".span_buyCnt").text());
			var productgiveCnt = parseInt($(".span_giveCnt").text());
			
			var list = [];
			var totalCnt = 0;
			
			var preCnt = 0;
			$("input[name='i_arrProductCnt']").each(function(i) {
				if(!$(this).is(":disabled")) {
					var optioncd = $("input[name='i_arrOptioncd']").eq(i).val();
					var optionInfo = $("#span_option_"+optioncd);
					var optionPrice = $(".span_option_dc_price", optionInfo).text();
					if(optionPrice == price) {
						totalCnt += parseInt($(this).val());
						
						if(i == 0) {
							preCnt = 0;
						} else {
							preCnt = totalCnt - parseInt($(this).val());
						}
						
						list.push({cnt: $(this).val(), preCnt : preCnt, index : i});
					}
				}
			});
			
			var obj = onePlusPriceResult(totalCnt, price, productbuyCnt, productgiveCnt, list);
			
			var totalSum = 0;
			if(obj.length > 0) {
				$(".span_prdPrice>em").each(function(idx) {
					var sum = 0;
					for(var i=0; i<obj.length; i++) {
						if(idx == obj[i].index) {
							sum += (parseInt(obj[i].price) * obj[i].cnt);
							$(".span_prdPrice>em").eq(obj[i].index).text(SetNumComma(sum));
						}
					}
					
					totalSum = sum;
				});
			}
			
			return totalSum;
		},
		/**
		 * 옵션 변경 시 옵션영역에 선택 옵션 추가
		 */
		setOptionSelect : function(optioncd) {
			var optioninfo = $("#span_option_"+optioncd);
			var statuscd = $(".span_statuscd", optioninfo).text();
			var optStatuscd = $(".span_opt_statuscd", optioninfo).text();
			var stockqty = $(".span_stockqty", optioninfo).text();
			var sapStcd = $(".span_sap_stcd", optioninfo).text();
			var deliveryType = $(".span_delivery_type", optioninfo).text();
			var optDeliveryType = $(".span_opt_delivery_type", optioninfo).text();
			var dc_price = $(".span_option_dc_price", optioninfo).text();
			var originPrice = $(".span_origin_price", optioninfo).text();
			var dayoffStockqty = $(".span_dayoff_stockqty", optioninfo).text();
			var featureTag = $(".span_featureTag", optioninfo).text();
			var dayoffcd = $(".span_dayoffcd", optioninfo).text();
			var list_price = $(".span_option_price", optioninfo).text();
			var flagEvent = $(".span_flag_event", optioninfo).text();
			var optManufacture = $(".span_opt_manufacture", optioninfo).text();
			var optOrigin = $(".span_opt_origin", optioninfo).text();
			
			var unit = "";
			
			if(featureTag != undefined && featureTag != "" && featureTag.indexOf("DG_P014") > -1) {
				unit = "P";
			} else {
				unit = "원";
			}
//			if($("#i_sProductKaKao").val() == "SPR20160215000015629" && $(".div_option_box").size() >= 1){
//				showMessageBox({
//					message : "이미 시크릿박스 옵션을 선택하셨습니다. <br/>이 상품은 한 개의 옵션만 구입 가능합니다."
//					, ok_func: function(){
//						return ; 
//					}	
//				});
//				return;
//			}else 
			if($("#div_option_"+optioncd).length > 0) {
				showMessageBox({
					message : "이미 선택하신 옵션이에요."
					, close : function() {
						$(".sel_option").val("");
					}
				});
				return;
			} else {
				var html = "";
				var optionnm = $(".span_optionnm", optioninfo).text();
				var capacity = $(".span_capacity", optioninfo).text();
				var opt_bpoint_per = parseInt($(".span_bpoint_per", optioninfo).text());
				var opt_mpoint_per = $(".span_mpoint_per", optioninfo).text();
				var salePrice = 0;
				// 선택한 옵션이 일시품절이 아니고 재고수가 0이상이며 단종 상품이 아닐 때 수량 선택 영역이 추가됨
				if(statuscd != "0002" && optStatuscd != "0002" && parseInt(stockqty) > 0 && (sapStcd != "DK_004" || optStatuscd != "0003")) {
					if((dayoffcd != undefined && dayoffcd != "" && parseInt(dayoffStockqty) > 0) || (dayoffcd == undefined || dayoffcd == "")) {
						salePrice = dc_price;
					} else {
						salePrice = originPrice;
					}
					var saleArea = + list_price != salePrice ? "<span class=\"sale\"><em>"+SetNumComma(list_price)+"</em></span>"+unit : "";
					html += "<div class=\"box div_option_box\" id=\"div_option_"+optioncd+"\">"
					+ "<p class=\"ttl\">"+optionnm+"</p>"
					+ "<div class=\"selectNumbox\">"
					+ "<input type=\"hidden\" name=\"i_arrOptioncd\" value=\""+optioncd+"\"/>"
					+ "<span class=\"hide span_wishOptioncd\">"+optioncd+"</span>"
					+ "<span class=\"hide span_wishCnt\">1</span>"
					+ "<span class=\"hide span_one_prod_price\">"+salePrice+"</span>"
					+ "<div class=\"selectNum\">"
					+ "<span class=\"span_productCnt\">1</span>"
					+ "<input type=\"hidden\" name=\"i_arrProductCnt\" value=\"1\"/>"
					+ "<button type=\"button\" class=\"btn_minus\" id=\"minus_"+optioncd+"\" onclick=\"return false;\"><span class=\"hide\">감소</span></button>"
					+ "<button type=\"button\" class=\"btn_plus\" id=\"plus_"+optioncd+"\" onclick=\"return false;\"><span class=\"hide\">증가</span></button>"
					+ "</div>"
					+ "<div class=\"bundle\">"
					+ "<span class=\"priceZone\">"
					+ saleArea
					+ "<span class=\"span_prdPrice price\"><em>"+SetNumComma(salePrice)+"</em></span>"+unit
					+ "</span>"
					+ "<a href=\"#none\" class=\"btn_delete btn_option_del\" id=\""+optioncd+"\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/btn_delete.png\" alt=\"삭제\" /></a>"
					+ "</div>"
					+ "</div>"
					+ "</div>";
					
					$(".div_countBox").append(html);
					$(".div_countBox").show();
					
					$(".sel_option").val("");
					
					$(".p_soldOutArea").html("");
					$(".p_soldOutArea").hide();
					
					if($(".span_onePlusCheckYn").text() == "Y" && flagEvent == "Y") {
						MobileShopProductDetail.fn.setOnePlusPrice(salePrice);
						
						if(list_price != salePrice) {
							$(".span_priceArea>em").text(list_price);
							$(".span_saleArea>em").text(salePrice);
						} else {
							$(".span_saleArea>em").text(salePrice);
						}
					} else {
						if(list_price != salePrice) {
							$(".span_priceArea>em").text(SetNumComma(salePrice));
							$(".span_saleArea>em").text(SetNumComma(list_price));
						} else {
							$(".span_saleArea>em").text(SetNumComma(salePrice));
						}
					}
					
					if(dayoffcd != "" && dayoffcd != undefined && parseInt(dayoffStockqty) <= 0) {
						$(".dd_originArea").remove();
						$(".dt_originArea").remove();
						
						var levelcd = $("#i_sLevelcd").val();
						
						$(".dd_salePriceArea").html("<span class=\"salePrice span_priceArea\" style=\"font-weight: bold; font-size: 14px; color:#ea5279\">종료</span>");
						
						var htmlPrice = [];
						
						htmlPrice.push("<dt class=\"dt_originArea\">판매가</dt>");
						htmlPrice.push("<dd class=\"dd_originArea priceZone\">");
						htmlPrice.push("	<span class='price salePrice span_priceArea'><em>"+SetNumComma(originPrice)+"</em>원</span> ");
						htmlPrice.push("</dd>");
						
						$(".dl_price").append(htmlPrice.join(""));
					} else {
						var htmlPrice = [];
						
						htmlPrice.push("<dt class=\"dt_originArea\">판매가</dt>");
						htmlPrice.push("<dd class=\"dd_originArea priceZone\">");
						htmlPrice.push("	<span class='price salePrice span_priceArea'><em>"+SetNumComma(originPrice)+"</em>원</span> ");
						htmlPrice.push("</dd>");
						htmlPrice.push("<dt class=\"dt_saleArea\">할인가</dt>");
						htmlPrice.push("<dd class=\"dd_saleArea priceZone\">");	//임의로 saleArea라고 함
						htmlPrice.push("	<span class='salePrice span_priceArea'><em>"+SetNumComma(salePrice)+"</em>원</span> ");
						htmlPrice.push("</dd>");
						$(".dd_salePriceArea").html(htmlPrice.join(""));
						
						$(".dd_originArea").remove();
						$(".dt_originArea").remove();
					}
					
					// 상품 총 가격 계산
					MobileShopProductDetail.fn.getTotalPrice();
				// 선택한 옵션이 일시품절 이거나 재고수가 0 이고 단종 상품이 아닐 경우 입고알리미 신청 영역이 추가됨
				} else if(((statuscd == "0002" || optStatuscd == "0002" ) || (optStatuscd == "0001" && parseInt(stockqty) <= 0)) && (sapStcd != "DK_004" || optStatuscd != "0003")){
					html += "선택하신 상품은 현재 <em>품절</em>입니다."
						 + "<span class=\"btn_alrim\"><a href=\"#\">입고알리미 신청</a></span>"
						 + "<input type=\"hidden\" id=\"i_sSoldOutOption\" value=\""+optioncd+"\">";
				
					$(".p_soldOutArea").html(html);
					$(".p_soldOutArea").show();
					var optionHtml = "";
					
					var saleArea = + list_price != dc_price ? "<span class=\"sale\"><em>"+SetNumComma(list_price)+"</em></span>"+unit : "";
					
					optionHtml += "<div class=\"box div_option_box\" id=\"div_option_"+optioncd+"\">"
					+ "<p class=\"ttl\">"+optionnm+"(일시품절)</p>"
					+ "<div class=\"selectNumbox\">"
					+ "<span class=\"hide span_wishOptioncd\">"+optioncd+"</span>"
					+ "<span class=\"hide span_wishCnt\">1</span>"
					+ "<div class=\"bundle\" style=\"top:-24px;\">"
					+ "<span class=\"priceZone span_soldOutPrice\">"
					+ saleArea
					+ "<span class=\"span_soldOutPrice price\"><em>"+SetNumComma(dc_price)+"</em></span>"+unit
					+ "</span>"
					+ "<a href=\"#none\" class=\"btn_delete btn_option_del\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/btn_delete.png\" alt=\"삭제\" /></a>"
					+ "</div>"
					+ "</div>"
					+ "</div>";
					
					$(".div_countBox").show();
					$(".div_countBox").append(optionHtml);
					
					$(".sel_option").val("");
					
					if(list_price != dc_price) {
						$(".span_priceArea>em").text(SetNumComma(dc_price));
						$(".span_saleArea>em").text(SetNumComma(list_price));
					} else {
						$(".span_saleArea>em").text(SetNumComma(dc_price));
					}
				}
//				$(".dd_optionMaker").text(object.detail.prddetail.v_manufacture);
//				$(".dd_optionMakecountry").text(object.detail.prddetail.v_origin);
				$(".dd_optionArea").text(optionnm);
				//gypark : 용량
				$(".dd_vol").text(capacity);
				$(".dd_optionArea").show();
				$(".dt_optionArea").show();
				
				/*if($(".div_todaydeli > .alimDetailBox").length == 0) {
					
					$(".div_todaydeli").hide();
				} else {
					$(".div_todaydeli").show();
				}*/
				//SmartOffer - 개인화 추천 태깅 (상품상세 옵션선택)
				try{productViewOptionTagEvent(optioncd,"MOBILE");}catch(e){}
			}
			var flagbeauty = $("input[name='i_sFlagBeauty']").val();
			
			if((dayoffcd != "" && dayoffcd != undefined && parseInt(dayoffStockqty) > 0) || flagbeauty == "Y") {
				$(".span_ribbon").text("0P");
				$(".span_beauty").text("0P");
			} else {
				// 구매시 적립 포인트
				if($(".span_onePlusCheckYn").text() == "Y" && flagEvent == "Y") {
					$(".span_beauty").text("0P");
				} else if(list_price != salePrice) {
					var levelcd = $("#i_sLevelcd").val();
					var bpoint  = null;
					if(levelcd == 'LV15' || levelcd == 'LV16' || levelcd == 'LV17' || levelcd == 'LV18' || levelcd == 'LV19' || levelcd == 'LV20'){
						var saleRate = (list_price - salePrice) * 100 / list_price;
						if(saleRate == 10){
							if(opt_bpoint_per != 0){
								bpoint = SetNumComma(Math.round(parseInt(salePrice) * opt_bpoint_per / 100))+" P";
							}
						}else{
							bpoint = "0P";
						}
        			}else{
        				bpoint = "0P";
        			}
					$(".span_beauty").text(bpoint);
				} else {
					var opt_mpointFlag = opt_mpoint_per.split("_")[0];
					var opt_mpoint = opt_mpoint_per.split("_")[1] == "" || opt_mpoint_per.split("_")[1] == undefined ? 0 : opt_mpoint_per.split("_")[1];
					
					var rpoint = 0;
					
					if(opt_mpointFlag == "FIX") {
						rpoint = opt_mpoint;
					} else {
						rpoint = Math.round(parseInt(salePrice) * parseInt(opt_mpoint) / 100);
					}
					
					var bpoint = Math.round(parseInt(salePrice) * opt_bpoint_per / 100);
					
					$(".span_ribbon").text(SetNumComma(rpoint) + " P");
					$(".span_beauty").text(SetNumComma(bpoint) + " P");
				}
			}
			
			// 각 상태에 따라 알림박스가 추가됨
			var noticeHtml = [];
			$("#div_deli02").remove();
			if(deliveryType == "0002" || optDeliveryType == "0002") {
				noticeHtml.push("<div class=\"alimDetailBox\" id=\"div_deli02\">");
				noticeHtml.push("<a href=\"#\" class=\"btn_spClose\">알림박스 닫기</a>");
				noticeHtml.push("<p>* 해당상품은 <em>오늘배송 상품</em>입니다. 오전 11시 이전 주문시 서울/경기 지역은 당일 상품을 받을 수 있습니다. (일부 지역 제외 / 재고 사정에 따라 일부 지연 가능)</p>");
				noticeHtml.push("</div>");
			}
			
			$("#div_deli03").remove();
			if(deliveryType == "0003" || optDeliveryType == "0003") {
				noticeHtml.push("<div class=\"alimDetailBox\" id=\"div_deli03\">");
				noticeHtml.push("<a href=\"#\" class=\"btn_spClose\">알림박스 닫기</a>");
				noticeHtml.push("<p>* 본 상품은 <em>예약상품</em>입니다. 예약상품 구매시 상품을 수령하기까지 <em>최대 15일</em>이 소요될 수 있습니다.</p>");
				noticeHtml.push("</div>");
			}
			
			$("#div_sapst04").remove();
			if(sapStcd == "DK_004" && optStatuscd == "0003") {
				noticeHtml.push("<div class=\"alimDetailBox\" id=\"div_sapst04\">");
				noticeHtml.push("<a href=\"#\" class=\"btn_spClose\">알림박스 닫기</a>");
				noticeHtml.push("<p>* 본 상품은 <em>단종(Discontinued)된 상품</em>입니다. 단종된 상품은 구매하실 수가 없습니다.</p>");
				noticeHtml.push("</div>");
			}
			
			$("#div_sapst05").remove();
			if(sapStcd == "DK_005") {
				var ad_productcd = $(".span_ad_productcd", optioninfo).text();
				var ad_productnm = $(".span_ad_productnm", optioninfo).text();
				noticeHtml.push("<div class=\"alimDetailBox\" id=\"div_sapst05\">");
				noticeHtml.push("<a href=\"#\" class=\"btn_spClose\">알림박스 닫기</a>");
				noticeHtml.push("<p>* 본 상품은 <em>AD(Advanced)</em>된 상품입니다. AD전 상품 : <a href=\"#\" class=\"btn_detail\" id=\""+ad_productcd+"\"><font color=\"blue\">"+ad_productnm+"</font></a></p>");
				noticeHtml.push("</div>");
			} 
			
			$("#div_af01").remove();
			var af_ad_productcd = $(".span_af_ad_productcd", optioninfo).text();
			
			if(af_ad_productcd != undefined && af_ad_productcd != "" && af_ad_productcd != "undefined") {
				var af_ad_productnm = $(".span_af_ad_productnm", optioninfo).text();
				noticeHtml.push("<div class=\"alimDetailBox\" id=\"div_af01\">");
				noticeHtml.push("<a href=\"#\" class=\"btn_spClose\">알림박스 닫기</a>");
				noticeHtml.push("<p>* 본 상품은 <em>AD(Advanced)</em>전 상품입니다. AD된 상품 : <a href=\"#\" class=\"btn_detail\" id=\""+af_ad_productcd+"\"><font color=\"blue\">"+af_ad_productnm+"</font></a></p>");
				noticeHtml.push("</div>");
			}

			$("#div_st02").remove();
			if((optStatuscd == "0002" || statuscd == "0002" || (optStatuscd == "0001" && parseInt(stockqty) < 1)) && (optStatuscd != "0003" && sapStcd != "DK_004")) {
				if(GLOBAL_MOBILE_APP != "APP") {
					noticeHtml.push("<div class=\"alimDetailBox\" id=\"div_st02\">");
					noticeHtml.push("<a href=\"#\" class=\"btn_spClose\">알림박스 닫기</a>");
					noticeHtml.push("<p>* 본 상품은 <em>일시품절</em>입니다. 재고알리미 서비스는 모바일 아모레퍼시픽 앱에서 받으실 수 있습니다.</p>");
					noticeHtml.push("</div>");
				}
			}
			
			$(".div_todaydeli").html(noticeHtml.join(""));
			
			var texturenm = $(".span_texturenm", optioninfo).text();
			var makeupeft = $(".span_makeupeft", optioninfo).text();
			
			$(".div_makeupArea").show();
			
			// 메이크업 제품의 경우 메이크업 효과와 텍스쳐가 입력되어 있으면 해당영역을 보여주고 내용을 넣어줌
			if(featureTag != undefined && featureTag != "" && featureTag.indexOf("DG_P003") > -1) {
				if(texturenm != undefined && texturenm != "" && texturenm != "undefined") {
					$(".li_texture> .txt").text(texturenm);
					$(".li_texture").show();
				} else {
					$(".li_texture").hide();
				}
				
				if(makeupeft != undefined && makeupeft != "" && makeupeft != "undefined") {
					$(".li_makeup> .txt").text(makeupeft);
					$(".li_makeup").show();
				} else {
					$(".li_makeup").hide();
				}
				
				if($("li", ".div_makeupArea").not(":hidden").size() == 0) {
					$(".div_makeupArea").hide();
				}
				
			} else {
				$(".div_makeupArea").hide();
			}
			
			// 상품 관련 이벤트 추가
			MobileShopProductDetail.fn.addProductCntEvent();
			
			// 버튼 이벤트 추가
			MobileShopProductDetail.fn.addBtnEvent();
			MobileShopProductDetail.fn.addDetailEvent();
			MobileShopProductDetail.fn.addProductCntEvent();
		},
		/**
		 * 상세 내용 html 그려줌
		 */
		setShopProductDetail : function(object) {
			var detail = object.detail.prddetail;
			var circle = object.detail.circlebnrlist;
			var delivery = object.deliveryVo;
			 
			var imgUrl = detail.v_img_path;
			
			if(detail.v_feature_tag != undefined && detail.v_feature_tag != "" && detail.v_feature_tag.indexOf("DG_P019")>-1 && $("#i_sLevelcd").val() != 'LV14'){
				if(detail.v_free_img_path != undefined && detail.v_free_img_path != ""){
					imgUrl = detail.v_free_img_path;
				} 
			}
			var name = detail.v_productnm;
			var desc = detail.v_comment;
			$(".btn_fb").attr("id", imgUrl+","+name+","+desc);
			$(".btn_fb_test").attr("id", imgUrl+","+name+","+desc);
			$(".btn_kt").attr("id", imgUrl+","+name+","+desc);
			$(".btn_tw").attr("id", imgUrl+","+name+","+desc);
			
			var levelcd = $("#i_sLevelcd").val();
			
			if(delivery != undefined) {
				$(".cash_buy").text(delivery.n_cash_buy);
				$(".cash_buy_limit").text(delivery.n_cash_buy_limit);
				$(".point_buy").text(delivery.n_point_buy);
				$(".point_buy_limit").text(delivery.n_point_buy_limit);
				$(".cash_today").text(delivery.n_cash_today);
				$(".cash_today_limit").text(delivery.n_cash_today_limit);
				$(".point_today").text(delivery.n_point_today);
				$(".point_today_limit").text(delivery.n_point_today_limit);
				$(".gift_box").text(delivery.n_gift_box);
				$(".gift_box_limit").text(delivery.n_gift_box_limit);
				$(".naming").text(delivery.n_naming);
				$(".naming_limit").text(delivery.n_naming_limit);
				$(".targetdtm").text(object.targetDtm);
			}
			
			if(detail != undefined) {
//				try {
//					
//					PAGE_TAG.PRODUCTS = detail.v_brandnm+";"+detail.v_productnm;
//					PAGE_TAG.PAGE_NAME = "HOME^"+detail.v_brandnm+"^"+detail.v_productnm;
//					s.pageName	= PAGE_TAG.PAGE_NAME;
//					s.products	= PAGE_TAG.PRODUCTS;
//					s.events	= "prodView,event4";
//					
//					void(s.t());
//				} catch(e) {}
				if(detail.v_nickname2 != undefined && detail.v_nickname2 != "undefined"){
					$(".recomm_txt_top").show(); 
					$(".txt_recomm").text(detail.v_nickname2);
				}/*else if(detail.v_nickname1 != undefined && detail.v_nickname1 != "undefined"){
					$(".txt_recomm").text(detail.v_nickname1);
				}*/else{
					$(".recomm_txt_top").hide(); 
					//$(".txt_recomm").text('');
				}
				var checkYn = detail.n_plus_evt_buy_cnt != "0" && detail.n_plus_evt_buy_cnt != undefined && detail.n_plus_evt_buy_cnt != "" ? "Y" : "N";
				$(".span_onePlusCheckYn").text(checkYn);
				$(".span_buyCnt").text(detail.n_plus_evt_buy_cnt);
				$(".span_giveCnt").text(detail.n_plus_evt_give_cnt);
				
				$(".delivery_typecd").text(detail.v_delivery_typecd);
				var featureTag = detail.v_feature_tag == undefined ? "" : detail.v_feature_tag;
				var flagSoloPack = featureTag != undefined && featureTag != "" && featureTag.indexOf("DG_P006") > -1 ? "Y" : "N";
				$(".feature_tag").text(featureTag);
				$("#i_sFlagSoloPack").val(flagSoloPack);
				$("#i_sFlagStaff").val(detail.v_flag_staff);
				
				var detailprdbnr = object.prddetailbanner;
				var evtBnrInfo = object.evtBnrInfo;
				
				//gypark : 이벤트 배너삭제함 rnwoo
				
				if(evtBnrInfo.v_eventcd != undefined && evtBnrInfo.v_eventcd != null && evtBnrInfo.v_eventcd != ""){
					var flagopen = $("input[name='i_sEvtBnrFlag']").val();
					if(flagopen == "Y"){
						$(".btn_bnr_prd").attr("href",GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd=" + evtBnrInfo.v_eventcd);
						$(".btn_bnr_prd>img").attr("src",evtBnrInfo.v_bnr_mo_img_path);
						$(".prdbanner_shop").show();
					}
				}else{
					for(var i = 0 ; i < detailprdbnr.length; i++){
						if(detailprdbnr[i].v_comment1 != undefined && detailprdbnr[i].v_comment1 != 'undefined'){
							if(detailprdbnr[i].v_comment1.indexOf(detail.v_brandcd) > -1){
								$(".btn_bnr_prd").attr("href",detailprdbnr[i].v_url);
								$(".btn_bnr_prd>img").attr("src",detailprdbnr[i].v_img_path);
								$(".prdbanner_shop").show();
							}
						}
					}
				}
				
				
				var productinfo = [];
				// 페이지 상단의 제품명, 한줄설명
			/*	if(detail.v_brandnm != undefined && detail.v_brandnm != "") {
					productinfo.push("<p class=\"brandNm\">"+detail.v_brandnm+"</p>");
				}
				*/
				productinfo.push("<h1 class=\"prodNm\">" + detail.v_brandnm + " " + detail.v_productnm+"</h1>");
				productinfo.push("<p class=\"onedesc\">"+detail.v_productnm_en+"</p>");
				productinfo.push("<p class=\"txt\">"+detail.v_comment+"</p>");
				productinfo.push("<p class=\"priceZone\">");
				if(detail.v_flag_beauty == "Y"){
					productinfo.push("	<span class=\"price\" style='color: #ea5279;'><em>"+SetNumComma(detail.n_price)+"</em>P");
				}else{
					if(detail.v_dayoffcd != null && parseInt(detail.n_dayoff_stockqty) <= 0){
						productinfo.push("	<span class=\"price\"><em>"+SetNumComma(detail.n_origin_price)+"</em>원");
					}else{
						productinfo.push("	<span class=\"price\"><em>"+SetNumComma(detail.n_price)+"</em>원");
					}
				}
				
				productinfo.push("<input type=\"hidden\" name=\"i_sProductnm\" value=\""+detail.v_productnm+"\"/>");
				productinfo.push("<input type=\"hidden\" name=\"i_arrProductnm\" value=\""+detail.v_productnm+"\"/>");
				productinfo.push("<input type=\"hidden\" name=\"i_sBrandnm\" value=\""+detail.v_brandnm+"\"/>");
				productinfo.push("<input type=\"hidden\" name=\"i_sFlagBeauty\" value=\""+detail.v_flag_beauty+"\"/>");
				
				if(detail.n_list_price != detail.n_price) {
					var salePer = 0;
					if(detail.v_dayoffcd != null && parseInt(detail.n_dayoff_stockqty) <= 0){
						salePer = Math.round((parseInt(detail.n_list_price) - parseInt(detail.n_origin_price)) * 100 / parseInt(detail.n_list_price));
					}else{
						salePer = Math.round((parseInt(detail.n_list_price) - parseInt(detail.n_price)) * 100 / parseInt(detail.n_list_price));
					}
					productinfo.push("	<span class=\"ico_sale\">(<em>"+salePer+"</em><span>%</span> OFF)</span></span>");
				}
				productinfo.push("</p>");
				
				var salePrice = 0;
				
				if((featureTag != undefined && featureTag != "" && featureTag.indexOf("DG_P015") > -1 && parseInt(detail.n_dayoff_stockqty) > 0) || featureTag.indexOf("DG_P015") == -1 ) {
					salePrice = detail.n_price;
				} else {
					salePrice = detail.n_origin_price;
				}
				
				$(".prodInfo").html(productinfo.join(""));
				
				// 제품 속성
				$(".dd_vol").text(detail.v_capacity);
				/*$(".dd_optionMaker").text(detail.v_opt_manufacture);
				$(".dd_optionMakecountry").text(detail.v_opt_origin);*/
				
				if(detail.v_categorycd != 'CTG006' && detail.v_categorycd != 'CTG005'){
					$(".chCtg").show();
				}else{
					$(".chCtg").hide();
				}
				
				var packdt = dateStrucChange(object.packdt, 1) + " 이후";
				
				if(detail.v_pack_dt != undefined && detail.v_pack_dt != "") {
					packdt = dateStrucChange(detail.v_pack_dt,1);
				}
				
				$(".dd_pack_dt").text(packdt);
				
				if(detail.v_skin_typenm != undefined && detail.v_skin_typenm != "") {
					$(".em_skin").text(detail.v_skin_typenm + " ");
					
					if(featureTag != undefined && featureTag != "" && featureTag.indexOf("DG_P012") > -1) {
						$(".em_skin").css("border-right", "1px solid #b8b8b8");
					}
				} else {
					$(".em_skin").remove();
				}
				
				if(featureTag != undefined && featureTag != "" && featureTag.indexOf("DG_P012") > -1) {
					$(".em_daynight").text("NIGHT 전용");
				} else {
					$(".em_daynight").remove();
				}
				
				if($(".em_daynight").length == 0 && $(".em_skin").length == 0) {
					$(".dt_type").remove();
					$(".dd_type").remove();
				}
				
				if(detail.v_skin_trouble != undefined && detail.v_skin_trouble != "") {
					$(".dd_trouble").text(detail.v_skin_trouble);
				} else {
					$(".dd_trouble").remove();
					$(".dt_trouble").remove();
				}
				var funcnm = "";
				if(detail.v_funcnm != undefined && detail.v_funcnm != "") {
					
					var arrFunction = detail.v_funcnm.split(";");
					for(var i=0; i<arrFunction.length; i++) {
						if(i != 0) {
							funcnm += ", " +arrFunction[i].split(",")[1];
						} else {
							funcnm += arrFunction[i].split(",")[1];
						}
					}
					
					$(".dd_func").text(funcnm);
				} else {
					$(".dd_func").text("해당없음");
				}
				
				$(".p_nickname").text(detail.v_nickname);
				
				//상품 띠배너
				var bannerhtml = [];
				
				if(detail.v_banner != undefined && detail.v_banner != "") {
					var banner = detail.v_banner;
					if(banner.split(",")[1].length == 2) {
						bannerhtml.push("<span class=\"ico_label2 la"+banner.split(",")[2]+"\"><em>"+banner.split(",")[1]+"</em><em></em></span>");
					} else {
						bannerhtml.push("<span class=\"ico_label2 la"+banner.split(",")[2]+"\"><em>"+banner.split(",")[1].substring(0,2)+"</em><em>"+banner.split(",")[1].substring(2,4)+"</em></span>");
					}
				}
				var awardhtml = [];
				if(circle.length >0){
					for(var k=0; k<circle.length; k++){
						awardhtml.push("<li class=\"label_magazine\"><img src='"+GLOBAL_MOBILE_IMG_URL+"content/"+circle[k].v_tagcd+"_big.png' alt=\"\"/></li>");
					}
				}
				$(".span_banner").html(bannerhtml);
				$(".span_award").html(awardhtml);
				
				$(".div_prd_ico").html(getFilterHtmlTag(detail.v_feature_tag));
				
				var arrImgList = [];
				
				if(detail.v_img_path != undefined && detail.v_img_path != "") {
					var imgPath = detail.v_img_path;
					if(detail.v_feature_tag != undefined && detail.v_feature_tag != "" && detail.v_feature_tag.indexOf("DG_P009") > -1 && $("#i_sLevelcd").val() != 'LV14'){
						if(detail.v_free_img_path != undefined && detail.v_free_img_path != ""){
							imgPath = detail.v_free_img_path;
							arrImgList.push({path:imgPath.replace("_155", ""), optioncd : ""});
							arrImgList.push({path:detail.v_img_path.replace("_155", ""), optioncd : ""});
						}else{
							arrImgList.push({path:imgPath.replace("_155", ""), optioncd : ""});
						}
					}else{
						arrImgList.push({path:imgPath.replace("_155", ""), optioncd : ""});
					}
				}
				
				//제품사진 swipe부분을 만들기 위해 배열에 조회해온 썸네일 리스트를 push. (옵션별 이미지가 추가될 수 있으므로.)
				var imglist = object.detail.thumblist;
				
				if(imglist != undefined && imglist.length > 0) {
					for(var i=0; i<imglist.length; i++) {
						if(imglist[i].v_image_path != undefined && imglist[i].v_image_path != "") {
							var imgPath = imglist[i].v_image_path;
							arrImgList.push({path : imgPath.replace("_155", ""), optioncd : ""});
						}
					}
				}
				
				var priceinfo = [];
				
				var unit = "";
				
				if (featureTag != undefined && featureTag != "" && featureTag.indexOf("DG_P014") > -1) {
					unit = "P";
				} else {
					unit = "원";
				}
				
				$(".dd_totalPrice").html("<em>0</em>"+unit);
				
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
				
				
				if((parseInt(date) >= 20150401 && parseInt(date) <= 20150408) || (parseInt(date) >= 20150412 && parseInt(date) <= 20150418)){
					if(GLOBAL_MOBILE_APP == "APP"){
						priceinfo.push("<dt style='color:#ec6386;font-size: larger;'>앱 특별가</dt>");
					}else{
						priceinfo.push("<dt>판매가</dt>");
					}
				}else{
					var flagBeauty = $("input[name='i_sFlagBeauty']").val();
					if(flagBeauty == "Y"){
						priceinfo.push("<dt>필요 뷰티포인트</dt>");
					}else{
						priceinfo.push("<dt>판매가</dt>");
					}
				}
				
				
				priceinfo.push("<dd class=\"priceZone\">");
				priceinfo.push("	<span class=\"price span_saleArea\"><em>"+SetNumComma(detail.n_list_price)+"</em>"+unit+"</span>");
				priceinfo.push("</dd>");
				
				var saleNm = "";
				var saleHtml = "";
				if(detail.v_dayoffcd != undefined && detail.v_dayoffcd != "" && parseInt(detail.n_dayoff_stockqty) <= 0) {
					saleHtml = "	<span style=\"color:#ea5279;\">종료</span>";
				} else {
					saleHtml = "	<span class=\"salePrice span_priceArea\"><em>"+SetNumComma(detail.n_price)+"</em>"+unit+"</span>";
				}			
				
				if(levelcd == "LV12" && parseInt(detail.n_list_price) > parseInt(detail.n_price)) {
					if(detail.v_dayoffcd != undefined && detail.v_dayoffcd != "") {
						saleNm = "할인가";
					} else {
						saleNm = "VIP할인가";
					}
					//VIP할인
					priceinfo.push("<dt class=\"ico_memberLevel2 m2\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_memberLevel2_m2.png\" alt=\"\" />"+saleNm+"</dt>");
					priceinfo.push("<dd class=\"priceZone dd_salePriceArea\">");
					priceinfo.push(saleHtml);
					priceinfo.push("</dd>");
				} else if(levelcd == "LV13" && parseInt(detail.n_list_price) > parseInt(detail.n_price)){
					if(detail.v_dayoffcd != undefined && detail.v_dayoffcd != "") {
						saleNm = "할인가";
					} else {
						saleNm = "VVIP할인가";
					}
					
					//VVIP할인
					priceinfo.push("<dt class=\"ico_memberLevel2 m3\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_memberLevel2_m3.png\" alt=\"\" />"+saleNm+"</dt>");
					priceinfo.push("<dd class=\"priceZone dd_salePriceArea\">");
					priceinfo.push(saleHtml);
					priceinfo.push("</dd>");
				} else if (parseInt(detail.n_list_price) > parseInt(detail.n_price)) {
					if(detail.v_dayoffcd != undefined && detail.v_dayoffcd != "") {
						saleNm = "투데이찬스가";
					} else {
						saleNm = "할인가";
					}
					
					//일반할인
					priceinfo.push("<dt class=\"saleZone\">"+saleNm+"</dt>");
					priceinfo.push("<dd class=\"priceZone dd_salePriceArea\">");
					priceinfo.push(saleHtml);
					priceinfo.push("</dd>");
					
				}
				if((detail.v_dayoffcd != undefined && detail.v_dayoffcd != "" && parseInt(detail.n_dayoff_stockqty) > 0) || detail.v_flag_beauty == "Y") {
					$(".span_ribbon").text("0P");
					$(".span_beauty").text("0P");
				} else {
					if(detail.n_mpoint_per != "" && detail.n_mpoint_per != undefined) {
						var opt_mpoint_per = detail.n_mpoint_per;
						
						var opt_mpointFlag = opt_mpoint_per.split("_")[0];
						var opt_mpoint = opt_mpoint_per.split("_")[1] == "" || opt_mpoint_per.split("_")[1] == undefined ? 0 : opt_mpoint_per.split("_")[1];
						
						var rpoint = 0;
						
						if(opt_mpointFlag == "FIX") {
							rpoint = opt_mpoint;
						} else {
							rpoint = Math.round(parseInt(salePrice) * parseInt(opt_mpoint) / 100);
						}
						
						if(checkYn == "Y") {
							$(".span_beauty").text("0P");
						} else if (parseInt(detail.n_list_price) > parseInt(detail.n_price)) {
							var levelcd = $("#i_sLevelcd").val();
							var bpoint  = null;
							if(levelcd == 'LV15' || levelcd == 'LV16' || levelcd == 'LV17' || levelcd == 'LV18' || levelcd == 'LV19' || levelcd == 'LV20'){
								var saleRate = (detail.n_list_price - detail.n_price) * 100 / detail.n_list_price;
								if(saleRate == 10){
									if(detail.n_bpoint_per != 0){
										bpoint = SetNumComma(Math.round(parseInt(salePrice) * parseInt(detail.n_bpoint_per) / 100))+" P";
									}
								}else{
									bpoint = "0P";
								}
		        			}else{
		        				bpoint = "0P";
		        			}
							$(".span_beauty").text(bpoint);
						} else {
							// 구매시 적립 포인트
							var bpoint = Math.round(parseInt(salePrice) * parseInt(detail.n_bpoint_per) / 100);
							$(".span_beauty").text(SetNumComma(bpoint) + " P");
						}
						$(".span_ribbon").text(SetNumComma(rpoint) + " P");
					}
				}
				
				priceinfo.push("<dt class=\"dt_hiddenSaleArea\" style=\"display:none;\">할인가</dt>");
				priceinfo.push("<dd class=\"dd_hiddenSaleArea\" style=\"display:none;\"><em></em>원</dt>");
				
				$(".dl_price").append(priceinfo.join(""));
				
				if(detail.v_dayoffcd != undefined && detail.v_dayoffcd != "" && parseInt(detail.n_dayoff_stockqty) <= 0) {
					var dayoffEndHtml = [];
					dayoffEndHtml.push("<dt class=\"saleZone dt_originArea\">정상가</dt>");
					dayoffEndHtml.push("<dd class=\"priceZone dd_originArea\">");
					dayoffEndHtml.push("<span class=\"salePrice span_priceArea\"><em>"+SetNumComma(detail.n_origin_price)+"</em>"+unit+"</span>");
					dayoffEndHtml.push("</dd>");
					$(".dl_price").append(dayoffEndHtml.join(""));
				}
				
				
				$(".span_text_cnt").text(SetNumComma(detail.n_text_cnt2));
				$(".span_photo_cnt").text(SetNumComma(detail.n_photo_cnt2));
				
				// 메이크업 제품 아닐 때 color, 메이크업 속성 영역 지움
				if(featureTag != undefined && featureTag != "" && featureTag.indexOf("DG_P003") == -1) {
					$(".div_colorArea").remove();
					$(".div_makeupArea").remove();
				} 
				
				// 제품 추가 정보 팝업에 내용 넣어줌
				$(".td_productcd").text(detail.v_productcd);
				
				if(parseInt(detail.n_user_vote) > 0) {
					$(".em_ico_like").addClass("ico_splikeOn");
				} else {
					$(".em_ico_like").addClass("ico_splikeOff");
				}
				
				$(".em_ico_like").text(SetNumComma(detail.n_vote_cnt));
				
				// 재구매 의사 퍼센트
				$(".repurchase>em").text(detail.n_rebuy_per);
				
				// 구매후기 별점 set
				var recomPoint = detail.n_text_recom_point;
				$(".gradetxt>em").text(recomPoint);
				$(".span_gradeType").addClass("grade0" + Math.round(recomPoint));
				
				var option = object.detail.option;
				var cushionList = object.cushionList;
				
				// 옵션상품 있을 경우
				if(option != undefined && option.length > 0 && detail.v_typecd != "0003") {
					// 메이크업제품이 아닐 경우 메이크업 정보 영역 숨김
					if(featureTag != undefined && featureTag != "" && featureTag.indexOf("DG_P003") > -1) {
						$(".div_makeupArea").hide();
					}
					
					// 옵션 정보 set
					var optionhtml = [];
					var spanhtml = [];
					var ingredientHtml = [];
					var colorHtml = [];
					
					var soldout = "";
					var soldoutCnt = 0;
					
//					<!-- 옵션 셀렉트박스 부분 수정 20170308 s -->
					
					optionhtml.push("<div class=\"sec_optionList div_optionList\">");
					optionhtml.push("<div class=\"sec_optionListBox div_optionListBox\">옵션을 선택하세요.</div>");
					
					optionhtml.push("	<div class=\"tableWrap\">");			
					optionhtml.push("	<table class=\"\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">");
					optionhtml.push("		<caption><span>상품옵션 선택 표</span></caption>");
                    optionhtml.push("		<colgroup>");
                    optionhtml.push("			<col width=\"70%\">");
                    optionhtml.push("   		<col width=\"*\">");
                    optionhtml.push("		</colgroup>");
                    optionhtml.push("		<tbody>");
                    
					for(var i=0; i<option.length; i++) {
						if(detail.v_statuscd == "0002" || detail.v_statuscd == "0003" || parseInt(option[i].n_stockqty) == 0 || option[i].v_opt_statuscd == "0002") {
							soldout = "(일시품절)";
							soldoutCnt++;
						} else {
							soldout = "";
						}
						
						var dayoffcd = option[i].v_dayoffcd == "" || option[i].v_dayoffcd == undefined ? '' : option[i].v_dayoffcd;
						
						
						optionhtml.push("	<tr class=\"tr_option\" id=\"" + option[i].v_optioncd + "\">");
						optionhtml.push("   	<td>"); 
						optionhtml.push("			<p class=\"mo_optionnm\">" + option[i].v_optionnm + soldout + "</p>");
						optionhtml.push("		</td>");
	                    optionhtml.push("		<td>");
	                    optionhtml.push("   		<p>");
	                    	
						if (option[i].n_list_price != option[i].n_price){
							optionhtml.push("			<span class=\"mo_listprice\">" + SetNumComma(option[i].n_list_price) + "원</span>");
						}	                    
	                    
						if(dayoffcd != undefined && dayoffcd != "" && option[i].n_dayoff_stockqty <= 0){
							optionhtml.push("				<span class=\"mo_price\">" + SetNumComma(option[i].n_origin_price) + "원</span>");
						}else{
							optionhtml.push("				<span class=\"mo_price\">" + SetNumComma(option[i].n_price) + "원</span>");
						}
	            		optionhtml.push("			</p>");
	            		optionhtml.push("		</td>");
	            		optionhtml.push("    </tr>");
						
//						optionhtml.push("<option value=\""+option[i].v_optioncd+"\">"+option[i].v_optionnm+soldout+"</option>");
						
						spanhtml.push("<span id=\"span_option_"+option[i].v_optioncd+"\" style=\"display:none;\">");
						spanhtml.push("<span class=\"span_capacity\">"+option[i].v_capacity+"</span>");
						spanhtml.push("<span class=\"span_optionnm\">"+option[i].v_optionnm+"</span>");
						spanhtml.push("<span class=\"span_statuscd\">"+detail.v_statuscd+"</span>");
						spanhtml.push("<span class=\"span_opt_statuscd\">"+option[i].v_opt_statuscd+"</span>");
						spanhtml.push("<span class=\"span_option_dc_price\">"+option[i].n_price+"</span>");
						spanhtml.push("<span class=\"span_option_price\">"+option[i].n_list_price+"</span>");
						spanhtml.push("<span class=\"span_stockqty\">"+option[i].n_stockqty+"</span>");
						spanhtml.push("<span class=\"span_max_cart_cnt\">"+option[i].n_opt_max_cart_cnt+"</span>");
						spanhtml.push("<span class=\"span_delivery_type\">"+option[i].v_delivery_typecd+"</span>");
						spanhtml.push("<span class=\"span_opt_delivery_type\">"+option[i].v_opt_delivery_typecd+"</span>");
						spanhtml.push("<span class=\"span_sap_stcd\">"+option[i].v_opt_sap_stcd+"</span>");
						spanhtml.push("<span class=\"span_texturenm\">"+option[i].v_opt_texturenm+"</span>");
						spanhtml.push("<span class=\"span_makeupeft\">"+option[i].v_opt_makeupeft+"</span>");
						spanhtml.push("<span class=\"span_featureTag\">"+featureTag+"</span>");
						spanhtml.push("<span class=\"span_bpoint_per\">"+option[i].n_bpoint_per+"</span>");
						spanhtml.push("<span class=\"span_mpoint_per\">"+option[i].n_mpoint_per+"</span>");
						spanhtml.push("<span class=\"span_ad_productnm\">"+option[i].v_ad_productnm+"</span>");
						spanhtml.push("<span class=\"span_ad_productcd\">"+option[i].v_ad_productcd+"</span>");
						spanhtml.push("<span class=\"span_af_ad_productnm\">"+option[i].v_af_ad_productnm+"</span>");
						spanhtml.push("<span class=\"span_af_ad_productcd\">"+option[i].v_af_ad_productcd+"</span>");
						spanhtml.push("<span class=\"span_dayoff_stockqty\">"+option[i].n_dayoff_stockqty+"</span>");
						spanhtml.push("<span class=\"span_origin_price\">"+option[i].n_origin_price+"</span>");
						spanhtml.push("<span class=\"span_dayoffcd\">"+dayoffcd+"</span>");
						spanhtml.push("<span class=\"span_flag_event\">"+option[i].v_flag_event+"</span>");
						spanhtml.push("<span class=\"span_flag_solopack\">"+option[i].v_flag_solopack+"</span>");
						spanhtml.push("<span class=\"span_opt_manufacture\">"+option[i].v_opt_manufacture+"</span>");
						spanhtml.push("<span class=\"span_opt_origin\">"+option[i].v_opt_origin+"</span>");						
						spanhtml.push("</span>");
						
						//gypark : 쿠션 리필
						spanhtml.push("<span class=\"span_cushion\" style=\"display:none;\">");
						for(var j = 0; j < cushionList.length; j++){
							spanhtml.push("    <span class=\"span_cushion_option cusion_"+cushionList[j].v_optioncd+"\">"+cushionList[j].v_optioncd+"</span>");
						}
						spanhtml.push("</span>");
						
						// 전성분
						var ingredient = option[i].v_opt_ingredient == undefined ? "아직 등록된 전성분 정보가 없습니다." : option[i].v_opt_ingredient;
						
						ingredientHtml.push("<div class=\"sec\">");
						ingredientHtml.push("	<div class=\"ttlArea\">");

						if(detail.v_brandnm != undefined && detail.v_brandnm != "") {
							ingredientHtml.push("		<p class=\"brandNm\">"+detail.v_brandnm+"</p>");
						}
						
						ingredientHtml.push("		<p class=\"prodNm\">"+detail.v_productnm+"</p>");
						ingredientHtml.push("	</div>");
						ingredientHtml.push("	<p class=\"option\">"+option[i].v_optionnm+"</p>");
						ingredientHtml.push("	<p class=\"txt\">"+ingredient+"</p>");
						ingredientHtml.push("</div>");
						
						// 옵션 이미지 있을 경우에 이미지 배열에 push
						if(option[i].v_opt_thumbnail != undefined && option[i].v_opt_thumbnail != "") {
							arrImgList.push({path : option[i].v_opt_thumbnail, optioncd : option[i].v_optioncd});
						}
						
						if(option[i].v_tile_path != undefined && option[i].v_title_path != "") {
							colorHtml.push("<li class='" + (detail.v_flag_billing_prod == 'N' ? 'li_color' : '') + "' id=\""+option[i].v_optioncd+"\">");
							colorHtml.push("	<a href=\"javascript:;\"><img src=\""+option[i].v_tile_path+"\" /></a>");
							colorHtml.push("</li>");
						} else {
							if(option[i].v_opt_rgb != undefined && option[i].v_opt_rgb != "") {
								var arrRgb = option[i].v_opt_rgb.split(",");
								colorHtml.push("<li class='" + (detail.v_flag_billing_prod == 'N' ? 'li_color' : '') + "' id=\""+option[i].v_optioncd+"\"><a href=\"javascript:;\">");
								for(var r=0; r<arrRgb.length; r++) {
									colorHtml.push("	<span class=\"color\" style=\"background:#"+arrRgb[r]+"\"></span>");
								}
								colorHtml.push("</a></li>");	
							}
						}
					}
					
					optionhtml.push("		</tbody>");
	                optionhtml.push("	</table>");
	                optionhtml.push("	</div>");
	                
					
//					optionhtml.push("</select>");
					
					// 옵션 selec영역에 push
					$(".div_select").html(optionhtml.join(""));
					// 전성분 영역에 push
					$(".div_ingredient").html(ingredientHtml.join(""));
					// 옵션 selec영역에 push
					$(".div_select").append(spanhtml.join(""));
					
					$(".div_colorArea>ul").append(colorHtml.join(""));
					
					if(soldoutCnt == option.length) {
						$(".btn_purchase").css("cursor", "not-allowed");
						$(".btn_purchase").addClass("btn_purchase_not").removeClass("btn_purchase");
						
						$(".btn_add_cart").css("cursor", "not-allowed");
						$(".btn_add_cart").addClass("btn_add_cart_not").removeClass("btn_add_cart");
					}
					
					//옵션을 선택하지 않은채로 출력되므로 총 주문 금액 0으로 set
					$(".dd_totalPrice>em").text(0);
					
					$(".setProdArea").hide();
					
					$(".dt_delivery").hide();
					$(".dd_delivery").hide();
				} else {
					/*if(featureTag.indexOf("DG_P003") > -1 || featureTag.indexOf("DG_P004") > -1) {
						if(featureTag.indexOf("DG_P003") > -1) {
							if(detail.v_opt_texturenm != "" || detail.v_opt_makeupeft != "") {
								if(detail.v_opt_texturenm != "") {
									$(".li_texture> .txt").text(detail.v_opt_texturenm);
								} else {
									$(".li_texture").hide();
								}
								
								if(detail.v_opt_makeupeft != "") {
									$(".li_makeup> .txt").text(detail.v_opt_makeupeft);
								} else {
									$(".li_makeup").hide();
								}
							} else {
								$(".div_makeupArea").hide();
							}
						}
						
						var optionhtml = [];
						var colorHtml = [];
						
						optionhtml.push("<select name=\"\" class=\"selectBox2 sel_option\">");
						optionhtml.push("<option value=\"\">옵션을 선택하세요.</option>");
						
						if(detail.v_statuscd == "0002" || parseInt(detail.n_stockqty) == 0 || detail.v_opt_statuscd == "0002") {
							soldout = "(일시품절)";
						} else {
							soldout = "";
						}
							
						optionhtml.push("<option value=\""+detail.v_optioncd+"\">"+detail.v_optionnm+soldout+"</option>");
						optionhtml.push("</select>");
						
						// 옵션 selec영역에 push
						$(".div_select").html(optionhtml.join(""));
						
						if(detail.v_tile_path != undefined && detail.v_title_path != "") {
							colorHtml.push("<li class=\"li_color\" id=\""+detail.v_optioncd+"\">");
							colorHtml.push("	<a href=\"#\"><img src=\""+detail.v_tile_path+"\" style=\"border: 2px solid #fff;\"/></a>");
							colorHtml.push("</li>");
						} else {
							if(detail.v_opt_rgb != undefined && detail.v_opt_rgb != "") {
								var arrRgb = detail.v_opt_rgb.split(",");
								colorHtml.push("<li class=\"li_color\" id=\""+detail.v_optioncd+"\"><a href=\"#\">");
								for(var r=0; r<arrRgb.length; r++) {
									colorHtml.push("	<span class=\"color\" style=\"background:#"+arrRgb[r]+"\"></span>");
								}
								colorHtml.push("</a></li>");	
							}
						}
						
						$(".div_colorArea>ul").append(colorHtml.join(""));
						
						// 옵션 이미지 있을 경우에 이미지 배열에 push
						if(detail.v_opt_thumbnail != undefined && detail.v_opt_thumbnail != "") {
							arrImgList.push({path : detail.v_opt_thumbnail, optioncd : detail.v_optioncd});
						}
					} else {*/
						//옵션없는 제품의 경우 알림박스를 처음부터 그려줌
						var noticeHtml = [];
						
						if(detail.v_opt_delivery_typecd == "0003" || detail.v_delivery_typecd == "0003") {
							noticeHtml.push("<div class=\"alimDetailBox\" id=\"div_deli03\">");
							noticeHtml.push("<a href=\"#\" class=\"btn_spClose\">알림박스 닫기</a>");
							noticeHtml.push("<p>* 본 상품은 <em>예약상품</em>입니다. 예약상품 구매시 상품을 수령하기까지 <em>최대 15일</em>이 소요될 수 있습니다.</p>");
							noticeHtml.push("</div>");
						} 
						
						if(detail.v_opt_delivery_typecd == "0002" || detail.v_delivery_typecd == "0002") {
							noticeHtml.push("<div class=\"alimDetailBox\" id=\"div_deli02\">");
							noticeHtml.push("<a href=\"#\" class=\"btn_spClose\">알림박스 닫기</a>");
							noticeHtml.push("<p>* 해당상품은 <em>당일배송 상품</em>입니다. 오전 11시 이전 주문시 서울/경기 지역은 당일 상품을 받을 수 있습니다. (일부 지역 제외 / 재고 사정에 따라 일부 지연 가능)</p>");
							noticeHtml.push("</div>");
						}
						
						if(detail.v_opt_sap_stcd == "DK_004" && detail.v_opt_statuscd == "0003") {
							noticeHtml.push("<div class=\"alimDetailBox\" id=\"div_sapst04\">");
							noticeHtml.push("<a href=\"#\" class=\"btn_spClose\">알림박스 닫기</a>");
							noticeHtml.push("<p>* 본 상품은 <em>생산종료 되어 판매불가</em>상품 입니다.</p>");
							noticeHtml.push("</div>");
						} 
						
						if(detail.v_opt_sap_stcd == "DK_005") {
							noticeHtml.push("<div class=\"alimDetailBox\" id=\"div_sapst05\">");
							noticeHtml.push("<a href=\"#\" class=\"btn_spClose\">알림박스 닫기</a>");
							noticeHtml.push("<p>* 본 상품은 <em><a href=\"#\" class=\"btn_detail\" id=\""+detail.v_ad_productcd+"\"><font color=\"blue\">["+detail.v_ad_productnm+"]</font></a></em>의 <font color=\"blue\">NEW 버전 상품</font>입니다.</p>");
							noticeHtml.push("</div>");
						}

						if(detail.v_af_ad_productcd != "" && detail.v_af_ad_productcd != undefined ) {
							noticeHtml.push("<div class=\"alimDetailBox\" id=\"div_af01\">");
							noticeHtml.push("<a href=\"#\" class=\"btn_spClose\">알림박스 닫기</a>");
							noticeHtml.push("<p>* 본 상품은 <em><a href=\"#\" class=\"btn_detail\" id=\""+detail.v_af_ad_productcd+"\"><font color=\"blue\">["+detail.v_af_ad_productnm+"]</font></a></em>의 <font color=\"blue\">구버전</font> 상품입니다.</p>");
							noticeHtml.push("</div>");
						}
						
						if((detail.v_opt_statuscd == "0002" || detail.v_statuscd == "0002" || (detail.v_statuscd == "0001" && parseInt(detail.n_stockqty) < 1)) && detail.v_opt_sap_stcd != "DK_004" && detail.v_opt_statuscd != "0003") {
							if(GLOBAL_MOBILE_APP != "APP") {
								noticeHtml.push("<div class=\"alimDetailBox\" id=\"div_st02\">");
								noticeHtml.push("<a href=\"#\" class=\"btn_spClose\">알림박스 닫기</a>");
								noticeHtml.push("<p>* 본 상품은 <em>일시품절</em>입니다. 재고알리미 서비스는 모바일 아모레퍼시픽 앱에서 받으실 수 있습니다.</p>");
								noticeHtml.push("</div>");
							}
							
							//$(".btn_buy").remove();
						}
						
						$(".div_todaydeli").html(noticeHtml.join(""));
						
						// 옵션 없는 제품일 경우 메이크업 정보 처음부터 그려줌
						if((detail.v_opt_statuscd != "0002" && detail.v_statuscd != "0002" && (detail.v_statuscd == "0001" && parseInt(detail.n_stockqty) > 0))) {
							var html = "";
							var saleArea = + detail.n_list_price != salePrice ? "<span class=\"sale\"><em>"+SetNumComma(detail.n_list_price)+"</em></span>"+unit : "";
							// 상품 수량 영역 그려줌
							html += "<div class=\"box div_option_box\" id=\"div_option_"+detail.v_optioncd+"\">"
								 + "<p class=\"ttl\"></p>"
								 + "<div class=\"selectNumbox\">"
								 + "<span class=\"hide span_wishCnt\">1</span>"
								 + "<span class=\"hide span_wishOptioncd\">"+detail.v_optioncd+"</span>"
								 + "<input type=\"hidden\" name=\"i_arrProductCnt\" value=\"1\" readonly=\"readonly\"/>"
								 + "<span class=\"hide span_one_prod_price\">"+salePrice+"</span>"
								 + "<div class=\"selectNum\">"
								 + "<span class=\"span_productCnt\">1</span>"
								 + "<input type=\"hidden\" name=\"i_arrOptioncd\" value=\""+detail.v_optioncd+"\" readonly=\"readonly\"/>"
								 + "<button type=\"button\" class=\"btn_minus\" id=\"minus_"+detail.v_optioncd+"\" onclick=\"return false;\"><span class=\"hide\">감소</span></button>"
								 + "<button type=\"button\" class=\"btn_plus\" id=\"plus_"+detail.v_optioncd+"\" onclick=\"return false;\"><span class=\"hide\">증가</span></button>"
								 + "</div>"
								 + "<div class=\"bundle\">"
								 + "<span class=\"priceZone\">"
								 + saleArea
								 + "<span class=\"span_prdPrice price\"><em>"+SetNumComma(salePrice)+"</em></span>"+unit
								 + "</span>"
								 + "</div>"
								 + "</div>"
								 + "</div>";
							
							$(".div_countBox").show();
							$(".div_countBox").append(html);
							
							$(".dd_totalPrice>em").text(SetNumComma(salePrice));
							MobileShopProductDetail.fn.setDeliveryPrice(false);
						} else {
							$(".dd_totalPrice>em").text(0);
							
							var html = "";
							
							html += "<span class=\"hide span_wishOptioncd\">"+detail.v_optioncd+"</span>"
								 + "<span class=\"hide span_wishCnt\">1</span>";
							
							$(".div_countBox").append(html);
							$(".btn_purchase").css("cursor", "not-allowed");
							$(".btn_purchase").addClass("btn_purchase_not").removeClass("btn_purchase");
							
							$(".btn_add_cart").css("cursor", "not-allowed");
							$(".btn_add_cart").addClass("btn_add_cart_not").removeClass("btn_add_cart");
						}
					/*}*/
					
					// 상품 정보 set
					var spanhtml = [];
					var ingredientHtml = [];
					
					var dayoffcd = detail.v_dayoffcd == "" || detail.v_dayoffcd == undefined ? '' : detail.v_dayoffcd;
					
					spanhtml.push("<span id=\"span_option_"+detail.v_optioncd+"\" style=\"display:none;\">");
					spanhtml.push("<span class=\"span_capacity\">"+detail.v_capacity+"</span>");
					if(detail.v_optionnm != undefined && detail.v_optionnm != ""){
						spanhtml.push("<span class=\"span_optionnm\">"+detail.v_optionnm+"</span>");
					}else{
						spanhtml.push("<span class=\"span_optionnm\">"+detail.v_productnm+"</span>");
					}
					
					spanhtml.push("<span class=\"span_statuscd\">"+detail.v_statuscd+"</span>");
					spanhtml.push("<span class=\"span_opt_statuscd\">"+detail.v_opt_statuscd+"</span>");
					spanhtml.push("<span class=\"span_option_dc_price\">"+detail.n_price+"</span>");
					spanhtml.push("<span class=\"span_option_price\">"+detail.n_list_price+"</span>");
					spanhtml.push("<span class=\"span_option_price\">"+detail.list_price+"</span>");
					spanhtml.push("<span class=\"span_stockqty\">"+detail.n_stockqty+"</span>");
					spanhtml.push("<span class=\"span_max_cart_cnt\">"+detail.n_opt_max_cart_cnt+"</span>");
					spanhtml.push("<span class=\"span_delivery_type\">"+detail.v_delivery_typecd+"</span>");
					spanhtml.push("<span class=\"span_opt_delivery_type\">"+detail.v_opt_delivery_typecd+"</span>");
					spanhtml.push("<span class=\"span_sap_stcd\">"+detail.v_opt_sap_stcd+"</span>");
					spanhtml.push("<span class=\"span_bpoint_per\">"+detail.n_bpoint_per+"</span>");
					spanhtml.push("<span class=\"span_featureTag\">"+featureTag+"</span>");
					spanhtml.push("<span class=\"span_mpoint_per\">"+detail.n_mpoint_per+"</span>");
					spanhtml.push("<span class=\"span_dayoff_stockqty\">"+detail.n_dayoff_stockqty+"</span>");
					spanhtml.push("<span class=\"span_origin_price\">"+detail.n_origin_price+"</span>");
					spanhtml.push("<span class=\"span_dayoffcd\">"+dayoffcd+"</span>");
					spanhtml.push("<span class=\"span_flag_event\">Y</span>");
					spanhtml.push("<span class=\"span_flag_solopack\">"+detail.v_flag_solopack+"</span>");
					spanhtml.push("</span>");
					
					// 전성분
					var ingredient = detail.v_opt_ingredient == undefined ? "아직 등록된 전성분 정보가 없습니다." : detail.v_opt_ingredient;
					ingredientHtml.push("<div class=\"sec\">");
					ingredientHtml.push("	<div class=\"ttlArea\">");
					
					if(detail.v_brandnm != undefined && detail.v_brandnm != "") {
						ingredientHtml.push("		<p class=\"brandNm\">"+detail.v_brandnm+"</p>");
					}
					
					ingredientHtml.push("		<p class=\"prodNm\">"+detail.v_productnm+"</p>");
					ingredientHtml.push("	</div>");
					ingredientHtml.push("	<p class=\"txt\">"+ingredient+"</p>");
					ingredientHtml.push("</div>");
					
					$(".div_ingredient").html(ingredientHtml.join(""));
					$(".div_select").append(spanhtml.join(""));
					
					// 상품 버튼 이벤트
					MobileShopProductDetail.fn.addProductCntEvent();
				}
				
				// 상품 상세 이미지 있을 경우 
				var detailList = object.detail.detailImgList;
				if(detailList != undefined) {
					var detailImgHtml = [];
					
					for(var i = 0; i< detailList.length; i++) {	
						//if(detailList[i].v_recordid == detail.v_productcd) {
							detailImgHtml.push("<div class=\"viewImg\">");
							detailImgHtml.push("	<a href=\"#\" class=\"btn_detailViewImg btn_bigImg\">");						
							if( i == 0) {
								detailImgHtml.push("		<img src=\""+GLOBAL_MOBILE_IMG_URL+"common/btn_detailViewImg.png\" alt=\"상품상세 설명보러가기\" />");
							}						
							detailImgHtml.push("	</a>");
							detailImgHtml.push("	<img src=\""+detailList[i].v_image_path+"\" alt=\""+detail.v_productnm+" 상세정보이미지\"  style=\"padding:10px 10px !important;\" />");
							detailImgHtml.push("</div>");
							if( i == detailList.length-1) {
								detailImgHtml.push("<div class=\"btn_zoom\">");
								detailImgHtml.push("	<span class=\"btn_ty3 v2\"><a href=\"#\" class=\"btn_bigImg\">상세 설명 이미지 보기<em>(확대가능)</em></a></span>");
								detailImgHtml.push("</div>");
							}						
						//}
					}
					
					$(".div_detailImgArea").html(detailImgHtml.join(""));
				}
				$(".div_clobArea").html(detail.v_product_desc);
				
				var youtubeList = object.detail.youtubeList;
				
				if(youtubeList != undefined && youtubeList.length > 0) {
					var youtubeHtml = [];
					var youtubeNav = [];
					var active = "";
					for(var i=0; i<youtubeList.length; i++) {
						youtubeHtml.push("<div>");
						youtubeHtml.push("	<a href=\"#\" data-src=\""+youtubeList[i].v_youtubeid+"\" onclick=\"trackClicksEx('apmall^${rvo.v_brandnm} ${rvo.v_productnm}','상품상세^(동영상이 있을 경우) 동영상 재생', true)\">");
						youtubeHtml.push("		<img src=\"http://img.youtube.com/vi/"+youtubeList[i].v_youtubeid+"/0.jpg\" alt=\"video thumb\" />");
						youtubeHtml.push("		<span class=\"btn_mvplay\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"content/btn_mvplay.png\"/></span>");
						youtubeHtml.push("	</a>");
						youtubeHtml.push("</div>");
						
						if(i == 0) {
							active = "class=\"active\"";
						} else {
							active = "";
						}
						
						if(youtubeList.length > 1) {
							youtubeNav.push("<span "+active+" style=\"margin-left:2px;\"><span class=\"hide\">"+parseInt(i+1)+"</span></span>");
						}
					}
					
					$(".div_youtube").html(youtubeHtml.join(""));
					
					if(youtubeList.length > 1) {
						$(".brandGallery-nav").html(youtubeNav.join(""));
					}
				} else {
					$(".sec_youtubeArea").hide();
				}
				
				var setOption = object.detail.setOption;
				if(setOption != undefined && setOption.length > 0) {
					var len = setOption.length;
					
					var setOptionHtml = [];
					for(var i = 0; i< len; i++) {
						if(i % 3 == 0) {
							
							setOptionHtml.push("<div class=\"prodAlbumType v2\">");
							setOptionHtml.push("	<ul>");
						}
						
						setOptionHtml.push("<li class=\"li_setOption\">");
						setOptionHtml.push("	<a href=\""+GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+setOption[i].v_comp_productcd+"\">");
						setOptionHtml.push("		<div class=\"thumbImg\">");
						setOptionHtml.push("			<img src=\""+setOption[i].v_img_path+"\" alt=\"\" onerror=\"fnNoImage(this);\"/>");
						setOptionHtml.push("		</div>");
						setOptionHtml.push("		<div class=\"prodDetail\">");
						if(setOption[i].v_brandnm != undefined && setOption[i].v_brandnm != '' ) {
							setOptionHtml.push("			<p class=\"brandNm ellipsis\">"+setOption[i].v_brandnm+"</p>");
						}
						setOptionHtml.push("			<p class=\"prodNm\">"+setOption[i].v_comp_productnm+"</p>");
						setOptionHtml.push("		</div>");
						setOptionHtml.push("	</a>");
						setOptionHtml.push("</li>");
						
						if(i % 3 == 2 || i == len-1) {
							setOptionHtml.push("	</ul>");
							setOptionHtml.push("</div>");
						}
						
						var el = $(".div_detailDesc").eq(0).clone(true);
						
						$(".sec_youtubeArea", el).remove();
						
						var detailImgHtml = [];
						if(detailList != undefined && detailList.length > 0) {
							
							for(var j=0; j<detailList.length; j++) {
								if(detailList[j].v_recordid == setOption[i].v_comp_productcd) {
									detailImgHtml.push("<div class=\"viewImg\">");
									detailImgHtml.push("	<img src=\""+detailList[j].v_image_path+"\" alt=\""+detailList[j].v_comp_productnm+" 상세정보이미지\"  style=\"padding:10px 10px !important;\" />");
									detailImgHtml.push("</div>");
								}
							}
						}
						
						$(".div_detailImgArea", el).html(detailImgHtml.join(""));
						
						var optionDesc = setOption[i].v_product_desc == undefined || setOption[i].v_product_desc == "" ? "" : setOption[i].v_product_desc
						var desc = "<div class=\"sec\"><h3>상품명</h3><div class=\"cont\"><p>"+setOption[i].v_comp_productnm+"</p></div></div>"+optionDesc;
						$(".div_clobArea", el).html(desc);
						
						if($(".viewImg", el).size() == 0) {
							$(".div_detailImgArea", el).remove();
						}
						
						el.insertAfter($(".div_detailDesc:last"));
					}
					
					var setOptionNav = [];
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
								
								
								setOptionNav.push("<span "+active+" style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
							}
						}
						
						$(".setProd-nav").html(setOptionNav.join(""));
					} 
					
					$(".div_setProdArea").html(setOptionHtml.join(""));
					$(".setProdArea").show();
				}
				
				if(option != undefined && detail.v_typecd =="0003") {
					var len = option.length;
					
					var setOptionHtml = [];
					for(var i = 0; i< len; i++) {
						if(i % 3 == 0) {
							
							setOptionHtml.push("<div class=\"prodAlbumType v2\">");
							setOptionHtml.push("	<ul>");
						}
						
						setOptionHtml.push("<li class=\"li_setOption\">");
						setOptionHtml.push("	<a href=\""+GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+option[i].v_option_prodcd+"\">");
						setOptionHtml.push("		<div class=\"thumbImg\">");
						setOptionHtml.push("			<img src=\""+option[i].v_img_path+"\" alt=\"\" onerror=\"fnNoImage(this);\"/>");
						setOptionHtml.push("		</div>");
						setOptionHtml.push("		<div class=\"prodDetail\">");
					if(option[i].v_brandnm != undefined && option[i].v_brandnm != '' ) {
						setOptionHtml.push("			<p class=\"brandNm ellipsis\">"+option[i].v_brandnm+"</p>");
					}
						setOptionHtml.push("			<p class=\"prodNm\">"+option[i].v_optionnm+"</p>");
						setOptionHtml.push("		</div>");
						setOptionHtml.push("	</a>");
						setOptionHtml.push("</li>");
						
						if(i % 3 == 2 || i == len-1) {
							setOptionHtml.push("	</ul>");
							setOptionHtml.push("</div>");
						}
					}
					
					var setOptionNav = [];
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
								
								
								setOptionNav.push("<span "+active+" style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
							}
						}
						
						$(".setProd-nav").html(setOptionNav.join(""));
					} 
					
					$(".div_setProdArea").html(setOptionHtml.join(""));
					$(".setProdArea").show();
					
				}
				
				if($(".li_setOption").size() == 0) {
					$(".setProdArea").hide();
				}
				
				// 일시품절의 경우 입고알리미 신청 영역 그려줌
				if((detail.v_statuscd == "0002" || detail.v_opt_statuscd == "0002" || detail.n_stockqty <= 0) && (detail.v_opt_sap_stcd != "DK_004" && detail.v_opt_statuscd != "0003")) {
					var soldHtml = "";
					
					soldHtml += "선택하신 상품은 현재 <em>품절</em>입니다."
							 + "<span class=\"btn_alrim\"><a href=\"#\">입고알리미 신청</a></span>"
							 + "<input type=\"hidden\" id=\"i_sSoldOutOption\" value=\""+detail.v_optioncd+"\">";
					
					$(".p_soldOutArea").html(soldHtml);
				} else {
					$(".p_soldOutArea").hide();
				}
				
				// 해당상품에 freegood 있을 경우
				var freegoodList = object.detail.freegoodList;
				
				if(freegoodList != undefined && freegoodList.length > 0 && $("#i_sLevelcd").val() != 'LV14') {
					var len = freegoodList.length;
					//gypark : 사은품 표시 조건 추가
					$(".p_freeGiftMsg").html("위 스페셜기프트 상세안내 (뷰티포인트 결제시 제외)");
					
					var freegoodHtml = [];
					for(var i = 0; i< len; i++) {
						if(i % 3 == 0) {
							
							freegoodHtml.push("<div class=\"prodAlbumType v2\">");
							freegoodHtml.push("	<ul>");
						}
						
						freegoodHtml.push("<li>");
						freegoodHtml.push("		<div class=\"thumbImg\">");
						freegoodHtml.push("			<img src=\""+freegoodList[i].v_img_path+"\" alt=\"\" style=\"width:88px; height:88px;\"/>");
						freegoodHtml.push("		</div>");
						freegoodHtml.push("		<div class=\"prodDetail\">");
					if(freegoodList[i].v_brandnm != undefined && freegoodList[i].v_brandnm != '' ) {
						freegoodHtml.push("			<p class=\"brandNm ellipsis\">"+freegoodList[i].v_brandnm+"</p>");
					}
						freegoodHtml.push("			<p class=\"prodNm\">"+freegoodList[i].v_productnm+"</p>");
						freegoodHtml.push("		</div>");
						freegoodHtml.push("</li>");
						
						if(i % 3 == 2 || i == len-1) {
							freegoodHtml.push("	</ul>");
							freegoodHtml.push("</div>");
						}
					}
					
					var freegoodNav = [];
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
								
								
								freegoodNav.push("<span "+active+" style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
							}
						}
						$(".freeGiftProd-nav").html(freegoodNav.join(""));
					}
					$(".freeGiftProd-wrap").html(freegoodHtml.join(""));
				} else {
					$("#freeGiftProdSwipe").hide();
				}
				
				// 제품 이미지
				if(arrImgList.length > 0) {
					
					var imgHtml = "";
					var naviHtml = "";
					
					for(var i=0; i<arrImgList.length; i++) {
						imgHtml +="<div><img src=\""+arrImgList[i].path+"\" alt=\"\" id=\"img_"+arrImgList[i].optioncd+"\" onerror=\"fnNoImage(this);\"/></div>";
					}
					
					for(var i=0; i<arrImgList.length; i++) {
						var active = "";
						if(i == 0) {
							active = "class='active'";
						}
						
						if(arrImgList.length > 1) {
							naviHtml += "<span "+active+" style='margin:1px;'><span class=\"hide\">"+parseInt(i+1)+"</span></span>";
						}
					}

					$(".div_imglist").html(imgHtml);
					
					if(arrImgList.length > 1) {
						$(".div_navi").html(naviHtml);
					}
				}
				
				var brandHot = object.brandHot;
				
				if(brandHot != undefined && brandHot.length > 0) {
					var brandHtml = [];
					var brandNavi = [];
					
					$(".cate_title3").text(brandHot[0].v_scenariocomment);
					
					var len = brandHot.length;
					for(var i=0; i<len; i++) {
						if(i % 3 == 0) {
							brandHtml.push("<div class=\"prodAlbumType v2\">");
							brandHtml.push("	<ul>");
						}
						
						brandHtml.push("<li>");
						brandHtml.push("	<a href=\""+GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+brandHot[i].v_productcd+"&clickUrl="+brandHot[i].v_clickurl+"\" onClick=\"trackClicksMall('상품','모바일 상품상세^브랜드 인기상품','브랜드 인기상품','event5',true,'"+brandHot[i].v_productcd+"');productClickTagEvent('reco-dp-4','"+brandHot[i].v_productcd+"','MOBILE');\">");
						brandHtml.push("		<div class=\"thumbImg\">");
						brandHtml.push("			<img src=\""+brandHot[i].v_img_web_path+"\" alt=\"\" />");
						brandHtml.push("		</div>");
						brandHtml.push("		<div class=\"prodDetail\">");
						brandHtml.push("			<p class=\"prodNm\">"+getByteString(brandHot[i].v_productnm, 12)+"</p>");
						brandHtml.push("			<p class=\"priceZone\">");
						if(brandHot[i].n_list_price != brandHot[i].n_price) {
							brandHtml.push("				<span class=\"sale\"><em>"+SetNumComma(brandHot[i].n_list_price)+"</em>원</span>");
						}
						brandHtml.push("				<span class=\"price\"><em>"+SetNumComma(brandHot[i].n_price)+"</em>원</span>");
						brandHtml.push("			</p>");
						brandHtml.push("			<div class=\"prodEvalu\">");
						brandHtml.push("				<span class=\"gradeType2 grade0"+Math.round(brandHot[i].n_single_point)+"\"><span class=\"hide\">평점 "+brandHot[i].n_single_point+"</span></span>");
						brandHtml.push("				<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+SetNumComma(brandHot[i].n_review_cnt)+")</span>");
						brandHtml.push("			</div>");
						brandHtml.push("		</div>");
						brandHtml.push("	</a>");
						brandHtml.push("</li>");
						
						if(i % 3 == 2 || i == len-1) {
							brandHtml.push("	</ul>");
							brandHtml.push("</div>");
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
								
								
								brandNavi.push("<span "+active+" style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
							}
						}
						
						$(".hotitemProd-nav").html(brandNavi.join(""));
					}
					
					$(".hotitemProd-wrap").html(brandHtml.join(""));
				} else {
					$(".hotitemList").hide();
				}
				
				var sameRecomList = object.sameRecomList;
				var differentRecomList = object.differentRecomList;
				
				//$(".cate_title").text(object.categorynm + " 다른 인기상품");
				
				if(sameRecomList != undefined && sameRecomList.length > 0) {
					var sameHtml = [];
					var sameNav = [];
					
					$(".cate_title").text(object.categorynm + sameRecomList[0].v_scenariocomment);
					
					var len = sameRecomList.length;
					for(var i=0; i<len; i++) {
						if(i % 3 == 0) {
							sameHtml.push("<div class=\"prodAlbumType v2\">");
							sameHtml.push("	<ul>");
						}
						
						sameHtml.push("<li>");
						sameHtml.push("	<a href=\""+GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+sameRecomList[i].v_productcd+"&clickUrl="+sameRecomList[i].v_clickurl+"\" onClick=\"trackClicksMall('상품','모바일 상품상세^다른인기상품','다른인기상품','event5',true,'"+sameRecomList[i].v_productcd+"');productClickTagEvent('reco-dp-1','"+sameRecomList[i].v_productcd+"','MOBILE');\">");
						sameHtml.push("		<div class=\"thumbImg\">");
						sameHtml.push("			<img src=\""+sameRecomList[i].v_img_path+"\" alt=\"\" />");
						sameHtml.push("		</div>");
						sameHtml.push("		<div class=\"prodDetail\">");
						if(sameRecomList[i].v_brandnm != undefined && sameRecomList[i].v_brandnm != "") {
							sameHtml.push("			<p class=\"brandNm ellipsis\">"+sameRecomList[i].v_brandnm+"</p>");
						}
						sameHtml.push("			<p class=\"prodNm\">"+getByteString(sameRecomList[i].v_productnm, 12)+"</p>");
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
						$(".recommendProd-nav").html(sameNav.join(""));
					}
					
					$("#recommendProdSwipe>.recommendProd-wrap").html(sameHtml.join(""));
				} else {
					$("#recommendProdSwipe").parents(".recommendList").hide();
				}
				
				if(differentRecomList != undefined && differentRecomList.length > 0) {
					var differentHtml = [];
					var differentNav = [];
					
					$(".cate_title2").text(differentRecomList[0].v_scenariocomment);
					
					var len = differentRecomList.length;
					for(var i=0; i<len; i++) {
						if(i % 3 == 0) {
							differentHtml.push("<div class=\"prodAlbumType v2\">");
							differentHtml.push("	<ul>");
						}
						
						differentHtml.push("<li>");
						differentHtml.push("	<a href=\""+GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+differentRecomList[i].v_productcd+"&rccode=m_detail&clickUrl="+differentRecomList[i].v_clickurl+"\" onClick=\"trackClicksMall('상품','모바일 상품상세^고객선택상품','고객선택상품','event5',true,'"+differentRecomList[i].v_productcd+"');productClickTagEvent('reco-dp-2','"+differentRecomList[i].v_productcd+"','MOBILE');\">");
						differentHtml.push("		<div class=\"thumbImg\">");
						differentHtml.push("			<img src=\""+differentRecomList[i].v_img_path+"\" alt=\"\" />");
						differentHtml.push("		</div>");
						differentHtml.push("		<div class=\"prodDetail\">");
						if(differentRecomList[i].v_brandnm != undefined && differentRecomList[i].v_brandnm != "") {
							differentHtml.push("			<p class=\"brandNm ellipsis\">"+differentRecomList[i].v_brandnm+"</p>");
						}
						differentHtml.push("			<p class=\"prodNm\">"+getByteString(differentRecomList[i].v_productnm, 12)+"</p>");
						differentHtml.push("			<p class=\"priceZone\">");
						if(differentRecomList[i].n_list_price != differentRecomList[i].n_price) {
							differentHtml.push("				<span class=\"sale\"><em>"+SetNumComma(differentRecomList[i].n_list_price)+"</em> 원</span>");
						}
						differentHtml.push("				<span class=\"price\"><em>"+SetNumComma(differentRecomList[i].n_price)+"</em> 원</span>");
						differentHtml.push("			</p>");
						differentHtml.push("			<div class=\"prodEvalu\">");
						differentHtml.push("				<span class=\"gradeType2 grade0"+Math.round(differentRecomList[i].n_single_point)+"\"><span class=\"hide\">평점 "+differentRecomList[i].n_single_point+"</span></span>");
						differentHtml.push("				<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+SetNumComma(differentRecomList[i].n_review_cnt)+")</span>");
						differentHtml.push("			</div>");
						differentHtml.push("		</div>");
						differentHtml.push("	</a>");
						differentHtml.push("</li>");
						
						if(i % 3 == 2 || i == len-1) {
							differentHtml.push("	</ul>");
							differentHtml.push("</div>");
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
								
								
								differentNav.push("<span "+active+" style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
							}
						}
						
						$(".recommendProd-nav2").html(differentNav.join(""));
					}
					
					$("#recommendProdSwipe2>.recommendProd-wrap").html(differentHtml.join(""));
				} else {
					$("#recommendProdSwipe2").parents(".recommendList").hide();
				}
				
				
				MobileShopProductDetail.fn.addBtnEvent();
				MobileShopProductDetail.fn.addDetailEvent();
				
				//gypark
				MobileShopProductDetail.fn.setPrdLawInfo(detail,packdt);
				
				//gypark : 20150707 trackClicksEx 추가하기
				$(".btn_productLike").attr("onclick", "trackClicksEx('apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','상품 추천', true)");
				//$(".btn_add_cart").attr("onclick", "trackClicksEx('apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','장바구니 담기', true)");
				//$(".btn_wish_add").attr("onclick", "trackClicksEx('apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','위시리스트 추가', true)");
				$(".btn_purchase").attr("onclick", "trackClicksEx('apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','바로 구매', true)");
				$(".btn_ingredient").attr("onclick", "trackClicksEx('apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','전성분 확인하기', true)");
				$(".detailDesc").attr("onclick", "trackClicksEx('apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','상품 상세설명 탭', true);productViewTabClickTagEvent('상품상세설명','MOBILE');");
				$(".btn_textReview").attr("onclick", "trackClicksMall('후기','apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','구매후기 탭','event5, event25', true,'구매후기');productViewTabClickTagEvent('구매후기','MOBILE');");
				$(".btn_photoReview").attr("onclick", "trackClicksEx('apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','포토리뷰 탭', true);productViewTabClickTagEvent('포토리뷰','MOBILE');");
				$(".deliveryDesc").attr("onclick", "trackClicksEx('apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','배송/반품/교환 정보', true);productViewTabClickTagEvent('배송/반품/교환','MOBILE');");
				$(".cardBenefit").attr("onclick", "trackClicksEx('apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','카드사혜택 정보 탭', true);productViewTabClickTagEvent('카드사혜택','MOBILE');");
				$(".prdAddDesc").attr("onclick", "trackClicksEx('apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','상품 추가 정보', true);productViewTabClickTagEvent('상품추가정보','MOBILE');");
				
			} else {
				var beforeUrl = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_list.do?i_sFlagCategory=Y&i_sCategorycd1=CTG001";
				$(".shoppingDetail").html(addMobileNodata(beforeUrl));
			}
			
		},
		
		//gypark : 상품정보고시 html 만들기 
		setPrdLawInfo: function(detail,packdt){
			var prdLawHtml = [];
			
			var infoTypecd = detail.v_info_typecd;
			if(infoTypecd == "PI_001"){
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>용량 및 중량</p></th>");
				if(detail.v_capacity != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_capacity + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>제품 주요 사양</p></th>");
				if(detail.v_skin_typenm != undefined && detail.v_skin_typenm != "" && detail.v_skin_typenm != "undefined"){
					prdLawHtml.push(" 		<td>" + detail.v_skin_typenm + "</td>");
				}else{
					prdLawHtml.push(" 		<td>모든 피부</td>");
				}
				prdLawHtml.push("</tr>");
//				prdLawHtml.push("<tr>");
//				prdLawHtml.push("		<th scope='row'><p>제조일자</p></th>");
//				prdLawHtml.push(" 		<td>" + packdt + "</td>");
//				prdLawHtml.push("<tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>사용기한 또는<br>개봉 후 사용기간</p></th>");
				if(detail.v_expiration_cos != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_expiration_cos + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>사용방법</p></th>");
				prdLawHtml.push(" 		<td>제품 상세보기 참조</td>");
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>제조자</p></th>");
				if(detail.v_manufacture != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_manufacture + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>제조판매업자</p></th>");
				prdLawHtml.push(" 		<td>(주)아모레퍼시픽</td>");
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>제조국</p></th>");
				if(detail.v_origin != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_origin + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>성분</p></th>");
				if(detail.v_opt_ingredient != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_opt_ingredient + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>기능성 화장품의 경우<br>화장품법에 따른<br/>식품의약품안전처<br>심사 또는 보고 유무</p></th>");
				if(detail.v_func_cosmetic != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_func_cosmetic + "</td>");
				}else{
					prdLawHtml.push(" 		<td>해당없음</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>사용할 때 주의사항</p></th>");
				if(detail.v_caution != undefined){
					prdLawHtml.push(" 		<td>" + fnChangeBr(detail.v_caution) + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>품질보증기준</p></th>");
				prdLawHtml.push(" 		<td>본 상품에 이상이 있을 경우 공정거래위원회 고시에 따라 보상해드립니다.</td>");
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>소비자상담<br>관련 전화번호</p></th>");
				prdLawHtml.push(" 		<td>080-030-5454(수신자 요금부담)<br/>운영시간 : 09:00 ~ 17:00 (점심시간 제외, 12~13시) (주말, 공휴일 제외)</td>");
				prdLawHtml.push("</tr>");
			}else if(infoTypecd == "PI_002"){
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>식품의 유형</p></th>");
				if(detail.v_food_type != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_food_type + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>생산자</p></th>");
				if(detail.v_manufacture != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_manufacture + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>소재지</p></th>");
				if(detail.v_origin != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_origin + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>제조연월일, 유통기한<br/>또는 품질유지기한</p></th>");
				if(detail.v_expiration_food != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_expiration_food + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>포장단위별 용량(중량), 수량</p></th>");
				if(detail.v_capacity != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_capacity + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>원재료명 및 함량<br/>(농수산물의 원산지 표시에 관한<br/>법률에 따른 원산지 표시 포함)</p></th>");
				if(detail.v_opt_ingredient != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_opt_ingredient + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>영양성분<br/>(식품위생법에 따른 영양성분<br/>표시대상 식품에 한함)</p></th>");
				if(detail.v_info_nutri != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_info_nutri + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>유전자재조합식품 유무</p></th>");
				prdLawHtml.push(" 		<td>해당사항 없음</td>");
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>표시광고사전심의필 유무 및<br/>부작용 발생 가능성</p></th>");
				if(detail.v_side_effect != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_side_effect + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>수입식품 여부</p></th>");
				prdLawHtml.push(" 		<td>해당사항 없음</td>");
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>소비자상담<br>관련 전화번호</p></th>");
				prdLawHtml.push(" 		<td>080-030-5454(수신자 요금부담)<br/> 운영시간 : 09:00 ~ 17:00 (점심시간 제외, 12~13시) (주말, 공휴일 제외)</td>");
				prdLawHtml.push("</tr>");
			}else if(infoTypecd == "PI_003"){
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>식품의 유형</p></th>");
				prdLawHtml.push(" 		<td>건강기능식품</td>");
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>생산자</p></th>");
				if(detail.v_manufacture != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_manufacture + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>소재지</p></th>");
				if(detail.v_origin != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_origin + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>제조연월일, 유통기한<br/>또는 품질유지기한</p></th>");
				if(detail.v_expiration_food != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_expiration_food + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>포장단위별 용량(중량), 수량</p></th>");
				if(detail.v_capacity != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_capacity + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>원재료명 및 함량<br/>(농수산물의 원산지 표시에 관한<br/>법률에 따른 원산지 표시 포함)</p></th>");
				if(detail.v_opt_ingredient != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_opt_ingredient + "</td>");
				}else{
					prdLawHtml.push("		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>영양정보</p></th>");
				if(detail.v_info_nutri != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_info_nutri + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>기능정보</p></th>");
				if(detail.v_info_func != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_info_func +"</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>섭취량, 섭취방법 및 섭취시<br/>주의사항 및 부작용 가능성</p></th>");
				if(detail.v_ingetion_info != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_ingetion_info + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>질병의 예방 및 치료를 위한<br/>의약품이 아니라는 내용의 표현</p></th>");
				prdLawHtml.push(" 		<td>본 제품은 질병의 예방 및 치료를 위한 의약품이 아닙니다.</td>");
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>유전자재조합식품 유무</p></th>");
				prdLawHtml.push(" 		<td>해당사항 없음</td>");
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>표시광고 사전심의 유무</p></th>");
				if(detail.v_flag_ad_conf != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_flag_ad_conf + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>수입식품 여부</p></th>");
				prdLawHtml.push(" 		<td>해당사항 없음</td>");
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>소비자상담<br>관련 전화번호</p></th>");
				prdLawHtml.push(" 		<td>080-030-5454(수신자 요금부담)<br/>운영시간 : 09:00 ~ 17:00 (점심시간 제외, 12~13시) (주말, 공휴일 제외)</td>");
				prdLawHtml.push("</tr>");
			}else if(infoTypecd == "PI_004"){
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>품명 및 모델명</p></th>");
				if(detail.v_modelnm){
					prdLawHtml.push(" 		<td>" + detail.v_modelnm + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>KC 인증 필 유무</p></th>");
				if(detail.v_flag_kc != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_flag_kc + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>정격전압, 소비전력</p></th>");
				if(detail.v_voltage != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_voltage + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>동일모델의 출시년월</p></th>");
				if(detail.v_release_dtm != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_release_dtm + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>제조자</p></th>");
				if(detail.v_manufacture != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_manufacture + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>제조국</p></th>");
				if(detail.v_origin != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_origin + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>크기, 무게</p></th>");
				if(detail.v_size_info != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_size_info + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>주요사양</p></th>");
				if(detail.v_info_micro != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_info_micro + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
				prdLawHtml.push("		<th scope='row'><p>품질보증기준</p></th>");
				prdLawHtml.push(" 		<td>본 상품에 이상이 있을 경우 공정거래위원회 고시에 따라 보상해드립니다.</td>");
				prdLawHtml.push("</tr>");
				prdLawHtml.push("<tr>");
				prdLawHtml.push("		<th scope='row'><p>A/S 책임자와 전화번호</p></th>");
				if(detail.v_as_connect != undefined){
					prdLawHtml.push(" 		<td>" + detail.v_as_connect + "</td>");
				}else{
					prdLawHtml.push(" 		<td>제품 상세설명 참고</td>");
				}
				prdLawHtml.push("</tr>");
			}else{
				prdLawHtml.push("<tr><td colspan='2'>아직 상품정보고시를 입력하지 않았습니다.</td></tr>")
			}
			
			$(".productAddLawInfo").html(prdLawHtml.join(""));
		},
		/**
		 * 구매후기, 포토리뷰 글 목록 가져오는 ajax
		 */
		getReviewList : function() {
			var typecd = $("input[name='i_sTypecd']").val();
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_review_ajax.do",
				type : "POST",
				dataType : "json",
				data : {
					i_sProductcd : $("input[name='i_sProductcd']").val()
					, i_sTypecd : typecd
					, i_iNowPageNo : $("#i_iNowPageNo_"+typecd).val()
				},
				animation : false,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						var page = data.object.textReview.page;
						var list = data.object.textReview.list;
						var reqVo = data.object.textReview.reqVo;
						
						var imglist = data.object.textReview.imglist;
						
						var flag = $("input[name='i_sTypecd']").val();
						
						if(flag == "0004") {
							$("#i_sFlagTextLoad").val("Y");
						} else if(flag == "0001") {
							$("#i_sFlagPhotoLoad").val("Y");
						}
						
						MobileShopProductDetail.fn.setReviewList(page, list, imglist, flag , reqVo);
					}
				}
			});
		},
		/**
		 * 구매후기, 포토리뷰 글 목록 html 그려줌
		 */
		setReviewList : function(page, list, imglist, flag, reqVo) {
			
			if(flag == "0004") {
				
				var arrHtml = [];
				if(list != undefined && list.length > 0) {
					var userid = reqVo.s_userid;
					$("#i_iNowPageNo_"+flag).val(page.i_iNowPageNo);
					
					for(var i = 0; i < list.length; i++) {
						arrHtml.push("<div class=\"reviewBox div_textReviewBox\">");
						if(list[i].v_rv_typecd == "DC_T002") {
							arrHtml.push("	<span class=\"ico_flag f1\">뷰티 테스터</span>");
						} else if(list[i].v_rv_typecd == "DC_T003") {
							arrHtml.push("	<span class=\"ico_flag f2\">리본박스</span>");
						}
						
						arrHtml.push("<div class=\"userInfoArea\">");
						
						arrHtml.push("	<div class=\"photoZ\"><img src=\""+list[i].v_proimag_url+"\" alt=\"프로필이미지\" onerror=\"fnNoImageUser(this);\"></div>");
						
						arrHtml.push("	<div class=\"userInfoZ\">");
						arrHtml.push("		<div class=\"name\">");
						arrHtml.push("			<p>");
						if(list[i].v_nickname != undefined && list[i].v_nickname != "") {
							arrHtml.push("			<span class=\"nm\">"+list[i].v_nickname+"</span>");
						} else {
							arrHtml.push("			<span class=\"nm\">"+getStringReverseHidden(list[i].v_userid, 3)+"</span>");
						}
						
						if(parseInt(list[i].n_bprofile) > 0 ) {
							arrHtml.push("				<a href=\"#\" class=\"btn_beautyProfile\" id=\""+list[i].v_userid+"\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_beautyProfile.png\" alt=\"뷰티프로파일\"/></a>");
						}
						
						arrHtml.push("			</p>");
						arrHtml.push("		</div>");
						arrHtml.push("		<div class=\"gradeZone\">");
						arrHtml.push("			<span class=\"ico_memberLevel m"+list[i].n_levelno+"\">"+list[i].v_levelnm+"</span>");
						arrHtml.push("			<span class=\"ico_communityLevel c"+list[i].n_cmt_levelno+"\">"+list[i].v_cmt_levelnm+"</span>");
						arrHtml.push("		</div>");
						arrHtml.push("	</div>");
						arrHtml.push("</div>");
					if(list[i].v_flag_best == "Y") {
						arrHtml.push("	<div class=\"bestArea\">");
						arrHtml.push("		<span class=\"ico_best\">best</span>");
						arrHtml.push("	</div>");    
					}
					if(list[i].v_reg_channel =="MOBILE" || list[i].v_reg_channel =="APP"){
						arrHtml.push("	<span class=\"sp_ico i1\" style=\"float:left; margin-top:8px;\">모바일</span>");
					}
						arrHtml.push("	<p class=\"cont\">"+removeHTMLTag(list[i].v_content)+"</p>");
						if(parseInt(list[i].n_option_cnt) > 1) {
							var optionnm = list[i].v_optionnm == undefined ? "" : list[i].v_optionnm.replace(/!!/gi, ", ");
							arrHtml.push("		<p class=\"optionName\">"+optionnm+"</p>");
						}
						arrHtml.push("	<div class=\"evaluZone\">");
						arrHtml.push("		<span class=\"gradeType grade0"+list[i].n_recom_point+"\"><span class=\"hide\">"+list[i].n_recom_point+"</span></span>");
					 if(userid != list[i].v_userid){
				        	arrHtml.push("	<a href=\"#\" id=\""+list[i].v_reviewcd+"\" class=\"btn_con_report\"><span>신고</span></a>");
				        }else{
				        	arrHtml.push("	<a href=\"#\" id=\""+list[i].v_reviewcd+"\" class=\"btn_modify btn_text_modify\">수정</a>");
				            arrHtml.push("	<span class=\"term\"></span>");
				            arrHtml.push("	<a href=\"#\" id=\""+list[i].v_reviewcd+"\" class=\"btn_delete btn_review_delete\">삭제</a>");
				        }            
						arrHtml.push("		<div class=\"flagArea\">");
					if(list[i].v_flag_prebuy == "Y") {
						arrHtml.push("			<span class=\"ico_flag f5\">재구매했어요</span>");
					}
					if(list[i].v_flag_rebuy == "Y") {
						arrHtml.push("			<span class=\"ico_flag f4\">재구매할거에요</span>");
					}
					
						arrHtml.push("		</div>");
						arrHtml.push("	</div>");
						arrHtml.push("	<div class=\"bottom\">");
						arrHtml.push("		<p class=\"date\">"+changeBeforeDate(list[i].v_reg_dtm)+"</p>");
						arrHtml.push("		<p class=\"help\">");    

					var btnNm = "";
					if(parseInt(list[i].n_user_vote) > 0) {
						btnNm = "취소";
					} else {
						btnNm = "네";
					}
						arrHtml.push("			도움이 되었나요?(<span class=\"span_voteCnt\">"+list[i].n_vote_total+"</span>) : <a href=\"#\" class=\"btn_vote\" id=\""+list[i].v_reviewcd+"/text\">"+btnNm+"</a>");
						arrHtml.push("		</p>");
						arrHtml.push("	</div>");
						arrHtml.push("</div>");
					}
					
				} else {
					arrHtml.push("<div class=\"nodata\">");
					arrHtml.push("	<p class=\"sp_bg s5\">등록된 구매후기가 없습니다.</p>");
					arrHtml.push("</div>");
				}
				
				if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
					$(".btn_text_more").hide();
				} else {
					$(".btn_text_more").show();
				}
				
				if(1 == page.i_iNowPageNo) {
					$(".div_textReviewArea").html(arrHtml.join(""));
				} else {
					$(".div_textReviewArea").append(arrHtml.join(""));
				}
				
				
			} else if(flag == "0001") {
				var arrHtml = [];
				
				if(list != undefined && list.length > 0) {
					for(var i = 0; i< list.length; i++) {
						
						var clob = list[i].v_clob;
						var remove_html = "";
						
						if(clob != undefined && clob != "") {
							remove_html = clob.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "").replace(/\[image#(.*?)\]/g, "");
						}
						
						arrHtml.push("<div class=\"photoReviewBox div_photoReviewBox\">");
						arrHtml.push("	<div class=\"userInfoArea\">");
						arrHtml.push("	<div class=\"photoZ\"><img src=\""+list[i].v_proimag_url+"\" alt=\"프로필이미지\" onerror=\"fnNoImageUser(this);\"></div>");
						arrHtml.push("		<div class=\"userInfoZ\">");
						arrHtml.push("			<div class=\"name\">");
						arrHtml.push("				<p>");
						if(list[i].v_nickname != undefined && list[i].v_nickname != "") {
							arrHtml.push("			<span class=\"nm\">"+list[i].v_nickname+"</span>");
						} else {
							arrHtml.push("			<span class=\"nm\">"+getStringReverseHidden(list[i].v_userid, 3)+"</span>");
						}
						if(parseInt(list[i].n_bprofile) > 0 ) {
							arrHtml.push("				<a href=\"#\" class=\"btn_beautyProfile\" id=\""+list[i].v_userid+"\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_beautyProfile.png\" alt=\"뷰티프로파일\"/></a>");
						}
						arrHtml.push("				</p>");
						arrHtml.push("			</div>");
						arrHtml.push("			<div class=\"gradeZone\">");
						arrHtml.push("				<span class=\"ico_memberLevel m"+list[i].n_levelno+"\">"+list[i].v_levelnm+"</span>");
						arrHtml.push("				<span class=\"ico_communityLevel c"+list[i].n_cmt_levelno+"\">"+list[i].v_cmt_levelnm+"</span>");
						arrHtml.push("			</div>");
						arrHtml.push("		</div>");
						arrHtml.push("	</div>");
					if(list[i].v_rv_typecd == "DC_T002") {
						arrHtml.push("	<span class=\"ico_flag f1\">뷰티 테스터</span>");
					} else if(list[i].v_rv_typecd == "DC_T003") {
						arrHtml.push("	<span class=\"ico_flag f2\">리본박스</span>");
					}
					
					if(list[i].v_flag_best == "Y") {
						/*arrHtml.push("		<span class=\"ico_topReview\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_topReview.png\"/></span>");*/
						arrHtml.push("	<div class=\"bestArea\">");
						arrHtml.push("		<span class=\"ico_best\">best</span>");
						arrHtml.push("	</div>");
					}
						arrHtml.push("	<p class=\"subject\">");
						if(list[i].v_reg_channel == "MOBILE" || list[i].v_reg_channel == "APP"){
							arrHtml.push("	<span class=\"sp_ico i1\" style=\"float:left; margin-top:4px;\">모바일</span>");
						}
						arrHtml.push("		<a href=\"#\" id=\""+list[i].v_reviewcd+"\" class=\"btn_review_detail\" onClick=\"trackClicksMall('후기','모바일 상품상세^포토리뷰 리스트','포토리뷰','event5, event26',true,'포토리뷰');\">"+list[i].v_title+"</a>");
						arrHtml.push("	</p>");
						arrHtml.push("	<p class=\"cont\"><a href=\"#\" id=\""+list[i].v_reviewcd+"\" class=\"btn_review_detail\"  onClick=\"trackClicksMall('후기','모바일 상품상세^포토리뷰 리스트','포토리뷰','event5, event26',true,'포토리뷰');\">"+getByteString(remove_html, 50)+"</a></p>");
						arrHtml.push("	<div class=\"photoZone\">");
						arrHtml.push("		<ul>");
						
						if(imglist != undefined && imglist.length > 0) {
							var cnt = 0;
							
							for(var j=0; j<imglist.length; j++) {
								if(imglist[j].v_recordid == list[i].v_reviewcd) {
									++cnt;
									if(cnt <= 4) {
										if(parseInt(list[i].n_photo_cnt) > 4 && cnt == 4) {
											arrHtml.push("			<li>");
											arrHtml.push("				<div class=\"moreCountZone\">");
											arrHtml.push("					<img src=\""+imglist[j].v_image_path+"\" alt=\"\" />");
											arrHtml.push("					<span class=\"moreCount\">"+parseInt(list[i].n_photo_cnt-4)+"</span> ");
											arrHtml.push("				</div>");
											arrHtml.push("			</li>");
										} else {
											arrHtml.push("			<li><img src=\""+imglist[j].v_image_path+"\" alt=\"\" /></li>");
										}
									}
								}
							}
						}
						
						arrHtml.push("		</ul>");
						arrHtml.push("	</div>");
						arrHtml.push("	<div class=\"countBundle\" style=\"margin-bottom: -24px\">");
						arrHtml.push("		<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+SetNumComma(list[i].n_reply_cnt)+"</em></span>");
						arrHtml.push("		<a href=\"#\" class=\"btn_vote\" id=\""+list[i].v_reviewcd+"/photo\" onClick=\"trackClicksMall('평점','모바일 상품상세^포토리뷰^추천하기','상품상세^포토리뷰^추천하기','event5',true,'추천하기');\"><span class=\"ico_like\"><span class=\"hide\">좋아요</span><em><span class=\"span_voteCnt\">"+SetNumComma(list[i].n_vote_total)+"</span></em></span></a>");
						arrHtml.push("	</div>");
						arrHtml.push("	<p class=\"date\">"+changeBeforeDate(list[i].v_reg_dtm)+"</p>");
						arrHtml.push("</div>");
					}
				} else {
					arrHtml.push("<div class=\"nodata\">");
					arrHtml.push("	<p class=\"sp_bg s5\">등록된 포토리뷰가 없습니다.</p>");
					arrHtml.push("</div>");
				}
				
				if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
					$(".btn_photo_more").hide();
				} else {
					$(".btn_photo_more").show();
				}
				
				if(1 == page.i_iNowPageNo) {
					$(".div_photoReviewArea").html(arrHtml.join(""));
				} else {
					$(".div_photoReviewArea").append(arrHtml.join(""));
				}
			}
			
			MobileShopProductDetail.fn.addBtnEvent();
		},

		/**
		 * 리뷰 추천
		 */
		/*updateVoteCnt : function(reviewcd, idx, type) {
			if(!IS_LOGIN) {
				showConfirmBox({
					message : "로그인 하시면 서비스 이용이 가능하세요!"
					, ok_func : function() {
						var returnUrl = "/mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$("input[name='i_sProductcd']").val();
						MobileBodyStart.goLogin(returnUrl);
					}
				});
			} else {
				MobileCommon.ajax({
					url : "/mobile/shop/mobile_shop_review_vote_save.do"
					, type : "POST"
					, data : {
						i_sReviewcd : reviewcd
						, i_sType : type
					}
					, dataType : "json"
					, animation : false
					, async : false
					, success : function(data, textStatus) {
						if(data.status == "succ") {
							showMessageBox({
								message : "추천되었습니다."
								, close : function() {
									var preCnt = parseInt(SetNum($(".span_voteCnt").eq(idx).text()));
									
									$(".span_voteCnt").eq(idx).text(SetNumComma(preCnt+1));
								}
							});
							
						} else if(data.status == "isNotLogin") {
							showConfirmBox({
								message : "로그인 하시면 서비스 이용이 가능하세요!"
								, ok_func : function() {
									var returnUrl = "/mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$("input[name='i_sProductcd']").val();
									MobileBodyStart.goLogin(returnUrl);
								}
							});
						}
						else {
							showMessageBox({
								message : data.message
							});
						}
					}
				});
			}
		}, */
		getParameter : function() {
			var parameter = {
				"i_sProductcd" : $("#i_sProductcd").val()
				, "i_sDeviceNum" : $("#i_sDeviceNum").val()
			};
			
			return parameter;
		}
		, balloonLike : function(flag) {
			var target = "";
			if(flag == "like") {
				target = "#balloonLike";
			} else {
				target = "#balloonLikeOff";
			}
			
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
		    setTimeout(function(){$(target).addClass('active');},800);
		    setTimeout(function(){$(target).removeClass('active').hide();},1200);
		}
		, setDeliveryPrice : function(isPayStats) {
			var isDeliveryToday = false;
			var isDeliveryFree = false;
			var delivery_price = 0;
			
			if($(".delivery_typecd").text() == "0002") {
				isDeliveryToday = true;
			}
			
			var cash_buy_limit = parseInt($(".cash_buy_limit").text());
			var point_buy_limit = parseInt($(".point_buy_limit").text());
			var cash_today_limit = parseInt($(".cash_today_limit").text());
			var point_today_limit = parseInt($(".point_today_limit").text());
			var sum_price = parseInt(SetNum($(".dd_totalPrice>em").text()));
			
			if(cash_buy_limit > 0 || point_buy_limit > 0 || cash_today_limit > 0 || point_today_limit > 0) {
				if(isDeliveryToday && cash_today_limit > 0 && cash_today_limit <= sum_price) {
					isDeliveryFree = true;
				} else if(cash_buy_limit > 0 && cash_buy_limit <= sum_price) {
					isDeliveryFree = true;
				}
				if($(".feature_tag").text() != undefined && $(".feature_tag").text() != "" && $(".feature_tag").text().indexOf("DG_P014")>-1){
					if(point_buy_limit > 0 && point_buy_limit <= sum_price) {
						isDeliveryFree = true;
					}else{
						isDeliveryFree = false;
					}
				}
			}
			
			if(!isDeliveryFree) {
				if(isDeliveryToday && sum_price > 0) {
					delivery_price = $(".cash_today").text();
				} else if(!isDeliveryToday && sum_price > 0) {
					delivery_price = $(".cash_buy").text();
				}
			}
			if(delivery_price == 0) {
				$(".dd_delivery").text("무료");
			} else {
				$(".dd_delivery").text(SetNumComma(delivery_price)+"원");
			}
			$(".dt_delivery").show();
			$(".dd_delivery").show();
		}
		, setDisplay : function() {
			if (MobileShopProductDetail.val.v_dis_type == "B") {
				$(".saleInfo_m_ty01").animate({
					marginLeft: 0
				}, 3000);
				setTimeout(function(){
					$(".saleInfo_m_ty01").fadeOut();
				}, 5000);
			}
			else {
				$(".popup_m_saleInfo").fadeIn(500);
				var infoImg_h = $(".infoImg").height();
				$(".popup_m_saleInfo").css("margin-top", -infoImg_h/2);
				setTimeout(function(){
					$(".popup_m_saleInfo").fadeOut();
				}, 5000);
				$(".btn_m_saleInfo_close").click(function(){
					$(this).parents(".popup_m_saleInfo").fadeOut(500);
				});
			}
		}
	}
};
/**
 * 스타일
 */
var MobileReviewCommStyle = {
		init : function() {
			var Link = $.noUiSlider.Link;
	        $('#gradeSlider').noUiSlider({
	            start: [ 0 ],
	            step: 1,
	            range: {
	                'min': [  0 ],
	                'max': [ 5 ]
	            },
	            serialization: {
	                lower: [
	                    new Link({
	                        target: $("#gradeSlider"),
	                        method: MobileReviewCommStyle.handleSliderValue
	                    })
	                ]
	            }
	        });
		},
		handleSliderValue : function(value) {
			var val = parseInt(value);
	        $('.noUi-target').eq(0).removeClass('grade-00 grade-01 grade-02 grade-03 grade-04 grade-05');
	        $('.noUi-target').eq(0).addClass('grade-0'+ val);
	        $('.radio-a').find('input#range0'+ val).click();
		}
};
var MobileProductDetailStyle = {
	name : "MobileProductDetailStyle",
	init : function() {
		$(window).scroll(function(){
            var position = $(this).scrollTop() ;
            position = position / 3.2;

            $(".scnum").text(position);
            if ( position > 0 && position < 100) {
            	$("#prodInfo .brandNm").css("-webkit-transform", "translateY(" + position + "px)");
                $("#prodInfo .prodNm").css("-webkit-transform", "translateY(" + position + "px)");
                $("#prodInfo .onedesc").css("-webkit-transform", "translateY(" + position + "px)");  
                $("#prodInfo .txt").css("-webkit-transform", "translateY(" + position + "px)");  
                $("#prodInfo .priceZone").css("-webkit-transform", "translateY(" + position + "px)");   
                //$("#prodInfo .ico_label2").css("-webkit-transform", "translateY(" + position + "px)");  
            } else if ( position == 0) {
            	$("#prodInfo .brandNm").css("-webkit-transform", "translateY(0px)");
                $("#prodInfo .prodNm").css("-webkit-transform", "translateY(0px)");
                $("#prodInfo .onedesc").css("-webkit-transform", "translateY(0px)");  
                $("#prodInfo .txt").css("-webkit-transform", "translateY(0px)");  
                $("#prodInfo .priceZone").css("-webkit-transform", "translateY(0px)");   
                //$("#prodInfo .ico_label2").css("-webkit-transform", "translateY(0px)"); 
            }
        });
		window.prodVisualSwipe = new Swipe(document.getElementById('prodVisualSwipe'), {
            continuous: true,
            stopPropagation: true,
            callback: function(event, element) {
            	var idx = setNaviIndex($(".prodVisual-nav > span"), event);
				
				$(".prodVisual-nav > span").removeClass().eq(idx).addClass("active");
            }
        });
		
		window.hotitemProdSwipe = new Swipe(document.getElementById('hotitemProdSwipe'), {
			continuous: true,
			stopPropagation: true,
			callback: function(event, element) {
				var idx = setNaviIndex($(".hotitemProd-nav > span"), event);
				
				$(".hotitemProd-nav > span").removeClass().eq(idx).addClass("active");
			}
		});
		
		window.recommendProdSwipe2 = new Swipe(document.getElementById('recommendProdSwipe2'), {
			continuous: true,
			stopPropagation: true,
			callback: function(event, element) {
				
				var idx = setNaviIndex($(".recommendProd-nav2 > span"), event);
				
				$(".recommendProd-nav2 > span").removeClass().eq(idx).addClass("active");
			}
		});
		window.recommendProdSwipe = new Swipe(document.getElementById('recommendProdSwipe'), {
			continuous: true,
			stopPropagation: true,
			callback: function(event, element) {
				
				var idx = setNaviIndex($(".recommendProd-nav > span"), event);
				
				$(".recommendProd-nav > span").removeClass().eq(idx).addClass("active");
			}
		});
		window.freeGiftProdSwipe = new Swipe(document.getElementById('freeGiftProdSwipe'), {
			continuous: true,
			stopPropagation: true,
			callback: function(event, element) {
				
				var idx = setNaviIndex($(".freeGiftProd-nav > span"), event);
				
				$(".freeGiftProd-nav > span").removeClass().eq(idx).addClass("active");
			}
		});
		window.setProdSwipe = new Swipe(document.getElementById('setProdSwipe'), {
             continuous: true,
             stopPropagation: true,
             callback: function(event, element) {
            	 var idx = setNaviIndex($(".setProd-nav > span"), event);
            	 
                 $(".setProd-nav > span").removeClass().eq(idx).addClass("active");
             }
         });
		//장바구니 구매 하단 버튼 스크롤
//		$(window).scroll(function(){
//			var position = $(this).scrollTop() ;
//			var btnShoppingTop = $(".btn_shoppingArea").offset().top;
//			if ( position > 0 && position > btnShoppingTop) {
//				$(".btn_shoppingAreaBottom").addClass("in");
//				//$(".topBtn").css("bottom","70px");
//			} else if ( position < btnShoppingTop) {
//				$(".btn_shoppingAreaBottom").removeClass("in");
//			}
//		});
		$.mvURL = function(data) {
            mvUrl = (
                    '<iframe class="remove" src="http://www.youtube-nocookie.com/embed/'+data+'?wmode=transparent&wmode=opaque" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
            );
        };
       //brand swipe
       window.brandGallerySwipe = new Swipe(document.getElementById('brandGallerySwipe'), {
           continuous: true,
           stopPropagation: true,
           callback: function(event, element) {
               $(".brandGallery-nav > span").removeClass().eq(event).addClass("active");
               $(".videoFrm").remove();
           }
       });
       $(".brandGallery-wrap > div > a").click(function(){
           var data = $(this).attr('data-src');
           var target = $(this).parent();
           $.mvURL(data);
           $("<div class='videoFrm'>"+ mvUrl +"</div>").clone().prependTo(target);
           return false;
       });
       $(".btnPrev").click(function(){
           brandGallerySwipe.prev();
           return false;
       });
       $(".btnNext").click(function(){
           brandGallerySwipe.next();
           return false;
       });
       
	}
};
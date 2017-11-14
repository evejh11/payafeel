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
			$(".btn_add_cart").css("cursor", "not-allowed");
			$(".btn_add_cart").addClass("btn_add_cart_not").removeClass("btn_add_cart");
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
			
			// 뷰티 포인트로 교환 버튼
			$(".btn_btpoint").unbind("click").click(function(event){
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
			
			// 공유 : URL버튼
			$(".btn_url").unbind("click").click(function(event){
				event.preventDefault();
				
				modalPopupClose("#modalSns");
				modalPopup("#modalCopyUrl");
				$(".copy_txt").text("");
				$("#page_url").select();
			});
			
			// URL 복사버튼
			$(".btn_urlcopy").unbind("click").click(function(event){
				event.preventDefault();

				var clip = new Clipboard('.btn_urlcopy');
				clip.on('success', function(e) {
					$(".copy_txt").text("클립보드에 복사 되었습니다.");
				});
				clip.on('error', function(e) {
					$(".copy_txt").text("지원되지 않는 기기 입니다. 클립보드에 복사하세요.");
				});

			});
			
			// 알림박스 닫기
			$(".btn_spClose").unbind("click").click(function(event) {
				event.preventDefault();
				var idx = $(".btn_spClose").index($(this));
				$(".alimDetailBox").eq(idx).remove();
			});
			
			// 옵션 선택 
			$("#listOptScroll li").unbind("click").click(function(event) {
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
			
			$(".btn_con_report").unbind("click").click(function(event){
				event.preventDefault();

				var recordid = $(this).attr("id");
				var returnUrl = $("input[name='i_sReturnUrl']").val()+"?"+$("input[name='i_sReturnParam']").val();
				var table	= "CMC_REVIEW";

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
			
			// 상품 추천
			$(".btn_productLike").unbind("click").click(function(event){
				event.preventDefault();
				var productLikeObj = $(this);
				
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
							// 추천 활성화 클래스 추가
							var $target = productLikeObj;
							var $icon = $target.find('.i-shop');
							
							if(data.status == "succ") {
								var voteCnt = SetNum($("#span_like").text());
								
								if(data.object == "like") {
									$target.removeClass('off');
									$target.addClass('on');
									// 애니메이션 효과 클래스 부여
									$icon.addClass("rotate");
									
									$("#span_like").text(parseInt(voteCnt)+1);
								} else {
									$target.removeClass('on');
									$target.addClass('off');
									
									$("#span_like").text(parseInt(voteCnt)-1);
								}
								
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
			
			// 구매후기, 포토리뷰 추천 (도움이 되었나요?)
			$(".btn_vote").unbind("click").click(function(event) {
				event.preventDefault();
				
				var reviewcd = $(this).attr("id").split("/")[0];
				var type = $(this).attr("id").split("/")[1];
				var idx = $(".btn_vote").index($(this));
				
				updateMobileVoteCnt(reviewcd, type, idx);
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
			
			// 리뷰 뷰티 프로파일 팝업 열기
			$(".btn_beautyProfile").unbind("click").click(function(event){
				event.preventDefault();
				var id = $(this).attr("id");
				MobileBeautyProfile.fn.addPopupBtnEvent(id);
			});
			
			// 장바구니 버튼
			$(".btn_add_cart").unbind("click").click(function(event) {
				event.preventDefault();
				MobileShopProductDetail.fn.purchaseOnePlusCheck(MobileShopProductDetail.fn.addCartEvent,"cart");
			});
			
			//gypark
			try{
				
				$(".btn_add_cart").unbind("mousedown").mousedown(function(event){
					event.preventDefault();
//					var productcd = $("input[name='i_sProductcd']", "#frm");
					var productcd = $("input[name='i_sProductcd']", "#frm").val();
					var cnt = $("input[name='i_arrProductCnt']").not(":disabled");
					var sum = 0;
					for(var i = 0; i < cnt.length; i++){
						sum = sum + cnt.eq(i).val();
					}
//					AEC_F_D1(productcd,'i', '1');
				});
				
				$(".btn_purchase").unbind("mousedown").mousedown(function(event){
					event.preventDefault();
					var productcd = $("input[name='i_sProductcd']", "#frm");
					var cnt = $("input[name='i_arrProductCnt']").not(":disabled");
					var sum = 0;
					for(var i = 0; i < cnt.length; i++){
						sum = sum + cnt.eq(i).val();
					}
//					AEC_F_D(productcd, 'i', sum);
				});
				
			}catch(e){}
			
			// 구매하지 못하는 상품 안내문구
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
			
			// 구매하기
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
				
				if($(".div_textReviewBox", ".div_textReviewArea").length == 0 &&	$(".nodata", ".div_textReviewArea").length == 0) {
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
			var optioncd	= object.hotdealInfo.v_optioncd;
			list.push({
				productcd : productcd
				, optioncd : optioncd
				, cnt : 1
				, typecd : "PROD_0001"
				, flagSoloPack : 'N'
				, flagbeautyhd : 'Y'
				, beautyhotdealcd	: object.hotdealInfo.v_hotdealcd
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
		// 장바구니 버튼 동작 관리
		purchaseOnePlusCheck : function(callback,flag) {
			if(clickFlag){
				return;
			}else{
				clickFlag = true;
			}
			var productcd = $("input[name='i_sProductcd']");
			var optioncd = $("input[name='i_arrOptioncd']");
			var cnt = $("input[name='i_arrProductCnt']");
			var productnm = $("input[name='i_arrProductnm']").val();
			var brandnm = $("input[name='i_sBrandnm']").val();
			var size = optioncd.size();
			
			if(size == 0) {
				var optBox = $('#spoptsWrap');

				if(optBox.hasClass("open") == false){
					ShopOptBox.optBoxOpen('spoptsWrap', true);
				}
				clickFlag = false;
				return;
			}else if(size >= 1){
				var optBox = $('#spoptsWrap');

				if(optBox.hasClass("open") == false){
					ShopOptBox.optBoxOpen('spoptsWrap', true);
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
						, brand	: _SL_br[0]
						, category : _SL_ct[0]
						, price : Number(list_price * productCnt)
						, qty	:	productCnt
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
				
				$(".item").each(function(i) {
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
							var totalCnt	= 0;
							var optionnm	= "";
							
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
							
							prePrice	= tempList[i].optionPrice;
							
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
						
						notiToastOpen();
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
			$(".btn_omit").unbind("click").click(function(event) {
				event.preventDefault();
				
				var idx = $(".btn_omit").index($(this));
				var optioncd = $(this).attr("id").replace("omit_", "");
				
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
						
						$(".span_prdPrice>span").eq(idx).text(SetNumComma(minusPrice));
					}
					MobileShopProductDetail.fn.getTotalPrice();
					MobileShopProductDetail.fn.setBeautyPoint(MobileShopProductDetail.fn.getBeautyPoint(optioncd),"omit");
				}
				
			});
			
			$(".btn_add").unbind("click").click(function(event) {
				event.preventDefault();
				
				var idx = $(".btn_add").index($(this));
				var optioncd = $(this).attr("id").replace("add_", "");
				
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
							$(".span_prdPrice>span").eq(idx).text(SetNumComma(plusPrice));
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
							
							$(".span_prdPrice>span").eq(idx).text(SetNumComma(plusPrice));
						}
					}
					
					MobileShopProductDetail.fn.getTotalPrice();
					MobileShopProductDetail.fn.setBeautyPoint(MobileShopProductDetail.fn.getBeautyPoint(optioncd),"add");
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
			
			/**
			 * 옵션 선택 상품 삭제
			 */
			$(".btn_option_del").unbind("click").click(function(event) {
				event.preventDefault();
				
				$(this).closest(".item").remove();
				if($(".item").length == 0) {
					//$(".div_countBox").hide();
				}
				
				if($(".span_onePlusCheckYn").text() == "Y") {
					var optioninfo = $("#span_option_" + $(this).attr("id"));
					var dc_prc = $(".span_option_dc_price", optioninfo).text();
					MobileShopProductDetail.fn.setOnePlusPrice(dc_prc);
				}
				
				MobileShopProductDetail.fn.getTotalPrice();
				
				var delItem = $(this).closest(".item");
				var optioncd = delItem.attr("id").replace("div_option_", "");
				var productCnt = parseInt($("input[name='i_arrProductCnt']", delItem).val());
				var delPoint = 0;
				for(var i=0; i < productCnt; i++){
					delPoint += MobileShopProductDetail.fn.getBeautyPoint(optioncd);
				}
				MobileShopProductDetail.fn.setBeautyPoint(delPoint,"omit");
				
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
			var cnt = 0;
			
			// 금액
			$(".span_prdPrice>span").each(function() {
				sum += parseInt(SetNum($(this).text()));
			});
			// 갯수
			$("input[name='i_arrProductCnt']").each(function() {
				cnt += parseInt(SetNum($(this).val()));
			});

			$(".qty span").text(cnt);
			$(".dd_totalPrice").text(SetNumComma(sum));
			
			// 배송비
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
				$(".span_prdPrice>span").each(function(idx) {
					var sum = 0;
					for(var i=0; i<obj.length; i++) {
						if(idx == obj[i].index) {
							sum += (parseInt(obj[i].price) * obj[i].cnt);
							$(".span_prdPrice>span").eq(obj[i].index).text(SetNumComma(sum));
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
			if($("#div_option_"+optioncd).length > 0) {
				showMessageBox({
					message : "이미 선택하신 옵션이에요."
					, close : function() {
						
					}
				});
				return;
			} else {
				var otpionHtml = [];
				var optionnm = $(".span_optionnm", optioninfo).text();
				var capacity = $(".span_capacity", optioninfo).text();
				var opt_bpoint_per = parseInt($(".span_bpoint_per", optioninfo).text());
				var opt_mpoint_per = $(".span_mpoint_per", optioninfo).text();
				var salePrice = 0;
				// 선택한 옵션이 일시품절이 아니고 재고수가 0이상이며 단종 상품이 아닐 때 수량 선택 영역이 추가됨
				if(statuscd != "0002" && optStatuscd != "0002" && parseInt(stockqty) > 0 && (sapStcd != "DK_004" || optStatuscd != "0003")) {
					// 입고알리미
					$(".noti_area").hide();
					
					if((dayoffcd != undefined && dayoffcd != "" && parseInt(dayoffStockqty) > 0) || (dayoffcd == undefined || dayoffcd == "")) {
						salePrice = dc_price;
					} else {
						salePrice = originPrice;
					}
					var saleArea = + list_price != salePrice ? "<del class=\"base\"><span>"+SetNumComma(list_price)+"</span>"+unit+"</del>" : "";
					
					
					otpionHtml.push('<div class="item" id="div_option_'+optioncd+'">');
					otpionHtml.push('	<p class="prod_nm ellipsis">'+optionnm+'</p>');
					otpionHtml.push('	<div class="info">');
					otpionHtml.push('		<input type="hidden" name="i_arrOptioncd" value="'+optioncd+'"/>');
					otpionHtml.push('		<span class="hide span_one_prod_price">'+salePrice+'</span>');
					otpionHtml.push('		<div class="amount_area">');
					otpionHtml.push('			<div class="amount">');
					otpionHtml.push('				<input type="text" name="i_arrProductCnt" value="1" maxlength="3">');
					otpionHtml.push('				<button type="button" class="btn_omit" id="omit_'+optioncd+'"><i class="i-shop minus">감소</i></button>');
					otpionHtml.push('				<button type="button" class="btn_add" id="add_'+optioncd+'"><i class="i-shop plus">증가</i></button>');
					otpionHtml.push('			</div>');
					otpionHtml.push('		</div>');
					otpionHtml.push('		<div class="price_area">');
//					otpionHtml.push(			saleArea);
					otpionHtml.push('			<strong class="span_prdPrice price"><span>'+SetNumComma(salePrice)+'</span>'+unit+'</strong>');
					otpionHtml.push('		</div>');
					otpionHtml.push('	</div>');
					otpionHtml.push('	<button type="button" class="btn_del btn_option_del"><i class="i-shop del"></i></button>');
					otpionHtml.push('</div>');
					
					$(".slted_area").append(otpionHtml.join(""));
					
					// 상품 총 가격 계산
					MobileShopProductDetail.fn.getTotalPrice();
					MobileShopProductDetail.fn.setBeautyPoint(MobileShopProductDetail.fn.getBeautyPoint(optioncd),"add");
					
				// 선택한 옵션이 일시품절 이거나 재고수가 0 이고 단종 상품이 아닐 경우 입고알리미 신청 영역이 추가됨
				} else if(((statuscd == "0002" || optStatuscd == "0002" ) || (optStatuscd == "0001" && parseInt(stockqty) <= 0)) && (sapStcd != "DK_004" || optStatuscd != "0003")){
					// 입고알리미
					$(".noti_area").show();
					
					if((dayoffcd != undefined && dayoffcd != "" && parseInt(dayoffStockqty) > 0) || (dayoffcd == undefined || dayoffcd == "")) {
						salePrice = dc_price;
					} else {
						salePrice = originPrice;
					}
					var optionSoldOutHtml = [];
					
					var saleArea = + list_price != salePrice ? "<del class=\"base\"><span>"+SetNumComma(list_price)+"</span>"+unit+"</del>" : "";
					
					optionSoldOutHtml.push('<div class="item disabled" id="div_option_'+optioncd+'">');
					optionSoldOutHtml.push('	<p class="prod_nm ellipsis">'+optionnm+'</p>');
					optionSoldOutHtml.push('	<div class="info">');
					optionSoldOutHtml.push('		<div class="amount_area">');
					optionSoldOutHtml.push('			일시품절');
					optionSoldOutHtml.push('		</div>');
					optionSoldOutHtml.push('		<div class="price_area">');
//					optionSoldOutHtml.push(				saleArea);
					optionSoldOutHtml.push('			<strong class="price"><span>'+SetNumComma(salePrice)+'</span>'+unit+'</strong>');
					optionSoldOutHtml.push('		</div>');
					optionSoldOutHtml.push('	</div>');
					optionSoldOutHtml.push('	<button type="button" class="btn_del btn_option_del"><i class="i-shop del"></i></button>');
					optionSoldOutHtml.push('</div>');
					
					$(".slted_area").append(optionSoldOutHtml.join(""));
				}

				//SmartOffer - 개인화 추천 태깅 (상품상세 옵션선택)
				try{productViewOptionTagEvent(optioncd,"MOBILE");}catch(e){}
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
				if(detail.v_nickname2 != undefined && detail.v_nickname2 != "undefined"){
					$(".recomm_txt_top").show(); 
					$(".txt_recomm").text(detail.v_nickname2);
				}else{
					$(".recomm_txt_top").hide(); 
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
						$(".sec_bnnr a").attr("href",GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd=" + evtBnrInfo.v_eventcd);
						$(".sec_bnnr img").attr("src",evtBnrInfo.v_bnr_mo_img_path);
						$(".sec_bnnr img").attr("alt",evtBnrInfo.v_eventcd);
						$(".sec_bnnr").show();
					}
				}else{
					for(var i = 0 ; i < detailprdbnr.length; i++){
						if(detailprdbnr[i].v_comment1 != undefined && detailprdbnr[i].v_comment1 != 'undefined'){
							if(detailprdbnr[i].v_comment1.indexOf(detail.v_brandcd) > -1){
								$(".sec_bnnr a").attr("href",detailprdbnr[i].v_url);
								$(".sec_bnnr img").attr("src",detailprdbnr[i].v_img_path);
								$(".sec_bnnr img").attr("alt",detailprdbnr[i].v_img_path);
								$(".sec_bnnr").show();
							}
						}
					}
				}
				
//////////////////////////리뉴얼 시작////////////////////
				// 제품 이미지
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
				
				// 제품 이미지 슬라이드
				if(arrImgList.length > 0) {
					var imgHtml = "";
					
					for(var i=0; i<arrImgList.length; i++) {
						imgHtml +='<div><img src="'+arrImgList[i].path+'" alt=""></div>';
					}
					
					$(".shop_prod_item .single-item").html(imgHtml);
				}
				// 태그
				$(".srv_flag_area").html(getProductDetailTag(detail.v_feature_tag));
				// 상품 애칭
				$(".details .noti").text(detail.v_nickname);
				// 상품이름
				$("#details_nm").html(detail.v_brandnm + " " + detail.v_productnm + " " + detail.v_capacity);
				// 구매후기 별점 set
				var recomPoint = detail.n_text_recom_point;
				$(".i-grade").text(recomPoint+"점");
				$(".i-grade").addClass("grade0" + Math.round(recomPoint));
				$("#btnReview>span").text(SetNumComma(detail.n_text_cnt2));
				
				// 가격 정보
				var priceinfo = [];
				priceinfo.push("<input type=\"hidden\" name=\"i_sProductnm\" value=\""+detail.v_productnm+"\"/>");
				priceinfo.push("<input type=\"hidden\" name=\"i_arrProductnm\" value=\""+detail.v_productnm+"\"/>");
				priceinfo.push("<input type=\"hidden\" name=\"i_sBrandnm\" value=\""+detail.v_brandnm+"\"/>");
				priceinfo.push("<input type=\"hidden\" name=\"i_sFlagBeauty\" value=\""+detail.v_flag_beauty+"\"/>");
				priceinfo.push('<div class="sale_wrap">');
				if(detail.n_list_price != detail.n_price) {
					priceinfo.push('	<div class="save"><span>SAVE</span> <br>UP TO</div>');
					var salePer = 0;
					if(detail.v_dayoffcd != null && parseInt(detail.n_dayoff_stockqty) <= 0){
						salePer = Math.round((parseInt(detail.n_list_price) - parseInt(detail.n_origin_price)) * 100 / parseInt(detail.n_list_price));
					}else{
						salePer = Math.round((parseInt(detail.n_list_price) - parseInt(detail.n_price)) * 100 / parseInt(detail.n_list_price));
					}
					priceinfo.push('	<div class="sale"><span>'+salePer+'</span>%</div>');
				}
				priceinfo.push('</div>');
				priceinfo.push('<div class="prices">');
				
				// 할인 가격
				var unit = "";
				
				if (featureTag != undefined && featureTag != "" && featureTag.indexOf("DG_P014") > -1) {
					unit = "P";
				} else {
					unit = "원";
				}
				// 장바구니쪽 총금액
				$(".dd_totalPrice").html("0");
				$(".dd_totalPrice").parents("dd").append(unit);
				// 금액 정보
				if(detail.v_flag_beauty == "Y"){
					priceinfo.push('		<strong class="price point"><span>'+SetNumComma(detail.n_price)+'</span>P</strong>');
				}else{
					if(detail.v_dayoffcd != null && parseInt(detail.n_dayoff_stockqty) <= 0){
						priceinfo.push('		<strong class="price"><span>'+SetNumComma(detail.n_origin_price)+'</span>원</strong>');
					}else{
						if(detail.n_list_price > detail.n_price){
							priceinfo.push('		<del class="base"><span>'+SetNumComma(detail.n_list_price)+'</span>원</del>');
							priceinfo.push('		<strong class="price"><span>'+SetNumComma(detail.n_price)+'</span>원</strong>');
						}else{
							priceinfo.push('		<strong class="price"><span>'+SetNumComma(detail.n_price)+'</span>원</strong>');
						}
					}
				}
				
				// 등급별 텍스트
				var saleNm = "";
				if(levelcd == "LV12" && parseInt(detail.n_list_price) > parseInt(detail.n_price)) {
					if(detail.v_dayoffcd != undefined && detail.v_dayoffcd != "") {
						saleNm = "할인가";
					} else {
						saleNm = "VIP할인가";
					}
				} else if(levelcd == "LV13" && parseInt(detail.n_list_price) > parseInt(detail.n_price)){
					if(detail.v_dayoffcd != undefined && detail.v_dayoffcd != "") {
						saleNm = "할인가";
					} else {
						saleNm = "VVIP할인가";
					}
				} else if (parseInt(detail.n_list_price) > parseInt(detail.n_price)) {
					if(detail.v_dayoffcd != undefined && detail.v_dayoffcd != "") {
						saleNm = "투데이찬스가";
					} else {
						saleNm = "할인가";
					}
				}
				priceinfo.push('	<span class="txt">'+saleNm+'</span>');
				priceinfo.push('</div>');
				$(".price_wrap .price_area").html(priceinfo.join(""));
				
				var salePrice = 0;
				if((featureTag != undefined && featureTag != "" && featureTag.indexOf("DG_P015") > -1 && parseInt(detail.n_dayoff_stockqty) > 0) || featureTag.indexOf("DG_P015") == -1 ) {
					salePrice = detail.n_price;
				} else {
					salePrice = detail.n_origin_price;
				}
				
				//컬러 옵션
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
					
					var soldoutClass = "";
					var soldout = "";
					var soldoutCnt = 0;
					
					for(var i=0; i<option.length; i++) {
						if(detail.v_statuscd == "0002" || detail.v_statuscd == "0003" || parseInt(option[i].n_stockqty) <= 0 || option[i].v_opt_statuscd == "0002") {
							soldoutClass = "disabled";
							soldout = "[일시품절]";
							soldoutCnt++;
						} else {
							soldoutClass = "";
							soldout = "";
						}
						
						var dayoffcd = option[i].v_dayoffcd == "" || option[i].v_dayoffcd == undefined ? '' : option[i].v_dayoffcd;
						
						// 옵션 그리기
						optionhtml.push('<li class="'+soldoutClass+'" id="'+option[i].v_optioncd+'">');
						optionhtml.push('	<a href="#none" onclick="ShopOptBox.$baseBox.addClass(\'open\');ShopOptBox.$optBox.removeClass(\'open trans300ms\');">');
						optionhtml.push('		<div class="opt_nm">' + option[i].v_optionnm + soldout + '</div>');
						optionhtml.push('		<div class="price_area">');
						
						if (option[i].n_list_price != option[i].n_price){
							optionhtml.push('		<del class="base"><span>'+SetNumComma(option[i].n_list_price)+'</span>원</del>');
						}
					
						if(detail.v_dayoffcd != null && parseInt(detail.n_dayoff_stockqty) <= 0){
							optionhtml.push('		<strong class="price"><span>'+SetNumComma(option[i].n_origin_price)+'</span>원</strong>');
						}else{
							optionhtml.push('		<strong class="price"><span>'+SetNumComma(option[i].n_price)+'</span>원</strong>');
						}
						
						optionhtml.push('		</div>');
						optionhtml.push('	</a>');
						optionhtml.push('</li>');
						
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
							spanhtml.push("	<span class=\"span_cushion_option cusion_"+cushionList[j].v_optioncd+"\">"+cushionList[j].v_optioncd+"</span>");
						}
						spanhtml.push("</span>");
						
						// 전성분
						var ingredient = option[i].v_opt_ingredient == undefined ? "아직 등록된 전성분 정보가 없습니다." : option[i].v_opt_ingredient;
						
						ingredientHtml.push('<li>');
						if(detail.v_brandnm != undefined && detail.v_brandnm != "") {
							ingredientHtml.push('	<div class="brand_nm">'+detail.v_brandnm+'</div>');
						}
						ingredientHtml.push('	<div class="prod_nm">'+detail.v_productnm+'</div>');
						ingredientHtml.push('	<div class="opt_nm">'+option[i].v_optionnm+'</div>');
						ingredientHtml.push('	<div class="cont">'+ingredient+'</div>');
						ingredientHtml.push('</li>');
						
						// 옵션 이미지 있을 경우에 이미지 배열에 push
						if(option[i].v_opt_thumbnail != undefined && option[i].v_opt_thumbnail != "") {
							arrImgList.push({path : option[i].v_opt_thumbnail, optioncd : option[i].v_optioncd});
						}
						
						if(option[i].v_tile_path != undefined && option[i].v_title_path != "") {
							colorHtml.push("<li class='opt_color " + (detail.v_flag_billing_prod == 'N' ? 'li_color' : '') + "' id=\""+option[i].v_optioncd+"\">");
							colorHtml.push("	<a href=\"javascript:;\"><img src=\""+option[i].v_tile_path+"\" /></a>");
							colorHtml.push("</li>");
						} else {
							if(option[i].v_opt_rgb != undefined && option[i].v_opt_rgb != "") {
								var arrRgb = option[i].v_opt_rgb.split(",");
								colorHtml.push("<li class='opt_color " + (detail.v_flag_billing_prod == 'N' ? 'li_color' : '') + "' id=\""+option[i].v_optioncd+"\"><a href=\"javascript:;\">");
								for(var r=0; r<arrRgb.length; r++) {
									colorHtml.push("	<i class=\"color\" style=\"background:#"+arrRgb[r]+"\"></i>");
								}
								colorHtml.push("</a></li>");	
							}else{
								colorHtml.push("<li class='opt_text " + (detail.v_flag_billing_prod == 'N' ? 'li_color' : '') + "' id=\""+option[i].v_optioncd+"\">");
								colorHtml.push("	<a href=\"javascript:;\"><span class=\"txt\">"+option[i].v_optionnm+"</span></a>");
								colorHtml.push("</li>");
							}
						}
					}
					
					// 옵션 selec영역에 push
					$("#listOptScroll .list").html(optionhtml.join(""));
					// 전성분 영역에 push
					$(".ingredientList").html(ingredientHtml.join(""));
					// 옵션 selec영역에 push
					$("#listOptScroll").append(spanhtml.join(""));
					// 상위 컬러 옵션
					$(".opts_wrap .list_opts").append(colorHtml.join(""));
					
					//옵션을 선택하지 않은채로 출력되므로 총 주문 금액 0으로 set
					$(".dd_totalPrice").text(0);

				} else {
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
					}
					
					$(".div_todaydeli").html(noticeHtml.join(""));
					
					// 옵션 없는 제품일 경우 메이크업 정보 처음부터 그려줌
					if((detail.v_opt_statuscd != "0002" && detail.v_statuscd != "0002" && (detail.v_statuscd == "0001" && parseInt(detail.n_stockqty) > 0))) {
						var otpionHtml = [];
						var saleArea = + detail.n_list_price != salePrice ? "<del class=\"base\"><span>"+SetNumComma(detail.n_list_price)+"</span>"+unit+"</del>" : "";
						
						// 상품 수량 영역 그려줌
						otpionHtml.push('<div class="item" id="div_option_'+detail.v_optioncd+'">');
						otpionHtml.push('	<p class="prod_nm ellipsis">'+detail.v_productnm+'</p>');
						otpionHtml.push('	<div class="info">');
						otpionHtml.push('		<input type="hidden" name="i_arrOptioncd" value="'+detail.v_optioncd+'"/>');
						otpionHtml.push('		<span class="hide span_one_prod_price">'+salePrice+'</span>');
						otpionHtml.push('		<div class="amount_area">');
						otpionHtml.push('			<div class="amount">');
						otpionHtml.push('				<input type="text" name="i_arrProductCnt" value="1" maxlength="3">');
						otpionHtml.push('				<button type="button" class="btn_omit" id="omit_'+detail.v_optioncd+'"><i class="i-shop minus">감소</i></button>');
						otpionHtml.push('				<button type="button" class="btn_add" id="add_'+detail.v_optioncd+'"><i class="i-shop plus">증가</i></button>');
						otpionHtml.push('			</div>');
						otpionHtml.push('		</div>');
						otpionHtml.push('		<div class="price_area">');
						otpionHtml.push(			saleArea);
						otpionHtml.push('			<strong class="span_prdPrice price"><span>'+SetNumComma(salePrice)+'</span>'+unit+'</strong>');
						otpionHtml.push('		</div>');
						otpionHtml.push('	</div>');
//						otpionHtml.push('	<button type="button" class="btn_del btn_option_del"><i class="i-shop del"></i></button>');
						otpionHtml.push('</div>');
						$(".slted_area").append(otpionHtml.join(""));
						
						// 옵션 숨기기
						$(".optslt_area").hide();
						
						MobileShopProductDetail.fn.getTotalPrice();
					} else {
						// 장바구니, 구매하기 버튼 클레스 변경
						$(".btn_purchase").css("cursor", "not-allowed");
						$(".btn_purchase").addClass("btn_purchase_not").removeClass("btn_purchase");
						
						$(".btn_add_cart").css("cursor", "not-allowed");
						$(".btn_add_cart").addClass("btn_add_cart_not").removeClass("btn_add_cart");
					}
					
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
					
					ingredientHtml.push('<li>');
					if(detail.v_brandnm != undefined && detail.v_brandnm != "") {
						ingredientHtml.push('	<div class="brand_nm">'+detail.v_brandnm+'</div>');
					}
					ingredientHtml.push('	<div class="prod_nm">'+detail.v_productnm+'</div>');
					ingredientHtml.push('	<div class="cont">'+ingredient+'</div>');
					ingredientHtml.push('</li>');
					
					// 전성분 영역에 push
					$(".ingredientList").html(ingredientHtml.join(""));
					// 옵션 selec영역에 push
					$("#listOptScroll").append(spanhtml.join(""));
					
					// 상품 버튼 이벤트
					MobileShopProductDetail.fn.addProductCntEvent();
				}
				
				// 추천 
				$("#span_like").text(SetNumComma(detail.n_vote_cnt));
				// 재구매 의사 퍼센트
				$(".span_rebuy_per").text(detail.n_rebuy_per);
				
				// 브랜드관 가기
				$(".sec_link strong").text(detail.v_brandnm);
				$(".sec_link a").attr("href", "javascript:alert('test');");
				
				// 상품 상세 이미지 있을 경우 
				var detailList = object.detail.detailImgList;
				if(detailList != undefined) {
					var detailImgHtml = [];
					
					for(var i = 0; i< detailList.length; i++) {
						detailImgHtml.push('<img src="'+detailList[i].v_image_path+'" alt="'+detail.v_productnm+' 상세정보이미지">');
					}
					
					$(".detailImgArea").html(detailImgHtml.join(""));
				}
				
				// 상품 상세 텍스트 설명
				if(detail.v_product_desc == null || detail.v_product_desc == ""){
					$(".div_clobArea").hide();
				}else{
					$(".div_clobArea").html(detail.v_product_desc);
				}
				
				// 상품 동영상
				var youtubeList = object.detail.youtubeList;
				
				if(youtubeList != undefined && youtubeList.length > 0) {
					var youtubeHtml = [];
					for(var i=0; i<youtubeList.length; i++) {
						youtubeHtml.push('<div>');
						youtubeHtml.push('	<div class="yt_box">');
						youtubeHtml.push('		<img src="'+GLOBAL_MOBILE_IMG_URL+'renew/common/bg_mov_x380.gif" alt="">');
						youtubeHtml.push('		<div class="video"><iframe src="http://www.youtube.com/embed/'+youtubeList[i].v_youtubeid+'"></iframe></div>');
						youtubeHtml.push('	</div>');
						youtubeHtml.push('</div>');
					}
					$(".shop_movie .single-item").html(youtubeHtml.join(""));
				} else {
					$(".shop_movie").hide();
				}
				
				// 상품의 세트 구성품
				var setOption = object.detail.setOption;
				if(setOption != undefined && setOption.length > 0) {
					var len = setOption.length;
					var setOptionHtml = [];
					
					for(var i = 0; i< len; i++) {
						setOptionHtml.push('<li>');
						setOptionHtml.push('	<div class="prod_item">');
						setOptionHtml.push('		<a href="'+GLOBAL_WEB_URL+'mobile/shop/mobile_shop_product_detail.do?i_sProductcd='+setOption[i].v_comp_productcd+'">');
						setOptionHtml.push('			<div class="thumb"><img data-original="'+setOption[i].v_img_path+'" class="lazy img-responsive" alt="'+setOption[i].v_comp_productnm+'"></div>');
						setOptionHtml.push('			<div class="details">');
						if(setOption[i].v_brandnm != undefined && setOption[i].v_brandnm != '' ) {
							setOptionHtml.push('			<p class="brand_nm">'+setOption[i].v_brandnm+'</p>');
						}
						setOptionHtml.push('				<p class="prod_nm">'+setOption[i].v_comp_productnm+'</p>');
						setOptionHtml.push('			</div>');
						setOptionHtml.push('		</a>');
						setOptionHtml.push('	</div>');
						setOptionHtml.push('</li>');
					}
					
					$("#setOptionArea .list_prod2").html(setOptionHtml.join(""));
				}else{
					$("#setOptionArea").hide();
				}
				
				// 상품의 스페셜 기프트
				var freegoodList = object.detail.freegoodList;
				
				if(freegoodList != undefined && freegoodList.length > 0 && $("#i_sLevelcd").val() != 'LV14') {
					var len = freegoodList.length;
					var freegoodHtml = [];
					var freegoodPopHtml = [];
					
					for(var i = 0; i< len; i++) {
						freegoodHtml.push('<li>');
						freegoodHtml.push('	<div class="prod_item">');
						freegoodHtml.push('		<a href="javascript:;">');
						freegoodHtml.push('			<div class="thumb"><img data-original="'+freegoodList[i].v_img_path+'" class="lazy img-responsive" alt="'+freegoodList[i].v_productnm+'"></div>');
						freegoodHtml.push('			<div class="details">');
						if(freegoodList[i].v_brandnm != undefined && freegoodList[i].v_brandnm != '' ) {
							freegoodHtml.push('			<p class="brand_nm">'+freegoodList[i].v_brandnm+'</p>');
						}
						freegoodHtml.push('				<p class="prod_nm">'+freegoodList[i].v_productnm+'</p>');
						freegoodHtml.push('				<p class="qty">'+freegoodList[i].n_cnt+'개</p>');
						freegoodHtml.push('			</div>');
						freegoodHtml.push('		</a>');
						freegoodHtml.push('	</div>');
						freegoodHtml.push('</li>');
						
						// 더보기 팝업
						freegoodPopHtml.push('<li>');
						freegoodPopHtml.push('	<div class="item_col">');
						freegoodPopHtml.push('		<div class="prod_nm">'+(isEmpty(freegoodList[i].v_brandnm) ? '' : freegoodList[i].v_brandnm)+' '+freegoodList[i].v_productnm+'</div>');
						freegoodPopHtml.push('		<div class="qty">'+freegoodList[i].n_cnt+'개</div>');
						freegoodPopHtml.push('	</div>');
						freegoodPopHtml.push('</li>');
					}
					
					$("#specialGiftArea .list_prod2").html(freegoodHtml.join(""));
					$("#modalSpegift .list_type3").html(freegoodPopHtml.join(""));
				} else {
					$("#specialGiftArea").hide();
				}
				
				
				// 스마트 오퍼 개인화 영역
				// 카테고리 인기상품
				var sameRecomList = object.sameRecomList;
				if(sameRecomList != undefined && sameRecomList.length > 0) {
					var sameHtml = [];
					var len = sameRecomList.length;

					for(var i=0; i<len; i++) {
						sameHtml.push('<li>');
						sameHtml.push('	<div class="prod_item">');
						sameHtml.push('		<a href="'+GLOBAL_WEB_URL+'mobile/shop/mobile_shop_product_detail.do?i_sProductcd='+sameRecomList[i].v_productcd+'&clickUrl='+sameRecomList[i].v_clickurl+'" onClick="trackClicksMall(\'상품\',\'모바일 상품상세^다른인기상품\',\'다른인기상품\',\'event5\',true,'+sameRecomList[i].v_productcd+');productClickTagEvent(\'reco-dp-1\',\''+sameRecomList[i].v_productcd+'\',\'MOBILE\');">');
						sameHtml.push('			<div class="thumb"><img data-original="'+sameRecomList[i].v_img_path+'" class="lazy img-responsive" alt="'+sameRecomList[i].v_productnm+'"></div>');
						sameHtml.push('			<div class="details">');
						if(sameRecomList[i].v_brandnm != undefined && sameRecomList[i].v_brandnm != "") {
							sameHtml.push('			<p class="brand_nm">'+sameRecomList[i].v_brandnm+'</p>');
						}
						sameHtml.push('				<p class="prod_nm">'+sameRecomList[i].v_productnm+'</p>');
						sameHtml.push('				<div class="price_area">');
						
						sameHtml.push('				<strong class="price"><span>'+SetNumComma(sameRecomList[i].n_price)+'</span>원</strong>');
						if(sameRecomList[i].n_list_price != sameRecomList[i].n_price) {
							sameHtml.push('			<del class="base"><span>'+SetNumComma(sameRecomList[i].n_list_price)+'</span>원</del>');
						}
						sameHtml.push('				</div>');
						sameHtml.push('				<div class="info">');
						sameHtml.push('					<div class="grade"><i class="i-grade grade0'+Math.round(sameRecomList[i].n_single_point)+'"></i></div>');
						sameHtml.push('					<div class="review">리뷰 <em>'+SetNumComma(sameRecomList[i].n_review_cnt)+'</em></div>');
						sameHtml.push('				</div>');
						sameHtml.push('			</div>');
						sameHtml.push('		</a>');
						sameHtml.push('	</div>');
						sameHtml.push('</li>');
					}
					
					$("#sameRecomArea .normal").text(object.categorynm + sameRecomList[0].v_scenariocomment);
					$("#sameRecomArea .list_prod").html(sameHtml.join(""));
				} else {
					$("#sameRecomArea").hide();
				}
				
				// 이상품과 많은 고객이 선택한 상품
				var differentRecomList = object.differentRecomList;
				
				if(differentRecomList != undefined && differentRecomList.length > 0) {
					var differentHtml = [];
					var len = differentRecomList.length;

					for(var i=0; i<len; i++) {
						differentHtml.push('<li>');
						differentHtml.push('	<div class="prod_item">');
						differentHtml.push('		<a href="'+GLOBAL_WEB_URL+'mobile/shop/mobile_shop_product_detail.do?i_sProductcd='+differentRecomList[i].v_productcd+'&rccode=m_detail&clickUrl='+differentRecomList[i].v_clickurl+'" onClick="trackClicksMall(\'상품\',\'모바일 상품상세^고객선택상품\',\'고객선택상품\',\'event5\',true,'+differentRecomList[i].v_productcd+');productClickTagEvent(\'reco-dp-2\',\''+differentRecomList[i].v_productcd+'\',\'MOBILE\');">');
						differentHtml.push('			<div class="thumb"><img data-original="'+differentRecomList[i].v_img_path+'" class="lazy img-responsive" alt="'+differentRecomList[i].v_productnm+'"></div>');
						differentHtml.push('			<div class="details">');
						if(differentRecomList[i].v_brandnm != undefined && differentRecomList[i].v_brandnm != "") {
							differentHtml.push('			<p class="brand_nm">'+differentRecomList[i].v_brandnm+'</p>');
						}
						differentHtml.push('				<p class="prod_nm">'+differentRecomList[i].v_productnm+'</p>');
						differentHtml.push('				<div class="price_area">');
						
						differentHtml.push('				<strong class="price"><span>'+SetNumComma(differentRecomList[i].n_price)+'</span>원</strong>');
						if(differentRecomList[i].n_list_price != differentRecomList[i].n_price) {
							differentHtml.push('			<del class="base"><span>'+SetNumComma(differentRecomList[i].n_list_price)+'</span>원</del>');
						}
						differentHtml.push('				</div>');
						differentHtml.push('				<div class="info">');
						differentHtml.push('					<div class="grade"><i class="i-grade grade0'+Math.round(differentRecomList[i].n_single_point)+'"></i></div>');
						differentHtml.push('					<div class="review">리뷰 <em>'+SetNumComma(differentRecomList[i].n_review_cnt)+'</em></div>');
						differentHtml.push('				</div>');
						differentHtml.push('			</div>');
						differentHtml.push('		</a>');
						differentHtml.push('	</div>');
						differentHtml.push('</li>');
					}
					
					$("#differentRecomArea .normal").text(differentRecomList[0].v_scenariocomment);
					$("#differentRecomArea .list_prod").html(differentHtml.join(""));
				} else {
					$("#differentRecomArea").hide();
				}
				
				// 브랜드 인기상품
				var brandHot = object.brandHot;
				
				if(brandHot != undefined && brandHot.length > 0) {
					var brandHtml = [];
					var len = brandHot.length;
					
					for(var i=0; i<len; i++) {
						brandHtml.push('<li>');
						brandHtml.push('	<div class="prod_item">');
						brandHtml.push('		<a href="'+GLOBAL_WEB_URL+'mobile/shop/mobile_shop_product_detail.do?i_sProductcd='+brandHot[i].v_productcd+'&clickUrl='+brandHot[i].v_clickurl+'" onClick="trackClicksMall(\'상품\',\'모바일 상품상세^브랜드 인기상품\',\'브랜드 인기상품\',\'event5\',true,'+brandHot[i].v_productcd+');productClickTagEvent(\'reco-dp-4\',\''+brandHot[i].v_productcd+'\',\'MOBILE\');">');
						brandHtml.push('			<div class="thumb"><img data-original="'+brandHot[i].v_img_path+'" class="lazy img-responsive" alt="'+brandHot[i].v_productnm+'"></div>');
						brandHtml.push('			<div class="details">');
						if(brandHot[i].v_brandnm != undefined && brandHot[i].v_brandnm != "") {
							brandHtml.push('			<p class="brand_nm">'+brandHot[i].v_brandnm+'</p>');
						}
						brandHtml.push('				<p class="prod_nm">'+brandHot[i].v_productnm+'</p>');
						brandHtml.push('				<div class="price_area">');
						
						brandHtml.push('				<strong class="price"><span>'+SetNumComma(brandHot[i].n_price)+'</span>원</strong>');
						if(brandHot[i].n_list_price != brandHot[i].n_price) {
							brandHtml.push('			<del class="base"><span>'+SetNumComma(brandHot[i].n_list_price)+'</span>원</del>');
						}
						brandHtml.push('				</div>');
						brandHtml.push('				<div class="info">');
						brandHtml.push('					<div class="grade"><i class="i-grade grade0'+Math.round(brandHot[i].n_single_point)+'"></i></div>');
						brandHtml.push('					<div class="review">리뷰 <em>'+SetNumComma(brandHot[i].n_review_cnt)+'</em></div>');
						brandHtml.push('				</div>');
						brandHtml.push('			</div>');
						brandHtml.push('		</a>');
						brandHtml.push('	</div>');
						brandHtml.push('</li>');
					}
					
					$("#brandHotArea .normal").text(brandHot[0].v_brandnm + " 인기상품");
					$("#brandHotArea .list_prod").html(brandHtml.join(""));
				} else {
					$("#brandHotArea").hide();
				}
				
				// 상세정보제공고시
				var packdt = dateStrucChange(object.packdt, 1) + " 이후";
				if(detail.v_pack_dt != undefined && detail.v_pack_dt != "") {
					packdt = dateStrucChange(detail.v_pack_dt,1);
				}
				MobileShopProductDetail.fn.setPrdLawInfo(detail,packdt);
				
				// 구매 후기
				$("#review_recom>strong").text("평점 "+recomPoint);
				$("#review_recom>span").text(SetNumComma(detail.n_text_cnt2));
				$(".review_total .i-grade").addClass("grade0" + Math.round(recomPoint));
				
				$("input[name='i_sTypecd']").val("0004");
				MobileShopProductDetail.fn.getReviewList();
				
//////////////////////////리뉴얼 끝////////////////////
				
				//gypark : 20150707 trackClicksEx 추가하기
				$(".btn_productLike").attr("onclick", "trackClicksEx('apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','상품 추천', true)");
				$(".btn_purchase").attr("onclick", "trackClicksEx('apmall^" + detail.v_brandnm + " " + detail.v_productnm + " 상품상세','바로 구매', true)");
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
			var prdLawInfoHtml = [];
			
			var infoTypecd = detail.v_info_typecd;
			if(infoTypecd == "PI_001"){
				prdLawInfoHtml.push('<dt>용량가</dt>');
				if(detail.v_capacity != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_capacity+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>제품 주요 사항</dt>');
				if(detail.v_skin_typenm != undefined && detail.v_skin_typenm != "" && detail.v_skin_typenm != "undefined"){
					prdLawInfoHtml.push('<dd>'+detail.v_skin_typenm+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>모든 피부</dd>');
				}
				
				prdLawInfoHtml.push('<dt>사용기한 또는 개봉 후 사용기간</dt>');
				if(detail.v_expiration_cos != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_expiration_cos+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}

				prdLawInfoHtml.push('<dt>사용방법</dt>');
				prdLawInfoHtml.push('<dd>제품 상세보기 참조</dd>');

				prdLawInfoHtml.push('<dt>제조자</dt>');
				if(detail.v_manufacture != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_manufacture+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}

				prdLawInfoHtml.push('<dt>제조판매업자</dt>');
				prdLawInfoHtml.push('<dd>(주)아모레퍼시픽</dd>');

				prdLawInfoHtml.push('<dt>제조국</dt>');
				if(detail.v_origin != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_origin+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
			
				prdLawInfoHtml.push('<dt>성분</dt>');
				if(detail.v_opt_ingredient != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_opt_ingredient+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>기능성 화장품의 경우 화장품법에 따른 식품의약품안전처 심사 또는 보고 유무</dt>');
				if(detail.v_func_cosmetic != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_func_cosmetic+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>해당없음</dd>');
				}
				
				prdLawInfoHtml.push('<dt>사용 중 주의사항</dt>');
				if(detail.v_caution != undefined){
					prdLawInfoHtml.push('<dd>'+fnChangeBr(detail.v_caution)+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>품질보증기준</dt>');
				prdLawInfoHtml.push('<dd>본 제품에 이상이 있을 경우, 공정거래위원회 고시에 의거 보상해 드립니다.</dd>');
				
				prdLawInfoHtml.push('<dt>소비자상담 관련 전화번호</dt>');
				prdLawInfoHtml.push('<dd>080-030-5454</dd>');
				prdLawInfoHtml.push('<dd>운영시간 : 09:00 ~ 17:00 (점심시간 제외, 12~13시) <br>(주말, 공휴일 제외)</dd>');

			}else if(infoTypecd == "PI_002"){
				prdLawInfoHtml.push('<dt>식품의 유형</dt>');
				if(detail.v_food_type != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_food_type+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>생산자</dt>');
				if(detail.v_manufacture != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_manufacture+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>소재지</dt>');
				if(detail.v_origin != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_origin+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>제조연월일, 유통기한 또는 품질유지기한</dt>');
				if(detail.v_expiration_food != undefined){
					prdLawInfoHtml.push("<dd>" + detail.v_expiration_food + "</dd>");
				}else{
					prdLawInfoHtml.push("<dd>제품 상세설명 참고</dd>");
				}
				
				prdLawInfoHtml.push('<dt>포장단위별 용량(중량), 수량</dt>');
				if(detail.v_capacity != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_capacity+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>원재료명 및 함량 (농수산물의 원산지 표시에 관한 법률에 따른 원산지 표시 포함)</dt>');
				if(detail.v_opt_ingredient != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_opt_ingredient+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}

				prdLawInfoHtml.push('<dt>영양성분 (식품위생법에 따른 영양성분 표시대상 식품에 한함)</dt>');
				if(detail.v_info_nutri != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_info_nutri+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>유전자재조합식품 유무</dt>');
				prdLawInfoHtml.push('<dd>해당사항 없음</dd>');
				
				
				prdLawInfoHtml.push('<dt>표시광고사전심의필 유무 및 부작용 발생 가능성</dt>');
				if(detail.v_side_effect != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_side_effect+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}

				prdLawInfoHtml.push('<dt>수입식품 여부</dt>');
				prdLawInfoHtml.push('<dd>해당사항 없음</dd>');
				
				prdLawInfoHtml.push('<dt>소비자상담 관련 전화번호</dt>');
				prdLawInfoHtml.push('<dd>080-030-5454</dd>');
				prdLawInfoHtml.push('<dd>운영시간 : 09:00 ~ 17:00 (점심시간 제외, 12~13시) <br>(주말, 공휴일 제외)</dd>');
				
			}else if(infoTypecd == "PI_003"){
				prdLawInfoHtml.push('<dt>식품의 유형</dt>');
				prdLawInfoHtml.push('<dd>건강기능식품</dd>');
				
				prdLawInfoHtml.push('<dt>생산자</dt>');
				if(detail.v_manufacture != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_manufacture+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>소재지</dt>');
				if(detail.v_origin != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_origin+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				prdLawInfoHtml.push('<dt>제조연월일, 유통기한 또는 품질유지기한</dt>');
				if(detail.v_expiration_food != undefined){
					prdLawInfoHtml.push("<dd>" + detail.v_expiration_food + "</dd>");
				}else{
					prdLawInfoHtml.push("<dd>제품 상세설명 참고</dd>");
				}
				
				prdLawInfoHtml.push('<dt>포장단위별 용량(중량), 수량</dt>');
				if(detail.v_capacity != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_capacity+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>원재료명 및 함량 (농수산물의 원산지 표시에 관한 법률에 따른 원산지 표시 포함)</dt>');
				if(detail.v_opt_ingredient != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_opt_ingredient+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>영양정보</dt>');
				if(detail.v_info_nutri != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_info_nutri+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>기능정보</dt>');
				if(detail.v_info_func != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_info_func+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>섭취량, 섭취방법 및 섭취시 주의사항 및 부작용 가능성</dt>');
				if(detail.v_ingetion_info != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_ingetion_info+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>질병의 예방 및 치료를 위한 의약품이 아니라는 내용의 표현</dt>');
				prdLawInfoHtml.push('<dd>본 제품은 질병의 예방 및 치료를 위한 의약품이 아닙니다.</dd>');
				
				prdLawInfoHtml.push('<dt>유전자재조합식품 유무</dt>');
				prdLawInfoHtml.push('<dd>해당사항 없음</dd>');
				
				prdLawInfoHtml.push('<dt>표시광고 사전심의 유무</dt>');
				if(detail.v_flag_ad_conf != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_flag_ad_conf+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>수입식품 여부</dt>');
				prdLawInfoHtml.push('<dd>해당사항 없음</dd>');
				
				prdLawInfoHtml.push('<dt>소비자상담 관련 전화번호</dt>');
				prdLawInfoHtml.push('<dd>080-030-5454</dd>');
				prdLawInfoHtml.push('<dd>운영시간 : 09:00 ~ 17:00 (점심시간 제외, 12~13시) <br>(주말, 공휴일 제외)</dd>');

			}else if(infoTypecd == "PI_004"){
				prdLawInfoHtml.push('<dt>품명 및 모델명</dt>');
				if(detail.v_modelnm != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_modelnm+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>KC 인증 필 유무</dt>');
				if(detail.v_flag_kc != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_flag_kc+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>정격전압, 소비전력</dt>');
				if(detail.v_voltage != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_voltage+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>동일모델의 출시년월</dt>');
				if(detail.v_release_dtm != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_release_dtm+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>제조자</dt>');
				if(detail.v_manufacture != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_manufacture+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>제조국</dt>');
				if(detail.v_origin != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_origin+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>크기, 무게</dt>');
				if(detail.v_size_info != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_size_info+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>주요사양</dt>');
				if(detail.v_info_micro != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_info_micro+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
				prdLawInfoHtml.push('<dt>품질보증기준</dt>');
				prdLawInfoHtml.push('<dd>본 상품에 이상이 있을 경우 공정거래위원회 고시에 따라 보상해드립니다.</dd>');
				
				prdLawInfoHtml.push('<dt>A/S 책임자와 전화번호</dt>');
				if(detail.v_as_connect != undefined){
					prdLawInfoHtml.push('<dd>'+detail.v_as_connect+'</dd>');
				}else{
					prdLawInfoHtml.push('<dd>제품 상세설명 참고</dd>');
				}
				
			}else{
				prdLawInfoHtml.push("<dt>아직 상품정보고시를 입력하지 않았습니다.</dt>")
			}
			
			$("#setPrdLawInfoArea").html(prdLawInfoHtml.join(""));
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
						arrHtml.push('<li>');
						arrHtml.push('	<div class="profile">');
						arrHtml.push('		<p class="photo"><img src="'+list[i].v_proimag_url+'" alt="프로필이미지" onerror="fnNoImageUser(this);"></p>');
						if(list[i].v_nickname != undefined && list[i].v_nickname != "") {
							arrHtml.push('	<p class="nm">'+list[i].v_nickname+'</p>');
						} else {
							arrHtml.push('	<p class="nm">'+getStringReverseHidden(list[i].v_userid, 3)+'</p>');
						}
						arrHtml.push('		<div class="lv">');
						if(list[i].v_levelnm != undefined && list[i].v_levelnm != "") {
							arrHtml.push('		<div><i>'+list[i].v_levelnm+'</i></div>');
						}else{
							arrHtml.push('		<div><i>일반</i></div>');
						}
						arrHtml.push('		</div>');
						arrHtml.push('	</div>');
						if(parseInt(list[i].n_option_cnt) > 1) {
							var optionnm = list[i].v_optionnm == undefined ? "" : list[i].v_optionnm.replace(/!!/gi, ", ");
							arrHtml.push('<p class="opt_nm">'+optionnm+'</p>');
						}
						arrHtml.push('	<div class="grade">');
						arrHtml.push('		<i class="i-grade medium grade0'+list[i].n_recom_point+'">'+list[i].n_recom_point+'점</i>');
						arrHtml.push('	</div>');
						arrHtml.push('	<div class="cont">');
						if(list[i].v_reg_channel =="MOBILE" || list[i].v_reg_channel =="APP"){
							arrHtml.push('	<span class="sp_ico i1" style="float:left; margin-top:4px;">모바일</span>');
						}
						arrHtml.push('		<span>'+removeHTMLTag(list[i].v_content)+'</spna>');
						arrHtml.push('	</div>');
						arrHtml.push('	<div class="info_bott">');
						arrHtml.push('		<p class="date">'+changeBeforeDate(list[i].v_reg_dtm)+'</p>');
						if(userid != list[i].v_userid){
							arrHtml.push('	<button type="button" id="'+list[i].v_reviewcd+'" class="btn_report btn_con_report">신고</button>');
						}
						arrHtml.push('	</div>');
						if(userid == list[i].v_userid){
						arrHtml.push('	<div class="ctrl">');
						arrHtml.push('		<div><button type="button" id="'+list[i].v_reviewcd+'" class="btn_modify btn_text_modify">수정</button></div>');
						arrHtml.push('		<div><button type="button" id="'+list[i].v_reviewcd+'" class="btn_delete btn_review_delete">삭제</button></div>');
						arrHtml.push('	</div>');
						}
						arrHtml.push('</li>');
					}
					
				} else {
					arrHtml.push("<div class=\"list_review_empty\">");
					arrHtml.push("	더 좋은 구매후기를 기다리고 있습니다");
					arrHtml.push("</div>");
				}
				
				if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
					$("#reviewWrap .btns_more").hide();
				} else {
					$("#reviewWrap .btns_more").show();
				}
				
				if(1 == page.i_iNowPageNo) {
					$("#review_list").html(arrHtml.join(""));
				} else {
					$("#review_list").append(arrHtml.join(""));
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
						
						arrHtml.push('<li>');
						arrHtml.push('	<div class="profile">');
						arrHtml.push('		<p class="photo"><img src="'+list[i].v_proimag_url+'" alt="프로필이미지" onerror="fnNoImageUser(this);"></p>');
						if(list[i].v_nickname != undefined && list[i].v_nickname != "") {
							arrHtml.push('	<p class="nm">'+list[i].v_nickname+'</p>');
						} else {
							arrHtml.push('	<p class="nm">'+getStringReverseHidden(list[i].v_userid, 3)+'</p>');
						}
						arrHtml.push('		<div class="lv">');
						if(list[i].v_levelnm != undefined && list[i].v_levelnm != "") {
							arrHtml.push('		<div><i>'+list[i].v_levelnm+'</i></div>');
						}else{
							arrHtml.push('		<div><i>일반</i></div>');
						}
						if(list[i].v_rv_typecd == "DC_T002") {
							arrHtml.push('		<div><i>뷰티테스터</i></div>');
						}
						arrHtml.push('		</div>');
						arrHtml.push('	</div>');
						arrHtml.push('	<div class="photo">');
						if(imglist != undefined && imglist.length > 0) {
							for(var j=0; j<imglist.length; j++) {
								if(imglist[j].v_recordid == list[i].v_reviewcd) {
									arrHtml.push('		<img src="'+imglist[j].v_thumbnail_original_path+'" alt="">');
									arrHtml.push('		<button type="button" class="btn_photo btn_review_detail" id="'+list[i].v_reviewcd+'"><span>'+SetNumComma(list[i].n_vote_total)+'</span></button>');
									break;
								}
							}
						}
						arrHtml.push('	</div>');
						arrHtml.push('	<div class="grade">');
						arrHtml.push('		<i class="i-grade medium grade0'+list[i].n_use_point+'">'+list[i].n_use_point+'</i>');
						arrHtml.push('	</div>');
						arrHtml.push('	<div class="cont">');
						arrHtml.push('		'+getByteString(remove_html, 50)+'');
						arrHtml.push('	</div>');
						arrHtml.push('	<div class="info_bott">');
						arrHtml.push('		<p class="date">'+changeBeforeDate(list[i].v_reg_dtm)+'</p>');
						arrHtml.push('	</div>');
						arrHtml.push('</li>');
					}
				} else {
					arrHtml.push("<div class=\"list_review_empty\">");
					arrHtml.push("	더 좋은 구매후기를 기다리고 있습니다");
					arrHtml.push("</div>");
				}
				
				if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
					$("#photoWrap .btns_more").hide();
				} else {
					$("#photoWrap .btns_more").show();
				}
				
				if(1 == page.i_iNowPageNo) {
					$("#photo_list").html(arrHtml.join(""));
				} else {
					$("#photo_list").append(arrHtml.join(""));
				}
			}
			
			MobileShopProductDetail.fn.addBtnEvent();
		},

		getParameter : function() {
			var parameter = {
				"i_sProductcd" : $("#i_sProductcd").val()
				, "i_sDeviceNum" : $("#i_sDeviceNum").val()
			};
			
			return parameter;
		}
		// 배송비
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
			var sum_price = parseInt(SetNum($(".dd_totalPrice").text()));
			
			if(cash_buy_limit > 0 || point_buy_limit > 0 || cash_today_limit > 0 || point_today_limit > 0) {
				if(isDeliveryToday && cash_today_limit > 0 && cash_today_limit <= sum_price) {
					isDeliveryFree = true;
				} else if(cash_buy_limit > 0 && cash_buy_limit <= sum_price) {
					isDeliveryFree = true;
				} else{
					isDeliveryFree = false;
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
				} else if(sum_price < cash_buy_limit){
					delivery_price = $(".cash_buy").text();
				}
			}
			
			if(delivery_price == 0) {
				$("#shop_info_txt").text("무료배송");
			} else {
				$("#shop_info_txt").text(SetNumComma(delivery_price)+"원");
			}
		}
		// 뷰티 포인트 적립 예정 계산
		, getBeautyPoint : function(optioncd) {
			var optioninfo = $("#span_option_"+optioncd);
			var sapStcd = $(".span_sap_stcd", optioninfo).text();
			var statuscd = $(".span_statuscd", optioninfo).text();
			var optStatuscd = $(".span_opt_statuscd", optioninfo).text();
			var stockqty = $(".span_stockqty", optioninfo).text();
			var dayoffcd = $(".span_dayoffcd", optioninfo).text();
			var dayoffStockqty = $(".span_dayoff_stockqty", optioninfo).text();
			var flagbeauty = $("input[name='i_sFlagBeauty']").val();
			var flagEvent = $(".span_flag_event", optioninfo).text();
			var list_price = $(".span_option_price", optioninfo).text();
			var dc_price = $(".span_option_dc_price", optioninfo).text();
			var originPrice = $(".span_origin_price", optioninfo).text();
			var opt_bpoint_per = parseInt($(".span_bpoint_per", optioninfo).text());
			
			var salePrice = 0;
			// 선택한 옵션이 일시품절이 아니고 재고수가 0이상이며 단종 상품이 아닐 때
			if(statuscd != "0002" && optStatuscd != "0002" && parseInt(stockqty) > 0 && (sapStcd != "DK_004" || optStatuscd != "0003")) {
				if((dayoffcd != undefined && dayoffcd != "" && parseInt(dayoffStockqty) > 0) || (dayoffcd == undefined || dayoffcd == "")) {
					salePrice = dc_price;
				} else {
					salePrice = originPrice;
				}
			}
			
			var bpoint = 0;
			if((dayoffcd != "" && dayoffcd != undefined && parseInt(dayoffStockqty) > 0) || flagbeauty == "Y") {
				bpoint = 0;
			} else {
				// 구매시 적립 포인트
				if($(".span_onePlusCheckYn").text() == "Y" && flagEvent == "Y") {
					bpoint = 0;
				} else if(list_price != salePrice) {
					var levelcd = $("#i_sLevelcd").val();

					if(levelcd == 'LV15' || levelcd == 'LV16' || levelcd == 'LV17' || levelcd == 'LV18' || levelcd == 'LV19' || levelcd == 'LV20'){
						var saleRate = (list_price - salePrice) * 100 / list_price;
						if(saleRate == 10){
							if(opt_bpoint_per != 0){
								bpoint = Math.round(parseInt(salePrice) * opt_bpoint_per / 100);
							}
						}else{
							bpoint = 0;
						}
					}else{
						bpoint = 0;
					}
				} else {
					bpoint = Math.round(parseInt(salePrice) * opt_bpoint_per / 100);
				}
			}
			
			return bpoint;
		}
		, setBeautyPoint : function(bpoint, type) {
			// 현재 포인트
			var beauty_point = parseInt($(".span_beauty").text().replace(",",""));
		
			if(type == "add"){
				$(".span_beauty").text(SetNumComma(beauty_point+bpoint))
			} else {
				$(".span_beauty").text(SetNumComma(beauty_point-bpoint))
			}
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
					'min': [	0 ],
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
		
		MobileProductDetailStyle.addProductDetailStyly();
		MobileProductDetailStyle.imgLoading();
	},
	addProductDetailStyly : function() {
		// 헤더 백버튼 살리기, 최근본 상품 퀵 버튼 숨기기
		$(".btn_back").show();
		$(".btn_recent").hide();
		// 리뉴얼 헤더 영역과 상세 탭 조절
		$('header').addClass('unfixed');
		var shopTabs = $("#shopProdTabs");
			
		$(window).on('scroll touchmove',function(){
			var scrollTop = $win.scrollTop();
			var tabTop = shopTabs.offset().top;
			// 상세 탭 고정
			if(shopTabs.exists()){
				if(scrollTop >= (tabTop)){
					if(!shopTabs.hasClass('fixed')){
						shopTabs.addClass('fixed');
					}
				} else {
					shopTabs.removeClass('fixed');
				}
			}
		});
		/* 상단 제품 슬라이드 */
		var $slickElement = $('#spThumb .single-item');
		// 상품상세 - 메인 썸네일
		$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			var $pager = $(this).siblings('.pager');
			var i = (currentSlide ? currentSlide : 0) + 1;
			$pager.text(i + '/' + slick.slideCount);

			// 렌더링 전 해당 슬라이드 높이가 움직이기 때문에 top 위치를 재설정
			setTimeout(function () {
				window.GlobalUI._fixpos();
			}, 200);
		});

		$slickElement.slick({
			arrows : false,
			dots: false,
			focusOnSelect: false
		});
		
		// 상품상세 - 영상
		var $slickMovie = $('#spMoive .single-item');

		// 상품상세 - 메인 썸네일
		$slickMovie.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			var $pager = $(this).siblings('.pager');
			var i = (currentSlide ? currentSlide : 0) + 1;
			$pager.text(i + '/' + slick.slideCount);
			
			// 렌더링 전 해당 슬라이드 높이가 움직이기 때문에 top 위치를 재설정
			setTimeout(function () {
				window.GlobalUI._fixpos();
			}, 200);
		});

		$slickMovie.slick({
			arrows : true,
			dots: false
		});
		
		// 리뷰 버튼 클릭시 
		$('#btnReview').click(function(e){
			// 초기화
			$('#shopProdTabs li').removeClass('on');
			$("#shopDetails, #shopReview, #shopShipping").hide();

			// 리뷰 탭 컨텐츠만 보여줌
			$('#shopReview').show();

			// 리뷰 탭 활성화
			$('#shopProdTabs li:eq(1)').addClass('on');
			$(window).scrollTop(window.fixeditem.SHOP_TAB_T);
		});

		// 옵션 컬러,텍스트 선택 시 활성화
		$('.list_opts').find('a').click(function(){
			$('.list_opts li').removeClass('on');
			$(this).parents('li').addClass('on');
			
			var optioncd = $(this).parents('li').attr("id");
			var optioninfo = $("#span_option_"+optioncd);
			var optionnm = $(".span_optionnm", optioninfo).text();
			
			var colorCnt = $(".opts_wrap .list_opts").find(".opt_color").length;
			var textCnt = $(".opts_wrap .list_opts").find(".opt_text").length;
			var optText = "";
			if(colorCnt > 0){
				optText = colorCnt + " Colors / ";
			}else{
				optText = textCnt + " Options / ";
			}
			
			$(".opts_wrap .selected").text(optText + optionnm);
			
			MobileShopProductDetail.fn.setOptionSelect(optioncd);
		});
		
		// 아코디언 형식 리스트 - 접기&펼치기
		$('.sec_accd li .tit a').click(function(){
			var $li = $(this).parents('li');
			var $panel = $li.find('.panel');

			if($panel.is(':hidden')){
				$panel.stop().slideDown(300);
				$li.addClass('on');
			} else {
				$panel.stop().slideUp(300);
				$li.removeClass('on');
			}

			return false;
		});

		// 상세정보, 상품리뷰, 배송정보 탭 선택 시
		$('#shopProdTabs a').click(function(e){
			// 초기화
			$('#shopProdTabs li').removeClass('on');
			$("#shopDetails, #shopReview, #shopShipping").hide();

			// 해당 아이템만 선택 보여줌
			var id = $(this).attr('href').replace('#','');
			$('#' + id).show();

			// 해당 아이템 탭에 활성화 클래스 추가
			$(this).parents('li').addClass('on');
			$(window).scrollTop(window.fixeditem.SHOP_TAB_T);

			return false;
		});

		// 구매후기, 포토리뷰 탭 선택 시
		$('#tabReview a').click(function(e){
			// 초기화
			$('#tabReview li').removeClass('on');
			$("#reviewWrap, #photoWrap").hide();

			// 해당 아이템만 선택 보여줌
			var id = $(this).attr('href').replace('#','');
			$('#' + id).show();

			// 해당 아이템 탭에 활성화 클래스 추가
			$(this).parents('li').addClass('on');

			// 포토리뷰 탭 처음 클릭할때만 값 가지고 오기
			if(id == "photoWrap"){
				$("input[name='i_sTypecd']").val("0001");
				if($("#photo_list li").length == 0 && $(".nodata", "#photo_list").length == 0) {
					MobileShopProductDetail.fn.getReviewList();
				}
			}else {
				$("input[name='i_sTypecd']").val("0004");
				if($("#review_list li").length == 0 && $(".nodata", "#review_list").length == 0) {
					MobileShopProductDetail.fn.getReviewList();
				}
			}
			
			return false;
		});
		
		// 하단 슬라이드
		$('.bnnr_shopbot').slick({
			arrows : true,
			dots : false,
			infinite : false
		});

		// 상품상세 옵션 - 스크롤
		if($('#listOptScroll').exists()){
			// 상품상세 옵션 - 스크롤
			var listOptScroll = new iScroll('listOptScroll', {
				mouseWheel: true,
				scrollbars: true,
				eventPassthrough: true
			});
		}
		
	} // addProductDetailStyly
	, imgLoading : function() {
		/* Lazyload */
		$("img.lazy").lazyload({
			event: "scrollstop",
			threshold : 600
		});
	}
};
/**
 * New node file
 */
var prodlistIscroller,
offset = 0;
var winW = $(window).width();
var $aw = 0;

var specialparam = {
	i_iNowSpPageNo		: parseInt($('#i_iNowSpPageNo').val() || "1", 10),
	i_iPageSpSize		: parseInt($('#i_iPageSpSize').val() || "2", 10),
	i_iTotalSpPageCnt	: parseInt($('#i_iTotalSpPageCnt').val() || "1", 10),
	i_iSpRecordCnt		: parseInt($('#i_iSpRecordCnt').val() || "1", 10),
	i_sFlagPageInit		: "",
	i_sCategorycd1	: $('#i_sCategorycd1').val(),
	i_sCategorycd2	: "",
	i_sCategorycd3	: "",
	i_sSelectFeature: "",
	i_sBrandcd : ""
};
var MobileSpecialGift = {
	name : "MobileSpecialGift",
	isLoadingSpacialPrdList	: false,
	init : function() {
		//MobileSpecialGift.fn.getSpecialList(1 , 0);//기존
		fn_filterItems_special(1); //리뉴얼 2017/10/25
		
		MobileSpecialGift.fn.addBtnEvent();
		
		$('#selectedFilt_div').addClass('selected');
		$('#selectedItems').addClass('inner');
	},
	fn : {
		addBtnEvent : function(){
			$("select[name='i_sBrandcd']").unbind("change").change(function(){
				var brandcd = $(this).val();
				specialparam.i_sBrandcd = brandcd;
				
				//MobileSpecialGift.fn.getSpecialList(1, 0); //기존
				fn_filterItems_special(1); //리뉴얼 2017/10/25
				
			});
			$(".btn_cart2").unbind("click").click(function(event){
				event.preventDefault();
				var idx = $(".btn_cart2").index($(this));
				var productcd = $(".span_productcd_spec").eq(idx).text();
				var optioncd = $(".span_optioncd_spec").eq(idx).text();
				var solopack = $(".span_flagsolopack_spec").eq(idx).text();
				var brandnm = $(".span_brandnm_spec").eq(idx).text();
				var productnm = $(".span_productnm_spec").eq(idx).text();
				var price = $(".span_price_spec").eq(idx).text();
				var list = [{
					productcd : productcd
					, optioncd : optioncd
					, cnt : 1
					, flagSoloPack : solopack
				}];
				
				MobileBodyStart.addUserCart({
					list : list
					, callback : function(){
						var target = "#balloonBasket";
						   
						var str = brandnm + ";" + productnm +";;;event54=1|event55="+price+";eVar31="+ productcd;
    					str = str.replace(/&/gi,"_");
    					
						try{trackPurchaseClick(str,'scAdd,event54,event55');}catch(e){}
						
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
			});
			
			$(".btn_nowBuy").unbind("click").click(function(event){
				event.preventDefault();
				var idx = $(".btn_nowBuy").index($(this));
				var productcd = $(".span_productcd_spec").eq(idx).text();
				var optioncd = $(".span_optioncd_spec").eq(idx).text();
				var solopack = $(".span_flagsolopack_spec").eq(idx).text();
				if(IS_LOGIN || IS_LOGIN_SNS){
					var list = [{
						productcd : productcd
						, optioncd : optioncd
						, cnt : 1
						, flagSoloPack : solopack
					}];
					
					MobileBodyStart.addUserCart({
						list : list
						, callback : function(){
							location.href=GLOBAL_WEB_URL+"mobile/cart/mobile_cart_cart_list.do";
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
									location.href=GLOBAL_WEB_URL+"mobile/cart/mobile_cart_cart_list.do";
								}
							});
						}
					});

				}
				
			});
			
			
			//////리뉴얼 추가 2017/10/25/////////////////
			$(".btn_filter_del1").unbind("click").click(function(event) {
				event.preventDefault();
				var tagid = $(this).attr("id").split("/")[0];
				var tagcd = $(this).attr("id").split("/")[1];
				
				showConfirmBox({
					message : "해당 필터를 검색조건에서 제외하시겠어요?"
					, ok_func : function() {
						if(tagcd == "brand") {
							 $('input:checkbox[name="i_arrBrandcd"]').each(function() {
							      if(this.value ==tagid){//checked 처리된 항목의 값
							          //alert(tagid);  
							    	  this.checked = false; 
							    	  $("#span_"+""+tagid).removeClass("chkbox chked").addClass("chkbox unchked");
							      }
							 });
						}
						
						$(this).remove();
						
						parameter.i_sFlagPageInit = "Y";
						parameter.pageStack = new Array();
						//MobileShopProductList1.fn.getShoppingProductList(1); //기존
						
						fn_filterItems_special(1); //신규
					}
				});
			});
			//////리뉴얼 추가 2017/10/25/////////////////
			
			$(".btn_category").unbind("click").click(function(event) {
				event.preventDefault();
				var id = $(this).attr("id") == "ALL" ? "" : $(this).attr("id");
				
				//$(".btn_category").removeClass("on");
				$(this).addClass("on");
				
				specialparam.i_sCategorycd1 = id;
				
				$("input[name='i_sCategorycd1']").val(id);
				
				specialparam.i_sFlagPageInit = "N";
				
				var leftx = $(".nav_scate_subCateg").css("left");
				specialparam.pageStack = new Array();
				
				//MobileSpecialGift.fn.getSpecialList(1, leftx);
				
				fn_filterItems_special(1); //리뉴얼 수정
			});
		},
		getSpecialList : function(i_iNowSpPageNo, leftx){
			//리뉴얼 추가 2017/10/25
			var i_arrBrandcd= new Array();
			
			$("input[name='i_arrBrandcd']:checked").each(function(i){
				i_arrBrandcd.push($(this).val());
			}); 
			specialparam.i_sPrdBrandcd = i_arrBrandcd; //브랜드
			//리뉴얼 추가 2017/10/25
			
			
			specialparam.i_sCategorycd1 = $("#i_sCategorycd1").val();
			
			specialparam.i_iNowSpPageNo  = i_iNowSpPageNo;
//			specialparam.i_sFlagPageInit	= initflag;
			specialparam.i_sSelectFeature = $(".i_sSelectFeature").val();
			MobileCommon.ajax({	
				url			: GLOBAL_WEB_ROOT+"mobile/mobile_main_special_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: specialparam,
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						MobileSpecialGift.fn.setSpecialList(data.object.specialmap, data.object.category, data.object.brandlist,leftx,data.object.brand,data.object.feature);//리뉴얼 브랜드 obj추가 2017/10/25
						MobileSpecialGift.isSec2Loaded	= true;						//스페셜 기프트 tab은 로드 끝
						hideScrollLoadingBox();
					}else {
						alert(data.message);
					}
					MobileSpecialGift.isLoadingSpacialPrdList = false;
					
					MobileSpecialGift.fn.addBtnEvent();
				}
				,error : function(){
					MobileSpecialGift.isLoadingSpacialPrdList = false;
				} 
			});	
			
		},
		
		setSpecialList : function(Tot_obj, cateobj, brdobj,leftx,brandObj,featureObj){ //리뉴얼 브랜드 obj추가 2017/10/25
			
			var page = Tot_obj.page;
			
			$('#i_iNowSpPageNo').val(page.i_iNowPageNo);
			$('#i_iTotalSpPageCnt').val(page.i_iTotalPageCnt);
			$('#i_iSpRecordCnt').val(page.i_iRecordCnt);
			
			$("#totalCntEm").text(SetNumComma(page.i_iRecordCnt));//리뉴얼 추가 2017/10/25
			$("#checked_txtId").text(SetNumComma(page.i_iRecordCnt));//리뉴얼 추가 2017/10/25
			
			specialparam.i_iNowPage = page.i_iNowPageNo;
			specialparam.i_iTotalSpPageCnt = page.i_iTotalPageCnt;
			specialparam.i_iSpRecordCnt = page.i_iRecordCnt;
			
			var $specialSec = $(".onlyApamllProdBox");
			var $form_specal = $(".form_special_prod");
			var spMstList= Tot_obj.spMstList;
			var spSubList= Tot_obj.spSubList;
			var sp_cnt = spMstList.length;
			
			var arrCate = [];
			if(cateobj != undefined && cateobj.length > 0) {
				/*if(parameter.i_sFlagBrand == "Y") {
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
				}*/
				
				
				/*주석처리 2017/09/28 -- header와 리스트 사이 라인 카테고리*/
				arrCate.push("<li class=\"btn_category\" id=\"ALL\" level=\""+cateobj[0].n_level+"\"><a href=\"#\">전체<span>("+cateobj[0].n_total_cnt+")</span></a></li>");
				for(var i=0; i<cateobj.length; i++) {
					if(cateobj[i].n_cnt > 0){
						arrCate.push("<li class=\"btn_category\" id=\""+cateobj[i].v_categorycd+"\" level=\""+cateobj[i].n_level+"\"><a href=\"#\">"+cateobj[i].v_categorynm+"<span>("+cateobj[i].n_cnt+")</span></a></li>");
					}
				}
				
				$(".nav_scate_subCateg").html(arrCate.join("")); //새로운 카테고리 2017/09/29
				
				/*$(".prodCategoryList").html(arrCate.join(""));*/ //line category 주석처리 
				var nowCategory = $("input[name='i_sCategorycd"+cateobj[0].n_level+"']").val();
				
				if(nowCategory != "") {
					$("#"+nowCategory).addClass("on");
				} else {
					$("#ALL").addClass("on");
				}
				$aw = 1;
				MobileSpecialGift.fn.setScroll(leftx); //수정 2017/10/24
				MobileSpecialGift.fn.addCategoryStyleEvent(); //수정 2017/10/24
			}
			
			//------브랜드 선택 select box 주석처리 2017/09/28
			//////////////////////////////
			/*var arrBrd = [];
			arrBrd.push("<option value=''>브랜드 선택</option>");
			if(brdobj != undefined && brdobj.length > 0){
				for(var i = 0; i< brdobj.length; i++){
					if(specialparam.i_sBrandcd == brdobj[i].v_brandcd){
						arrBrd.push("<option value='"+brdobj[i].v_brandcd+"' selected>"+brdobj[i].v_brandnm+"</option>");
					}else{
						arrBrd.push("<option value='"+brdobj[i].v_brandcd+"'>"+brdobj[i].v_brandnm+"</option>");
					}
				}
			}
			$("#brand").html(arrBrd.join(""));*/ 
			/////////////////////////////
			//------브랜드 선택 select box 주석처리 2017/09/28
			
			
			//필터 선택한 브랜드 selectedItems에 표시 2017/10/25
			var arrBrand = [];
			
			arrBrand.push("<span class='item'>"+"스페셜기프트"+"<button type='button' class='btn_filter_del' disabled='true'><i class='i-sort close'>필터조건 삭제</i></button></span>");
			if(brandObj != undefined && brandObj.length > 0) {
				//$(".i_sPrdBrandcd").val(i_sPrdBrandcd);
				for(var i=0; i<brandObj.length; i++) {
					//arrParam.push("<a href=\"#\" class=\"checkbox btn_filter_del\" id=\""+brand[i].v_brandcd+"/brand\">"+brand[i].v_brandnm+"</a>");
					arrBrand.push("<span class='item'>"+brandObj[i].v_brandnm+"<button type='button' id=\""+brandObj[i].v_brandcd+"/brand\" class='btn_filter_del1'><i class='i-sort close'>필터조건 삭제</i></button></span>");
				}
			}
			$("#selectedItems").html(arrBrand.join("")); //필터 적용 항목 표시되는 곳
			//////////////////////////////////////////
			
			if(page.i_iNowPageNo == 1){
				$(".div_onlyApmallProd").html("");	
			}
			for ( var i = 0; i < sp_cnt; i++) {
				var $section = $form_specal.eq(0).clone(true);
				
				$section.removeClass("initProd");
				$section.addClass("onlyApamllProdBox");
				var $prodView = $(".prodView",$section);		//본품
				
				
//				$("a",$prodView).attr("href",	GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+spMstList[i].v_productcd);
				
				
				$("a",$prodView).attr("href",	"javascript:MobileBodyStart.goProductDetail('" + spMstList[i].v_productcd + "');");
				$("a",$prodView).attr("onClick","trackClicksMall('상품','모바일 스페셜 기프트^상품리스트','스페셜 기프트 상세','event5',true,'"+spMstList[i].v_productcd+"');");

				
				//				$(".detailTxt",$prodView).html(spMstList[i].v_comment);
				
				
				var prodnm = spMstList[i].v_brandnm != undefined && spMstList[i].v_brandnm != "" ? "["+ spMstList[i].v_brandnm + "] " +"<br/>" + spMstList[i].v_productnm : spMstList[i].v_productnm;
				$(".prodNm",$prodView).html(prodnm);
				$(".em_ico_like",$prodView).text(spMstList[i].n_vote_cnt);
				
				// gypark - 스페셜 기프트에서 좋아요 (하트) 수가 0이면 안보이게 해달라며..ㅎ
				/*if(spMstList[i].n_vote_cnt > 0){
					$(".info_like").show();
				}else{
					$(".info_like").hide();
				}*/
				
				/*var tagcd = "";
				if(spMstList[i].v_labelcd != undefined && spMstList[i].v_labelcd != ""){
					tagcd = "la" + spMstList[i].v_labelcd;
					$(".ico_label",$prodView).show();
				}else{
					$(".ico_label",$prodView).hide();
				}
				var tagnm = "";
				if(spMstList[i].v_tagnm != undefined && spMstList[i].v_tagnm != null){
					var tagnm_ori = spMstList[i].v_tagnm.split(" ");
					for ( var j = 0; j < tagnm_ori.length; j++) {
						tagnm += "<em>"+tagnm_ori[j].substring(0,2)+"</em>";
						tagnm += "<em>"+tagnm_ori[j].substring(2,4)+"</em>";
					}
				}
				$(".ico_label",$prodView).addClass(tagcd);
				$(".ico_label",$prodView).html(tagnm);*/
				
				var specialImg = spMstList[i].v_img_path == undefined ? "" : spMstList[i].v_img_path;
				if(specialImg == ""){
					specialImg = spMstList[i].v_img_path_over;
				}
				$(".span_productcd_spec",$section).text(spMstList[i].v_productcd);
				$(".span_thumbnail_spec",$section).text(specialImg);
				$(".span_thumbnail_155spec",$section).text(specialImg.replace("_356","_155"));
				$(".span_productnm_spec",$section).text(spMstList[i].v_productnm);
				$(".span_description_spec",$section).text(spMstList[i].v_comment);
				$(".span_optioncd_spec",$section).text(spMstList[i].v_optioncd);
				$(".span_flagsolopack_spec",$section).text(spMstList[i].v_flag_solopack);
				$(".span_brandnm_spec",$section).text(spMstList[i].v_brandnm);
				$(".span_price_spec",$section).text(spMstList[i].n_price);
				
				$(".thumbImg>img",$prodView).attr("src", specialImg);
				$(".thumbImg>img", $prodView).css({"width":"155px", "height" : "155px"});
				
				$(".thumbImg>img", $prodView).attr("onerror", "fnNoImage(this);");
				
				var n_list_price = spMstList[i].n_list_price;
				var n_price = spMstList[i].n_price;
				if(n_price != n_list_price){
					$(".sale",$prodView).html("<em>"+SetNumComma(n_list_price)+"</em>원");
					$(".sale",$prodView).show();
				}else{
					$(".sale",$prodView).hide();
				}
				$(".price",$prodView).html("<em>"+SetNumComma(n_price)+"</em>원");
				
//				$(".gradeType",$prodView).addClass("grade0"+parseInt(spMstList[i].n_single_point));
//				$(".gradeType>span",$prodView).html("평점 "+spMstList[i].n_single_point);
				
				$(".basket", $section).attr("productcd", spMstList[i].v_productcd);
				$(".basket", $section).attr("optioncd", spMstList[i].v_optioncd);
				
				$(".btn_prodShare", $section).attr("productnm", prodnm);
				$(".btn_prodShare", $section).attr("id", prodnm + "," + GLOBAL_WEB_URL+"shop/shop_prd_direct_view.do?i_sProductcd="+spMstList[i].v_productcd+","+specialImg+","+spMstList[i].v_comment);
				
				var giftcnt = 0;
				if(spSubList != null && spSubList.length > 0){
					var $giftView = $(".giftView",$section);		//사은품
					$("ul li",$giftView).not(":first").remove();
					var arrspan = [];
					arrspan.push("<span class='span_hide arrgiftprd' id='"+spMstList[i].v_productcd+"'>");
					for ( var j = 0; j < spSubList.length; j++) {
						var sub_obj = spSubList[j];
						if(sub_obj.v_productcd == spMstList[i].v_productcd){
								giftcnt ++ ;
								
								arrspan.push("<span class='span_hide i_arrthumbImg'>"+sub_obj.v_img_path+"</span>");
								arrspan.push("<span class='span_hide i_arrBrandNm'>"+sub_obj.v_brandnm+"</span>");
								arrspan.push("<span class='span_hide i_arrProductnm'>"+sub_obj.v_productnm+"</span>");
								arrspan.push("<span class='span_hide i_arrMl'>"+sub_obj.n_cnt+"</span>");
								var $sub = $("ul>li",$giftView).eq(0).clone(true);
								
								$sub.attr("style","display:''");
								
								$(".thumbImg>img",$sub).attr("src",sub_obj.v_img_path);
								
								$(".brandNm",$sub).html(sub_obj.v_brandnm);
								$(".prodNm",$sub).html(getByteString(sub_obj.v_productnm,13));
								$(".ml",$sub).html(sub_obj.n_cnt+"개");
								
								$sub.appendTo($("ul",$giftView));
						}
					}
					arrspan.push("</span>");
					$(arrspan.join("\n")).appendTo($section);
					if(giftcnt <= 3){
						$(".more_spcGift",$section).hide();
					}
				}
				
				
				var spcGift = $('.onlyApamllProdBox a.more_spcGift');
        		var specialGiftSec = $('.onlyApamllProdBox .giftView');
        		$(spcGift).click(function(){
        			var idx = $(spcGift).index($(this));
        			if(specialGiftSec.eq(idx).hasClass('open') == false){
            			$(specialGiftSec).eq(idx).addClass('open');
            			$(this).text('닫기');
        			}else{
        				$(specialGiftSec).eq(idx).removeClass('open');
            			$(this).text('더 보기');
        			}
        		});
        		$(".more_spcGift").unbind("click").click(function(event){
        			event.preventDefault();
        			
        			var idx = parseInt($(".more_spcGift").index($(this)) - 1);
        			var $gift = $(".arrgiftprd").eq(idx);
        			var len   = $(".i_arrProductnm",$gift).size();
        			var arrgift = [];
        			$("#moreGift").html("");
        			for(var i=0; i<len; i++){
        				arrgift.push("<li>");
        				arrgift.push("	<div class='thumbImg'>");
        				arrgift.push("		<img src='"+$(".i_arrthumbImg",$gift).eq(i).text()+"'>");
        				arrgift.push("	</div>");
        				arrgift.push("	<div class='prodDetail'>");
        				arrgift.push("		<p class='brandNm'>"+$(".i_arrBrandNm",$gift).eq(i).text()+"</p>");
        				arrgift.push("		<p class='prodNm'>"+$(".i_arrProductnm",$gift).eq(i).text()+"</p>");
        				arrgift.push("		<p class='ml'>"+$(".i_arrMl",$gift).eq(i).text()+" 개</p>");
        				arrgift.push("	</div>");
        			}
        			$(arrgift.join("\n")).appendTo("#moreGift");
        			
        			modalPopup("#modalPopupSpcGift");
        			
        		});
				$(".btn_prodShare", $section).unbind("click").click(function(event) {
					var idx = $(".btn_prodShare").index($(this));
					
					var productcd = $(".span_productcd_spec").eq(idx).text();
					var thumbnail = $(".span_thumbnail_spec").eq(idx).text();
					var thumbnail_155 = $(".span_thumbnail_155spec").eq(idx).text();
					var productnm = $(".span_productnm_spec").eq(idx).text();
					var description = $(".span_description_spec").eq(idx).text();
					
					 try{
                    	Kakao.init('8218ce208f43a5737824a66dc103d2c3');
       				   // 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
               		    Kakao.Link.createTalkLinkButton({
               		      container: '#kakao-link-btn',
               		      label: '[아모레퍼시픽몰] 스페셜 기프트 '+productnm,
               		      image: {
               		        src: thumbnail,
               		        width: '155',
               		        height: '155'
               		      },
               		      webButton: {
               		        text: '웹/앱으로 보기',
               		        url: 'http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd='+productcd // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
               		      }
               		    });
               		    
                      }catch(e){}
					/*$(".p_txtProdShare", "#modalPopupSpecialShare").text(productnm + " 공유");*/
					modalPopup("#modalPopupEvtShare");
					$(".kakaostory_share").click(function(event){
//						Kakao.init('8218ce208f43a5737824a66dc103d2c3');
						if(GLOBAL_MOBILE_APP == "APP") {
							var longurl = "http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd="+productcd+"&i_sFlagSnsBrowser=Y";
							var shortstr = MobileSpecialGift.fn.setShortenUrl(longurl);
							var str = "kakaostory::i_sUrl::"+shortstr+"::i_sImgPath::"+thumbnail_155+"::i_sText::"+encodeURI("[Apmall] \"아모레퍼시픽몰에서 뷰티잇템 만나보세요 :)\"")+"::i_sTitle::"+encodeURI(productnm)+"::i_sDescription::"+encodeURI(description);
							 
					    	window.location = str;
						}else{
							Kakao.Story.share({
								url: 'http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd='+productcd+"&i_sFlagSnsBrowser=Y",
								text: '[Apmall]  "아모레퍼시픽몰에서 뷰티잇템 만나보세요 :)"'
							});
						}
           		    });
                      
                      $(".btn_url").unbind("click").click(function(event){
	          	        	event.preventDefault();
	          	        	$("#i_sCopyUrl").val("http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd="+productcd);
	          	        	modalPopupClose("#modalPopupEvtShare");
	          	        	modalPopup("#modalPopupCopyUrl");
	          	        	document.getElementById("i_sCopyUrl").focus();
	          	    		document.getElementById("i_sCopyUrl").select();
          	        	});
                      $(".btn_pinit").unbind("click").click(function(event) {
	          				event.preventDefault();
	          				var arrPars = new Array();
	          				arrPars.push("url=" + encodeURI("http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd=")+productcd);
	          				arrPars.push("media=" + encodeURI(thumbnail));
	          				arrPars.push("description=" + "[아모레퍼시픽몰] "+encodeURI(productnm));
	          				
	          				window.open("//pinterest.com/pin/create/button/?" + arrPars.join("&"));
          				});
                      $(".btn_fb").unbind("click").click(function(event){
          				event.preventDefault();
          				if(GLOBAL_MOBILE_APP == "APP") {
        					var link = "http://www.amorepacificmall.com/shop/prod/shop_prd_direct_view.do?i_sProductcd="+productcd+"&i_sFlagSnsBrowser=Y";
        					var str = "facebook::i_sName::"+encodeURI(productnm)+"::i_sLink::"+link+"::i_sDescription::"+encodeURI(description)+"::i_sPicture::"+thumbnail;
        					
        					window.location = str; 
        				}else{
        					var rvo = {
        							name : productnm
        							,link : GLOBAL_WEB_URL+"shop/prod/shop_prd_direct_view.do?i_sProductcd="+productcd+"&i_sFlagSnsBrowser=Y"
        							,picture : thumbnail
        							,description : description
        					};
        					
        					MobileBodyStart.facebookShare(rvo,"Y");
        				}
          				
          			});
				});
				//$section.insertBefore($("article.specialSec>footer"));
				
				$section.show();
				$section.appendTo($(".div_onlyApmallProd"));
			}
			
			if($specialSec.eq(0).hasClass("initProd")){
				$specialSec.eq(0).remove();
			}
			
			//스페셜 기프트 스크롤처리
			MobileSpecialGift.fn.addScrollEvent();
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
		/**
		 * 스크롤 더보기를 위한 function
		 */
		addScrollEvent : function() {
			var $box = $(".onlyApamllProdBox");
			$(window).bind("scroll", function(event) {
				if(!MobileSpecialGift.isLoadingSpacialPrdList && $(window).scrollTop() >=( $(document).height() - $(window).height() - 292) && 
						parseInt(specialparam.i_iNowSpPageNo) < parseInt(specialparam.i_iTotalSpPageCnt) && parseInt(specialparam.i_iSpRecordCnt) > $box.size() &&
						$box.size() > 0) {

					if(MobileSpecialGift.isLoadingSpacialPrdList){
						return;
					}
					
					MobileSpecialGift.isLoadingSpacialPrdList = true;
					
					showScrollLoadingBox($(".div_spinArea_Only"));
					
					var PageNo = specialparam.i_iNowSpPageNo;
					specialparam.i_iNowSpPageNo = parseInt(PageNo) + 1;
					
					setTimeout(function() {
						//MobileSpecialGift.fn.getSpecialList(specialparam.i_iNowSpPageNo , 0);
						
						fn_filterItems_special(specialparam.i_iNowSpPageNo);
					}, 1000);
				}
			});
		},
		
		addbasket : function(v_productcd,v_optioncd){
			var list = [{
				productcd : v_productcd
				, optioncd : v_optioncd
				, cnt : 1
			}];

			MobileBodyStart.addUserCart({
				list : list
				, callback : function(){
				}
			});
		},
		
		addCategoryStyleEvent : function() {
			$( '.btn_iscrollNext' ).unbind("click").click( function(event) {
				event.preventDefault();
				MobileSpecialGift.fn.next();
	        });
	        
		    $( '.btn_iscrollPrev' ).unbind("click").click( function(event) {
		    	event.preventDefault();
		    	MobileSpecialGift.fn.prev();
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

		setScroll : function(leftx) {
			MobileSpecialGift.fn.scrollWidth();
		    
		    prodlistIscroller = new iScroll('prodlistIscroller', {
		        zoom:false,
		        momentum: true,
		        vScroll:false,
		        hScrollbar:false,
		        x : leftx,
		        onBeforeScrollStart:function(e){
		            e.preventDefault();
		            e.stopPropagation();
		        },
		        onScrollMove: MobileSpecialGift.fn.scrollHandler,
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
		    
		    if(leftx != 0){
		    	winW = $(window).width();
	            var $thisX =leftx.replace('px','');
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
		}
	}
};

$(document).ready(function(){
	$('#sortA_btn').attr('disabled',true);
});
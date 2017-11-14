/**
 * Coding script
 */

/**
 * 2017 리뉴얼 쿠폰 적용가능 상품목록의 이벤트 처리를 위한 Javascript
 */
var parameter = {
	i_iNowPageNo	: parseInt($('#i_iNowPageNo').val() || "1", 10),
	i_iPageSize		: parseInt($('#i_iPageSize').val() || "30", 10),
	i_iTotalPageCnt	: parseInt($('#i_iTotalPageCnt').val() || "1", 10),
	i_iRecordCnt	: parseInt($('#i_iRecordCnt').val() || "1", 10),
	i_sFlagPageInit	: "N",
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

var MobileMyApProductList = {
	name : "MobileMyApProductList",

	init : function() {
		MobileMyApProductList.fn.getPageInit();
		MobileMyApProductList.fn.addScrollEvent();
	},
	fn : {
		/**
		 * 버튼 제어를 위한 function
		 */
		addBtnEvent : function() {
			$(".prod_item a").unbind("click").click(function(event) {
				event.preventDefault();
				MobileBodyStart.goProductDetail($(this).attr("id"));
			});

			$('.sec_filter .sortA button').unbind("click").click(function(event) {
				event.preventDefault();
				$('.prod_list_box').toggleClass('album');//.attr('data-album', 'false');
			});

			$('.btn_aplike').unbind("click").click(function(event) {
				event.stopPropagation();
				alert("좋아요~!");
			});

			$('#modalOption .opt li').unbind("click").click(function(event) {
				var val = $(this).attr('id');
				var i_sFlagSort_nm = "";
				if(val=="sale"){
					i_sFlagSort_nm="판매순";
				}else if(val=="new"){
					i_sFlagSort_nm="신상품순";
				}else if(val=="point"){
					i_sFlagSort_nm="평점순";
				}else if(val=="high"){
					i_sFlagSort_nm="높은 가격 순";
				}else if(val=="low"){
					i_sFlagSort_nm="낮은 가격 순";
				}

				$("input[name='i_sFlagSort']").val(val);
				var sortHtml = "<button type='button' onclick=\"modalPopup('#modalOption');return false;\"><i class='i-sort align'>정렬방식</i><em>"+i_sFlagSort_nm+"</em></button>";
				$(".sortP").html(sortHtml);

				parameter.i_sFlagSort = val;
				MobileMyApProductList.fn.getApplicableProdList(1);
				modalPopupClose('#modalOption');return false;
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
		getApplicableProdList : function(i_iNowPageNo) {
			parameter.i_iNowPageNo  = i_iNowPageNo;
			MobileMyApProductList.fn.setParameter();

			var i_sCouponcd = parameter.i_sCouponcd;

			MobileCommon.ajax({
				url		: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_applicable_product_list_ajax.do",
				type : "POST",
				dataType : "json",
				data : parameter,
				animation : false,
				isModalEnd : false,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {

						MobileMyApProductList.isLoadingPrdList = false;
						MobileMyApProductList.fn.addBtnEvent();
						MobileMyApProductList.fn.lazyLoading();
						MobileMyApProductList.fn.setParameter();
						hideScrollLoadingBox();

						MobileMyApProductList.fn.drawApplicableProdItems(data.object);

						var result = data.object.result;
						if($.inArray(parseInt(result.page.i_iNowPageNo), parseInt(parameter.pageStack)) == -1) {
							parameter.pageStack.push(result.page.i_iNowPageNo);
						}

						// MobileMyApProductList.fn.addBtnEvent();
						hideScrollLoadingBox();
					} else {
						showMessageBox({
              				message : data.message
              			});
					}
				}, error : function() {
					MobileMyApProductList.isLoadingPrdList = false;
				}


			});
		},

		drawApplicableProdItems: function(object) {
			console.log('drawApplicableProdItems--', object);
			var page = object.result.page;
			$('#i_iNowPageNo').val(page.i_iNowPageNo);
			$('#i_iTotalPageCnt').val(page.i_iTotalPageCnt);
			$('#i_iRecordCnt').val(page.i_iRecordCnt);

			$(".sortN>").html("<em>"+page.i_iRecordCnt+"</em>");

			parameter.i_iNowPage = page.i_iNowPageNo;
			parameter.i_iTotalPageCnt = page.i_iTotalPageCnt;
			parameter.i_iRecordCnt = page.i_iRecordCnt;

			var viewProductList = object.apList;
			if(viewProductList != undefined && viewProductList.length > 0) {
				var len = viewProductList.length;
				var html = [];
				var nav = [];
				// html.push("	<ul class=\"list\">");
				for(var i = 0; i < viewProductList.length; i++) {
						html.push("<li>");
						html.push("	<div class=\"prod_item\">");
						html.push("		<a href=\"javascript:MobileBodyStart.goProductDetail('" + viewProductList[i].v_productcd + "');\" onClick=\"trackClicksMall('상품','모바일 최근본 상품^최근본 상품','최근 본 상품','event5',true,'"+viewProductList[i].v_productcd+"');\">");
						html.push("			<div class=\"thumb\">");
						html.push("				<img src=\""+viewProductList[i].v_img_web_path+"\" data-original=\""+viewProductList[i].v_img_web_path+"\" class=\"lazy img-responsive\" alt=\"상품명\" />");
						html.push("			</div>");
						html.push("			<div class=\"details\">");

						if(viewProductList[i].v_brandnm != undefined && viewProductList[i].v_brandnm != "") {
							html.push("				<p class=\"brand_nm\">"+viewProductList[i].v_brandnm+"</p>");
						}

						html.push("				<p class=\"prod_nm\">"+getByteString(viewProductList[i].v_productnm, 12)+"</p>");
						html.push("				<div class=\"price_area\">");
						html.push("					<strong class=\"price\"><span>"+SetNumComma(viewProductList[i].n_price)+"</span>원</strong>");
						if(viewProductList[i].n_list_price != viewProductList[i].n_price) {
							html.push("					<del class=\"base\"><span>"+SetNumComma(viewProductList[i].n_list_price)+"</span>원</del>");
						}
						html.push("				</div>");
						if(viewProductList[i].v_feature_tag_app != undefined && viewProductList[i].v_feature_tag_app != "") {
							html.push("				<div  class=\"tag_area\">");
							html.push("					<span class=\"tag\">"+MobileMyApProductList.fn.getProductListAppTag(viewProductList[i].v_feature_tag_app)+"</span>");//getProducListTag
							html.push("				</div>");

						}
						html.push("				<div class=\"info\">");
						html.push("					<div class=\"grade\"><i class=\"i-grade grade0"+Math.round(viewProductList[i].n_single_point)+"\"></i></div>");
						html.push("					<div class=\"review\">리뷰<em>"+SetNumComma(viewProductList[i].n_review_cnt)+"</em></div>");
						html.push("				</div>");
						html.push("				<button type=\"button\" class=\"btn_aplike\" onclick=\"alert('좋아요!');return false;\"><i class=\"i-prod heart\">좋아요</i></button>")
						html.push("			</div>");
						html.push("		</a>");
						html.push("	</div>");
						html.push("</li>");

				}
				// html.push("	</ul>");
				if(1 == page.i_iNowPageNo) {
					$(".prod_list_box .list").html(html.join(""));

				} else {
					$(html.join("")).appendTo($(".prod_list_box .list"));
				}

				// $(".prod_list_box").html(html.join(""));
			} else {
				var noData = [];

				noData.push("<div class=\"noResult\">");
				noData.push("<p>해당하는 <span class=\"ftxt\">상품이 없습니다.</span></p>");
				noData.push("</div>");

				$(".prod_list_box").html(noData.join(""));
			}

		},
		/**
		 * 스크롤 더보기를 위한 function
		 */
		addScrollEvent : function() {

			$(window).bind("scroll", function(event) {

				if(!MobileMyApProductList.isLoadingPrdList && ($(window).scrollTop() >= ($(document).height() - $(window).height() - 400) )&&
						parameter.i_iNowPageNo < parameter.i_iTotalPageCnt && parameter.i_iRecordCnt > $(".prod_item").size() &&
						$(".prod_item").size() > 0) {

					if(MobileMyApProductList.isLoadingPrdList) {
						return;
					}

					MobileMyApProductList.isLoadingPrdList = true;

					showScrollLoadingBox($(".div_spinArea"));

					var result = parameter.pageStack[0];

					for(var i in parameter.pageStack) {
						if(parseInt(result) < parseInt(parameter.pageStack[i])) {
							result = parameter.pageStack[i];
						}
					}

					parameter.i_iNowPageNo = parseInt(result) + 1;
					// parameter.i_iNowPageNo = parameter.i_iNowPageNo + 1;

					$('#i_iNowPageNo').val(parameter.i_iNowPageNo);

					parameter.i_sFlagPageInit = "N";
					setTimeout(function() {
						// MobileMyApProductList.fn.getBrandItemList();
						MobileMyApProductList.fn.getApplicableProdList(parameter.i_iNowPageNo);
					}, 1000);
				} else if(!MobileMyApProductList.isLoadingPrdList && $(window).scrollTop() == 0 &&
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
						MobileMyApProductList.fn.getShoppingProductList(parameter.i_iNowPageNo);
					}
				}
			});
		},
		setParameter : function() {
			parameter.i_sCouponcd = $("input[name='i_sCouponcd']").val();

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

			if(MobileMyApProductList.isLoadingPrdList) {
				return;
			}
			MobileMyApProductList.isLoadingPrdList = true;

			parameter.i_sFlagPageInit = "Y";
			MobileMyApProductList.fn.setParameter();
			// MobileMyApProductList.fn.getBrandItemList();
			MobileCommon.ajax({
				url		: GLOBAL_WEB_ROOT + "mobile/my/mobile_my_applicable_product_list_ajax.do",
				type : "POST",
				dataType : "json",
				data : parameter,
				animation : false,
				isModalEnd : false,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {

						MobileMyApProductList.isLoadingPrdList = false;
						MobileMyApProductList.fn.drawApplicableProdItems(data.object);

						var result = data.object.result;
						if($.inArray(parseInt(result.page.i_iNowPageNo), parseInt(parameter.pageStack)) == -1) {
							parameter.pageStack.push(result.page.i_iNowPageNo);
						}

						MobileMyApProductList.fn.addBtnEvent();
					} else {
						showMessageBox({
              				message : data.message
              			});
					}
				}, error : function() {
					showMessageBox({
										message : data.message
									});
				}


			});
		},
		getProductListAppTag(str) {
			var returnStr = "";
			if(str == "" || str == undefined) return returnStr;
			var tempStr = str.split(";");
			var len = tempStr.length;
			if (len >= 2) {
				returnStr = tempStr[0]+"," +tempStr[1];
			} else {
				returnStr = tempStr[0];
			}

			return returnStr;
		}

	}
};

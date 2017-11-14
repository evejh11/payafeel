/**
 * Coding script
 */

/**
 * 모바일 상품목록의 이벤트 처리를 위한 Javascript
 */
var parameter = {
	i_iNowPageNo	: parseInt($('#i_iNowPageNo').val() || "1", 10),
	i_iPageSize		: parseInt($('#i_iPageSize').val() || "10", 10),
	i_iTotalPageCnt	: parseInt($('#i_iTotalPageCnt').val() || "1", 10),
	i_iRecordCnt	: parseInt($('#i_iRecordCnt').val() || "1", 10),
	i_sUserid   	: $('#i_sUserid').val(),
	pageStack		: []
};

var MobileProductList = {
	name : "MobileProductList",
	
	init : function() {
		
		parameter.i_sUserid = $('#i_sUserid').val();
		
		MobileProductList.fn.getPageInit();
		MobileProductList.fn.addScrollEvent();
	},
	isLoadingPrdList : false,
	
	fn : {
		/**
		 * 버튼 제어를 위한 function
		 */
		addBtnEvent : function() {
			$(".btn_detail").unbind("click").click(function(event) {
				event.preventDefault();
				
				var id = $(this).attr("id");
				//location.href = GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd=" + id;
				open(GLOBAL_WEB_URL + "mobile/shop/mobile_shop_product_detail.do?i_sProductcd=" + id);
			});
		},		
		/**
		 * 스크롤 더보기를 위한 function
		 */
		addScrollEvent : function() {
			$(window).bind("scroll", function(event) {
				if(!MobileProductList.isLoadingPrdList && ($(window).scrollTop() >= ($(document).height() - $(window).height() - 292) )&& 
						parameter.i_iNowPageNo < parameter.i_iTotalPageCnt && parameter.i_iRecordCnt > $(".itemBox").size() &&
						$(".itemBox").size() > 0 && $(".itemBox").size() < 30) {
					
					if(MobileProductList.isLoadingPrdList) {
						return;
					}
					
					MobileProductList.isLoadingPrdList = true;
							
					showScrollLoadingBox($(".div_spinArea"));
					
					var result = parameter.pageStack[0];
					
					for(var i in parameter.pageStack) {
						if(parseInt(result) < parseInt(parameter.pageStack[i])) {
							result = parameter.pageStack[i];
						}
					}
					
					parameter.i_iNowPageNo = parseInt(result) + 1;
					
					setTimeout(function() {
						MobileProductList.fn.getProductList(parameter.i_iNowPageNo);
					}, 1000);
				} else if(!MobileProductList.isLoadingPrdList && $(window).scrollTop() == 0 &&
					parameter.i_iNowPageNo > 1 && parameter.i_iRecordCnt > 0 &&
					$(".itemBox").size() > 0 && $(".itemBox").size() < 30) {
					showScrollLoadingBox($(".div_spinArea"));
					
					var result = parameter.pageStack[0];
					for(var i in parameter.pageStack) {
						if(parseInt(result) > parseInt(parameter.pageStack[i])) {
							result = parameter.pageStack[i];
						}
					}
					
					if(parseInt(result) > 1) {
						parameter.i_iNowPage = parseInt(result) - 1;						
						MobileProductList.fn.getProductList(parameter.i_iNowPageNo);
					}
				}
			});
		},
		
		/**
		 * 최초 페이지 로딩 시 실행 function
		 */
		getPageInit : function() {
			if(MobileProductList.isLoadingPrdList) {
				return;
			}
			
			MobileProductList.isLoadingPrdList = true;
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/ad/mobile_ad_st0001_view_ajax.do",
				type : "POST",
				dataType : "json",
				data : parameter,
				animation : true,
				isModalEnd : true,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						
						MobileProductList.isLoadingPrdList = false;
						MobileProductList.fn.setShopProductList(data.object);
												
						var shop = data.object.shopprd;
						if($.inArray(parseInt(shop.page.i_iNowPageNo), parseInt(parameter.pageStack)) == -1) {
							parameter.pageStack.push(shop.page.i_iNowPageNo);
						}
						
						MobileProductList.fn.addBtnEvent();
												
					} else {
						alert(data.message);
					}
				}
			});
		},
		
		/**
		 * 상품목록 ajax function
		 * @param i_iNowPageNo : 현재 페이지
		 */
		getProductList : function(i_iNowPageNo) {
			parameter.i_iNowPageNo  = i_iNowPageNo;
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/ad/mobile_ad_st0001_view_ajax.do",
				type : "POST", 
				dataType : "json",
				data : parameter,
				animation : false,
				isModalEnd : false,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						MobileProductList.isLoadingPrdList = false;
						MobileProductList.fn.setShopProductList(data.object);
						
						
						var shop = data.object.shopprd;
						if($.inArray(parseInt(shop.page.i_iNowPageNo), parseInt(parameter.pageStack)) == -1) {
							parameter.pageStack.push(shop.page.i_iNowPageNo);
						}
						
						MobileProductList.fn.addBtnEvent();
						hideScrollLoadingBox();
					} else {
						showMessageBox({
              				message : data.message
              			});
					}
				}, error : function() {
					MobileProductList.isLoadingPrdList = false;
				}
			});
		},
		/**
		 * 리턴된 데이터를 이용해 화면에 뿌리는 function
		 * @param object : ajax 리턴된 데이터
		 */
		setShopProductList : function(object) {
			var arrHtml = [];
			
			var list = object.shopprd.list;
			var page = object.shopprd.page;
						
			$('#i_iNowPageNo').val(page.i_iNowPageNo);
			$('#i_iTotalPageCnt').val(page.i_iTotalPageCnt);
			$('#i_iRecordCnt').val(page.i_iRecordCnt);
								
			parameter.i_iNowPage = page.i_iNowPageNo;
			parameter.i_iTotalPageCnt = page.i_iTotalPageCnt;
			parameter.i_iRecordCnt = page.i_iRecordCnt;
						
			if(list != undefined && list.length > 0) {
				for(var i=0; i<list.length; i++) {
					var row = list[i];
					
					arrHtml.push("		<li class=\"itemBox\">");
					arrHtml.push("			<a href=\"#\" class=\"btn_detail\" id=\""+row.v_productcd+"\">");					
					arrHtml.push("				<div class=\"thumbImg\">");
					
					if (row.n_list_price != 0 && row.n_list_price > row.n_price) {
						
						var salePer = parseInt((parseInt(row.n_list_price) - parseInt(row.n_price)) / parseInt(row.n_list_price) * 100);
						
						arrHtml.push("					<div class=\"icoSale\" style=\"background:#9848e2;\">");
						arrHtml.push("						<p><em>" + salePer + "</em>%</p>SALE");
						arrHtml.push("					</div>");						
					}
					else if (row.n_plus_evt_give_cnt > 0) {
						arrHtml.push("					<div class=\"icoSale\" style=\"background:#9848e2;\">");
						arrHtml.push("						<p><em>" + row.n_plus_evt_buy_cnt + "+" + row.n_plus_evt_give_cnt + "</em></p>OFFER");
						arrHtml.push("					</div>");						
					}					
					
					arrHtml.push("					<img src=\""+row.v_img_web_path+"\" alt=\"\">");
					arrHtml.push("				</div>");
					arrHtml.push("				<div class=\"prodDetail\">");
					arrHtml.push("					<p class=\"brandNm ellipsis\">"+row.v_brandnm+"</p>");
					arrHtml.push("					<p class=\"prodNm\">"+row.v_productnm+"</p>");
					arrHtml.push("					<p class=\"bar\"></p>");
					arrHtml.push("					<p class=\"priceZone\">");			
					
					if (row.n_list_price != 0 && row.n_list_price > row.n_price) {
						arrHtml.push("						<span class=\"sale\"><em>" + SetNumComma(row.n_list_price) + "</em>원</span>");
						arrHtml.push("						<span class=\"price\" style=\"color: #9848e2;\"><em>" + SetNumComma(row.n_price) + "</em>원</span>");
					}
					else {
						arrHtml.push("						<span class=\"price\" style=\"color: #9848e2;\"><em>" + SetNumComma(row.n_price) + "</em>원</span>");
					}
					arrHtml.push("					<p class=\"prd_info\">" + getByteString(row.v_comment, 45) + "</p>");					
					arrHtml.push("					</p>");
					arrHtml.push("				</div>");
					arrHtml.push("			</a>");
					arrHtml.push("		</li>");
				}
				
				if(1 == page.i_iNowPageNo) {
					$(".personalProdList").html(arrHtml.join(""));
					
				} else {
					$(".personalProdList").append(arrHtml.join(""));
				}
			}
			
		}
	}
};
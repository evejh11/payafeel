
var MobileShopLatelyList = {
	name : "MobileShopLatelyList",
	init : function() {
		MobileShopLatelyList.fn.getLatelyProductList();
		MobileShopLatelyList.fn.addBtnEvent();
	},
	fn : {
		addBtnEvent : function() {
			// 최근 본 상품
            window.latelyProdSwipe = new Swipe(document.getElementById('latelyProdSwipe'), {
                continuous: true,
                stopPropagation: true,
                callback: function(event, element) {
                	 var idx = setNaviIndex($("#latelyProd-nav > span"), event);
                    $("#latelyProd-nav > span").removeClass().eq(idx).addClass("active");
                }
            });

            // 추천상품
            window.recommendProdSwipe = new Swipe(document.getElementById('recommendProdSwipe'), {
                continuous: true,
                stopPropagation: true,
                callback: function(event, element) {
                	 var idx = setNaviIndex($("#recommendProd-nav > span"), event);
                    $("#recommendProd-nav > span").removeClass().eq(idx).addClass("active");
                }
            });
		},
		getLatelyProductList : function() {
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_product_lately_list_ajax.do"
				, type : "POST"
				, dataType : "json"
				, animation : false
				, isModalEnd : false
				, async : false
				, success : function(data, textStatus) {
					if(data.status == "succ") {
						// MobileShopLatelyList.fn.setLatelyProductList(data.object);
						MobileShopLatelyList.fn.drawLatelyProductList(data.object);
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
				, error : function() {
					showMessageBox({
						message : data.message
					});
				}
			});
		},
		drawLatelyProductList : function(object) {
			var viewProductList = object.viewProductList;
			var recomList = object.latelyRecomList;
			var listSize = viewProductList.length;
			$(".sortN>em").text(listSize);

			if(viewProductList != undefined && listSize > 0) {
				var len = viewProductList.length;
				var html = [];
				var nav = [];
				html.push("	<ul class=\"list\">");
				for(var i = 0; i < listSize; i++) {
					html.push("<li>");
					html.push("	<div class=\"prod_item\">");
					html.push("		<a href=\"javascript:MobileBodyStart.goProductDetail('" + viewProductList[i].v_productcd + "');\" onClick=\"trackClicksMall('상품','모바일 최근본 상품^최근본 상품','최근 본 상품','event5',true,'"+viewProductList[i].v_productcd+"');\">");
					html.push("			<div class=\"thumb\">");
					html.push("				<img src=\""+viewProductList[i].v_img_path+"\" data-original=\""+viewProductList[i].v_img_path+"\" class=\"lazy img-responsive\" alt=\"상품명\" />");
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
				html.push("	</ul>");

				$(".prod_list_box").html(html.join(""));
			} else {
				var noData = [];

				noData.push("<div class=\"noResult\">");
				noData.push("<p>해당하는 <span class=\"ftxt\">상품이 없습니다.</span></p>");
				noData.push("</div>");

				$(".prod_list_box").html(noData.join(""));
			}

			if(recomList != undefined && recomList.length > 0) {
				var len = recomList.length;
				var html = [];
				var nav = [];
				html.push("	<ul class=\"list_prod\">");
				for(var i = 0; i < recomList.length; i++) {
					if(i < 5) {
						html.push("<li>");
						html.push("	<div class=\"prod_item\">");
						html.push("		<a href=\"javascript:MobileBodyStart.goProductDetail('" + recomList[i].v_productcd + "');\" onClick=\"trackClicksMall('상품','모바일 최근본 상품^추천상품','개인화 추천상품','event5',true,'"+recomList[i].v_productcd+"');\">");
						html.push("			<div class=\"thumb\">");
						html.push("				<img src=\""+recomList[i].v_img_path+"\" data-original=\""+recomList[i].v_img_path+"\" class=\"lazy img-responsive\" alt=\"상품명\" />");
						html.push("			</div>");
						html.push("			<div class=\"details\">");

						if(recomList[i].v_brandnm != undefined && recomList[i].v_brandnm != "") {
							html.push("				<p class=\"brand_nm\">"+recomList[i].v_brandnm+"</p>");
						}

						html.push("				<p class=\"prod_nm\">"+getByteString(recomList[i].v_productnm, 12)+"</p>");
						html.push("				<div class=\"price_area\">");
						html.push("					<strong class=\"price\"><span>"+SetNumComma(recomList[i].n_price)+"</span>원</strong>");
						if(recomList[i].n_list_price != recomList[i].n_price) {
							html.push("					<del class=\"base\"><span>"+SetNumComma(recomList[i].n_list_price)+"</span>원</del>");
						}
						html.push("				</div>");
						html.push("				<div class=\"info\">");
						html.push("					<div class=\"grade\"><i class=\"i-grade grade0"+Math.round(recomList[i].n_single_point)+"\"></i></div>");
						html.push("					<div class=\"review\">리뷰<em>"+SetNumComma(recomList[i].n_review_cnt)+"</em></div>");
						html.push("				</div>");
						html.push("			</div>");
						html.push("		</a>");
						html.push("	</div>");
						html.push("</li>");
					}

				}
				html.push("	</ul>");
				html.push("<a href=\""+GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_lately_list.do\" class=\"btn_more_item\"><i class=\"i-prod plus\"></i>더보기</a>");


				$("#sec_apbox_recome>.scrlable_x").html(html.join(""));
			} else {
				var noData = [];

				noData.push("<div class=\"noResult\">");
				noData.push("<p>해당하는 <span class=\"ftxt\">상품이 없습니다.</span></p>");
				noData.push("</div>");

				$("#sec_apbox_recome>.scrlable_x").html(noData.join(""));
			}
		},

		setLatelyProductList : function(object) {
			var viewProductList = object.viewProductList;
			var recomList = object.latelyRecomList;

			if(viewProductList != undefined && viewProductList.length > 0) {
				var len = viewProductList.length;
				var html = [];
				var nav = [];
				for(var i=0; i<viewProductList.length; i++) {
					if(i % 3 == 0) {
						html.push("<div class=\"prodAlbumType v2\">");
						html.push("	<ul>");
					}
					html.push("<li>");
					html.push("	<a href=\"javascript:MobileBodyStart.goProductDetail('" + viewProductList[i].v_productcd + "');\" onClick=\"trackClicksMall('상품','모바일 최근본 상품^최근본 상품','최근 본 상품','event5',true,'"+viewProductList[i].v_productcd+"');\">");
					html.push("		<div class=\"thumbImg\">");
					html.push("			<img src=\""+viewProductList[i].v_img_path+"\" alt=\"\" />");
					html.push("		</div>");
					html.push("		<div class=\"prodDetail\">");

					if(viewProductList[i].v_brandnm != undefined && viewProductList[i].v_brandnm != "") {
						html.push("			<p class=\"brandNm\">"+viewProductList[i].v_brandnm+"</p>");
					}

					html.push("			<p class=\"prodNm\">"+getByteString(viewProductList[i].v_productnm, 12)+"</p>");
					html.push("			<p class=\"priceZone\">");
					if(viewProductList[i].n_list_price != viewProductList[i].n_price) {
						html.push("				<span class=\"sale\"><em>"+SetNumComma(viewProductList[i].n_list_price)+"</em>원</span>");
					}
					html.push("				<span class=\"price\"><em>"+SetNumComma(viewProductList[i].n_price)+"</em>원</span>");
					html.push("			</p>");
					html.push("			<div class=\"prodEvalu\">");
					html.push("				<span class=\"gradeType2 grade0"+Math.round(viewProductList[i].n_single_point)+"\"><span class=\"hide\">평점 "+viewProductList[i].n_single_point+"</span></span>");
					html.push("				<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+SetNumComma(viewProductList[i].n_review_cnt)+")</span>");
					html.push("			</div>");
					html.push("		</div>");
					html.push("	</a>");
					html.push("</li>");

					if(i % 3 == 2 || i == len-1) {
						html.push("	</ul>");
						html.push("</div>");
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


							nav.push("<span "+active+" style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
						}
					}

					$("#latelyProd-nav").html(nav.join(""));
				}

				$("#latelyProdSwipe>.recommendProd-wrap").html(html.join(""));
			} else {
				var noData = [];

				noData.push("<div class=\"noResult\">");
				noData.push("<p>해당하는 <span class=\"ftxt\">상품이 없습니다.</span></p>");
				noData.push("</div>");

				$("#latelyProdSwipe>.recommendProd-wrap").html(noData.join(""));
			}

			if(recomList != undefined && recomList.length > 0) {
				var len = recomList.length;
				var html = [];
				var nav = [];
				for(var i=0; i<recomList.length; i++) {
					if(i % 3 == 0) {
						html.push("<div class=\"prodAlbumType v2\">");
						html.push("	<ul>");
					}

					html.push("<li>");
//					html.push("	<a href=\""+GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+recomList[i].v_productcd+"&rccode=m_recent\">");
					html.push("	<a href=\"javascript:MobileBodyStart.goProductDetail('" + recomList[i].v_productcd + "', 'rccode=m_recent');\" onClick=\"trackClicksMall('상품','모바일 최근본 상품^추천상품','개인화 추천상품','event5',true,'"+recomList[i].v_productcd+"');\">");
					html.push("		<div class=\"thumbImg\">");
					html.push("			<img src=\""+recomList[i].v_img_path+"\" alt=\"\" />");
					html.push("		</div>");
					html.push("		<div class=\"prodDetail\">");
					if(recomList[i].v_brandnm != undefined && recomList[i].v_brandnm != "") {
						html.push("			<p class=\"brandNm\">"+recomList[i].v_brandnm+"</p>");
					}
					html.push("			<p class=\"prodNm\">"+getByteString(recomList[i].v_productnm, 12)+"</p>");
					html.push("			<p class=\"priceZone\">");
					if(recomList[i].n_list_price != recomList[i].n_price) {
						html.push("				<span class=\"sale\"><em>"+SetNumComma(recomList[i].n_list_price)+"</em>원</span>");
					}
					html.push("				<span class=\"price\"><em>"+SetNumComma(recomList[i].n_price)+"</em>원</span>");
					html.push("			</p>");
					html.push("			<div class=\"prodEvalu\">");
					html.push("				<span class=\"gradeType2 grade0"+recomList[i].n_single_point+"\"><span class=\"hide\">평점 "+recomList[i].n_single_point+"</span></span>");
					html.push("				<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+SetNumComma(recomList[i].n_review_cnt)+")</span>");
					html.push("			</div>");
					html.push("		</div>");
					html.push("	</a>");
					html.push("</li>");

					if(i % 3 == 2 || i == len-1) {
						html.push("	</ul>");
						html.push("</div>");
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


							nav.push("<span "+active+" style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
						}
					}

					$("#recommendProd-nav").html(nav.join(""));
				}

				$("#recommendProdSwipe>.recommendProd-wrap").html(html.join(""));
			} else {
				var noData = [];

				noData.push("<div class=\"noResult\">");
				noData.push("<p>해당하는 <span class=\"ftxt\">상품이 없습니다.</span></p>");
				noData.push("</div>");

				$("#recommendProdSwipe>.recommendProd-wrap").html(noData.join(""));
			}
		}
	}
};

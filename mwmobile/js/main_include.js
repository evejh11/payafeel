var cnt = 0;
var	MobileMainInclude = {
	name : "MobileMainInclude",

	init : function() {

		MobileMainInclude.fn.getPageInit();
		MobileMainInclude.fn.getCartList();
		// var id = $("input[name='i_sPeriod']").val();
		var id = 'all';
		MobileMainInclude.fn.getCouponBookList(id);
		MobileMainInclude.fn.getLatelyProductList();

	},

	fn : {
		getPageInit : function() {
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/mobile_main_my_info_ajax.do",
				type : "POST",
				dataType : "json",
				animation : false,
				async : false,
				success : function(data, textStatus) {
					if(data.status == "succ") {
						MobileMainInclude.fn.setUserInfo(data.object);
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},
		setUserInfo : function(object) {
			var usernm = object.usernm;
			var year = object.year;
			var month = object.month;
			$(".p_dateArea").text(year + "년 " +month+"월 기준");

			var userinfo = object.user;
			if (userinfo.userInfo === null) return;
			var levelnm = userinfo.userInfo.v_levelnm;

			var namehtml = usernm+"님의 뷰티포인트를 확인하세요";
			var nicknameHtml = "반가워요 "+userinfo.userInfo.v_nickname+"님";
			$(".sec_mypoint>.h_sec").text("반가워요 "+usernm+"님");
			$(".user").text(namehtml);

			var couponCnt = userinfo.couponCnt;
			$(".em_couponCnt").text(SetNumComma(couponCnt));

			var totalGiftCardPrice = object.totalGiftCardPrice;
			$(".em_giftcard").text(SetNumComma(totalGiftCardPrice));

			$(".dd_user_mpoint>em").text(SetNumComma(userinfo.userInfo.n_mpoint));
			$(".em_bpoint_grade").text(object.bpoint.v_bpoint_grade);
			$(".dd_extinc_mpoint>").text(SetNumComma(userinfo.userInfo.n_loss_mpoint));

			$(".dd_user_bpoint>em").text(SetNumComma(object.bpoint.n_bpoint));
			$(".dd_user_bpoint>strong").text(SetNumComma(object.bpoint.n_bpoint)+"p");
			$(".dd_user_lose_bpoint>em").text(SetNumComma(object.bpoint.n_lose_point));

		},

		getCouponBookList: function (id){
			var OpenChannel = "";
			if(GLOBAL_MOBILE_APP == "APP"){
				OpenChannel = "i_sFlagAppOpen";
			}else{
				OpenChannel = "i_sFlagMobileOpen";
			}
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT+"mobile/my/mobile_my_coupon_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: {
					OpenChannel : "Y",
					"i_sPeriod" : id
				},
				animation	: false,
				success		: function(data, textStatus) {
					if (data.status === 'succ') {
						 MobileMainInclude.fn.drawCouponList(data.object);
					} else {
						showMessageBox({
							message : data.message
						});
					}

				}

			});
		},

		drawCouponList: function(obj) {
			var couponList = obj.CList;
			var user_id= $("input[name='s_userid']").val();
			var i_sTime = $("input[name='i_sTime']").val();
			if(couponList != undefined && couponList.length > 0) {
				var len = couponList.length;
				var html = [];
				html.push("	<ul class=\"list_coup\">");
				for(var i = 0; i < len; i++) {
					var couponObj = couponList[i];
					// if(i < 5 && couponObj.v_period =="NOW") {
						var sDate = new Date(i_sTime.substr(0, 4), i_sTime.substr(4,2), i_sTime.substr(6, 2));
						var eDate = new Date(couponObj.v_en_dt.substr(0,4), couponObj.v_en_dt.substr(4,2), couponObj.v_en_dt.substr(6, 2));
						var interval = eDate - sDate;
						var day = 1000*60*60*24;
						var remainTime = parseInt(interval / day)+1;
						html.push("<li>");
						html.push("	<div class=\"tmp-coupon\">");
						html.push("		<p class=\"cpnm\">"+couponObj.v_couponnm+"</p>");
						if (couponObj.v_flag_pay_money =="M") {
							html.push("		<p class=\"sale\"><strong>"+SetNumComma(couponObj.n_pay_money)+"</strong></p>");
						} else if(couponObj.v_flag_pay_money =="P") {
							html.push("		<p class=\"sale\"><strong>"+couponObj.n_pay_money+"</strong>%</p>");
						} else if(couponObj.v_typecd =="0003") {
							html.push("		<p class=\"sale\"><strong>무료배송</strong></p>");
						} else if(couponObj.v_typecd =="0005") {
							html.push("		<p class=\"sale\"><strong>사은품쿠폰</strong></p>");
						}
						if (couponObj.n_prd_min_money >= 1) {
							html.push("		<p class=\"cond\">"+couponObj.n_prd_min_money+"원 결재시</p>");
						} else {
							html.push("		<p class=\"cond\">"+couponObj.n_min_money+"원 결재시</p>");
						}
						html.push("		<p class=\"period\">"+changeDatePatten(couponObj.v_en_dt)+"<em>("+remainTime+"일남음)</em></p>");
						html.push("	</div>");
						if(couponObj.v_typecd =="0001" || couponObj.v_typecd=="0005"|| couponObj.v_typecd=="0006"){
							if(couponObj.v_typecd == "0005" && couponObj.v_free_product > 0){
								html.push("	<a href='#' class=\"btn_go v4\" id='"+couponObj.v_couponcd+"'>사은품 확인<i class=\"icon icon-arr-r\"></i></a>");
							}else{
								if(couponObj.v_ex_brand >0 || couponObj.v_ex_product > 0 || couponObj.v_free_product > 0 || couponObj.v_ap_product > 0){
									// html.push("	<a href='#' class=\"btn_go v4\" id='"+couponObj.v_couponcd+"'>할인 가능한 상품 <i class=\"icon icon-arr-r\"></i></a>");
									html.push("	<a href=\""+GLOBAL_WEB_URL+"mobile/my/mobile_my_applicable_product_list.do?i_sCouponcd="+couponObj.v_couponcd+"\" class=\"btn_go\" id='"+couponObj.v_couponcd+"'>할인 가능한 상품 <i class=\"icon icon-arr-r\"></i></a>");
								}
							}
						}

						html.push("</li>");
						cnt++;
					// }
				}
				html.push("	</ul>");
			}


			if(cnt > 0) {
				$("#sec_apbox_coupon>.scrlable_x").html(html.join(""));
				cnt = 0;
			} else {
				var noData = [];

				noData.push("<div class=\"nodata\">");
				noData.push("	<p class=\"sp_bg s13\">해당하는 쿠폰이 없습니다.</p>");
				noData.push("</div>");

				$("#sec_apbox_coupon>.scrlable_x").html(noData.join(""));
			}

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
						MobileMainInclude.fn.drawLatelyProductList(data.object);
						//MobileMainInclude.fn.drawQuickLatelyProductList(data.object);
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

			if(viewProductList != undefined && viewProductList.length > 0) {
				var len = viewProductList.length;
				var html = [];
				var nav = [];
				html.push("	<ul class=\"list_prod\">");
				for(var i = 0; i < viewProductList.length; i++) {
					if(i < 5) {
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
						html.push("			</div>");
						html.push("		</a>");
						html.push("	</div>");
						html.push("</li>");
					}

				}
				html.push("	</ul>");
				html.push("<a href=\""+GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_lately_list.do\" class=\"btn_more_item\"><i class=\"i-prod plus\"></i>더보기</a>");

				$("#sec_apbox_view>.scrlable_x").html(html.join(""));
			} else {
				var noData = [];

				noData.push("<div class=\"noResult\">");
				noData.push("<p>해당하는 <span class=\"ftxt\">상품이 없습니다.</span></p>");
				noData.push("</div>");

				$("#sec_apbox_view>.scrlable_x").html(noData.join(""));
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

		drawQuickLatelyProductList : function(object) {
			var viewProductList = object.viewProductList;
			var recomList = object.latelyRecomList;

			if(viewProductList != undefined && viewProductList.length > 0) {
				var len = viewProductList.length;
				var html = [];
				var nav = [];
				html.push("	<ul class=\"list_recent\">");
				for(var i = 0; i < viewProductList.length; i++) {
					var viewDate = viewProductList[i].v_reg_dtm.substr(4, 4);
					if(i < 8) {
						html.push("<li>");
						html.push("	<a href=\"javascript:MobileBodyStart.goProductDetail('" + viewProductList[i].v_productcd + "');\" onClick=\"trackClicksMall('상품','모바일 최근본 상품^최근본 상품','최근 본 상품','event5',true,'"+viewProductList[i].v_productcd+"');\">");
						html.push("		<img src=\""+viewProductList[i].v_img_path+"\" data-original=\""+viewProductList[i].v_img_path+"\" class=\"lazy img-responsive\" alt=\"상품명\" />");
						html.push("		<p class='date'>" +viewProductList[i].v_reg_dtm.substr(4, 2) + "."+viewProductList[i].v_reg_dtm.substr(6, 2)+"</p>");
						html.push("	</a>");
						html.push("</li>");
					}
				}
				html.push("	</ul>");

				$("#recentLst>.scrlable_x").html(html.join(""));
			} else {
				var noData = [];

				noData.push("<div class=\"noResult\">");
				noData.push("<p>해당하는 <span class=\"ftxt\">상품이 없습니다.</span></p>");
				noData.push("</div>");

				$("#recentLst>.scrlable_x").html(noData.join(""));
			}
		},

		getCartList : function() {
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/cart/mobile_cart_cart_list_ajax.do"
				, type : "POST"
				, dataType : "json"
				, data : {i_sFlagWish : "L"}
				, animation : false
				, isModalEnd : false
				, async : false
				, success : function(data, textStatus, jqXHR) {
					if(data.status == "succ") {
						var productList = data.object.productList;
						var tempArr = [];
						productList.filter(
							function (prod) {
								if (prod.v_typecd == 0001) {
									tempArr.push(prod);
								}
								return tempArr;
							}
						);
						var cartProducts = tempArr;

						if(cartProducts != undefined && cartProducts.length > 0) {
							var len = cartProducts.length;
							var html = [];
							var nav = [];
							html.push("	<ul class=\"list_prod\">");
							for(var i = 0; i < cartProducts.length; i++) {
								if(i < 5) {
									html.push("<li>");
									html.push("	<div class=\"prod_item\">");
									html.push("		<a href=\"javascript:MobileBodyStart.goProductDetail('" + cartProducts[i].v_productcd + "');\" onClick=\"trackClicksMall('상품','모바일 최근본 상품^최근본 상품','최근 본 상품','event5',true,'"+cartProducts[i].v_productcd+"');\">");
									html.push("			<div class=\"thumb\">");
									html.push("				<img src=\""+cartProducts[i].v_img_web_path+"\" data-original=\""+cartProducts[i].v_img_web_path+"\" class=\"lazy img-responsive\" alt=\"상품명\" />");
									html.push("			</div>");
									html.push("			<div class=\"details\">");

									if(cartProducts[i].v_brandnm != undefined && cartProducts[i].v_brandnm != "") {
										html.push("				<p class=\"brand_nm\">"+cartProducts[i].v_brandnm+"</p>");
									}

									html.push("				<p class=\"prod_nm\">"+getByteString(cartProducts[i].v_productnm, 12)+"</p>");
									html.push("				<div class=\"price_area\">");
									html.push("					<strong class=\"price\"><span>"+SetNumComma(cartProducts[i].n_sale_price)+"</span>원</strong>");
									if(cartProducts[i].n_sale_price != cartProducts[i].n_price) {
										html.push("					<del class=\"base\"><span>"+SetNumComma(cartProducts[i].n_price)+"</span>원</del>");
									}
									html.push("				</div>");
									// SHOP_PROD_POINT_STATS 테이블 정보 없음
									html.push("				<div class=\"info\">");
									html.push("					<div class=\"grade\"><i class=\"i-grade grade0"+Math.round(cartProducts[i].n_single_point)+"\"></i></div>");
									html.push("					<div class=\"review\">리뷰<em>"+SetNumComma(cartProducts[i].n_review_cnt)+"</em></div>");
									html.push("				</div>");
									html.push("			</div>");
									html.push("		</a>");
									html.push("	</div>");
									html.push("</li>");
								}

							}
							html.push("	</ul>");
							html.push("<a href=\""+GLOBAL_WEB_URL+"mobile/cart/mobile_cart_cart_list.do\" class=\"btn_more_item\"><i class=\"i-prod plus\"></i>더보기</a>");

							$("#sec_apbox_cart>.scrlable_x").html(html.join(""));
						} else {
							var noData = [];

							noData.push("<div class=\"noResult\">");
							noData.push("<p>해당하는 <span class=\"ftxt\">상품이 없습니다.</span></p>");
							noData.push("</div>");

							$("#sec_apbox_cart>.scrlable_x").html(noData.join(""));
						}

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
		}

	}

};

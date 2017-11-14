var cnt = 0;
var	MobileQuickLately = {
	name : "MobileQuickLately",

	init : function() {
		MobileQuickLately.fn.getLatelyProductList();
	},

	fn : {
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
						MobileQuickLately.fn.drawQuickLatelyProductList(data.object);
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
		}


	}

};

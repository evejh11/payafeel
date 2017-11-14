/**
 * 모바일 출석체크 화면의 이벤트 처리를 위한 Javascript
 */
var	Mobilebrandweek = {
		name : "Mobilebrandweek",

		init : function() {
			Mobilebrandweek.fn.setSubMenuChange();
			Mobilebrandweek.fn.getPageInit();
		},

		fn : {
				setSubMenuChange : function() {
					var select_input = $('div.selectList>ul>li>input[type=radio]');
					select_input.click(function() {
						var todayMonth = $("#todayMonth").val();
						if($(this).val() == "mobile_event_price_gift"){
							location.href  = GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd=EVT" + todayMonth + "gifts"
						}else{
							location.href	= GLOBAL_WEB_URL+"mobile/event/" + $(this).val() + ".do";
						}
					});
				},

				getPageInit : function () {
					MobileCommon.ajax({	
						url			: "/mobile/event/mobile_event_brand_week_ajax.do",
						type		: "POST",
						dataType	: "json",
						data		: { 
							
						},
						animation	: false,
						success		: function (data, textStatus) {
							
							if("succ"== data.status){
								
								var obj = data.object.getbrandweek.rvo;
								var list = data.object.getbrandweek.list;
								var seller = data.object.getbrandweek.toplist;
								
								var arrr = [];
								
								arrr.push("<div class='banner'><img src='"+obj.v_group_img_path+"' alt='' /></div>");
								
								if (list != undefined) {
									arrr.push("<div class='ttlbox'>");
									arrr.push("		<h1 class='title'>"+list[0].v_brandnm+" 신상품</h1>");
									arrr.push("</div>");
								}
								
								$(".div_head").html(arrr.join(""));       

								if(list != undefined && 3 > 0) {
									var arrr2 = [];
									for(var i=0; i < list.length; i++){
										arrr2.push("	<li>");
//										MobileBodyStart.goProductDetail($(this).attr("id"));
										arrr2.push("		<a href=\"javascript:MobileBodyStart.goProductDetail('"+list[i].v_productcd+"');\">");
										arrr2.push("	 		<div class='thumbImg'>");
										arrr2.push("	 			<img src='"+list[i].v_img_web_path+"' alt=''>");
										arrr2.push("		    </div>");
										arrr2.push("			<div class='prodDetail'>");
									
										if(list[i].v_brandnm != "" && list[i].v_brandnm != undefined) {
											arrr2.push("				<p class'brandNm ellipsis'>"+list[i].v_brandnm+"</p>");
										}
										arrr2.push("		  		<p class='prodNm ellipsis'>"+getByteString(list[i].v_productnm, 14)+"</p>");
										arrr2.push("		 		<p class='priceZone'>");
										if(list[i].n_list_price != list[i].n_price) {
											arrr2.push("		 			<span class='sale'><em>"+SetNumComma(list[i].n_list_price)+"</em>원</span>");
										}
										arrr2.push("		 			<span class='price'><em>"+SetNumComma(list[i].n_price)+"</em>원</span>");
										arrr2.push("	  			</p>");
										arrr2.push("	 			<div class='prodEvalu'>	");
										arrr2.push("	  				<span class='gradeType grade0"+Math.round(list[i].n_single_point)+"'><span class='hide'>평점 "+list[i].n_single_point+"</span></span>	");
										arrr2.push("					<span class='replyCount'><span class='hide'>댓글수</span>("+SetNumComma(list[i].n_review_cnt)+")</span>");
										arrr2.push("				</div>");
										arrr2.push("				<span class='stateArea'>");
										if(list[i].v_statuscd == "0002" ){
											arrr2.push("	 				<span class='ico_state st1'>품절</span>");
										}
										arrr2.push("	 			</span>	");
										arrr2.push("	     	</div>	");
										arrr2.push("	  </a>	");
										arrr2.push("</li>	");
									}
									$(".div_product").html(arrr2.join(""));       
								}
										
										
								if(seller != undefined && seller.length > 0) {
									
									var arrr3=[];
									
									
									for(var i=0; i < seller.length; i++){
										arrr3.push("<li>");
										arrr3.push(" 	<a href=\"javascript:MobileBodyStart.goProductDetail('"+seller[i].v_productcd+"');\">");
										arrr3.push("		<div class='thumbImg'>");
										arrr3.push(" 			<img src='"+seller[i].v_img_web_path+"' alt=''>");
										arrr3.push("		</div>");
										arrr3.push("		<div class='prodDetail'>");
										if(seller[i].v_brandnm != "" && seller[i].v_brandnm != undefined) {
										arrr3.push("  			<p class='brandNm ellipsis'>"+seller[i].v_brandnm+"</p>");
										}
										arrr3.push("			<p class='prodNm ellipsis'>"+getByteString(seller[i].v_productnm, 14)+"</p>");
										arrr3.push(" 			<p class='priceZone'>");
										if(seller[i].n_list_price != seller[i].n_price) {
										arrr3.push("				<span class='sale'><em>"+SetNumComma(seller[i].n_list_price)+"</em>원</span>");
										}
										arrr3.push(" 				<span class='price'><em>"+SetNumComma(seller[i].n_price)+"</em>원</span>");
										arrr3.push(" 			</p>");
										arrr3.push("  			<div class='prodEvalu'>");
										arrr3.push("				<span class='gradeType grade0"+Math.round(seller[i].n_single_point)+"'><span class='hide'>평점 "+seller[i].n_single_point+"</span></span>");
										arrr3.push("   				<span class='replyCount'><span class='hide'>댓글수</span>("+SetNumComma(seller[i].n_review_cnt)+")</span>");
										arrr3.push("  			</div>");
										arrr3.push("   			<span class='stateArea'>");
										if(seller[i].v_statuscd == "0002" ){
										arrr3.push("   				<span class='ico_state st1'>품절</span>");
										}
										arrr3.push(" 			</span>");
										arrr3.push(" 		</div>");
										arrr3.push(" 	</a>");
										arrr3.push("</li> ");
									}
									$(".div_title").text(seller[0].v_brandnm +' 스테디셀러');
									$(".div_seller").html(arrr3.join(""));
								}
							}
					 }		
				});
			},	
	} 
};



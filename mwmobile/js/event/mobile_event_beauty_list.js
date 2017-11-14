/**
 * 모바일 핫세일 투데이찬스 화면의 이벤트 처리를 위한 Javascript
 */
var	MobileEventBeauty = {
		name : "MobileEventBeauty", 

		init : function() {
			$('.btn_back').attr('href', '/mobile/main.do');
			if($("input[name='i_sFlagGrade']").val()=="top"){

				$("#top").addClass("active");
			}else{
				$("#ing").addClass("active");
			}
			
			MobileEventBeauty.fn.setSubMenuChange();
			MobileEventBeauty.fn.MobileEventBeautyList();
		},

		fn : {
			/**
			 * 핫세일 서브 메뉴 처리
			 */
			setSubMenuChange : function() {
				var	select_input	= $('ul.nav_mcate>li>input[type=radio]');

				select_input.click(function() {
					var todayMonth = $("#todayMonth").val();
					if($(this).val() == "mobile_event_price_gift"){
						location.href  = GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd=EVT" + todayMonth + "gifts"
					}else{
						location.href	= GLOBAL_WEB_URL+"mobile/event/" + $(this).val() + ".do";
					}
				});
			},
			addBtnEvent : function() {
				var $tabCate = $(".beautyTesterList .tab_cate"); 
				var $tabCont = $(".beautyTesterList .tab_cont");

				$tabCate.unbind("click").click(function(event){
					event.preventDefault();
					var $idxTab = $tabCate.index(this);

					var id = $(this).attr("id");   //id값 빼와서 id에 넣음
					$("input[name='i_sFlagGrade']").val(id);

					$tabCont.hide().eq($idxTab).show();      
					$tabCate.removeClass("active").eq($idxTab).addClass("active");
					if(id == "top"){
						$("input[name='i_iNowPageNo']").val(1);
						$("input[name='i_sTopReview']").val("Y");
					}else{
						$("input[name='i_sTopReview']").val("");
					}
					MobileEventBeauty.fn.MobileEventBeautyList();
					

					return false;
				});


				$(".i_sForm").unbind("click").click(function(event){
					event.preventDefault();
					var id = $(this).attr("id");
					MobileEventBeauty.fn.goView(id);
				});

				//뷰티프로파일
				$(".btn_beautyProfile").unbind("click").click(function(event){
					event.preventDefault();
					var id = $(this).attr("id");
					MobileBeautyProfile.fn.addPopupBtnEvent(id);
				});
				
				
				$(".btn_Detail").unbind("click").click(function(event){
					event.preventDefault();
					var returnUrl =GLOBAL_WEB_URL+"/mobile/event/mobile_event_beauty_list.do";
					var url = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_photo_view.do?i_sReviewcd="+$(this).attr("id")+"&i_sReturnUrl="+returnUrl;
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
					$("form[name='frm']").attr("action", url).submit();

				});
			},


			goView : function(id){
				var frm=document.frm;
				$("input[name='i_sEventcd']").val(id);
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
				frm.action = "/mobile/event/mobile_event_beauty_view.do";
				frm.submit();

			},
			addPopupBtnEvent : function(){
				
				$(".btn_review_prod").unbind("click").click(function(event){
					var id = $(this).attr("id");
					var arrHtml = [];
					
					$(".span_reviewProd", "#p"+id).each(function(){
						var idx = $(".span_reviewProd").index($(this));
						var prodinfo = $(".span_reviewProd").eq(idx);
						var productcd = $(".span_productcd", prodinfo).text();
						var productnm = $(".span_productnm", prodinfo).text();
						var optionnm = $(".span_optionnm", prodinfo).text();
						var brandnm = $(".span_brandnm", prodinfo).text();
						var price = $(".span_price", prodinfo).text();
						var saleprice = $(".span_saleprice", prodinfo).text();
						var point = $(".span_point", prodinfo).text();
						var optioncd = $(".span_optioncd", prodinfo).text();
						var commentcnt = $(".span_commentcnt", prodinfo).text();
						var statuscd = $(".span_statuscd", prodinfo).text();
						var stockqty = parseInt($(".span_stockqty", prodinfo).text());
						var imgpath = $(".span_imgpath", prodinfo).text();
						var optioncnt = parseInt($(".span_optioncnt", prodinfo).text());
						
						arrHtml.push("<li>");
						arrHtml.push("	<a href=\"#\" class=\"btn_prod_detail\" id=\""+productcd+"\">");
						arrHtml.push("		<div class=\"prodImg\">");
						arrHtml.push("			<img src = \""+imgpath+"\" alt =\""+productnm+"\">");
						arrHtml.push("		</div>");
						arrHtml.push("		<div class=\"detail\">");
						arrHtml.push("			<p class=\"brandNm\">"+brandnm+"</p>");
						arrHtml.push("			<p class=\"prodNm\">"+productnm+"</p>");
						
						if(optioncnt > 1){
						arrHtml.push("			<p class=\"option\">"+optionnm+"</p>");
						}
						arrHtml.push("			<p class=\"priceZone\">");
						
						if(price != saleprice){
						arrHtml.push("				<span class=\"sale\"><em>"+SetNumComma(price)+"</em>원</span>");
						}
						
						arrHtml.push("				<span class=\"price\"><em>"+SetNumComma(saleprice)+"</em>원</span>");
						arrHtml.push("			</p>");
						arrHtml.push("		</div>");
						arrHtml.push("	</a>");
						arrHtml.push("</li>");
					
					});
					$(".div_prodList>ul").html(arrHtml.join(""));
					modalPopup("#modalPopupReviewProd");
					
					MobileEventBeauty.fn.addPopupBtnEvent();								
				});
				
				$(".btn_prod_detail").unbind("click").click(function(event){
					event.preventDefault();
					MobileBodyStart.goProductDetail($(this).attr("id"));
//					var url = "/mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$(this).attr("id");
//					if (GLOBAL_FLAG_APP_NEW == "Y") {
//						try {
//							if(GLOBAL_MOBILE_OS == "AND") {
//								MobileBodyStart.setLoginUserInfo();
//							}
//							else {
//								window.webkit.messageHandlers.requestUserInfo.postMessage(null);
//							}
//						}catch(e){
//							console.log(e);
//						}
//						var arrParam = [];
//						if(GLOBAL_LOGIN_KEY != "") {
//							$("input[name='i_sLoginKey']", $("form[name='frm']")).remove();
//							arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='" + GLOBAL_LOGIN_KEY + "'/>");
//						}
//						if(GLOBAL_LOGIN_TYPE != "") {
//							$("input[name='i_sLoginType']", $("form[name='frm']")).remove();
//							arrParam.push("<input type='hidden' name='i_sLoginType'		value='" + GLOBAL_LOGIN_TYPE + "'/>");
//						}
//						$("input[name='i_sDeviceNum']", $("form[name='frm']")).remove();
//						arrParam.push("<input type='hidden' name='i_sDeviceNum' 		value='" + GLOBAL_DEVICE_NUM + "'/>");
//						$(arrParam.join("")).appendTo($("form[name='frm']"));
//					}
//					$("form[name='frm']").attr("action", url).submit();
				});
				$(".btn_photoArea_more").unbind("click").click(function(event){
					event.preventDefault();
					
					var page =$("input[name='i_iNowPageNo']").val();
					$("input[name='i_iNowPageNo']").val(parseInt(page)+1);
					
					$("input[name='i_sFlagGrade']").val("top");
					MobileEventBeauty.fn.MobileEventBeautyList();	
					
				});
			},



			MobileEventBeautyList : function () {
				MobileCommon.ajax({
					url			: "/mobile/event/mobile_event_beauty_list_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: {
						"i_sFlagMobileOpen":"Y"
							, "i_sFlagGrade" : $("input[name='i_sFlagGrade']").val()
							, "i_iNowPageNo" : $("input[name='i_iNowPageNo']").val()
							, "i_iPageSize"  : 10
							
					},
					animation : true, 
					isModalEnd : true,
					success		: function (data, textStatus) {
						if ("succ" == data.status) {

//							console.log(data);
						} else {
							alert(data.message);
						}

						if($("input[name='i_sFlagGrade']").val()=="ing"){
							
							var Blist = data.object.Beauty;
							var i_sTime = data.object.i_sTime;
							var length = Blist.length;
							var cnt = 0;
							
							if(length == undefined || length == 0){
								var NodHtml = [];
								NodHtml.push("<div class=\"nodata\">");
								NodHtml.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
								NodHtml.push("</div>");
								$(".current").html(NodHtml.join(""));
							}
							
							
							var arrL=[];
							for(var i=0; i<length; i++){
								var row= Blist[i];
								if(row.v_event_st_dt <= i_sTime && i_sTime <= row.v_event_en_dt ){

									arrL.push("<li>");
									arrL.push(" <div class='btBox'>");
									arrL.push(" 	<a href='#' id='"+row.v_eventcd+"' class='i_sForm'>");
									arrL.push(" 		<img src='"+row.v_mobile_img_path+"' alt='' />");
									arrL.push("			<div class='ttlbox'>");
									if(row.v_evt_comment != undefined){
										arrL.push(" 			<p class='ttl'>"+row.v_evt_comment+"</p>");
									}
									arrL.push("				<p class='txt'>"+row.v_eventnm+" (총 "+row.n_win_user_cnt+"명)</p>");
									arrL.push(" 			<div class='bottom'>");
									arrL.push(" 				<p class='date'>"+changeDatePatten(row.v_event_en_dt)+"까지</p>");
									arrL.push(" 				<p class='count'>"+row.n_entry_cnt+" 명 신청중</p>");
									arrL.push(" 			</div>");
									arrL.push(" 		</div>");
									arrL.push("		</a>");
									arrL.push(" </div>");
									arrL.push("<li>");
									cnt++;
								}
								
							}
							
							if(cnt == 0){
								$(".test1").hide();
							}else{
								$(".test1>ul").html(arrL.join(""));
							}
							var length2 = Blist.length;
							var arrL2=[];
							cnt = 0;
							for(var i=0; i<length2; i++){
								var row = Blist[i];
								if(row.v_event_en_dt < i_sTime && i_sTime < row.v_review_st_dt){
									arrL2.push("<li>");
									arrL2.push(" <div class='btBox'>");
									arrL2.push(" 	<a href='#' id='"+row.v_eventcd+"' class='i_sForm'>");
									arrL2.push(" 		<img src='"+row.v_mobile_img_path+"' alt='' />");
									arrL2.push("			<div class='ttlbox'>");
									if(row.v_evt_comment != undefined){
										arrL2.push(" 			<p class='ttl'>"+row.v_evt_comment+"</p>");
									}
									arrL2.push("				<p class='txt'>"+row.v_eventnm+" (총 "+row.n_win_user_cnt+"명)</p>");
									arrL2.push(" 			<div class='bottom'>");
									arrL2.push(" 				<p class='date'>"+changeDatePatten(row.v_event_en_dt)+"까지</p>");
									arrL2.push(" 				<p class='count'>"+row.n_entry_cnt+" 명 신청중</p>");
									arrL2.push(" 			</div>");
									arrL2.push(" 		</div>");
									arrL2.push("		</a>");
									arrL2.push(" </div>");
									arrL2.push("<li>");
									cnt++;
								}
							}
							
							if(cnt == 0){
								$(".test2").hide();
							}else{
								$(".test2>ul").html(arrL2.join(""));
							}
							cnt = 0;
							var length3 = Blist.length;
							var arrL3=[];
							
							for(var i=0; i<length3; i++){
								var row = Blist[i];
								if(row.v_review_st_dt <= i_sTime && i_sTime <= row.v_top_review_dt){
									arrL3.push("<li>");
									arrL3.push(" <div class='btBox'>");
									arrL3.push(" 	<a href='#' id='"+row.v_eventcd+"' class='i_sForm'>");
									arrL3.push(" 		<img src='"+row.v_mobile_img_path+"' alt='' />");
									arrL3.push("			<div class='ttlbox'>");
									if(row.v_evt_comment != undefined){
										arrL3.push(" 			<p class='ttl'>"+row.v_evt_comment+"</p>");
									}
									arrL3.push("				<p class='txt'>"+row.v_eventnm+" (총 "+row.n_win_user_cnt+"명)</p>");
									arrL3.push(" 			<div class='bottom'>");
									arrL3.push(" 				<p class='date'>"+changeDatePatten(row.v_event_en_dt)+"까지</p>");
									arrL3.push(" 				<p class='count'>"+row.n_entry_cnt+" 명 신청중</p>");
									arrL3.push(" 			</div>");
									arrL3.push(" 		</div>");
									arrL3.push("		</a>");
									arrL3.push(" </div>");
									arrL3.push("<li>");
									cnt++;
								}
							}
							if(cnt == 0){
								$(".test3").hide();
							}else{
								$(".test3>ul").html(arrL3.join(""));
							}
							
							$(".tab_cont").eq(0).show();
							
						}else if($("input[name='i_sFlagGrade']").val()=="top"){

							var arrL4= [];
							var list = data.object.top.list;
							var imglist = data.object.top.imglist;
							var prodlist = data.object.top.product;
							var page = data.object.top.page;
							
							if(list != undefined && list.length > 0){
								for(var i = 0; i < list.length; i++){
									//if(list.v_rv_typecd != undefined){
									var rvlist = list[i];
									var clob = rvlist.v_clob;
									if(clob == undefined){
										clob = "내용이 없습니다.";
									} else {
										clob = clob.replace(/\[image#(.*?)\]/g, "");
										clob = clob.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "").replace(/<!--(.|\n|\r)*-->/g,"");
										clob = getByteString(clob, 100);
									}
									var level = rvlist.v_user_level;
									if(level != undefined){
										level = "m"+level.substr(3,1);
									}else{
										level = "m1";
									}
									var cmt_level = rvlist.v_user_cmt_level;
									if(cmt_level != undefined){
										cmt_level = "c"+cmt_level.substr(6,7);
									}else{
										cmt_level = "c1";
									}
									var date = rvlist.v_reg_dtm;
									var vote = rvlist.n_vote;
									if(vote==undefined){
										vote=0;
									}

									var cDate = changeBeforeDate(date);
									/*if(rvlist.v_flag_top_reviewer =="Y"){} 탑리뷰 선정여부*/ 
									arrL4.push("<div class='photoReviewBox'>");
									/*arrL4.push("	<span class='ico_flag f1'>뷰티 테스터</span>");*/
									//alert(rvlist.n_num);
									/*if(rvlist.n_num == "1"){
										arrL4.push("    <span class='ico_topReview'><img src='../images/common/ico_topReview.png' alt='TOP리뷰'></span>");
									}*/
									
									arrL4.push("<div class='userInfoArea'>");
									arrL4.push(" <div class=\"photoZ\"><img src='"+ (rvlist.v_user_img || GLOBAL_IMG_URL + 'common/non-userPhoto.jpg' ) +"' alt=\"\"></div>");
									arrL4.push("	<div class='userInfoZ'>");
									arrL4.push("   		<div class='name'>");
									arrL4.push("  			  <p>");
									if(rvlist.v_nickname != undefined){
										arrL4.push("					<span class='nm'>"+rvlist.v_nickname+"</span>");
									}else{
										arrL4.push("					<span class='nm'>"+getStringReverseHidden(rvlist.v_usernm, 1)+"</span>");
									}
									//뷰티프로파일 있는지 카운트
									if(rvlist.n_bpcnt > 0){
										arrL4.push("       			 <a href='#' id='"+rvlist.v_userid+"' class='btn_beautyProfile'><img src='"+GLOBAL_IMG_URL+"common/ico_beautyProfile.png' alt='뷰티프로파일'></a>");
									}
									arrL4.push("  			  </p>");
									arrL4.push("    	</div>");
									arrL4.push("    <div class='gradeZone'>");
									arrL4.push("         <span class='ico_memberLevel "+level+"'></span>");
									arrL4.push("         <span class='ico_communityLevel "+cmt_level+"'></span>");
									arrL4.push("	</div>");
									arrL4.push("  </div>");
									arrL4.push("</div>");
									if(rvlist.v_flag_best =="Y"){
										arrL4.push("	<div class='bestArea'>");
										arrL4.push("		<span class='ico_best'>best</span>");
										arrL4.push("	</div>");
									}
									arrL4.push("    <span class='ico_flag f1'>뷰티 테스터</span>");
									arrL4.push("	<p class='subject'><a href='#' id='"+rvlist.v_reviewcd+"' class='btn_Detail'>");
									if(rvlist.v_flag_top_reviewer == "Y"){
										arrL4.push(" <span class='ico_topReview'><img src='"+GLOBAL_MOBILE_IMG_URL+"common/ico_topReview.png' alt='TOP리뷰'></span>");
									}
									arrL4.push(rvlist.v_title + "		</a></p>");
									arrL4.push(" 	<p class='cont'><a href='#' id='"+rvlist.v_reviewcd+"' class='btn_Detail'>"+clob+"</a></p>");
									arrL4.push("	<div class='photoZone'>");
									arrL4.push(" 		<ul>");
									if(imglist != undefined && imglist.length > 0) {
										var cnt = 0;

										for(var j=0; j<imglist.length; j++) {
											if(imglist[j].v_recordid == rvlist.v_reviewcd) {
												++cnt;
												if(cnt <= 4) {
													if(parseInt(rvlist.n_photo_cnt) > 4 && cnt == 4) {
														arrL4.push("			<li>");
														arrL4.push("				<div class=\"moreCountZone\">");
														arrL4.push("					<img src=\""+imglist[j].v_image_path+"\" alt=\"\" />");
														arrL4.push("					<span class=\"moreCount\">"+parseInt(rvlist.n_photo_cnt-4)+"</span> ");
														arrL4.push("				</div>");
														arrL4.push("			</li>");
													} else {
														arrL4.push("			<li><img src=\""+imglist[j].v_image_path+"\" alt=\"\" /></li>");
													}
												}
											}
										}
									}
									arrL4.push("		</ul>");
									arrL4.push("	</div>");
									arrL4.push("	<div class='info'>");
									arrL4.push("		<div class='countBundle'>");
									arrL4.push("			<a href='#' class='btn_prodview btn_review_prod' id=\""+rvlist.v_reviewcd+"\"><span>리뷰상품 보기</span></a>");
									arrL4.push("			<span class='ico_comment'><span class='hide'>댓글</span><em>"+rvlist.reply_cnt+"</em></span>");
									arrL4.push("			<span class='ico_like'><span class='hide'>추천</span><em>"+vote+"</em></span> ");
									arrL4.push("		</div>");
									arrL4.push(" 		<p class='date'>"+changeBeforeDate(rvlist.v_reg_dtm)+"</p>");
									if(rvlist.v_tagnm != undefined){
										arrL4.push("			<p class=\"reviewtag\"><span>"+rvlist.v_tagnm+"</span></p>");
									} 
									arrL4.push("	</div>");
									
									
									var imageUrl = "";
									if(imglist != undefined && imglist.length > 0){
										for(var j = 0; j<imglist.length; j++){
											if(imglist[j].v_recordid == rvlist.v_reviewcd){
												imageUrl = imglist[j].v_image_path.replace("_100","");
											}
										}
									}

									if(prodlist != undefined && prodlist.length>0){
										
										arrL4.push("	<span class=\"hide span_review\" id=\"p"+rvlist.v_reviewcd+"\">");
											var len = prodlist.length;
											for(var k = 0; k<len; k++){
												if(prodlist[k].v_reviewcd == rvlist.v_reviewcd){
													arrL4.push("			<span class=\"span_reviewProd\">");
													// var levelcd = $("#i_sLevelcd").val();
													// var price = productPrice.fn.setProductPrice(prodlist[k], levelcd);
													
													arrL4.push("				<span class=\"span_productcd\">"+prodlist[k].v_productcd+"</span>");
													arrL4.push("				<span class=\"span_productnm\">"+prodlist[k].v_productnm+"</span>");
													arrL4.push("				<span class=\"span_optioncd\">"+prodlist[k].v_optioncd+"</span>");
													arrL4.push("				<span class=\"span_optioncnt\">"+prodlist[k].n_option_cnt+"</span>");
													arrL4.push("				<span class=\"span_optionnm\">"+prodlist[k].v_optionnm+"</span>");
													arrL4.push("				<span class=\"span_brandnm\">"+prodlist[k].v_brandnm+"</span>");
													arrL4.push("				<span class=\"span_imgpath\">"+prodlist[k].v_img_web_path+"</span>");
													arrL4.push("				<span class=\"span_price\">"+SetNumComma(prodlist[k].n_list_price)+"</span>");
													arrL4.push("				<span class=\"span_saleprice\">"+SetNumComma(prodlist[k].n_price)+"</span>");
													arrL4.push("				<span class=\"span_point\">1</span>");
													arrL4.push("				<span class=\"span_commentcnt\">18</span>");
													arrL4.push("				<span class=\"span_stockqty\">"+prodlist[k].n_stockqty+"</span>");
													arrL4.push("				<span class=\"span_statuscd\">"+prodlist[k].v_statuscd+"</span>");
													arrL4.push("			</span>");
													}
												}
											arrL4.push("	</span>");
											arrL4.push(" <input type=\"hidden\" class= \"hide prodCount\" value=\""+len+"\"/>");
											}
									arrL4.push("</div>");//de
									arrL4.push("</div>");//photo
									
								}
								if(page.i_iNowPageNo == 1){
									$(".topReview_top").html(arrL4.join(""));
								}else{
									$(arrL4.join("\n")).appendTo(".topReview_top");
								}
								
								if(page.i_iNowPageNo == page.i_iTotalPageCnt){
									$(".btn_photoArea_more").hide();
								}
								
								$(".tab_cont").eq(1).show();
							}else{
								var NodHtml = [];
								NodHtml.push("<div class=\"nodata\">");
								NodHtml.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
								NodHtml.push("</div>");
								$(".topReview_top").html(NodHtml.join(""));
								$(".btn_photoArea_more").hide();
							}
							$("input[name='i_iNowPageNo']").val(page.i_iNowPageNo);
						}
						MobileEventBeauty.fn.addPopupBtnEvent();
						MobileEventBeauty.fn.addBtnEvent();
					}
					
				});
			}



		}//fn
};//MobileHotsaleClubAp



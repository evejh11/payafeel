/**
 * 모바일 핫세일 투데이찬스 화면의 이벤트 처리를 위한 Javascript
 */
var	MobileHotsaleClubAp = {
		name : "MobileHotsaleClubAp",
		levelcd : "",
		init : function() {
			$('.btn_back').attr('href', '/mobile/main.do');
			var lv = $("input[name='s_levelcd']").val();

			if(lv == "LV13" || lv == "LV17" || lv == "LV20" ) {
				$("#vvip").addClass("active");
				$("input[name='i_sFlagGrade']").val("VVIP");
				$("input[name='i_sFlagTab']").val("vvip");
			}else if(lv=="LV12" || lv == "LV16" || lv == "LV19" ){
				$("#vip").addClass("active");
				$("input[name='i_sFlagGrade']").val("VIP");
				$("input[name='i_sFlagTab']").val("vip");
			}else if(lv=="LV11" || lv == "LV15" || lv == "LV18" ){
				$("#vip").addClass("active");
				$("input[name='i_sFlagGrade']").val("LV11");
				$("input[name='i_sFlagTab']").val("vip");
			}else{
				$("#vip").addClass("active");
				$("input[name='i_sFlagGrade']").val("LV00");
				$("input[name='i_sFlagTab']").val("vip");
			}
			
			var i_sFlagGrade = $("input[name='i_sFlagGrade']").val();
			var i_sFlagTab = $("input[name='i_sFlagTab']").val();
			var i_sTime = $("input[name='i_sTime']").val();

			MobileHotsaleClubAp.levelcd = i_sFlagGrade;
			MobileHotsaleClubAp.fn.setSubMenuChange();
			MobileHotsaleClubAp.fn.setUserLevel(i_sFlagGrade,i_sTime);
			MobileHotsaleClubAp.fn.MobileHotsaleClubApList(i_sFlagTab);

		},

		fn : {
			/**
			 * 핫세일 서브 메뉴 처리
			 */
			setSubMenuChange : function() {
				var	select_input	= $('div.selectList>ul>li>input[type=radio]');
				select_input.click(function() {
					if($(this).val() == "mobile_shop_product_br_store") {
						location.href	= "/mobile/shop/" + $(this).val() + ".do";
					} else if($(this).val() == "mobile_event_billing_beautypropose_view") {
						location.href	= "/mobile/event/" + $(this).val() + ".do";
					} else {
						location.href	= "/mobile/sale/" + $(this).val() + ".do";
					}
				});
			},


			addBtnEvent : function() {
				var $tabCate = $(".clupAP .tab_cate"); 
				var $tabCont = $(".clupAP .tab_cont");

				$tabCate.unbind("click").click(function(event){
					event.preventDefault();
					var $idxTab = $tabCate.index(this);
					$tabCont.hide().eq($idxTab).show();      
					$tabCate.removeClass("active").eq($idxTab).addClass("active");
					return false;
				});

				$("#vip_tab").unbind("click").click(function(event){
					event.preventDefault();
					var id = "vip";
					$(".p_titleArea").hide();
					$(".vip_t").show();
					MobileHotsaleClubAp.fn.MobileHotsaleClubApList(id);
				});
				$("#vvip_tab").unbind("click").click(function(event){
					event.preventDefault();
					var id = "vvip";
					$(".p_titleArea").hide();
					$(".vvip_t").show();
					MobileHotsaleClubAp.fn.MobileHotsaleClubApList(id);
				});
				$(".btn_prod_detail").unbind("click").click(function(event){
					event.preventDefault();
					MobileBodyStart.goProductDetail($(this).attr("id"));
//					var url = "/mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$(this).attr("id");
//					$("form[name='frm']").attr("action", url).submit();
				});
				
				$(".my_pouch").unbind("click").click(function(event){
					event.preventDefault();
					MobileBodyStart.goMyPouch();
				});
			},
			openBenufit : function(){
				$(".OpenB_Btn").unbind("click").click(function(event){
					event.preventDefault();
					modalPopup(gradeArea);
					MobileHotsaleClubAp.fn.addBtnEvent2();

				});
			},
			userLogin : function(){
				$(".log_Btn").unbind("click").click(function(event){
					event.preventDefault();
					MobileBodyStart.goLoginPage();
//					var returnUrl = "/mobile/sale/mobile_sale_clubap_main.do";
//					location.href = "/mobile/mbr/mobile_mbr_member_login.do?returnUrl="+returnUrl;

				});
			},



			addBtnEvent2 : function() {
				var $tabCate = $(".gradeBenufit .tab_cate"); 
				var $tabCont = $(".gradeBenufit .tab_cont");

				$tabCate.unbind("click").click(function(event){
					event.preventDefault();
					var $idxTab = $tabCate.index(this);
					$tabCont.hide().eq($idxTab).show();      
					$tabCate.removeClass("active").eq($idxTab).addClass("active");
					return false;

				});

			},


			setUserLevel : function(i_sFlagGrade,i_sTime) {
				
				var name= $("input[name='s_usernm']").val();
				
				var levelcd = $("#levelcd").val();
				var levelnm = $("#levelnm").val();
				var levelno = "";
				
				if(levelcd != "" && levelcd != undefined) {
					levelno = levelcd.substring(3, 4);
				}
				
				var arrL=[];
				if(i_sFlagGrade == "VVIP"){
					arrL.push("<div class='memberInfoHotsale'>");
					arrL.push("		<div class='infoArea'>");
					arrL.push("  		<span class='ico_memberLevel3 m"+levelno+"'>"+levelnm+"</span>");
					arrL.push("			 <p class='date'>"+i_sTime+"</p>");
					arrL.push("   		 <p class='name'>"+name+"님은 <em>"+levelnm+"</em>회원이십니다.</p>");
					arrL.push(" 		<span class='btn_ty2 v3'><a href='#' class='OpenB_Btn'>등급별 혜택 확인</a></span>");
					arrL.push("   	</div>");
					arrL.push("</div>");
				}else if(i_sFlagGrade == "VIP"){
					arrL.push("<div class='memberInfoHotsale'>");
					arrL.push("		<div class='infoArea'>");
					arrL.push("  		<span class='ico_memberLevel3 m"+levelno+"'>"+levelnm+"</span>");
					arrL.push("			 <p class='date'>"+i_sTime+"</p>");
					arrL.push("   		 <p class='name'>"+name+"님은 <em>"+levelnm+"</em>회원이십니다.</p>");
					arrL.push(" 		<span class='btn_ty2 v3'><a href='#' class='OpenB_Btn'>등급별 혜택 확인</a></span>");
					arrL.push("   	</div>");
					arrL.push("</div>");
				}else if(i_sFlagGrade=="LV11"){
					arrL.push("<div class='memberInfoHotsale v2'>");
					arrL.push("	<div class='infoArea'>");
					arrL.push(" 			<span class='ico_memberLevel3 m"+levelno+"'>"+levelnm+"</span>");
					arrL.push(" 			<p class='date'>"+i_sTime+"</p>");
					arrL.push("			<p class='name'>"+name+"님은 <em>"+levelnm+"</em>회원이십니다.</p>");
					arrL.push("		<div class='btnArea'>");
					arrL.push("			<span class='btn_ty v2'><a href='#' class='my_pouch'>마이파우치</a></span>");
					arrL.push(" 			<span class='btn_ty2 v2'><a href='#' class='OpenB_Btn'>등급별 혜택 확인</a></span>");
					arrL.push("		</div>");
					arrL.push(" 	</div>");
					arrL.push("	<p class='noti'><span>CLUB AP는 <em>VIP, VVIP 고객</em>들만 이용할 수 있습니다.</span></p>");
					arrL.push("</div>");
				}else if(i_sFlagGrade=="LV14"){
					arrL.push("<div class='memberInfoHotsale v2'>");
					arrL.push("	<div class='infoArea'>");
					arrL.push(" 			<span class='ico_memberLevel3 m"+levelno+"'>"+levelnm+"</span>");
					arrL.push(" 			<p class='date'>"+i_sTime+"</p>");
					arrL.push("			<p class='name'>"+name+"님은 <em>"+levelnm+"</em>이십니다.</p>");
					arrL.push("		<div class='btnArea'>");
					arrL.push("			<span class='btn_ty v2'><a href='#'>마이파우치</a></span>");
					arrL.push(" 			<span class='btn_ty2 v2'><a href='#' class='OpenB_Btn'>등급별 혜택 확인</a></span>");
					arrL.push("		</div>");
					arrL.push(" 	</div>");
					arrL.push("	<p class='noti'><span>CLUB AP는 <em>VIP, VVIP 고객</em>들만 이용할 수 있습니다.</span></p>");
					arrL.push("</div>");
				}else if(i_sFlagGrade=="LV00"){
					arrL.push("<div class='membershipInfoHotsale'>");
					arrL.push("		<p class='ttl'>Club AP는 아모레퍼시픽몰 고객중 <br /><em>VIP / VVIP 만을 위한 특별 서비스</em>입니다.</p>");
					arrL.push("  		<p class='txt'>이미 고객이시면 <a href='#' class='log_Btn'>로그인</a>을 해주세요.</p>");
					arrL.push("	 <div class='btnArea'>");
					arrL.push(" 		<span class='btn_ty v2'><a href='#' class='log_Btn'>로그인하기</a></span>");
					arrL.push("		<span class='btn_ty2 v2'><a href='#' class='OpenB_Btn'>등급별 혜택 확인</a></span>");
					arrL.push("	</div>");
					arrL.push("</div>");
				}

				$(".div_userinfo").html(arrL.join(""));
				MobileHotsaleClubAp.fn.openBenufit();
				MobileHotsaleClubAp.fn.userLogin();
			},

			/**
			 * 모바일 핫세일 CLUB AP 상품리스트를 위한 Javascript
			 */

			MobileHotsaleClubApList : function (i_sFlagTab) {
				MobileCommon.ajax({
					url			: "/mobile/sale/mobile_sale_club_ap_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: {
						"i_sFlagMobileOpen":"Y",
						"i_sFlagTab" : i_sFlagTab
					},
					animation	: false,
					success		: function (data, textStatus) {
						if ("succ" == data.status) {

							console.log(data);
						} else {
							alert(data.message);
						}
						
						var count = data.object.cnt;
						if(i_sFlagTab =="vip"){
							var vHtml = [];
							vHtml.push("<p class='title vip_t p_titleArea'>VIP 특별 상품 <span class='count'>"+count+"</span></p>");
							$("#v_count").html(vHtml.join(""));
							$("input[name='i_sFlagTab']").val("vip");
						
						}else if(i_sFlagTab =="vvip"){
							var vvHtml= [];
							vvHtml.push("<p class='title vvip_t p_titleArea'>VVIP 특별 상품 <span class='count'>"+count+"</span></p>");
							$("#vv_count").html(vvHtml.join(""));
							$("input[name='i_sFlagTab']").val("vvip");
						
						}

						var obj = data.object.ap;
						
						if(obj != undefined && obj.length >0){
							var length = obj.length;
							var arrL=[];
							for(var i=0; i<length; i++){
								var row=obj[i];

								var set_p  = row.n_sale_price;
								var set_sp = row.n_price;
								var set_user_p = row.n_nomal_user_price;
								arrL.push("			<li>");
								arrL.push("				<a href=\"#\">");
								arrL.push("					<div class=\"thumbImg\">");
								arrL.push("						<img src=\""+row.v_img_path+"\"class='btn_prod_detail' id='"+row.v_productcd+"' onclick=\"trackClicksMall('상품','웹 Enjoy AP^CLUB AP','상품','event5',true,'"+ row.v_productcd+"');\" alt=\"\"/>");
								arrL.push("					</div>");
								arrL.push("				<div class=\"prodDetail\">");
								arrL.push("				<p class=\"brandNm ellipsis\">"+row.v_brandnm+"</p>");
								arrL.push("				<p class=\"prodNm ellipsis\">"+row.v_productnm+"</p>");
								arrL.push("				<p class=\"priceZone\">");
								
								if(MobileHotsaleClubAp.levelcd == "LV11" || MobileHotsaleClubAp.levelcd == "LV00"){
									
									if(set_user_p == set_sp){
										arrL.push("						<span class=\"price\"><em>"+SetNumComma(set_user_p)+"</em>원</span>");
									}else{
										arrL.push("						<span class=\"sale\"><em>"+SetNumComma(set_sp)+"</em>원</span>");
										arrL.push("						<span class=\"price\"><em>"+SetNumComma(set_user_p)+"</em>원</span>");
									}
									
									
								}else{

									if(set_p == set_sp){
										arrL.push("						<span class=\"price\"><em>"+SetNumComma(set_p)+"</em>원</span>");
									}else{
										arrL.push("						<span class=\"sale\"><em>"+SetNumComma(set_sp)+"</em>원</span>");
										arrL.push("						<span class=\"price\"><em>"+SetNumComma(set_p)+"</em>원</span>");
									}
									
									
								}
								
								arrL.push("				</p>");
								arrL.push("				<div class=\"prodEvalu\">");
								arrL.push("					<span class=\"gradeType grade0"+row.n_single_point+"\"><span class=\"hide\">평점 8.0</span></span>	");
								arrL.push("					<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+row.n_review_cnt+")</span>");
								arrL.push("			 	</div>");
								arrL.push("				<span class=\"stateArea\">");
								if(row.n_stockqty=="0"){
									arrL.push("				    <span class=\"ico_state st1\">품절</span>");
								}
								arrL.push("				</span>");
								arrL.push("			</div>");
								arrL.push("			 </a>");
								arrL.push("			</li>");
							}
							
							if($("input[name='i_sFlagTab']").val() == "vvip"){
								$(".div_prd_vvip>ul").html(arrL.join(""));
								$(".clupAP .tab_cont").eq(1).show();

							} else {
								$(".div_prd_vip>ul").html(arrL.join(""));
								$(".clupAP .tab_cont").eq(0).show();
							}
						}else{
							var arrResult=[];
							arrResult.push("<div class=\"nodata\">");
							arrResult.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
							arrResult.push("</div>");
							if($("input[name='i_sFlagTab']").val() == "vvip"){
								$(".div_prd_vvip").html(arrResult.join(""));
								$(".clupAP .tab_cont").eq(1).show();
							}else{
								$(".div_prd_vip").html(arrResult.join(""));
								$(".clupAP .tab_cont").eq(0).show();
							}
							
							
							
							
							/*var arrResult=[];
							arrResult.push("<div class=\"nodata\">");
							arrResult.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
							arrResult.push("</div>");
							$(".div_prd_vvip").html(arrResult.join(""));
							$(".clupAP .tab_cont").eq(1).show();*/
						}
						MobileHotsaleClubAp.fn.addBtnEvent();
					}
				});
			}

		}//fn
};//MobileHotsaleClubAp



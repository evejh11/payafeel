
var	MobileGetItCoupon = {
		name : "MobileGetItCoupon",

		init : function() {
			$('.btn_back').attr('href', '/mobile/main.do');
			/*if($("input[name='s_levelcd']").val() == "LV13") {
				$("input[name='i_sFlagGrade']").val("VVIP");
			}else if($("input[name='s_levelcd']").val() == "LV12"){
				$("input[name='i_sFlagGrade']").val("VIP");
			}else if($("input[name='s_levelcd']").val() == "LV11"){
				$("input[name='i_sFlagGrade']").val("LV11");
			}else{
				$("input[name='i_sFlagGrade']").val("LV00");
			}*/
			
			var lv = $("input[name='s_levelcd']").val();

			if(lv == "LV13" || lv == "LV17" || lv == "LV20" ) {
				$("input[name='i_sFlagGrade']").val("VVIP");
			}else if(lv=="LV12" || lv == "LV16" || lv == "LV19" ){
				$("input[name='i_sFlagGrade']").val("VIP");
			}else if(lv=="LV11" || lv == "LV15" ||  lv == "LV18"){
				$("input[name='i_sFlagGrade']").val("LV11");
			}else{
				$("input[name='i_sFlagGrade']").val("LV00");
			}
			
			var i_sFlagGrade= $("input[name='i_sFlagGrade']").val();
			var i_sTime = $("input[name='i_sTime']").val();
			var user_id= $("input[name='s_userid']").val();
			var i_sIssueTarget= $("input[name='i_sIssueTarget']").val();
			
			MobileGetItCoupon.fn.setUserLevel(i_sFlagGrade,i_sTime);
			MobileGetItCoupon.fn.setSubMenuChange();
			MobileGetItCoupon.fn.getHotsaleGetItCouponList(i_sFlagGrade,user_id);

		},

		fn : {
		
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
			userLogin : function(){
				$(".log_Btn").unbind("click").click(function(event){
					event.preventDefault();
					var returnUrl = "/mobile/sale/mobile_sale_getit_coupon.do";
					location.href = "/mobile/mbr/mobile_mbr_member_login.do?returnUrl="+returnUrl;

				});
			},

			openBenufit : function(){
				$(".OpenB_Btn").unbind("click").click(function(event){
					event.preventDefault();
					modalPopup(gradeArea);
					MobileGetItCoupon.fn.addBtnEvent();
				});
			},

			goCouponBook : function(user_id){
				$(".blueR_btn").unbind("click").click(function(event){
					event.preventDefault();
					
					var i_sCouponcd = $(this).attr("id").split("/")[0];
					var i_sIssueTarget =$(this).attr("id").split("/")[1];
					var i_sIssueTargetnm =$(this).attr("id").split("/")[2];
					var point = $(this).attr("id").split("/")[3];
					
					if(point>0 && point != '' && point != undefined){
						showConfirmBox({
							message : "블루리본 포인트 <span style='color:#0075c8'>"+point+"P</span>가 차감되며 쿠폰 다운로드후에는 환불이 불가능해요.<br/>쿠폰을 다운로드 하시겠어요?"
							,ok_func : function(){
								MobileGetItCoupon.fn.insertCoupon(user_id,i_sCouponcd,i_sIssueTarget,i_sIssueTargetnm);
								}
						});
					}else{
						showConfirmBox({
							message : "쿠폰을 다운로드 하시겠습니까?"
							,ok_func : function(){
								MobileGetItCoupon.fn.insertCoupon(user_id,i_sCouponcd,i_sIssueTarget,i_sIssueTargetnm);
								}
						});
					}
				});
			},

			insertCoupon : function (user_id,i_sCouponcd,i_sIssueTarget,i_sIssueTargetnm){
				
				MobileCommon.ajax({
					url			: "/mobile/sale/mobile_insert_coupon_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: {
						"i_sFlagMobileOpen":"Y",
						"i_sCouponcd" : i_sCouponcd,
						"i_sIssueTarget" : i_sIssueTarget,
						"i_sIssueTargetnm" : i_sIssueTargetnm
						
					},
					animation	: false,
					success		: function (data, textStatus) {
						if ("succ" == data.status) {
							modalPopup("#modalPopupCouponComplete");
							$(".btn_modalpopupClose").click(function(){
								location.href = GLOBAL_WEB_URL+"mobile/sale/mobile_sale_getit_coupon.do";
							});
						} else if("isNotLogin" == data.status){
							if(IS_LOGIN_SNS){
								showConfirmBox({
									message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
									, ok_func : function(){
										var returnUrl = GLOBAL_WEB_URL+"mobile/sale/mobile_sale_getit_coupon.do";
										MobileBodyStart.goLogin(returnUrl);
									}
								    , cancel_func: function(){
										return ;
									}
								});
							}else{
								showConfirmBox({
									message : "로그인 하시면 서비스 이용이 가능하세요!",
									ok_func : function(){
										var returnUrl = GLOBAL_WEB_URL+"mobile/sale/mobile_sale_getit_coupon.do";
										MobileBodyStart.goLogin(returnUrl);
									}
								});
							}
						} else if("fail" == data.status){
							modalPopup("#modalPopupCouponAlready3");
							
							var rsHtml = "<p class='tit'>"+data.message+"</p>";
							$(".b_point").html(rsHtml);
							
							
						}else {
							showMessageBox({
								message : data.message
							});
						}
						
					}//data succ

				});//ajax

			},

			setUserLevel : function(i_sFlagGrade,i_sTime) {

				var name = $("input[name='s_usernm']").val();
				var nickname = $("input[name='s_nickname']").val();
				
				var arrL=[];
				/*if(i_sFlagGrade == "VVIP"){
					arrL.push("<div class='memberInfoHotsale'>");
					arrL.push("		<div class='infoArea'>");
					arrL.push("  		<span class='ico_memberLevel3 m3'>VVIP</span>");
					arrL.push("			 <p class='date'>"+i_sTime+"</p>");
					arrL.push("   		 <p class='name'>"+name+"님은 <em>"+i_sFlagGrade+"</em>회원이십니다.</p>");
					arrL.push(" 		<span class='btn_ty2 v3'><a href='#' class='OpenB_Btn'>등급별 혜택 확인</a></span>");
					arrL.push("   	</div>");
					arrL.push("</div>");
				}else if(i_sFlagGrade == "VIP"){
					arrL.push("<div class='memberInfoHotsale'>");
					arrL.push("		<div class='infoArea'>");
					arrL.push("  		<span class='ico_memberLevel3 m2'>VVIP</span>");
					arrL.push("			 <p class='date'>"+i_sTime+"</p>");
					arrL.push("   		 <p class='name'>"+name+"님은 <em>"+i_sFlagGrade+"</em>회원이십니다.</p>");
					arrL.push(" 		<span class='btn_ty2 v3'><a href='#' class='OpenB_Btn'>등급별 혜택 확인</a></span>");
					arrL.push("   	</div>");
					arrL.push("</div>");
				}
				else if(i_sFlagGrade=="LV11"){
					arrL.push("<div class='memberInfoHotsale v2'>");
					arrL.push("	<div class='infoArea'>");
					arrL.push(" 			<span class='ico_memberLevel3 m1'>일반</span>");
					arrL.push(" 			<p class='date'>"+i_sTime+"</p>");
					arrL.push("				<p class='name'>"+name+"님은 <em>일반</em>회원이십니다.</p>");
					arrL.push(" 			<span class='btn_ty2 v2'><a href='#' class='OpenB_Btn'>등급별 혜택 확인</a></span>");
					arrL.push(" 	</div>");
					arrL.push("</div>");
				}
				else if(i_sFlagGrade=="LV00"){
					arrL.push("<div class='membershipInfoHotsale'>");
					arrL.push("		 <p class='ttl'><span>아모레퍼시픽몰 가입고객</span>만 쿠폰을 <br />받을 수 있습니다.</p>");
					arrL.push("  		<p class='txt'>이미 고객이시면 <a href='#' class='log_Btn'>로그인</a>을 해주세요.</p>");
					arrL.push("	 <div class='btnArea'>");
					arrL.push(" 		<span class='btn_ty v2'><a href='#' class='log_Btn'>로그인하기</a></span>");
					arrL.push("		<span class='btn_ty2 v2'><a href='#' class='OpenB_Btn'>등급별 혜택 확인</a></span>");
					arrL.push("	</div>");
					arrL.push("</div>");
				}*/
				
				var levelcd = $("#levelcd").val();
				var levelnm = $("#levelnm").val();
				var levelno = "";
				
				if(levelcd != "" && levelcd != undefined) {
					levelno = levelcd.substring(3, 4);
				}
				
				if(i_sFlagGrade == "LV00") {
					arrL.push("<div class='membershipInfoHotsale'>");
					arrL.push("		 <p class='ttl'><span>아모레퍼시픽몰 가입고객</span>만 쿠폰을 <br />받을 수 있습니다.</p>");
					arrL.push("  		<p class='txt'>이미 고객이시면 <a href='#' class='log_Btn'>로그인</a>을 해주세요.</p>");
					arrL.push("	 <div class='btnArea'>");
					arrL.push(" 		<span class='btn_ty v2'><a href='#' class='log_Btn'>로그인하기</a></span>");
					arrL.push("		<span class='btn_ty2 v2'><a href='#' class='OpenB_Btn'>등급별 혜택 확인</a></span>");
					arrL.push("	</div>");
					arrL.push("</div>");
				} else {
					arrL.push("<div class='memberInfoHotsale v2'>");
					arrL.push("	<div class='infoArea'>");
					arrL.push(" 			<span class='ico_memberLevel3 m"+levelno+"'>"+levelnm+"</span>");
					arrL.push(" 			<p class='date'>"+i_sTime+"</p>");
					arrL.push("				<p class='name'>"+name+"님은 <em>"+levelnm+"</em>회원이십니다.</p>");
					arrL.push(" 			<span class='btn_ty2 v2'><a href='#' class='OpenB_Btn'>등급별 혜택 확인</a></span>");
					arrL.push(" 	</div>");
					arrL.push("</div>");
				}

				$(".div_userinfo").html(arrL.join(""));
				MobileGetItCoupon.fn.openBenufit();
				MobileGetItCoupon.fn.userLogin();
			},



			getHotsaleGetItCouponList : function (i_sFlagGrade,user_id) {
				MobileCommon.ajax({
					url			: "/mobile/sale/mobile_sale_getit_coupon_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: {
						"i_sFlagMobileOpen":"Y",
						"i_sIssueTarget": $("input[name='i_sIssueTarget']").val()
					},
					animation	: false,
					success		: function (data, textStatus) {
						if ("succ" == data.status) {
							console.log(data);
						}else if("isNotLogin" == data.status){
							if(IS_LOGIN_SNS){
								showConfirmBox({
									message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
									, ok_func : function(){
										var returnUrl = GLOBAL_WEB_URL+"mobile/sale/mobile_sale_getit_coupon.do";
										MobileBodyStart.goLogin(returnUrl);
									}
								    , cancel_func: function(){
										return ;
									}
								});
							}else{
								showConfirmBox({
									message : "로그인 하시면 서비스 이용이 가능하세요!",
									ok_func : function(){
										var returnUrl = GLOBAL_WEB_URL+"mobile/sale/mobile_sale_getit_coupon.do";
										MobileBodyStart.goLogin(returnUrl);
									}
								});
							}
						}else {
							showMessageBox({
								message : data.message
							});
						}

						var obj = data.object.i_sPersonal;
						
						if(obj != undefined && obj.length > 0){
							
							if($("input[name='i_sFlagGrade']").val() != "LV00"){ 
								//$(".anycd").show();
								var length = obj.length;
								var arrL=[];

								for(var i=0; i<length; i++){
									var row=obj[i];
									
									arrL.push("<div class='couponBox'>														");
									if(row.v_flag_pay_money == "P"){
										arrL.push(" 	<p class='couponNm'><span><em>"+row.n_pay_money+"</em>%</span>할인</p>					");
									}else if(row.v_flag_pay_money == "M"){
										arrL.push(" 	<p class='couponNm'><span><em>"+SetNumComma(row.n_pay_money)+"</span>원</p>	");
									}else if(row.v_typecd=="0003"){
										arrL.push("<p class='couponNm'><span><em class='t1'>무료배송</em></span></p>");
									}else if(row.v_typecd=="0005"){
										arrL.push("<p class='couponNm'><span><em class='t1'>사은품증정</em></span></p>");
										
									}
									
										/*arrL.push("<p class='ttl'>");
										var arrTagnm =[];
										var tagnm = row.v_target_tagnm;
										arrTagnm = tagnm.split(",");
										alert(arrTagnm)
										for(var j=0; j<arrTagnm.length;j++){
											var Tname=arrTagnm[j];
											arrL.push("<span class='communityLevel'>"+Tname+"</span>");
										}
										arrL.push("이상"+row.v_couponnm+"</p>");*/
									arrL.push("	<p class='ttl'><span class='communityLevel' style='margin-bottom:8px;'>"+row.v_target_tagnm+" 대상</span><br/><span>"+row.v_couponnm+"</span></p>");
									arrL.push("		<ul>");
									arrL.push("			<li>사용조건 : "+SetNumComma(row.n_min_money)+"원 이상 구매시</li>	");
									if(row.v_flag_range =="D"){
										arrL.push("			<li>유효기간 : 발행일로부터 "+row.n_range_date+"일 까지</li>																	");
									}else if(row.v_flag_range == "R"){
										arrL.push("			<li>유효기간 : "+changeDatePatten(row.v_st_dt)+"~ "+changeDatePatten(row.v_en_dt)+"</li>																	");
									}
									if(row.n_max_dcprc !=undefined && row.n_max_dcprc > 0 ){
										arrL.push("			<li>최대할인금액 : "+SetNumComma(row.n_max_dcprc)+"원</li>");
									}
									arrL.push("		</ul>");
									
									if(row.n_buy_point != undefined && row.n_buy_point > 0 ){
										arrL.push("		<div class='downloadArea v2'>");
										arrL.push("			<button id='"+row.v_couponcd+"/"+row.v_target_tagcd+"/"+row.v_target_tagnm+"/"+row.n_buy_point+"' class='blueR_btn'><span>다운로드</span></button>	");
										arrL.push("			<span class='blueRebon'>블루리본 <em>"+SetNumComma(row.n_buy_point)+"P 차감</em></span>	");
									}else{
										arrL.push("		<div class='downloadArea'>");
										arrL.push("			<button id='"+row.v_couponcd+"/"+row.v_target_tagcd+"/"+row.v_target_tagnm+"' class='blueR_btn'><span>다운로드</span></button>	");
									}
									arrL.push("		</div>						");
									arrL.push("</div>						");

								}
								$(".anycd").append(arrL.join(""));
								MobileGetItCoupon.fn.goCouponBook(user_id);

								$(".basiccd").hide();
							}
							
							var obj2 = data.object.i_sGeneral;
							var length2 = obj2.length;
							var arrL2=[];
							if($("input[name='i_sFlagGrade']").val() == "LV00"){ 
								$(".anycd").hide();
							}
							for(var i=0; i<length2; i++){
								var row= obj2[i];
								arrL2.push("<div class='couponBox'>														");
								if(row.v_flag_pay_money == "P"){
									arrL2.push(" 	<p class='couponNm'><span><em>"+row.n_pay_money+"</em>%</span>할인</p>					");
								}else if(row.v_flag_pay_money == "M"){
									arrL2.push(" 	<p class='couponNm'><span><em>"+SetNumComma(row.n_pay_money)+"</span>원</p>	");
								}else if(row.v_typecd=="0003"){
									arrL2.push("<p class='couponNm'><span><em class='t1'>무료배송</em></span></p>");
								}else if(row.v_typecd=="0005"){
									arrL2.push("<p class='couponNm'><span><em class='t1'>사은품증정</em></span></p>");
									
								}
								if(row.v_flag_code == "S" || row.v_flag_code =="D"){
									
									arrL2.push("	<p class='ttl'><span class='communityLevel'>"+row.v_target_tagnm+" 대상</span><br/>"+row.v_couponnm+"</p>");
								
								}else{
									
									arrL2.push("	<p class='ttl'><span class='communityLevel'>제한없음</span><br/>"+row.v_couponnm+"</p>");
								
								}
								arrL2.push("		<ul>");
								arrL2.push("			<li>사용조건 : "+SetNumComma(row.n_min_money)+"원 이상 구매시</li>	");
								if(row.v_flag_range =="D"){
									arrL2.push("			<li>유효기간 : 발행일로부터 "+row.n_range_date+"일 까지</li>  ");
								}else if(row.v_flag_range == "R"){
									arrL2.push("			<li>유효기간 : "+changeDatePatten(row.v_st_dt)+"~ "+changeDatePatten(row.v_en_dt)+"</li>	");
								}
								if(row.n_max_dcprc !=undefined && row.n_max_dcprc > 0 ){
									arrL2.push("			<li>최대할인금액 : "+SetNumComma(row.n_max_dcprc)+"원</li>");
								}
								arrL2.push("		</ul>");
								
								if(row.n_buy_point != undefined && row.n_buy_point > 0 ){
									arrL2.push("		<div class='downloadArea v2 disable'>");
									arrL2.push("			<button id='"+row.v_couponcd+"/"+row.v_target_tagcd+"/"+row.v_target_tagnm+"/"+row.n_buy_point+"' class='blueR_btn'  disabled='disabled'><span>다운로드</span></button>	");
									arrL2.push("			<span class='blueRebon'>블루리본 <em>"+SetNumComma(row.n_buy_point)+"P 차감</em></span>	");
								}else{
									arrL2.push("		<div class='downloadArea disable'> ");
									arrL2.push("			<button id='"+row.v_couponcd+"/"+row.v_target_tagcd+"/"+row.v_target_tagnm+"' class='blueR_btn'  disabled='disabled'><span>다운로드</span></button>	");
								}
								arrL2.push("		</div>						");
								arrL2.push("</div>						");

							}
							$(".basiccd").append(arrL2.join(""));
							MobileGetItCoupon.fn.goCouponBook(user_id);


							//쿠폰없을 시
						}else{

							$(".anycd").hide();
							$(".basiccd").hide();

							arrL3=[];
							arrL3.push("<div class='noCouponArea'>");
							arrL3.push("<p class='ttl'>현재 다운로드 가능한 쿠폰이 없습니다.</p>");
							arrL3.push("<p class='txt'>조만간 다운로드 할 수 있도록 준비하겠습니다.</p>");
							arrL3.push("</div>");
							$(".noCoupon").append(arrL3.join(""));
						}

					}//data succ

				});//ajax

			}//getHotsaleGetItCouponList
		}//fn
};//



var cnt = 0;
var	MobileMyPouchCouponBook = {
		name : "MobileMyPouchCouponBook",

		init : function() {
			$('.btn_back').attr('href', '/mobile/main.do');

			MobileMyPouchCouponBook.fn.setSubMenuChange();
			var id = $("input[name='i_sPeriod']").val();
			MobileMyPouchCouponBook.fn.MobileMyPouchCouponBookList(id);
		},

		fn : {
			/**
			 * 핫세일 서브 메뉴 처리
			 */
			setSubMenuChange : function() {
				var	select_input	= $('div.selectList>ul>li>input[type=radio]');

				select_input.click(function() {
					location.href	= "/mobile/my/" + $(this).val() + ".do";
				});
			},
			addBtnEvent : function() {
				
				$(".a_goApp_sns").unbind("click").click(function(event){
					event.preventDefault();
					var url = "http://www.amorepacificmall.com/mobile/my/mobile_my_coupon_list.do?i_sFlagSnsBrowser=Y";

					location.href = "http://www.amorepacificmall.com/mobile/goApp.do?target="+ url;
				});

				$(".btn_reg").unbind("click").click(function(event) {
					event.preventDefault();
					if($("input[name='i_sCertifyCode']").val() == ""){
						showMessageBox({
							message : "쿠폰 번호를 입력해주세요."
						});
					}else{
						MobileMyPouchCouponBook.fn.fnCouponReg();
					}
				});
				
				$(".v4").unbind("click").click(function(event){
					//아디 값에 제품코드넣어뒀으니 바꾸기 바람
					event.preventDefault();
					var index=$(".v4").index($(this));
					var i_sCouponcd = $(".v4").eq(index).attr("id");
					MobileMyPouchCouponBook.fn.applicableProduct(i_sCouponcd);
				});
				$("#all").unbind("click").click(function(event){
					event.preventDefault();
					var index = $("#all").index($(this));
					var id = $(this).eq(index).attr("id");
//					MobileMyPouchCouponBook.fn.MobileMyPouchCouponBookList(id);

				});

				$(".btn_Detail").unbind("click").click(function(event){
					event.preventDefault();
					MobileBodyStart.goProductDetail($(this).attr("id"));
//					var url = GLOBAL_WEB_URL+ "mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+$(this).attr("id");
//					if(GLOBAL_FLAG_APP_NEW == "Y") {
//						var arrParam = [];
//						arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='"+GLOBAL_LOGIN_KEY+"'/>");
//						arrParam.push("<input type='hidden' name='i_sLoginType'		value='"+GLOBAL_LOGIN_TYPE+"'/>");
//						arrParam.push("<input type='hidden' name='i_sDeviceNum' 	value='"+GLOBAL_DEVICE_NUM+"'/>");
//						$(arrParam.join("")).appendTo($("form[name='frm']"));
//					}
//					$("form[name='frm']").attr("action", url).submit();
					
				});
			},
			
			fnCouponReg : function() {
				
				var today = $("input[name='i_sToday']").val();
				var code = $("input[name='i_sCertifyCode']").val();
				if(today >= 20170511 && (code =="syrup1" || code =="syrup2" || code == "syrup" || code == "loveap" || code == "luckyap" || code == "saleap" || code=="9loveap" || code=="92loveap")){
					showMessageBox({
						message : "한정수량 마감으로 등록되지 않습니다."
					});
				}else{
					cmAjax({
						url : GLOBAL_WEB_ROOT+"mobile/my/user_cp_user_coupon_save.do"
						, type : "POST"
							, dataType : "json"
								, data : {
									i_sCertifyCode : $("input[name='i_sCertifyCode']").val()
								}
					, animation : false
					, success : function(data, textStatus) {
						if(data.status == "succ") {
							showMessageBox({
								message : "쿠폰이 등록되었어요."
									, close : function() {
										location.href =  GLOBAL_WEB_URL+ "mobile/my/mobile_my_coupon_list.do";	
									}
							});
						}else if("fail" == data.status){
							
							showMessageBox({
								message : data.message
								, close : function() {
								}
							});
						}else{
							showMessageBox({
								message : data.message
							});
						}
					}
					});
					
				}
			},
			
			applicableProduct: function(i_sCouponcd){
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"mobile/my/mobile_applicable_Product_ajax.do",
					type : "POST",
					dataType : "json",
					data: {
						"i_sCouponcd": i_sCouponcd,

					},
					animation : false,
					success : function (data, textStatus){
						if("succ" == data.status){
							var aplist = data.object.aplist;
							var frlist = data.object.frlist;
							var blist = data.object.exblist;
							var plist = data.object.explist;
								
							if(aplist != undefined && aplist.length > 0){
								$(".aphead").show();
								$(".cap").show();
							}else{
								$(".aphead").hide();
								$(".cap").hide();
							}
							if(frlist != undefined && frlist.length > 0){
								$(".frhead").show();
								$(".cfr").show();
							}else{
								$(".frhead").hide();
								$(".cfr").hide();
							}
							if(blist != undefined && blist.length > 0){
								$(".exbhead").show();
								$(".cex_b").show();
							}else{
								$(".exbhead").hide();
								$(".cex_b").hide();
							}
							
							if(plist != undefined && plist != null && plist !=""){
								$(".exphead").show();
								$(".cex_p").show();
							}else{
								
								$(".exphead").hide();
								$(".cex_p").hide();
							}
							
							if(aplist != undefined && aplist.length > 0){
								var length = aplist.length;
								var apHtml= [];
								for(var i=0; i<length; i++){
									var row = aplist[i];
									apHtml.push("<li>");
									apHtml.push("	<div class='prodImg'>");
									apHtml.push("		<a href='#' id='"+row.v_productcd+"' class='btn_Detail'><img src='"+row.v_img_web_path+"' alt=''></a>");
									apHtml.push("	</div>");
									apHtml.push("	<div class='detail'>");
									apHtml.push("		<p class='brandNm'>"+row.v_brandnm+"</p>");
									if(parseInt(row.n_option_cnt) <= 1){
										apHtml.push("		<a href='#' id='"+row.v_productcd+"' class='btn_Detail'><p class='prodNm'>"+row.v_productnm+"</p></a>");
									}else{
										apHtml.push("		<a href='#' id='"+row.v_productcd+"' class='btn_Detail'><p class='prodNm'>"+row.v_productnm+"</p></a>");
										apHtml.push("   	<p class='option'>"+row.v_optionnm+" </p>");
									}
									
									apHtml.push("   	<p class='priceZone'>");
									if(row.v_typecd != "0002"){
										if(row.n_list_price == row.n_price){
											apHtml.push("			<span class='price'><em>"+SetNumComma(row.n_price)+"</em>원</span>");
										}else{
											apHtml.push("			<span class='sale'><em>"+SetNumComma(row.n_list_price)+"</em>원</span>");
											apHtml.push("			<span class='price'><em>"+SetNumComma(row.n_price)+"</em>원</span>");	
										}
									}
									apHtml.push("		</p>");
									apHtml.push("	</div>");
									apHtml.push("</li>");
								}
								$(".cap>ul").html(apHtml.join(""));
							}
							
							
							if(frlist != undefined && frlist.length > 0){
								var length = frlist.length;
								var frHtml= [];
								for(var i=0; i<length; i++){
									var row = frlist[i];
									frHtml.push("<li>");
									frHtml.push("	<div class='prodImg'>");
									frHtml.push("		<img src='"+row.v_img_web_path+"' alt=''>");
									frHtml.push("	</div>");
									frHtml.push("	<div class='detail'>");
									frHtml.push("		<p class='brandNm'>"+row.v_brandnm+"</p>");
									if(row.v_productcd = row.v_optionnm){
										frHtml.push("		<p class='prodNm'>"+row.v_productnm+"</p>");
									}else{
										frHtml.push("		<p class='prodNm'>"+row.v_productnm+"</p>");
										frHtml.push("   	<p class='option'>"+row.v_optionnm+" </p>");
									}
									frHtml.push("   	<p class='priceZone'>");
									if(row.v_typecd != "0002"){
										if(row.n_list_price == row.n_price){
											frHtml.push("			<span class='price'><em>"+SetNumComma(row.n_price)+"</em>원</span>");
										}else{
											frHtml.push("			<span class='sale'><em>"+SetNumComma(row.n_list_price)+"</em>원</span>");
											frHtml.push("			<span class='price'><em>"+SetNumComma(row.n_price)+"</em>원</span>");	
										}
									}
									frHtml.push("		</p>");
									frHtml.push("	</div>");
									frHtml.push("</li>");
								}
								$(".cfr>ul").html(frHtml.join(""));
							}
							
							if(blist != undefined && blist.length > 0){
								var length = blist.length;
								var bHtml= [];
								for(var i=0; i<length; i++){
									var row = blist[i];
									bHtml.push("<li>");
									bHtml.push("		<span class='brandNm'>"+row.v_brandnm+"</span>");
									bHtml.push("		<span class='brandNm'>["+row.v_brandnm_en+"]</span>");
									bHtml.push("</li>");
								}
								$(".cex_b").html(bHtml.join(""));
							}
							
							
							if(plist != undefined && plist.length >0){
								var length = plist.length;
								var pHtml =[];
								for(var i=0; i<length; i++){
									var row = plist[i];
									pHtml.push("<li>");
									pHtml.push("	<div class='prodImg'>");
									pHtml.push("		<img src='"+row.v_img_web_path+"' alt=''>");
									pHtml.push("	</div>");
									pHtml.push("	<div class='detail'>");
									pHtml.push("		<p class='brandNm'>"+row.v_brandnm+"</p>");
									if(row.v_productcd = row.v_optionnm){
										pHtml.push("		<p class='prodNm'>"+row.v_productnm+"</p>");
									}else{
										pHtml.push("		<p class='prodNm'>"+row.v_productnm+"</p>");
										pHtml.push("   	<p class='option'>"+row.v_optionnm+" </p>");
									}
									pHtml.push("   	<p class='priceZone'>");
									if(row.v_typecd != "0002"){
										if(row.n_list_price == row.n_price){
											pHtml.push("			<span class='price'><em>"+SetNumComma(row.n_price)+"</em>원</span>");
										}else{
											pHtml.push("			<span class='sale'><em>"+SetNumComma(row.n_list_price)+"</em>원</span>");
											pHtml.push("			<span class='price'><em>"+SetNumComma(row.n_price)+"</em>원</span>");	
										}
									}
									pHtml.push("		</p>");
									pHtml.push("	</div>");
									pHtml.push("</li>");
								}
								$(".cex_p>ul").html(pHtml.join(""));
								
							}
							modalPopup("#applicableProd");
							MobileMyPouchCouponBook.fn.addBtnEvent();
						}else{
							alert(data.message);
						}
					}
				});
			},

			MobileMyPouchCouponBookList : function (id) {

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
					success		: function (data, textStatus) {
						if ("succ" == data.status) {
							//console.log(data);
						} else {
							alert(data.message);
						}
						var user_id= $("input[name='s_userid']").val();
						var i_sTime = $("input[name='i_sTime']").val();
						if(user_id != undefined && user_id.length > 0){
							var obj = data.object.CList;
							var length = obj.length;

							var arrL=[];
							for(var i=0; i<length; i++){
								var row=obj[i];
								if(row.v_period =="NOW"){
									var sDate = new Date(i_sTime.substr(0, 4), i_sTime.substr(4,2), i_sTime.substr(6, 2));
									var eDate = new Date(row.v_en_dt.substr(0,4), row.v_en_dt.substr(4,2), row.v_en_dt.substr(6, 2));
									var interval = eDate - sDate;
									var day = 1000*60*60*24;
									var remainTime = parseInt(interval / day)+1;
									arrL.push("	<div class='couponSec'>");
									arrL.push("		<p class='ttl'>"+row.v_couponnm+"<em> ("+remainTime+"일남음)</em></p>");
									arrL.push("		<div class='cpArea'>");
									arrL.push("			<div class='couponName'>");
									arrL.push("				<div class='coupon sp_bg s6'>");
									var strtypenm = row.v_typenm;
									var typenm = row.v_typenm;
									var tcnt = strtypenm.search(/\(/g);
									if(tcnt > 0){
										typenm = strtypenm.substring(0,tcnt)+"<br/>"+ strtypenm.substring(tcnt);
									}
									arrL.push("				 	<p class='tit'>"+typenm+"</p>");
									if(row.v_flag_pay_money =="M"){
										arrL.push("		  	   		<p class='txt'><em>"+SetNumComma(row.n_pay_money)+" </em>원</p>");
									}else if(row.v_flag_pay_money =="P"){
										arrL.push("		  	   		<p class='txt'><em>"+row.n_pay_money+" </em>%</p>");
									}else if(row.v_typecd =="0003"){
										arrL.push("		  	   		<p class='txt'><em class='t1'>무료배송</em></p>");
									}else if(row.v_typecd =="0005"){
										arrL.push("		  	   		<p class='txt'><em class='t1'>사은품쿠폰</em></p>");
									}
									arrL.push("				</div>");

									if(row.v_typecd =="0001" || row.v_typecd=="0005"|| row.v_typecd=="0006"){
										if(row.v_typecd == "0005" && row.v_free_product > 0){
											arrL.push("				<span class='btn_ty3 v4' id='"+row.v_couponcd+"'><a href='#'>사은품 확인</a></span>");
										}else{
											if(row.v_ex_brand >0 || row.v_ex_product > 0 || row.v_free_product > 0 || row.v_ap_product > 0){
												arrL.push("				<span class='btn_ty3 v4' id='"+row.v_couponcd+"'><a href='#'>쿠폰정보</a></span>");
											}
										}
									}
									arrL.push("			</div>");
									arrL.push("			<div class='couponDetail'>");
									arrL.push("			<ul>");
									if(row.v_typecd == "0005" && row.n_min_money <= 0){
										arrL.push("				<li><span class='ttl'>조건 : </span>주문시</li>");
									}else{
										if(row.n_prd_min_money >= 1){
											arrL.push("				<li><span class='ttl'>상품별 최소금액 : </span>"+SetNumComma(row.n_prd_min_money)+"원 이상</li>");
										}else{
											arrL.push("				<li><span class='ttl'>최소사용금액 : </span>"+SetNumComma(row.n_min_money)+"원 이상</li>");
										}
									}
									if(row.n_max_dcprc != undefined){
										arrL.push("		  	 	<li><span class='ttl'>최대할인금액 : </span>최대 "+SetNumComma(row.n_max_dcprc)+"원 할인</li>");
									}else if(row.v_typecd =="0003"){
										arrL.push("		  	 	<li><span class='ttl'>최대할인금액 : </span>해당없음</li>");
									}else if(row.v_typecd =="0005"){
										arrL.push("		  	 	<li><span class='ttl'>최대할인금액 : </span>해당없음</li>");
									}else{
										arrL.push("		  	 	<li><span class='ttl'>최대할인금액 : </span>해당없음</li>");
									}
//									if(row.v_flag_range == "R"){
										arrL.push("				<li><span class='ttl'>만료예정일 : </span>"+changeDatePatten(row.v_en_dt)+"</li>");	
//									}else if(row.v_flag_range =="D"){
//										arrL.push("				<li><span class='ttl'>만료예정일 : </span> 발행일로부터 "+row.n_range_date+"일 까지</li>");
//									}

									arrL.push("			</ul>");
									arrL.push("			</div>");
									arrL.push("		</div>");
									arrL.push("	</div>");
									cnt++;
								}
							}
							if(cnt > 0){
								$(".cp_1").html(arrL.join(""));
								cnt = 0;
							}else{
								var NodHtml = [];
								NodHtml.push("<div class=\"nodata\">");
								NodHtml.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
								NodHtml.push("</div>");
								$(".cp_1").html(NodHtml.join(""));
							}
							var obj = data.object.CList;
							var length = obj.length;

							var arrL2=[];
							for(var i=0; i<length; i++){
								var row=obj[i];
								if(row.v_period =="NEXT"){
									var sDate = new Date(i_sTime.substr(0, 4), i_sTime.substr(4,2), i_sTime.substr(6, 2));
									var eDate = new Date(row.v_en_dt.substr(0,4), row.v_en_dt.substr(4,2), row.v_en_dt.substr(6, 2));
									var interval = eDate - sDate;
									var day = 1000*60*60*24;
									var remainTime = parseInt(interval / day)+1;
									arrL2.push("	<div class='couponSec'>");
									arrL2.push("		<p class='ttl'>"+row.v_couponnm+"<em> ("+remainTime+"일남음)</em></p>");
									arrL2.push("		<div class='cpArea'>");
									arrL2.push("			<div class='couponName'>");
									arrL2.push("				<div class='coupon sp_bg s6'>");
									var strtypenm = row.v_typenm;
									var typenm = row.v_typenm;
									var tcnt = strtypenm.search(/\(/g);
									if(tcnt > 0){
										typenm = strtypenm.substring(0,tcnt)+"<br/>"+ strtypenm.substring(tcnt);
									}
									arrL2.push("				 	<p class='tit'>"+typenm+"</p>");
									if(row.v_flag_pay_money =="M"){
										arrL2.push("		  	   		<p class='txt'><em>"+SetNumComma(row.n_pay_money)+"</em>원</p>");
									}else if(row.v_flag_pay_money =="P"){
										arrL2.push("		  	   		<p class='txt'><em>"+row.n_pay_money+"</em>%</p>");
									}else if(row.v_typecd =="0003"){
										arrL2.push("		  	   		<p class='txt'><em class='t1'>무료배송</em></p>");
									}else if(row.v_typecd =="0005"){
										arrL2.push("		  	   		<p class='txt'><em class='t1'>사은품쿠폰</em></p>");
									}
									arrL2.push("				</div>");

									if(row.v_typecd =="0001" || row.v_typecd=="0005" || row.v_typecd=="0006" ){
										if(row.v_typecd == "0005" && row.v_free_product > 0){
											arrL2.push("				<span class='btn_ty3 v4' id='"+row.v_couponcd+"'><a href='#'>사은품 확인</a></span>");
										}else{
											if(row.v_ex_brand >0 || row.v_ex_product > 0 || row.v_free_product > 0 || row.v_ap_product > 0){
												arrL2.push("				<span class='btn_ty3 v4' id='"+row.v_couponcd+"'><a href='#'>쿠폰정보</a></span>");
											}
										}
									}
									arrL2.push("			</div>");
									arrL2.push("			<div class='couponDetail'>");
									arrL2.push("			<ul>");
									if(row.v_typecd == "0005" && row.n_min_money <= 0){
										arrL2.push("				<li><span class='ttl'>조건 : </span>주문시</li>");
									}else{
										if(row.n_prd_min_money >= 1){
											arrL2.push("				<li><span class='ttl'>상품별 최소금액 : </span>"+SetNumComma(row.n_prd_min_money)+"원 이상</li>");
										}else{
											arrL2.push("				<li><span class='ttl'>최소사용금액 : </span>"+SetNumComma(row.n_min_money)+"원 이상</li>");
										}
									}
									if(row.n_max_dcprc != undefined){
										arrL2.push("		  	 	<li><span class='ttl'>최대할인금액 : </span>최대 "+SetNumComma(row.n_max_dcprc)+"원 할인</li>");
									}else if(row.v_typecd =="0003"){
										arrL2.push("		  	 	<li><span class='ttl'>최대할인금액 : </span>해당없음</li>");
									}else if(row.v_typecd =="0005"){
										arrL2.push("		  	 	<li><span class='ttl'>최대할인금액 : </span>해당없음</li>");
									}else{
										arrL2.push("		  	 	<li><span class='ttl'>최대할인금액 : </span>해당없음</li>");
									}
//									if(row.v_flag_range == "R"){
										arrL2.push("				<li><span class='ttl'>만료예정일 : </span>"+changeDatePatten(row.v_en_dt)+"</li>");	
//									}else if(row.v_flag_range =="D"){
//										arrL2.push("				<li><span class='ttl'>만료예정일 : </span> 발행일로부터 "+row.n_range_date+"일 까지</li>");
//									}
									arrL2.push("			</ul>");
									arrL2.push("			</div>");
									arrL2.push("		</div>");
									arrL2.push("	</div>");
									cnt++;
								}
							}
							if(cnt > 0){
								$(".cp_2").html(arrL2.join(""));
								cnt = 0;
							}else{
								var NodHtml = [];
								NodHtml.push("<div class=\"nodata\">");
								NodHtml.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
								NodHtml.push("</div>");
								$(".cp_2").html(NodHtml.join(""));
							}
							MobileMyPouchCouponBook.fn.addBtnEvent();
						}
					}
				});
				

				$(".couponbook").show();
			}
		}//fn
};//MobileHotsaleClubAp



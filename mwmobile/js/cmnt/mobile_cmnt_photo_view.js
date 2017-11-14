var i_sEvtCategorycd = "";
var	MobilePhotoView = {
	name : "MobilePhotoView",

	init : function() {
		
		MobilePhotoView.fn.setSubMenuChange();
		MobilePhotoView.fn.getPageInit();
		i_sEvtCategorycd = $("input[name='i_sEvtCategorycd']").val();
	},
	isLoadingContent : false,
	
	fn : {	
		getParameter : function(){
			var parameter = {
					"i_iNowPageNo"	: parseInt($('#i_iNowPageNo').val() || "1", 10),
					"i_iPageSize"		: parseInt($('#i_iPageSize').val() || "6", 10),
					"i_iTotalPageCnt"	: parseInt($('#i_iTotalPageCnt').val() || "1", 10),
					"i_iRecordCnt"		: parseInt($('#i_iRecordCnt').val() || "1", 10),
					"i_sReviewcd"		: $("input[name='i_sReviewcd']",frm).val(),
					"i_sFlagAction"		: ""
			};
			return parameter;
		},
		
		addBtnEvent : function(){			
			$(".btn_back").unbind("click").click(function(event){				
				event.preventDefault();
				var frm_login = $("form[name='frm_login']"); 
				var returnUrl = $("input[name='i_sReturnUrl']", frm_login).val();
				var returnParam = $("input[name='returnParam']",frm_login).val();
				if(returnUrl != "" && returnUrl != undefined){
					if(returnParam != ""){
						location.href= returnUrl+"?"+returnParam;
					}else{
						location.href= returnUrl;
					}
				}else{
					MobileBodyStart.fnAppendUserInfoSubmit($("form[name='frm']"), GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_list.do");
				}
			});
			
			$(".btn_List").unbind("click").click(function(event){
				event.preventDefault();
				
				var showViewFlag = $("input[name='i_sShopViewFlag']").val();
				
				var frm = $("form[name='frm']"); 
				var returnUrl = $("#i_sReturnUrl", frm).val();
				
				if(showViewFlag == "Y"){
					var productCd = $("input[name='i_sProductcd']").val();
					MobileBodyStart.goProductDetail(productCd);
				}else if(returnUrl != "" && returnUrl != undefined){
					document.location.href = returnUrl;
				}else{
					MobileBodyStart.fnAppendUserInfoSubmit($("form[name='frm']"), GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_list.do");
				}				
			});
			$(".btn_detailDelete").unbind("click").click(function(event){
				event.preventDefault();				
				showConfirmBox({
					message : "글을 삭제하실 경우 적립된 블루리본포인트도 차감되어요.<br/>정말 삭제하시겠어요?"
					
						, ok_func : function(){
							MobilePhotoView.fn.goDelete();
						}
				});
			});
			$(".modify_content").unbind("click").click(function(event){
				event.preventDefault();
				var flagopen = $(this).attr("id");
				$("input[name='i_sDetailFlag']",frm).val('Y');
				$("input[name='i_sFlagOpen']", frm).val(flagopen);
				MobilePhotoView.fn.goModify();
			});			
			$(".ico_like").unbind("click").click(function(event){ 
				event.preventDefault();
				$("input[name='i_sReviewCd']").val();
				var id = $(this).attr("id");				
				$("input[name='i_sReviewCd']", frm).val(id);
				
				var idx = $(".ico_like").index($(this));
				
				if($("#i_sLevelcd").val()!='LV14'){
					MobilePhotoView.fn.addLike(idx);
				}
			});
			
			/**
			* 글, 댓글, 대댓글 신고
			* */
			$(".btn_cmtreport").unbind("click").click(function(event){
				event.preventDefault();
				var frm = $("form[name='frm']");
				var id = $("input[name='i_sReviewcd']").val();
				var returnurl = GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_view.do?i_sReviewcd="+id;
				$("input[name='i_sRecordid']").val(id);
				$("input[name='i_sReturnurl']").val(returnurl);
				$("input[name='i_sTable']").val("CMC_REPLY");
				MobileBodyStart.fnAppendUserInfoSubmit(frm, GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_cmc_report.do");
			});

			$(".btn_recmt_report").unbind("click").click(function(event){
				event.preventDefault();
				var frm = $("form[name='frm']");
				var id = $("input[name='i_sReviewcd']").val();
				var returnurl = GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_view.do?i_sReviewcd="+id;
				$("input[name='i_sRecordid']").val(id);
				$("input[name='i_sReturnurl']").val(returnurl);
				$("input[name='i_sTable']").val("CMC_REPLY");
				MobileBodyStart.fnAppendUserInfoSubmit(frm, GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_cmc_report.do");
			});

			$(".btn_beautyProfile").unbind("click").click(function(event){
				event.preventDefault();
				var id = $(this).attr("id");
				MobileBeautyProfile.fn.addPopupBtnEvent(id);
			});

			$(".btn_write").unbind("click").click(function(event){
				event.preventDefault();

				var id = $("input[name='i_sReviewcd']").val();
				var returnurl = encodeURIComponent(GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_view.do?i_sReviewcd="+id);

				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_photo_login_check_ajax.do",
					type  : "post",
					dataType : "json",
					data : "",
					success : function( data, textStatus){
						if(data.status == 'succ'){
							location.href = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_photo_reg.do";
						}else{
							if(data.object == 'login'){
								if(IS_LOGIN_SNS){
									showConfirmBox({
										message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
										, ok_func : function(){
											MobileBodyStart.goLoginPage();
										}
										, cancel_func: function(){
											return ;
										}
									});
								}else{
									showConfirmBox({
										message : "로그인 하시면 서비스 이용이 가능하세요!",
										ok_func : function() {
											MobileBodyStart.goLoginPage();
										}
									});
								}
							}else{
								showMessageBox({
									message : data.message 
									, close : function() {
										if(typeof data.object != "undefined" && !isEmpty(data.object)) {
											document.location.href = GLOBAL_WEB_URL + data.object + "?i_sReturnUrl=" + returnurl;
										}
									}
								});
							}
						}
					}
				});
			});
			$(".btn_prod_detail").unbind("click").click(function(event){
				event.preventDefault();
				var id = $(this).attr("id");
				showConfirmBox({
					message : "해당 상품 상세정보 페이지로 이동하시겠습니까?"
					, ok_func : function(){
						MobileBodyStart.goProductDetail(id);
					}
				});
			 });
		},
		
		setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');

			select_input.click(function() {
				location.href	= GLOBAL_WEB_URL + "mobile/cmnt/" + $(this).val() + ".do";
			});
		},		 
       
		getPageInit : function() {
			var frm = $("form[name='frm']");
			var id = $("input[name='i_sReviewcd']", frm).val();
			var flagMyPouch = $("input[name='i_sFlagMyPouch']",frm).val();
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/cmnt/mobile_cmnt_photo_view_ajax.do",
				type		: "post",
				dataType	: "json",
				data		: {
					"i_sReviewcd" : id
					,i_sFlagAction : "V"
					,i_sFlagMyPouch : flagMyPouch
				},
				animation	: false,
				success		: function (data, textStatus) {
					if(data.status =='succ'){
						var i_sFlagLike = data.object.review.i_sFlagLike;
						var detail = data.object.detail;						
						
						MobilePhotoView.fn.detailView(detail,i_sFlagLike);						
						MobilePhotoView.fn.addBtnEvent();
						
						MobilePhotoView.fn.setProdList(data.object);
						
						window.otherReviewSwipe = new Swipe(document.getElementById('otherReviewSwipe'), {
			                continuous: true,
			                stopPropagation: true,
			                callback: function(event, element) {
			                	var len = $("#otherReview-nav2 > span").length;
			            		var idx = event;
			            		
			            		if (len == 2) {
			            			idx = event % 2;
			            		}
			            		
			                    $("#otherReview-nav2 > span").removeClass().eq(idx).addClass("active");
			                }
			            });	
						
						MobileComment.fn.getInit($("input[name='i_sReviewcd']").val(), 1, "CMC_REVIEW", "", "");
						MobileComment.init();
						
						if($("#i_sFlagReply").val() == "Y") {
							$('body, html').animate(
								{scrollTop : $(".commentArea").offset().top}, 300
							);
						}
					}
					}
				});
		},
		
		addLike : function(idx){
			var frm = $("form[name='frm']");
			var isLogin = $("input[name='isLogin']", frm).val();
			var vote = parseInt(SetNum($(".count").eq(0).text()));
			if(isLogin == 'N'){				
				if(IS_LOGIN_SNS){
					showConfirmBox({
						message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
						, ok_func : function(){
							MobileBodyStart.goLoginPage();
						}
					    , cancel_func: function(){
							return ;
						}
					});
				}else{
					showConfirmBox({
						message : "로그인 하시면 서비스 이용이 가능하세요!"
							, ok_func : function(){
								MobileBodyStart.goLoginPage();
							}
					});
				}
			}
			else {
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "mobile/shop/mobile_shop_review_vote_save.do"
					, type : "POST"
					, dataType : "json"
					, data : {
						"i_sReviewcd" : $("input[name='i_sReviewcd']").val()
						, "i_sType" : "photo"
						
					}
					, animation : false
					, success : function(data, textStatus, jqXHR){
						if(data.status == 'succ'){
							if(data.object == 'cancel'){
								$(".count").text(vote-1+"명");
								$(".ico_like").removeClass("active");
							}else{
								$(".count").text(vote+1+"명");
								balloonOpen(".ico_like");
							}
						} else if(data.status == 'isNotLogin'){
							if(IS_LOGIN_SNS){
								showConfirmBox({
									message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
									, ok_func : function(){
										MobileBodyStart.goLoginPage();
									}
								    , cancel_func: function(){
										return ;
									}
								});
							}else{
								showConfirmBox({
									message : "로그인 하시면 서비스 이용이 가능하세요!"
										, ok_func : function(){
											MobileBodyStart.goLoginPage();
										}
								});
							}
						} else {
							showMessageBox({
								message : data.message
							});
						}
					}
				});
			}
		},		
		
		goDelete : function(){
			var frm = $("form[name='frm']");
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/cmnt/mobile_cmnt_photo_save_ajax.do",
				type : "post",
				dataType : "json",
				data : {"i_sReviewcd" : $("input[name='i_sReviewcd']", frm).val(),
							"i_sFlagAction" : "D"
					},
				animation : false,
				success : function(data, textStatus){
					document.location.href = GLOBAL_WEB_URL +"mobile/cmnt/mobile_cmnt_photo_list.do";
				}
			});
		},
		
		goModify : function(){
			var frm = document.frm;
			
			frm.action = GLOBAL_WEB_URL +"mobile/cmnt/mobile_cmnt_photo_reg.do";
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
			frm.submit();
		},
		
		/**
		 * 포토리뷰 상세페이지 
		 * */
		detailView : function(object,i_sFlagLike){
			var frm = $("form[name='frm']");
			var userid = $("input[name='i_sUserid']",frm).val();
			var level = object.main.v_user_level;
			var vote = object.main.n_vote_cnt;
			var imglist = object.imglist;
			var flagsort = $("input[name='i_sFlagSort']", frm).val();
			var flagopen = "";
			if(flagsort == "B"){
				flagopen = "R";
			}else if(flagsort == "N"){
				flagopen = "N";
			}
			
			var clob = object.main.v_clob;
			
			if(clob == undefined){
				clob = "내용이 없습니다.";
			} else {
				clob = clob.replace(/\[image#(.*?)\]/g, "");
			}
			if(vote == undefined){
				vote = 0;
			}
			
			if(level != undefined){
				level = "m"+level.substr(3,1);
			}else{
				level = "m1";
			}
			
			var ct_level = object.main.v_cmt_levelcd;
			if(ct_level != undefined){
				var ctlevel = "c"+ct_level.substr(6,1);
			}else{
				ctlevel = "";
			}
			
			var date = object.main.v_reg_dtm;
			var cDate = changeBeforeDate(date);
			
			/*var imageUrl = "";
			if(imglist != undefined && imglist.length > 0){
				for(var j = 0; j<imglist.length; j++){
					if(imglist[j].v_recordid == object.main.v_reviewcd){
						imageUrl = imglist[j].v_image_path.replace("_100","");
					}
				}
			}*/
			 
			var arrHtml = [];
			
			if(object.main.v_flag_best =='Y'){
			arrHtml.push("<div class =\"bestArea\">");
			arrHtml.push("		<span class=\"ico_best\">Best</span>");
			arrHtml.push("</div>");
			}
			if(object.main.v_reg_channel == "MOBILE" || object.main.v_reg_channel == "APP"){
				arrHtml.push("	<span class=\"sp_ico i1\" style=\"float:left; margin-top:5px;\">모바일</span>");
			}
			arrHtml.push("<p class=\"subject\">"+object.main.v_title+"</p>");
			arrHtml.push("<div class=\"userInfoArea\">");
			arrHtml.push("		<div class=\"photoZ\"><img src =\""+object.main.v_user_img+"\" alt=\"\" onerror=\"fnNoImageUser(this);\"></div>");
			arrHtml.push("		<div class=\"userInfoZ\">");
			arrHtml.push("		<div class=\"name\">");
			arrHtml.push("			<p>");
			if(object.main.v_nickname != undefined){
				arrHtml.push("			<span class=\"nm\">"+object.main.v_nickname+"</span>");
			}else{
				arrHtml.push("			<span class=\"nm\">"+getStringReverseHidden(object.main.v_userid,3)+"</span>");
			}
			if(object.main.n_bpcnt > 0){
			arrHtml.push("			<a href=\"#\" id = \""+object.main.v_userid+"\"class=\"btn_beautyProfile\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_beautyProfile.png\" /></a>");
			}
			arrHtml.push("			</p>");
			arrHtml.push("		</div>");
			arrHtml.push("		<div class=\"gradeZone\">");
			arrHtml.push("			<span class=\"ico_memberLevel "+level+"\">일반</span>");
			arrHtml.push("			<span class=\"ico_communityLevel "+ctlevel+"\"></span>");
			arrHtml.push("	<span class=\"f_st1\"style=\"float:right\">조회수 :"+object.main.n_view_cnt+"</span>");
			arrHtml.push("		</div>");
			arrHtml.push("</div>");
			arrHtml.push("</div>");
			arrHtml.push("<div class=\"info\">");
			arrHtml.push("		<span class=\"date\">"+cDate+"</span>");
			arrHtml.push("		<div class=\"btnBundle\">");
			
			if(userid==object.main.v_userid){	        	
	        	arrHtml.push("<a href=\"#\" class=\"btn_modify modify_content\" id='"+flagopen+"'>수정</a>");
	            arrHtml.push("<span class=\"term\"></span>");
	            arrHtml.push("<a href=\"#\" class=\"btn_delete btn_detailDelete\">삭제</a>");
	        }
			arrHtml.push("		</div>");
			arrHtml.push("</div>");
			arrHtml.push("<div class=\"cont\">");
			arrHtml.push("		<span class=\"thumbImg\">");
			/*arrHtml.push("			<img src=\""+imageUrl+"\" alt=\"리뷰이미지\">");*/
			arrHtml.push("		</span>");
			arrHtml.push("		<div class=\"txt div_content\">"+clob+"</div>");
			if(object.main.v_rv_typecd == "DC_T002"){	//뷰티테스터일때
				arrHtml.push("			<div class=\"div_content_footer\" align=\"center\" style=\"margin-top:30px;\">");
				arrHtml.push("			<img src=\""+GLOBAL_MOBILE_IMG_URL+"content/review_banner.jpg\" alt=\"아모레퍼시픽 제공\">");
				arrHtml.push("			</div>");            	
			}else if(object.main.v_rv_typecd == "DC_T004"){	//AP 프렌즈일때 
				arrHtml.push("			<div class=\"div_content_footer\" align=\"center\" style=\"margin-top:30px;\">");
				arrHtml.push("			<img src=\""+GLOBAL_MOBILE_IMG_URL+"content/review_banner_Apfriends.jpg\" alt=\"아모레퍼시픽 제공\">");
				arrHtml.push("			</div>");            	
			}
			arrHtml.push("</div>");
			arrHtml.push("<div class=\"evaluationZone\">");
				if(i_sEvtCategorycd != 'AM004'){
				arrHtml.push("		<ul>");
				arrHtml.push("			<li>");
				arrHtml.push("				<span class=\"ttl\">사용감</span>");
				arrHtml.push("				<span class=\"gradeType3 grade0"+object.main.n_use_point+"\"><span class=\"hide\">"+object.main.n_use_point+"점</span></span>");
				arrHtml.push("			</li>");
				arrHtml.push("			<li>");
				arrHtml.push("				<span class=\"ttl\">추천의사</span>");
				arrHtml.push("				<span class=\"gradeType3 grade0"+object.main.n_recom_point+"\"><span class=\"hide\">"+object.main.n_recom_point+"점</span></span>");
				arrHtml.push("			</li>");
				arrHtml.push("		</ul>");
				}
			arrHtml.push("</div>");
			
			arrHtml.push("<div class=\"recommendArea\">");
			if(i_sFlagLike != undefined && i_sFlagLike =='Y'){
				arrHtml.push("		<a href=\"#balloonLike\" class=\"ico_like active\">");
				
			}else{
				arrHtml.push("		<a href=\"#balloonLike\" class=\"ico_like\">");
			}
			arrHtml.push("			<span class=\"btn\" onclick=\"trackClicksMall('평점','포토리뷰 리스트^포토리뷰 상세^추천하기','포토리뷰 상세^추천하기','event5','true','추천하기');\">추천꾹!</span>");
			arrHtml.push("			<span class=\"count\">"+vote+"명</span>");
			arrHtml.push("		</a>");
			arrHtml.push("</div>");
			
			$(".div_photo_detail").html(arrHtml.join(""));
			
			if(object.imglist != undefined && object.imglist.length > 0) {
	        	var imgList = object.imglist;
	        	var message = object.main.v_clob;
	        	for(var i = 0; i < imgList.length; i++) {
	        		var imageUrl = imgList[i].v_image_path.replace("_100", "_680");
	        		message = message.replace(imgList[i].v_buffer1, "<img src=\""+ imageUrl +"\" onerror=\"fnNoImage(this);\"/>");
	        	}
	        	$(".div_content").html(message);		        	
	        }
			MobilePhotoView.fn.addBtnEvent();
			
		},	
		
		
		/**
		 * 리뷰상품 목록
		 * */
		
		setProdList : function(object){
			
			var prodlist = object.review.product;
			
			if(prodlist != undefined && prodlist.length >0){
				var arrHtml = [];
				var len = prodlist.length;				
				for(var i =0; i< prodlist.length; i++){
					
					if(i%4==0){
						arrHtml.push("			<div class=\"prodAlbumType v2\">");
						arrHtml.push("				<ul class=\"ul_product\">");
					}
					
				arrHtml.push("					<li>");
				arrHtml.push("						<a href=\"#\" id=\""+prodlist[i].v_productcd+"\" class=\"btn_prod_detail\">");				
				arrHtml.push("							<div class=\"thumbImg\">");
				arrHtml.push("								<img src=\""+prodlist[i].v_img_web_path+"\" alt=\""+prodlist[i].v_productnm+"\" onClick=\"trackClicksMall('상품','모바일 포토리뷰^상세','포토리뷰^리뷰상품','event5',true,'"+prodlist[i].v_productcd+"');\">");
				arrHtml.push("							</div>");
				arrHtml.push("							<div class=\"prodDetail\">");
				arrHtml.push("								<p class=\"brandNm ellipsis\">"+prodlist[i].v_brandnm+"</p>");
				arrHtml.push("								<p class=\"prodNm\">"+prodlist[i].v_productnm+"</p>");
				if(parseInt(prodlist[i].n_option_cnt) > 1) {
					arrHtml.push("								<p class=\"option\">"+prodlist[i].v_optionnm+"</p>");
				}
				arrHtml.push("								<p class=\"priceZone\">");
				if(parseInt(prodlist[i].n_price) < parseInt(prodlist[i].n_list_price)){
				arrHtml.push("									<span class=\"sale\"><em>"+SetNumComma(prodlist[i].n_list_price)+"</em>원</span>");
				}
				arrHtml.push("									<span class=\"price\"><em>"+SetNumComma(prodlist[i].n_price)+"</em>원</span>");
				arrHtml.push("								</p>");
				arrHtml.push("								<div class=\"prodEvalu\">");
				arrHtml.push("									<span class=\"gradeType2 grade0"+Math.round(prodlist[i].n_single_point)+"\"><span class=\"hide\">평점 "+prodlist[i].n_single_point+"</span></span>");
				arrHtml.push("									<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+prodlist[i].n_review_cnt+")</span>");
				arrHtml.push("								</div>");
				if(prodlist[i].v_statuscd == "0002" || parseInt(prodlist[i].n_stockqty) == 0) {
				arrHtml.push("								<span class=\"stateArea\">");
				arrHtml.push("									<span class=\"ico_state st1\">품절</span>");
				arrHtml.push("								</span>");
				}
				arrHtml.push("							</div>");
				arrHtml.push("						</a>");
				arrHtml.push("					</li>");
				
				if(i%4==3 || i == len-1){
				arrHtml.push("				</ul>");
				arrHtml.push("		</div>");
					}
				}//end for
				
				var otherReviewNav = [];
				var navi_no = 0;
				for(var i =0; i<len; i++){
					var active = "";
					if(i%4 ==0){
						navi_no++;
						if(navi_no == 1){
							active = "class=\"active\"";
						}
						else {
							active = "";
						}
						otherReviewNav.push("<span " +active+ " style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
					}
				}
				$(".otherReviewSwipe-wrap").append(arrHtml.join(""));
				$(".otherReview-nav").html(otherReviewNav.join(""));
				MobilePhotoView.fn.addBtnEvent();
			} //end if
		},
	 
		getMore : function(){
			var i_iNowPageNo = parseInt($('#i_iNowPageNo').val(),10)+1;
			MobilePhotoView.fn.showCommentList(i_iNowPageNo);
			MobilePhotoView.fn.addBtnEvent();
		}
	}
};
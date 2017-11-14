var parameter = {
		i_iNowPageNo	: parseInt($('#i_iNowPageNo').val() || "1", 10),
		i_iNowPrePageNo	: parseInt($('#i_iNowPageNo').val() || "1", 10),
		i_iPageSize		: parseInt($('#i_iPageSize').val() || "6", 10),
		i_iTotalPageCnt	: parseInt($('#i_iTotalPageCnt').val() || "1", 10),
		i_iRecordCnt	: parseInt($('#i_iRecordCnt').val() || "1", 10),
		i_sSortCol : "",
		i_sSortDir : "DESC",
		i_sFlagPreTop : "",
		i_sStDt : "",
		i_sEnDt : "",
		i_arrCategorycd :[],
		i_sFlagListAction : "",
		pageStack : [],
		i_arrProductcd : [],
		i_arrProductnm : []
};
var	MobilePhotoReview = {
	name : "MobilePhotoReview",

	init : function() {
		$('.btn_back').attr('href', '/mobile/main.do');
		MobilePhotoReview.fn.setSubMenuChange();
		MobilePhotoReview.fn.getPageInit();
		MobilePhotoReview.fn.addScrollEvent();
		
		$("#i_sKeyword").autocomplete({
			source: function(request, response){
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT + "mobile/cmnt/mobile_cmnt_photo_prod_list_ajax.do",
					type : "post",
					dataType : "json",
					data : {"i_sKeyword" : $("#i_sKeyword").val()},
					async : false,
					animation : false,
					success : function(data, textStatus){
						response($.map(data.object.prod.searchlist, function(item){
							return{
								label : item.v_productnm,
								value : item.v_productcd
							};
						}));
					}
				});
			}
			, appendTo : ".suggestBox"
			, minLength : 2
			, open : function() {
				$(".btn_search_close", ".suggestBox").remove();
				$(".suggestBox").append("<a href=\"#\" class=\"btn_close btn_search_close\"><span>닫기</span></a>");
				$(".ui-autocomplete").attr("style", "width: 1904px; position: relative; left: 10px;");
			}
			, select : function(ui, event) {
				var id = event.item.value;
				if($("#search"+id).length > 0){
					showMessageBox({
						message : "이미 선택하신 상품이에요."						
					});
				} else{
				var resultHtml = "<a href=\"#\" class=\"btn_prod_del\">"+event.item.label;
				resultHtml += "<input type=\"hidden\" class = \"i_arrProductcd\" name = \"i_arrProductcd\" id=\"search"+event.item.value+"\" value = \""+event.item.value+"\"/></a>";
				parameter.i_arrProductnm.push(event.item.label);
				$(".div_search_result").append(resultHtml);
				
				
				MobilePhotoReview.fn.reviewList(1);
				}
			}
			, close : function() {
				setTimeout(function(){
					$(".btn_search_close", ".suggestBox").remove();
					
					if($(".btn_prod_del").length > 0) {
						$("#i_sKeyword").val("");
					}
				}, 10);
			}
		}).data("ui-autocomplete")._renderItem = function(ul, item) {
			var keyword = $("#i_sKeyword").val();
			var item_value = item.label.replace(keyword, "<span class=\"word\">"+keyword+"</span>");
			var inner_html = "<li><a href=\"#\" id=\""+item.value+"\" class=\"btn_search_select\">"+item_value+"</a></li>";
			
			return $("<li></li>")
				.data( "item.autocomplete", item )
				.append(inner_html)
				.appendTo(ul);
		};

		MobilePhotoReview.fn.addPopupBtnEvent();
	},
	isLoadingContent : false,
	
	fn : {	 
		setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');

			select_input.click(function() {
				location.href	= GLOBAL_WEB_URL + "mobile/cmnt/" + $(this).val() + ".do";
			});
		},	
		
		addBtnEvent : function(){
			
			$(".list").unbind("click").click(function(event) {
				MobilePhotoReviewStyle.fn.resortList();
			});
			
			$(".album").unbind("click").click(function(event) {
				MobilePhotoReviewStyle.fn.resortAlbum();
			});
			
			/**
			 * 최신, 추천, 댓글순
			 * */
			$("#radio1").unbind("click").click(function(){
				
				if($(this).is(":checked")){
					$("input[name='i_sSortCol']").val("V_REG_DTM");					
				    $("#radio1").prop("checked","checked");
				    $("i_sFlagListAction").val("C");
				    parameter.pageStack = new Array();
				    MobilePhotoReview.fn.reviewList(1);
				}				
			});
			$("#radio2").unbind("click").click(function(){
				
				if($(this).is(":checked")){
					$("input[name='i_sSortCol']").val("N_VOTE_CNT");
					$("#radio2").prop("checked","checked");
					parameter.pageStack = new Array();
					MobilePhotoReview.fn.reviewList(1);					
				}
			});
			$("#radio3").unbind("click").click(function(){
				
				if($(this).is(":checked")){
					$("input[name='i_sSortCol']").val("REPLY_CNT");
					$("#radio3").prop("checked","checked");
					parameter.pageStack = new Array();
					MobilePhotoReview.fn.reviewList(1);
				}
			});
			/**
			 * 카테고리 선택시 보여줄 리스트 
			 * */			
			$(".input_chk").unbind("click").click(function(){
					var id = $(this).attr("id");
					var idx = $(".input_chk").index(this);					
					
					if($(this).is(":checked")) {
						
						if(id != "categorycd1") {
							$("#"+id).prop("checked",true);
							
							$("label", ".inputChk5").eq(0).removeClass("l_active");
						} else {
							$(".input_chk").prop("checked",false);
							$("label", ".inputChk5").eq(idx).addClass("l_active");
						}
					} else {
						$("#"+id).prop("checked",false);
					}
					
					if($(".input_chk:checked").length == 0) {
						$("label", ".inputChk5").eq(0).addClass("l_active");
					}
							
					$("input[name='i_arrCategorycd']").val();
					
					//parameter.pageStack = new Array();
					MobilePhotoReview.fn.reviewList(1);
			});
			
			
			$(".btn_listDetail").unbind("click").click(function(event){
				event.preventDefault();
				//var idx = $(".btn_listDetail").index($(this));
				var id = $(this).attr("id");	
				
				MobilePhotoReview.fn.goDetail(id);
			});
 
			 $(".btn_beautyProfile").unbind("click").click(function(event){
				  event.preventDefault();
				  var id = $(this).attr("id");
				  MobileBeautyProfile.fn.addPopupBtnEvent(id);
			   });
			 
			 $(".btn_prod_del").unbind("click").click(function(event){
				 event.preventDefault();
				 $(this).remove();
				 MobilePhotoReview.fn.reviewList(1);
			 });
			 
			 $(".btn_write").unbind("click").click(function(){
				 if($("input[name='i_sCmtLevel']").val() == 'CZ_L005'){
						showMessageBox({
							message : "현재, 회원님의 커뮤니티 활동(게시물작성, 댓글등록)에 대해 신고접수가 들어와 <br/>커뮤니티 활동이 제한됨을 알려드립니다. "
						});
					}else if(!IS_LOGIN){
//						var options = {
//	            				type : "page_move"
//	            				, url : GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_list.do"
//	            				, param : ""
//	            			 };
//						MobileBodyStart.fnLoginCheck(options);
						MobileBodyStart.goLoginPage();
					}else{
						var url = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_photo_list.do";
						$(this).attr('href',GLOBAL_WEB_URL+'mobile/cmnt/mobile_cmnt_photo_reg.do?i_sReturnUrl='+url);
					}
					
				
			 });
			 
			$(document).unbind("click").on("click", ".btn_prod_detail", function(event){
				event.preventDefault();
				var productCd = $(this).attr("id");
				showConfirmBox({
					message : "해당 상품 상세정보 페이지로 이동하시겠습니까?"
						, ok_func : function(){
							MobileBodyStart.goProductDetail(productCd);
						}
				});
			});
				
		},
		
		addScrollEvent:function(){
        	$(window).scroll(function(event){
        		if(!MobilePhotoReview.isLoadingContent && $(window).scrollTop() >= ($(document).height()- $(window).height()-100) &&
        				parseInt(parameter.i_iNowPageNo) < parseInt(parameter.i_iTotalPageCnt) && parseInt(parameter.i_iRecordCnt) > $(".photoReviewBox").size() &&
        				$(".photoReviewBox").size()>0){
        			
        			showScrollLoadingBox($(".div_spinArea"));
        			if (MobilePhotoReview.isLoadingContent) {
        				return;
        			}
        			MobilePhotoReview.isLoadingContent = true;
        			
        			var result = parameter.pageStack[0];
        			for(var i in parameter.pageStack){
        				if(parseInt(result) < parseInt(parameter.pageStack[i])){
        					result = parameter.pageStack[i];
        				}
        			}        			
        			parameter.i_sFlagPreTop="N";
        			parameter.i_iNowPageNo = parseInt(result) +1;
        			setTimeout(function(){
        				MobilePhotoReview.fn.reviewList(parameter.i_iNowPageNo);
        			},1000);
        			
        		}else if(!MobilePhotoReview.isLoadingContent && $(window).scrollTop() == 0 &&
        				parseInt(parameter.i_iNowPageNo) >1 && parseInt(parameter.i_iRecordCnt) >0 &&
        				$(".photoReviewBox").size() >0 &&  parameter.i_sFlagPreTop != "E"){
        			showScrollLoadingBox($(".div_spinAreaPre"));
        			
        			var result = parameter.pageStack[0];
        			for(var i in parameter.pageStack){
        				if(parseInt(result)>parseInt(parameter.pageStack[i])){
        					result = parameter.pageStack[i];
        				}
        			}
        			if(parseInt(result)>1){
        				parameter.i_iNowPageNo  =  parameter.i_iNowPrePageNo-1;
        				parameter.i_sFlagPreTop="Y";
        				setTimeout(function(){
        					MobilePhotoReview.fn.reviewList(parameter.i_iNowPageNo);        					
        				}, 1000);
        			}
        		}
        	});  
          },	
          
        /**
         * 페이지 로딩시 데이터 ajax
         * */
		getPageInit : function() {
			
			if(MobilePhotoReview.isLoadingContent){
				return;
			}
			MobilePhotoReview.isLoadingContent = true;
			parameter.i_sFlagListAction = 'Y';
			var frm_reload = $("form[name='frm_reload']");
			var prodcd = $("textarea[name='i_arrProdcd']",frm_reload).val();
			var prodnm = $("textarea[name='i_arrProdnm']",frm_reload).val();
			if(prodcd != undefined && prodcd != ""){
				if(prodnm != undefined && prodnm != ""){					
				
					var prdLen = prodcd.replace(/[0-9A-Za-z]/g,"").length;
					var splitPrd = prodcd.split(",");
					var splitPrdnm = prodnm.split(",");
					
					for(var i =0; i < prdLen+1; i++){
						parameter.i_arrProductcd.push(splitPrd[i]);
						parameter.i_arrProductnm.push(splitPrdnm[i]);
						var resultHtml = "<a href=\"#\" class=\"btn_prod_del\">"+splitPrdnm[i];
						resultHtml += "<input type=\"hidden\" class = \"i_arrProductcd\" name = \"i_arrProductcd\" id=\"search"+splitPrd[i]+"\" value = \""+splitPrd[i]+"\"/></a>";
						$(".div_search_result").append(resultHtml);
					}
				}
			}
			if($("#i_iNowPageNo").val() > parameter.i_iNowPageNo){
        		parameter.i_iNowPageNo =  $("#i_iNowPageNo").val();
        		parameter.i_iNowPrePageNo =  $("#i_iNowPageNo").val();
        	}
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/cmnt/mobile_cmnt_photo_list_ajax.do",
				type		: "post",
				dataType	: "json",
				data		: parameter,
				animation	: false,
				async : false,
				success		: function (data, textStatus) { 
					if(data.status =='succ'){
						MobilePhotoReview.isLoadingContent = false;
						MobilePhotoReview.fn.setReviewCategory(data.object);						
						MobilePhotoReview.fn.setReviewList(data.object);
						
						var review = data.object.review;						
						if($.inArray(parseInt(review.page.i_iNowPageNo),parseInt(parameter.pageStack))==-1){
	        				parameter.pageStack.push(review.page.i_iNowPageNo);	        				
	        			}
						MobilePhotoReview.fn.addBtnEvent();
						if($("#i_sFlagBeautyEvent").val() == "Y"){
							$(".input_chk").eq(9).click();
						}
					} else{
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},
		
		goDetail : function(id){
			var frm = $("form[name='frm']");
			var url = GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_photo_view.do";
			$("input[name='i_sReviewcd']").val(id);
			$("input[name='i_arrProdcd']",frm).val(parameter.i_arrProductcd);
			$("input[name='i_arrProdnm']",frm).val(parameter.i_arrProductnm);
			MobileBodyStart.fnAppendUserInfoSubmit(frm, url);
		},
		
		addLike : function(idx){
			var frm = $("form[name='frm']");
			var isLogin = $("input[name='isLogin']", frm).val();
			var reviewcd = $("input[name='i_sReviewcd']").val();
			var vote = parseInt(SetNum($(".em_"+reviewcd).eq(0).text()));
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
								$(".em_" + reviewcd).text(vote-1);
								$(".ico_like").removeClass("active");
							}else{
								$(".em_" + reviewcd).text(vote+1);
								balloonOpen("."+reviewcd);
							}
							MobilePhotoReview.fn.addBtnEvent();
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
		
		/**
		 * 카테고리 그려주기
		 * */
		setReviewCategory : function(object){
			var list = object.ctlist;
				if(list != undefined && list.length >0){
						var arrHtml = [];
						arrHtml.push("<li>");
						arrHtml.push("	<span class=\"inputChk5\">");
						arrHtml.push("		<input type=\"checkbox\" id=\"categorycd1\" name=\"i_arrCategorycd\" class=\"checkbox input_chk\"/>");
						arrHtml.push("	<label for=\"categorycd1\" class=\"l_active\">전체</label>");
						arrHtml.push("	</span>");
						arrHtml.push("</li>");
						for (var i=0; i<list.length; i++){
							var row = list[i];
							arrHtml.push("<li>");
							arrHtml.push("	<span class=\"inputChk5\">");
							arrHtml.push("		<input type=\"checkbox\" id=\"categorycd"+(i+2)+"\" name=\"i_arrCategorycd\" class=\"checkbox input_chk\" value=\""+row.v_sub_code1+"\"/>");
							arrHtml.push("		<label for=\"categorycd"+(i+2)+"\">"+row.v_sub_codenm+"</label>");
							arrHtml.push("	</span>");
							arrHtml.push("</li>");
						}
						$(".categoryBox>ul").html(arrHtml.join(""));
						MobilePhotoReview.fn.addBtnEvent();
				}
							
		}, 
		
		/**
		 * 리스트만 호출
		 * */
		reviewList : function(i_iNowPageNo){	
			
			parameter.i_iNowPageNo = i_iNowPageNo;
			parameter.i_sSortCol = $("input[name='i_sSortCol']").val();
			parameter.i_arrProductcd = new Array();
			$("input[name='i_arrProductcd']").each(function(){
				parameter.i_arrProductcd.push($(this).val());
			});
			parameter.i_arrCategorycd = new Array();
			$(".checkbox:checked").each(function(){
				parameter.i_arrCategorycd.push($(this).val());
			});
			
			parameter.i_sFlagListAction = 'S';
			MobileCommon.ajax({
				url :GLOBAL_WEB_ROOT +  "mobile/cmnt/mobile_cmnt_photo_list_ajax.do",
				dataType : "json",
				data : parameter,
				animation : false,
				async : false,
				
				success : function(data, textStatus, jqXHR){
					
					if(data.status == "succ"){
						MobilePhotoReview.isLoadingContent = false;
						MobilePhotoReview.fn.setReviewList(data.object);
						
						var review = data.object.review;
						if($.inArray(parseInt(review.page.i_iNowPageNo),parseInt(parameter.pageStack))==-1){
      					  parameter.pageStack.push(review.page.i_iNowPageNo);
      					}
						
						hideScrollLoadingBox();
						MobilePhotoReview.fn.addBtnEvent();
					}
				}, error : function(){
					MobilePhotoReview.isLoadingContent = false;
				}
			});
		},
		
		/**
		 * 상세 페이지 그려주기
		 * */
		
		setReviewList : function(object){
			
			var arrHtml = [];
			var list = object.review.list;
			var page = object.review.page;
			var imglist = object.review.imglist;
			var prodlist = object.review.product;
			
			 if(parameter.i_sFlagPreTop != "Y"){
        		 $("#i_iNowPageNo").val(page.i_iNowPageNo);
        	 }else{
        		 parameter.i_iNowPrePageNo = page.i_iNowPageNo;
        	 }
			
			$("#i_iNowPageNo").val(page.i_iNowPageNo);
			$("#i_iTotalPageCnt").val(page.i_iTotalPageCnt);			
			$("#i_iRecordCnt").val(page.i_iRecordCnt);
			
			parameter.i_iNowPage = page.i_iNowPageNo;
       	 	parameter.i_iTotalPageCnt = page.i_iTotalPageCnt;
       	 	parameter.i_iRecordCnt = page.i_iRecordCnt;
       	 	
			if(list != undefined && list.length >0){
				
				for(var i = 0; i < list.length; i++){
					
					var rvlist = list[i];
					
					var clob = rvlist.v_clob;
					if(clob == undefined){
						clob = "내용이 없습니다.";
					} else {
						clob = clob.replace(/\[image#(.*?)\]/g, "");
						clob = clob.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "").replace(/<!--(.|\n|\r)*-->/g,"");
						clob = getByteString(clob, 100);						
					}
					var level = rvlist.n_levelno;
					
					console.log(level);
					if(level != undefined){
						level = "m"+level;
					}else{
						level = "m1";
					}
					
					var cmtlevel = rvlist.v_user_cmt_level;
					if(cmtlevel != undefined){
						cmtlevel = "c"+cmtlevel.substr(6,1);
					}else{
						cmtlevel = "c1";
					}
					
					var date = rvlist.v_reg_dtm;
					var vote = rvlist.n_vote;
					if(vote==undefined){
						vote=0;
					}
					var rvtype = rvlist.v_rv_typecd;
					if(rvtype != undefined){
						rvtype = "f" +parseInt((rvtype.substr(6,1))-1);
					}else{
						rvtype = "f0";
					}
					
					var cDate = changeBeforeDate(date);
			/*목록형 List*/
			arrHtml.push("<input type=\"hidden\" class=\"i_sReviewcd\" name=\"i_sReviewcd\" value=\""+rvlist.v_reviewcd+"\">");
			
			arrHtml.push("<div class=\"photoReviewBox\">");
			arrHtml.push("<div class=\"list\">");
			
			arrHtml.push("			<div class=\"userInfoArea\">");
			arrHtml.push("				<div class=\"photoZ\"><img src=\""+rvlist.v_user_img+"\" onerror=\"fnNoImageUser(this);\"/></div>");
			arrHtml.push("				<div class=\"userInfoZ\">");
			arrHtml.push("					<div class=\"name\">");
			arrHtml.push("						<p>");
			if(rvlist.v_nickname != undefined && rvlist.v_nickname != "") {
				arrHtml.push("							<span class='nm'>"+rvlist.v_nickname+"</span>");
			} else {
				arrHtml.push("							<span class='nm'>"+getStringReverseHidden(rvlist.v_userid, 3)+"</span>");
			}
			if(rvlist.n_bpcnt > 0){
				arrHtml.push("							<a href=\"#\" id=\""+rvlist.v_userid+"\" class=\"btn_beautyProfile\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_beautyProfile.png\" alt=\"뷰티프로파일\"/></a>");
			}
			arrHtml.push("						</p>");
			arrHtml.push("					</div>");
			arrHtml.push("					<div class=\"gradeZone\">");
			arrHtml.push("						<span class=\"ico_memberLevel "+level+"\">"+rvlist.v_levelnm+"</span>");
			arrHtml.push("						<span class=\"ico_communityLevel "+cmtlevel+"\">"+rvlist.v_cmt_levelnm+"</span>");
			arrHtml.push("					</div>");
			arrHtml.push("				</div>");
			arrHtml.push("			</div>");
			if(rvlist.v_rv_typenm !== "일반"){
				if(rvlist.v_rv_typenm != "AP Friends"){
					arrHtml.push("			<span class=\"ico_flag "+rvtype+"\">"+rvlist.v_rv_typenm+"</span>");
				}else{
					arrHtml.push("			<span class=\"ico_flag f6\">"+rvlist.v_rv_typenm+"</span>");
				}
			}
			
			if(rvlist.v_flag_best=='Y'){
			arrHtml.push("	<div class=\"bestArea\">");
			arrHtml.push("		<span class=\"ico_best\">Best</span>");
			arrHtml.push("	</div>");
			}
			if(rvlist.v_title == undefined){
				rvlist.v_title = "제목이 없습니다.";
			}
			arrHtml.push("	<div class=\"btn_listDetail\" id=\""+rvlist.v_reviewcd+"\"><p class=\"subject\">");
			if(rvlist.v_reg_channel == "MOBILE" || rvlist.v_reg_channel == "APP"){
				arrHtml.push("	<span class=\"sp_ico i1\" style=\"float:left;\">모바일</span>");
			}
			arrHtml.push(" 			<a href=\"#\" id=\""+rvlist.v_reviewcd+"\" class=\"btn_listDetail\" >"+rvlist.v_title+"</a>");
			arrHtml.push("	 	</p>");
			arrHtml.push("	<p class=\"cont\"><a href=\"#\" id=\""+rvlist.v_reviewcd+"\" class=\"btn_listDetail\">"+getByteString(clob, 200)+"</a></p>");
			arrHtml.push("	<div class=\"photoZone\">");
			arrHtml.push("		<ul>");
			
			if(imglist != undefined && imglist.length > 0) {
				var cnt = 0;
				
				for(var j=0; j<imglist.length; j++) {
					if(imglist[j].v_recordid == rvlist.v_reviewcd) {
						++cnt;
						if(cnt <= 4) {
							if(parseInt(rvlist.n_photo_cnt) > 4 && cnt == 4) {
								arrHtml.push("			<li>");
								arrHtml.push("				<div class=\"moreCountZone\">");
								arrHtml.push("					<img src=\""+imglist[j].v_image_path+"\" alt=\"\" onerror=\"fnNoImage(this);\">");
								arrHtml.push("					<span class=\"moreCount\">"+parseInt(rvlist.n_photo_cnt-4)+"</span> ");
								arrHtml.push("				</div>");
								arrHtml.push("			</li>");
							} else {
								arrHtml.push("			<li><img src=\""+imglist[j].v_image_path+"\" alt=\"\" onerror=\"fnNoImage(this);\"/></li>");
							}
						}
					}
				}
			}			
			arrHtml.push("		</ul>");
			arrHtml.push("	</div></div>");
			arrHtml.push("		<div class=\"countBundle\">");
			arrHtml.push("			<a href=\"#\" class=\"btn_prodview btn_review_prod\" id=\""+rvlist.v_reviewcd+"\"><span>리뷰상품 보기</span></a>");
			arrHtml.push("			<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+rvlist.reply_cnt+"</em></span>");
			arrHtml.push("			<em class=\"ico_like em_"+rvlist.v_reviewcd+"\">"+vote+"</em>");
			arrHtml.push("          <span class=\"sp_ico2 i7 ico_inquiry ico_viewcnt\"><span class=\"hide_txt\">조회수</span><em>"+rvlist.n_view_cnt+"</em></span>");
			arrHtml.push("		</div>");
			
			arrHtml.push("			<p class=\"date\">"+cDate+"</p>");
			if(rvlist.v_tagnm != undefined){
				arrHtml.push("			<p class=\"reviewtag\"><span>"+rvlist.v_tagnm+"</span></p>");
			} 
			arrHtml.push("		</div>");
			
			if(prodlist != undefined && prodlist.length>0){
				
				arrHtml.push("	<span class=\"hide span_review\" id=\"p"+rvlist.v_reviewcd+"\">");
					var len = prodlist.length;
					for(var k = 0; k<len; k++){
						if(prodlist[k].v_reviewcd == rvlist.v_reviewcd){
							arrHtml.push("			<span class=\"span_reviewProd\">");
							// var levelcd = $("#i_sLevelcd").val();
							// var price = productPrice.fn.setProductPrice(prodlist[k], levelcd);
							
							arrHtml.push("				<span class=\"span_productcd\">"+prodlist[k].v_productcd+"</span>");
							arrHtml.push("				<span class=\"span_productnm\">"+prodlist[k].v_productnm+"</span>");
							arrHtml.push("				<span class=\"span_optioncd\">"+prodlist[k].v_optioncd+"</span>");
							arrHtml.push("				<span class=\"span_optioncnt\">"+prodlist[k].n_option_cnt+"</span>");
							arrHtml.push("				<span class=\"span_optionnm\">"+prodlist[k].v_optionnm+"</span>");
							arrHtml.push("				<span class=\"span_brandnm\">"+prodlist[k].v_brandnm+"</span>");
							arrHtml.push("				<span class=\"span_imgpath\">"+prodlist[k].v_img_web_path+"</span>");
							arrHtml.push("				<span class=\"span_price\">"+SetNumComma(prodlist[k].n_list_price)+"</span>");
							arrHtml.push("				<span class=\"span_saleprice\">"+SetNumComma(prodlist[k].n_price)+"</span>");
							arrHtml.push("				<span class=\"span_point\">1</span>");
							arrHtml.push("				<span class=\"span_commentcnt\">18</span>");
							arrHtml.push("				<span class=\"span_stockqty\">"+prodlist[k].n_stockqty+"</span>");
							arrHtml.push("				<span class=\"span_statuscd\">"+prodlist[k].v_statuscd+"</span>");
							arrHtml.push("			</span>");
							}
						}
					arrHtml.push("	</span>");
					arrHtml.push(" <input type=\"hidden\" class= \"hide prodCount\" value=\""+len+"\"/>");
					}
			
			/*본문형 List*/
			arrHtml.push("<div class=\"detail div_photo_detail\">");
			arrHtml.push("			<div class=\"userInfoArea\">");
			arrHtml.push("				<div class=\"photoZ\"><img src=\""+rvlist.v_user_img+"\" onerror=\"fnNoImageUser(this);\" /></div>");
			arrHtml.push("				<div class=\"userInfoZ\">");
			arrHtml.push("					<div class=\"name\">");
			arrHtml.push("						<p>");
			if(rvlist.v_nickname != undefined){
				arrHtml.push("							<span class=\"nm\">"+rvlist.v_nickname+"</span>");
			}else{
				arrHtml.push("							<span class=\"nm\">"+getStringReverseHidden(rvlist.v_userid, 3)+"</span>");
			}
			if(rvlist.n_bpcnt > 0){
				arrHtml.push("							<a href=\"#\" id=\""+rvlist.v_userid+"\" class=\"btn_beautyProfile\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_beautyProfile.png\" alt=\"뷰티프로파일\"/></a>");
			}
			arrHtml.push("						</p>");
			arrHtml.push("					</div>");
			arrHtml.push("					<div class=\"gradeZone\">");
			arrHtml.push("						<span class=\"ico_memberLevel "+level+"\">"+rvlist.v_levelnm+"</span>");
			arrHtml.push("						<span class=\"ico_communityLevel "+cmtlevel+"\">"+rvlist.v_cmt_levelnm+"</span>");
			arrHtml.push("					</div>");
			arrHtml.push("				</div>");
			arrHtml.push("			</div>");
			if(rvlist.v_flag_best=='Y'){
			arrHtml.push("	<div class=\"bestArea\">");			
			arrHtml.push("		<span class=\"ico_best\">best</span>");
			arrHtml.push("	</div>");
			}
			arrHtml.push("	<p class=\"subject\">");
			if(rvlist.v_reg_channel == "MOBILE" || rvlist.v_reg_channel == "APP"){
				arrHtml.push("	<span class=\"sp_ico i1\" style=\"float:left;\">모바일</span>");
			}
			arrHtml.push("		<a href=\"#\" id=\""+rvlist.v_reviewcd+"\" class=\"btn_listDetail\" >"+rvlist.v_title+"</a>");
			arrHtml.push("	</p>");
			arrHtml.push("<p class=\"date\">"+cDate+"</p>");
			arrHtml.push(" <div class=\"cont\">");
			arrHtml.push("		<a href=\"#\" id=\""+rvlist.v_reviewcd+"\" class=\"btn_listDetail\">");
			arrHtml.push("			<span class=\"thumimg\">");
			arrHtml.push("			</span>");
			var message = rvlist.v_clob;
			if(imglist != undefined && imglist.length > 0) {
	        	var imgList = imglist;
	        	
	        	for(var k = 0; k < imgList.length; k++) {
	        		if(imglist[k].v_recordid == rvlist.v_reviewcd) {
	        		var imageUrl = imgList[k].v_image_path.replace("_100", "_680");
	        		message = message.replace(imgList[k].v_buffer1, "<img src=\""+ imageUrl +"\" onerror=\"fnNoImage(this);\"/>");
	        		}
	        	}
			}
			
			arrHtml.push("				<div class=\"txt div_content\" id=\"div_content_"+rvlist.v_recordid+"\">");
			arrHtml.push(message);
			arrHtml.push("				</div>");
			if(rvlist.v_rv_typecd != "DC_T001"){
				arrHtml.push("			<div class=\"div_content_footer\" align=\"center\" style=\"margin-top:30px;\">");
				arrHtml.push("			<img src=\""+GLOBAL_MOBILE_IMG_URL+"content/review_banner.jpg\" alt=\"아모레퍼시픽 제공\">");            	
				arrHtml.push("			</div>");            	
			}
			arrHtml.push("		</a>");
			arrHtml.push("	</div>");
			arrHtml.push("	<div class=\"countBundle\">");
			arrHtml.push("		<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+rvlist.reply_cnt+"</em></span>");
			arrHtml.push("		<em class=\"ico_like em_"+rvlist.v_reviewcd+"\">"+vote+"</em>");
			arrHtml.push("      <span class=\"sp_ico2 i7 ico_inquiry ico_viewcnt\"><span class=\"hide_txt\">조회수</span><em>"+rvlist.n_view_cnt+"</em></span>");
			arrHtml.push("	</div>");
			if(rvlist.v_tagnm != undefined){
				arrHtml.push("	<p class=\"reviewtag\"><span>"+rvlist.v_tagnm+"</span></p>");
			}
			/**
			 * 리뷰상품 목록
			 * */
			arrHtml.push("	<p class=\"tit\">리뷰상품</p>");
			arrHtml.push("	<div id=\"otherReviewSwipe"+rvlist.v_reviewcd+"\" class=\"otherReviewSwipe\" style=\"max-width:100%;visibility: visible;\">");
			arrHtml.push("		<div class=\"otherReviewSwipe-wrap\" id=\"otherReviewSwipe-wrap"+rvlist.v_reviewcd+"\">");
			
			arrHtml.push("		</div>");
			arrHtml.push("	</div>");
			
			
			arrHtml.push("	</div>"); //DETAIL
			arrHtml.push("</div>"); //PHOTOREVIEW
			}
			}else if(list != undefined && list.length ==0 && $(".btn_prod_del").size()==0 || parameter.i_arrCategorycd == null) {
				arrHtml.push("<div class=\"nodata\">");
				arrHtml.push("<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
				arrHtml.push("</div>");
				$("#sortContainer").html(arrHtml.join(""));
				return;
			}else{
				arrHtml.push("<div class=\"noResult\">");
				arrHtml.push("<p>검색된 <span class=\"ftxt\">포토리뷰가 없습니다.</span></p>");
				arrHtml.push("</div>>");
				$("#sortContainer").html(arrHtml.join(""));
				return;
			}
			 if(parameter.i_sFlagPreTop != "Y"){
        		 if(1==page.i_iNowPageNo){
        			 $("#sortContainer").html(arrHtml.join(""));
        		 }else{
        			$(arrHtml.join("")).appendTo($("#sortContainer"));
        		 } 
        		 
        		 
        	 }else{
        		 $(arrHtml.join("")).prependTo($("#sortContainer"));
        		 if(page.i_iNowPageNo == 1){
        			 parameter.i_sFlagPreTop = "E";
        		 }
        		 
        		 
        	 }
			 
			if(list != undefined && list.length > 0) {
				for(var i=0; i<list.length; i++) {
					var arrProdList = [];
					if(prodlist != undefined && prodlist.length > 0) {
						for(var j=0; j<prodlist.length; j++) {
							if(prodlist[j].v_reviewcd == list[i].v_reviewcd) {
								arrProdList.push(prodlist[j]);
							}
						}
						
						MobilePhotoReview.fn.setDetailProdList(arrProdList, list[i].v_reviewcd);
					}
		
					new Swipe(document.getElementById("otherReviewSwipe"+list[i].v_reviewcd), {
						continuous: true,
						stopPropagation: true,
						callback: function(event, element) {
							var el_parent = $("#" + element.parentNode.parentNode.id);
							var el_target = $(".otherReview-nav > span", el_parent);
							
							var idx = setNaviIndex(el_target, event);
							el_target.removeClass("active").eq(idx).addClass("active");
						}
					});
				}
			}
			
			  if($("input[name='i_sSortCol']").val()=='V_REG_DTM' || $("input[name='i_sSortCol']").val()==''){
			   		 
      		  $(".inputRadio #radio1").prop("checked",true);
		   	  }else if($("input[name='i_sSortCol']").val()=='N_VOTE_CNT'){
		   		  
		   		  $(".inputRadio #radio2").prop("checked",true);
		   	  }else if($("input[name='i_sSortCol']").val()=='REPLY_CNT'){
		   		  
		   		  $(".inputRadio #radio3").prop("checked","checked");
		   	  }
		},
		setDetailProdList : function(obj, reviewcd) {
			var arrHtml = [];
			var len = obj.length;
			
			if(obj != undefined && obj.length > 0) {
				
				for(var i=0; i<obj.length; i++) {
					if(i% 4 == 0) {
						arrHtml.push("		<div class=\"prodAlbumType v2\">");
						arrHtml.push("				<ul class=\"ul_product\">");
					}
										
					//var levelcd = $("#i_sLevelcd").val();
					//var price = productPrice.fn.setProductPrice(obj[i], levelcd);
					
					arrHtml.push("					<li>");
					arrHtml.push("						<a href=\"#\" id=\""+obj[i].v_productcd+"\" class=\"btn_prod_detail\">");				
					arrHtml.push("							<div class=\"thumbImg\">");
					arrHtml.push("								<img src=\""+obj[i].v_img_web_path+"\" alt=\""+obj[i].v_productnm+"\">");
					arrHtml.push("							</div>");
					arrHtml.push("							<div class=\"prodDetail\">");
					arrHtml.push("								<p class=\"brandNm ellipsis\">"+obj[i].v_brandnm+"</p>");
					arrHtml.push("								<p class=\"prodNm\">"+obj[i].v_productnm+"</p>");
					if(parseInt(obj[i].n_option_cnt) > 1) {
						arrHtml.push("								<p class=\"option\">"+obj[i].v_optionnm+"</p>");
					}
					arrHtml.push("								<p class=\"priceZone\">");
					if(parseInt(obj[i].n_list_price) < parseInt(obj[i].n_price)){
						arrHtml.push("									<span class=\"sale\"><em>"+SetNumComma(obj[i].n_list_price)+"</em>원</span>");
						}
					arrHtml.push("									<span class=\"price\"><em>"+SetNumComma(obj[i].n_price)+"</em>원</span>");
					arrHtml.push("								</p>");
					arrHtml.push("								<div class=\"prodEvalu\">");
					arrHtml.push("									<span class=\"gradeType2 grade0"+Math.round(obj[i].n_single_point)+"\"><span class=\"hide\">평점 8.0</span></span>");
					arrHtml.push("									<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+obj[i].n_review_cnt+")</span>");
					arrHtml.push("								</div>");
					if(obj[i].v_statuscd == "0002" || parseInt(obj[i].n_stockqty) == 0) {
					arrHtml.push("								<span class=\"stateArea\">");
					arrHtml.push("									<span class=\"ico_state st1\">품절</span>");
					arrHtml.push("								</span>");
					}
					arrHtml.push("							</div>");
					arrHtml.push("						</a>");
					arrHtml.push("					</li>");
					
					if(i % 4 ==3 || i == len -1) {
						arrHtml.push("				</ul>");
						arrHtml.push("		</div>");
					}
				}
					
				$(".otherReviewSwipe-wrap", "#otherReviewSwipe"+reviewcd).html(arrHtml.join(""));
				
				var navi = [];
				var navi_no = 0;
				
				navi.push("<div id=\"otherReview-nav"+reviewcd+"\" class=\"otherReview-nav\">");
				for(var i=0; i<len; i++) {
					var active = "";
					
					if(i % 4 == 0) {
						navi_no++;
						
						if(navi_no == 1) {
							active = "class=\"active\"";
						} else {
							active = "";
						}
						
						navi.push("<span " +active+ " style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
					}
				}
				navi.push("</div>");
				
				$("#otherReviewSwipe"+reviewcd).append(navi.join(""));

			}
		},
		setProdList : function(object){
			
			var list = object.review.list;
			var prodlist = object.review.product;
			if(list != undefined && list.length >0){
				if(prodlist != undefined && prodlist.length >0){
					var arrHtml = [];
					var len = prodlist.length;
					for(var i =0; i< prodlist.length; i++){
						
						if(i%4==0){
							arrHtml.push("			<div class=\"prodAlbumType v2\">");
							arrHtml.push("				<ul class=\"ul_product\">");
						}
						//var levelcd = $("#i_sLevelcd").val();
						//var price = productPrice.fn.setProductPrice(prodlist[i], levelcd);
						
						arrHtml.push("					<li>");
						arrHtml.push("						<a href=\"#\">");				
						arrHtml.push("							<div class=\"thumbImg\">");
						arrHtml.push("								<img src=\""+prodlist[i].v_img_web_path+"\" alt=\""+prodlist[i].v_productnm+"\">");
						arrHtml.push("							</div>");
						arrHtml.push("							<div class=\"prodDetail\">");
						arrHtml.push("								<p class=\"brandNm ellipsis\">"+prodlist[i].v_brandnm+"</p>");
						arrHtml.push("								<p class=\"prodNm\">"+prodlist[i].v_productnm+"</p>");
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
						} //end for
					
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
					} //end if
			}
		},
		
		addPopupBtnEvent : function(){
			
			$("#sortContainer").on("click",".btn_review_prod",function(event){
				event.preventDefault();
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
					/*var point = $(".span_point", prodinfo).text();
					var optioncd = $(".span_optioncd", prodinfo).text();
					var commentcnt = $(".span_commentcnt", prodinfo).text();
					var statuscd = $(".span_statuscd", prodinfo).text();
					var stockqty = parseInt($(".span_stockqty", prodinfo).text());*/
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
				try { trackClicksMall('평점','모바일 포토리뷰 목록^리뷰상품 보기','포토리뷰^리뷰상품 보기','event5',true,'리뷰상품 보기'); } catch(e){}
//				MobilePhotoReview.fn.addPopupBtnEvent();
			});
			
			
		}
	}
};

var MobilePhotoReviewStyle = {
	init : function() {
		var $inp_delete = $(".inputBar a.btn_delete");
        $inp_delete.hide();
        $("input").keyup(function(){
            if ( $(this).val() == "" ){
                $(this).next($inp_delete).hide();
           } else {
                $(this).next($inp_delete).show();
           }
        });

        $inp_delete.click(function(){
            $(this).prev().val("");
            $(this).hide();
        });
	},
	fn : {
		resortList : function() {
			$(".bcListSection").removeClass("detailType");
		},
		resortAlbum : function() {
			$(".bcListSection").addClass("detailType");
			
			$(".otherReviewSwipe").each(function(i){
				var id = $(this).attr("id");
				window.id = new Swipe(document.getElementById(id), {
	                continuous: true,
	                stopPropagation: true,
	                callback: function(event, element) {
	                    $(id+"-nav > span").removeClass().eq(event).addClass("active");
	                }
	            });
			});
		}
	}
};


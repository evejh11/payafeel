var parameter = {
		i_iNowPageNo : parseInt($('#i_iNowPageNo').val() || "1", 10),
		i_iPageSize     : parseInt($('#i_iPageSize').val() || "6", 10),
		i_iTotalPageCnt : parseInt($('#i_iTotalPageCnt').val() || "1", 10),
		i_iRecordCnt : parseInt($('#i_iRecordCnt').val() || "1", 10),
		i_sSortCol : "",
		i_sSortDir : "DESC",
		i_sStDt : "",
		i_sEnDt : "",
		i_arrCategorycd :[],
		i_sFlagListAction : "",
		pageStack : []
		
};
var	MobilePhotoReview = {
	name : "MobilePhotoReview",

	init : function() {
		$('.btn_back').attr('href', '/mobile/main.do');
		MobilePhotoReview.fn.setSubMenuChange();
		MobilePhotoReview.fn.getPageInit();
		MobilePhotoReview.fn.addScrollEvent();
		/*MobilePhotoReview.fn.setUserLevel(s_levelcd);*/
		MobilePhotoReview.fn.addBtnEvent();
		
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
					$("#sortContainer").masonry('destroy');					 
				    $("#radio1").prop("checked","checked");
				    $("i_sFlagListAction").val("C");
				    parameter.pageStack = new Array();
				    MobilePhotoReview.fn.reviewList(1);
				}				
			});
			$("#radio2").unbind("click").click(function(){
				
				if($(this).is(":checked")){
					$("input[name='i_sSortCol']").val("N_VOTE_CNT");
					$("#sortContainer").masonry('destroy');
					$("#radio2").prop("checked","checked");
					parameter.pageStack = new Array();
					MobilePhotoReview.fn.reviewList(1);					
				}
			});
			$("#radio3").unbind("click").click(function(){
				
				if($(this).is(":checked")){
					$("input[name='i_sSortCol']").val("REPLY_CNT");
					$("#sortContainer").masonry('destroy');
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
					$("#sortContainer").masonry('destroy');
					
					//parameter.pageStack = new Array();
					MobilePhotoReview.fn.reviewList(1);			
			});
			
			$(".ico_like").unbind("click").click(function(event){
				event.preventDefault();
				balloonOpen(this);
			});
			
		},
		addScrollEvent:function(){
        	
        	$(window).bind("scroll",function(event){
        		if(!MobilePhotoReview.isLoadingContent && $(window).scrollTop() == $(document).height()- $(window).height() &&
        				parameter.i_iNowPageNo < parameter.i_iTotalPageCnt && parameter.i_iRecordCnt > $(".photoReview").size() &&
        				$(".photoReview").size()>0){
        			var result = parameter.pageStack[0];
        			for(var i in parameter.pageStack){
        				if(parseInt(result) < parseInt(parameter.pageStack[i])){
        					result = parameter.pageStack[i];
        				}
        			}
        			parameter.i_iNowPageNo = parseInt(result) +1;
        			MobilePhotoReview.fn.reviewList(parameter.i_iNowPageNo);
        			
        		}else if(!MobilePhotoReview.isLoadingContent && $(window).scrollTop() == 0 &&
        				parameter.i_iNowPageNo >1 && parameter.i_iRecordCnt >0 &&
        				$(".photoReview").size() >0){
        			var result = parameter.pageStack[0];
        			for(var i in parameter.pageStack){
        				if(parseInt(result)>parseInt(parameter.pageStack[i])){
        					result = parameter.pageStack[i];
        				}
        			}
        			if(parseInt(result)>1){
        				parameter.i_iNowPage = parseInt(result) - 1;        				
        				MobilePhotoReview.fn.reviewList(parameter.i_iNowPageNo);
        			}
        		}
        	});  
          },
		
		/*setUserLevel : function(s_levelcd) {
			var s_userid = $("input[name='s_userid']").val();
			var arrHtml=[];
			if($("input[name=s_levelcd]").val()=="LV03"){
				arrHtml.push("<div class='memberInfoHotsale'>");
				arrHtml.push("		<div class='infoArea'>");
				arrHtml.push("  		<span class='ico_memberLevel3 m3'><img src='../../images/common/ico_memberLevel3_m3.png' alt='VVIP'></span>");
				arrHtml.push("			 <p class='date'>2014년 1월</p>");
				arrHtml.push("   		 <p class='name'>"+s_userid+"님은 <em>VVIP</em>회원이십니다.</p>");
				arrHtml.push(" 		<span class='btn_ty2 v3'><a href='#'>등급별 혜택 확인</a></span>");
				arrHtml.push("   	</div>");
				arrHtml.push("</div>");
				
			}else if($("input[name=s_levelcd]").val()=="LV02"){
				arrHtml.push("<div class='memberInfoHotsale'>");
				arrHtml.push("		<div class='infoArea'>");
				arrHtml.push("  		<span class='ico_memberLevel3 m3'>vvip</span>");
				arrHtml.push("			 <p class='date'>2014년 1월</p>");
				arrHtml.push("   		 <p class='name'>"+s_userid+"님은 <em>VIP</em>회원이십니다.</p>");
				arrHtml.push(" 		<span class='btn_ty2 v3'><a href='#'>등급별 혜택 확인</a></span>");
				arrHtml.push("   	</div>");
				arrHtml.push("</div>");
			}
			else if($("input[name=s_levelcd]").val()=="LV01"){
				arrHtml.push("<div class='memberInfoHotsale v2'>");
				arrHtml.push("	<div class='infoArea'>");
				arrHtml.push(" 			<span class='ico_memberLevel3 m1'>일반</span>");
				arrHtml.push(" 			<p class='date'>2014년 1월</p>");
				arrHtml.push("			<p class='name'>"+s_userid+"님은 <em>일반</em>회원이십니다.</p>");
				arrHtml.push("		<div class='btnArea'>");
				arrHtml.push("			<span class='btn_ty v2'><a href='#'>마이파우치</a></span>");
				arrHtml.push(" 			<span class='btn_ty2 v2'><a href='#'>등급별 혜택</a></span>");
				arrHtml.push("		</div>");
				arrHtml.push(" 	</div>");
				arrHtml.push("	<p class='noti'><span>CLUB AP는 <em>VIP, VVIP 고객</em>들만 이용할 수 있습니다.</span></p>");
				arrHtml.push("</div>");
			}
			else{
				arrHtml.push("<div class='membershipInfoHotsale'>");
				arrHtml.push("		<p class='ttl'>Club AP는 아모레퍼시픽몰 고객중 <br /><em>VIP / VVIP 만을 위한 특별 서비스</em>입니다.</p>");
				arrHtml.push("  		<p class='txt'>이미 고객이시면 <a href='/mobile/mbr/mobile_mbr_member_login.do'>로그인</a>을 해주세요.</p>");
				arrHtml.push("	 <div class='btnArea'>");
				arrHtml.push(" 		<span class='btn_ty v2'><a href='/mobile/mbr/mobile_mbr_member_login.do'>로그인하기</a></span>");
				arrHtml.push("		<span class='btn_ty2 v2'><a href='#'>등급별 혜택 확인</a></span>");
				arrHtml.push("	</div>");
				arrHtml.push("</div>");
			}
					
			$(".div_userinfo").html(arrHtml.join(""));
		},
		*/
 
          
        /**
         * 페이지 로딩시 데이터 ajax
         * */
		getPageInit : function() {
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/cmnt/mobile_cmnt_photo_review_list_ajax.do",
				type		: "post",
				dataType	: "json",
				data		: {
					i_sFlagListAction : "Y"
				},
				animation	: false,
				success		: function (data, textStatus) { 
					
					if(data.status =='succ'){						
						MobilePhotoReview.fn.setReviewCategory(data.object);						
						MobilePhotoReview.fn.setReviewList(data.object);

					}
					}
				});
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
						arrHtml.push("	<label for=\"c1\" class=\"l_active\">전체</label>");
						arrHtml.push("	</span>");
						arrHtml.push("</li>");
						for (var i=0; i<list.length; i++){
							var row = list[i];
							arrHtml.push("<li>");
							arrHtml.push("	<span class=\"inputChk5\">");
							arrHtml.push("		<input type=\"checkbox\" id=\"categorycd"+(i+2)+"\" name=\"i_arrCategorycd\" class=\"checkbox input_chk\" value=\""+row.v_sub_code1+"\"/>");
							arrHtml.push("		<label for=\"c"+(i+2)+"\">"+row.v_sub_codenm+"</label>");
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
			if(MobilePhotoReview.isLoadingContent){
				return;
			}
			MobilePhotoReview.isLoadingContent = true;
			parameter.i_iNowPageNo = i_iNowPageNo;
			parameter.i_sSortCol = $("input[name='i_sSortCol'").val();
			
			parameter.i_arrCategorycd = new Array();
			$(".checkbox:checked").each(function(){
				parameter.i_arrCategorycd.push($(this).val());
			});
			
			parameter.i_sFlagListAction = 'S';
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT + "mobile/cmnt/mobile_cmnt_photo_review_list_ajax.do",
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
			
			$("#i_iNowPageNo").val(page.i_iNowPageNo);
			$("#i_iTotalPageCnt").val(page.i_iTotalPageCnt);
			$("#i_iRecordCnt").val(page.i_iRecordCnt);
			if(list != undefined && list.length >0){
				
				for(var i = 0; i < list.length; i++){
					var rvlist = list[i];
					
					var level = rvlist.v_user_level;
					var date = rvlist.v_reg_dtm;
					var vote = rvlist.n_vote;
					if(vote==undefined){
						vote=0;						
					}
					
					var cDate = changeBeforeDate(date);
					if(level == 'LV01'){
						level='m1';
					}else if(level == 'LV02'){
						level='m2';
					}else{
						level='m3';
					}
			$("#sortContainer").html("");
			/*목록형 List*/			
			arrHtml.push("<div class=\"photoReviewBox\">");
			arrHtml.push("<div class=\"list\">");
			if(rvlist.v_flag_best=='Y'){
			arrHtml.push("	<div class=\"bestArea\">");
			
			arrHtml.push("		<span class=\"ico_best\">Best</span>");
			
			arrHtml.push("	</div>");
			}
			arrHtml.push("	<p class=\"subject\"><a href=\"#\">"+rvlist.v_title+"</a></p>");
			arrHtml.push("	<p class=\"cont\"><a href=\"#\">"+fnChangeBr(rvlist.v_clob)+"</a></p>");
			arrHtml.push("	<div class=\"photoZone\">");
			arrHtml.push("		<ul>");
			arrHtml.push("			<li><img src=\"../../images/temp/@otherReview.jpg\" alt=\"\"></li>");
			arrHtml.push("			<li><img src=\"../../images/temp/@otherReview.jpg\" alt=\"\"></li>");
			arrHtml.push("			<li><img src=\"../../images/temp/@otherReview.jpg\" alt=\"\"></li>");	
			arrHtml.push("			<li>");
			arrHtml.push("				<div class=\"moreCountZone\">");
			arrHtml.push("					<span><img src=\"../../images/temp/@otherReview.jpg\" alt=\"\"></span>");
			arrHtml.push("					<span class=\"moreCount\">13</span>");
			arrHtml.push("				</div>");
			arrHtml.push("			</li>");
			arrHtml.push("		</ul>");
			arrHtml.push("	</div>");
			arrHtml.push("		<div class=\"userInfo\">");
			arrHtml.push("			<p class=\"name\">");
			arrHtml.push("				<span class=\"ico_memberLevel "+level+"\"></span>");
			arrHtml.push("				<span class=\"nm\">"+rvlist.v_nickname+"</span>");
			arrHtml.push("				<span class=\"ico_communityLevel c1\">누디</span>");
			arrHtml.push("				<a href=\"#\" class=\"btn_beautyProfile\">뷰티프로파일</a>");
			arrHtml.push("			</p>");
			arrHtml.push("		</div>");
			arrHtml.push("		<div class=\"countBundle\">");
			arrHtml.push("			<a href=\"#\" class=\"btn_prodview\"><span>리뷰상품 보기</span></a>");
			arrHtml.push("			<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+rvlist.reply_cnt+"</em></span>");
			arrHtml.push("			<a href=\"#balloonLike\" class=\"ico_like\"><span class=\"hide\">추천</span><em>"+vote+"</em></a>");
			arrHtml.push("			</div>");
			
			arrHtml.push("			<p class=\"date\">"+cDate+"</p>");
			 
			arrHtml.push("		</div>");
			
			/*본문형 List*/
			arrHtml.push("<div class=\"detail\">");
			if(rvlist.v_flag_best=='Y'){
			arrHtml.push("	<div class=\"bestArea\">");			
			arrHtml.push("		<span class=\"ico_best\">best</span>");			
			arrHtml.push("	</div>");
			}
			arrHtml.push("	<p class=\"subject\"><a href=\"#\">"+rvlist.v_title+"</a></p>");
			arrHtml.push("	<div class=\"userInfo\">");
			arrHtml.push("		<p class=\"name\">");
			arrHtml.push("			<span class=\"ico_memberLevel "+level+"\"></span>");
			arrHtml.push("			<span class=\"nm\">"+rvlist.v_nickname+"</span>");
			arrHtml.push("			<span class=\"ico_communityLevel c1\">누디</span>");
			arrHtml.push("			<a href=\"#\" class=\"btn_beautyProfile\">뷰티프로파일</a>");
			arrHtml.push("		</p>");
			arrHtml.push("	</div>");
			arrHtml.push("<p class=\"date\"></p>");
			arrHtml.push(" <div class=\"cont\">");
			arrHtml.push("		<a href=\"#\">");
			arrHtml.push("			<span class=\"thumImg\">");
			arrHtml.push("				<img src=\"../../images/temp/@photoreview01.jpg\" alt=\"\" />");
			arrHtml.push("				<div class=\"txt\">"+fnChangeBr(rvlist.v_clob)+"</div>");
			arrHtml.push("			</span>");
			arrHtml.push("		</a>");
			arrHtml.push("	</div>");
			arrHtml.push("	<div class=\"countBundle\">");
			arrHtml.push("		<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+rvlist.reply_cnt+"</em></span>");
			arrHtml.push("		<a href=\"#balloonLike\" class=\"ico_like\"><span class=\"hide\">추천</span><em>"+vote+"</em></a>");
			arrHtml.push("	</div>");
			
			arrHtml.push("	<p class=\"tit\">리뷰상품</p>");
			arrHtml.push("	<div id=\"otherReviewSwipe"+i+"\" class=\"otherReviewSwipe\" style=\"max-width:100%;\">");
			arrHtml.push("		<div class=\"otherReviewSwipe-wrap\">");
			arrHtml.push("			<div class=\"prodAlbumType v2\">");
			arrHtml.push("				<ul>");
			arrHtml.push("					<li>");
			arrHtml.push("						<a href=\"#\">");
			arrHtml.push("							<div class=\"thumbImg\">");
			arrHtml.push("								<img src=\"../../images/temp/@otherReview.jpg\" alt=\"\">");
			arrHtml.push("							</div>");
			arrHtml.push("							<div class=\"prodDetail\">");
			arrHtml.push("								<p class=\"brandNm ellipsis\">아모레퍼시픽</p>");
			arrHtml.push("								<p class=\"prodNm\">다이아몬드</p>");
			arrHtml.push("								<p class=\"option\">4호</p>");
			arrHtml.push("								<p class=\"priceZone\">");
			arrHtml.push("									<span class=\"sale\"><em>72,000</em>원</span>");
			arrHtml.push("									<span class=\"price\"><em>38,000</em>원</span>");
			arrHtml.push("								</p>");
			arrHtml.push("								<div class=\"prodEvalu\">");
			arrHtml.push("									<span class=\"gradeType2 grade04\"><span class=\"hide\">평점 8.0</span></span>");
			arrHtml.push("									<span class=\"replyCount\"><span class=\"hide\">댓글수</span>(18)</span>");
			arrHtml.push("								</div>");
			arrHtml.push("								<span class=\"stateArea\">");
			arrHtml.push("								<span class=\"ico_state st1\">품절</span>");
			arrHtml.push("								</span>");
			arrHtml.push("								</div>");
			arrHtml.push("							</a>");
			arrHtml.push("						</li>");
			arrHtml.push("					</ul>");
			arrHtml.push("				</div>");	
			arrHtml.push("			</div>");
			arrHtml.push("			<div id=\"otherReview-nav"+i+"\" class=\"otherReview-nav\">");
			arrHtml.push("				<span class=\"active\"><span class=\"hide\">1</span></span>");
			arrHtml.push("				<span><span class=\"hide\">2</span></span>");
			arrHtml.push("				<span><span class=\"hide\">3</span></span>");
			arrHtml.push("			</div>");
			arrHtml.push("		</div>");
			arrHtml.push("	</div>");
			arrHtml.push("</div>");
			}
				$("#sortContainer").html(arrHtml.join(""));
				MobilePhotoReviewStyle.fn.resortList();
				MobilePhotoReviewStyle.init();
			}else {
			arrHtml.push("<div class=\"list\">등록된 포토 리뷰가 없습니다. </div>");
			$("#sortContainer").html(arrHtml.join(""));
			}
						
			MobilePhotoReview.fn.addBtnEvent();
       	 
			  if($("input[name='i_sSortCol']").val()=='V_REG_DTM' || $("input[name='i_sSortCol']").val()==''){
			   		 
      		  $(".inputRadio #radio1").prop("checked",true);
		   	  }else if($("input[name='i_sSortCol']").val()=='N_VOTE_CNT'){
		   		  
		   		  $(".inputRadio #radio2").prop("checked",true);
		   	  }else if($("input[name='i_sSortCol']").val()=='REPLY_CNT'){
		   		  
		   		  $(".inputRadio #radio3").prop("checked","checked");
		   	  }
		}, 
	}
};

var MobilePhotoReviewStyle = {
	init : function() {
		MobilePhotoReviewStyle.fn.masonry();
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
		masonry : function()  {
			 var $sortContainer = $("#sortContainer");
             $sortContainer.masonry({
                 columnWidhth:'.photoReviewBox',
                 itemSelector:'.photoReviewBox',
                 animate:true
             });
             return false;
		},
		resortList : function() {
			$(".bcListSection").removeClass("detailType");
			MobilePhotoReviewStyle.fn.masonry();
		},
		resortAlbum : function() {
			$(".bcListSection").addClass("detailType");
			MobilePhotoReviewStyle.fn.masonry();
			
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


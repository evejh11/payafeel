
var prodlistIscroller,
offset = 0;
var winW = $(window).width();
var $aw = 0;
/**
 * 모바일 수다카페의 리스트 이벤트 처리를 위한 Javascript
 */
var parameter = {
		i_iNowPageNo	: parseInt($('#i_iNowPageNo').val() || "1", 10),
		i_iNowPrePageNo	: parseInt($('#i_iNowPageNo').val() || "1", 10),
		i_iPageSize		: parseInt($('#i_iPageSize').val() || "10", 10),
		i_iTotalPageCnt	: parseInt($('#i_iTotalPageCnt').val() || "1", 10),
		i_iRecordCnt	: parseInt($('#i_iRecordCnt').val() || "1", 10),
		i_sFlagPageInit : "N",
		i_sFlaglist :"",
		i_sFlagPreTop : "",
		i_sSortCol:"",
	    i_sSortDir:"DESC",
	    i_sCategory:"",
	    i_sCmcStDt:"",
	    i_sCmcEnDt:"",
	    pageStack : [],
	    i_sFlaglistopen:true,
	    i_sFlagSort: $("#i_sFlagSort").val()
		
	};
var	MobileCmc = {
	name : "MobileCmc",

	

	init : function() {
		
		 
		$('.btn_back').attr('href', '/mobile/main.do');

		MobileCmc.fn.setSubMenuChange();
		MobileCmc.fn.setDateTab();		
	
		MobileCmc.fn.getPageInit("T");
		
		
		 $(".btn_sorticon").click(function() {
		    	var id  = $(this).attr("id");

		    	if (id == "list") {
		    		MobileCmc.fn.resortList();
		    	} else {
		    		MobileCmc.fn.resortAlbum();
		    	}
		    });
		 var id=$("input[name='i_sFlagdate']").val();
		 if(id!=""){
			 $(".tab_cate").removeClass("active");
			 $("#"+id).addClass("active");
		 }else{
			$(".tab_cate").removeClass("active");
			$("#all").addClass("active"); 
		 }
		 if(id != "all" && id != ""){
			 $(".sortradio").hide();
		 }
		 
	},
	isLoadingContent : false,

	fn : {
		/**
		 * 수다카페 버튼 이벤트 처리
		 */
		addBtnEvent : function() {
			$(".btn_dropdown").unbind("click").click(function(event) {
				event.preventDefault();
				dropdownMenu2('.txtBanner');
			});
			$(".list").unbind("click").click(function(event){
				event.preventDefault();
				parameter.i_sFlaglistopen=true;
				MobileCmc.fn.resortList();
			});
			$(".btn_myList").unbind("click").click(function(event){
				if($("input[name='i_Userid']").val() == ""){
					if(IS_LOGIN_SNS){
						showConfirmBox({
							message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
							, ok_func : function(){
								document.frm_login.submit();
							}
						    , cancel_func: function(){
								return ;
							}
						});
					}else{
						showConfirmBox({
							message : "로그인 하시면 서비스 이용이 가능하세요!",
							ok_func : function(){
								document.frm_login.submit();
							}
						});
					}
				}else{
					$(this).attr('href','/mobile/cmnt/mobile_cmnt_cmc_my.do');
				}
					
			});
			$(".album").unbind("click").click(function(){
				parameter.i_sFlaglistopen=false;
				if($("input[name='i_UserLevel']").val()=='LV11' && parameter.i_sCategory=='CTK20140402000000005'){
					showMessageBox({
						message:"해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요.",
						
					});
					
				}else if($("input[name='i_UserLevel']").val()=="" && parameter.i_sCategory=='CTK20140402000000005'){
					showMessageBox({
						message:"해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."
					});
				
				}else{
					MobileCmc.fn.resortAlbum();
				}
				
				
			});
			$(".ico_like").unbind("click").click(function(event){
				event.preventDefault();
				balloonOpen(this);
			});
			$("#radio1").unbind("click").click(function(){
				
				if($(this).is(":checked")){
					$("input[name='i_sSortCol']").val("V_REG_DTM");					
					
					 
				    $("#radio1").prop("checked","checked");
				    
				    if (MobileCmc.isLoadingContent) {
        				return;
        			}
        			
        			MobileCmc.isLoadingContent = true;
        			
				    parameter.pageStack = new Array();
					MobileCmc.fn.contentlist(1);
					
				}
				
			});
			$("#radio2").unbind("click").click(function(){
				
				if($(this).is(":checked")){
					$("input[name='i_sSortCol']").val("N_VOTE");
					
					$("#radio2").prop("checked","checked");
					
					if (MobileCmc.isLoadingContent) {
        				return;
        			}
        			
        			MobileCmc.isLoadingContent = true;
        			
					parameter.pageStack = new Array();
					MobileCmc.fn.contentlist(1);
					
				}
				
			});
			$("#radio3").unbind("click").click(function(){
				
				if($(this).is(":checked")){
					$("input[name='i_sSortCol']").val("REPLY_CNT");
				
					$("#radio3").prop("checked","checked");
					
					if (MobileCmc.isLoadingContent) {
        				return;
        			}
        			
        			MobileCmc.isLoadingContent = true;
        			
					parameter.pageStack = new Array();
					MobileCmc.fn.contentlist(1);
				}
				
			});
			$(".btn_category").unbind("click").click(function(event){
				parameter.i_iNowPageNo=1;
				parameter.i_iNowPrePageNo = 1;
				$(".li_ctg").removeClass("active");
				$(this).parent().addClass("active");
				var index = $(".btn_category").index($(this));
				var ctg_cd = $("input[name='i_sCtgsortcd']").eq(index).val();				
				$("input[name='i_sCategory']").val(ctg_cd);
				$("input[name='i_sFlagCtg']").val(ctg_cd);
				parameter.i_sCategory=ctg_cd;
				
				if (MobileCmc.isLoadingContent) {
    				return;
    			}
    			
    			MobileCmc.isLoadingContent = true;
    			
    			var id=$("input[name='i_sFlagdate']").val();
    			if(id != "all" && id !=""){
    				parameter.i_sFlagSort = "N";
    			}else{
    				parameter.i_sFlagSort = "Y";
    			}
    			
				parameter.pageStack=new Array();
				if(parameter.i_sFlaglistopen==false && ctg_cd=='CTK20140402000000005'&&$("input[name='i_UserLevel']").val()=='LV11'){
					MobileCmc.fn.resortList();
					MobileCmc.fn.contentlist(1);
				}
				else if(parameter.i_sFlaglistopen==false && ctg_cd=='CTK20140402000000005'&&$("input[name='i_UserLevel']").val()==''){
					MobileCmc.fn.resortList();
					MobileCmc.fn.contentlist(1);
				}else{
					
					MobileCmc.fn.contentlist(1);
				}
			});
			
			$(".btn_period_all").unbind("click").click(function(){
				$("input[name='i_sSortCol']").val("V_REG_DTM");
				$("input[name='i_sCmcStDt']").val("");
				$("input[name='i_sCmcEnDt']").val("");
				
				if (MobileCmc.isLoadingContent) {
    				return;
    			}
    			
    			MobileCmc.isLoadingContent = true;
    			
				parameter.pageStack = new Array();
				parameter.i_sFlagSort = "Y";
				MobileCmc.fn.contentlist(1);
			});
			$(".btn_today").unbind("click").click(function(event){
			   event.preventDefault();
			   
			   var today = new Date();
			   var tyear = String(today.getFullYear());
			   var tmonth = String(today.getMonth()+1);
			   var tday   = today.getDate();
			   if(tmonth<10){
					tmonth="0"+tmonth;				
				}
				if(tday<10){
					tday ="0"+tday;
				}
			 
				$("input[name='i_sCmcStDt']").val(tyear+tmonth+tday);
				$("input[name='i_sCmcEnDt']").val(tyear+tmonth+tday);
				$("input[name='i_sSortCol']").val("HOT_POINT");
				
				if (MobileCmc.isLoadingContent) {
    				return;
    			}
    			
    			MobileCmc.isLoadingContent = true;
    			
				parameter.pageStack = new Array();
				parameter.i_sFlagSort = "N";
				MobileCmc.fn.contentlist(1);
				
			});
			$(".btn_week").unbind("click").click(function(event){
				event.preventDefault();
				var today = new Date();
				var weekago=new Date(Date.parse(today)-7*1000*60*60*24);
				
				var wyear = String(weekago.getFullYear());
				var wmonth = String(weekago.getMonth()+1);
				var wday   = String(weekago.getDate());
				var tyear = String(today.getFullYear());
				var tmonth = String(today.getMonth()+1);
				var tday   = today.getDate();
				if(tmonth<10){
					tmonth="0"+tmonth;				
				}
				if(tday<10){
					tday ="0"+tday;
				}
			 	if(wmonth<10){
					wmonth="0"+wmonth;
				}
				if(wday<10){
					wday = "0"+wday;
				}
				
				 
				$("input[name='i_sCmcStDt']").val(wyear+wmonth+wday);
				$("input[name='i_sCmcEnDt']").val(tyear+tmonth+tday); 
				$("input[name='i_sSortCol']").val("N_VOTE");
				
				if (MobileCmc.isLoadingContent) {
    				return;
    			}
    			
    			MobileCmc.isLoadingContent = true;
    			parameter.i_sFlagSort = "N";
				parameter.pageStack = new Array();
				MobileCmc.fn.contentlist(1);
				
			});
			 $(".btn_month").unbind("click").click(function(event){
				 event.preventDefault();
				 var today = new Date();
					var monthago=new Date(Date.parse(today)-30*1000*60*60*24);
					
					var myear = String(monthago.getFullYear());
					var mmonth = String(monthago.getMonth()+1);
					var mday   = String(monthago.getDate());
					var tyear = String(today.getFullYear());
					var tmonth = String(today.getMonth()+1);
					var tday   = today.getDate();
					if(tmonth<10){
						tmonth="0"+tmonth;				
					}
					if(tday<10){
						tday ="0"+tday;
					}
				 	if(mmonth<10){
				 		mmonth="0"+mmonth;
					}
					if(mday<10){
						mday = "0"+mday;
					}
					
					 
					$("input[name='i_sCmcStDt']").val(myear+mmonth+mday);
					$("input[name='i_sCmcEnDt']").val(tyear+tmonth+tday);
					$("input[name='i_sSortCol']").val("N_VOTE");
					
					if (MobileCmc.isLoadingContent) {
        				return;
        			}
        			
        			MobileCmc.isLoadingContent = true;
        			parameter.i_sFlagSort = "N";
					parameter.pageStack = new Array();
					MobileCmc.fn.contentlist(1);
					
			});  
			$(".btn_listdetail").unbind("click").click(function(event){
				event.preventDefault();
				var index = $(".btn_listdetail").index($(this));
				
				var id = $(this).attr("id");
				var categorynm = $(this).attr("name");
				var categorycd =$(".i_sCategorylistCd").eq(index).val();
				
				
				$("input[name='i_sCategorycd']").val(categorycd);
				$("input[name='i_sCategorynm']").val(categorynm);
				parameter.i_sCategory = categorycd;
				if($("input[name='i_UserLevel']").val()=='LV11' && parameter.i_sCategory=='CTK20140402000000005'){
					showMessageBox({
						message:"해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."
					});
					$("input[name='i_sCategorycd']").val("");
					parameter.i_sCategory = "";
				}else if($("input[name='i_UserLevel']").val()=='' && parameter.i_sCategory=='CTK20140402000000005'){
					showMessageBox({
						message:"해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."
					});
					$("input[name='i_sCategorycd']").val("");
					parameter.i_sCategory = "";
				}else{
					MobileCmc.fn.goDetail(id);
				}
				
			
			});
			$(".btn_albumdetail1").unbind("click").click(function(event){
				event.preventDefault();
				var index = $(".btn_albumdetail1").index($(this));
				
				var id = $(this).attr("id");
			
				if($("input[name='i_UserLevel']").val()=='LV11' && parameter.i_sCategory=='CTK20140402000000005'){
					showMessageBox({
						message:"해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."
					});
				}else if($("input[name='i_UserLevel']").val()=='' && parameter.i_sCategory=='CTK20140402000000005'){
					showMessageBox({
						message:"해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."
					});
				}else{
					MobileCmc.fn.goDetail(id);
				}
				
				
			
			});
			
			$(".btn_albumdetail2").unbind("click").click(function(event){
				event.preventDefault();
				var index = $(".btn_albumdetail2").index($(this));
				
				var id = $(this).attr("id");
				
				
				if($("input[name='i_UserLevel']").val()=='LV11' && parameter.i_sCategory=='CTK20140402000000005'){
					showMessageBox({
						message:"해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."
					});
				}else if($("input[name='i_UserLevel']").val()=='' && parameter.i_sCategory=='CTK20140402000000005'){
					showMessageBox({
						message:"해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."
					});
				}else{
					MobileCmc.fn.goDetail(id);
				}
			
			});
			$(".btn_noti_detail").unbind("click").click(function(event){
				event.preventDefault();
				var index = $(".btn_noti_detail").index($(this));
				
				var id = $(this).attr("id");
				
				
				if($("input[name='i_UserLevel']").val()=='LV11' && parameter.i_sCategory=='CTK20140402000000005'){
					showMessageBox({
						message:"해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."
					});
				}else if($("input[name='i_UserLevel']").val()=='' && parameter.i_sCategory=='CTK20140402000000005'){
					
					showMessageBox({
						message:"해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."
					});
				}else{
					MobileCmc.fn.goNotiDetail(id);
				}
			
			});
			$(".btn_write").unbind("click").click(function(){
				if($("input[name='i_sCmtLevel']").val() == 'CZ_L005'){
					showMessageBox({
						message : "현재, 회원님의 커뮤니티 활동(게시물작성, 댓글등록)에 대해 신고접수가 들어와 <br/>커뮤니티 활동이 제한됨을 알려드립니다. "
					});
				}else if($("input[name='i_Userid']").val() == ""){
					if(IS_LOGIN_SNS){
						showConfirmBox({
							message : "해당 서비스는 통합회원으로 로그인 하셔야 이용 가능해요.<br/>통합회원으로 로그인하시겠어요?"
							, ok_func : function(){
								document.frm_login.submit();
							}
						    , cancel_func: function(){
								return ;
							}
						});
					}else{
						showConfirmBox({
							message : "로그인 하시면 서비스 이용이 가능하세요!",
							ok_func : function(){
								document.frm_login.submit();
							}
						});
					}
				}else{
					var url = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_list.do";
					$(this).attr('href',GLOBAL_WEB_URL+'mobile/cmnt/mobile_cmnt_cmc_reg.do?i_sReturnUrl='+url);
				}
				
				
			});
			
			$(".btn_beautyProfile").unbind("click").click(function(event){
				  event.preventDefault();
				  var id = $(this).attr("id");
				  MobileBeautyProfile.fn.addPopupBtnEvent(id);
			  });
		},
		goDetail : function(id){
			var url = GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_cmc_list.do";
			$("input[name='i_sReturnUrl']").val(url);
			$("input[name='i_sMemocd']").val(id);
			$("input[name='i_sFlagNoti']").val("N");
			var frm=document.frm;
			frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_view.do";
			frm.submit();
			
		},
		goNotiDetail : function(id){
			var url = GLOBAL_WEB_URL + "mobile/cmnt/mobile_cmnt_cmc_list.do";
			$("input[name='i_sReturnUrl']").val(url);
			$("input[name='i_sMemocd']").val(id);
			$("input[name='i_sFlagNoti']").val("Y");
			
			var frm=document.frm;
			frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_view.do";
			frm.submit();
			
		},
		/**
		 * 수다카페 서브 메뉴 처리
		 */
		setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');
			
			select_input.click(function() {
				
				location.href	= GLOBAL_WEB_URL+"mobile/cmnt/" + $(this).val() + ".do";
			});
		},
		
		//날짜 텝 클릭시 이벤트 처리
		 setDateTab : function(){
			
             var $tabCate = $(".tab_wrap .tab_cate"); 
             	 $tabCate.click(function(){
             		 var id=$(this).attr("id");
	                 $tabCate.removeClass("active");
	                 $(this).addClass("active");
	                 $("input[name='i_sFlagdate']").val(id);
                
             });
         },
         //리스트 효과
		  masonry : function(){
              var $sortContainer = $("#sortContainer");
              
              $sortContainer.masonry({
                  columnWidhth:'.chatterListBox',
                  itemSelector:'.chatterListBox',
                  animate:true
                
              });
             
              
          },
          //리스트형
          resortList : function(){
              $(".bcListSection").removeClass("detailType");
          },
          //앨범형
          resortAlbum : function(){
              $(".bcListSection").addClass("detailType");
          },
          //상단 카테고리
          categorylist : function(object){
        	  
			  $("#categorylist").html("");
			  $(object).each(function(index,ctglist){
				 
				  var arrHtml=[];
				  var category = $("input[name='i_sCategory']").val();
				  var flag = $("input[name='i_sFlagCtg']").val();
				  
				  if(flag != "" && ctglist.v_talkcd == category){
					  arrHtml.push("<li id='"+ctglist.v_talkcd+"'class='li_ctg active'><a href='#' class='btn_category'>"); 
				  }else{
					  arrHtml.push("<li id='"+ctglist.v_talkcd+"'class='li_ctg'><a href='#' class='btn_category'>");
				  }
				  
				  arrHtml.push("<span class='img'></span>");
				  arrHtml.push("<span class='txt'>"+ctglist.v_title+"</span>");
				  arrHtml.push("</a></li>");
				  arrHtml.push("<input type='hidden' name='i_sCtgsortcd' value='"+ctglist.v_talkcd+"'/>");
				  $(arrHtml.join("\n")).appendTo($("#categorylist"));
			  });
        	
          },
          //상단 공지사항
          noticelist : function(object){
        	    			
			 var length = object.length;
			 
			 if(length > 0) {
				 var first_notice = object[0];
				 var arrHtml = [];
				 
				 arrHtml.push("<p class=\"ttl\"><a href=\"#\" name=\""+first_notice.v_talknm+"\" id=\""+first_notice.v_memocd+"\"class=\"btn_detail btn_noti_detail\">"+first_notice.v_title+"</a></p>");
				 arrHtml.push("		   <input type=\"hidden\"class='i_sCategorynotiCd' name=\"i_sCategorynotiCd\" value=\""+first_notice.v_talkcd+"\"/>");
				 arrHtml.push("<div class=\"menubox\">");
				 arrHtml.push("<ul>");
				 
				 var notice = object;
				 for(var i=1; i<length; i++) {
					 arrHtml.push("<li><a href=\"#\" name=\""+notice[i].v_talknm+"\" id=\""+notice[i].v_memocd+"\"class=\"btn_detail btn_noti_detail\">"+notice[i].v_title+"</a></li>");
					 arrHtml.push("		   <input type=\"hidden\"class='i_sCategorynotiCd' name=\"i_sCategorynotiCd\" value=\""+notice[i].v_talkcd+"\"/>");
				 }
				 
				 arrHtml.push("</ul>");
				 arrHtml.push("</div>");
				 arrHtml.push("<a href=\"#none\" class=\"btn_dropdown\"><span class=\"hide\">배너 더보기</span></a>");
				 $("#noticelist").html(arrHtml.join(""));
				 
				 MobileCmc.fn.addBtnEvent();
			 }
        	
          },
          //무한 로딩 스크롤 
          addScrollEvent:function(){
        	$(window).bind("scroll",function(event){
        		if(!MobileCmc.isLoadingContent && $(window).scrollTop() >= ($(document).height()- $(window).height()-100) &&
        				parseInt(parameter.i_iNowPageNo) < parseInt(parameter.i_iTotalPageCnt) && parseInt(parameter.i_iRecordCnt) > $(".chatterListBox").size() &&
        				$(".chatterListBox").size() > 0){
        			
        			
        			if (MobileCmc.isLoadingContent) {
        				return;
        			}
        			
        			MobileCmc.isLoadingContent = true;
        			
        			showScrollLoadingBox($(".div_spinArea"));
        			var result = parameter.pageStack[0];
        			for(var i in parameter.pageStack){
        				if(parseInt(result) < parseInt(parameter.pageStack[i])){
        					result = parameter.pageStack[i];
        				}
        			}
        			parameter.i_sFlagPreTop="N";
        			parameter.i_iNowPageNo = parseInt(result) +1;
        		//	$("input[name='i_iNowPageNo']").val(parseInt(result) +1);
        			var id=$("input[name='i_sFlagdate']").val();
        			if(id != "all" && id !=""){
        				parameter.i_sFlagSort = "N";
        			}else{
        				parameter.i_sFlagSort = "Y";
        			}
        			setTimeout(function() {
        				MobileCmc.fn.contentlist(parameter.i_iNowPageNo);
        			}, 1000);
        			
        		}else if(!MobileCmc.isLoadingContent && $(window).scrollTop() == 0 &&
        				 parameter.i_iNowPrePageNo >1 && parameter.i_iRecordCnt >0 &&
        				$(".chatterListBox").size() >0 && parameter.i_sFlagPreTop != "E"){
        			showScrollLoadingBox($(".div_spinAreaPre"));
        			
        			if (MobileCmc.isLoadingContent) {
        				return;
        			}
        			
        			MobileCmc.isLoadingContent = true;
        			
        			
        			var result = parameter.pageStack[0];
        			for(var i in parameter.pageStack){
        				if(parseInt(result)>parseInt(parameter.pageStack[i])){
        					result = parameter.pageStack[i];
        				}
        			}
        			if(parseInt(result)>1){
        				parameter.i_iNowPageNo  =  parameter.i_iNowPrePageNo-1;
        		//		$("input[name='i_iNowPageNo']").val(parameter.i_iNowPrePageNo-1);
        				parameter.i_sFlagPreTop="Y";
        				var id=$("input[name='i_sFlagdate']").val();
        				if(id != "all" && id !=""){
            				parameter.i_sFlagSort = "N";
            			}else{
            				parameter.i_sFlagSort = "Y";
            			}
        				var id=$("input[name='i_sFlagdate']").val();
            			if(id != "all" && id !=""){
            				parameter.i_sFlagSort = "N";
            			}else{
            				parameter.i_sFlagSort = "Y";
            			}
        				setTimeout(function() {
            				MobileCmc.fn.contentlist(parameter.i_iNowPageNo);
            			}, 1000);
        			}
        		}
			 
        	});  
          },
          //페이지 정보들 불러오기
          getPageInit : function(flag){
        	  if(MobileCmc.isLoadingContent){
        		  return;
        	  }
        	MobileCmc.isLoadingContent = true;
        	
        	parameter.i_sFlagPageInit = "Y";
        	parameter.i_sFlaglist = "F";
    		if($("#i_iNowPageNo").val() > parameter.i_iNowPageNo){
        		parameter.i_iNowPageNo =  $("#i_iNowPageNo").val();
        		parameter.i_iNowPrePageNo =  $("#i_iNowPageNo").val();
        	}
        	
        	parameter.i_sSortCol = $("input[name='i_sSortCol']").val();
      	    if($("input[name='i_sFlagCtg']").val()!=""){
      	    	parameter.i_sCategory=$("input[name='i_sCategory']").val();
      	    }
        	
      	    parameter.i_sCmcStDt = $("input[name='i_sCmcStDt']").val();
      	    parameter.i_sCmcEnDt = $("input[name='i_sCmcEnDt']").val();
        	MobileCommon.ajax({
        		url : GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_list_ajax.do",
        		type:"post",
        		dataType:"json",
        		data : parameter,
        		animation : false,
			    isModalEnd : false,
        		async : false,
        		success : function(data,textStatus){
        			if(data.status == 'succ'){
        			MobileCmc.isLoadingContent = false;
        			MobileCmc.fn.setContentlist(data.object);
        			
        			var notice = data.object.notice;
        			MobileCmc.fn.noticelist(notice);
        			
        			var category = data.object.category;
        			var len = category != undefined ? category.length : 0;
					var chg_category = [];
					
        			if($("input[name='i_UserLevel']").val() == "LV11" || $("input[name='i_UserLevel']").val() == "LV15" || $("input[name='i_UserLevel']").val() == "LV18" ){
        				var idx = 0;
            			for(var i=0; i < len;i++) {
            				if (category[i].v_talkcd != "CTK20140402000000005") {
            					chg_category[idx++] = category[i];
            				}
            			}
            			MobileCmc.fn.categorylist(chg_category);
        			}else{
        				chg_category = category;
        				MobileCmc.fn.categorylist(chg_category);
        			}
        			
        			
        			
        			var content = data.object.content;
        			if($.inArray(parseInt(content.page.i_iNowPageNo),parseInt(parameter.pageStack))==-1){
        				
        				parameter.pageStack.push(content.page.i_iNowPageNo);
        			}
        			
        			MobileCmc.fn.addBtnEvent();
        			if($("input[name='i_sFlagHot']").val()=="Y"){
        				$(".btn_today").click();
        			}
        		} else {
        			showMessageBox({
        				message : data.message});
        		}
        		}
        		
        	});
        	MobileCmc.fn.addScrollEvent();
          },
          
         //리스트 가져오기
          contentlist : function(i_iNowPageNo){
        	  
        	  parameter.i_iNowPageNo = i_iNowPageNo;        	  
        	  parameter.i_sFlaglist = "M";
        	  parameter.i_sSortCol = $("input[name='i_sSortCol']").val();
        	  if($("input[name='i_sFlagCtg']").val()!=""){
        	    	parameter.i_sCategory=$("input[name='i_sCategory']").val();
        	    }
        	  parameter.i_sCmcStDt = $("input[name='i_sCmcStDt']").val();
        	  parameter.i_sCmcEnDt = $("input[name='i_sCmcEnDt']").val();
        	 
        	  MobileCommon.ajax({        		  
        		  
        		  url:GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_list_ajax.do",
        		  dataType:"json",
        		  data:parameter,
        		  animation : false,
  				  isModalEnd : false,
        		  async : false,
        		  
        		  success : function(data,textStatus,jqXHR){
        			  
        			  if(data.status=="succ"){
        				  MobileCmc.isLoadingContent = false;
        				  
        				  MobileCmc.fn.setContentlist(data.object);
        	        	
        				  var content = data.object.content;
        				  if($.inArray(parseInt(content.page.i_iNowPageNo),parseInt(parameter.pageStack))==-1){
        					  parameter.pageStack.push(content.page.i_iNowPageNo);
        				  }
        				 
        				  hideScrollLoadingBox();
        				  
        				  if(parameter.i_sFlagSort == "N"){
        					  $(".sortradio").hide();
        				  }else{
        					  $(".sortradio").show();
        				  }
        				  
        			  }else{
        				  showMessageBox({
              				message : data.message});
        			  }
        		  },error : function(){
        			  MobileCmc.isLoadingContent = false;
        		  }
        		
        	 });
         }, 
         //리스트 셋팅
         setContentlist : function(object){
        	 var arrHtml = [];
        	 var list = object.content.list;
        	 var page = object.content.page;
        	 var imglist = object.content.imglist;
        	 var imgtag = object.content.imgTag;
        	 
        	 if(parameter.i_sFlagPreTop != "Y"){
        		 $("#i_iNowPageNo").val(page.i_iNowPageNo);
        	 }else{
        		 parameter.i_iNowPrePageNo = page.i_iNowPageNo;
        	 }
        	 $("#i_iTotalPageCnt").val(page.i_iTotalPageCnt);
        	 $("#i_iRecordCnt").val(page.i_iRecordCnt);
        	 
        	 parameter.i_iNowPage = page.i_iNowPageNo;
        	 parameter.i_iTotalPageCnt = page.i_iTotalPageCnt;
        	 parameter.i_iRecordCnt = page.i_iRecordCnt;
        	
        	 if(list != undefined && list.length >0){
        		 for(var i=0; i<list.length; i++){
        			 
        			 var ctlist = list[i];
        			
        			 var level = ctlist.v_user_level;
        			 var date = ctlist.v_reg_dtm;
        			 if(level != undefined){
        				 level = "m"+level.substr(3,1);
        			 }else{
        				 level = "m1";
        			 }
        			
        			 var userid = $("input[name='i_Userid']").val();
        			 var ct_level = ctlist.v_cmt_levelcd;
        			 if(ct_level != undefined){
        				 var ctlevel = " c"+ct_level.substr(6,1);
        			 }else{
        				 ctlevel = "";
        			 }
        			 	
					 var sResult = changeBeforeDate(date);

 					 var vote = ctlist.n_vote;
 					 if(vote==undefined){
 						 vote=0;
 					 }
 					
 					var recordid = "";
                	var imgpath = "";
                	
 					if(ctlist.v_clob != undefined && ctlist.v_clob != "") {
 						
 						var message = fnChangeBr(ctlist.v_clob);
 						if(imglist != undefined && imglist.length > 0) {
 							for(var j=0; j<imglist.length; j++) {
 								if(ctlist.v_memocd == imglist[j].v_recordid) {
 								
 									var imageUrl = imglist[j].v_image_path.replace("_100", "_680");
 									message = message.replace(imglist[j].v_buffer1, "<img src='"+ imageUrl +"'/>");
 								}
 							}
 							
 							for(var j=0; j<imglist.length; j++) {
 								if(ctlist.v_memocd == imglist[j].v_recordid) {
 									if(recordid != imglist[j].v_recordid) {
 										imgpath = imglist[j].v_image_path.replace("_100","_CROP_134");
 									}
 									
 									recordid = imglist[j].v_recordid;
 								}
 							}
 						}
 					}else{
 						message="";
 					}
 					 
 					 arrHtml.push("<div class=\"chatterListBox\">");
 					 arrHtml.push("<div class=\"list\">");
 					 if (ctlist.v_flag_del == 'N'){
 						arrHtml.push("<a href=\"#none\" name=\""+ctlist.v_talknm+"\"id=\""+ctlist.v_memocd+"\"class=\"btn_detail btn_listdetail\">");
 	                      arrHtml.push("		   <input type=\"hidden\"class='i_sCategorylistCd' name=\"i_sCategoryCd\" value=\""+ctlist.v_talkcd+"\"/>");
 	                      
 	                      if(ctlist.v_flag_best=='Y'){
 	                      arrHtml.push("    <span class=\"ico_best\">best</span>");
 	                      }
 	                      if(imgpath != "") {
 								arrHtml.push("			<div class=\"thumbImg\"><img src=\""+imgpath+"\" width=\"69px\" height=\"69px\" alt=\"\" onerror=\"fnNoImage(this);\"/></div>");
 	                      }
 	                    
 	                      
 	                      arrHtml.push("    <div class=\"cont\">");
 	                      if(ctlist.v_reg_channel == "MOBILE" || ctlist.v_reg_channel == "APP"){
 	                    	 arrHtml.push("					<span class=\"sp_ico i1\" style=\"float: left;\">모바일</span>");
 	                      }
 	                      arrHtml.push("      <p class=\"subj\">"+ctlist.v_title+"</p>");
 	                     
 	                      arrHtml.push("        <p class=\"category\">"+ctlist.v_talknm+"</p>");
 	                      arrHtml.push("        <div class=\"countBundle\">");
 	                      arrHtml.push("           <span class=\"date\">"+sResult+"</span>");
 	                      arrHtml.push("            <span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+ctlist.reply_cnt+"</em></span>");
 	                      arrHtml.push("            <span class=\"ico_like\"><span class=\"hide\">추천</span><em>"+vote+"</em></span>"); 
 	                      arrHtml.push("            <span class=\"sp_ico2 i7 ico_inquiry ico_viewcnt\"><span class=\"hide_txt\">조회수</span><em>"+ctlist.n_read_cnt+"</em></span>"); 
 	                      arrHtml.push("        </div>");
 	                      
 	                      arrHtml.push("   </div>");
 	                      arrHtml.push("</a>"); 
 					 }else if(ctlist.v_flag_del == 'B'){
 						arrHtml.push("		   <input type=\"hidden\"class='i_sCategorylistCd' name=\"i_sCategoryCd\" value=\""+ctlist.v_talkcd+"\"/>");
	                      arrHtml.push("    <div class=\"cont\">");
	                      arrHtml.push("      <p class=\"subj\">관리자에 의해 규제된 글입니다.</p>");
	                     
	                      arrHtml.push("        <p class=\"category\">"+ctlist.v_talknm+"</p>");
	                      arrHtml.push("        <div class=\"countBundle\">");
	                      arrHtml.push("           <span class=\"date\">"+sResult+"</span>");
	                      arrHtml.push("        </div>");
	                      arrHtml.push("   </div>");
 					 }
                      
                      
                      arrHtml.push("</div>");
                  
                      //목록형
                      

                      //본문형
                      arrHtml.push("<div class=\"detail\">");
                      if(ctlist.v_flag_best=='Y'){
                      arrHtml.push("<div class=\"bestArea\">");
                      
                      arrHtml.push("<span class=\"ico_best\">best</span>");
                      
                      arrHtml.push("</div>");   
                      }
                      arrHtml.push("<p class=\"subj\">");
                      if(ctlist.v_reg_channel == "MOBILE" || ctlist.v_reg_channel == "APP"){
                    	 arrHtml.push("	<span class=\"sp_ico i1\" style=\"float:left;\">모바일</span>");
                      }
                      arrHtml.push("	<a href=\"#\" name=\""+ctlist.v_talknm+"\"id=\""+ctlist.v_memocd+"\" class=\"btn_detail btn_albumdetail1\">"+ctlist.v_title+"</a>");
                      arrHtml.push("</p>");    
                      arrHtml.push("<input type=\"hidden\" class='i_sCategoryCd1' name=\"i_sCategoryCd\" value=\""+ctlist.v_talkcd+"\"/>");
                      arrHtml.push("<div class=\"userInfoArea\">");
                      if(ctlist.v_proimag_url != undefined && ctlist.v_proimag_url != ""){
                    	  arrHtml.push("<div class=\"photoZ\"><img src=\""+ctlist.v_proimag_url+"\" alt=\"\" onerror=\"fnNoImageUser(this);\"></div>"); 
                      }else{
                    	  arrHtml.push("<div class=\"photoZ\"><img src=\""+GLOBAL_IMG_URL+"common/non-userPhoto.jpg\" alt=\"\" onerror=\"fnNoImageUser(this);\"></div>");
                      
                      }
                      arrHtml.push("<div class=\"userInfoZ\">");
                      arrHtml.push("<div class=\"name\">");
                      arrHtml.push("<p>");        
                      
                      if(ctlist.v_nickname == undefined){
                    	  arrHtml.push("<span class=\"nm\" style=\"margin-right:5px;\">"+getStringReverseHidden(ctlist.v_userid,3)+"</span>");
                      }else if(ctlist.v_userid == userid && ctlist.v_nickname == undefined){
                    	  arrHtml.push("<span class=\"nm\" style=\"margin-right:5px;\">"+ctlist.v_userid+"</span>");
                      }else{
                    	  arrHtml.push("<span class=\"nm\" style=\"margin-right:5px;\">"+ctlist.v_nickname+"</span>");  
                      }     
                     
                      if(ctlist.n_bpcnt != 0){
                    	  arrHtml.push("<a href=\"#\" id=\""+ctlist.v_userid+"\"class=\"btn_beautyProfile\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_beautyProfile.png\"/></a>");  
                      }
                      arrHtml.push("</p>"); 
                      arrHtml.push("</div>");
                      arrHtml.push("<div class='gradeZone'>");
                      arrHtml.push("	<span class=\"ico_memberLevel "+level+"\" style=\"margin-right:5px;\"></span>"); 
                      arrHtml.push("	<span class=\"ico_communityLevel"+ctlevel+"\"  style=\"margin-right:5px;\"></span>");
                      arrHtml.push("	<span class=\"date\"style=\"float:right\">조회수 :"+ctlist.n_read_cnt+"</span>");
                      arrHtml.push("</div>");                             
                      arrHtml.push("</div>");
                      arrHtml.push("</div>");
                      arrHtml.push("<p class=\"date\"><span><strong>"+ctlist.v_talknm+"</strong></span><span style=\"margin-left:10px;\">"+sResult+"</span></p>");    
                       
                      if(ctlist.v_flag_del == 'N'){
                    	  arrHtml.push("<div class=\"cont\">");  
                    	  arrHtml.push("<a href=\"#none\" name=\""+ctlist.reply_cnt+"\"id=\""+ctlist.v_memocd+"\"  class=\"btn_detail btn_albumdetail2\">");        
                          arrHtml.push("<input type=\"hidden\" class='i_sCategoryCd2' name=\"i_sCategoryCd\" value=\""+ctlist.v_talkcd+"\"/>");
                          arrHtml.push("<div class=\"txt\">"+message+"</div>");     
                          arrHtml.push("</a>");        
                          arrHtml.push("</div>");    
                          arrHtml.push("<div class=\"countBundle\">");
                          arrHtml.push("<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+ctlist.reply_cnt+"</em></span>");
                          arrHtml.push("<a href=\"#balloonLike\" class=\"ico_like\"><span class=\"hide\">추천</span><em>"+vote+"</em></a>");        
                          arrHtml.push("</div>"); 
                      }else if(ctlist.v_flag_del == 'B'){
                    	  arrHtml.push("<div class=\"cont\">");  
                          arrHtml.push("<input type=\"hidden\" class='i_sCategoryCd2' name=\"i_sCategoryCd\" value=\""+ctlist.v_talkcd+"\"/>");
                          arrHtml.push("<div class=\"txt\">관리자에 의해 규제된 글입니다.</div>");     
                          arrHtml.push("</div>");    
                      }
                                                  
                      arrHtml.push("</div>");
                      arrHtml.push("</div>");
                    
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
        		 
        	 } else {
        		 arrHtml.push("<div class=\"chatterListBox\">");
        		 arrHtml.push("<div class=\"nodata\">");
				 arrHtml.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
				 arrHtml.push("</div>");
	        	$("#sortContainer").html(arrHtml.join(""));
	        	
        	 }	  
        	 
        	 
		   	 
       
			  MobileCmc.fn.addBtnEvent();
        	 
			  if($("input[name='i_sSortCol']").val()=='V_REG_DTM' || $("input[name='i_sSortCol']").val()==''){
			   		 
        		  $(".inputRadio #radio1").prop("checked",true);
		   	  }else if($("input[name='i_sSortCol']").val()=='N_VOTE'){
		   		  
		   		  $(".inputRadio #radio2").prop("checked",true);
		   	  }else if($("input[name='i_sSortCol']").val()=='REPLY_CNT'){
		   		  
		   		  $(".inputRadio #radio3").prop("checked","checked"); 
		   	  }
         },
          
	}
};


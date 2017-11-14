
var prodlistIscroller,
offset = 0;
var winW = $(window).width();
var $aw = 0;

var parameter = {
		i_iNowPageNo	: parseInt($('#i_iNowPageNo').val() || "1", 10),
		i_iPageSize		: parseInt($('#i_iPageSize').val() || "6", 10),
		i_iTotalPageCnt	: parseInt($('#i_iTotalPageCnt').val() || "1", 10),
		i_iRecordCnt	: parseInt($('#i_iRecordCnt').val() || "1", 10),
		i_sFlagPageInit : "N",
		i_sFlagAction :"",		
	    pageStack : [],
	    i_sUserid : "",
	    i_sNickname : "",
	    i_sFlaglistopen:true,
	    i_sFlagReviewType:"",
		
		i_sFlagSort : "",
		i_sFlagInit : ""
 };
var	MobileCmcMy = {
	name : "MobileCmcMy",

	init : function() {
		$('.btn_back').attr('href', GLOBAL_WEB_URL+'mobile/cmnt/mobile_cmnt_cmc_list.do');
		MobileCmcMy.fn.getPageInit();
		MobileCmcMy.fn.addScrollEvent();
		
	},
	isLoadingContent : false,
	fn : {
		addBtnEvent : function(){
			
			 $("input[name='sort']").unbind("click").click(function(){
				parameter.pageStack = new Array();
				MobileCmcMy.fn.getMyCmcInfo(1);
			 });
			 
			 $(".mylistdetail").unbind("click").click(function(){
				
				var index = $(".mylistdetail").index($(this));
				var id = $(".mylistdetail").eq(index).attr("id");
				var url =GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_view.do?i_sFlagReply=N";
				MobileCmcMy.fn.goDetail(id,url);
			 });
			 $(".mycommdetail").unbind("click").click(function(){
				
				var index = $(".mycommdetail").index($(this));
				var id = $(".mycommdetail").eq(index).attr("id");
				var url = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_view.do?i_sFlagReply=Y";
				MobileCmcMy.fn.goDetail(id,url);
			 });
			 $(".btn_write").unbind("click").click(function(){
				 var url = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_my.do";
				location.href = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_reg.do?i_sReturnUrl="+url;
			 });
			
		},
	
        goDetail : function(id,url){
        	var returnurl = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_my.do";
        	$("input[name='i_sMemocd']",frm).val(id);
        	$("input[name='i_sReturnUrl']",frm).val(returnurl);
        	var frm = document.frm;
        	frm.action = url;
        	frm.submit();
        	
        },
        addScrollEvent : function(){
        	
        	$(window).bind("scroll",function(event){
        		var classnm = "listArea";
        		
        		if($("input[name='sort']:checked").val() == "R") {
        			classnm = "replyArea";
        		}
        		
        		if(!MobileCmcMy.isLoadingContent && $(window).scrollTop() >= ($(document).height()- $(window).height()-292) &&
        				parseInt(parameter.i_iNowPageNo) < parseInt(parameter.i_iTotalPageCnt) && parseInt(parameter.i_iRecordCnt) > $(".chatterListBox", "."+classnm).size() &&
        				$(".chatterListBox", "."+classnm).size()>0){
        			if(MobileCmcMy.isLoadingContent){
                		return;
                	}
                	
                	MobileCmcMy.isLoadingContent = true;
        			showScrollLoadingBox($(".div_spinArea"));
        			
        			var result = parameter.pageStack[0];
        			for(var i in parameter.pageStack){
        				if(parseInt(result) < parseInt(parameter.pageStack[i])){
        					result = parameter.pageStack[i];
        				}
        			}
        			parameter.i_iNowPageNo = parseInt(result) +1;
        			
        			setTimeout(function() {
        				MobileCmcMy.fn.getMyCmcInfo(parameter.i_iNowPageNo);
        			}, 1000);
        			
        		}else if(!MobileCmcMy.isLoadingContent && $(window).scrollTop()==0 &&
        				parameter.i_iNowPageNo>1 && parameter.i_iRecordCnt>0 &&
        				$(".chatterListBox", "."+classnm).size()>0){
        					var result = parameter.pageStack[0];
        					for(var i in parameter.pageStack){
        						if(parseInt(result)>parseInt(parameter.pageStack[i])){
        							result = parameter.pageStack[i];
        						}
        					}
        					if(parseInt(result)>1){
        						parameter.i_iNowPage = parseInt(result)-1;
        						
        						MobileCmcMy.getMyCmcInfo(paramter.i_iNowPageNo);
        					}
        				}
        	});
        },
        getPageInit : function(){
        	
			parameter.i_iNowPageNo = $("#i_iNowPageNo").val();
			parameter.i_sFlagSort = $("input[name='sort']:checked").val();
			parameter.i_sFlagInit = "Y";
			parameter.i_sUserid = $("input[name='i_sUserid']").val();
			parameter.i_sNickname = $("input[name='i_sNickname']").val();
			
        	MobileCommon.ajax({
        		url : GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_cmc_my_ajax.do",
        		dataType : "json",
        		data : parameter,
        		animation : false,
        		async : false,
        		success : function(data,textStatus){
        			if(data.status=="succ"){
        				var myinfo = data.object.myInfo;
        	        	var arrName =[];
        	        	arrName.push("<p>");
        	        	arrName.push("닉네임 : ");
        	        	
        	        	if(parameter.i_sNickname==undefined){
        	        		arrName.push("<span class=\"nonick\">닉네임이 아직 없습니다.</span>");
        	        		arrName.push("</p>");
            	        	arrName.push("<span class=\"btn_ty3 v3\"><a class=\"btn_nickname\"href=\"#\" onclick=\"MobileCommon.fn.nickname('${sessionScope.s_nickname}')\">닉네임등록</a></span>");
        	        		
        	        	}else{
        	        		arrName.push("<span>"+parameter.i_sNickname+"</span>");
        	        		arrName.push("</p>");
            	        	arrName.push("<span class=\"btn_ty3 v3\"><a class=\"btn_nickname\"href=\"#\" onclick=\"MobileCommon.fn.nickname('${sessionScope.s_nickname}')\">닉네임변경</a></span>");
        	        	}
        	        	
        	        	
        	        	$("#ttlBox").html(arrName.join(""));
        	        	
        	        	var arrHtml = [];
        	        	arrHtml.push("<ul>");
        	        	arrHtml.push("<li>");
        	        	arrHtml.push("<p class=\"ttl\">베스트 포토리뷰</p>");
        	        	arrHtml.push("<span><em>"+SetNumComma(myinfo.v_ph_best)+"</em>개</span>");
        	        	arrHtml.push("</li>");
        	        	arrHtml.push("<li>");
        	        	arrHtml.push("<p class=\"ttl\">베스트 수다글</p>");
        	        	arrHtml.push("<span><em>"+SetNumComma(myinfo.v_memo_best)+"</em>개</span>");
        	        	arrHtml.push("</li>");
        	        	arrHtml.push("<li>");
        	        	arrHtml.push("<p class=\"ttl\">추천수</p>");
        	        	var vote;
        	        	if(myinfo.n_vote_memo == undefined){
        	        		vote = 0;
        	        	}else{
        	        		vote = SetNumComma(myinfo.n_vote_memo);
        	        	}
        	        	arrHtml.push("<span><em>"+vote+"</em>개</span>");
        	        	arrHtml.push("</li>");
        	        	arrHtml.push("</ul>");
        	        	
        	        	$("#countList").html(arrHtml.join(""));
        				MobileCmcMy.isLoadingContent = false;
        				
        				MobileCmcMy.fn.setMyCmcInfo(data.object);
        				var writeList = data.object.writeList;
        				if($.inArray(parseInt(writeList.page.i_iNowPageNo),parseInt(parameter.pageStack))==-1){
        					parameter.pageStack.push(writeList.page.i_iNowPageNo);
        				}
        				
        				
        			}else{
        				showMessageBox({
        					message:data.message
        				});
        			}
        			
        		},error : function(){
        			MobileCmcMy.isLoadingContent = false;
        		}
        	});
        },
        getMyCmcInfo : function(i_iNowPageNo){

        	
        	MobileCmcMy.isLoadingContent = false;
        	var flagSort = "";
        	
        	flagSort = $("input[name='sort']:checked").val();
        		
        	
        
			parameter.i_iNowPageNo = i_iNowPageNo;
			parameter.i_sFlagSort = flagSort;
			parameter.i_sFlagInit = "N";
			parameter.i_sUserid = $("input[name='i_sUserid']").val();
			parameter.i_sNickname = $("input[name='i_sNickname']").val();
        	MobileCommon.ajax({
        		url : GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_cmc_my_ajax.do",
        		dataType:"json",
        		data:parameter,
        		animation : false,
        		async : false,
        		success : function (data,textStatus){
        			if(data.status=="succ"){
        				MobileCmcMy.isLoadingContent = false;
        				MobileCmcMy.fn.setMyCmcInfo(data.object);
        				
        				var writeList = data.object.writeList;
        				if($.inArray(parseInt(writeList.page.i_iNowPageNo),parseInt(parameter.pageStack))==-1){
        					parameter.pageStack.push(writeList.page.i_iNowPageNo);
        				} 
        				hideScrollLoadingBox();
        			}else{
        				showMessageBox({
        					message : data.message
        				});
        			}
        			
        			
        		},error : function(){
        			MobileCmcMy.isLoadingContent = false;
        		}
        	});
        	MobileCmcMy.fn.addBtnEvent();
        },
        setMyCmcInfo : function(object){
        	
        	var list = object.writeList.list;
        	var page = object.writeList.page;
        	
        
        	var flagSort = $("input[name='sort']:checked").val();
        	
        	parameter.i_iRecordCnt = page.i_iRecordCnt;
        	parameter.i_iNowPageNo = page.i_iNowPageNo;
        	parameter.i_iTotalPageCnt = page.i_iTotalPageCnt;
        	
        
        		if(flagSort == "W"){
        			$(".replyArea").hide();
        			var arrHtml=[];
        			
        			if(list != undefined && list.length >0){
        				for(var i=0; i<list.length; i++){
        					arrHtml.push("<div class=\"chatterListBox\">");
            				arrHtml.push("<div class=\"list\">");
            				arrHtml.push("<a class=\"mylistdetail\" id=\""+list[i].v_memocd+"\" href=\"#\">");
            				
            				if(list[i].v_flag_best == "Y"){
            					arrHtml.push("<span class=\"ico_best\">best</span>");
            				}
            				
            				if(list[i].v_image_path != undefined && list[i].v_image_path != "") {
            					arrHtml.push("<div class=\"thumbImg\"><img src=\""+list[i].v_image_path+"\"height=\"73px\" alt=\"\"  /></div>");
            				}
            				arrHtml.push("<div class=\"cont\">");
            				arrHtml.push("<p class=\"subj\">");
            				arrHtml.push(""+list[i].v_title+"</p>");
            				arrHtml.push("<p class=\"category\">"+list[i].v_talknm+"</p>");
            				arrHtml.push("<div class=\"countBundle\">");
            				arrHtml.push("<span class=\"date\">"+changeBeforeDate(list[i].v_reg_dtm)+"</span>");
            				arrHtml.push("<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+list[i].n_reply_cnt+"</em></span>");
            				arrHtml.push("<span class=\"ico_like\"><span class=\"hide\">추천</span><em>"+list[i].n_vote+"</em></span>");
            				arrHtml.push("</div>");
    						arrHtml.push("</div>");
    						arrHtml.push("</a>");
    						arrHtml.push("</div>");
    						arrHtml.push("</div>");
        					
        				}        				
        			
		    		}else{
		    			arrHtml.push("<div class=\"chatterListBox\">");
		    			arrHtml.push("<div class=\"nodata\">");
						arrHtml.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
						arrHtml.push("</div>");
						arrHtml.push("</div>");
		    		}
	        		if(parseInt(page.i_iNowPageNo) == 1){
	        			$(".div_listArea").html(arrHtml.join(""));
	        		}else{
	        			var el =  $(arrHtml.join("")).appendTo($(".div_listArea"));
	        			var $sortContainer = $("#sortContainer");
	        		}
	        		$(".listArea").show();
        	}else{
        		$(".listArea").hide();
        		var arrHtml=[];
        		
        		if(list!= undefined && list.length>0){
        			for(var i=0;i<list.length; i++){
        				var contents = getByteString(list[i].v_contents, 30);
        				contents = contents.replace(/\[image#(.*?)\]/g, "");
        				var imageUrl = "";
        				if(list[i].v_image_path != undefined && list[i].v_image_path != "") {
							imageUrl = list[i].v_image_path.replace("_100", "_680");
        				}
        				arrHtml.push("<div class=\"chatterListBox\">");
        				arrHtml.push("<div class=\"list\">");
        				arrHtml.push("<a class=\"mycommdetail\" id=\""+list[i].v_recordid+"\"href=\"#\">");
        				
        				arrHtml.push("<div class=\"cont\">");
        				arrHtml.push("				<p class=\"subj\">");
        				if(imageUrl != ""){
        					arrHtml.push("						<img src=\""+imageUrl+"\"/>\""+contents+"</p>");
        				}else{
        					arrHtml.push("						"+contents+"</p>");
        				}
        				
        				arrHtml.push("<div class=\"countBundle\">");
        				arrHtml.push("<span class=\"date\">"+changeBeforeDate(list[i].v_reg_dtm)+"</span>");
        				
        				if(parseInt(list[i].n_level)==1){
        					arrHtml.push("<span class=\"commentType\">댓글의 댓글 "+list[i].n_child_cnt+"개</span>");
        					        					
              			}else{
              				arrHtml.push("<span class=\"commentType2\">대댓글입니다.</span>");
              				
              			}
        				arrHtml.push("</div>");
						arrHtml.push("</div>");
						arrHtml.push("</a>");
						arrHtml.push("</div>");
						arrHtml.push("</div>");
        			}
        		}else{
        			arrHtml.push("<div class=\"chatterListBox\">");
        			arrHtml.push("<div class=\"nodata\">");
					arrHtml.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
					arrHtml.push("</div>");
					arrHtml.push("</div>");
        		}
        		
        		if(parseInt(page.i_iNowPageNo)==1){
        			$(".div_replyArea").html(arrHtml.join(""));
        			
        		}else{
        			var el =  $(arrHtml.join("")).appendTo($(".div_replyArea"));
        			var $sortContainer = $("#sortContainer");
        		}
        		
        		$(".replyArea").show();
        	}
        		
        	MobileCmcMy.fn.addBtnEvent();
        } 
	}
};
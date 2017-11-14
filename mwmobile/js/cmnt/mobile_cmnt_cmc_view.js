var	MobileCmcView = {
	name : "MobileCmcView",

	

	init : function() {
		MobileCmcView.fn.getPageInit("N");
		
		MobileCmcView.fn.addBtnEvent();
	},
	fn : {
		//수다카페 디테일 버튼 이벤트
		addBtnEvent : function(){
			$(".btn_back").unbind("click").click(function(event){				
				event.preventDefault();
				var frm = document.frm;
				frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_list.do";
				frm.submit();
			});
			$(".ico_like").unbind("click").click(function(event){
				event.preventDefault();
				if($("#i_sFlagLike")=="Y" || $(this).hasClass("active")){
					showConfirmBox({
						message : "추천을 취소하시겠어요?",
						ok_func : function(){
							MobileCmcView.fn.addLike();
						}
					});
				}else{
					MobileCmcView.fn.addLike();
				}
				
			});
			  
			$(".btnList").unbind("click").click(function(event){
				event.preventDefault();
				var frm = document.frm;
				frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_list.do";
				frm.submit();
			});
			$(".btn_myList").unbind("click").click(function(event){
				var url = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_view?i_sMemocd="+$("input[name='i_sMemocd']").val();
				$(this).attr('href',GLOBAL_WEB_URL+'mobile/cmnt/mobile_cmnt_cmc_my.do?i_sReturnUrl='+url);
						
			});
			$(".btn_write").unbind("click").click(function(){
				
				$(this).attr('href',GLOBAL_WEB_URL+'mobile/cmnt/mobile_cmnt_cmc_reg.do');
				
			});
			$(".btn_ctgother_detail").unbind("click").click(function(event){
				event.preventDefault();
				var frm=$("form[name='frm_detail']");
				var index = $(".btn_ctgother_detail").index($(this));
				var id = $(this).attr("id");
				var talkcd = $(this).attr("name");
				$("input[name='i_sMemocd']",frm).val(id);		
				
				MobileCmcView.fn.goDetail();					
				
			});
			$(".btn_other_detail").unbind("click").click(function(event){
				event.preventDefault();
				
				var frm=$("form[name='frm_detail']");
				
				var index = $(".btn_other_detail").index($(this));
				var id = $(this).attr("id");
				var ctgcd = $(this).attr("name");
				
				$("input[name='i_sMemocd']",frm).val(id);
				
				var level = $("input[name='i_UserLevel']").val();
				var isLogin = $("input[name='isLogin']").val();
				
				if(isLogin == 'N'&& ctgcd == 'CTK20140402000000005' ){
					showMessageBox({
						message : "해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."
					});
				}else if(level=='LV11' && ctgcd == 'CTK20140402000000005' ){
					showMessageBox({
						message : "해당 게시판은 쇼핑등급이 VIP, VVIP이신 분들만 사용이 가능하세요.<br/>양해 부탁드릴게요."
					});
				}
				else{
					MobileCmcView.fn.goDetail();					
				}
			});
			$(".btn_detaildelete").unbind("click").click(function(event){
				event.preventDefault();
				
				showConfirmBox({
					message : "글을 삭제하실 경우 적립된 블루리본포인트도 차감되어요.<br/>정말 삭제하시겠어요?"
					, ok_func : function(){
	    				MobileCmcView.fn.goDelete();
	    			}
				});
				
			});
			$(".modify_content").unbind("click").click(function(event){
				event.preventDefault();
				MobileCmcView.fn.goModify();
			});
			
			$(".btn_con_report").unbind("click").click(function(event){
				
				event.preventDefault();
				var id=$("input[name='i_sMemocd']").val();
				$("input[name='i_sReportcont']").val(id);
				$("input[name='i_sTable']").val("CMC_TALK_MEMO");
				var frm = document.frm;
				frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_report.do";
				frm.submit();
			});
		   $(".btn_beautyProfile").unbind("click").click(function(event){
			  event.preventDefault();
			  var id = $(this).attr("id");
			  MobileBeautyProfile.fn.addPopupBtnEvent(id);
		   });
		   
		   $(".btn_hotlist").unbind("click").click(function(event){
			  event.preventDefault();
			  $("input[name='i_sFlagHot']").val("Y");
			  $("input[name='i_sCategory']").val("");
			  $("input[name='i_sFlagCtg']").val("");
			  var frm = document.frm;
			  frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_list.do";
			  frm.submit();
		   });
		   
		   $(".btn_ctghot").unbind("click").click(function(event){
			  event.preventDefault();
			  $("input[name='i_sFlagHot']").val("Y");
			  
			  $("input[name='i_sFlagCtg']").val($("input[name='i_sCategory']").val());
			  var frm = document.frm;
			  frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_list.do";
			  frm.submit();
		   });
		
		},
		
		//수정 페이지 연결
		goModify : function(){
			var frm = document.frm;
			frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_reg.do";
			frm.submit();
		},
		//글 삭제
		goDelete : function(){
			var frm = $("form[name='frm']");
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_cmc_save_ajax.do",
				type : "post",
				dataType : "json",
				data:{"i_sMemocd":$("input[name='i_sMemocd']",frm).val(),
					  "i_sFlagAction":"D"},
			    animation : false,
			    success : function(data,textStatus,jqXHR){
			    	if(data.status == "succ"){
			    		document.location.href = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_list.do";
			    	}else{
			    		if(data.object == "login"){
			    			showConfirmBox({
 								message : "로그인 하시면 서비스 이용이 가능하세요!"
 									, ok_func : function(){
 										document.frm_login.submit();
 										return;
 									}
 							});
			    		}else{
			    			showMessageBox({
			    				message : data.message
			    			});
			    		}
			    	}
			    }
			});
		},
		// 뜨는글 클릭시
		goDetail : function(){			
			
			var frm=document.frm_detail;
			frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_view.do";
			frm.submit();
			
		},
		//추천 이벤트
		addLike :  function(){
			var frm = $("form[name='frm']");
			var isLogin = $("input[name='isLogin']",frm).val();
			
			if(isLogin == 'N'){
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
						message : "로그인 하시면 서비스 이용이 가능하세요!"
							,ok_func : function(){
								document.frm_login.submit();
							}
					});
				}
			}else{
				
			
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_cmc_view_ajax.do",
				type : "POST",
				dataType : "json",
				data : {"i_sMemocd":$("input[name='i_sMemocd']",frm).val() , "i_sFlagAction" : "UL",
						"i_sRegUserid":$("input[name='i_sRegUserid']").val()},
				animation : false,
				success : function(data,textStatus,jqXHR){
					if(data.status=='succ'){
						if(data.object=="fail"){
							showMessageBox({
								message :  data.message
							});
						}else if(data.object=="cancel"){
							$(".ico_like").removeClass("active");
							MobileCmcView.fn.getPageInit("Y");						
						}else{
							balloonOpen(".ico_like");
							MobileCmcView.fn.getPageInit("Y");
						}						
						
					}else if(data.status == 'isNotLogin'){
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
								message : "로그인 하시면 서비스 이용이 가능하세요!"
									,ok_func : function(){
										document.frm_login.submit();
									}
							});
						}
					}
					
				}
				
			});
			
			}
		},
		//페이지 정보 불러오기
		getPageInit : function(flag){
			var frm = $("form[name='frm']");
			var id = $("input[name='i_sMemocd']",frm).val();
			MobileCommon.ajax({
				url : GLOBAL_WEB_ROOT+"mobile/cmnt/mobile_cmnt_cmc_view_ajax.do",
				type:"post",
				dataType:"json",
				data :{"i_sMemocd":id , "i_sFlagAction":"V","i_sFlagNoti":$("input[name='i_sFlagNoti']").val()},
				animation : false,
				success :function(data,textStatus,jqXHR){
					
					if(data.status == 'succ'){

						var detail = data.object.detail;
						var category = data.object.detail.category;
						var ctgotherlist = data.object.detail.ctgotherlist;
						var otherlist= data.object.detail.otherlist;
						var imglist1 = data.object.detail.imglist1;
						var imglist2 = data.object.detail.imglist2;
						
						
						$("input[name='i_sCategorynm']",frm).val(detail.v_talknm);
						$("input[name='i_sCategory']",frm).val(detail.v_talkcd);
						MobileCmcView.fn.showDetail(detail);
						
						var len = category != undefined ? category.length : 0;
						var chg_category = [];
						
	        			if($("input[name='i_UserLevel']").val() == "LV11" || $("input[name='i_UserLevel']").val() == "LV15" || $("input[name='i_UserLevel']").val() == "LV18" ){
	        				var idx = 0;
	            			for(var i=0; i < len;i++) {
	            				if (category[i].v_talkcd != "CTK20140402000000005") {
	            					chg_category[idx++] = category[i];
	            				}
	            			}
	        			}else{
	        				chg_category = category;
	        			}
	        			
	        			MobileCmcView.fn.showCategory(chg_category);
						
						if(flag == 'N'){
							MobileCmcView.fn.showotherctgList(ctgotherlist,imglist1);
							MobileCmcView.fn.showotherList(otherlist,imglist2);
							MobileComment.fn.getInit($("input[name='i_sMemocd']").val(), 1, "CMC_TALK_MEMO","","");
							MobileComment.init();
						}
						
						MobileCmcView.fn.addBtnEvent();
						
						
						
						if($("#i_sFlagReply").val() == "Y") {
							
							$('body, html').animate(
									{scrollTop : $(".commentArea").offset().top}, 300
							);
						}
						
					}else{
						showMessageBox({
							message : data.message,
							close : function(){
								location.href = data.object;
							}
						});
					}
				}
			});
		},
		
		/**
		 * 수다카페 디테일 내용 보이기
		 */
		showDetail : function(object){
			var main = object.main;

			if(main.v_flag_noti=='N'){
			
				$("input[name='i_sCategory']").val(main.v_talkcd);
				$("input[name='i_sCategorynm']").val(main.v_talknm);
				$("input[name='i_sRegUserid']").val(main.v_userid);
				
				var frm = $("form[name='frm']");
				var userid=$("input[name='i_sUserid']",frm).val();
				var level = main.n_levelno;
				if(level != undefined){
					 level = "m"+level;
				 }else{
					 level = "m1";
				 }
				var ct_level = main.v_cmt_levelno;
				if(ct_level !=  undefined){
					var ctlevel = " c"+ct_level;
				}else{
					ctlevel = "c1";
				}
				
				var date = main.v_reg_dtm;
				var sResult = changeBeforeDate(date);					
		
				var arrHtml = [];
				
				if(main.v_flag_best == 'Y'){
				arrHtml.push("<div class=\"bestArea\">");
				arrHtml.push("<span class=\"ico_best\">best</span>");
				arrHtml.push("</div>");
				}

				if(main.v_reg_channel == "MOBILE" || main.v_reg_channel == "APP"){
					arrHtml.push("	<span class=\"sp_ico i1\" style=\"float:left; margin-top:5px;\">모바일</span>");
				}
				arrHtml.push("<p class=\"subject\">"+main.v_title+"</p>");  
		        arrHtml.push("<div class=\"userInfoArea\">");
		        if(main.v_proimag_url != undefined && main.v_proimag_url != ""){
		        	arrHtml.push("<div class=\"photoZ\"><img src=\""+main.v_proimag_url+"\" alt=\"\" onerror=\"fnNoImageUser(this);\"></div>");
		        }else{
		        	arrHtml.push("<div class=\"photoZ\"><img src=\""+GLOBAL_IMG_URL+"common/non-userPhoto.jpg\" alt=\"\" onerror=\"fnNoImageUser(this);\"></div>");
		        }
		        
		        
		        arrHtml.push("<div class=\"userInfoZ\">");
		        arrHtml.push("<div class=\"name\">");
		        arrHtml.push("<p>");
		        if(main.v_nickname == undefined){
		        	arrHtml.push("<span class=\"nm\"  style=\"margin-right:5px;\">"+getStringReverseHidden(main.v_userid,3)+"</span>");
		        }else{
		        	arrHtml.push("<span class=\"nm\"  style=\"margin-right:5px;\">"+main.v_nickname+"</span>");
		        }
		        
		        if(main.n_bpcnt != 0){
		        	arrHtml.push("<a href=\"#\" id=\""+main.v_userid+"\"class=\"btn_beautyProfile\"><img src=\""+GLOBAL_MOBILE_IMG_URL+"common/ico_beautyProfile.png\"/></a>");
		        }
		        arrHtml.push("</p>");
		        arrHtml.push("</div>");
		        arrHtml.push("<div class='gradeZone'>");
		        arrHtml.push("	<span class=\"ico_memberLevel "+level+"\"></span>");
		        arrHtml.push("	<span class=\"ico_communityLevel"+ctlevel+"\"  style=\"margin-right:5px;\"></span>");
		        arrHtml.push("	<span class=\"f_st1\"style=\"float:right\">조회수 :"+main.n_read_cnt+"</span>");
		        arrHtml.push("</div>");
		        arrHtml.push("</div>");
		        arrHtml.push("</div>");
		        arrHtml.push("<div class=\"info\">");
		        arrHtml.push("<span class=\"f_st2\">"+main.v_talknm+"</span>");
		        arrHtml.push("	<span class=\"date\" style=\"margin-left:10px;\">"+sResult+"</span>");
		        
		        arrHtml.push("	<div class=\"btnBundle\">");
		        if(userid!=main.v_userid){
		        	arrHtml.push("	<a href=\"#\" class=\"btn_con_report\"><span>신고</span></a>");
		        }else{
		        	arrHtml.push("	<a href=\"#\" class=\"btn_modify modify_content\">수정</a>");
		            arrHtml.push("	<span class=\"term\"></span>");
		            arrHtml.push("	<a href=\"#\" class=\"btn_delete btn_detaildelete\">삭제</a>");
		        }                    
		        arrHtml.push("	</div>");
		        arrHtml.push("</div>");
		        arrHtml.push("<div class=\"cont\">");
		        arrHtml.push("<div class=\"txt div_content div_cmnt_content\"></div>");
		        arrHtml.push("</div>");
		                                           
		        $("#detail").html(arrHtml.join(""));
		        
		        $(".span_vote").text(SetNumComma(main.n_vote)+"명");
		       
		        MobileCmcView.fn.addBtnEvent();
				
		        if(main.v_clob != undefined && main.v_clob != "") {
		        	if(object.imglist != undefined && object.imglist.length > 0) {
		        		var imgList = object.imglist;
		        		var message = fnChangeBr(main.v_clob);
		        		
		        		for(var i = 0; i < imgList.length; i++) {
		        			var imageUrl = imgList[i].v_image_path.replace("_100", "_680");
		        			
		        			message = message.replace(imgList[i].v_buffer1, "<img src='"+ imageUrl +"'/>");
		        			
		        		}
		        		
		        		$(".div_cmnt_content").html(message);
		        		
		        	}else{
			        	$(".div_cmnt_content").html(fnChangeBr(main.v_clob));
			        }
		        }
			}else{
			
				var date = main.v_reg_dtm;
				var sResult = changeBeforeDate(date);		
				var arrHtml=[];
				
				arrHtml.push("<p class=\"subject\">"+main.v_title+"</p>");  
		        arrHtml.push("<div class=\"userInfo\">");
		        arrHtml.push("<p class=\"name\">");
		        if(main.v_userid != "AP491594"){
		        	arrHtml.push("<span class=\"nm\">운영자</span>");
		        }else{
		        	arrHtml.push("<span class=\"nm\">관리자</span>");
		        }
		        	                  
		        arrHtml.push("</p>");
		        arrHtml.push("</div>");
		        arrHtml.push("<div class=\"info\">");
		        arrHtml.push("<span class=\"date\">"+sResult+"</span>");
		        arrHtml.push("<div class=\"btnBundle\">");	                              
		        arrHtml.push("</div>");
		        arrHtml.push("</div>");
		        arrHtml.push("<div class=\"cont\">");
		        arrHtml.push("<div class=\"txt div_content div_cmnt_content\">"+fnChangeBr(main.v_clob)+"</div>");
		        arrHtml.push("</div>");
		                                              
		        $("#detail").html(arrHtml.join(""));
		    //detail
		        if(main.v_clob != undefined && main.v_clob != "") {
		        	if(object.imglist != undefined && object.imglist.length > 0) {
		        		var imgList = object.imglist;
		        		var message = fnChangeBr(main.v_clob);
		        		
		        		for(var i = 0; i < imgList.length; i++) {
		        			var imageUrl = imgList[i].v_image_path.replace("_100", "_680");
		        			
		        			message = message.replace(imgList[i].v_buffer1, "<img src='"+ imageUrl +"'/>");
		        			
		        		}
		        		
		        		$(".div_cmnt_content").html(message);
		        		
		        	}else{
			        	$(".div_cmnt_content").html(main.v_clob);
			        }
		        }
		    
		        //$(".span_vote").text(SetNumComma(main.n_vote)+"명");
		        MobileCmcView.fn.hideother();
			}
			
		},
	
		/**
		 * 수다카페 서브메뉴 카테고리 보이기
		 */
		showCategory : function(object){
						
			var arrHtml = [];						
			$(object).each(function(index,ctglist){
				
				if(ctglist.v_talkcd1 != undefined){
					arrHtml.push("<li><input name=\"c\" id=\"c"+index+"\" class=\"option\" type=\"radio\"  value=\""+ctglist.v_talkcd+"\" checked=\"checked\"/><label for=\"c"+index+"\">"+ctglist.v_title+"</label></li>");
					$(".span_title").text(ctglist.v_title);
					
				}else{
					arrHtml.push("<li><input name=\"c\" id=\"c"+index+"\" class=\"option\" type=\"radio\" value=\""+ctglist.v_talkcd+"\" /><label for=\"c"+index+"\">"+ctglist.v_title+"</label></li>");
				}
			});
			
			
			$(arrHtml.join("\n")).appendTo($("#open"));
			MobileCmcView.fn.setSubMenuChange();
			
		},
		/**
		 * 수다카페 서브 메뉴 처리
		 */
		setSubMenuChange : function() {
			
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');
			
			select_input.unbind("click").click(function() {
				
				$("input[name='i_sFlagCtg']",frm).val($(this).val());
				$("input[name='i_sCategory']",frm).val($(this).val());
				
				var frm = document.frm;
				frm.action = GLOBAL_WEB_URL+"mobile/cmnt/mobile_cmnt_cmc_list.do";
				frm.submit();			
			});
		},
		/**
		 * 같은 카테고리 뜨는글 리스트
		 */
		showotherctgList : function(object,imglist1){
			var arrTitle =[];
			var frm = $("form[name='frm']");
			arrTitle.push("<a href=\"#\" class=\"btn_ctghot\"><p class='ttl'>"+$("input[name='i_sCategorynm']",frm).val()+" 뜨는 글</p></a>");
			if(object == undefined || object.length == 0){
				arrTitle.push("<div class=\"chatterListBox\">");
				 arrTitle.push("<div class=\"nodata\">");
        		 arrTitle.push("	<p class=\"sp_bg s5\">아직 뜨는 글이 존재하지 않습니다.</p>");
				 arrTitle.push("</div>");
			}else{
				arrTitle.push("<ul id=\"chatterList\"class=\"chatterListBox\"></ul>");
			}
			
			$(arrTitle.join("\n")).appendTo("#otherlist");
			$(object).each(function(index,chatter){
				var recordid = "";
				var imgpath = "";
				
				var arrHtml =[];
				var date = chatter.v_reg_dtm;
				var sResult = changeBeforeDate(date);
				arrHtml.push("<li>");
				arrHtml.push("<div class=\"list\">");
				arrHtml.push("<a name=\""+chatter.v_talkcd+"\"id=\""+chatter.v_memocd+"\"class=\"btn_ctgother_detail\"href=\"#\">");
				if(chatter.v_flag_best == 'Y'){
					arrHtml.push("<span class=\"ico_best\">best</span>");
				}
				
				 if(chatter.v_image_path != undefined && chatter.v_image_path != "") {
					 var imagepath = chatter.v_image_path.replace("_100","_CROP_134");
						arrHtml.push("			<div class=\"thumbImg\"><img src=\""+imagepath+"\" height=\"69px\" width=\"69px\" alt=\"\" onerror=\"fnNoImage(this);\" /></div>");
                }
				arrHtml.push("<div class=\"cont\">");
				arrHtml.push("<p class=\"subj\">"+chatter.v_title+"</p>");
				arrHtml.push("<p class=\"category\">"+chatter.v_talknm+"</p>");
				arrHtml.push("<div class=\"countBundle\">");
				arrHtml.push("<span class=\"date\">"+sResult+"</span>");
				arrHtml.push("<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+chatter.reply_cnt+"</em></span>");
				arrHtml.push("<span class=\"ico_like\"><span class=\"hide\">추천</span><em>"+chatter.n_vote+"</em></span>");
				arrHtml.push("<span class=\"sp_ico2 i7 ico_inquiry ico_viewcnt\"><span class=\"hide_txt\">조회수</span><em>"+chatter.n_read_cnt+"</em></span>");
				arrHtml.push("</div>");
				arrHtml.push("</div>");
				arrHtml.push("</div>");
				arrHtml.push("</a>");
				arrHtml.push("</div>");
				arrHtml.push("</li>");
				$(arrHtml.join("\n")).appendTo("#chatterList");
			});
		},
		/**
		 * 수다카페 뜨는글 리스트
		 */
		showotherList : function(object,imglist2){

			var arrTitle =[];
			arrTitle.push("<a href=\"#\" class=\"btn_hotlist\"><p class='ttl'>수다카페 뜨는 글</p></a>");
			if(object == undefined || object.length == 0){
				 arrTitle.push("<div class=\"chatterListBox\">");
				 arrTitle.push("<div class=\"nodata\">");
				 arrTitle.push("	<p class=\"sp_bg s5\">아직 뜨는 글이 존재하지 않습니다.</p>");
				 arrTitle.push("</div>");
			}else{
				arrTitle.push("<ul id=\"allotherList\"class=\"chatterListBox\"></ul>");
			}
			
			$(arrTitle.join("\n")).appendTo("#otherlist");
			$(object).each(function(index,other){
				
				var arrHtml =[];
				var date = other.v_reg_dtm;
				var sResult = changeBeforeDate(date);
				arrHtml.push("<li>");
				arrHtml.push("<div class=\"list\">");
				arrHtml.push("<a name=\""+other.v_talkcd+"\"id=\""+other.v_memocd+"\"class=\"btn_other_detail\"href=\"#\">");
				if(other.v_flag_best == 'Y'){
					arrHtml.push("<span class=\"ico_best\">best</span>");
				}
				
				if(other.v_image_path != "" && other.v_image_path != undefined) {
					var imagepath = other.v_image_path.replace("_100","_CROP_134");
					arrHtml.push("			<div class=\"thumbImg\"><img src=\""+imagepath+"\" height=\"69px\" width=\"69px\" alt=\"\"onerror=\"fnNoImage(this);\" /></div>");
				}
				arrHtml.push("<div class=\"cont\">");
				arrHtml.push("<p class=\"subj\">"+other.v_title+"</p>");
				arrHtml.push("<p class=\"category\">"+other.v_talknm+"</p>");
				arrHtml.push("<div class=\"countBundle\">");
				arrHtml.push("<span class=\"date\">"+sResult+"</span>");
				arrHtml.push("<span class=\"ico_comment\"><span class=\"hide\">댓글</span><em>"+other.reply_cnt+"</em></span>");
				arrHtml.push("<span class=\"ico_like\"><span class=\"hide\">추천</span><em>"+other.n_vote+"</em></span>");
				arrHtml.push("<span class=\"sp_ico2 i7 ico_inquiry ico_viewcnt\"><span class=\"hide_txt\">조회수</span><em>"+other.n_read_cnt+"</em></span>");
				arrHtml.push("</div>");
				arrHtml.push("</div>");
				arrHtml.push("</div>");
				arrHtml.push("</a>");
				arrHtml.push("</div>");
				arrHtml.push("</li>");
				$(arrHtml.join("\n")).appendTo("#allotherList");
			});
		},
		
		hideother : function(){
			// $("#commentcnt").hide();
				//$("#commentlist").hide();
				$("#chatterList").hide();
				$("#allotherList").hide();
				$("#otherlist").hide();
				$(".recommendArea").hide();
		}
	}
};
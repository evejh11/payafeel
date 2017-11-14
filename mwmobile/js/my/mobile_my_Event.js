
var MobileMyEvent = {
	name : "MobileMyEvent",
	init : function() {
		//MobileMyEvent.fn.getPageInit();
		MobileMyEvent.fn.getEventList();
		//MobileMyEvent.fn.addBtnEvent();
	},
	fn : {
		setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');
			
			select_input.click(function() {
				location.href	= "/mobile/my/" + $(this).val() + ".do";
			});
		},
		
		addBtnEvent : function() {
			var $tabCate = $(".myActivity .tab_cate"); 
	        var $tabCont = $(".myActivity .tab_cont");
	        $tabCate.unbind("click").click(function(event){
	        	event.preventDefault();
	            var $idxTab = $tabCate.index(this);
	            $tabCont.hide().eq($idxTab).show();      
	            $tabCate.removeClass("active").eq($idxTab).addClass("active");
	            
	            var id = $(this).attr("id");
	            $("input[name='i_sFlagEventWin']").val(id);
	            MobileMyEvent.fn.getEventList();
	        });
	        
	        
	  	  $(".eventdetail").unbind("click").click(function(event){
			  event.preventDefault();	
			  var index=$(".eventdetail").index($(this));
			  var id = $(".eventdetail").eq(index).attr("id");
			  MobileMyEvent.fn.goDetail(id);
	  	  });
		},
		
		goDetail : function(id){
			
			$("input[name='i_sEventcd']").val(id);	
			var frm=document.frm;				
			frm.action = "/mobile/event/mobile_event_view.do";
			if(GLOBAL_FLAG_APP_NEW == "Y") {
				var arrParam = [];
				arrParam.push("<input type='hidden' name='i_sLoginKey' 		value='"+GLOBAL_LOGIN_KEY+"'/>");
				arrParam.push("<input type='hidden' name='i_sLoginType'		value='"+GLOBAL_LOGIN_TYPE+"'/>");
				arrParam.push("<input type='hidden' name='i_sDeviceNum' 	value='"+GLOBAL_DEVICE_NUM+"'/>");
				$(arrParam.join("")).appendTo($("form[name='frm']"));
			}
			frm.submit();
		},
		
		getEventList : function (){
			if($("input[name='i_sFlagEventWin']").val() == ""){
				$("input[name='i_sFlagEventWin']").val("N");
			}
				MobileCommon.ajax({	
					url			: "/mobile/my/mobile_my_Event_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: {
						i_sFlagEventWin : $("input[name='i_sFlagEventWin']").val()
					},
					animation	: false,
					success		: function (data, textStatus) {
						
						//이벤트 리스트
						if ("succ" == data.status) {
						
							var obj= data.object.Event;
							var list = obj.list;
							var page = obj.page;
							var attendCnt = obj.attendCnt;
							$(".AnounceWinnerCounter").text(attendCnt);
							
							MobileMyEvent.fn.setEventList(list,page);
							MobileMyEvent.fn.addBtnEvent();
						}else {
							showMessageBox({ message : data.message});
						}
									
					}
			});
		},
						
		setEventList : function(list,page) {
			
		 var i_sFlagEventWin =  $("input[name='i_sFlagEventWin']").val();
		 if (i_sFlagEventWin=="N"){ 
				var arrHtml = [];
				if(list != undefined && list.length > 0) {
					
					var length = list.length;
							for(var i=0;i<length; i++){
								
									arrHtml.push("  <li>");
									arrHtml.push("    <div class='evtDetail'>");
									arrHtml.push(" 	  	<a href='#' id='"+list[i].v_eventcd+"'class='eventdetail'>");
									arrHtml.push(" 	  		<p><img src='"+list[i].v_img_path+"' alt=''/></p>");
									arrHtml.push(" 	     	<div class='ttlbox'>");
									arrHtml.push("  				 <p class='ttl'>"+list[i].v_eventnm+"</p>");
									arrHtml.push("     				 <p class='txt ellipsis'>"+list[i].v_evt_comment+"</p>");
									arrHtml.push("   				 <p class='date'>"+changeDatePatten(list[i].v_event_en_dt)+"까지</p>");
									arrHtml.push("  		</div>");
									arrHtml.push("  	 </a>");
									arrHtml.push("   </div>");
									arrHtml.push("    <div class='socialListEvt'>");
									arrHtml.push("    		<a href='#balloonLike' class='ico_like' onclick='balloonOpen(this);return false;'><span><span class='hide'>좋아요</span>"+list[i].n_vote_cnt+"</span></a>");
									arrHtml.push("  		<a href='#none' class='ico_comment'><span>댓글 <em>"+list[i].comment_reply_cnt+"</em></span></a>");
									/*arrHtml.push("   		<a href='#none' class='ico_share' onclick='modalPopup('#modalPopupEvtShare');return false;'><span>공유하기</span></a>");*/
									arrHtml.push("  	</div>");
									arrHtml.push("  </li> ");
									$(".My_EventList").html(arrHtml.join(""));
									$(".getEventCount").text(SetNumComma(list.length)); 
									
								}
							}else		
								{	
									arrHtml.push("<div class=\"nodata\">");
									arrHtml.push("	<p class=\"sp_bg s13\">참여한 이벤트가 없습니다.</p>");
									arrHtml.push("</div>");
									$(".My_EventList").html(arrHtml.join(""));
									$(".getEventCount").text(0); 
								}
				MobileMyEvent.fn.addBtnEvent();
									
					}else if(i_sFlagEventWin=="W") {
						
						var arrHtml = [];
							if(list != undefined && list.length > 0) {
								
							 var length = list.length;
								for(var i=0;i<length;i++)
								{
									arrHtml.push("<li>");
									arrHtml.push("    <div class='evtDetail'>");
									arrHtml.push(" 	  	<a href='#' id='"+list[i].v_eventcd+"'class='eventdetail'>");
									arrHtml.push(" 	  		<img src='"+list[i].v_img_path+"' alt=''/>");
									arrHtml.push(" 	     	<div class='ttlbox'>");
									arrHtml.push("  				 <p class='ttl'>"+list[i].v_eventnm+"</p>");
									arrHtml.push("     				 <p class='winDate'>당첨자 발표일:"+changeDatePatten(list[i].v_issue_dt)+"</p>");
									arrHtml.push("  		</div>");
									arrHtml.push("  	 </a>");
									arrHtml.push("   </div>");
								if(list[i].v_flag_win=='Y'){
										arrHtml.push("<div class='resultArea'>");	
										arrHtml.push("    <p class='ment'>축하드립니다.!! 해당 이벤트에 당첨되었습니다.</p>   ");	
										arrHtml.push("     <p class='txt'>자세한 내용은 공지사항을 참고하세요~</p>");	
										arrHtml.push(" </div> ");	
								}else{
										arrHtml.push("<div class='resultArea'>");	
										arrHtml.push("    <p class='ment2'>아쉽게도 당첨되지 못하셨습니다.</p> ");	
										arrHtml.push("</div>");	
								}
									arrHtml.push("</li>");
									$(".Anounce_Winner").html(arrHtml.join(""));
									$(".AnounceWinnerCounter").text(SetNumComma(list.length));
								}
							}else {
								arrHtml.push("<div class=\"nodata\">");
								arrHtml.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
								arrHtml.push("</div>");
								$(".Anounce_Winner").html(arrHtml.join(""));
								$(".AnounceWinnerCounter").text(0);
								} 
					}
	  		}
	  }
};


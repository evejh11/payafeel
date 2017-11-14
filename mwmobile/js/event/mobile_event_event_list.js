/**
 * 모바일 이벤트 리스트 화면의 이벤트 처리를 위한 Javascript
 */
var	MobileEventList = {

		name : "MobileEventList",

		init : function() {

			$('.btn_back').attr('href', '/mobile/main.do');
			MobileEventList.fn.setSubMenuChange();
			MobileEventList.fn.getEventList();
			
			//MobileEventList.fn.addBtnEvent();
		},


		fn : {
			/**
			 * 이벤트리스트 서브 메뉴 처리
			 */

			addBtnEvent : function(){
				/*	$(".btn_more").unbind("click").click(function(event){
				event.preventDefault();
				MobilesaleExboxNow.fn.getMore();
			});*/
				
				$(".eventDetail").unbind("click").click(function(event){
					event.preventDefault();	
					var index=$(".eventDetail").index($(this));
					var id = $(".eventDetail").eq(index).attr("id");
//					var catecd = $(".eventDetail").eq(index).attr("data-catecd");
					var flagBilling = $(".eventDetail").eq(index).attr("data-flagBilling");
					var url = $(".span_eventurl").eq(index).text();
					
					MobileEventList.fn.goDetail(id, flagBilling);
					
				});

				$(".ico_share").unbind("click").click(function(event){
					event.preventDefault();
					
					var fbshare = $(this).attr("id");
					var ktshare = $(this).attr("id");
					$(".btn_fb").attr("id",fbshare);
					$(".btn_kt").attr("id",ktshare);
					modalPopup('#modalPopupEvtShare');
					
				});
				$(".ico_like").unbind("click").click(function(event){
					event.preventDefault();
					var eve_index = $(".eventList .ico_like").index($(this));
					MobileEventList.fn.addLike(eve_index);
				});
				//SNS 공유
				$(".btn_fb").unbind("click").click(function(event){
					event.preventDefault();
					var id = $(this).attr("id");
					var evtname = id.split(",")[0]; 
					
					var evtlink = id.split(",")[1];
					var evtimg  = id.split(",")[2];
					var evtdesc = id.split(",")[3];
					
					var rvo = {
							name : evtname
							,link : evtlink
							,picture : evtimg
							,description : evtdesc
					};

					MobileBodyStart.facebookShare(rvo, "N");

				});
				$(".btn_kt").click(function(event){
					event.preventDefault();

					kakao.link("talk").send({
						msg : "천연보습인자를 깨워 피부속에서 스스로 수분이 만들어 진다고!? \n 새롭게 출시 된 라네즈 워터뱅크 크림에 대한 기대평을 남기고 정품 받자!",
						url : "http://m.laneige.co.kr/mobile/event/mobile_water_event_main.do",
						appid : "${WEB_FULL_URL}mobile/",
						appver : "1.0",
						appname : "[라네즈 워터뱅크 이벤트]",
						type : "link"
					});
				});


			},
			
			addLike : function(eve_index){

				var $div_evt = $(".eventList .evtDetail").eq(eve_index);
				var $div_soc = $(".eventList .socialList").eq(eve_index);
				var i_sEventcd = $("a",$div_evt).attr('id');
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
							message : "로그인 하시면 서비스 이용이 가능하세요!",
							ok_func : function(){
								document.frm_login.submit();
							}
						});
					}
				}
				else{
					MobileCommon.ajax({
						url : GLOBAL_WEB_ROOT+"mobile/event/mobile_event_view_ajax.do",
						type : "POST",
						dataType : "json",
						data : {
								"i_sEventcd":i_sEventcd
								, "i_sFlagAction" : "UL"
						},
						animation : false,
						success : function(data,textStatus,jqXHR){
							if(data.status=='succ'){
								/*if(data.object==1){
									var like_cnt = parseInt($(".ico_like > span",$div_soc).html(),10);
									$(".ico_like > span",$div_soc).html(like_cnt+1);
									balloonOpen($(".ico_like").eq(eve_index));
								}else{
									showMessageBox({
										message :  data.message
									});
								}*/
								
								if(data.object == "like") {
									var like_cnt = parseInt($(".em_voteCnt").eq(eve_index).text(),10)+1;
									
									$(".em_voteCnt").eq(eve_index).text(like_cnt);
									balloonOpen($(".ico_like").eq(eve_index));	
								} else {
									showMessageBox({
										message : "더 좋은 이벤트로 찾아뵐게요!"
									});
									var like_cnt = parseInt($(".em_voteCnt").eq(eve_index).text(),10)-1;
									
									$(".em_voteCnt").eq(eve_index).text(like_cnt);
									$(".ico_like").eq(eve_index).removeClass("active");
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
										message : "로그인 하시면 서비스 이용이 가능하세요!",
										ok_func : function(){
											document.frm_login.submit();
										}
									});
								}
							}else{
								showMessageBox({
									message :  data.message
								});
							}	
						}
					});
				}

			},

			setSubMenuChange : function() {
				var	select_input	= $('ul.nav_mcate>li>input[type=radio]');

				select_input.click(function() {
					var todayMonth = $("#todayMonth").val();
					if($(this).val() == "mobile_event_price_gift"){
						location.href  = GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd=EVT" + todayMonth + "gifts"
					}else{
						location.href	= GLOBAL_WEB_URL+"mobile/event/" + $(this).val() + ".do";
					}
				});
			},

			goDetail : function(id, flagBilling){

				$("input[name='i_sEventcd']").val(id);
				$("input[name='i_sFlagBilling']").val(flagBilling);
				
				var frm = document.frm;
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
				frm.action = "/mobile/event/mobile_event_view.do";
				frm.submit();
			},

			getEventList : function () {
				//var frm = $("frm[name='frm']");
				var flagopen = "";
				if(GLOBAL_MOBILE_APP == "APP"){
					flagopen = "i_sFlagAppOpen";
				}else{
					flagopen = "i_sFlagMobileOpen";
				}
				MobileCommon.ajax({	
					url			: "/mobile/event/mobile_event_event_list_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: {

						i_sEventcd : $("input[name='i_sEventcd']").val()  //파라메타 값 불러오기!!!!!!!!!!!!!!!!!!!!!!!!!
						, flagopen : "Y"
					},
					animation	: false,
					success		: function (data, textStatus) {
						//이벤트 리스트
						if ("succ" == data.status) {
						}else {
							alert(data.message);
						}
						var obj= data.object.event_List;
						var length = obj.length;
						var arrr= [];

						for(var i=0;i<length; i++){
							arrr.push("<li>");
							arrr.push("	<div class='evtDetail'>");
							arrr.push("		<a href='#' id='"+obj[i].v_eventcd+"' class='eventDetail'" + " data-catecd=\"" + obj[i].v_evt_categorycd + "\"" + " data-flagBilling=\"" + obj[i].v_flag_billing + "\" onClick=\"trackClicksMall('프로모션','모바일 이벤트리스트^이벤트','이벤트 상세','event5',true,'"+obj[i].v_eventnm+"');eventClickTagEvent('"+obj[i].v_eventcd+"','MOBILE');\">");
							arrr.push("			<img src='"+obj[i].v_mobile_img_path+"' alt=''/>");
							arrr.push("				<div class='ttlbox'>");
							arrr.push("					<p class='ttl'>"+obj[i].v_eventnm+"</p>");
							var comment = "";
							if(obj[i].v_evt_comment != undefined && obj.v_evt_comment != "undefined"){
								comment = obj[i].v_evt_comment;
							}
							arrr.push("					<p class='txt ellipsis'>"+comment+"</p>");
							arrr.push(" 				<p class='date'>"+changeDatePatten(obj[i].v_event_en_dt)+"까지</p>");
							arrr.push("				</div>");
							arrr.push("		</a>");
							arrr.push("	</div>");
							arrr.push("		<div class=\"socialListEvt\"> ");
							if(obj[i].v_flag_myvote != null && obj[i].v_flag_myvote == 'Y'){
								arrr.push("    		<a href='#balloonLike' class='ico_like active'><span><span class='hide'>좋아요</span><em class=\"em_voteCnt\">"+obj[i].n_vote_cnt+"</em></span></a>");							
							}else{
								arrr.push("    		<a href='#balloonLike' class='ico_like'><span><span class='hide'>좋아요</span><em class=\"em_voteCnt\">"+obj[i].n_vote_cnt+"</em></span></a>");
							}
							if(obj[i].v_flag_reply =='Y' && obj[i].v_flag_reply != null){
								arrr.push("  		<a href='#none' class='ico_comment'><span><em>댓글</em>"+obj[i].comment_reply_cnt+"</span></a>");
							}
							arrr.push("    	 	<a href='#none' style='float:right; display:none;'class='ico_share'id=\""+obj[i].v_eventnm+","+GLOBAL_WEB_URL+"mobile/event/mobile_event_view.do?i_sEventcd="+obj[i].v_eventcd+","+obj[i].v_img_path+","+obj[i].v_evt_comment+"\" onclick='modalPopup('#modalPopupEvtShare');return false;'><span>공유하기</span></a>");
							arrr.push("		</div>");   
							arrr.push("	<li>");
						}
						$(".eventList>ul").html(arrr.join(""));

						MobileEventList.fn.addBtnEvent();

					}	
				});	
			}
		}
};

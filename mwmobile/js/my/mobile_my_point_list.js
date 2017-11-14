var parameter = {
			
			
		};

var	MobileMyPointList = {
	
		name : "MobileMyPointList",

	init : function() {
		$('.btn_back').attr('href', '/mobile/main.do');
		MobileMyPointList.fn.setSubMenuChange();
		
		$(".contView").hide();
		MobileMyPointList.fn.addBtnEvent();
		if($("#i_sFlagPoint").val() == "blue") {
			MobileMyPointList.fn.addChangeDtm("2week", "blue");
			$("#tit_blue").click();
			$("#i_sFlagBlueLoad").val("Y");
		} else {
			MobileMyPointList.fn.addChangeDtm("2week", "beauty");
			$("#tit_beauty").click();
			$("#i_sFlagBeautyLoad").val("Y");
		}
		
		$(".beautyPoint").html(SetNumComma($(".span_beautyPoint").text()) + " <em>P</em>");
		$(".bluePoint").html(SetNumComma($(".span_bluePoint").text()) + " <em>P</em>");
		
		$(".usable_point").text(SetNumComma($(".span_beautyPoint").text()));
		$(".lose_point").text(SetNumComma($(".span_lose_point").text()));
		
		$(".s_mpoint").text(SetNumComma($(".span_save_point").text()));
		$(".usable_mpoint").text(SetNumComma($(".span_bluePoint").text()));
		$(".lose_mpoint").text(SetNumComma($(".span_lose_mpoint").text()));
	},

	fn : {
		/**
		 * 이벤트리스트 서브 메뉴 처리
		 */
		
		addBtnEvent : function(){
            
             $("#tit_blue").unbind("click").click(function(event) {
            	 event.preventDefault();
            	 
            	 if($(".contView").eq(1).css("display") == "none") {
            		 $(".contView").eq(1).show();
            		 
            		 if($("#i_sFlagBlueLoad").val() != "Y") {
	            		 var i_iNowPageNo = $("#i_iNowPageNo_blue").val();
	            		 MobileMyPointList.fn.getblueList(i_iNowPageNo);
            		 }
            		 
            		 var $objOffet = $(".contView").eq(1).offset().top;
                     $("html,body").stop().animate({scrollTop:$objOffet},0);
                     
                     $(this).addClass("active");
                     
                     $("#i_sFlagBlueLoad").val("Y");
            	 } else {
            		 $(".contView").eq(1).hide();
            		 $(this).removeClass("active");
            	 }
            	 
             });
             
             $(".lose_bpoint").unbind("click").click(function(event){
            	event.preventDefault(); 
            	MobileMyPointList.fn.checkLosePoint();
             });
             $("#tit_beauty").unbind("click").click(function(event) {
            	 event.preventDefault();
            	 
            	 if($(".contView").eq(0).css("display") == "none") {
            		 $(".contView").eq(0).show();
            		 
            		 if($("#i_sFlagBeautyLoad").val() != "Y") {
            			 var i_iNowPageNo = $("#i_iNowPageNo_beauty").val();
            			 MobileMyPointList.fn.getBeautyList(i_iNowPageNo);
            		 }
            		 
            		 var $objOffet = $(".contView").eq(0).offset().top;
                     $("html,body").stop().animate({scrollTop:$objOffet},0);

                     $(this).addClass("active");
                     
                     $("#i_sFlagBeautyLoad").val("Y");
            	 } else {
            		 $(".contView").eq(0).hide();
            		 $(this).removeClass("active");
            	 }
             });
        
           //더보기
 			$(".btn_blue_more").unbind("click").click(function(event){
 				event.preventDefault();
 				var	i_iNowPageNo	= parseInt($("#i_iNowPageNo_blue").val()) + 1;
 				$('#i_iNowPageNo_blue').val(i_iNowPageNo);
 				
 				MobileMyPointList.fn.getblueList(i_iNowPageNo);
 			 });
 			
 			$(".btn_beauty_more").unbind("click").click(function(event) {
 				event.preventDefault();
 				var i_iNowPageNo = parseInt($("#i_iNowPageNo_beauty").val()) + 1;
 				$("#i_iNowPageNo_beauty").val(i_iNowPageNo);
 				
 				MobileMyPointList.fn.getBeautyList(i_iNowPageNo);
 			});
 			
         //2주
             $(".twoWeek").unbind("click").click(function(event){
   			   event.preventDefault();
   			   var id = $(this).attr("id");
   			   
   			   $(".li_dtm").removeClass("active");
			   $(this).parents(".li_dtm").addClass("active");
   			  
   			   MobileMyPointList.fn.addChangeDtm("2week", id);
   			   if(id == "blue") {
   				   $('#i_iNowPageNo_blue').val(1);
   				   MobileMyPointList.fn.getblueList(1);
   			   } else {
   				$('#i_iNowPageNo_beauty').val(1);
				   MobileMyPointList.fn.getBeautyList(1);
   			   }
   			});
           //1달    
         	$(".onemonth").unbind("click").click(function(event){
 			   event.preventDefault();
 			   var id = $(this).attr("id");
 			   
 			   $(".li_dtm").removeClass("active");
 			   $(this).parents(".li_dtm").addClass("active");
 			   
 			  
 			   MobileMyPointList.fn.addChangeDtm("1month", id);
 			   if(id == "blue") {
  				   $('#i_iNowPageNo_blue').val(1);
  				   MobileMyPointList.fn.getblueList(1);
  			   } else {
  				$('#i_iNowPageNo_beauty').val(1);
				   MobileMyPointList.fn.getBeautyList(1);
  			   }
				
 			});
         	$(".threemonth").unbind("click").click(function(event){
  			   event.preventDefault();
  			   var id = $(this).attr("id");
  			   
  			   $(".li_dtm").removeClass("active");
			   $(this).parents(".li_dtm").addClass("active");
  			  
  			   MobileMyPointList.fn.addChangeDtm("3month", id);	
  			   if(id == "blue") {
 				   $('#i_iNowPageNo_blue').val(1);
 				   MobileMyPointList.fn.getblueList(1);
 			   } else {
 				   $('#i_iNowPageNo_beauty').val(1);
				   MobileMyPointList.fn.getBeautyList(1);
 			   }
 				
  			});

        	$(".sixmonth").unbind("click").click(function(event){
   			   event.preventDefault();
   			   var id = $(this).attr("id");

   			   $(".li_dtm").removeClass("active");
			   $(this).parents(".li_dtm").addClass("active");
   			   
   			   MobileMyPointList.fn.addChangeDtm("6month", id);
   			   if(id == "blue") {
				   $('#i_iNowPageNo_blue').val(1);
				   MobileMyPointList.fn.getblueList(1);
			   } else {
				$('#i_iNowPageNo_beauty').val(1);
				   MobileMyPointList.fn.getBeautyList(1);
			   }
  				
   			});
         	$(".oneyear").unbind("click").click(function(event){
         		event.preventDefault();
         		var id = $(this).attr("id");
         		
         		$(".li_dtm").removeClass("active");
  			    $(this).parents(".li_dtm").addClass("active");
  			    
         		MobileMyPointList.fn.addChangeDtm("1year", id);
         		if(id == "blue") {
    			   $('#i_iNowPageNo_blue').val(1);
    			   MobileMyPointList.fn.getblueList(1);
    			} else {
    			$('#i_iNowPageNo_beauty').val(1);
 					MobileMyPointList.fn.getBeautyList(1);
    			}
         	});

         	$(".blue_lose_pop").unbind("click").click(function(event){
         		event.preventDefault();
         		MobileMyPointList.fn.checkLoseBluePoint();
         	});
		},
		checkLosePoint : function(){
			cmAjax({
					url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_bpoint_pop_ajax.do"
					, type : "POST"
					, dataType : "json"
					, data : {}
					, success : function(data, textStatus) {
						
						if(data.status == "succ") {
							$("#evtlist").html("");
							$("#purlist").html("");
							if(data.object.basic != undefined){
								var basic =data.object.basic; 
								var arrHtmlP = [];
								for(var i=0; i<basic.length; i++){
									arrHtmlP.push("<li>"+basic[i].content+" 된<br/></li>");
									arrHtmlP.push("<li><strong>"+basic[i].bgPoint+"</strong>P가 <strong>"+dateStrucChange(basic[i].exDate,1)+"0시</strong>  소멸 예정입니다.</li>");
								}
								$(arrHtmlP.join("\n")).appendTo("#purlist");
							}
							if(data.object.event != undefined){
								var event =data.object.event; 
								var arrHtmlE = [];
								for(var i=0; i<event.length; i++){
									arrHtmlE.push("<li>"+event[i].content+" 된<br/></li>");
									arrHtmlE.push("<li><strong>"+event[i].evPoint+"</strong>P가 <strong>"+dateStrucChange(event[i].exDate,1)+"0시</strong>  소멸 예정입니다.</li>");
								}
								$(arrHtmlE.join("\n")).appendTo("#evtlist");
							}
							
							modalPopup("#beautypointLose");
						} else if(data.status == "isNotLogin") {
							var options = {
								type : "reload"	
							};
							MobileBodyStart.fnLoginCheck(options);
						} else {
							showMessageBox({
								message : data.message
							});
						}
					}
				});
			
		},
		setSubMenuChange : function() {
			var	select_input	= $('div.selectList>ul>li>input[type=radio]');
	
			select_input.click(function() {
				location.href	= "/mobile/my/" + $(this).val() + ".do";
			});
		},
		
		changeTab2 : function(){
		  
           var $tabCate = $(".tab_wrap2.t2 .tab_cate"); 
           $tabCate.unbind("click").click(function(event){
        	   event.preventDefault();
        	   
               $tabCate.removeClass("active");
               $(this).addClass("active");
               return false;
           });
  
		},
		
	getBeautyList : function () {
		
		MobileCommon.ajax({	
			url			: GLOBAL_WEB_ROOT+"mobile/my/mobile_my_point_list_ajax.do",
			type		: "POST",
			dataType	: "json",
			data		: {
				i_iNowPageNo : $("#i_iNowPageNo_beauty").val(),
				i_sCmcStDt:$("#i_sCmcStDt_beauty").val(),
			    i_sCmcEnDt:$("#i_sCmcEnDt_beauty").val(),
			    i_sFlagPoint : "beauty"
			},
			animation	: false,
			success		: function (data, textStatus) {
				//이벤트 리스트
				if ("succ" == data.status) {
					var page = data.object.listPage;
					var list = data.object.pointList;
					if(list != undefined && list.length > 0) {
						$("#i_iTotalPageCnt").val(page.i_iTotalPageCnt);
						$("#i_iRecordCnt").val(page.i_iRecordCnt);
						var arrr2 =[];
						var listSize = (parseInt(page.i_iNowPageNo) * 5);
						var bList = ((parseInt(page.i_iNowPageNo)-1) * 5);
						var recordCnt = parseInt(page.i_iRecordCnt);
						if(listSize > recordCnt){
							listSize = recordCnt;
						}
						for(var i=bList; i<listSize; i++)
						{	
							var point = parseInt(list[i].accumpt) > 0 ? parseInt(list[i].accumpt) : parseInt(list[i].rdmpt);
							arrr2.push("       	<tr>");
							arrr2.push("     		 <td>"+list[i].regdate+"</td>");
							arrr2.push("      	 	 <td>"+list[i].ptrsn+"</td>");
							arrr2.push("          	 <td>"+SetNumComma(point)+"p</td>");
							arrr2.push("       </tr>");
						}
						
						if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
							$(".btn_beauty_more").hide();
							$(".btn_beauty_policy").hide();
						} else {
							$(".btn_beauty_more").show();
							$(".btn_beauty_policy").show();
						}
						
						if(1 ==page.i_iNowPageNo){
							
							$(".beautyList").html(arrr2.join(""));	
							
						} else{
							$(".beautyList").append(arrr2.join(""));	
						}
						
						
					} else {
						var arrHtml = [];
						arrHtml.push("<tr>");
						arrHtml.push("<td colspan=\"3\">");
						arrHtml.push("<div class=\"nodata\">");
						arrHtml.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
						arrHtml.push("</div>");
						arrHtml.push("</td>");
						arrHtml.push("</tr>");
						
						$(".beautyList").html(arrHtml.join(""));
						
					}
					
					if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
						$(".btn_beauty_more").hide();
						$(".btn_beauty_policy").hide();
					} else {
						$(".btn_beauty_more").show();
						$(".btn_beauty_policy").show();
					}
					
					MobileMyPointList.fn.addBtnEvent();
				} else if(data.status == "isNotLogin"){
					var obj = {
						type : "reload"	
					};
					
					MobileBodyStart.fnLoginCheck(obj);
				} else {
					showMessageBox({
						message : data.message
					});
				}
			}	
		});	

	},
	
		
		getblueList : function (i_iNowPageNo) {
			MobileCommon.ajax({	
				url			: GLOBAL_WEB_ROOT+"mobile/my/mobile_my_point_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: {
					i_iNowPageNo	: i_iNowPageNo,
					i_iPageSize		: $("#i_iPageSize").val(),
					i_sFlagPageInit : "N",
					i_sSortCol:"",
				    i_sSortDir:"DESC",
				    i_sCategory:"",
				    i_sCmcStDt:$("input[name='i_sCmcStDt']").val(),
				    i_sCmcEnDt:$("input[name='i_sCmcEnDt']").val(),
				    i_sFlagPoint : "blue",
				    i_sFlaglistopen:true
				},
				animation	: false,
				success		: function (data, textStatus) {
					//이벤트 리스트
					if ("succ" == data.status) {
						var page = data.object.bluePointList.page;
						var list = data.object.bluePointList.list;
						
						if(list != undefined) {
							var arrr2 =[];
							
							for(var i=0; i<list.length; i++)
							{	
								arrr2.push("       	<tr>");
								arrr2.push("     		 <td>"+changeDatePatten(list[i].v_reg_dtm)+"</td>");
								if(list[i].v_comment != undefined && list[i].v_comment != ""){
									arrr2.push("      	 	 <td>"+list[i].v_comment+"</td>");
								}else{
									if(list[i].v_pointnm != undefined && list[i].v_pointnm != ""){
										arrr2.push("      	 	 <td>"+list[i].v_pointnm+"</td>");
									}else{
										arrr2.push("      	 	 <td></td>");
									}
								}
								
								arrr2.push("          	 <td>"+SetNumComma(parseInt(list[i].n_mpoint))+"p</td>");
								arrr2.push("       </tr>");
							}
							
							if(1 ==page.i_iNowPageNo){
								
								$(".blueList").html(arrr2.join(""));	
								
							} else{
								$(".blueList").append(arrr2.join(""));	
							}
							
							
						} else {
							var arrHtml = [];
							
							arrHtml.push("<tr>");
							arrHtml.push("<td colspan=\"3\">");
							arrHtml.push("<div class=\"nodata\">");
							arrHtml.push("	<p class=\"sp_bg s5\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
							arrHtml.push("</div>");
							arrHtml.push("</td>");
							arrHtml.push("</tr>");
							
							$(".blueList").html(arrHtml.join(""));
							
						}

						if(parseInt(page.i_iNowPageNo) >= parseInt(page.i_iTotalPageCnt)) {
							$(".btn_blue_more").hide();
						} else {
							$(".btn_blue_more").show();
						}
						
						MobileMyPointList.fn.addBtnEvent();
					} else if(data.status == "isNotLogin") {
						var obj = {
							type : "reload"	
						};
						
						MobileBodyStart.fnLoginCheck(obj);
					} else {
						showMessageBox({
							message : data.message
						});
					}
					
					
				}	
			
			});	
		},
		addChangeDtm : function(flag, tabFlag) {
			if(flag == "2week") {
				var today = new Date();
	  			var monthago=new Date(Date.parse(today)-14*1000*60*60*24);
	  			
	  			var myear = monthago.getFullYear();
	  			var mmonth = monthago.getMonth()+1;
	  			var mday   = monthago.getDate();
	  			var tyear = today.getFullYear();
	  			var tmonth = today.getMonth()+1;
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
	  			if(tabFlag == "blue") {
	  				$("input[name='i_sCmcStDt']").val(myear + "" + mmonth + "" + mday);
	  				$("input[name='i_sCmcEnDt']").val(tyear + "" + tmonth + "" + tday);
	  			} else {
	  				$("#i_sCmcStDt_beauty").val(myear + "" + mmonth + "" + mday);
	  				$("#i_sCmcEnDt_beauty").val(tyear + "" + tmonth + "" + tday);
	  			}
	  			
	  			$("input[name='i_sSortCol']").val("N_VOTE");
			} else if(flag == "1month") {
				var today = new Date();
				var monthago=new Date(Date.parse(today)-30*1000*60*60*24);
				
				var myear = monthago.getFullYear();
				var mmonth = monthago.getMonth()+1;
				var mday   = monthago.getDate();
				var tyear = today.getFullYear();
				var tmonth = today.getMonth()+1;
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
				
				if(tabFlag == "blue") {
	  				$("input[name='i_sCmcStDt']").val(myear + "" + mmonth + "" + mday);
	  				$("input[name='i_sCmcEnDt']").val(tyear + "" + tmonth + "" + tday);
	  			} else {
	  				$("#i_sCmcStDt_beauty").val(myear + "" + mmonth + "" + mday);
	  				$("#i_sCmcEnDt_beauty").val(tyear + "" + tmonth + "" + tday);
	  			}
				$("input[name='i_sSortCol']").val("N_VOTE");
			} else if(flag == "3month") {
				var today = new Date();
	 			var monthago=new Date(Date.parse(today)-90*1000*60*60*24);
	 			
	 			var myear = monthago.getFullYear();
	 			var mmonth = monthago.getMonth()+1;
	 			var mday   = monthago.getDate();
	 			var tyear = today.getFullYear();
	 			var tmonth = today.getMonth()+1;
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
	 			
	 			if(tabFlag == "blue") {
	  				$("input[name='i_sCmcStDt']").val(myear + "" + mmonth + "" + mday);
	  				$("input[name='i_sCmcEnDt']").val(tyear + "" + tmonth + "" + tday);
	  			} else {
	  				$("#i_sCmcStDt_beauty").val(myear + "" + mmonth + "" + mday);
	  				$("#i_sCmcEnDt_beauty").val(tyear + "" + tmonth + "" + tday);
	  			}
	 			
	 			$("input[name='i_sSortCol']").val("N_VOTE");
			} else if(flag == "6month") {
				var today = new Date();
	  			var monthago=new Date(Date.parse(today)-180*1000*60*60*24);
	  			
	  			var myear = monthago.getFullYear();
	  			var mmonth = monthago.getMonth()+1;
	  			var mday   = monthago.getDate();
	  			var tyear = today.getFullYear();
	  			var tmonth = today.getMonth()+1;
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
	  			
	  			if(tabFlag == "blue") {
	  				$("input[name='i_sCmcStDt']").val(myear + "" + mmonth + "" + mday);
	  				$("input[name='i_sCmcEnDt']").val(tyear + "" + tmonth + "" + tday);
	  			} else {
	  				$("#i_sCmcStDt_beauty").val(myear + "" + mmonth + "" + mday);
	  				$("#i_sCmcEnDt_beauty").val(tyear + "" + tmonth + "" + tday);
	  			}
	  			
	  			$("input[name='i_sSortCol']").val("N_VOTE");
			} else if(flag == "1year") {
				var today = new Date();
	  			var monthago=new Date(Date.parse(today)-365*1000*60*60*24);
	  			
	  			var myear = monthago.getFullYear();
	  			var mmonth = monthago.getMonth()+1;
	  			var mday   = monthago.getDate();
	  			var tyear = today.getFullYear();
	  			var tmonth = today.getMonth()+1;
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
	  			
	  			if(tabFlag == "blue") {
	  				$("input[name='i_sCmcStDt']").val(myear + "" + mmonth + "" + mday);
	  				$("input[name='i_sCmcEnDt']").val(tyear + "" + tmonth + "" + tday);
	  			} else {
	  				$("#i_sCmcStDt_beauty").val(myear + "" + mmonth + "" + mday);
	  				$("#i_sCmcEnDt_beauty").val(tyear + "" + tmonth + "" + tday);
	  			}
	  			
	  			$("input[name='i_sSortCol']").val("N_VOTE");
			}
		},
		checkLoseBluePoint : function(){
			cmAjax({
					url : GLOBAL_WEB_ROOT + "mobile/my/mobile_my_bluepoint_pop_ajax.do"
					, type : "POST"
					, dataType : "json"
					, data : {}
					, success : function(data, textStatus) {
						
						if(data.status == "succ") {
							var obj = data.object;
							var mpointInfo = obj.mpointInfo;
							
							var tempM1 = obj.month1;
							var tempM2 = obj.month2;
							var tempM3 = obj.month3;
							var month1 = tempM1.substring(0, 1) == "0" ? tempM1.substring(1, 2) : tempM1;
							var month2 = tempM2.substring(0, 1) == "0" ? tempM2.substring(1, 2) : tempM2;
							var month3 = tempM3.substring(0, 1) == "0" ? tempM3.substring(1, 2) : tempM3;
							
							$(".th_month1").text(month1 + "월");
							$(".th_month2").text(month2 + "월");
							$(".th_month3").text(month3 + "월");
							
							$(".next_month1").text(parseInt(month1 == "12" ? "0" : month1) + 1);
							$(".next_month2").text(parseInt(month2 == "12" ? "0" : month2) + 1);
							$(".next_month3").text(parseInt(month3 == "12" ? "0" : month3) + 1);
							
							var losePoint1 = $(".p_lose_point1");
							var losePoint2 = $(".p_lose_point2");
							var losePoint3 = $(".p_lose_point3");
							if(mpointInfo != undefined) {
								var point1 = parseInt(mpointInfo.n_loss_point1) < 0 ? 0 : parseInt(mpointInfo.n_loss_point1);
								var point2 = parseInt(mpointInfo.n_loss_point2) < 0 ? 0 : parseInt(mpointInfo.n_loss_point2);
								var point3 = parseInt(mpointInfo.n_loss_point3) < 0 ? 0 : parseInt(mpointInfo.n_loss_point3);
								
								losePoint1.text(SetNumComma(point1)+"P");
								losePoint2.text(SetNumComma(point2)+"P");
								losePoint3.text(SetNumComma(point3)+"P");
							} else {
								losePoint1.text("0P");
								losePoint2.text("0P");
								losePoint3.text("0P");
							}
							
							modalPopup("#blueRibbonPointLose");
							
						} else if(data.status == "isNotLogin") {
							var options = {
								type : "reload"	
							};
							MobileBodyStart.fnLoginCheck(options);
						} else {
							showMessageBox({
								message : data.message
							});
						}
					}
				});
			
		}
	}
};
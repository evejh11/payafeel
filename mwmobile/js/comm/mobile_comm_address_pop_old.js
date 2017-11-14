/**
 * 모바일 우편번호찾기 이벤트 처리를 위한 Javascript
 */
var	MobileZip = {
		name : "MobileZip",
		
		field : "",
		fieldType : "",
		orgZip1Name  : "",
		orgZip2Name  : "",
		orgAddr1Name : "",
		orgAddr2Name : "",
		SearchType : null,
		StadJiZip1 : null,
		StadJiZip2 : null,
		StadJiAddr1 : null,
		StadJiAddr2 : null,
		StadRdZip1 : null,
		StadRdZip2 : null,
		StadRdAddr1 : null,
		StadRdAddr2 : null,
		StadRdAddr3 : null,
		isLoad : false,

		init : function() {
			MobileZip.fn.addBtnEvent();
			MobileZip.fn.setZipCodeTab();

			$('#btnSearchPost').click(MobileZip.fn.getPostAddrList);
			$('#btnSearchBdNm').click(MobileZip.fn.getRoadAddrList);
			$('#btnSearchRdNm').click(MobileZip.fn.getRoadAddrList);
			$('#i_sZipCode11').val("");
			$('#i_sAddr111').val("");
			$('#i_sAddr211').val("");
		},

	fn : {
		addBtnEvent : function(){
			
			 $("input:radio[name='i_sFlagRoad']").click(function(){
               if ( $(this).val() == 'N' ){ // 건물명으로 찾기
                   $("#loadDetail01").show();
                   $("#loadDetail02").hide();
                   $("div.newAddress .resulttxt").html("").hide();
                   $("div.newAddress .resultList").html("").hide();
                   $("#i_sRoadnm1").val("");
                   $("#i_sBuildingno").val("");
                   $("#i_sBuildingsubno").val("");
                   $("#i_sBuildingnm2").val("");
               } else { // 도로명으로 찾기
                   $("#loadDetail02").show();
                   $("#loadDetail01").hide();
                   $("div.newAddress .resulttxt").html("").hide();
                   $("div.newAddress .resultList").html("").hide();
                 /*  $("#i_sRoadAddr1").val("");
           		   $("#i_sRoadAddr2").val("");*/
           		   $("#i_sBuildingnm1").val("");
               }
           });
			 
			 $(".btn_zipback").unbind("click").click(function(event){
				event.preventDefault();
				
				MobileZip.fn.zipComplete();
				
			 });
		},
		
		zipComplete : function(){
			
			if(MobileZip.fieldType != "delivery"){
				$(".page_info").eq(0).show();
			}
			
			$(".commzip").hide();
			MobileZip.field.show();
			
			if(MobileZip.fieldType == "order"){
				var offset = $('.userDeliveryInfo').offset();
				$("html, body").animate({scrollTop:offset.top},10);	
			}
			
			if(MobileZip.fieldType == "beautyTesterView"){
				var offset = $('.order-tb').offset();
				$("html, body").animate({scrollTop:offset.top},10);	
			}
			
			if(MobileZip.fieldType == "event"){
				var offset = $('.order-tb').offset();
				$("html, body").animate({scrollTop:offset.top},1000);
			}
			
		},
		
		zipProgress : function(addr){

			MobileZip.fieldType 	= addr.type;
			MobileZip.orgZip1Name   = addr.orgZip1Name ;
			MobileZip.orgZip2Name   = addr.orgZip2Name ;
			MobileZip.orgAddr1Name  = addr.orgAddr1Name;
			MobileZip.orgAddr2Name  = addr.orgAddr2Name;
			
			$(".page_info").eq(0).hide();
			MobileZip.field.hide();
			$(".commzip").show();
			
			if(MobileZip.fieldType != "event"){
				$('body, html').animate({
					scrollTop : 0
				}, 10);
			}
			
			$(".zipcode .tab_cate").eq(0).click();
			
		},
		
		setZipCodeTab : function() {
			var	$tabCate	= $(".zipcode .tab_cate"); 
			var	$tabCont	= $(".zipcode .tab_cont");

			$tabCate.click(function() {
				var	$idxTab	= $tabCate.index(this);
				if($idxTab == '0'){
					MobileZip.fn.setInitTab1(); // 구주소 검색내용 초기화
				} else{
					MobileZip.fn.setInitTab2();  // 새주소 검색내용 초기화
				}
				$tabCont.hide().eq($idxTab).show();
				$tabCate.removeClass("active").eq($idxTab).addClass("active");

				if ((1 == $idxTab) && !MobileZip.isLoad){
					MobileZip.fn.getSidoList();
					MobileZip.isLoad	= true;
				}

				return false;
			});
		},
		
		setInitTab1 : function(){
			$("#i_sAddr").val("");
			$(".oldAddress .resulttxt").html("");
			$(".oldAddress .resultList").html("");
			$("#inp_detailAddr_post").val("");
			$("#addr_text_post").text("");
			$("#label_p2").removeClass("disabled");
			$("#i_sFlagAddr_R_p").attr("disabled", false);
			$("#label_p3").removeClass("disabled");
			$("#i_sFlagAddr_P_p").attr("disabled", false);
			$("#addr_sel2_post").text("");
			$("#addr_sel3_post").text("");
			$("#addr_sel1_post").text("");
			$("#post_step2").hide();
			$("#post_step3").hide();
			$("#post_step1").show();
		},
		
		setInitTab2 : function(){
			$("#i_sRoadAddr1").val("");
			$("#i_sRoadAddr2").val("");
			$("#i_sRoadSearch3").val("");
			$("#i_sRoadSearch4").val("");
			$("#i_sRoadSearch5").val("");
			$(".newAddress .resulttxt").html("");
			$(".newAddress .resultList").html("");
			$("#inp_detailAddr_road").val("");
			$("#addr_text_road").text("");
			$("#label_r2").removeClass("disabled");
			$("#i_sFlagAddr_R_p").attr("disabled", false);
			$("#label_r3").removeClass("disabled");
			$("#i_sFlagAddr_P_p").attr("disabled", false);
			$("#addr_sel2_road").text("");
			$("#addr_sel3_road").text("");
			$("#addr_sel1_road").text("");
			$("#road_step2").hide();
			$("#road_step3").hide();
			$("#road_step1").show();
		},

		getSidoList : function() {
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_road_address1_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: {},
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						MobileZip.fn.setSidoList(data.object);
						MobileZip.fn.setSidoList2(data.object);
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},

		setSidoList : function(list) {
			$('#i_sRoadAddr1').html("<option value=\"\" selected=\"selected\">시/도 선택</option>");

			for (var i = 0; i < list.length; i++) {
				$('#i_sRoadAddr1').append("<option value=\"" + list[i].v_sido_nm + "\">" + list[i].v_sido_nm + "</option>");
			}

			$('#i_sRoadAddr2').html("<option value=\"\" selected=\"selected\">시/군/구 선택</option>");
			$('#i_sRoadAddr1').change(MobileZip.fn.getSigunguList);
		},
		setSidoList2 : function(list) {
			$('#i_sRoadAddr1_2').html("<option value=\"\" selected=\"selected\">시/도 선택</option>");

			for (var i = 0; i < list.length; i++) {
				$('#i_sRoadAddr1_2').append("<option value=\"" + list[i].v_sido_nm + "\">" + list[i].v_sido_nm + "</option>");
			}

			$('#i_sRoadAddr2_2').html("<option value=\"\" selected=\"selected\">시/군/구 선택</option>");
			$('#i_sRoadAddr1_2').change(MobileZip.fn.getSigunguList2);
		},

		getSigunguList : function() {
			var	i_sRoadAddr1	= $('#i_sRoadAddr1 option:selected').val();
			if(i_sRoadAddr1 == "세종"){
				$('#i_sRoadAddr2').html("<option value=\"\" selected=\"selected\">시/군/구 선택</option>");
			} else{
				$('#i_sRoadAddr2').html("<option value=\"\" selected=\"selected\">시/군/구 선택</option>");
				if ('' != i_sRoadAddr1) {
					MobileCommon.ajax({
						url			: GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_road_address2_ajax.do",
						type		: "POST",
						dataType	: "json",
						data		: {"i_sRoadAddr1":i_sRoadAddr1},
						animation	: false,
						success		: function (data, textStatus) {
							if ("succ" == data.status) {
								MobileZip.fn.setSigunguList(data.object);
							} else {
								showMessageBox({
									message : data.message
								});
							}
						}
					});
				}
			}
		},
		getSigunguList2 : function() {
			var	i_sRoadAddr1	= $('#i_sRoadAddr1_2 option:selected').val();
			if(i_sRoadAddr1 == "세종"){
				$('#i_sRoadAddr2_2').html("<option value=\"\" selected=\"selected\">시/군/구 선택</option>");
			} else{
				$('#i_sRoadAddr2_2').html("<option value=\"\" selected=\"selected\">시/군/구 선택</option>");
				if ('' != i_sRoadAddr1) {
					MobileCommon.ajax({
						url			: GLOBAL_WEB_ROOT + "mobile/comm/mobile_comm_road_address2_ajax.do",
						type		: "POST",
						dataType	: "json",
						data		: {"i_sRoadAddr1":i_sRoadAddr1},
						animation	: false,
						success		: function (data, textStatus) {
							if ("succ" == data.status) {
								MobileZip.fn.setSigunguList2(data.object);
							} else {
								showMessageBox({
									message : data.message
								});
							}
						}
					});
				}
			}
		},
		setSigunguList : function(list) {
			for (var i = 0; i < list.length; i++) {
				$('#i_sRoadAddr2').append("<option value=\"" + list[i].v_sigungu_nm + "\">" + list[i].v_sigungu_nm + "</option>");
			}
		},
		setSigunguList2 : function(list) {
			for (var i = 0; i < list.length; i++) {
				$('#i_sRoadAddr2_2').append("<option value=\"" + list[i].v_sigungu_nm + "\">" + list[i].v_sigungu_nm + "</option>");
			}
		},
		getPostAddrList : function() {
			if ('' == $('#i_sAddr').val()) {
				showMessageBox({
					message : '찾으시는 주소의 읍/면/동을 입력해 주세요.'
					, close : function(){
						$('#i_sAddr').focus();
					}
				});
				return;
			}
			
			var params = {};
			params.SearchMode	= "J";
			params.keyword1		= $('#i_sAddr').val();

			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT +"mobile/comm/mobile_comm_post_list_webservice_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: params,
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						MobileZip.fn.setAddress('post', data.object);
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},

		getRoadAddrList : function() {
			var params = {};
			var	i_sFlagRoad		= $(':radio[name="i_sFlagRoad"]:checked').val();
			
			if ('Y' == i_sFlagRoad) { // 도로명으로 찾기
				var roadnm			=  $('#i_sRoadnm1').val();
				var buildingno		=  $('#i_sBuildingno').val();
				var buildingsubno	=  $('#i_sBuildingsubno').val();
				var buildingnm		=  $('#i_sBuildingnm2').val();
				var num_pattern 	= /^[0-9]*$/;
				
				var	i_sRoadAddr1	= $('#i_sRoadAddr1_2 option:selected').val();
				var	i_sRoadAddr2	= $('#i_sRoadAddr2_2').val();
				var si = "";
				if(i_sRoadAddr2.indexOf("시")> -1 && i_sRoadAddr2.indexOf(" ")> -1 && i_sRoadAddr2.indexOf("구")> -1){ // xx시 xx구는 검색안됨 xx시로 검색해야 함
					si = i_sRoadAddr2.substr(0, i_sRoadAddr2.indexOf("시")+1);
				}
				
				if ('' == i_sRoadAddr1) {
					showMessageBox({
						message : '먼저 시/도를 선택해 주세요.'
						, close : function(){
							$('#i_sRoadAddr1').focus();
						}
					});
					return;
				}
	
				if ('' == i_sRoadAddr2 && i_sRoadAddr1 != "세종") {
					showMessageBox({
						message : '먼저 시/군/구를 선택해 주세요.'
						, close : function(){
							$('#i_sRoadAddr2').focus();
						}
					});
					return;
				}
				
				if ('' == roadnm) {
					showMessageBox({
						message : '찾으시는 주소의 도로명을 입력해 주세요.'
						, close : function(){
							$('#i_sRoadnm1').focus();
						}
					});
					return;
				}
				if('' == buildingno && '' == buildingsubno && '' ==buildingnm ){
					showMessageBox({
						message : '건물번호나 건물명 중 1개의 항목은 반드시 입력하셔야 되요.'
					});
					return;
				}
				
				if(!num_pattern.test(buildingno) || !num_pattern.test(buildingsubno)){
					showMessageBox({
						message : '건물번호는 숫자만 입력하실 수 있어요.'
					});
					return;
				}
				params.SearchMode = "R";
				params.keyword1	= i_sRoadAddr1;
	    		params.keyword2	= i_sRoadAddr2;
	    		params.keyword3	= roadnm;
	    		params.keyword4	= buildingno;
	    		params.keyword5	= buildingsubno;
	    		params.keyword6	= buildingnm;
				
			} else{
				var	i_sRoadAddr1	= $('#i_sRoadAddr1 option:selected').val();
				var	i_sRoadAddr2	= $('#i_sRoadAddr2').val();
				var si = "";
				if(i_sRoadAddr2.indexOf("시")> -1 && i_sRoadAddr2.indexOf(" ")> -1 && i_sRoadAddr2.indexOf("구")> -1){ // xx시 xx구는 검색안됨 xx시로 검색해야 함
					si = i_sRoadAddr2.substr(0, i_sRoadAddr2.indexOf("시")+1);
				}
				var buildingnm		=  $('#i_sBuildingnm1').val();
				
				if ('' == i_sRoadAddr1) {
					showMessageBox({
						message : '먼저 시/도를 선택해 주세요.'
						, close : function(){
							$('#i_sRoadAddr1').focus();
						}
					});
					return;
				}
	
				if ('' == i_sRoadAddr2 && i_sRoadAddr1 != "세종") {
					showMessageBox({
						message : '먼저 시/군/구를 선택해 주세요.'
						, close : function(){
							$('#i_sRoadAddr2').focus();
						}
					});
					return;
				}
				
				if ('' == buildingnm) {
					showMessageBox({
						message : '찾으시는 주소의 건물명을 입력해 주세요.'
						, close : function(){
							$('#i_sBuildingnm1').focus();
						}
					});
					return;
				}
				if(si != ""){
					i_sRoadAddr2 = si;
				}
				
				params.SearchMode = "R";
	    		params.keyword1	= i_sRoadAddr1;
	    		params.keyword2	= i_sRoadAddr2;
	    		params.keyword6	= buildingnm;
			}
			
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT +"mobile/comm/mobile_comm_post_list_webservice_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: params,
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						MobileZip.fn.setAddress('road', data.object);
					} else {
						showMessageBox({
							message : data.message
						});
					}
				}
			});
		},

		setAddress : function(type, list) {
			var	keyword		= "";
			var	html		= '';

			if ('post' == type) {
				keyword	= $('#i_sAddr').val();
				$("div.oldAddress>.resulttxt").show().html("<em>\"" + keyword + "\"</em> (으)로 검색한 <em>" + list.length + "</em>건의 결과가 있습니다.");
			} else {
				var	i_sFlagRoad		= $(':radio[name="i_sFlagRoad"]:checked').val();
				if ('Y' == i_sFlagRoad) { // 도로명으로 찾기
					keyword	= $('#i_sRoadAddr1_2 option:selected').val() + ", "+ $('#i_sRoadAddr2_2 option:selected').val() +", "+$("#i_sRoadnm1").val() + ", "+$("#i_sBuildingno").val()+", "+$("#i_sBuildingsubno").val()+", "+$("#i_sBuildingnm2").val();
				} else{ // 건물명으로 찾기
					keyword	= $('#i_sRoadAddr1 option:selected').val() + ", "+ $('#i_sRoadAddr2 option:selected').val() +", "+$("#i_sBuildingnm1").val();
				}
				$("div.newAddress .resulttxt").show().html("<em>\"" + keyword + "\"</em> (으)로 검색한 <em>" + list.length + "</em>건의 결과가 있습니다.");
			}

			if (0 < list.length) {
				for (var i = 0; i < list.length; i++) {
					if('post' == type){

						var addr1 	= list[i].sido + " " + list[i].gugun + " " + list[i].dong + " " + list[i].detaladdr + " " + list[i].bunji;
						var	addr2	= list[i].sido + " " + list[i].gugun + " " + list[i].dong + " " + list[i].detaladdr;
						html	+= "<li><a href=\"#none\" id=\""+i+"\" onclick=\"MobileZip.fn.getdetailAddress('"+type + "','" + list[i].zipcd + "', '', '" + addr1 + "', '" + addr2 + "')\">" + addr1 +"</a></li>";
						//html	+= "<li><a href=\"#none\" id=\""+i+"\" onclick=\"MobileZip.fn.getdetailAddress('"+type + "','" + list[i].zipcd + "', '', '" + addr1 + "', '" + addr2 + "')\">[" + list[i].zipcd + "] " + addr1 +"</a></li>";
					}
					else{
	        			
	        			var tempSubBldNo = list[i].bldsubno;
	        			if(tempSubBldNo != null && tempSubBldNo != "" && tempSubBldNo != undefined && tempSubBldNo != 0){
	        				tempSubBldNo = list[i].bldmainno+"-"+tempSubBldNo;
	        			}else{
	        				tempSubBldNo = list[i].bldmainno;
	        			}
	        			var addr     =  list[i].sidonm+" "+list[i].sigungunm+" "+list[i].umnm+" "+list[i].rdnm+" "+list[i].undergubun+" "+tempSubBldNo+", "+list[i].bldnm;
						var addr1 	= addr;
						var	addr2	= addr;

						html	+= "<li><a href=\"#none\" id=\""+i+"\" onclick=\"MobileZip.fn.getdetailAddress('"+type + "','" + list[i].zipcd + "', '', '" + addr1 + "', '" + addr2 + "')\">" + addr1 +"</a></li>";
						//html	+= "<li><a href=\"#none\" id=\""+i+"\" onclick=\"MobileZip.fn.getdetailAddress('"+type + "','" + list[i].zipcd + "', '', '" + addr1 + "', '" + addr2 + "')\">[" + list[i].zipcd + "] " + addr1 +"</a></li>";
					}
				}
			}

			if ('post' == type) {
				$("div.oldAddress .resultList").html(html).show();
			} else {
				$("div.newAddress .resultList").html(html).show();
			}
		},

		
		getdetailAddress : function(type, zip1, zip2, addr1, addr2) {
			
			if(MobileZip.fieldType != "event"){
				$('body, html').animate({
					scrollTop : 0
				}, 300);
			}
			var SearchMode = "";
			if(type =='post'){
				SearchMode = "J";
				$(".oldAddress").hide();
				$("#post_step2").show();
				$("#addr_text_post").text(addr2);
				//$("#addr_text_post").text('['+zip1+'] '+addr2);
				$("#inp_detailAddr_post").val("");
			} else{
				SearchMode = "R";
				$(".newAddress").hide();
				$("#road_step2").show();
				$("#addr_text_road").text(addr2);
				//$("#addr_text_road").text('['+zip1+'] '+addr2);
				$("#inp_detailAddr_road").val("");
			}
			
			// 다시 검색
			$(".btn_ReSearch").unbind("click").click(function(event){
				event.preventDefault();
				if(type =='post'){
					$("#inp_detailAddr_post").val("");
					$("#post_step2").hide();
					$("#post_step1").show();
				} else{
					$("#inp_detailAddr_road").val("");
					$("#road_step2").hide();
					$("#road_step1").show();
				}
			});
			
			// 입력주소, 변환주소 선택 div(step2->step3)
			$(".btn_goNext").unbind("click").click(function(event){
				event.preventDefault();
				
				var params = {};
				if($("#inp_detailAddr_"+type).val() == "" && type != "road"){
					showMessageBox({
						message : '상세주소를 입력해 주세요.'
					});
					return;
				}
				$('#i_sZipCode11').val(zip1);
				$('#i_sAddr111').val(addr2);
				$('#i_sAddr211').val($("#inp_detailAddr_" + type).val());
//				params.zipcode	= zip1;
//				params.addr1	= addr1;
				params.zipcode	= $('#i_sZipCode11').val();
				params.addr1	= $('#i_sAddr111').val();
				params.addr2	= $('#i_sAddr211').val();
				params.SearchMode	= SearchMode;	
				
				var addr = $("#addr_text_"+type).text();
				var inp_addr = $("#inp_detailAddr_"+type).val();
				$("#addr_sel2_"+type).text(addr+" "+inp_addr);
				
				MobileZip.fn.setDetailAddress(type, params);  // 웹서비스 호출
				
				if(MobileZip.fieldType != "event"){
					$('body, html').animate({
						scrollTop : 0
					}, 300);
				}
				
				if(type == 'post'){
					$("#post_step2").hide();
					$("#post_step3").show();
					$("#label_p2").removeClass("disabled");
					$("#i_sFlagAddr_R_p").attr("disabled", false);
					$("#label_p3").removeClass("disabled");
					$("#i_sFlagAddr_P_p").attr("disabled", false);
					$("input:radio[name='i_sFlagAddr_post']").attr("checked", false);
					$("#i_sFlagAddr_D_p").attr("checekd", false);
				} else{
					$("#road_step2").hide();
					$("#road_step3").show();
					$("#label_r2").removeClass("disabled");
					$("#i_sFlagAddr_R_r").attr("disabled", false);
					$("#label_r3").removeClass("disabled");
					$("#i_sFlagAddr_P_r").attr("disabled", false);
					$("input:radio[name='i_sFlagAddr_road']").attr("checked", false);
					$("#i_sFlagAddr_D_r").attr("checekd", false);
				}
				
			});
			
			//다시 입력(step3->step2)
			$(".btn_ReInp").unbind("click").click(function(){
				if(type=='post'){
					$("#post_step3").hide();
					$("#post_step2").show();
				} else{
					$("#road_step3").hide();
					$("#road_step2").show();
				}
			});
			
			$(".btn_finish").unbind("click").click(function(event){
				event.preventDefault();
				
				$(".hide_txt_zip1").text("");
				$(".hide_txt_zip2").text("");
				$(".hide_txt_addr1").text("");
				$(".hide_txt_addr2").text("");
				$(".hide_txt_addr3").text("");
				
				var i_sFlagAddr = $(" input:radio[name='i_sFlagAddr_"+type+"']:checked").val();
				var inp_addr = $("#inp_detailAddr_"+type).val();

				if($("input[name='i_sFlagAddr_"+type+"']:checked").length == 0){
					showMessageBox({
						message : "주소를 선택해주세요."
					});
					return;
				}
				if(i_sFlagAddr == "D"){
					
					$(".hide_txt_zip1").text(zip1.split("-")[0]);
					$(".hide_txt_zip2").text(zip1.split("-")[1]);
					$(".hide_txt_addr1").text(addr1);
					$(".hide_txt_addr2").text(inp_addr);
				} 
				else if(i_sFlagAddr == "R"){
					$(".hide_txt_zip1").text(MobileZip.StadRdZip1);
					$(".hide_txt_zip2").text(MobileZip.StadRdZip2);
					$(".hide_txt_addr1").text(MobileZip.StadRdAddr1);
					$(".hide_txt_addr2").text(MobileZip.StadRdAddr2);
					$(".hide_txt_addr3").text(MobileZip.StadRdAddr3);
				} 
				else if(i_sFlagAddr == "P"){
					$(".hide_txt_zip1").text(MobileZip.StadJiZip1);
					$(".hide_txt_zip2").text(MobileZip.StadJiZip2);
					$(".hide_txt_addr1").text(MobileZip.StadJiAddr1);
					$(".hide_txt_addr2").text(MobileZip.StadJiAddr2);
				}
				
				$("input[name='"+ MobileZip.orgZip1Name + "']"). val($(".hide_txt_zip1").text());
				$("input[name='"+ MobileZip.orgZip2Name + "']"). val($(".hide_txt_zip2").text());
				$("input[name='"+ MobileZip.orgAddr1Name +"']").val($(".hide_txt_addr1").text());
				$("input[name='"+ MobileZip.orgAddr2Name +"']").val($(".hide_txt_addr2").text()+" "+$(".hide_txt_addr3").text());
				
				MobileZip.fn.zipComplete();
				
			});
		},
		
		setDetailAddress : function(type, params){
			
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT +"mobile/comm/mobile_comm_road_zipit_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: params,
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						MobileZip.fn.setAddressType3(type, data.object);
					} else {
						showMessageBox({
							message : data.message
						});
						
						if(type == "post"){
		        			//매칭 실패
							
							$("#addr_sel1_post").text("표준화 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");// 도로명
							$("#addr_sel3_post").text("표준화 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");// 지번
							
							$("#label_p2").addClass("disabled");
							$("#i_sFlagAddr_R_p").attr("disabled", "disabled");
							$("#label_p3").parent().addClass("disabled");
							$("#i_sFlagAddr_P_p").attr("disabled", "disabled");
							
		    				$("#post_step2").hide();
							$("#post_step3").show();
		    			
		    			}else{
		    				//매칭 실패
							
							$("#addr_sel1_road").text("표준화 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");// 도로명
							$("#addr_sel3_road").text("표준화 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");// 지번
							
							$("#label_r2").addClass("disabled");
							$("#i_sFlagAddr_R_r").attr("disabled", "disabled");
							$("#label_r3").parent().parent().addClass("disabled");
							$("#i_sFlagAddr_P_r").attr("disabled", "disabled");
							
		    				$("#road_step2").hide();
							$("#road_step3").show();
		    			}
						
					}
				}
			});
		},
		
		/**
		 * 웹서비스 결과
		 */
		setAddressType3 : function(type, list) {
			var addrData;
			if(list[0].rcd3 == 'I' || list[0].rcd3 == 'H'){
    			//표준주소 정제 성공
    			for(var i=0; i< list[0].data_cnt; i++){
    				var node = list[i].node;        		
    				if(node == 'P'){
    					addrData = list[i];
    				}
    			}
    			//표준 지번 주소
    			var zipcd = addrData.zip1+"-"+addrData.zip2;   
    			var addr  = addrData.addr1h+" "+addrData.stdaddr;
    			
    			//표준 도로명 주소
    			var zipcdR = addrData.zipr1+"-"+addrData.zipr2;   
    			var addrR  = addrData.nadr1s+", "+ 
		        			 addrData.nadr3s+" "+
		        			 addrData.nadrehu;
    			
    			if(type == "post"){
    				//입력한 주소
    				var addr5 = $("#addr_text_post").text();
					var inp_addr = $("#inp_detailAddr_post").val();
					
					$("#addr_sel2_post").text(addr5+" "+inp_addr);//입력주소
					$("#addr_sel1_post").text("["+zipcd+"] "+ addrR);// 도로명
					$("#addr_sel3_post").text("["+zipcd+"] "+ addr);// 지번
					
    				$("#post_step2").hide();
					$("#post_step3").show();
					
    				
    			}else{
    				var addr5 = $("#addr_text_road").text();
					var inp_addr = $("#inp_detailAddr_road").val();
					
					$("#addr_sel2_road").text(addr5+" "+inp_addr);//입력주소
					$("#addr_sel1_road").text("["+zipcd+"] "+ addrR);// 도로명
					$("#addr_sel3_road").text("["+zipcd+"] "+ addr);// 지번
					
    				$("#road_step2").hide();
					$("#road_step3").show();
    			}
    			//표준 지번 주소
    			MobileZip.StadJiZip1 = addrData.zip1;
    			MobileZip.StadJiZip2 = addrData.zip2;
    			MobileZip.StadJiAddr1 = addrData.addr1h;
    			MobileZip.StadJiAddr2 = addrData.stdaddr;
    			//표준 도로명 주소
    			MobileZip.StadRdZip1 = addrData.zipr1;
    			MobileZip.StadRdZip2 = addrData.zipr2;
    			MobileZip.StadRdAddr1 = addrData.nadr1s;
    			MobileZip.StadRdAddr2 = addrData.nadr3s;
    			MobileZip.StadRdAddr3 = addrData.nadrehu;
    			
    		}else{
    			if(type == "post"){
        			//매칭 실패
    				var addr = $("#addr_text_post").text();
					var inp_addr = $("#inp_detailAddr_post").val();
					
					$("#addr_sel2_post").text(addr+" "+inp_addr);//입력주소
					$("#addr_sel1_post").text("표준화 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");// 도로명
					$("#addr_sel3_post").text("표준화 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");// 지번
					
					$("#label_p2").addClass("disabled");
					$("#i_sFlagAddr_R_p").attr("disabled", "disabled");
					$("#label_p3").parent().addClass("disabled");
					$("#i_sFlagAddr_P_p").attr("disabled", "disabled");
					
    				$("#post_step2").hide();
					$("#post_step3").show();
    			
    			}else{
    				//매칭 실패
    				var addr = $("#addr_text_road").text();
					var inp_addr = $("#inp_detailAddr_road").val();
					
					$("#addr_sel2_road").text(addr+" "+inp_addr);//입력주소
					$("#addr_sel1_road").text("표준화 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");// 도로명
					$("#addr_sel3_road").text("표준화 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");// 지번
					
					$("#label_r2").addClass("disabled");
					$("#i_sFlagAddr_R_r").attr("disabled", "disabled");
					$("#label_r3").parent().parent().addClass("disabled");
					$("#i_sFlagAddr_P_r").attr("disabled", "disabled");
					
    				$("#road_step2").hide();
					$("#road_step3").show();
    			}
    		}
		}
	}
};

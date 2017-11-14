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
			
			$('#btnSearchPost').click(MobileZip.fn.getPostAddrList);
			$('#btnSearchBdNm').click(MobileZip.fn.getRoadAddrList);
			$('#btnSearchRdNm').click(MobileZip.fn.getRoadAddrList);
			$('#i_sZipCode11').val("");
			$('#i_sAddr111').val("");
			$('#i_sAddr211').val("");
		},

	fn : {
		addBtnEvent : function(){
			
			$(".btn_zipback").unbind("click").click(function(event){
				event.preventDefault();
				
				MobileZip.fn.zipComplete();
			});
			
			$(".btn_zipsch").unbind("click").click(function(event){
				event.preventDefault();
				MobileZip.fn.getAddress();
			});
			
		},
		
		/**
		 * 주소 검색 API호출
		 */
		getAddress : function (page, count, type) {

			// 조회조건
			var keyword = $("#keyword").val();
			var currentPage = (page ? page : "1");
			var countPerPage = (count ? count : "30");
			var resultType = "json";
			
			// 주소검색
			MobileCommon.ajax({
				url: GLOBAL_WEB_ROOT +"mobile/comm/mobile_comm_address_renew_list_ajax.do",
				type : "post",
				dataType:"json",
				data:{"keyword":keyword, "currentPage":currentPage, "countPerPage":countPerPage, "resultType":resultType},
				animation : false,
				success:function(jsonStr) {
					$(".nR_adress_result").html("");
					
					if (jsonStr != null) {
						var errCode = jsonStr.object.results.common.errorCode;
						var errDesc = jsonStr.object.results.common.errorMessage;
						if(errCode != "0") {
							alert(errCode + ":" + errDesc);
						} else {
							MobileZip.fn.makeListJson(jsonStr.object);
						}
					}
				},
				error:function(xhr, status, error) {
					alert("정상적으로 조회되지 않았습니다.");
				}
			});
		},
		
		/**
		 * 검색어 엔터키 처리
		 */
		fn_enterSearch : function () {
			var evt_code = (window.netscape) ? ev.which : event.keyCode;
			if (evt_code == 13) {    
				event.keyCode = 0;  
				fn_getAddress();  
			} 
		},
		
		/** 
		 * 결과 처리
		 */
		makeListJson : function (jsonStr) {
			
			var htmlStr = "";

			if (jsonStr.results.common.totalCount == "0") {
				htmlStr += "<table><tr><td>검색 결과가 없습니다</td></tr></table>"
				$(".nR_adress_result").html(htmlStr);
				return;
			}
			
			htmlStr = "<ul>";
			$(jsonStr.results.juso).each(function(index) {
				htmlStr += "<li>";
				htmlStr += "<a href='javascript:;' onclick=\"MobileZip.fn.addJuso('"+ this.roadAddr +"','"+ this.zipNo +"')\">";
				htmlStr += this.roadAddr + "<br>";
				htmlStr += this.jibunAddr + " " + this.bdNm + "<br>";
				htmlStr += this.zipNo;
				htmlStr += "</a>";
				htmlStr += "</li>";
			});
			htmlStr += "</ul>";
			
			$(".nR_adress_result").html(htmlStr);
		},
		
		addJuso : function(roadAddr, zipNo) {
			$(".hide_txt_zip1").text(zipNo.substring(0,3));
			$(".hide_txt_zip2").text(zipNo.substring(3,5));
			$(".hide_txt_addr1").text(roadAddr)
			
			$("input[name='"+ MobileZip.orgZip1Name + "']"). val($(".hide_txt_zip1").text());
			$("input[name='"+ MobileZip.orgZip2Name + "']"). val($(".hide_txt_zip2").text());
			$("input[name='"+ MobileZip.orgAddr1Name +"']").val($(".hide_txt_addr1").text());
			$("input[name='"+ MobileZip.orgAddr2Name +"']").val($(".hide_txt_addr2").text()+" "+$(".hide_txt_addr3").text());
			
			$win.scrollTop(0);
			MobileZip.fn.zipComplete();
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
	}
};

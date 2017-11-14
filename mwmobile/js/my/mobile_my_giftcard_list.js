
var cnt = 0;
var	MobileMyGiftCard = {
		name : "MobileMyGiftCard",

		init : function() {
			$('.btn_back').attr('href', '/mobile/main.do');

			MobileMyGiftCard.fn.setSubMenuChange();
			MobileMyGiftCard.fn.MobileMyGiftCardList("","");
			MobileMyGiftCard.fn.addBtnEvent();
		},

		fn : {
			
			addBtnEvent : function(){
				$(".a_goApp_sns").unbind("click").click(function(event){
					event.preventDefault();
					var url = "http://www.amorepacificmall.com/mobile/my/mobile_my_giftcard_list.do";
					location.href = "http://www.amorepacificmall.com/mobile/goApp.do?target="+ url;
				});
			},
			setSubMenuChange : function() {
				var	select_input	= $('div.selectList>ul>li>input[type=radio]');

				select_input.click(function() {
					location.href	= "/mobile/my/" + $(this).val() + ".do";
				});
			},

			addEvent : function(){
				var $tabCate = $(".tab_wrap2.ty1 .tab_cate"); 

				$tabCate.unbind("click").click(function(event){
					event.preventDefault();
					var index = $tabCate.index(this);
					var id = $(this).attr("id");
					$("input[name='i_sFlagTab']").val(id);
					$tabCate.removeClass("active");
					$(this).addClass("active");

					var i_sFlagTab = $("input[name='i_sFlagTab']").val();
					var d1 = $("input[name='i_sData1']").val();
					var d2 = $("input[name='i_sData2']").val();
					var d3 = $("input[name='i_sData3']").val();

					if(i_sFlagTab=="entire"){
						$(".totalCard").hide();
						$(".available").show();
						$(".finished").show();
						$(".expiration").show();
						if(d1 =="N"){
							$(".available").hide();
						}else{
							$(".available").show();
						} 
						if(d2 =="N"){
							$(".finished").hide();
						}else{
							$(".finished").show();	
						} 
						if(d3 =="N"){
							$(".expiration").hide();	
						}else{
							$(".expiration").show();
						}

						if(d1 =="N" && d2 =="N" && d3 =="N"){
							$(".totalCard").show();
							var NodHtml = [];
							NodHtml.push("<div class=\"nodata\">");
							NodHtml.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
							NodHtml.push("</div>");
							$(".totalCard").html(NodHtml.join(""));
						}


					}else if(i_sFlagTab=="available"){
						$(".finished").hide();
						$(".expiration").hide();
						$(".available").show();
						$(".totalCard").hide();

					}else if(i_sFlagTab=="finished"){
						$(".available").hide();
						$(".expiration").hide();
						$(".finished").show();
						$(".totalCard").hide();

					}else if(i_sFlagTab=="expiration"){
						$(".available").hide();
						$(".finished").hide();
						$(".expiration").show();
						$(".totalCard").hide();

					}


					return false;
				});

				$(".btn_reg").unbind("click").click(function(event){
					event.preventDefault();
					//날짜 시간 체크 rnwoo
					var today = $("input[name='i_sToday']").val();
					
					if(today >= 201705190930 && today <= 201705191030){
						showMessageBox({
							message : "현재 기프트카드 서버 점검으로 사용이 불가능합니다.<br/>이용에 불편을 드려 죄송합니다.<br/>점검시간 : 5월 19일 09시 30분 ~ 5월 19일 10시 30분"
						});
						return;
					}else{
						MobileMyGiftCard.fn.giftCardReg();
					}
				});
				$(".sel_tab").unbind("click").click(function(event) {
					event.preventDefault();
					if($(this).attr("id") == "HAVE") {
						MobileMyGiftCard.fn.MobileMyGiftCardList();				
					} else {
						MobileMyGiftCard.fn.MobileMyGiveCardList();
					}
				});
				$("#i_sTerm").unbind("change").change(function(event) {
					event.preventDefault();
					var term=$(this).val();
					var sel = "1";
					MobileMyGiftCard.fn.fnChangeDateTerm(term,sel);
				});
				$("#i_sTerm2").unbind("change").change(function(event) {
					event.preventDefault();
					var term=$(this).val();
					var sel = "2";
					MobileMyGiftCard.fn.fnChangeDateTerm(term,sel);
				});

				$(".i_sRegCardno").unbind("keyup").keyup(function(event) {
					if(event.keyCode == 13) {
						var today = $("input[name='i_sToday']").val();
						if(today >= 201705190930 && today <= 201705191030){
							showMessageBox({
								message : "현재 기프트카드 서버 점검으로 사용이 불가능합니다.<br/>이용에 불편을 드려 죄송합니다.<br/>점검시간 : 5월 19일 09시 30분 ~ 5월 19일 10시 30분"
							});
							return;
						}else{
							MobileMyGiftCard.fn.giftCardReg();
						}
					}
				});
			},
			giftCardReg: function() {

				var cardNo = $("input[name='i_sRegCardno']").val();
				if (cardNo == "" || cardNo==undefined) {
					showMessageBox({
						message:"기프트카드의 일련번호를 입력해 주세요."

					});
					return;
				}
				else if (cardNo.length != "12") {
					showMessageBox({
						message:"기프트카드의 일련번호는 12자리에요.<br/>다시 한번 확인하시고 입력해주세요."

					});
					return;

				}

				MobileCommon.ajax({
					url			: GLOBAL_WEB_ROOT+"mobile/my/mobile_my_giftcard_save_ajax.do",
					type		: "POST",
					dataType 	: "json",
					data : {
						"i_sFlagMobileOpen":"Y",
						i_sFlagAction : "REG"
							, i_sGiftcardNo :  cardNo
					},
					animation : false,
					success : function(data, textStatus){
						if("succ" == data.status){
							var msg;
							if(data.object.leaflet_cnt > 0) {
								msg = "<p style='text-align:center;'>반가워요! <br/> APmall 회원이 되신걸 환영합니다! <br/><br/> 더 많은 혜택 누리면서 <br/>알뜰한 쇼핑하세요!  <br/><br/>쇼핑하러가실까요?<p>";
							} else {
								msg = "기프트카드가 등록되었어요.<br/>즐거운 쇼핑 되세요!"
							}
							showMessageBox({
								message : msg
									, close : function() {
										document.frm_reload.submit();
									}
							});
						}else if("isNotLogin" == data.status){

							showMessageBox({
								message : data.message
								, close : function() {
									var returnUrl = GLOBAL_SSL_URL+"mobile/my/mobile_my_giftcard_list.do";
									MobileBodyStart.goLogin(returnUrl);
								}
							});
						}else if("fail" == data.status){

							showMessageBox({
								message : data.message
								, close : function() {
									location.href =  GLOBAL_SSL_URL+"mobile/my/mobile_my_giftcard_list.do";
								}
							});
						}else{
							showMessageBox({
								message : data.message
							});
						}
					}
				});
			},
			fnChangeDateTerm : function(term,sel) {
				var i_sStDt = "";
				var i_sEnDt = "";
				var nowDate  = new Date();
				var nowYear  = nowDate.getFullYear();
				var nowMonth = nowDate.getMonth() + 1;
				var nowDay  = nowDate.getDate();

				if(nowMonth < 10 ) {
					nowMonth = "0" + nowMonth;
				}

				if(nowDay < 10) {
					nowDay = "0" + nowDay;
				}

				var thisDate = nowYear + "." + nowMonth + "." + nowDay;

				if(term == "all") {
					i_sStDt = "";
					i_sEnDt = "";
				}

				if(term == "week"){
					var weekDate = nowDate.getTime() - (7 * 24 * 60 * 60 * 1000);
					nowDate.setTime(weekDate);
					var weekYear  = nowDate.getFullYear();
					var weekMonth = nowDate.getMonth() + 1;
					var weekDay   = nowDate.getDate();  

					if(weekMonth < 10 ){
						weekMonth = "0" + weekMonth;
					}
					if(weekDay < 10 ){
						weekDay = "0" + weekDay;
					}

					var week = weekYear + "." + weekMonth + "." + weekDay;
					i_sStDt = week;
					i_sEnDt = thisDate;
				} else if(term == "1month") {
					var monthDate = nowDate.getTime() - (30 * 24 * 60 * 60 * 1000);
					nowDate.setTime(monthDate);
					var monthYear  = nowDate.getFullYear();
					var monthMonth = nowDate.getMonth() + 1;
					var monthDay   = nowDate.getDate();  

					if(monthMonth < 10 ) {
						monthMonth = "0" + monthMonth;
					}
					if(monthDay < 10 ) {
						monthDay = "0" + monthDay;
					}

					var month = monthYear + "." + monthMonth + "." + monthDay;
					i_sStDt = month;
					i_sEnDt = thisDate;

				}else if(term == "3month") {
					var monthDate = nowDate.getTime() - (3 * 30 * 24 * 60 * 60 * 1000);
					nowDate.setTime(monthDate);
					var monthYear  = nowDate.getFullYear();
					var monthMonth = nowDate.getMonth() + 1;
					var monthDay   = nowDate.getDate();  

					if(monthMonth < 10 ) {
						monthMonth = "0" + monthMonth;
					}
					if(monthDay < 10 ) {
						monthDay = "0" + monthDay;
					}

					var month_three = monthYear + "." + monthMonth + "." + monthDay;
					i_sStDt = month_three;
					i_sEnDt = thisDate;
				}else if (term == "6month") {
					var monthDate = nowDate.getTime() - (6 * 30 * 24 * 60 * 60 * 1000);
					var monthDay   = nowDay;  
					nowDate.setTime(monthDate);
					var monthYear  = nowDate.getFullYear();
					var monthMonth = nowDate.getMonth() + 1;

					if(monthMonth < 10 ) {
						monthMonth = "0" + monthMonth;}

					var month_six = monthYear + "." + monthMonth + "." + monthDay;
					i_sStDt = month_six;
					i_sEnDt = thisDate;
				} else if (term == "year") {
					var beforeYear  = nowDate.getFullYear() - 1;
					var beforeYearMonth = nowDate.getMonth() + 1;
					var beforeYearDay   = nowDay;  
					if(beforeYearMonth < 10 ) {
						beforeYearMonth = "0" + beforeYearMonth;
					}

					var year = beforeYear + "." + beforeYearMonth + "." + beforeYearDay;
					i_sStDt = year;
					i_sEnDt = thisDate;
				}


				if(sel =="1"){
					$(".totalCard").hide();

					$(".tab_cate").removeClass("active");
					$("#entire").addClass("active");
					MobileMyGiftCard.fn.MobileMyGiftCardList(i_sStDt,i_sEnDt);
				}else{
					MobileMyGiftCard.fn.MobileMyGiveCardList(i_sStDt,i_sEnDt);
				}


			},
			MobileMyGiftCardList : function (i_sStDt,i_sEnDt) {
				MobileCommon.ajax({
					url			: GLOBAL_WEB_ROOT+"mobile/my/mobile_my_giftcard_list_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: {
						"i_sFlagMobileOpen":"Y",
						"i_sStDt" : i_sStDt,
						"i_sEnDt" : i_sEnDt,
						"i_sFlagTab" : $("input[name='i_sFlagTab']").val()
					},
					animation	: false,
					success		: function (data, textStatus) {
						if("succ" == data.status){
							
						}else if("isNotLogin" == data.status){

							showMessageBox({
								message : data.message
								, close : function() {
									var returnUrl = GLOBAL_SSL_URL+"mobile/my/mobile_my_giftcard_list.do";
									MobileBodyStart.goLogin(returnUrl);
								}
							});
						}else {
							showMessageBox({
								message : data.message
							});
						}
						//유효기간이 얼마 남지않은 카드
						var obj= data.object.list;
						var length = obj.length;
						var arrLlimit = [];
						var short_cnt = data.object.use_cnt_all;
						
						if(short_cnt != undefined){
							arrLlimit.push("<p class='txt sp_bg s7'><em>"+short_cnt+"</em>장</p>");
						}else{
							arrLlimit.push("<p class='txt sp_bg s7'><em>0</em>장</p>");
						}
						$(".s7").html(arrLlimit.join(""));

						
						//총 사용 가능한 금액

						var arrLmoney = [];
						var sumMoney=0;
						for(var i=0; i<length;i++){
							var row = obj[i];
							if(row.status_cd == "ST001") {
								sumMoney= sumMoney+parseInt(row.balance);
							}
						}
						if(data.object.giftvo.total_price != undefined){
							arrLmoney.push("<p class='txt sp_bg s8'><em>"+SetNumComma(data.object.giftvo.total_price)+"</em>원</p>");
						}else{
							arrLmoney.push("<p class='txt sp_bg s8'><em>0</em>원</p>");
						}
						$(".s8").html(arrLmoney.join(""));

						
						var arrLCard = [];
						for(var i=0; i<length; i++){
							var row= obj[i];
							var Ctime= $("input[name='i_sTime']").val();
							var Rtime= row.expiry_dt;
							
							var date1 = new Date(Ctime.substring(0, 4), Ctime.substring(4, 6), Ctime.substring(6, 8));
							var date2 = new Date(Rtime.substring(0, 4), Rtime.substring(4, 6), Rtime.substring(6, 8));
							
							var interval = date2 - date1;
							var day = 1000 * 60 * 60 * 24;
							var time = interval / day;
							
							var num= row.card_no;
							var cardNum=num.substring(0,4) + "-" + num.substring(4,8) + "-" + num.substring(8,12);
							if(row.status_nm=="사용가능"){
								arrLCard.push("	<div class='head'>");
								arrLCard.push("     <h3>"+row.status_nm+"</h3>");
								arrLCard.push("      <p class='txt'>만료일:"+changeDatePatten(row.expiry_dt)+"("+time+"일 남았습니다.)</p>");
								arrLCard.push(" </div>");
								arrLCard.push("		<div class='cont'>");
								arrLCard.push("		<div class='s1'>");
								arrLCard.push("		<ul>");
								arrLCard.push("		<li>");
								arrLCard.push("            <span class='tit'>발행금액</span>");
								arrLCard.push("          <span class='txt'><em>"+SetNumComma(row.amount)+"</em>원</span>");
								arrLCard.push("      </li>");
								arrLCard.push("      <li>");
								arrLCard.push("        <span class='tit'>기사용금액</span>");
								arrLCard.push("         <span class='txt'><em>"+SetNumComma(row.use_amt)+"</em>원</span>");
								arrLCard.push("       </li>");
								arrLCard.push("    <li class='price'>");
								arrLCard.push("   <p>잔액 <span><em>"+SetNumComma(row.balance)+"</em>원</span></p>");
								arrLCard.push("    </li>");
								arrLCard.push(" </ul>");
								arrLCard.push(" </div>");
								arrLCard.push(" <div class='s2'>");
								arrLCard.push("  <ul>");
								arrLCard.push("      <li>");
								arrLCard.push("          <span class='tit'>발급일 : </span>");
								arrLCard.push("          <span class='txt'>"+row.reg_dt+"</span>");
								arrLCard.push("      </li>");
								arrLCard.push("                           <li>");
								arrLCard.push("<span class='tit'>From : </span>");
								arrLCard.push("<span class='txt'>"+row.buyer_nm+" 님</span>");
								arrLCard.push("</li>");
								arrLCard.push("    <li>");
								arrLCard.push("              <span class='cardNumber'>"+cardNum+"</span>");
								arrLCard.push("         </li>");
								arrLCard.push("      </ul>");
								arrLCard.push(" 	</div>");
								arrLCard.push(" </div>");
								cnt++;
							}
						}
						if(cnt > 0){
							$(".available").html(arrLCard.join(""));
							$("input[name='i_sData1']").val("Y");
							cnt = 0;
						}else{
							var NodHtml = [];
							NodHtml.push("<div class=\"nodata\">");
							NodHtml.push("	<p class=\"sp_bg s13\">사용가능한 카드가 없습니다.</p>");
							NodHtml.push("</div>");
							$(".available").html(NodHtml.join(""));
							$("input[name='i_sData1']").val("N");

						}
						var arrLCard2 = [];
						for(var i=0; i<length;i++){
							var row= obj[i];
							var Ctime= $("input[name='i_sTime']").val();
							var Rtime= row.expiry_dt;
							
							var date1 = new Date(Ctime.substring(0, 4), Ctime.substring(4, 6), Ctime.substring(6, 8));
							var date2 = new Date(Rtime.substring(0, 4), Rtime.substring(4, 6), Rtime.substring(6, 8));
							
							var interval = date2 - date1;
							var day = 1000 * 60 * 60 * 24;
							var time = interval / day;
							
							var num= row.card_no;
							var cardNum=num.substring(0,4) + "-" + num.substring(4,8) + "-" + num.substring(8,12);
							if(row.status_nm == "사용완료"){
								arrLCard2.push("	<div class='head'>");
								arrLCard2.push("     <h3>"+row.status_nm+"</h3>");
								arrLCard2.push("      <p class='txt'>만료일:"+changeDatePatten(row.expiry_dt)+"</p>");
								arrLCard2.push(" </div>");
								arrLCard2.push("		<div class='cont'>");
								arrLCard2.push("		<div class='s1'>");
								arrLCard2.push("		<ul>");
								arrLCard2.push("		<li>");
								arrLCard2.push("            <span class='tit'>발행금액</span>");
								arrLCard2.push("          <span class='txt'><em>"+SetNumComma(row.amount)+"</em>원</span>");
								arrLCard2.push("      </li>");
								arrLCard2.push("      <li>");
								arrLCard2.push("        <span class='tit'>기사용금액</span>");
								arrLCard2.push("         <span class='txt'><em>"+SetNumComma(row.use_amt)+"</em>원</span>");
								arrLCard2.push("       </li>");
								arrLCard2.push("    <li class='price'>");
								arrLCard2.push("   <p>잔액 <span><em>"+SetNumComma(row.balance)+"</em>원</span></p>");
								arrLCard2.push("    </li>");
								arrLCard2.push(" </ul>");
								arrLCard2.push(" </div>");
								arrLCard2.push(" <div class='s2'>");
								arrLCard2.push("  <ul>");
								arrLCard2.push("      <li>");
								arrLCard2.push("          <span class='tit'>발급일 : </span>");
								arrLCard2.push("          <span class='txt'>"+changeDatePatten(row.reg_dt)+"</span>");
								arrLCard2.push("      </li>");
								arrLCard2.push("                           <li>");
								arrLCard2.push("<span class='tit'>From : </span>");
								arrLCard2.push("<span class='txt'>"+row.buyer_nm+" 님</span>");
								arrLCard2.push("</li>");
								arrLCard2.push("    <li>");
								arrLCard2.push("              <span class='cardNumber'>"+cardNum+"</span>");
								arrLCard2.push("         </li>");
								arrLCard2.push("      </ul>");
								arrLCard2.push(" 	</div>");
								arrLCard2.push(" </div>");
								cnt ++;
							}
						}
						if(cnt > 0){
							$(".finished").html(arrLCard2.join(""));
							$("input[name='i_sData2']").val("Y");
							cnt = 0;
						}else{
							var NodHtml = [];
							NodHtml.push("<div class=\"nodata\">");
							NodHtml.push("	<p class=\"sp_bg s13\">사용완료한 카드가 없습니다.</p>");
							NodHtml.push("</div>");
							$(".finished").html(NodHtml.join(""));
							$("input[name='i_sData2']").val("N");

						}

						var arrLCard3 = [];
						for(var i=0; i<length; i++){
							var row= obj[i];
							var Ctime= $("input[name='i_sTime']").val();
							var Rtime= row.expiry_dt;
							
							var date1 = new Date(Ctime.substring(0, 4), Ctime.substring(4, 6), Ctime.substring(6, 8));
							var date2 = new Date(Rtime.substring(0, 4), Rtime.substring(4, 6), Rtime.substring(6, 8));
							
							var interval = date2 - date1;
							var day = 1000 * 60 * 60 * 24;
							var time = interval / day;
							
							var num= row.card_no;
							var cardNum=num.substring(0,4) + "-" + num.substring(4,8) + "-" + num.substring(8,12);
							if(row.status_nm == "기간만료"){
								arrLCard3.push("	<div class='head'>");
								arrLCard3.push("     <h3>"+row.status_nm+"</h3>");
								arrLCard3.push("      <p class='txt'>만료일:"+changeDatePatten(row.expiry_dt)+"</p>");
								arrLCard3.push(" </div>");
								arrLCard3.push("		<div class='cont'>");
								arrLCard3.push("		<div class='s1'>");
								arrLCard3.push("		<ul>");
								arrLCard3.push("		<li>");
								arrLCard3.push("            <span class='tit'>발행금액</span>");
								arrLCard3.push("          <span class='txt'><em>"+SetNumComma(row.amount)+"</em>원</span>");
								arrLCard3.push("      </li>");
								arrLCard3.push("      <li>");
								arrLCard3.push("        <span class='tit'>기사용금액</span>");
								arrLCard3.push("         <span class='txt'><em>"+SetNumComma(row.use_amt)+"</em>원</span>");
								arrLCard3.push("       </li>");
								arrLCard3.push("    <li class='price'>");
								arrLCard3.push("   <p>잔액 <span><em>"+SetNumComma(row.balance)+"</em>원</span></p>");
								arrLCard3.push("    </li>");
								arrLCard3.push(" </ul>");
								arrLCard3.push(" </div>");
								arrLCard3.push(" <div class='s2'>");
								arrLCard3.push("  <ul>");
								arrLCard3.push("      <li>");
								arrLCard3.push("          <span class='tit'>발급일 : </span>");
								arrLCard3.push("          <span class='txt'>"+changeDatePatten(row.reg_dt)+"</span>");
								arrLCard3.push("      </li>");
								arrLCard3.push("                           <li>");
								arrLCard3.push("<span class='tit'>From : </span>");
								arrLCard3.push("<span class='txt'>"+row.buyer_nm+" 님</span>");
								arrLCard3.push("</li>");
								arrLCard3.push("    <li>");
								arrLCard3.push("              <span class='cardNumber'>"+cardNum+"</span>");
								arrLCard3.push("         </li>");
								arrLCard3.push("      </ul>");
								arrLCard3.push(" 	</div>");
								arrLCard3.push(" </div>");
								cnt++;
							}
						}
						if(cnt > 0){
							$(".expiration").html(arrLCard3.join(""));
							$("input[name='i_sData3']").val("Y");
							cnt = 0;
						}else{
							var NodHtml = [];
							NodHtml.push("<div class=\"nodata\">");
							NodHtml.push("	<p class=\"sp_bg s13\">기간만료된 카드가 없습니다.</p>");
							NodHtml.push("</div>");
							$(".expiration").html(NodHtml.join(""));
							$("input[name='i_sData3']").val("N");
						}
						MobileMyGiftCard.fn.addEvent();
						
						var $tabCate = $(".tab_wrap2.ty1 .tab_cate"); 
 
						var d1 = $("input[name='i_sData1']").val();
						var d2 = $("input[name='i_sData2']").val();
						var d3 = $("input[name='i_sData3']").val();

						if(d1 =="N"){
							$(".available").hide();
						}else{
							$(".available").show();
						} 
						if(d2 =="N"){
							$(".finished").hide();
						}else{
							$(".finished").show();	
						} 
						if(d3 =="N"){
							$(".expiration").hide();	
						}else{
							$(".expiration").show();
						}

						if(d1 =="N" && d2 =="N" && d3 =="N"){
							$(".totalCard").show();
							$(".available").hide();
							$(".finished").hide();
							$(".expiration").hide();
							var NodHtml = [];
							NodHtml.push("<div class=\"nodata\">");
							NodHtml.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
							NodHtml.push("</div>");
							$(".totalCard").html(NodHtml.join(""));
						}
						
						$(".giftcard").show();
						$tabCate.eq(1).click();
					}//succ
				});
			},
			MobileMyGiveCardList : function(i_sStDt,i_sEnDt){
				MobileCommon.ajax({
					url			: GLOBAL_WEB_ROOT+"mobile/my/mobile_my_givecard_list_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: {
						"i_sFlagMobileOpen":"Y",
						"i_sStDt" : i_sStDt,
						"i_sEnDt" : i_sEnDt
					},
					animation	: false,
					success		: function (data, textStatus) {
						if("succ" == data.status){
							console.log(data);
						}else if("isNotLogin" == data.status){

							showMessageBox({
								message : data.message
								, close : function() {
									var returnUrl = GLOBAL_SSL_URL+"/mobile/my/mobile_my_giftcard_list.do";
										MobileBodyStart.goLogin(returnUrl);
								}
							});
						}else {
							showMessageBox({
								message : data.message
							});
						}
						var obj2= data.object.list;
						var length2 = obj2.length;
						var arrLCard2 = [];
						if(length2 > 0){

							for(var i=0; i<length2; i++){
								var row= obj2[i];
								var num= row.recipient_mobile;
								var pNum=num.substring(0,3) + "-" + num.substring(3,8) + "-" + num.substring(8,13);
								arrLCard2.push(" 	<li>");
								arrLCard2.push("    	<p class='name'><span>To.</span>"+row.recipient_nm+"</p>");
								arrLCard2.push("     	<p class='info'>("+pNum+", "+row.recipient_email+")</p>");
								arrLCard2.push(" 		<dl>");
								arrLCard2.push("			<dt>보낸날짜</dt>");
								arrLCard2.push("			<dd>"+changeDatePatten(row.send_dt)+"</dd>");
								arrLCard2.push("		 	<dt>만료일</dt>");
								arrLCard2.push("		  	<dd>"+changeDatePatten(row.expiry_dt)+"</dd>");
								arrLCard2.push("            <dt>발행금액</dt>");
								arrLCard2.push("            <dd><em>"+SetNumComma(row.amount)+"</em>원</dd>");
								arrLCard2.push("         </dl>");
								arrLCard2.push("     </li>");
							}
							$(".giftList>ul").html(arrLCard2.join(""));
						}else{
							var NodHtml = [];
							NodHtml.push("<div class=\"nodata\">");
							NodHtml.push("	<p class=\"sp_bg s13\">원하시는 내용을 찾을수가 없어요.<br/>다른 검색어로 검색해주시겠어요?</p>");
							NodHtml.push("</div>");
							$(".giftList>ul").html(NodHtml.join(""));
						}
						MobileMyGiftCard.fn.addEvent();

						$(".giftcard").show();

					}
				});
			}

		}//fn
};//MobileHotsaleClubAp



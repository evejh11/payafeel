var MobileCartHtml ={
		name : "MobileCartHtml"
		,isVipFlag   : true
		,isPointFlag : true
		,i_iNowPageNo : 1
		,i_iRecordCnt : 0
		,i_iPointMallCnt : 0
		,init : function(){
			
		}
		,MobileCartVipHtml : function(){
			
			if(MobileCartHtml.isVipFlag){
			
			   //YHCHOI : VIP/VVIP 스토어
			   MobileCommon.ajax({
					 url : GLOBAL_WEB_ROOT + "mobile/cart/mobile_cart_vipmall_list_ajax.do"
					, type : "post"
					, data : {i_sLevelcd : MobileCartUserInfo.levelcd}
					, dataType : "json"
					, animation : false
					, success : function(data, textStatus, jqXHR) {
							
							if(data.status == "succ"){
								
								MobileCartHtml.isVipFlag = false;
							
								var target = $(".contView").eq(1);
								
								var arrHtml = new Array();
								
								var vipCnt = MobileCartUserInfo.levelcd == 'LV13' || MobileCartUserInfo.levelcd == 'LV17' || MobileCartUserInfo.levelcd == 'LV20' ? 2 : MobileCartUserInfo.levelcd == 'LV12' || MobileCartUserInfo.levelcd == 'LV16' || MobileCartUserInfo.levelcd == 'LV19' ? 1 : MobileCartUserInfo.fstOrder == "Y" ? 1 : 0;

								arrHtml.push("<div class='vipChance'>");
								
								if(MobileCartUserInfo.isLogin && MobileCartUserInfo.fstOrder == "Y"){
									
									arrHtml.push("	<p class='ttl2'>첫구매 고객은 "+vipCnt+" 개의 블루리본상품을 무료로 추가 선택할 수 있습니다.</br>");
									
								}else if(MobileCartUserInfo.levelcd == 'LV12' || MobileCartUserInfo.levelcd == 'LV13' || MobileCartUserInfo.levelcd == 'LV16' || MobileCartUserInfo.levelcd == 'LV17' || MobileCartUserInfo.levelcd == 'LV19' || MobileCartUserInfo.levelcd == 'LV20'){
								
									var levelnm = MobileCartUserInfo.levelcd == 'LV13' || MobileCartUserInfo.levelcd == 'LV17' || MobileCartUserInfo.levelcd == 'LV20' ? 'VVIP' : MobileCartUserInfo.levelcd || MobileCartUserInfo.levelcd == 'LV16' || MobileCartUserInfo.levelcd == 'LV19' == 'LV12' ? 'VIP' : '일반';
									arrHtml.push("	<p class='ttl2'>"+levelnm+" 고객님은 아래 추가사은품 "+vipCnt+"개를 무료로 선택하실 수 있습니다.</br>");
									
								}else{
									
									arrHtml.push("	<p class='ttl2'>고객님은 현재 일반회원 이십니다.\n아래 사은품은 VIP/VVIP 고객님들에게만 추가적으로 무료 제공되는 상품들 입니다.<br/>");
									
								}
								
								arrHtml.push("		<span id='em_vip_select_list' style='display:block;margin-top:7px;'>");
								arrHtml.push("		</span>");
								arrHtml.push("	</p>");''
//								arrHtml.push("	<div class='resutlTxt'>");
//								arrHtml.push("		<ul id='li_vip_select_list'>");
//								arrHtml.push("		</ul>");
//								arrHtml.push("	</div>");
								
								//gypark : 새로운 UI 만들기 
								var clubgrp = "";
								
								if(MobileCartUserInfo.levelcd == 'LV13' || MobileCartUserInfo.levelcd == 'LV17'  || MobileCartUserInfo.levelcd == 'LV20'){
									clubgrp = data.object.clubAPVVIPGroup;
								}else{
									clubgrp = data.object.clubAPVIPGroup;
								}
								
								arrHtml.push("<div class='vipChanceSwipeStepArea'>");
								
								var flagHide = [];
								for(var k = 0; k < clubgrp.length; k++){
									arrHtml.push("<div class='vipChanceSwipeStep'>");
									arrHtml.push("<h4>"+clubgrp[k].v_categorynm+"</h4>");
									
									arrHtml.push("	<div id='vipChanceSwipe"+(k+1)+"' class='vipChanceSwipe' style='max-width:100%;'>");
									arrHtml.push("		<div class='vipChanceSwipe-wrap'>");
								
									var vo = data.object.list;
									var voSize = vo.length;
								
									if(voSize > 0){
	
										var parentSize = parseInt(voSize/2);
										
										var parentRemainder	= voSize%2;
										
										var childStCnt  = 0;
										var childEnCnt  = 2;
										var childFinishCnt = 1;
											
										if(parentSize == 0 || (voSize>2 && parentRemainder >0)){
											parentSize  = parentSize +1;
										}
										
										var cnt = 0;
										for(var i=0; i<parentSize; i++){
											
											for(var j=childStCnt; j<childEnCnt; j++){
												
												if(vo[j] != undefined){
													if(clubgrp[k].v_categorycd == vo[j].v_categorycd2){
														
													if (cnt % 2 == 0){
														arrHtml.push("		<div class='bskGiftbox cartGiftboxadd'>");
														arrHtml.push("			<ul>");
													}
													arrHtml.push("				<li class='li_vipchance_list'>");
														arrHtml.push("					<div class='prodImg'>");
														arrHtml.push("                        <span class='span_hide span_status'>"+vo[i].v_statuscd+"</span>");
														arrHtml.push("                        <span class='span_hide span_stockqty'>"+vo[i].n_stockqty+"</span>");
														arrHtml.push("						<span class='inputChk4'>");
														arrHtml.push("							<input type='checkbox' id='blus"+j+"' name='i_arrVipProductChk_temp' class='checkbox' value='"+vo[j].v_productcd+";"+vo[j].v_optioncd+"'/>");
														arrHtml.push("							<label for='blus"+j+"'>");
														
														/*if(vo[i].n_stockqty <= 0){
															
															arrHtml.push("					<span class='mt'>재고부족시<br/>대체품 발송</span>");							
															
														}*/
														
														arrHtml.push("								<img src='"+vo[j].v_img_web_path+"' alt='' onerror='fnNoImage(this);'/>");
														arrHtml.push("							</label>");
														arrHtml.push("						</span>");
														arrHtml.push("					</div>");
														arrHtml.push("					<div class='prodDetail'>");
														
														var brandnm = vo[j].v_brandnm == undefined ? '아모레퍼시픽몰' : vo[j].v_brandnm; 
														
														arrHtml.push("						<p class='brandNm ellipsis'>"+brandnm+"</p>");
														arrHtml.push("						<p class='prodNm'>"+vo[j].v_productnm+"</p>");
														
														if(vo[j].v_capacity !="" && vo[j].v_capacity != undefined){
															arrHtml.push("					<p class='ml'>"+vo[j].v_capacity+" * 1개</p>");												
														}
														
														arrHtml.push("					</div>");
														arrHtml.push("				</li>");
														
														if ((j !=(voSize-1) && vo[j].v_categorycd2 != vo[j+1].v_categorycd2) || cnt % 2 == 1){
															arrHtml.push("			</ul>");
															arrHtml.push("		</div>");
														}else if(j == (voSize-1)){
															arrHtml.push("			</ul>");
															arrHtml.push("		</div>");
														}
														
														cnt++;
													}
													
												}
												
											}
											childFinishCnt++;
											childStCnt = childEnCnt;
											childEnCnt = 2 * childFinishCnt;
			
										}
									}
									arrHtml.push("			</div>");	
									
									
									arrHtml.push("			<div class='vipChance-nav navi_"+(k+1)+"'>");
									
									var nlen = cnt / 2;
									for(var i=0; i< nlen; i++){
										
										arrHtml.push("				<span class=\""+(i == 0 ? 'active' : '')+"\"><span class='hide'>"+i+"</span></span>");
									}
									
									arrHtml.push("			</div>");
									
									arrHtml.push("		</div>");
									arrHtml.push("	</div>");
									
									if(cnt == 0){
										flagHide.push(k);
									}
									
								}
								//마치는 div 추가할 곳
								arrHtml.push("	<div>");
								arrHtml.push("</div>");
								
								target.html("");
								target.html($(arrHtml.join("")));
								
								window.vipChanceSwipe1 = new Swipe(document.getElementById('vipChanceSwipe1'), {
							         continuous: false,
							         stopPropagation: true,
							         callback: function(event, element) {
							        	 
							             $(".navi_1 > span").removeClass().eq(event).addClass("active");
							             
							         }
						         });    
						         
						         window.vipChanceSwipe2 = new Swipe(document.getElementById('vipChanceSwipe2'), {
						        	 continuous: false,
						        	 stopPropagation: true,
						        	 callback: function(event, element) {
						        		 
						        		 $(".navi_2 > span").removeClass().eq(event).addClass("active");
						        		 
						        	 }
						         });    
						         
						         window.vipChanceSwipe3 = new Swipe(document.getElementById('vipChanceSwipe3'), {
						        	 continuous: false,
						        	 stopPropagation: true,
						        	 callback: function(event, element) {
						        		 
						        		 $(".navi_3 > span").removeClass().eq(event).addClass("active");
						        		 
						        	 }
						         });    		
						         
						         var nonHtml = [];
						         nonHtml.push("<div class='nodataProd nodata_cart'>");
						         nonHtml.push("<p class='sp_bg s5'>현재 상품 준비중입니다.</p>");
						         nonHtml.push("</div>");
						         for(var i = 0; i < flagHide.length; i++){
						        	 $("#vipChanceSwipe" + (parseInt(flagHide[i]) + 1)).html(nonHtml.join(""));
						         }
						         
							target.show();
							
						}
					}
			   });
				
			}
		}
		,MobileCartPointHtml : function(){
			
			var today = $("#i_sTodayDt").val();
			if(MobileCartHtml.isPointFlag){
				
				//YHCHOI : 블루리본 스토어 
				MobileCommon.ajax({
					url : GLOBAL_WEB_ROOT+"mobile/cart/mobile_cart_pointmall_list_ajax.do"
					, type : "post"
					, data : {}
					, dataType : "json"
					, animation : false
					, success : function(data, textStatus, jqXHR) {
						
						if(data.status == "succ"){
							
							var target = $(".contView").eq(0);
							var arrHtml = new Array();
							
							var vo = data.object.list;
							var size = vo.length;
							
							arrHtml.push("<div class='blueRebonStore' style='padding:0;'>");
							arrHtml.push("<p  class='ttl2' style='color:#000000;background-color:#ffffff;text-align:center;border-bottom:1px solid #bdbdbd'>사은품 상세정보는 블루리본스토어에서<br/>확인 가능하세요!</p>");
							arrHtml.push("<p class='ttl2' id='em_blue_select_list' style='display:none;'>");
							arrHtml.push("</p>");
							
							//gypark : 블루리본 스토어 상품 UI 개선
							var blueGrp1 = data.object.blueGroup1;
							var blueGrp2 = data.object.blueGroup2;
							
							arrHtml.push("<div class='bskGiftbox cartGiftboxadd'>");
							arrHtml.push("	<div class='blueRebonStoreTab'>");
							arrHtml.push("		<ul class='blueRebonTitWrap'>");
							/*arrHtml.push("			<li class='blueRebonTit'><a href='none#'>It 아이템</a></li>");
							arrHtml.push("			<li class='blueRebonTit'><a href='none#'>뷰티 소품</a></li>");*/
							for(var h = 0; h < blueGrp1.length; h++){
								arrHtml.push("			<li class='blueRebonTit'>");
								arrHtml.push("				<a href='none#'>"+ blueGrp1[h].v_categorynm +"</a>");
								arrHtml.push("			</li>");
							}
							arrHtml.push("		</ul>");
							arrHtml.push("	</div>");
							arrHtml.push("</div>");
						
							var flagHide = [];
							for(var o = 0; o < blueGrp1.length; o++){
								arrHtml.push("<div class='blueRebonContView_wrap'>");
								arrHtml.push("	<div class='blueRebonContView'>");
								arrHtml.push("		<h4>"+ blueGrp1[o].v_categorynm+"</h4>");
								arrHtml.push("		<div id='blueRebonSwipe"+(o+1)+"' class='vipChanceSwipe blueRibonVisible'>");
								arrHtml.push("			<div class='vipChanceSwipe-wrap'>");
								MobileCartHtml.isPointFlag = false;
								var cnt = 0;
								if(size > 0){
									for(var j=0; j<size; j++){
										if(vo[j] != undefined){
											if(blueGrp1[o].v_categorycd == vo[j].v_categorycd2){
												
												if(cnt % 2 == 0){
													arrHtml.push("<div class='bskGiftbox cartGiftboxadd'>");
													arrHtml.push("<ul class='ul_pointmall_area'>");
												}
												
												MobileCartHtml.i_iPointMallCnt += 1;
												if(vo[j].n_seqno != undefined){
													arrHtml.push("	<li class='tr_cart_list li_pointmall_list li_"+vo[j].v_key+"'>");
													arrHtml.push("		<div class='prodImg'>");
													arrHtml.push("          <span class='span_hide span_rebon_productcd'>"+vo[j].v_productcd+"</span>");
													arrHtml.push("          <span class='span_hide span_rebon_optioncd'>"+vo[j].v_optioncd+"</span>");
													arrHtml.push("          <span class='span_hide span_rebon_point'>"+vo[j].n_point+"</span>");
													arrHtml.push("          <span class='span_hide span_rebon_typecd'>PROD_0001</span>");
													arrHtml.push("          <span class='span_hide span_rebon_seqno'>"+vo[j].n_seqno+"</span>");
													arrHtml.push("          <span class='span_hide span_rebon_cartcd'>"+vo[j].v_cartcd+"</span>");
													arrHtml.push("          <span class='span_hide span_stockqty'>"+vo[j].n_stockqty+"</span>");
													arrHtml.push("          <span class='span_hide span_status'>"+(vo[j].n_stockqty <= 0 ? '0002' : ''+vo[j].v_statuscd+'')+"</span>");
													arrHtml.push("          <span class='span_hide span_rebon_key'>"+vo[j].v_key+"</span>");
													arrHtml.push("			<span class='inputChk4'>");
													arrHtml.push("				<input type='checkbox' id='blu"+MobileCartHtml.i_iPointMallCnt+"' name='i_arrChkProd002' value='BASKET' class='checkbox' checked='checked'/>");
													arrHtml.push("				<label for='blu"+MobileCartHtml.i_iPointMallCnt+"'><img src='"+vo[j].v_img_web_path+"'  alt='' onerror='fnNoImage(this);'/></label>");
													arrHtml.push("			</span>");
													arrHtml.push("		</div>");
													arrHtml.push("		<div class='prodDetail'>");
													
													var brandnm = vo[j].v_brandnm == undefined ? '아모레퍼시픽몰' : vo[j].v_brandnm; 
													
													arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
													arrHtml.push("			<p class='prodNm'>"+vo[j].v_productnm+"</p>");
													
													if(vo[j].v_capacity !="" && vo[j].v_capacity != undefined){
														arrHtml.push("			<p class='ml'>"+vo[j].v_capacity+"</p>");						
													}
													
													arrHtml.push("		</div>");
													arrHtml.push("		<p class='blueArea' style='margin-top:0px;'><span class='sp_point blueRebontxt'>"+vo[j].n_point+"</span></p>");
													arrHtml.push("  			<input type='hidden' name='i_arrProductCnt' value='1'>");
													if(today < 20170401){
														arrHtml.push("		<div class='selectNum2' style='display:none;'>");
														arrHtml.push("  			<span class='span_productCnt'>1</span>");
														arrHtml.push("  			<button type='button' class='btn_minus' id='minus_"+vo[j].v_optioncd+"' onclick='return false;'><span class='hide'>감소</span></button>");
														arrHtml.push("  			<button type='button' class='btn_plus' id='plus_" +vo[j].v_optioncd+ "' onclick='return false;'><span class='hide'>증가</span></button>");
														arrHtml.push("		</div>");
													}
													arrHtml.push("	</li>");
													
												}else{
													
													arrHtml.push("	<li class='tr_cart_list li_pointmall_list'>");
													arrHtml.push("		<div class='prodImg'>");
													arrHtml.push("          <span class='span_hide span_rebon_productcd'>"+vo[j].v_productcd+"</span>");
													arrHtml.push("          <span class='span_hide span_rebon_optioncd'>"+vo[j].v_optioncd+"</span>");
													arrHtml.push("          <span class='span_hide span_rebon_point'>"+vo[j].n_point+"</span>");
													arrHtml.push("          <span class='span_hide span_rebon_typecd'>PROD_0001</span>");
													arrHtml.push("          <span class='span_hide span_rebon_seqno'></span>");
													arrHtml.push("          <span class='span_hide span_rebon_cartcd'></span>");
													arrHtml.push("          <span class='span_hide span_stockqty'>"+vo[j].n_stockqty+"</span>");
													arrHtml.push("          <span class='span_hide span_status'>"+(vo[j].n_stockqty <= 0 ? '0002' : ''+vo[j].v_statuscd+'')+"</span>");
													arrHtml.push("			<span class='inputChk4'>");
													arrHtml.push("				<input type='checkbox' id='blu"+MobileCartHtml.i_iPointMallCnt+"' name='i_arrChkProd002' value='ADMIN' class='checkbox'/>");
													arrHtml.push("				<label for='blu"+MobileCartHtml.i_iPointMallCnt+"'><img src='"+vo[j].v_img_web_path+"' alt='' onerror='fnNoImage(this);'/></label>");
													arrHtml.push("			</span>");
													arrHtml.push("		</div>");
													arrHtml.push("		<div class='prodDetail'>");
													
													var brandnm = vo[j].v_brandnm == undefined ? '아모레퍼시픽몰' : vo[j].v_brandnm; 
													
													arrHtml.push("			<p class='brandNm ellipsis'>"+brandnm+"</p>");
													arrHtml.push("			<p class='prodNm'>"+vo[j].v_productnm+"</p>");
													
													if(vo[j].v_capacity !="" && vo[j].v_capacity != undefined){
														arrHtml.push("			<p class='ml'>"+vo[j].v_capacity+"</p>");						
													}
													
													arrHtml.push("		</div>");
													arrHtml.push("		<p class='blueArea'><span class='sp_point blueRebontxt'>"+vo[j].n_point+"</span></p>");
													arrHtml.push("  			<input type='hidden' name='i_arrProductCnt' value='1'>");
													if(today < 20170401){
														arrHtml.push("		<div class='selectNum2' style='display:none;'>");
														arrHtml.push("  			<span class='span_productCnt'>1</span>");
														arrHtml.push("  			<button type='button' class='btn_minus' id='minus_"+vo[j].v_optioncd+"' onclick='return false;'><span class='hide'>감소</span></button>");
														arrHtml.push("  			<button type='button' class='btn_plus' id='plus_" +vo[j].v_optioncd+ "' onclick='return false;'><span class='hide'>증가</span></button>");
														arrHtml.push("		</div>");
													}
													arrHtml.push("	</li>");
													
												}
												
												if((j != (size-1) && vo[j].v_categorycd2 != vo[j+1].v_categorycd2) || cnt % 2 == 1){
													arrHtml.push("</ul>");
													arrHtml.push("</div>");	
												}else if(j == (size -1)){
													arrHtml.push("</ul>");
													arrHtml.push("</div>");
												}
												cnt++;
											}
											
										}
									}
									
								}
								arrHtml.push("		</div>");		//wrap 끝남
								
								//cnt 
								if(cnt == 0){
									flagHide.push(o);
								}
								
								//navi
								if(cnt > 0){
									arrHtml.push("		<div class='vipChance-nav blueNav_"+(o+1)+"'>");
									var nlen = 0;
									if(parseInt(cnt / 2) == 0){
										nlen = 1;
									}else{
										nlen = cnt / 2;
									}
									for(var i=0; i< nlen; i++){
										
										arrHtml.push("		<span class=\""+(i == 0 ? 'active' : '')+"\"><span class='hide'>"+i+"</span></span>");
									}
									arrHtml.push("		</div>");
								}
								
								arrHtml.push("	</div>");
								arrHtml.push("</div>");
								arrHtml.push("</div>");
							}
							arrHtml.push("</div>");
							
							if(MobileCartHtml.i_iNowPageNo == 1) {
								
								target.html($(arrHtml.join(""))).show();
								
							} else {
								
								$(arrHtml.join("\n")).appendTo(target).show();
								
							}
						
							//새로운 UI에 대한 script 삽입
							//blueRebonSwipe
                            window.blueRebonSwipe1 = new Swipe(document.getElementById('blueRebonSwipe1'), {
                             continuous: false,
                             stopPropagation: true,
                             callback: function(event, element) {
                               
                                 $(".blueNav_1 > span").removeClass().eq(event).addClass("active");
                                 
                             }
                           });
                          window.blueRebonSwipe2 = new Swipe(document.getElementById('blueRebonSwipe2'), {
                             continuous: false,
                             stopPropagation: true,
                             callback: function(event, element) {
                               
                                 $(".blueNav_2 > span").removeClass().eq(event).addClass("active");
                                 
                             }
                           }); 
                          window.blueRebonSwipe3 = new Swipe(document.getElementById('blueRebonSwipe3'), {
                             continuous: false,
                             stopPropagation: true,
                             callback: function(event, element) {
                               
                                 $(".blueNav_3 > span").removeClass().eq(event).addClass("active");
                                 
                             }
                           }); 
                          window.blueRebonSwipe4 = new Swipe(document.getElementById('blueRebonSwipe4'), {
                             continuous: false,
                             stopPropagation: true,
                             callback: function(event, element) {
                               
                                 $(".blueNav_4 > span").removeClass().eq(event).addClass("active");
                                 
                             }
                           }); 
                          window.blueRebonSwipe5 = new Swipe(document.getElementById('blueRebonSwipe5'), {
                             continuous: false,
                             stopPropagation: true,
                             callback: function(event, element) {
                               
                                 $(".blueNav_5 > span").removeClass().eq(event).addClass("active");
                                 
                             }
                           }); 
//                          window.blueRebonSwipe6 = new Swipe(document.getElementById('blueRebonSwipe6'), {
//                             continuous: false,
//                             stopPropagation: true,
//                             callback: function(event, element) {
//                               
//                                 $(".blueNav_6 > span").removeClass().eq(event).addClass("active");
//                                 
//                             }
//                           }); 
//                          window.blueRebonSwipe7 = new Swipe(document.getElementById('blueRebonSwipe7'), {
//                             continuous: false,
//                             stopPropagation: true,
//                             callback: function(event, element) {
//                               
//                                 $(".blueNav_7 > span").removeClass().eq(event).addClass("active");
//                                 
//                             }
//                           }); 
//                          window.blueRebonSwipe8 = new Swipe(document.getElementById('blueRebonSwipe8'), {
//                             continuous: false,
//                             stopPropagation: true,
//                             callback: function(event, element) {
//                               
//                                 $(".blueNav_8 > span").removeClass().eq(event).addClass("active");
//                                 
//                             }
//                           }); 
//                          window.blueRebonSwipe9 = new Swipe(document.getElementById('blueRebonSwipe9'), {
//                             continuous: false,
//                             stopPropagation: true,
//                             callback: function(event, element) {
//                               
//                                 $(".blueNav_9 > span").removeClass().eq(event).addClass("active");
//                                 
//                             }
//                           }); 
//                          window.blueRebonSwipe10 = new Swipe(document.getElementById('blueRebonSwipe10'), {
//                             continuous: false,
//                             stopPropagation: true,
//                             callback: function(event, element) {
//                               
//                                 $(".blueNav_10 > span").removeClass().eq(event).addClass("active");
//                                 
//                             }
//                           }); 

                          var nonHtml = [];
                          nonHtml.push("<div class='nodataProd nodata_cart'>");
                          nonHtml.push("<p class='sp_bg s5'>현재 상품 준비중입니다.</p>");
                          nonHtml.push("</div>");
                          for(var i = 0; i < flagHide.length; i++){
                        	  $("#blueRebonSwipe" + (parseInt(flagHide[i]) + 1)).html(nonHtml.join(""));
                          }
                          
                            var $tabCate = $(".blueRebonTit");
                            var $tabCont = $(".blueRebonContView_wrap");
                            var $tabView = $(".blueRibonVisible");
                            $tabCont.css("visibility", "hidden");
                            $tabCont.css("height", 0);
                            $tabCont.css("opacity", 0);
                            $tabCont.eq(0).css("visibility", "visible");
                            $tabCate.eq(0).addClass('active');
                            $tabCont.eq(0).css("height", "auto");
                            $tabCont.eq(0).css("opacity", "1");
                            
                            $tabView.css("visibility", "hidden");
                            $tabView.eq(0).css("visibility", "visible");
                            $tabView.eq(0).addClass('active');

                            $tabCate.click(function(){
                                var $idxTab = $tabCate.index(this);
                                $tabCont.css("visibility", "hidden");
                                $tabCont.css("height", 0);
                                $tabCont.css("opacity", 0);
                                $tabCont.eq($idxTab).css("visibility", "visible");
                                $tabCate.removeClass("active").eq($idxTab).addClass("active");
                                $tabCont.eq($idxTab).css("height", "auto");
                                $tabCont.eq($idxTab).css("opacity", "1");
                                
                                $tabView.css("visibility", "hidden");
                                $tabView.eq($idxTab).css("visibility", "visible");
                                $tabView.eq($idxTab).addClass('active');
                                
                                var nonHtml = [];
                                nonHtml.push("<div class='nodataProd nodata_cart'>");
                                nonHtml.push("<p class='sp_bg s5'>현재 상품 준비중입니다.</p>");
                                nonHtml.push("</div>");
                                for(var i = 0; i < flagHide.length; i++){
                              	  $("#blueRebonSwipe" + (parseInt(flagHide[i]) + 1)).html(nonHtml.join(""));
                                }
                                return false;
                            });
                           
                            $(".btn_plus").unbind("click").click(function(event){
                            	event.preventDefault();
                            	var idx = $(".btn_plus").index(this);
                            	var li = $(".li_pointmall_list").eq(idx);
                            	var cnt = parseInt($(".span_productCnt", li).text());
                            	var productcd = $(".span_rebon_productcd", li).text();
                            	if(productcd =="SPR20161123000025122"){
                            		showMessageBox({
                            			message: "이 사은품은 1개만 구매 가능하십니다."
                            			,close: function(){
                            				return ;
                            			}	
                            		});
                            	}else{
                            		if(cnt < 10){
                            			$(".span_productCnt", li).text((cnt + 1));
                            			$("input[name='i_arrProductCnt']", li).val((cnt + 1));
                            			MobileCartList.blueRebonSetPayment(li, true, "");
                            			MobileCartList.sum();
                            		}else if(cnt == 10){
                            			showMessageBox({
                            				message: "블루리본 사은품 최대 교환수량은 10개입니다."
                            					, close_func : function(){
                            						return ;
                            					}
                            			});
                            		}
                            	}
                            });
                            
                            $(".btn_minus").unbind("click").click(function(event){
                            	event.preventDefault();
                            	var idx = $(".btn_minus").index(this);
                            	var li = $(".li_pointmall_list").eq(idx);
                            	var cnt = parseInt($(".span_productCnt", li).text());
                            	
                        		if(cnt > 1){
                        			$(".span_productCnt", li).text((cnt - 1));
                        			$("input[name='i_arrProductCnt']", li).val((cnt - 1));
                        			MobileCartList.blueRebonSetPayment(li, true, "");
                        			MobileCartList.sum();
                        		}else if(cnt == 1){
                        			showMessageBox({
                        				message: "블루리본 사은품 최소 교환수량은 1개입니다."
                        					, close_func : function(){
                        						return ;
                        					}
                        			});
                        		}
                            });
                            
//							var lastpage = Math.ceil(MobileCartHtml.i_iRecordCnt == 0 ? 1 : MobileCartHtml.i_iRecordCnt/ 9);
//				
//							if(lastpage == MobileCartHtml.i_iNowPageNo) {
//								
//								$(".div_more_pointmall").hide();
//								
//							} else {
//								
//								$(".div_more_pointmall").show();
//								
//							}

//							$(".blueRebonPoint ").addClass("active");
				
							var arrChcked = $("input[name='i_arrChkProd002']").filter(":checked");
							
							var checkedSize = arrChcked.size();
							
							if(checkedSize > 0){
								
								for(var i=0; i<checkedSize; i++){
									
								    var parentObj = arrChcked.eq(i).parents("li");
								    MobileCartList.blueRebonSetPayment(parentObj, arrChcked.eq(i).prop("checked"));
								    MobileCartList.sum();
								}

							}
							
							target.show();

						}
					}
				});				
				
			}
		}
};
/**
 * 모바일 핫세일 투데이찬스 화면의 이벤트 처리를
 *  위한 Javascript
 */
var MobileEventdailygift = {
	
		name : "MobileEventdailygift",

	init : function() {
		$('.btn_back').attr('href', '/mobile/main.do');
		MobileEventdailygift.fn.setSubMenuChange();
		MobileEventdailygift.fn.getPageInit();
	},

	fn : {
	
		/**
		 * 핫세일 서브 메뉴 처리
		 */
		setSubMenuChange : function() {
			var select_input = $('div.selectList>ul>li>input[type=radio]');

			select_input.click(function() {
				var todayMonth = $("#todayMonth").val();
				if($(this).val() == "mobile_event_price_gift"){
					location.href  = GLOBAL_WEB_URL + "mobile/event/mobile_event_view.do?i_sEventcd=EVT" + todayMonth + "gifts"
				}else{
					location.href	= GLOBAL_WEB_URL+"mobile/event/" + $(this).val() + ".do";
				}
			});

		},

		/**
		 * 버튼이벤트
		 * */
		addBtnEvent : function() {
		
             
			  window.dailygiftSwipe = new Swipe(document.getElementById('dailygiftSwipe'), {
                  continuous: false,
                  callback: function(index, element) {
                      var currentSlides = dailygiftSwipe.getPos() + 1; // because slide count starts at 0
                      var totalSlides = dailygiftSwipe.getNumSlides();
                      document.getElementById('current').innerHTML = currentSlides ;
                      if ( currentSlides == 1 ){
                    	  $(".btnNext").removeClass("off");
                    	  $(".btnNext").addClass("on");
                    	  $(".btnPrev").addClass("off");
                      } else if ( currentSlides == totalSlides ) {
                    	  $(".btnPrev").removeClass("off");	
                    	  $(".btnPrev").addClass("on");	
                    	  $(".btnNext").addClass("off");
                      } else {
                    	  $(".btnNext").removeClass("off");
                    	  $(".btnPrev").removeClass("off");
                          $(".btnPrev").addClass("on");
                          $(".btnNext").addClass("on");
                      }
                      

                      $('.dailygiftSwipe_wrap').find('section').css('z-index', '1');
                      $('.dailygiftSwipe_wrap').find('section').eq(index).css('z-index', '2');
                      $('.dailygiftSwipe_wrap').find('section').eq(index + 1).css('z-index', '3');

                      $('.dailygiftSwipe_wrap').find('section > div').removeClass("shadow");
                      $('.dailygiftSwipe_wrap').find('section > div').eq(index).addClass("shadow");
                      $('.dailygiftSwipe_wrap').find('section.first').removeClass("first");
                      
                      var giftcd = $(".i_sGiftcd").eq(index).val();
                      $("input[name='i_sGiftcd']").val(giftcd);
                      MobileEventdailygift.fn.getdailygift();
                  },
                  
              });
   
        
                var total = $(".dailygiftSwipe_wrap section").length;
                $("#total").text(total);
                
                $(".btnPrev").click(function(){
                	
                	if($(this).hasClass("off")){
                    	return false;
                    }
                	
                	dailygiftSwipe.prev();
                    
                    MobileEventdailygift.fn.getdailygift();     
                    return false;
                });
                
                $(".btnNext").click(function(){

                	if($(this).hasClass("off")){
                    	return false;
                    }
                	dailygiftSwipe.next();
                    
                    MobileEventdailygift.fn.getdailygift();
                    return false;
                });
                
			},
			
	
		addGiftSwipeEvent : function() {

			window.latelyProdSwipe = new Swipe(document.getElementById('latelyProdSwipe'), {
	            continuous: true,
	            stopPropagation: true,
	            callback: function(event, element) {
	           	 var idx = setNaviIndex($("#latelyProd-nav > span"), event);
	           	 
	                $("#latelyProd-nav > span").removeClass().eq(idx).addClass("active");
	            }
	        });
		},
		
				
		getPageInit : function () {
				MobileCommon.ajax({	
					url			: "/mobile/event/mobile_event_daily_gift_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: { 
						i_sGiftcd : $("input[name='i_sGiftcd']").val()
					},
					animation	: false,
					success		: function (data, textStatus) {
					
						if("succ"== data.status){
							var obj = data.object.getdailyList;
							var length = obj.length;		//data.데일리 기프트 
							
							if(obj != undefined && obj.length > 0) {
								if(obj.length ==1){
									$(".btnNext").removeClass("on").addClass("off");
								}
								var pro = data.object.getdailygiftList.list; //데일리 기프트 제품 리스트
								var arrr=[];
								
								for(var i=0; i<length; i++){
									if(i==0){
										arrr.push("		<section class='first'>");
									}else{
										arrr.push("		<section>");
									}
									
									var month = obj[i].v_today_dtm.substring(4, 6);
									var day   = obj[i].v_today_dtm.substring(6, 8);
									
									arrr.push(" 			<div>");
									arrr.push(" 				<div class='date sp_bg s10'>");
									arrr.push("						<input type='hidden' class='i_sGiftcd' value='"+obj[i].v_giftcd+"'/>");
									arrr.push("  					<span class='month'>"+month+"</span>");
									arrr.push("  					<span class='day'>"+day+"</span>");
									arrr.push(" 				</div>");
									arrr.push("  				<div><img src='"+obj[i].daily_img_path+"' alt='' onerror='fnNoImage(this);'/></div>");
									arrr.push("				</div>");						
									arrr.push("		</section>");
								}
								$(".div_dailygiftarea").html(arrr.join(""));  
								MobileEventdailygift.fn.setEventView(pro,obj);
								MobileEventdailygift.fn.addBtnEvent();
							}
						} else {
							showMessageBox({
								message : data.message
							});
						}
					}
			});
		},

		//처음 데일리 기프트 전체뿌려주기 
		setEventView : function(pro,obj) {
			var len = 0;
			if(pro != undefined){
				len = pro.length;
			}
			var arrhtml = [];
			if(pro != undefined && len > 0){
				$(".giftproduct>.infoArea>.title").text(pro[0].n_mon+"월 "+pro[0].n_dat+"일 "+"'"+pro[0].v_title+"'");
				$(".giftproduct>.infoArea>.desc").text(pro[0].v_groupnm);
				$(".giftproduct>.infoArea>.detail").html(pro[0].v_gift_msg);
			}else{
				$(".giftproduct>.infoArea>.title").text(obj[0].n_mon+"월 "+obj[0].n_dat+"일 "+"'"+obj[0].v_title+"'");
				$(".giftproduct>.infoArea>.desc").text(obj[0].v_groupnm);
				$(".giftproduct>.infoArea>.detail").html(obj[0].v_gift_msg);
			}
					
					
			if(pro != undefined && len > 0 && pro[0].v_productcd != undefined) {	
					for(var i =0; i<len; i++)
					{		
							if(i % 3 == 0)
							{
								arrhtml.push("<div class='prodAlbumType v2'>");
								arrhtml.push(" 		<ul>");
							}
								arrhtml.push("    						<li>");
								arrhtml.push("   							<div class='thumbImg'><img src='"+pro[i].v_img_path+"' alt='' onerror='fnNoImage(this);' /></div>");
								arrhtml.push("									<div class='prodDeatil'>");
								if(pro[i].v_brandnm != undefined && pro[i].v_brandnm != ""){
									arrhtml.push(" 									<p class='brandNm'>"+pro[i].v_brandnm+"</p>");
								}else{
									arrhtml.push(" 									<p class='brandNm'></p>");
								}
								
								arrhtml.push("    								<p class='prodNm'>"+pro[i].v_productnm+"</p>");
								arrhtml.push("									</div>");
								arrhtml.push("  					 	</li>");
							if(i % 3 == 2 || i == len-1)
							{
								arrhtml.push("  	</ul>");
								arrhtml.push("</div>");
							}
					  }
					
					var freegoodNav = [];
					var navi_no=0;
					
					for(var i = 0;i<len; i++)
					{
						var active ="";
							if(i % 3 == 0)
						{	
							navi_no++;
								if(navi_no==1){
									active = "class=\"active\"";
									}else{
									active="";
									}
						freegoodNav.push("<span "+active+" style=\"margin:1px;\"><span class=\"hide\">"+navi_no+"</span></span>");
						}
				     }
					$(".div_product").html(arrhtml.join(""));
					$(".recommendProd-nav").html(freegoodNav.join(""));
					
					MobileEventdailygift.fn.addGiftSwipeEvent();
			}else{
				$(".div_product").html("");
				$(".recommendProd-nav").hide();
			}
			  ///////////////////////
				//MobileEventdailygift.fn.addGiftSwipeEvent();
			},	

			//데일리 기프트  상품 페이지 이동 클릭시 두번째부터
			getdailygift : function () {
				MobileCommon.ajax({	
					url			: "/mobile/event/mobile_event_daily_gift_List_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: { 
						i_sGiftcd : $("input[name='i_sGiftcd']").val()
					},
					animation	: false,
					success		: function (data, textStatus) {
				
						if("succ"== data.status){
								
							var pro = data.object.getdailygiftList.list; //데일리 기프트 제품 리스트
						
							MobileEventdailygift.fn.setEventView(pro);
							MobileEventdailygift.fn.addGiftSwipeEvent();
					}
				}
			});
		},
	}
};

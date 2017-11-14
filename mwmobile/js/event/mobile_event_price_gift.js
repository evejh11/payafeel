/**
 * 모바일 출석체크 화면의 이벤트 처리를 위한 Javascript
 */
var	Mobilepricegift = {
		name : "Mobilepricegift",

		init : function() {
			Mobilepricegift.fn.setSubMenuChange();
			Mobilepricegift.fn.getPageInit();
		},

		fn : {
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

			getPageInit : function () {
				MobileCommon.ajax({	
					url			: "/mobile/event/mobile_event_price_gift_ajax.do",
					type		: "POST",
					dataType	: "json",
					data		: { 
						i_sGiftcd : $("input[name='i_sGiftcd']").val()
					},
					animation	: false,
					success		: function (data, textStatus) {
						
						if("succ"== data.status){
							
							var obj = data.object.getGroupInfo.list;
							var obj1 = data.object.GroupCount;
							//var obj2 = data.object.getGroupList;
							
							var length = obj.length;
							var length2 = obj1.length;
							
							var arrr=[];
								for(var i=0; i<length2; i++){
									if(i==0){
									arrr.push("   <div class='ttlbox'>");
									arrr.push("   	 <h1 class='title'>"+obj1[i].v_groupnm+"</h1>");
										if(obj1[i].n_cnt>0){
											
											arrr.push("   	 <p class='ttl'>"+obj1[i].n_cnt+"가지 중 <em>"+obj1[i].n_max_choice+"개를 선택</em>하실 수 있습니다.</p>");
										}
									arrr.push("   </div>");
									}else{
									arrr.push(" <div class='ttlbox s2'>");
									arrr.push("  	 <h1 class='title'>"+obj1[i].v_groupnm+"</h1>");
										if(obj1[i].n_cnt>0){
											arrr.push("   	 <p class='ttl'>"+obj1[i].n_cnt+"가지 중 <em>"+obj1[i].n_max_choice+"개를 선택</em>하실 수 있습니다.</p>");
										}
									arrr.push("  </div>");
									}
									arrr.push("         <div class='sec'>");
									
										for(var j=0; j<length; j++){
											
											if(obj[j].v_groupcd==obj1[i].v_groupcd){
												
															arrr.push("         <div class='prodArea'>");
															arrr.push("     			 <div class='thumbImg'><img src='"+obj[j].v_img_path+"' alt='' onerror='fnNoImage(this);'/></div>");
															arrr.push("    				 	<div class='prodDetail'>");
															if(obj[j].v_brandnm !== undefined){
																arrr.push("      			  		<p class='brandNm'>"+obj[j].v_brandnm+"</p>");
															}															
															arrr.push("        			    	<p class='prodNm'>"+obj[j].v_productnm+"</p>");
															if(obj[j].v_comment !== undefined){
																arrr.push("      		  			<div class='txtBox'>"+obj[j].v_comment+"</div>");
															}
															arrr.push("      	   			</div>");
															arrr.push("         </div>");
															
															}
													}
									
									arrr.push("          </div>");
									}
								$(".div_group").html(arrr.join("")); 
							}else{
				    	alert(data.message);
					}
				}
			});
		},	
	} 
};



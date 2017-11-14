/**
 * New node file
 */
var MobileShopProductRanking = {
	name : "MobileShopProductRanking",
	isRankingShow	: false,
	init : function() {
		MobileShopProductRanking.fn.getPageInit();
	},
	fn : {
		setRanking : function(obj_list,$html){
			var rt_cnt = obj_list.length;
			
//			$("li",$html).each(function(index){
//				if(index != 0){
//					$("li",$html).eq(1).remove();
//				}
//			});
			if(rt_cnt>10){
				rt_cnt = 10;
			}
			for(var i=0;i<rt_cnt; i++){
				var $li = $("li",$html).eq(0).clone(true);
				var i_nRanking = obj_list[i].n_ranking;
				var rank_label_class = "";
				
				var num_end = "";
				if(i_nRanking == 1) {
					num_end = "st";
				} else if(i_nRanking == 2 ) {
					num_end = "nd";
				} else if(i_nRanking == 3) {
					num_end = "rd";
				} else {
					num_end ="th";
				}
				
				$(".ico_ranking",$li).html("<em>"+i_nRanking+"</em>"+num_end);
				
				if(i_nRanking < 6){
					$li.attr("style","display:;");		//처음에는 처음것만 보여짐
					if(i_nRanking == 2 || i_nRanking == 3){
						rank_label_class = "rank"+i_nRanking+" rankfl";
					}else{
						rank_label_class = "rank"+i_nRanking;
					}
					
					if(i_nRanking < 4){
						$(".ico_ranking",$li).attr("id","counter"+i_nRanking);
					}else{
						$(".thumbImg",$li).insertAfter($(".prodDetail",$li));
						$(".ico_ranking",$li).addClass("v2");
					}
					$(".brandNm",$li).html(obj_list[i].v_brandnm);
					$(".prodNm",$li).html(obj_list[i].v_productnm);
					
					var img_path = obj_list[i].v_img_path || "";
					
					if (img_path.indexOf("_155") > -1) {
						img_path = img_path.replace("_155", "_356");
					}
					$(".thumbImg>img",$li).attr("src",img_path);
				}else{
					rank_label_class = "ranki";
					$(".prodEvalu",$li).remove();		//평점
					$(".thumbImg",$li).remove();
					
					$(".prodDetail>.brandNm",$li).remove();
					var html = "<span class=\"brandNm\">"+obj_list[i].v_brandnm+"</span> ";
					html += obj_list[i].v_productnm;
					$(".prodNm",$li).html(html);
					
				}
				
				$li.addClass(rank_label_class);
				
				$("a",$li).attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+obj_list[i].v_productcd);
				$("a",$li).attr("onclick", "productClickTagEvent('reco-dp-17','"+obj_list[i].v_productcd+"','MOBILE')");
				
				if(i_nRanking == 1){		//1등일때
					var nRank = obj_list[i].n_ranking;
					var pRank = obj_list[i].n_pre_ranking;
					if(pRank == 0){				//이전 랭크가 0일때
						$(".rank_num>.ico",$li).addClass("ico_new2");
						$(".rank_num>.ico_new2",$li).removeClass("ico");
						$(".rank_num>.ico_new2",$li).html("<img src=\"/images/common/ico_new2.png\" alt=\"new\">");
					}else if(nRank > pRank){		//현재 랭크가 더 낮을떼
						$(".rank_num>.ico",$li).addClass("up");
						$(".rank_num>.ico",$li).html("하강");
						$(".rank_num>.num",$li).html(parseInt(nRank - pRank,10));
					}else if(nRank < pRank){
						$(".rank_num>.ico",$li).addClass("down");
						$(".rank_num>.ico",$li).html("상승");
						$(".rank_num>.num",$li).html(parseInt(pRank - nRank,10));
					}else{							//랭크가 현재와 같을때
						$(".rank_num>.ico",$li).addClass("same");
					}
				}else{
					$(".rank_num",$li).hide();
				}
				
				var i_nListPrice = obj_list[i].n_list_price;
				var i_nPrice = obj_list[i].n_price;
				$(".sale",$li).html("<em>"+SetNumComma(i_nListPrice)+"</em>원");
				$(".price",$li).html("<em>"+SetNumComma(i_nPrice)+"</em>원");
				if(i_nListPrice <= i_nPrice){
					$(".sale",$li).remove();
				}
				
				$(".gradeType",$li).addClass("grade0"+parseInt(obj_list[i].n_single_point));
				$(".gradeType>span",$li).html("평점 "+obj_list[i].n_single_point);
				
				$li.appendTo($html);
			}
			$("li",$html).eq(0).remove();
			
			if(rt_cnt < 6){
				$(".btn_more",$html.parent().parent()).remove();
			}
			
			$(".btn_more",$html).click(function(event){
				$("li",$html).attr("style","display:;");		//모두 보기
			});
		},
		setRankingTab : function() {
			var	$tabCate	= $(".priceBestTab .tab_cate"); 
			var	$tabCont	= $(".priceBestTab .tab_cont");

			$tabCate.click(function(e) {
				var	$idxTab	= $tabCate.index(this);

				$tabCont.hide().eq($idxTab).show();
				$tabCate.removeClass("active").eq($idxTab).addClass("active");
				MobileMain.fn.mainH();

				return false;
			});

			$(".realtimeraking .ranki").hide();

			$(".btn_rankingten").click(function(e) {
				$(this).hide();
				$(this).prev().find($(".realtimeraking .ranki")).show();
				MobileMain.fn.mainH();

				return false;
			});
		},
		getPageInit : function(){
			var $rankingSec = $("article.rankingSec");
			var $left_ul = $(".fl>.maincontSec>.rankingList>ul",$rankingSec);	//왼쪽section
			var $right = $(".fr>.maincontSec>.tab_wrap",$rankingSec);
			var $right_prc3 = $("#prc3>.rankingList>ul",$right);
			var $right_prc5 = $("#prc5>.rankingList>ul",$right);
			var $right_prc7 = $("#prc7>.rankingList>ul",$right);
			var $right_prc7u = $("#prc7u>.rankingList>ul",$right);
			
			
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT+"mobile/mobile_main_ranking_list_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: null,
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
//						MobileMain.fn.brandinit();
					
						var rtList = data.object.realtimeView;
						var p3List = data.object.prc30000;
						var p5List = data.object.prc50000;
						var p7List = data.object.prc70000;
						var p7uList = data.object.prc70000up;
						
						//왼쪽 지금 가장 많이 보고 있는 상품 top 10부터 시작
						var rt_cnt = rtList.length;
//						$("li",$left_ul).each(function(index){
//							if(index != 0){
//								$("li",$left_ul).eq(1).remove();
//							}
//						});
						if(rt_cnt>10){
							rt_cnt = 10;
						}
						
						for(var i=0;i<rt_cnt; i++){
							var $left_li = $("li",$left_ul).eq(0).clone(true);
							var i_nRanking = rtList[i].n_ranking;
							var rank_label_class = "";
							if(i_nRanking < 6){
								
								$left_li.attr("style","display:;");		//처음에는 처음것만 보여짐
								if(i_nRanking == 2 || i_nRanking == 3){
									rank_label_class = "rank"+i_nRanking+" rankfl";
								}else{
									rank_label_class = "rank"+i_nRanking;
								}
								if(i_nRanking < 4){
									$(".ico_ranking",$left_li).html("<img src=\""+GLOBAL_MOBILE_IMG_URL+"common/img_digit.png\" alt=\"\" />");
									$(".ico_ranking",$left_li).attr("id","counter"+i_nRanking);
								}else{
									$(".thumbImg",$left_li).insertAfter($(".prodDetail",$left_li));
									$(".ico_ranking",$left_li).addClass("v2");
									$(".ico_ranking",$left_li).html("<em>"+i_nRanking+"</em>th");
								}
								$(".brandNm",$left_li).html(rtList[i].v_brandnm);
								$(".prodNm",$left_li).html(rtList[i].v_productnm);
								
								var img_path = rtList[i].v_img_path || "";

								if (img_path.indexOf("_155") > -1) {
									img_path = img_path.replace("_155", "_356");
								}
								
								$(".thumbImg>img",$left_li).attr("src",img_path);
							}else{
								rank_label_class = "ranki";
								
								$(".ico_ranking",$left_li).html("<em>"+i_nRanking+"</em>th");
								$(".prodEvalu",$left_li).remove();		//평점
								$(".thumbImg",$left_li).remove();
								
								$(".prodDetail>.brandNm",$left_li).remove();
								var html = "<span class=\"brandNm\">"+rtList[i].v_brandnm+"</span> ";
								html += rtList[i].v_productnm;
								$(".prodNm",$left_li).html(html);
								
							}
							
							$left_li.addClass(rank_label_class);
							
							$("a",$left_li).attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+rtList[i].v_productcd);
							$("a",$left_li).attr("onclick", "productClickTagEvent('reco-dp-16','"+rtList[i].v_productcd+"','MOBILE')");
							
							if(i_nRanking == 1){		//1등일때
								var nRank = rtList[i].n_ranking;
								var pRank = rtList[i].n_pre_ranking;
								if(pRank == 0){				//이전 랭크가 0일때
									$(".rank_num>.ico",$left_li).addClass("ico_new2");
									$(".rank_num>.ico_new2",$left_li).removeClass("ico");
									$(".rank_num>.ico_new2",$left_li).html("<img src=\"/images/common/ico_new2.png\" alt=\"new\">");
								}else if(nRank > pRank){		//현재 랭크가 더 낮을떼
									$(".rank_num>.ico",$left_li).addClass("down");
									$(".rank_num>.ico",$left_li).html("하강");
									$(".rank_num>.num",$left_li).html(parseInt(nRank - pRank,10));
								}else if(nRank < pRank){
									$(".rank_num>.ico",$left_li).addClass("up");
									$(".rank_num>.ico",$left_li).html("상승");
									$(".rank_num>.num",$left_li).html(parseInt(pRank - nRank,10));
								}else{							//랭크가 현재와 같을때
									$(".rank_num>.ico",$left_li).addClass("same");
								}
							}else{
								$(".rank_num",$left_li).hide();
							}
							
							var i_nListPrice = rtList[i].n_list_price;
							var i_nPrice = rtList[i].n_price;
							$(".sale",$left_li).html("<em>"+SetNumComma(i_nListPrice)+"</em>원");
							$(".price",$left_li).html("<em>"+SetNumComma(i_nPrice)+"</em>원");
							if(i_nListPrice <= i_nPrice){
								$(".sale",$left_li).remove();
							}
							
							$(".gradeType",$left_li).addClass("grade0"+parseInt(rtList[i].n_single_point));
							$(".gradeType>span",$left_li).html("평점 "+rtList[i].n_single_point);
							
							$left_li.appendTo($left_ul);
						}
						$("li",$left_ul).eq(0).remove();
						
						if(rt_cnt < 6){
							$(".btn_more",$left_ul.parent().parent()).remove();
						}
						
						$(".btn_more",$left_ul).click(function(event){
							$("li",$left_ul).attr("style","display:;");		//모두 보기
						});
						//왼쪽 지금 가장 많이 보고 있는 상품 top 10 끝

						//오른쪽 지금 가장 많이 보고 있는 상품 top 10 시작
						MobileShopProductRanking.fn.setRanking(p3List,$right_prc3);
						MobileShopProductRanking.fn.setRanking(p5List,$right_prc5);
						MobileShopProductRanking.fn.setRanking(p7List,$right_prc7);
						MobileShopProductRanking.fn.setRanking(p7uList,$right_prc7u);
						MobileShopProductRanking.fn.setRankingTab();
						//오른쪽 지금 가장 많이 보고 있는 상품 top 10 끝
						
						if (!MobileShopProductRanking.isRankingShow) {
							$('#counter1').spinCounter({
								minDigitSpinDelay: 30,
								maxDigitSpinDelay: 300,
								spinTime:800,
								stopDigit:1,
								startDigit:5
							});
							$('#counter2').spinCounter({
								minDigitSpinDelay: 30,
								maxDigitSpinDelay: 300,
								spinTime:1200,
								stopDigit:2,
								startDigit:7
							});
							$('#counter3').spinCounter({
								minDigitSpinDelay: 30,
								maxDigitSpinDelay: 300,
								spinTime:1600,
								stopDigit:3,
								startDigit:8
							});

							MobileShopProductRanking.isRankingShow	= true;
							$(".btn_rankingten").click(function(e) {
								$(this).hide();
								$(this).prev().find($(".realtimeraking .ranki")).show();

								return false;
							});
						}
						
					}else {
						alert(data.message);
					}
				}
			});
			
		}
	}
};
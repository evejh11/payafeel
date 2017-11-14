/**
 * New node file
 */
var MobileShopProductBrand = {
	name : "MobileShopProductBrand",
	brandiscroller	: null,
	init : function() {
		MobileShopProductBrand.fn.brandinit();
//		MobileShopProductBrand.fn.setBrandScroll();
		   	    	
	},
	fn : {
		scrollWidth : function() {
			var	aw	= 0;

			$(".brandList li").each(function() {
				var	$eW	= $(this).width();
				aw	= aw + $eW;
			});

			$('.brandList').css('width', aw);
		},
		setBrandScroll : function() {
			MobileShopProductBrand.fn.scrollWidth();
			
			MobileShopProductBrand.brandiscroller = new iScroll('brandiscroller', {
				zoom:false,
				momentum: true,
				vScroll:false,
				hScrollbar:false,
				onBeforeScrollStart:function(e){
					e.preventDefault();
					e.stopPropagation();
					$("#brandiscroller").addClass("in");
				}
			});


			$(".brandList li a").click(function() {
				$(".brandList li").removeClass();
				$(this).parent().addClass("active");
				
				MobileShopProductBrand.fn.brandList();		//브랜드 리스트를 가져온다
				
				return false;
			});
		},
		brandList : function() {
			
			var id = $(".brandList li.active").find("img").attr("id");
			var name = $(".brandList li.active").find("img").attr("alt");
			
			// bland 로딩
			MobileCommon.ajax({
				url			: GLOBAL_WEB_ROOT+"mobile/mobile_shop_product_list_main_ajax.do",
				type		: "POST",
				dataType	: "json",
				data		: {"i_sBrandcd":id, "i_iStartRownum":1,"i_iEndRownum":6},
				animation	: false,
				success		: function (data, textStatus) {
					if ("succ" == data.status) {
						var	list	= data.object.shopprd.list;
						var	stlist	= data.object.shopprd.stlist;
						var	cnt	= list.length;
						$('section.brand>h1.title>span').html(name);
						$('#brandlanding>a>span').html(name);
						$('#brandlanding>a').attr('href',GLOBAL_WEB_ROOT+'mobile/shop/mobile_shop_product_list.do?i_sFlagBrand=Y&i_sBrandcd='+id);

						
						if (cnt > 0) {
							var	html	= "";

							for (var i = 0; i < list.length; i++) {
								var saleArea = list[i].n_list_price != list[i].n_price ? "<span class=\"sale\"><em>"+SetNumComma(list[i].n_list_price)+"</em> 원</span><br/>" : "";
								html	+= "<li>"
											+ "<a href=\""+GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+list[i].v_productcd+"\">"
												+ "<div class=\"thumbImg\">"
													+ "<img src=\""+list[i].v_img_path+"\" alt=\"\" onerror=\"fnNoImage(this)\"/>"
												+ "</div>"
												+ "<div class=\"prodDetail\">"
													+ "<p class=\"brandNm ellipsis\">"+list[i].v_brandnm+"</p>"
													+ "<p class=\"prodNm\">"+subStrChangStr(list[i].v_productnm,12,"...")+"</p>"
													+ "<p class=\"priceZone\">"
														+ saleArea
														+ "<span class=\"price\"><em>"+SetNumComma(list[i].n_price)+"</em> 원</span> "
													+ "</p>"
													+ "<div class=\"prodEvalu\">"
														+ "<span class=\"gradeType2 grade0"+parseInt(list[i].n_single_point)+"\"><span class=\"hide\">"+list[i].n_single_point+"</span></span>"
														+ "<span class=\"replyCount\"><span class=\"hide\">댓글수</span>("+list[i].n_review_cnt+")</span>"
													+ "</div>"
												+ "</div>"
											+ "</a>"
										+ "</li>";
							}

							$('section.brand>div.new_brand').html("<ul>" + html + "</ul>");
						} else {
							$('section.brand>div.new_brand').html("<ul><li>상품이 존재하지 않습니다.</li></ul>");
						}

						var	st_cnt	= stlist.length;
						$('section.steadybrand>h1.title>span').html(name);
						var $ul = $('section.steadybrand>div.prodAlbumType>ul');
						if (st_cnt > 0) {
							$(".steady_prod_list",$ul).show();
							$(".steady_prod_nolist",$ul).hide();
							$("li.steady_prod_list",$ul).each(function(index){
								$("li.steady_prod_list",$ul).eq(1).remove();
							});
							
							for (var i = 0; i < st_cnt; i++) {
								var $li = null;
								if(i == 0){
									$li = $("li",$ul).eq(0);
								}else{
									$li = $("li",$ul).eq(0).clone(true);
								}
								$("a",$li).attr("href",GLOBAL_WEB_URL+"mobile/shop/mobile_shop_product_detail.do?i_sProductcd="+stlist[i].v_productcd);
								$(".thumbImg>img",$li).attr("src",stlist[i].v_img_path);
								
								$(".brandNm",$li).html(stlist[i].v_brandnm);
								$(".prodNm",$li).html(getByteString(stlist[i].v_productnm, 12));
								$(".price",$li).html("<em>"+SetNumComma(stlist[i].n_price)+"</em> 원");
								
								if(stlist[i].n_list_price != stlist[i].n_price) {
									$(".sale",$li).html("<em>"+SetNumComma(stlist[i].n_list_price)+"</em> 원");
									$(".sale",$li).show();
								}else{
									$(".sale",$li).hide();
								}
								
								$(".gradeType2",$li).addClass("grade0"+parseInt(stlist[i].n_single_point));
								$(".gradeType2>span",$li).html(stlist[i].n_single_point);
								$(".replyCount",$li).html("("+stlist[i].n_review_cnt+")");
								
								if(i != 0){
									$li.appendTo($ul);
								}
							}
							
							$(".steady_prod_nolist",$ul).hide();
						} else {
							$(".steady_prod_list",$ul).hide();
							$(".steady_prod_nolist",$ul).show();
						}
						
					} else {
						alert(data.message);
					}
				}
			});
		},
		brandinit : function(){
				
			MobileShopProductBrand.fn.setBrandScroll();

			var brand_cnt = $(".brandList li").length;
			var ran_index = Math.random()*brand_cnt;
			var brand_index = Math.floor(ran_index);
			
			$(".brandList li a").eq(brand_index).click();		//브랜드 선택
			
			var	aw	= 0;
			$(".brandList li").each(function(index) {
				if( index > 2 && index < brand_index){
					var	$eW	= $(this).width();
					aw	= aw + $eW;
				}
			});
			MobileShopProductBrand.brandiscroller.scrollTo(-aw, 0, 100);		//선택 된 브랜드가 가운데에 올수 있게 옮김
		},
	}
};
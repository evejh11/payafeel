  var gnb_swipe_scroller3,
		offset = 0;
	var winW = jQuery(window).width();
	var $aw = 0;

if(window.location.pathname.indexOf('mobile') > 0){//����� �϶���

jQuery(document).ready(function(){
  
  jQuery(".gnb_category").hide();
	jQuery(".gnb_swipe").hide();
  
	var aHtml = [];
	var gnbDiv = jQuery(".gnb_div").children("ul").children("li");
	var gnbTday = jQuery(".gnb_today").children("ul").children("li");
	var appdTarget = jQuery(".gnb_swipe2").children(".gnb_swipe_scroller").children("#gnbSwipe2");
	var appdTarget2 = jQuery(".gnb_all").children(".clearfix");
	
	gnbTday.each(function(idx){
		aHtml.push(gnbTday[idx].outerHTML);
	});
	
	
	gnbDiv.each(function(idx){
		aHtml.push(gnbDiv[idx].outerHTML + gnbDiv[idx].nextElementSibling.outerHTML);
	});

	console.log(aHtml);
	
	jQuery(".i_sEventUrl").each(function(idx){
	appdTarget.append(aHtml[idx]);
    appdTarget2.append(aHtml[idx]);
	});
  
  jQuery('.btn_gnb2').off("click").on("click",function(e) {
			//e.preventDefault();

			if(jQuery(this).hasClass('on') != true){

				jQuery('.gnb_all').stop(true,true).slideDown();
				jQuery(this).addClass('on');
			}else{

				jQuery('.gnb_all').stop(true,true).slideUp();
				jQuery(this).removeClass('on');
			}
		});


  var gnb_swipe_scroller3,
		offset = 0;
	var winW = jQuery(window).width();
	var $aw = 0;
	
	jQuery(document).ready(function(event){                       
		//iscroll ���ΰ� üũ
		function scrollWidth(){ 
			var $gnbSwipe2 = jQuery(".gnbSwipe2 li");
			jQuery(".gnbSwipe2 li").each(function(){
				var $eW = jQuery(this).width();
				$aw = $aw + $eW;
			});
	        if($aw > winW){
	            jQuery('button.btn_iscrollNext').addClass('in');
	        } else {
	            jQuery('button.btn_iscrollNext').removeClass('in');
	        }
			jQuery('.gnbSwipe2').css('width',$aw+2);
		};
		//iscroll�ڵ鷯
		function scrollHandler() {
			if(this.x || this.x === 0) {
				offset = this.x;
			}
		};
		function next() {
			offset -= (48 * 5);
			        if ( offset < - $aw + winW ) {
			            offset = - $aw + winW; // don't exceed this limit
			        }
			        gnb_swipe_scroller3.scrollTo(offset,0,400);
		};
		function prev() {
			offset += (48 * 5);
			        if ( offset > 0 ) {
			            offset = 0; // don't exceed this limit
			        }
			        gnb_swipe_scroller3.scrollTo(offset,0,400);
		};

		scrollWidth();
		//iscroll
		gnb_swipe_scroller3 = new iScroll('gnb_swipe_scroller', {
				zoom:false,
				momentum: true,
				vScroll:false,
				hScrollbar:false,
				onBeforeScrollStart:function(e){
					e.preventDefault();
					e.stopPropagation();
				},
				onScrollMove: scrollHandler,
				onScrollEnd: function(){
					winW = jQuery(window).width();
					var $thisX = this.x;

					var $positionX = winW - $aw;
		            if($thisX < 0 && $positionX < $thisX -1){
		                jQuery('button.btn_iscrollPrev').addClass('in');
		                jQuery('button.btn_iscrollNext').addClass('in');
		            } else if($thisX == 0){
		                jQuery('button.btn_iscrollPrev').removeClass('in');
		                jQuery('button.btn_iscrollNext').addClass('in');
		            } else if($positionX > $thisX -1){
		                jQuery('button.btn_iscrollPrev').addClass('in');
		                jQuery('button.btn_iscrollNext').removeClass('in');
		            }
				}
		});
    

		jQuery( '.btn_iscrollNext' ).click( function(event) {
			event.preventDefault();
			next();
		});
		
		jQuery( '.btn_iscrollPrev' ).click( function(event) {
			event.preventDefault();
			prev();
		});
		
	});
	jQuery(window).resize(function(){
		winW = $(window).width();
		$aw = 0;
		jQuery(".gnbSwipe2 li").each(function(){
			var $eW = jQuery(this).width();
			$aw = $aw + $eW;
		});

	});
  
  
  });
}else{
  jQuery(document).ready(function(){
    jQuery(".gnb_swipe2").remove();
    });
}

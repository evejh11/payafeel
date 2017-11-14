$(document).ready(function(){	
		/*$("#hashSlider").lightSlider({
             loop:true,
             slideMargin : 0,
             keyPress:true,             
             enableTouch: true,
             enableDrag:false
        });	
        $("#hashSlider2").lightSlider({
             loop:true,
             slideMargin : 0,
             keyPress:true,             
             enableTouch: true,
             enableDrag:false
        });
        
         var mainPrdArea = $('#mainPrd1 ul').eq(0).bxSlider({ 			 		   			
	         onSlideBefore: function($slideElement, oldIndex, newIndex){          	
			 	$(".mainPrd1_pager span").removeClass("on").eq(newIndex).addClass("on");						 	     			             
	         }
	     });               
                       
	     var mainPrdArea2 = $('#cmnPrd_slider1 ul').eq(0).bxSlider({ 			 		 
	         onSlideBefore: function($slideElement, oldIndex, newIndex){          	
			 	$(".al_sp .cmnPrdPager_type1 span").removeClass("on").eq(newIndex).addClass("on");						 	     			             
	         },
	         onSlideAfter:function($slideElement, oldIndex, newIndex){
	         	mainPrdArea7.startAuto();	
	         }      
	     });
        
        var mainPrdArea3 = $('#cmnPrd_slider2 ul').eq(0).bxSlider({ 			     			 
	         onSlideBefore: function($slideElement, oldIndex, newIndex){          	
			 	$(".al_ow .cmnPrdPager_type1 span").removeClass("on").eq(newIndex).addClass("on");						 	     			             
	         }
	     });
	     
	     var mainPrdArea4 = $('#cmnPrd_slider3 ul').eq(0).bxSlider({ 			 
	         onSlideBefore: function($slideElement, oldIndex, newIndex){          	
			 	$(".valen .cmnPrdPager_type1 span").removeClass("on").eq(newIndex).addClass("on");						 	     			             
	         }
	     });

        var mainPrdArea5 = $('#cmnPrd_slider4 ul').eq(0).bxSlider({ 			 		 	
	         onSlideBefore: function($slideElement, oldIndex, newIndex){          	
			 	$(".summerner .cmnPrdPager_type1 span").removeClass("on").eq(newIndex).addClass("on");						 	     			             
	         }
	     });
        
        var mainPrdArea6 = $('#cmnPrd_slider5 ul').eq(0).bxSlider({ 			 
	         onSlideBefore: function($slideElement, oldIndex, newIndex){          	
			 	 $(".giftItemCount .cur").text(mainPrdArea6.getCurrentSlide() + 1);
            	 $(".giftItemCount .tot").text(mainPrdArea6.getSlideCount);  	 	     			             
	         }
	     });
                
        
        var mainPrdArea7 = $('#cmnPrd_slider6 ul').eq(0).bxSlider({ 			     			 
	         onSlideBefore: function($slideElement, oldIndex, newIndex){          	
			 	$(".salesSlider_wrapper .cmnPrdPager_type1 span").removeClass("on").eq(newIndex).addClass("on");						 	     			             
	         },
	         onSlideAfter:function($slideElement, oldIndex, newIndex){
	         	mainPrdArea7.startAuto();	
	         }      
	     });
        
       
        
        var mainPrdArea8 = $('#cmnPrd_slider7 ul').eq(0).bxSlider({ 			 
	         onSlideBefore: function($slideElement, oldIndex, newIndex){          	
			 	$(".promotionBox_wrapper .cmnPrdPager_type1 span").removeClass("on").eq(newIndex).addClass("on");						 	     			             
	         }
	     });

       
       var mainPrdArea9 = $('#cmnPrd_slider8 ul').eq(0).bxSlider({ 			 
	         onSlideBefore: function($slideElement, oldIndex, newIndex){          	
			 	$(".specialPackage .cmnPrdPager_type1 span").removeClass("on").eq(newIndex).addClass("on");		
			 	 				 	     			             
	         },
	         onSlideAfter:function($slideElement, oldIndex, newIndex){
	         	
	         }
	     }); */
       
        
        function promotion1(){
        	var winWidth = $(window).width();        
			var set_itemWidth = winWidth / $("#gnb_category ul").find("li").slice(0,4).size();		
	        var set_ulWidth = set_itemWidth * $("#gnb_category ul").find("li").size();        
	        var setItem = $("#gnb_category ul").find("li").size()     	
	        if($("#gnb_category ul").find("li").size() > 4){
	        	$("#gnb_category > div").width(set_ulWidth);        	
	        	$("#gnb_category ul li").width(set_itemWidth);	
	        }else{
	        	
	        }
        }
        promotion1();
        $(window).on('resize',function(){
        	promotion1();	
        })
        $("#btn_kti").click(function(){
        	$("section.boardList_area .kti_room").toggle();
        	$(this).toggleClass("open")
        })
        $(".btn_closeKit").click(function(){
        	$(".adBanner_area").toggle();
        })
                                         	                      
}) //$(document).ready
$(window).load(function(){	
	var myScroll;
    function loaded () {
        myScroll = new IScroll('#gnb_category', { scrollX: true, scrollY: false, mouseWheel: true, snap:false,mouseWheel: true});
    }		
    if($("#gnb_category ul").find("li").size() > 4){
    	loaded();	
    }else{
    	return false;
    }            		
}) //$(window).load
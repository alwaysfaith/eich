window.onorientationchange = function() {
	setTimeout(function() {
		window.location.reload();
	},160)
}
$(function(){

  if($('.campaigns-sly').length>0){
     $('.campaigns-sly').sly({
        horizontal: 1,
        itemNav: "forceCentered",   
        smart:1,
        cycleBy:'items',
        prev:'.campaigns-btn-prev',
        next:'.campaigns-btn-next',
        cycleInterval: 3000,
        easing: "easeOutBack"    
      });
  }
    
//    console.log($('.carousel-indicators').width(130*10),$('.carousel-indicators li').size())
    
    var _w = 150*$('.carousel-indicators li').size();
    $('.carousel-indicators').width(_w);
    
    $('.pro_scroll').width($(document).width());
    $('.gray_k').width($(document).width());

	var $lazy=$("img.lazy");
        $lazy.lazyload({effect : "fadeIn" });

    var winWid=$(window).width(),
        winHei=$(window).height();

//      if(winWid<=2000){
//      $('.collection_pic>a>img').css({
//        height:'100%',
//        width:'auto'
//      })
//   }else{
//      $('.collection_pic>a>img').css({
//        height:'auto',
//        width:'100%'
//      })
//   }
    
	$(".proWrap").carousel({
  		interval: 3000,
		pause:	"hover"
	});
  
  //  $('#carousel-banner, #campaigns, #collection, #share, #news, #contact').height(winHei);   
   // $('#carousel-banner, #campaigns, #collection, #share, #news, #contact').css({'paddingTop':62});
   // $('.carousel, .campaigns, .collection, .share, .news, .contact').css({'overflow':'hidden'})  
  

 
$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');// 这行是 Opera 的补丁, 少了它 Opera 是直接用跳的而且画面闪烁 by willin
  $('.navigation>li').click(function(e){
    e.stopPropagation();    
    var sel=$(this).find('a').attr('toelem'),
      winScrollpos=$(sel).offset().top;
   $body.animate({scrollTop: winScrollpos},1000);  
    return false;
  });   
$(".H860-banner, .proPic").carousel({
  		interval: 5000,
		pause:	"hover"
	});
});

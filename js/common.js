var JT = {};
JT.smoothscroll = {
	passive : function(){
		var supportsPassive = false;
		try {
		  document.addEventListener("test", null, { get passive() { supportsPassive = true }});
		} catch(e) {}
		return supportsPassive;
	},
	init : function(){
		if($('html').hasClass('mobile') || $('html').hasClass('mac') || $('html').hasClass('ff')) return;
        if($(window).width() < 1280){
            return;
        }
		//this.passive = true ;
        // console.log(this.passive())
		var $window = $(window);
		var scrollTime = 1;
		var distance_offset = 2.5;
		var scrollDistance = $window.height() / distance_offset;

		if(this.passive()){
			 console.log('passive');
		    window.addEventListener("wheel",this.scrolling,{passive: false});
		}else{
			 console.log('not passive');
             $window.on("mousewheel DOMMouseScroll", this.scrolling);
		}
	},
	destroy : function(){
		//window.removeEventListener("mousewheel DOMMouseScroll");
		if(this.passive()){
			// console.log('destroy passive');
		    window.removeEventListener("wheel",this.scrolling);
		}else{
			// console.log('destroy not passive');
            $(window).off("mousewheel DOMMouseScroll", this.scrolling);
		}
		TweenMax.killChildTweensOf($(window),{scrollTo:true});
	},
	scrolling : function(event){
		event.preventDefault();

		var $window = $(window);
		var scrollTime = 1;
		var distance_offset = 2.5;

		// debug custom param for intro page
		// TODO : make options
		if($('#introduce-menu').length > 0){
			scrollTime = 1;
		    distance_offset = 4.5;
		}

		var scrollDistance = $window.height() / distance_offset;
		var delta = 0;

		if(JT.smoothscroll.passive()){
			//console.log('----111------');
		    //console.log(event);
		    //delta = event.wheelDelta/120 || -event.originalEvent.detail/3;
		    delta = event.wheelDelta/120 || -event.deltaY/3;
		}else{
			if(typeof event.originalEvent.deltaY != "undefined"){
				//console.log('----222------');
				//console.log(event.originalEvent);
				delta = -event.originalEvent.deltaY/120;
			}else{
				//console.log('----333------');
				//console.log(event.originalEvent);
			    delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
			}
		}

		var scrollTop = $window.scrollTop();
		var finalScroll = scrollTop - parseInt(delta*scrollDistance);

		TweenMax.to($window, scrollTime, {
			scrollTo : { y: finalScroll, autoKill:true },
			ease: Power3.easeOut,
			overwrite: 5
		});
	}
};
JT.smoothscroll.init();





















$(function(){
	$(window).scrollTop(0);
	
	$(document).ready(function(){
		$('.mainVisual').imagesLoaded( { background: true }, function() {
	  		$('body').addClass('mainLoad');
		});
	});
	
	//경험하기 iframe 대응
	var offsetArray = [];
	$(window).load(function(){
		offsetArray[0] = $('.greetingWrap').length > 0 ? $('.greetingWrap').offset().top : 0;
		offsetArray[1] = $('.dayWrap').length > 0 ? $('.dayWrap').offset().top : 0;
		offsetArray[2] = $('.galleryWrap').length > 0 ? $('.galleryWrap').offset().top : 0;
		offsetArray[3] = $('.infoWrap').length > 0 ? $('.infoWrap').offset().top : 0;
		offsetArray[4] = $('.guestBookWrap').length > 0 ? $('.guestBookWrap').offset().top : 0;
		offsetArray[5] = $('.contactWrap').length > 0 ? $('.contactWrap').offset().top : 0; 
		offsetArray[6] = $('.mindWrap').length > 0 ? $('.mindWrap').offset().top : 0;
		offsetArray[7] = $('.locationWrap').length > 0 ? $('.locationWrap').offset().top : 0;
		offsetArray[8] = $('.thanksWrap').length > 0 ? $('.thanksWrap').offset().top : 0;
	});
	//메뉴이동
    $('.gnbList ul li a').on('click', function(e) {
        e.preventDefault();
		$('body').removeClass('gnbOpen');
		noScrollClear();
	   	moveGnb = true;
	   
	   if(!$('.wrap').hasClass('iframe')){
			   var idx = $(this).parent().index();
	   		switch(idx){
	   			case 0 : winScTop = $('.greetingWrap').offset().top;
	   			break;
	   			case 1 : winScTop = $('.dayWrap').offset().top;
	   			break;
	   			case 2 : winScTop = $('.galleryWrap').offset().top;
	   			break;
	   			case 3 : winScTop = $('.infoWrap').offset().top;
	   			break;
	   			case 4 : winScTop = $('.guestBookWrap').offset().top;
	   			break;
	   			case 5 : winScTop = $('.contactWrap').offset().top;
	   			break;
	   			case 6 : winScTop = $('.mindWrap').offset().top;
	   			break;
	   			case 7 : winScTop = $('.locationWrap').offset().top;
	   			break;
	   			case 8 : winScTop = $('.thanksWrap').offset().top;
	   			break;
	   		}
	   
           $('body,html').stop().animate({
               scrollTop: winScTop
           }, 500,function(){});
	   }else{
		   var idx = $(this).parent().index();
		   switch(idx){
			   case 0 : winScTop = offsetArray[0];
      			break;
			   case 1 : openInterview(); return false;
			   break;
			   case 2 : winScTop = offsetArray[1];
			   break;
			   case 3 : winScTop = offsetArray[2];
			   break;
			   case 4 : winScTop = offsetArray[3];
			   break;
			   case 5 : winScTop = offsetArray[4];
			   break;
			   case 6 : winScTop = offsetArray[5];
			   break;
			   case 7 : winScTop = offsetArray[6];
			   break;
			   case 8 : winScTop = offsetArray[7];
			   break;
			   case 9 : winScTop = offsetArray[8];
			   break;
		   }
		   $('.wrap').stop().animate({
			   scrollTop: winScTop
			   }, 500,function(){
		   });
	   }
    });
	
	
	
	
	
	
	
	
	
	
	
	
	
//인터뷰 더보기
	$('.interPop .popCont .inner .more span').click(function(){
		$('.interPop .popCont .inner .hidden').fadeIn('slow');
		$(this).parents('.more').hide();
	});
	
	$(window).scroll(function(){
		var idx = $(window).scrollTop();
		if(idx > 10){
			$('.head').addClass('on');
		}else{
			$('.head').removeClass('on');
		}
	});
	
	
//인터뷰 닫기
	$('.btnInterClose').click(function(){
		$('body').removeClass('interOpen');
		$('body').off('scroll touchmove mousewheel');
		noScrollClear();
	});
	
	//갤러리팝업 - 슬라이드
	var popSlide = new Swiper('.popSlide .swiper-container', {
	  slidesPerView: 1,
	  spaceBetween: 0,
	  loop: true,
	  speed:1100,
	  pagination: {
      	el: ".popSlide .swiper-pagination",
        type: "fraction",
      },
	  navigation: {
      	nextEl: ".popSlide .swiper-button-next",
      	prevEl: ".popSlide .swiper-button-prev",
     }
	});
	// 갤러리팝업 - 열기
	$(".galWrap .galList li").on('click', function(e){
		noScrollRun();
		$('body').addClass('showSlide');
		$('body').on('scroll touchmove mousewheel', function(event) {
			event.preventDefault();     
			event.stopPropagation();     
			return false; 
		});
		var slideActive = $(this).attr("slide-num");
		popSlide.update();
		popSlide.slideTo(slideActive, 0);
	});
	// 갤러리팝업 -  닫기
	$(".popSlide .closeSlide").click(function(){
		noScrollClear();
		$('body').removeClass('showSlide');
		$('body').off('scroll touchmove mousewheel');
	});
		
	
	
	// 갤러리 더보기
function morePic(){
	$('.hiddenList').show();
	$('.galleryWrap .more').hide();
}

//인터뷰 열기
function openInterview(){
	$('.interPop').scrollTop(0);
	$('body').addClass('interOpen');
	$('body').on('scroll touchmove mousewheel', function(event) { // 터치무브와 마우스휠 스크롤 방지     
		event.preventDefault();     
		event.stopPropagation();     
		return false; 
	});
	noScrollRun();
}
	
	
	
	

	
	
	
	
	
	
	

.galleryWrap{background: no-repeat 50% 0 / cover;}
.galleryWrap .galleryInner{padding-top: 97px;padding-bottom: 99px;}
.galleryWrap .galWrap{padding: 0 30px;}
.galleryWrap .galWrap .inner{position: relative;max-width:1280px;margin:0 auto;}
.galleryWrap .galWrap .videoImg{position: absolute;left:0; top:0;max-width:630px;width: calc(50% - 10px); border-radius:20px; overflow:hidden;}
.galleryWrap .galWrap .videoImg img{pointer-events:none;max-width: none;width: 100%}
.galleryWrap .galWrap .videoImg a{position: relative; display: block;}
.galleryWrap .galWrap .videoImg .btnPlay{position: absolute;left:50%;top:50%;margin:-35px 0 0 -28px;width:56px;height:70px;background:url(../images/btn_play.png) no-repeat 50% 50%}
.galleryWrap .galWrap .galList .col ul{margin: 0 -10px;}
.galleryWrap .galWrap .galList:after,
.galleryWrap .galWrap .galList ul:after{display: block;content: '';clear: both;}
.galleryWrap .galWrap .galList .col{box-sizing: border-box;}
.galleryWrap .galWrap .galList .img img{width: 100%}
.galleryWrap .galWrap .galList .col li{float: left;padding: 0 10px;width: 25%;position: relative;margin-bottom:20px;overflow: hidden;z-index: 1;box-sizing: border-box; }
.galleryWrap .galWrap .galList .col li:first-child {margin-left:0;;}
.galleryWrap .galWrap .videoImg + .gallery .galList .col li:first-child {margin-left:50%;}
.galleryWrap .galWrap .galList .col li > a{display: block; position: relative; overflow: hidden;  border-radius:20px;}
.galleryWrap .galWrap .galList .col li > a .img {background-size:cover !important; background-position:center center !important; padding-bottom:125.575%; display: block;}
.galleryWrap .galWrap .galList.hiddenList .col li:first-child {margin-left:0;;}
.galleryWrap .galWrap .videoImg + .gallery .galList.hiddenList .col li:first-child {margin-left:0;;}
.galleryWrap .galWrap .more{margin-top:15px;}

.galleryWrap .galWrap .galList .col li > a:hover .pop{opacity: 1}
.galleryWrap .galWrap .galList .col li > a:hover .hover{opacity: 1;}
.galleryWrap .galWrap .galList .pop{opacity: 0;transition: all 0.5s;position: absolute;top:0;left:0;width: 100%;height:100%;z-index: 1; background:url('../images/gal_hover1.png') center no-repeat; background-size:cover;}
.galleryWrap .galWrap .galList .hover{opacity: 0;transition: all 0.4s 100ms;width: 106px;height:106px;position: absolute;top:50%;left:50%;margin: -53px 0 0 -53px;z-index: 2;background:url('../images/gal_hover2.png') no-repeat 50% 50%;box-sizing: border-box;border: 2px solid #fff;border-radius: 100%;}
.galleryWrap .galWrap.mt{transition-delay: 900ms;transition-duration: 3s;transform:translateY(60px);}

.hiddenList {display: none;}

.more{text-align: center;}
.more span{display: inline-block; vertical-align: top; font-size:19px; color:#c4b2b7; font-weight:500; padding-bottom:55px; background:url('../images/icon_more.png') 50% 100% no-repeat; cursor:pointer;}
	
	
	
	

					
					
					
					
					
					
					
					
					
					
					
					
					

.guestBookWrap{background: center no-repeat; background-size:cover;}
.guestBookWrap .guestBookInner{padding-top: 97px;padding-bottom: 100px}
.guestBookWrap .secTitleWrap{max-width: 1280px;margin: 0 auto 38px;padding-bottom: 0;border-bottom: 1px solid #e2d3d7 ;}
.guestBookWrap .secTitleWrap p {letter-spacing:0;}

.guestBookWrap .marqWrap{overflow:hidden;height: 63px; }
.guestBookWrap .waveText {margin-bottom: 37px;position: relative;z-index: 1; transition:2s all; /*transform:translate(0,50px); opacity:0;*/  transition-delay:500ms;}
.guestBookWrap .waveText.none{display: none;}
.guestBookWrap .wave{padding-left:40px;display: inline-block;  cursor:pointer; font-size: 0}
.guestBookWrap .wave:first-child{margin-left:0;}
.guestBookWrap .wave:after {content:''; display:block; clear:both;}
.guestBookWrap .wave .img{display: inline-block; width:63px; height:63px; border-radius:50%; overflow:hidden;  vertical-align: middle;}
.guestBookWrap .wave .img span{display: block; position: relative; overflow:hidden;}
.guestBookWrap .wave .img span:after{content:''; position: absolute; left:0; top:0; width:calc(100% - 4px); height:calc(100% - 4px); border:2px solid #2f1f12;  border-radius:50%; display: none; }
.guestBookWrap .wave:hover .img span:after{display: block; }
.guestBookWrap .wave .img img{width: 100%;vertical-align: top; display: block;  width:63px; height:63px; }
.guestBookWrap .wave .txt{display: inline-block; vertical-align: middle;font-family: 'AritaBuri';font-size: 38px;font-weight: 600;color:#222222;margin-left: 11px; white-space:nowrap;letter-spacing:-.05em;}

					
					
					
					
					
					
					

					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
	
					
					
	
	
body.noScroll .wrap{position: relative;}
body.noScroll {overflow: hidden;position: fixed;width: 100%;height: 100%;}

.inviteBox .mainText,
.greetingWrap .greetingInner,
.dayWrap .dayInner{max-width: 542px;margin: 0 auto;}
.infoWrap .tab,
.mindWrap .mindInner,
.locationWrap .addrWrap,
.infoLoca .inner{max-width: 540px;margin: 0 auto;}

.ranTxt .ran{transition:2s all; opacity:0;letter-spacing: 0 !important}
.ranTxt .ran.r1 {transition-delay:250ms;}
.ranTxt .ran.r2 {transition-delay:400ms;}
.ranTxt .ran.r3 {transition-delay:550ms;}
.ranTxt .ran.r4 {transition-delay:700ms;}
.ranTxt .ran.r5 {transition-delay:850ms;}
.ranTxt .ran.r6 {transition-delay:1000ms;}
.ranTxt .ran.r7 {transition-delay:1150ms;}
.ranTxt .ran.r8 {transition-delay:1300ms;}
.ranTxt .ran.r9 {transition-delay:1450ms;}
.ranTxt .ran.r10 {transition-delay:1600ms;}

.atm .ranTxt .ran{opacity:1;}
.atm .mt,
.atm .mt2{transform:translate(0,0) !important; opacity:1 !important;}
.mt{transition:2s all ease; transform:translateY(50px); opacity:0; transition-delay:500ms;}
.mt2{transition:3s all; opacity:0; transition-delay:1200ms;}

.visualBox{position: relative; text-align:center;background: url('../images/mainBg.jpg') center no-repeat; background-size:cover; }
.mainImg{vertical-align: top;position: relative; max-width:540px; margin:0 auto; max-height:100vh;  overflow:hidden;}
.mainImg .imgBox{position: relative}
.mainImg .imgBox .img{}
.mainImg .imgBox .imgCover{z-index: 1;position: relative}
.mainImg img{pointer-events: none;object-fit: cover;object-position: 50% 50%;width:100%;height:100%; max-width:540px;}


.titleWrap .blast{opacity:0;will-change: opacity, filter;}
.mainVisual .titleWrap {position: absolute; left:70px; bottom:125px; text-align: center; color:#fff;box-sizing: border-box;display: table;width: 100%;}
.mainVisual .titleWrap .in{display: table-cell;vertical-align: middle;text-align: left;}
.mainVisual .titleWrap .topText {position: relative; display: inline-block;padding-right:64px; font-family: 'AritaBuri';}
.mainVisual .titleWrap .topText:after,
.mainVisual .titleWrap .topText .name:after{display: block;content: '';clear: both}
.mainVisual .titleWrap .topText .tit01,
.mainVisual .titleWrap .topText .tit02,
.mainVisual .titleWrap .topText .name > span{float:left;position:relative;z-index: 1;/*writing-mode: vertical-lr;letter-spacing: 0.23em;*/display: block;word-wrap: break-word;overflow-wrap: break-word;text-align: center;}
.mainVisual .titleWrap .topText .tit01 {width: 0.8em;font-size:14px;font-weight: 100;line-height:1.46;padding-right: 44px;margin-right: 18px;}
.mainVisual .titleWrap .topText .tit01 .mb {margin-bottom:18px; display: block;}
.mainVisual .titleWrap .topText .tit01:before{display: block;content: '';background-color: #fff;width:3px;height:0;position: absolute;top:0;right:0;transition: height 1s}
.mainVisual .titleWrap .topText .tit02 {width: 1.15em;font-size: 52px; line-height: 1;font-weight: 400; }
.mainVisual .titleWrap .topText .tit02 em {font-weight: 700;}
.mainVisual .titleWrap .topText .name{position: absolute;bottom: 0;right: 0}
.mainVisual .titleWrap .topText .name > span{font-size:21px;font-weight: 400;width: 1.15em;}

body.mainLoad .titleWrap .topText  {opacity:1;}
body.mainLoad .titleWrap .topText .tit01:before{height: 100%;}


.scroll{width:401px;height:52px;font-size: 12px;color: #000; font-family: 'EB Garamond';position: absolute;bottom: -1px;left:50%;transform: translateX(-50%);text-align: center;background: url(../images/scroll_bg.png) no-repeat 0 50% / cover;padding-top:15px;box-sizing: border-box}
.scroll span.bar {position:relative;display: block;width: 1px;height:16px;background-color: #aaaaaa;content: '';margin: 0 auto 3px auto;}
.scroll span.bar:before{content:'';width:4px; height: 4px; border-radius:50%; position: absolute;top:0;left:50%; transform:translateX(-50%);margin: 0;background: url(../images/circle.png) no-repeat 50% 50%; background-size:3px 3px;
	-webkit-animation: scrollMot 1.3s infinite ease-in-out;
    -o-animation: scrollMot 1.3s infinite ease-in-out;
    animation: scrollMot 1.3s infinite ease-in-out;
}
@keyframes scrollMot {
    0% {top:0px;}
    50% {top:14px;}
    100% {top:0;}
}


.mainLoad .cor{opacity:1;}
.mainLoad .box{opacity:1;}

.petalObj{position: absolute;display: block;background-position: 50% 50%;background-repeat: no-repeat;opacity:0;transition:3.9s all ease;background-size: 100% auto;z-index: 1;}
.petalObj.no1{top:284px;right:25px;width: 25px;height: 18px;background-image: url(../images/petal1.png);transform:translate(150px,-150px) rotate(180deg);}
.petalObj.no2{top:555px;right:25px;width: 27px;height: 26px;background-image: url(../images/petal2.png);transform:translate(150px,-100px) rotate(-180deg);}
.petalObj.no3{bottom: 52px;right: 190px;width: 31px;height: 28px;background-image: url(../images/petal3.png);transform:translate(-150px,-150px) rotate(180deg);}
.petalObj.no4{top:450px;left:15px;width: 23px;height: 28px;background-image: url(../images/petal4.png);transform:translate(-100px,-100px) rotate(-180deg);}
.petalObj.no5{top: 146px;left:108px;width: 24px;height: 21px;background-image: url(../images/petal5.png);transform: translate(-150px,-50px) rotate(180deg);}
.mainLoad .petalObj{transform:translate(0,0) rotate(0deg) !important; opacity:1;}

.fixPetalWrap{position: fixed;top:0;width: 100%;max-width: 540px;left:50%;transform: translateX(-50%);z-index: 10}
.fixPetalWrap .obj{position: absolute;display: block;background-position: 50% 50%;background-repeat: no-repeat;background-size: 100% auto;z-index: 100;}
.fixPetalWrap .obj.no1{/*top:138px;*/top:-100px;right:25px;width: 25px;height: 18px;background-image: url(../images/petal/f_petal1.png);}
.fixPetalWrap .obj.no2{/*top:418px;*/top:-50px;right:32px;width: 27px;height: 26px;background-image: url(../images/petal/f_petal2.png);}
.fixPetalWrap .obj.no3{/*top: 500px;*/top:-30px;left: 88px;width: 31px;height: 28px;background-image: url(../images/petal/f_petal3.png);}
.fixPetalWrap .obj.no4{/*top: 18px;*/top:-120px;left: 181px;width: 23px;height: 28px;background-image: url(../images/petal/f_petal4.png);}
.fixPetalWrap .obj.no5{/*top: 296px*/;top:-80px;left: 33px;width: 24px;height: 21px;background-image: url(../images/petal/f_petal5.png);}
.fixPetalWrap .obj.no6{top:-150px;left: 0; }
.fixPetalWrap .obj.no7{top:-40px;left: 60px;}

.leafOb{position: fixed;pointer-events: none;top:0;/*visibility: hidden;opacity: 0;*/visibility: visible;opacity: 0;z-index: 50}
.leafOb .leaf{}
.fixObWrap .leafOb:nth-child(1){left: 252px;left: 14.5%}
.fixObWrap .leafOb:nth-child(2){left: 595px;left: 36%}
.fixObWrap .leafOb:nth-child(3){right: 1054px;right: 17%}
.fixObWrap .leafOb:nth-child(4){left: 72px;left: 4%}
.fixObWrap .leafOb:nth-child(5){left: 378px;left: 20.5%}
.fixObWrap .leafOb:nth-child(6){right: 428px;right: 20.5%}

body.snow .fixObWrap > div * {display: none;}
body.snow .fixObWrap .no1 {background:url('../images/snow01.png') center no-repeat; width:65px; height:65px; background-size:100% auto;}
body.snow .fixObWrap .no2 {background:url('../images/snow02.png') center no-repeat; width:83px; height:83px; background-size:100% auto;}
body.snow .fixObWrap .no3 {background:url('../images/snow03.png') center no-repeat; width:42px; height:42px; background-size:100% auto;}
body.snow .fixObWrap .no4 {background:url('../images/snow04.png') center no-repeat; width:30px; height:30px; background-size:100% auto;}
body.snow .fixObWrap .no5 {background:url('../images/snow05.png') center no-repeat; width:30px; height:30px; background-size:100% auto;}
body.snow .fixObWrap .no6 {background:url('../images/snow06.png') center no-repeat; width:30px; height:30px; background-size:100% auto;}
body.snow .fixObWrap .no7 {background:url('../images/snow07.png') center no-repeat; width:18px; height:18px; background-size:100% auto;}



.secTitleWrap .hanTit{
	display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
    -webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;
}
.secTitleWrap .hanTit:before,
.secTitleWrap .hanTit:after{display: none;}
.secTitleWrap .hanTit{font-family: 'EB Garamond'; font-size:14px;font-weight:400;letter-spacing:.2em;text-indent: .2em;color:#cccccc;text-align: center; margin-bottom: 20px;}
.secTitleWrap .hanTit > span:not(.ran){position: relative;padding:0 20px;margin:0 19px;white-space: nowrap}
.secTitleWrap .hanTit > span:not(.ran):before,
.secTitleWrap .hanTit > span:not(.ran):after{content:''; position: absolute; left:0; top:50%; margin-top:-1px;width:2px; height:2px;background:#8b6e76;border-radius:50%; display: none;}
.secTitleWrap .hanTit > span:not(.ran):after{left: auto;right:0;}
.secTitleWrap p{font-family: 'AritaBuri';font-size: 27px;color: #000000;text-align: center;margin-top: 13px;line-height: 1.4;letter-spacing:2px; margin-bottom:50px;}
.secTitleWrap.t1 .hanTit{font-size: 14px;letter-spacing:.3em;text-indent: .3em;}
.secTitleWrap.t1 .hanTit:before,
.secTitleWrap.t1 .hanTit:after,
.secTitleWrap.t1 .hanTit > span:not(.ran):before,
.secTitleWrap.t1 .hanTit > span:not(.ran):after{display: none}
.secTitleWrap.t1 .hanTit .ran{letter-spacing:.14em;text-indent: .14em;}
.secTitleWrap .mt{transition-delay: 500ms;transform:translateY(30px);}

.inviteBox{position:relative;font-size: 20px;color: #1f4913;line-height: 1.45;/* background:url(../images/mainBottom_bg.jpg) no-repeat;  */ background:#f8f9f5;background-size:cover;z-index: 1; height:165px;}
.inviteBox:after {display: none; }
.inviteBox .secTitleWrap{position: absolute;top:-10px;left:50%;transform: translateX(-50%);width: 100%;}
.inviteBox .mainText{position: relative; text-align: center; font-family: 'AritaBuri'; padding-top:65px;;}
.inviteBox .mainText p { transition: 3.2s opacity;opacity: 0;transition-delay: 1200ms;}
.inviteBox .stamp {position: absolute; top:-5px;; left:0; width: 100%; text-align: center; z-index:1;  }
.inviteBox .stamp .text {display: block; height:18px; background:url('../images/stampTit.png') center top no-repeat; margin-bottom:8px;; transition: 3.2s opacity;opacity: 0;transition-delay: 1600ms;}
.inviteBox .stamp .img {display: inline-block; vertical-align: top; width:12px; height:21px; background:url('../images/stampTree.png') no-repeat; transition: 3.2s opacity;opacity: 0;transition-delay: 1200ms;}
.inviteBox .secTitleWrap{overflow: hidden}

.mainLoad .inviteBox .mainText p {opacity:1;}
.mainLoad .inviteBox .stamp .text {opacity:1;}
.mainLoad .inviteBox .stamp .img {opacity:1;}

.greetingWrap{text-align:center; padding-top: 100px; background:#fefdfb;}
.greetingWrap .greetingBox{}
.greetingWrap .greetingInner{padding-top: 45px;padding-bottom: 100px;}
.greetingWrap .textBox{font-family: 'AritaBuri';font-size: 25px;color: #222222;line-height: 1.55;}
.greetingWrap .textBox p{margin-bottom: 39px; line-height: 2;}

.greetingWrap .ranBox{position: relative;padding: 37px 0 17px;margin-top: 53px;}
.greetingWrap .ranBox:before,
.greetingWrap .ranBox:after{display: block;content:'';position: absolute; left:0; top:0; width: 100%; height:31px;background-position: 50% 0;background-repeat: no-repeat;}
.greetingWrap .ranBox:before{background-image:url('../images/bg_thx01.png');}
.greetingWrap .ranBox:after{top:auto;bottom:0;height:1px;background-image:url('../images/bg_thx02.png');}
.greetingWrap .ranBox .box{padding: 6px 0;font-size: 22px;color: #4f4d4e}
.greetingWrap .ranBox .box em{font-weight: 600}
.greetingWrap .ranBox .box strong{font-family: 'AritaBuri';font-size: 25px;color: #222222;font-weight: 400;}
.greetingWrap .btns.t1{margin-top: 37px}

.btns{box-sizing:border-box;text-align:center;width: 100%;
	display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
    -webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;
    background:#fff;
    border:1px solid #cacaca; border-radius:15px;
}
.btns.t1{height: 75px; font-size: 19px;color: #000}
.btns.t1.c1{color: #000}
.btns span{position: relative;padding-left: 28px;}
.btns span:before{display: block;content: '';width: 20px;height: 16px;background: url(../images/icon_msg_m.png) no-repeat 0 0; background-size:20px 16px;position: absolute;top:50%;left:0;margin-top: -8px;}
.btns.t1 span.link{padding-left: 34px;}
.btns.t1 span.link:before{width: 25px;height: 14px;background-image: url(../images/icon_link.png);margin-top: -7px; background-size:25px 14px;;}
.btns.t1 span.roughMap{padding-left: 32px;}
.btns.t1 span.roughMap:before{width: 21px;height: 21px;background-image: url(../images/icon_map.png);margin-top: -10px;}
.btns.t1 span.img:before{width: 20px;height: 20px;background-image: url(../images/icon_img.png);margin-top: -7px;}
.btns.t1 span.tel:before{width: 22px;height: 22px;background-image: url(../images/icon_tel2.png);margin-top: -11px;}
.btns.t2{height: 75px;background-color: #f9f0e6;color: #000;font-size: 21px;border-radius: 12px;font-weight: 500}
.btns.t2 span.attend{padding-left: 24px;}
.btns.t2 span.attend:before{width: 16px;height: 19px;background-image: url(../images/icon_attend.png);margin-top: -8px;}

.dayWrap{text-align:center;background: url(../images/day_bg.jpg) no-repeat 50% 0 / cover;}
.dayWrap .dayInner{padding-top: 100px;padding-bottom: 83px;}
.dayWrap .secTitleWrap{margin-bottom: 50px;}
.dayWrap .secTitleWrap .hanTit {color:#c8b1b7;}
.dayWrap .secTitleWrap .hanTit:after{background: #e2d3d7;}
.dayWrap .secTitleWrap .hanTit:before,
.dayWrap .secTitleWrap .hanTit:after{background-color: #e2d3d7;}
.dayWrap .secTitleWrap .hanTit span span {margin:0 2px;}
.dayWrap .dayBox{padding: 0 50px;box-sizing: border-box;margin-bottom: 36px; text-align: center;}

.secTitleWrap .hanTit > span:not(.ran):before, .secTitleWrap .hanTit > span:not(.ran):after {background: #e2d3d7;}

.dayWrap .dayBox p{font-family: 'AritaBuri';color: #222222;font-size: 27px;line-height: 1.4; text-align: center;}
.dayWrap .placeBox{position: relative;padding: 23px 0 22px;margin-bottom: 18px;}
.dayWrap .placeBox:before,
.dayWrap .placeBox:after{display: block;content: '';width: 100%;height: 1px;background:url('../images/bg_thx02.png') no-repeat 50% 50%;position: absolute;top:0;left:0}
.dayWrap .placeBox:after{top: auto;bottom: 0}
.dayWrap .placeBox span{font-size: 21px;color: #b27085;padding-left: 25px;position: relative}
.dayWrap .placeBox span:before{display: block;content: '';width: 16px;height: 19px;background: url(../images/icon_location.png) no-repeat 0 0 / 16px auto;position: absolute;top:50%;left:0;transform: translateY(-50%);}
.dayWrap .calWrap{max-width: 380px;margin: 0 auto}
.dayWrap .calWrap table{width: 100%;table-layout: fixed}
.dayWrap .calWrap th,
.dayWrap .calWrap td{font-family: 'EB Garamond';font-weight: 400;text-align: center;vertical-align: middle}
.dayWrap .calWrap th{font-size: 18px;color: #e2d3d7;height: 80px;}
.dayWrap .calWrap td{font-size: 22px;color: #c8b1b7;height: 49px;}
.dayWrap .calWrap table .active{display:block;position: relative;font-weight: 600;color: #222222;}
.dayWrap .calWrap table .active:after {content:''; position: absolute; left:0; top:-10px; width:100%; height: 9px; background: url(../images/day_point.png) center top no-repeat;}
.dayWrap .calWrap table .active > span{position: relative;z-index: 1}
.dayWrap .calWrap table .active:before{position:absolute;bottom:1px;left:50%;margin-left:-18px;display: none;content: '';width: 36px;height: 15px;background: url(../images/day_point.png) no-repeat 0 0;}

.countWrap{background:url(../images/count_bg.jpg) no-repeat 50% 0 / cover;}
.countWrap .countInner{height: 160px;padding-top: 35px;box-sizing: border-box}
.countList{text-align: center;font-size: 0}
.countList .numWrap,
.countList .numWrap .countDay,
.countList .numWrap .countDay .num,
.countList .numWrap .wr,
.countList .numWrap .col{position:relative;display: inline-block;vertical-align: middle;font-size: 0;font-family: 'EB Garamond';}
.countList .numWrap .countDay{margin-right: 40px}
.countList .numWrap .countDay .num em {position: relative; top:-3px;}
.countList .numWrap .wr p span {position: relative; top:-3px;}
.countList .numWrap .countDay,
.countList .numWrap .wr{min-width: 84px;height: 74px;background: url(../images/bgCount.png?v1) center no-repeat;box-sizing:border-box;padding: 0 10px;
	display: -webkit-inline-box;display: -moz-inline-box;display: -ms-inline-flexbox;display: -webkit-inline-flex;display: inline-flex;
  	-webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
  	-webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;
}
.countList .numWrap .countDay .num,
.countList .numWrap .wr p span,
.countList .numWrap .col{font-size: 48px;color: #f3e9eb}
.countList .numWrap .col{font-size: 45px;width: 40px; background:url('../images/colon.png') center no-repeat; text-indent:-999em;}
.countList .numWrap .txt{position: absolute;bottom: -22px;left:0;width: 100%;text-align: center;font-size: 11px;color: #a2828b;}

.galleryWrap{background:url(../images/gallery_bg.jpg) no-repeat 50% 0 / cover;}
.galleryWrap .galleryInner{padding-top: 97px;padding-bottom: 99px;}
.galleryWrap .galWrap{padding: 0 30px;}
.galleryWrap .galWrap .inner{position: relative;max-width:1280px;margin:0 auto;}
.galleryWrap .galWrap .videoImg{position: absolute;left:0; top:0;max-width:630px;width: calc(50% - 10px); border-radius:20px; overflow:hidden;}
.galleryWrap .galWrap .videoImg img{pointer-events:none;max-width: none;width: 100%}
.galleryWrap .galWrap .videoImg a{position: relative; display: block;}
.galleryWrap .galWrap .videoImg .btnPlay{position: absolute;left:50%;top:50%;margin:-35px 0 0 -28px;width:56px;height:70px;background:url(../images/btn_play.png) no-repeat 50% 50%}
.galleryWrap .galWrap .galList .col ul{margin: 0 -10px;}
.galleryWrap .galWrap .galList:after,
.galleryWrap .galWrap .galList ul:after{display: block;content: '';clear: both;}
.galleryWrap .galWrap .galList .col{box-sizing: border-box;}
.galleryWrap .galWrap .galList .img img{width: 100%}
.galleryWrap .galWrap .galList .col li{float: left;padding: 0 10px;width: 25%;position: relative;margin-bottom:20px;overflow: hidden;z-index: 1;box-sizing: border-box; }
.galleryWrap .galWrap .galList .col li:first-child {margin-left:0;;}
.galleryWrap .galWrap .videoImg + .gallery .galList .col li:first-child {margin-left:50%;}
.galleryWrap .galWrap .galList .col li > a{display: block; position: relative; overflow: hidden;  border-radius:20px;}
.galleryWrap .galWrap .galList .col li > a .img {background-size:cover !important; background-position:center center !important; padding-bottom:125.575%; display: block;}
.galleryWrap .galWrap .galList.hiddenList .col li:first-child {margin-left:0;;}
.galleryWrap .galWrap .videoImg + .gallery .galList.hiddenList .col li:first-child {margin-left:0;;}
.galleryWrap .galWrap .more{margin-top:15px;}

.galleryWrap .galWrap .galList .col li > a:hover .pop{opacity: 1}
.galleryWrap .galWrap .galList .col li > a:hover .hover{opacity: 1;}
.galleryWrap .galWrap .galList .pop{opacity: 0;transition: all 0.5s;position: absolute;top:0;left:0;width: 100%;height:100%;z-index: 1; background:url('../images/gal_hover1.png') center no-repeat; background-size:cover;}
.galleryWrap .galWrap .galList .hover{opacity: 0;transition: all 0.4s 100ms;width: 106px;height:106px;position: absolute;top:50%;left:50%;margin: -53px 0 0 -53px;z-index: 2;background:url('../images/gal_hover2.png') no-repeat 50% 50%;box-sizing: border-box;border: 2px solid #fff;border-radius: 100%;}
.galleryWrap .galWrap.mt{transition-delay: 900ms;transition-duration: 3s;transform:translateY(60px);}

.hiddenList {display: none;}

.more{text-align: center;}
.more span{display: inline-block; vertical-align: top; font-size:19px; color:#c4b2b7; font-weight:500; padding-bottom:55px; background:url('../images/icon_more.png') 50% 100% no-repeat; cursor:pointer;}

.tabIn{display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;width:100%;background:url(../images/bg_thx03.png) no-repeat 50% 0}
.tabIn > a,
.tabIn > button{position:relative;height:89px;text-align:center;vertical-align: middle;font-family: 'EB Garamond';font-size: 21px;color: #bf9f82;width: 100%;text-align: center;white-space: nowrap;box-sizing: border-box;padding-top: 2px;}
.tabIn > a:after,
.tabIn > button:after{display: block;content: '';width: 2px;height: 12px;background:url(../images/tab_semi.png) 50% 100% no-repeat;position: absolute;top:50%;right:0;margin-top: -6px;}
.tabIn > a:last-child:after,
.tabIn > button:last-child:after{display: none}
.tabIn > a.active,
.tabIn > button.active{font-weight: 600;color: #c4b2b7}
.tabIn > a.active span,
.tabIn > button.active span{padding-left: 20px;position: relative;}
.tabIn > a.active span:before,
.tabIn > button.active span:before{display: block;content: '';width: 12px;height: 14px;background:url(../images/icon_star1.png) 50% 100% no-repeat;background-size: 12px auto;position: absolute;top:50%;left:0;margin-top: -8px;}
.tabIn > a span,
.tabIn > button span{transition: padding-left .3s}

.infoWrap{background:#fff;  position: relative;text-align: center; padding:100px 0;}
.infoWrap .infoList {position: relative;  z-index: 10; max-width:1280px; margin:0 auto;}
.infoWrap .infoList .slideList:after {content:''; position: absolute; left:50%; top:0; z-index: 10; margin-left:-960px; width:1920px; height:159px; background:url('../images/slideBg.png') center top no-repeat;}
.infoWrap .infoList .slideList ul li{ max-width:433px; margin:0 auto; padding:0 10px; position: relative;  text-align: left; opacity:.5;}
.infoWrap .infoList .slideList ul li:after{content:''; display: block; clear:both;}
.infoWrap .infoList .slideList ul li div.img {vertical-align: middle; position: relative;margin-bottom: 44px;}

.infoWrap .infoList .slideList ul li .box{position: relative; border-radius:20px; border-bottom-right-radius:0; overflow:hidden; padding-bottom: 38.5%;}
.infoWrap .infoList .slideList ul li .box img {position: absolute;left:0; top:50%; width: 100%; transform:translateY(-50%)}


.infoWrap .infoList .slideList ul li .box{position: relative;}
.infoWrap .infoList .slideList ul li .box:after{display: block;content: '';position: absolute;width: 100%;height:100%;top:0;left:0;background: url(../images/info_hover.png) no-repeat 50% 0 / 100% auto;opacity: 0;transition: opacity 0.6s}
.infoWrap .infoList .slideList ul li .tit{position:absolute;top:50%; left:50%;font-size:22px;color: #fff;font-weight: 700;letter-spacing: 0.5em; font-family: 'AritaBuri';transition: all 0.3s ease-in;
	-webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -sand-transform: translate(-50%, -50%);
    transform:translate(-50%, -50%);
}
.infoWrap .infoList .slideList ul li:hover .box:after{opacity: 0.4}

.infoWrap .infoList .slideList ul li .img img {max-width:100%; vertical-align: middle; width: 100%;}
.infoWrap .infoList .slideList ul li .img .btn {opacity:0; transition:.7s all; transform:translate(0,10px); position: absolute; left:50%; top:50%; margin:-40px 0 0 -110px; width: 220px; height: 80px; text-align: center; line-height: 80px; border:1px solid #fff}
.infoWrap .infoList .slideList ul li .img .btn span {display: inline-block; font-size:16px; color:#fff; font-weight:200; padding-left: 23px; background:url('../images/icoLink.png') left center no-repeat;}
.infoWrap .infoList .slideList ul li .textWrap {margin-bottom:35px; vertical-align: middle;text-align: center;font-size: 21px;color: #000;line-height: 1.5; letter-spacing:-1px; word-break:keep-all; display: none;}
.infoWrap .infoList .slideList ul li a {display: none;}
.infoWrap .infoList .slideList ul li.swiper-slide-active {opacity:1}
.infoWrap .infoList .slideList ul li.swiper-slide-active .textWrap {display: block;}
.infoWrap .infoList .slideList ul li.swiper-slide-active a {display: flex;}
.infoWrap .infoList .swiper-button-next, 
.infoWrap .infoList .swiper-button-prev{z-index:50; position: absolute; left:50%; top:47px; margin-top: 0; margin-left:-250px; width:64px; height:64px; background:url('../images/btnSlidePrev.png') no-repeat; }
.infoWrap .infoList .swiper-button-next{margin-left:190px;  background:url('../images/btnSlideNext.png') no-repeat; }
.infoWrap .secTitleWrap p {color:#000}


.guestBookWrap{background:url('../images/guestbook_bg.jpg') center no-repeat; background-size:cover;}
.guestBookWrap .guestBookInner{padding-top: 97px;padding-bottom: 100px}
.guestBookWrap .secTitleWrap{max-width: 1280px;margin: 0 auto 38px;padding-bottom: 0;border-bottom: 1px solid #e2d3d7 ;}
.guestBookWrap .secTitleWrap p {letter-spacing:0;}

.guestBookWrap .marqWrap{overflow:hidden;height: 63px; }
.guestBookWrap .waveText {margin-bottom: 37px;position: relative;z-index: 1; transition:2s all; /*transform:translate(0,50px); opacity:0;*/  transition-delay:500ms;}
.guestBookWrap .waveText.none{display: none;}
.guestBookWrap .wave{padding-left:40px;display: inline-block;  cursor:pointer; font-size: 0}
.guestBookWrap .wave:first-child{margin-left:0;}
.guestBookWrap .wave:after {content:''; display:block; clear:both;}
.guestBookWrap .wave .img{display: inline-block; width:63px; height:63px; border-radius:50%; overflow:hidden;  vertical-align: middle;}
.guestBookWrap .wave .img span{display: block; position: relative; overflow:hidden;}
.guestBookWrap .wave .img span:after{content:''; position: absolute; left:0; top:0; width:calc(100% - 4px); height:calc(100% - 4px); border:2px solid #2f1f12;  border-radius:50%; display: none; }
.guestBookWrap .wave:hover .img span:after{display: block; }
.guestBookWrap .wave .img img{width: 100%;vertical-align: top; display: block;  width:63px; height:63px; }
.guestBookWrap .wave .txt{display: inline-block; vertical-align: middle;font-family: 'AritaBuri';font-size: 38px;font-weight: 600;color:#222222;margin-left: 11px; white-space:nowrap;letter-spacing:-.05em;}

.atm .waveText {transform:translate(0,0) !important; opacity:1;}
.atm .comWrap {transform:translate(0,0) !important; opacity:1;}

.comWrap {max-width:540px; margin:0 auto; position: relative;z-index: 1;  transition:2s all; /*transform:translate(0,50px); opacity:0;*/  transition-delay:500ms;padding: 0 30px;box-sizing: content-box}
.comWrap .inputWrap {position: relative;margin-bottom:25px;}
.comWrap .inputWrap .in{}
.comWrap .inputWrap .in .user:after{content:''; display:block; clear:both;}
.comWrap .inputWrap .in .user{position: relative; vertical-align: top;}
.comWrap .inputWrap .in .user .selBox { position: relative; z-index: 5;}
.comWrap .inputWrap .in .user .selBox .list{ margin-bottom: 10px; }
.comWrap .inputWrap .in .user .selBox .list:after {content:''; display: block; clear:both;}
.comWrap .inputWrap .in .user .selBox .list li { position: relative; text-align: center; float:right; width:49%}
.comWrap .inputWrap .in .user .selBox .list li:first-child {float:left; }
.comWrap .inputWrap .in .user .selBox .list li label{font-size:19px;font-weight:300;height:75px;color:#a49197;position: relative; cursor:pointer; background:rgba(255,255,255,.5);border-radius: 15px;
	display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
    -webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center; border:1px solid #f5f6f0;
}
.comWrap .inputWrap .in .user .selBox .list li input{position: absolute; left:0; top:0; visibility:hidden}
.comWrap .inputWrap .in .user .selBox .list li.hidden{display: none;}
.comWrap .inputWrap .in .user .selBox .list li .img{display: inline-block; vertical-align: middle;width:42px;border-radius:50%; margin-right:12px;}
.comWrap .inputWrap .in .user .selBox .list li .img img {width:42px; height:42px;}
.comWrap .inputWrap .in .user .selBox .list li input:checked + label {background:#fff; color:#222222;font-weight:500; border:1px solid #222}
.comWrap .inputWrap .in .inputBox {position: relative; background:#fff;padding-right:75px;height: 75px; border:1px solid #e2d3d7; overflow:hidden; vertical-align: top;border-radius: 15px; }
.comWrap .inputWrap .in .inputBox input {width: 100%;vertical-align: top; height: 100%; border:none; padding:0 0 0 26px; background:none; outline:none; font-size:19px; color:#000; font-weight: 300;}
.comWrap .inputWrap .in .inputBox input::-webkit-input-placeholder{color:#222222;}
.comWrap .inputWrap .in .inputBox input::-moz-placeholder{color:#222222;}
.comWrap .inputWrap .in .inputBox input:-ms-input-placeholder{color:#222222;}
.comWrap .inputWrap .in .inputBox input:-moz-placeholder{color:#222222;}
.comWrap .inputWrap .btnComment{position: absolute; right:0;top:0;bottom:0; border-left:1px solid #eceee2;}
.comWrap .inputWrap .btnComment a{font-size: 19px; font-weight: 500; color:#222222;background:#fff;width:75px;height: 100%;text-align: center;
	display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
    -webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;
}
.comWrap .partyCheck .btn,
.comWrap .partyCheck .thxBox,
.comWrap .partyCheck .complete{overflow: hidden;}
.comWrap .partyCheck .btn a,
.comWrap .partyCheck .thxBox{display: block;font-family: 'AritaBuri';font-size: 21px;color:#fff;background:#222222;height: 75px;border-radius: 15px;
	display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
    -webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;
}
.comWrap .partyCheck .thxBox{color:#c4b2b7;background:#fff;}

.contactWrap{background:url(../images/contact_bg.jpg) no-repeat 50% 0 / cover;}
.contactWrap .contactInner{padding-top: 93px;padding-bottom: 101px}
.contactWrap .secTitleWrap{margin-bottom:42px; text-align: center;}
.contactWrap .secTitleWrap.t1 .hanTit{color: #a2828b}
.contactWrap .secTitleWrap p{color: #fff;margin-top: 9px;}
.contactWrap .coupleBox{font-size:0;max-width: 500px;margin: 0 auto;transition:2s all; /*opacity:0; transform:translateY(50px);*/  transition-delay:500ms;text-align: center}
.contactWrap .coupleBox .box{display: inline-block; vertical-align: top; position: relative; width:50%;padding: 0 30px;box-sizing: border-box}
.contactWrap .coupleBox .box .tit{margin-bottom: 9px;}
.contactWrap .coupleBox .box .tit img{height: 10px}
.contactWrap .coupleBox .box .name{font-family: 'AritaBuri';font-size: 25px;color: #fff;font-weight: 400;display: block;margin-bottom: 23px;}
.contactWrap .coupleBox .box.no1 .img:after{content:''; position: absolute; right:-33px;top:50%;margin-top: -5px;width:6px; height:8px; background:url('../images/icon_star2.png') no-repeat;background-size:6px auto;}
.contactWrap .coupleBox .box .imgTxt .img {margin-bottom: 9px;position: relative}
.contactWrap .coupleBox .box .imgTxt .img img { pointer-events:none;}
.contactWrap .coupleBox .box .imgTxt .img a {display: block; position: relative; padding-bottom: 100%; overflow:hidden; border-radius:50%;}
.contactWrap .coupleBox .box .imgTxt .img img {position: absolute; left:0; top:50%; transform:translateY(-50%); width:100%; height:100%; pointer-events:none; }


.contacName a{height: 50px;box-sizing:border-box;border-radius: 12px; background:#f6f2f3;
	display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
    -webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;
}
.contacName  a span{position: relative;font-weight: 500;color: #000000;font-size: 16px;padding-left: 27px;}
.contacName  a span:before{display: block;content: '';width: 17px;height: 17px;background:url('../images/icon_tel.png') no-repeat 0 0;position: absolute;top:50%;left:0;margin-top: -8px;}

.mindWrap{background:#f8f8f8;}
.mindWrap .mindInner{padding-top: 97px;padding-bottom: 100px}
.mindWrap .secTitleWrap{padding-bottom: 0;margin-bottom: 41px;border-bottom: 1px dotted #b7b7b7}
.mindWrap .text{text-align: center;font-family: 'AritaBuri';font-size: 21px;color: #222222;line-height: 1.81;margin-bottom: 40px}
.mindWrap .contBox{border:1px solid #e2e4ea;margin-bottom: 15px}
.mindWrap .contBox .tit{padding:0 0 1px 24px; position: relative; cursor:pointer; height: 74px; background:#edeef1;box-sizing:border-box;
	display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
}
.mindWrap .contBox.active .tit{border-bottom:1px dashed #dbddcf;}
.mindWrap .contBox .tit span{font-size:19px;color:#262f3c; font-weight: 500; padding-left:27px; background:url(../images/mind/mind01_1.png) 0 50% no-repeat;background-size: 16px 16px }
.mindWrap .contBox .tit:after{content:''; position: absolute; right:23px; top:50%; margin-top:-4px;width:12px; height:8px; background:url(../images/mind/mind02-1.png) 0 0 no-repeat;background-size: 12px auto}
.mindWrap .contBox.active .tit:after{transform:rotate(180deg);}
.mindWrap .contBox.active .toggle{display: block;}
.mindWrap .contBox .toggle{display: none; padding:25px 24px 23px;background:#f0f1f3;border-bottom: 1px dashed #d7dae3;}
.mindWrap .contBox .toggle:last-child{border-bottom:0}
.mindWrap .contBox .toggle .info{position: relative; font-size:19px; color:#000;font-weight:500; margin-bottom:22px;
	display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
    -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between;
}
.mindWrap .contBox .toggle .info .bank em{font-weight:300;font-size: 18px;position: relative;margin-left:8px;letter-spacing: -0.02em;}
.mindWrap .contBox .toggle .info .name{font-weight:300;color:#000;font-size:15px;}
.mindWrap .contBox .toggle .info .name em{font-size:19px;color:#000;font-weight:500;}
.mindWrap .contBox .toggle .btn {display:flex; justify-content:center; text-align: center;}
.mindWrap .contBox .toggle .btn button {width:49.02%;border-radius:12px;text-align: center;height:48px;background:#fff;font-size:16px;color:#222;font-weight:500;border:none;}
.mindWrap .contBox .toggle .btn button.no1 {background:#fae14b;}
.mindWrap .contBox .toggle .btn button.no1 span{padding-left:40px;background:url(../images/mind/mind03.png) 0 50% no-repeat;background-size:34px auto;}
.mindWrap .contBox .toggle .btn button.no2 {margin-left:2.04%;}
.mindWrap .contBox .toggle .btn button.no2 span{padding-left:25px;background:url(../images/mind/mind04.png) 0 50% no-repeat;background-size:17px auto;}
.mindWrap .contBox.bride {border:1px solid #ede9ea;margin-bottom: 0}
.mindWrap .contBox.bride .tit {background:#f7f3f4}
.mindWrap .contBox.bride .tit span {color:#734050; background:url(../images/mind/mind01-2.png) 0 50% no-repeat;background-size: 16px 16px;}
.mindWrap .contBox.bride .tit:after {background-image:url(../images/mind/mind02-2.png);}
.mindWrap .contBox.bride .toggle {background:#f2f0f0;border-bottom-color: #ddd6cd}
.mindWrap .contBox.bride.active .tit{border-bottom:1px dashed #ddd6cd;}

 /* locationWrap */
.locationWrap .locationInner{padding-top:97px;}
.locationWrap .secTitleWrap{margin-bottom:44px;}
.locationWrap .secTitleWrap p{margin-top: 8px;}
.locationWrap .mapWrap {position: relative;}
.locationWrap .mapWrap .root_daum_roughmap {width: 100% !important; height:540px !important;}
.locationWrap .mapWrap .root_daum_roughmap .wrap_map {height:540px !important; }
.locationWrap .mapWrap .root_daum_roughmap .wrap_controllers {display: none;}

.addrWrap{padding-bottom: 40px}
.addrWrap .box{height: 91px;
	display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
    -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between;
}
.addrWrap .box:first-child{height: 92px;background: url(../images/bg_thx02.png) no-repeat 50% 100%;}
.addrWrap .addr,
.addrWrap .label{font-family: 'AritaBuri';color: #222222;font-size: 22px;padding-left: 29px;letter-spacing:-.05em;}
.addrWrap .addr{font-weight: 600;background: url(../images/icon_location2.png) no-repeat 0 50%;background-size: 15px auto;}
.addrWrap .label{padding-left: 29px;background: url(../images/icon_guide.png) no-repeat 0 50%;}
.addrWrap .hall{font-size: 21px;color: #888888;font-weight: 400}
.addrWrap .addr + .btn{-webkit-flex-shrink: 0;-ms-flex-negative: 0;flex-shrink: 0;}
.addrWrap .clipboard{width: 20px}

.infoLoca{background-color: #f9f9f9;padding-bottom: 95px;}
.infoLoca .box{border-bottom: 1px solid #e0e0e0;padding-top: 37px;padding-bottom: 35px}
.infoLoca .box:nth-child(1){padding-bottom: 40px}
.infoLoca .box:last-child{border-bottom: 0;padding-bottom: 0}
.infoLoca .tit01{font-size: 22px;font-weight: 600;color: #000;margin-bottom: 12px;letter-spacing:-.03em;} 
.infoLoca .tit02{margin-bottom: 28px;}
.infoLoca .tit02:last-child{margin-bottom: 0}
.infoLoca .tit02,
.infoLoca dl{font-size: 21px;color: #555;line-height: 1.4;}
.infoLoca dd{padding-left: 16px}
.infoLoca dd + dt{margin-top: 28px}
.infoLoca .sym{position: relative;top:3px;}
.infoLoca .btnLoca{display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;margin: 0 -3px;margin-top: 17px;}
.infoLoca .btnLoca .btns{margin: 0 3px;border: 1px solid #eaeaea;height: 57px;width: 33.333%;background: #fff;border-radius: 12px}
.infoLoca .btnLoca .btns span{font-size: 18px;font-weight: 500;color: #000;padding-left: 32px;position: relative}
.infoLoca .btnLoca .btns span:before{display: block;content: '';width: 24px;height: 24px;position: absolute;top:50%;left:0;margin-top: -12px;background: url(../images/ico_nav01.png) no-repeat 0 0;}
.infoLoca .btnLoca .btns.no2 span:before{background-image: url(../images/ico_nav02.png)}
.infoLoca .btnLoca .btns.no3 span:before{background-image: url(../images/ico_nav03.png)}

.thanksWrap{background: url(../images/thanks_bg.jpg) no-repeat 50% 0 / cover;}
.thanksWrap .thanksInner{padding-top: 98px;padding-bottom: 40px;text-align: center}
.thanksWrap .secTitleWrap{margin-bottom: 40px}
.thanksWrap .secTitleWrap .hanTit{color: #866f76}
.thanksWrap p{font-family: 'AritaBuri';font-size: 22px;color: #fff;line-height: 1.55;margin-bottom: 34px;}
.thanksWrap p:last-child{margin-bottom: 0}

.thanksWrap.none {background:#fff; padding:60px 0;}
.thanksWrap.none p {margin:0 !important;}
.thanksWrap.none .thanksInner {padding:0 !important;  margin:0 !important}
.thanksWrap.none .secTitleWrap {display:none;}
.thanksWrap.none .thxTxt {display:none;}
.thanksWrap.none .footer {transform:none; opacity:1; margin:0 !important}
.thanksWrap.none .footer .logo a {display:block; width:144px; height:45px; background:url('../images/thxNone.png') center no-repeat; background-size:144px auto; }
.thanksWrap.none .footer .logo img{display:none;}
.thanksWrap.none .footer .copy {color:#ccc;}

.silence {position: absolute;}

.footer{font-size: 0;margin-top: 64px; opacity:.5}
.footer .logo,
.footer .copy{display: inline-block;vertical-align: middle}
.footer .copy{font-family: 'NotoSerifKr';font-weight: 300;font-size: 14px;color: #866f76}
.footer .logo{margin-right: 18px;}
.footer .logo a{display: block;width: 96px;height: 30px;background:url(../images/logo.png) 0 0 no-repeat;background-size: cover;font-size: 0;color: transparent}

.head.on {top:0;}
.head{position: fixed;left: 0;top: -90px;width: 100%;height: 90px;background:rgba(252,247,249,.9);z-index: 100;transition:1s all;}
.head .inner {position: relative; z-index: 1;}
.head .inner .h1Wrap {position: absolute; left:50px; top:33px;}
.head .inner .h1Wrap h1 > a {font-family: 'AritaBuri';  font-size:18px;font-weight: 900;color:#000000;transition:.3s all;}
.head .inner .btnMenu {position: absolute; right:50px;top:34px;}
.head .inner .btnMenu a{display: inline-block; vertical-align: top; width:25px; height:22px; background:url('../images/icon_menu.png') center no-repeat; text-indent:-999em;}

/* QUICK */
.quickWrap {position: fixed; right:0; top:250px; width: 60px; z-index: 91; text-align: center;  color:#000; font-weight:500 ;font-size:12px;background:#fff;}
.quickWrap .count {width: 100%;position: relative;}
.quickWrap .count .today,
.quickWrap .count .total{height: 57px;line-height: 1.15;position:relative;box-sizing:border-box;
	display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
    -webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;
}
.quickWrap .count .today{padding-top: 7px}
.quickWrap .count .total{padding-bottom: 3px}
.quickWrap .count .today:after{content:''; position: absolute; left:50%; bottom:-1px;  width: 2px; height: 2px; border-radius:50%; background:#aaaaaa;}
.quickWrap .count:after{content:''; position: absolute; left:50%; bottom:0;  width:25px; margin-left:-12px; height: 1px;  background:#f3ebe3;}
.quickWrap .linkList{margin-bottom: 10px;}
.quickWrap .linkList ul li {position: relative;}
.quickWrap .linkList ul li:last-child {border-bottom:none;}
.quickWrap .linkList ul li .ico{display: block;height: 50px;text-indent:-999em;font-size: 0;color: transparent}
.quickWrap .linkList ul li.sound .ico {background:url('../images/btnSoundOff.png') 50% 55% no-repeat;background-size: 20px auto}
.quickWrap .linkList ul li.sound.on .ico {background-image: url('../images/btnSoundOn.png');}
.quickWrap .linkList ul li.tel{display: none;}
.quickWrap .linkList ul li.tel .ico {background:url('../images/btnTel.png') 50% 50% no-repeat;}
.quickWrap .linkList ul li.link .ico {background:url('../images/btnLink.png') 50% 40% no-repeat;background-size: 17px auto}
.quickWrap .linkList ul li.mail{display: none;}
.quickWrap .linkList ul li.mail .ico {background:url('../images/btnMail.png') 50% 50% no-repeat;}
.quickWrap .linkList ul li.mail .ico:hover {background:url('../images/btnMail_hover.png') 50% 50% no-repeat;}
.quickWrap .linkList ul li.kakao .ico{height:60px;background:url('../images/ico_kakao.png') 50% 50% no-repeat;background-color: #e9dbde;background-size: 24px auto}
.quickWrap .linkList ul li .pop {position: absolute; right:65px; top:50%; transform:translate(-10px,-50%); transition:.3s all; white-space:nowrap; background:#fff; opacity:0; visibility:hidden;}
.quickWrap .linkList ul li .pop a {display: block; color:#222222; padding:9px 15px;}
.quickWrap .linkList ul li .pop:after {content:''; position: absolute; right:-5px; top:50%; width: 5px; height:10px; margin-top:-5px; background:url('../images/ico_hover.png') center center no-repeat;}
.quickWrap .linkList ul li.tel .pop {padding:0 15px;}
.quickWrap .linkList ul li.tel .pop a {display: block; padding:8px 0 7px 0;}
.quickWrap .linkList ul li.tel .pop a:last-child { padding-top:5px; border-top: 1px solid #444444;}
.quickWrap .linkList ul li:hover .pop {opacity:1; visibility:visible; transform:translate(0,-50%); }
.quickWrap .audioWrap {position: absolute; visibility:hidden; opacity:0;}
.quickWrap .control a {display: block;height: 50px; text-indent:-999em;font-size: 0;color: transparent}
.quickWrap .control a.btnTop {position: relative;background:url('../images/btnTop.png') 50% 50% no-repeat;}
.quickWrap .control a.btnTop:after {content:''; position: absolute; left:50%; bottom:0; margin-left:-12px; width: 25px; height: 1px; background:#f3ebe3;}
.quickWrap .control a.btnDown {background:url('../images/btnBottom.png') 50% 50% no-repeat;}

body.showYoutube .wrap, 
body.interOpen  .wrap, 
body.showSlide .wrap,
body.gnbOpen .wrap,
body.showImg .wrap{
	-webkit-filter:blur(20px);
	-moz-filter:blur(20px);
	-o-filter:blur(20px);
	-ms-filter:blur(20px);
	filter:blur(20px);
	transition:0.3s filter;
}

body.showYoutube .rbWrap, 
body.interOpen  .rbWrap, 
body.showSlide .rbWrap,
body.gnbOpen .rbWrap,
body.showImg .rbWrap{
	-webkit-filter:blur(10px);
	-moz-filter:blur(10px);
	-o-filter:blur(10px);
	-ms-filter:blur(10px);
	filter:blur(10px);
	transition:0.3s filter;
}

/* interPop */
body.interOpen {overflow-y:hidden;}
body.interOpen .interPop{ opacity:1; visibility:visible; transform:translate(0,0);transition:opacity 1s;}
body.interOpen .interPop .interCont ul li:not(.hidden) {opacity:1 !important;}
body.interOpen .interPop .interCont ul li.active {opacity:1 !important;}
body.interOpen .interPop .popCont .inner .interCont ul li{transition:2s all;}
body.interOpen .interPop .popCont .inner .interCont ul li:nth-child(1) {transition-delay:300ms;}
body.interOpen .interPop .popCont .inner .interCont ul li:nth-child(2) {transition-delay:500ms;}
body.interOpen .interPop .popCont .inner .interCont ul li:nth-child(3) {transition-delay:700ms;}
body.interOpen .ranTxt .ran{opacity:1;}
body.interOpen .mt{transform:translate(0,0) !important; opacity:1 !important;}

.interPop{position: fixed;left:0;top:0;width: 100%;height: 100%;z-index: 500;opacity:0; visibility:hidden;overflow:hidden;overflow-y:auto;background:rgba(56,45,49,.84);background-size: cover}
.interPop .secTitleWrap .hanTit {color:#877277;}
.interPop .secTitleWrap p {color:#fff;}
.interPop .popCont {position: relative; z-index: 10; padding:0 0 0 0; text-align: center;top: 0;bottom: 0;left: 0;right: 0;display: table;width: 100%;height: 100%;table-layout: fixed}
.interPop .popCont .inner{position: relative; padding:120px 0; max-width:1280px; margin:0 auto;}
.interPop .popCont .inner .interCont {padding-top:55px; text-align: left;}
.interPop .popCont .inner .interCont ul{background:url('../images/bg_thx04.png') 50% 0 no-repeat;}
.interPop .popCont .inner .interCont ul li{padding: 48px 50px 43px; transform:translate(0,0);opacity:0; border-top:1px dotted #a89390}
.interPop .popCont .inner .interCont ul li .tit{font-size:22px;color:#c4b2b7;font-weight:600;margin-bottom:13px;}
.interPop .popCont .inner .interCont ul li .tit span{font-family: 'EB Garamond';font-weight:600;position: relative; top:-3px;margin-right:5px;}
.interPop .popCont .inner .interCont ul li .text{font-size:21px;color:#ffffff;font-weight:400;letter-spacing: -0.055em;line-height: 1.55;margin-bottom: 31px}
.interPop .popCont .inner .interCont ul li .text:last-child{margin-bottom: 0}
.interPop .popCont .inner .interCont ul li.hidden {display: none; opacity:1; transition:none;}
.interPop .popCont .inner .interCont ul li.hidden:last-child{background: none}
.interPop .more{margin-top: 47px}
.interPop .popCont .inner .petalList span {position: absolute;background-position: 50% 50%;background-repeat: no-repeat; display: none;}
.interPop .popCont .inner .petalList span.no1 {right:271px;top:174px; width:25px; height:18px; background-image:url('../images/petal1.png');}
.interPop .popCont .inner .petalList span.no2 {right: 3px;top: 511px; width:27px; height:26px; background-image:url('../images/petal2.png');}
.interPop .popCont .inner .petalList span.no3 {left:219px; top:654px; width:31px; height:28px; background-image:url('../images/petal3.png');}
.interPop .popCont .inner .petalList span.no4 {left:556px; top:33px; width:23px; height:28px; background-image:url('../images/petal4.png');}
.interPop .popCont .inner .petalList span.no5 {left:-19px; top:276px; width:24px; height:21px; background-image:url('../images/petal5.png');}

.btnMenuClose,
.popSlide .closeSlide,
.interPop .btnInterClose,
.youtubeBox .btnMovieClose,
.popImg .btnClose,
.popImg .btnDownload{display: inline-block;position: fixed; right:46px; top:46px; width: 30px; height: 30px;text-indent:-999em; background:url('../images/icon_close.png') 50% 50% no-repeat;z-index: 10}

/* popGnb */
body.gnbOpen .popGnb{opacity:1; visibility:visible;}
.popGnb{position: fixed; left:0; top:0; width: 100%; height:100%; z-index:999;background:rgba(56,44,48,.84);background-size:cover;opacity:0; visibility:hidden;transition:.3s all;}
.popGnb .inner {text-align: center; position: absolute; top:50%; transform:translateY(-50%); width: 100%;padding: 0 50px;box-sizing: border-box}
.popGnb .inner .gnbList{max-width: 1280px;margin: 0 auto;position: relative;}
.popGnb .inner .gnbList:after{display: block;content: '';clear: both}
.popGnb .inner .gnbList ul li{margin-bottom: 38px;text-align: center;}
.popGnb .inner .gnbList ul li:last-child {margin-bottom:0;}
.popGnb .inner .gnbList ul li a {font-family: 'EB Garamond'; display: inline-block; vertical-align: top; font-size:18px;color:#fff;white-space: nowrap; letter-spacing:1px;}
.popGnb .inner .gnbList ul li .ko{position: relative;padding-left: 12px;font-size: 17px;margin-left: 8px;white-space: nowrap;  letter-spacing:0;}
.popGnb .inner .gnbList ul li .ko:before{display: block;content: '';width: 1px;height: 12px;background-color: #908685;position: absolute;top:50%;left:0;margin-top: -6px;}


/* popSlide */
body.showSlide{overflow-y:hidden;}
body.showSlide .popSlide{opacity:1; visibility:visible;}
.popSlide{position: fixed;left:0;top:0;width: 100%;height: 100%;z-index: 999;background:rgba(51,39,42,.6);border:none; margin:0;opacity:0; visibility:hidden;transition:1.5s opacity;}
.popSlide .slideList{height:100vh;}
.popSlide .slideList .swiper-slide{height:100vh; text-align: center; font-size: 0;margin:0;}
.popSlide .slideList .swiper-slide .slide{position: relative; height: 100%;}
.popSlide .slideList .swiper-slide .slide:after {content:''; position: absolute; left:0; top:0; width: 100%; height: 100%;}
.popSlide .slideList .swiper-slide .slide img { vertical-align: middle; display: inline-block;height: 100%;object-fit: cover;object-position: 50% 50%;}
.popSlide .swiper-button-prev,
.popSlide .swiper-button-next{width: 64px;height: 64px;position: absolute;top:50%;left:50px;margin-top: -32px;background:url('../images/btnGalBigLeft.png') 0 0 no-repeat;}
.popSlide .swiper-button-next{background-image:url('../images/btnGalBigRight.png');left: auto;right: 50px}
.popSlide .swiper-pagination-fraction{font-family: 'AritaBuri';font-style: italic;font-size: 22px;font-weight: 700;color: rgba(255,255,255,.5);position: absolute;bottom: 43px;width: auto;left:auto;right:50px}
.popSlide .swiper-pagination-fraction .swiper-pagination-current,
.popSlide .swiper-pagination-fraction .swiper-pagination-total{font-family: 'EB Garamond';font-size: 28px;font-weight: 300;color: rgba(255,255,255,.5);font-style: normal;position: relative;top:1px;}
.popSlide .swiper-pagination-fraction .swiper-pagination-current{color: #fff;font-weight: 700;margin-right: 5px;}
.popSlide .swiper-pagination-fraction .swiper-pagination-total{margin-left: 8px}
.popSlide .closeSlide{display: block; background-image:url(../images/icon_close_white.png);}

/* youtubeBox */
body.showYoutube{overflow-y:hidden;}
body.showYoutube .youtubeBox{display: block;}
.youtubeBox{position:fixed; left:0; top:0; width: 100%; height: 100%; z-index: 500;display: none;background:rgba(51,39,42,.6);}
.youtubeBox .in{position: absolute; left:50%; top:50%; width: 100%; max-width:1280px; transform:translate(-50%,-50%);padding:0 20px;}
.youtubeBox .inFrame {position: relative; padding-bottom: 56.25%; background:#000;}
.youtubeBox .inFrame iframe{position: absolute; left:0; top:0;width: 100%; height: 100%;}
.youtubeBox .btnMovieClose{background-image:url(../images/icon_close_white.png);}

body.showImg{overflow-y:hidden;}
body.showImg .popImg{visibility: visible;opacity: 1}
.popImg{position:fixed; left:0; top:0; width: 100%; height: 100%; z-index: 500;visibility:hidden;background:rgba(51,39,42,.6);touch-action: pinch-zoom;opacity: 0}
.popImg .in{position: absolute; left:50%; top:50%; width: 100%;height: 100%; max-width:1280px; transform:translate(-50%,-50%);padding:0 20px;}
.popImg .imageContainer{position: relative;height: 100%;text-align: center;overflow: hidden;display: flex;flex-direction: column;align-items: center;justify-content: center;}
.popImg img{max-width:100%;max-height: 100%;object-fit: cover;object-position: 50% 50%;cursor: move;touch-action: none;}
.popImg .btnClose{background-image:url(../images/icon_close_white.png);}
.popImg .btnDownload{background-image:url(../images/icon_download.png);right: 110px}

.alertPop {position: fixed; left:0; top:0; width: 100%; height: 100%;display: none;z-index: 999;}
.alertPop .bg{ position: fixed; left:0; top:0; width: 100%; height: 100%;  z-index: 1;}
.alertPop .in {position: fixed;left:50%;top:50%;transform:translate(-50%,-50%);text-align: center;width:90%; max-width: 365px;  z-index: 100;border-radius:20px;background:#fff;padding-top: 47px;padding-bottom:36px; }
.alertPop .in .title{font-size: 19px;color:#000;line-height: 1.3;margin-bottom: 20px;}
.alertPop .in .btn a,
.alertPop .in .btn button{display: inline-block;width: 110px;height: 48px;line-height: 48px;background:#e9dbde; font-size: 16px;font-weight: 500;color:#000; border-radius:12px;}


.guestName {font-family: 'Pretendard', serif; display: inline-block; vertical-align: middle; font-weight:500; margin-left: 14px; font-size:16px; line-height:16px; color:#2f1f12; padding-left:23px; background:url('/html/images/tpl/ico_mHeart.png') left center no-repeat; background-size:18px auto;}

.basePop {position: fixed; left:0; top:0; width: 100%; height: 100%;display: none;z-index: 999;  }
.basePop * {font-family: 'Pretendard', serif;}
.basePop .bg{ position: fixed; left:0; top:0; width: 100%; height: 100%;  z-index: 1;}
.basePop .in {position: fixed;left:50%;top:50%;transform:translate(-50%,-50%);text-align: center;width:90%; max-width: 365px;  z-index: 100;background:#fff;padding-top: 43px;padding-bottom:33px; }
.basePop .in .title{font-size: 19px;color:#000000;line-height: 1.3;}
.basePop .in .input {text-align: center; margin:25px 0;}
.basePop .in .input input {width:270px; height:48px; text-align: center; border:1px solid #eaeaea; font-size: 16px; color:#000000;}
.basePop .in .input ::-webkit-input-placeholder {font-size:16px; color:#888888; font-weight:300;}
.basePop .in .btn a,
.basePop .in .btn button{display: inline-block;width: 110px;height: 48px;line-height: 48px;background:#eadbde; font-size: 16px;font-weight: 500;color:#000; border-radius:10px;}


/***************************************************************************************
 Media Query
***************************************************************************************/
@media all and (max-width:1024px) {

.guestName {font-size:13px; line-height:13px;}



	html {-webkit-text-size-adjust: none;}
	.mob {display: inline-block;}
	.m{display: none;}
	.w{display: none;}
	.t{display: block;}
	
	body.showYoutube .wrap, body.showSlide .wrap, body.showImg .wrap {
	    -webkit-filter: blur(6px);
	    -moz-filter: blur(6px);
	    -o-filter: blur(6px);
	    -ms-filter: blur(6px);
	    filter: blur(6px);
	}
	
	.btnMenuClose,
	.popSlide .closeSlide,
	.interPop .btnInterClose,
	.youtubeBox .btnMovieClose,
	.popImg .btnClose,
	.popImg .btnDownload{right:13px; top:14px;background-image:url('../images/icon_close_m.png'); background-size:18px auto;}
	.youtubeBox .btnMovieClose,
	.popSlide .closeSlide,
	.popImg .btnClose{background-image: url(../images/icon_close_white_m.png);}
	.popImg .btnDownload{right: auto;left: 13px;background-image: url(../images/icon_download_m.png);}
	
	.mt{transition-delay:100ms;transform:translateY(30px);transition-duration: 1.5s}
	.mt2{transition-delay:800ms;}
	
	.petalObj{transition-duration: 3s;}
	.petalObj.no1{top: 27%;right: 5%;width: 16px;height: 12px;background-image: url(../images/petal1_m.png);}
	.petalObj.no2{top: 70.5%;right: 4%;width: 18px;height: 17px;background-image: url(../images/petal2_m.png);}
	.petalObj.no3{bottom: 9.5%;right: 34%;width: 20px;height: 18px;background-image: url(../images/petal3_m.png);}
	.petalObj.no4{top:20%;left:17%;width: 15px;height: 19px;background-image: url(../images/petal4_m.png);}
	.petalObj.no5{top:60%;left: 4%;width: 16px;height: 14px;background-image: url(../images/petal5_m.png);}
	
	.fixPetalWrap .obj.no1{right:25px;width: 16px;height: 12px;background-image: url(../images/petal/f_petal1.png);}
	.fixPetalWrap .obj.no2{right:32px;width: 18px;height: 17px;background-image: url(../images/petal/f_petal2.png);}
	.fixPetalWrap .obj.no3{left: 88px;width: 20px;height: 18px;background-image: url(../images/petal/f_petal3.png);}
	.fixPetalWrap .obj.no4{left: 181px;width: 15px;height: 19px;background-image: url(../images/petal/f_petal4.png);}
	.fixPetalWrap .obj.no5{left: 33px;width: 16px;height: 14px;background-image: url(../images/petal/f_petal5.png);}
	
	.interPop .popCont .inner .petalList span{background-size: cover}
	.interPop .popCont .inner .petalList span.no1 {right: 5%;top: 10%;width: 16px;height: 12px;background-image: url(../images/petal1_m.png);}
	.interPop .popCont .inner .petalList span.no2 {right: 3.8%;top: 28.5%;width: 18px;height: 17px;background-image: url(../images/petal2_m.png);}
	.interPop .popCont .inner .petalList span.no3 {left: 15%;top: 34.3%;width: 20px;height: 18px;background-image: url(../images/petal3_m.png);}
	.interPop .popCont .inner .petalList span.no4 {left: 33.5%;top: 1.8%;width: 15px;height: 19px;background-image: url(../images/petal4_m.png);}
	.interPop .popCont .inner .petalList span.no5 {left: 6%;top: 18.5%;width: 16px;height: 14px;background-image: url(../images/petal5_m.png);}
	
	.mainImg{margin: 0 auto; max-height:100%;}
	.mainImg .date{top:17px;left: 14px;width: 38px;height: 38px;}
	.mainImg .date .inner{width: 19px;background-size: 12px 12px;}
	.mainImg .date span{font-size: 10px}

  .mainVisual .titleWrap {position: absolute; left:40px; bottom:80px; text-align: center; color:#fff;box-sizing: border-box;display: table;width: 100%;}
  .mainVisual .titleWrap .in{display: table-cell;vertical-align: middle;text-align: left;}
  .mainVisual .titleWrap .topText {position: relative; display: inline-block;padding-right:25px; font-family: 'AritaBuri';}
  .mainVisual .titleWrap .topText:after,
  .mainVisual .titleWrap .topText .name:after{display: block;content: '';clear: both}
  .mainVisual .titleWrap .topText .tit01,
  .mainVisual .titleWrap .topText .tit02,
  .mainVisual .titleWrap .topText .name > span{float:left;position:relative;z-index: 1;/*writing-mode: vertical-lr;letter-spacing: 0.23em;*/display: block;word-wrap: break-word;overflow-wrap: break-word;text-align: center;}
  .mainVisual .titleWrap .topText .tit01 {width: 0.8em;font-size:13px;font-weight: 100;line-height:1.26;padding-right: 30px;margin-right: 15px;}
  .mainVisual .titleWrap .topText .tit01 .mb {margin-bottom:10px; display: block;}
  .mainVisual .titleWrap .topText .tit01:before{display: block;content: '';background-color: #fff;width:2px;height:0;position: absolute;top:0;right:0;transition: height 1s}
  .mainVisual .titleWrap .topText .tit02 {width: 1.15em;font-size:40px; line-height: 1.02;font-weight: 400; }
  .mainVisual .titleWrap .topText .tit02 em {font-weight: 700;}
  .mainVisual .titleWrap .topText .name{position: absolute;bottom: 0;right: 0}
  .mainVisual .titleWrap .topText .name > span{font-size:15px;font-weight: 400;width: 1.15em;}

  .scroll {bottom:-2px;}

	.inviteBox {font-size: 15px;line-height: 1.35; height:auto; padding-bottom:30px; background:#f6f7f2; background:url('../images/invite_bg_m.jpg') repeat-x; background-size:cover;}
	.inviteBox:after {content:''; position: absolute; left:0; top:-24px; width: 100%; height:25px; background:url('../images/mainRound_m.png') center top no-repeat; background-size:auto 25px; }
	.inviteBox .mainText{padding-top:60px;; }
	.inviteBox .stamp {position: absolute; top:-5px;; left:0; width: 100%; text-align: center; z-index:10;  }
	.inviteBox .stamp .text {display: block; height:18px; background:url('../images/stampTit_m.png') center top no-repeat; background-size:auto 17px; margin-bottom:8px;; transition: 3.2s opacity;opacity: 0;transition-delay: 1600ms;}
	.inviteBox .stamp .img {display: inline-block; vertical-align: top; width:12px; height:21px; background:url('../images/stampTree_m.png') no-repeat; background-size:auto 21px; transition: 3.2s opacity;opacity: 0;transition-delay: 1200ms;}
	.inviteBox .secTitleWrap{overflow: hidden}


	.secTitleWrap .hanTit{font-size: 12px;letter-spacing: .1em;text-indent: .1em;}
	.secTitleWrap .hanTit span:not(.ran){padding: 0px 12px;margin: 0 12px;}
	.secTitleWrap p{margin-top: 8px;font-size: 18px; margin-bottom: 30px;}
	.secTitleWrap.t1 .hanTit{font-size: 11px;letter-spacing: .2em;}
	
  .greetingWrap {padding-top: 50px;}
	.greetingWrap .greetingInner{padding: 0 30px 67px;}
	.greetingWrap .textBox{font-size: 17px;line-height: 1.5;}
	.greetingWrap .textBox p {margin-bottom: 27px;}
	.greetingWrap .ranBox{margin-top: 30px;padding: 20px 0 10px;}
	.greetingWrap .ranBox:before{background-image: url(../images/bg_thx01_m.png);height: 3px;background-size: 100% 3px} 
	.greetingWrap .ranBox:after,
	.dayWrap .placeBox:before, 
	.dayWrap .placeBox:after,
	.addrWrap .box:first-child{background-image: url(../images/bg_thx02_m.png);background-size: auto 1px;background-repeat: repeat-x}
	.greetingWrap .ranBox .box{font-size: 15px;padding: 4px 0;}
	.greetingWrap .ranBox .box strong{font-size: 17px}
	.greetingWrap .btns.t1{margin-top: 25px;}
	
	.btns.t1{font-size: 13px;height: 50px;border-radius: 8px;}
	.btns.t1 span{padding-left: 22px;}
	.btns.t1 span:before{width: 15px;height: 12px;margin-top: -6px;background-image: url(../images/icon_msg_m.png);background-size: cover}
	.btns.t1 span.link{padding-left: 22px;}
	.btns.t1 span.link:before{width: 16px;height: 9px;background-image: url(../images/icon_link_m.png);margin-top: -5px; background-size:16px 9px;}
	.btns.t1 span.roughMap,
	.btns.t1 span.img,
	.btns.t1 span.tel{padding-left: 20px;}
	.btns.t1 span.roughMap:before,
	.btns.t1 span.img:before,
	.btns.t1 span.tel:before{width: 15px;height: 15px;background-image: url(../images/icon_map_m.png);margin-top: -8px;background-size: auto 15px;}
	.btns.t1 span.img:before{background-image: url(../images/icon_img_m.png);}
	.btns.t1 span.tel:before{background-image: url(../images/icon_tel2_m.png);}
	.btns.t2{font-size: 14px;height: 50px;border-radius: 8px;}
	.btns.t2 span.attend{padding-left: 17px}
	.btns.t2 span.attend:before{width: 12px;height: 15px;background-image: url(../images/icon_attend_m.png);margin-top: -7px;background-size: 12px auto}
	
	.dayWrap .secTitleWrap{margin-bottom: 30px;}
	.dayWrap .dayInner{padding:50px 30px 54px;}
	.dayWrap .dayBox{padding: 0;margin-bottom: 24px;}
	.dayWrap .dayBox p{font-size: 18px;line-height: 1.38;}
	.dayWrap .point img{width: 70px}
	.dayWrap .placeBox{padding: 15px 0 14px;margin-bottom: 12px;}
	.dayWrap .placeBox span {padding-left:15px;}
	.dayWrap .placeBox span:before {background-size:12px; width:12px; height:14px;}
	.dayWrap .placeBox span,
	.dayWrap .calWrap th{font-size: 14px}
	.dayWrap .calWrap th{height: 53px;}
	.dayWrap .calWrap td{font-size: 16px;height: 33px;line-height:1.5}
	.dayWrap .calWrap{padding: 0 20px;box-sizing: border-box}
	.dayWrap .calWrap table .active{background-size: 24px auto;background-position:50% 9px}
  .dayWrap .calWrap table .active:after {top:-5px; width:100%; height: 5px; background-size:auto 5px;}


	.dayWrap .secTitleWrap .hanTit span span {margin:0 1px;}


	.countList .numWrap .countDay .num, 
	.countList .numWrap .wr p span{font-size: 34px;}
	.countList .numWrap .col{font-size: 32px;width: 27px; margin-bottom: 0; background:url('../images/colon_m.png') center no-repeat; background-size:3px auto;}
	.countList .numWrap .countDay, 
	.countList .numWrap .wr{height: 50px;min-width: 54px;border-radius: 12px;}
	.countList .numWrap .txt{font-size: 10px;bottom: -15px;}
	.countWrap .countInner{height: 107px;padding-top: 24px;}
	.countList .numWrap .countDay{margin-right: 27px;}
	.countList .numWrap .countDay .num em { top:-2px;}
	.countList .numWrap .wr p span { top:-2px;}
	.countList .numWrap .countDay, .countList .numWrap .wr {background:url('../images/bgCount_m.png?v1') center no-repeat; background-size:54px 50px;}

	
	.galleryWrap .galleryInner{padding-top: 65px;padding-bottom: 65px;}
	.galleryWrap .galWrap .videoImg{position: relative;width: 100%;margin-bottom: 6px;max-width: 100%;}
	.galleryWrap .galWrap .videoImg .btnPlay{width: 80px;height: 80px;background-size: cover;margin:-40px 0 0 -40px;}
	.galleryWrap .galWrap .videoImg + .gallery .galList .col li:first-child{margin-left: 0}
	.galleryWrap .galWrap .galList .col ul{margin: 0 -3px}
	.galleryWrap .galWrap .galList .col li{width: 50%;padding: 0 3px;margin-bottom: 6px}
	.galleryWrap .galWrap .galList .hover{margin: -25px 0 0 -25px;border-width:1px;background-image: url(../images/gal_hover2_m.png);background-size: 12px 12px;width: 50px;height: 50px;}
	.galleryWrap .galWrap .more{margin-top: 17px;}
	
	.more span{padding-bottom: 37px;font-size: 13px;background-image: url(../images/icon_more_m.png);background-size: 30px auto;}
	
	.tabIn{background-image: url(../images/bg_thx03_m.png);background-size: auto 1px}
	.tabIn > a, 
	.tabIn > button{font-size: 14px;height: 60px;}
	
	.infoWrap {padding:75px 0 65px 0; position: relative; overflow:hidden;}
	.infoWrap .title {font-size: 20px; line-height: 20px; padding-bottom: 50px; }
	.infoWrap .infoList {position: relative; padding:0; z-index: 10;}
	.infoWrap .infoList .swiper-wrapper {display:flex;}
	.infoWrap .infoList .slideList {background:none; border-top:none;}
  .infoWrap .infoList .slideList:after {display: none;}
	.infoWrap .infoList .slideList ul li{ padding:0 14px; width:80%; opacity:1;}
	.infoWrap .infoList .slideList ul li:after {content:''; display: block; clear:both;}
	.infoWrap .infoList .slideList ul li div.img {display:block; width:100%;  vertical-align: middle; margin-bottom: 21px;}
	.infoWrap .infoList .slideList ul li .img img {max-width:100%; vertical-align: middle; width: 100%;}
	.infoWrap .infoList .slideList ul li .textWrap {font-size: 13px; margin-bottom: 20px;}
	.infoWrap .infoList .slideList ul li .tit {font-size: 17px;}
	.infoWrap .infoList .slideList ul li .textWrap .txt {font-size: 12px; line-height: 1.5; font-weight:300;}
	.infoWrap .infoList .slideList ul li .textWrap .txt br {display: none;}
	.infoWrap .infoList .slideList ul li {}
	.infoWrap .infoList .swiper-container {overflow:visible;}
	.infoWrap .infoList .swiper-button-next, 
	.infoWrap .infoList .swiper-button-prev{display: none;}



	
	.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin: 0 3.5px;}
	.swiper-container-horizontal>.swiper-pagination-bullets{bottom: 5px;}
	.swiper-pagination-bullet{width: 7px;height: 7px}
	
	.guestBookWrap .guestBookInner{padding: 64px 33px 66px;}
	.guestBookWrap .secTitleWrap{padding-bottom: 0;margin-bottom: 26px}
	.guestBookWrap .waveText{margin-left: -33px;margin-right: -33px;}
	.guestBookWrap .wave .txt{font-size: 26px;margin-left: 8px}
	.guestBookWrap .wave .img{width: 42px;height: 42px}
	.guestBookWrap .wave .img img{width: 42px;height: 42px}
	.guestBookWrap .wave{padding-left:25px;}
	.comWrap{padding: 0}
	.comWrap .inputWrap{margin-bottom: 16px;}
	.comWrap .inputWrap .in{display: block;}
	.comWrap .inputWrap .in .user{width: 100%;margin-bottom: 6px;}
	.comWrap .inputWrap .in .user .selBox .list li{margin: 0;width: 50%}
	.comWrap .inputWrap .in .user .selBox .list li:first-child{padding-right: 3px;}
	.comWrap .inputWrap .in .user .selBox .list li:last-child{padding-left: 3px;}
	.comWrap .inputWrap .in .user .selBox .list li label,
	.comWrap .inputWrap .in .inputBox,
	.comWrap .partyCheck .btn a,
	.comWrap .partyCheck .thxBox{font-size: 13px;height: 51px;border-radius: 9px;}
	.comWrap .inputWrap .in .inputBox{display: block;padding-right: 62px;}
	.comWrap .inputWrap .in .user .selBox .list li .img{width: 30px;border-radius: 100%;overflow: hidden}
	.comWrap .inputWrap .in .user .selBox .list li .img img {width: 30px; height:30px;}
	.comWrap .inputWrap .in .inputBox input{font-size: 13px;padding: 0 0 0 17px}
	.comWrap .inputWrap .in .inputBox input::-webkit-input-placeholder{font-size: 13px}
	.comWrap .inputWrap .in .inputBox input::-moz-placeholder{font-size: 13px}
	.comWrap .inputWrap .in .inputBox input:-ms-input-placeholder{font-size: 13px}
	.comWrap .inputWrap .in .inputBox input:-moz-placeholder{font-size: 13px}
	.comWrap .inputWrap .btnComment a{font-size: 13px;width: 62px}
	.comWrap .partyCheck .btn a,
	.comWrap .partyCheck .thxBox{font-size: 14px;}
	
	.contactWrap{background-image: url(../images/contact_bg_m.jpg);}
	.contactWrap .contactInner{padding: 62px 13px 67px;}
	.contactWrap .secTitleWrap p{margin-top: 5px;}
	.contactWrap .coupleBox .box{padding: 0 20px}
	.contactWrap .coupleBox .box .imgTxt .img{border-radius: 100%;}
	.contactWrap .coupleBox .box .name{font-size: 17px;margin-bottom: 14px;}
	.contactWrap .coupleBox .box .imgTxt .img,
	.contactWrap .coupleBox .box .tit{margin-bottom: 4px;}
	.contactWrap .coupleBox .box.no1 .img:after {right:-24px;}
	.contacName a{height: 36px;border-radius: 8px;}
	.contacName a span{font-size: 11px;padding-left: 18px;}
	.contacName a span:before{width: 12px;height: 12px;margin-top: -7px;background-image: url(../images/icon_tel_m.png);background-size: cover}
	
	.mindWrap .mindInner{padding: 64px 33px 66px;}
	.mindWrap .secTitleWrap {padding-bottom: 0;margin-bottom: 28px;}
	.mindWrap .text{font-size: 14px}
	.mindWrap .contBox{margin-bottom: 10px}
	.mindWrap .contBox .toggle{padding: 16px 16px}
	.mindWrap .contBox .tit span,
	.mindWrap .contBox .toggle .info{font-size: 13px}
	.mindWrap .contBox .toggle .info .bank em{font-size: 12px}
	.mindWrap .contBox .tit{height: 50px;}
	.mindWrap .contBox .tit span{padding-left: 24px;line-height: 1.5;}
	.mindWrap .contBox .toggle .info{margin-bottom: 15px;}
	.mindWrap .contBox .toggle .info .name{font-size: 10px}
	.mindWrap .contBox .toggle .info .name em{font-size: 13px;}
	.mindWrap .contBox .toggle .btn button{font-size: 11px;height: 34px;border-radius: 8px;}
	.mindWrap .contBox .toggle .btn button span{display: inline-block;line-height: 1.4}
	.mindWrap .contBox .toggle .btn button.no1 span{padding-left: 38px;}
	.mindWrap .contBox .toggle .btn button.no2 span{padding-left: 18px;background-image: url(../images/mind/mind04_m.png);background-size: auto 15px}
	
	.locationWrap .locationInner{padding-top: 64px;}
	.locationWrap .secTitleWrap{margin-bottom: 28px;}
	.locationWrap .secTitleWrap p{margin-top: 5px;}
	.locationWrap .mapWrap .root_daum_roughmap {width: 100% !important; height:300px !important;}
	.locationWrap .mapWrap .root_daum_roughmap .wrap_map {height:300px !important; }
	.locationWrap .mapWrap .root_daum_roughmap .wrap_controllers {display: none;}
	
	.locationWrap .addrWrap{padding-left: 33px;padding-right: 33px;padding-bottom: 25px;box-sizing: content-box}
	.addrWrap .addr, 
	.addrWrap .label{font-size: 15px}
	.addrWrap .hall{font-size: 14px}
	.addrWrap .addr{background-size: 12px auto;padding-left: 20px;line-height: 1.3;}
	.addrWrap .box{margin: 0 -33px;padding: 0 33px}
	.addrWrap .box{height: 64px;}
	.addrWrap .box:first-child{height: 65px}
	.addrWrap .clipboard{width: 15px}
	.addrWrap .label{padding-left: 20px;background-image: url(../images/icon_guide_m.png);background-size: 14px auto; min-width:90px;}
	
	.infoLoca {padding-bottom: 62px;}
	.infoLoca .inner{padding: 0 33px;box-sizing: content-box}
	.infoLoca .tit01{font-size: 15px}
	.infoLoca .tit02, 
	.infoLoca dl{font-size: 14px}
	.infoLoca .box{padding-top: 24px;padding-bottom: 21px;}
	.infoLoca .box:nth-child(1){padding-bottom: 25px;}
	.infoLoca .box:nth-child(1) .tit02 {margin-bottom: 12px;}
	.infoLoca .tit02 {margin-bottom: 18px;}
	.infoLoca .btnLoca{margin-top: 12px}
	.infoLoca .btnLoca .btns{height: 40px;border-radius: 8px;}
	.infoLoca .btnLoca .btns span{font-size: 12px;padding-left: 22px;}
	.infoLoca .btnLoca .btns span:before{width: 17px;height: 17px;background-image: url(../images/ico_nav01_m.png);background-size: 17px auto;margin-top: -8.5px;}
	.infoLoca .btnLoca .btns.no2 span:before{background-image: url(../images/ico_nav02_m.png);}
	.infoLoca .btnLoca .btns.no3 span:before{background-image: url(../images/ico_nav03_m.png);}
	.infoLoca dd{padding-left: 10px;}
	.infoLoca dd + dt {margin-top: 19px;}
	
	.thanksWrap{background-image: url(../images/thanks_bg_m.jpg);}
	.thanksWrap .thanksInner{padding-top: 64px;margin-bottom: 30px}
	.thanksWrap .secTitleWrap {margin-bottom: 26px;}
	.thanksWrap p{font-size: 15px;line-height: 1.52;margin-bottom: 23px;}


	.thanksWrap.none {background:#fff; padding:30px 0 50px 0;}
	.thanksWrap.none .footer {transform:none; opacity:1; border-bottom:1px solid #fafafa; padding-bottom:30px;}
	.thanksWrap.none .footer .logo a {width:70px; height:22px; background:url('../images/thxNone.png') center no-repeat; background-size:70px auto; }
	.thanksWrap.none .footer .logo img{display:none;}
	.thanksWrap.none .footer .copy {color:#ccc;}

	
	.footer .copy{font-size: 10px}
	.footer .logo{margin-right: 10px}
	.footer .logo a{width: 64px;height: 20px;background-image:url(../images/logo_m.png)}
	
	.head{height: 49px}
	.head .inner .h1Wrap{top: 14px;left: 25px;}
	.head .inner .h1Wrap h1 > a{font-size: 12px}
	.head .inner .btnMenu{top: 13px;right: 16px}
	.head .inner .btnMenu a{background-size: 20px auto}
	
	.quickWrap {top:auto; bottom:0; width:100%;  font-size:13px; display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;}
	.quickWrap .count,
	.quickWrap .linkList{/*float:left; width: 25%;width:50%;*/width:100%;padding:0;margin-bottom: 0; }
	.quickWrap .count .today, 
	.quickWrap .count .total{display: -webkit-inline-box;display: -moz-inline-box;display: -ms-inline-flexbox;display: -webkit-inline-flex;display: inline-flex;padding: 0;}
	.quickWrap .count .today{padding-right: 10px;margin-right: 6px;text-align: right}
	.quickWrap .count .total{text-align: left}
	.quickWrap .count br,
	.quickWrap .control{display: none}
	.quickWrap .linkList ul{
		display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
    	-webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
    	-webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between;
	}
	.quickWrap .linkList ul > li{width: 100%}
	.quickWrap .count .today:after{bottom: auto;top:50%;margin-top: -1px;left:auto;right:-1px}
	.quickWrap .count:after{width: 1px;}
	.quickWrap .linkList ul > li{position: relative}
	.quickWrap .linkList ul > li:before{position: absolute;display: block;content: '';width: 1px;height: 18px;background-color: #f3ebe3;top:50%;left:0;margin-top: -9px;}
	.quickWrap .linkList ul > li:last-child:before{display: none}
	.quickWrap .count .today, 
	.quickWrap .count .total,
	.quickWrap .linkList ul li .ico,
	.quickWrap .linkList ul li.kakao .ico{height: 50px}
	.quickWrap .linkList ul li.sound .ico,
	.quickWrap .linkList ul li.link .ico{background-position: 50% 50%}
	.quickWrap .linkList .pop{display: none;}
	
	.interPop .popCont .inner{padding: 63px 0}
	.interPop .secTitleWrap p{margin-top: 6px;}
	.interPop .popCont .inner .interCont{padding-top: 0;}
	.interPop .popCont .inner .interCont ul li{padding: 31px 33px 29px;}
	.interPop .popCont .inner .interCont ul li .tit{font-size: 15px;margin-bottom: 8px;}
	.interPop .popCont .inner .interCont ul li .tit .cor{font-size: 16px;top: -2px;}
	.interPop .popCont .inner .interCont ul li .text{font-size: 14px;line-height: 1.52;margin-bottom: 21px;}
	.interPop .more{margin-top: 31px}
	.interPop .popCont .inner .interCont ul,
	.interPop .popCont .inner .interCont ul li{}
	
	.popGnb .inner .gnbList{padding-top: 0;background-size: 66px auto; display:flex; align-items:center; justify-content:center;}
	.popGnb .inner .gnbList ul{float: none; }
	.popGnb .inner .gnbList ul li{margin-bottom: 24px;}
	.popGnb .inner .gnbList ul li a{font-size: 14px;}
	.popGnb .inner .gnbList ul li .ko{font-size: 11px;padding-left: 8px;margin-left: 4px;}
	.popGnb .inner .gnbList ul li .ko:before{height: 10px;margin-top: -5px;}
	
	.popSlide .slideList .swiper-slide .slide{padding: 40px 0;
		display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
	    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;
	    -webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;
	}
	.popSlide .slideList .swiper-slide .slide img{height: auto;width: 100%;}
	.popSlide .swiper-button-prev,
	.popSlide .swiper-button-next{width: 32px;height: 32px;background-size: cover;margin-top: -16px;left:17px}
	.popSlide .swiper-button-next{left:auto;right:17px;}
	.popSlide .swiper-pagination-fraction{font-size: 9px;right: auto;left:0;bottom: 27px;width: 100%;text-align: center}
	.popSlide .swiper-pagination-fraction .swiper-pagination-current, 
	.popSlide .swiper-pagination-fraction .swiper-pagination-total{font-size: 15px}
	
	.youtubeBox .in{padding: 0}
	
	.popImg .in{padding: 45px 0;}
	.popImg .imageContainer{height: 100%;}
	
	.alertPop .in{width: 280px;border-radius:10px;padding-top: 32px;padding-bottom: 25px;}
	.alertPop .in .title {font-size: 13px;margin-bottom: 15px;}
	.alertPop .in .btn a, 
	.alertPop .in .btn button{height: 32px;line-height: 32px;font-size: 12px;width: 80px;border-radius: 8px}
	
	
  .fixObWrap .leafOb:nth-child(1) img{width: 11px;}
	.fixObWrap .leafOb:nth-child(2) img{width: 16px;}
	.fixObWrap .leafOb:nth-child(3) img{width: 15px;}
	.fixObWrap .leafOb:nth-child(4) img{width: 33px;}
	.fixObWrap .leafOb:nth-child(5) img{width: 24px;}
	.fixObWrap .leafOb:nth-child(6) img{width: 19px}


}

/* @media all and (min-width:2300px) {
	.visualBox{min-width:2560px;min-height:1440px;height:auto; width:auto;margin: 0 auto}
} */

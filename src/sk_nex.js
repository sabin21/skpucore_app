UI = {
	load : function(){
		$(window).load(function(){
			UI.fn_main();
			$('body').prop('id', 'skrollr-body');
			$('body').addClass('page_active');
			custom_select_init();

			var s = skrollr.init({
				forceHeight: false,
				 mobileCheck: function(){
					  if((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
						   // mobile device
					  }
				 }
			});			
		});
	},

	ready : function(){
		$(document).ready(function(){
			UI.fn_fullpage_resize();
			UI.fn_header();
			UI.fn_aside();
			UI.fn_footer();
			if(!$('#wrap').hasClass('main')){
				UI.fn_page_prograss();
			}
			UI.fn_page_navi();
			UI.fn_common_effect();
			UI.fn_to_top();
			UI.fn_history();
			UI.fn_product_tabs();
		});
	},

	fn_header : function (){
		var header = $('#header');
		var gnb = $('#gnb');

		gnb.on('mouseover focusin',function(){
			header.addClass('open');
		});
		gnb.on('mouseleave focusout',function(){
			header.removeClass('open');
		});

		var lang = header.find('.langs');
		var lang_opener = header.find('.lang_now');

		lang_opener.on('click',function(){
			lang.toggleClass('open');
		});
	},

	fn_footer : function (){
		var footer = $('#footer');
		var fselect = footer.find('.fselect');
		var family_site_opener = fselect.find('.brna');

		family_site_opener.on('click',function(){
			fselect.toggleClass('open');
		});

		fselect.on('focusout',function(){
			fselect.removeClass('open');
		});

		$(".fselect .brna").click(function (){
			$(this).next("ul").animate({height:"toggle"},300);
			return false;
		});
		$(".fselect ul li a").click(function(){
			$(".fselect ul").css("display","none");
		});
		$(".fselect ul li:last-child a").each(function(){
			$(this).bind({
				"focusout":function(){
					$(".fselect ul").animate({height:"toggle"},300);
					return false;
				}
			});
		});
	},

	fn_aside : function (){
		var aside = $('#aside');
		var toggle_button = aside.find('.btn_close');
		var tabs = aside.find('.tabs a');

		tabs.each(function(i){this.num = i});
		tabs.on('click',function(){
			if (this.num == 1){
				aside.addClass('sec2');
			}else {
				aside.removeClass('sec2');
			}
			aside.addClass('open');
		});

		toggle_button.on('click',function(){
			if (aside.hasClass('open')){
				aside.removeClass('sec2');
				aside.removeClass('open');
			}else {
				aside.addClass('open');
			}
		});

		var contact_us = aside.find('.contact_us').children();
		var contact_us_opener = aside.find('.contact_us > li > a');

		contact_us_opener.on('click',function(){
			var parent = $(this).parent();

			if (parent.hasClass('on')){
				parent.removeClass('on');
			}else {
				contact_us.removeClass('on');
				parent.addClass('on');
			}
		});
	},	

	fn_fullpage_resize : function (){
		var resize_objs = document.querySelectorAll('.fullsize');
		if (resize_objs.length <= 0){return;}

		var ticking = false;

		var resizing = function (){
			Array.prototype.forEach.call(resize_objs, function(element){
				//element.style.width = window.innerWeight + 'px';
				element.style.height = window.innerHeight + 'px';
			});
		};	

		window.addEventListener("resize", function(e) {
			if (!ticking) {
				requestFrame(function (){
					resizing();
					ticking = false;
				});
				ticking = true;
			}
		},false);

		resizing();

		setTimeout(function(){resizing();},100);
	},

	fn_page_prograss : function (){
		var prograss_bar = document.querySelector('#page_prograss em');
		var ticking = false;

		var wrap = document.querySelector('#wrap');
		var html = document.querySelector('html');

		var prograss = function (e){
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			var bar_height = ((scrollTop + window.innerHeight) / html.scrollHeight ) * 100;
			prograss_bar.style.height = bar_height+'%';
		};

		window.addEventListener('scroll', function(e) {
			if (!ticking) {				
				requestFrame(function (){
					prograss(e);
					ticking = false;
				});
				ticking = true;
			}
		},false);

		prograss();
	},

	fn_to_top : function (){
		var top_btn = $('.btn_to_top');
		top_btn.on('click',function(){
			$('html, body').stop().animate({'scrollTop': 0 }, 800 , 'easeInOutExpo');
		});
	},

	fn_page_navi : function (){
		var navi = $('.navigator');
		if (navi.length <= 0){return;}

		var navi_btn = navi.find('li');
		var ticking_scroll = false;

		var html = document.querySelector('html');
		var section = document.querySelectorAll('.navi_section'); 

		var isElementInViewport = function (el) {
			if (typeof jQuery === "function" && el instanceof jQuery) {
				el = el[0];
			}
			var rect = el.getBoundingClientRect();
			return (
				(rect.top <= 0 && rect.bottom >= 0) ||
				(rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight) ) ||
				(rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
			);
		}

		var scroll = function (e){

			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

			if (scrollTop  >= window.innerHeight){
				navi.addClass('active');
			}else {
				navi.removeClass('active');
			}

			for (var i = 0 ; i < section.length ; i++ ){
				if (i == section.length - 1 ){
					if (scrollTop  >= section[i].offsetTop){
						navi_btn.eq(i).addClass('on');
					}else {
						navi_btn.eq(i).removeClass('on');
					}
				}else {
					if (scrollTop  >= section[i].offsetTop && scrollTop  < section[i + 1].offsetTop ){
						navi_btn.eq(i).addClass('on');
					}else {
						navi_btn.eq(i).removeClass('on');
					}
				}
			}
		};

		navi_btn.each(function(i){this.num = i});
		navi_btn.on('click',function(){
			$('html, body').stop().animate({'scrollTop':  section[this.num].offsetTop + 1 }, 800, 'easeInOutExpo');
		});

		window.addEventListener('scroll', function(e) {
			if (!ticking_scroll) {				
				requestFrame(function (){
					scroll(e);
					ticking_scroll = false;
				});
				ticking_scroll = true;
			}
		},false);
	},


	fn_main : function (){
		var main = $('.main_contents');
		if (main.length <= 0) return;

		/* main slider */

		function slider_active (){
			var slider = main.find('.section1 .slider_wrap').children();
			var navi = main.find('.section1 .slider_control .spot').children();
			var max = slider.length;
			var idx = 0;
			var si = null;
			var st_in = null;
			var st_re = null
			var auto_time = 10000;
			var restart_time = 1000;

			var mov = function (next){
				slider.eq(idx).removeClass('active');
				navi.eq(idx).removeClass('on');		

				navi.eq(next).addClass('on');
				st_in = setTimeout(function(){
					slider.eq(next).addClass('active');
				},800);

				idx = next;
			};

			var play = function (){
				si = setInterval(function(){

					if (idx >= max - 1){
						mov(0);
					}else {
						mov(idx + 1);
					}
					
				},auto_time);
			};

			var replay = function (){
				st_re = setTimeout(function(){
					play();
				},restart_time);
			};

			var stop = function (){
				clearInterval(si);
				clearTimeout(st_in);
				clearTimeout(st_re);
			};

			navi.each(function(i){this.num = i});
			navi.on('click',function(){
				if (idx == this.num) return;
				stop();
				mov(this.num);
				replay();
			});
			
			play();
			slider.eq(0).addClass('active');
			navi.eq(0).addClass('on');
		};

		slider_active();
		

		function fixed_action(){
			var ticking_scroll = false;
			var ticking_wheel  = false;
			var wrap = document.querySelector('#wrap');
			var html = document.querySelector('html');
			var lastScrollTop = 0;
			
			var section1 = document.querySelector('.section1'); 
			var section2 = document.querySelector('.section2'); 
			var section3 = document.querySelector('.section3'); 
			var section4 = document.querySelector('.section4'); 
			var sec3_inner1 = document.querySelector('.section3 .inner1');  
			var sec3_inner2 = document.querySelector('.section3 .inner2');  
			var sec3_inner3 = document.querySelector('.section3 .inner3');  

			var sec3_fixed_box = main.find('.section3 .fixed_box');
			var sec4_fixed_box = main.find('.section4 .fixed_box');

			var ani_number = $('#ani_number');
			var ani_unite = $('#ani_unite');

			var one1 = true;
			var one2 = true;
			var one3 = true;

			var scroll = function (e){				

				var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

				//console.log(scrollTop);

				/*section3*/
				if (scrollTop >= section3.offsetTop && (scrollTop + window.innerHeight) <= (section3.scrollHeight + section3.offsetTop)){
					sec3_fixed_box.addClass('fixed');
				}else {
					sec3_fixed_box.removeClass('fixed');
				}

				if ((scrollTop + window.innerHeight) >= (section3.scrollHeight + section3.offsetTop)){
					sec3_fixed_box.addClass('bottom');
				}else {
					sec3_fixed_box.removeClass('bottom');
				}

				var change_value = 300;

				if ( (scrollTop + change_value) >= (section3.offsetTop + sec3_inner1.offsetTop) && (scrollTop + change_value) <= (section3.offsetTop + sec3_inner1.offsetTop + sec3_inner1.clientHeight)  ){
					if (one1){
						var si_counter1 = 4; 
						ani_number.text(si_counter1);
						ani_unite.text('Âµm');						
						numberCountingEffect('#ani_number',300);
						one1 = false;
					}					
				}else {
					one1 = true;
				}

				if ( (scrollTop + change_value) >= (section3.offsetTop + sec3_inner2.offsetTop) && (scrollTop + change_value) <= (section3.offsetTop + sec3_inner2.offsetTop + sec3_inner2.clientHeight)  ){
					if (one2){
						var si_counter1 = 77000; 
						ani_number.text(si_counter1);
						ani_unite.text('m');
						numberCountingEffect('#ani_number',4);
						one2 = false;
					}
				}else {
					one2 = true;
				}

				if ( (scrollTop + change_value) >= (section3.offsetTop + sec3_inner3.offsetTop) && (scrollTop + change_value) <= (section3.offsetTop + sec3_inner3.offsetTop + sec3_inner3.clientHeight)  ){
					if (one3){
						var si_counter1 = 1400; 
						ani_number.text(si_counter1);
						ani_unite.text('mm');
						numberCountingEffect('#ani_number',77000);
						one3 = false;
					}
				}else {
					one3 = true;
				}

				/*section4*/

				if (scrollTop >= section4.offsetTop && (scrollTop + window.innerHeight) <= (section4.scrollHeight + section4.offsetTop)){
					sec4_fixed_box.addClass('fixed');
				}else {
					sec4_fixed_box.removeClass('fixed');
				}

				if ((scrollTop + window.innerHeight) >= (section4.scrollHeight + section4.offsetTop)){
					sec4_fixed_box.addClass('bottom');
				}else {
					sec4_fixed_box.removeClass('bottom');
				}
			};

			window.addEventListener('scroll', function(e) {
				if (!ticking_scroll) {
					requestFrame(function (){
						scroll(e);
						ticking_scroll = false;
					});
					ticking_scroll = true;
				}
			},false);

			var Ismove = true;
			var IsSecIdx = 0;
			var CurrentIdx = 0;

			var isElementInViewport = function (el) {
				if (typeof jQuery === "function" && el instanceof jQuery) {
					el = el[0];
				}
				var rect = el.getBoundingClientRect();
				return (
					(rect.top <= 0 && rect.bottom >= 0) ||
					(rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight) ) ||
					(rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
				);
			}

			window.addEventListener('wheel', function(e) {

				if ( isElementInViewport(section3) ){

					e.preventDefault();

					if (e.deltaY < 0){

						if (Ismove){
							Ismove = false;

							if (Edge_Check()){
								document.body.scrollTop -= 2;
							}else {
								html.scrollTop -= 2;
							}

							var postion = 0;

							if (isElementInViewport(sec3_inner1) && !isElementInViewport(sec3_inner2) ){
								postion = sec3_inner1.offsetTop + section3.offsetTop - document.documentElement.clientHeight - 1;
								console.log('up : inner1');
							}else if (isElementInViewport(sec3_inner2) && !isElementInViewport(sec3_inner3) ){
								postion = sec3_inner1.offsetTop + section3.offsetTop;
								console.log('up : inner2');
							}else if (isElementInViewport(sec3_inner3) && !isElementInViewport(section4) ){
								postion = sec3_inner2.offsetTop + section3.offsetTop;
								console.log('up : inner3');
							}else if (isElementInViewport(section4) && isElementInViewport(sec3_inner3)){
								postion = sec3_inner3.offsetTop + section3.offsetTop;
								console.log('up : section4');
							}
							

							$('html, body').stop().animate({'scrollTop':  postion }, 800, 'easeInOutExpo',function (){
								Ismove = true;
							});
						}

					}
					else if (e.deltaY > 0){
						if (Ismove){
							Ismove = false;

							if (Edge_Check()){
								document.body.scrollTop += 2;
							}else {
								html.scrollTop += 2;
							}

							var postion = 0;

							if (isElementInViewport(section2) && isElementInViewport(sec3_inner1) ){
								postion = sec3_inner1.offsetTop + section3.offsetTop;
								console.log('down : inner1');
							}else if (!isElementInViewport(section2) && isElementInViewport(sec3_inner1) ){
								postion = sec3_inner2.offsetTop + section3.offsetTop;
								console.log('down : inner2');
							}else if (!isElementInViewport(sec3_inner1) && isElementInViewport(sec3_inner2) ){
								postion = sec3_inner3.offsetTop + section3.offsetTop;
								console.log('down : inner3');
							}else if (isElementInViewport(sec3_inner3) ){
								postion = section4.offsetTop + 1;
								console.log('down : section4');
							}

							$('html, body').stop().animate({'scrollTop':  postion }, 800, 'easeInOutExpo',function (){
								Ismove = true;
							});
						}						
					}					
				}
				
			}, { passive: false } );
		};

		fixed_action();


		
		function main_video(){
			var ticking_resize = false;
			var video_obj = document.getElementById('main_video');
			
			function video_resize(){				
				var video = $(video_obj);
				var actualRatio = video_obj.videoWidth/video_obj.videoHeight;
				var targetRatio = video.width()/video.height();
				var adjustmentRatio = targetRatio/actualRatio;
				var scale = actualRatio < targetRatio ? targetRatio / actualRatio : actualRatio / targetRatio;
				video.css('-webkit-transform','scale(' + scale  + ')');
			};			

			window.addEventListener("resize", function(e) {				
				if (!ticking_resize) {
					requestFrame(function (){
						video_resize();
						ticking_resize = false;
					});
					ticking_resize = true;
				}
			},false);

			video_resize();
			setTimeout(function(){
				video_resize();
			},200);
		};


		if ( $('#main_video').length > 0 ){
			main_video();
		}

		var filter = "win16|win32|win64|mac|macintel"; 
		if ( navigator.platform ) { 
			if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
				//mobile ë¶„ê¸°ì²˜ë¦¬
				var m_obj = $('.main_contents .section1');
				m_obj.addClass('mobile');
			}
		}

	},

	fn_common_effect : function (){
		var objs = document.querySelectorAll('.common-effect');
		if (objs.length <= 0){return;}

		var ticking = false;
		var v_h = 150;

		var isElementInViewport = function (el) {
			if (typeof jQuery === "function" && el instanceof jQuery) {
				el = el[0];
			}
			var rect = el.getBoundingClientRect();
			return (
				(rect.top <= 0 && rect.bottom >= 0) ||
				(rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && (rect.top + v_h) <= (window.innerHeight || document.documentElement.clientHeight) ) ||
				(rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
			);
		}

		var loop = function (e){
			Array.prototype.forEach.call(objs, function(element){
				if (isElementInViewport(element)) {
					element.classList.add("ani-active");
				}
			});
		};		

		window.addEventListener('scroll', function(e) {
			if (!ticking) {
				requestFrame(function (){
					loop(e);
					ticking = false;
				});			
				ticking = true;
			}
		},false);


		loop();
	},

	fn_history : function (){
		if ($('.sk_nexilis_wrap').length <= 0) return;

		var history_wrap = $('.sk_nexilis_wrap .section4');
		var navi = history_wrap.find('.history_navi > a');
		var prev = history_wrap.find('.btn_prev');
		var next = history_wrap.find('.btn_next');
		var idx = 0;

		prev.bind('click',function(){
			if (idx > 0 ){
				history_wrap.removeClass('year' + (idx + 1));
				idx -= 1;
				history_wrap.addClass('year' + (idx + 1));
			}
		});	

		next.bind('click',function(){
			if (idx < 17 ){
				idx += 1;
				history_wrap.addClass('year' + (idx + 1));
			}
		});
		
		navi.each(function(i){this.num = i});
		navi.on('click',function(){
			var select_num = this.num;
			navi.each(function(i){
				if (i <= select_num ){
					history_wrap.addClass('year' + (i + 1));	
				}else {
					history_wrap.removeClass('year' + (i + 1));
				}
			});
			idx = this.num;
		});
	},
		
	fn_product_tabs : function (){
		if ($('.sk_product_wrap').length <= 0) return;

		var sec2 = $('.sk_product_wrap .section2');
		var sec3 = $('.sk_product_wrap .section3');
		var tabs = sec2.find('.tabs').children();
		
		tabs.each(function(i){this.num = i});
		tabs.on('click',function(){
			sec2.removeClass('step1 step2 step3 step4 step5 step6');
			sec3.removeClass('step1 step2 step3 step4 step5 step6');
			sec2.addClass('step' + (this.num + 1));
			sec3.addClass('step' + (this.num + 1));
		});
	},

}

UI.load();
UI.ready();

var Layer_OPEN = function (obj){
	$('html').addClass('fixed');
	$(obj).addClass('open');
};

var Layer_CLOSE = function (obj){
	$('html').removeClass('fixed');
	$(obj).removeClass('open');
};

var open_popup = function (url){
	var popupWidth = 700;
	var popupHeight = 600;

	var popupX = (window.screen.width / 2) - (popupWidth / 2);
	var popupY= (window.screen.height / 2) - (popupHeight / 2);

	window.open(url, '', 'status=no, height='+popupHeight+', width='+popupWidth+', left='+ popupX + ', top='+ popupY);
};

//ëŒ€ìƒ ê°’ì˜ íƒ€ìž…ì´ String í˜• ì¼ë•Œ
String.prototype.getComma = function getComma()
{
	 var reg = /(^[+-]?\d+)(\d{3})/;   // ì •ê·œì‹
	 var num = this;

	 while (reg.test(num)) {
	 	num = num.replace(reg, '$1' + ',' + '$2');
	 }
	return num;
}

//ëŒ€ìƒ ê°’ì˜ íƒ€ìž…ì´ Number í˜• ì¼ë•Œ
Number.prototype.getComma = function getComma()
{
	 var reg = /(^[+-]?\d+)(\d{3})/;   // ì •ê·œì‹
	 var num = this + '';// ìˆ«ìžë¥¼ ë¬¸ìžì—´ë¡œ ë³€í™˜

	 while (reg.test(num)) {
	 	num = num.replace(reg, '$1' + ',' + '$2');
	 }
	return num;
}

var numberCountingEffect = function (tagID, from, t){
	var time = t;	
	if (time == null){ time = 500}
		
	$(tagID).each(function () {
		var mantissa = 0;
		var orig = $(this).text();
		if (orig.indexOf('.')>-1) {
			mantissa = orig.substring(orig.indexOf('.'))
		}			
		if (mantissa == '0'){			
			mantissa = '';
		}

		$(this).prop('Counter',from).animate({ Counter: $(this).text()}, {
			duration: time,
				easing: 'swing',
			step: function (now) {
				
				$(this).text(Math.floor(now).getComma() + mantissa);
			}
		});
	});
}

var active_number_counting = function (check, objs){
	var ticking = false;
	var ones = true;

	var isElementInViewport = function (el) {
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}
		var rect = el.getBoundingClientRect();
		return (
			(rect.top <= 0 && rect.bottom >= 0) ||
			(rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight) ) ||
			(rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
		);
	}

	window.addEventListener('scroll', function(e) {
		if (!ticking) {
			requestFrame(function (){

				if (isElementInViewport(check) && ones){
					ones = false;

					objs.each(function(i){
						var c_num =  parseInt( $(this).text() );
						var s_num = 0;
						if (c_num < 1000){
							s_num = 500;
						}
						numberCountingEffect($(this), s_num, 1500 );
					});
				}
				
				ticking = false;
			});			
			ticking = true;
		}
	},false);
	
};

var requestFrame = function() { // requestAnimationFrame cross browser
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(func) {
			window.setTimeout(func, 1000 / 50);
		}
	);
}()


var Edge_Check = function(){
	return /Edge\/\d./i.test(navigator.userAgent);          
}




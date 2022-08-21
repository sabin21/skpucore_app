
import '../public/css/swiper-bundle.min.css';
import '../public/css/pucore_common.css';

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Scrollbar from 'smooth-scrollbar';

const $ = require( "jquery" );

window.onload = function(){

  const commonUI = {
    load : function(){
      $(window).on('load',function(){
        fn_lang();		
      });
    },
    fn_lang : jQuery(function (e) {
      //function t(t) {
      //    e(t).on("click", function (t) {
      //        t.preventDefault();
      //        e(this).parent().fadeOut()
      //    })
      //}
      e(".dropdown-toggle").on('click',function () {
          var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
          e(".button-dropdown .dropdown-menu").hide();
          e(".button-dropdown .dropdown-toggle").removeClass("open");
          if (t) {
              e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown")
              .children(".dropdown-toggle").addClass("open")
          }
      });
      e(document).on("click", function (t) {
          var n = e(t.target);
          if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
      });
      e(document).on("click", function (t) {
          var n = e(t.target);
          if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("open");
      });
    }),
  }
  commonUI.load();

  $(function() {
    var Accordion = function(el, multiple) {
      this.el = el || {};
      this.multiple = multiple || false;
      
      var dropdownlink = this.el.find('.mo-depth1-wrap');
      dropdownlink.on('click',
                      { el: this.el, multiple: this.multiple },
                      this.dropdown);
    };
    
    Accordion.prototype.dropdown = function(e) {
      var $el = e.data.el,
          $this = $(this),
          $next = $this.next();
      
      $next.slideToggle();
      $this.parent().toggleClass('active');
      
      if(!e.data.multiple) {
        $el.find('.mo-depth2-wrap').not($next).slideUp().parent().removeClass('active');
      }
    }    
    var accordion = new Accordion($('#mo-accordian'), false);
  });

  (function asideActive(){
    var asideMenu = $('aside') ;
    var btnBurger = $('.btn-burger');
    btnBurger.on('click', function(){
      asideMenu.toggleClass('active');
      btnBurger.toggleClass('open');
      $('.btn-lang').toggleClass('dark');
      $('.btn-lang-wrap .dropdown-menu').toggleClass('dark');
      $('.header .logo').toggleClass('dark');
    });
  })();

//-------------------------

  gsap.registerPlugin(ScrollTrigger);

  const scroller = document.querySelector('.page-wrap');
  let bodyScrollBar = Scrollbar.init(scroller, { damping: 0.1, delegateTo: document });
  bodyScrollBar.setPosition(0, 0);
  bodyScrollBar.track.xAxis.element.remove();

  ScrollTrigger.scrollerProxy(".page-wrap", {
      scrollTop(value) {
        if (arguments.length) {
          bodyScrollBar.scrollTop = value;
        }
        return bodyScrollBar.scrollTop;
      }
  });
  bodyScrollBar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: scroller });

//-------------------------

var siteHeader = $('.header');
var gnbMenu = $('.gnb-menu');

gnbMenu.on('mouseenter focusin', ()=>{
  siteHeader.addClass('gnb-open');
});
gnbMenu.on('mouseleave focusout', ()=>{
  siteHeader.removeClass('gnb-open');
});

const showAnim = gsap.from('.header', { yPercent: -140, paused: true, duration: 0.2 }).progress(1);

ScrollTrigger.create({
  start: "top top",
  end: 'max',
  onUpdate: (self) => {
    self.direction === -1 ? (()=>{ 
      showAnim.play();
    })()  : (()=>{ 
      showAnim.reverse();
    })()
  }
});

ScrollTrigger.create({
  trigger:".page-wrap",
  start: "top -20%",
  end: 'max',
  toggleClass: {targets:siteHeader, className:'scrollup'},
  scrub:true
});


//-------------------------

function hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
};
let bodyClass = document.body; 
if(hasClass(bodyClass, 'with-hero-img')){
  initSubHero();
}

function initSubHero(){

  const heroImgWrap = document.querySelector('#page-head-front');
  const heroKorTitle = document.querySelector('.title-kor');
  const heroBackImg = document.querySelector('.page-hero-img-wrap .bg-img');

  const headTL = gsap.timeline();
  const koTitleTL = gsap.timeline();
  const heroBgTL = gsap.timeline();
  
  ScrollTrigger.create({
    trigger:".page-hero-wrap",
    pin:".page-hero-wrap",
    start:"top top",
    end:"+=700",
    scroller: scroller,
    pinType: 'transform',
  });

  headTL
  .to(heroImgWrap, { 
    clipPath:'polygon(0 0, 100% 0, 100% 0%, 0% 0%)', 
    scrollTrigger:{
      trigger:".page-wrap",
      start:"top top",
      end:"+=500",
      scrub:true
    }
  });

  koTitleTL
  .to(heroKorTitle, { 
    opacity: '1', bottom: 200,
    scrollTrigger:{
      trigger:".page-wrap",
      start:"top top",
      end:"+=500",
      scrub:true
     }
  });

  heroBgTL
  .to(heroBackImg, {
    scale:1.4,
    scrollTrigger:{
      trigger:".page-wrap",
      start:"top top",
      end:"+=2000",
      scrub:true
    }    
  });
  
}

//------------------------
// Product - General

if($('#product-general-wrap').length > 0){
  $('#product-general-wrap').load("product_general_content.html #product-general-mobility");
  generalClick();  
}
function generalClick(){
  $('#btn-product-general-mobility').on('click', function(){
    $('#product-general-wrap').load("product_general_content.html #product-general-mobility");
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
  });
  $('#btn-product-general-furniture').on('click', function(){
    $('#product-general-wrap').load("product_general_content.html #product-general-furniture");
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
  });
  $('#btn-product-general-insulator').on('click', function(){
    $('#product-general-wrap').load("product_general_content.html #product-general-insulator");
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
  });
  $('#btn-product-general-case').on('click', function(){
    $('#product-general-wrap').load("product_general_content.html #product-general-case");
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
  });
}
$('.product-search-wrap .search-btn-bar').on('click', function(){
  $('.search-body').toggleClass('active');
});

}; // End load function

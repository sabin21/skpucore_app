import "./styles/index.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
const $ = require( "jquery" );
import YTPlayer from "yt-player";

//-----------------------------------------
// 사파리 브라우저에서 WebGL 부하가 많이 걸리므로 사파리에서만 reflector객체 삭제
var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
if ((is_chrome)&&(is_safari)) { is_safari = false; }
//-----------------------------------------

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); 

const headerEle = document.getElementById('header');
const heroCanvas = document.getElementById('hero-canvas');
const mainWrap = document.querySelector('.main');
headerEle.addEventListener('mouseover', function(){
    headerEle.classList.remove("narrow");
    heroCanvas.style.marginLeft = '170px';
   mainWrap.style.marginLeft = '170px';
});
headerEle.addEventListener('mouseleave', function(){
    headerEle.classList.add("narrow");
    heroCanvas.style.marginLeft = '0';
   mainWrap.style.marginLeft = '0';
});

document.querySelector('.btn-scrolltop').addEventListener('click', ()=>{
    $('html, body').animate({
        scrollTop:0
    }, 1000);
});

document.getElementById("appstore-link").addEventListener('click', function(){
    event.preventDefault();
    alert('현재 애플 사전 주문이 잠시 중단되었습니다. 애플 사전 주문이 이후 다시 재개될 예정입니다.');
});

//------------------------------
const tvcmPlayer = new YTPlayer('#onestore-tvcm');
tvcmPlayer.load('9Hso21WK9fw');
tvcmPlayer.related = false;
//---------------------------

let trailerVideo = document.getElementById( 'video-trailer' );
const trailerSound = document.getElementById('trailer-sound-toggle');
let trailerSoundIcon = document.getElementById('btn-trailer-sound');
trailerSoundIcon.src = "./img/icon_speaker_muted.svg";

let container;
let camera, scene, renderer, light;
let video, videoTexture, videoMat, iconRig, trailerTexture;
let trailerMat;
let bg1Material, iconScene;
const trailerRig = new THREE.Object3D();

function trailerSoundControl(){
    if(document.getElementById('video-trailer').muted === true){
        document.getElementById('video-trailer').muted = false;
        trailerSoundIcon.src = "./img/icon_speaker_default.svg";
    }else{
        document.getElementById('video-trailer').muted = true;
        trailerSoundIcon.src = "./img/icon_speaker_muted.svg";                
    }
}
trailerSound.addEventListener('click', trailerSoundControl );

const sectionTL1 = gsap.timeline().add('start')
.from('.devil', { opacity:0, duration:0.7 }, 'start')
.from('.background-1', { y:150, duration: 2.5 }, 'start')
.pause();

const sectionTL2 = gsap.timeline().add('start')
.from('.background-2', { y:150, duration: 2.5 }, 'start')
.pause();

const sectionTL3 = gsap.timeline().add('start')
.from('.background-3', { y:150, duration: 2.5 }, 'start')
.pause();

const sectionTL4 = gsap.timeline().add('start')
.from('.background-4', { y:150, duration: 2.5 }, 'start')
.pause();

const sectionTL5 = gsap.timeline().add('start')
.from('.background-5', { y:150, duration: 2.5 }, 'start')
.pause();

setTimeout(() => {$('.icon-scroll-down').css({opacity: 0.7})}, 3500);
setTimeout(() => {$('#trailer-sound-toggle').css({right: '24px'})}, 4500);

window.addEventListener('scroll', ()=> {
    if(window.scrollY < window.innerHeight*1.0 || window.scrollY > window.innerHeight*3.0){
        tvcmPlayer.pause();
    }
    if(window.scrollY > 10) {
        trailerVideo.pause();
        document.getElementById('trailer-sound-toggle').style.right = '-50px'
    }else{
        trailerVideo.play();
        document.getElementById('trailer-sound-toggle').style.right = '24px'
       // tvcmPlayer.pause();
    }
    if(window.scrollY > window.innerHeight*2.8){
        document.querySelector('.background-1').style.opacity = '1';
        sectionTL1.play();
        $('.icon-scroll-down').css({opacity: 0});
        $('.btn-scrolltop').css({ right: '15px'});
    }else{
        document.querySelector('.background-1').style.opacity = '0';
        sectionTL1.reverse();
        $('.icon-scroll-down').css({opacity: 0.7});
        $('.btn-scrolltop').css({ right: '-40px'});
    }
    if(window.scrollY > window.innerHeight*3.8){
        document.querySelector('.background-2').style.opacity = '1';
        document.querySelector('.hero-wrap').style.opacity = '0';
        sectionTL2.play();
    }else{
        document.querySelector('.background-2').style.opacity = '0';
        document.querySelector('.hero-wrap').style.opacity = '1';
        sectionTL2.reverse();
    }
    if(window.scrollY > window.innerHeight*4.8){
        document.querySelector('.background-3').style.opacity = '1';
        sectionTL3.play();
    }else{
        document.querySelector('.background-3').style.opacity = '0';
        sectionTL3.reverse();
    }
    if(window.scrollY > window.innerHeight*5.8){
        document.querySelector('.background-4').style.opacity = '1';
        sectionTL4.play();
    }else{
        document.querySelector('.background-4').style.opacity = '0';
        sectionTL4.reverse();
    }
    if(window.scrollY > window.innerHeight*6.8){
        document.querySelector('.background-5').style.opacity = '1';
        sectionTL5.play();
    }else{
        document.querySelector('.background-5').style.opacity = '0';
        sectionTL5.reverse();
    }
});
function headerReveal(){
    document.getElementById('header').style.left = '0px';
}
  
if(window.scrollY > 100){
    headerReveal();
}
function trailerPlay(){ trailerVideo.play(); }
setTimeout(headerReveal, 3500);
var blank2 = document.querySelector('.blank-2');
console.log(blank2.offsetTop);

//---------------------------------------
init();
function init(){

    container = document.getElementById('hero-canvas');
    var canvasAspect = container.offsetWidth/container.offsetHeight;
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( container.offsetWidth, container.offsetHeight );
    renderer.setAnimationLoop( animation );
    renderer.setClearColor(0x00000);
    container.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera(45, canvasAspect, 0.01, 1000);
    camera.position.set( 0, 0, 5 );
    
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 140);
    
    light = new THREE.PointLight( 0xffffff, 2, 1000 );
    light.position.set(1 ,8 ,10);
    scene.add(light);

    // Background Image
    
    const textureLoader = new THREE.TextureLoader();
    const bg2Texture = textureLoader.load('./textures/back_mon_2.jpg');
    const bg1Geometry = new THREE.PlaneGeometry(16*1.4, 9*1.4);
    bg1Material = new THREE.MeshBasicMaterial({ 
        map: bg2Texture, transparent:true, opacity:1,
    });

    const bg1Mesh = new THREE.Mesh(bg1Geometry, bg1Material);
    bg1Mesh.scale.set(3.8, 3.8, 1);		
    bg1Mesh.position.set(-0.5, 0.3, -50);
    scene.add(bg1Mesh);

    // Icon Mesh
    iconRig = new THREE.Object3D();
    const loader = new GLTFLoader();

    loader.load( './models/logo_icon_low.glb', function ( gltf ) {
        iconScene = gltf.scene;
        iconRig.add(iconScene);
    });
    iconRig.position.set(0, -3, 0);
    iconRig.rotation.set(0, 4, 0);
    //scene.add(iconRig);

    // Phone Mesh
    let phoneRig = new THREE.Object3D();
    const loaderPhone = new GLTFLoader();
    const loaderPhoneScreen = new GLTFLoader(); 
    let phoneScreenMesh = null;
            
    loaderPhone.load ('./models/samsung_body_2.glb', (gltf) => {
        const phoneScene = gltf.scene;			
        phoneRig.add(phoneScene);
    });
    
    loaderPhoneScreen.load ('./models/samsung_display.glb', (gltf) => {
        const stoneMesh = gltf.scene.children.find((mesh) => mesh.name === "display");
        const phoneScreenGeometry = stoneMesh.geometry.clone();
        phoneScreenMesh = new THREE.Mesh(phoneScreenGeometry, videoMat);			
        phoneRig.add(phoneScreenMesh);
    });
    phoneRig.position.set(0.4, -10, -0.5 );
    phoneRig.rotation.set(0, 0, 0 );
    scene.add(phoneRig);

    // video textures - phone screen
    video = document.getElementById( 'video' );
    video.play();
    videoTexture = new THREE.VideoTexture( video, function(video){
        video.wrapS = texture.wrapT = THREE.RepeatWrapping;
        video.offset.set( 0, 0 );
        video.repeat.set(2,2);
    });
    videoMat = new THREE.MeshLambertMaterial({ 
        color:0xffffff, 
        map: videoTexture
    });

    //------------------
    // Trailer Screen

    trailerTexture = new THREE.VideoTexture( trailerVideo, function(trailerVideo){
        trailerVideo.wrapS = texture.wrapT = THREE.RepeatWrapping;
        trailerVideo.offset.set( 0, 0 );
        trailerVideo.repeat.set(2,2);
    })

    const trailerRoughnessTexture = textureLoader.load('./img/surface_var1.jpg');
    const trailerNormalTexture = textureLoader.load('./img/surface_normal.jpg');

    trailerMat = new THREE.MeshPhysicalMaterial({ 
        color:0xffffff, map: trailerTexture,
        roughnessMap: trailerRoughnessTexture,
        normalMap: trailerNormalTexture,
        metalness:0.1, roughness:1
    });

    const trailerScreenGeo = new THREE.PlaneGeometry(16, 9);
    const trainerScreenMesh = new THREE.Mesh(trailerScreenGeo, trailerMat);
    trailerRig.add(trainerScreenMesh);
    trailerRig.position.set(0.56, -8, -7.05);
    scene.add(trailerRig);

    window.addEventListener( 'resize', onWindowResize, false);

    // Intro - ScrollTrigger

    const tlLight = gsap.timeline();
    const tlBg = gsap.timeline();
    const tlIcon = gsap.timeline({paused: true});
    const tlTrailer = gsap.timeline({paused: true});
    const tlPhone = gsap.timeline({paused: true});
    const tlHeadline = gsap.timeline({ paused: true});
    const tlCamera = gsap.timeline({ paused: true});

    function iconRemove(){
        scene.remove(iconRig);
    }
    function iconPlay(){
        scene.add(iconRig);
    }

    // intro
    tlIcon.addLabel('tlIcon_0')
        .to(iconRig.position, { y: -0.2 , duration: 2})
        .to(iconRig.rotation, { y: 0 , duration: 3}, 'tlIcon_0').delay(0.5)
        .addLabel('tlIcon_1')
        .to(iconRig.position, { z: 6, duration: 0.6}, 'tlIcon_1')
        .to(iconRig.position, { y: 0, duration: 0.6, onComplete: headerReveal, trailerPlay}, 'tlIcon_1');

        if(window.scrollY > 100){
            iconRemove();
        }else if(window.scrollY < 100){
            iconPlay();
            tlIcon.play();
            tlTrailer.play();
        }
 
    tlLight
        .to(light.position, { x: 14, duration: 1, onComplete:iconRemove }, 'tlLight_0').delay(3.5).addPause()
        .to(light.position, { x: 4, duration: 1},'tlLight_1').addLabel('tlLight_2').addPause()
        .to(light, { intensity: 0.1, duration: 1}, 'tlLight_3')
        .addLabel('tlLight_4');

    tlBg
        .to(bg1Material, { opacity: 0.3, duration: 0.8}, 'tlBg_0').delay(3.5).addPause()
        .to(bg1Material, { opacity: 0.65},'tlBg_1').addLabel('tlBg_2').addPause()
        .to(bg1Material, { opacity: 0.1}, 'tlBg_2').addLabel('tlBg_3');


    tlTrailer
        .to(trailerRig.position, { y:0.05, duration:0.2, onComplete:iconRemove}, 'tlTrailer_0').delay(3.5).addPause()
        .to(trailerRig.position, { x: 25, y:2.4, z:-34, duration:1, onComplete: iconRemove}, 'tlTrailer_1')
        .to(trailerRig.rotation, { y: -Math.PI/2.2, duration:1 }, 'tlTrailer_1').addPause()
        .addLabel('tlTrailer_2');
    
    tlPhone
        .to(phoneRig.position, { y: 0, duration:1}, 'tlPhone_1')
        .to(phoneRig.rotation, { y: Math.PI*2 , duration:1}, 'tlPhone_1').addPause()
        .addLabel('tlPhone_2')
        .to(phoneRig.rotation, { y: Math.PI*3.9 , duration:1}, 'tlPhone_2')
        .to(phoneRig.position, { x: 2, z:-2.5, duration:1 }, 'tlPhone_2').addPause()
        .addLabel('tlPhone_3');
    
    tlHeadline
        .to('.headline-wrap', { bottom: window.innerHeight/2 - (document.querySelector('.headline-wrap').offsetHeight/2), duration:1 },'tlHeadline_1')
        .addPause().addLabel('tlHeadline_2')
        .to('.headline-wrap', { scale:0.7, opacity:0, duration:0.5 }, 'tlHeadline_3')
        .addLabel('tlHeadline_4');

    tlCamera
        .to(camera.position, {z: 10, duration:0.5}, 'tlCamera_out')
        .addPause().addLabel('tlHeadline_zoom');
    
    ScrollTrigger.create({
        trigger:".dot-1",
        start:"top top",
        end: "bottom top",
        onEnter:()=> {
            tlTrailer.play('tlTrailer_1');
           // tlGround.play('tlGround_1');
            tlBg.play('tlBg_1');
            tlPhone.play('tlPhone_1');
        },
        onEnterBack:()=> {
            tlTrailer.reverse('tlTrailer_2');
           // tlGround.reverse('tlGround_2');
            tlBg.reverse('tlBg_2');
            tlPhone.reverse('tlPhone_2');
        }
    });
    ScrollTrigger.create({
        trigger:".dot-2",
        start:"top top",
        end: "bottom top",
        onEnter:()=> {
            tlPhone.play('tlPhone_2');
            tlLight.play('tlLight_1');
            tlHeadline.play('tlHeadline_1');            
        },
        onEnterBack:()=> {
            tlPhone.reverse('tlPhone_3');
            tlLight.reverse('tlLight_2');
            tlHeadline.reverse('tlHeadline_2'); 
        }
    });
    ScrollTrigger.create({
        trigger:".dot-3",
        start:"top top",
        end: "bottom top",
        onEnter:()=> {
            tlCamera.play('tlCamera_out');
            tlHeadline.play('tlHeadline_2');
            tlLight.play('tlLight_3');
            tlBg.play('tlBg_2');            
        },
        onEnterBack:()=> {
            tlCamera.reverse('tlCamera_zoom');
            tlHeadline.reverse('tlHeadline_4');
            tlLight.reverse('tlLight_4');
            tlBg.reverse('tlBg_3');
        }
    });
}   
//--------------------------

function onWindowResize() {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
    document.querySelector('.headline-wrap').style.bottom = window.innerHeight/2 - (document.querySelector('.headline-wrap').offsetHeight/2);
}

function animation() {
    camera.lookAt( 0,0,0 );
    render();	
};

function render() {
    renderer.render( scene, camera );
}

//-------------------------------------------

const quizButton = document.getElementById('btn-quiz-open');
const quizModal = document.getElementById('quiz-modal');
const homeBody = document.getElementById('home-body');
const modalClose = document.querySelector('.btn-modal-close');

[
    quizButton, document.querySelector('.goods-btn'),
    document.querySelector('.goods-btn-2'),
    document.querySelector('.goods-btn-3'),
    document.querySelector('.goods-btn-4'),
    document.querySelector('.goods-btn-5')
].forEach(quizOpen => {
    quizOpen.addEventListener('click', function(event){
        event.preventDefault();
        quizModal.classList.add('unfold');
        homeBody.classList.add('modal-active');
        if(quizModal.classList.contains('out')){
            quizModal.classList.remove('out');
        }
    });
});

document.querySelector('.modal-background').addEventListener('click', ()=>{
    document.querySelector('.modal-container').classList.add('out');
    homeBody.classList.remove('modal-active');
    quizModalReset();
    quizRadioReset()
});
modalClose.addEventListener('click', ()=>{
    document.querySelector('.modal-container').classList.add('out');
    homeBody.classList.remove('modal-active');
    quizModalReset();
    quizRadioReset()
});

$(".answer").on('click', function() {
    $(this).siblings(".answer").removeClass("selected");
    $(this).addClass("selected");
});

$('#btn-quiz-submit').on('click', function() {
    if($(".selected").length) {
        if($(".selected").index() === 0) {
            $('.quiz-step1-wrap').addClass('is-disable');
            $('.quiz-step2-wrap').removeClass('is-disable');
        } else {                
            $('.quiz-step1-wrap').addClass('is-disable');
            $('.quiz-step3-wrap').removeClass('is-disable');
        }
        } else {
        alert("문제의 답을 선택해주세요.");
    }
    quizRadioReset();
});
$("#btn-quiz-retry").on('click',() =>{
    $('.quiz-step1-wrap').removeClass('is-disable');
    $('.quiz-step3-wrap').addClass('is-disable');
});

function copyToClipboard() {
    const textBox = document.getElementById("coupon-value");
    textBox.select();
    document.execCommand("copy");
    alert("쿠폰번호가 복사되었습니다");
}

function quizModalReset(){
    $('.quiz-step1-wrap').removeClass('is-disable');
    $('.quiz-step2-wrap').addClass('is-disable');
    $('.quiz-step3-wrap').addClass('is-disable');
}
function quizRadioReset(){
    var quizAnswers = document.getElementsByName("quiz-week1");
    for (var i=0; i<quizAnswers.length; i++){
        if(quizAnswers[i].getAttribute('type') === 'radio'){
            quizAnswers[i].checked = false;
        }
    }
}
document.getElementById('btn-coupon-copy').addEventListener('click', copyToClipboard);
[document.getElementById('btn-goods-apply'), document.getElementById('btn-quiz-final')].forEach(shopOpen => {
    shopOpen.addEventListener('click', function(event){
        event.preventDefault();
        window.open("https://play.blizzard.kr/diabloimmortal/goodsweek");
    });
});




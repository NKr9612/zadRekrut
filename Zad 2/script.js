const url = "http://rekrutacjartb.pl/developer/banner.json";

const numberImg = 3;
let counter = 1;
const anim = ".3s .1s 1 linear forwards";
let arr = [];
const slideCont = document.querySelector(".slide-cont");


const getSingle = async () =>{
    const response = await fetch(url);
    const data = await response.json();

    const count = data.offers.length;

    const random = Math.floor(Math.random() * count)

    const offer = data.offers[random];

    const {name} = offer;
    const {price} = offer;
    const {currency} = offer;
    const {imgURL} = offer;

    return {
        name,
        price,
        currency,
        imgURL
    }
}


const sliderInit = () =>{
const slide1 = document.querySelector(".slide-cont div:nth-child(1)");
const slide2 = document.querySelector(".slide-cont div:nth-child(2)");
const slide3 = document.querySelector(".slide-cont div:nth-child(3)");
let interval;
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches;
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            handleSlideForward();
            clearInterval(interval);
            goInterval();
        } else {
            handleSlideBackward();
            clearInterval(interval);
            goInterval();
        }                                                                                       
    }
    
    xDown = null;
    yDown = null;                                             
};

const goInterval = () =>{
    interval = setInterval(()=>{
       handleSlideForward();
    },4000)
}

const clearAnim = (el) =>{
    el.style.animation = 'none';
}

const handleForwardAnim = (slide, nextSlide) => {
    clearAnim(slide);
    slide.style.opacity = '1';
    slide.style.transform = "translateX(0px)";
   slide.style.animation = `slideToLeft ${anim}`;
   clearAnim(nextSlide);
    nextSlide.style.opacity = '0';
    nextSlide.style.transform = "translateX(100px)";
   nextSlide.style.animation = `slideFromRight ${anim}`;
}
const handleBackwardAnim = (slide, prevSlide) => {
    clearAnim(prevSlide);
    prevSlide.style.opacity = '0';
    prevSlide.style.transform = "translateX(-100px)";
   prevSlide.style.animation = `slideFromLeft ${anim}`;
   clearAnim(slide);
    slide.style.opacity = '1';
    slide.style.transform = "translateX(0px)";
   slide.style.animation = `slideToRight ${anim}`;
}
const handleSlideForward = () =>{
   if(counter ===1){
    handleForwardAnim(slide1, slide2);
    counter = 2;
   }else if(counter ===2 ){
    handleForwardAnim(slide2, slide3);
    counter = 3;
   }else if(counter === 3){
    handleForwardAnim(slide3, slide1);
    counter = 1;
   }
 }
 
 const handleSlideBackward = () =>{
    if(counter === 1){
        handleBackwardAnim(slide1, slide3);
        counter = 3;
    }else if(counter === 3){
       handleBackwardAnim(slide3, slide2);
       counter = 2;
    }else if(counter === 2){
        handleBackwardAnim(slide2, slide1);
        counter = 1;
    }
 }

 goInterval();
}

const init = (iterator) =>{
    const div  = document.createElement("div");
    div.classList.add(`slide`);

    const img = document.createElement("img");
    img.src = `${iterator.imgURL}`;   

    const p = document.createElement("p");
    p.innerHTML = `${iterator.name}`

    const span = document.createElement("span");
    span.innerHTML = `${iterator.price} ${iterator.currency}`;

    const button = document.createElement("button");
    button.innerHTML = "Check";

    slideCont.appendChild(div);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(button)

}

const getData = () =>{
   for(let i=0; i<numberImg; i++){
    getSingle().then(data => init(data))
   }
   setTimeout(()=>{
    sliderInit();
   },500)
}


window.addEventListener("DOMContentLoaded", getData)
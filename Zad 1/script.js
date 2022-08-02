const url = "http://rekrutacjartb.pl/developer/banner.json";

const numberImg = 4;
let arr = [];
const bricks = document.querySelector(".bricks");


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

const borderAnim = () =>{
    const divs = [...document.querySelectorAll(".bricks div")];
    let counter = 0;
    let f = false;
    const animOut = "borderOut .5s 0s 1 linear forwards";
    const animIn = "borderIn .5s 0s 1 linear forwards";
    setInterval(()=>{
     switch(counter){
        case 0: 
        divs[0].style.animation = animIn;
        if(f){
            divs[3].style.animation = animOut;
        }
        f =true;
        break;
        case 1:
            divs[1].style.animation = animIn;
            divs[0].style.animation = animOut;
            break;
        case 2:
            divs[2].style.animation = animIn;
            divs[1].style.animation = animOut;
            break;
        case 3:
            divs[3].style.animation = animIn;
            divs[2].style.animation = animOut;
            break;
     }
     if(counter >=4){
        counter = 0;
     }else{
        counter++;
     }
    }, 2000)
}

const init = (iterator) =>{
    const div  = document.createElement("div");

    const img = document.createElement("img");
    img.src = `${iterator.imgURL}`;
    img.alt = `${iterator.name}`;
    
    const p = document.createElement("p");
    p.innerHTML = `${iterator.price} ${iterator.currency}`;

    bricks.appendChild(div);
    div.appendChild(img);
    div.appendChild(p);


}

const getData = () =>{
   for(let i=0; i<numberImg; i++){
    getSingle().then(data => init(data))
   }
   setTimeout(()=>{
    borderAnim();
   },100)
}


window.addEventListener("DOMContentLoaded", getData)
const slider = document.getElementById("slider");
const sliderContainer = document.querySelector(".container");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const slides = document.querySelectorAll(".slider-image")
const bottom = document.getElementById("bottom");

let currentSlideIndex = 0;
const paginationCircles = [];
const sliderWidth = 800;

// створюєм "пагінацію" і додаємо в HTML
function createPaginationCircle() {
    const div = document.createElement("div");
    div.className = "pagination-circle";
    bottom.appendChild(div);
    paginationCircles.push(div);
}
// зміна слайду при клікі на пагінацію
function addPagination() {
    slides.forEach(createPaginationCircle);
    paginationCircles[0].classList.add("active");
    paginationCircles.forEach(function(circle, index) {
        circle.addEventListener("click", function(){changeSlide(index)});
    });
}
// додаємо колір на активну пагінацію
function addActiveClass() {
    paginationCircles[currentSlideIndex].classList.add("active");
}
// видаляємо колір на пагінації
function removeActiveClass() {
    paginationCircles[currentSlideIndex].classList.remove("active");
}
//переміщення слайдів
function showSlide() {
    slider.style.transform = `translateX(-${currentSlideIndex * sliderWidth}px)`;
}
//
function changeSlide(slideIndex) {
    removeActiveClass();
    currentSlideIndex = slideIndex;
    addActiveClass();
    showSlide();
}

function nextSlide() {
    let newSlideIndex = currentSlideIndex + 1;
    if(newSlideIndex > slides.length - 1) {
        newSlideIndex = 0;
    }
    changeSlide(newSlideIndex);
}

function previousSlide() {
    let newSlideIndex = currentSlideIndex - 1;
    if(newSlideIndex < 0) {
        newSlideIndex = slides.length - 1;
    }
    changeSlide(newSlideIndex);
}
// додаємо стрілки на клавіатурі вправо та вліво
function eventKey(e){
    switch(e.keyCode){
        case 37:
            previousSlide();
            break;
        case 39:
            nextSlide();
            break;
    }
}
//автоперемикання слайдів
let timer=setInterval(nextSlide, 4000);

//кнопка старт
function startSlider(){
    if(timer!==null)
    return;
    timer=setInterval(nextSlide, 4000);
}
////кнопка пауза
function pauseSlider(){
    clearInterval(timer);
    timer=null;
}

let posStart = 0; 
let posFinal = 0
let posX1=0
let posX2=0


function positionTouch (endPosition) {
if (endPosition < posStart) {
nextSlide();
} else if (endPosition > posStart) {
previousSlide();
}
};

slider.addEventListener("touchstart", (event) => {
    posStart = event.touches[0].clientX;
}); 

slider.addEventListener("touchend", (event) => {
    positionTouch(event.changedTouches[0].clientX);
});

slider.addEventListener("mousedown", (event) => {
    posStart=event.clientX; 
   
});
slider.addEventListener("mouseup", (event) => {
    posFinal= event.clientX-1; 
    positionTouch(posFinal)
});



addPagination();
prevBtn.addEventListener("click", previousSlide);
nextBtn.addEventListener("click", nextSlide);

playBtn.addEventListener("click", startSlider);
pauseBtn.addEventListener("click", pauseSlider);

addEventListener("keydown", eventKey);





function Carusel (imagesSrcList){
   this.imagesSrcList = imagesSrcList;
   this.allImages = Array.from(document.getElementsByTagName('img'));
   this.currentSlideIndex = 0;
   this.paginationCircles = [];
   this.sliderWidth = 800;
}

const caruselPrototype={
   create: function(){
      this.mainContainer=document.createElement('div')
      this.mainContainer.className='slider-container'

      this.containerContainer=document.createElement('div')
      this.containerContainer.className='container'

      this.sliderContainer=document.createElement('div')
      this.sliderContainer.id='slider'


      this.bottomDiv=document.createElement('div')
      this.bottomDiv.id='bottom'

      this.switchDiv=document.createElement('div')
      this.switchDiv.className='switch-btn'

      this.buttonNext=document.createElement('button')
      this.buttonPrev=document.createElement('button')
      this.buttonPlay=document.createElement('button')
      this.buttonPause=document.createElement('button')
      this.buttonNext.innerText='Next'
      this.buttonNext.className='next'
      this.buttonPrev.innerText='Prev'
      this.buttonPrev.className='prev'
      this.buttonPlay.className='play'
      this.buttonPlay.innerText='Play'
      this.buttonPause.className='pause'
      this.buttonPause.innerText='Pause'
      this.switchDiv.appendChild(this.buttonNext)
      this.switchDiv.appendChild(this.buttonPlay)
      this.switchDiv.appendChild(this.buttonPause)
      this.switchDiv.appendChild(this.buttonPrev)

      this.containerContainer.appendChild(this.sliderContainer)
      this.mainContainer.appendChild(this.containerContainer)
      this.mainContainer.appendChild(this.bottomDiv)
      this.mainContainer.appendChild(this.switchDiv)
      document.body.appendChild(this.mainContainer)
      this.init()
      this.createPaginationCircle()
      this.addPagination()
      // this.createPaginationCircle()
      // this.addPagination()
      // this.removeActiveClass()
      // this.addActiveClass()
      // this.showSlide()
      // this.changeSlide()
      // this.nextSlide()
      // this.previousSlide()

   },
   // метод створення картинок
   init: function() {
      for(let i=this.imagesSrcList; i>0; i--){
         const img=document.createElement('img')
         img.className='slider-image'
         img.draggable='false'
         img.src=`https://picsum.photos/200/300?${i}`
         this.sliderContainer.appendChild(img)
         }
   },

   changeSlide: function (slideIndex) {
      this.removeActiveClass();
      this.currentSlideIndex = slideIndex;
      this.addActiveClass();
      this.showSlide();
   },
   nextSlide: function (){
      let newSlideIndex = this.currentSlideIndex + 1;
      if(newSlideIndex > this.slides.length - 1) {
          newSlideIndex = 0;
      }
      changeSlide(newSlideIndex);
   },
   previousSlide: function()  {
      let newSlideIndex = this.currentSlideIndex - 1;
      if(newSlideIndex < 0) {
          newSlideIndex = this.slides.length - 1;
      }
      changeSlide(newSlideIndex);
  },


   createPaginationCircle: function() {
      const div = document.createElement("div");
      div.className = 'pagination-circle';
      this.bottomDiv.appendChild(div);
      this.paginationCircles.push(div);
   },
  
   addPagination: function() {
      this.allImages.forEach(this.createPaginationCircle);
      
      this.paginationCircles[0].classList.add("active");
      this.paginationCircles.forEach(function(circle, index) {
      circle.addEventListener("click", function(){changeSlide(index);});
      });
   },
   addActiveClass: function() {
      this.paginationCircles[this.currentSlideIndex].classList.add("active");
   },
   removeActiveClass: function () {
      this.paginationCircles[this.currentSlideIndex].classList.remove("active");
   },
   showSlide: function () {
      this.sliderContainer.style.transform = `translateX(-${this.currentSlideIndex * this.sliderWidth}px)`;
   },

}//закрили прототип

Carusel.prototype=caruselPrototype

const carusel = new Carusel(5);
carusel.create();
carusel.init();
carusel.createPaginationCircle()
carusel.addPagination()
carusel.removeActiveClass();
carusel.addActiveClass();
carusel.showSlide();
carusel.changeSlide()
carusel.nextSlide()
carusel.previousSlide()
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
let clientX = [];

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
prevBtn.addEventListener("click", previousSlide);
nextBtn.addEventListener("click", nextSlide);

playBtn.addEventListener("click", startSlider);
pauseBtn.addEventListener("click", pauseSlider);

addEventListener("keydown", eventKey);


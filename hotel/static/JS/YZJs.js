//轮播图框架
function YzCarousel(el) {
  this.el = document.getElementsByClassName(el);        //获取目标元素
  //console.log(this.el);
  let items = document.getElementsByClassName(el+'-item');
  console.log(items);
  //this.creatBurster(this.el);
  //let carouselOl = document.getElementsByClassName('carousel-burster')[0];
  //let carouselArry = carouselOl.childNodes;
  //console.log(carouselArry);
  //console.log(items);
  let timer;
  let index=0;
  items[0].style.display='block';
  timer = setInterval(function () {

    index++;
    if (index >3){
      index = 0;
    }
    for (let j=0;j<items.length;j++){
      items[j].style.display='none';
      carouselArry[j+1].className = '';
    }
    items[index].style.display='block';
    carouselArry[index+1].className='active';
    //console.log(index);
  },3000);
  carouselOl.onclick = function (event) {
    //console.log(event.target.class);
    clearInterval(timer);
    index = event.target.class;
    for (let j=0;j<items.length;j++){
      items[j].style.display='none';
      carouselArry[j+1].className = '';
    }
    items[index].style.display='block';
    carouselArry[index+1].className='active';
    timer = setInterval(function () {

      index++;
      if (index >3){
        index = 0;
      }
      for (let j=0;j<items.length;j++){
        items[j].style.display='none';
        carouselArry[j+1].className = '';
      }
      items[index].style.display='block';
      carouselArry[index+1].className='active';
      //console.log(index);
    },3000)
  };
  /*;*/
}

YzCarousel.prototype={
  creatBurster(parent){
    //let fragment = document.createDocumentFragment();
    let carouselBurster = document.getElementsByClassName('carousel-burster')[0];
    //carouselBurster.className = 'carousel-burster';
    let BursterItems = new Array();
    for (let i=0;i<document.getElementsByClassName('YzCarousel-item').length;i++){
      BursterItems[i] = document.createElement('li');
      BursterItems[i].class = i;
      console.log(BursterItems[i]);
    }
    for (let i=0;i<BursterItems.length;i++){
      carouselBurster.appendChild(BursterItems[i])
    }
    //console.log(BursterItems+'11111111');
    BursterItems[0].className = 'active';
    //parent[0].appendChild(carouselBurster);

  }
};


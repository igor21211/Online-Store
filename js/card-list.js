 const main = document.querySelector('.main-content');
 const headerMain = document.querySelector('.header');

 function getResultSearch(search , callback){
    fetch(`https://dummyjson.com/products/search?q=${search}`)
    .then(res => res.json())
    .then(data => callback(data.products));
}
 
 function getAllProducts(callback, limit){
    fetch(`https://dummyjson.com/products?limit=${limit}`)
    .then(res => res.json())
    .then(data => callback(data.products));
}

function getItemFromLocaleStorage(){
    return JSON.parse(localStorage.getItem('product-cart'));
}

 function getCategory(category, callback, limit){
    fetch(`https://dummyjson.com/products/category/${category}?limit=${limit}`)
    .then(res => res.json())
    .then(data => callback(data.products));
}

function renderCarousel(data){
   const mainDiv = document.createElement('div');
    mainDiv.classList.add('owl-carousel');
   data.forEach(element => {
    const imgEl = document.createElement('img');
    imgEl.src = element.thumbnail;
    mainDiv.appendChild(imgEl);
   });
   main.insertAdjacentElement( 'afterbegin',mainDiv);

   $(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop:true,
        autoplay:true,
        autoplayTimeout:2000,
        animateOut:'slideOutUp',
        animateIn:'slideInUp',
        navText: ['', ' '],
        nav:false,
        dots:false,  
        responsive:{
            550:{
                items: 2
            },
            768:{
                items:3
            },
            1100:{
                items:3
            }
        }
    });
})
}


function renderCardList(data){
    const localData = getItemFromLocaleStorage();
    main.innerHTML = '';
    data.forEach(element => {
        const productCard = document.createElement('div');
        const aEl = document.createElement('a');
        productCard.classList.add('product-cards');
        const imgEl = document.createElement('img');
        const h3El = document.createElement('h3');
        const pEl = document.createElement('p');
        const spanEl = document.createElement('span');
        const btnEl = document.createElement('button');
        btnEl.value = element.id;
        btnEl.textContent = 'Add to Cart';
        aEl.classList.add('link-card');
        aEl.href = `#${element.id}`;
        imgEl.src = element.thumbnail;
        h3El.textContent = element.title;
        pEl.textContent = element.description;
        spanEl.textContent = '$' + element.price;
        aEl.append(imgEl,h3El,pEl,spanEl)
        if(localData && localData.length > 0 && localData.some(item => parseInt(item.id) === element.id)){
        productCard.append(aEl);
        }else{
            productCard.append(aEl, btnEl);
        }
        main.appendChild(productCard)
       });

}

document.addEventListener('DOMContentLoaded', function(){
    getAllProducts(renderCarousel, 30);
    getAllProducts(renderCardList,12);
})

document.querySelector('.sidebar').addEventListener('click', function(e){
    let target = e.target;
    if(target.classList.value   === 'icon-sidebar'){
        target = target.previousElementSibling.textContent;
    }else{
    target = target.textContent;
     } 
    getCategory(target, renderCardList, 12);
    getCategory(target, renderCarousel, 12);
})

headerMain.addEventListener('click', function(e){
    if(e.target.classList.value === 'logo-search'){
    const value = document.querySelector('.input-search').value;
    getResultSearch(value,renderCardList);
    e.preventDefault();
    }
    if(e.target.classList.value === 'input-search'){
        document.querySelector('.input-search').addEventListener('keydown', function(e){
            if(e.key === 'Enter'){
                const value = document.querySelector('.input-search').value;
                console.log(value);
                getResultSearch(value,renderCardList);
                e.preventDefault();
            }
        })
    }
})
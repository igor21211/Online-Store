

const sidebar = document.querySelector('.sidebar');

function getCategories(){
 fetch('https://dummyjson.com/products/categories')
.then(res => res.json())
.then(data => renderSidebar(data))
}

function renderSidebar(data){
    const ulEl = document.createElement('ul');
    const h2El = document.createElement('h2');
    h2El.textContent = 'Categories';
    h2El.classList.add('h2-categories')
    ulEl.classList.add('sidebar-ul');
    data.map(el => {
        const liEl = document.createElement('li');
        const aEl = document.createElement('a');
        const imgEl = document.createElement('img');
        liEl.classList.add('sidebar-li');
        aEl.classList.add('sidebar-link');
        imgEl.classList.add('icon-sidebar');
        aEl.textContent = el;
        imgEl.src = `img/icon/${el}.svg`
        liEl.append(aEl, imgEl);
        ulEl.append(liEl)
    })
    sidebar.append(h2El,ulEl);
}


document.addEventListener('DOMContentLoaded', function(){
    getCategories();    
})
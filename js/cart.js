const mainendDiv = document.querySelector('.main-content');


window.addEventListener('hashchange', function(e){
    const id = window.location.hash.slice(1);
    if(id === 'cart'){
        const data = getItemFromLocaleStorage();
        renderCart(data);
    }
})

function getItemFromLocaleStorage(){
    return JSON.parse(localStorage.getItem('product-cart'));
}

function renderCart(data){
    mainendDiv.innerHTML = '';
    const divCart = document.createElement('div');
    divCart.classList.add('cart');
    divCart.innerHTML = data.map(renderCartItem).join('');
    const divTotal = document.createElement('div');
    divTotal.classList.add('cart-total')
    divTotal.innerHTML = `
    Total: <span>$${getTotal(data)}</span>
    `
    divCart.appendChild(divTotal);
    mainendDiv.appendChild(divCart);
}

function renderCartItem(data){
    return `
    <div class="cart-item">
    <img src="${data.thumbnail}" alt="iPhone 9">
    <div class="cart-item-info">
      <div class="cart-item-title">${data.title}</div>
      <div class="cart-item-description">${data.description}</div>
      <div class="cart-item-price">$ ${data.price}</div>
    </div>
    <div class="cart-actions">
      <button class="remove-button" value="${data.id}">Remove from Cart</button>
    </div>
  </div>`
}

function getTotal(data){
    console.log(data);
   return data.reduce((accumulator, data) => {
    return accumulator + parseInt(data.price);
  }, 0);
}

function removeFromCart(id){
    const storedProductData = localStorage.getItem('product-cart');
    let productDataArray = storedProductData ? JSON.parse(storedProductData) : [];
    console.log(productDataArray);
    productDataArray = productDataArray.filter(item => item.id !== parseInt(id));
     console.log(productDataArray);
    localStorage.setItem('product-cart', JSON.stringify(productDataArray));
}

mainendDiv.addEventListener('click',function(e){
    const target = e.target;
    console.log(target.classList);
    if(target.classList.value === 'remove-button'){
        removeFromCart(target.value);
        const data = getItemFromLocaleStorage();
        renderCart(data);
    }
})
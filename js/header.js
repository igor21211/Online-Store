const header = document.querySelector(".header");
const mainenDiv = document.querySelector(".main-content");

function renderHeader() {
  header.innerHTML = `
    <div class="header-div">
          <a href="/Online-store/"> <img class="logo" src="img/behance-square-icon.svg" alt="logo"></a>
       
      <h1>Online Store</h1>
      <div class="search">
          <input class="input-search" placeholder="Search something" type="text">
            <img class="logo-search" src="img/search-icon.svg" alt="">
      </div>
    </div>
    <div class="cart_fav">
      <div class="cart-div">
      <a href="#cart">
        <span class="count-cart">${getCountInCart()}</span>
        <img class="cart-logo" src="img/shopping-cart-icon.svg" alt="icon-favorite"> 
        </a>
      </div>

    </div>
    `;
}

function getCountInCart() {
  const data = JSON.parse(localStorage.getItem("product-cart"));
  if (!data) {
    return 0;
  }
  const count = data.reduce((acc, data) => acc + data.count, 0);
  return count;
}
renderHeader();

mainenDiv.addEventListener("click", function (e) {
  if (
    e.target.textContent === "Add to Cart" ||
    e.target.textContent === "Place Order" ||
    e.target.textContent === "Remove from Cart" ||
    e.target.textContent === "+" ||
    e.target.textContent === "-"
  ) {
    setTimeout(() => {
      renderHeader();
    }, 1000);
  }
});

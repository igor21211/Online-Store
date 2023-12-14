const mainendDiv = document.querySelector(".main-content");
const windowBuy = document.querySelector(".buy-window");
window.addEventListener("hashchange", function (e) {
  const id = window.location.hash.slice(1);
  if (id === "cart") {
    const data = getItemFromLocaleStorage();
    renderCart(data);
  }
  if (window.location.hash) {
    history.replaceState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }
});

function getItemFromLocaleStorage() {
  return JSON.parse(localStorage.getItem("product-cart"));
}

function renderCart(data) {
  mainendDiv.innerHTML = "";
  if (!data) {
    return (mainendDiv.innerHTML =
      "<div><h1>Not any product on the Cart</h1></div>");
  }
  const divCart = document.createElement("div");
  divCart.classList.add("cart");
  divCart.innerHTML = data.map(renderCartItem).join("");
  const divTotal = document.createElement("div");
  const btnBuy = document.createElement("button");
  btnBuy.classList.add("btn-buy");
  btnBuy.textContent = "Make Order";
  divTotal.classList.add("cart-total");
  divTotal.innerHTML = `
    Total: <span>$${getTotalPrice(data)}</span>
    `;
  divTotal.appendChild(btnBuy);
  divCart.append(divTotal);
  mainendDiv.appendChild(divCart);
}

function renderCartItem(data) {
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
  </div>`;
}

function getTotalPrice(data) {
  console.log(data);
  return data.reduce((accumulator, data) => {
    return accumulator + parseInt(data.price);
  }, 0);
}

function removeFromCart(id) {
  const storedProductData = localStorage.getItem("product-cart");
  let productDataArray = storedProductData ? JSON.parse(storedProductData) : [];
  productDataArray = productDataArray.filter(
    (item) => item.id !== parseInt(id)
  );
  localStorage.setItem("product-cart", JSON.stringify(productDataArray));
}

mainendDiv.addEventListener("click", function (e) {
  const target = e.target;
  if (target.classList.value === "remove-button") {
    removeFromCart(target.value);
    const data = getItemFromLocaleStorage();
    renderCart(data);
  }
  console.log(target.classList.value);
  if (target.classList.value === "btn-buy") {
    renderBlockBuy();
  }
});

function renderBlockBuy() {
  const data = getItemFromLocaleStorage();
  const cities = [
    "Київ",
    "Харків",
    "Одеса",
    "Дніпро",
    "Донецьк",
    "Запоріжжя",
    "Львів",
    "Кривий Ріг",
    "Миколаїв",
    "Маріуполь",
    "Вінниця",
    "Луцьк",
    "Луцьк",
    "Дніпродзержинськ",
    "Сімферополь",
    "Кіровоград",
    "Івано-Франківськ",
    "Кременчук",
    "Тернопіль",
    "Львів",
    "Біла Церква",
    "Краматорськ",
    "Мелітополь",
    "Нікополь",
    "Бровари",
    "Сєвєродонецьк",
    "Євпаторія",
    "Керч",
    "Славутич",
    "Лозова",
    "Житомир",
    "Бердянськ",
    "Ужгород",
    "Горлівка",
    "Дрогобич",
    "Марганець",
    "Лубни",
    "Павлоград",
    "Жовті Води",
    "Сміла",
    "Дружківка",
    "Оріхів",
    "Мукачеве",
    "Миргород",
    "Нововолинськ",
    "Ковель",
    "Рівне",
    "Долинська",
    "Олександрія",
    "Білгород-Дністровський",
    "Куп'янськ",
    "Люботин",
    "Хмельницький",
  ];
  mainendDiv.innerHTML = "";
  const buyDiv = document.createElement("div");
  buyDiv.classList.add("buy-window");
  buyDiv.innerHTML = `
  <h2>Order Form</h2>
<form id="orderForm" onsubmit="submitForm(event)">
  <label for="fullName">Full Name:</label>
  <input type="text" id="fullName" required />

  <label for="city">City:</label>
  <select id="city" required>
    ${cities.map(addCitiesToSelect).join()}
  </select>

  <label for="deliveryPoint">New Post Office Warehouse:</label>
  <select id="deliveryPoint" required>
    <option value="Nova Post">Nova Post</option>
    <option value="Ukr Post">Ukr Post</option>
  </select>

  <label for="paymentMethod">Payment Method:</label>
  <select id="paymentMethod" required>
    <option value="cashOnDelivery">Cash on Delivery</option>
    <option value="creditCard">Credit Card Payment</option>
  </select>

  <label for="quantityPrice">Total Price:</label>
  <input type="number" id="quantityPrice" value="${getTotalPrice(
    data
  )}" required />

  <label for="quantity">Quantity of Products:</label>
  <input type="number" id="quantity" value="${data.length}" required />

  <label for="comment">Order Comment:</label>
  <textarea id="comment"></textarea>

  <button type="submit">Place Order</button>
</form>

  `;
  mainendDiv.appendChild(buyDiv);
}

function submitForm(e) {
  e.preventDefault();
  const fieldValue = e.target.elements;
  renderSuccessResult(fieldValue);
}
function renderSuccessResult(elements) {
  mainendDiv.innerHTML = `
  <div>
      <h1>Congrats ${elements["fullName"].value}</h1>
      <p>Your order Number: ${Math.floor(Math.random() * 100) + 1}</p>
      <p>New Post Office Warehouse: ${elements["deliveryPoint"].value}</p>
      <p>Payment Method: ${elements["paymentMethod"].value}</p>
      <p>Quantity of Products: ${elements["quantity"].value}</p>
      <p>Your order Price: ${elements["quantityPrice"].value}</p>
  </div>
  `;
  localStorage.clear();
  if (window.location.hash) {
    history.replaceState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }
}

function addCitiesToSelect(city) {
  return `<option value="${city}">${city}</option>`;
}

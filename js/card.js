const mainDiv = document.querySelector(".main-content");
const headerDiv = document.querySelector(".header");

function getByIdCard(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
        reject(error);
      });
  });
}

window.addEventListener("hashchange", function (e) {
  const id = window.location.hash.slice(1);
  if (id && id != "cart") {
    const productPromise = getByIdCard(id);
    productPromise.then((data) => {
      renderCard(data);
    });
  }
});

function getItemFromLocaleStorage() {
  return JSON.parse(localStorage.getItem("product-cart"));
}

function renderCard(data) {
  const localData = getItemFromLocaleStorage();
  mainDiv.innerHTML = "";
  const productDiv = document.createElement("div");
  productDiv.classList.add("product-card");
  productDiv.innerHTML = `
    <div class="image-container">
    <img class="big-img" src="${data.thumbnail}" alt="Samsung Galaxy Book">
    <div class="thumbnail-container">
      ${data.images.map(this.generateImages).join("")}
    </div>
  </div>
  <div class="product-info">
    <div class="product-title">${data.title}</div>
    <div class="product-description">${data.description}</div>
    <div class="product-price">$ ${data.price}</div>
    <div class="product-discount">Discount: ${data.discountPercentage}</div>
    <div class="product-rating">Rating: ${data.rating}</div>
    <div class="product-stock">In Stock: ${data.stock}</div>
    ${
      localData &&
      localData.length > 0 &&
      localData.some((item) => parseInt(item.id) === data.id)
        ? '<img src="img/shopping-cart-icon.svg" alt="icon-favorite">'
        : ` <button class="card-button" value="${data.id}">Add to Cart</button>`
    }
  </div>
    `;
  mainDiv.appendChild(productDiv);
  headerDiv.scrollIntoView({ behavior: "smooth" });
}

function generateImages(images) {
  return `
    <img class="small-img" src="${images}" alt="images">
    `;
}

mainDiv.addEventListener("click", function (e) {
  const target = e.target;
  if (target.classList.value === "small-img") {
    document.querySelector(".big-img").src = target.src;
  }
  if (
    target.textContent === "Add to Cart" &&
    target.classList.value === "card-button"
  ) {
    const productArrayFromStorage = JSON.parse(
      localStorage.getItem("product-cart")
    );
    const productDataArray = productArrayFromStorage
      ? productArrayFromStorage
      : [];

    const productPromise = getByIdCard(target.value);
    productPromise.then((data) => {
      if (productDataArray.some((i) => i.id === data.id)) {
        const newProduct = productDataArray.find(
          (i) => i.id === parseInt(data.id)
        );
        newProduct.count = newProduct.count + 1;
        const newArrayProduct = productDataArray.filter(
          (i) => i.id !== parseInt(data.id)
        );
        newArrayProduct.push(newProduct);
        localStorage.setItem("product-cart", JSON.stringify(newArrayProduct));
        return;
      }
      productDataArray.push({ ...data, count: 1 });
      localStorage.setItem("product-cart", JSON.stringify(productDataArray));
      renderCard(data);
    });
  }
  if (
    target.textContent === "Add to Cart" &&
    target.classList.value === "btn-class-list"
  ) {
    const productArrayFromStorage = JSON.parse(
      localStorage.getItem("product-cart")
    );
    const productDataArray = productArrayFromStorage
      ? productArrayFromStorage
      : [];

    const productPromise = getByIdCard(target.value);
    productPromise.then((data) => {
      if (productDataArray.some((i) => i.id === data.id)) {
        const newProduct = productDataArray.find(
          (i) => i.id === parseInt(data.id)
        );
        newProduct.count = newProduct.count + 1;
        const newArrayProduct = productDataArray.filter(
          (i) => i.id !== parseInt(data.id)
        );
        newArrayProduct.push(newProduct);
        localStorage.setItem("product-cart", JSON.stringify(newArrayProduct));
        return;
      }
      productDataArray.push({ ...data, count: 1 });
      localStorage.setItem("product-cart", JSON.stringify(productDataArray));
    });
  }
});

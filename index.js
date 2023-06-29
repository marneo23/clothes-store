const productSection = document.querySelector(".productSection");
const cartButton = document.getElementById("cartBtn");
const cartSidebar = document.querySelector(".cart");
const addedProducts = document.querySelector(".addedProducts");
const subtotal = document.querySelector(".subtotal");
const cartCount = document.querySelector(".cartCount");
const stockAlert = document.querySelector(".stockAlert");
const filterInput = document.getElementById("filter");
const parkas = document.querySelectorAll(".parka");
const accesories = document.querySelectorAll(".accesory");
const tshirts = document.querySelectorAll(".tshirt");
const productsElement = document.querySelectorAll(".product");
const navigationMenu = document.querySelector(".navigationMenu");
const cartButtonResponsive = document.querySelector(".cartBtnResponsive");

let cart = JSON.parse(localStorage.getItem("CART")) || []; //cart will be a local storage item if it has content or an empty array
updateCart();

//terminology for easier understanding:
//product = clothes outside the cart (products in store)
//item = clothes inside the cart (items in cart)

function renderProducts() {
  productSection.innerHTML = "";
  let selectedFilter = filterInput.value;

  products.forEach((product) => {
    let hiddenClass = "";

    if (selectedFilter !== "all" && product.category !== selectedFilter) {
      //filtering
      hiddenClass = "hidden";
    }

    productSection.innerHTML += `
    <div class="product ${product.category} ${hiddenClass}">
    <div class="productAdd" onclick="addToCart(${product.id}); openCartIfClosed()">
    <img src="${product.img}" alt="Product" />
    <p>Add to Cart</p>
    <h3>${product.name}</h3>
    </div>
    <span>$${product.price}</span>
    </div>
    `;
  });
}
renderProducts();

filterInput.addEventListener("change", renderProducts);

//sorting
const sortByNameAsc = document.getElementById("alfabeticamenteAsc");
sortByNameAsc.addEventListener("change", nameAsc);

const sortByNameDesc = document.getElementById("alfabeticamenteDesc");
sortByNameDesc.addEventListener("change", nameDesc);

const sortByPriceAsc = document.getElementById("precioAsc");
sortByPriceAsc.addEventListener("change", priceAsc);

const sortByPriceDesc = document.getElementById("precioDesc");
sortByPriceDesc.addEventListener("change", priceDesc);

function nameAsc() {
  products.sort((a, b) => a.name.localeCompare(b.name));
  renderProducts();
}

function nameDesc() {
  products.sort((a, b) => b.name.localeCompare(a.name));
  renderProducts();
}

function priceAsc() {
  products.sort((a, b) => a.price - b.price);
  renderProducts();
}

function priceDesc() {
  products.sort((a, b) => b.price - a.price);
  renderProducts();
}

//cart
function renderCartItems() {
  addedProducts.innerHTML = "";
  cart.forEach((item) => {
    const hiddenStockAlert = item.quantity === item.stock ? "" : "hidden";

    addedProducts.innerHTML += `
  <div class="cartProduct">
  <div class="productRemove">
  <img src= ${item.img} />
  <h3>${item.name}</h3>
  </div>
  <span><p>$${item.price} </p><img src="assets/img/trash-solid.svg" onclick="removeItem(${item.id})" alt="delete"/></span>
  <span class="changeQuantity">
  <div class="btn menos" onclick="updateQuantity('menos', ${item.id})">-</div>
  <div>x${item.quantity}</div>
  <div class="btn mas" onclick="updateQuantity('mas', ${item.id})">+</div>
  </span>
  <div class="stockAlert ${hiddenStockAlert}">You reached stock limit for this product</div>
  </div>
  `;
  });
}

function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    updateQuantity("mas", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      quantity: 1,
    });

    updateCart();
  }
}

function updateCart() {
  renderCartItems();
  renderSubtotal();

  localStorage.setItem("CART", JSON.stringify(cart));
}

function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });

  cartCount.innerHTML = totalItems;
  subtotal.innerHTML = `Subtotal (${totalItems}): $${totalPrice.toFixed(2)}`; //in case prices are not round
}

function updateQuantity(action, id) {
  let updatedCart = [];

  cart = cart.forEach((item) => {
    let quantity = item.quantity;

    if (item.id === id) {
      if (action === "menos" && quantity > 1) {
        quantity--;
      } else if (action === "mas" && quantity < item.stock) {
        quantity++;
      } else if (action === "menos" && quantity === 1) {
        return; // Skip this item to effectively remove it
      }
    }
    updatedCart.push({ ...item, quantity });
  });

  cart = updatedCart;
  updateCart();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id); //filter every item from cart except the one that matches selected ID
  updateCart();
}

//open-close cart
cartButton.addEventListener("click", toggleCart);
cartButtonResponsive.addEventListener("click", toggleCart);
function toggleCart() {
  cartSidebar.classList.toggle("openCart");
}

function openCartIfClosed() {
  if (!cartSidebar.classList.contains("openCart")) {
    cartSidebar.classList.add("openCart");
  }
}

//mobile menu
function openMobileMenu() {
  navigationMenu.classList.toggle("mobileActive");
}

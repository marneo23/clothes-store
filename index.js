const productSection = document.querySelector(".productSection");
const cartButton = document.getElementById("cartBtn");
const cartSidebar = document.querySelector(".cart");
const addedProducts = document.querySelector(".addedProducts");
const subtotal = document.querySelector(".subtotal");
const cartCount = document.querySelector(".cartCount");

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

//terminology for easier understanding:
//product = clothes outside the cart (products in store)
//item = clothes inside the cart (items in cart)

function renderProducts() {
  products.forEach((product) => {
    productSection.innerHTML += `
    <div class="product">
    <div class="productAdd" onclick="addToCart(${product.id})">
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

function renderCartItems() {
  addedProducts.innerHTML = "";
  cart.forEach((item) => {
    addedProducts.innerHTML += `
  <div class="cartProduct">
  <div class="productRemove">
  <img src= ${item.img} />
  <h3>${item.name}</h3>
  <p onclick="removeItem(${item.id})">Remove</p>
  </div>
  <span>$${item.price}</span>
  <span class="changeQuantity">
  <div class="btn menos" onclick="updateQuantity('menos', ${item.id})">-</div>
  <div>x${item.quantity}</div>
  <div class="btn mas" onclick="updateQuantity('mas', ${item.id})">+</div>
  </span>
  </div>
  `;
  });
}

function updateQuantity(action, id) {
  cart = cart.map((item) => {
    let quantity = item.quantity;

    if (item.id === id) {
      if (action === "menos" && quantity > 1) {
        quantity--;
      } else if (action === "mas" && quantity < item.stock) {
        quantity++;
      }
    }
    return {
      ...item,
      quantity,
    };
  });

  updateCart();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id); //filter every item from cart except the one that matches selected ID

  updateCart();
}

//open-close cart
cartButton.addEventListener("click", toggleCart);
function toggleCart() {
  cartSidebar.classList.toggle("openCart");
}

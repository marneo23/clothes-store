const productSection = document.querySelector(".productSection");
const cartButton = document.getElementById("cartBtn");
const cartSidebar = document.querySelector(".cart");
const addedProducts = document.querySelector(".addedProducts");

let cart = [];

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
}

function renderCartItems() {
  addedProducts.innerHTML = "";
  cart.forEach((item) => {
    addedProducts.innerHTML += `
  <div class="cartProduct">
  <div class="productRemove">
  <img src= ${item.img} />
  <h3>"${item.name}</h3>
  <p>Remove</p>
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
        let updatedPrice = item.price * quantity;
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

//open-close cart
cartButton.addEventListener("click", toggleCart);
function toggleCart() {
  cartSidebar.classList.toggle("openCart");
}

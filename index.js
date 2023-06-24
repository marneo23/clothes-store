const productSection = document.querySelector(".productSection");
const cartButton = document.getElementById("cartBtn");
const cartSidebar = document.querySelector(".cart");
const addedProducts = document.querySelector(".addedProducts");

function renderProducts() {
  products.forEach((product) => {
    productSection.innerHTML += `
    <div class="product">
    <div class="productAdd">
      <img src="${product.img}" alt="Product" />
      <p>Add to Cart</p>
      <h3>${product.name}</h3>
    </div>
    <span>$${product.price}</span>
  </div>
  
    `;
  });
}

function addToCart() {
  a;
}

cartButton.addEventListener("click", toggleCart);
function toggleCart() {
  cartSidebar.classList.toggle("openCart");
}

renderProducts();

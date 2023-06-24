const productSection = document.querySelector(".productSection");
const cartButton = document.getElementById("cartBtn");
const cartSidebar = document.querySelector(".cart");
const addedProducts = document.querySelector(".addedProducts");

let cartItems = [];


function renderProducts() {
  products.forEach((product) => {
    productSection.innerHTML += `
    <div class="product" id="${product.id}">
    <div class="productAdd">
    <img src="${product.img}" alt="Product" />
    <p>Add to Cart</p>
    <h3>${product.name}</h3>
    </div>
    <span>$${product.price}</span>
    </div>
    
    `;
  });
  
  const addProductBtn = document.querySelectorAll(".productAdd")
  addProductBtn.forEach((btn) => {
    btn.addEventListener("click", addToCart);
  });
}



cartButton.addEventListener("click", toggleCart);
function toggleCart() {
  cartSidebar.classList.toggle("openCart");
}


function addToCart(event) {

  
  const productElement = event.currentTarget.closest(".product");
  const selectedItem = products.find(
    (product) => product.id === productElement.id
  );
      console.log(selectedItem.id);

    addedProducts.innerHTML += `
    <div class="cartProduct">
    <div class="productRemove">
    <img src= ${selectedItem.img} />
    <h3>"${selectedItem.name}</h3>
    <p>Remove</p>
    </div>
    <span>${selectedItem.price} quantity*price</span>
    </div>
    `;
  }


renderProducts();

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
  

function addToCart(id){
  
  if(cart.some((item) => item.id === id)){
    console.log(`${id} already in cart`)
  } else {
    const item = products.find((product) => product.id === id);
    
    console.log(cart);
    
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
    }
  }
  
 
//open-close cart
cartButton.addEventListener("click", toggleCart);
function toggleCart() {
  cartSidebar.classList.toggle("openCart");
}








 /*
   addedProducts.innerHTML += `
   <div class="cartProduct">
   <div class="productRemove">
   <img src= ${item.img} />
   <h3>"${item.name}</h3>
   <p>Remove</p>
   </div>
   <span>${item.price} x1</span>
   </div>
   `;
*/




var addedProducts = 0;
var product = document.querySelectorAll(".product");
var cartCount = document.querySelector(".cartCount");

product.forEach(function (item) {
  item.addEventListener("click", addProductToCart);
});

function addProductToCart() {
  addedProducts += 1;
  cartCount.innerHTML = addedProducts;
}

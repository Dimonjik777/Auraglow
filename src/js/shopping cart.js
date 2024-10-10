// Shopping cart

let shoppingBtn = document.querySelector(".shopping__cart");
let shoppingMenu = document.querySelector(".shopping__menu");
let shoppingContainer = document.querySelector(".shopping");

let itemTotalPrice = document.querySelector(".total");
let orderBtn = document.querySelector(".submit");

let totalPrice = 0;

let allProducts = [
  { id: 0, title: "Complete LED Whitening Kit", price: 80, count: 1, img: "LED product.png" },
  { id: 1, title: "Whitening Gel", price: 50, count: 1, img: "Gel product.png" }];

let orderProducts = [];

// Click to shopping cart button
shoppingBtn.addEventListener("click", () => {

  if (orderProducts.length !== 0) {
    shoppingMenu.classList.toggle("active");
    shoppingContainer.style.pointerEvents = "all";
  }
});

document.addEventListener("click", event => {

  // Hide window if he unfocused and no hide if add new item
  if (!shoppingMenu.contains(event.target)
    && !shoppingBtn.contains(event.target)
    && !document.querySelector(".add__item").contains(event.target)) {
    shoppingMenu.classList.remove("active");
    shoppingContainer.style.pointerEvents = "none";
  }
})


export function addItem(id) {

  // Check if the product is in the cart
  let checkId = orderProducts.some(product => product.id === id);

  if (!checkId) {

    orderProducts.push(allProducts[id]);

    // Take info from object
    let product = orderProducts.find(product => product.id == id);

    // Create container
    let item = document.createElement("div");
    item.classList.add("item");

    // Create item main content
    let itemMain = document.createElement("div");
    itemMain.classList.add("item__main");

    // Create item image
    let itemImage = document.createElement("img");
    itemImage.setAttribute("src", `../src/img/${product.img}`);

    // Create item title
    let itemTitle = document.createElement("h3");
    itemTitle.textContent = product.title;

    // Create delete button
    let itemDelete = document.createElement("button");
    itemDelete.classList.add("delete__item");
    itemDelete.innerHTML = `<img src="src/img/delete item.png" alt="">`;
    itemDelete.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteItem(event, id);
    });

    // Create item counters container
    let itemCounterContainer = document.createElement("div");
    itemCounterContainer.classList.add("item__counter");

    // Create decrease button
    let itemDecrease = document.createElement("button");
    itemDecrease.classList.add("decrease");

    if(product.count != 1)
      itemDecrease.classList.add("active");

    itemDecrease.textContent = "-";
    itemDecrease.addEventListener("click", () => {
      changeCountItem(id, -1);
    });

    // Create item count
    let itemCount = document.createElement("p");
    itemCount.classList.add("item__count");
    itemCount.textContent = product.count;

    // Create increase button
    let itemIncrease = document.createElement("button");
    itemIncrease.classList.add("increase");
    itemIncrease.textContent = "+";
    itemIncrease.addEventListener("click", () => {
      changeCountItem(id, 1);
    });

    // Create item price
    let itemPrice = document.createElement("p");
    itemPrice.classList.add("price");
    itemPrice.textContent = `${product.price * product.count}$`;
    itemPrice.setAttribute("item-id", id);

    // Insert tags to item main
    itemMain.append(itemImage);
    itemMain.append(itemTitle);
    itemMain.append(itemDelete);

    // Insert tags to item counter

    itemCounterContainer.append(itemDecrease);
    itemCounterContainer.append(itemCount);
    itemCounterContainer.append(itemIncrease);
    itemCounterContainer.append(itemPrice);

    // Insert all blocks to item container
    item.append(itemMain);
    item.append(itemCounterContainer);

    // Show item block
    shoppingMenu.prepend(item);
  }
  showTotalPrice()
}

function changeCountItem(id, count){
  
  // Find item with current id
  let product = orderProducts.find(product => product.id == id);

  // Change count product
  product.count = product.count + count;

  // Find tag with total price in item
  let priceTexts = document.querySelectorAll(".price");
  let priceText = Array.from(priceTexts).find(item => item.getAttribute("item-id") == id);

  let parentContainer = priceText.closest(".item__counter");

  //Show new price and count
  priceText.textContent = product.price * product.count + "$";
  parentContainer.querySelector(".item__count").textContent = product.count;

  showTotalPrice();

  // Manipulation with decrease button
  let decreaseBtn = parentContainer.querySelector(".decrease");

  if(product.count > 1){
    decreaseBtn.classList.add("active");
  }
  else{
    decreaseBtn.classList.remove("active");
  }
}

function deleteItem(event, id) {
  let productItem = event.target.closest(".item");

  // Remove product from array
  orderProducts = orderProducts.filter(product => product.id != id);
  productItem.remove();

  showTotalPrice();

  // Close shopping menu when cart empty
  if(orderProducts.length == 0){
    shoppingMenu.classList.toggle("active");
    shoppingContainer.style.pointerEvents = "none";
  }
}

function showTotalPrice() {
  totalPrice = orderProducts.reduce((accumulator, product) => accumulator + (product.price * product.count), 0);
  itemTotalPrice.textContent = `Total: ${totalPrice}$`;
}

export function makeOrder(){
  
  let orderProductsServer = [];

    orderProducts.forEach(product => {
      let {title, count, price} = product;
      orderProductsServer.push({title: title, count: count, price : price});
    });

  console.log(JSON.stringify({products: orderProductsServer, total: totalPrice}));
}
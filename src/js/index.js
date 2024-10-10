
// Review change
let peoplesReview = document.querySelectorAll(".review__peoples img");
let review = document.querySelector(".review");

let allReviews = [
  { name: "Nicole P.", text: "I loved my smile before, and I love it more now! After a few treatments I saw noticeable result without the sensitiviye I`ve experienced with other products." },
  { name: "Alex O.", text: "I used to love my smile, and now I love it even more! After just a few treatments, I saw noticeable results without the sensitivity I’ve experienced with other products." },
];

peoplesReview.forEach(peopleReview => {

  // Main content in review
  let review__text = review.querySelector(".review__text");
  let client__name = review.querySelector(".client__name");

  peopleReview.addEventListener("click", () => {

    if (!peopleReview.classList.contains("active")) {

      let idReview = peopleReview.getAttribute("review-id");

      // Remove all active class
      peoplesReview.forEach(peopleReview => peopleReview.classList.remove("active"));
      // Change opacity image
      peopleReview.classList.add("active");

      // Fade review content
      review__text.style.opacity = 0;
      client__name.style.opacity = 0;

      // Change content and fade out

      setTimeout(() => {
        client__name.textContent = allReviews[idReview].name;
        review__text.textContent = `"` + allReviews[idReview].text + `"`;

        client__name.style.opacity = 1;
        review__text.style.opacity = 1;
      }, 300);

    };
  });
});

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


function addItem(id) {

  // Check if the product is in the cart
  let checkId = orderProducts.some(product => product.id === id);

  if (!checkId) {

    orderProducts.push(allProducts[id]);

    // Take info from object
    let product = orderProducts.find(product => product.id === id);
    console.log(product);

    // Create container
    let item = document.createElement("div");
    item.classList.add("item");

    // Create item main content
    let itemMain = document.createElement("div");
    itemMain.classList.add("item__main");

    // Create item image
    let itemImage = document.createElement("img");
    itemImage.setAttribute("src", `src/img/${product.img}`);

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
    itemDecrease.addEventListener("click", (event) => {
      decreaseItem(event, id);
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
      increaseItem(id);
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

// Increase item count when click to a button
function increaseItem(id) {

  // Increase item count in array
  let product = orderProducts.find(product => product.id === id);
  product.count++;

  // Find tag with total price in item
  let priceTexts = document.querySelectorAll(".price");
  let priceText = Array.from(priceTexts).find(item => item.getAttribute("item-id") == id);

  let parentContainer = priceText.closest(".item__counter");

  // Find tag with count item
  let countText = parentContainer.querySelector(".item__count");

  // Show new price and count
  countText.textContent = product.count;
  priceText.textContent = product.count * product.price + "$";
  showTotalPrice();

  // Unlock decrease button
  let decreaseBtn = parentContainer.querySelector(".decrease");
  decreaseBtn.classList.add("active");
}


function decreaseItem(event, id) {

  // Decrease item count in array
  let product = orderProducts.find(product => product.id == id);
  product.count--;

  // Find tag with total price in item
  let priceTexts = document.querySelectorAll(".price");
  let priceText = Array.from(priceTexts).find(item => item.getAttribute("item-id") == id);

  let parentContainer = priceText.closest(".item__counter");

  // Find tag with count item
  let countText = parentContainer.querySelector(".item__count");

  // Show new price and count

  countText.textContent = product.count;
  priceText.textContent = product.count * product.price + "$";

  showTotalPrice();

  if (product.count == 1)
    event.target.classList.remove("active");

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

function makeOrder(){
  
  let orderProductsServer = [];

    orderProducts.forEach(product => {
      let {title, count, price} = product;
      orderProductsServer.push({title: title, count: count, price : price});
    });

  console.log(JSON.stringify({products: orderProductsServer, total: totalPrice}));
}
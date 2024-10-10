import {addItem, makeOrder} from "./shopping cart.js";

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

      // Toggle classes in images
      peoplesReview.forEach(peopleReview => peopleReview.classList.toggle("active"));

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

document.addEventListener("click", event => {
  if(event.target.classList.contains("add__item")){
    
    let itemId = event.target.dataset.itemId;
    addItem(itemId);
  }

  if(event.target.classList.contains("submit")){
    makeOrder();
  }
})
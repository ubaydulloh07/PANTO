const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    760: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 760 ? "vertical" : "horizontal";

  return direction;
}

const slider = document.querySelector(".slider");
const prevSlideBtn = document.querySelector(".prev-slide");
const nextSlideBtn = document.querySelector(".next-slide");

let scrollPosition = 0;

nextSlideBtn.addEventListener("click", () => {
  const scrollWidth = slider.scrollWidth / 4;
  scrollPosition += scrollWidth;
  if (scrollPosition >= slider.scrollWidth) {
    scrollPosition = 0;
  }
  slider.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
});

prevSlideBtn.addEventListener("click", () => {
  const scrollWidth = slider.scrollWidth / 4;
  scrollPosition -= scrollWidth;
  if (scrollPosition < 0) {
    scrollPosition = slider.scrollWidth - scrollWidth;
  }
  slider.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const bagCounters = document.querySelectorAll(".bag-counter");
  const addButtons = document.querySelectorAll(".cart-add-btn");

  addButtons.forEach((addButton) => {
    addButton.addEventListener("click", () => {
      bagCounters.forEach((bagCounter) => {
        let count = parseInt(bagCounter.textContent);
        bagCounter.textContent = count + 1;
      });

      if (
        !addButton.previousElementSibling ||
        !addButton.previousElementSibling.classList.contains("count-display")
      ) {
        const countDisplay = document.createElement("span");
        countDisplay.textContent = "1";
        countDisplay.classList.add("count-display");

        subtractButton.addEventListener("click", () => {
          let count = parseInt(bagCounters[0].textContent);
          let itemCount = parseInt(countDisplay.textContent);

          if (itemCount > 0) {
            bagCounters.forEach((bagCounter) => {
              bagCounter.textContent = count - 1;
            });
            countDisplay.textContent = itemCount - 1;
          }

          if (parseInt(countDisplay.textContent) === 0) {
            countDisplay.remove();
            subtractButton.remove();
          }
        });

        addButton.parentNode.insertBefore(subtractButton, addButton);
        addButton.parentNode.insertBefore(countDisplay, addButton);
      } else {
        const countDisplay = addButton.previousElementSibling;
        countDisplay.textContent = parseInt(countDisplay.textContent) + 1;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".product-categories button");
  const sliderItems = document.querySelectorAll(".slider-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      const category = button.getAttribute("data-category");

      sliderItems.forEach((item) => {
        item.style.display = "none";
      });

      const matchingItem = document.querySelector(`.slider-item.${category}`);
      if (matchingItem) {
        matchingItem.style.display = "block";
      }
    });
  });
});

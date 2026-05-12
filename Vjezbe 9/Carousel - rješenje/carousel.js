const track = document.getElementById("sliderTrack");
const images = track.querySelectorAll("img");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const indicatorsContainer = document.getElementById("indicators");

let currentIndex = 0;
const totalImages = images.length;

for (let i = 0; i < totalImages; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active"); 

  dot.addEventListener("click", () => {
    currentIndex = i;
    updateSlider();
  });

  indicatorsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

function updateSlider() {
  const slideWidth = images[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}


function slideNext() {
  currentIndex++;
  if (currentIndex >= totalImages) {
    currentIndex = 0;
  }
  updateSlider();
}

function slidePrev() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = totalImages - 1;
  }
  updateSlider();
}


nextBtn.addEventListener("click", slideNext);
prevBtn.addEventListener("click", slidePrev);


document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    slideNext();
  } else if (e.key === "ArrowLeft") {
    slidePrev();
  }
});


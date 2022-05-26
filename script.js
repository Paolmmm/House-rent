"use strict";
const contactsLink = document.querySelector(".header__nav > li:last-child");
const headerLinks = document.querySelectorAll(
  ".header__nav > li:not(:last-child)"
);
const contactsBtn = document.querySelector(".contacts__btn");
const footer = document.querySelector(".footer");
const ctaBtns = document.querySelectorAll(".btn--cta");
const gallery = document.querySelector(".section--gallery__container");
const galleryImgs = gallery.querySelectorAll("img");
const slider = document.querySelector(".slider");
const sliderContainer = document.querySelector(".slider__container");
const sliderCurrentImg = slider.querySelector("img");
const counterTotal = document.querySelector(".overlay__counter__total");
const counterCurrent = document.querySelector(".overlay__counter__current");

// TOGGLE CONTACTS
function toggleContacts() {
  const span = contactsBtn.querySelector("span");
  contactsBtn.querySelector("p").classList.add("hidden");

  if (span.innerText === "chat") {
    contactsBtn.querySelector("span").innerText = "close";
  } else {
    contactsBtn.querySelector("span").innerText = "chat";
  }

  contactsBtn.parentElement
    .querySelectorAll(`a`)
    .forEach((btn) => btn.classList.toggle("hidden"));
}

contactsLink.addEventListener("click", () => toggleContacts());
contactsBtn.addEventListener("click", () => toggleContacts());

// SCROLL INTO VIEW
headerLinks.forEach((link) =>
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const section = link.querySelector("a").getAttribute("href").slice(1);

    function scroll(position) {
      document
        .getElementById(section)
        .scrollIntoView({ behavior: "smooth", block: position });
    }

    section === "gallery" ? scroll("start") : scroll("center");
  })
);

ctaBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    footer.scrollIntoView({ behavior: "smooth", block: "end" });
  })
);

// MAP
const map = L.map("map", { scrollWheelZoom: false }).setView(
  [40.952199, 17.2977163],
  17
);
L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
L.marker([40.952199, 17.2977163]).addTo(map);

// SLIDER
counterTotal.innerText = galleryImgs.length;

function slide(direction) {
  sliderCurrentImg.src =
    galleryImgs[+counterCurrent.innerText]?.getAttribute("src") ||
    galleryImgs[0].getAttribute("src");

  if (direction) {
    counterCurrent.innerText < galleryImgs.length
      ? counterCurrent.innerText++
      : (counterCurrent.innerText = 1);
  } else {
    counterCurrent.innerText > 1
      ? counterCurrent.innerText--
      : (counterCurrent.innerText = galleryImgs.length);
  }
}

gallery.addEventListener("click", (e) => {
  if (!e.target.src) return;

  slider.classList.remove("hidden");
  sliderCurrentImg.src = e.target.src;

  counterCurrent.innerText =
    [...galleryImgs].findIndex((img) => img.src === sliderCurrentImg.src) + 1;
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    slider.classList.add("hidden");
  }

  if (e.key === "ArrowRight" && !slider.classList.contains("hidden")) {
    slide(true);
  }

  if (e.key === "ArrowLeft" && !slider.classList.contains("hidden")) {
    slide();
  }
});

slider.addEventListener("click", (e) => {
  if (!e.target.closest("button")) return;
  const btn = e.target.closest("button");

  if (btn.classList.contains("slider__arrow--forward")) {
    slide(true);
  }

  if (btn.classList.contains("slider__arrow--back")) {
    slide(false);
  }

  if (btn.classList.contains("overlay__close")) {
    slider.classList.add("hidden");
  }

  if (btn.classList.contains("overlay__fullscreen")) {
    const icon = btn.querySelector("span");
    console.log("1");

    if (document.fullscreenElement) {
      document.exitFullscreen();
      icon.innerText = "zoom_out_map";
    } else {
      document.documentElement.requestFullscreen();
      icon.innerText = "zoom_in_map";
    }
  }

  if (btn.classList.contains("overlay__zoom")) {
    const icon = btn.querySelector("span");
    console.log(btn);

    if (icon.innerText === "zoom_in") {
      sliderCurrentImg.style.width = "100%";
      sliderCurrentImg.style.height = "auto";
      sliderContainer.style.justifyContent = "unset";
      sliderContainer.style.alignItems = "start";
      icon.innerText = "zoom_out";
    } else {
      [sliderCurrentImg, sliderContainer].forEach((el) =>
        el.removeAttribute("style")
      );
      icon.innerText = "zoom_in";
    }
  }
});

// OBSERVER GALLERY
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("small");
    observer.unobserve(entry.target);
  });
});

galleryImgs.forEach((img) => {
  io.observe(img);
});

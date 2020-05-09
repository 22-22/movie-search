const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    451: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    769: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

export default swiper;

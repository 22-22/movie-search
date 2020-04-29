//let mySwiper = document.querySelector('.swiper-container').swiper
window.addEventListener('DOMContentLoaded', () => {
 // getMovieInfo();
});

function getMovieInfo() {
  const url = `https://www.omdbapi.com/?s=Coward&page=1&apikey=960b025e`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      data.Search.forEach(el => {
        let slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.insertAdjacentHTML('afterbegin', '<a class="film-rating"></a>');
        slide.insertAdjacentHTML('afterbegin', `<div class="film-year">${el.Year}</div>`);
        slide.insertAdjacentHTML('afterbegin', `<div class="film-poster" style="background-image: url(${el.Poster}); " ></div>`);
        slide.insertAdjacentHTML('afterbegin', `<div class="film-name">${el.Title}</div>`);
        document.querySelector('.swiper-wrapper').append(slide)
      })
      initializeSlider();
    }) 
}

function initializeSlider() {
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
  
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    },
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  return swiper;
}




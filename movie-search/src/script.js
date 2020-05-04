const posterNotFound = './img/image-not-found.png';
let keyWord;
let isSearch = false;
let pageCount = 2;
let info = document.querySelector('.info');

// let swiper = document.querySelector('.swiper-container').swiper

window.addEventListener('DOMContentLoaded', () => {
  displayMovieInfo('Blade runner', 1);
});

function loadTranslation(keyWord) {
  const urlTranslation = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${keyWord}&lang=ru-en`
  return fetch(urlTranslation)
    .then(response => response.json())
}

function loadMovie(text, pageCount) {
  return fetch(`https://www.omdbapi.com/?s=${text}&page=${pageCount}&apikey=ce9895c5`)
    .then(response => response.json())
}

function createSlide(movie) {
  movie.Search.forEach(el => {
    let slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.insertAdjacentHTML('afterbegin', `<div class="film-year">${el.Year}</div>`);
    let poster = el.Poster === 'N/A' ? posterNotFound : el.Poster;
    slide.insertAdjacentHTML('afterbegin', `<div class="film-poster" style="background-image: url(${poster}); " ></div>`);
    slide.insertAdjacentHTML('afterbegin', `<a href="https://www.imdb.com/title/${el.imdbID}/" class="film-name" target="_blank">${el.Title}</a>`);
       fetch(`https://www.omdbapi.com/?i=${el.imdbID}&apikey=ce9895c5`)
      .then(response => response.json())
      .then(movie => {
        slide.insertAdjacentHTML('beforeend', `<a class="film-rating">${movie.imdbRating}</a>`);
        swiper.appendSlide(slide);
        swiper.update();
        document.querySelector('.loader').style.display = 'none';
      })
  })
}

function displayMovieInfo(keyWord, pageCount) {
  swiper.removeAllSlides();
  swiper.update();
  document.querySelector('.loader').style.display = 'block';
  let engNum = /[a-zA-Z0-9]/;
  if (engNum.test(keyWord)) {
    loadMovie(keyWord, pageCount)
      .then(createSlide)
      .catch(err => 
    info.innerHTML = `No results for <strong>${keyWord}</strong>`)
  } else {
    info.innerHTML = `Showing results for <strong>${keyWord}</strong>`;
    loadTranslation(keyWord)
      .then(translation => loadMovie(translation.text, pageCount))
      .then(createSlide)
      .catch(err => info.innerHTML = `No results for <strong>${keyWord}</strong>`)
  }
}

// form submit
document.querySelector('.search').addEventListener('submit', (e) => {
  e.preventDefault();
  info.innerHTML = '';
  keyWord = document.querySelector('.search-input').value;
  isSearch = true;
  displayMovieInfo(keyWord, 1);
})

let swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  // initialSlide: 0,
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
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

swiper.on('slideChange', function () {
  if (isSearch === true) {
    pageCount = 2;
  }
  if (swiper.activeIndex === 7) {
    isSearch = false;
    keyWord = document.querySelector('.search-input').value;
    displayMovieInfo(keyWord, pageCount);
    pageCount++;
  }
});

document.querySelector('.search-clear').addEventListener('click', (e) => {
  document.querySelector('.search').reset();
})




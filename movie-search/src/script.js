const posterNotFound = './img/image-not-found.png';
let keyWord;
let pageCount = 1;
//let isSearch = false;

// let swiper = document.querySelector('.swiper-container').swiper

window.addEventListener('DOMContentLoaded', () => {
  getMovieInfo('Blade runner', 1);
});

function createCard(el) {
  let slide = document.createElement('div');
  slide.classList.add('swiper-slide');
  slide.insertAdjacentHTML('afterbegin', `<div class="film-year">${el.Year}</div>`);
  let poster = el.Poster === 'N/A' ? posterNotFound : el.Poster;
  slide.insertAdjacentHTML('afterbegin', `<div class="film-poster" style="background-image: url(${poster}); " ></div>`);
  slide.insertAdjacentHTML('afterbegin', `<a href="https://www.imdb.com/title/${el.imdbID}/" class="film-name" target="_blank">${el.Title}</a>`);
  return slide;
}

function getMovieInfo(keyWord, pageCount) {
 swiper.removeAllSlides();
 swiper.update();
 
  document.querySelector('.loader').style.display = 'block';
  let engNum = /[a-zA-Z0-9]/;
  if (!engNum.test(keyWord)) {
    const urlTr = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200425T122428Z.8ca2d87f5b800f7e.9a40ebb21a85ec1dd1d616f3bb88861b71b6b3b7&text= ${keyWord} &lang=ru-en`;
    fetch(urlTr)
      .then(res => res.json())
      .then(data => {
       let translated = data.text.toString().trim();
       const urlMovie = `https://www.omdbapi.com/?s=${translated}&page=${pageCount}&apikey=ce9895c5`;
    fetch(urlMovie)
      .then(respons => respons.json())
      .then(dat => {
        console.log(dat)
        dat.Search.forEach((el) => {
          let slideA = createCard(el);
          const urlRating = `https://www.omdbapi.com/?i=${el.imdbID}&apikey=ce9895c5`;
          fetch(urlRating)
            .then(res => res.json())
            .then(result => {
              slideA.insertAdjacentHTML('beforeend', `<a class="film-rating">${result.imdbRating}</a>`);
              swiper.appendSlide(slideA);
              swiper.update();
            })
        })
      })
        document.querySelector('.loader').style.display = 'none';
      })
  } else {
    const urlMovie = `https://www.omdbapi.com/?s=${keyWord}&page=${pageCount}&apikey=af56d13e`;
    fetch(urlMovie)
      .then(respons => respons.json())
      .then(dat => {
        console.log(dat)
        dat.Search.forEach((el) => {
          let slideA = createCard(el);
          const urlRating = `https://www.omdbapi.com/?i=${el.imdbID}&apikey=af56d13e`;
          fetch(urlRating)
            .then(res => res.json())
            .then(result => {
              slideA.insertAdjacentHTML('beforeend', `<a class="film-rating">${result.imdbRating}</a>`);
              swiper.appendSlide(slideA);
              swiper.update();
            //  swiper.slideTo(0, 400, false);
            })
        })
      })
        document.querySelector('.loader').style.display = 'none';
  }
}

// form submit
document.querySelector('.search').addEventListener('submit', (e) => {
  e.preventDefault();
  keyWord = document.querySelector('.search-input').value;
 
  getMovieInfo(keyWord, 1);
 
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
  if (swiper.activeIndex === 7) {
  keyWord = document.querySelector('.search-input').value;
  getMovieInfo(keyWord, pageCount);
  pageCount++;
  }
});

document.querySelector('.search-clear').addEventListener('click', (e) => {
  document.querySelector('.search').reset();
})




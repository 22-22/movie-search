import swiper from './swiper';
import createKeyboard from './keyboard';
import recognition from './speech-recognition';
import isEnglish from './isEnglish';
import loadMovie from './loadMovie';

const posterNotFound = './img/image-not-found.png';
const movieKey = '960b025e';
const host = 'https://www.omdbapi.com/';
const info = document.querySelector('.info');
let isSearch = false;
let counter = 2;

function loadTranslation(keyWord) {
  const urlTranslation = 'https://translate.yandex.net/api/v1.5/tr.json/translate?'
    + `key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${keyWord}&lang=ru-en`;
  return fetch(urlTranslation)
    .then((response) => response.json());
}

// function loadMovie(text, pageCount) {
//   return fetch(`${host}?s=${text}&page=${pageCount}&apikey=${movieKey}`)
//     .then((response) => {
//       if (!response.ok) document.querySelector('.err')
// .innerHTML = 'Sorry, too many requests for today<br>';
//       return response.json();
//     })
//     .then((data) => {
//       if ('Error' in data) document.querySelector('.err').innerHTML = `Sorry! ${data.Error}`;
//       return data.Search;
//     });
// }

function fetchRating(movie) {
  return fetch(`${host}?i=${movie.imdbID}&apikey=${movieKey}`)
    .then((response) => response.json());
}

function addRating(movies) {
  return Promise.all(movies.map((movie) => fetchRating(movie)
    .then((rating) => ({ ...movie, rating }))));
}

function awaitImageLoaded(imgElement) {
  return new Promise((resolve) => {
    if (imgElement.complete) {
      resolve();
    } else {
      imgElement.addEventListener('load', () => resolve(), { once: true });
      imgElement.addEventListener('error', () => resolve(), { once: true });
    }
  });
}

function prefetchImages(images) {
  const promises = images.map((image) => {
    const imgElement = document.createElement('img');
    imgElement.src = image === 'N/A' ? posterNotFound : image;
    return awaitImageLoaded(imgElement);
  });
  return Promise.all(promises);
}

function removeSlides() {
  swiper.removeAllSlides();
  swiper.update();
}

function renderSlides(movies) {
  const slides = movies.map((movie) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.insertAdjacentHTML('afterbegin', `<div class="film-year">${movie.Year}</div>`);
    const poster = movie.Poster === 'N/A' ? posterNotFound : movie.Poster;
    slide.insertAdjacentHTML('afterbegin',
      `<div class="film-poster" style="background-image: url(${poster}); " ></div>`);
    slide.insertAdjacentHTML('afterbegin',
      `<a href="https://www.imdb.com/title/${movie.imdbID}/videogallery/" class="film-name" target="_blank">${movie.Title}</a>`);
    slide.insertAdjacentHTML('beforeend', `<a class="film-rating">${movie.rating.imdbRating}</a>`);
    return slide;
  });
  removeSlides();
  swiper.appendSlide(slides);
  swiper.update();
  document.querySelector('.loader').style.display = 'none';
}

function handleError(err) {
  info.innerHTML = `No results for <strong>${document.querySelector('.search-input').value}</strong>`;
  if (document.querySelector('.err').innerHTML === '') {
    document.querySelector('.err').innerHTML = err.message;
  }
  document.querySelector('.loader').style.display = 'none';
}

function displaySlidesWithMovieInfo(keyWord, pageCount) {
  document.querySelector('.loader').style.display = 'block';
  if (isEnglish(keyWord)) {
    loadMovie(keyWord, pageCount)
      .then((movies) => addRating(movies))
      .then((movies) => {
        const posters = movies.map((movie) => movie.Poster);
        return prefetchImages(posters).then(() => movies);
      })
      .then((movies) => renderSlides(movies))
      .catch((err) => handleError(err));
  } else {
    info.innerHTML = `Showing results for <strong>${keyWord}</strong>`;
    loadTranslation(keyWord)
      .then((translation) => loadMovie(translation.text, pageCount))
      .then((movies) => addRating(movies))
      .then((movies) => {
        const posters = movies.map((movie) => movie.Poster);
        return prefetchImages(posters).then(() => movies);
      })
      .then((movies) => renderSlides(movies))
      .catch((err) => handleError(err));
  }
}

function searchMovie() {
  isSearch = true;
  const keyWord = document.querySelector('.search-input').value;
  if (keyWord === '') {
    info.innerHTML = 'Please enter a search query';
    return;
  }
  displaySlidesWithMovieInfo(keyWord, 1);
}

// form submit
document.querySelector('.search').addEventListener('submit', (e) => {
  e.preventDefault();
  info.innerHTML = '';
  document.querySelector('.err').innerHTML = '';
  searchMovie(e);
});

document.querySelector('.search-clear').addEventListener('click', () => {
  document.querySelector('.search').reset();
});

swiper.on('slideChange', () => {
  info.innerHTML = '';
  const pageCount = isSearch === true ? 2 : counter;
  if (isSearch === true) counter = 2;
  const SlidesPerView = swiper.currentBreakpoint === '768' ? 3 : 2;
  if (swiper.activeIndex === swiper.slides.length - SlidesPerView) {
    isSearch = false;
    const keyWord = document.querySelector('.search-input').value;
    if (keyWord === '') {
      info.innerHTML = 'Please enter a search query';
      return;
    }
    displaySlidesWithMovieInfo(keyWord, pageCount);
    counter += 1;
  }
});

// speech recognition
document.querySelector('.search-mic').addEventListener('click', () => recognition.start());

window.addEventListener('DOMContentLoaded', () => {
  displaySlidesWithMovieInfo('Blade runner', 1);
  createKeyboard();
  document.querySelector('#Enter').addEventListener('click', (e) => {
    e.preventDefault();
    info.innerHTML = '';
    document.querySelector('.err').innerHTML = '';
    searchMovie();
  });
});

export default loadTranslation;

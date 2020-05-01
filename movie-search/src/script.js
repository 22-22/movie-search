const posterNotFound = './img/image-not-found.png'

window.addEventListener('DOMContentLoaded', () => {
  getMovieInfo('Blade runner', 1);
});

function getMovieInfo(keyWord, page) {
  const url = `https://www.omdbapi.com/?s=${keyWord}&page=${page}&apikey=960b025e`;
  document.querySelector('.loader').style.display = 'block';
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.Search.forEach((el, idx) => {
        let slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.insertAdjacentHTML('afterbegin', `<div class="film-year">${el.Year}</div>`);
        let poster = el.Poster === 'N/A' ? posterNotFound : el.Poster;
        slide.insertAdjacentHTML('afterbegin', `<div class="film-poster" style="background-image: url(${poster}); " ></div>`);
        slide.insertAdjacentHTML('afterbegin', `<a href="https://www.imdb.com/title/${el.imdbID}/" class="film-name" target="_blank">${el.Title}</a>`);
      
        const urlRating = `https://www.omdbapi.com/?i=${el.imdbID}&apikey=960b025e`;
        fetch(urlRating)
          .then(res => res.json())
          .then(result => {
            console.log(slide);
            slide.insertAdjacentHTML('beforeend', `<a class="film-rating">${result.imdbRating}</a>`);
            swiper.appendSlide(slide);
           swiper.update();
          })
      })
      document.querySelector('.loader').style.display = 'none';
    })
}

// function translateTitle(keyWord) {
//   let translated = '';
//   const urlTr = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200425T122428Z.8ca2d87f5b800f7e.9a40ebb21a85ec1dd1d616f3bb88861b71b6b3b7&text= ${keyWord} &lang=ru-en`;
//   fetch(urlTr)
//     .then(res => res.json())
//     .then(data => {
//      let translated = data.text;
//     })
   
// }

// form submit
document.querySelector('.search').addEventListener('submit', (e) => {
  e.preventDefault();
  let keyWord = document.querySelector('.search-input').value;
  document.querySelector('.swiper-wrapper').innerHTML = '';
  swiper.update();

  // let eng = /[a-zA-Z]/;
  // if (!eng.test(keyWord)) {
  //   let translatedTitle = translateTitle(keyWord);
  //   getMovieInfo(translatedTitle, 1);
  // } else {
    getMovieInfo(keyWord, 1);
 // }

})

document.querySelector('.search-clear').addEventListener('click', (e) => {
  document.querySelector('.search').reset();
})

  let swiper = new Swiper('.swiper-container', {
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
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

    swiper.on('reachEnd', () => {
        console.log('hi');       
      })





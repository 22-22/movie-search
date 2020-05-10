function loadMovie(text, pageCount) {
  return fetch(`https://www.omdbapi.com/?s=${text}&page=${pageCount}&apikey=960b025e`)
    .then((response) => {
      if (!response.ok) document.querySelector('.err').innerHTML = 'Sorry, too many requests for today<br>';
      return response.json();
    })
    .then((data) => {
      if ('Error' in data) document.querySelector('.err').innerHTML = `Sorry! ${data.Error}`;
      return data.Search;
    });
}

export default loadMovie;

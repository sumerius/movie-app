console.log('hi');

// Go back in browser history
function goBack() {
  window.history.back();
}

const api_key = 'f23a624fd8704f7b8261ca835ef4e069';
const api_url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const img_path = 'https://image.tmdb.org/t/p/w300';
const search_url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&include_adult=false&language=en-US&query=`;
const trending_url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`;
const img_path_hires = 'https://image.tmdb.org/t/p/w1280';
const movie_url = `https://api.themoviedb.org/3/movie/`
const movie_url_options = `?api_key=${api_key}&language=en-US`;

const marqueeReel = document.querySelector('.marquee-content');
const gallery = document.querySelector('.carousel-inner');
const galleryThumbnails = document.querySelector('.carousel-indicators');
const main = document.querySelector('main');
const searchContainerMain = document.querySelector('#search-container-main');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const header = document.querySelector('header');

// Initiate Data Fetch
getTrending(trending_url);
// getMovies(api_url);

// Fetch Trending Movies
async function getTrending(url) {
  const response = await fetch(url);
  const data = await response.json();

  showTrending(data.results);
}

// // Fetch Currently Popular Movies
// async function getMovies(url) {
//   const resp = await fetch(url);
//   const respData = await resp.json();

//   showMovies(respData.results);
// }

// // Fetch Movie Details by Id
// async function fetchMovie(movieId) {
//   const response = await fetch(movie_url + movieId + movie_url_options);
//   const data = await response.json();

//   watchMovie(data);
// }

function showTrending(films) {
  gallery.innerHTML = '';
  galleryThumbnails.innerHTML = '';

  films.forEach((film, index) => {
    const { title,
            poster_path,
            vote_average,
            backdrop_path,
            overview,
            release_date,
            genre_ids,
            id
          } = film;

    const filmSlide = document.createElement('div');
    filmSlide.classList.add('carousel-item');
    index === 0 ? filmSlide.className += " active" : '';
    filmSlide.style.backgroundImage = `url("${img_path_hires + backdrop_path}")`;
    
    // Slides output
    filmSlide.innerHTML = `
      <div class="fade-overlay"></div>
      <div class="carousel-caption d-md-block">
      <!-- <div class="carousel-caption d-none d-md-block"> -->
        <h2 class="display-4">${title}</h2>
          <p class="lead overview-header__stats">
            <span class="carousel-caption-overview">${new Date(release_date).getFullYear()}</span> 
            <span class="pipe carousel-caption-overview">|</span> 
            <span class="carousel-caption-overview">
              <i class="${vote_average == 0 ? "" : getClassByRate(vote_average).star}"></i> ${vote_average == 0 ? "" : vote_average} </span>
            <span class="pipe carousel-caption-overview">|</span> 
            <span class="carousel-caption-overview">${getGenres(genre_ids)}</span>
          </p>
        <div class="film-details">
          <a class="button-container-${index}" href="#"></a>
          <p class="lead">${overview.substring(0, 200)}...</p>
        </div>
      </div>
      `;
      
      gallery.appendChild(filmSlide);

      // Create a button and attach click event listener
      const button = document.createElement("button");
      button.classList.add('btn-custom');
      button.className += ' mb-3'
      button.innerHTML = '<i class="fas fa-play"></i> Play';
      button.addEventListener('click', function() {
        fetchMovie(id);
      });
      // On each forEach iteration attach the button to an element with 
      // a unique id
      document.querySelector(".button-container-" + index).appendChild(button);

    // Icons output
    const filmElement = document.createElement('li');
    // index === 0 ? filmElement.className += " active" : '';
    filmElement.setAttribute("data-target", "#carousel-main");
    filmElement.setAttribute("data-slide-to", `${index}`);
    filmElement.innerHTML = `
      <div class="card-dummy">
        <img src="${img_path + poster_path}">
      </div>
    `
    marqueeReel.appendChild(filmElement);
  });

  // Fill marquee space between last and first card 
  infiniteMarquee();
}

// function showMovies(movies) {
//   main.innerHTML = '';
//   main.innerHTML = `<div class="section-title">POPULAR NOW<span class="section-backlogo">POPULAR</span></div>`

//   movies.forEach((movie, index) => {
//     const { title, 
//             poster_path,
//             vote_average, 
//             backdrop_path,
//             overview,
//             release_date,
//             genre_ids,
//             id
//           } = movie;

//     const movieElement = document.createElement('div');
//     movieElement.classList.add('movie');

//     movieElement.innerHTML = `
//       <div id="burger" class="burger">
//         <div class="line1"></div>
//         <div class="line2"></div>
//         <div class="line3"></div>
//       </div>
      
//       <div class="img-container">
//         <div class="img" style="background-image: url('${img_path + poster_path}');"></div>
//         <div class="overlay"></div>
//       </div>
//       <div class="movie-info">
//         <div class="overview">
//           <div class="overview-header">
//             <h3>${title}</h3>
//             <div class="overview-header__stats">
//               <span>${new Date(release_date).getFullYear()}</span> 
//               <span class="pipe">|</span> 
//               <span class="${getClassByRate(vote_average).class}">
//                 ${vote_average} <i class="${getClassByRate(vote_average).star}"></i></span>
//               <span class="pipe">|</span> 
//               <span>${getGenres(genre_ids)}</span>
//             </div>
//           </div>
          
//           <div class="overview-body">
//             <p>${overview}</p>
//           </div>
//           <div class="overview-footer">
//           </div>          
//         </div>
//       </div>
//     `

//     // On each forEach iteration attach the button to an element with 
//     main.appendChild(movieElement);
//     movieElement.addEventListener('click', function() {
//       fetchMovie(id);
//     });
//   });
// }

// function watchMovie(movie) {
//   const { 
//     title, 
//     poster_path,
//     vote_average, 
//     backdrop_path,
//     overview,
//     release_date,
//     genre_ids
//   } = movie;

//   header.innerHTML = '';
//   main.innerHTML = '';
//   main.innerHTML = `
//     <div class="section-title">${title}<span class="section-backlogo">${title}</span></div>
//     <h1>${title}</h1>
//   `
// }

// click on #burger will now work
// document.querySelector("#burger").click();

function getClassByRate(rate) {
  if (rate == 0) {
    return {
      class: "hide",
    }
  } else if (rate >= 7) {
    return {
      class: "green",
      star: "fas fa-star"
    }
  } else if (rate > 5) {
    return {
      class: "orange",
      star: "fas fa-star-half"
    }
  } else {
    return {
      class: "red",
      star: "far fa-star"
    }
  }
}

searchForm.addEventListener('submit', (e) => {
  const searchValue = searchInput.value;
  e.preventDefault();
  
  if (searchValue) {
    header.innerHTML = '';
    main.innerHTML = '';
    document.querySelector('header').innerHTML = '';
    getMovies(search_url + searchValue);
    searchInput.value = '';
  }
});

// Loop search inputs for value
// searchForms.forEach((form) => {
//   form.addEventListener('submit', (e) => {
//     let searchValue = form.querySelector('.search-input').value;
//     e.preventDefault();
    
//     if (searchValue) {
//       main.innerHTML = '';
//       document.querySelector('header').innerHTML = '';
//       document.querySelector('#search-container-nav').style.visibility = 'unset';
//       getMovies(search_url + searchValue);
//       form.querySelector('.search-input').value = '';
//     }
//   });
// });

// function onhover() {
//   console.log('hi');
//   document.querySelector('.movie-info').className = 'movie-info-active';
// }

document.addEventListener('click', function(e){
  if(e.target && e.target.id == 'burger'){
    console.log('listener attached to document');
   }
});

// event added to the #burger parent element
document.querySelector("main").addEventListener('click', function(e) {
	if(e.target.id == 'burger') {
		console.log("listener attached to <main>");
	}
});

// document.addEventListener('click', (e) => {
//   if(e.target && e.target.id == 'movie-link') {
//     console.log('clicked to fetch movie info');
//     fetchMovie(497582);
//   }
// });

// function clickWatch(index) {
//   document.addEventListener('click', function(e) {
//     if(e.target && e.target.id == 'movie-link') {
//       console.log('clicked from closure ', index);
//     }
//   });
// }

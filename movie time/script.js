/*SIGN IN AND SIGN UP PAGES*/
function showNextQuestion(currentQuestion) {
  var currentQuestionDiv = document.getElementById(currentQuestion);
  var nextQuestionDiv = document.getElementById(currentQuestion + "-next");

  if (currentQuestionDiv && nextQuestionDiv) {
    currentQuestionDiv.classList.remove("visible");
    currentQuestionDiv.style.display = "none";
    nextQuestionDiv.classList.add("visible");
    nextQuestionDiv.style.display = "block";
  }
}

function submitForm() {
  const form = document.getElementById("signupform");
  const formData = new FormData(form);
  $.ajax({
    url: 'sign_up.php',
    method: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      showNextQuestion("question1-next-next-next-next-next-next")
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });
}

function controlTC() {
  tc = document.getElementById("tc").value
  if (!tc) {
    alert("TC alanı boş bırakılamaz.");
  } else {
    const pattern = /^[1-9]{1}[0-9]{9}[02468]{1}$/;
    const result = pattern.test(tc);
    if (!result) {
      alert("TC numarası geçersiz.");
    } else {
      showNextQuestion('question1-next-next-next-next-next')
    }
  }
}

function controlName() {
  fullName = document.getElementById("name").value
  if (!fullName) {
    alert("Ad-Soyad alanı boş bırakılamaz.");
  } else {
    const pattern = /^[\p{L}\s'-]+$/u;
    const result = pattern.test(fullName);
    if (!result) {
      alert("Ad-Soyad sadece harf ve boşluk içerebilir.");
    } else {
      showNextQuestion("question1");
    }
  }

}


function controlPhoneNumber() {
  phoneNumber = document.getElementById("phone").value
  if (!phoneNumber) {
    alert("Telefon numarası alanı boş bırakılamaz.");
  } else {
    let characters = /[^0-9 ]/;
    if (characters.test(phoneNumber)) {
      alert("Telefon numarası sadece sayısal değer içerebilir.");
    } else {
      let length = phoneNumber.replace(/\s+/g, '');
      if (length.length < 9 || length.length > 12) {
        alert("Telefon numarası için eksik veya fazla değer girildi.");
      } else {
        let pattern = / ?0?\s?5[0-9]{2}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}\s?/;
        if (!pattern.test(phoneNumber)) {
          alert("Geçersiz telefon numarası");
        } else {
          submitForm();
        }
      }
    }
  }
}

function controlBirthDate() {
  date = document.getElementById("birthdate").value
  if (!date) {
    alert("Doğum Tarihi alanı boş bırakılamaz.");
  } else {
    let pattern = /^\s?[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}$/;
    let result = pattern.test(date);
    if (result != true) {
      alert("Tarih formatı geçersiz.");
    } else {
      let exploded = date.split(".");
      let day = parseInt(exploded[0]);
      let month = parseInt(exploded[1]);
      let year = parseInt(exploded[2]);
      if (day < 1 || day > 31 || month < 1 || month > 12 || year > new Date().getFullYear()) {
        alert("Geçersiz doğum tarihi.");
      } else {
        showNextQuestion('question1-next-next-next-next')
      }
    }
  }
}

function controlEmail() {
  email = document.getElementById("email").value
  if (!email) {
    alert("E-posta alanı boş bırakılamaz.");
  } else {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let result = pattern.test(email);
    if (result != true) {
      alert("E-posta formatı geçersiz.");
    } else {
      showNextQuestion('question1-next')
    }
  }
}

function controlPassword() {
  password = document.getElementById("password").value
  if (password.length < 8) {
    alert("Şifre en az 8 karakterden oluşmalıdır.");
  } else {
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      alert("Şifre en az 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir.");
    }
    else {
      showNextQuestion('question1-next-next');
    }
  }
}
function controlPasswordMatch() {
  password1 = document.getElementById("password").value
  password2 = document.getElementById("password2").value
  if (password1 !== password2) {
    alert("Şifre eşleşmiyor")
  } else {
    showNextQuestion('question1-next-next-next')
  }
}
function login() {
  var email = $("#eposta").val();
  var password = $("#password").val();

  $.ajax({
    url: "select.php",
    method: "POST",
    data: {
      email: email,
      password2: password
    },
    success: function (response) {
      response = JSON.parse(response)
      console.log(response);
      localStorage.setItem("unique_id", response.unique_id)
      window.location.href = "homepage.html";

    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });
}




/*HOMEPAGE*/
var currentPage = 1;

function fetchMovies() {
  $.ajax({
    url: 'https://api.themoviedb.org/3/discover/movie',
    type: 'GET',
    data: {
      api_key: '2105ebdbd3eedc75fc6350176fe1fd89',
      page: currentPage,
    },
    success: function (response) {
      var movies = response.results;

      movies.forEach(function (movie) {
        fetchMovieGenres(movie);
      });

    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });
}
function searchMovies() {
  var searchTerm = document.getElementById("searchInput").value;
  var quotedSearchTerm = `"${searchTerm}"`;

  if (searchTerm.trim() === "") {
    return;
  }
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    type: 'GET',
    data: {
      api_key: '2105ebdbd3eedc75fc6350176fe1fd89',
      query: quotedSearchTerm,
    },
    success: function (response) {
      var movies = response.results;
      console.log(movies);

      var moviesContainer = document.querySelector(".movies");
      moviesContainer.innerHTML = "";
      document.querySelector(".recommends1").innerHTML = ""
      document.querySelector(".recommends2").innerHTML = ""
      document.querySelector(".carousel").innerHTML = ""
      document.querySelector(".sidebar").innerHTML = ""
      allMoviesTitle = document.querySelector(".all-movies-title")
      $(allMoviesTitle).addClass("mt-3")
      allMoviesTitle.innerHTML = "<h5 class='mt-2'> " + quotedSearchTerm + " MOVIES</h5>"

      movies.forEach(function (movie) {
        fetchMovieGenres(movie);
      });

    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });
}

function fetchMovieGenres(movie) {
  $.ajax({
    url: 'https://api.themoviedb.org/3/movie/' + movie.id,
    type: 'GET',
    data: {
      api_key: '2105ebdbd3eedc75fc6350176fe1fd89',
    },
    success: function (response) {
      var genres = response.genres.map(function (genre) {
        return genre.name;
      });
      var moviesContainer = document.querySelector(".movies");
      movie.genres = genres;
      var card = createMovieCard(movie);
      moviesContainer.append(card);

    },
    error: function (xhr, status, error) {
      console.error(error);
    },
  });
}

function createMovieCard(movie) {
  const cardContainer = document.getElementById('movies')
  const flipCard = document.createElement('div');
  flipCard.className = 'flip-card';

  const flipCardInner = document.createElement('div');
  flipCardInner.className = 'flip-card-inner';

  const flipCardFront = document.createElement('div');
  flipCardFront.className = 'flip-card-front';

  const image = document.createElement('img');
  image.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  image.className = "card-img movie-poster"
  image.style = "height:300px; width:200px"

  flipCardFront.appendChild(image);
  flipCardInner.appendChild(flipCardFront);

  const flipCardBack = document.createElement('div');
  flipCardBack.className = 'flip-card-back';

  const name = document.createElement('h5');
  name.className = 'movie-title ms-3';
  name.textContent = movie.title;

  const genres = document.createElement('p');
  genres.className = 'genres-card ms-3'
  genres.textContent = movie.genres.join(', ');

  const voteAverage = document.createElement('p');
  voteAverage.textContent = movie.vote_average + '/10';

  const addWatchList = document.createElement("button")
  addWatchList.className = "addWatchList btn"
  addWatchList.innerHTML = "+ Add to Watchlist"

  flipCardBack.appendChild(name);
  flipCardBack.appendChild(genres);
  flipCardBack.appendChild(voteAverage);
  flipCardBack.appendChild(addWatchList);
  flipCardInner.appendChild(flipCardBack);

  flipCard.appendChild(flipCardInner);
  cardContainer.appendChild(flipCard)

  return flipCard;
}


function loadMore() {
  currentPage++;
  $(this).remove();
  fetchMovies();
  setTimeout(function () {
    addWatchList();
  }, 1000);
}

function filterMoviesByGenre(genreId) {
  var moviesContainer = document.querySelector(".movies");
  moviesContainer.innerHTML = "";

  fetchMoviesByGenre(genreId);
}
function fetchMoviesByGenre(genreId) {
  $.ajax({
    url: 'https://api.themoviedb.org/3/discover/movie',
    type: 'GET',
    data: {
      api_key: '2105ebdbd3eedc75fc6350176fe1fd89',
      with_genres: genreId,
    },
    success: function (response) {
      var movies = response.results;
      console.log(movies);
      var moviesContainer = document.querySelector(".movies");

      movies.forEach(function (movie) {
        fetchMovieGenres(movie);
      });
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });
}

var genreLinks = document.querySelectorAll(".genres a");
genreLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault(); 
    var genreId = link.getAttribute("data-genre-id");
    filterMoviesByGenre(genreId);
  });
});
var genreLinks = document.querySelectorAll(".genres-nav a");
genreLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    var genreId = link.getAttribute("data-genre-id");
    filterMoviesByGenre(genreId);
  });
});

//PROFILE
function getUser() {
  const user = localStorage.getItem("unique_id")
  console.log(user)
  $.ajax({
    url: 'select.php',
    method: 'POST',
    data: { unique_id: user },
    success: function (response) {
      response = JSON.parse(response)
      response_watchlist = JSON.parse(response.watchlist)
      response_user = JSON.parse(response.user)
      for (key in response_user) {
        profileKey = key + "-profile"
        if (document.getElementById(profileKey)) {
          document.getElementById(profileKey).innerHTML = response_user[key];
        }
      }
      cardContainer = document.querySelector(".watchlist-container")
      for (i = 0; i < response_watchlist.length; i++) {
        console.log(response_watchlist[i])
        const flipCard = document.createElement('div');
        flipCard.className = 'flip-card';
        const flipCardInner = document.createElement('div');
        flipCardInner.className = 'flip-card-inner';
        const flipCardFront = document.createElement('div');
        flipCardFront.className = 'flip-card-front';
        const image = document.createElement('img');
        image.src = response_watchlist[i].movie_img;
        image.className = "card-img movie-poster"
        image.style = "height:300px; width:200px"
        flipCardFront.appendChild(image);
        flipCardInner.appendChild(flipCardFront);
        const flipCardBack = document.createElement('div');
        flipCardBack.className = 'flip-card-back';
        const name = document.createElement('h5');
        name.className = 'movie-title ms-3';
        name.textContent = response_watchlist[i].movie_name;
        const removeWatchList = document.createElement("button")
        removeWatchList.className = "removeWatchList btn"
        removeWatchList.innerHTML = "-Delete from Watchlist"
        flipCardBack.appendChild(name);
        flipCardBack.appendChild(removeWatchList);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
        cardContainer.appendChild(flipCard)
      }
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });

}

function addWatchList() {
  var addButtonList = document.getElementsByClassName("addWatchList");
  for (var i = 0; i < addButtonList.length; i++) {
    addButtonList[i].addEventListener("click", function () {
      var movieCard = this.parentNode;
      var flipInner = movieCard.parentNode;
      var flipFront = flipInner.querySelector(".flip-card-front")
      var moviePoster = flipFront.querySelector(".movie-poster").src;
      var title = movieCard.querySelector(".movie-title").textContent;

      console.log(title)

      $.ajax({
        url: "addwatchlist.php",
        method: "POST",
        data: {
          unique_id: localStorage.getItem("unique_id"),
          movie_name: title,
          movie_img: moviePoster,

        },
        success: function (response) {
          console.log("Data saved successfully:", response);
        },
        error: function (xhr, status, error) {
          console.log("Error saving data:", error);
        }
      });
    });
  }
}


document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    addWatchList()
  }, 1000);
});

function searchUser() {
  var searchTerm = document.getElementById("searchInputUser").value;

  if (searchTerm.trim() === "") {
    return;
  }
  $.ajax({
    url: "select.php",
    method: "POST",
    data: {
      searchUser: searchTerm
    },
    success: function (response) {
      var moviesContainer = document.querySelector(".movies");
      moviesContainer.innerHTML = "";
      document.querySelector(".recommends1").innerHTML = ""
      document.querySelector(".recommends2").innerHTML = ""
      document.querySelector(".carousel").innerHTML = ""
      document.querySelector(".sidebar").innerHTML = ""
      allMoviesTitle = document.querySelector(".all-movies-title")
      $(allMoviesTitle).addClass("mt-3")
      allMoviesTitle.innerHTML = "<h5 class='mt-2'>USERS</h5>"
      if (response !== "null") {
        response = JSON.parse(response)
        console.log("User Found", response);
        for (i = 0; i < response.length; i++) {
          var card = document.createElement('div');
          $(card).addClass('user-card card');
          userName = document.createElement('div')
          $(userName).addClass("user-name")
          userEmail = document.createElement('div')
          $(userEmail).addClass("user-email")
          userName.innerHTML = '<i class="bi bi-person-circle" style="font-size: 2rem; color:black">' + '<a class="profile-link" onclick = getVisitUserId(this)>' + response[i].name + '</a>'
          userEmail.innerHTML = response[i].email
          userId = document.createElement("div")
          $(userId).addClass("userId")
          userId.innerHTML = response[i].unique_id
          card.append(userName, userEmail, userId)
          container = document.querySelector(".movies")
          container.append(card)
        }
      }
    },
    error: function (xhr, status, error) {
      console.log("Error", error);
    }
  });
}
function getVisitUserId(user) {
  var userCard = user.parentNode;
  userCard = userCard.parentNode;
  userCard = userCard.parentNode;
  localStorage.setItem("visit_unique_id", userCard.querySelector(".userId").innerHTML)
  window.location.href = "visit-profile.html"
}
function visitUser() {
  const user = localStorage.getItem("visit_unique_id")
  console.log(user)
  $.ajax({
    url: 'select.php',
    method: 'POST',
    data: { visit_unique_id: user },
    success: function (response) {
      response = JSON.parse(response)
      console.log(response)
      response_watchlist = JSON.parse(response.watchlist)
      response_user = JSON.parse(response.user)
      for (key in response_user) {
        profileKey = "user-" + key + "-profile"
        if (document.getElementById(profileKey)) {
          document.getElementById(profileKey).innerHTML = response_user[key];
        }
      }
      cardContainer = document.querySelector(".watchlist-container")
      for (i = 0; i < response_watchlist.length; i++) {
        console.log(response_watchlist[i])
        const flipCard = document.createElement('div');
        flipCard.className = 'flip-card';
        const flipCardInner = document.createElement('div');
        flipCardInner.className = 'flip-card-inner';
        const flipCardFront = document.createElement('div');
        flipCardFront.className = 'flip-card-front';
        const image = document.createElement('img');
        image.src = response_watchlist[i].movie_img;
        image.className = "card-img movie-poster"
        image.style = "height:300px; width:200px"
        flipCardFront.appendChild(image);
        flipCardInner.appendChild(flipCardFront);
        const flipCardBack = document.createElement('div');
        flipCardBack.className = 'flip-card-back';
        const name = document.createElement('h5');
        name.className = 'movie-title ms-3';
        name.textContent = response_watchlist[i].movie_name;
        const addWatchList = document.createElement("button")
        addWatchList.className = "addWatchList btn"
        addWatchList.innerHTML = "+ Add to Watchlist"
        flipCardBack.appendChild(name);
        flipCardBack.appendChild(addWatchList);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
        cardContainer.appendChild(flipCard)
      }
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });

}

function updateField() {

  var newEmail = $("#newEmail").val();
  var newPassword = $("#newPassword").val();
  var newPhone = $("#newPhone").val();
  var newBirthdate = $("#newBirthdate").val();
  var newName = $("#newName").val();

  submitButton = document.getElementById("update-button")

  $.ajax({
    url: 'update.php',
    method: 'POST',
    data: {
      unique_id: localStorage.getItem("unique_id"),
      newEmail: newEmail,
      newPassword: newPassword,
      newPhone: newPhone,
      newBirthdate: newBirthdate,
      newName: newName
    },

    success: function (response) {
      console.log(response);
      submitButton.remove()
      document.getElementById("options").style.display = "none"
      getUser();
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });
}

function showOptions() {
  document.querySelector(".update-card").style.display = "block"
}

function removeWatchList() {
  var removeButtonList = document.getElementsByClassName("removeWatchList");
  for (var i = 0; i < removeButtonList.length; i++) {
    removeButtonList[i].addEventListener("click", function () {
      var movieCard = this.parentNode;
      var flipInner = movieCard.parentNode;
      var flipFront = flipInner.querySelector(".flip-card-front")
      var moviePoster = flipFront.querySelector(".movie-poster").src;
      var title = movieCard.querySelector(".movie-title").textContent;

      console.log(title);
      console.log(moviePoster);
      console.log(removeButtonList);

      $.ajax({
        url: "delete.php",
        method: "POST",
        data: {
          unique_id: localStorage.getItem("unique_id"),
          movie_name: title,

        },
        success: function (response) {
          console.log("Data deleted successfully:", response);
          movieCard.remove()
          flipInner.remove()
        },
        error: function (xhr, status, error) {
          console.log("Error deleting data:", error);
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    removeWatchList()
  }, 1000);
});

function askPassword() {
  if (!document.getElementById("askPassword") && document.querySelector(".update-card").style.display == "none") {
    var lbl = document.createElement("label")
    lbl.innerText = "Enter your password:  "
    var options = document.getElementById("options")
    lbl.setAttribute("style", "font-size: 0.75rem;margin-right:10px");
    options.append(lbl)

    var password = document.createElement("input");
    password.setAttribute("type", "text");
    password.setAttribute("id", "askPassword");
    password.setAttribute("style", "margin-bottom:120px");
    options.append(password)

    var btn = document.createElement("button")
    btn.innerText = "Submit"
    options.append(btn)

    btn.addEventListener("click", function () {
      const user = localStorage.getItem("unique_id")
      var inputPassword = $("#askPassword").val();
      $.ajax({
        url: 'select.php',
        method: 'POST',
        data: { unique_id: user },
        success: function (response) {
          response = JSON.parse(response)
          response = JSON.parse(response.user)
          if (response.password == inputPassword) {
            showOptions()
            btn.remove()
            lbl.remove()
            password.remove()
          }
        },
        error: function (xhr, status, error) {
          console.error(error);
        }
      });

    })

  }
}

var carouselWidth = $(".r1-inner")[0].scrollWidth;
var cardWidth = $(".r1-item").width();
var scrollPosition = 0;
$(".control-next-r1").on("click", function () {
  if (scrollPosition < (carouselWidth - cardWidth * 4)) { 
    scrollPosition += cardWidth;  
    $(".r1-inner").animate({ scrollLeft: scrollPosition }, 600);
  }
});
$(".control-prev-r1").on("click", function () {
  if (scrollPosition > 0) {
    scrollPosition -= cardWidth;
    $(".r1-inner").animate(
      { scrollLeft: scrollPosition },
      600
    );
  }
});

var carouselWidth2 = $(".r2-inner")[0].scrollWidth;
var cardWidth2 = $(".r2-item").width();
var scrollPosition2 = 0;
$(".control-next-r2").on("click", function () {
  if (scrollPosition2 < (carouselWidth2 - cardWidth2 * 4)) { 
    scrollPosition2 += cardWidth2; 
    $(".r2-inner").animate({ scrollLeft: scrollPosition2 }, 600); 
  }
});
$(".control-prev-r2").on("click", function () {
  if (scrollPosition2 > 0) {
    scrollPosition2 -= cardWidth2;
    $(".r2-inner").animate(
      { scrollLeft: scrollPosition2 },
      600
    );
  }
});

function nowPlaying() {
  $.ajax({
    url: 'https://api.themoviedb.org/3/movie/now_playing',
    type: 'GET',
    data: {
      api_key: '2105ebdbd3eedc75fc6350176fe1fd89',
      page: 1,
    },
    success: function (response) {
      var movies = response.results;
      for (i = 0; i < 10; i++) {
        npTitle = document.querySelector(".np-title-" + (i + 1))
        npTitle.innerHTML = movies[i].title
        npVote = document.querySelector(".np-vote-" + (i + 1))
        npVote.innerHTML = movies[i].vote_average + "/10"
        npImg = document.querySelector(".np-img-" + (i + 1))
        npImg.src = 'https://image.tmdb.org/t/p/w500' + movies[i].poster_path
      }

    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });
}

function popular() {
  $.ajax({
    url: 'https://api.themoviedb.org/3/discover/movie?api_key=2105ebdbd3eedc75fc6350176fe1fd89&sort_by=popularity.desc',
    type: 'GET',
    data: {
      page: 1,
    },
    success: function (response) {
      var movies = response.results;
      for (i = 0; i < 10; i++) {
        npTitle = document.querySelector(".p-title-" + (i + 1))
        npTitle.innerHTML = movies[i].title
        npVote = document.querySelector(".p-vote-" + (i + 1))
        npVote.innerHTML = movies[i].vote_average + "/10"
        npImg = document.querySelector(".p-img-" + (i + 1))
        npImg.src = 'https://image.tmdb.org/t/p/w500' + movies[i].poster_path
      }

    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });
}





  
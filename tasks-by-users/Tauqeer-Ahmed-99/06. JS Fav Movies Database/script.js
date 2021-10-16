const addMovieMainBtn = document.getElementById("add-movie-btn-main");
const addMovieModal = document.getElementById("movie-modal-box");
const backDrop = document.querySelector(".backdrop");
const movieModalCancelBtn = document.getElementById("modal-cancel-btn");
const movieModalAddBtn = document.getElementById("modal-add-btn");
const noMovieAddedBox = document.querySelector(".no-movie-added-box-1");
const movieNameInput = document.getElementById("movie-name-input");
const movieUrlInput = document.getElementById("movie-url-input");
const movieRatingInput = document.getElementById("movie-rating-input");
const movieList = document.getElementById("movie-list");
const filteredMovieList = document.getElementById("filtered-movie-list");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const deleteMovieModal = document.querySelector(".delete-movie-modal");
const deleteMovieModalCancelBtn =
  deleteMovieModal.lastElementChild.querySelector("button");
let deleteMovieModalDeleteBtn =
  deleteMovieModal.lastElementChild.lastElementChild;

const movieListArray = [];

function toggleMovieList() {
  movieList.classList.toggle("visible");
}

function toggleFilteredMovieList() {
  filteredMovieList.classList.toggle("visible");
}

function toggleMovieModal() {
  addMovieModal.classList.toggle("visible");
}

function toggleBackDrop() {
  backDrop.classList.toggle("visible");
}

function toggleNoMovieAddedBox() {
  if (movieListArray.length) {
    noMovieAddedBox.className = "no-movie-added-box-1 invisible";
  } else if (!movieListArray.length) {
    noMovieAddedBox.className = "no-movie-added-box-1";
  }
}

function toggleDeleteMovieModal() {
  deleteMovieModal.classList.toggle("visible");
}

function addMovieMainBtnHandler() {
  toggleMovieModal();
  toggleBackDrop();
}

function checkingWhichModalIsOpen() {
  if (addMovieModal.className === "movie-modal visible") {
    toggleMovieModal();
    clearInputValues();
  }
  if (deleteMovieModal.className === "delete-movie-modal visible") {
    toggleDeleteMovieModal();
  }
}

function backDropHandler() {
  checkingWhichModalIsOpen();
  toggleBackDrop();
}

function movieModalCancelBtnHandler() {
  toggleMovieModal();
  toggleBackDrop();
  clearInputValues();
}

function renderMovieToList(filter = "", id, title, url, rating) {
  // const filteredMovies = !filter
  //   ? movieListArray
  //   : movieListArray.filter((movie) => movie.title.includes(filter));
  if (filter === "" && !movieListArray.length) {
    return;
  } else if (!filter && movieListArray.length) {
    const newMovieItem = document.createElement("li");
    newMovieItem.className = "movie-list-item-1";
    newMovieItem.innerHTML = `
    <div class="movie-element-image">
        <img src="${url}" alt="${title}">
    </div>
    <div id="tile-rating-bunch">
        <div class="movie-element-title">
          <h2>${title}</h2>
        </div>
        <div class="movie-element-rating">
          <h4>${rating}/5</h4>
       </div>
    </div>
    `;

    movieList.appendChild(newMovieItem);
    function newMovieItemHandler() {
      toggleDeleteMovieModal();
      toggleBackDrop();
      stratDeletion(id);
    }

    newMovieItem.addEventListener("click", newMovieItemHandler.bind(null, id));
  } else if (
    filter &&
    filteredMovieList.className !== "filtered-movie-list visible"
  ) {
    const filteredMovies = movieListArray.filter((movie) =>
      movie.title.includes(filter)
    );

    filteredMovies.forEach((movie) => {
      const filteredMovieItem = document.createElement("li");
      filteredMovieItem.className = "movie-list-item-2";
      filteredMovieItem.innerHTML = `
      <div class="movie-element-image">
          <img src="${movie.url}" alt="${movie.title}">
      </div>
      <div id="tile-rating-bunch">
          <div class="movie-element-title">
            <h2>${movie.title}</h2>
          </div>
          <div class="movie-element-rating">
            <h4>${movie.rating}/5</h4>
         </div>
      </div>
      `;

      filteredMovieList.appendChild(filteredMovieItem);
    });
    if (filteredMovies.length) {
      toggleMovieList();
    }
  }

  // if (filteredMovies === movieListArray) {
  //   newMovieItem.innerHTML = "";

  //   filteredMovies.forEach((movie) => {
  //     const newMovieItem = document.createElement("li");
  //     newMovieItem.className = "movie-list-item";

  //     let text = movie.title + " - ";
  //     for (const key in movie) {
  //       if (key !== "title") {
  //         text = text + `${key}: ${movie[key]}`;
  //       }
  //     }
  //     newMovieItem.textContent = text;
  //     movieList.append(newMovieItem);
  //   });
  // } else {
  //   const newMovieItem = document.createElement("li");
  //   newMovieItem.className = "movie-list-item";
  //   newMovieItem.innerHTML = `
  //   <div class="movie-element-image">
  //       <img src="${url}" alt="${title}">
  //   </div>
  //   <div id="tile-rating-bunch">
  //       <div class="movie-element-title">
  //         <h2>${title}</h2>
  //       </div>
  //       <div class="movie-element-rating">
  //         <h4>${rating}/5</h4>
  //      </div>
  //   </div>
  //   `;

  //   movieList.appendChild(newMovieItem);
  //   function newMovieItemHandler() {
  //     toggleDeleteMovieModal();
  //     toggleBackDrop();
  //     stratDeletion(id);
  //   }

  //   newMovieItem.addEventListener("click", newMovieItemHandler.bind(null, id));
  // }
}

function addMovieToDataBase() {
  const movieUrl = movieUrlInput.value;
  const movieName = movieNameInput.value;
  const movieRating = movieRatingInput.value;

  if (
    !movieName.trim() ||
    !movieUrl.trim() ||
    !movieRating.trim() ||
    +movieRating < 1 ||
    +movieRating > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }

  const movie = {
    id: Math.random().toString(),
    title: movieName,
    url: movieUrl,
    rating: movieRating,
  };

  movieListArray.push(movie);

  renderMovieToList("", movie.id, movie.title, movie.url, movie.rating);
}

function movieModalAddBtnHAndler() {
  addMovieToDataBase();
  toggleMovieModal();
  toggleBackDrop();
  toggleNoMovieAddedBox();
  clearInputValues();
}

function deleteMovieModalCancelbtnHandler() {
  toggleDeleteMovieModal();
  toggleBackDrop();
}

function stratDeletion(id) {
  function removeMovieFromDataBase(id1) {
    let movieIndex = 0;
    for (const movie of movieListArray) {
      if (id1 === movie.id) {
        break;
      }
      movieIndex++;
    }

    movieListArray.splice(movieIndex, 1);
    movieList.children[movieIndex]?.remove();
  }

  function deleteMovieModalDeleteBtnHandler(id1) {
    removeMovieFromDataBase(id1);
    toggleDeleteMovieModal();
    toggleBackDrop();
    toggleNoMovieAddedBox();
  }

  deleteMovieModalDeleteBtn.replaceWith(
    deleteMovieModalDeleteBtn.cloneNode(true)
  );

  deleteMovieModalDeleteBtn =
    deleteMovieModal.lastElementChild.lastElementChild;

  deleteMovieModalDeleteBtn.addEventListener(
    "click",
    deleteMovieModalDeleteBtnHandler.bind(null, id)
  );
}

function clearInputValues() {
  movieUrlInput.value = "";
  movieNameInput.value = "";
  movieRatingInput.value = "";
}

function searchMovieHandler() {
  const filterTerm = searchInput.value;
  renderMovieToList(filterTerm);
}

addMovieMainBtn.addEventListener("click", addMovieMainBtnHandler);
backDrop.addEventListener("click", backDropHandler);
movieModalCancelBtn.addEventListener("click", movieModalCancelBtnHandler);
movieModalAddBtn.addEventListener("click", movieModalAddBtnHAndler);
deleteMovieModalCancelBtn.addEventListener(
  "click",
  deleteMovieModalCancelbtnHandler
);
searchBtn.addEventListener("click", searchMovieHandler);

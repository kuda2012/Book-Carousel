const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("general_search");
const categoryInput = document.getElementById("categories_filter");
const authorInput = document.getElementById("author_filter");
const previewInput = document.getElementById("preview_filter");
const orderByInput = document.getElementById("order_by_filter");
const cardContainer = document.getElementById("cardContainer");
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?";
const containerUL = document.getElementById("containerUL");

var currentPage = 1;
var numberPerPage = 9;
var numberOfPages = 1;
var resp = null;

searchForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  parameters = {};
  if (searchInput.value) {
    parameters["q"] = searchInput.value;
  }
  if (categoryInput.value) {
    parameters["subject"] = categoryInput.value;
  }
  if (orderByInput.value) {
    parameters["orderBy"] = orderByInput.value;
  }
  if (previewInput.value) {
    parameters["filter"] = previewInput.value;
  }
  parameters["maxResults"] = 40;
  resp = await axios.get(BASE_URL, {
    params: parameters,
  });
  if (resp.data.items == null) {
    alert("Could not find any results, try a different entry");
    searchInput.value = "";
    return;
  }
  searchInput.value = "";
  console.log(resp);
  numberOfPages = getNumberOfPages(resp.data.items);
  firstPage(resp.data.items);
  // createModal(resp.data.items);
});

function getNumberOfPages(list) {
  return Math.ceil(list.length / numberPerPage);
}

document.getElementById("next").addEventListener("click", function () {
  nextPage(resp.data.items);
});

document.getElementById("previous").addEventListener("click", function () {
  previousPage(resp.data.items);
});

document.getElementById("first").addEventListener("click", function () {
  firstPage(resp.data.items);
});

document.getElementById("last").addEventListener("click", function () {
  lastPage(resp.data.items);
});

function nextPage(items) {
  currentPage += 1;
  loadList(items);
}

function previousPage(items) {
  currentPage -= 1;
  loadList(items);
}

function firstPage(items) {
  currentPage = 1;
  loadList(items);
}

function lastPage(items) {
  currentPage = numberOfPages;
  loadList(items);
}

function loadList(items) {
  var begin = (currentPage - 1) * numberPerPage;
  var end = begin + numberPerPage;
  addResults(items.slice(begin, end));
  check(); // determines the states of the pagination buttons
}
function check() {
  document.getElementById("next").disabled =
    currentPage == numberOfPages ? true : false;
  document.getElementById("previous").disabled =
    currentPage == 1 ? true : false;
  document.getElementById("first").disabled = currentPage == 1 ? true : false;
  document.getElementById("last").disabled =
    currentPage == numberOfPages ? true : false;
}

function addResults(items) {
  cardContainer.innerHTML = "";
  containerUL.innerHTML = "";
  for (i = 0; i < items.length; i += 3) {
    const newRow = document.createElement("div");
    newRow.setAttribute("class", "d-flex flex-row justify-content-center");
    for (j = i; j < i + 3; j++) {
      if (j >= items.length) {
        cardContainer.append(newRow);
        return;
      }
      const newLI = document.createElement("li");
      newLI.setAttribute("data-toggle", "modal");
      newLI.setAttribute("data-target", "#myModal");
      const newAnchor = document.createElement("a");
      newAnchor.setAttribute("href", "#myGallery");
      newAnchor.setAttribute("data-slide-to", j);
      const newColumn = document.createElement("div");
      try {
        newColumn.setAttribute(
          "data-isbn-10",
          items[j].volumeInfo.industryIdentifiers[0].identifier
        );
      } catch (err) {
        newColumn.setAttribute("data-isbn-10", "N/A");
      }

      newColumn.setAttribute("id", items[j].id);
      buildCard(items[j], newColumn);
      newLI.append(newAnchor);
      newLI.append(newColumn);
      newRow.append(newLI);
      containerUL.append(newRow);
    }
    cardContainer.append(containerUL);
  }
}

function buildCard(cardInfo, column) {
  column.setAttribute("class", "cards col-sm");
  const cardImg = document.createElement("img");
  cardImg.setAttribute("class", "cardImgSize");
  try {
    cardImg.setAttribute("src", cardInfo.volumeInfo.imageLinks.smallThumbnail);
  } catch (err) {
    cardImg.setAttribute(
      "src",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
    );
  }
  cardImg.setAttribute("alt", "book picture");
  column.append(cardImg);
  const cardTitle = document.createElement("div");
  cardTitle.innerText = cardInfo.volumeInfo.title;
  column.append(cardTitle);
}

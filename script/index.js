const modal = new bootstrap.Modal(document.getElementById("alertError"));
const errorModal = document.getElementById("alertText");

// CREO GLI ELEMENTI

const createCards = (products) => {
  const row = document.getElementById("row");
  products.forEach((el, index) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-8", "col-md-4", "col-lg-3", "mb-3");
    newCol.innerHTML = `
<div class="card mb-3 h-100">
    <img
        src="${el.imageUrl}"
        class="card-img-top"
        alt="product-img${index}"
    />

    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">${el.brand}</h5>
      <p class="card-text text-decoration-underline">${el.name}</p>
      <p class="card-text">
      ${el.description} 
      </p>
      <p class="mb-3">Prezzo: ${el.price}$</p>
      <div class="d-flex flex-column flex-xl-row">
      <a href="./backoffice.html?productId=${el._id}" class="mb-3 me-xl-2 btn btn-warning">Modifica</a>
      <a href="./details.html?productId=${el._id}" class="mb-3 me-xl-2 btn btn-secondary">Scopri di più</a>

      </div>
    </div>

  </div>`;

    row.appendChild(newCol);
  });
};
// RECUPERO LO SPINNER PER NASCONDERLO UNA VOLTA CARICATA LA PAGINA
const spinner = document.getElementById("spinner");
// FUNZIONE PER NASCONDERLO
const hideSpinner = () => {
  spinner.classList.add("d-none");
};

// RECUPERO GLI ELEMENTI
const getProducts = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmJiMjEzOWM0MzAwMTg4MTQ1OTMiLCJpYXQiOjE2OTcxODQ2OTAsImV4cCI6MTY5ODM5NDI5MH0.etX-8Ir9d-lMF3J7nJE5VrwIwYK-0uoEDTcPJZwqlHM",
    },
  })
    .then((res) => {
      hideSpinner();
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 404) {
          throw new Error("404 - Not Found");
        } else if (res.status === 403) {
          throw new Error("Forbidden");
        } else if (res.status === 401) {
          throw new Error("Unauthorized");
        } else if (res.status === 429) {
          throw new Error("Too Many Request");
        } else if (res.status === 500) {
          throw new Error("Internal Server Error");
        }
      }
    })
    .then((data) => {
      console.log(data);
      createCards(data);
    })
    .catch((err) => {
      hideSpinner();

      alertText.innerHTML = `${err}`;
      modal.show();
    });
};

getProducts();

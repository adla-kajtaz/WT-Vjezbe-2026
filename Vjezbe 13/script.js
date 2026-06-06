async function getAllCities() {
  const response = await fetch("https://api.adlakajtaz.com/cities/");
  const cities = await response.json();
  getCities(cities);
}

async function getCityByName() {
  const searchName = document
    .getElementById("cityNameInput")
    .value.toLowerCase();
  const response = await fetch(
    `https://api.adlakajtaz.com/cities/search/${searchName}`,
  );
  const cities = await response.json();
  getCities(cities);
}

function getCities(cities) {
  const tableBody = document.getElementById("cityTableBody");
  tableBody.innerHTML = "";

  cities.forEach((city) => {
    const row = `<tr>
            <td>${city.id}</td>
            <td>${city.name}</td>
            <td>
            <button class="btn-update" onclick="fetchAndPrepareUpdate(${city.id})">Update</button>
            <button class="btn-delete" onclick="deleteCity(${city.id})">Delete</button>
            </td>
        </tr>`;
    tableBody.innerHTML += row;
  });
}

async function addCity() {
  const name = document.getElementById("name").value;

  if (!name) {
    alert("Molimo vas da ispravno popunite sva polja.");
    return;
  }

  const newCity = {
    name,
  };
  let jsonObj = JSON.stringify(newCity);

  try {
    const response = await fetch("https://api.adlakajtaz.com/cities/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonObj,
    });

    clearForm();
    getAllCities();
  } catch (error) {
    console.error("Došlo je do greške:", error);
    alert("Došlo je do greške.");
  }
}

async function deleteCity(id) {
  if (confirm("Jeste li sigurni da želite obrisati ovaj grad?")) {
    try {
      const response = await fetch(`https://api.adlakajtaz.com/cities/${id}`, {
        method: "DELETE",
      });
      getAllCities();
    } catch (error) {
      console.error("Došlo je do greške:", error);
      alert("Došlo je do greške.");
    }
  }
}

async function fetchAndPrepareUpdate(id) {
  try {
    const response = await fetch(`https://api.adlakajtaz.com/cities/${id}`);

    const city = await response.json();

    document.getElementById("editCityId").value = city.id;
    document.getElementById("editName").value = city.name;
    document.getElementById("dialogTitle").innerText =
      `Edit City (ID: ${city.id})`;

    const dialog = document.getElementById("editDialog");
    dialog.showModal();
  } catch (error) {
    console.error("Došlo je do greške:", error);
    alert("Došlo je do greške.");
  }
}

async function saveCityChanges() {
  const id = document.getElementById("editCityId").value;
  const name = document.getElementById("editName").value;

  if (!name) {
    alert("Molimo vas da ispravno popunite sva polja.");
    return;
  }

  const updatedCity = {
    name,
  };
  let jsonObj = JSON.stringify(updatedCity);
  try {
    const response = await fetch(`https://api.adlakajtaz.com/cities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonObj,
    });

    closeDialog();
    getAllCities();
  } catch (error) {
    console.error("Došlo je do greške:", error);
    alert("Došlo je do greške.");
  }
}

function clearForm() {
  document.getElementById("name").value = "";
}

function closeDialog() {
  const dialog = document.getElementById("editDialog");
  dialog.close();
}

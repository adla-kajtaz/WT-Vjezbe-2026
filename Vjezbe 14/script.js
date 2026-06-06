getAllCities();

async function getAllCities() {
  try {
    const response = await fetch("https://api.adlakajtaz.com/cities/");
    const cities = await response.json();

    const citySelect = document.getElementById("citySelect");
    const editCitySelect = document.getElementById("editCitySelect");

    cities.forEach((city) => {
      const optionHtml = `<option value="${city.id}">${city.name}</option>`;
      citySelect.innerHTML += optionHtml;
      editCitySelect.innerHTML += optionHtml;
    });
  } catch (error) {
    console.error("Greška prilikom ucitavanja gradova:", error);
  }
}

async function getAllStudents() {
  const response = await fetch("https://api.adlakajtaz.com/students/");
  const students = await response.json();
  getStudents(students);
}

async function getStudentByName() {
  const searchName = document
    .getElementById("studentNameInput")
    .value.toLowerCase();
  const response = await fetch(
    `https://api.adlakajtaz.com/students/search/${searchName}`,
  );
  const students = await response.json();
  getStudents(students);
}

function getStudents(students) {
  const tableBody = document.getElementById("studentTableBody");
  tableBody.innerHTML = "";

  students.forEach((student) => {
    const cityName = student.city ? student.city.name : "N/A";
    const formattedDate = student.date_of_birth
      ? student.date_of_birth.split("T")[0]
      : "";
    const row = `<tr>
           <td>${student.id}</td>
            <td>${student.index_number}</td>
            <td>${student.firstname}</td>
            <td>${student.lastname}</td>
            <td>${formattedDate}</td>
            <td>${student.status || ""}</td>
            <td>${student.phone_number || ""}</td>
            <td>${student.email || ""}</td>
            <td>${cityName}</td>
            <td>
              <button class="btn-update" onclick="fetchAndPrepareUpdate(${student.id})">Update</button>
              <button class="btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        </tr>`;
    tableBody.innerHTML += row;
  });
}

async function addStudent() {
  const index_number = document.getElementById("indexNumber").value;
  const firstname = document.getElementById("firstName").value;
  const lastname = document.getElementById("lastName").value;
  const date_of_birth = document.getElementById("dateOfBirth").value;
  const status = document.getElementById("status").value;
  const phone_number = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;
  const city_id = parseInt(document.getElementById("citySelect").value);

  if (
    !index_number ||
    !firstname ||
    !lastname ||
    !date_of_birth ||
    !city_id ||
    !phone_number ||
    !email
  ) {
    alert("Molimo vas da popunite sva polja i odaberete grad.");
    return;
  }

  if (!validateStudentData(index_number, email, phone_number)) {
    return;
  }

  const newStudent = {
    index_number,
    firstname,
    lastname,
    date_of_birth,
    status,
    phone_number,
    email,
    city_id,
  };
  let jsonObj = JSON.stringify(newStudent);

  try {
    const response = await fetch("https://api.adlakajtaz.com/students/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonObj,
    });

    await response.json();

    clearForm();
    getAllStudents();
  } catch (error) {
    console.error("Došlo je do greške:", error);
    alert("Došlo je do greške.");
  }
}

async function deleteStudent(id) {
  if (confirm("Jeste li sigurni da želite obrisati ovog studenta?")) {
    try {
      const response = await fetch(
        `https://api.adlakajtaz.com/students/${id}`,
        {
          method: "DELETE",
        },
      );
      getAllStudents();
    } catch (error) {
      console.error("Došlo je do greške:", error);
      alert("Došlo je do greške.");
    }
  }
}

async function fetchAndPrepareUpdate(id) {
  try {
    const response = await fetch(`https://api.adlakajtaz.com/students/${id}`);

    const student = await response.json();

    document.getElementById("editStudentId").value = student.id;
    document.getElementById("editIndexNumber").value = student.index_number;
    document.getElementById("editFirstName").value = student.firstname;
    document.getElementById("editLastName").value = student.lastname;
    if (student.date_of_birth) {
      document.getElementById("editDateOfBirth").value =
        student.date_of_birth.split("T")[0];
    }

    document.getElementById("editStatus").value = student.status;
    document.getElementById("editPhoneNumber").value = student.phone_number;
    document.getElementById("editEmail").value = student.email;
    document.getElementById("editCitySelect").value = student.city_id;

    document.getElementById("dialogTitle").innerText =
      `Edit Student (ID: ${student.id})`;

    const dialog = document.getElementById("editDialog");
    dialog.showModal();
  } catch (error) {
    console.error("Došlo je do greške:", error);
    alert("Došlo je do greške.");
  }
}

async function saveStudentChanges() {
  const id = document.getElementById("editStudentId").value;
  const index_number = document.getElementById("editIndexNumber").value;
  const firstname = document.getElementById("editFirstName").value;
  const lastname = document.getElementById("editLastName").value;
  const date_of_birth = document.getElementById("editDateOfBirth").value;
  const status = document.getElementById("editStatus").value;
  const phone_number = document.getElementById("editPhoneNumber").value;
  const email = document.getElementById("editEmail").value;
  const city_id = parseInt(document.getElementById("editCitySelect").value);

  if (
    !index_number ||
    !firstname ||
    !lastname ||
    !date_of_birth ||
    !city_id ||
    !phone_number ||
    !email
  ) {
    alert("Molimo vas da popunite sva polja.");
    return;
  }

  if (!validateStudentData(index_number, email, phone_number)) {
    return;
  }
  const updatedStudent = {
    index_number,
    firstname,
    lastname,
    date_of_birth,
    status,
    phone_number,
    email,
    city_id,
  };
  let jsonObj = JSON.stringify(updatedStudent);
  try {
    const response = await fetch(`https://api.adlakajtaz.com/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonObj,
    });

    closeDialog();
    getAllStudents();
  } catch (error) {
    console.error("Došlo je do greške:", error);
    alert("Došlo je do greške.");
  }
}

function clearForm() {
  document.getElementById("indexNumber").value = "";
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("dateOfBirth").value = "";
  document.getElementById("status").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("email").value = "";
  document.getElementById("citySelect").value = "";
}

function closeDialog() {
  const dialog = document.getElementById("editDialog");
  dialog.close();
}

function validateStudentData(index, email, phone) {
  const indexRegex = /^BB\d{6}$/;
  if (!indexRegex.test(index)) {
    alert(
      "Index nije u ispravnom formatu! Mora biti u formatu BB prateći tačno 6 brojeva (npr. BB123456).",
    );
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Unesena email adresa nije validna!");
    return false;
  }

  const phoneRegex = /^\+\s*(\d\s*){11}$/;
  if (!phoneRegex.test(phone)) {
    alert(
      "Broj telefona mora početi sa + i sadržavati tačno 11 cifara (npr. +387 62 125 456 ili +38711111111).",
    );
    return false;
  }

  return true;
}

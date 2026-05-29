async function getAllEmployees() {
  const response = await fetch("https://api.adlakajtaz.com/employees/");
  const employees = await response.json();
  getEmployees(employees);
}

async function getEmployeeByName() {
  const searchName = document
    .getElementById("employeeNameInput")
    .value.toLowerCase();
  const response = await fetch(
    `https://api.adlakajtaz.com/employees/search/${searchName}`,
  );
  const employees = await response.json();
  getEmployees(employees);
}

function getEmployees(employees) {
  const tableBody = document.getElementById("employeeTableBody");
  tableBody.innerHTML = "";

  employees.forEach((employee) => {
    const row = `<tr>
            <td>${employee.id}</td>
            <td>${employee.firstname}</td>
            <td>${employee.lastname}</td>
            <td>${employee.age}</td>
            <td>${employee.salary}</td>
            <td>
            <button class="btn-update" onclick="fetchAndPrepareUpdate(${employee.id})">Update</button>
            <button class="btn-delete" onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        </tr>`;
    tableBody.innerHTML += row;
  });
}

async function addEmployee() {
  const firstname = document.getElementById("firstName").value;
  const lastname = document.getElementById("lastName").value;
  const age = parseInt(document.getElementById("age").value);
  const salary = parseFloat(document.getElementById("salary").value);

  if (!firstname || !lastname || isNaN(age) || isNaN(salary)) {
    alert("Molimo vas da ispravno popunite sva polja.");
    return;
  }

  const newEmployee = {
    firstname,
    lastname,
    age,
    salary,
  };
  let jsonObj = JSON.stringify(newEmployee);

  try {
    const response = await fetch("https://api.adlakajtaz.com/employees/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonObj,
    });

    clearForm();
    getAllEmployees();
  } catch (error) {
    console.error("Došlo je do greške:", error);
    alert("Došlo je do greške.");
  }
}

async function deleteEmployee(id) {
  if (confirm("Jeste li sigurni da želite obrisati ovog zaposlenika?")) {
    try {
      const response = await fetch(
        `https://api.adlakajtaz.com/employees/${id}`,
        {
          method: "DELETE",
        },
      );
      getAllEmployees();
    } catch (error) {
      console.error("Došlo je do greške:", error);
      alert("Došlo je do greške.");
    }
  }
}

async function fetchAndPrepareUpdate(id) {
  try {
    const response = await fetch(`https://api.adlakajtaz.com/employees/${id}`);

    const employee = await response.json();

    document.getElementById("editEmployeeId").value = employee.id;
    document.getElementById("editFirstName").value = employee.firstname;
    document.getElementById("editLastName").value = employee.lastname;
    document.getElementById("editAge").value = employee.age;
    document.getElementById("editSalary").value = employee.salary;

    document.getElementById("dialogTitle").innerText =
      `Edit Employee (ID: ${employee.id})`;

    const dialog = document.getElementById("editDialog");
    dialog.showModal();
  } catch (error) {
    console.error("Došlo je do greške:", error);
    alert("Došlo je do greške.");
  }
}

async function saveEmployeeChanges() {
  const id = document.getElementById("editEmployeeId").value;
  const firstname = document.getElementById("editFirstName").value;
  const lastname = document.getElementById("editLastName").value;
  const age = parseInt(document.getElementById("editAge").value);
  const salary = parseFloat(document.getElementById("editSalary").value);

  if (!firstname || !lastname || isNaN(age) || isNaN(salary)) {
    alert("Molimo vas da ispravno popunite sva polja.");
    return;
  }

  const updatedEmployee = {
    firstname,
    lastname,
    age,
    salary,
  };
  let jsonObj = JSON.stringify(updatedEmployee);
  try {
    const response = await fetch(`https://api.adlakajtaz.com/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonObj,
    });

    closeDialog();
    getAllEmployees();
  } catch (error) {
    console.error("Došlo je do greške:", error);
    alert("Došlo je do greške.");
  }
}

function clearForm() {
  editEmployeeId = null;
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("age").value = "";
  document.getElementById("salary").value = "";
}

function closeDialog() {
  const dialog = document.getElementById("editDialog");
  dialog.close();
}

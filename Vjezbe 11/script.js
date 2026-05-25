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

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("age").value = "";
    document.getElementById("salary").value = "";

    getAllEmployees();
  } catch (error) {
    console.error("Došlo je do greške:", error);
    alert("Došlo je do greške.");
  }
}

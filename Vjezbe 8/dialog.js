function prikaziDialog(opcije) {
  let pozadina = document.createElement("div");
  pozadina.classList.add("dialog-backdrop");

  let prozor = document.createElement("div");
  prozor.classList.add("dialog-box");

  let tekst = document.createElement("p");
  tekst.innerText = opcije.poruka;
  prozor.appendChild(tekst);

  let akcije = document.createElement("div");
  akcije.classList.add("dialog-actions");

  function zatvoriDialog() {
    pozadina.remove();
  }

  if (opcije.tip === "alert") {
    let btnUredu = document.createElement("button");
    btnUredu.innerText = "U redu";
    btnUredu.classList.add("btn-primary");

    btnUredu.addEventListener("click", zatvoriDialog);

    akcije.appendChild(btnUredu);
  } else if (opcije.tip === "confirm") {
    let btnDa = document.createElement("button");
    btnDa.innerText = "Da";
    btnDa.classList.add("btn-danger");

    btnDa.addEventListener("click", function () {
      if (opcije.onPotvrda) {
        opcije.onPotvrda();
      }
      zatvoriDialog();
    });

    let btnNe = document.createElement("button");
    btnNe.innerText = "Ne";
    btnNe.classList.add("btn-secondary");

    btnNe.addEventListener("click", zatvoriDialog);

    akcije.appendChild(btnDa);
    akcije.appendChild(btnNe);
  }

  prozor.appendChild(akcije);
  pozadina.appendChild(prozor);
  document.body.appendChild(pozadina);
}

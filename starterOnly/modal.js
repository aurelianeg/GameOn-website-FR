function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const tournamentsQuantity = document.getElementById("quantity");
const cities = document.querySelectorAll(".checkbox-input input[type='radio']");
const conditions = document.getElementById("checkbox1");
const nextEvents = document.getElementById("checkbox2");
const modalSubmitBtn = document.querySelector(".btn-submit");

// Regex (for email)
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeModalBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// submit modal event
//modalSubmitBtn.addEventListener("click", isFormValid);

modalSubmitBtn.addEventListener("click", function(event) {

  let todayDate = new Date();
  let today = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getDate();

  let fields = {
    "firstNameField": false,
    "lastNameField": false,
    "emailField": false,
    "birthDateField": false,
    "tournamentsQuantityField": false,
    "citiesField": false,
    "conditionsField": false
  };
  console.log(fields);

  if (firstName.value.length < 2) {
    firstName.setCustomValidity("Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
  }
  else {
    firstName.setCustomValidity("");
  }

  if (lastName.value.length < 2) {
    lastName.setCustomValidity("Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  }
  else {
    lastName.setCustomValidity("");
  }

  if (email.value.length == 0) {
    email.setCustomValidity("Veuillez saisir une adresse e-mail.");
  }
  else if (re.test(email.value) == false) {
    email.setCustomValidity("Veuillez saisir une adresse e-mail valide.");
  }
  else {
    email.setCustomValidity("");
  }

  if (birthDate.value == null) {
    birthDate.setCustomValidity("Veuillez entrer votre date de naissance.")
  }
  else if (birthDate.value == todayDate.getTime()) { // Corriger ça
    birthDate.setCustomValidity("La date de naissance doit être antérieure à aujourd'hui.");
  }
  else {
    birthDate.setCustomValidity("");
  }

  console.log('firstName', firstName.value);
  console.log('lastName', lastName.value);
  console.log('email', email.value, re.test(email.value));
  console.log('birthdate', birthDate.value, todayDate.getTime());
  console.log('birthdate year', birthDate.value.getFullYear());

  while (false in fields) {
    // Don't close form
  }
  //if (false not in fields) {
    // Faire message de confirmation de la soumission
    //console.log("Merci pour votre inscription ! Votre réservation a bien été prise en compte.");
  //}
});



// submit modal and check if it is valid
function isFormValid(firstName, lastName, email, birthDate, tournamentsQuantity, cities, conditions) {

  if (birthDate.type = "date") {
    fields["birthDateField"] = true;
  }
  else {
    console.log("Vous devez entrer votre date de naissance.");
  }

  if (tournamentsQuantity.type == "number" && cities.length > 0) {
    fields["tournamentsQuantityField"] = true;
    fields["citiesField"] = true;
  }
  else if (tournamentsQuantity.type != "number") {
    console.log("Vous devez saisir un nombre de tournois (supérieur ou égal à 0.");
  }
  else if (cities.length == 0) {
    console.log("Vous devez choisir une ville.");
  }

  if (conditions) {
    fields["conditionsField"] = true;
  }
  else {
    console.log("Vous devez vérifier que vous acceptez les termes et conditions.");
  }

  if (fields == true) {
    console.log("Le formulaire soumis est bien valide.");
  }
  else {
    console.log("Le formulaire soumis n'est pas valide.");
    "click".preventDefault();    // keep form informations if not validated
  }
}
// ========== DOM ELEMENTS ==========

const modalBackground = document.querySelector(".background");
const modalBtns = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");

const formDatas = document.querySelectorAll(".formData");

const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthDateInput = document.getElementById("birthdate");
const tournamentsQuantityInput = document.getElementById("quantity");
const locationsInputs = document.querySelectorAll(".checkbox-input input[name='location']");
const conditionsInput = document.getElementById("checkbox1");

const modalSubmitBtn = document.querySelector(".btn-submit");


// ========== FUNCTIONS AND EVENTS ==========

// ---------- Adapt navigation bar to responsive disposition ----------

// Function
function adaptNavigationBarToResponsive() {
  var topNavigationBar = document.getElementById("myTopnav");
  if (topNavigationBar.className === "topnav") {
    topNavigationBar.className += " responsive";
  }
  else {
    topNavigationBar.className = "topnav";
  }
}

// Event
// DO EVENT TO ADAPT NAVIGATION BAR !!!!!!!!


// ---------- Launch modal ----------

// Function
function launchModal() {
  modalBackground.style.display = "block";
}

// Event
modalBtns.forEach((btn) => btn.addEventListener("click", launchModal));


// ---------- Close modal ----------

// Function
function closeModal() {
  modalBackground.style.display = "none";
}

// Event
closeModalBtn.addEventListener("click", closeModal);


// ---------- Submit modal ----------

// Function: Show error message if input not valid
function showErrorMessage(input, message) {
  const formData = input.parentElement;
  formData.className = 'formData error'
  const errorMessage = formData.querySelector('.errorMessage');
  errorMessage.innerText = message;
}

// Function: Show validation page if all inputs are valid
function showValidationPage() {
  // DO SOMETHING !!!!!!!!
  console.log("Merci pour votre inscription ! Votre réservation a bien été prise en compte.");
}

// Function: Check if all inputs are valid
function checkInputValidation() {
  
  let fields = {
    firstName: false,
    lastName: false,
    email: false,
    birthDate: false,
    tournamentsQuantity: false,
    location: false,
    conditions: false
  };

  // Nécessaire ?
  firstNameInput.setCustomValidity("");
  lastNameInput.setCustomValidity("");
  emailInput.setCustomValidity("");
  birthDateInput.setCustomValidity("");
  tournamentsQuantityInput.setCustomValidity("");
  //locationsInputs.setCustomValidity("");
  conditionsInput.setCustomValidity("");

  if (firstNameInput.value.length < 2) {
    showErrorMessage(firstNameInput, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    //formDatas[0].setAttribute(data-error, true);
  }

  if (lastNameInput.value.length < 2) {
    showErrorMessage(lastNameInput, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  }

  // Regex (for email)
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailInput.value.length == 0) {
    showErrorMessage(emailInput, "Veuillez saisir une adresse e-mail.");
  }
  else if (regexEmail.test(emailInput.value) == false) {
    showErrorMessage(emailInput, "Veuillez saisir une adresse e-mail valide.");
  }

  let todayDate = new Date();
  if (birthDateInput.value == null) {
    showErrorMessage(birthDateInput, "Veuillez entrer votre date de naissance.");
  }
  else if (birthDateInput.value == todayDate.getTime()) { // Corriger ça
    showErrorMessage(birthDateInput, "La date de naissance doit être antérieure à aujourd'hui.");
  }

  if (tournamentsQuantityInput.value.length == 0) {
    showErrorMessage(tournamentsQuantityInput, "Veuillez saisir un nombre de tournois (supérieur ou égal à 0).");
  }

  //if (tournamentsQuantityInput.value.length == 0) {
  //  showErrorMessage(emailInput, "Veuillez choisir une ville.");
  //}

  if (conditionsInput.value == 0) {
    showErrorMessage(conditionsInput, "Vous devez vérifier que vous acceptez les termes et conditions.");
  }
  
  console.log('firstName', firstNameInput.value);
  console.log('lastName', lastNameInput.value);
  console.log('email', emailInput.value, re.test(emailInput.value));
  console.log('birthdate', birthDateInput.value, todayDate.getTime());
  console.log('birthdate year', birthDateInput.value.getFullYear());

  while (false in fields == true) {
    console.log("Le formulaire soumis n'est pas valide.");
  }
  if (false in fields == false) {
    console.log("Le formulaire soumis est bien valide.");
    showValidationPage();
  }
}

// Event
modalSubmitBtn.addEventListener("click", function(event) {
  event.preventDefault();     // Keep form informations if not valid
  checkInputValidation();
});
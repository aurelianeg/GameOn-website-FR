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
const locationsInputs = document.getElementsByName("location");
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
  errorMessage.innerHTML = message;
  input.focus();
}

// Function: Hide error message if input was not valid
function showSuccess(input) {
  const formData = input.parentElement;
  formData.className = 'formData success';
  const errorMessage = formData.querySelector('.errorMessage');
  errorMessage.innerHTML = '';
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

  // First name input
  if (firstNameInput.value.length == 0) {
    showErrorMessage(firstNameInput, "Veuillez saisir votre prénom.");
  }
  else if (firstNameInput.value.length < 2) {
    showErrorMessage(firstNameInput, "Veuillez entrer 2 caractères ou plus pour le prénom.");
  }
  else {
    showSuccess(firstNameInput);
    fields.firstName = true;
  }

  // Last name input
  if (lastNameInput.value.length == 0) {
    showErrorMessage(lastNameInput, "Veuillez saisir votre nom.");
  }
  if (lastNameInput.value.length < 2) {
    showErrorMessage(lastNameInput, "Veuillez entrer 2 caractères ou plus pour le nom.");
  }
  else {
    showSuccess(lastNameInput);
    fields.lastName = true;
  }

  // Email input
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailInput.value.length == 0) {
    showErrorMessage(emailInput, "Veuillez saisir votre adresse e-mail.");
  }
  else if (regexEmail.test(emailInput.value) == false) {
    showErrorMessage(emailInput, "Veuillez saisir un format d'adresse e-mail valide.");
  }
  else {
    showSuccess(emailInput);
    fields.email = true;
  }

  // Birthdate input
  let todayDate = new Date();
  let birthDateInputDate = new Date(birthDateInput.value);
  if (birthDateInput.value == '') {
    showErrorMessage(birthDateInput, "Veuillez entrer votre date de naissance.");
  }
  else if (birthDateInputDate >= todayDate) {
    showErrorMessage(birthDateInput, "La date de naissance doit être antérieure à aujourd'hui.");
  }
  else {
    showSuccess(birthDateInput);
    fields.birthDate = true;
  }

  // Tournament quantity input
  if (tournamentsQuantityInput.value.length == 0) {
    showErrorMessage(tournamentsQuantityInput, "Veuillez saisir un nombre de tournois (supérieur ou égal à 0).");
  }
  else {
    showSuccess(tournamentsQuantityInput, fields.tournamentsQuantity);
    fields.tournamentsQuantity = true;
  }

  // Location choice inputs
  let locationChecked = false;
  for (var i = 0; i < locationsInputs.length; i++) {
    if(locationsInputs[i].checked) {
      locationChecked = true;
      break;
    }
  }
  if(!locationChecked) {
    showErrorMessage(locationsInputs[0], "Veuillez choisir une ville.");
  }
  else {
    showSuccess(locationsInputs[0]);
    fields.location = true;
  }

  // Conditions checked input
  if (conditionsInput.checked == false) {
    showErrorMessage(conditionsInput, "Vous devez vérifier que vous acceptez les termes et conditions.");
  }
  else {
    showSuccess(conditionsInput);
    fields.conditions = true;
  }

  // Submit form if all fields are valid
  let fieldsValues = Object.values(fields);
  console.log('fieldsValues', fieldsValues);
  if (fieldsValues.includes(false) == true) {
    console.log("Le formulaire soumis n'est pas valide.");
    return false;
  }
  if (fieldsValues.includes(false) == false) {
    console.log("Le formulaire soumis est bien valide.");
    return true;
  }
}

// Function: Show validation page if all inputs are valid
function showValidationPage() {
  // DO SOMETHING !!!!!!!!
  console.log("Merci pour votre inscription ! Votre réservation a bien été prise en compte.");
}

// Event
modalSubmitBtn.addEventListener("click", function(event) {
  event.preventDefault();     // Keep form informations if not valid
  if (checkInputValidation()) {
    showValidationPage();
  }
});
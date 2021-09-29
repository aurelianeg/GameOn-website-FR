// ========== DOM ELEMENTS ==========

const modalBackground = document.querySelector(".modal-background");
const modalBtns = document.querySelectorAll(".modal-btn");
const modalCloseCross = document.querySelector(".modal-close");

const formDatas = document.querySelectorAll(".formData");

const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthDateInput = document.getElementById("birthdate");
const tournamentsQuantityInput = document.getElementById("quantity");
const locationsInputs = document.getElementsByName("location");
const conditionsInput = document.getElementById("checkbox1");

const modalSubmitBtn = document.querySelector(".btn-submit");

const registrationConfirmationBackground = document.querySelector(".confirmation-background");
const registrationConfirmationContent = document.querySelector(".confirmation-content");
const registrationConfirmationCloseBtn = document.querySelector(".btn-close");
const registrationConfirmationCloseCross = document.querySelector(".confirmation-close");

// ========== FUNCTIONS AND EVENTS ==========

// ---------- Navigation bar adaptation ----------

/**
 * Adapt navigation bar to responsive disposition
 */
function adaptNavigationBarToResponsive() {
  var navigationBar = document.getElementById("header_nav_container");
  if (navigationBar.className === "header_nav_container") {
    navigationBar.className += " responsive";
  }
  else {
    navigationBar.className = "header_nav_container";
  }
  console.log('pouet');
}

// ---------- Modal visibility ----------

/**
 * Modal launching
 */
function launchModal() {
  modalBackground.style.display = "block";
}

/**
 * Modal closing
 */
function closeModal() {
  modalBackground.style.display = "none";
}

modalBtns.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseCross.addEventListener("click", closeModal);


// ---------- Modal submission ----------

/**
 * Show error message if input not valid
 * @param {Object} input - The given input
 * @param {string} message - The error message
 */
function showErrorMessage(input, message) {
  const formData = input.parentElement;
  formData.className = 'formData error'
  const errorMessage = formData.querySelector('.errorMessage');
  errorMessage.innerHTML = message;
  input.focus();
}

/**
 * Hide error message if input was not valid
 * @param {Object} input 
 */
function showSuccess(input) {
  const formData = input.parentElement;
  formData.className = 'formData success';
  const errorMessage = formData.querySelector('.errorMessage');
  errorMessage.innerHTML = '';
}

/**
 * Check if all inputs are valid
 * @returns {Boolean}
 */
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
  const regexAsciiLetters = /[a-zA-Z]/;
  if (firstNameInput.value.length == 0) {
    showErrorMessage(firstNameInput, "Veuillez saisir votre prénom.");
  }
  else if (firstNameInput.value.length < 2) {
    showErrorMessage(firstNameInput, "Veuillez entrer 2 caractères ou plus pour le prénom.");
  }
  else if (regexAsciiLetters.test(firstNameInput.value) == false) {
    showErrorMessage(firstNameInput, "Veuillez entrer des caractères de A à Z (sans accents).");
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
  else if (regexAsciiLetters.test(lastNameInput.value) == false) {
    showErrorMessage(lastNameInput, "Veuillez entrer des caractères de A à Z (sans accents).");
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
  if (fieldsValues.includes(false) == true) {
    return false;
  }
  if (fieldsValues.includes(false) == false) {
    return true;
  }
}

/**
 * Launch registration confirmation if all inputs are valid
 */
function launchRegistrationConfirmation() {
  registrationConfirmationBackground.style.display = "block";
}

// Event
modalSubmitBtn.addEventListener("click", function(event) {
  event.preventDefault();     // Keep form informations if not valid
  if (checkInputValidation()) {
    closeModal();
    launchRegistrationConfirmation();
  }
});

// ---------- Registration visibility ----------

/**
 * Close registration confirmation when done
 */
function closeRegistrationConfirmation() {
  registrationConfirmationContent.classList.toggle('isClosed');
  setTimeout(() => {
    registrationConfirmationContent.classList.remove('isClosed');
    registrationConfirmationBackground.style.display = "none";
  }, 800);
}

registrationConfirmationCloseBtn.addEventListener("click", closeRegistrationConfirmation);
registrationConfirmationCloseCross.addEventListener("click", closeRegistrationConfirmation);
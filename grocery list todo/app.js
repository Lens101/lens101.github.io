// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery"); //not ".ID", when  getting by ID, just "ID".
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false; //false by default as only edit once button is clicked.
let editId = ""; //used to get specific id in a list to edit.
// ****** EVENT LISTENERS **********
//submit form
form.addEventListener("submit", addItem); //Listening for submit event.
// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault(); //prevent the default behaviour of the form to attempt to submit to a server.
  const value = grocery.value;
  const id = new Date().getTime().toString(); //gets curr time in milliseconds in string.

  if (value && !editFlag) {
    console.log("adding item to the list");
  } else if (value && editFlag) {
    console.log("editing");
  } else {
    displayAlert("please enter value", "danger");
  }
}

/* Display alert */
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  /* Remove alert after 1.5 seconds */
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1500); /* In milliseconds */
}

//  empty string is falsy!
// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********

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
form.addEventListener("submit", addItem); //Listening for submit event

//clear items
clearBtn.addEventListener("click", clearItems);

//load items
window.addEventListener("DOMContentLoaded", setupItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault(); //prevent the default behaviour of the form to attempt to submit to a server.
  const value = grocery.value;
  const id = new Date().getTime().toString(); //gets curr time in milliseconds in string.

  if (value && !editFlag) {
    createListItem(id, value);
    //display alert
    displayAlert("item aded to the list", "success");

    // Show container - adds css style to make container visible
    container.classList.add("show-container");

    // Add to local storage
    addToLocalStorage(id, value);

    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");
    //edit local storage
    editLocalStorage(editId, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}

// Display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // Remove alert after 1 second
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000); // In milliseconds
}

// Clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

// edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  //set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "edit";
}

// delete function - pass parent container event object.
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement; //go 2 levels up and get grocery item, check html if confused.
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();

  // remove from local storage
  removeFromLocalStorage(id);
}

// set back to default

function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = { id, value }; //object but ES6 syntax allows us to not write {id:id, value:value}  where property:parameter is syntax.
  let items = getLocalStorage();
  /* console.log(items); */
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

//local storage API
//addItem
//removeItem
//editItem
//save as strings

/* 
localStorage.setItem("orange", JSON.stringify(["item, item2"]));
const oranges = JSON.parse(localStorage.getItem("orange"));
console.log(oranges);
localStorage.removeItem("orange"); 
*/

// ****** SETUP ITEMS **********
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  // Add class
  element.classList.add("grocery-item");

  // Add ID
  const attr = document.createAttribute("data-id"); //previously would make this in the html but now making, on the fly.
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;

  //N.B. must be added after the page is loaded dynamically!

  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");
  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);

  // Append child
  list.appendChild(element);
}

//  empty string === false

/* 
        addition for the tabs functionality
==========================================================
==========================================================
==========================================================

*/

const about = document.querySelector(".about");
const btns = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");
const firstTab = document.getElementById("first");

about.addEventListener("click", function (e) {
  const id = e.target.dataset.id;

  if (id) {
    //remove active from the other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });
    //Hide other articles
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


/**
 * Firebase configuration
 */
export const appSettings = {
  databaseURL: "https://playground-59eef-default-rtdb.firebaseio.com/",
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListDB = ref(database, "shoppingList");

/**
 * Global variables
 */
let shoppingList = {};

/**
 * On DB change
 */
onValue(shoppingListDB, (snapshot) => {
  shoppingList = snapshot.val();
  render();
})

/**
 * Render method
 */
function render() {
  groceryList.innerHTML = "";
  Object.entries(shoppingList).forEach((item) => {
    groceryList.appendChild(createGroceryLi(item));
  })
}

/**
 * HTML Elements
 */
const itemInputEl = document.getElementById("item-input");
const addItemBtnEl = document.getElementById("add-item-btn");
const groceryList = document.getElementById("grocery-list");


/**
 * Event Listeners
 */
addItemBtnEl.addEventListener("click", () => {
  let inputValue = itemInputEl.value;
  push(shoppingListDB, inputValue).then(() => {
    console.log(`Successfully added ${inputValue} to the database`);
    clearInput();
  }).catch((error) => {
    console.error(error);
  });
});

/**
 * Utility methods
 */
function clearInput() {
  itemInputEl.value = "";
}

function createGroceryLi(item) {
  let newItem = document.createElement("li");
  newItem.className = "grocery-item";
  newItem.id = item[0];
  newItem.textContent = item[1].toString();
  return newItem;
}

const alert = document.querySelector(".alert");
const form = document.querySelector('.todo-form');
const item = document.getElementById('todo');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.list-container');
const list = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-btn');

// edit button option
let editElement;
let editFlag = false;
let editId = "";
// EVENT LISTENERS
form.addEventListener('submit', addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItems);
// FUNCTIONS
function addItem(e) {
    e.preventDefault();
    const value = item.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        createListItem(id, value);
        displayAlert('item added', "success");
        container.classList.add("show-container");
        addToLocalStorage(id, value);
        resetDefault(); 
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert("value changed", "success");
        editLocalStorage(editId, value);
        resetDefault();
    } else {
        displayAlert("please enter value","danger");
    }
}

//clear items
function clearItems() {
    const items = document.querySelectorAll(".list-item");

    if(items.length > 0) {
        items.forEach(function(item){
            list.removeChild(item)
        });
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    resetDefault();
    localStorage.removeItem("list");
}  
//display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

setTimeout(function(){
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
}, 1000)
}
//set back to default
function resetDefault() {
    item.value = "";
    editFlag = false;
    editId = "";
    submitBtn.textContent = "Submit";
}
//delete and edit btn functions
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert("item removed","success");
    resetDefault();
    removeFromLocalStorage(id);
}
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    //set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form value
    item.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = "edit";
}
//local storage
function addToLocalStorage(id, value) {
    const todo = { id, value };
    let items = getLocalStorage();
    console.log(items);

    items.push(todo);
    localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function(item){
        if(item.id !== id){
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === id){
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
function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0){
    items.forEach(function(item){
        createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
    }
}
function createListItem(id, value){
    const element = document.createElement("div");
        element.classList.add("list-item");
        const attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = 
        `<p class="item">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">edit</button>
              <button type="button" class="delete-btn">delete</button>
            </div>`;
            const deleteBtn = element.querySelector(".delete-btn");
            const editBtn = element.querySelector(".edit-btn");
            deleteBtn.addEventListener("click", deleteItem);
            editBtn.addEventListener("click", editItem);
            list.appendChild(element);
}
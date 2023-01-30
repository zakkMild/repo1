let saveEl = document.getElementById("save-el");
let count = 0;
let countEl = document.getElementById("count-el");
function increment() {
    count += 1;
    countEl.innerText = count;
}
function save() {
    let countStr = count + " - ";
    saveEl.textContent += countStr;
    countEl.innerText = 0;
    count = 0;
}
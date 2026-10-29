// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test
const Filter = {
    All: 0,
    Active: 1,
    Done: 2
}
// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)
const input = document.getElementById("task-input");
const ul = document.getElementById("task-list");
const select = document.getElementById("priority-select");
const error = document.getElementById("error");
const form = document.querySelector("form");
const left = document.getElementById("left");
const filters = document.getElementById("filters");
const buttonFilter = filters.getElementsByTagName("button");
const empty = document.getElementById("empty");
const clearDone = document.getElementById("clear-done");

function updateEmpty() {
    empty.hidden = ul.querySelectorAll("li").length > 0;
}

form.addEventListener("submit", function (event) {
    if (input.value.trim() === "") {
        error.hidden = false
        input.focus();
        event.preventDefault();
    }
    else {
        event.preventDefault();
        error.hidden = true;
        console.log(event.target.value);
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.classList.add("text")
        span.textContent = input.value.trim();
        li.appendChild(span)
        let button = document.createElement("button");
        button.classList.add("delete")
        button.textContent = "x";
        li.appendChild(button)
        li.classList.add(`priority-${select.value}`);
        if (buttonFilter[Filter.Done].classList.contains("active")) {
            li.hidden = true;
        }
        ul.appendChild(li);
        left.textContent = Number(left.textContent) + 1;
        updateEmpty();
        input.value = "";
        input.focus();
    }
});


// Step 2: click a task to toggle the "done" class
// Step 3: delete with the x button (one listener on the ul - event delegation)
// Step 4: "tasks left" counter
ul.addEventListener("click", function (event) {
    const li = event.target.closest("li");
    if (event.target.closest(".delete")) {
        li.remove();
        (!li.classList.contains("done")) ? left.textContent = left.textContent - 1 : left.textContent = left.textContent;
        updateEmpty();

    }
    else if (li) {

        li.classList.toggle("done");
        (li.classList.contains("done")) ? left.textContent = left.textContent - 1 : left.textContent = Number(left.textContent) + 1;
        updateEmpty();

    }
});


// Step 5: filters (All / Active / Done)

buttonFilter[Filter.All].onclick = function (event) {
    const li = ul.querySelectorAll("li");
    li.forEach(element => {
        element.hidden = false;
    });
    buttonFilter[Filter.All].classList.add("active");
    buttonFilter[Filter.Done].classList.remove("active");
    buttonFilter[Filter.Active].classList.remove("active");
}
buttonFilter[Filter.Done].onclick = function (event) {
    const li = ul.querySelectorAll("li");
    li.forEach(element => {
        (element.classList.contains("done")) ? element.hidden = false : element.hidden = true;

    });
    buttonFilter[Filter.All].classList.remove("active");
    buttonFilter[Filter.Done].classList.add("active");
    buttonFilter[Filter.Active].classList.remove("active");
}
buttonFilter[Filter.Active].onclick = function (event) {
    const li = ul.querySelectorAll("li");
    li.forEach(element => {
        (element.classList.contains("done")) ? element.hidden = true : element.hidden = false;

    });
    buttonFilter[Filter.All].classList.remove("active");
    buttonFilter[Filter.Done].classList.remove("active");
    buttonFilter[Filter.Active].classList.add("active");
}
// Step 6: Clear completed
clearDone.onclick = function (event) {
    const li = ul.querySelectorAll("li");
    li.forEach(element => {
        if (element.classList.contains("done")) element.remove();
    });
    updateEmpty();

}
// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")

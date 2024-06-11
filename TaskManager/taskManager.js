document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("inputDate")
    const localStorageTasks = localStorage.getItem("tasks") || "";
    var clicked = false

    let inputLi;
    let parent;

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            const li = document.createElement("li");
            li.innerHTML = `<span>${task}</span><span class="hide date">${taskDate.value}</span><i class='bx bx-calendar' id="date"></i><i class='bx bx-edit-alt' id="editTask"></i><i class='bx bx-x' id="deleteTask"></i>`;
            taskList.appendChild(li);
            taskInput.value = "";
            updateLocalStorage();
        }
    }

    document.addEventListener('click', (event) => {

        if(event.target.id === "date") {

            

            if(!clicked) {
                clicked = true
                event.target.parentNode.querySelector(".date").classList.remove("hide")
            } else if(clicked) {

                clicked = false
                event.target.parentNode.querySelector(".date").classList.add("hide")
            }
        }
    })

    document.addEventListener("click", (event) => {
        if (event.target.id === "addTaskButton") {
            addTask();
        } else if (event.target.id === "deleteTask") {
            event.target.parentNode.remove();
            updateLocalStorage();
        } else if (event.target.id === "editTask") {
            parent = event.target.parentNode;
            const spanElement = parent.querySelector("span");
            const value = spanElement.textContent;
            spanElement.textContent = "";
            inputLi = document.createElement("input");
            inputLi.type = "text";
            inputLi.value = value;
            parent.insertBefore(inputLi, event.target);
            const validationIcon = document.createElement("i");
            validationIcon.className = "bx bx-check";
            validationIcon.id = "validationIcon";
            parent.insertBefore(validationIcon, event.target.nextSibling);
            spanElement.remove();
            event.target.remove();
        } else if (event.target.id === "validationIcon") {
            parent.innerHTML = "";
            parent.innerHTML = `<span>${inputLi.value}</span><i class='bx bx-edit-alt' id="editTask"></i><i class='bx bx-x' id="deleteTask"></i>`;
            inputLi.value = "";
            updateLocalStorage();
        }
    });

    if (localStorageTasks) {
        taskList.innerHTML = localStorageTasks;
    }


    function updateLocalStorage() {
        localStorage.setItem("tasks", taskList.innerHTML);
    }


});

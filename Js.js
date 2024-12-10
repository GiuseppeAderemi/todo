const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const msg = document.querySelector('.msg');

function addTask() {
  if (inputBox.value.trim() === '') {
    // alert("You must write something!");
    msg.style.color = 'red';
    msg.innerHTML = 'Please enter task!';

    setTimeout(() => msg.remove(), 2000);
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    li.addEventListener("click", function (e) {
      if (e.target.tagName !== "SPAN") {
        toggleSubList(li);
      }
    });

    // Add delete button (×)
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.classList.add("delete-button");
    span.onclick = function (e) {
      e.stopPropagation(); 
      li.remove();
      saveData();
    };
    li.appendChild(span);

    // Append the main task to the list container
    listContainer.appendChild(li);

    // Add a sub-list container to hold sub-tasks
    let subList = document.createElement("ul");
    subList.classList.add("sub-list");
    span.onclick = function (e) {
      saveData();
    };
    li.appendChild(subList);

    // Clear input field and display text
    document.getElementById("output").textContent = "";
    inputBox.value = "";
    saveData();
  }
}

function addSubTask(subList) {
  const subTaskText = prompt("Enter a sub-task:");
  if (subTaskText) {
    // Create the sub-task list item
    let subListItem = document.createElement("li");
    subListItem.textContent = subTaskText;

    // Add a delete button for sub-task
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.classList.add("delete-button");
    span.onclick = function (e) {
      saveData();
    };
    subListItem.appendChild(span);


    // Add click event to toggle checked state for sub-task
    subListItem.addEventListener("click", function (e) {
      if (e.target.tagName !== "SPAN") {
        subListItem.classList.toggle("checked");
        saveData();
      }
    });

    // Append the sub-task item to the sub-list
    subList.appendChild(subListItem);
    saveData();
  }
}

function toggleSubList(listItem) {
  const subList = listItem.querySelector(".sub-list");
  if (subList) {
    // Toggle visibility
    subList.classList.toggle("visible");

    // Prompt to add sub-task if sub-list is made visible
    if (subList.classList.contains("visible")) {
      addSubTask(subList);
    }
  }
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI" && !e.target.classList.contains("delete-button")) {
    e.target.classList.toggle("checked");
    saveData();
  }
}, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}

showTask();

function displayText(event) {
  const currentText = event.target.value;
  document.getElementById("output").textContent = currentText ? `${currentText}` : "";
}

inputBox.addEventListener("input", displayText);




let itemToDelete = null; // Variable to keep track of which item to delete

document.getElementById("list-container").addEventListener("click", function(e) {
  if (e.target.tagName === "SPAN") {
    itemToDelete = e.target.parentElement;
    openModal();
    // document.getElementById('mode').style.color = 'yellow' // change style
  }
});

function openModal() {
  document.getElementById("deleteModal").style.display = "block"
}

function closeModal() {
  document.getElementById("deleteModal").style.display = "none";
}

// Function to handle delete confirmation
function confirmDelete() {
  
  itemToDelete.remove();
  closeModal();
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById("deleteModal");
  if (event.target == modal) {
    closeModal();
  }
}

// Reponsive header
const hamburger = document.querySelector(".hamburger");
const others = document.querySelector(".others");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  others.classList.toggle("active")
})

document.querySelectorAll(".others").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  others.classList.remove("active");
}))





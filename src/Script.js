// window.addEventListener("load", () => {
//   const form = document.querySelector("#new-task-form");
//   const input = document.querySelector("#new-task-input");
//   const list_el = document.querySelector("#tasks");

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const task = input.value;

//     const task_el = document.createElement("div");
//     task_el.classList.add("task");

//     const task_content_el = document.createElement("div");
//     task_content_el.classList.add("content");

//     task_el.appendChild(task_content_el);

//     const task_input_el = document.createElement("input");
//     task_input_el.classList.add("text");
//     task_input_el.type = "text";
//     task_input_el.value = task;
//     task_input_el.setAttribute("readonly", "readonly");

//     task_content_el.appendChild(task_input_el);

//     const task_actions_el = document.createElement("div");
//     task_actions_el.classList.add("actions");

//     const task_edit_el = document.createElement("button");
//     task_edit_el.classList.add("edit");
//     task_edit_el.innerText = "Edit";

//     const task_delete_el = document.createElement("button");
//     task_delete_el.classList.add("delete");
//     task_delete_el.innerText = "Delete";

//     task_actions_el.appendChild(task_edit_el);
//     task_actions_el.appendChild(task_delete_el);

//     task_el.appendChild(task_actions_el);

//     list_el.appendChild(task_el);

//     input.value = "";

//     task_edit_el.addEventListener("click", (e) => {
//       if (task_edit_el.innerText.toLowerCase() === "edit") {
//         task_edit_el.innerText = "Save";
//         task_input_el.removeAttribute("readonly");
//         task_input_el.focus();
//       } else {
//         task_edit_el.innerText = "Edit";
//         task_input_el.setAttribute("readonly", "readonly");
//       }
//     });

//     task_delete_el.addEventListener("click", (e) => {
//       list_el.removeChild(task_el);
//     });
//   });
// });

// const openModalButtons = document.querySelectorAll("[data-modal-target]");
// const closeModalButtons = document.querySelectorAll("[data-close-button]");
// const overlay = document.getElementById("overlay");

// openModalButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const modal = document.querySelector(button.dataset.modalTarget);
//     openModal(modal);
//   });
// });

// overlay.addEventListener("click", () => {
//   const modals = document.querySelectorAll(".modal.active");
//   modals.forEach((modal) => {
//     closeModal(modal);
//   });
// });

// closeModalButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const modal = button.closest(".modal");
//     closeModal(modal);
//   });
// });

// function openModal(modal) {
//   if (modal === null) return;
//   modal.classList.add("active");
//   overlay.classList.add("active");
// }

// function closeModal(modal) {
//   if (modal === null) return;
//   modal.classList.remove("active");
//   overlay.classList.remove("active");
// }
//awdawd
let imgg = document.getElementById("imgg");
let ani_btn = document.getElementById("ani_btn");
// let ani_result = document.getElementById("ani_result");
let nameTitle = document.getElementById("nameTitle");
let nameTitleEnglish = document.getElementById("nameTitleEnglish");

function getRandomAnime() {
  fetch("https://api.jikan.moe/v4/random/anime").then((res) => {
    return res
      .json()
      .then((data) => {
        nameTitle.textContent = data.data.title;
        nameTitleEnglish.textContent = data.data.title_english;
        imgg.src = data.data.images.jpg.image_url;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
ani_btn.addEventListener("click", getRandomAnime);

getRandomAnime();

"use strict";

const storyCards = [...document.querySelectorAll(".story-card")];
const filters = [...document.querySelectorAll(".filter-button")];
const searchInput = document.querySelector("#story-search");
const dialog = document.querySelector(".article-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogBody = document.querySelector(".dialog-body");
let activeFilter = "all";

function updateStories() {
  const query = searchInput.value.trim().toLowerCase();
  storyCards.forEach((card) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesQuery = card.textContent.toLowerCase().includes(query);
    card.hidden = !matchesCategory || !matchesQuery;
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("is-active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    updateStories();
  });
});

searchInput.addEventListener("input", updateStories);

document.querySelectorAll(".read-button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".story-card");
    const template = document.getElementById(button.dataset.article);
    dialogTitle.textContent = card.querySelector("h3").textContent;
    dialogBody.replaceChildren(template.content.cloneNode(true));
    dialog.showModal();
    document.querySelector(".dialog-close").focus();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
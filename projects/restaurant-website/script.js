"use strict";

const toggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !open);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  });
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("is-active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".menu-item").forEach((item) => {
      item.hidden = selected !== "all" && item.dataset.category !== selected;
    });
  });
});
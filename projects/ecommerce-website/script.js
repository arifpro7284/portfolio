"use strict";

const cart = new Map();
const cartToggle = document.querySelector(".cart-toggle");
const cartPanel = document.querySelector(".cart-panel");
const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const cartEmpty = document.querySelector(".cart-empty");
const checkoutStatus = document.querySelector(".checkout-status");

function renderCart() {
  cartItems.replaceChildren();
  let totalItems = 0;

  cart.forEach((quantity, name) => {
    totalItems += quantity;
    const item = document.createElement("li");
    const label = document.createElement("span");
    const remove = document.createElement("button");
    label.textContent = `${name} x ${quantity}`;
    remove.type = "button";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", `Remove ${name} from demo cart`);
    remove.addEventListener("click", () => {
      cart.delete(name);
      renderCart();
    });
    item.append(label, remove);
    cartItems.append(item);
  });

  cartCount.textContent = String(totalItems);
  cartEmpty.hidden = totalItems > 0;
  checkoutStatus.textContent = "Demo only. No order or payment will be created.";
}

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.closest(".product-card").querySelector("h3").textContent;
    cart.set(name, (cart.get(name) || 0) + 1);
    renderCart();
    cartPanel.hidden = false;
    cartToggle.setAttribute("aria-expanded", "true");
    document.querySelector(".cart-close").focus();
  });
});

cartToggle.addEventListener("click", () => {
  cartPanel.hidden = !cartPanel.hidden;
  cartToggle.setAttribute("aria-expanded", String(!cartPanel.hidden));
  if (!cartPanel.hidden) document.querySelector(".cart-close").focus();
});

document.querySelector(".cart-close").addEventListener("click", () => {
  cartPanel.hidden = true;
  cartToggle.setAttribute("aria-expanded", "false");
  cartToggle.focus();
});

document.querySelector(".checkout-button").addEventListener("click", () => {
  checkoutStatus.textContent = "Demo checkout only. No order or payment was created.";
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("is-active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".product-card").forEach((card) => {
      card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;
    });
  });
});

document.querySelector("#product-search").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll(".product-card").forEach((card) => {
    const matchesSearch = card.textContent.toLowerCase().includes(query);
    const activeFilter = document.querySelector(".filter-button.is-active").dataset.filter;
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    card.hidden = !matchesSearch || !matchesFilter;
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !cartPanel.hidden) {
    cartPanel.hidden = true;
    cartToggle.setAttribute("aria-expanded", "false");
    cartToggle.focus();
  }
});
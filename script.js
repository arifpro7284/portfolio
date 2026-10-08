"use strict";

document.documentElement.classList.add("js");

const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");

function closeNavigation() {
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  primaryNav.classList.remove("is-open");
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("click", (event) => {
  if (!primaryNav.contains(event.target) && !navToggle.contains(event.target)) closeNavigation();
});

const sectionLinks = [...primaryNav.querySelectorAll('a[href^="#"]')];
const navigationSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveSection(activeSection) {
  sectionLinks.forEach((link) => {
    const isActive = link.hash === `#${activeSection.id}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

let activeSectionObserver;

function observeActiveSections() {
  if (!("IntersectionObserver" in window)) return;
  activeSectionObserver?.disconnect();

  const topInset = Math.round(window.innerHeight * 0.35);
  const bottomInset = Math.round(window.innerHeight * 0.55);
  activeSectionObserver = new IntersectionObserver((entries) => {
    const activeEntry = entries.find((entry) => entry.isIntersecting);
    if (activeEntry) setActiveSection(activeEntry.target);
  }, { rootMargin: `-${topInset}px 0px -${bottomInset}px 0px`, threshold: 0 });

  navigationSections.forEach((section) => activeSectionObserver.observe(section));
}

if ("IntersectionObserver" in window) {
  observeActiveSections();
  window.addEventListener("resize", observeActiveSections);
} else {
  setActiveSection(navigationSections[0]);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const fields = [
  { input: document.querySelector("#contact-name"), error: document.querySelector("#name-error"), message: "Please enter your name." },
  { input: document.querySelector("#contact-email"), error: document.querySelector("#email-error"), message: "Please enter a valid email address." },
  { input: document.querySelector("#contact-message"), error: document.querySelector("#message-error"), message: "Please add a short message." }
];

fields.forEach(({ input, error }) => {
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    error.textContent = "";
    formStatus.textContent = "";
    formStatus.classList.remove("is-error");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  formStatus.classList.remove("is-error");

  let isValid = true;
  fields.forEach(({ input, error, message }) => {
    const fieldIsValid = input.type === "email"
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
      : input.value.trim().length > 0;
    input.setAttribute("aria-invalid", String(!fieldIsValid));
    error.textContent = fieldIsValid ? "" : message;
    isValid = isValid && fieldIsValid;
  });

  if (!isValid) {
    formStatus.textContent = "Check the highlighted fields and try again.";
    formStatus.classList.add("is-error");
    fields.find(({ input }) => input.getAttribute("aria-invalid") === "true").input.focus();
    return;
  }

  const recipient = contactForm.dataset.recipient.trim();
  if (!recipient) {
    formStatus.textContent = "Your message is ready. Add your email address to the form's data-recipient in index.html to enable sending.";
    formStatus.classList.add("is-error");
    return;
  }

  const name = document.querySelector("#contact-name").value.trim();
  const email = document.querySelector("#contact-email").value.trim();
  const message = document.querySelector("#contact-message").value.trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  formStatus.textContent = "Your email app is opening with your message.";
});
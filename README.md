# Ariful Islam | Portfolio

Personal portfolio website for Ariful Islam, a Frontend & WordPress Web Developer.

- **Live website:** [arifpro7284.github.io/portfolio](https://arifpro7284.github.io/portfolio/)
- **GitHub profile:** [github.com/arifpro7284](https://github.com/arifpro7284)
- **Repository:** [github.com/arifpro7284/portfolio](https://github.com/arifpro7284/portfolio)

## About

The site presents Ariful's web development background, skills, services, project concepts, and contact options in a responsive dark interface with blue accents.

## Features

- Responsive layout for desktop, tablet, and mobile
- Sticky navigation with active section highlighting and a mobile menu
- Hero section with availability status, project stats, and a clearly disabled CV control until a real PDF is provided
- About, learning, skills, services, projects, and contact sections
- Project cards with technology labels, verified repository links where available, and disabled demo states until real URLs exist
- Scroll reveal effects with reduced-motion support
- Contact form validation and email-app handoff

## Technologies

- HTML5 and CSS3
- Bootstrap 5 and Bootstrap Icons
- JavaScript and React
- Google Fonts and Unsplash images
- Git and GitHub
- WordPress, WooCommerce, PHP, and MySQL (listed as development skills)

## Project Files

- `index.html` - Page content and section structure
- `style.css` - Theme, components, and responsive layouts
- `script.js` - Mobile navigation, CV download, scroll effects, and contact form behavior

## Run Locally

Open `index.html` in a browser. This project is currently in `D:\xampp\htdocs\portfolio_wb`; with XAMPP Apache running, visit:

```text
http://localhost/portfolio_wb/
```

Fonts, icons, and project images are loaded from external services, so an internet connection is needed for those assets.

## Before Customizing

- Replace `YOUR_EMAIL_ADDRESS` in the contact form's `data-recipient` attribute in `index.html` with your real email address. The form opens a prefilled message in the visitor's email app; it does not send directly to a server.
- No CV PDF is included yet. Put your real file in the project root, beside `index.html`, as `Ariful-Islam-CV.pdf`. Both controls already point to that file; remove `aria-disabled="true"` from both CV links in `index.html` to enable downloads.
- Project demos stay disabled until you have a real live URL. The business project repository is also unlinked until its matching repository is identified.
- Add LinkedIn, Fiverr, and Facebook profile URLs only when you want those social links enabled.
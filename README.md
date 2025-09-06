# Paradox-Grid

**Paradox-Grid** is a lightweight, responsive front-end framework designed as an alternative to Bootstrap.  
It provides a flexible grid system, modern utilities, themed components, and accessible helpers without the bloat.  

Built with **DRY principles**, semantic class naming, and modular files, Paradox-Grid is easy to extend, customize, and scale for any project.

---

## ✨ Features

- **Responsive Grid System** – from `xs` to `xxl`, with fluid, fixed, and gutter control.  
- **Utility-First Classes** – spacing, sizing, positioning, visibility, typography, animations, ratios, clamping, and more.  
- **UI Components** – buttons, cards, modals, navigation, sidebars, dropdowns, tables, accordions, tooltips, badges, pagination.  
- **Forms** – styled inputs, selects, radios, checkboxes, toggles, ranges, validation states, input groups.  
- **Themes** – built-in **Light** and **Dark** modes with CSS variables, auto-switching via `prefers-color-scheme`, and optional hue swappers.  
- **Accessibility** – modern `.vis-sr`, focus styles, reduced motion support.  
- **Scalable & Modular** – each feature lives in its own file under `includes/` for easy overrides.  

---

## 📦 Installation

You can include Paradox-Grid in your project in a few different ways:

### 1. Clone or Copy
Clone this repository or copy the `paradox-flex.css` and `includes/` folder into your project:

```bash
git clone https://github.com/yourusername/paradox-grid.git
```

Link the framework in your HTML:

```html
<link rel="stylesheet" href="paradox-flex.css">
<link rel="stylesheet" href="includes/0 - normalize.css">
<link rel="stylesheet" href="includes/0 - bootstrap-helpers.css">
<link rel="stylesheet" href="includes/1 - paradox-utilities.css">
<link rel="stylesheet" href="includes/1 - paradox-colors.css">
<link rel="stylesheet" href="includes/1 - paradox-typography.css">
<link rel="stylesheet" href="includes/1 - paradox-elements.css">
<link rel="stylesheet" href="includes/1 - paradox-forms.css">
<link rel="stylesheet" href="includes/1 - paradox-borders.css">
<link rel="stylesheet" href="includes/1 - paradox-sizing.css">
<link rel="stylesheet" href="includes/1 - paradox-spacing.css">
<link rel="stylesheet" href="includes/1 - paradox-themes.css">
```

*(Order matters: core files first, then utilities/elements, then themes last for overrides.)*

### 2. NPM/Yarn (coming soon)
Paradox-Grid will be published as an npm package for easier integration into build systems.

---

## 🚀 Quick Start

### Example: Responsive Grid Layout

```html
<div class="a a-6 sm-12 md-8 lg-6 xl-4">
  <div class="card-container">
    <div class="card-header">Hello</div>
    <div class="card-body">World</div>
  </div>
</div>
```

- `.a a-6` – base grid column (out of 24).  
- `sm-12 md-8 lg-6 xl-4` – responsive column widths at breakpoints.  

### Example: Themed Page

```html
<html class="theme-auto theme-hue-blue">
  <body class="use-themed-surfaces">
    <nav class="nav-bar">...</nav>
    <main class="wrap wrap-gut-2">
      <h1 class="h2-text">Welcome to Paradox-Grid</h1>
      <button class="btn btn-pr fade-in">Primary Action</button>
    </main>
  </body>
</html>
```

- `theme-auto` – follows system Light/Dark preference.  
- `theme-hue-blue` – swaps the primary color.  
- `fade-in` – animates the button into view.  

---

## 📚 Documentation

- **Grid system** – see `paradox-flex.css` and the responsive `includes/*-flex.css` files.  
- **Utilities** – `1 - paradox-utilities.css` and `1 - paradox-spacing.css`.  
- **Components** – `1 - paradox-elements.css`.  
- **Forms** – `1 - paradox-forms.css`.  
- **Theming** – `1 - paradox-themes.css` (Light/Dark + hue swappers).  

Full demo & docs page coming soon.

---

## 🛠 Development

- Paradox-Grid is designed to be modular.  
- Each category of helpers (utilities, spacing, typography, elements, themes) has its own file.  
- You can import only what you need or extend by adding your own overrides.  

---

## 📄 License

MIT License.  
Use freely in personal or commercial projects. Attribution appreciated but not required.

---

## 🙌 Credits

Created with ❤️ by **Antagonist Games**.  
Paradox-Grid is inspired by existing CSS frameworks but rebuilt from scratch with a focus on **clarity, modularity, and accessibility**.  

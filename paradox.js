/* =======================================================================
   Paradox-Grid: Optional JS Helpers
   File: /paradox.js
   -----------------------------------------------------------------------
   Features:
     - Theme manager (auto/light/dark) driven by 1 - paradox-themes.css vars
     - Copy-to-clipboard for code blocks
     - Simple search/filter for docs nav + headings
     - Small utilities for toggling .is-open on components via data attributes
   Usage:
     - Add data-pg-theme-toggle on any button to cycle theme.
     - Add data-copy="selector" on a button to copy textContent of target.
     - Add data-filter for live filtering (#docs-search wired here).
     - Add data-toggle="selector" to toggle .is-open on a target.
   ======================================================================= */

(function () {
  // ----------------------------
  // THEME MANAGER
  // ----------------------------
  const KEY = "pg_theme"; // "auto" | "light" | "dark"
  function applyTheme(mode) {
    const root = document.documentElement;
    if (mode === "light") {
      root.setAttribute("data-theme", "light");
    } else if (mode === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme"); // auto
    }
  }
  function loadTheme() {
    return localStorage.getItem(KEY) || "auto";
  }
  function saveTheme(mode) {
    localStorage.setItem(KEY, mode);
  }
  function cycleTheme() {
    const cur = loadTheme();
    const next = cur === "auto" ? "dark" : cur === "dark" ? "light" : "auto";
    saveTheme(next);
    applyTheme(next);
    // Optional aria-live feedback
    const btns = document.querySelectorAll("[data-pg-theme-toggle]");
    btns.forEach((b) => (b.dataset.state = next));
  }

  // Initialize on DOMReady
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(loadTheme());

    // Wire theme toggles
    document.body.addEventListener("click", (e) => {
      const t = e.target.closest("[data-pg-theme-toggle]");
      if (t) {
        e.preventDefault();
        cycleTheme();
      }
    });

    // Set initial state data attr
    document
      .querySelectorAll("[data-pg-theme-toggle]")
      .forEach((b) => (b.dataset.state = loadTheme()));
  });

  // Expose (optional)
  window.pgTheme = { apply: applyTheme, load: loadTheme, set: (m) => (saveTheme(m), applyTheme(m)), cycle: cycleTheme };

  // ----------------------------
  // COPY TO CLIPBOARD
  // ----------------------------
  async function copyText(txt) {
    try {
      await navigator.clipboard.writeText(txt);
      return true;
    } catch {
      return false;
    }
  }
  function flash(el, ok) {
    const old = el.textContent;
    el.textContent = ok ? "Copied!" : "Copy failed";
    setTimeout(() => (el.textContent = old), 1200);
  }
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    e.preventDefault();
    const sel = btn.getAttribute("data-copy");
    const target = sel ? document.querySelector(sel) : null;
    if (!target) return;
    const text = target.textContent || "";
    const ok = await copyText(text);
    flash(btn, ok);
  });

  // ----------------------------
  // SIMPLE FILTER / SEARCH (Docs)
  // ----------------------------
  // Filters sidebar links and section headers by text.
  function normalize(s) {
    return (s || "").toLowerCase().trim();
  }
  function filterDocs(query) {
    const q = normalize(query);
    const links = document.querySelectorAll(".docs-sidenav .nav-link");
    links.forEach((a) => {
      const show = !q || normalize(a.textContent).includes(q);
      a.style.display = show ? "" : "none";
    });
    // Optional: highlight headings in the current section (basic)
    const heads = document.querySelectorAll("#mount h1, #mount h2, #mount h3");
    heads.forEach((h) => {
      h.style.background = q && normalize(h.textContent).includes(q) ? "rgba(255,255,0,.15)" : "";
    });
  }
  document.addEventListener("input", (e) => {
    const inp = e.target.closest("#docs-search");
    if (!inp) return;
    filterDocs(inp.value);
  });

  // ----------------------------
  // GENERIC TOGGLER
  // ----------------------------
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-toggle]");
    if (!t) return;
    e.preventDefault();
    const sel = t.getAttribute("data-toggle");
    const el = sel ? document.querySelector(sel) : null;
    if (!el) return;
    el.classList.toggle("is-open");
  });

})();

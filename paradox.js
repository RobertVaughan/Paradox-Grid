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

// ----------------------------
// THEME MANAGER (robust)
// ----------------------------
(function(){
  const KEY = "pg_theme"; // "auto" | "dark" | "light"

  const getMode = () => localStorage.getItem(KEY) || "auto";
  const setMode = (mode) => { localStorage.setItem(KEY, mode); apply(mode); };

  function apply(mode){
    const root = document.documentElement; // <html>

    // Attribute API (preferred)
    if (mode === "dark") root.setAttribute("data-theme","dark");
    else if (mode === "light") root.setAttribute("data-theme","light");
    else root.removeAttribute("data-theme"); // auto

    // Legacy class API (for older CSS that might be in your bundle)
    root.classList.remove("theme-dark","theme-light");
    if (mode === "dark") root.classList.add("theme-dark");
    if (mode === "light") root.classList.add("theme-light");

    // Reflect state on toggles
    document.querySelectorAll("[data-pg-theme-toggle]").forEach(btn=>{
      btn.dataset.state = mode;
      btn.setAttribute("aria-pressed", mode !== "auto" ? "true" : "false");
      btn.setAttribute("aria-label",
        mode === "dark" ? "Switch to light theme" :
        mode === "light" ? "Use system theme" :
        "Switch to dark theme"
      );
    });

    // Sync live example iframes (same-origin only)
    const frames = document.querySelectorAll("iframe.ex-preview");
    frames.forEach(f=>{
      const doc = f.contentDocument;
      if (!doc) return;
      const html = doc.documentElement;
      if (!html) return;

      // Mirror the data-theme and legacy classes inside iframe
      if (mode === "dark") html.setAttribute("data-theme","dark");
      else if (mode === "light") html.setAttribute("data-theme","light");
      else html.removeAttribute("data-theme");

      html.classList.remove("theme-dark","theme-light");
      if (mode === "dark") html.classList.add("theme-dark");
      if (mode === "light") html.classList.add("theme-light");
    });

    // Broadcast (optional hooks)
    window.dispatchEvent(new CustomEvent("pg:theme",{ detail:{ mode } }));
  }

  function cycle(){
    const cur = getMode();
    const next = cur === "auto" ? "dark" : (cur === "dark" ? "light" : "auto");
    setMode(next);
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    apply(getMode());

    // Delegated click handler
    document.addEventListener("click",(e)=>{
      const t = e.target.closest("[data-pg-theme-toggle]");
      if (!t) return;
      e.preventDefault();
      cycle();
    });

    // Ensure iframes also sync after they load content later
    document.querySelectorAll("iframe.ex-preview").forEach(f=>{
      f.addEventListener("load", ()=> apply(getMode()));
    });
  });

  // Expose (optional)
  window.pgTheme = { get:getMode, set:setMode, apply, cycle };
})();


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

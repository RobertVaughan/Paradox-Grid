
(function(){
  const routes = {
    '#intro': 'Introduction',
    '#grid': 'Grid',
    '#utilities': 'Utilities',
    '#elements': 'Elements',
    '#forms': 'Forms',
    '#themes': 'Themes',
    '#playground': 'Playground'
  };

  const sections = {
    '#intro': introSection,
    '#grid': gridSection,
    '#utilities': utilitiesSection,
    '#elements': elementsSection,
    '#forms': formsSection,
    '#themes': themesSection,
    '#playground': playgroundSection
  };

  function qs(sel, ctx=document){ return ctx.querySelector(sel); }
  function qsa(sel, ctx=document){ return Array.from(ctx.querySelectorAll(sel)); }

  // Theme toggle
  const THEME_KEY = 'pg_docs_theme';
  function applySavedTheme(){
    const saved = localStorage.getItem(THEME_KEY);
    if(saved === 'light') document.documentElement.classList.add('theme-light');
    else document.documentElement.classList.remove('theme-light');
  }
  function toggleTheme(){
    const isLight = document.documentElement.classList.toggle('theme-light');
    localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
  }
  window.toggleTheme = toggleTheme;
  applySavedTheme();

  // Router
  function render(){
    const hash = location.hash || '#intro';
    const mount = qs('#mount');
    const fn = sections[hash] || introSection;
    mount.innerHTML = '';
    mount.appendChild(fn());

    // update active link
    qsa('.nav-sec a').forEach(a => {
      if (a.getAttribute('href') === hash) a.classList.add('is-active');
      else a.classList.remove('is-active');
    });

    // wire copy buttons
    wireCopy();
    // wire live previews
    wireLivePreviews();
  }
  window.addEventListener('hashchange', render);
  window.addEventListener('DOMContentLoaded', render);

  function makeSection(title, html){
    const wrap = document.createElement('section');
    wrap.className = 'docs-section';
    wrap.innerHTML = `<h1>${title}</h1>${html}`;
    return wrap;
  }

  function codeBlock(markup){
    const pre = document.createElement('pre');
    pre.className = 'code';
    const btn = document.createElement('button');
    btn.className = 'copy';
    btn.textContent = 'Copy';
    const code = document.createElement('code');
    code.textContent = markup.trim();
    pre.appendChild(btn);
    pre.appendChild(code);
    return pre;
  }

  function exampleBlock(markup){
    const box = document.createElement('div');
    box.className = 'card';
    const ex = document.createElement('div'); ex.className = 'example';
    const prev = document.createElement('iframe'); prev.className = 'preview';
    const controls = document.createElement('div'); controls.className = 'controls';
    const openBtn = document.createElement('button'); openBtn.className = 'btn'; openBtn.textContent = 'Open in new tab';
    openBtn.onclick = () => {
      const blob = new Blob([markup], {type: 'text/html'});
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    };
    controls.appendChild(openBtn);
    ex.appendChild(prev);
    ex.appendChild(controls);
    const cd = codeBlock(markup);
    box.appendChild(ex);
    box.appendChild(cd);

    // load iframe
    setTimeout(()=>{
      prev.srcdoc = markup;
    }, 0);
    return box;
  }

  function wireCopy(){
    qsa('.copy').forEach(btn => {
      btn.onclick = () => {
        const code = btn.nextElementSibling.textContent;
        navigator.clipboard.writeText(code).then(()=>{
          btn.textContent = 'Copied!';
          setTimeout(()=>btn.textContent='Copy', 1200);
        });
      };
    });
  }

  function wireLivePreviews(){
    qsa('iframe.preview').forEach(f => {
      // nothing extra yet
    });
  }

  // Sections
  function introSection(){
    const html = `
      <p>Paradox-Grid is a lightweight, responsive CSS framework with a flexible grid, utilities, components, forms, and theming.</p>
      <div class="notice">Tip: Use the sidebar to navigate. Each section includes live, interactive examples and copyable code.</div>
      <div class="footer">Version: Unreleased (dev). Author: Antagonist Games.</div>
    `;
    return makeSection('Welcome', html);
  }

  function gridSection(){
    const markup = `<!doctype html>
<html class="theme-auto theme-hue-blue">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="../paradox-flex.css">
  <link rel="stylesheet" href="../includes/1 - paradox-utilities.css">
  <link rel="stylesheet" href="../includes/1 - paradox-elements.css">
  <link rel="stylesheet" href="../includes/1 - paradox-spacing.css">
  <link rel="stylesheet" href="../includes/1 - paradox-themes.css">
  <style>
    .demo-box{ background:#e6e6ef; border:1px dashed #bbb; padding:8px; text-align:center; }
  </style>
</head>
<body class="use-themed-surfaces">
  <div class="wrap wrap-gut-2">
    <h2 class="h4-text">Responsive Grid</h2>
    <div class="row">
      <div class="a a-6 sm-12 md-8 lg-6 xl-4"><div class="demo-box">a-6 sm-12 md-8 lg-6 xl-4</div></div>
      <div class="a a-6 sm-12 md-8 lg-6 xl-4"><div class="demo-box">a-6 sm-12 md-8 lg-6 xl-4</div></div>
      <div class="a a-6 sm-12 md-8 lg-6 xl-4"><div class="demo-box">a-6 sm-12 md-8 lg-6 xl-4</div></div>
      <div class="a a-6 sm-12 md-8 lg-6 xl-4"><div class="demo-box">a-6 sm-12 md-8 lg-6 xl-4</div></div>
    </div>
  </div>
</body>
</html>`;
    const s = makeSection('Grid', '<p>Basic responsive grid columns using Paradox-Grid.</p>');
    s.appendChild(exampleBlock(markup));
    return s;
  }

  function utilitiesSection(){
    const markup = `<!doctype html>
<html class="theme-auto">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="../includes/1 - paradox-utilities.css">
  <link rel="stylesheet" href="../includes/1 - paradox-themes.css">
</head>
<body>
  <div style="padding:16px">
    <h2 class="h4-text">Utilities</h2>
    <div class="p10 b-blue" style="border-radius:8px;">
      <div class="clamp-2" style="max-width:360px;">
        This is a very long piece of text that will clamp to two lines using the clamp utility. 
        It demonstrates how overflow is handled gracefully with ellipsis.
      </div>
    </div>
    <div class="mgt10">
      <div class="ar-16x9" style="background:#eee; border-radius:8px;">
        <img class="fit-cover" src="https://placehold.co/800x450" alt="demo">
      </div>
    </div>
    <div class="mgt10">
      <button class="fade-in">Fade In</button>
      <button class="slide-up">Slide Up</button>
      <button class="pulse">Pulse</button>
    </div>
  </div>
</body>
</html>`;
    const s = makeSection('Utilities', '<p>Handy helpers for spacing, motion, aspect ratio, and clamping.</p>');
    s.appendChild(exampleBlock(markup));
    return s;
  }

  function elementsSection(){
    const markup = `<!doctype html>
<html class="theme-auto theme-hue-blue">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="../includes/1 - paradox-elements.css">
  <link rel="stylesheet" href="../includes/1 - paradox-themes.css">
</head>
<body class="use-themed-surfaces">
  <div class="wrap wrap-gut-2">
    <h2 class="h4-text">Buttons, Cards, Dropdowns</h2>
    <div class="mgb10">
      <button class="btn btn-pr">Primary</button>
      <button class="btn btn-outline">Outline</button>
      <button class="btn btn-ghost">Ghost</button>
      <button class="btn btn-ic"><span class="btn-ic-slot">🔍</span></button>
    </div>

    <div class="card-container mgt10">
      <div class="card-header">Card Header</div>
      <div class="card-body">Card body content</div>
      <div class="card-footer">Card footer</div>
    </div>

    <div class="mgt10 drop">
      <button class="btn btn-pr drop-btn">Menu ▾</button>
      <div class="drop-menu">
        <a class="drop-item" href="#">Action</a>
        <a class="drop-item" href="#">Another</a>
        <div class="drop-div"></div>
        <a class="drop-item is-dis" href="#" aria-disabled="true">Disabled</a>
      </div>
    </div>

    <div class="mgt15">
      <table class="tbl tbl-striped tbl-hover tbl-bord">
        <thead><tr><th>Item</th><th>Qty</th></tr></thead>
        <tbody>
          <tr><td>Widgets</td><td class="tbl-align-end">16</td></tr>
          <tr><td>Gadgets</td><td class="tbl-align-end">9</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>`;
    const s = makeSection('Elements', '<p>Core UI elements: buttons, cards, dropdowns, tables, and more.</p>');
    s.appendChild(exampleBlock(markup));
    return s;
  }

  function formsSection(){
    const markup = `<!doctype html>
<html class="theme-auto theme-hue-blue">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="../includes/1 - paradox-forms.css">
  <link rel="stylesheet" href="../includes/1 - paradox-elements.css">
  <link rel="stylesheet" href="../includes/1 - paradox-themes.css">
</head>
<body class="use-themed-surfaces">
  <div class="wrap wrap-gut-2">
    <h2 class="h4-text">Forms</h2>
    <form class="form-row">
      <div class="field">
        <label class="label" for="em">Email <span class="req">*</span></label>
        <input id="em" class="inpt" type="email" placeholder="you@site.com">
        <div class="hint">We’ll never share your email.</div>
      </div>
      <div class="field">
        <label class="label" for="pw">Password</label>
        <div class="grp">
          <span class="grp-add">🔒</span>
          <input id="pw" class="inpt" type="password" placeholder="••••••••">
          <button class="grp-btn btn btn-pr" type="button">Show</button>
        </div>
      </div>
      <button class="btn btn-pr" type="submit">Sign in</button>
    </form>

    <div class="mgt15">
      <label class="chk">
        <input class="chk-inpt" type="checkbox" checked>
        <span class="chk-box"></span>
        <span class="chk-lbl">Remember me</span>
      </label>

      <label class="sw mgl10">
        <input class="sw-inpt" type="checkbox">
        <span class="sw-trk"><span class="sw-knob"></span></span>
        <span class="sw-lbl">Notifications</span>
      </label>
    </div>
  </div>
</body>
</html>`;
    const s = makeSection('Forms', '<p>Form controls, input groups, switches, and validation states.</p>');
    s.appendChild(exampleBlock(markup));
    return s;
  }

  function themesSection(){
    const markup = `<!doctype html>
<html class="theme-auto theme-hue-purple">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="../includes/1 - paradox-themes.css">
  <link rel="stylesheet" href="../includes/1 - paradox-elements.css">
</head>
<body class="use-themed-surfaces">
  <div class="wrap wrap-gut-2">
    <h2 class="h4-text">Themes</h2>
    <p>Toggle between Light/Dark and swap brand hues with utility classes.</p>
    <div class="mgt10">
      <button class="btn btn-pr">Primary</button>
      <button class="btn btn-sc">Secondary</button>
      <button class="btn btn-err">Error</button>
      <button class="btn btn-suc">Success</button>
    </div>
  </div>
</body>
</html>`;
    const s = makeSection('Themes', '<p>Light, Dark, and hue swappers powered by CSS variables.</p>');
    s.appendChild(exampleBlock(markup));
    return s;
  }

  function playgroundSection(){
    const wrap = makeSection('Playground', `
      <p>Live editor: write HTML that uses Paradox-Grid and see results instantly.</p>
      <div class="card">
        <div class="controls" style="justify-content: space-between;">
          <span class="muted">Includes: <code>paradox-flex.css</code>, <code>1 - paradox-utilities.css</code>, <code>1 - paradox-elements.css</code>, <code>1 - paradox-forms.css</code>, <code>1 - paradox-themes.css</code></span>
          <button class="btn" id="run">Run</button>
        </div>
        <div style="display:grid; grid-template-columns: 1fr; gap:10px; margin-top:10px;">
          <textarea id="src" class="code" style="min-height:220px;"></textarea>
          <iframe id="out" class="preview" style="height:360px;"></iframe>
        </div>
      </div>
    `);
    setTimeout(()=>{
      const src = qs('#src'); const out = qs('#out'); const run = qs('#run');
      src.value = `<!doctype html>
<html class="theme-auto theme-hue-blue">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="../paradox-flex.css">
  <link rel="stylesheet" href="../includes/1 - paradox-utilities.css">
  <link rel="stylesheet" href="../includes/1 - paradox-elements.css">
  <link rel="stylesheet" href="../includes/1 - paradox-forms.css">
  <link rel="stylesheet" href="../includes/1 - paradox-themes.css">
</head>
<body class="use-themed-surfaces">
  <nav class="nav-bar">
    <div class="nav-brand">Paradox-Grid</div>
    <nav class="nav-menu">
      <a class="nav-link is-active" href="#">Home</a>
      <a class="nav-link" href="#">Docs</a>
      <a class="nav-link" href="#">GitHub</a>
    </nav>
  </nav>
  <main class="wrap wrap-gut-2">
    <div class="row mgt10">
      <div class="a a-12 md-8"><div class="card-container"><div class="card-header">Demo</div><div class="card-body">Edit the HTML in the left pane and click Run.</div></div></div>
      <div class="a a-12 md-4"><button class="btn btn-pr fade-in">Primary Action</button></div>
    </div>
  </main>
</body>
</html>`;
      function runIt(){
        out.srcdoc = src.value;
      }
      run.onclick = runIt;
      runIt();
    }, 0);
    return wrap;
  }

})();

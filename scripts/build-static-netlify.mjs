import { mkdirSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { join } from "node:path";
import { COUNTRIES } from "../src/data/tin-countries.ts";

const outDir = join(process.cwd(), "dist", "netlify-static");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const countries = [...COUNTRIES].sort((a, b) => a.nameHe.localeCompare(b.nameHe, "he"));

const html = `<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>מאתר TIN לצורכי FATCA/CRS</title>
    <meta name="description" content="חיפוש מהיר של שם ומבנה מספר זיהוי מס לפי מדינה, ליחיד ולחברה.">
    <meta name="theme-color" content="#0f172a">
    <link rel="canonical" href="/">
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <div class="page-shell">
      <header class="hero">
        <div class="hero__inner">
          <div class="hero__top">
            <p class="eyebrow" data-i18n="eyebrow">FATCA / CRS</p>
            <button id="lang-toggle" type="button" class="lang-toggle" aria-label="Switch language">EN</button>
          </div>
          <h1 data-i18n="title">מאתר TIN לפי מדינה</h1>
          <p class="hero__text" data-i18n="subtitle">בחרי מדינה כדי לראות את שם המזהה, המבנה, דוגמאות, ומקורות רשמיים.</p>
        </div>
      </header>

      <main class="layout">
        <section class="panel panel--controls" aria-label="Country selection">
          <label class="field-label" for="country-search" data-i18n="searchLabel">חיפוש מדינה</label>
          <input id="country-search" class="text-input" type="search" data-i18n-attr="placeholder:searchPlaceholder" placeholder="הקלידי ישראל, United States, Germany..." autocomplete="off">

          <label class="field-label" for="country-select" data-i18n="selectLabel">בחירת מדינה</label>
          <select id="country-select" class="select-input" aria-describedby="selection-help">
            <option value="" data-i18n="selectPlaceholder">בחרי מדינה מהרשימה</option>
          </select>
          <p id="selection-help" class="helper-text" data-i18n="helper">הרשימה מסתננת לפי החיפוש למעלה.</p>
        </section>

        <section id="result" class="panel panel--result" aria-live="polite">
          <div class="empty-state">
            <h2 data-i18n="emptyTitle">עדיין לא נבחרה מדינה</h2>
            <p data-i18n="emptyBody">אחרי בחירה תראי כאן את מבנה ה-TIN ליחיד ולחברה, יחד עם קישורים רשמיים.</p>
          </div>
        </section>
      </main>
    </div>

    <script>window.__TIN_COUNTRIES__ = [];</script>
    <script src="/site-data.js"></script>
    <script src="/app.js"></script>
  </body>
</html>`;

const css = `:root {
  --background: #f3f6fb;
  --foreground: #102033;
  --surface: #ffffff;
  --surface-alt: #eef4ff;
  --border: #d7e2f0;
  --primary: #2158c9;
  --primary-strong: #173f92;
  --muted: #5d6f85;
  --warning-bg: #fff8e8;
  --warning-border: #efd38a;
  --shadow: 0 22px 60px rgba(26, 43, 72, 0.12);
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: Arial, "Noto Sans Hebrew", "Segoe UI", sans-serif;
  background: linear-gradient(180deg, #edf3ff 0%, var(--background) 35%, #f8fbff 100%);
  color: var(--foreground);
}
a { color: var(--primary-strong); }

.page-shell {
  min-height: 100vh;
}

.hero {
  padding: 40px 20px 24px;
}

.hero__inner,
.layout {
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--primary);
  font-size: 13px;
  font-weight: 700;
}

.hero__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.hero__top .eyebrow { margin: 0; }

.lang-toggle {
  appearance: none;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--foreground);
  border-radius: 999px;
  padding: 6px 14px;
  font: inherit;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  min-height: 34px;
}

.lang-toggle:hover { border-color: var(--primary); color: var(--primary); }


h1 {
  margin: 0;
  font-size: clamp(32px, 5vw, 56px);
  line-height: 1.05;
}

.hero__text {
  margin: 14px 0 0;
  max-width: 680px;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.7;
}

.layout {
  display: grid;
  grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
  gap: 20px;
  padding-bottom: 32px;
}

.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.panel--controls {
  padding: 18px;
  align-self: start;
  position: sticky;
  top: 16px;
}

.field-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
}

.text-input,
.select-input {
  width: 100%;
  min-height: 48px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--foreground);
  padding: 12px 14px;
  font: inherit;
}

.text-input {
  margin-bottom: 16px;
}

.helper-text {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.panel--result {
  padding: 18px;
}

.empty-state {
  padding: 28px 8px;
  text-align: center;
  color: var(--muted);
}

.country-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}

.flag {
  font-size: 40px;
  line-height: 1;
}

.country-title {
  margin: 0;
  font-size: 28px;
  line-height: 1.15;
}

.country-subtitle,
.tin-subtitle,
.card-note,
.disclaimer {
  color: var(--muted);
}

.warning {
  margin: 0 0 18px;
  padding: 12px 14px;
  background: var(--warning-bg);
  border: 1px solid var(--warning-border);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
}

.tin-overview {
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-alt);
  margin-bottom: 18px;
}

.tin-title {
  margin: 0 0 4px;
  font-size: 24px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.info-card {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  background: var(--surface);
}

.card-label {
  margin: 0 0 10px;
  font-size: 12px;
  color: var(--primary);
  font-weight: 700;
}

.card-title {
  margin: 0 0 12px;
  font-size: 22px;
}

.detail-list {
  display: grid;
  gap: 10px;
}

.detail-row dt {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 4px;
}

.detail-row dd {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
}

.sources-grid {
  display: grid;
  grid-template-columns: 1.3fr 0.9fr;
  gap: 14px;
}

.link-list,
.meta-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.link-list a,
.meta-list a {
  display: inline-flex;
  gap: 8px;
  align-items: start;
  text-decoration: none;
  word-break: break-word;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.action-btn {
  appearance: none;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  color: var(--foreground);
  padding: 12px 14px;
  font: inherit;
  cursor: pointer;
}

.action-btn--primary {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.toast {
  position: fixed;
  left: 16px;
  bottom: 16px;
  max-width: min(360px, calc(100vw - 32px));
  padding: 12px 14px;
  border-radius: 8px;
  background: #13294b;
  color: #fff;
  box-shadow: var(--shadow);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity .2s ease, transform .2s ease;
  pointer-events: none;
}

.toast.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 860px) {
  .layout,
  .sources-grid,
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .panel--controls {
    position: static;
  }

  .hero {
    padding-top: 28px;
  }

  h1 {
    font-size: 34px;
  }
}
`;

const appJs = `(function () {
  const countries = Array.isArray(window.__TIN_COUNTRIES__) ? window.__TIN_COUNTRIES__ : [];
  const searchInput = document.getElementById('country-search');
  const select = document.getElementById('country-select');
  const result = document.getElementById('result');
  const langBtn = document.getElementById('lang-toggle');

  const I18N = {
    he: {
      eyebrow: 'FATCA / CRS',
      title: 'מאתר TIN לפי מדינה',
      subtitle: 'בחרי מדינה כדי לראות את שם המזהה, המבנה, דוגמאות, ומקורות רשמיים.',
      searchLabel: 'חיפוש מדינה',
      searchPlaceholder: 'הקלידי ישראל, United States, Germany...',
      selectLabel: 'בחירת מדינה',
      selectPlaceholder: 'בחרי מדינה מהרשימה',
      helper: 'הרשימה מסתננת לפי החיפוש למעלה.',
      emptyTitle: 'עדיין לא נבחרה מדינה',
      emptyBody: 'אחרי בחירה תראי כאן את מבנה ה-TIN ליחיד ולחברה, יחד עם קישורים רשמיים.',
      notFoundTitle: 'לא נמצאה מדינה',
      notFoundBody: 'נסי חיפוש אחר או בחרי מדינה מהרשימה.',
      warning: 'המידע מיועד להתמצאות בלבד ואינו מהווה ייעוץ מס או ייעוץ משפטי. יש לאמת מול הרשות המוסמכת לפני שימוש בפועל.',
      tinLocal: 'שם המזהה המקומי',
      forIndividual: 'ליחיד',
      forEntity: 'לחברה / ישות',
      format: 'מבנה', example: 'דוגמה', note: 'הערה',
      whereTitle: 'איפה אפשר למצוא את המספר',
      sourcesTitle: 'מקורות רשמיים',
      localAuthority: 'רשות המס המקומית',
      copy: 'העתקה', downloadTxt: 'הורדת TXT', print: 'הדפסה / PDF',
      toastDownloaded: 'קובץ הטקסט ירד בהצלחה',
      toastCopied: 'התוכן הועתק ללוח',
      toastCopyFail: 'לא ניתן היה להעתיק אוטומטית',
      toastPrintBlocked: 'הדפדפן חסם את חלון ההדפסה',
      langBtn: 'EN',
    },
    en: {
      eyebrow: 'FATCA / CRS',
      title: 'TIN Finder by Country',
      subtitle: 'Select a country to see the local TIN name, format, examples, and official sources.',
      searchLabel: 'Search country',
      searchPlaceholder: 'Type Israel, United States, Germany...',
      selectLabel: 'Select country',
      selectPlaceholder: 'Choose a country',
      helper: 'The list filters by the search above.',
      emptyTitle: 'No country selected yet',
      emptyBody: 'Once selected, you will see the TIN structure for individuals and entities, with official links.',
      notFoundTitle: 'Country not found',
      notFoundBody: 'Try another search or pick from the list.',
      warning: 'This information is for orientation only and does not constitute tax or legal advice. Verify with the competent authority before use.',
      tinLocal: 'Local TIN name',
      forIndividual: 'Individual',
      forEntity: 'Entity / Company',
      format: 'Format', example: 'Example', note: 'Note',
      whereTitle: 'Where to find the number',
      sourcesTitle: 'Official sources',
      localAuthority: 'Local tax authority',
      copy: 'Copy', downloadTxt: 'Download TXT', print: 'Print / PDF',
      toastDownloaded: 'Text file downloaded',
      toastCopied: 'Copied to clipboard',
      toastCopyFail: 'Could not copy automatically',
      toastPrintBlocked: 'The browser blocked the print window',
      langBtn: 'עב',
    },
  };

  let lang = (localStorage.getItem('tin_lang') === 'en') ? 'en' : 'he';
  function t(k) { return I18N[lang][k] || k; }
  function countryName(c) { return lang === 'en' ? c.nameEn : c.nameHe; }
  function countrySecondary(c) { return lang === 'en' ? c.nameHe : c.nameEn; }
  function tinName(c) { return lang === 'en' ? c.tinNameEn : c.tinNameHe; }
  function tinSecondary(c) { return lang === 'en' ? c.tinNameHe : c.tinNameEn; }

  function applyI18nStatic() {
    document.documentElement.lang = lang === 'en' ? 'en' : 'he';
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.title = t('title');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      const pair = el.getAttribute('data-i18n-attr').split(':');
      if (pair.length === 2) el.setAttribute(pair[0], t(pair[1]));
    });
    if (langBtn) langBtn.textContent = t('langBtn');
  }

  let filtered = countries.slice();
  let selectedCode = '';


  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  }

  function buildExportText(country) {
    const lines = [
      t('title') + ' — FATCA/CRS',
      (lang === 'en' ? 'Country: ' : 'מדינה: ') + countryName(country) + ' (' + countrySecondary(country) + ') ' + country.flag,
      '',
      t('tinLocal') + ': ' + tinName(country) + ' / ' + tinSecondary(country),
      '',
      '— ' + t('forIndividual') + ' —',
      (lang === 'en' ? 'Name: ' : 'שם: ') + country.individual.name,
      t('format') + ': ' + country.individual.format,
      t('example') + ': ' + country.individual.example,
    ];

    if (country.individual.note) lines.push(t('note') + ': ' + country.individual.note);

    lines.push('', '— ' + t('forEntity') + ' —',
      (lang === 'en' ? 'Name: ' : 'שם: ') + country.entity.name,
      t('format') + ': ' + country.entity.format,
      t('example') + ': ' + country.entity.example);
    if (country.entity.note) lines.push(t('note') + ': ' + country.entity.note);

    lines.push('', t('whereTitle') + ':');
    country.whereToFind.forEach(function (item) {
      lines.push('• ' + item.label + (item.url ? ' — ' + item.url : ''));
    });

    lines.push('', t('sourcesTitle') + ':');
    lines.push(t('localAuthority') + ': ' + country.officialSource);
    if (country.oecdSource) lines.push('OECD TIN: ' + country.oecdSource);
    if (country.euTinSource) lines.push('EU TIN: ' + country.euTinSource);
    lines.push('', t('warning'));
    return lines.join('\n');
  }

  function downloadText(country) {
    const blob = new Blob(['\uFEFF' + buildExportText(country)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'TIN-' + country.code + '.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(t('toastDownloaded'));
  }

  function copyText(country) {
    const text = buildExportText(country);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(t('toastCopied'));
      }).catch(function () {
        showToast(t('toastCopyFail'));
      });
      return;
    }
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
    showToast(t('toastCopied'));
  }

  function printCountry(country) {
    const dir = lang === 'en' ? 'ltr' : 'rtl';
    const html = '<!doctype html><html lang="' + lang + '" dir="' + dir + '"><head><meta charset="utf-8"><title>TIN-' + escapeHtml(country.code) + '</title><style>body{font-family:Arial,sans-serif;padding:24px;line-height:1.7;color:#111}pre{white-space:pre-wrap;font:inherit}</style></head><body><pre>' + escapeHtml(buildExportText(country)) + '</pre></body></html>';
    const win = window.open('', '_blank', 'noopener,noreferrer,width=900,height=700');
    if (!win) {
      showToast(t('toastPrintBlocked'));
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(function () { win.print(); }, 250);
  }

  function renderOptions(list) {
    const current = selectedCode;
    select.innerHTML = '<option value="">' + escapeHtml(t('selectPlaceholder')) + '</option>';
    list.forEach(function (country) {
      const option = document.createElement('option');
      option.value = country.code;
      option.textContent = country.flag + ' ' + countryName(country) + ' (' + countrySecondary(country) + ')';
      select.appendChild(option);
    });
    if (current && list.some(function (country) { return country.code === current; })) {
      select.value = current;
    }
  }

  function renderEmpty() {
    result.innerHTML = '<div class="empty-state"><h2>' + escapeHtml(t('emptyTitle')) + '</h2><p>' + escapeHtml(t('emptyBody')) + '</p></div>';
  }

  function renderCountry(country) {
    if (!country) {
      result.innerHTML = '<div class="empty-state"><h2>' + escapeHtml(t('notFoundTitle')) + '</h2><p>' + escapeHtml(t('notFoundBody')) + '</p></div>';
      return;
    }

    const whereLinks = country.whereToFind.map(function (item) {
      const text = escapeHtml(item.label);
      if (!item.url) return '<li>' + text + '</li>';
      return '<li><a href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener noreferrer">↗ ' + text + '</a></li>';
    }).join('');

    const metaLinks = [
      { label: t('localAuthority'), url: country.officialSource },
      country.oecdSource ? { label: 'OECD TIN', url: country.oecdSource } : null,
      country.euTinSource ? { label: 'EU TIN', url: country.euTinSource } : null,
    ].filter(Boolean).map(function (item) {
      return '<li><a href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener noreferrer">↗ ' + escapeHtml(item.label) + '</a></li>';
    }).join('');

    result.innerHTML = [
      '<p class="warning">' + escapeHtml(t('warning')) + '</p>',
      '<div class="country-head">',
      '<div class="flag">' + escapeHtml(country.flag) + '</div>',
      '<div>',
      '<h2 class="country-title">' + escapeHtml(countryName(country)) + '</h2>',
      '<div class="country-subtitle">' + escapeHtml(countrySecondary(country)) + '</div>',
      '</div>',
      '</div>',
      '<section class="tin-overview">',
      '<div class="tin-subtitle">' + escapeHtml(t('tinLocal')) + '</div>',
      '<h3 class="tin-title">' + escapeHtml(tinName(country)) + '</h3>',
      '<div class="tin-subtitle">' + escapeHtml(tinSecondary(country)) + '</div>',
      '</section>',
      '<section class="cards-grid">',
      '<article class="info-card">',
      '<p class="card-label">' + escapeHtml(t('forIndividual')) + '</p>',
      '<h3 class="card-title">' + escapeHtml(country.individual.name) + '</h3>',
      '<dl class="detail-list">',
      '<div class="detail-row"><dt>' + escapeHtml(t('format')) + '</dt><dd>' + escapeHtml(country.individual.format) + '</dd></div>',
      '<div class="detail-row"><dt>' + escapeHtml(t('example')) + '</dt><dd>' + escapeHtml(country.individual.example) + '</dd></div>',
      (country.individual.note ? '<div class="detail-row"><dt>' + escapeHtml(t('note')) + '</dt><dd>' + escapeHtml(country.individual.note) + '</dd></div>' : ''),
      '</dl>',
      '</article>',
      '<article class="info-card">',
      '<p class="card-label">' + escapeHtml(t('forEntity')) + '</p>',
      '<h3 class="card-title">' + escapeHtml(country.entity.name) + '</h3>',
      '<dl class="detail-list">',
      '<div class="detail-row"><dt>' + escapeHtml(t('format')) + '</dt><dd>' + escapeHtml(country.entity.format) + '</dd></div>',
      '<div class="detail-row"><dt>' + escapeHtml(t('example')) + '</dt><dd>' + escapeHtml(country.entity.example) + '</dd></div>',
      (country.entity.note ? '<div class="detail-row"><dt>' + escapeHtml(t('note')) + '</dt><dd>' + escapeHtml(country.entity.note) + '</dd></div>' : ''),
      '</dl>',
      '</article>',
      '</section>',
      '<section class="sources-grid">',
      '<article class="info-card">',
      '<p class="card-label">' + escapeHtml(t('whereTitle')) + '</p>',
      '<ul class="link-list">' + whereLinks + '</ul>',
      '</article>',
      '<article class="info-card">',
      '<p class="card-label">' + escapeHtml(t('sourcesTitle')) + '</p>',
      '<ul class="meta-list">' + metaLinks + '</ul>',
      '</article>',
      '</section>',
      '<div class="actions">',
      '<button class="action-btn action-btn--primary" type="button" data-action="copy">' + escapeHtml(t('copy')) + '</button>',
      '<button class="action-btn" type="button" data-action="txt">' + escapeHtml(t('downloadTxt')) + '</button>',
      '<button class="action-btn" type="button" data-action="print">' + escapeHtml(t('print')) + '</button>',
      '</div>'
    ].join('');

    result.querySelector('[data-action="copy"]').addEventListener('click', function () { copyText(country); });
    result.querySelector('[data-action="txt"]').addEventListener('click', function () { downloadText(country); });
    result.querySelector('[data-action="print"]').addEventListener('click', function () { printCountry(country); });
  }

  function updateFromSelection(code) {
    selectedCode = code || '';
    const country = countries.find(function (item) { return item.code === selectedCode; });
    if (country) {
      location.hash = country.code;
      renderCountry(country);
    } else {
      history.replaceState(null, '', location.pathname + location.search);
      renderEmpty();
    }
  }

  function filterCountries(query) {
    const normalized = query.trim().toLowerCase();
    filtered = countries.filter(function (country) {
      if (!normalized) return true;
      return [country.nameHe, country.nameEn, country.code, country.tinNameHe, country.tinNameEn]
        .join(' ')
        .toLowerCase()
        .includes(normalized);
    });
    renderOptions(filtered);
    if (selectedCode && !filtered.some(function (country) { return country.code === selectedCode; })) {
      selectedCode = '';
      select.value = '';
      updateFromSelection('');
    }
  }

  function setLang(next) {
    lang = next === 'en' ? 'en' : 'he';
    try { localStorage.setItem('tin_lang', lang); } catch (e) {}
    applyI18nStatic();
    renderOptions(filtered);
    if (selectedCode) {
      const c = countries.find(function (item) { return item.code === selectedCode; });
      if (c) renderCountry(c); else renderEmpty();
    } else {
      renderEmpty();
    }
  }

  if (langBtn) {
    langBtn.addEventListener('click', function () {
      setLang(lang === 'he' ? 'en' : 'he');
    });
  }

  searchInput.addEventListener('input', function (event) {
    filterCountries(event.target.value || '');
  });

  select.addEventListener('change', function (event) {
    updateFromSelection(event.target.value || '');
  });

  applyI18nStatic();
  renderOptions(filtered);

  const initialCode = decodeURIComponent((location.hash || '').replace('#', '')).toUpperCase();
  if (initialCode && countries.some(function (country) { return country.code === initialCode; })) {
    selectedCode = initialCode;
    select.value = initialCode;
    renderCountry(countries.find(function (country) { return country.code === initialCode; }));
  }
})();`;


const siteDataJs = `window.__TIN_COUNTRIES__ = ${JSON.stringify(countries, null, 2)};\n`;

writeFileSync(join(outDir, "index.html"), html);
writeFileSync(join(outDir, "styles.css"), css);
writeFileSync(join(outDir, "app.js"), appJs);
writeFileSync(join(outDir, "site-data.js"), siteDataJs);
writeFileSync(join(outDir, "_redirects"), "/* /index.html 200\n");
copyFileSync(join(outDir, "index.html"), join(outDir, "200.html"));
copyFileSync(join(outDir, "index.html"), join(outDir, "404.html"));

console.log(`[build-static-netlify] Generated static site with ${countries.length} countries in ${outDir}`);
/* ===========================================================
   KI als Teampartner in der Lehre — Vortragsbegleiter
   Reines Vanilla JS, kein Build-Schritt, kein Backend.
   =========================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     1) INHALTS-DATEN
     --------------------------------------------------------- */

  const PROMPTS = {
    'p1-1': `„Bitte hilf mir, ein Teaching Statement zu entwickeln.
Führe mich Schritt für Schritt durch diese Bereiche —
stelle jeweils eine Frage und warte auf meine Antwort:

1. Lehrüberzeugungen: Was beeinflusst meine pädagogische Haltung?
2. Lehrmethoden: Welche Methoden nutze ich bevorzugt und warum?
3. Lernergebnisse: Was sollen Lernende am Ende können oder verstehen?
4. Aktivierungsstrategien: Wie gestalte ich aktive Beteiligung?
5. Persönliche Entwicklung: Wie hat sich meine Lehre verändert?

Fasse meine Antworten am Ende zu einem
zusammenhängenden Dokument zusammen."`,

    'p1-2': `„Hier ist mein Teaching Statement:
[Statement einfügen oder als PDF hochladen]

Ab jetzt arbeitest du als meine persönliche KI-Assistenz
für Unterrichtsplanung. Beachte bei jeder Antwort:
- Meine pädagogischen Überzeugungen und bevorzugten Methoden
- Meine Zielgruppe und den Schulkontext
- Meinen Kommunikationsstil (wie im Statement beschrieben)

Bestätige, dass du mein Statement verstanden hast, indem
du die drei wichtigsten Merkmale meiner Lehrhaltung in
eigenen Worten zusammenfasst."`,

    'p2-1': `„Ich unterrichte [Fach, Klasse, Stufe].
Ich möchte vor der nächsten Unterrichtseinheit eine
Bestandsaufnahme machen: Wo stehen meine Lernenden gerade,
und was brauchen sie?

Schlage mir geeignete Fragen für diese Bestandsaufnahme vor.
Berücksichtige dabei verschiedene Dimensionen:
- Fachliche Lernhürden und Unsicherheiten
- Lernvorlieben: Zu welcher Tageszeit lernen sie am besten?
- Bevorzugte Lernmethoden: analytisch, kreativ, praktisch?
- Wahrnehmungskanäle: visuell, auditiv, hands-on?
- Sozialformen: alleine, zu zweit, in Gruppen?

Die Fragen sollen in 5–10 Minuten beantwortet werden können,
offene Antworten ermöglichen und sprachlich verständlich für
meine Klassenstufe bzw. Altersgruppe formuliert sein. Falls du
weitere Informationen über meine Lerngruppe oder mein Fach
brauchst, stelle vorher Rückfragen."`,

    'p2-2': `„Hier sind die anonymisierten Antworten meiner Klasse
auf folgende Fragen: [Fragen einfügen]

[Antworten einfügen oder als Datei hochladen]

Analysiere die Antworten und erstelle eine Tabelle:
Wiederkehrendes Muster | Wie viele Lernende (geschätzt)? | Mögliche Handlungsoption

Weise am Ende auf Lücken hin: Was zeigen die Antworten
nicht, was ich vielleicht wissen müsste?"`,

    'p2-3': `„Hier ist die Auswertung meines Klassen-Feedbacks:
[Tabelle aus P2.2 einfügen]
Hier ist mein Teaching Statement:
[Statement einfügen]

Leite aus den Mustern konkrete Anpassungen für meine
nächste Unterrichtsstunde ab. Beachte dabei meine
pädagogischen Prinzipien aus dem Teaching Statement.

Schlage maximal drei priorisierte Anpassungen vor
(nicht mehr), jeweils mit:
- Was ändern?
- Warum (Bezug zum Feedback)?
- Wie konkret umsetzen?"`,

    'p3-1': `„Hier ist mein Teaching Statement: [Statement einfügen]
Hier sind die Lernbedarfe meiner Klasse: [Auswertung aus Block 2]

Ich möchte eine Unterrichtseinheit planen zu: [Thema]
Klasse: [Klasse / Altersstufe]
Zeitumfang: [z. B. 45 Min / 90 Min / 3 Doppelstunden]

Bevor du einen Entwurf erstellst: Stelle mir alle Rückfragen,
die du brauchst, um einen wirklich passenden Plan zu entwickeln.
Lieber einmal zu viel fragen als einen generischen Entwurf liefern.

Wenn du alle Informationen hast, erstelle einen Entwurf mit:
- Lernzielen (formuliert mit Tätigkeitsverb: Lernende können …)
- Ablaufplan mit Zeitangaben, Methoden und Sozialformen
- Konkreter Einstiegsidee
- Sicherungsformat am Ende
- Hinweis auf mögliche Stolpersteine"`,

    'p3-2': `„Hier ist mein Unterrichtsentwurf:
[Entwurf aus P3.1 oder eigener Plan]
Hier ist mein Teaching Statement: [Statement einfügen]

Übernimm jetzt die Rolle eines kritischen Moderators.
Deine Aufgabe ist nicht, den Plan zu optimieren, sondern
sichtbar zu machen, was übersehen werden könnte.

Beantworte folgende Fragen:
1. Welche Annahmen über die Lerngruppe stecken implizit
   in diesem Entwurf?
2. Wo gibt es mögliche Lücken zwischen Lernzielen und
   geplanten Methoden?
3. Was würde eine Lehrperson mit einer grundlegend anderen
   pädagogischen Haltung an diesem Plan kritisieren?

Formuliere am Ende drei konkrete Fragen, die ich mir
vor der Durchführung stellen sollte."`,

    'p3-3': `„Hier ist mein Unterrichtsentwurf: [Entwurf einfügen]

Meine Klasse ist heterogen:
[z. B. starke Leistungsspreizung, DaZ-Lernende,
Schüler:innen mit erhöhtem Förderbedarf]

Schlage für die zwei anspruchsvollsten Phasen des Entwurfs
je eine Differenzierungsoption vor:
- Eine Vereinfachung / Unterstützung für Lernende mit höherem Bedarf
- Eine Erweiterung / Vertiefung für Lernende, die schnell fertig werden

Die Optionen sollen in denselben Unterrichtsablauf integrierbar
sein — kein Parallelunterricht."`
  };

  const PROMPT_META = [
    { id: 'p1-1', block: 'Block 1 · Teaching Statement & Custom-KI', title: 'Teaching Statement im Dialog entwickeln', code: 'P1.1' },
    { id: 'p1-2', block: 'Block 1 · Teaching Statement & Custom-KI', title: 'KI mit Teaching Statement konfigurieren', code: 'P1.2' },
    { id: 'p2-1', block: 'Block 2 · KI und Lernbedarfsdiagnostik', title: 'Welche Fragen brauche ich für die Bestandsaufnahme?', code: 'P2.1' },
    { id: 'p2-2', block: 'Block 2 · KI und Lernbedarfsdiagnostik', title: 'Feedback mit KI auswerten', code: 'P2.2' },
    { id: 'p2-3', block: 'Block 2 · KI und Lernbedarfsdiagnostik', title: 'Muster in Konsequenzen überführen', code: 'P2.3' },
    { id: 'p3-1', block: 'Block 3 · Planungsassistenz & kritischer Moderator', title: 'Unterrichtseinheit im Dialog planen', code: 'P3.1' },
    { id: 'p3-2', block: 'Block 3 · Planungsassistenz & kritischer Moderator', title: 'Reflexionsprompt: eigenen Plan kritisch prüfen', code: 'P3.2' },
    { id: 'p3-3', block: 'Block 3 · Planungsassistenz & kritischer Moderator', title: 'Differenzierung für heterogene Gruppen (Bonus)', code: 'P3.3' }
  ];

  const SECTIONS = [
    { id: 'welcome', num: '', label: 'Willkommen' },
    { id: 'start', num: '', label: 'Start' },
    { id: 's01', num: '01', label: 'Das Grundprinzip' },
    { id: 's02', num: '02', label: 'Das Rollenmodell' },
    { id: 's03', num: '03', label: 'Prompt-Bausteine' },
    { id: 's04', num: '04', label: 'Dialogisches Prompten' },
    { id: 's05', num: '05', label: 'Block 1 — Teaching Statement', time: '09:15', timeEnd: '10:30' },
    { id: 's06', num: '06', label: 'Block 2 — Lernbedarfsdiagnostik', time: '10:45', timeEnd: '12:15' },
    { id: 's07', num: '07', label: 'Block 3 — Planung & Moderator', time: '13:00', timeEnd: '14:30' },
    { id: 's08', num: '08', label: 'Qualitäts-Checkliste' },
    { id: 's09', num: '09', label: 'Datenschutz' },
    { id: 's10', num: '10', label: 'Transfer' },
    { id: 'feedback', num: '', label: 'Feedback' },
    { id: 'kontakt', num: '', label: 'Kontakt & Mehr' },
    { id: 'all-tools', num: '', label: 'Alle Tools' },
    { id: 'all-prompts', num: '★', label: 'Alle Prompts' }
  ];

  const CHECKLIST_ITEMS = [
    { id: 'c1', label: 'Fachlich korrekt?', hint: 'Stimmen die inhaltlichen Aussagen und Fakten?' },
    { id: 'c2', label: 'Zur Klasse passend?', hint: 'Entspricht der Vorschlag dem tatsächlichen Stand meiner Lerngruppe?' },
    { id: 'c3', label: 'Meiner Lehrhaltung treu?', hint: 'Spiegelt der Output meine Werte aus dem Teaching Statement wider?' },
    { id: 'c4', label: 'Datenschutz beachtet?', hint: 'Keine echten Namen, keine personenbezogenen Daten eingegeben?' },
    { id: 'c5', label: 'Autorenschaft klar?', hint: 'Weiß ich, was ich selbst ergänzt und verändert habe?' },
    { id: 'c6', label: 'Prozess reflektiert?', hint: 'Habe ich hinterfragt, wie das Ergebnis entstanden ist — nicht nur was dabei herauskam?' }
  ];

  const TRANSFER_ITEMS = [
    { id: 't1', label: 'Mein Teaching Statement ist fertig und gespeichert' },
    { id: 't2', label: 'Eine Erkenntnis aus der Lernbedarfsdiagnostik' },
    { id: 't3', label: 'Das probiere ich in der ersten Woche konkret aus' },
    { id: 't4', label: 'Eine Frage, die heute offen geblieben ist' },
    { id: 't5', label: 'Drei KI-Grundregeln, die wir als Kollegium mitnehmen' }
  ];

  const AGENDA = [
    { label: 'Einstieg', sub: 'Grundprinzip, Rollenmodell, Prompt-Bausteine, Dialogisches Prompten', time: '09:00–09:15', target: 's01' },
    { label: 'Block 1 — Teaching Statement & Custom-KI', sub: 'Ihre didaktische DNA als Grundlage aller Prompts', time: '09:15–10:30', target: 's05' },
    { label: 'Block 2 — KI und Lernbedarfsdiagnostik', sub: 'Muster sichtbar machen — Deutung bleibt bei Ihnen', time: '10:45–12:15', target: 's06' },
    { label: 'Block 3 — Planungsassistenz & kritischer Moderator', sub: 'Erst entwerfen, dann den eigenen Plan hinterfragen', time: '13:00–14:30', target: 's07' },
    { label: 'Abschluss', sub: 'Qualitäts-Checkliste, Datenschutz, Transfer', time: 'im Anschluss', target: 's08' }
  ];

  const COPY_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
  const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

  /* ---------------------------------------------------------
     1b) ICON-SYSTEM — ersetzt Emoji durch konsistente SVG-Glyphen.
     Die vier Rollen-Icons (strategist/analyst/planner/moderator)
     bilden das wiederkehrende Signature-Element der Seite und
     spiegeln das Rollenmodell aus Abschnitt 02.
     --------------------------------------------------------- */

  const ICON_STROKE = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';

  const ICONS = {
    strategist: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><circle cx="12" cy="12" r="8.5"></circle><circle cx="12" cy="12" r="4.5"></circle><circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none"></circle></svg>`,
    analyst: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><circle cx="10.5" cy="10.5" r="6.5"></circle><line x1="15.3" y1="15.3" x2="20.5" y2="20.5"></line><path d="M8 10.5h5M10.5 8v5" stroke-width="1.2" opacity="0.6"></path></svg>`,
    planner: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><circle cx="12" cy="12" r="8.5"></circle><path d="M15 8.5 L10.2 10.2 L9 15 L13.8 13.3 Z"></path></svg>`,
    moderator: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><line x1="12" y1="3.5" x2="12" y2="18"></line><path d="M5 18h14"></path><path d="M4 8h6M15 8h6" stroke-width="1.6"></path><path d="M4 8l-2 4.2a3 3 0 0 0 6 0L6 8Z"></path><path d="M20 8l-2 4.2a3 3 0 0 0 6 0L22 8Z"></path></svg>`,
    chat: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><path d="M4 5.5h16v10H9.5L5 19v-3.5H4Z"></path></svg>`,
    pin: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><path d="M12 3.5c3 0 5.5 2.4 5.5 5.6 0 4-5.5 11.4-5.5 11.4S6.5 13.1 6.5 9.1C6.5 5.9 9 3.5 12 3.5Z"></path><circle cx="12" cy="9.2" r="2.1"></circle></svg>`,
    warning: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><path d="M12 4 21.5 20.5H2.5Z"></path><line x1="12" y1="10" x2="12" y2="14.5"></line><circle cx="12" cy="17.3" r="0.9" fill="currentColor" stroke="none"></circle></svg>`,
    send: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><path d="M21 3 3 10.5l7 2.7L21 3Z"></path><path d="M10 13.2 10 20 13.3 15.9 21 3Z"></path></svg>`,
    bulb: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><path d="M9 17.5h6"></path><path d="M9.5 21h5"></path><path d="M12 3.5a5.7 5.7 0 0 0-3.2 10.4c.7.5 1.2 1.3 1.2 2.1h4a2.5 2.5 0 0 1 1.2-2.1A5.7 5.7 0 0 0 12 3.5Z"></path></svg>`,
    'check-circle': `<svg viewBox="0 0 24 24" ${ICON_STROKE}><circle cx="12" cy="12" r="8.5"></circle><polyline points="8.3 12.3 10.8 14.8 15.8 9.5"></polyline></svg>`,
    'x-circle': `<svg viewBox="0 0 24 24" ${ICON_STROKE}><circle cx="12" cy="12" r="8.5"></circle><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>`,
    expand: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><path d="M4 9V4h5"></path><path d="M20 9V4h-5"></path><path d="M4 15v5h5"></path><path d="M20 15v5h-5"></path></svg>`,
    print: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><path d="M6 9V3.5h12V9"></path><rect x="4" y="9" width="16" height="7.5" rx="1.2"></rect><path d="M6 14.5h12V20.5H6Z"></path></svg>`,
    download: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><path d="M12 3.5v11.5"></path><polyline points="7.5 11 12 15.5 16.5 11"></polyline><path d="M4.5 17v3h15v-3"></path></svg>`,
    gear: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><circle cx="12" cy="12" r="3.2"></circle><path d="M12 3.5v2.4M12 18.1v2.4M20.5 12h-2.4M5.9 12H3.5M17.7 6.3l-1.7 1.7M8 16l-1.7 1.7M17.7 17.7 16 16M8 8 6.3 6.3"></path></svg>`,
    link: `<svg viewBox="0 0 24 24" ${ICON_STROKE}><path d="M10.5 13.5a4.2 4.2 0 0 0 6.1.2l2.4-2.4a4.2 4.2 0 1 0-6-6l-1.3 1.3"></path><path d="M13.5 10.5a4.2 4.2 0 0 0-6.1-.2L5 12.7a4.2 4.2 0 1 0 6 6l1.3-1.3"></path></svg>`
  };

  function renderIcons(root) {
    (root || document).querySelectorAll('[data-icon]').forEach((el) => {
      const name = el.getAttribute('data-icon');
      if (ICONS[name]) el.innerHTML = ICONS[name];
    });
  }

  /* ---------------------------------------------------------
     2) HELPERS
     --------------------------------------------------------- */

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function highlightPlaceholders(str) {
    return escapeHtml(str).replace(/\[[^\]]+\]/g, (m) => `<span class="placeholder">${m}</span>`);
  }

  function promptBoxHTML(id, title, code) {
    const raw = PROMPTS[id];
    if (!raw) return '';
    return `
      <div class="prompt-box__header">
        <span class="prompt-box__title">${escapeHtml(title)}</span>
        <span class="prompt-box__header-right">
          <span class="prompt-box__id">${escapeHtml(code)}</span>
          <button class="copy-btn copy-btn--icon" type="button" data-copy-target="${id}" aria-label="Prompt ${escapeHtml(code)} kopieren">
            ${COPY_ICON}
          </button>
        </span>
      </div>
      <div class="prompt-box__body">
        <pre class="prompt-text">${highlightPlaceholders(raw)}</pre>
        <button class="copy-btn" type="button" data-copy-target="${id}">
          ${COPY_ICON}<span class="copy-btn__label">Kopieren</span>
        </button>
      </div>`;
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) { /* fall through to legacy method */ }
    }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  /* ---------------------------------------------------------
     3) RENDER: PROMPT BOXES (inline in blocks)
     --------------------------------------------------------- */

  function renderInlinePromptBoxes() {
    document.querySelectorAll('.prompt-box[data-prompt-id]').forEach((el) => {
      const id = el.getAttribute('data-prompt-id');
      const title = el.getAttribute('data-prompt-title') || '';
      const code = el.getAttribute('data-prompt-code') || '';
      el.innerHTML = promptBoxHTML(id, title, code);
    });
  }

  /* ---------------------------------------------------------
     4) RENDER: ALLE-PROMPTS SEITE
     --------------------------------------------------------- */

  function renderAllPrompts() {
    const container = document.getElementById('all-prompts-list');
    if (!container) return;
    let currentBlock = null;
    let html = '';
    PROMPT_META.forEach((p) => {
      if (p.block !== currentBlock) {
        if (currentBlock !== null) html += '';
        html += `<div class="all-prompts-group"><div class="all-prompts-group__title">${escapeHtml(p.block)}</div>`;
        currentBlock = p.block;
      }
      html += `<div class="prompt-box">${promptBoxHTML(p.id, p.title, p.code)}</div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  }

  /* ---------------------------------------------------------
     5) RENDER: NAV + TOPBAR SELECT
     --------------------------------------------------------- */

  function renderNav() {
    const nav = document.getElementById('nav');
    const select = document.getElementById('topbar-select');
    let navHtml = '';
    let selectHtml = '';
    SECTIONS.forEach((s) => {
      const timeStr = s.time ? `${s.time}` : '';
      navHtml += `<button class="nav__item" type="button" data-target="${s.id}">
        <span class="nav__num">${s.num}</span>
        <span>${escapeHtml(s.label)}</span>
        ${timeStr ? `<span class="nav__time">${timeStr}</span>` : ''}
      </button>`;
      selectHtml += `<option value="${s.id}">${s.num ? s.num + ' · ' : ''}${escapeHtml(s.label)}</option>`;
    });
    nav.innerHTML = navHtml;
    select.innerHTML = selectHtml;
  }

  function renderAgenda() {
    const container = document.getElementById('agenda');
    if (!container) return;
    container.innerHTML = AGENDA.map((a) => `
      <a class="agenda-row" href="#${a.target}" data-target="${a.target}">
        <span class="agenda-row__time">${escapeHtml(a.time)}</span>
        <span class="agenda-row__label">${escapeHtml(a.label)}<span>${escapeHtml(a.sub)}</span></span>
        <span class="agenda-row__go">Ansehen →</span>
      </a>`).join('');
  }

  /* ---------------------------------------------------------
     6) RENDER: CHECKLIST
     --------------------------------------------------------- */

  const STORAGE_CHECKLIST = 'kft_checklist_v1';

  function loadChecklistState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_CHECKLIST)) || {}; }
    catch (e) { return {}; }
  }
  function saveChecklistState(state) {
    try { localStorage.setItem(STORAGE_CHECKLIST, JSON.stringify(state)); } catch (e) {}
  }

  function renderChecklist() {
    const container = document.getElementById('checklist');
    const summary = document.getElementById('checklist-summary');
    if (!container) return;
    const state = loadChecklistState();

    container.innerHTML = CHECKLIST_ITEMS.map((item) => `
      <label class="check-item ${state[item.id] ? 'is-checked' : ''}" data-check-id="${item.id}">
        <input type="checkbox" ${state[item.id] ? 'checked' : ''} data-check-id="${item.id}">
        <span>
          <span class="check-item__label">${escapeHtml(item.label)}</span>
          <span class="check-item__hint">${escapeHtml(item.hint)}</span>
        </span>
      </label>`).join('');

    function updateSummary() {
      const s = loadChecklistState();
      const count = CHECKLIST_ITEMS.filter((i) => s[i.id]).length;
      summary.textContent = `${count} von ${CHECKLIST_ITEMS.length} Fragen bestätigt`;
    }

    container.addEventListener('change', (e) => {
      const input = e.target.closest('input[type="checkbox"]');
      if (!input) return;
      const id = input.getAttribute('data-check-id');
      const state = loadChecklistState();
      state[id] = input.checked;
      saveChecklistState(state);
      input.closest('.check-item').classList.toggle('is-checked', input.checked);
      updateSummary();
    });

    updateSummary();
  }

  /* ---------------------------------------------------------
     7) RENDER: TRANSFER FIELDS
     --------------------------------------------------------- */

  const STORAGE_TRANSFER = 'kft_transfer_v1';
  let transferSaveTimeout = null;

  function loadTransferState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_TRANSFER)) || {}; }
    catch (e) { return {}; }
  }
  function saveTransferState(state) {
    try { localStorage.setItem(STORAGE_TRANSFER, JSON.stringify(state)); } catch (e) {}
  }

  function renderTransfer() {
    const container = document.getElementById('transfer');
    if (!container) return;
    const state = loadTransferState();

    container.innerHTML = TRANSFER_ITEMS.map((item, i) => `
      <div class="transfer-item">
        <div class="transfer-item__label">
          <span class="transfer-item__num">${String(i + 1).padStart(2, '0')}</span>
          <span>${escapeHtml(item.label)}</span>
        </div>
        <textarea data-transfer-id="${item.id}" placeholder="Ihre Notiz …">${state[item.id] ? escapeHtml(state[item.id]) : ''}</textarea>
      </div>`).join('');

    const status = document.getElementById('transfer-status');

    container.addEventListener('input', (e) => {
      const ta = e.target.closest('textarea[data-transfer-id]');
      if (!ta) return;
      clearTimeout(transferSaveTimeout);
      if (status) status.textContent = 'Speichert …';
      transferSaveTimeout = setTimeout(() => {
        const s = loadTransferState();
        s[ta.getAttribute('data-transfer-id')] = ta.value;
        saveTransferState(s);
        if (status) status.textContent = 'Automatisch gespeichert · nur lokal auf diesem Gerät';
      }, 400);
    });

    const exportBtn = document.getElementById('transfer-export');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const s = loadTransferState();
        let text = 'KI-Fortbildungstag · 13. August 2026 — Transfer-Notizen\n';
        text += '='.repeat(56) + '\n\n';
        TRANSFER_ITEMS.forEach((item) => {
          text += item.label + '\n';
          text += (s[item.id] && s[item.id].trim() ? s[item.id].trim() : '(keine Angabe)') + '\n\n';
        });
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transfer-ki-fortbildungstag.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  }

  /* ---------------------------------------------------------
     8) NAVIGATION / DEEP LINKS / KEYBOARD
     --------------------------------------------------------- */

  const sectionIds = SECTIONS.map((s) => s.id);
  let currentIndex = 0;

  function activateSection(id, opts) {
    opts = opts || {};
    let idx = sectionIds.indexOf(id);
    if (idx === -1) idx = 0;
    const direction = idx >= currentIndex ? 'dir-forward' : 'dir-back';
    currentIndex = idx;
    const activeId = sectionIds[idx];

    document.querySelectorAll('section.block').forEach((sec) => {
      const isActive = sec.id === activeId;
      sec.classList.toggle('is-active', isActive);
      sec.classList.remove('dir-forward', 'dir-back');
      if (isActive && !opts.skipScroll) {
        void sec.offsetWidth;
        sec.classList.add(direction);
      }
    });
    document.querySelectorAll('.nav__item').forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-target') === activeId);
    });
    const select = document.getElementById('topbar-select');
    if (select) select.value = activeId;

    if (!opts.skipHash) {
      history.pushState(null, '', '#' + activeId);
    }
    if (!opts.skipScroll) {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }

    updateProgress();
    updateFooterNav();
    updateLiveBadge();
  }

  function updateProgress() {
    const fill = document.getElementById('progress-fill');
    const label = document.getElementById('progress-label');
    const topbarProgress = document.getElementById('topbar-progress');
    const pct = ((currentIndex + 1) / SECTIONS.length) * 100;
    const text = `Abschnitt ${currentIndex + 1} / ${SECTIONS.length}`;
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = text;
    if (topbarProgress) topbarProgress.textContent = text;
  }

  function updateFooterNav() {
    document.querySelectorAll('.block-footer').forEach((el) => el.remove());
    const activeSection = document.getElementById(sectionIds[currentIndex]);
    if (!activeSection) return;

    const prev = SECTIONS[currentIndex - 1];
    const next = SECTIONS[currentIndex + 1];

    const footer = document.createElement('div');
    footer.className = 'block-footer';
    footer.innerHTML = `
      <button class="step-btn step-btn--prev" type="button" ${prev ? `data-target="${prev.id}"` : 'disabled'}>
        <span class="step-btn__dir">← Zurück</span>
        <span class="step-btn__label">${prev ? escapeHtml(prev.label) : ''}</span>
      </button>
      <button class="step-btn step-btn--next" type="button" ${next ? `data-target="${next.id}"` : 'disabled'}>
        <span class="step-btn__dir">Weiter →</span>
        <span class="step-btn__label">${next ? escapeHtml(next.label) : ''}</span>
      </button>`;
    activeSection.appendChild(footer);
  }

  function goRelative(delta) {
    const newIndex = currentIndex + delta;
    if (newIndex < 0 || newIndex >= SECTIONS.length) return;
    activateSection(sectionIds[newIndex]);
  }

  function wireNavigationEvents() {
    document.body.addEventListener('click', (e) => {
      const navBtn = e.target.closest('[data-target]');
      if (navBtn) {
        e.preventDefault();
        activateSection(navBtn.getAttribute('data-target'));
      }
      const copyBtn = e.target.closest('.copy-btn');
      if (copyBtn) {
        handleCopyClick(copyBtn);
      }
    });

    const select = document.getElementById('topbar-select');
    if (select) {
      select.addEventListener('change', () => activateSection(select.value));
    }

    window.addEventListener('popstate', () => {
      const id = location.hash.replace('#', '') || 'welcome';
      activateSection(id, { skipHash: true });
    });

    document.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goRelative(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goRelative(-1);
      }
    });
  }

  function selectPromptText(box) {
    const pre = box && box.querySelector('.prompt-text');
    if (!pre || !window.getSelection) return;
    const range = document.createRange();
    range.selectNodeContents(pre);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  async function handleCopyClick(btn) {
    const id = btn.getAttribute('data-copy-target');
    const text = PROMPTS[id];
    if (!text) return;
    const box = btn.closest('.prompt-box');
    const ok = await copyText(text);

    if (!ok) selectPromptText(box);

    const siblingButtons = box ? box.querySelectorAll('.copy-btn[data-copy-target="' + id + '"]') : [btn];
    siblingButtons.forEach((b) => {
      const isIconOnly = b.classList.contains('copy-btn--icon');
      const originalLabel = isIconOnly ? '' : 'Kopieren';
      const originalAria = b.getAttribute('aria-label');
      b.classList.toggle('is-copied', ok);
      b.setAttribute('aria-label', ok ? 'Kopiert' : 'Kopieren fehlgeschlagen — Text ist markiert, mit Strg/Cmd+C kopieren');
      b.innerHTML = isIconOnly
        ? CHECK_ICON
        : `${CHECK_ICON}<span class="copy-btn__label">${ok ? 'Kopiert ✓' : 'Fehler — Text markiert, Strg/Cmd+C'}</span>`;
      setTimeout(() => {
        b.classList.remove('is-copied');
        b.innerHTML = isIconOnly ? COPY_ICON : `${COPY_ICON}<span class="copy-btn__label">${originalLabel}</span>`;
        if (originalAria) b.setAttribute('aria-label', originalAria);
        else b.removeAttribute('aria-label');
      }, ok ? 2000 : 3500);
    });
  }

  /* ---------------------------------------------------------
     9) PRÄSENTATIONSMODUS
     --------------------------------------------------------- */

  const STORAGE_PRESENTATION = 'kft_presentation_v1';

  function initPresentationMode() {
    const btn = document.getElementById('presentation-toggle');
    const isOn = localStorage.getItem(STORAGE_PRESENTATION) === '1';
    document.documentElement.classList.toggle('presentation', isOn);
    if (btn) btn.classList.toggle('is-on', isOn);

    if (btn) {
      btn.addEventListener('click', () => {
        const nowOn = document.documentElement.classList.toggle('presentation');
        btn.classList.toggle('is-on', nowOn);
        try { localStorage.setItem(STORAGE_PRESENTATION, nowOn ? '1' : '0'); } catch (e) {}
      });
    }
  }

  function initPrintButton() {
    const btn = document.getElementById('print-btn');
    if (btn) btn.addEventListener('click', () => window.print());
  }

  /* ---------------------------------------------------------
     10) LIVE-STATUS / ZEITBLOCK-ANZEIGE
     --------------------------------------------------------- */

  function timeToMinutes(str) {
    const [h, m] = str.split(':').map(Number);
    return h * 60 + m;
  }

  function getCurrentBlockStatus() {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const blocks = SECTIONS.filter((s) => s.time && s.timeEnd);

    for (const b of blocks) {
      const start = timeToMinutes(b.time);
      const end = timeToMinutes(b.timeEnd);
      if (nowMin >= start && nowMin <= end) {
        return { state: 'live', block: b };
      }
    }
    const dayStart = timeToMinutes('09:00');
    const dayEnd = timeToMinutes('14:30');
    if (nowMin < dayStart) return { state: 'before' };
    if (nowMin > dayEnd) return { state: 'after' };

    const next = blocks.find((b) => timeToMinutes(b.time) > nowMin);
    return { state: 'pause', next };
  }

  function updateLiveBadge() {
    const badge = document.getElementById('live-badge');
    const text = document.getElementById('live-badge-text');
    const topbarLive = document.getElementById('topbar-live');
    const topbarText = document.getElementById('topbar-live-text');
    if (!badge || !text) return;

    const status = getCurrentBlockStatus();
    badge.classList.remove('is-live');
    if (topbarLive) topbarLive.classList.remove('is-live');

    let message;
    if (status.state === 'live') {
      badge.classList.add('is-live');
      if (topbarLive) topbarLive.classList.add('is-live');
      message = `${status.block.label.replace(/^Block \d — /, '')} läuft gerade`;
    } else if (status.state === 'before') {
      message = 'Vor Beginn · startet 09:00 Uhr';
    } else if (status.state === 'after') {
      message = 'Fortbildungstag beendet';
    } else if (status.state === 'pause' && status.next) {
      message = `Pause · weiter ab ${status.next.time} Uhr`;
    } else {
      message = 'Pause';
    }
    text.textContent = message;
    if (topbarText) topbarText.textContent = message;

    document.querySelectorAll('.nav__item').forEach((btn) => {
      const id = btn.getAttribute('data-target');
      const sec = SECTIONS.find((s) => s.id === id);
      const timeEl = btn.querySelector('.nav__time');
      if (!timeEl || !sec) return;
      const isLive = status.state === 'live' && status.block.id === id;
      timeEl.textContent = isLive ? '● live' : (sec.time || '');
    });
  }

  /* ---------------------------------------------------------
     11) INIT
     --------------------------------------------------------- */

  function init() {
    renderNav();
    renderAgenda();
    renderInlinePromptBoxes();
    renderAllPrompts();
    renderChecklist();
    renderTransfer();
    renderIcons();
    wireNavigationEvents();
    initPresentationMode();
    initPrintButton();

    const initialId = location.hash.replace('#', '') || 'welcome';
    activateSection(initialId, { skipHash: true, skipScroll: true });

    updateLiveBadge();
    setInterval(updateLiveBadge, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

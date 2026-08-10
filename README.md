# KI als Teampartner in der Lehre — Vortragsbegleiter

Interaktiver Vortragsbegleiter zum KI-Fortbildungstag am IBZ St. Marienthal (13. August 2026).
Reines HTML/CSS/JS ohne Build-Schritt und ohne Backend — läuft direkt im Browser.

- `index.html` — Struktur & Inhalte aller Abschnitte
- `styles.css` — Design-Tokens (Farben, Typo, Layout)
- `script.js` — Navigation, Copy-to-Clipboard, Checkliste, Transfer-Notizen, Präsentationsmodus, Live-Status

## Lokal testen

Da die Seite `fetch`/Clipboard-APIs nutzt, am besten über einen simplen lokalen Server öffnen
(nicht direkt als `file://`):

```bash
python -m http.server 5173
```

Danach im Browser: `http://localhost:5173`

## Deployment über GitHub + Vercel

### 1. GitHub-Repository anlegen

```bash
git init
git add .
git commit -m "Vortragsbegleiter KI-Fortbildungstag"
```

Dann auf [github.com/new](https://github.com/new) ein neues (leeres) Repository anlegen,
z. B. `ki-fortbildungstag`. Anschließend lokal verbinden und pushen:

```bash
git remote add origin https://github.com/<dein-username>/ki-fortbildungstag.git
git branch -M main
git push -u origin main
```

### 2. Auf Vercel deployen

**Variante A — über das Vercel-Dashboard (empfohlen, kein Terminal nötig):**

1. Auf [vercel.com](https://vercel.com) einloggen (Login mit GitHub-Account möglich).
2. „Add New… → Project" wählen.
3. Das eben erstellte GitHub-Repository auswählen und importieren.
4. Framework Preset auf **„Other"** stellen (kein Build-Schritt nötig — es ist eine statische Seite).
5. „Deploy" klicken. Nach wenigen Sekunden ist die Seite live unter einer `*.vercel.app`-URL.

Jeder weitere `git push` auf `main` deployed automatisch neu.

**Variante B — über die Vercel-CLI:**

```bash
npm i -g vercel
vercel login
vercel --prod
```

### 3. Alternative: GitHub Pages

Falls kein Vercel gewünscht ist, funktioniert die Seite genauso über GitHub Pages:
Repository-Einstellungen → „Pages" → Branch `main`, Ordner `/ (root)` → Speichern.

## Inhalte pflegen

Alle Texte stehen direkt lesbar in `index.html` (Abschnitte 01–10). Die acht Prompts (P1.1–P3.3)
sind zentral in `script.js` im Objekt `PROMPTS` hinterlegt — dort ändern, nicht im HTML, damit
Block-Ansicht und „Alle Prompts"-Sammelseite automatisch synchron bleiben.

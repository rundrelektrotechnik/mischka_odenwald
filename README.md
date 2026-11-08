# Webseite Mischka Odenwald

Das ist die Webseite von Mischka Odenwald (Deutsch und Russisch).
Alle Texte und Kontaktdaten stehen in **einer einzigen Textdatei**:

**`Texte-und-Kontaktdaten.txt`**

Programmieren ist nicht nötig.

## Texte ändern (im Browser, ohne Installation)

1. Auf GitHub diese Seite öffnen und die Datei `Texte-und-Kontaktdaten.txt` anklicken.
2. Oben rechts auf das **Stift-Symbol** (Bearbeiten) klicken.
3. Den Text hinter dem Doppelpunkt ändern. Die Namen vor dem Doppelpunkt und die Überschriften
   in [eckigen Klammern] **nicht** ändern. Eine Zeile ist ein Text, bitte keinen Zeilenumbruch
   mitten im Text.
4. Oben rechts auf **„Commit changes…“** klicken und bestätigen.

Fertig. GitHub baut die Webseite danach automatisch neu.

Mehr Hinweise stehen als Kommentare (Zeilen mit `#`) am Anfang der Textdatei.

## Was steht in der Textdatei?

- **Kontaktdaten:** Firma, Inhaber, Adresse, Telefon, E-Mail, Instagram/Facebook, WhatsApp.
  Diese erscheinen auch im Impressum und in der Datenschutzerklärung.
- **Texte der Startseite** auf Deutsch und Russisch.
- **Figuren** (die gelben Kreise): Name und Beschreibung. Weitere Figur: einen Block kopieren
  und die Nummer erhöhen. Mit `Anzeigen: nein` wird eine Figur vorübergehend versteckt.
- **Angebot** und **Für wen** (Karten mit Titel und Text).

Nicht in der Textdatei: die festen Rechtstexte (Impressum und Datenschutz). Nur die Angaben
daraus, wie Adresse und Telefon, kommen aus der Datei.

## Die fertige Webseite als Datei herunterladen (optional)

1. Oben auf **„Actions“** klicken.
2. Den obersten Eintrag („Webseite bauen“) öffnen.
   - Grüner Haken: alles in Ordnung.
   - Rotes Kreuz: Es ist etwas kaputt (z. B. ein Tippfehler in der Textdatei). Die Meldung im
     Eintrag zeigt, was falsch ist.
3. Ganz unten bei **„Artifacts“** auf **`webseite`** klicken. Es wird eine ZIP-Datei geladen.
4. ZIP entpacken und `index.html` doppelklicken. Die Seite öffnet sich im Browser.

## Stand

- Die Webseite wird bei **GitHub Pages** veröffentlicht, die Adresse ist **mischka-odenwald.de**
  (Domain bei Squarespace). Jede Änderung an der Textdatei wird nach wenigen Minuten
  automatisch online gestellt – unter „Actions“ sieht man, ob es geklappt hat.
- **Noch offen:** Beschreibungstexte der Figuren, ein besseres Bild für die Ballonbouquets
  (derzeit versteckt).

## Für Entwickler (kurz)

- Keine Abhängigkeiten, nur Node.js ab Version 18.
- `npm run dev` — lokale Vorschau auf http://127.0.0.1:4321, baut bei Änderungen an der Textdatei neu.
- `npm run build:prod` — fertige Webseite im Ordner `dist/site`.
- Die HTML-Seiten im Hauptordner (`index.html` usw.) sind **erzeugt**; bearbeitet werden nur
  `templates/`, `scripts/` und die Textdatei. Projektregeln: `agents.md`, Stand: `PROGRESS.md`.

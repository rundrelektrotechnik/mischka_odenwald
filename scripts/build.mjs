// Builds the root HTML pages from templates/*.tpl.html + Texte-und-Kontaktdaten.txt.
// No dependencies. Usage: npm run build   (dev and preview run it automatically)
//
// The customer edits only Texte-und-Kontaktdaten.txt. Messages are German on purpose.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const warnings = [];
const fail = (msg) => { console.error('\nFEHLER: ' + msg + '\n'); process.exit(1); };
const warn = (msg) => warnings.push(msg);

// ---- parse the text file -------------------------------------------------
const file = join(root, 'Texte-und-Kontaktdaten.txt');
if (!existsSync(file)) fail('Die Datei "Texte-und-Kontaktdaten.txt" wurde nicht gefunden.');
const data = {}; // data['Figur 1']['Name Deutsch'] = '...'
let section = null;
readFileSync(file, 'utf8').replace(/^﻿/, '').split(/\r?\n/).forEach((rawLine, i) => {
  const line = rawLine.trim();
  if (!line || line.startsWith('#')) return;
  const sec = line.match(/^\[(.+)\]$/);
  if (sec) { section = sec[1].trim(); data[section] ??= {}; return; }
  const kv = line.match(/^([^:]+):(.*)$/);
  if (!kv || !section) {
    fail(`Zeile ${i + 1} in "Texte-und-Kontaktdaten.txt" verstehe ich nicht:\n  ${line}\n(Erwartet: "Name: Text" unter einer [Überschrift].)`);
  }
  data[section][kv[1].trim()] = kv[2].trim();
});

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const raw = (sec, key) => {
  if (!data[sec]) { warn(`Abschnitt [${sec}] fehlt.`); return ''; }
  if (!(key in data[sec])) warn(`In [${sec}] fehlt die Zeile "${key}:".`);
  return data[sec][key] ?? '';
};
const LANGS = { de: 'Deutsch', ru: 'Russisch' };
// Text in the page's language; falls back to German (and warns) so a page is never blank.
const tx = (sec, key, lang) => {
  const v = raw(sec, `${key} ${LANGS[lang]}`);
  if (v) return v;
  if (lang === 'de') { warn(`[${sec}] "${key} Deutsch" ist leer.`); return ''; }
  warn(`[${sec}] "${key} ${LANGS[lang]}" ist leer – es erscheint der deutsche Text.`);
  return raw(sec, `${key} Deutsch`);
};
const numbered = (prefix) => Object.keys(data)
  .filter((k) => new RegExp(`^${prefix} \\d+$`).test(k))
  .sort((a, b) => parseInt(a.split(' ').pop(), 10) - parseInt(b.split(' ').pop(), 10));

// ---- fixed interface strings (not customer content) -----------------------
const UI = {
  de: {
    skip: 'Zum Inhalt springen', nav_label: 'Hauptnavigation', lang_label: 'Sprache',
    angebot: 'Angebot', feiern: 'Für wen', figuren: 'Figuren', kontakt: 'Kontakt',
    placeholder_mail: '[PLATZHALTER: E-Mail-Adresse]', placeholder_tel: '[PLATZHALTER: Telefonnummer]',
    mail: 'E-Mail', phone: 'Telefon', newtab: ' (öffnet in neuem Tab)', social_label: 'Soziale Medien', note: '',
  },
  ru: {
    skip: 'Перейти к содержимому', nav_label: 'Главное меню', lang_label: 'Язык',
    angebot: 'Программа', feiern: 'Для кого', figuren: 'Персонажи', kontakt: 'Контакты',
    placeholder_mail: '[ЗАГЛУШКА: адрес e-mail]', placeholder_tel: '[ЗАГЛУШКА: номер телефона]',
    mail: 'E-mail', phone: 'Телефон', newtab: ' (откроется в новой вкладке)', social_label: 'Соцсети',
    note: '<span class="note">Правовые страницы доступны только на немецком языке.</span>',
  },
};

const ICON_IG = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>';
const ICON_FB = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4C16.5 3.3 15.5 3.2 14.4 3.2c-2.4 0-4 1.4-4 4.1v2.5H7.7V13h2.7v8z"/></svg>';

const ICON_WA = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M3 21l1.6-4.9A9 9 0 1 1 8 19.4L3 21z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path fill="currentColor" d="M9 8.2c0 3.600 3.200 6.800 6.800 6.800l1.200-1.400-2.100-1-1 .9c-1-.4-2-1.300-2.400-2.300l.9-1-1-2.100L9 8.200z"/></svg>';

const K = 'Kontaktdaten';
const contact = {
  firma: raw(K, 'Firma'), inhaber: raw(K, 'Inhaber'), rechtsform: raw(K, 'Rechtsform'),
  strasse: raw(K, 'Straße und Hausnummer'), ort: raw(K, 'PLZ und Ort'), tel: raw(K, 'Telefon'),
  mail: raw(K, 'E-Mail'), wa: raw(K, 'WhatsApp anzeigen').toLowerCase(), ig: raw(K, 'Instagram-Link'), fb: raw(K, 'Facebook-Link'),
  domain: raw(K, 'Domain').replace(/^https?:\/\//, '').replace(/\/+$/, ''),
};
if (!contact.mail) warn('Die E-Mail-Adresse ist noch leer – auf der Seite erscheint ein [PLATZHALTER].');
// WhatsApp link is derived from the phone number (wa.me needs digits only, with country code).
const waDigits = contact.tel.replace(/[^0-9]/g, '');
const showWa = contact.wa !== 'nein' && waDigits.length >= 8;
if (contact.wa !== 'nein' && !showWa) warn('WhatsApp: keine gültige Telefonnummer – WhatsApp-Link wird nicht angezeigt.');
for (const [k, v] of [['Instagram-Link', contact.ig], ['Facebook-Link', contact.fb]]) {
  if (v && !/^https:\/\//.test(v)) fail(`[Kontaktdaten] "${k}" muss mit https:// beginnen.`);
}
const PH = (t) => `<span class="placeholder">${esc(t)}</span>`;
const orPH = (v, t) => (v ? esc(v) : PH(`[PLATZHALTER: ${t}]`));

const ICON_MAIL = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 7.5l8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
const ICON_TEL = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>';

// Contact tiles for e-mail and phone, plus an icon-only row for WhatsApp, Instagram, Facebook.
// Social links appear only here (not repeated in the footer).
function contactTiles(lang) {
  const u = UI[lang]; const tiles = []; const icons = []; const ext = 'target="_blank" rel="noopener noreferrer"';
  const tile = (icon, label, value, href) => {
    const body = `<span class="tile-icon">${icon}</span><span class="tile-text"><span class="tile-label">${label}</span><span class="tile-value">${value}</span></span>`;
    tiles.push(href ? `        <li><a class="tile" href="${esc(href)}">${body}</a></li>` : `        <li><span class="tile">${body}</span></li>`);
  };
  const social = (icon, name, href) => icons.push(`        <li><a class="soc" href="${esc(href)}" ${ext} title="${name}">${icon}<span class="sr">${name}${u.newtab}</span></a></li>`);
  tile(ICON_MAIL, u.mail, contact.mail ? esc(contact.mail) : PH(u.placeholder_mail), contact.mail && `mailto:${contact.mail}`);
  tile(ICON_TEL, u.phone, contact.tel ? esc(contact.tel) : PH(u.placeholder_tel), contact.tel && `tel:${contact.tel.replace(/[^+\d]/g, '')}`);
  if (showWa) social(ICON_WA, 'WhatsApp', `https://wa.me/${waDigits}`);
  if (contact.ig) social(ICON_IG, 'Instagram', contact.ig);
  if (contact.fb) social(ICON_FB, 'Facebook', contact.fb);
  return { tiles: tiles.join('\n'), icons: icons.length ? `      <ul class="social-icons" aria-label="${u.social_label}">\n${icons.join('\n')}\n      </ul>` : '' };
}

// ---- main pages -------------------------------------------------------------
function mainPage(lang) {
  const u = UI[lang]; const other = lang === 'de' ? 'ru' : 'de';
  // A figure block with "Anzeigen: nein" stays in the text file but is not shown on the page.
  const figs = numbered('Figur').filter((s) => (data[s].Anzeigen || '').toLowerCase() !== 'nein');
  if (!figs.length) fail('Es gibt keine Figur. Bitte mindestens einen Block [Figur 1] anlegen.');
  const orbs = figs.map((s, k) => {
    const img = raw(s, 'Bild');
    if (!existsSync(join(root, 'assets', 'img', img))) fail(`[${s}] "Bild: ${img}" – diese Datei gibt es nicht im Ordner assets/img.`);
    return { id: `fig-${k + 1}`, center: (data[s].Position || '').toLowerCase() === 'mitte', img, name: tx(s, 'Name', lang), text: tx(s, 'Text', lang) };
  });
  const arcOrbs = orbs.filter((o) => !o.center);
  if (!arcOrbs.length) fail('Mindestens eine Figur muss im Halbkreis stehen (ohne "Position: Mitte").');
  const orbLi = (o, k, extra) => `          <li${extra ? ` class="${extra}"` : ''} style="--i:${k}"><a class="orb" href="#${o.id}" data-fig="${o.id.slice(4)}"${o === arcOrbs[0] ? ' aria-current="true"' : ''}><span class="orb-disc"><img src="assets/img/${esc(o.img)}" alt="" loading="${k < 4 ? 'eager' : 'lazy'}" decoding="async"></span><span class="orb-name">${esc(o.name)}</span></a></li>`;
  // Arc figures first, then any "Position: Mitte" figure (placed in the middle of the half circle by CSS).
  const orbHtml = [...arcOrbs.map((o, k) => orbLi(o, k)), ...orbs.filter((o) => o.center).map((o) => orbLi(o, arcOrbs.length, 'is-center'))].join('\n');
  const detailHtml = orbs.map((o) => `          <article class="fig" id="${o.id}">
            <img src="assets/img/${esc(o.img)}" alt="${esc(o.name)}" loading="lazy" decoding="async">
            <div><h3>${esc(o.name)}</h3><p class="placeholder-text">${esc(o.text)}</p></div>
          </article>`).join('\n');
  const cards = numbered('Angebot').map((s) => `        <li><h3>${esc(tx(s, 'Titel', lang))}</h3><p>${esc(tx(s, 'Text', lang))}</p></li>`).join('\n');
  const who = numbered('Zielgruppe').map((s) => `        <article>\n          <h3>${esc(tx(s, 'Titel', lang))}</h3>\n          <p>${esc(tx(s, 'Text', lang))}</p>\n        </article>`).join('\n');

  return {
    lang, other_lang: other, site_name: esc(raw('Webseite', 'Name')),
    this_file: lang === 'de' ? 'index.html' : 'index.ru.html', other_file: lang === 'de' ? 'index.ru.html' : 'index.html',
    page_title: esc(tx('Webseite', 'Titel', lang)), page_description: esc(tx('Webseite', 'Beschreibung', lang)),
    ui_skip: u.skip, ui_nav_label: u.nav_label, ui_lang_label: u.lang_label,
    ui_nav_angebot: u.angebot, ui_nav_feiern: u.feiern, ui_nav_figuren: u.figuren, ui_nav_kontakt: u.kontakt,
    de_attrs: lang === 'de' ? ' aria-current="true"' : ' hreflang="de"',
    ru_attrs: lang === 'ru' ? ' aria-current="true"' : ' hreflang="ru"',
    welcome: esc(tx('Startseite', 'Willkommenstext', lang)), cta: esc(tx('Startseite', 'Knopf', lang)), hint: esc(tx('Startseite', 'Hinweis', lang)),
    step: arcOrbs.length > 1 ? +(180 / (arcOrbs.length - 1)).toFixed(3) : 0,
    orbs: orbHtml, details: detailHtml,
    offer_heading: esc(tx('Angebot', 'Überschrift', lang)), offer_cards: cards,
    who_heading: esc(tx('Für wen', 'Überschrift', lang)), who_articles: who,
    contact_heading: esc(tx('Kontakt', 'Überschrift', lang)), contact_intro: esc(tx('Kontakt', 'Einleitung', lang)), contact_tiles: contactTiles(lang).tiles, social_icons: contactTiles(lang).icons,
    footer_note: u.note ? `    ${u.note}` : '',
  };
}

// ---- legal pages (German only; only the address data comes from the text file) -
function legalVars() {
  // "Kleinunternehmen/Kleinunternehmer" is a tax status (§ 19 UStG), not a legal form: it goes to the
  // VAT section, not to the Rechtsform line.
  const small = /kleinunternehmer|kleinunternehmen/i.test(contact.rechtsform);
  const addr = [contact.firma ? esc(contact.firma) : PH('[PLATZHALTER: Name / Firma]')];
  if (contact.inhaber) addr.push(`Inhaber/in: ${esc(contact.inhaber)}`);
  addr.push(orPH(contact.strasse, 'Straße und Hausnummer'), orPH(contact.ort, 'PLZ Ort'));
  if (contact.rechtsform && !small) addr.push(`Rechtsform: ${esc(contact.rechtsform)}`);
  const lines = `E-Mail: ${orPH(contact.mail, 'E-Mail-Adresse')}<br>
      Telefon: ${orPH(contact.tel, 'Telefonnummer')}${contact.domain ? `<br>
      Website: <a href="https://${esc(contact.domain)}">${esc(contact.domain)}</a>` : ''}`;
  const de = (a) => (a.length > 1 ? a.slice(0, -1).join(', ') + ' und ' + a[a.length - 1] : a[0] || '');
  const deOr = (a) => (a.length > 1 ? a.slice(0, -1).join(', ') + ' oder ' + a[a.length - 1] : a[0] || '');
  const channels = [contact.mail && 'E-Mail', contact.tel && 'Telefon', showWa && 'WhatsApp'].filter(Boolean);
  const nets = [contact.ig && 'Instagram', contact.fb && 'Facebook', showWa && 'WhatsApp'].filter(Boolean);

  const vat = small
    ? `
    <h2>Umsatzsteuer</h2>
    <p>Kleinunternehmer im Sinne von § 19 UStG: Es wird keine Umsatzsteuer berechnet und ausgewiesen. Eine Umsatzsteuer-Identifikationsnummer besteht nicht.</p>
`
    : `
    <p class="note">${PH('[PLATZHALTER: ggf. Umsatzsteuer-ID bzw. Hinweis zur Kleinunternehmerregelung – nur falls zutreffend]')}</p>
`;

  const hoster = raw(K, 'Hoster'); const hosterAdr = raw(K, 'Hoster Anschrift');
  if (!hoster) warn('Der Hoster (Firma, bei der die Seite liegt) fehlt – in der Datenschutzerklärung steht ein [PLATZHALTER].');
  const hosting = `    <p>Diese Seite wird bei ${hoster ? esc(hoster) + (hosterAdr ? ' (' + esc(hosterAdr) + ')' : '') : PH('[PLATZHALTER: Hosting-Anbieter mit Anschrift]')} betrieben. Beim Aufruf der Seite verarbeitet der Hoster technisch notwendige Daten in Server-Logdateien, insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, übertragene Datenmenge sowie Browser- und Betriebssystemangaben. Das ist nötig, um die Seite auszuliefern und sicher zu betreiben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und fehlerfreien Bereitstellung). Die Logdaten werden nach kurzer Zeit gelöscht; soweit erforderlich, besteht mit dem Hoster ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.</p>`
    + (contact.domain ? `
    <p>Die Domain ${esc(contact.domain)} wird bei Squarespace (Squarespace Ireland Limited, Le Pole House, Ship Street Great, Dublin 8, Irland) verwaltet. Der Domain- und DNS-Dienst verarbeitet technisch notwendige Daten, damit die Adresse der Seite aufgelöst werden kann (z. B. IP-Adresse bei DNS-Anfragen). Es werden dabei keine Inhalte dieser Seite an Squarespace übertragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>` : '');

  const whatsapp = showWa ? `    <p>Schreiben Sie uns über WhatsApp, wird der Dienst von WhatsApp Ireland Limited (Irland) bzw. der Meta-Unternehmensgruppe betrieben. Inhalte von Nachrichten sind Ende-zu-Ende-verschlüsselt; Metadaten (z. B. Telefonnummer, Zeitpunkt der Nachricht) verarbeitet WhatsApp nach der eigenen Datenschutzerklärung, wobei eine Übermittlung in Drittländer wie die USA möglich ist. Die Nutzung von WhatsApp ist freiwillig – Sie können uns jederzeit auch per ${contact.mail ? 'E-Mail' : 'Telefon'} erreichen.</p>
` : '';

  const social = nets.length ? `    <h2>6. Links zu sozialen Netzwerken und Messengern</h2>
    <p>Die Seite verlinkt auf ${de(nets)}. Es werden keine Inhalte dieser Dienste eingebunden und keine Plug-ins geladen; Daten werden erst an den jeweiligen Anbieter übertragen, wenn Sie einen Link anklicken und die Seite bzw. App öffnen. Ab dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters.</p>
` : '';

  return {
    channels: deOr(channels), social_section: social, whatsapp_section: whatsapp, hosting, vat_section: vat,
    n_cookies: 5, n_rights: nets.length ? 7 : 6,
    imprint_address: `    <p>\n      ${addr.join('<br>\n      ')}\n    </p>`,
    imprint_contact: `    <p>\n      ${lines}\n    </p>`,
    site_name: esc(raw('Webseite', 'Name')),
    controller: `    <p>\n      ${addr.join('<br>\n      ')}<br>\n      ${lines}\n    </p>`,
  };
}

function render(tplName, outName, vars) {
  let html = readFileSync(join(root, 'templates', tplName), 'utf8');
  html = html.replace(/\{\{(\w+)\}\}/g, (m, k) => {
    if (!(k in vars)) fail(`Vorlage ${tplName}: unbekannter Platzhalter {{${k}}}`);
    return String(vars[k]);
  });
  writeFileSync(join(root, outName), html);
}

render('index.tpl.html', 'index.html', mainPage('de'));
render('index.tpl.html', 'index.ru.html', mainPage('ru'));
render('impressum.tpl.html', 'impressum.html', legalVars());
render('datenschutz.tpl.html', 'datenschutz.html', legalVars());

console.log('Seiten gebaut: index.html, index.ru.html, impressum.html, datenschutz.html');
const uniq = [...new Set(warnings)];
if (uniq.length) console.log('\nHinweise (keine Fehler):\n  - ' + uniq.join('\n  - '));

# Los geht’s! · Deutsch Start

Ein visueller, interaktiver Einstieg in Deutsch A1 mit österreichischen Ausdrücken.

## Kurs öffnen

Die Startdatei ist [index.html](index.html). Lade das Repository herunter und öffne diese Datei in einem aktuellen Browser. Alternativ im Projektordner starten:

```sh
python -m http.server 8000
```

Dann http://localhost:8000 öffnen. Keine Installation und kein Build erforderlich. Die Dateien eignen sich für GitHub Pages; Hosting wurde nicht eingerichtet.

## Lernen

Sechs Themen: Begrüßung, Namen, Alphabet, Herkunft, Zahlen 0–20 und Farben. Jedes Thema enthält visuelle Lernkarten, Aussprache, Aufgaben mit Rückmeldung und eine eigene Sprechaufgabe. Dazu kommen Zahlen-Memo, ein Start-Check mit 20 Aufgaben und die Wiederholung gemerkter Fehler.

Mit allen Übungsaufgaben eines Themas richtig beantwortet wird das Thema als geschafft markiert. Offene Sprechaufgaben dienen zur Selbsteinschätzung. Antworten mit Lesehilfe zählen nicht als erfolgreich gelöste Höraufgaben.

## Aussprache und Fortschritt

„Anhören“ und „Langsam“ verwenden die Sprachsynthese des Browsers. Eine installierte deutsche Stimme ist erforderlich; Deutsch (Österreich) wird bevorzugt. Stimmen und Qualität hängen von Gerät und Browser ab. Manche Geräte benötigen Internetzugang für die Stimme. Es sind keine aufgezeichneten Audiodateien enthalten.

Fortschritt wird im lokalen Browser gespeichert. Ohne verfügbaren Speicher kann man weiterlernen, der Fortschritt bleibt dann nur während der Sitzung erhalten. „Fortschritt löschen“ setzt die gespeicherten Ergebnisse nach Bestätigung zurück.

## Dateien und Quellen

- `data.js`: Lerninhalte und Aufgaben; erweiterbar für spätere Lektionen.
- `app.js`: Navigation, Übungen, Sprachsynthese und Fortschritt.
- `styles.css`: responsive Gestaltung; keine externen Bibliotheken oder Schriften.
- [Start-Screenshots](course-book-screenshots/start): Bezug zur Start-Lektion.
- [Textlicher Studienführer](study-materials/start-lesson-study-guide.md): ergänzende Referenz.

Die Website verwendet eigene Übungsformulierungen und eine eigene SVG-Illustration. Flaggen und weitere Symbole werden als Unicode dargestellt.

## Lektion 1 · Maria – Wie geht’s?

Wähle oben **Lektion 1**. Acht Themen begleiten die Buchseiten 15–24: Befinden, du/Sie, Herkunft und Wohnort, Verben, W-Fragen, andere Personen, Interviews und Wiederholung. Es gibt 151 Aufgaben und einen Lektion-1-Check mit 24 Aufgaben (drei pro Thema).

Jedes Thema bietet Lernkarten, ein gesprochenes Modellgespräch mit einblendbarem Text und eine eigene Sprechaufgabe. Weitere Aktivitäten sind Zuordnungen, Satzbausteine, eine schematische Kontinentkarte und ein persönlicher Vorstellungsbogen. Die Dialoge sind neu geschriebene Beispiele und verwenden die Browserstimme, nicht die Originalaufnahmen des Buches.

Start und Lektion 1 speichern Fortschritt getrennt. Vorhandene Start-Ergebnisse werden beim ersten Öffnen übernommen. Richtig gelöste Aufgaben bleiben als gelernt gespeichert; auch Korrekturen in der Fehlerwiederholung zählen. Lesehilfe und angezeigte Lösungen zählen nicht als selbstständig gelöst. Der Löschknopf setzt beide Lektionen zurück.

### Prüfung der Anwendung

Mit Node.js im Projektordner:

```sh
node --check app.js
node --check lesson1.js
node --check lesson1-plus.js
node test-course.cjs
```

Die automatischen Prüfungen kontrollieren Inhalte, Antwortschlüssel, Zuordnungen, Aufgabenzahl, Prüfungsverteilung, grundlegende Darstellungspfade mit einem simulierten DOM, Bewertung, Fortschritt und Datenübernahme. Layout, Tastaturbedienung und verfügbare Stimmen müssen zusätzlich im echten Browser geprüft werden.

## Lektion 1 · Grammatik entdecken und neue Aktivitäten

Unter **Grammatik entdecken** erklären sechs Bereiche die Regeln auf Deutsch: Personalpronomen, vier Verben, du/Sie, W-Fragen, Verbposition und Herkunft/Wohnort. Jeder Bereich verbindet ein visuelles Beispiel, eine kurze Erklärung, veränderbare Satzbausteine, Aussprache und eine unbewertete Entdeckungsaufgabe. Verb- und Ländertabellen können auf kleinen Bildschirmen seitlich verschoben werden. Nach Fehlern führt „Regel ansehen“ zur passenden Erklärung und anschließend zurück zu einem neuen Versuch.

Die acht Themen enthalten jetzt **151 Aufgaben**. Der Check bleibt bei 24 Aufgaben, drei pro Thema; soweit möglich werden unterschiedliche Lernziele gewählt. Hinzu kommen freie Beschreibungen von Sarah, Max, Olga und Felipe, ein persönlicher Vorstellungsbogen mit Lieblingsfarbe/Lieblingszahl, sechs antippbare Kontinente und fünf Spielstationen: Wortrevision, Satzkette, W-Fragen-Rätsel, Kursalphabet und Personenraten. Freie Texte und Spiele dienen der Selbstkontrolle und verändern den Lernerfolg nicht.

**Im Buch** zeigt alle 46 Originalbilder im zugeordneten Thema. Bilder lassen sich in einem Dialog öffnen und mit einem Regler vergrößern; Escape schließt den Dialog. Die Bilddateien liegen bereits im Repository und werden nicht verändert. Einzelprüfung, Zuordnung und fehlendes Material stehen im [Quellenaudit](docs/lesson-1-audit.md). 44 Bilder wurden visuell geprüft; zwei bleiben offen. Buchaufnahmen und Seiten 95/102 fehlen. Neue Hörübungen sind ausdrücklich Zusatzübungen und behaupten keine Antworten auf fehlende Originalaufnahmen.

Zusatzdialoge können ganz oder satzweise, normal oder langsam abgespielt werden. Bei eingeblendetem Text wird der gerade gesprochene Abschnitt hervorgehoben. Ein Hörversuch zählt erst nach erfolgreicher Wiedergabe und ohne Lesehilfe als neuer Hörerfolg. Fehlende Stimmen und Wiedergabefehler werden sichtbar angezeigt.

`lesson1-plus.js` ergänzt Inhalte, Quellenzuordnung, Grammatik, Dialogsteuerung und Spielstationen. Bestehende gültige Aufgaben-IDs bleiben erhalten; nur die zuvor mehrdeutige Zuordnung `people-q7` verliert ihren alten Lernerfolg einmalig. Neue Aufgaben beginnen ungelöst. Früher abgeschlossene Start-Themen werden übernommen. Spätere Fehler oder Lösungseinblendungen entfernen keinen bereits erworbenen Lernerfolg. Lösungen allein verdienen keinen neuen Lernerfolg.

### Prüfung im echten Browser

Mit vorhandenem Playwright und Chromium:

```sh
node test-browser.cjs
```

Optional `CHROMIUM_PATH` auf den installierten Browser setzen. Der Test startet einen lokalen Server und prüft die Oberfläche bei 390 px und 1280 px Breite, alle 151 Antwortschlüssel, Grammatiknavigation, freie Texte, Spiele, Bilddialog, Sprachsteuerung, Prüfung, Antwortsperren und Fortschrittsübernahme. Wenn Screenshots im lokalen Checkout fehlen, verwendet nur der Bilddialogtest ein deutlich gekennzeichnetes Testbild. Die Originalpixel werden dadurch nicht geprüft. Die Sprachsteuerung wird zusätzlich mit simulierten deutschen Stimmen getestet; Klangqualität und tatsächliche verfügbare Stimmen hängen weiterhin vom Gerät ab.

Prüfergebnis: Syntaxprüfungen, `node test-course.cjs` und der vollständige Chromium-Test bestanden. Hosting wurde nicht verändert.

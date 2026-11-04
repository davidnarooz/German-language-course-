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

Wähle oben **Lektion 1**. Acht Themen begleiten die Buchseiten 15–24: Befinden, du/Sie, Herkunft und Wohnort, Verben, W-Fragen, andere Personen, Interviews und Wiederholung. Es gibt 64 Aufgaben und einen Lektion-1-Check mit 24 Aufgaben (drei pro Thema).

Jedes Thema bietet Lernkarten, ein gesprochenes Modellgespräch mit einblendbarem Text und eine eigene Sprechaufgabe. Weitere Aktivitäten sind Zuordnungen, Satzbausteine, eine schematische Kontinentkarte und ein persönlicher Vorstellungsbogen. Die Dialoge sind neu geschriebene Beispiele und verwenden die Browserstimme, nicht die Originalaufnahmen des Buches.

Start und Lektion 1 speichern Fortschritt getrennt. Vorhandene Start-Ergebnisse werden beim ersten Öffnen übernommen. Richtig gelöste Aufgaben bleiben als gelernt gespeichert; auch Korrekturen in der Fehlerwiederholung zählen. Lesehilfe und angezeigte Lösungen zählen nicht als selbstständig gelöst. Der Löschknopf setzt beide Lektionen zurück.

### Prüfung der Anwendung

Mit Node.js im Projektordner:

```sh
node --check app.js
node --check lesson1.js
node test-course.cjs
```

Die automatischen Prüfungen kontrollieren Inhalte, Antwortschlüssel, Zuordnungen, Aufgabenzahl, Prüfungsverteilung, grundlegende Darstellungspfade mit einem simulierten DOM, Bewertung, Fortschritt und Datenübernahme. Layout, Tastaturbedienung und verfügbare Stimmen müssen zusätzlich im echten Browser geprüft werden.

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

'use strict';
// Lesson 2 data and activities. No original book audio is bundled.
function germanNumber(n){
 if(!Number.isInteger(n)||n<0||n>1000)throw new RangeError('Zahl außerhalb 0–1000');
 if(n<=20)return numbers[n];if(n===1000)return 'eintausend';
 const tens=['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];
 if(n<100){const one=n%10;return (one?(one===1?'ein':numbers[one])+'und':'')+tens[Math.floor(n/10)];}
 const h=Math.floor(n/100),rest=n%100;return (h===1?'ein':numbers[h])+'hundert'+(rest?germanNumber(rest):'');
}
function numberVariants(n){const word=germanNumber(n);return word.startsWith('einhundert')?[word.slice(3)]:n===1000?['tausend']:[];}
function phoneSpeech(value){return [...String(value)].map(c=>/\d/.test(c)?numbers[Number(c)]:c==='+'?'plus':c==='('?'':c===')'?'':c==='-'?'':c).join(' ').replace(/\s+/g,' ').trim();}
function emailSpeech(value){return [...String(value)].map(c=>({'@':'at','-':'minus','_':'Unterstrich','.':'Punkt'}[c]||(/\d/.test(c)?numbers[+c]:c))).join(' – ');}
const l2Countries=[
 ['🇸🇾','Syrien',['Arabisch']],['🇧🇬','Bulgarien',['Bulgarisch']],['🇺🇸','die USA',['Englisch']],['🇦🇫','Afghanistan',['Dari','Paschto']],['🇮🇷','Iran',['Farsi']],['🇦🇹','Österreich',['Deutsch']],['🇮🇹','Italien',['Italienisch']],['🇵🇱','Polen',['Polnisch']],['🇷🇴','Rumänien',['Rumänisch']],['🇷🇺','Russland',['Russisch']],['🇪🇸','Spanien',['Spanisch']],['🇹🇷','Türkei',['Türkisch']]
];
const l2Languages=[...new Set([...l2Countries.flatMap(c=>c[2]),'Französisch','Serbisch'])];
const l2Verbs={sein:['bin','bist','ist','sind','seid','sind'],heißen:['heiße','heißt','heißt','heißen','heißt','heißen'],kommen:['komme','kommst','kommt','kommen','kommt','kommen'],wohnen:['wohne','wohnst','wohnt','wohnen','wohnt','wohnen'],leben:['lebe','lebst','lebt','leben','lebt','leben'],haben:['habe','hast','hat','haben','habt','haben'],sprechen:['spreche','sprichst','spricht','sprechen','sprecht','sprechen']};
const l2Pronouns=['ich','du','er / sie','wir','ihr','sie / Sie'];
function l2VerbTable(keys=Object.keys(l2Verbs)){return `<div class="table-scroll" tabindex="0" role="region" aria-label="Verbformen Lektion 2"><table class="${keys.length===1?'compact-verbs':''}"><caption>👤 Person → ⚙ Verbform<br><small>↔ Tabelle auf kleinen Bildschirmen seitlich schieben.</small></caption><thead><tr><th scope="col">Person</th>${keys.map(k=>`<th scope="col">${k}</th>`).join('')}</tr></thead><tbody>${l2Pronouns.map((person,i)=>`<tr><th scope="row">${person}</th>${keys.map(k=>`<td><strong>${k==='sprechen'&&[1,2].includes(i)?'spr<mark>i</mark>ch'+(i===1?'st':'t'):['sein','haben'].includes(k)?'<mark>'+l2Verbs[k][i]+'</mark>':l2Verbs[k][i]}</strong>${audio((i===2?'er':i===5?'sie':person)+' '+l2Verbs[k][i])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
const l2Grammar=[
 {id:'yesno',title:'Ja-/Nein-Fragen',picture:'💬 Du hast Kinder. → ❓ Hast du Kinder? → ✅ Ja. / ❌ Nein.',example:'Du wohnst in Wien. → Wohnst du in Wien?',rule:'In einer Ja-/Nein-Frage steht das Verb zuerst. Du antwortest mit ja oder nein. In einer Aussage und in einer W-Frage steht das Verb an Position 2: Du wohnst in Wien. Wo wohnst du?',demo:['Hast','du','Kinder?'],alternate:['Bist','du','verheiratet?'],verbIndex:0,practice:order('Frage nach Kindern.','Hast du Kinder?','Hast (Verb) → Position 1.')},
 {id:'haben',title:'haben: habe, hast, hat',picture:'🙋 habe · 👉 hast · 👤 hat · 👥 haben · 👉👥 habt',example:'Ich habe ein Kind. Pinar und Ahmet haben zwei Kinder.',rule:'Die Verbform passt zur Person. Bei du und er/sie fällt das b weg: du hast, er/sie hat. Wir haben und sie/Sie haben sind gleich. Ihr habt hat die Endung -t.',demo:['Ich','habe','ein Kind.'],alternate:['Ihr','habt','zwei Kinder.'],table:()=>l2VerbTable(['haben']),practice:input('Ahmet ___ zwei Kinder.','hat','Ahmet → er hat.')},
 {id:'sprechen',title:'sprechen: e → i',picture:'👉 du sprichst · 👤 er/sie spricht · 👉👥 ihr sprecht',example:'Ich spreche Deutsch. Du sprichst Deutsch. Ihr sprecht Deutsch.',rule:'Bei du und er/sie wird e zu i: sprichst, spricht. Bei ich, wir, ihr und sie/Sie bleibt e. Wichtig: ihr sprecht, nicht „ihr spricht“.',demo:['Du','sprichst','Deutsch.'],alternate:['Ihr','sprecht','Deutsch.'],table:()=>l2VerbTable(['sprechen']),practice:input('Ihr ___ sehr gut Deutsch.','sprecht','ihr sprecht · du sprichst.')},
 {id:'groups',title:'wir und ihr',picture:'🙋 + 👤 → wir · 👉 👥 → ihr · 👥 dort → sie',example:'Wir sind drei. Ihr seid zwei. Sie sind vier.',rule:'Wir: Ich gehöre zur Gruppe. Ihr: Ich spreche zu mehreren Personen, vertraut. Sie: Ich spreche über mehrere Personen. Höflich spreche ich eine Person oder mehrere Personen mit Sie an. Wir sprechen, ihr sprecht, sie/Sie sprechen.',demo:['Wir','sind','drei.'],alternate:['Ihr','seid','zwei.'],table:()=>l2VerbTable(),practice:input('Du und Anna → ___ seid nett.','ihr','Du + Anna: Ich spreche zu euch → ihr.')},
 {id:'negative',title:'kein und keine',picture:'👶 ein Kind → 🚫 keine Kinder · 💬 Deutsch → 🚫 kein Deutsch',example:'Hast du Kinder? Nein, ich habe keine Kinder.',rule:'Ohne Kinder: Ich habe keine Kinder. Ohne Kenntnisse in einer Sprache: Ich spreche kein Deutsch. Mit einer Sprache: Ich spreche ein bisschen / gut / sehr gut Deutsch. Wir üben hier diese festen Muster.',demo:['Ich','habe','keine Kinder.'],alternate:['Ich','spreche','kein Französisch.'],practice:input('Nein, ich habe ___ Kinder.','keine','keine Kinder · kein Deutsch.')},
 {id:'age',title:'Alter und Dauer',picture:'🎂 25 → 25 Jahre alt · 🗓️ 1 → ein Jahr · 🗓️ 8 → acht Jahre',example:'Ich bin 25 Jahre alt. Ich lebe schon acht Jahre in Österreich.',rule:'Beim Alter verwenden wir sein: Ich bin … Jahre alt. Wie alt bist du? / Wie alt sind Sie? Bei einer Dauer: ein Jahr, zwei Jahre, acht Jahre. „Schon“ zeigt: Die Zeit ist bereits vergangen. Für die Straße lernen wir das Muster: Ich wohne in der Morgenstraße 15.',demo:['Ich','bin','25 Jahre alt.'],alternate:['Wir','leben','schon acht Jahre in Österreich.'],practice:input('Ich ___ 47 Jahre alt.','bin','Alter → sein: ich bin.')},
 {id:'numbers2',title:'Zahlen bauen',picture:'41 → 1 + und + 40 → ein · und · vierzig',example:'21 → einundzwanzig · 124 → einhundertvierundzwanzig',rule:'Ab 21: zuerst Einer, dann und, dann Zehner. Vor und heißt es ein: einundzwanzig. Bei Hunderten: Hunderter zuerst, danach der Rest. Merke: dreißig, sechzig, siebzig. 100: hundert oder einhundert. 1.000: tausend oder eintausend.',demo:['ein','und','vierzig'],alternate:['zweihundert','einund','neunzig'],verbIndex:-1,labels:['Baustein 1','Baustein 2','Baustein 3'],practice:{...input('Schreibe 100 als Wort.','einhundert','hundert und einhundert sind beide richtig.',['hundert'])}}
];
const lesson2Modules=[
 {id:'neighbours',icon:'🏘️',title:'Unsere Nachbarn',sub:'Namen & Wohnorte',source:'25–26, 31',grammar:'yesno',intro:'🪪 Vorname + Familienname → 🏠 Straße + Hausnummer.',cards:[['👨','Ahmet Yavuz','Morgenstraße 15 · Neuberg'],['👩','Pinar Yavuz','Morgenstraße 15 · Neuberg'],['👩','Pauline Gruber','Morgenstraße 17 · Neuberg'],['🪪','Ahmet → Vorname','Yavuz → Familienname']],task:'Zeichne zwei Häuser: 15 und 17. Stelle die Nachbarn vor. Frage: „Wohnen Sie auch in der Morgenstraße?“'},
 {id:'family2',icon:'👨‍👩‍👧',title:'Familie und Kinder',sub:'Persönliches & haben',source:'26–27, 33',grammar:'haben',intro:'💍 verheiratet · ◯ ledig · 💔 geschieden · 🏠 zusammen wohnen.',cards:[['💍','verheiratet','Ich bin verheiratet.'],['◯','ledig','Ich bin ledig.'],['💔','geschieden','Ich bin geschieden.'],['🏠👥','zusammen wohnen','Wir wohnen zusammen.'],['👶','ein Kind','Ich habe ein Kind.'],['🚫👶','keine Kinder','Ich habe keine Kinder.']],task:'Wähle eine erfundene Rolle. Sage vier Sätze über Name, Familienstand, Wohnort und Kinder. Frage anschließend: „Bist du verheiratet? Hast du Kinder?“'},
 {id:'age2',icon:'🎂',title:'Wie alt bist du?',sub:'Zahlen 21–100',source:'27, 33',grammar:'age',intro:'🎂 Ich bin 47 Jahre alt. → 47 = siebenundvierzig.',cards:[['21','einundzwanzig','ein + und + zwanzig'],['30','dreißig','ß'],['45 ↔ 54','fünfundvierzig · vierundfünfzig','Höre genau: Welche Zahl?'],['60 · 70','sechzig · siebzig','sech- · sieb-']],task:'Schreibe fünf Zahlen zwischen 20 und 99. Sprich sie, lass sie aufschreiben und vergleiche. Bitte um Wiederholung: „Entschuldigung? Noch einmal, bitte.“'},
 {id:'languages2',icon:'💬',title:'Welche Sprachen sprichst du?',sub:'Länder & Sprachen',source:'28, 33',grammar:'sprechen',intro:'💬 Ich spreche sehr gut / gut / ein bisschen Deutsch. Und du?',cards:l2Countries.map(c=>[c[0],c[1],c[2].join(' · '),c[1]+'. '+c[2].join(', ')]).concat([['🙂🙂🙂','sehr gut','Ich spreche sehr gut Deutsch.'],['🙂🙂','gut','Ich spreche gut Englisch.'],['🙂','ein bisschen','Ich spreche ein bisschen Französisch.'],['🚫','kein Französisch','Ich spreche kein Französisch.']]),task:'Wähle Sprachen und passende Stufen. Stelle dein Sprachenprofil vor. Frage: „Was sprichst du? Sprichst du auch …?“'},
 {id:'groups2',icon:'👥',title:'Wir und ihr',sub:'Zusammen sprechen',source:'29, 32',grammar:'groups',intro:'🙋👤 Wir sind zwei. 👉👥 Ihr seid nett! 👥 Sie sprechen Deutsch.',cards:[['🙋👤','wir sind · wir haben','wir leben · wir sprechen'],['👉👥','ihr seid · ihr habt','ihr lebt · ihr sprecht'],['👥','sie sind · sie haben','sie leben · sie sprechen'],['🧮','35 + 35 + 54 = 124','Wir sind zusammen 124 Jahre alt.']],task:'Erstelle ein Plakat für eine erfundene Gruppe: Personen, Alter, Kinder, Wohnorte und Sprachen. Berechne das gemeinsame Alter und stelle die Gruppe mit wir vor.'},
 {id:'numbers2',icon:'🔢',title:'Zahlen bis 1.000',sub:'Bauen, hören, spielen',source:'29–30, 33',grammar:'numbers2',intro:'100 + 20 + 4 → einhundertvierundzwanzig. 1.000 → eintausend.',cards:[['100','einhundert','auch: hundert'],['124','einhundertvierundzwanzig','100 + 4 + und + 20'],['291','zweihunderteinundneunzig','200 + 1 + und + 90'],['1.000','eintausend','auch: tausend']],task:'Baue eine Zahl mit Hundertern, Zehnern und Einern. Sprich sie laut. Spiele anschließend mit sechs Zahlen von 1 bis 45.'},
 {id:'forms2',icon:'📝',title:'Adresse und Formulare',sub:'Lesen & eintragen',source:'31, 33',grammar:'yesno',intro:'🪪 Vorname · Familienname · 🏠 Straße · Hausnummer · Postleitzahl · Wohnort · ☎ Telefonnummer · @ E-Mail-Adresse.',cards:[['🪪','Familienname: Yavuz','Vorname: Ahmet'],['🏠','Morgenstraße 15','3999 Neuberg'],['☎','+43 (0)664 78 11 12 09','Ziffer für Ziffer sprechen.'],['@','yavuz@taxi-neuberg.com','at · minus · Punkt'],['✍','Unterschrift','Hier unterschreiben.']],task:'Lies die Visitenkarte und fülle das Übungsformular aus. Gestalte anschließend eine erfundene Visitenkarte und ergänze eine Kontaktliste.'},
 {id:'review2',icon:'✓',title:'Das kann ich!',sub:'Geschichten & Spielstationen',source:'32–34',grammar:'groups',intro:'🏘️ Nachbarn → 👨‍👩‍👧 Familie → 🎂 Alter → 💬 Sprachen → 📝 Angaben.',cards:[['👨','James ist 35 Jahre alt.','Er ist geschieden und hat vier Kinder.'],['🌍','Er kommt aus Australien.','Er wohnt in London, in der Park Street.'],['💬','Er spricht fünf Sprachen.','Sehr gut Englisch · Französisch · Arabisch · Spanisch · ein bisschen Polnisch']],task:'Schreibe einen Text über eine erfundene Person. Prüfe: Name, Alter, Familienstand, Kinder, Herkunft, Wohnort und Sprachen. Spiele danach mit den Verben.'}
];
const l2Dialogues={
 neighbours:[['A','Guten Tag! Ich heiße Anna Weber. Wie heißen Sie?'],['B','Ich bin Paul Sommer. Wohnen Sie auch in der Gartenstraße?'],['A','Ja, in der Gartenstraße 12. Und Sie?'],['B','Ich wohne in der Gartenstraße 14.']],
 family2:[['A','Bist du verheiratet?'],['B','Nein, ich bin ledig. Und du?'],['A','Ich bin verheiratet. Hast du Kinder?'],['B','Nein, ich habe keine Kinder.']],
 age2:[['A','Wie alt bist du?'],['B','Ich bin 47 Jahre alt.'],['A','Entschuldigung? Noch einmal, bitte.'],['B','Siebenundvierzig.']],
 languages2:[['A','Was sprichst du?'],['B','Ich spreche gut Englisch und ein bisschen Deutsch.'],['A','Sprichst du auch Französisch?'],['B','Nein, ich spreche kein Französisch.']],
 groups2:[['A','Wir sind drei und wir sprechen Deutsch.'],['B','Ihr sprecht sehr gut! Wie lange lebt ihr schon in Österreich?'],['A','Wir leben schon acht Jahre in Österreich.']],
 numbers2:[['A','Wähle sechs Zahlen von eins bis fünfundvierzig.'],['B','Ich wähle vier, siebzehn, zwanzig, neunundzwanzig, zweiunddreißig und vierundvierzig.'],['A','Und welche Zahl ist größer: einhundertvierundzwanzig oder zweihunderteinundneunzig?']],
 forms2:[['A','Wie ist Ihre Telefonnummer?'],['B','Null sechs sechs vier, eins zwei drei, vier fünf sechs.'],['A','Und Ihre E-Mail-Adresse?'],['B','Anna Punkt Weber at Beispiel Punkt at.']],
 review2:[['A','Du bist 40 Jahre alt, richtig?'],['B','Ja, richtig. Ich bin verheiratet und habe zwei Kinder.'],['A','Welche Sprachen sprichst du?'],['B','Ich spreche Deutsch und gut Italienisch.']]
};
lesson2Modules.forEach(m=>{m.questions=[];m.turns=l2Dialogues[m.id].map(([speaker,text])=>({speaker,text}));m.dialogue=m.turns.map(t=>t.text).join(' ');});
function l2Add(moduleId,objective,questions){const m=lesson2Modules.find(m=>m.id===moduleId);questions.forEach((q,i)=>m.questions.push({...q,id:objective+'-'+(i+1),objective,grammar:q.grammar||m.grammar,source:m.source,revision:1,hint:q.hint||q.explanation}));}
function letters(prompt,answer,explanation){return {type:'order',prompt,answer,tiles:[...answer].reverse(),joiner:'',caseSensitive:true,explanation};}
const neighboursText='Ahmet Yavuz und Pinar Yavuz wohnen in der Morgenstraße 15. Pauline Gruber wohnt in der Morgenstraße 17.';
l2Add('neighbours','neighbour-profiles',[
 input('Wie ist Ahmets Familienname?','Yavuz','Ahmet: Vorname. Yavuz: Familienname.'),input('Wie ist Frau Grubers Vorname?','Pauline','Pauline Gruber: Pauline ist der Vorname.'),input('Wie ist Pinars Familienname?','Yavuz','Pinar Yavuz.'),input('In welcher Straße wohnt Ahmet?','Morgenstraße','Straße: Morgenstraße.'),input('Welche Hausnummer hat Pauline?','17','Pauline wohnt in der Morgenstraße 17.'),input('Welche Hausnummer haben Ahmet und Pinar?','15','Beide wohnen in der Morgenstraße 15.'),choice('Wohnt Pauline in der Hausnummer 15?','Nein.',['Ja.','Nein.'],'Pauline: 17.'),choice('Wohnen Ahmet und Pinar in derselben Straße?','Ja.',['Ja.','Nein.'],'Beide wohnen in der Morgenstraße.'),match('Verbinde die Namensteile.',[['Vorname von Ahmet','Ahmet'],['Familienname von Pauline','Gruber'],['Vorname von Frau Yavuz','Pinar']],'Vorname und Familienname sind verschiedene Angaben.'),order('Frage höflich nach der Straße.','Wohnen Sie in der Morgenstraße?','Das Verb Wohnen steht zuerst.'),letters('🔤 Schreibe den Familiennamen Gruber.','Gruber','Pauline Gruber.'),letters('🔤 Schreibe den Vornamen Ahmet.','Ahmet','Ahmet Yavuz.')
].map(q=>({...q,context:neighboursText})));
const familyText='Pauline sagt: „Mein Partner heißt Philipp. Wir wohnen zusammen. Wir sind nicht verheiratet und haben keine Kinder.“ Ahmet und Pinar haben zwei Kinder: Emin ist 25 und Selda ist 23 Jahre alt. Beide studieren in Graz.';
l2Add('family2','family-reading',[
 choice('Ist Pauline verheiratet?','Nein.',['Ja.','Nein.'],'Pauline sagt: Wir sind nicht verheiratet.'),choice('Hat Pauline Kinder?','Nein.',['Ja.','Nein.'],'Pauline hat keine Kinder.'),choice('Haben Ahmet und Pinar Kinder?','Ja.',['Ja.','Nein.'],'Sie haben zwei Kinder.'),input('Wie heißt Paulines Partner?','Philipp','Ihr Partner heißt Philipp.'),input('Wie viele Kinder haben Ahmet und Pinar?','zwei','Emin und Selda sind zwei Kinder.',['2']),choice('Studieren Emin und Selda in Graz?','Ja.',['Ja.','Nein.'],'Beide studieren in Graz.')
].map(q=>({...q,context:familyText})));
l2Add('family2','haben-forms',l2Pronouns.map((person,i)=>input(`${person} ___ Kinder. (haben)`,l2Verbs.haben[i],`${person} → ${l2Verbs.haben[i]}`)));
l2Add('family2','family-language',[
 order('Frage vertraut.','Hast du Kinder?','Hast steht an Position 1.'),order('Frage höflich.','Sind Sie verheiratet?','Sind steht an Position 1. Sie ist die höfliche Anrede.'),input('👶 Ein Kind. 🚫 Ich habe ___ Kinder.','keine','keine Kinder.',[]),choice('📖 Beispiel: „Ich bin geschieden.“ Welcher Familienstand passt?','geschieden',['ledig','verheiratet','geschieden'],'geschieden.'),letters('🔤 💍 Zwei verbundene Ringe → Familienstand?','verheiratet','Ich bin verheiratet.'),letters('🔤 ◯ Nicht verheiratet, nicht geschieden → Familienstand?','ledig','Ich bin ledig.'),letters('🔤 💔 Früher verheiratet → Familienstand?','geschieden','Ich bin geschieden.')
]);
const ageValues=[21,22,25,30,40,41,43,45,47,50,54,60,63,70,80,90,99,100];
l2Add('age2','age-number-words',ageValues.map(n=>input(`🎂 Schreibe ${n} als Wort.`,germanNumber(n),`${n} → ${germanNumber(n)}`,numberVariants(n))));
l2Add('age2','age-listening',[[45,54],[32,23],[18,80],[36,63],[24,42]].map(([a,b])=>hear(`Ich bin ${germanNumber(a)} Jahre alt.`,'Wie alt ist die Person?',String(a),[String(a),String(b)],`Du hörst: ${germanNumber(a)}.`)));
l2Add('age2','age-questions',[order('Frage nach dem Alter.','Wie alt bist du?','Alter → sein: Wie alt bist du?'),order('Bitte um Wiederholung.','Noch einmal, bitte.','Noch einmal, bitte.'),input('Ich ___ 47 Jahre alt.','bin','Alter → ich bin.'),input('Wie alt ___ Sie?','sind','Höflich: Wie alt sind Sie?')]);
l2Add('languages2','country-language',l2Countries.map(c=>({type:'input',prompt:`${c[0]} ${c[1]} → Nenne eine ausgewählte Sprache aus der Wortliste.`,answer:c[2][0],alternatives:c[2].slice(1),explanation:`Beispiele aus der Wortliste: ${c[2].join(', ')}.`,context:'Die Wortliste zeigt ausgewählte Sprachen. Menschen können mehrere und andere Sprachen sprechen.'})));
l2Add('languages2','language-spelling',l2Languages.map(l=>letters(`🔤 Ergänze den Sprachnamen: ${[...l].map((c,i)=>i%2? '_':c).join('')}`,l,`Ich spreche ${l}.`)));
l2Add('languages2','language-sentences',[input('Du ___ Deutsch. (sprechen)','sprichst','du sprichst → e wird i.'),input('Pauline ___ Französisch. (sprechen)','spricht','er/sie spricht.'),input('Ich spreche ___ bisschen Deutsch.','ein','ein bisschen Deutsch.'),input('Nein, ich spreche ___ Englisch.','kein','kein Englisch.'),order('Frage nach Sprachen.','Was sprichst du?','Was (1) · sprichst (2) · du?'),hear('Ich spreche gut Englisch und ein bisschen Deutsch.','Welche Sprache spricht die Person ein bisschen?','Deutsch',['Englisch','Deutsch','Französisch'],'ein bisschen Deutsch.')]);
for(const [verb,forms] of Object.entries(l2Verbs))l2Add('groups2','verb-'+verb,l2Pronouns.map((person,i)=>input(`${person} ___ (${verb})`,forms[i],`${person} → ${forms[i]}`,[])));
l2Add('groups2','group-pronouns',[input('Ich und Anna → ___ sind zwei.','wir','Ich gehöre zur Gruppe → wir.'),input('Du und Paul → ___ seid zwei.','ihr','Ich spreche zu euch → ihr.'),choice('„Ihr sprecht Deutsch.“ Welches Wort ist das Verb?','sprecht',['Ihr','sprecht','Deutsch'],'ihr sprecht.'),input('Wir leben schon ein __ in Österreich.','Jahr','ein Jahr · zwei Jahre.'),order('Stelle eure Gruppe vor.','Wir sind zusammen 124 Jahre alt.','Wir sind … Jahre alt.')]);
const largeValues=[100,101,110,120,124,200,201,210,291,300,400,500,600,700,800,900,999,1000];
l2Add('numbers2','large-numbers',largeValues.map(n=>input(`🔢 Schreibe ${n===1000?'1.000':n} als Wort.`,germanNumber(n),`${n} → ${germanNumber(n)}`,numberVariants(n))));
l2Add('numbers2','number-parts',[choice('124 → Welche Zerlegung passt?','100 + 4 + und + 20',['100 + 4 + und + 20','100 + 20 + und + 4','200 + 4 + und + 10'],'einhundertvierundzwanzig.'),choice('291 → Welche Zahl steht zuerst im Wort?','zweihundert',['eins','neunzig','zweihundert'],'zweihunderteinundneunzig.'),hear('zweihunderteinundneunzig','Welche Zahl hörst du?','291',['219','291','921'],'zweihundert + einundneunzig.'),{...input('Welche sechs Zahlen nennt Ahmet? Schreibe sie in der genannten Reihenfolge, mit Kommas.','4, 17, 20, 29, 32, 44','vier, siebzehn, zwanzig, neunundzwanzig, zweiunddreißig, vierundvierzig.'),context:'Ahmet sagt: „Ich nehme vier, siebzehn, zwanzig, neunundzwanzig, zweiunddreißig und vierundvierzig.“',alternatives:['4,17,20,29,32,44']}]);
const ahmetCard={family:'Yavuz',first:'Ahmet',street:'Morgenstraße',house:'15',postal:'3999',town:'Neuberg',phone:'+43 (0)664 78 11 12 09',email:'yavuz@taxi-neuberg.com'};
const formFields=[['family','Familienname','🪪'],['first','Vorname','🙋'],['street','Straße','🛣️'],['house','Hausnummer','🏠'],['postal','Postleitzahl','📮'],['town','Wohnort','🏘️'],['phone','Telefonnummer','☎'],['email','E-Mail-Adresse','@']];
const cardContext='AHMET YAVUZ · Morgenstraße 15 · 3999 Neuberg · +43 (0)664 78 11 12 09 · yavuz@taxi-neuberg.com';
l2Add('forms2','card-fields',formFields.map(([key,label])=>({...input(`Lies die Karte. ${label}?`,ahmetCard[key],`${label}: ${ahmetCard[key]}`),format:key==='phone'?'phone':key==='email'?'email':undefined,context:cardContext})));
l2Add('forms2','form-vocabulary',formFields.map(([,label])=>letters(`🔤 ${ahmetCard[formFields.find(f=>f[1]===label)[0]]} → Wie heißt das Feld?`,label,`Das Feld heißt ${label}.`)));
l2Add('forms2','contact-symbols',[choice('E-Mail: @ heißt …','at',['at','minus','Punkt'],'@ → at.'),choice('E-Mail: _ heißt …','Unterstrich',['minus','Unterstrich','Punkt'],'_ → Unterstrich.'),choice('E-Mail: - heißt …','minus',['minus','at','Punkt'],'- → minus.'),input('E-Mail: . heißt …','Punkt','Ein Punkt bleibt beim Schreiben ein Punkt.'),letters('🔤 Hier unterschreiben: Unter…','Unterschrift','Unterschrift.'),hear(phoneSpeech('0664'),'Welche Ziffern hörst du?','0664',['0664','6640','0646'],'Null sechs sechs vier. Die führende Null bleibt erhalten.')]);
const jamesContext='James ist 35 Jahre alt. Er ist geschieden und hat vier Kinder. Er kommt aus Australien und wohnt jetzt in London, in der Park Street. Er spricht sehr gut Englisch, Französisch, Arabisch und Spanisch und ein bisschen Polnisch.';
l2Add('review2','profile-review',[
 input('Wie alt ist James?','35','James ist 35 Jahre alt.',['fünfunddreißig']),input('Wie ist sein Familienstand?','geschieden','James ist geschieden.'),input('Wie viele Kinder hat James?','vier','James hat vier Kinder.',['4']),input('Woher kommt James?','aus Australien','James kommt aus Australien.',['Australien']),input('Wo wohnt James jetzt?','in London','James wohnt jetzt in London.',['London']),input('Welche Sprache spricht er ein bisschen?','Polnisch','ein bisschen Polnisch.'),choice('Hat James zwei Kinder?','Nein.',['Ja.','Nein.'],'Er hat vier Kinder.'),choice('Spricht James Englisch?','Ja.',['Ja.','Nein.'],'Er spricht sehr gut Englisch.'),order('Frage nach Kindern.','Hat James Kinder?','Hat (Verb) steht zuerst.'),input('James und Anna → ___ sprechen Englisch.','sie','Mehrere Personen → sie sprechen.'),input('Du und Anna → ihr ___ nett.','seid','ihr seid.'),order('Bitte um Wiederholung.','Entschuldigung? Noch einmal, bitte.','Du kannst um Wiederholung bitten.')
].map(q=>({...q,context:jamesContext})));
function l2Panel(title,body){return `<section class="note activity-panel"><h2>${title}</h2>${body}<p class="speech-status status"></p><p class="status">Entdecken und selbst vergleichen · Diese Aktivität verändert deinen Lernerfolg nicht.</p></section>`;}
function l2Details(m){
 if(m.id==='family2')return l2Panel('🎭 Eine erfundene Rolle',`<p>Wähle vier Informationen. Stelle die Person vor und übe anschließend Fragen.</p><form id="role-form" class="field-grid"><label>Name<select name="name">${['Lotta','Mario','Susanne','Thomas'].map(n=>`<option>${n}</option>`).join('')}</select></label><label>Familienstand<select name="status">${['ledig','verheiratet','geschieden'].map(s=>`<option>${s}</option>`).join('')}</select></label><label>Wohnort<select name="town">${['Graz','Wien','Salzburg','Innsbruck'].map(s=>`<option>${s}</option>`).join('')}</select></label><label>Kinder<select name="children">${[0,1,2,3].map(n=>`<option value="${n}">${n===0?'keine Kinder':n===1?'ein Kind':n+' Kinder'}</option>`).join('')}</select></label><button>Meine Rolle zeigen</button></form><div id="role-result" role="status"></div>`)+l2VerbTable(['haben']);
 if(m.id==='age2')return l2Panel('🎧 Fünf Zahlen aufschreiben',`<p>Höre fünf Zahlen von 20 bis 99. Schreibe sie in derselben Reihenfolge. Allein: mit der Stimme üben. Zu zweit: Eine Person liest vor.</p><button id="dictation-play">▶ Fünf Zahlen hören</button><button id="dictation-slow">◷ Langsam</button><button id="dictation-transcript">Zahlen mitlesen</button><p id="dictation-clue"></p><form id="dictation-form"><label for="dictation-answer">Fünf Zahlen, mit Kommas</label><input id="dictation-answer" required placeholder="43, …"><button>Vergleichen</button></form><p id="dictation-result" role="status"></p><button id="dictation-new">Neue Zahlen</button>`);
 if(m.id==='languages2')return l2Panel('💬 Mein Sprachenprofil',`<p>Wähle mindestens eine Sprache und eine passende Stufe. Du kannst auch eine Rolle erfinden.</p><form id="language-form" class="field-grid">${l2Languages.map((l,i)=>`<label>${l}<select name="language-${i}"><option value="">–</option>${['sehr gut','gut','ein bisschen','kein'].map(v=>`<option>${v}</option>`).join('')}</select></label>`).join('')}<button>Meine Sätze zeigen</button></form><div id="language-result" role="status"></div><p>Die Länderkarte zeigt ausgewählte Sprachen, keine festen Regeln über Menschen.</p>`)+l2VerbTable(['sprechen']);
 if(m.id==='groups2')return l2Panel('👥 Das sind wir!',`<p>Gestalte eine erfundene Gruppe. Ergänze Alter, Kinder und Sprachen. Das Plakat zählt und rechnet mit.</p><form id="group-form"><div id="group-rows">${[35,35,54].map((age,i)=>`<fieldset class="group-row"><legend>Person ${i+1}</legend><label>Name<input name="person-${i}" value="${['Anna','Paul','Katarina'][i]}" required maxlength="40"></label><label>Alter<input name="age-${i}" type="number" min="0" max="120" value="${age}" required></label><label>Familienstand<select name="status-${i}"><option>verheiratet</option><option>ledig</option><option>geschieden</option></select></label><label>Kinder<input name="kids-${i}" type="number" min="0" max="9" value="${i===0?2:0}" required></label><label>Wohnort<input name="town-${i}" value="Neuberg" maxlength="60" required></label><label>Sprache<select name="language-${i}">${l2Languages.map(l=>`<option>${l}</option>`).join('')}</select></label></fieldset>`).join('')}</div><button>Unser Plakat zeigen</button></form><div id="group-result" role="status"></div>`)+l2VerbTable();
 if(m.id==='numbers2')return l2Panel('🧩 Zahlenwerkstatt',`<div class="number-parts field-grid"><label>Hunderter<select id="build-hundreds">${Array.from({length:11},(_,i)=>`<option value="${i*100}">${i*100}</option>`).join('')}</select></label><label>Zehner<select id="build-tens">${Array.from({length:10},(_,i)=>`<option value="${i*10}">${i*10}</option>`).join('')}</select></label><label>Einer<select id="build-units">${Array.from({length:10},(_,i)=>`<option value="${i}">${i}</option>`).join('')}</select></label></div><div id="build-result" aria-live="polite"></div>`)+lottoMarkup();
 if(m.id==='forms2')return l2Panel('📝 Von der Visitenkarte zum Formular',`<article class="business-card"><strong>AHMET YAVUZ</strong><p>Taxi-Service Neuberg<br>🏠 Morgenstraße 15 · 3999 Neuberg<br>☎ +43 (0)664 78 11 12 09<br>@ yavuz@taxi-neuberg.com</p>${audio(phoneSpeech(ahmetCard.phone))}${audio(emailSpeech(ahmetCard.email))}</article><form id="address-form" class="field-grid" novalidate>${formFields.map(([key,label,icon])=>`<label for="form-${key}">${icon} ${label}<input id="form-${key}" name="${key}" required maxlength="100" ${['house','postal','phone'].includes(key)?'inputmode="tel"':''} autocomplete="off"><small id="feedback-${key}"></small></label>`).join('')}<p>🚘 Kfz-Kennzeichen: NB 853 133 S<br>✍ Unterschrift: Ahmet Yavuz (vorgegeben)</p><button>Felder prüfen</button></form><p id="address-result" role="status"></p>`)+contactMarkup();
 if(m.id==='review2')return l2Panel('✍ Eine Person vorstellen',`<p>Erfinde eine Person oder interviewe eine Partnerin / einen Partner. Schreibe über Name, Alter, Familienstand, Kinder, Herkunft, Wohnort und Sprachen.</p><form id="story-form"><label for="story-text">Deine Geschichte</label><textarea id="story-text" rows="7" required maxlength="2000"></textarea><button>Mit einem Beispiel vergleichen</button></form><div id="story-result" role="status"></div>`);
 return '';
}
function lottoMarkup(){return l2Panel('🔢 Sechs aus 45 · Zahlenspiel',`<p>Wähle genau sechs verschiedene Zahlen. Höre danach die zusätzliche Ziehung. Dies ist ein Sprachspiel ohne Einsatz.</p><div class="lotto-grid">${Array.from({length:45},(_,i)=>`<button data-lotto="${i+1}" aria-pressed="false">${i+1}</button>`).join('')}</div><p id="lotto-selection" role="status">0 / 6 gewählt</p><button id="lotto-draw">▶ Ziehung hören</button><button id="lotto-replay">◷ Noch einmal, langsam</button><button id="lotto-reading">Ziehung mitlesen</button><p id="lotto-transcript"></p><form id="lotto-write"><label for="lotto-numbers">Die sechs gehörten Zahlen, mit Kommas</label><input id="lotto-numbers" required><button>Vergleichen</button></form><p id="lotto-result" role="status"></p><button id="lotto-new">Neu beginnen</button><details><summary>Ahmets Zahlen aus dem Lesetext</summary><p>4 · 17 · 20 · 29 · 32 · 44</p>${audio('vier, siebzehn, zwanzig, neunundzwanzig, zweiunddreißig, vierundvierzig')}</details>`);}
function contactMarkup(){return l2Panel('🪪 Meine erfundene Visitenkarte & Kursliste',`<p>Übe mit erfundenen Angaben. Entwürfe bleiben nur auf dieser geöffneten Seite.</p><form id="contact-form" class="field-grid"><label>Name<input name="name" value="Anna Weber" required maxlength="60"></label><label>Adresse<input name="address" value="Gartenstraße 12, 3999 Neuberg" required maxlength="120"></label><label>Telefonnummer<input name="phone" value="0664 123 456" required inputmode="tel" maxlength="35"></label><label>E-Mail-Adresse<input name="email" value="anna.weber@beispiel.at" required maxlength="100"></label><button>Visitenkarte zeigen & zur Liste hinzufügen</button></form><div id="contact-card" role="status"></div><div id="contact-list"></div>`);}
function parseSix(value){const tokens=String(value).trim().split(/[,;\s]+/).filter(Boolean);if(tokens.length!==6||tokens.some(t=>!/^\d+$/.test(t)))return null;const a=tokens.map(Number);return new Set(a).size===6&&a.every(n=>n>=1&&n<=45)?a:null;}
function normalizePhone(value){return String(value).replace(/[ ()-]/g,'').replace(/^\+430/,'+43');}
function l2Bind(m){
 if(m.id==='family2')document.querySelector('#role-form').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target),n=Number(d.get('children'));const text=`Ich heiße ${d.get('name')}. Ich bin ${d.get('status')}. Ich wohne in ${d.get('town')}. Ich habe ${n===0?'keine Kinder':n===1?'ein Kind':germanNumber(n)+' Kinder'}.`;document.querySelector('#role-result').innerHTML=`<p>${esc(text)}</p>${audio(text)}<p>Frage nach: „Heißt du Mario?“, „Bist du verheiratet?“, „Wohnst du in Wien?“, „Hast du zwei Kinder?“ Antworte passend zu deiner Rolle.</p>`;finishRender();};
 if(m.id==='age2'){let sequence;const fresh=()=>{sequence=shuffle(Array.from({length:80},(_,i)=>i+20)).slice(0,5);document.querySelector('#dictation-clue').textContent='';document.querySelector('#dictation-result').textContent='';document.querySelector('#dictation-answer').value='';};fresh();const text=()=>sequence.map(germanNumber).join(', ');document.querySelector('#dictation-play').onclick=()=>speak(text());document.querySelector('#dictation-slow').onclick=()=>speak(text(),true);document.querySelector('#dictation-transcript').onclick=()=>document.querySelector('#dictation-clue').textContent=sequence.join(', ');document.querySelector('#dictation-new').onclick=()=>{stop();fresh();};document.querySelector('#dictation-form').onsubmit=e=>{e.preventDefault();const tokens=document.querySelector('#dictation-answer').value.trim().split(/[,;\s]+/);const ok=tokens.length===5&&tokens.every((n,i)=>/^\d+$/.test(n)&&Number(n)===sequence[i]);document.querySelector('#dictation-result').textContent=(ok?'✓ Richtig! ':'↻ Vergleiche: ')+sequence.join(', ');};}
 if(m.id==='languages2')document.querySelector('#language-form').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target);const sentences=l2Languages.flatMap((l,i)=>{const level=d.get('language-'+i);return level?[`Ich spreche ${level} ${l}.`]:[];});document.querySelector('#language-result').innerHTML=sentences.length?`<p>${sentences.map(esc).join('<br>')}</p>${audio(sentences.join(' '))}<p>Frage: „Was sprichst du?“ → „Sprichst du auch …?“</p>`:'Bitte wähle mindestens eine Sprache.';finishRender();};
 if(m.id==='groups2')document.querySelector('#group-form').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target),rows=[0,1,2].map(i=>({name:String(d.get('person-'+i)).trim(),age:Number(d.get('age-'+i)),kids:Number(d.get('kids-'+i)),status:d.get('status-'+i),town:String(d.get('town-'+i)).trim(),language:d.get('language-'+i)}));if(rows.some(r=>!r.name||!r.town||!Number.isInteger(r.age)||r.age<0||r.age>120||!Number.isInteger(r.kids)||r.kids<0||r.kids>9))return;const total=rows.reduce((sum,r)=>sum+r.age,0),kids=rows.reduce((sum,r)=>sum+r.kids,0);const lines=['Wir sind drei.',`Wir sind zusammen ${total} (${germanNumber(total)}) Jahre alt.`,`Wir haben zusammen ${kids===1?'ein Kind':kids===0?'keine Kinder':germanNumber(kids)+' Kinder'}.`,...['verheiratet','ledig','geschieden'].map(s=>`${rows.filter(r=>r.status===s).length} von uns sind ${s}.`)];const counts=l2Languages.map(l=>[l,rows.filter(r=>r.language===l).length]).filter(([,n])=>n);document.querySelector('#group-result').innerHTML=`<article class="group-poster"><h3>Das sind wir!</h3><p>${lines.map(esc).join('<br>')}</p>${rows.map(r=>`<p>${esc(r.name)} ist ${r.age} Jahre alt und wohnt in ${esc(r.town)}. ${esc(r.name)} spricht ${esc(r.language)}.</p>`).join('')}<h4>Sprachen in unserer Gruppe</h4>${counts.map(([l,n])=>`<p>${esc(l)} <span class="tally" aria-label="${n} Personen">${'●'.repeat(n)}</span> ${n}</p>`).join('')}${audio(lines.slice(0,3).join(' '))}</article>`;finishRender();};
 if(m.id==='numbers2'){const update=()=>{const h=document.querySelector('#build-hundreds'),t=document.querySelector('#build-tens'),u=document.querySelector('#build-units');if(h.value==='1000'){t.value='0';u.value='0';}t.disabled=u.disabled=h.value==='1000';const n=Number(h.value)+Number(t.value)+Number(u.value),word=germanNumber(n);document.querySelector('#build-result').innerHTML=`<div class="sentence-diagram"><span>${h.value}<small>Hunderter</small></span><span>${t.value}<small>Zehner</small></span><span>${u.value}<small>Einer</small></span></div><p class="grammar-picture">${n.toLocaleString('de')} → ${word}</p>${audio(word)}`;finishRender();};['hundreds','tens','units'].forEach(k=>document.querySelector('#build-'+k).onchange=update);update();bindLotto();}
 if(m.id==='forms2'){document.querySelector('#address-form').onsubmit=e=>{e.preventDefault();let count=0;for(const [key] of formFields){const field=document.querySelector('#form-'+key);const ok=key==='phone'?normalizePhone(field.value)===normalizePhone(ahmetCard[key]):key==='email'?field.value.trim().toLocaleLowerCase('de')===ahmetCard[key]:normal(field.value)===normal(ahmetCard[key]);field.setAttribute('aria-invalid',String(!ok));field.setAttribute('aria-describedby','feedback-'+key);document.querySelector('#feedback-'+key).textContent=ok?'✓ Richtig':'↻ Vergleiche: '+ahmetCard[key];if(ok)count++;}document.querySelector('#address-result').textContent=count+' / 8 Felder richtig. Vergleiche danach noch einmal mit der Karte.';};bindContact();}
 if(m.id==='review2')document.querySelector('#story-form').onsubmit=e=>{e.preventDefault();const text=document.querySelector('#story-text').value.trim();if(!text)return;document.querySelector('#story-result').innerHTML=`<h3>Dein Text</h3><p>${esc(text)}</p><h3>Ein Beispiel</h3><p>${esc(jamesContext)}</p>${audio(jamesContext)}<p>Vergleiche selbst: ✓ Name · ✓ Alter mit sein · ✓ Familienstand · ✓ Kinder mit haben · ✓ Herkunft · ✓ Wohnort · ✓ Sprachen mit sprechen. Verschiedene Texte sind möglich.</p>`;finishRender();};
}
function bindLotto(){let chosen=[],draw=[];const selection=document.querySelector('#lotto-selection');document.querySelectorAll('[data-lotto]').forEach(b=>b.onclick=()=>{if(draw.length)return;const n=+b.dataset.lotto;if(chosen.includes(n))chosen=chosen.filter(x=>x!==n);else if(chosen.length<6)chosen.push(n);else{selection.textContent='Du hast sechs Zahlen gewählt. Wähle eine Zahl ab, um sie zu ändern.';return;}b.setAttribute('aria-pressed',String(chosen.includes(n)));selection.textContent=chosen.length+' / 6 gewählt: '+chosen.join(', ');});function play(slow){if(chosen.length!==6){selection.textContent='Bitte wähle genau sechs verschiedene Zahlen.';return;}if(!draw.length){draw=shuffle(Array.from({length:45},(_,i)=>i+1)).slice(0,6);document.querySelectorAll('[data-lotto]').forEach(b=>b.disabled=true);}speak(draw.map(germanNumber).join(', '),slow);}document.querySelector('#lotto-draw').onclick=()=>play(false);document.querySelector('#lotto-replay').onclick=()=>play(true);document.querySelector('#lotto-reading').onclick=()=>document.querySelector('#lotto-transcript').textContent=draw.length?draw.join(', '):'Wähle zuerst sechs Zahlen und starte die Ziehung.';document.querySelector('#lotto-write').onsubmit=e=>{e.preventDefault();if(!draw.length){selection.textContent='Starte zuerst die Ziehung.';return;}const heard=parseSix(document.querySelector('#lotto-numbers').value);if(!heard){document.querySelector('#lotto-result').textContent='Bitte schreibe sechs verschiedene ganze Zahlen von 1 bis 45.';return;}const listening=heard.filter(n=>draw.includes(n)).length,hits=chosen.filter(n=>draw.includes(n)).length;document.querySelector('#lotto-result').textContent=`${listening} / 6 Zahlen der Ziehung notiert. Deine Auswahl hat ${hits} Treffer. Ziehung: ${draw.join(', ')}.`;};document.querySelector('#lotto-new').onclick=()=>{stop();chosen=[];draw=[];document.querySelectorAll('[data-lotto]').forEach(b=>{b.disabled=false;b.setAttribute('aria-pressed','false');});selection.textContent='0 / 6 gewählt';['#lotto-transcript','#lotto-result'].forEach(s=>document.querySelector(s).textContent='');document.querySelector('#lotto-numbers').value='';};}
function bindContact(){const contacts=[];document.querySelector('#contact-form').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target),entry=Object.fromEntries(['name','address','phone','email'].map(k=>[k,String(d.get(k)).trim()]));if(Object.values(entry).some(v=>!v)){document.querySelector('#contact-card').textContent='Bitte fülle alle vier Felder aus.';return;}contacts.push(entry);document.querySelector('#contact-card').innerHTML=`<article class="business-card"><strong>${esc(entry.name)}</strong><p>🏠 ${esc(entry.address)}<br>☎ ${esc(entry.phone)}<br>@ ${esc(entry.email)}</p>${audio(phoneSpeech(entry.phone))}${audio(emailSpeech(entry.email))}</article>`;document.querySelector('#contact-list').innerHTML=`<div class="table-scroll" tabindex="0" role="region" aria-label="Kursliste"><table><caption>Unsere Übungsliste</caption><thead><tr><th>Name</th><th>E-Mail-Adresse</th><th>Telefonnummer</th></tr></thead><tbody>${contacts.map(c=>`<tr><td>${esc(c.name)}</td><td>${esc(c.email)}</td><td>${esc(c.phone)}</td></tr>`).join('')}</tbody></table></div>`;finishRender();};}
function l2Station(id){
 document.querySelectorAll('[data-station]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.station===id)));
 const target=document.querySelector('#station-content');
 if(id==='vocab')target.innerHTML=`<h3>Wörter wiederholen</h3><details><summary>🌍 Länder und Sprachen</summary><div class="cards">${l2Countries.map(c=>card([c[0],c[1],c[2].join(' · ')])+audio(c[2].join(', '))).join('')}</div></details><details><summary>👨‍👩‍👧 Familienstand und Kinder</summary><div class="cards">${lesson2Modules[1].cards.map(card).join('')}</div></details><details><summary>📝 Persönliche Angaben</summary><div class="cards">${formFields.map(([k,label,icon])=>card([icon,label,ahmetCard[k]])).join('')+card(['✍','Unterschrift','Ahmet Yavuz'])}</div></details><button id="l2-word-practice">Wörter üben →</button>`;
 if(id==='story')target.innerHTML=`<h3>Kursgeschichten: Du heißt Alessandro, richtig?</h3><p>👤 Rolle lesen → ❓ nachfragen → ✍ über die Person schreiben.</p><article class="business-card"><strong>Alessandro</strong><p>🎂 40 · 💍 verheiratet · 👶👶 zwei Kinder<br>🌍 Italien · 🏠 Graz · 💬 Italienisch und ein bisschen Deutsch</p></article><form id="station-story"><label for="station-story-text">Schreibe über Alessandro.</label><textarea id="station-story-text" rows="6" required maxlength="1600"></textarea><button>Mit dem Beispiel vergleichen</button></form><div id="station-story-result" role="status"></div><p>Zu zweit: „Du bist 40 Jahre alt, richtig?“ → „Ja, richtig.“ Erfindet danach eine neue Rolle.</p>`;
 if(id==='dice')target.innerHTML=`<h3>🎲 Du sprichst Deutsch.</h3><p>Würfle zweimal: zuerst die Person, dann das Verb. Bilde einen ganzen Satz. Allein oder abwechselnd zu zweit.</p><div id="dice-prompt" class="sentence-diagram" aria-live="polite"></div><button id="dice-roll">🎲 Zweimal würfeln</button><form id="dice-form"><label for="dice-answer">Dein Satz</label><input id="dice-answer" required maxlength="150"><button>Mit einem Beispiel vergleichen</button></form><p id="dice-result" role="status"></p><div id="dice-audio"></div>`;
 if(id==='poster')target.innerHTML=`<h3>🌍 Sprachen im Kurs</h3><p>Wähle einen deutschen Ausdruck. Ergänze, wie er in einer anderen Sprache heißt. Die Beispiele kommen von dir; die Oberfläche bleibt Deutsch.</p><form id="poster-form" class="field-grid"><label>Deutsch<select name="german">${['Grüß Gott!','Wie geht’s?','Danke.','Auf Wiederschauen!'].map(t=>`<option>${t}</option>`).join('')}</select></label><label>Sprache<input name="language" required maxlength="40" placeholder="z. B. Italienisch"></label><label>Ausdruck in dieser Sprache<input name="translation" required maxlength="120"></label><button>Zum Plakat hinzufügen</button></form><div id="language-poster" class="cards" aria-live="polite"></div>`;
 if(id==='vocab')document.querySelector('#l2-word-practice').onclick=()=>{session={qs:allQuestions().filter(q=>['country-language','language-spelling','form-vocabulary'].includes(q.objective)),index:0,score:0,correct:[],reading:0,mode:'review',module:null};renderQuestion();};
 if(id==='story')document.querySelector('#station-story').onsubmit=e=>{e.preventDefault();const text=document.querySelector('#station-story-text').value.trim();if(!text)return;const model='Alessandro ist 40 Jahre alt. Er ist verheiratet und hat zwei Kinder. Er kommt aus Italien und wohnt in Graz. Er spricht Italienisch und ein bisschen Deutsch.';document.querySelector('#station-story-result').innerHTML=`<p><strong>Dein Text</strong><br>${esc(text)}</p><p><strong>Ein Beispiel</strong><br>${model}</p>${audio(model)}<p>Prüfe: ✓ ist · ✓ hat · ✓ kommt · ✓ wohnt · ✓ spricht. Verschiedene Formulierungen sind möglich.</p>`;finishRender();};
 if(id==='dice'){let person,verb,row;const verbs=['sein','heißen','kommen','wohnen','sprechen','haben'],names=['ich','du','er / sie','wir','ihr','sie / Sie'];const roll=()=>{row=Math.floor(Math.random()*6);const v=Math.floor(Math.random()*6);person=['Ich','Du','Er','Wir','Ihr','Sie'][row];verb=verbs[v];document.querySelector('#dice-prompt').innerHTML=`<span>${['⚀','⚁','⚂','⚃','⚄','⚅'][row]} ${names[row]}<small>Person</small></span><span>${['⚀','⚁','⚂','⚃','⚄','⚅'][v]} ${verb}<small>Verb</small></span>`;document.querySelector('#dice-result').textContent='';document.querySelector('#dice-audio').innerHTML='';document.querySelector('#dice-answer').value='';};document.querySelector('#dice-roll').onclick=roll;roll();document.querySelector('#dice-form').onsubmit=e=>{e.preventDefault();const tail={sein:'35 Jahre alt.',heißen:'Alex.',kommen:'aus Österreich.',wohnen:'in Wien.',sprechen:'Deutsch.',haben:'zwei Kinder.'}[verb],text=person+' '+l2Verbs[verb][row]+' '+tail;document.querySelector('#dice-result').textContent='Ein Beispiel: '+text+' Vergleiche die Verbform. Dein Satz darf andere Informationen enthalten.';document.querySelector('#dice-audio').innerHTML=audio(text);finishRender();};}
 if(id==='poster'){const entries=[];document.querySelector('#poster-form').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target),entry={german:d.get('german'),language:String(d.get('language')).trim(),translation:String(d.get('translation')).trim()};if(!entry.language||!entry.translation)return;entries.push(entry);document.querySelector('#language-poster').innerHTML=entries.map(p=>`<article class="card"><strong>${esc(p.german)}</strong>${audio(p.german)}<p>${esc(p.language)}: ${esc(p.translation)}</p></article>`).join('');finishRender();};}
 finishRender();
}

const lesson2Sources=[
  {
    "name": "01-neighbours-01.jpg",
    "module": "neighbours",
    "label": "Nachbarn und Adressen · 01-neighbours-01.jpg",
    "verified": true,
    "status": "Bild geprüft; fehlende Originalaufnahme bleibt unbeantwortet, Zusatzhörübungen separat"
  },
  {
    "name": "01-neighbours-02.jpg",
    "module": "neighbours",
    "label": "Nachbarn und Adressen · 01-neighbours-02.jpg",
    "verified": true,
    "status": "Bild geprüft; fehlende Originalaufnahme bleibt unbeantwortet, Zusatzhörübungen separat"
  },
  {
    "name": "01-neighbours-03.jpg",
    "module": "neighbours",
    "label": "Nachbarn und Adressen · 01-neighbours-03.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "A1-family-dialogue.jpg",
    "module": "family2",
    "label": "Familienstand, Kinder und Fragen · A1-family-dialogue.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "A1b-question-order-01.jpg",
    "module": "family2",
    "label": "Familienstand, Kinder und Fragen · A1b-question-order-01.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "A1b-question-order-02.jpg",
    "module": "family2",
    "label": "Familienstand, Kinder und Fragen · A1b-question-order-02.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "A2b-haben-conjugation.jpg",
    "module": "family2",
    "label": "Familienstand, Kinder und Fragen · A2b-haben-conjugation.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "A3-age-and-numbers-01.jpg",
    "module": "age2",
    "label": "Alter und Zahlen 21–100 · A3-age-and-numbers-01.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "A3-age-and-numbers-02.jpg",
    "module": "age2",
    "label": "Alter und Zahlen 21–100 · A3-age-and-numbers-02.jpg",
    "verified": true,
    "status": "Bild geprüft; fehlende Originalaufnahme bleibt unbeantwortet, Zusatzhörübungen separat"
  },
  {
    "name": "B1-languages-01.jpg",
    "module": "languages2",
    "label": "Länder und Sprachen · B1-languages-01.jpg",
    "verified": true,
    "status": "Bild geprüft; fehlende Originalaufnahme bleibt unbeantwortet, Zusatzhörübungen separat"
  },
  {
    "name": "B1-languages-02.jpg",
    "module": "languages2",
    "label": "Länder und Sprachen · B1-languages-02.jpg",
    "verified": true,
    "status": "Bild geprüft; fehlende Originalaufnahme bleibt unbeantwortet, Zusatzhörübungen separat"
  },
  {
    "name": "B2b-sprechen-conjugation-01.jpg",
    "module": "languages2",
    "label": "Länder und Sprachen · B2b-sprechen-conjugation-01.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "B2b-sprechen-conjugation-02.jpg",
    "module": "languages2",
    "label": "Länder und Sprachen · B2b-sprechen-conjugation-02.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "B2b-sprechen-conjugation-03.jpg",
    "module": "languages2",
    "label": "Länder und Sprachen · B2b-sprechen-conjugation-03.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "B3-verb-conjugation.jpg",
    "module": "groups2",
    "label": "wir/ihr und Gruppenplakat · B3-verb-conjugation.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "C1-lottery-numbers-01.jpg",
    "module": "numbers2",
    "label": "Zahlen bis 1000 und Zahlenspiel · C1-lottery-numbers-01.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "C1-lottery-numbers-02.jpg",
    "module": "numbers2",
    "label": "Zahlen bis 1000 und Zahlenspiel · C1-lottery-numbers-02.jpg",
    "verified": true,
    "status": "Bild geprüft; fehlende Originalaufnahme bleibt unbeantwortet, Zusatzhörübungen separat"
  },
  {
    "name": "C2-form-01.jpg",
    "module": "forms2",
    "label": "Persönliche Angaben und Formulare · C2-form-01.jpg",
    "verified": true,
    "status": "Bild geprüft; sichtbare Kartenangaben als Lesetraining, Originalaufnahme fehlt"
  },
  {
    "name": "C2-form-02.jpg",
    "module": "forms2",
    "label": "Persönliche Angaben und Formulare · C2-form-02.jpg",
    "verified": true,
    "status": "Bild geprüft; sichtbare Kartenangaben als Lesetraining, Originalaufnahme fehlt"
  },
  {
    "name": "page-25.jpg",
    "module": "neighbours",
    "label": "Nachbarn und Adressen · page-25.jpg",
    "verified": true,
    "status": "Visuell geprüft nach Download; Einstieg, Namen- und Adresszuordnung"
  },
  {
    "name": "page-26-family.jpg",
    "module": "family2",
    "label": "Familienstand, Kinder und Fragen · page-26-family.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "page-27-age-and-numbers.jpg",
    "module": "age2",
    "label": "Alter und Zahlen 21–100 · page-27-age-and-numbers.jpg",
    "verified": true,
    "status": "Bild geprüft; Partnerseiten 95/96/102 fehlen, eigene Rollenaufgaben separat"
  },
  {
    "name": "page-28-languages.jpg",
    "module": "languages2",
    "label": "Länder und Sprachen · page-28-languages.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "page-29-conjugation.jpg",
    "module": "groups2",
    "label": "wir/ihr und Gruppenplakat · page-29-conjugation.jpg",
    "verified": true,
    "status": "Bild geprüft; Partnerseiten 95/96/102 fehlen, eigene Rollenaufgaben separat"
  },
  {
    "name": "page-30-lottery.jpg",
    "module": "numbers2",
    "label": "Zahlen bis 1000 und Zahlenspiel · page-30-lottery.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "page-31-forms.jpg",
    "module": "forms2",
    "label": "Persönliche Angaben und Formulare · page-31-forms.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "page-32-grammar-and-communication.jpg",
    "module": "review2",
    "label": "Grammatik, Wörter und Spielstationen · page-32-grammar-and-communication.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "page-33-vocabulary.jpg",
    "module": "review2",
    "label": "Grammatik, Wörter und Spielstationen · page-33-vocabulary.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "page-34-review.jpg",
    "module": "review2",
    "label": "Grammatik, Wörter und Spielstationen · page-34-review.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-countries-and-languages.jpg",
    "module": "languages2",
    "label": "Länder und Sprachen · vocabulary-countries-and-languages.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-countries-practice-01.jpg",
    "module": "languages2",
    "label": "Länder und Sprachen · vocabulary-countries-practice-01.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-countries-practice-02.jpg",
    "module": "languages2",
    "label": "Länder und Sprachen · vocabulary-countries-practice-02.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-family-practice-01.jpg",
    "module": "family2",
    "label": "Familienstand, Kinder und Fragen · vocabulary-family-practice-01.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-family-practice-02.jpg",
    "module": "family2",
    "label": "Familienstand, Kinder und Fragen · vocabulary-family-practice-02.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-family.jpg",
    "module": "family2",
    "label": "Familienstand, Kinder und Fragen · vocabulary-family.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-languages-practice-01.jpg",
    "module": "languages2",
    "label": "Länder und Sprachen · vocabulary-languages-practice-01.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-languages-practice-02.jpg",
    "module": "languages2",
    "label": "Länder und Sprachen · vocabulary-languages-practice-02.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-numbers-01.jpg",
    "module": "numbers2",
    "label": "Zahlen bis 1000 und Zahlenspiel · vocabulary-numbers-01.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-numbers-02.jpg",
    "module": "numbers2",
    "label": "Zahlen bis 1000 und Zahlenspiel · vocabulary-numbers-02.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-numbers-practice-01.jpg",
    "module": "numbers2",
    "label": "Zahlen bis 1000 und Zahlenspiel · vocabulary-numbers-practice-01.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-numbers-practice-02.jpg",
    "module": "numbers2",
    "label": "Zahlen bis 1000 und Zahlenspiel · vocabulary-numbers-practice-02.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-numbers-practice-03.jpg",
    "module": "numbers2",
    "label": "Zahlen bis 1000 und Zahlenspiel · vocabulary-numbers-practice-03.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-numbers-practice-04.jpg",
    "module": "numbers2",
    "label": "Zahlen bis 1000 und Zahlenspiel · vocabulary-numbers-practice-04.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-personal-details-practice-01.jpg",
    "module": "forms2",
    "label": "Persönliche Angaben und Formulare · vocabulary-personal-details-practice-01.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-personal-details-practice-02.jpg",
    "module": "forms2",
    "label": "Persönliche Angaben und Formulare · vocabulary-personal-details-practice-02.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-personal-details-practice-03.jpg",
    "module": "forms2",
    "label": "Persönliche Angaben und Formulare · vocabulary-personal-details-practice-03.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-personal-details-practice-04.jpg",
    "module": "forms2",
    "label": "Persönliche Angaben und Formulare · vocabulary-personal-details-practice-04.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  },
  {
    "name": "vocabulary-personal-details.jpg",
    "module": "forms2",
    "label": "Persönliche Angaben und Formulare · vocabulary-personal-details.jpg",
    "verified": true,
    "status": "Geprüft; zugehörige Lernaktivitäten und Buchansicht"
  }
];
const lesson2ModuleGrammar=Object.fromEntries(lesson2Modules.map(m=>[m.id,m.grammar]));
lesson2Modules.forEach(m=>m.questions.forEach(q=>q.sourceFiles=lesson2Sources.filter(s=>s.module===m.id).map(s=>s.name)));
lessons.push({id:'lesson2',title:'Lektion 2',subtitle:'Ahmet · Nachbarn kennenlernen',modules:lesson2Modules,assessment:24,assessmentPerModule:3,
 grammarTopics:l2Grammar,moduleGrammar:lesson2ModuleGrammar,sources:lesson2Sources,sourceDirectory:'course-book-screenshots/lesson-02',
 sourceNote:'Originalaufnahmen und Partnerseiten 95/96/102 sowie verlinkte Seiten 106–107 fehlen. Wir bewerten nur sichtbare Informationen und ausdrücklich neue Zusatzübungen.',
 revisionModule:'review2',defaultStation:'vocab',revisionStations:[['vocab','📖 Wörter'],['story','✍ Kursgeschichten'],['dice','🎲 Würfelspiel'],['poster','🌍 Sprachenplakat']],
 station:l2Station,details:l2Details,bindExtras:l2Bind
});

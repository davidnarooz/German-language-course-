'use strict';
// Lesson 1 additions; loaded after the original bank to preserve stable question IDs.
const grammarTopics=[
{id:'pronouns',title:'Personalpronomen',picture:'🙋 ich · 👉 du · 👨 er · 👩 sie · 👥 sie · 🤝 Sie',example:'Maria wohnt in Wien. → Sie wohnt in Wien.',rule:'Ein Pronomen steht für eine Person oder mehrere Personen. „Sie“ mit großem S ist auch die höfliche Anrede. Schau auf die Situation: 👩 eine Person, 👥 mehrere Personen, 🤝 höflich.',demo:['Maria','wohnt','in Wien.'],alternate:['Maria und Alma','wohnen','in Wien.'],practice:choice('👥 Maria und Alma → ___ wohnen in Neuberg.','sie',['er','sie','ich'],'Zwei Personen → sie. Am Satzanfang: Sie.')},
{id:'verbs',title:'Verben verändern sich',picture:'🙋 ich → -e · 👉 du → -st · 👤 er/sie → -t · 👥 sie / 🤝 Sie → -en',example:'Ich wohne in Wien. Du wohnst in Graz.',rule:'Die Person bestimmt die Verbform. Bei „heißen“: du heißt, nicht „heißst“. „sein“ hat besondere Formen: bin, bist, ist, sind.',demo:['Ich','wohne','in Wien.'],alternate:['Du','wohnst','in Graz.'],practice:input('Alma ___ in Neuberg. (wohnen)','wohnt','Alma → sie → wohnt.')},
{id:'address',title:'du oder Sie?',picture:'😊 Freund → du · 🧒 Kind → du · 🤝 höflich → Sie',example:'Wie heißt du? ↔ Wie heißen Sie?',rule:'Mit Freunden und Kindern sagen wir meistens „du“. Höflich sagen wir „Sie“. Die höfliche Anrede „Sie“ schreiben wir immer groß. Auch: Wie geht es dir? ↔ Wie geht es Ihnen?',demo:['Wie','heißt','du?'],alternate:['Wie','heißen','Sie?'],practice:{...input('🤝 Höflich: Wo wohnen ___?','Sie','Die höfliche Anrede Sie hat ein großes S.'),caseSensitive:true}},
{id:'questions',title:'W-Fragen',picture:'👤 Wer? · 🪪 Wie heißt …? · 🌍 Woher? · 🏠 Wo? · 🙂 Wie geht’s?',example:'Woher kommst du? → Aus Polen.',rule:'Wer? fragt nach einer Person. Wie heißt …? fragt nach dem Namen. Woher? fragt nach der Herkunft. Wo? fragt nach dem Ort. Wie geht’s? fragt nach dem Befinden.',demo:['Woher','kommst','du?'],alternate:['Wo','wohnst','du?'],practice:input('___ wohnst du? → In Linz.','Wo','Wo? → Wohnort. Woher? → Herkunft.')},
{id:'sentence',title:'Das Verb: Position 2',picture:'① 🪪 Person / ❓ Fragewort → ② ⚙ Verb → ③ …',example:'Ich komme aus Polen. ↔ Woher kommst du?',rule:'In einer Aussage und in einer W-Frage steht das Verb an Position 2. Ein Satzteil kann mehrere Wörter haben: „Maria und Alma“ ist ein Satzteil.',demo:['Maria und Alma','kommen','aus Spanien.'],alternate:['Woher','kommen','Maria und Alma?'],practice:order('🧩 Baue die W-Frage.','Wo wohnst du?','Wo (1) · wohnst (2) · du (3).')},
{id:'places',title:'Herkunft und Wohnort',picture:'🌍 Herkunft → aus → 🙋 → in → 🏠 Wohnort',example:'Ich komme aus Spanien. Ich wohne in Österreich.',rule:'Woher? → aus. Wo? → in. Viele Länder stehen ohne Artikel: aus Polen, in Polen. Manche Länder haben einen Artikel. Dann verändert sich die Form: die → der, der → dem, die (mehrere) → den. „im“ bedeutet „in dem“.',demo:['Ich','komme','aus der Schweiz.'],alternate:['Ich','wohne','in der Schweiz.'],practice:input('Ich komme aus ___ USA.','den','die USA → aus den USA · in den USA.')}
];
const verbRows=[['🙋 ich','heiße','komme','wohne','bin'],['👉 du','heißt','kommst','wohnst','bist'],['👨 er / 👩 sie','heißt','kommt','wohnt','ist'],['👥 sie','heißen','kommen','wohnen','sind'],['🤝 Sie','heißen','kommen','wohnen','sind']];
const countryRows=[['🇹🇷 Türkei','aus der Türkei','in der Türkei'],['🇨🇭 Schweiz','aus der Schweiz','in der Schweiz'],['🇸🇰 Slowakei','aus der Slowakei','in der Slowakei'],['🇮🇶 Irak','aus dem Irak','im Irak'],['🇺🇸 USA','aus den USA','in den USA']];
const moduleGrammar={wellbeing:'address',address:'address',places:'places',verbs:'verbs',questions:'questions',people:'pronouns',interviews:'places',review1:'sentence'};
function grammarHelp(q){return currentLesson().grammarTopics?`<button id="grammar-help">💡 Regel ansehen: ${esc((currentLesson().grammarTopics.find(t=>t.id===(q.grammar||currentLesson().moduleGrammar[q.module]))||currentLesson().grammarTopics[0]).title)}</button><button id="retry-now">↻ Noch einmal versuchen</button>`:'';}
function bindGrammarHelp(q){const b=document.querySelector('#grammar-help');if(!b)return;const saved=session;b.onclick=()=>showGrammar(q.grammar||currentLesson().moduleGrammar[q.module],()=>{session=saved;renderQuestion();});document.querySelector('#retry-now').onclick=()=>{session=saved;renderQuestion();};}
function grammarTable(){return `<div class="table-scroll" tabindex="0" role="region" aria-label="Verbformen"><table><caption>Vier Verben · fünf Personenformen<br><small>↔ Auf kleinen Bildschirmen: Tabelle seitlich schieben.</small></caption><thead><tr>${['Person','heißen','kommen','wohnen','sein'].map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${verbRows.map(r=>`<tr><th scope="row">${r[0]}</th>${r.slice(1).map(v=>`<td><strong>${v==='bin'||v==='bist'||v==='ist'||v==='sind'?v:v.slice(0,-(v.endsWith('en')?2:v.endsWith('st')?2:1))+'<mark>'+v.slice(-(v.endsWith('en')?2:v.endsWith('st')?2:1))+'</mark>'}</strong>${audio(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function placeTable(){return `<div class="table-scroll" tabindex="0" role="region" aria-label="Länder mit Artikel"><table><caption>🌍 Woher? → aus · 🏠 Wo? → in</caption><thead><tr><th scope="col">Land</th><th scope="col">Woher?</th><th scope="col">Wo?</th></tr></thead><tbody>${countryRows.map(r=>`<tr><th scope="row">${r[0]}</th><td>${r[1]}${audio(r[1])}</td><td>${r[2]}${audio(r[2])}</td></tr>`).join('')}</tbody></table></div>`;}
function showGrammar(id='pronouns',back=showHome){stop();const topics=currentLesson().grammarTopics;const t=topics.find(t=>t.id===id)||topics[0];const blocks=words=>words.map((w,i)=>`<span class="${i===(t.verbIndex??1)?'verb-block':''}">${esc(w)}<small>${esc(t.labels?.[i]||('Position '+(i+1)+(i===(t.verbIndex??1)?' · Verb':'')))}</small></span>`).join('');app.innerHTML=`<button id="grammar-back">← Zurück</button><span class="eyebrow">${currentLesson().title} · Sehen und verstehen</span><h1 class="lesson-title">Grammatik entdecken</h1><nav class="tabs" aria-label="Grammatikthemen">${topics.map(g=>`<button data-grammar="${g.id}" aria-pressed="${g.id===t.id}">${g.title}</button>`).join('')}</nav><section class="note"><h2>${t.title}</h2><p class="grammar-picture">${t.picture}</p><h3>👀 Beispiel</h3><p class="lead">${t.example}</p>${audio(t.example)}<h3>💡 So geht’s</h3><p>${t.rule}</p><h3>🧩 Probiere es aus</h3><div id="grammar-demo" class="sentence-diagram">${blocks(t.demo)}</div><button id="grammar-switch">↔ Beispiel wechseln</button><div class="speech-status status"></div></section>${t.table?t.table():''}<section class="exercise"><h2>Jetzt du!</h2><p>${esc(t.practice.prompt)}</p>${t.practice.options?`<div class="choices">${t.practice.options.map(v=>`<button data-rule-answer="${esc(v)}">${esc(v)}</button>`).join('')}</div>`:`<form id="rule-form"><label for="rule-response">Deine Antwort</label><input id="rule-response" autocomplete="off"><button>Prüfen</button></form>`}<p id="rule-feedback" role="status"></p><button id="rule-solution">Lösung zeigen</button><p>Diese Entdeckungsaufgabe verändert deinen Lernfortschritt nicht.</p></section>`;document.querySelector('#grammar-back').onclick=back;document.querySelectorAll('[data-grammar]').forEach(b=>b.onclick=()=>showGrammar(b.dataset.grammar,back));let alternate=false;document.querySelector('#grammar-switch').onclick=()=>{alternate=!alternate;const words=alternate?t.alternate:t.demo;document.querySelector('#grammar-demo').innerHTML=blocks(words);speak(words.join(' '));};const checkRule=v=>{const ok=answerMatches(t.practice,v);document.querySelector('#rule-feedback').textContent=(ok?'✓ Richtig! ':'↻ Schau noch einmal auf die Regel. ')+t.practice.explanation;};document.querySelectorAll('[data-rule-answer]').forEach(b=>b.onclick=()=>checkRule(b.dataset.ruleAnswer));if(document.querySelector('#rule-form'))document.querySelector('#rule-form').onsubmit=e=>{e.preventDefault();checkRule(document.querySelector('#rule-response').value);};document.querySelector('#rule-solution').onclick=()=>document.querySelector('#rule-feedback').textContent='Lösung: '+t.practice.answer+' · '+t.practice.explanation;finishRender();}
function moduleResources(m){const sources=currentLesson().sources.filter(x=>x.module===m.id);return `<section class="note"><button id="module-grammar">💡 Grammatik entdecken</button><details class="book-sources"><summary>📖 Im Buch · ${sources.length} Bilder</summary><p>Tippe auf ein Bild zum Vergrößern. Die Original-Tonaufnahmen sind nicht enthalten.</p>${sources.map(x=>`<figure><button class="source-image" data-source="${esc(x.name)}" aria-label="${esc(x.label)} vergrößern"><img loading="lazy" src="${currentLesson().sourceDirectory}/${encodeURIComponent(x.name)}" alt="${esc(x.label)}"></button><figcaption>${esc(x.label)}${x.verified?'':' · Inhalt noch nicht einzeln geprüft'}</figcaption></figure>`).join('')}<p>${esc(currentLesson().sourceNote)}</p></details></section>`;}
function dialogueMarkup(m){if(!m.turns)return `<section class="note"><h2>Ein Gespräch</h2>${audio(m.dialogue)}<button class="transcript-toggle">Gespräch mitlesen</button><p class="dialogue-text" hidden>${esc(m.dialogue)}</p></section>`;const turns=m.turns||m.dialogue.split(/(?<=[.!?])\s+/).map((text,i)=>({speaker:i%2?'B':'A',text}));return `<section class="note dialogue"><h2>Zusätzliche Hörübung</h2><p>🎧 Neues Beispiel · Erst hören, dann mitlesen.</p><button id="play-dialogue">▶ Ganzes Gespräch</button><button id="slow-dialogue">◷ Langsames Gespräch</button><button id="stop-dialogue">■ Stopp</button><button class="transcript-toggle" aria-expanded="false">Gespräch mitlesen</button><div class="dialogue-text" hidden>${turns.map((t,i)=>`<div class="dialogue-turn" data-turn="${i}"><strong>${esc(t.speaker)}</strong><p>${esc(t.text)}</p>${audio(t.text)}</div>`).join('')}</div><p class="speech-status status"></p></section>`;}
function bindLessonExtras(m){document.querySelector('#module-grammar').onclick=()=>showGrammar(currentLesson().moduleGrammar[m.id],()=>showModule(m));document.querySelectorAll('[data-source]').forEach(b=>b.onclick=()=>{const dialog=document.createElement('dialog');dialog.className='image-dialog';dialog.innerHTML=`<button autofocus>✕ Schließen</button><label>Vergrößerung<input id="source-zoom" type="range" min="100" max="300" value="100" step="25"></label><div class="zoom-scroll"><img src="${currentLesson().sourceDirectory}/${encodeURIComponent(b.dataset.source)}" alt="${esc(b.querySelector('img').alt)}"></div>`;app.append(dialog);dialog.querySelector('button').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{dialog.remove();b.focus();});const img=dialog.querySelector('img');img.style.width='85vw';dialog.querySelector('#source-zoom').oninput=e=>img.style.width=(Number(e.target.value)*.85)+'vw';dialog.showModal();});const turns=m.turns||m.dialogue.split(/(?<=[.!?])\s+/).map((text,i)=>({speaker:i%2?'B':'A',text}));function play(slow){let i=0;function next(){if(i>=turns.length)return;const n=i++;speak(turns[n].text,slow,next,document.querySelector(`[data-turn="${n}"]`));}next();}document.querySelector('#play-dialogue').onclick=()=>play(false);document.querySelector('#slow-dialogue').onclick=()=>play(true);document.querySelector('#stop-dialogue').onclick=stop;const info={'Europa':'🇦🇹 Österreich · 🇮🇹 Italien · 🇪🇸 Spanien · 🇵🇱 Polen','Afrika':'🌍 Afrika · Sprich: Afrika.','Asien':'🇮🇱 Israel','Nordamerika':'🌎 Nordamerika · Sprich: Nordamerika.','Südamerika':'🇧🇷 Brasilien','Australien':'🌏 Australien · Sprich: Australien.'};document.querySelectorAll('[data-continent]').forEach((b,i)=>b.onclick=()=>{document.querySelectorAll('[data-continent]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('.world-map svg text').forEach(x=>{x.style.fontWeight=x.textContent===b.dataset.continent?'900':'400';x.style.textDecoration=x.textContent===b.dataset.continent?'underline':'none';});document.querySelector('#continent-info').textContent=info[b.dataset.continent];speak(b.dataset.continent);});currentLesson().bindExtras?.(m);if(m.id===currentLesson().revisionModule)bindRevision();}
const descriptionPeople=[{name:'Sarah',pronoun:'Sie',origin:'Israel',town:'Bregenz',icon:'👩 🇮🇱'},{name:'Max',pronoun:'Er',origin:'Österreich',town:'Deutschland',icon:'👨 🇦🇹'},{name:'Olga und Felipe',pronoun:'Sie',origin:'Polen und Brasilien',town:'Linz',icon:'👩👨 🇵🇱 🇧🇷',plural:true}];
function descriptionMarkup(){return `<section class="note"><h2>Menschen beschreiben</h2><p>👀 Lies die Karten. Schreibe jeweils drei Sätze: Name, Herkunft und Wohnort.</p><div class="cards">${descriptionPeople.map((p,i)=>`<article class="card"><span class="grammar-picture">${p.icon}</span><h3>${p.name}</h3><p>🌍 ${p.origin}<br>🏠 ${p.town}</p><form data-description="${i}"><label for="description-${i}">Deine drei Sätze</label><textarea id="description-${i}" rows="5" required></textarea><button>Mit dem Beispiel vergleichen</button></form><div id="description-result-${i}" role="status"></div></article>`).join('')}</div><p>Mehrere Sätze sind möglich. Vergleiche Inhalt und Verbformen selbst. Diese Schreibaufgabe wird nicht automatisch bewertet.</p></section>`;}
function bindDescriptions(){document.querySelectorAll('[data-description]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const i=+f.dataset.description,p=descriptionPeople[i],text=`Das ${p.plural?'sind':'ist'} ${p.name}. ${p.pronoun} ${p.plural?'kommen':'kommt'} aus ${p.origin}. ${p.pronoun} ${p.plural?'wohnen':'wohnt'} in ${p.town}.`;document.querySelector('#description-result-'+i).innerHTML=`<p><strong>Dein Text</strong><br>${esc(f.querySelector('textarea').value)}</p><p><strong>Ein Beispiel</strong><br>${esc(text)}</p><p>Vergleiche: ✓ drei Informationen · ✓ ${p.plural?'kommen / wohnen':'kommt / wohnt'} · ✓ aus / in</p>${audio(text)}`;finishRender();});}
function revisionMarkup(){return `<section id="revision" class="note"><h2>Spielstationen & Wiederholung</h2><nav class="tabs" aria-label="Spielstationen">${(currentLesson().revisionStations||[['vocab','🎨 Wörter'],['chain','👥 Ich und er und sie'],['puzzle','🧩 W-Fragen'],['alphabet','🔤 Kursalphabet'],['guess','✋ Wer ist das?']]).map(([id,title])=>`<button data-station="${id}">${title}</button>`).join('')}</nav><div id="station-content"></div></section>`;}
function showRevision(){document.querySelector('#revision').scrollIntoView({behavior:'smooth'});station(currentLesson().defaultStation||'vocab');}
function bindRevision(){document.querySelectorAll('[data-station]').forEach(b=>b.onclick=()=>station(b.dataset.station));station(currentLesson().defaultStation||'vocab');}
function station(id){stop();if(currentLesson().station){currentLesson().station(id);return;}document.querySelectorAll('[data-station]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.station===id)));const target=document.querySelector('#station-content');if(id==='vocab'){target.innerHTML=`<h3>Wörter wiederholen</h3><details><summary>🎨 Zehn Farben</summary><div class="cards">${colours.map(c=>card([`<span class="swatch" style="background:${c[1]}" role="img" aria-label="${c[0]}"></span>`,c[0],''])).join('')}</div></details><details><summary>🔢 Zahlen 0–20</summary><div class="cards">${numbers.map((n,i)=>card([i,n,''])).join('')}</div></details><details><summary>👋 Grüßen und verabschieden</summary><div class="cards">${[['🌄','Guten Morgen!'],['☀️','Guten Tag!'],['🌆','Guten Abend!'],['🌙','Gute Nacht!'],['🤝','Grüß Gott!'],['👋','Auf Wiederschauen!'],['👋','Ciao!'],['👋','Baba!']].map(card).join('')}</div></details><button id="revision-practice">Wörter üben →</button>`;document.querySelector('#revision-practice').onclick=()=>{session={qs:allQuestions().filter(q=>q.objective.startsWith('revision-')),index:0,score:0,correct:[],mode:'review',module:null,reading:0};renderQuestion();};}
if(id==='chain'){let count=1;const people=[['Alma','Spanien','Sie kommt aus Spanien.'],['Max','Österreich','Er kommt aus Österreich.'],['Sarah','Israel','Sie kommt aus Israel.']];target.innerHTML='<h3>Ich und er und sie</h3><p>👥 Merke dir die Personen. Wiederhole ihre Herkunft in ganzen Sätzen. In einer Gruppe: Jede Person ergänzt einen Satz.</p><p id="chain-cards"></p><button id="chain-hide">Karten verdecken</button><form id="chain-form"><label for="chain-answer">Wiederhole die Herkunft.</label><textarea id="chain-answer" rows="4" required></textarea><button>Vergleichen</button></form><div id="chain-feedback" role="status"></div><button id="chain-next">Eine Person mehr →</button>';const render=()=>{document.querySelector('#chain-cards').textContent=people.slice(0,count).map(p=>p[0]+' · 🌍 '+p[1]).join(' → ');document.querySelector('#chain-feedback').textContent='';};render();document.querySelector('#chain-hide').onclick=()=>document.querySelector('#chain-cards').textContent='👤 → '.repeat(count)+'?';document.querySelector('#chain-form').onsubmit=e=>{e.preventDefault();document.querySelector('#chain-feedback').textContent='Vergleiche: '+people.slice(0,count).map(p=>p[0]+': '+p[2]).join(' ');};document.querySelector('#chain-next').onclick=()=>{count=count%3+1;render();};}
if(id==='puzzle'){let index=0;const puzzles=[['W_ h_i_t d_?','Wie heißt du?'],['W_h_r k_mm_t d_?','Woher kommst du?'],['W_ w_hn_n S_e?','Wo wohnen Sie?'],['W_r b_st d_?','Wer bist du?']];target.innerHTML='<h3>Buchstabenrätsel · W-Fragen</h3><p id="puzzle-clue" class="grammar-picture"></p><form id="puzzle-form"><label for="puzzle-answer">Schreibe die ganze Frage.</label><input id="puzzle-answer" required><button>Prüfen</button></form><p id="puzzle-feedback" role="status"></p><button id="puzzle-next">Nächstes Rätsel →</button>';const render=()=>{document.querySelector('#puzzle-clue').textContent=puzzles[index][0];document.querySelector('#puzzle-feedback').textContent='';document.querySelector('#puzzle-answer').value='';};render();document.querySelector('#puzzle-form').onsubmit=e=>{e.preventDefault();const correct=normal(document.querySelector('#puzzle-answer').value)===normal(puzzles[index][1]);document.querySelector('#puzzle-feedback').textContent=correct?'✓ Richtig! '+puzzles[index][1]:'↻ Beispiel: '+puzzles[index][1];};document.querySelector('#puzzle-next').onclick=()=>{index=(index+1)%puzzles.length;render();};}
if(id==='alphabet'){target.innerHTML='<h3>Unser Kursalphabet</h3><p>🪪 Namen · 🏠 Städte · 🌍 Länder und Kontinente. Sammle Wörter von A bis Z. Allein oder zusammen auf einem Gerät.</p><form id="alphabet-form"><label for="alphabet-word">Ein Wort</label><input id="alphabet-word" required maxlength="60"><button>Zur Wortwand hinzufügen</button></form><div id="alphabet-wall" class="cards"></div><p>Frage: „Wie schreibt man das?“ → „Ich buchstabiere …“</p>'+audio('Wie bitte? Wie schreibt man das? Ich buchstabiere.');const words=[];document.querySelector('#alphabet-form').onsubmit=e=>{e.preventDefault();const word=document.querySelector('#alphabet-word').value.trim();if(!word)return;if(!words.some(w=>normal(w)===normal(word)))words.push(word);words.sort((a,b)=>a.localeCompare(b,'de'));document.querySelector('#alphabet-wall').innerHTML=words.map(w=>`<article class="card"><strong>${esc(w[0].toLocaleUpperCase('de'))}</strong><p>${esc(w)}</p>${audio(w.split('').join(' – '))}</article>`).join('');document.querySelector('#alphabet-word').value='';finishRender();};}
if(id==='guess'){target.innerHTML='<h3>✋ Fünf Informationen · Wer ist das?</h3><p>✋ Name · 🌍 Herkunft · 🏠 Wohnort · 🎨 Lieblingsfarbe · 🔢 Lieblingszahl</p><div class="cards"><article class="card">👩 Anna<br>🌍 Spanien · 🏠 Wien<br>🎨 rot · 🔢 7</article><article class="card">👨 Max<br>🌍 Österreich · 🏠 Berlin<br>🎨 blau · 🔢 12</article></div><p>Eine Person sagt: „Meine Lieblingsfarbe ist blau. Meine Lieblingszahl ist zwölf.“</p><label for="guess-person">Ich denke, das ist …</label><select id="guess-person"><option>Anna</option><option>Max</option></select><button id="guess-check">Vermuten</button><p id="guess-feedback" role="status"></p><p>Mit einer Partnerin oder einem Partner: Schreibe deine fünf Informationen. Lass die andere Person raten. Antworte: „Richtig!“ oder „Nein.“</p>';document.querySelector('#guess-check').onclick=()=>{const ok=document.querySelector('#guess-person').value==='Max';document.querySelector('#guess-feedback').textContent=ok?'✓ Richtig! Das ist Max.':'Nein. Max hat die Lieblingsfarbe blau und die Lieblingszahl zwölf.';};}finishRender();}

// Explicit models for turn-based speech; roles are labels, never spoken as content.
const conversationModels={
wellbeing:[['Maria','Guten Tag, Alfred! Wie geht es Ihnen?'],['Alfred','Sehr gut, danke. Und Ihnen?'],['Maria','Gut, danke.']],
address:[['Alfred','Guten Tag! Wie heißen Sie?'],['Maria','Ich heiße Maria Gómez.'],['Alfred','Und du? Wie heißt du?'],['Alma','Ich bin Alma.']],
places:[['Alfred','Woher kommen Sie?'],['Maria','Ich komme aus Spanien.'],['Alfred','Wo wohnen Sie?'],['Maria','Ich wohne jetzt in Neuberg.']],
verbs:[['A','Ich heiße Maria. Ich komme aus Spanien.'],['B','Du heißt Maria. Du kommst aus Spanien.'],['A','Wie heißen Sie?']],
questions:[['A','Wer bist du?'],['B','Ich bin Alma.'],['A','Woher kommst du?'],['B','Ich komme aus Spanien.'],['A','Wo wohnst du?'],['B','Ich wohne in Neuberg.']],
people:[['A','Wer ist das?'],['B','Das ist Enrico. Er kommt aus Italien.'],['A','Und wer sind die beiden?'],['B','Das sind Maria und Alma. Sie kommen aus Spanien.']],
interviews:[['Interviewerin','Hallo! Wie heißt du?'],['Lea','Ich heiße Lea.'],['Interviewerin','Woher kommst du, und wo wohnst du jetzt?'],['Lea','Ich komme aus Brasilien. Jetzt wohne ich in Wien.'],['Interviewerin','Wie geht es dir?'],['Lea','Mir geht es sehr gut.']],
review1:[['A','Hallo! Ich heiße Maria. Woher kommst du?'],['B','Ich komme aus Polen. Und du?'],['A','Aus Spanien. Meine Lieblingsfarbe ist rot.'],['B','Meine Lieblingsfarbe ist blau.']]
};
lesson1Modules.forEach(m=>m.turns=conversationModels[m.id].map(([speaker,text])=>({speaker,text})));
lesson1Modules.find(m=>m.id==='people').questions[6]={...match('Verbinde vollständige Sätze.',[['👨 Enrico · sein','Er ist Enrico.'],['👩 Maria · wohnen','Sie wohnt in Neuberg.'],['👥 Maria und Alma · wohnen','Sie wohnen in Neuberg.']],'Eine Person: er ist / sie wohnt. Mehrere Personen: sie wohnen.'),id:'people-q7',revision:2};
lesson1Modules[2].cards.push(['🇨🇭','aus der Schweiz · in der Schweiz','die → der'],['🇸🇰','aus der Slowakei · in der Slowakei','die → der']);
lesson1Modules[3].sub='Ich · du · er/sie · sie · Sie';
lesson1Modules[3].cards.push(['👤','er / sie heißt · kommt · wohnt · ist','eine Person'],['👥','sie heißen · kommen · wohnen · sind','mehrere Personen']);
function addQuestions(moduleId,objective,qs){const m=lesson1Modules.find(m=>m.id===moduleId);qs.forEach((q,i)=>m.questions.push({...q,id:objective+'-'+(i+1),objective,grammar:moduleGrammar[moduleId],source:m.source}));}
for(let row=0;row<verbRows.length;row++)for(let col=1;col<5;col++){const r=verbRows[row],person=['ich','du','er','sie (mehrere Personen)','Sie (höflich)'][row],inf=['heißen','kommen','wohnen','sein'][col-1];addQuestions('verbs','conjugation-'+row+'-'+col,[input(`${r[0]} → ${person} ___ (${inf})`,r[col],`${person} → ${r[col]}`)]);}
addQuestions('verbs','verb-find',[choice('🔎 „Maria wohnt in Neuberg.“ Welches Wort ist das Verb?','wohnt',['Maria','wohnt','Neuberg'],'Das Verb ist wohnt. Es steht an Position 2.'),choice('🔎 „Maria und Alma kommen aus Spanien.“ Welches Wort ist das Verb?','kommen',['Maria und Alma','kommen','aus Spanien'],'Maria und Alma ist ein Satzteil. kommen steht an Position 2.')]);
addQuestions('places','country-articles',countryRows.flatMap(r=>[input(`🌍 ${r[0]} → Ich komme ___.`,r[1],`Woher? → ${r[1]}`),input(`🏠 ${r[0]} → Ich wohne ___.`,r[2],`Wo? → ${r[2]}`,r[2]==='im Irak'?['in dem Irak']:[])]));
addQuestions('questions','identity-questions',[order('👉 Frage nach der Person.','Wer bist du?','Wer + bist + du?'),order('🤝 Frage höflich nach der Person.','Wer sind Sie?','Wer + sind + Sie?')]);
addQuestions('people','book-descriptions',descriptionPeople.flatMap(p=>[order(`🌍 ${p.name} · ${p.origin}`,`${p.pronoun} ${p.plural?'kommen':'kommt'} aus ${p.origin}.`,`${p.name}: Herkunft → aus.`),order(`🏠 ${p.name} · ${p.town}`,`${p.pronoun} ${p.plural?'wohnen':'wohnt'} in ${p.town}.`,`${p.name}: Wohnort → in.`)]));
addQuestions('wellbeing','guess-agree',[choice('📖 Beispiel: Emilia sagt „Mir geht es sehr gut.“ Wie geht’s Emilia?','Sehr gut.',['Sehr gut.','Nicht so gut.','Es geht.'],'Die Antwort steht ausdrücklich im Beispiel.'),input('„Ich denke, das ist Max.“ – „Ja, ___.“','richtig','Mit „Richtig!“ stimmst du zu.'),order('Sag deine Vermutung.','Ich denke, sehr gut.','„Ich denke …“ zeigt eine Vermutung. Bei einem Gesicht sind verschiedene Vermutungen möglich.')]);
addQuestions('interviews','dialogue-details',[hear('Wie heißt du? Ich heiße Lea. Woher kommst du? Ich komme aus Brasilien. Wo wohnst du jetzt? Ich wohne jetzt in Wien.','Welche drei Informationen passen zu Lea?','Lea · Brasilien · Wien',['Lea · Brasilien · Wien','Lea · Israel · Graz','Sami · Brasilien · Wien'],'Name: Lea. Herkunft: Brasilien. Wohnort: Wien.'),...['Afrika','Nordamerika','Australien'].map(c=>hear(c,'Welchen Kontinent hörst du?',c,['Afrika','Nordamerika','Australien'],`Du hörst: ${c}.`))]);
addQuestions('review1','revision-colours',colours.map(c=>({...input(`🎨 Ergänze die Farbe: ${c[0][0]}…`,c[0],`Die Farbe heißt ${c[0]}.`),swatch:c[1]})));
addQuestions('review1','revision-numbers',numbers.map((n,i)=>input(`🔢 Schreibe ${i} als Wort.`,n,`${i} → ${n}`)));
addQuestions('review1','revision-greetings',[order('🌄 Begrüße jemanden am Morgen.','Guten Morgen!','Am Morgen: Guten Morgen!'),order('🌆 Begrüße jemanden am Abend.','Guten Abend!','Am Abend: Guten Abend!'),input('🇦🇹 Höflich grüßen: Grüß ___!','Gott','Grüß Gott!'),input('👋 Höflich verabschieden: Auf ___!','Wiederschauen','Auf Wiederschauen!'),order('🔤 Bitte um die Schreibweise.','Wie schreibt man das?','Wie schreibt man das? → Ich buchstabiere …'),input('🌙 Vor dem Schlafen: Gute ___!','Nacht','Gute Nacht!'),input('👋 Ergänze: C_ao!','Ciao','Ciao!'),input('👋 Ergänze: B_ba!','Baba','Baba!'),order('☀️ Begrüße jemanden am Tag.','Guten Tag!','Am Tag: Guten Tag!')]);
lesson1Modules.forEach(m=>m.questions.forEach(q=>{q.source=q.source||m.source;q.objective=q.objective||m.id;q.grammar=q.grammar||moduleGrammar[m.id];q.revision=q.revision||1;q.hint=q.hint||q.explanation;}));

const lesson1Sources=[
  {
    "name": "01-how-are-you.jpg",
    "module": "wellbeing",
    "label": "Befinden und Vermutungen · 01-how-are-you.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "A1-introductions-01.jpg",
    "module": "address",
    "label": "Vorstellen und du/Sie · A1-introductions-01.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "A1-introductions-02.jpg",
    "module": "address",
    "label": "Vorstellen und du/Sie · A1-introductions-02.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "A1-introductions-03.jpg",
    "module": "address",
    "label": "Vorstellen und du/Sie · A1-introductions-03.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "A1-introductions-04.jpg",
    "module": "address",
    "label": "Vorstellen und du/Sie · A1-introductions-04.jpg",
    "verified": true,
    "note": "Gleiche Aufgabe / alternative Aufnahme; Original erhalten"
  },
  {
    "name": "A1-introductions-05.jpg",
    "module": "address",
    "label": "Vorstellen und du/Sie · A1-introductions-05.jpg",
    "verified": true,
    "note": "Gleiche Aufgabe / alternative Aufnahme; Original erhalten"
  },
  {
    "name": "A2-conjugation-01.jpg",
    "module": "verbs",
    "label": "Verbformen und Herkunft · A2-conjugation-01.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "A2-conjugation-02.jpg",
    "module": "places",
    "label": "Verbformen und Herkunft · A2-conjugation-02.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "A3-questions-01.jpg",
    "module": "questions",
    "label": "W-Fragen und Satzbau · A3-questions-01.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "A3-questions-02.jpg",
    "module": "questions",
    "label": "W-Fragen und Satzbau · A3-questions-02.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "A3b-question-order-01.jpg",
    "module": "questions",
    "label": "W-Fragen und Satzbau · A3b-question-order-01.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "A3b-question-order-02.jpg",
    "module": "questions",
    "label": "W-Fragen und Satzbau · A3b-question-order-02.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "B1-exercise-01.jpg",
    "module": "people",
    "label": "Andere Personen vorstellen · B1-exercise-01.jpg",
    "verified": false,
    "note": "Nicht einzeln lesbar; keine abgeleiteten Antwortschlüssel"
  },
  {
    "name": "B1-pronouns-02.jpg",
    "module": "people",
    "label": "Andere Personen vorstellen · B1-pronouns-02.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "B2-verb-conjugation-01.jpg",
    "module": "people",
    "label": "Andere Personen vorstellen · B2-verb-conjugation-01.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "B2-verb-conjugation-02.jpg",
    "module": "people",
    "label": "Andere Personen vorstellen · B2-verb-conjugation-02.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "B4-describing-people.jpg",
    "module": "people",
    "label": "Andere Personen vorstellen · B4-describing-people.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "C2-interviews-01.jpg",
    "module": "interviews",
    "label": "Buchinterviews und Kontinente · C2-interviews-01.jpg",
    "verified": true,
    "note": "Bild geprüft; Originalaudio fehlt, keine bewerteten Buchantworten"
  },
  {
    "name": "C2-interviews-02.jpg",
    "module": "interviews",
    "label": "Buchinterviews und Kontinente · C2-interviews-02.jpg",
    "verified": true,
    "note": "Bild geprüft; Originalaudio fehlt, keine bewerteten Buchantworten"
  },
  {
    "name": "C2-interviews-03.jpg",
    "module": "interviews",
    "label": "Buchinterviews und Kontinente · C2-interviews-03.jpg",
    "verified": true,
    "note": "Bild geprüft; Originalaudio fehlt, keine bewerteten Buchantworten"
  },
  {
    "name": "C2-interviews-04.jpg",
    "module": "interviews",
    "label": "Buchinterviews und Kontinente · C2-interviews-04.jpg",
    "verified": true,
    "note": "Bild geprüft; Originalaudio fehlt, keine bewerteten Buchantworten"
  },
  {
    "name": "page-15.jpg",
    "module": "wellbeing",
    "label": "Befinden und Vermutungen · page-15.jpg",
    "verified": false,
    "note": "Nicht einzeln lesbar; keine abgeleiteten Antwortschlüssel"
  },
  {
    "name": "page-16-introductions.jpg",
    "module": "address",
    "label": "Vorstellen und du/Sie · page-16-introductions.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "page-17-questions.jpg",
    "module": "questions",
    "label": "W-Fragen und Satzbau · page-17-questions.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "page-18-introducing-people.jpg",
    "module": "people",
    "label": "Andere Personen vorstellen · page-18-introducing-people.jpg",
    "verified": true,
    "note": "Bild geprüft; B3 verweist auf fehlende Seiten 95/102"
  },
  {
    "name": "page-19-describing-people.jpg",
    "module": "people",
    "label": "Beschreibungen und fünf Informationen · page-19-describing-people.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "page-20-how-are-you.jpg",
    "module": "wellbeing",
    "label": "Befinden und Vermutungen · page-20-how-are-you.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "page-21-interviews.jpg",
    "module": "interviews",
    "label": "Buchinterviews und Kontinente · page-21-interviews.jpg",
    "verified": true,
    "note": "Bild geprüft; Originalaudio fehlt, keine bewerteten Buchantworten"
  },
  {
    "name": "page-22-grammar-and-communication.jpg",
    "module": "review1",
    "label": "Grammatik und Kommunikation · page-22-grammar-and-communication.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "page-23-vocabulary.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · page-23-vocabulary.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "page-24-review.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · page-24-review.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-colours-01.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-colours-01.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-colours-practice-01.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-colours-practice-01.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-colours-practice-02.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-colours-practice-02.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-colours-practice-03.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-colours-practice-03.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-colours-practice-04.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-colours-practice-04.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-colours-practice-05.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-colours-practice-05.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-greetings-01.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-greetings-01.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-greetings-practice-01.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-greetings-practice-01.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-greetings-practice-02.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-greetings-practice-02.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-greetings-practice-03.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-greetings-practice-03.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-numbers-01.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-numbers-01.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-numbers-02.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-numbers-02.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-numbers-practice-01.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-numbers-practice-01.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-numbers-practice-02.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-numbers-practice-02.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  },
  {
    "name": "vocabulary-numbers-practice-03.jpg",
    "module": "review1",
    "label": "Wörter und Spielstationen · vocabulary-numbers-practice-03.jpg",
    "verified": true,
    "note": "Visuell geprüft"
  }
];

// Shared rendering reads lesson metadata; Lesson 1 keeps its existing IDs and activities.
grammarTopics.find(t=>t.id==='verbs').table=grammarTable;
grammarTopics.find(t=>t.id==='places').table=placeTable;
Object.assign(lessons.find(l=>l.id==='lesson1'),{
 grammarTopics,moduleGrammar,sources:lesson1Sources,sourceDirectory:'course-book-screenshots/lesson-01',
 sourceNote:'Seiten 95/102 und die Original-Hörtexte fehlen. Dazu gibt es keine bewerteten Buchantworten.',
 assessmentPerModule:3,revisionModule:'review1',
 details:m=>m.id==='verbs'?grammarTable():m.id==='places'?placeTable():m.id==='people'?descriptionMarkup():'',
 bindExtras:m=>{if(m.id==='people')bindDescriptions();}
});

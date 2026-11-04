// Run: node test-browser.cjs (requires Playwright and Chromium).
const {chromium}=require('playwright');
const fs=require('fs'),http=require('http'),path=require('path'),assert=require('node:assert/strict');
(async()=>{
 const root=__dirname;
 const server=http.createServer((req,res)=>{
  const name=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));
  if(!name.startsWith(root+path.sep)&&name!==root){res.writeHead(403);return res.end();}
  const file=name===root?path.join(root,'index.html'):name;
  try{res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'image/jpeg');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 let browser;
 try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port);
 const run=fn=>page.evaluate(fn);
 const click=s=>page.locator(s).click();
 const lesson=()=>page.getByRole('button',{name:'Lektion 1',exact:true}).click();
 const noOverflow=async()=>assert.equal(await run(()=>document.documentElement.scrollWidth>innerWidth),false,'mobile overflow');
 await lesson();assert.equal(await run(()=>allQuestions().length),151);
 await click('#grammar-home');
 for(const topic of ['pronouns','verbs','address','questions','sentence','places']){
  await click('[data-grammar="'+topic+'"]');await noOverflow();await click('#grammar-switch');await click('#rule-solution');
  assert(await page.locator('#rule-feedback').textContent());
 }
 await click('[data-grammar="verbs"]');assert.equal(await page.locator('tbody tr').count(),5);
 await click('#grammar-back');
 for(const module of ['wellbeing','address','places','verbs','questions','people','interviews','review1']){
  await click('[data-module="'+module+'"]');await noOverflow();
  await click('.transcript-toggle');assert.equal(await page.locator('.dialogue-text').isVisible(),true);
  await click('#play-dialogue');await click('#stop-dialogue');
  if(module==='interviews'){await click('[data-continent="Afrika"]');assert.match(await page.locator('#continent-info').textContent(),/Afrika/);}
  if(module==='people'){
   await page.locator('[data-description="0"] textarea').fill('Das ist Sarah. Sie kommt aus Israel. Sie wohnt in Bregenz.');await click('[data-description="0"] button');assert.match(await page.locator('#description-result-0').textContent(),/Bregenz/);
  }
  await click('#home');
 }
 // Source viewer behavior uses a fixture only when the screenshot directory is absent locally.
 let imageFixture=false;
 if(!fs.existsSync(path.join(root,'course-book-screenshots/lesson-01'))){imageFixture=true;await page.route('**/course-book-screenshots/lesson-01/*.jpg',route=>route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000"><rect width="800" height="1000" fill="white"/><text x="20" y="40">Source viewer test fixture</text></svg>'}));}
 await click('[data-module="wellbeing"]');await click('.book-sources summary');await page.locator('[data-source]').first().click();assert.equal(await page.locator('dialog').isVisible(),true);await page.locator('#source-zoom').fill('200');await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').count(),0);await click('#home');
 // Solve and persist all original and new questions through the real rendering/checking path.
 await run(()=>{state={done:[],missed:[],mastered:[],revision:3};for(const m of currentModules()){startSession(m);while(session.index<session.qs.length){const q=session.qs[session.index];if(q.type==='listen')session.played=true;check(q.answer);session.index++;renderQuestion();}}showHome();});
 assert.equal(await run(()=>state.done.length),8);await page.reload();await lesson();assert.equal(await run(()=>state.done.filter(k=>k.startsWith('lesson1:')).length),8);
 // Reveals and later mistakes preserve earned mastery, but do not increase session score.
 await click('[data-module="wellbeing"]');await click('#practice');await click('#solution');assert.equal(await run(()=>session.score),0);assert.equal(await run(()=>state.done.includes('lesson1:wellbeing')),true);assert.equal(await page.locator('#answer button:not(:disabled)').count(),0);
 await click('#grammar-help');await click('#grammar-back');await run(()=>check('wrong'));await click('#retry-now');await run(()=>check(session.qs[session.index].answer));assert.equal(await run(()=>session.score),1);
 // Ordered controls cannot change an already scored answer.
 await run(()=>{startSession(lesson1Modules[0]);session.index=3;renderQuestion();});await page.locator('[data-tile]').first().click();await click('#solution');assert.equal(await page.locator('#undo').isDisabled(),true);assert.equal(await page.locator('[data-tile]:not(:disabled)').count(),0);
 // Reading or an unplayed listening answer earns no new listening mastery.
 await run(()=>{const m=lesson1Modules[6];state.mastered=[];startSession(m);check(session.qs[0].answer);});assert.equal(await run(()=>session.score),0);assert.equal(await run(()=>state.mastered.length),0);
 // Synthetic speech verifies preference, turn sequencing, success tracking and visible errors.
 await run(()=>{Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{getVoices:()=>[{lang:'de-DE'},{lang:'de-AT'}],cancel(){},addEventListener(){},speak(u){window.lastVoice=u.lang;u.onstart?.();setTimeout(()=>u.onend?.(),1);}}});window.SpeechSynthesisUtterance=function(text){this.text=text;};showModule(lesson1Modules[6]);});
 await click('.transcript-toggle');await click('#play-dialogue');await page.waitForTimeout(150);assert.equal(await run(()=>window.lastVoice),'de-AT');
 await click('#practice');await page.locator('[data-say]').first().click();await page.waitForTimeout(30);await run(()=>check(session.qs[0].answer));assert.equal(await run(()=>session.score),1);
 await run(()=>{window.speechSynthesis.speak=u=>u.onerror({error:'network'});showModule(lesson1Modules[0]);});await click('#play-dialogue');assert.match(await page.locator('.speech-status').last().textContent(),/fehlgeschlagen/);
 await click('#home');await click('#revision-home');
 for(const id of ['chain','puzzle','alphabet','guess','vocab']){await click('[data-station="'+id+'"]');await noOverflow();}
 await click('[data-station="puzzle"]');await page.locator('#puzzle-answer').fill('Wie heißt du?');await click('#puzzle-form button');assert.match(await page.locator('#puzzle-feedback').textContent(),/Richtig/);
 await click('[data-station="alphabet"]');await page.locator('#alphabet-word').fill('<Wien>');await click('#alphabet-form button');assert.match(await page.locator('#alphabet-wall').textContent(),/<Wien>/);assert.equal(await page.locator('#alphabet-wall wien').count(),0);
 await click('[data-station="guess"]');await page.locator('#guess-person').selectOption('Max');await click('#guess-check');assert.match(await page.locator('#guess-feedback').textContent(),/Richtig/);
 await page.locator('#profile [name="name"]').fill('Anna');await page.locator('#profile [name="town"]').fill('Wien');await click('#profile button');assert.match(await page.locator('#profile-result').textContent(),/Lieblingsfarbe/);
 await click('#home');await click('#exam');assert.equal(await run(()=>session.qs.length),24);
 await run(()=>{while(session.index<session.qs.length){const q=session.qs[session.index];session.played=true;check(q.answer);session.index++;renderQuestion();}});assert.match(await page.locator('.score').textContent(),/24 \/ 24/);
 await click('#home');await page.getByRole('button',{name:'Start',exact:true}).click();await click('[data-module="names"]');await click('#practice');await run(()=>check(session.qs[0].answer));assert.equal(await run(()=>session.score),1);
 await page.setViewportSize({width:1280,height:900});await click('#quit');await lesson();await click('#grammar-home');await click('[data-grammar="verbs"]');await noOverflow();
 // Legacy migration and malformed storage are exercised in actual browser reloads.
 await run(()=>{localStorage.removeItem(KEY);localStorage.setItem('deutsch-start-v1',JSON.stringify({done:['names'],missed:['numbers-0']}));});await page.reload();assert.equal(await run(()=>state.done.includes('start:names')),true);
 await run(()=>localStorage.setItem(KEY,JSON.stringify({done:[null,7],mastered:[{}],missed:[false]})));await page.reload();assert.equal(await run(()=>state.done.length),0);
 assert.deepEqual(errors,[]);
 console.log('PASS: real Chromium, 151 answers, eight modules, six grammar topics, mobile/desktop layout, source viewer'+(imageFixture?' (fixture; source pixels not tested)':'')+', writing, revision games, assessment, controls, progress/reload/migration, speech preference/sequence/error, Start regression.');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

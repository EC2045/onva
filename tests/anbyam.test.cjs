const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname,'..');
vm.runInThisContext(fs.readFileSync(path.join(root,'vocabulary.js'),'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(root,'anbyam.js'),'utf8'));

test('all conversation examples use documented words and balanced clause boundaries',()=>{
 const alphabet=/^(?:!a|bya|sye|wo|yu|e|u|i|r|b|g|p|m|n|z|f|t|h|-)+$/;
 for(const phrase of VOCABULARY_DATA.phrases){
  let depth=0;
  for(const token of ANBYAM.tokenize(phrase.k)){
   assert.notEqual(token.type,'unknown',phrase.k+' / '+token.raw);
   if(token.type==='punctuation')continue;
   assert.match(token.raw,alphabet);
   if(['bya-t','bya-f'].includes(token.raw))depth++;
   if(token.raw==='bya-n')depth--;
   assert.ok(depth>=0,phrase.k);
  }
  assert.equal(depth,0,phrase.k);
 }
});
test('question, command, and relative-clause examples remain distinguishable',()=>{
 for(const [text,kind] of [
  ['yu i wo-wo?','question'],['wo-won i i-z-m?','question'],
  ['h-b wo n-te.','command'],['wo n-i.','command'],
  ['f-yu t-t wo.','statement'], // wo still means wide as an adjective.
  ['f-yu t-t f-bya bya-f sye ne-h-p wo-f bya-n.','statement'],
  ['sye !ann bya-t won h wo-f bya-n.','statement']
 ])assert.equal(ANBYAM.sentenceKind(ANBYAM.tokenize(text)),kind,text);
});
test('negation scope, modal ability and passive tense keep their meanings',()=>{
 assert.notEqual(ANBYAM.analyseWord('ti-n-wor').meaning,ANBYAM.analyseWord('n-ti-wor').meaning);
 assert.deepEqual(ANBYAM.analyseWord('n-ne-ep-!abh-p').parts.map(x=>x.raw),['n-','ne','-ep','-!abh','-p']);
 assert.equal(ANBYAM.analyseWord('n-h-te').category,'verbs');
 assert.equal(ANBYAM.analyseWord('won-p').type,'known');
 for(const word of ['ne-p-ep','i-e-p','i-u-!abh','mysterious','i<script>'])assert.equal(ANBYAM.analyseWord(word).type,'unknown',word);
});
test('punctuation and unknown input survive tokenization without reinterpretation',()=>{
 const text='sye m-i mystery, !anbyam?';
 assert.deepEqual(ANBYAM.tokenize(text).map(x=>x.raw),['sye','m-i','mystery',',','!anbyam','?']);
 assert.equal(ANBYAM.phrase(' sye   m-i m? ').m,'私は水を飲む。');
 assert.equal(ANBYAM.phrase('yu i wo-wo?'),null); // no invented phrase translation
});
test('number compounds agree with the converter from zero to 9999',()=>{
 const digits=['n-!a','t-i','p-u','r-e','z-h','m-!a','f-t','yu-i','h-t','n-wo'];
 for(let n=0;n<=9999;n++){
  let rem=n,words=[];
  for(const [val,key] of [[1000,'wo-t!a'],[100,'t-wo'],[10,'wo-t']]){
   const count=Math.floor(rem/val);if(count){words.push((count>1?digits[count]:'')+key);rem%=val;}
  }
  if(rem||!n)words.push(digits[rem]);
  assert.equal(words.reduce((sum,w)=>sum+ANBYAM.number(w),0),n);
 }
});
test('both lang files parse without duplicate keys and contain the revised grammar',()=>{
 for(const lang of ['ja','en']){
  const keys=new Set();
  for(const line of fs.readFileSync(path.join(root,'lang',lang+'.lang'),'utf8').split(/\r?\n/)){
   if(!line.trim()||/^[#;]/.test(line))continue;
   const split=line.indexOf('=');assert.ok(split>0);
   const key=line.slice(0,split);assert.ok(!keys.has(key),'duplicate '+lang+': '+key);keys.add(key);
  }
  assert.ok(keys.has('@conversation-grammar'));
 }
});

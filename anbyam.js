/* Shared strict word analysis. Unknown characters are never discarded. */
(function (root) {
    'use strict';
    const vocabulary = VOCABULARY_DATA;
    const dictionary = new Map();
    Object.entries(vocabulary).forEach(([category,list])=>{
        if(category==='phrases')return;
        list.forEach(entry=>{
            if(!dictionary.has(entry.k))dictionary.set(entry.k,[]);
            dictionary.get(entry.k).push({...entry,category});
        });
    });
    const suffixes = [
        ['ep','受け身','passive'],['u','進行','progressive'],
        ['!abh','完了','perfect'],['p','過去','past'],['e','未来','future']
    ];
    const verbs=new Set([...vocabulary.verbs.map(x=>x.k),'t-t']);
    const numberValues={'n-!a':0,'t-i':1,'p-u':2,'r-e':3,'z-h':4,'m-!a':5,'f-t':6,'yu-i':7,'h-t':8,'n-wo':9,'wo-t':10,'t-wo':100,'wo-t!a':1000};
    const numberKeys=Object.keys(numberValues).sort((a,b)=>b.length-a.length);
    function number(word) {
        let rest=word,parts=[];
        while(rest) {
            const key=numberKeys.find(k=>rest.startsWith(k));
            if(!key)return null;
            parts.push(numberValues[key]);rest=rest.slice(key.length);
        }
        if(!parts.length)return null;
        let total=0;
        for(let i=0;i<parts.length;i++) {
            if(parts[i]<10 && parts[i+1]>=10)total+=parts[i++]*parts[i];
            else total+=parts[i];
        }
        return total;
    }
    function verb(word) {
        // Strip in reverse of the documented voice/aspect/tense order.
        for(const tense of ['', '-p','-e'])for(const aspect of ['', '-u','-!abh'])for(const voice of ['', '-ep']) {
            const ending=voice+aspect+tense;
            if(ending && !word.endsWith(ending))continue;
            const stem=ending?word.slice(0,-ending.length):word;
            if(!verbs.has(stem))continue;
            const base=dictionary.get(stem)?.find(x=>x.category==='verbs')||dictionary.get(stem)?.[0];
            const parts=[{raw:stem,meaning:base?.m||stem,en:base?.en||stem}];
            [voice,aspect,tense].filter(Boolean).forEach(form=>{
                const suffix=suffixes.find(x=>'-'+x[0]===form);
                parts.push({raw:form,meaning:suffix[1],en:suffix[2]});
            });
            return {parts,category:'verbs',stem,voice,aspect,tense};
        }
        return null;
    }
    function analyseWord(raw) {
        const word=raw.toLowerCase();
        const entries=dictionary.get(word);
        if(entries)return {raw,type:'known',entries,category:entries[0].category,meaning:entries.map(x=>x.m).join(' / '),en:entries.map(x=>x.en||x.m).join(' / ')};
        // Prefix scope is recursive: ti-n-wor and n-ti-wor stay distinct.
        for(const [prefix,meaning,en] of [['n-','否定','not'],['ti-','〜すること','act of']]) {
            if(word.startsWith(prefix)) {
                const inner=analyseWord(word.slice(prefix.length));
                if(inner.type==='unknown')continue;
                return {raw,type:'morpheme',category:prefix==='ti-'?'nouns':inner.category,parts:[{raw:prefix,meaning,en},...(inner.parts||[{raw:inner.raw,meaning:inner.meaning,en:inner.en}])],meaning:meaning+' + '+inner.meaning,en:en+' + '+inner.en};
            }
        }
        const parsed=verb(word);
        if(parsed)return {raw,type:'morpheme',...parsed,meaning:parsed.parts.map(x=>x.meaning).join(' + '),en:parsed.parts.map(x=>x.en).join(' + ')};
        const value=number(word);
        if(value!==null)return {raw,type:'known',category:'numbers',meaning:String(value),en:String(value),value};
        return {raw,type:'unknown',category:'unknown',meaning:'未登録の語：'+raw,en:'Unknown word: '+raw};
    }
    function tokenize(text) {
        return (text.match(/[^\s.,?。？！;:]+|[.,?。？！;:]/g)||[]).flatMap(raw=>{
            if(raw.endsWith('!') && raw.length>1)return [analyseWord(raw.slice(0,-1)),{raw:'!',type:'punctuation',meaning:'!',en:'!'}];
            if(/^[.,?。？！;:!]$/.test(raw))return [{raw,type:'punctuation',meaning:raw,en:raw}];
            return [analyseWord(raw)];
        });
    }
    function normalize(text) {return text.trim().toLowerCase().replace(/[.,?。？！;:]/g,' ').replace(/!(?=\s|$)/g,' ').replace(/\s+/g,' ').trim();}
    function phrase(text) {return vocabulary.phrases.find(p=>normalize(p.k)===normalize(text))||null;}
    function sentenceKind(tokens) {
        let depth=0;const main=[];
        for(const token of tokens) {
            if(['bya-t','bya-f'].includes(token.raw)){depth++;continue;}
            if(token.raw==='bya-n'){depth--;continue;}
            if(depth===0 && token.type!=='punctuation')main.push(token.raw);
        }
        if(main[0]==='wo'||(main[0]==='h-b'&&main[1]==='wo'))return 'command';
        if(main.includes('wo-wo')||main.some(x=>['wo-f','wo-won','wo-z','wo-eti','wo-n!ag','wo-ritt'].includes(x)))return 'question';
        return 'statement';
    }
    root.ANBYAM={analyseWord,tokenize,normalize,phrase,sentenceKind,number};
})(typeof window==='undefined'?globalThis:window);

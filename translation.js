(function () {
    'use strict';
    const input=document.getElementById('onva-input');
    let request=null,timer=null;
    const english=()=>document.documentElement.lang==='en';
    const meaning=t=>english()?t.en:t.meaning;
    function preview(text) {
        const area=document.getElementById('live-preview');area.textContent=text;
        delete area.dataset.processed;window.renderOnva?.();
    }
    function tokenCard(token) {
        const card=document.createElement('span');
        card.className=token.type==='unknown'?'token-unknown':'token-known';
        const symbol=document.createElement('span');symbol.className='onva text-lg';symbol.textContent=token.raw;
        const latin=document.createElement('code');latin.textContent=token.raw;
        const gloss=document.createElement('span');gloss.className='text-xs';gloss.textContent=meaning(token);
        card.append(symbol,latin,gloss);return card;
    }
    async function translateOnva() {
        request?.abort();request=null;
        const text=input.value.trim();
        document.getElementById('results-area').classList.toggle('hidden',!text);
        if(!text)return;
        const tokens=ANBYAM.tokenize(text),match=ANBYAM.phrase(text);
        const display=document.getElementById('token-display');display.replaceChildren(...tokens.map(tokenCard));
        const detail=document.getElementById('detail-table');detail.replaceChildren();
        tokens.forEach((token,i)=>{
            const row=document.createElement('div');row.className='p-4 bg-white rounded-2xl border border-slate-100';
            const title=document.createElement('code');title.textContent=(i+1)+'. '+token.raw;
            const gloss=document.createElement('p');gloss.textContent=meaning(token);
            row.append(title,gloss);
            if(token.parts) {
                const parts=document.createElement('p');parts.className='text-xs text-slate-500';
                parts.textContent=token.parts.map(p=>p.raw+' = '+(english()?p.en:p.meaning)).join(' / ');row.append(parts);
            }
            detail.append(row);
        });
        window.renderOnva?.();
        const hint=document.getElementById('phrase-hint');hint.classList.toggle('hidden',!match);
        document.getElementById('phrase-hint-text').textContent=match?(english()?match.en:match.m):'';
        const output=document.getElementById('translation-output');
        if(match){output.textContent=english()?match.en:match.m;return;}
        const kind=ANBYAM.sentenceKind(tokens);
        const labels=english()?{statement:'Statement',question:'Question',command:'Command/request'}:{statement:'平叙文',question:'疑問文',command:'命令・依頼'};
        const gloss=labels[kind]+' · '+tokens.map(meaning).join(' ｜ ');
        output.textContent=(english()?'Dictionary gloss (not a complete translation): ':'語釈（文章全体の訳ではありません）：')+gloss;
        if(tokens.some(t=>t.type==='unknown'))return;
        // Retain the existing translation service, with the current rules as context.
        const controller=new AbortController();request=controller;
        const timeout=setTimeout(()=>controller.abort(),8000);
        try {
            const grammar=document.getElementById('translation-rules').textContent;
            const response=await fetch('https://onvaapi.tadoris-e.com/translate',{
                method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,
                body:JSON.stringify({original:text,text:grammar+'\n'+JSON.stringify(tokens)+'\n'+gloss})
            });
            if(!response.ok)throw new Error('Translation service: '+response.status);
            const data=await response.json();
            if(!controller.signal.aborted && data.translation && typeof data.translation==='string')output.textContent=data.translation;
        }catch(error){if(error.name!=='AbortError')console.warn('Translation service unavailable; dictionary analysis remains available.');}
        finally{clearTimeout(timeout);if(request===controller)request=null;}
    }
    window.translateOnva=translateOnva;
    input.addEventListener('input',()=>{request?.abort();preview(input.value);clearTimeout(timer);timer=setTimeout(translateOnva,300);});
    input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();clearTimeout(timer);translateOnva();}});
    const examples=document.getElementById('examples-grid');
    VOCABULARY_DATA.phrases.forEach(phrase=>{
        const card=document.createElement('button');card.type='button';card.className='grammar-card text-left';
        const symbol=document.createElement('div');symbol.className='onva text-xl';symbol.textContent=phrase.k;
        const spelling=document.createElement('code');spelling.textContent=phrase.k;
        const translation=document.createElement('p');translation.textContent=phrase.m;
        card.append(symbol,spelling,translation);
        card.addEventListener('click',()=>{input.value=phrase.k;preview(phrase.k);clearTimeout(timer);translateOnva();window.scrollTo({top:0,behavior:'smooth'});});
        examples.append(card);
    });
    window.addEventListener('site-language-change',()=>{if(input.value.trim())translateOnva();});
    preview(input.value);
})();

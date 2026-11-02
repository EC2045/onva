(function () {
    'use strict';
    const BASE_URL = 'https://ec2045.github.io/byam_letters/';
    const WHITE_BASE_URL = BASE_URL + 'white_letters/';
    const letters = [
        ['!a','ア゛','png'], ['e','エ','png'], ['u','ウ','png'], ['wo','ヲ','png'],
        ['i','イ','png'], ['yu','ユ','png'], ['r','R','svg'], ['b','B','svg'],
        ['g','G','svg'], ['p','P','svg'], ['bya','ビャ','svg'], ['m','M','svg'],
        ['n','ン','svg'], ['z','Z','svg'], ['sye','シェ','svg'], ['f','F','svg'],
        ['t','T','svg'], ['h','H','svg'], ['-','-','svg']
    ].sort((a,b)=>b[0].length-a[0].length);
    function process(el) {
        const source = el.textContent.trim();
        if (!source) return;
        const white = !!el.closest('.onva-white');
        const italic = el.matches('.onva-i,.onva-ri');
        const reading = el.matches('.onva-r,.onva-ri');
        const container = document.createElement('span');
        container.className = 'onva-container';
        const images = document.createElement('span');
        images.className = 'onva-images';
        images.setAttribute('aria-hidden','true');
        let label = '';
        source.split(/(\s+)/).forEach(word=>{
            if (/^\s+$/.test(word)) {
                const space = document.createElement('span');
                space.className = 'onva-space'; space.textContent = ' ';
                images.append(space); label += ' '; return;
            }
            const group = document.createElement('span'); group.className = 'onva-word';
            let i=0;
            while(i<word.length) {
                const letter = letters.find(([key])=>word.startsWith(key,i));
                if (!letter) {
                    const literal = document.createElement('span');
                    literal.className = 'onva-literal'; literal.textContent = word[i];
                    group.append(literal); label += word[i]; i++; continue;
                }
                const [key, sound, extension] = letter;
                const img = document.createElement('img');
                img.className = 'byam-glyph' + (key==='-'?' byam-hyphen':'');
                img.alt = key; img.crossOrigin = 'anonymous';
                img.src = (white?WHITE_BASE_URL:BASE_URL) + key + '.' + extension;
                // Inline size keeps the renderer usable in other repositories too.
                img.style.cssText = 'height:1em;width:auto;display:inline-block;margin:0 .035em;vertical-align:middle;';
                if (italic) img.style.transform = 'skewX(-14deg)';
                img.addEventListener('error',()=>{
                    const fallback=document.createElement('span');
                    fallback.className='onva-literal';fallback.textContent=key;img.replaceWith(fallback);
                },{once:true});
                group.append(img); label += sound; i += key.length;
            }
            images.append(group);
        });
        container.append(images);
        if(reading) {
            const caption=document.createElement('span'); caption.className='onva-label';
            caption.textContent=label; container.append(caption);
        }
        el.replaceChildren(container);
        el.dataset.processed='true'; el.dataset.onvaSource=source;
        el.setAttribute('aria-label',source); el.setAttribute('translate','no');
        el.setAttribute('role','img');
    }
    function init() {
        document.querySelectorAll('.onva,.onva-r,.onva-i,.onva-ri').forEach(el=>{
            if(!el.dataset.processed)process(el);
        });
    }
    window.renderOnva=init;
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
    init();
})();

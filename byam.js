(function () {
    const BASE_URL = "https://rits1019c1.github.io/byam_letters/";

    // 文字データ定義
    const onvaData = [
        { key: "!a", label: "ア゛", ext: "png" },
        { key: "e", label: "エ", ext: "png" },
        { key: "u", label: "ウ", ext: "png" },
        { key: "wo", label: "ヲ", ext: "png" },
        { key: "i", label: "イ", ext: "png" },
        { key: "yu", label: "ユ", ext: "png" },
        { key: "r", label: "R", ext: "svg" },
        { key: "b", label: "B", ext: "svg" },
        { key: "g", label: "G", ext: "svg" },
        { key: "p", label: "P", ext: "svg" },
        { key: "bya", label: "ビャ", ext: "svg" },
        { key: "m", label: "M", ext: "svg" },
        { key: "n", label: "ン", ext: "svg" },
        { key: "z", label: "Z", ext: "svg" },
        { key: "sye", label: "シェ", ext: "svg" },
        { key: "ge", label: "ゲ", ext: "svg" },
        { key: "t", label: "T", ext: "svg" },
        { key: "h", label: "H", ext: "svg" },
        { key: "-", label: "-", ext: "svg" }
    ];

    // 長いキー順にソート（最長一致用）
    const sortedData = [...onvaData].sort((a, b) => b.key.length - a.key.length);

    function getImgUrl(key) {
        const item = onvaData.find(d => d.key === key);
        const ext = item ? item.ext : "svg";
        return `${BASE_URL}${key}.${ext}`;
    }

    function createImgHtml(key) {
        const item = onvaData.find(d => d.key === key);
        if (item && item.composite) {
            return item.composite.map(k => createImgHtml(k)).join('');
        }
        const url = getImgUrl(key);
        
        let style = "height:1em; vertical-align:middle; display:inline-block; margin:0 0.05em;";
        if (key === "-") {
            // 極端に控えめなスタイル
            style = "height:0.3em; width:0.2em; vertical-align:middle; display:inline-block; margin:0 0.1em; object-fit:contain; opacity:0.6;";
        }
        
        return `<img src="${url}" alt="${key}" style="${style}">`;
    }

    function processElement(el, showReading) {
        const text = el.textContent.trim();
        if (!text) return;

        const words = text.split(/\s+/);
        let finalHtml = '<span class="onva-container" style="display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle;">';
        let imagePart = '<span class="onva-images" style="display:flex; align-items:center; flex-wrap:wrap;">';
        let labelText = '';

        words.forEach((word, wordIdx) => {
            let currentIdx = 0;
            while (currentIdx < word.length) {
                let matched = false;
                for (let item of sortedData) {
                    if (word.startsWith(item.key, currentIdx)) {
                        imagePart += createImgHtml(item.key);
                        labelText += item.label;
                        currentIdx += item.key.length;
                        matched = true;
                        break;
                    }
                }
                if (!matched) currentIdx++;
            }
            if (wordIdx < words.length - 1) {
                imagePart += '<span style="width:0.5em; display:inline-block;"></span>';
                labelText += ' ';
            }
        });
        imagePart += '</span>';

        if (showReading) {
            finalHtml += imagePart + `<span class="onva-label" style="font-size:0.6em; color:#666; margin-top:2px; font-weight:bold;">${labelText}</span>`;
            finalHtml += '</span>';
            el.innerHTML = finalHtml;
        } else {
            el.innerHTML = imagePart;
        }
    }

    function init() {
        document.querySelectorAll('.onva').forEach(el => {
            if (!el.dataset.processed) {
                processElement(el, false);
                el.dataset.processed = "true";
            }
        });

        document.querySelectorAll('.onva-r').forEach(el => {
            if (!el.dataset.processed) {
                processElement(el, true);
                el.dataset.processed = "true";
            }
        });
    }

    // グローバルスコープ（window）に公開する
    window.renderOnva = init;
    init();
})();

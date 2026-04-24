(function () {
    const BASE_URL = "https://ec2045.github.io/byam_letters/";
    const WHITE_BASE_URL = "https://ec2045.github.io/byam_letters/white_letters/";
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

    function getImgUrl(key, isWhite = false) {
        const item = onvaData.find(d => d.key === key);
        const ext = item ? item.ext : "svg";
        const base = isWhite ? WHITE_BASE_URL : BASE_URL;
        return `${base}${key}.${ext}`;
    }

    function createImgHtml(key, isWhite = false, isItalic = false) {
        const item = onvaData.find(d => d.key === key);
        if (item && item.composite) {
            return item.composite.map(k => createImgHtml(k, isWhite, isItalic)).join('');
        }
        const url = getImgUrl(key, isWhite);

        // イタリック（斜め）モード: skewX で傾ける
        const italicStyle = isItalic ? " transform:skewX(-14deg); transform-origin:bottom center;" : "";

        let style = `height:1em; vertical-align:middle; display:inline-block; margin:0 0.05em;${italicStyle}`;
        if (key === "-") {
            style = `height:0.9em; width:0.8em; vertical-align:middle; display:inline-block; margin:0 0.05em; object-fit:contain;${italicStyle}`;
        }

        return `<img src="${url}" alt="${key}" style="${style}" crossorigin="anonymous">`;
    }

    function processElement(el, showReading, isItalic = false) {
        const text = el.textContent.trim();
        if (!text) return;

        const isWhite = el.classList.contains('onva-white') || !!el.closest('.onva-white');
        const words = text.split(/\s+/);

        // イタリックモードではコンテナ全体を少し傾ける（padding で余白確保）
        const containerStyle = isItalic
            ? "display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle; padding: 0 0.15em;"
            : "display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle;";

        let finalHtml = `<span class="onva-container" style="${containerStyle}">`;
        let imagePart = '<span class="onva-images" style="display:flex; align-items:center; flex-wrap:nowrap;">';
        let labelText = '';

        words.forEach((word, wordIdx) => {
            let currentIdx = 0;
            while (currentIdx < word.length) {
                let matched = false;
                for (let item of sortedData) {
                    if (word.startsWith(item.key, currentIdx)) {
                        imagePart += createImgHtml(item.key, isWhite, isItalic);
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
        // 通常モード (.onva)
        document.querySelectorAll('.onva').forEach(el => {
            if (!el.dataset.processed) {
                processElement(el, false);
                el.dataset.processed = "true";
            }
        });

        // 通常 + 読み (.onva-r)
        document.querySelectorAll('.onva-r').forEach(el => {
            if (!el.dataset.processed) {
                processElement(el, true);
                el.dataset.processed = "true";
            }
        });

        // イタリック（斜め）モード (.onva-i) — 人物名など固有名詞向け
        document.querySelectorAll('.onva-i').forEach(el => {
            if (!el.dataset.processed) {
                processElement(el, false, true);
                el.dataset.processed = "true";
            }
        });

        // イタリック + 読み (.onva-ri)
        document.querySelectorAll('.onva-ri').forEach(el => {
            if (!el.dataset.processed) {
                processElement(el, true, true);
                el.dataset.processed = "true";
            }
        });
    }

    // グローバルスコープ（window）に公開する
    window.renderOnva = init;
    init();
})();

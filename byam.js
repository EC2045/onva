<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onva タイピング & 暗記カード</title>
    <!-- Tailwind CSS for styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .onva-images img {
            height: 100px !important;
            margin: 0 5px;
        }
        .correct-anim {
            animation: bounce 0.5s;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .fade-out {
            opacity: 0.5;
            transition: opacity 0.3s;
        }
        .hidden { display: none; }
        
        /* カードの裏返りアニメーション用 */
        .card-container {
            perspective: 1000px;
        }
        .card-inner {
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
            position: relative;
            width: 100%;
            height: 16rem;
        }
        /* 裏返り状態 */
        .card-flipped .card-inner {
            transform: rotateY(180deg);
        }
        .card-face {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 1rem;
            border-width: 2px;
        }
        .card-front {
            background-color: #f8fafc;
            border-color: #e2e8f0;
            z-index: 2;
        }
        .card-back {
            background-color: #eff6ff;
            border-color: #bfdbfe;
            transform: rotateY(180deg);
            z-index: 1;
        }

        .answer-visible {
            opacity: 1;
            transition: opacity 0.2s ease-in;
        }

        /* スイッチのスタイル */
        .toggle-dot {
            transition: transform 0.2s ease-in-out;
        }
        input:checked ~ .toggle-dot {
            transform: translateX(100%);
        }
        input:checked ~ .toggle-bg {
            background-color: #3b82f6;
        }
    </style>
</head>
<body class="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-4">

    <!-- モード・ステージ選択メニュー -->
    <div id="menuScreen" class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 class="text-blue-500 font-black text-3xl italic uppercase tracking-tighter mb-2">Onva Master</h1>
        
        <div class="mb-6">
            <p class="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-4">Step 1: Select Mode</p>
            <div class="flex gap-2 p-1 bg-slate-100 rounded-xl">
                <button id="modeQuiz" onclick="setMode('quiz')" class="flex-1 py-2 rounded-lg font-bold text-sm transition-all bg-white shadow-sm text-blue-600">Typing Quiz</button>
                <button id="modeFlash" onclick="setMode('flash')" class="flex-1 py-2 rounded-lg font-bold text-sm transition-all text-slate-500">Flashcards</button>
            </div>
        </div>

        <div class="mb-8 flex items-center justify-between px-2 py-3 bg-slate-50 rounded-xl border border-slate-100">
            <div class="text-left">
                <div class="text-slate-600 font-bold text-xs">Auto Level Up</div>
                <div class="text-slate-400 text-[9px] uppercase">正解時に自動でレベルを上げる</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="autoLevelToggle" class="sr-only" checked onchange="toggleAutoLevel()">
                <div class="toggle-bg w-10 h-5 bg-slate-200 rounded-full transition-colors"></div>
                <div class="toggle-dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full shadow-sm border border-slate-200"></div>
            </label>
        </div>

        <p class="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-4">Step 2: Select Level</p>
        <div class="grid grid-cols-1 gap-2">
            <button onclick="startGame(1)" class="py-3 bg-slate-50 hover:bg-blue-50 border-2 border-slate-100 hover:border-blue-200 rounded-xl transition-all text-left px-6">
                <div class="text-blue-600 font-bold text-sm">LEVEL 1</div>
                <div class="text-slate-400 text-[10px] uppercase">最初の5文字 (1文字ずつ)</div>
            </button>
            <button onclick="startGame(2)" class="py-3 bg-slate-50 hover:bg-blue-50 border-2 border-slate-100 hover:border-blue-200 rounded-xl transition-all text-left px-6">
                <div class="text-blue-600 font-bold text-sm">LEVEL 2</div>
                <div class="text-slate-400 text-[10px] uppercase">最初の8文字 (1〜2文字)</div>
            </button>
            <button onclick="startGame(3)" class="py-3 bg-slate-50 hover:bg-blue-50 border-2 border-slate-100 hover:border-blue-200 rounded-xl transition-all text-left px-6">
                <div class="text-blue-600 font-bold text-sm">LEVEL 3</div>
                <div class="text-slate-400 text-[10px] uppercase">最初の12文字 (1〜3文字)</div>
            </button>
            <button onclick="startGame(4)" class="py-3 bg-slate-50 hover:bg-blue-50 border-2 border-slate-100 hover:border-blue-200 rounded-xl transition-all text-left px-6">
                <div class="text-blue-600 font-bold text-sm">LEVEL 4</div>
                <div class="text-slate-400 text-[10px] uppercase">最初の18文字 (1〜3文字)</div>
            </button>
        </div>
    </div>

    <!-- クイズ画面 -->
    <div id="quizScreen" class="hidden bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center transition-all">
        <div class="flex justify-between items-center mb-4">
            <div class="text-left">
                <div class="flex items-center gap-2">
                    <div class="text-blue-500 font-black text-xl italic uppercase tracking-tighter">LV.<span class="levelLabel">1</span></div>
                    <span id="lockIcon" class="hidden text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
                <div class="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div class="levelProgress h-full bg-blue-400 transition-all duration-300" style="width: 0%"></div>
                </div>
            </div>
            <button onclick="backToMenu()" class="text-slate-300 hover:text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-100 px-2 py-1 rounded">Menu</button>
        </div>

        <div class="queueBadge hidden bg-orange-100 text-orange-600 text-[10px] px-2 py-1 rounded-full font-bold inline-block mb-4 uppercase">Retry Queued</div>

        <div class="h-40 flex flex-col items-center justify-center mb-8 border-b border-slate-100">
            <span class="targetDisplay onva text-5xl"></span>
            <div class="answerHint text-red-500 font-mono font-bold mt-4 h-6 text-sm"></div>
        </div>

        <div class="space-y-4">
            <input type="text" id="answerInput" 
                class="w-full border-2 border-slate-200 rounded-lg py-3 px-4 text-2xl text-center focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Type here..." autocomplete="off">
            <button id="passButton" class="w-full bg-slate-50 hover:bg-slate-100 text-slate-400 font-bold py-2 rounded-lg transition-colors text-xs border border-slate-100">
                PASS / 答えを表示 (Esc)
            </button>
            <div class="feedback h-6 font-bold uppercase text-sm tracking-widest"></div>
        </div>
    </div>

    <!-- 暗記カード画面 -->
    <div id="flashcardScreen" class="hidden bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center transition-all">
        <div class="flex justify-between items-center mb-4">
            <div class="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Flashcard Mode</div>
            <button onclick="backToMenu()" class="text-slate-300 hover:text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-100 px-2 py-1 rounded">Menu</button>
        </div>

        <div id="cardTrigger" class="card-container cursor-pointer mb-8" onclick="handleCardFlip()">
            <div class="card-inner" id="cardInner">
                <div class="card-face card-front">
                    <span class="targetDisplay onva text-5xl"></span>
                </div>
                <div class="card-face card-back flex-col" id="cardBackContent"></div>
            </div>
        </div>

        <div class="space-y-2">
            <p id="flashInstruction" class="text-slate-400 text-[10px] leading-relaxed">
                カードをクリックするか <span class="font-bold">Space</span> で答えを確認
            </p>
            <div class="text-slate-300 text-[9px] uppercase tracking-widest flex items-center justify-center gap-1">
                Level <span class="levelLabel">1</span>
                <span class="autoLevelBadge hidden bg-blue-100 text-blue-500 px-1 rounded-[2px] lowercase">Auto</span>
            </div>
        </div>
    </div>

    <!-- byam.js -->
    <script src="https://rits1019c1.github.io/onva/byam.js"></script>

    <script>
        const onvaData = [
            { key: "!a", label: "ア゛", ext: "png" }, { key: "e", label: "エ", ext: "png" },
            { key: "u", label: "ウ", ext: "png" }, { key: "wo", label: "ヲ", ext: "png" },
            { key: "i", label: "イ", ext: "png" }, { key: "yu", label: "ユ", ext: "png" },
            { key: "r", label: "R", ext: "svg" }, { key: "b", label: "B", ext: "svg" },
            { key: "g", label: "G", ext: "svg" }, { key: "p", label: "P", ext: "svg" },
            { key: "bya", label: "ビャ", ext: "svg" }, { key: "m", label: "M", ext: "svg" },
            { key: "n", label: "ン", ext: "svg" }, { key: "z", label: "Z", ext: "svg" },
            { key: "sye", label: "シェ", ext: "svg" }, { key: "ge", label: "ゲ", ext: "svg" },
            { key: "t", label: "T", ext: "svg" }, { key: "h", label: "H", ext: "svg" },
            { key: "-", label: "-", ext: "svg" }
        ];

        let gameMode = 'quiz'; 
        let currentKeyAnswer = "";
        let usedQuestions = [];
        let retryQueue = []; 
        let score = 0;
        let level = 1;
        let isTransitioning = false;
        let isFlipped = false;
        let autoLevelUp = true;

        const screens = {
            menu: document.getElementById('menuScreen'),
            quiz: document.getElementById('quizScreen'),
            flash: document.getElementById('flashcardScreen')
        };

        document.getElementById('cardInner').addEventListener('transitionend', () => {
            if (isFlipped) {
                const back = document.getElementById('cardBackContent');
                back.innerHTML = `
                    <div class="text-blue-400 text-[10px] font-bold uppercase mb-2">Answer</div>
                    <div class="text-blue-600 font-mono font-bold text-4xl answer-visible">${currentKeyAnswer}</div>
                `;
            }
        });

        function setMode(mode) {
            gameMode = mode;
            document.getElementById('modeQuiz').className = mode === 'quiz' ? 'flex-1 py-2 rounded-lg font-bold text-sm transition-all bg-white shadow-sm text-blue-600' : 'flex-1 py-2 rounded-lg font-bold text-sm transition-all text-slate-500';
            document.getElementById('modeFlash').className = mode === 'flash' ? 'flex-1 py-2 rounded-lg font-bold text-sm transition-all bg-white shadow-sm text-blue-600' : 'flex-1 py-2 rounded-lg font-bold text-sm transition-all text-slate-500';
        }

        function toggleAutoLevel() {
            autoLevelUp = document.getElementById('autoLevelToggle').checked;
        }

        function startGame(selectedLevel) {
            level = selectedLevel;
            score = (level - 1) * 5;
            usedQuestions = [];
            retryQueue = [];
            isFlipped = false;
            
            screens.menu.classList.add('hidden');
            screens[gameMode].classList.remove('hidden');

            // レベル固定アイコンの表示制御
            document.getElementById('lockIcon').classList.toggle('hidden', autoLevelUp);
            document.querySelectorAll('.autoLevelBadge').forEach(el => el.classList.toggle('hidden', !autoLevelUp));
            
            generateQuestion();
        }

        function backToMenu() {
            Object.values(screens).forEach(s => s.classList.add('hidden'));
            screens.menu.classList.remove('hidden');
        }

        function generateQuestion() {
            isTransitioning = false;
            isFlipped = false;
            const container = document.getElementById('cardTrigger');
            const back = document.getElementById('cardBackContent');
            const flashInstruction = document.getElementById('flashInstruction');
            
            if(back) back.innerHTML = "";
            if(container) container.classList.remove('card-flipped');
            if(flashInstruction) flashInstruction.innerHTML = 'カードをクリックするか <span class="font-bold">Space</span> で答えを確認';

            document.querySelectorAll('.answerHint, .feedback').forEach(el => el.textContent = "");
            document.querySelectorAll('.targetDisplay').forEach(el => {
                el.classList.remove('fade-out', 'correct-anim');
                delete el.dataset.processed;
            });
            
            const input = document.getElementById('answerInput');
            if(input) {
                input.value = "";
                input.disabled = false;
                input.focus();
            }

            document.querySelectorAll('.levelLabel').forEach(el => el.textContent = level);
            const progress = (score % 5) / 5 * 100;
            document.querySelectorAll('.levelProgress').forEach(el => el.style.width = `${progress}%`);

            retryQueue.forEach(q => { if(q.wait > 0) q.wait--; });
            let questionKey = "";
            const availableRetryIndex = retryQueue.findIndex(q => q.wait === 0);

            if (availableRetryIndex !== -1 && Math.random() > 0.3) {
                questionKey = retryQueue[availableRetryIndex].key;
                retryQueue.splice(availableRetryIndex, 1);
            } else {
                let attempts = 0;
                while (attempts < 50) {
                    let keys = [];
                    let charLimit = level === 1 ? 5 : level === 2 ? 8 : level === 3 ? 12 : 18;
                    let maxChars = level === 1 ? 1 : level === 2 ? 2 : 3;
                    let count = maxChars === 1 ? 1 : Math.floor(Math.random() * maxChars) + 1;

                    for (let i = 0; i < count; i++) {
                        keys.push(onvaData[Math.floor(Math.random() * charLimit)].key);
                    }
                    questionKey = keys.join("");
                    if (!usedQuestions.includes(questionKey)) break;
                    attempts++;
                }
            }

            document.querySelectorAll('.queueBadge').forEach(el => el.classList.toggle('hidden', retryQueue.length === 0));
            usedQuestions.push(questionKey);
            if (usedQuestions.length > 10) usedQuestions.shift();

            currentKeyAnswer = questionKey;
            document.querySelectorAll('.targetDisplay').forEach(el => el.textContent = currentKeyAnswer);

            if (window.renderOnva) window.renderOnva();
        }

        function handleCardFlip() {
            if(isTransitioning) return;
            const container = document.getElementById('cardTrigger');
            const flashInstruction = document.getElementById('flashInstruction');
            
            if(!isFlipped) {
                isFlipped = true;
                container.classList.add('card-flipped');
                if(flashInstruction) flashInstruction.innerHTML = 'もう一度押して <span class="font-bold text-blue-500">次のカード</span> へ';
            } else {
                isTransitioning = true;
                // 暗記モードでもスコア（進捗）をカウント
                score++;
                if (autoLevelUp && Math.floor(score / 5) + 1 > level) level++;
                generateQuestion();
            }
        }

        function passQuestion() {
            if (!currentKeyAnswer || isTransitioning) return;
            isTransitioning = true;
            if (!retryQueue.some(q => q.key === currentKeyAnswer)) {
                retryQueue.push({ key: currentKeyAnswer, wait: 2 });
            }
            document.querySelector('.answerHint').textContent = `ANSWER: ${currentKeyAnswer}`;
            document.querySelector('.targetDisplay').classList.add('fade-out');
            setTimeout(generateQuestion, 1200);
        }

        document.getElementById('answerInput').addEventListener('input', (e) => {
            if (e.target.value === currentKeyAnswer) {
                isTransitioning = true;
                score++;
                // オートレベルアップ設定がオンの場合のみレベルアップ
                if (autoLevelUp && Math.floor(score / 5) + 1 > level) level++;
                document.querySelector('.feedback').textContent = "GOOD!";
                document.querySelector('.targetDisplay').classList.add('correct-anim');
                setTimeout(generateQuestion, 600);
            }
        });

        document.getElementById('passButton').addEventListener('click', passQuestion);

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && gameMode === 'quiz') passQuestion();
            if (e.key === ' ' || e.key === 'Enter') {
                if(gameMode === 'flash') {
                    e.preventDefault();
                    handleCardFlip();
                }
            }
        });
    </script>
</body>
</html>

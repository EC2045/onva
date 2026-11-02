// Canonical lexicon and conversation examples: Anbyam revision 2.
const VOCABULARY_DATA = {
    "grammar": [
        {
            "k": "t-t",
            "m": "[助動詞] ＝/は/である（コピュラ）",
            "en": "be / equal (copula)"
        },
        {
            "k": "wo",
            "m": "[文法] 命令標識（文頭）。疑問には wo-wo / wo-f / wo-won を使う",
            "en": "command marker (initial); use wo-wo / wo-f / wo-won for questions"
        },
        {
            "k": "ep",
            "m": "[接尾辞] 〜される（受け身）",
            "en": "passive suffix"
        },
        {
            "k": "p",
            "m": "[接尾辞] 〜した（過去）",
            "en": "past suffix"
        },
        {
            "k": "t-tr",
            "m": "[接続詞] そのため/だから",
            "en": "therefore / so"
        },
        {
            "k": "n",
            "m": "[接頭辞/形容詞] 否定/無/悪",
            "en": "negation / absence / bad"
        },
        {
            "k": "wo-wo",
            "m": "[終助詞] はい／いいえで答える疑問文の文末",
            "en": "yes/no question marker (sentence-final)"
        },
        {
            "k": "ti-",
            "m": "[接頭辞] 動詞句の名詞化。後ろの目的語・場所も含む",
            "en": "nominalizer for a verb phrase"
        },
        {
            "k": "bya-t",
            "m": "[助詞] 内容節の開始（〜ということ）",
            "en": "opens a content clause"
        },
        {
            "k": "bya-n",
            "m": "[助詞] 内容節・関係節の終わり",
            "en": "closes a content or relative clause"
        },
        {
            "k": "bya-f",
            "m": "[助詞] 直前の名詞を説明する関係節の開始",
            "en": "opens a relative clause modifying the preceding noun"
        },
        {
            "k": "yu-h",
            "m": "[助詞] 所有・所属：物 yu-h 所有者",
            "en": "possession: thing yu-h owner"
        },
        {
            "k": "z-e",
            "m": "[前置詞] 〜で／〜に（場所）",
            "en": "at / in (location)"
        },
        {
            "k": "te-z",
            "m": "[前置詞] 〜へ（行き先）",
            "en": "to (destination)"
        },
        {
            "k": "ti-z",
            "m": "[前置詞] 〜から（出発点）",
            "en": "from (source)"
        },
        {
            "k": "yu-e",
            "m": "[前置詞] 〜に（受け手）",
            "en": "to (recipient)"
        },
        {
            "k": "yu-r",
            "m": "[接続詞] 〜と／そして",
            "en": "and"
        },
        {
            "k": "n-p",
            "m": "[接続詞] しかし／でも",
            "en": "but"
        },
        {
            "k": "!abu",
            "m": "[接続詞] もし〜なら（条件節）、後ろに t-tr で結果を続ける",
            "en": "if; use t-tr to introduce the result"
        },
        {
            "k": "eti-z",
            "m": "[前置詞] 〜に（時点）",
            "en": "at / on (time)"
        },
        {
            "k": "-e",
            "m": "[接尾辞] 未来",
            "en": "future suffix"
        },
        {
            "k": "-u",
            "m": "[接尾辞] 進行",
            "en": "progressive suffix"
        },
        {
            "k": "-!abh",
            "m": "[接尾辞] 完了",
            "en": "perfect suffix"
        }
    ],
    "pronouns": [
        {
            "k": "sye",
            "m": "[代名詞] 私/自分自身",
            "en": "I / myself"
        },
        {
            "k": "yu",
            "m": "[代名詞] あなた",
            "en": "you"
        },
        {
            "k": "won",
            "m": "[代名詞] 彼/人",
            "en": "he / person"
        },
        {
            "k": "won-p",
            "m": "[代名詞] 彼女",
            "en": "she"
        },
        {
            "k": "won-r",
            "m": "[代名詞] 彼ら/人々",
            "en": "they / people"
        },
        {
            "k": "wo-f",
            "m": "[疑問代名詞] 何（物・事柄）",
            "en": "what"
        },
        {
            "k": "wo-won",
            "m": "[疑問代名詞] 誰",
            "en": "who"
        },
        {
            "k": "wo-z",
            "m": "[疑問語] どこ（場所の名詞として使う）",
            "en": "where (a place noun)"
        },
        {
            "k": "wo-eti",
            "m": "[疑問語] いつ（時点の名詞として使う）",
            "en": "when (a time noun)"
        },
        {
            "k": "wo-n!ag",
            "m": "[疑問語] なぜ（文末）",
            "en": "why (sentence-final)"
        },
        {
            "k": "wo-ritt",
            "m": "[疑問語] どうやって（文末）",
            "en": "how (sentence-final)"
        },
        {
            "k": "f-sye",
            "m": "[指示代名詞] これ",
            "en": "this"
        },
        {
            "k": "f-yu",
            "m": "[指示代名詞] それ／あれ",
            "en": "that"
        },
        {
            "k": "sye-r",
            "m": "[代名詞] 私たち",
            "en": "we"
        },
        {
            "k": "yu-r-won",
            "m": "[代名詞] あなたたち",
            "en": "you (plural)"
        }
    ],
    "adjectives": [
        {
            "k": "b",
            "m": "[形容詞] 良い/美しい/善",
            "en": "good / beautiful"
        },
        {
            "k": "wo",
            "m": "[形容詞] 広い",
            "en": "wide"
        },
        {
            "k": "g",
            "m": "[形容詞] 重い/強い圧力",
            "en": "heavy / strong pressure"
        },
        {
            "k": "p",
            "m": "[形容詞] 対立する/ペアの",
            "en": "opposed / paired"
        },
        {
            "k": "n-n!ag",
            "m": "[形容詞] 最適な/無駄のない",
            "en": "optimal / without waste"
        },
        {
            "k": "n-e",
            "m": "[形容詞] 最小限の",
            "en": "minimal"
        },
        {
            "k": "!a-wo",
            "m": "[形容詞] 究極の",
            "en": "ultimate"
        },
        {
            "k": "sye-t",
            "m": "[形容詞] 独自の/独自の",
            "en": "distinctive / original"
        },
        {
            "k": "!a-b",
            "m": "[形容詞] 完成された",
            "en": "complete"
        },
        {
            "k": "b-u",
            "m": "[形容詞] 楽しい",
            "en": "fun"
        },
        {
            "k": "b-!a-r",
            "m": "赤い",
            "en": "red"
        },
        {
            "k": "n-g",
            "m": "軽い",
            "en": "light (weight)"
        },
        {
            "k": "!anne-won",
            "m": "学生の（名詞として学生も表す）",
            "en": "student (noun or attributive modifier)"
        }
    ],
    "nouns": [
        {
            "k": "!a",
            "m": "エネルギー/中心/極大",
            "en": "energy / center / maximum"
        },
        {
            "k": "e",
            "m": "拡大/延長",
            "en": "expansion / extension"
        },
        {
            "k": "u",
            "m": "動/精神",
            "en": "motion / mind"
        },
        {
            "k": "r",
            "m": "循環/円",
            "en": "cycle / circle"
        },
        {
            "k": "f",
            "m": "物/物質/これ",
            "en": "thing / matter / this"
        },
        {
            "k": "byam",
            "m": "bya文字/記号",
            "en": "byam letter / symbol"
        },
        {
            "k": "be",
            "m": "美/美的なもの",
            "en": "beauty"
        },
        {
            "k": "!ann",
            "m": "知恵/思考",
            "en": "wisdom / thought"
        },
        {
            "k": "!anbya",
            "m": "onva（国家/中心）",
            "en": "ONVA (country / center)"
        },
        {
            "k": "!anbyawon",
            "m": "onva人",
            "en": "ONVA citizen"
        },
        {
            "k": "ritt",
            "m": "AI/計算/知能",
            "en": "AI / computation / intelligence"
        },
        {
            "k": "f-ritt",
            "m": "PC/コンピューター",
            "en": "PC / computer"
        },
        {
            "k": "m-wo-bya",
            "m": "インターネット/網",
            "en": "Internet / network"
        },
        {
            "k": "h-!a",
            "m": "電池/エネルギー源",
            "en": "battery / energy source"
        },
        {
            "k": "zwo-sye",
            "m": "パスワード/鍵",
            "en": "password / key"
        },
        {
            "k": "n!ag",
            "m": "無駄/ノイズ",
            "en": "waste / noise"
        },
        {
            "k": "ritt-z",
            "m": "システム/文化/OS",
            "en": "system / culture / OS"
        },
        {
            "k": "!anbya-z",
            "m": "建国/成立",
            "en": "founding / establishment"
        },
        {
            "k": "bya-ritt",
            "m": "情報/データ",
            "en": "information / data"
        },
        {
            "k": "!a-z",
            "m": "深部/コア",
            "en": "depth / core"
        },
        {
            "k": "z-t",
            "m": "位置/座標",
            "en": "position / coordinates"
        },
        {
            "k": "f-wo",
            "m": "世界/全土",
            "en": "world / entire territory"
        },
        {
            "k": "m-wo-f",
            "m": "船/大量の集積",
            "en": "ship / large collection"
        },
        {
            "k": "wo-!a",
            "m": "太陽",
            "en": "sun"
        },
        {
            "k": "wo-u",
            "m": "月",
            "en": "moon"
        },
        {
            "k": "!aiwon",
            "m": "iPhone/スマホ",
            "en": "iPhone / smartphone"
        },
        {
            "k": "b-u-won",
            "m": "白人",
            "en": "white person"
        },
        {
            "k": "i-t",
            "m": "コスト",
            "en": "cost"
        },
        {
            "k": "ritt-t",
            "m": "デジタル",
            "en": "digital"
        },
        {
            "k": "be-bya",
            "m": "芸術表現",
            "en": "artistic expression"
        },
        {
            "k": "m",
            "m": "水/流れ/液体",
            "en": "water / flow / liquid"
        },
        {
            "k": "z",
            "m": "地/土台/定着",
            "en": "ground / foundation / settlement"
        },
        {
            "k": "t",
            "m": "点/単位/一",
            "en": "point / unit / one"
        },
        {
            "k": "!ann-b-n!ag",
            "m": "大喜利",
            "en": "oogiri (comic improvisation)"
        },
        {
            "k": "z-h-won",
            "m": "家／住まい",
            "en": "home / house"
        },
        {
            "k": "z-!anne",
            "m": "学校",
            "en": "school"
        },
        {
            "k": "i-f",
            "m": "食べ物",
            "en": "food"
        },
        {
            "k": "i-z",
            "m": "ジャガイモ",
            "en": "potato"
        },
        {
            "k": "i-z-m",
            "m": "ポテトサラダ",
            "en": "potato salad"
        },
        {
            "k": "m-z",
            "m": "雨",
            "en": "rain"
        },
        {
            "k": "bya-won",
            "m": "名前",
            "en": "name"
        },
        {
            "k": "f-bya",
            "m": "本",
            "en": "book"
        },
        {
            "k": "bya-f-ritt",
            "m": "メッセージ",
            "en": "message"
        }
    ],
    "verbs": [
        {
            "k": "wor",
            "m": "寝る",
            "en": "sleep"
        },
        {
            "k": "i",
            "m": "食べる/摂取する",
            "en": "eat / ingest"
        },
        {
            "k": "h",
            "m": "持つ/所有する",
            "en": "have / own"
        },
        {
            "k": "ne",
            "m": "見る/観測する",
            "en": "see / observe"
        },
        {
            "k": "te",
            "m": "行く/進行する",
            "en": "go / proceed"
        },
        {
            "k": "ti",
            "m": "来る/出現する",
            "en": "come / appear"
        },
        {
            "k": "bya",
            "m": "話す/出力する",
            "en": "speak / output"
        },
        {
            "k": "m-i",
            "m": "飲む",
            "en": "drink"
        },
        {
            "k": "bya-m",
            "m": "歌う",
            "en": "sing"
        },
        {
            "k": "p-z",
            "m": "座る/踏む/固定する",
            "en": "sit / step / fix in place"
        },
        {
            "k": "h-wo",
            "m": "上げる/高める",
            "en": "raise"
        },
        {
            "k": "ti-f",
            "m": "作る/創造する",
            "en": "make / create"
        },
        {
            "k": "!anne",
            "m": "学ぶ/インプットする",
            "en": "learn / input"
        },
        {
            "k": "rep",
            "m": "求める／欲しい（物、または ti-動詞句を目的語にする）",
            "en": "want / request (a thing or a ti-action)"
        },
        {
            "k": "sye-yu",
            "m": "好きである",
            "en": "like"
        },
        {
            "k": "h-te",
            "m": "できる（目的語は ti-動詞句）",
            "en": "be able to (follow with a nominalized verb phrase)"
        },
        {
            "k": "!ann",
            "m": "思う（内容は bya-t ... bya-n）",
            "en": "think (content in bya-t ... bya-n)"
        },
        {
            "k": "!ann-h",
            "m": "分かる／理解する",
            "en": "understand"
        },
        {
            "k": "h-yu",
            "m": "渡す／与える",
            "en": "give"
        },
        {
            "k": "ne-h",
            "m": "買う",
            "en": "buy"
        },
        {
            "k": "bya-r",
            "m": "繰り返す／もう一度言う",
            "en": "repeat"
        },
        {
            "k": "bya-wo",
            "m": "尋ねる／質問する",
            "en": "ask"
        },
        {
            "k": "h-n",
            "m": "必要とする",
            "en": "need"
        }
    ],
    "numbers": [
        {
            "k": "n-!a",
            "m": "0（零）",
            "en": "0"
        },
        {
            "k": "t-i",
            "m": "1（一）",
            "en": "1"
        },
        {
            "k": "p-u",
            "m": "2（二）",
            "en": "2"
        },
        {
            "k": "r-e",
            "m": "3（三）",
            "en": "3"
        },
        {
            "k": "z-h",
            "m": "4（四）",
            "en": "4"
        },
        {
            "k": "m-!a",
            "m": "5（五）",
            "en": "5"
        },
        {
            "k": "f-t",
            "m": "6（六）",
            "en": "6"
        },
        {
            "k": "yu-i",
            "m": "7（七）",
            "en": "7"
        },
        {
            "k": "h-t",
            "m": "8（八）",
            "en": "8"
        },
        {
            "k": "n-wo",
            "m": "9（九）",
            "en": "9"
        },
        {
            "k": "wo-t",
            "m": "10（十）",
            "en": "10"
        },
        {
            "k": "t-wo",
            "m": "100（百）",
            "en": "100"
        },
        {
            "k": "wo-t!a",
            "m": "1000（千）",
            "en": "1000"
        }
    ],
    "time": [
        {
            "k": "t-m",
            "m": "秒/最小単位時間",
            "en": "second"
        },
        {
            "k": "m-t",
            "m": "分",
            "en": "minute"
        },
        {
            "k": "wo-m",
            "m": "時",
            "en": "hour"
        },
        {
            "k": "eti-p",
            "m": "過去",
            "en": "past"
        },
        {
            "k": "eti-t",
            "m": "現在",
            "en": "present"
        },
        {
            "k": "eti",
            "m": "未来",
            "en": "future"
        },
        {
            "k": "eti-t-m",
            "m": "今日",
            "en": "today"
        },
        {
            "k": "eti-p-m",
            "m": "昨日",
            "en": "yesterday"
        },
        {
            "k": "eti-e-m",
            "m": "明日",
            "en": "tomorrow"
        }
    ],
    "conv": [
        {
            "k": "b-!a",
            "m": "こんにちは",
            "en": "Hello"
        },
        {
            "k": "b-bya",
            "m": "ありがとう",
            "en": "Thank you"
        },
        {
            "k": "n-bya",
            "m": "ごめんなさい",
            "en": "Sorry"
        },
        {
            "k": "te-wo",
            "m": "さようなら",
            "en": "Goodbye"
        },
        {
            "k": "h-b",
            "m": "お願い",
            "en": "Please"
        },
        {
            "k": "sye!ab",
            "m": "よろしくお願いします",
            "en": "Nice to meet you / thank you in advance"
        },
        {
            "k": "sye!a",
            "m": "はい（Yes）",
            "en": "Yes"
        },
        {
            "k": "ni!a",
            "m": "いいえ（No）",
            "en": "No"
        }
    ],
    "geo": [
        {
            "k": "yu-ri!a",
            "m": "ユーラシア大陸",
            "en": "Eurasia"
        },
        {
            "k": "!autr!a",
            "m": "オーストラリア",
            "en": "Australia"
        },
        {
            "k": "byap!an",
            "m": "日本",
            "en": "Japan"
        },
        {
            "k": "byap!anm",
            "m": "日本語",
            "en": "Japanese"
        },
        {
            "k": "!anbyam",
            "m": "onva語",
            "en": "Anbyam"
        }
    ],
    "phrases": [
        {
            "k": "b-!a.",
            "m": "こんにちは。",
            "en": "Hello."
        },
        {
            "k": "b-bya.",
            "m": "ありがとう。",
            "en": "Thank you."
        },
        {
            "k": "n-bya.",
            "m": "ごめんなさい。",
            "en": "Sorry."
        },
        {
            "k": "sye t-t !anbyawon.",
            "m": "私はONVA人です。",
            "en": "I am from ONVA."
        },
        {
            "k": "sye t-t !anne-won.",
            "m": "私は学生です。",
            "en": "I am a student."
        },
        {
            "k": "yu t-t !anne-won wo-wo?",
            "m": "あなたは学生ですか？",
            "en": "Are you a student?"
        },
        {
            "k": "f-sye t-t wo-f?",
            "m": "これは何？",
            "en": "What is this?"
        },
        {
            "k": "wo-won i i-z-m?",
            "m": "誰がポテトサラダを食べるの？",
            "en": "Who eats potato salad?"
        },
        {
            "k": "yu i wo-f?",
            "m": "何を食べるの？",
            "en": "What do you eat?"
        },
        {
            "k": "sye m-i m.",
            "m": "私は水を飲む。",
            "en": "I drink water."
        },
        {
            "k": "sye rep m.",
            "m": "水が欲しい。",
            "en": "I want water."
        },
        {
            "k": "sye rep ti-te te-z z-h-won.",
            "m": "家に帰りたい。",
            "en": "I want to go home."
        },
        {
            "k": "sye h-te ti-bya !anbyam.",
            "m": "私はAnbyamを話せる。",
            "en": "I can speak Anbyam."
        },
        {
            "k": "sye n-h-te ti-te eti-z eti-t-m.",
            "m": "今日は行けない。",
            "en": "I cannot go today."
        },
        {
            "k": "sye n-!abh n-i-!abh i-z-m.",
            "m": "まだポテトサラダを食べていない。",
            "en": "I have not eaten potato salad yet."
        },
        {
            "k": "sye i-u i-z-m.",
            "m": "ポテトサラダを食べているところ。",
            "en": "I am eating potato salad."
        },
        {
            "k": "sye !abh i-p i-z-m.",
            "m": "たった今ポテトサラダを食べた。",
            "en": "I just ate potato salad."
        },
        {
            "k": "sye ne-h-p f-bya eti-z eti-p-m.",
            "m": "昨日、本を買った。",
            "en": "I bought a book yesterday."
        },
        {
            "k": "sye te-e te-z z-!anne eti-z eti-e-m.",
            "m": "明日、学校へ行く。",
            "en": "I will go to school tomorrow."
        },
        {
            "k": "yu te te-z wo-z?",
            "m": "どこへ行くの？",
            "en": "Where are you going?"
        },
        {
            "k": "yu ti eti-z wo-eti?",
            "m": "いつ来るの？",
            "en": "When are you coming?"
        },
        {
            "k": "yu n-ti wo-n!ag?",
            "m": "なぜ来ないの？",
            "en": "Why are you not coming?"
        },
        {
            "k": "yu ti wo-ritt?",
            "m": "どうやって来るの？",
            "en": "How do you come here?"
        },
        {
            "k": "f-yu t-t f yu-h sye.",
            "m": "それは私のもの。",
            "en": "That is mine."
        },
        {
            "k": "sye rep b-!a-r f.",
            "m": "赤いものが欲しい。",
            "en": "I want a red thing."
        },
        {
            "k": "sye h f-bya yu-h yu.",
            "m": "あなたの本を持っている。",
            "en": "I have your book."
        },
        {
            "k": "h-b wo h-yu f-yu yu-e sye.",
            "m": "それを私に渡してください。",
            "en": "Please give that to me."
        },
        {
            "k": "h-b wo r-r bya f-yu.",
            "m": "それをもう一度言ってください。",
            "en": "Please say that again."
        },
        {
            "k": "wo n-te.",
            "m": "行かないで。",
            "en": "Do not go."
        },
        {
            "k": "sye n-!ann-h f-yu.",
            "m": "それが分からない。",
            "en": "I do not understand that."
        },
        {
            "k": "sye !ann bya-t won ti-e bya-n.",
            "m": "彼が来ると思う。",
            "en": "I think they will come."
        },
        {
            "k": "f-yu t-t f-bya bya-f sye ne-h-p wo-f bya-n.",
            "m": "それは私が買った本です。",
            "en": "That is the book I bought."
        },
        {
            "k": "m-z t-t g, t-tr sye wor z-e z-h-won.",
            "m": "雨が強いから家で寝る。",
            "en": "It is raining hard, so I sleep at home."
        },
        {
            "k": "!abu yu ti, t-tr sye h-yu f-bya yu-e yu.",
            "m": "来てくれたら本を渡す。",
            "en": "If you come, I will give you a book."
        },
        {
            "k": "sye sye-yu f-sye, n-p won sye-yu f-yu.",
            "m": "私はこれが好きだけど、彼はあれが好き。",
            "en": "I like this, but they like that."
        },
        {
            "k": "sye ne-p won z-e z-!anne.",
            "m": "学校で彼を見た。",
            "en": "I saw them at school."
        },
        {
            "k": "sye h wo-t h-t byam.",
            "m": "私は18文字を持つ。",
            "en": "I have eighteen letters."
        },
        {
            "k": "f-bya ne-ep-p.",
            "m": "本が見られた。",
            "en": "The book was seen."
        },
        {
            "k": "bya-won yu-h yu t-t wo-f?",
            "m": "あなたの名前は？",
            "en": "What is your name?"
        },
        {
            "k": "sye!a.",
            "m": "はい。",
            "en": "Yes."
        },
        {
            "k": "ni!a.",
            "m": "いいえ。",
            "en": "No."
        }
    ],
    "adverbs": [
        {
            "k": "n-!abh",
            "m": "まだ〜ない：否定形の動詞の前に置く",
            "en": "not yet (before a negated verb)"
        },
        {
            "k": "!abh",
            "m": "たった今（動詞の直前）",
            "en": "just now (immediately before the verb)"
        },
        {
            "k": "r-r",
            "m": "もう一度（動詞の直前）",
            "en": "again (immediately before the verb)"
        },
        {
            "k": "b-eti",
            "m": "いつも（動詞の直前）",
            "en": "always (immediately before the verb)"
        }
    ]
};

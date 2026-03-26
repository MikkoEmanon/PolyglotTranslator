const languageList = [
  { code: "af", name: "Afrikaans",  flag: "🇿🇦", ttsCode: "af-ZA", hasTTS: false  },
  { code: "sq", name: "Albanian",   flag: "🇦🇱", ttsCode: "sq-AL", hasTTS: false },
  { code: "ar", name: "Arabic",     flag: "🇸🇦", ttsCode: "ar-SA", hasTTS: true  },
  { code: "hy", name: "Armenian",   flag: "🇦🇲", ttsCode: "hy-AM", hasTTS: false },
  { code: "bg", name: "Bulgarian",  flag: "🇧🇬", ttsCode: "bg-BG", hasTTS: false  },
  { code: "yue",name: "Cantonese",  flag: "🇭🇰", ttsCode: "zh-HK", hasTTS: true  },
  { code: "zh", name: "Chinese",    flag: "🇨🇳", ttsCode: "zh-CN", hasTTS: true  },
  { code: "cs", name: "Czech",      flag: "🇨🇿", ttsCode: "cs-CZ", hasTTS: true  },
  { code: "nl", name: "Dutch",      flag: "🇳🇱", ttsCode: "nl-NL", hasTTS: true  },
  { code: "en", name: "English",    flag: "🇬🇧", ttsCode: "en-US", hasTTS: true  },
  { code: "fa", name: "Farsi",      flag: "🇮🇷", ttsCode: "fa-IR", hasTTS: false },
  { code: "fi", name: "Finnish",    flag: "🇫🇮", ttsCode: "fi-FI", hasTTS: true  },
  { code: "fr", name: "French",     flag: "🇫🇷", ttsCode: "fr-FR", hasTTS: true  },
  { code: "de", name: "German",     flag: "🇩🇪", ttsCode: "de-DE", hasTTS: true  },
  { code: "el", name: "Greek",      flag: "🇬🇷", ttsCode: "el-GR", hasTTS: true  },
  { code: "he", name: "Hebrew",     flag: "🇮🇱", ttsCode: "he-IL", hasTTS: true  },
  { code: "hi", name: "Hindi",      flag: "🇮🇳", ttsCode: "hi-IN", hasTTS: true  },
  { code: "hu", name: "Hungarian",  flag: "🇭🇺", ttsCode: "hu-HU", hasTTS: true  },
  { code: "is", name: "Icelandic",  flag: "🇮🇸", ttsCode: "is-IS", hasTTS: false },
  { code: "id", name: "Indonesian", flag: "🇮🇩", ttsCode: "id-ID", hasTTS: true  },
  { code: "ga", name: "Irish",      flag: "🇮🇪", ttsCode: "ga-IE", hasTTS: false },
  { code: "it", name: "Italian",    flag: "🇮🇹", ttsCode: "it-IT", hasTTS: true  },
  { code: "ja", name: "Japanese",   flag: "🇯🇵", ttsCode: "ja-JP", hasTTS: true  },
  { code: "kk", name: "Kazakh",     flag: "🇰🇿", ttsCode: "kk-KZ", hasTTS: false  },
  { code: "km", name: "Khmer",      flag: "🇰🇭", ttsCode: "km-KH", hasTTS: false },
  { code: "ko", name: "Korean",     flag: "🇰🇷", ttsCode: "ko-KR", hasTTS: true  },
  { code: "ky", name: "Kyrgyz",     flag: "🇰🇬", ttsCode: "ky-KG", hasTTS: false },
  { code: "lt", name: "Lithuanian", flag: "🇱🇹", ttsCode: "lt-LT", hasTTS: false },
  { code: "mn", name: "Mongolian",  flag: "🇲🇳", ttsCode: "mn-MN", hasTTS: false },
  { code: "no", name: "Norwegian",  flag: "🇳🇴", ttsCode: "nb-NO", hasTTS: true  },
  { code: "ps", name: "Pashto",     flag: "🇦🇫", ttsCode: "ps-AF", hasTTS: false },
  { code: "pl", name: "Polish",     flag: "🇵🇱", ttsCode: "pl-PL", hasTTS: true  },
  { code: "pt", name: "Portuguese", flag: "🇵🇹", ttsCode: "pt-PT", hasTTS: true  },
  { code: "qu", name: "Quechua",    flag: "🇵🇪", ttsCode: "qu-PE", hasTTS: false },
  { code: "ro", name: "Romanian",   flag: "🇷🇴", ttsCode: "ro-RO", hasTTS: true  },
  { code: "ru", name: "Russian",    flag: "🇷🇺", ttsCode: "ru-RU", hasTTS: true  },
  { code: "sr", name: "Serbian",    flag: "🇷🇸", ttsCode: "sr-RS", hasTTS: false },
  { code: "sl", name: "Slovene",    flag: "🇸🇮", ttsCode: "sl-SI", hasTTS: false  },
  { code: "es", name: "Spanish",    flag: "🇪🇸", ttsCode: "es-ES", hasTTS: true  },
  { code: "sw", name: "Swahili",    flag: "🇹🇿", ttsCode: "sw-TZ", hasTTS: false },
  { code: "sv", name: "Swedish",    flag: "🇸🇪", ttsCode: "sv-SE", hasTTS: true  },
  { code: "th", name: "Thai",       flag: "🇹🇭", ttsCode: "th-TH", hasTTS: true  },
  { code: "tr", name: "Turkish",    flag: "🇹🇷", ttsCode: "tr-TR", hasTTS: true  },
  { code: "uk", name: "Ukrainian",  flag: "🇺🇦", ttsCode: "uk-UA", hasTTS: false  },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳", ttsCode: "vi-VN", hasTTS: false }
];

const inputLanguageSelect = document.getElementById("inputLanguage");
const outputLanguagesDiv  = document.getElementById("outputLanguages");
const resultsSection      = document.getElementById("results");
const translateBtn        = document.getElementById("translateBtn");
const listenInputBtn      = document.getElementById("listenInput");
const clearAllBtn         = document.getElementById("clearAll");
const inputText           = document.getElementById("textInput");
const charCountEl         = document.getElementById("charCount");

languageList.forEach(lang => {
  const opt = document.createElement("option");
  opt.value = lang.code;
  opt.textContent = `${lang.flag} ${lang.name}`;
  inputLanguageSelect.appendChild(opt);

  const btn = document.createElement("button");
  btn.classList.add("language-btn");
  btn.textContent = `${lang.flag} ${lang.name}`;
  btn.dataset.code = lang.code;
  btn.addEventListener("click", () => {
    if (btn.dataset.code !== inputLanguageSelect.value) {
      btn.classList.toggle("selected");
    }
  });
  outputLanguagesDiv.appendChild(btn);
});

const defaultLang = languageList.find(l => l.code === "en") ? "en" : languageList[0]?.code ?? "";
inputLanguageSelect.value = defaultLang;

function updateOutputButtons() {
  const currentFrom = inputLanguageSelect.value;
  document.querySelectorAll(".language-btn").forEach(btn => {
    if (btn.dataset.code === currentFrom) {
      btn.disabled = true;
      btn.classList.remove("selected");
      btn.style.opacity = "0.5";
    } else {
      btn.disabled = false;
      btn.style.opacity = "1";
    }
  });
}

inputLanguageSelect.addEventListener("change", updateOutputButtons);
updateOutputButtons();

inputText.addEventListener("input", () => {
  const count = inputText.value.length;
  charCountEl.textContent = `${count}/1000`;
});

async function fetchTranslation(text, from, to) {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
    );
    const data = await res.json();
    let translation = data.responseData.translatedText || "Translation unavailable";
    if (translation === "Translation unavailable" || (to !== "en" && translation === text)) {
      throw new Error("Fallback triggered");
    }
    return translation;
  } catch (error) {
    console.warn("MyMemory failed, falling back to Lingva");
  }

  try {
    const params = new URLSearchParams({ text, source: from, target: to, format: "text" });
    const res = await fetch(`https://lingva.ml/api/v1/translate?${params}`);
    if (!res.ok) throw new Error("Lingva error");
    const data = await res.json();
    return data.translation || "Translation unavailable";
  } catch (error) {
    console.error("Lingva failed:", error);
    return "Error: Translation failed";
  }
}

translateBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();
  if (!text) return alert("Please enter some text first!");

  const fromLang = inputLanguageSelect.value;
  const selectedLangs = [...document.querySelectorAll(".language-btn.selected")]
    .map(b => b.dataset.code);

  if (!selectedLangs.length) return alert("Select at least one target language!");
  if (selectedLangs.length > 10) {
    return alert("Maximum 10 target languages at a time.");
  }

  resultsSection.innerHTML = "";
  translateBtn.disabled = true;
  translateBtn.textContent = "Translating...";

  for (const langCode of selectedLangs) {
    const lang = languageList.find(l => l.code === langCode);
    const translation = await fetchTranslation(text, fromLang, langCode);

    const box = document.createElement("div");
    box.classList.add("translation-box");

    const header = document.createElement("div");
    header.classList.add("translation-header");
    const heading = document.createElement("h3");
    heading.textContent = `${lang.flag} ${lang.name}`;
    header.appendChild(heading);
    box.appendChild(header);

    const translationText = document.createElement("div");
    translationText.classList.add("translation-text");
    translationText.textContent = translation;
    box.appendChild(translationText);

    const actions = document.createElement("div");
    actions.classList.add("translation-actions");

    const copyBtn = document.createElement("button");
    copyBtn.classList.add("language-btn", "copyBtn");
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(translation);
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = "Copy", 1000);
    });
    actions.appendChild(copyBtn);

    if (lang.hasTTS) {
      const listenBtn = document.createElement("button");
      listenBtn.classList.add("language-btn", "listenBtn");
      listenBtn.textContent = "Listen 🔊";
      listenBtn.addEventListener("click", () => {
        const utterance = new SpeechSynthesisUtterance(translation);
        utterance.lang   = lang.ttsCode;
        utterance.rate   = 0.9;
        utterance.pitch  = 1;
        utterance.volume = 1;
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      });
      actions.appendChild(listenBtn);
    }

    box.appendChild(actions);
    resultsSection.appendChild(box);
  }

  translateBtn.disabled = false;
  translateBtn.textContent = "Translate";
});

listenInputBtn.addEventListener("click", () => {
  const text = inputText.value.trim();
  if (!text) return alert("Please enter some text first!");

  const langCode = inputLanguageSelect.value;
  const lang = languageList.find(l => l.code === langCode);

  if (lang && !lang.hasTTS) {
    alert("Text-to-speech is not available for this language.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang   = lang ? lang.ttsCode : "en-US";
  utterance.rate   = 0.9;
  utterance.pitch  = 1;
  utterance.volume = 1;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
});

clearAllBtn.addEventListener("click", () => {
  inputText.value = "";
  charCountEl.textContent = "0/1000";
  resultsSection.innerHTML = "";
  document.querySelectorAll(".language-btn.selected").forEach(b => b.classList.remove("selected"));
  speechSynthesis.cancel();
});

if (!('speechSynthesis' in window)) {
  const note = document.createElement("p");
  note.textContent = "Note: Text-to-speech is not supported in your browser. Please use Chrome or Edge.";
  note.style.cssText = "color: #ffcc33; font-style: italic; text-align: center; margin-top: 10px;";
  document.querySelector("main").appendChild(note);
}

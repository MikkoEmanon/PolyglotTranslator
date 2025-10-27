const languageList = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "el", name: "Greek", flag: "🇬🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "no", name: "Norwegian", flag: "🇳🇴" },
  { code: "ro", name: "Romanian", flag: "🇷🇴" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "fi", name: "Finnish", flag: "🇫🇮" },
  { code: "hu", name: "Hungarian", flag: "🇭🇺" },
  { code: "he", name: "Hebrew", flag: "🇮🇱" },
  { code: "fa", name: "Farsi", flag: "🇮🇷" },
  { code: "mn", name: "Mongolian", flag: "🇲🇳" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "sr", name: "Serbian", flag: "🇷🇸" },
  { code: "hy", name: "Armenian", flag: "🇦🇲" },
  { code: "lt", name: "Lithuanian", flag: "🇱🇹" },
  { code: "sq", name: "Albanian", flag: "🇦🇱" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "km", name: "Khmer", flag: "🇰🇭" },
];

const inputLanguageSelect = document.getElementById("inputLanguage");
const outputLanguagesDiv = document.getElementById("outputLanguages");
const resultsSection = document.getElementById("results");
const translateBtn = document.getElementById("translateBtn");
const listenInputBtn = document.getElementById("listenInput");
const clearAllBtn = document.getElementById("clearAll");
const inputText = document.getElementById("textInput");

languageList.forEach(lang => {
  // Populate input dropdown
  const opt = document.createElement("option");
  opt.value = lang.code;
  opt.textContent = `${lang.flag} ${lang.name}`;
  inputLanguageSelect.appendChild(opt);

  // Create output buttons
  const btn = document.createElement("button");
  btn.classList.add("language-btn");
  btn.textContent = `${lang.flag} ${lang.name}`;
  btn.dataset.code = lang.code;
  btn.addEventListener("click", () => btn.classList.toggle("selected"));
  outputLanguagesDiv.appendChild(btn);
});

async function fetchTranslation(text, from, to) {
  // First, try MyMemory API
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
    );
    const data = await res.json();
    let translation = data.responseData.translatedText || "Translation unavailable";
    
    // Check if it failed or returned English for non-English target
    if (translation === "Translation unavailable" || (to !== "en" && translation === text)) {
      throw new Error("Fallback triggered");
    }
    return translation;
  } catch (error) {
    console.warn("MyMemory failed, falling back to Lingva:", error.message);
  }

  // Fallback to Lingva Translate API
  try {
    const params = new URLSearchParams({
      text: text,
      source: from,
      target: to,
      format: "text"
    });
    const res = await fetch(`https://lingva.ml/api/v1/translate?${params}`);
    if (!res.ok) {
      throw new Error("Lingva API error");
    }
    const data = await res.json();
    return data.translation || "Translation unavailable";
  } catch (error) {
    console.error("Lingva fallback failed:", error);
    return "Error: Translation failed";
  }
}

translateBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();
  if (!text) return alert("Please enter some text first!");

  const fromLang = inputLanguageSelect.value;
  const selectedLangs = [...document.querySelectorAll(".language-btn.selected")].map(
    b => b.dataset.code
  );

  if (!selectedLangs.length) return alert("Select at least one target language!");

  resultsSection.innerHTML = "";
  translateBtn.disabled = true;
  translateBtn.textContent = "Translating...";

  for (const langCode of selectedLangs) {
    const lang = languageList.find(l => l.code === langCode);
    const translation = await fetchTranslation(text, fromLang, langCode);

    const box = document.createElement("div");
    box.classList.add("translation-box");

    box.innerHTML = `
      <div class="translation-header">
        <h3>${lang.flag} ${lang.name}</h3>
      </div>
      <div class="translation-text">${translation}</div>
      <div class="translation-actions">
        <button class="language-btn copyBtn">Copy</button>
        <button class="language-btn listenBtn">Listen 🔊</button>
      </div>
    `;

    const copyBtn = box.querySelector(".copyBtn");
    const listenBtn = box.querySelector(".listenBtn");

    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(translation);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1000);
    });

    listenBtn.addEventListener("click", () => {
      const utterance = new SpeechSynthesisUtterance(translation);
      utterance.lang = langCode;
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1;
      utterance.volume = 1;
      speechSynthesis.cancel(); // Cancel any ongoing speech
      speechSynthesis.speak(utterance);
    });

    resultsSection.appendChild(box);
  }

  translateBtn.disabled = false;
  translateBtn.textContent = "Translate";
});

listenInputBtn.addEventListener("click", () => {
  const text = inputText.value.trim();
  if (text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const langCode = inputLanguageSelect.value;
    utterance.lang = langCode || "en"; // Fallback to English if no lang
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  } else {
    alert("Please enter some text first!");
  }
});

clearAllBtn.addEventListener("click", () => {
  inputText.value = "";
  resultsSection.innerHTML = "";
  document.querySelectorAll(".language-btn.selected").forEach(b => b.classList.remove("selected"));
  speechSynthesis.cancel();
});

// Check Web Speech API support on load
if ('speechSynthesis' in window) {
  console.log("Web Speech API supported");
} else {
  console.warn("Web Speech API not supported in this browser");
  // Optionally, show a user-friendly message
  const note = document.createElement("p");
  note.textContent = "Note: Text-to-speech is not supported in your browser. Please use a modern browser like Chrome or Edge.";
  note.style.cssText = "color: #ffcc33; font-style: italic; text-align: center; margin-top: 10px;";
  document.querySelector("main").appendChild(note);
}
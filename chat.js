const startScreen = document.getElementById("startScreen");
const chatScreen = document.getElementById("chatScreen");
const chatLog = document.getElementById("chatLog");
const answerOptions = document.getElementById("answerOptions");

const script = [
  { from: "H", text: "시즈니이이" },
  { from: "H", text: "잘 잤어요?" },
  {
    options: [
      { text: "웅ㅎㅎ" },
      { text: "웅 너는?" }
    ]
  },
  { from: "H", text: "나도 오랜만에 너무 잘 잤닿ㅎ" },
  { from: "H", text: "드디어" },
  { from: "H", text: "오늘 앨범 발매..." },
  { from: "H", text: "너무 기대돼.." },
  {
    options: [
      { text: "나두 너무 떨려" },
      { text: "빨리 듣고 싶다" }
    ]
  },
  { from: "H", text: "난 지금도 듣는중ㅎㅎ" },
  {
    options: [
      { text: "뭐야! 나도 들을래ㅜㅜ" },
      { text: "너만 듣기 있어?ㅠ" }
    ]
  },
  { from: "H", text: "부럽지 ㅎㅎ" }
];

let step = 0;

function showMessage(from, text) {
  const msg = document.createElement("div");
  msg.className = "chatMsg " + (from === "H" ? "fromH" : "fromMe");
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function showOptions(options) {
  answerOptions.innerHTML = ""; // 이전 버튼 제거
  options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "answerBtn";
    btn.textContent = option.text;
    btn.onclick = () => {
      showMessage("Me", option.text);
      answerOptions.innerHTML = "";
      step++;
      setTimeout(runScript, 500);
    };
    answerOptions.appendChild(btn);
  });
}

function runScript() {
  if (step >= script.length) return;
  const entry = script[step];
  if (entry.from) {
    showMessage(entry.from, entry.text);
    step++;
    setTimeout(runScript, 1200);
  } else if (entry.options) {
    showOptions(entry.options);
  }
}

// 시작 화면 5초 뒤 채팅 시작
setTimeout(() => {
  startScreen.style.display = "none";
  chatScreen.style.display = "flex";
  runScript();
}, 5000);

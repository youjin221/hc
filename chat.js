const startScreen = document.getElementById('startScreen');
const chatScreen = document.getElementById('chatScreen');
const chatLog = document.getElementById('chatLog');
const answerOptions = document.getElementById('answerOptions');

// 대화 기록 추가 함수
function addChatMessage(text, from) {
  const msg = document.createElement('div');
  msg.classList.add('chatMsg');
  msg.classList.add(from === 'H' ? 'fromH' : 'fromMe');
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// 답변 선택지 표시 함수 (내 답변도 채팅창에 보이게 수정됨)
function showAnswers(answers) {
  answerOptions.innerHTML = '';
  answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.className = 'answerBtn';
    btn.textContent = answer.text;
    btn.onclick = () => {
      addChatMessage(answer.text, 'Me');  // 내가 고른 답변 채팅창에 추가
      answer.onClick();                    // 다음 대화 단계로 진행
    };
    answerOptions.appendChild(btn);
  });
}

// 대화 흐름 데이터 (단계별)
const dialogFlow = [
  {
    from: 'H',
    text: '시즈니이이',
    next: 1
  },
  {
    from: 'H',
    text: '잘 잣어요?',
    next: 2
  },
  {
    answers: [
      { text: '웅ㅎㅎ', onClick: () => proceedTo(3) },
      { text: '웅 너는?', onClick: () => proceedTo(3) }
    ]
  },
  {
    from: 'H',
    texts: [
      '나도 오랜만에 너무 잘 잤닿ㅎ',
      '드디어',
      '오늘 앨범 발매...',
      '너무 기대돼..'
    ],
    next: 4
  },
  {
    answers: [
      { text: '나두 너무 떨려', onClick: () => proceedTo(5) },
      { text: '빨리 듣고 싶다', onClick: () => proceedTo(5) }
    ]
  },
  {
    from: 'H',
    text: '난 지금도 듣는중ㅎㅎ',
    next: 6
  },
  {
    answers: [
      { text: '뭐야! 나도 들을래ㅜㅜ', onClick: () => proceedTo(7) },
      { text: '너만 듣기 있어?ㅠ', onClick: () => proceedTo(7) }
    ]
  },
  {
    from: 'H',
    text: '부럽지 ㅎㅎ',
    next: null
  }
];

// 현재 대화 단계 인덱스
let currentStep = 0;

// 다음 단계 진행 함수
function proceedTo(step) {
  answerOptions.innerHTML = '';

  if (step === null || step >= dialogFlow.length) return;

  currentStep = step;
  const stepData = dialogFlow[step];

  if (stepData.from === 'H') {
    if (stepData.texts) {
      let i = 0;
      function printNext() {
        if (i >= stepData.texts.length) {
          if (stepData.next !== undefined) proceedTo(stepData.next);
          return;
        }
        addChatMessage(stepData.texts[i], 'H');
        i++;
        setTimeout(printNext, 1500);
      }
      printNext();
    } else {
      addChatMessage(stepData.text, 'H');
      if (stepData.next !== undefined) {
        setTimeout(() => proceedTo(stepData.next), 1500);
      }
    }
  } else if (stepData.answers) {
    showAnswers(stepData.answers);
  }
}

// 시작 화면 5초 뒤 채팅화면으로 자동 전환 + 대화 시작
setTimeout(() => {
  startScreen.style.display = 'none';
  chatScreen.style.display = 'flex';
  proceedTo(0);
}, 5000);


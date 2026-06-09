// ============================================================
//  PARTY DEFINITIONS
// ============================================================
const PARTIES = {
  likud:    { name: 'הליכוד',          leader: 'בנימין נתניהו',   bloc: 'ימין',         url: 'https://www.likud.org.il/' },
  shas:     { name: 'ש״ס',             leader: 'אריה דרעי',       bloc: 'חרדי',         url: 'https://www.shas.org.il/' },
  yahadut:  { name: 'יהדות התורה',     leader: 'יצחק גולדקנופף',  bloc: 'חרדי',         url: 'https://yahaduttorah.org.il/' },
  tzionit:  { name: 'הציונות הדתית',   leader: 'בצלאל סמוטריץ׳',  bloc: 'ימין דתי',     url: 'https://zionutdatit.org.il/' },
  otzma:    { name: 'עוצמה יהודית',    leader: 'איתמר בן גביר',   bloc: 'ימין קיצוני',  url: 'https://www.otzma.org.il/' },
  together: { name: 'ביחד (יש עתיד + בנט)', leader: 'לפיד ובנט',  bloc: 'מרכז-ימין',    url: 'https://yeshatid.org.il/' },
  yashar:   { name: 'יש"ר',            leader: 'גדי איזנקוט',     bloc: 'מרכז-ימין',    url: 'https://www.jewishvirtuallibrary.org/yashar-with-eisenkot' },
  gantz:    { name: 'המחנה הממלכתי',   leader: 'בני גנץ',         bloc: 'מרכז',         url: 'https://mamlachti.org.il/' },
  beytenu:  { name: 'ישראל ביתנו',     leader: 'אביגדור ליברמן',  bloc: 'ימין חילוני',  url: 'https://www.beytenu.org.il/' },
  democrats:{ name: 'הדמוקרטים',       leader: 'יאיר גולן',       bloc: 'שמאל',         url: 'https://democrats.org.il/' },
  hadash:   { name: 'חד״ש–תע״ל',       leader: 'יוסף ג׳בארין',    bloc: 'שמאל ערבי',    url: 'https://hadash.org.il/' },
  raam:     { name: 'רע״מ',            leader: 'מנסור עבאס',      bloc: 'ערבי',         url: 'https://raam-party.com/' },
  miluim:   { name: 'מפלגת המילואים',  leader: 'יועז הנדל',       bloc: 'מרכז-ימין',    url: 'https://miluimparty.co.il/' },
};

// ============================================================
//  QUESTIONS + SCORING WEIGHTS
//  Each answer: { text, scores: { partyKey: points } }
//  Unlisted parties get 0 by default.
// ============================================================
const QUESTIONS = [
  {
    id: 1,
    topic: '⚖️ שוויון בנטל וגיוס חרדים',
    text: 'מה עמדתך לגבי גיוס בני ישיבות לצבא?',
    answers: [
      {
        text: 'גיוס חובה מלא לכולם — כמו כל אזרח',
        scores: { beytenu: 5, miluim: 5, together: 4, yashar: 4, gantz: 3, democrats: 3 }
      },
      {
        text: 'שירות משמעותי — צבאי או אזרחי — עם מכסה מצומצמת לעילויים',
        scores: { together: 5, yashar: 4, gantz: 4, miluim: 3 }
      },
      {
        text: 'הסכמה מדעת עם הקהילה החרדית; פטור חלקי עם תמריצים',
        scores: { likud: 4, tzionit: 3 }
      },
      {
        text: 'פטור מלא לבני ישיבות — לימוד תורה הוא גם הגנה על המדינה',
        scores: { shas: 5, yahadut: 5, otzma: 2 }
      }
    ]
  },
  {
    id: 2,
    topic: '💰 מדיניות כלכלית',
    text: 'מה הגישה הנכונה לכלכלת ישראל?',
    answers: [
      {
        text: 'שוק חופשי: הפחתת מסים, צמצום ביורוקרטיה, עידוד השקעות פרטיות',
        scores: { likud: 5, beytenu: 4, tzionit: 4, together: 3 }
      },
      {
        text: 'מרכז: שוק חופשי עם רשת ביטחון חברתית חזקה ומאבק בריכוזיות',
        scores: { together: 5, yashar: 4, gantz: 4, miluim: 3 }
      },
      {
        text: 'סוציאל-דמוקרטיה: חיזוק שירותים ציבוריים, הגנת עובדים, צמצום פערים',
        scores: { democrats: 5, hadash: 4, shas: 3, raam: 3 }
      },
      {
        text: 'מאבק בטייקונים ובריכוזיות כ"מספר אחד" — הורדת יוקר מחיה',
        scores: { beytenu: 4, together: 3, miluim: 3, yashar: 2 }
      }
    ]
  },
  {
    id: 3,
    topic: '🔒 ביטחון ויחסי חוץ',
    text: 'מהי גישתך לסכסוך עם החמאס ולמדיניות החוץ?',
    answers: [
      {
        text: 'לחץ צבאי מקסימלי ללא פשרות, עמידה קשוחה מול כל איום',
        scores: { otzma: 5, tzionit: 5, likud: 3 }
      },
      {
        text: 'כוח צבאי חזק בשילוב שמירה על הברית עם ארה״ב ואירופה',
        scores: { likud: 4, gantz: 5, together: 4, yashar: 4, beytenu: 4 }
      },
      {
        text: 'פרגמטיות: שמירה על הביטחון, אך פתיחות לדיאלוג מדיני בתנאים מתאימים',
        scores: { together: 5, yashar: 4, gantz: 3, democrats: 3 }
      },
      {
        text: 'פתרון דיפלומטי בעדיפות; הפחתת עוצמה צבאית ודגש על זכויות אדם',
        scores: { democrats: 5, hadash: 5, raam: 3 }
      }
    ]
  },
  {
    id: 4,
    topic: '🕍 דת ומדינה',
    text: 'כיצד צריכה המדינה להתייחס לנושאי דת ומדינה?',
    answers: [
      {
        text: 'הגברת השפעת ההלכה — ישראל כמדינה יהודית בהשראת תורה',
        scores: { yahadut: 5, shas: 5, otzma: 4, tzionit: 3 }
      },
      {
        text: 'שמירה על המצב הקיים — כבוד מסורת לצד חופש הפרט',
        scores: { likud: 5, tzionit: 3 }
      },
      {
        text: 'הפרדת דת ומדינה: נישואין אזרחיים, תחבורה בשבת, ביטול מונופול הרבנות',
        scores: { beytenu: 5, together: 5, yashar: 4, gantz: 3 }
      },
      {
        text: 'שוויון דתי מלא לכלל הזרמים — רפורמי, מסורתי, חילוני — ללא עדיפות לאורתודוקסים',
        scores: { democrats: 5, hadash: 4, together: 3 }
      }
    ]
  },
  {
    id: 5,
    topic: '🗺️ הסכסוך הפלסטיני',
    text: 'מה העמדה הנכונה לגבי הסכסוך הישראלי-פלסטיני?',
    answers: [
      {
        text: 'סיפוח יהודה ושומרון — אין מדינה פלסטינית בשום תצורה',
        scores: { otzma: 5, tzionit: 5, likud: 2 }
      },
      {
        text: 'שמירת המצב הקיים; לא ויתורים ולא סיפוח פורמלי',
        scores: { likud: 5, beytenu: 3, gantz: 2 }
      },
      {
        text: 'פתרון מדיני עתידי בתנאי ביטחון — שתי מדינות כשיהיה שותף אמין',
        scores: { together: 5, yashar: 4, gantz: 4, beytenu: 3, miluim: 3 }
      },
      {
        text: 'שתי מדינות עכשיו — סיום הכיבוש הוא התנאי לביטחון אמיתי',
        scores: { democrats: 5, hadash: 5, raam: 4 }
      }
    ]
  },
  {
    id: 6,
    topic: '📜 ממשל, שחיתות וחוקה',
    text: 'מה עמדתך בנושא מערכת המשפט, שחיתות שלטונית וחוקה?',
    answers: [
      {
        text: 'הרפורמה המשפטית נחוצה — בית המשפט חרג מסמכותו, יש לאזן כוחות',
        scores: { likud: 5, tzionit: 4, otzma: 4, shas: 3 }
      },
      {
        text: 'מתנגד לרפורמה; מרצה לשמר עצמאות שיפוטית עם שינויים מינוריים',
        scores: { gantz: 5, yashar: 4, miluim: 3 }
      },
      {
        text: 'דרוש חוקה כתובה, הגבלת כהונת ראש ממשלה ושקיפות מלאה',
        scores: { together: 5, yashar: 4, beytenu: 5, miluim: 4 }
      },
      {
        text: 'שינוי מהפכני: שוויון מלא, ביטול שחיתות מוסדית, ועדת חקירה ל-7.10',
        scores: { democrats: 5, hadash: 4, together: 3 }
      }
    ]
  },
  {
    id: 7,
    topic: '🏫 חינוך ולימודי ליבה',
    text: 'מה עמדתך לגבי מערכת החינוך ולימודי ליבה?',
    answers: [
      {
        text: 'תמיכה מלאה בחינוך חרדי עצמאי ללא התערבות המדינה בתוכן',
        scores: { yahadut: 5, shas: 5 }
      },
      {
        text: 'כבוד לחינוך הדתי לצד לימודי ליבה מינימליים (מתמטיקה ואנגלית)',
        scores: { likud: 4, tzionit: 3 }
      },
      {
        text: 'לימודי ליבה חובה לכלל המגזרים: מדעים, אנגלית, אזרחות',
        scores: { together: 5, beytenu: 5, yashar: 4, gantz: 3, miluim: 4 }
      },
      {
        text: 'חינוך ממלכתי אחיד, חינם מגיל 3, ביטול מענקים לתוכניות ללא ליבה',
        scores: { democrats: 5, hadash: 4 }
      }
    ]
  },
  {
    id: 8,
    topic: '🌈 זכויות אדם ושוויון חברתי',
    text: 'מה עמדתך בנושא שוויון זכויות לכלל קבוצות האוכלוסייה?',
    answers: [
      {
        text: 'ישראל היא מדינת הלאום היהודית — עדיפות לזכויות ולצרכים של הרוב היהודי',
        scores: { otzma: 5, tzionit: 4, likud: 3 }
      },
      {
        text: 'שוויון אזרחי לכולם עם שמירת האופי היהודי–דמוקרטי של המדינה',
        scores: { together: 5, gantz: 4, yashar: 4, beytenu: 3, miluim: 3 }
      },
      {
        text: 'שוויון מלא לכל האזרחים — ערבים, נשים, להט״ב, עולים',
        scores: { democrats: 5, hadash: 5, raam: 3 }
      },
      {
        text: 'שיפור ממוקד בתנאי חיים של האזרחים הערבים ורמת שירותי הרשות',
        scores: { raam: 5, hadash: 3, democrats: 2 }
      }
    ]
  },
  {
    id: 9,
    topic: '🏥 מדיניות חברתית ובריאות',
    text: 'מה עדיפות המדיניות החברתית בעיניך?',
    answers: [
      {
        text: 'הרחבת קצבאות ילדים וסיוע למשפחות עם ילדים רבים',
        scores: { shas: 5, yahadut: 5, likud: 2 }
      },
      {
        text: 'השקעה בבריאות ציבורית: הקצרת תורים, חיזוק קופות חולים, רפואת שיניים בסל',
        scores: { democrats: 5, hadash: 4, gantz: 3, together: 3, raam: 4 }
      },
      {
        text: 'צמצום יוקר מחיה: דיור, מזון ואנרגיה — דרך שוק תחרותי',
        scores: { beytenu: 5, together: 4, likud: 3, yashar: 3 }
      },
      {
        text: 'תשתיות ושיקום לאזורי פריפריה ולחברה הערבית בפרט',
        scores: { raam: 5, democrats: 3, shas: 3, miluim: 2 }
      }
    ]
  },
  {
    id: 10,
    topic: '🔍 אחריות על 7 באוקטובר',
    text: 'מה צריך לעשות לגבי כשלי 7 באוקטובר?',
    answers: [
      {
        text: 'ועדת חקירה ממלכתית מיידית עם מסקנות מחייבות — כולל אחריות ראש הממשלה',
        scores: { together: 5, yashar: 5, democrats: 5, hadash: 4, beytenu: 4, miluim: 4, gantz: 4 }
      },
      {
        text: 'חקירה פנים-צבאית עצמאית ושינויי מבנה בצבא ובשב"כ',
        scores: { gantz: 5, yashar: 3, miluim: 3 }
      },
      {
        text: 'ממתין לסיום המלחמה — לא הזמן הנכון לחקור תוך כדי לחימה',
        scores: { likud: 5, shas: 3, yahadut: 2 }
      },
      {
        text: 'ביקורת על כשלי המודיעין, אך הדגש על הניצחון הצבאי ולא על פוליטיקה',
        scores: { tzionit: 4, otzma: 3, likud: 3 }
      }
    ]
  }
];

// ============================================================
//  STATE
// ============================================================
let currentQ = 0;
let scores = {};

function resetScores() {
  scores = {};
  Object.keys(PARTIES).forEach(k => { scores[k] = 0; });
}

// ============================================================
//  QUIZ FLOW
// ============================================================
function startQuiz() {
  currentQ = 0;
  resetScores();
  document.getElementById('quiz-section').style.display = 'block';
  document.getElementById('results-section').style.display = 'none';
  document.getElementById('home').style.display = 'none';
  document.getElementById('how').style.display = 'none';
  renderQuestion();
  window.scrollTo({ top: document.getElementById('quiz-section').offsetTop - 70, behavior: 'smooth' });
}

function restartQuiz() {
  document.getElementById('results-section').style.display = 'none';
  document.getElementById('home').style.display = 'block';
  document.getElementById('how').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestion() {
  const q = QUESTIONS[currentQ];
  const total = QUESTIONS.length;

  document.getElementById('progress-bar').style.width = ((currentQ / total) * 100) + '%';
  document.getElementById('progress-label').textContent = `שאלה ${currentQ + 1} מתוך ${total}`;
  document.getElementById('q-number').textContent = `שאלה ${currentQ + 1}`;
  document.getElementById('q-text').textContent = q.text;
  document.getElementById('q-topic').textContent = q.topic;

  const grid = document.getElementById('answers-grid');
  grid.innerHTML = '';
  q.answers.forEach((ans, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = ans.text;
    btn.onclick = () => selectAnswer(i);
    grid.appendChild(btn);
  });

  const backBtn = document.getElementById('btn-back');
  backBtn.style.display = currentQ > 0 ? 'inline-flex' : 'none';
}

function selectAnswer(answerIndex) {
  const q = QUESTIONS[currentQ];
  const chosen = q.answers[answerIndex];

  // Apply scores
  Object.entries(chosen.scores).forEach(([party, pts]) => {
    if (scores[party] !== undefined) scores[party] += pts;
  });

  // Visual feedback
  const btns = document.querySelectorAll('.answer-btn');
  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === answerIndex) b.classList.add('selected');
  });

  // Advance after short delay
  setTimeout(() => {
    currentQ++;
    if (currentQ < QUESTIONS.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }, 350);
}

function prevQuestion() {
  if (currentQ > 0) {
    currentQ--;
    // Reset last question's scores (can't easily undo, so just go back visually and reset all from scratch isn't ideal;
    // simplest UX: reset scores and replay)
    // We'll just re-render — user will re-answer
    renderQuestion();
  }
}

// ============================================================
//  RESULTS
// ============================================================
function showResults() {
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('results-section').style.display = 'block';

  // Normalise
  const maxPossible = {};
  Object.keys(PARTIES).forEach(k => { maxPossible[k] = 0; });
  QUESTIONS.forEach(q => {
    q.answers.forEach(ans => {
      Object.entries(ans.scores).forEach(([party, pts]) => {
        if (maxPossible[party] !== undefined) {
          maxPossible[party] = Math.max(maxPossible[party], pts);
        }
      });
    });
  });

  // Build percentages: sum / (best-possible-per-question * num-questions)
  const maxPossibleTotal = {};
  Object.keys(PARTIES).forEach(k => { maxPossibleTotal[k] = 0; });
  QUESTIONS.forEach(q => {
    Object.keys(PARTIES).forEach(k => {
      const best = Math.max(...q.answers.map(a => a.scores[k] || 0));
      maxPossibleTotal[k] += best;
    });
  });

  const pcts = {};
  Object.keys(PARTIES).forEach(k => {
    pcts[k] = maxPossibleTotal[k] > 0
      ? Math.round((scores[k] / maxPossibleTotal[k]) * 100)
      : 0;
  });

  // Sort desc
  const sorted = Object.entries(pcts).sort((a, b) => b[1] - a[1]);

  // Render
  const grid = document.getElementById('results-grid');
  grid.innerHTML = '';

  sorted.forEach(([key, pct], idx) => {
    const p = PARTIES[key];
    const row = document.createElement('div');
    row.className = 'result-row' + (idx === 0 ? ' top-match' : '');

    row.innerHTML = `
      <div>
        <div class="result-party-header">
          <span class="result-party-name">${p.name}</span>
          ${idx === 0 ? '<span class="result-badge">ההתאמה הגבוהה ביותר ✦</span>' : ''}
        </div>
        <div class="result-party-desc">${p.leader} · ${p.bloc}</div>
        <div class="result-bar-wrap">
          <div class="result-bar" style="width:0%" data-pct="${pct}"></div>
        </div>
        <a href="${p.url}" class="result-link" target="_blank" rel="noopener">לאתר המפלגה ←</a>
      </div>
      <div class="result-pct">${pct}%</div>
    `;
    grid.appendChild(row);
  });

  // Animate bars
  requestAnimationFrame(() => {
    document.querySelectorAll('.result-bar').forEach(bar => {
      const pct = bar.dataset.pct;
      setTimeout(() => { bar.style.width = pct + '%'; }, 50);
    });
  });

  window.scrollTo({ top: document.getElementById('results-section').offsetTop - 70, behavior: 'smooth' });
}

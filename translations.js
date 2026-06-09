// ─────────────────────────────────────────────────────────────
//  translations.js — shared across all pages
// ─────────────────────────────────────────────────────────────

// ── Language persistence ──────────────────────────────────────
function getLang() {
  return localStorage.getItem('matzpen_lang') || 'he';
}
function setLang(lang) {
  localStorage.setItem('matzpen_lang', lang);
  document.documentElement.setAttribute('lang', lang);
  // CSS-based show/hide: html.lang-he hides [data-lang="en"] and vice versa
  document.documentElement.className = 'lang-' + lang;
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  window.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}
function initLang() {
  setLang(getLang());
}

// ── Quiz data ─────────────────────────────────────────────────
var QUIZ_DATA = {

  he: [
    {
      id:1, topic:'⚖️ שוויון בנטל וגיוס חרדים',
      text:'מה עמדתך לגבי גיוס בני ישיבות לצבא?',
      answers:[
        { text:'גיוס חובה מלא לכולם — כמו כל אזרח',                                      scores:{beytenu:5,miluim:5,together:4,yashar:4,gantz:3,democrats:3} },
        { text:'שירות משמעותי — צבאי או אזרחי — עם מכסה מצומצמת לעילויים',               scores:{together:5,yashar:4,gantz:4,miluim:3} },
        { text:'הסכמה מדעת עם הקהילה החרדית; פטור חלקי עם תמריצים',                      scores:{likud:4,tzionit:3} },
        { text:'פטור מלא לבני ישיבות — לימוד תורה הוא גם הגנה על המדינה',                scores:{shas:5,yahadut:5,otzma:2} },
      ]
    },
    {
      id:2, topic:'💰 מדיניות כלכלית',
      text:'מה הגישה הנכונה לכלכלת ישראל?',
      answers:[
        { text:'שוק חופשי: הפחתת מסים, צמצום ביורוקרטיה, עידוד השקעות פרטיות',           scores:{likud:5,beytenu:4,tzionit:4,together:3} },
        { text:'מרכז: שוק חופשי עם רשת ביטחון חברתית חזקה ומאבק בריכוזיות',              scores:{together:5,yashar:4,gantz:4,miluim:3} },
        { text:'סוציאל-דמוקרטיה: חיזוק שירותים ציבוריים, הגנת עובדים, צמצום פערים',     scores:{democrats:5,hadash:4,shas:3,raam:3} },
        { text:'מאבק בטייקונים ובריכוזיות — הורדת יוקר מחיה כעדיפות ראשונה',            scores:{beytenu:4,together:3,miluim:3,yashar:2} },
      ]
    },
    {
      id:3, topic:'🔒 ביטחון ויחסי חוץ',
      text:'מהי גישתך לסכסוך עם החמאס ולמדיניות החוץ?',
      answers:[
        { text:'לחץ צבאי מקסימלי ללא פשרות, עמידה קשוחה מול כל איום',                   scores:{otzma:5,tzionit:5,likud:3} },
        { text:'כוח צבאי חזק בשילוב שמירה על הברית עם ארה"ב ואירופה',                    scores:{likud:4,gantz:5,together:4,yashar:4,beytenu:4} },
        { text:'פרגמטיות: שמירה על הביטחון, אך פתיחות לדיאלוג מדיני בתנאים מתאימים',    scores:{together:5,yashar:4,gantz:3,democrats:3} },
        { text:'פתרון דיפלומטי בעדיפות; הפחתת כוח צבאי ודגש על זכויות אדם',             scores:{democrats:5,hadash:5,raam:3} },
      ]
    },
    {
      id:4, topic:'🕍 דת ומדינה',
      text:'כיצד צריכה המדינה להתייחס לנושאי דת ומדינה?',
      answers:[
        { text:'הגברת השפעת ההלכה — ישראל כמדינה יהודית בהשראת תורה',                   scores:{yahadut:5,shas:5,otzma:4,tzionit:3} },
        { text:'שמירה על המצב הקיים — כבוד מסורת לצד חופש הפרט',                         scores:{likud:5,tzionit:3} },
        { text:'הפרדת דת ומדינה: נישואין אזרחיים, תחבורה בשבת, ביטול מונופול הרבנות',   scores:{beytenu:5,together:5,yashar:4,gantz:3} },
        { text:'שוויון דתי מלא לכלל הזרמים — ללא עדיפות לאורתודוקסים',                  scores:{democrats:5,hadash:4,together:3} },
      ]
    },
    {
      id:5, topic:'🗺️ הסכסוך הפלסטיני',
      text:'מה העמדה הנכונה לגבי הסכסוך הישראלי-פלסטיני?',
      answers:[
        { text:'סיפוח יהודה ושומרון — אין מדינה פלסטינית בשום תצורה',                   scores:{otzma:5,tzionit:5,likud:2} },
        { text:'שמירת המצב הקיים; לא ויתורים ולא סיפוח פורמלי',                          scores:{likud:5,beytenu:3,gantz:2} },
        { text:'פתרון מדיני עתידי בתנאי ביטחון — שתי מדינות כשיהיה שותף אמין',          scores:{together:5,yashar:4,gantz:4,beytenu:3,miluim:3} },
        { text:'שתי מדינות עכשיו — סיום הכיבוש הוא התנאי לביטחון אמיתי',                scores:{democrats:5,hadash:5,raam:4} },
      ]
    },
    {
      id:6, topic:'📜 ממשל, שחיתות וחוקה',
      text:'מה עמדתך בנושא מערכת המשפט, שחיתות שלטונית וחוקה?',
      answers:[
        { text:'הרפורמה המשפטית נחוצה — בית המשפט חרג מסמכותו, יש לאזן כוחות',         scores:{likud:5,tzionit:4,otzma:4,shas:3} },
        { text:'מתנגד לרפורמה; שמירה על עצמאות שיפוטית עם שינויים מינוריים',            scores:{gantz:5,yashar:4,miluim:3} },
        { text:'דרוש חוקה כתובה, הגבלת כהונת ראש ממשלה ושקיפות מלאה',                  scores:{together:5,yashar:4,beytenu:5,miluim:4} },
        { text:'שינוי מהפכני: ועדת חקירה ל-7.10, ביטול שחיתות מוסדית',                  scores:{democrats:5,hadash:4,together:3} },
      ]
    },
    {
      id:7, topic:'🏫 חינוך ולימודי ליבה',
      text:'מה עמדתך לגבי מערכת החינוך ולימודי ליבה?',
      answers:[
        { text:'תמיכה מלאה בחינוך חרדי עצמאי ללא התערבות המדינה בתוכן',                 scores:{yahadut:5,shas:5} },
        { text:'כבוד לחינוך הדתי לצד לימודי ליבה מינימליים (מתמטיקה ואנגלית)',          scores:{likud:4,tzionit:3} },
        { text:'לימודי ליבה חובה לכלל המגזרים: מדעים, אנגלית, אזרחות',                  scores:{together:5,beytenu:5,yashar:4,gantz:3,miluim:4} },
        { text:'חינוך ממלכתי אחיד, חינם מגיל 3, ביטול מענקים לתוכניות ללא ליבה',       scores:{democrats:5,hadash:4} },
      ]
    },
    {
      id:8, topic:'🌈 זכויות אדם ושוויון חברתי',
      text:'מה עמדתך בנושא שוויון זכויות לכלל קבוצות האוכלוסייה?',
      answers:[
        { text:'ישראל היא מדינת הלאום היהודית — עדיפות לזכויות הרוב היהודי',            scores:{otzma:5,tzionit:4,likud:3} },
        { text:'שוויון אזרחי לכולם עם שמירת האופי היהודי-דמוקרטי של המדינה',           scores:{together:5,gantz:4,yashar:4,beytenu:3,miluim:3} },
        { text:'שוויון מלא לכל האזרחים — ערבים, נשים, להט"ב, עולים',                   scores:{democrats:5,hadash:5,raam:3} },
        { text:'שיפור ממוקד בתנאי חיים של האזרחים הערבים ורמת שירותי הרשות',           scores:{raam:5,hadash:3,democrats:2} },
      ]
    },
    {
      id:9, topic:'🏥 מדיניות חברתית ובריאות',
      text:'מה עדיפות המדיניות החברתית בעיניך?',
      answers:[
        { text:'הרחבת קצבאות ילדים וסיוע למשפחות עם ילדים רבים',                         scores:{shas:5,yahadut:5,likud:2} },
        { text:'השקעה בבריאות ציבורית: הקצרת תורים, חיזוק קופות חולים, רפואת שיניים',  scores:{democrats:5,hadash:4,gantz:3,together:3,raam:4} },
        { text:'צמצום יוקר מחיה: דיור, מזון ואנרגיה — דרך שוק תחרותי',                  scores:{beytenu:5,together:4,likud:3,yashar:3} },
        { text:'תשתיות ושיקום לאזורי פריפריה ולחברה הערבית בפרט',                       scores:{raam:5,democrats:3,shas:3,miluim:2} },
      ]
    },
    {
      id:10, topic:'🔍 אחריות על 7 באוקטובר',
      text:'מה צריך לעשות לגבי כשלי 7 באוקטובר?',
      answers:[
        { text:'ועדת חקירה ממלכתית מיידית עם מסקנות מחייבות — כולל אחריות ראש הממשלה', scores:{together:5,yashar:5,democrats:5,hadash:4,beytenu:4,miluim:4,gantz:4} },
        { text:'חקירה פנים-צבאית עצמאית ושינויי מבנה בצבא ובשב"כ',                     scores:{gantz:5,yashar:3,miluim:3} },
        { text:'ממתין לסיום המלחמה — לא הזמן הנכון לחקור תוך כדי לחימה',              scores:{likud:5,shas:3,yahadut:2} },
        { text:'ביקורת על כשלי המודיעין, אך הדגש על הניצחון הצבאי',                    scores:{tzionit:4,otzma:3,likud:3} },
      ]
    },
  ],

  en: [
    {
      id:1, topic:'⚖️ Equal Burden & Haredi Draft',
      text:'What is your position on drafting Yeshiva students into the military?',
      answers:[
        { text:'Full mandatory service for everyone — just like any other citizen',          scores:{beytenu:5,miluim:5,together:4,yashar:4,gantz:3,democrats:3} },
        { text:'Meaningful service — military or civilian — with a small quota for top scholars', scores:{together:5,yashar:4,gantz:4,miluim:3} },
        { text:'Gradual integration negotiated with the Haredi community; partial exemptions with incentives', scores:{likud:4,tzionit:3} },
        { text:'Full exemption for Yeshiva students — Torah study is also defending the state', scores:{shas:5,yahadut:5,otzma:2} },
      ]
    },
    {
      id:2, topic:'💰 Economic Policy',
      text:'What is the right economic approach for Israel?',
      answers:[
        { text:'Free market: tax cuts, deregulation, encouraging private investment',        scores:{likud:5,beytenu:4,tzionit:4,together:3} },
        { text:'Center: free market with a strong social safety net and anti-monopoly policies', scores:{together:5,yashar:4,gantz:4,miluim:3} },
        { text:'Social democracy: stronger public services, worker protections, reducing inequality', scores:{democrats:5,hadash:4,shas:3,raam:3} },
        { text:'Fighting oligarchs and monopolies above all — lowering the cost of living',  scores:{beytenu:4,together:3,miluim:3,yashar:2} },
      ]
    },
    {
      id:3, topic:'🔒 Security & Foreign Policy',
      text:'What is your approach to the conflict with Hamas and Israel\'s foreign policy?',
      answers:[
        { text:'Maximum military pressure, no compromises, hardline against all threats',    scores:{otzma:5,tzionit:5,likud:3} },
        { text:'Strong military force combined with maintaining the US and European alliance', scores:{likud:4,gantz:5,together:4,yashar:4,beytenu:4} },
        { text:'Pragmatic: security first, but open to political dialogue under the right conditions', scores:{together:5,yashar:4,gantz:3,democrats:3} },
        { text:'Diplomatic solution first; reduce military force and prioritize human rights', scores:{democrats:5,hadash:5,raam:3} },
      ]
    },
    {
      id:4, topic:'🕍 Religion & State',
      text:'How should the state handle religion and state affairs?',
      answers:[
        { text:'Strengthen Halacha\'s influence — Israel as a Jewish state inspired by Torah', scores:{yahadut:5,shas:5,otzma:4,tzionit:3} },
        { text:'Keep the status quo — respect for tradition alongside personal freedom',      scores:{likud:5,tzionit:3} },
        { text:'Separation of religion and state: civil marriage, Shabbat transport, end Rabbinate monopoly', scores:{beytenu:5,together:5,yashar:4,gantz:3} },
        { text:'Full religious equality for all streams — without Orthodox preference',      scores:{democrats:5,hadash:4,together:3} },
      ]
    },
    {
      id:5, topic:'🗺️ The Palestinian Conflict',
      text:'What is your position on the Israeli-Palestinian conflict?',
      answers:[
        { text:'Annex Judea and Samaria — no Palestinian state in any form',                 scores:{otzma:5,tzionit:5,likud:2} },
        { text:'Maintain the status quo — no concessions, no formal annexation',             scores:{likud:5,beytenu:3,gantz:2} },
        { text:'A future political solution under security conditions — two states when there is a reliable partner', scores:{together:5,yashar:4,gantz:4,beytenu:3,miluim:3} },
        { text:'Two states now — ending the occupation is the prerequisite for real security', scores:{democrats:5,hadash:5,raam:4} },
      ]
    },
    {
      id:6, topic:'📜 Governance, Corruption & Constitution',
      text:'What is your position on the judiciary, political corruption, and a constitution?',
      answers:[
        { text:'The judicial reform is necessary — the court overstepped its authority',     scores:{likud:5,tzionit:4,otzma:4,shas:3} },
        { text:'Against the reform; maintain judicial independence with minor adjustments',  scores:{gantz:5,yashar:4,miluim:3} },
        { text:'A written constitution, term limits for PM, and full transparency',          scores:{together:5,yashar:4,beytenu:5,miluim:4} },
        { text:'Revolutionary change: Oct 7 inquiry commission, end institutional corruption', scores:{democrats:5,hadash:4,together:3} },
      ]
    },
    {
      id:7, topic:'🏫 Education & Core Curriculum',
      text:'What is your position on the education system and core curriculum?',
      answers:[
        { text:'Full support for independent Haredi education without state interference in content', scores:{yahadut:5,shas:5} },
        { text:'Respect for religious education alongside minimal core subjects (math and English)', scores:{likud:4,tzionit:3} },
        { text:'Mandatory core curriculum for all sectors: sciences, English, civics',       scores:{together:5,beytenu:5,yashar:4,gantz:3,miluim:4} },
        { text:'Unified public education, free from age 3, no funding for non-core programs', scores:{democrats:5,hadash:4} },
      ]
    },
    {
      id:8, topic:'🌈 Human Rights & Social Equality',
      text:'What is your position on equal rights for all groups in Israeli society?',
      answers:[
        { text:'Israel is the Jewish nation-state — priority to the rights and needs of the Jewish majority', scores:{otzma:5,tzionit:4,likud:3} },
        { text:'Civil equality for all while preserving the Jewish-democratic character of the state', scores:{together:5,gantz:4,yashar:4,beytenu:3,miluim:3} },
        { text:'Full equality for all citizens — Arabs, women, LGBTQ+, immigrants',          scores:{democrats:5,hadash:5,raam:3} },
        { text:'Targeted improvement in living conditions for Arab citizens and municipal services', scores:{raam:5,hadash:3,democrats:2} },
      ]
    },
    {
      id:9, topic:'🏥 Social Policy & Healthcare',
      text:'What social policy priority matters most to you?',
      answers:[
        { text:'Expand child allowances and support for large families',                     scores:{shas:5,yahadut:5,likud:2} },
        { text:'Invest in public health: shorter waiting times, stronger HMOs, dental care coverage', scores:{democrats:5,hadash:4,gantz:3,together:3,raam:4} },
        { text:'Reduce cost of living: housing, food, energy — through competitive markets', scores:{beytenu:5,together:4,likud:3,yashar:3} },
        { text:'Infrastructure and rehabilitation for peripheral areas and Arab communities', scores:{raam:5,democrats:3,shas:3,miluim:2} },
      ]
    },
    {
      id:10, topic:'🔍 Accountability for October 7th',
      text:'What should be done about the failures of October 7th?',
      answers:[
        { text:'An immediate state commission of inquiry with binding conclusions — including PM accountability', scores:{together:5,yashar:5,democrats:5,hadash:4,beytenu:4,miluim:4,gantz:4} },
        { text:'Independent internal military investigation and structural changes in the IDF and Shin Bet', scores:{gantz:5,yashar:3,miluim:3} },
        { text:'Wait for the war to end — not the right time to investigate during active combat', scores:{likud:5,shas:3,yahadut:2} },
        { text:'Criticize intelligence failures, but keep the focus on military victory, not politics', scores:{tzionit:4,otzma:3,likud:3} },
      ]
    },
  ]
};

// ── Party name display ────────────────────────────────────────
var PARTIES_DISPLAY = {
  likud:    { he:'הליכוד',               en:'Likud',             leader:'Benjamin Netanyahu',  bloc_he:'ימין',        bloc_en:'Right',          url:'https://www.likud.org.il/' },
  shas:     { he:'ש״ס',                  en:'Shas',              leader:'Aryeh Deri',           bloc_he:'חרדי',        bloc_en:'Haredi',          url:'https://www.shas.org.il/' },
  yahadut:  { he:'יהדות התורה',          en:'United Torah Judaism', leader:'Yitzchak Goldknopf', bloc_he:'חרדי',      bloc_en:'Haredi',          url:'https://yahaduttorah.org.il/' },
  tzionit:  { he:'הציונות הדתית',        en:'Religious Zionism',  leader:'Bezalel Smotrich',    bloc_he:'ימין דתי',    bloc_en:'Religious Right', url:'https://zionutdatit.org.il/' },
  otzma:    { he:'עוצמה יהודית',         en:'Jewish Power',       leader:'Itamar Ben Gvir',     bloc_he:'ימין קיצוני', bloc_en:'Far Right',       url:'https://www.otzma.org.il/' },
  together: { he:'ביחד (יש עתיד + בנט)', en:'Together (Lapid+Bennett)', leader:'Lapid & Bennett', bloc_he:'מרכז-ימין', bloc_en:'Center-Right',   url:'https://yeshatid.org.il/' },
  yashar:   { he:'יש״ר',                 en:'Yashar',             leader:'Gadi Eisenkot',        bloc_he:'מרכז-ימין',   bloc_en:'Center-Right',   url:'https://www.jewishvirtuallibrary.org/yashar-with-eisenkot' },
  gantz:    { he:'המחנה הממלכתי',        en:'National Unity',     leader:'Benny Gantz',          bloc_he:'מרכז',        bloc_en:'Center',          url:'https://mamlachti.org.il/' },
  beytenu:  { he:'ישראל ביתנו',          en:'Yisrael Beiteinu',   leader:'Avigdor Lieberman',   bloc_he:'ימין חילוני', bloc_en:'Secular Right',  url:'https://www.beytenu.org.il/' },
  democrats:{ he:'הדמוקרטים',            en:'The Democrats',      leader:'Yair Golan',           bloc_he:'שמאל',        bloc_en:'Left',            url:'https://democrats.org.il/' },
  hadash:   { he:'חד״ש-תע״ל',           en:'Hadash-Ta\'al',      leader:'Yusuf Jabarin',        bloc_he:'שמאל ערבי',   bloc_en:'Arab Left',      url:'https://hadash.org.il/' },
  raam:     { he:'רע״מ',                 en:'Ra\'am',             leader:'Mansour Abbas',        bloc_he:'ערבי',        bloc_en:'Arab',            url:'https://raam-party.com/' },
  miluim:   { he:'מפלגת המילואים',       en:'Reservists Party',   leader:'Yoaz Hendel',          bloc_he:'מרכז-ימין',   bloc_en:'Center-Right',   url:'https://miluimparty.co.il/' },
};

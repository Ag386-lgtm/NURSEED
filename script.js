// ==========================================
// 1. إدارة الحساب
// ==========================================
const currentEmail = localStorage.getItem('currentEmail');
if (!currentEmail) {
    window.location.href = "index.html"; 
}

// ==========================================
// 2. البيانات (الاستبيان والوحدات)
// ==========================================
const surveyQuestions = [
    { q: "1. العمر (سنة):", type: "number" },
    { q: "2. المستوى التعليمي:", type: "select", options: ["غير متعلم", "إعدادية أو أقل", "دبلوم", "بكالوريوس", "دراسات عليا"] },
    { q: "3. ما تخصصك الدراسي أو المهني؟", type: "text" },
    { q: "4. الحالة الاجتماعية:", type: "select", options: ["عزباء", "متزوجة"] },
    { q: "5. الطول (سم):", type: "number" },
    { q: "6. الوزن (كغم):", type: "number" },
    { q: "7. الحالة الاقتصادية:", type: "select", options: ["لا يكفي", "يكفي إلى حد ما", "يكفي"] },
    { q: "8. السكن:", type: "select", options: ["مركز مدينة", "أطراف المدينة", "قرية وأرياف"] },
    { q: "9. طول الدورة الشهرية:", type: "select", options: ["أقل من 28 يوم", "28–35 يوم", "أكثر من 35 يوم"] },
    { q: "10. هل الدورة منتظمة؟", type: "select", options: ["نعم", "كلا"] },
    { q: "11. مدة نزيف الدورة:", type: "select", options: ["أقل من 5 أيام", "5–7 أيام", "أكثر من 7 أيام"] },
    { q: "12. عدد مرات الحمل:", type: "number" },
    { q: "13. عدد مرات الإجهاض:", type: "number" },
    { q: "14. هل تستخدمين موانع حمل هرمونية؟", type: "select", options: ["نعم", "لا"] },
    { q: "15. هل تعانين من تأخر في الحمل؟", type: "select", options: ["نعم", "لا"] },
    { q: "16. تاريخ عائلي للإصابة؟", type: "select", options: ["نعم", "لا"] },
    { q: "17. هل تم تشخيصك سابقاً؟", type: "select", options: ["نعم", "لا"] },
    { q: "18. هل سمعت عن المتلازمة؟", type: "select", options: ["نعم", "لا"] },
    { q: "19. مصدر معلوماتك؟", type: "select", options: ["مواقع التواصل الاجتماعي", "الإنترنت", "الطبيب", "المحاضرات", "الأهل", "مصدر آخر"] },
    { q: "20. زيادة مفاجئة بالوزن؟", type: "select", options: ["نعم", "لا"] },
    { q: "21. هل تؤثر على الحياة اليومية؟", type: "select", options: ["نعم", "لا"] },
    { q: "22. نمط حياة صحي؟", type: "select", options: ["نعم", "لا"] },
    { q: "23. مشكلات في النوم؟", type: "select", options: ["نعم", "لا"] },
    { q: "24. دعم من العائلة؟", type: "select", options: ["نعم", "لا"] },
    { q: "25. دعم نفسي؟", type: "select", options: ["نعم", "لا"] }
];

const unitsData = {
    1: { 
        title: "المعرفة العامة بمتلازمة تكيس المبايض", 
        videoId: "0rlto-F0NdI",
        preTest: [
            { q: "ما المقصود بمتلازمة تكيس المبايض؟", options: ["حالة صحية ترتبط باضطراب الهرمونات", "مرض ينتقل من امرأة لأخرى", "مرض يصيب الحوامل فقط", "لا أعرف"], correct: 0 },
            { q: "هل يمكن أن تصاب المرأة حتى لو كان وزنها طبيعياً؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "هل تظهر الأعراض نفسها عند الجميع؟", options: ["نعم، نفس الأعراض", "لا، تختلف من امرأة لأخرى", "لا أعرف"], correct: 1 },
            { q: "هل يعني تكيس المبايض أن المرأة لن تحمل مطلقاً؟", options: ["نعم، لا يمكنها الحمل", "لا، يمكن لكثير منهن الحمل", "لا أعرف"], correct: 1 }
        ],
        postTest: [
            { q: "ما المقصود بمتلازمة تكيس المبايض؟", options: ["حالة صحية ترتبط باضطراب الهرمونات", "مرض ينتقل من امرأة لأخرى", "مرض يصيب الحوامل فقط", "لا أعرف"], correct: 0 },
            { q: "هل يمكن أن تصاب المرأة حتى لو كان وزنها طبيعياً؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "هل تظهر الأعراض نفسها عند الجميع؟", options: ["نعم، نفس الأعراض", "لا، تختلف من امرأة لأخرى", "لا أعرف"], correct: 1 },
            { q: "هل يعني تكيس المبايض أن المرأة لن تحمل مطلقاً؟", options: ["نعم، لا يمكنها الحمل", "لا، يمكن لكثير منهن الحمل", "لا أعرف"], correct: 1 }
        ]
    },
    2: { 
        title: "العلامات والأعراض", 
        videoId: "J1HizKD-MN8",
        preTest: [
            { q: "أي من الأعراض التالية قد تظهر؟", options: ["عدم انتظام الدورة", "زيادة نمو الشعر", "حب الشباب", "جميع ما سبق"], correct: 3 },
            { q: "متى تستدعي مراجعة الطبيبة؟", options: ["تأخر الدورة باستمرار", "انتظامها", "لا داعي للمراجعة", "لا أعرف"], correct: 0 },
            { q: "هل تواجه المصابات صعوبة في التحكم بالوزن؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "إذا لم تظهر أعراض، هل يعني عدم الإصابة؟", options: ["نعم", "لا، قد تكون خفيفة", "لا أعرف"], correct: 1 },
            { q: "هل اضطرابات الغدة الدرقية تشبه أعراضها؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 }
        ],
        postTest: [
            { q: "أي من الأعراض التالية قد تظهر؟", options: ["عدم انتظام الدورة", "زيادة نمو الشعر", "حب الشباب", "جميع ما سبق"], correct: 3 },
            { q: "متى تستدعي مراجعة الطبيبة؟", options: ["تأخر الدورة باستمرار", "انتظامها", "لا داعي للمراجعة", "لا أعرف"], correct: 0 },
            { q: "هل تواجه المصابات صعوبة في التحكم بالوزن؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "إذا لم تظهر أعراض، هل يعني عدم الإصابة؟", options: ["نعم", "لا، قد تكون خفيفة", "لا أعرف"], correct: 1 },
            { q: "هل اضطرابات الغدة الدرقية تشبه أعراضها؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 }
        ]
    },
    3: { 
        title: "التشخيص والفحوصات", 
        videoId: "9HWzoFWjMFk",
        preTest: [
            { q: "كيف تعرف المرأة إصابتها؟", options: ["بالأعراض فقط", "بمراجعة الطبيبة والفحوصات", "بالوزن فقط", "لا أعرف"], correct: 1 },
            { q: "ما تستخدمه الطبيبة للتقييم؟", options: ["السؤال عن الدورة", "تحاليل الدم", "السونار", "جميع ما سبق"], correct: 3 },
            { q: "هل تحتاج كل امرأة لسونار؟", options: ["نعم في كل الحالات", "لا، إذا توفرت معايير التشخيص", "لا أعرف"], correct: 1 },
            { q: "ماذا تفعل عند تأخر الدورة؟", options: ["تشخص نفسها", "تتجاهل", "تراجع طبيبة", "تستخدم أدوية"], correct: 2 }
        ],
        postTest: [
            { q: "كيف تعرف المرأة إصابتها؟", options: ["بالأعراض فقط", "بمراجعة الطبيبة والفحوصات", "بالوزن فقط", "لا أعرف"], correct: 1 },
            { q: "ما تستخدمه الطبيبة للتقييم؟", options: ["السؤال عن الدورة", "تحاليل الدم", "السونار", "جميع ما سبق"], correct: 3 },
            { q: "هل تحتاج كل امرأة لسونار؟", options: ["نعم في كل الحالات", "لا، إذا توفرت معايير التشخيص", "لا أعرف"], correct: 1 },
            { q: "ماذا تفعل عند تأخر الدورة؟", options: ["تشخص نفسها", "تتجاهل", "تراجع طبيبة", "تستخدم أدوية"], correct: 2 }
        ]
    },
    4: { 
        title: "الرعاية والعلاج", 
        videoId: "slI_o2kv-IU",
        preTest: [
            { q: "ما الأمور التي تدعم صحة المصابة؟", options: ["طعام متوازن", "نشاط بدني", "نوم كافي", "جميع ما سبق"], correct: 3 },
            { q: "هل يوجد علاج واحد للجميع؟", options: ["نعم", "لا، يختلف حسب الحالة", "لا أعرف"], correct: 1 },
            { q: "ما الصحيح بشأن الأدوية؟", options: ["دواء واحد للجميع", "تحدد الطبيبة العلاج المناسب", "استخدام أي دواء", "لا أعرف"], correct: 1 },
            { q: "لماذا المتابعة الصحية؟", options: ["لمتابعة الأعراض", "لتغيير العلاج", "لمتابعة المخاطر", "جميع ما سبق"], correct: 3 }
        ],
        postTest: [
            { q: "ما الأمور التي تدعم صحة المصابة؟", options: ["طعام متوازن", "نشاط بدني", "نوم كافي", "جميع ما سبق"], correct: 3 },
            { q: "هل يوجد علاج واحد للجميع؟", options: ["نعم", "لا، يختلف حسب الحالة", "لا أعرف"], correct: 1 },
            { q: "ما الصحيح بشأن الأدوية؟", options: ["دواء واحد للجميع", "تحدد الطبيبة العلاج المناسب", "استخدام أي دواء", "لا أعرف"], correct: 1 },
            { q: "لماذا المتابعة الصحية؟", options: ["لمتابعة الأعراض", "لتغيير العلاج", "لمتابعة المخاطر", "جميع ما سبق"], correct: 3 }
        ]
    },
    5: { 
        title: "التأثيرات الهرمونية والغدد الصماء", 
        videoId: "6w0TsarkfkY",
        preTest: [
            { q: "هل يؤثر تكيس المبايض في الحالة النفسية؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "لماذا المتابعة الصحية مهمة؟", options: ["لمتابعة الهرمونات", "لكشف المشكلات مبكراً", "لاختيار العلاج", "جميع ما سبق"], correct: 3 },
            { q: "الأنسولين المرتفع يحفز إنتاج هرمونات ذكورية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "PMOS تؤدي لنمو الشعر الزائد وحب الشباب.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "أعراض ارتفاع البرولاكتين تشبه أعراض PMOS.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "الكورتيزول يؤثر في توازن الهرمونات الجنسية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "الخلل الهرموني يسبب صعوبات في الخصوبة.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 }
        ],
        postTest: [
            { q: "هل يؤثر تكيس المبايض في الحالة النفسية؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "لماذا المتابعة الصحية مهمة؟", options: ["لمتابعة الهرمونات", "لكشف المشكلات مبكراً", "لاختيار العلاج", "جميع ما سبق"], correct: 3 },
            { q: "الأنسولين المرتفع يحفز إنتاج هرمونات ذكورية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "PMOS تؤدي لنمو الشعر الزائد وحب الشباب.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "أعراض ارتفاع البرولاكتين تشبه أعراض PMOS.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "الكورتيزول يؤثر في توازن الهرمونات الجنسية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "الخلل الهرموني يسبب صعوبات في الخصوبة.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 }
        ]
    },
    6: { 
        title: "المعرفة بالجانب الأيضي", 
        videoId: "Wp2CiybENRo",
        preTest: [
            { q: "هل يرتبط تكيس المبايض بمقاومة الإنسولين؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "مقاومة الإنسولين تؤثر في استخدام السكر.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "تراكم الدهون بالبطن مؤشر على خلل أيضي.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "النظام الغذائي والرياضة يحسنان حساسية الإنسولين.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "قصور الغدة الدرقية يزيد مقاومة الإنسولين.", options: ["نعم", "لا", "لا أعرف"], correct: 0 }
        ],
        postTest: [
            { q: "هل يرتبط تكيس المبايض بمقاومة الإنسولين؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "مقاومة الإنسولين تؤثر في استخدام السكر.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "تراكم الدهون بالبطن مؤشر على خلل أيضي.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "النظام الغذائي والرياضة يحسنان حساسية الإنسولين.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "قصور الغدة الدرقية يزيد مقاومة الإنسولين.", options: ["نعم", "لا", "لا أعرف"], correct: 0 }
        ]
    }
};

let currentUnit = 0;
let player = null;
let isReviewing = false;

// ==========================================
// 3. الأزرار والمشاركة والوضع الليلي
// ==========================================
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); }
function toggleDarkMode() { document.body.classList.toggle('dark-mode'); }
function agreeCertificate() { localStorage.setItem('certificateAgreed', 'true'); alert("تم التسجيل! بالتوفيق في رحلتك التعليمية."); }

function shareLink(pageUrl, titleText) {
    const fullUrl = window.location.origin + window.location.pathname.replace('pmos.html', '') + pageUrl;
    if (navigator.share) {
        navigator.share({ title: titleText, url: fullUrl }).catch(console.error);
    } else {
        navigator.clipboard.writeText(fullUrl);
        alert("تم نسخ الرابط بنجاح! يمكنك مشاركته الآن.");
    }
}

// ==========================================
// 4. تشغيل الصفحة
// ==========================================
window.onload = function() {
    const name = localStorage.getItem('userFullName');
    const role = localStorage.getItem('userRole');
    const greetingEl = document.getElementById('welcomeText');
    if (greetingEl && name && role) greetingEl.innerText = `مرحباً، ${role} ${name}`;

    if(!document.getElementById('surveyContainer')) return;

    const isSurveyDone = localStorage.getItem('surveyDone');
    const surveyContainer = document.getElementById('surveyContainer');
    const unitsGrid = document.getElementById('unitsGrid');

    if (isSurveyDone === 'true') {
        surveyContainer.style.display = 'none';
        unitsGrid.style.display = 'grid';
        renderUnits();
        updateProgress();
    } else {
        surveyContainer.style.display = 'block';
        renderSurvey();
    }
};

// ==========================================
// 5. الاستبيان
// ==========================================
function renderSurvey() {
    const container = document.getElementById('surveyQuestions');
    let html = "";
    surveyQuestions.forEach((q, index) => {
        html += `<div class="question-item"><div class="question-text">${q.q}</div>`;
        if (q.type === 'select') {
            html += `<select id="survey_${index}" style="width:100%; padding:10px; border-radius:8px; border:1px solid #ccc;">`;
            q.options.forEach(opt => html += `<option value="${opt}">${opt}</option>`);
            html += `</select>`;
        } else {
            html += `<input type="${q.type}" id="survey_${index}" style="width:100%; padding:10px; border-radius:8px; border:1px solid #ccc;">`;
        }
        html += `</div>`;
    });
    container.innerHTML = html;
}

function submitSurvey() {
    let answers = {};
    for(let i=0; i<surveyQuestions.length; i++) {
        answers[`Q${i+1}`] = document.getElementById(`survey_${i}`).value;
    }
    localStorage.setItem('surveyAnswers', JSON.stringify(answers));
    
    // إرسال الاستبيان لج كمديرة عبر Firebase
    if(window.saveToFirebase) {
        window.saveToFirebase({ 
            action: "استبيان ديموغرافي", 
            name: localStorage.getItem('userFullName'), 
            email: currentEmail, 
            answers: answers,
            date: new Date().toISOString() 
        });
    }

    alert("شكراً لك! تم استلام إجاباتك. تظهر الوحدات الآن.");
    localStorage.setItem('surveyDone', 'true');
    document.getElementById('surveyContainer').style.display = 'none';
    document.getElementById('unitsGrid').style.display = 'grid';
    renderUnits();
    updateProgress();
}

// ==========================================
// 6. الوحدات
// ==========================================
function renderUnits() {
    const grid = document.getElementById('unitsGrid');
    let html = "";
    for (let i = 1; i <= 6; i++) {
        const unit = unitsData[i];
        html += `<div class="unit-card" id="unit-${i}">
                    <div class="card-icon">${i === 1 ? '📖' : i === 2 ? '🔍' : i === 3 ? '🩺' : i === 4 ? '💊' : i === 5 ? '⚖️' : '🧪'}</div>
                    <h3>${unit.title}</h3>
                    <button class="start-btn" onclick="openUnit(${i}, false)">ابدأ التعلم</button>
                </div>`;
    }
    grid.innerHTML = html;
}

function openUnit(unitId, reviewMode) {
    currentUnit = unitId;
    isReviewing = reviewMode;
    const data = unitsData[unitId];
    
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('preTestSection').style.display = 'none';
    document.getElementById('videoSection').style.display = 'none';
    document.getElementById('postTestSection').style.display = 'none';

    if(isReviewing) {
        let postData = JSON.parse(localStorage.getItem('postTests')) || {};
        
        document.getElementById('videoSection').style.display = 'block';
        document.getElementById('popupTitle').innerText = `مراجعة: ${data.title}`;
        document.getElementById('videoStatus').innerText = "✅ لقد أكملت هذه الوحدة مسبقاً. هذه مراجعة فقط.";
        document.getElementById('videoStatus').style.color = "#4caf50";

        const resultText = document.getElementById('resultText');
        let reviewHtml = "";
        
        if(postData[unitId]) {
            reviewHtml += `<h4 style="color: var(--primary); margin-bottom: 15px;">نتيجتك السابقة: ${postData[unitId].score} من ${postData[unitId].total}</h4>`;
            reviewHtml += `<h4 style="color: var(--primary); margin-top: 20px;">تفاصيل إجاباتك:</h4>`;
            
            data.postTest.forEach((q, idx) => {
                const userAnswer = postData[unitId].answers[idx];
                const isCorrect = userAnswer === q.correct;
                const color = isCorrect ? "green" : "red";
                const icon = isCorrect ? "✅" : "❌";
                
                reviewHtml += `<div style="text-align: right; margin-bottom: 15px; padding: 15px; background: #f9f9f9; border-radius: 10px; border-right: 4px solid ${color}; color: #333;">
                    <strong>${idx+1}. ${q.q}</strong><br>
                    <span style="color: ${color}; font-weight: bold;">${icon} إجابتك: ${q.options[userAnswer]}</span><br>`;
                
                if (!isCorrect) {
                    reviewHtml += `<span style="color: green; font-weight: bold;">✔️ الإجابة الصحيحة: ${q.options[q.correct]}</span>`;
                }
                reviewHtml += `</div>`;
            });
        } else {
            reviewHtml = "<p>لم يتم العثور على إجابات سابقة.</p>";
        }
        
        resultText.innerHTML = reviewHtml;
        document.getElementById('resultSection').style.display = 'block';
        document.getElementById('nextBtn').style.display = 'none'; 
        
        startYoutubePlayer(data.videoId);
    } else {
        if(!localStorage.getItem('certificateAgreed')) {
            alert("ملاحظة: عند إكمالك لجميع الوحدات، ستحصل على شهادة إنجاز يمكنك مشاركتها.");
            localStorage.setItem('certificateAgreed', 'true');
        }
        document.getElementById('preTestSection').style.display = 'block';
        document.getElementById('preTestTitle').innerText = `الاختبار القبلي - ${data.title}`;
        const preContent = document.getElementById('preQuizContent');
        let preHtml = "";
        data.preTest.forEach((q, idx) => {
            preHtml += `<div class="question-item"><div class="question-text">${idx+1}. ${q.q}</div>`;
            q.options.forEach((opt, optIdx) => {
                preHtml += `<label class="option-label"><input type="radio" name="pre_${idx}" value="${optIdx}"> ${opt}</label>`;
            });
            preHtml += `</div>`;
        });
        preContent.innerHTML = preHtml;
    }
    document.getElementById('unitPopup').style.display = 'flex';
}

function startYoutubePlayer(videoId) {
    if(player) player.destroy();
    setTimeout(() => {
        player = new YT.Player('player', {
            height: '100%', width: '100%', videoId: videoId,
            playerVars: { 'autoplay': 1, 'rel': 0 },
            events: { 'onStateChange': (event) => {
                if (!isReviewing && event.data === YT.PlayerState.ENDED) {
                    document.getElementById('videoStatus').innerText = "✅ لقد أكملت مشاهدة الفيديو! تظهر الأسئلة الآن...";
                    document.getElementById('videoStatus').style.color = "#4caf50";
                    setTimeout(() => { showPostTest(); }, 1000);
                }
            }}
        });
    }, 300);
}

function submitPreTest() {
    const data = unitsData[currentUnit];
    let preAnswers = [];
    let answeredAll = true;
    data.preTest.forEach((q, idx) => {
        const selected = document.querySelector(`input[name="pre_${idx}"]:checked`);
        if (!selected) answeredAll = false;
        else preAnswers.push(parseInt(selected.value));
    });
    if(!answeredAll) { alert("الرجى الإجابة على جميع الأسئلة."); return; }
    let allPre = JSON.parse(localStorage.getItem('preTests')) || {};
    allPre[currentUnit] = preAnswers;
    localStorage.setItem('preTests', JSON.stringify(allPre));
    
    if(window.saveToFirebase) {
        window.saveToFirebase({ 
            action: "اختبار قبلي", 
            name: localStorage.getItem('userFullName'), 
            email: currentEmail, 
            unit: currentUnit, 
            answers: preAnswers, 
            date: new Date().toISOString() 
        });
    }

    document.getElementById('preTestSection').style.display = 'none';
    document.getElementById('videoSection').style.display = 'block';
    document.getElementById('popupTitle').innerText = data.title;
    document.getElementById('videoStatus').innerText = "⏳ يرجى مشاهدة الفيديو بالكامل لفتح الاختبار البعدي...";
    document.getElementById('videoStatus').style.color = "#e91e63";
    startYoutubePlayer(data.videoId);
}

function showPostTest() {
    document.getElementById('videoSection').style.display = 'none';
    document.getElementById('postTestSection').style.display = 'block';
    const data = unitsData[currentUnit];
    const postContent = document.getElementById('postQuizContent');
    let postHtml = "";
    data.postTest.forEach((q, idx) => {
        postHtml += `<div class="question-item"><div class="question-text">${idx+1}. ${q.q}</div>`;
        q.options.forEach((opt, optIdx) => {
            postHtml += `<label class="option-label"><input type="radio" name="post_${idx}" value="${optIdx}"> ${opt}</label>`;
        });
        postHtml += `</div>`;
    });
    postContent.innerHTML = postHtml;
}

function submitPostTest() {
    const data = unitsData[currentUnit];
    let postAnswers = [];
    let answeredAll = true;
    let score = 0;
    let mistakes = [];
    data.postTest.forEach((q, idx) => {
        const selected = document.querySelector(`input[name="post_${idx}"]:checked`);
        if (!selected) answeredAll = false;
        else {
            const val = parseInt(selected.value);
            postAnswers.push(val);
            if (val === q.correct) { score++; } 
            else { mistakes.push(`السؤال ${idx+1}: الإجابة الصحيحة هي "${q.options[q.correct]}"`); }
        }
    });
    if(!answeredAll) { alert("الرجى الإجابة على جميع الأسئلة."); return; }
    let allPost = JSON.parse(localStorage.getItem('postTests')) || {};
    allPost[currentUnit] = { answers: postAnswers, score: score, total: data.postTest.length };
    localStorage.setItem('postTests', JSON.stringify(allPost));

    if(window.saveToFirebase) {
        window.saveToFirebase({ 
            action: "إنهاء وحدة", 
            name: localStorage.getItem('userFullName'), 
            email: currentEmail, 
            unit: currentUnit, 
            score: score, 
            total: data.postTest.length,
            answers: postAnswers,
            date: new Date().toISOString() 
        });
    }

    document.getElementById('postTestSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';
    const resultText = document.getElementById('resultText');
    let msg = `<h4>أحسنت! لقد أكملت الوحدة.</h4><p>النتيجة: ${score} من ${data.postTest.length}</p>`;
    if (mistakes.length > 0) {
        msg += `<div style="text-align: right; margin-top: 15px; background: #fff3cd; padding: 15px; border-radius: 10px; color: #856404;"><strong>تنبيه (بدون تصحيح تلقائي):</strong> <br> ${mistakes.join('<br>')}</div>`;
    }
    resultText.innerHTML = msg;
    let completed = JSON.parse(localStorage.getItem('pmos_completed')) || [];
    if (!completed.includes(currentUnit)) {
        completed.push(currentUnit);
        localStorage.setItem('pmos_completed', JSON.stringify(completed));
    }
    updateProgress();
    const nextBtn = document.getElementById('nextBtn');
    if (currentUnit < 6) {
        nextBtn.style.display = 'block';
        nextBtn.innerText = "الانتقال للوحدة التالية ➡️";
    } else {
        nextBtn.style.display = 'none';
        resultText.innerHTML += `<h3 style="color:var(--success); margin-top:20px;">🎓 لقد أكملت جميع الوحدات بنجاح!</h3>
        <p style="margin-top:10px;">تهانينا! يمكنك الآن الانتقال لصفحة "شهاداتي" لاستلام شهادتك.</p>
        <button class="main-btn" onclick="window.location.href='certificates.html'" style="margin-top:15px; background:var(--gold); color:#000; font-weight:bold;">الانتقال لشهاداتي 🏆</button>`;
    }
}

function nextUnit() {
    if (currentUnit < 6) {
        closePopup();
        setTimeout(() => { openUnit(currentUnit + 1, false); }, 500);
    }
}

function closePopup() {
    document.getElementById('unitPopup').style.display = 'none';
    if(player) player.stopVideo();
}

function updateProgress() {
    let completed = JSON.parse(localStorage.getItem('pmos_completed')) || [];
    for(let i=1; i<=6; i++) {
        const card = document.getElementById(`unit-${i}`);
        if(!card) continue;
        const btn = card.querySelector('.start-btn');
        if(completed.includes(i)) {
            card.classList.add('completed');
            btn.innerText = "مراجعة الوحدة 📖";
            btn.style.pointerEvents = "auto";
            btn.onclick = () => openUnit(i, true);
        } else {
            card.classList.remove('completed');
            btn.innerText = "ابدأ التعلم";
            btn.onclick = () => openUnit(i, false);
        }
    }
    const percent = Math.round((completed.length / 6) * 100);
    document.getElementById('progressText').innerText = percent + "%";
    document.getElementById('progressFill').style.width = percent + "%";
    document.getElementById('progressStatus').innerText = `أكملي ${completed.length} من 6 وحدات`;
                                      }

// --- 1. بيانات الأسئلة ---
const quizData = {
    1: [
        { q: "ما المقصود بمتلازمة تكيس المبايض؟", options: ["حالة صحية ترتبط باضطراب الهرمونات وقد تؤثر في الدورة الشهرية وصحة الجسم", "مرض ينتقل من امرأة إلى أخرى", "مرض يصيب النساء الحوامل فقط", "لا أعرف"], correct: 0 },
        { q: "هل يمكن أن تصاب المرأة بتكيس المبايض حتى لو كان وزنها طبيعيًا؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
        { q: "هل تظهر الأعراض نفسها عند جميع النساء المصابات بتكيس المبايض؟", options: ["نعم، الأعراض نفسها عند الجميع", "لا، تختلف الأعراض من امرأة إلى أخرى", "لا أعرف"], correct: 1 }
    ],
    2: [
        { q: "تؤدي متلازمة PMOS إلى أعراض مثل نمو الشعر الزائد وحب الشباب.", options: ["صحیح", "خطأ", "لا أعرف"], correct: 0 },
        { q: "يمكن أن تتشابه بعض أعراض ارتفاع هرمون الحليب (البرولاكتين) مع أعراض متلازمة PMOS.", options: ["صحیح", "خطأ", "لا أعرف"], correct: 0 }
    ],
    3: [
        { q: "ما الأمور التي قد تستخدمها الطبيبة لتقييم تكيس المبايض؟", options: ["السؤال عن الدورة الشهرية والأعراض والتاريخ الصحي", "الفحص السريري وبعض تحليل الدم", "التصوير بالموجات فوق الصوتية (سونار) عند الحاجة", "جميع ما سبق، حسب حالة المرأة"], correct: 3 },
        { q: "هل تحتاج كل امرأة بالغة يُشتبه بإصابتها بتكيس المبايض إلى تصوير المبايض بالموجات فوق الصوتية (سونار)؟", options: ["نعم، في جميع الحالات", "لا، فقد يكون التشخيص ممكنًا دون التصوير إذا توفرت معايير التشخيص المناسبة", "لا أعرف"], correct: 1 },
        { q: "ماذا ينبغي أن تفعل المرأة إذا كانت تعاني من تأخر الدورة باستمرار أو أعراض توحي بتكيس المبايض؟", options: ["تشخَّص نفسها من خلال مواقع التواصل الاجتماعي", "تتجاهل الأعراض", "تراجع طبيبة أو مختصاً صحياً لتقييم حالتها", "تستخدم الأدوية من دون استشارة طبية"], correct: 2 }
    ],
    4: [
        { q: "ما الأمور التي تساعد على دعم صحة المرأة المصابة بتكيس المبايض؟", options: ["تناول طعام متوازن", "ممارسة نشاط بدني مناسب", "النوم الكافي واتباع عادات صحية", "جميع ما سبق"], correct: 3 },
        { q: "هل يوجد علاج واحد يناسب جميع النساء المصابات بتكيس المبايض؟", options: ["نعم، العلاج نفسه يناسب الجميع", "لا، يختلف العلاج حسب الأعراض والحالة الصحية واحتياجات كل امرأة", "لا أعرف"], correct: 1 },
        { q: "لماذا تعد المتابعة الصحية مهمة للمرأة المصابة بتكيس المبايض؟", options: ["لمتابعة صحة الجسم والهرمونات", "للكشف عن المشكلات الصحية المحتملة مبكراً", "للمساعدة على اختيار الرعاية والعلاج المناسبين", "جميع ما سبق"], correct: 3 }
    ],
    5: [
        { q: "يمكن أن يؤدي الارتفاع المستمر في مستويات الأنسولين إلى تحفيز المبيضين والغدد الصماء على إنتاج كميات زائدة من الهرمونات الذكرية.", options: ["صحیح", "خطأ", "لا أعرف"], correct: 0 },
        { q: "قد يؤثر ارتفاع هرمون التوتر (الكورتيزول) المفرز من الغدة الكظرية في التوازن الهرمونات الجنسية.", options: ["صحیح", "خطأ", "لا أعرف"], correct: 0 },
        { q: "قد يؤدي الخلل الهرموني المصاحب للمتلازمة إلى عدم اكتمال نضج البويضات، مما قد يسبب صعوبات في الخصوبة والإنجاب.", options: ["صحیح", "خطأ", "لا أعرف"], correct: 0 }
    ],
    6: [
        { q: "يرتبط تكيس المبايض بمقاومة الإنسولين وزيادة خطر الإصابة بالسكري من النوع الثاني؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
        { q: "تُعد مقاومة الأنسولين من العوامل الأيضية الرئيسية المرتبطة بمتلازمة PMOS، إذ تؤثر في قدرة الجسم على استخدام السكر بفاعلية.", options: ["صحیح", "خطأ", "لا أعرف"], correct: 0 },
        { q: "يُعد تراكم الدهون في منطقة البطن (السمنة الحشوية) مؤشرًا مهمًا على وجود خلل أيضي، حتى إذا كان الوزن الإجمالي ضمن المعدل الطبيعي.", options: ["صحیح", "خطأ", "لا أعرف"], correct: 0 },
        { q: "تساهم التغيرات في نمط الحياة، مثل اتباع نظام غذائي منخفض المؤشر الجلايسيمي وممارسة الرياضة، في تحسين حساسية الجسم للأنسولين.", options: ["صحیح", "خطأ", "لا أعرف"], correct: 0 },
        { q: "هل يمكن أن يزيد قصور الغدة الدرقية من مقاومة الإنسولين لدى النساء المصابات بتكيس المبايض؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 }
    ]
};

let currentUnit = 0;
let currentVideoUrl = "";

// --- 2. إدارة التقدم (حفظ في المتصفح) ---
function updateProgress() {
    let completed = JSON.parse(localStorage.getItem('pmos_completed')) || [];
    
    // تحديث شكل البطاقات
    for(let i=1; i<=6; i++) {
        const card = document.getElementById(`unit-${i}`);
        if(!card) continue; // حماية إذا كان العنصر غير موجود
        const btn = card.querySelector('.start-btn');
        if(completed.includes(i)) {
            card.classList.add('completed');
            btn.innerText = "مكتملة ✅";
            btn.style.pointerEvents = "none";
        } else {
            card.classList.remove('completed');
            btn.innerText = "ابدأ التعلم";
            btn.style.pointerEvents = "auto";
        }
    }

    // تحديث شريط التقدم
    const percent = Math.round((completed.length / 6) * 100);
    const progText = document.getElementById('progressText');
    const progFill = document.getElementById('progressFill');
    const progStatus = document.getElementById('progressStatus');
    
    if(progText) progText.innerText = percent + "%";
    if(progFill) progFill.style.width = percent + "%";
    if(progStatus) progStatus.innerText = `أكملي ${completed.length} من 6 وحدات`;
}

// --- 3. تشغيل الفيديو ---
function startUnit(unitId, videoUrl) {
    currentUnit = unitId;
    currentVideoUrl = videoUrl;
    
    const titles = {
        1: "الوحدة الأولى: المعرفة العامة", 2: "الوحدة الثانية: العلامات والأعراض",
        3: "الوحدة الثالثة: التشخيص والفحوصات", 4: "الوحدة الرابعة: الرعاية والعلاج",
        5: "الوحدة الخامسة: التأثيرات الهرمونية", 6: "الوحدة السادسة: التأثيرات الأيضية"
    };
    document.getElementById('videoTitle').innerText = titles[unitId];
    
    document.getElementById('videoFrame').src = videoUrl;
    document.getElementById('videoPopup').style.display = 'flex';
}

// --- 4. عرض الأسئلة ---
function showQuiz() {
    closePopup('videoPopup');
    
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = "";
    const questions = quizData[currentUnit];
    
    questions.forEach((q, index) => {
        let html = `<div class="question-item" id="q-${index}">
            <div class="question-text">${index + 1}. ${q.q}</div>`;
        
        q.options.forEach((opt, optIndex) => {
            html += `<label class="option-label" id="opt-${index}-${optIndex}">
                <input type="radio" name="q${index}" value="${optIndex}"> ${opt}
            </label>`;
        });

        html += `<div class="feedback-msg" id="fb-${index}"></div></div>`;
        quizContent.innerHTML += html;
    });

    document.getElementById('submitQuizBtn').style.display = 'block';
    document.getElementById('submitQuizBtn').innerText = "إرسال الإجابات";
    document.getElementById('quizPopup').style.display = 'flex';
}

// --- 5. تصحيح الإجابات ---
function submitQuiz() {
    const questions = quizData[currentUnit];
    let allCorrect = true;
    let answeredAll = true;

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const feedback = document.getElementById(`fb-${index}`);

        if (!selected) {
            answeredAll = false;
            return;
        }

        const selectedVal = parseInt(selected.value);
        const isCorrect = selectedVal === q.correct;

        q.options.forEach((_, optIndex) => {
            const optEl = document.getElementById(`opt-${index}-${optIndex}`);
            if(optEl) optEl.classList.remove('correct-answer', 'wrong-answer');
        });

        if (isCorrect) {
            document.getElementById(`opt-${index}-${selectedVal}`).classList.add('correct-answer');
        } else {
            allCorrect = false;
            document.getElementById(`opt-${index}-${selectedVal}`).classList.add('wrong-answer');
            document.getElementById(`opt-${index}-${q.correct}`).classList.add('correct-answer');
            
            if(feedback) {
                feedback.style.display = 'block';
                feedback.className = 'feedback-msg feedback-correct';
                feedback.innerText = "الإجابة الصحيحة هي: " + q.options[q.correct];
            }
        }
    });

    if (!answeredAll) {
        alert("الرجاء الإجابة على جميع الأسئلة قبل الإرسال.");
        return;
    }

    if (allCorrect) {
        let completed = JSON.parse(localStorage.getItem('pmos_completed')) || [];
        if (!completed.includes(currentUnit)) {
            completed.push(currentUnit);
            localStorage.setItem('pmos_completed', JSON.stringify(completed));
            updateProgress();
        }
        
        alert("🎉 أحسنت! لقد أجبت على جميع الأسئلة بشكل صحيح وتم إكمال هذه الوحدة.");
        closePopup('quizPopup');
    } else {
        document.getElementById('submitQuizBtn').innerText = "حاول مرة أخرى";
        alert("⚠️ يوجد بعض الإجابات غير الصحيحة. راجع الإجابات المظللة وحاول مرة أخرى.");
    }
}

// --- 6. إغلاق النوافذ ---
function closePopup(id) {
    document.getElementById(id).style.display = 'none';
    if(id === 'videoPopup') {
        document.getElementById('videoFrame').src = ""; 
    }
}

// --- 7. ترحيب المستخدم (عند تحميل الصفحة) ---
window.onload = function() {
    const name = localStorage.getItem('userName');
    const role = localStorage.getItem('userRole');
    
    // تحديث الترحيب
    const greetingEl = document.getElementById('userGreeting');
    if(greetingEl && name && role) {
        greetingEl.innerText = `مرحباً، ${role} ${name}`;
    }
    
    // إذا كان في صفحة الوحدات وماكو اسم مسجل، نرجعه للتسجيل
    if(!name && window.location.pathname.includes('pmos.html')) {
        window.location.href = "index.html"; 
    }

    // تحديث شريط التقدم (إذا كان موجود بالصفحة)
    updateProgress();
};

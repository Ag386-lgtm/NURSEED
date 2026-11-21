// ==========================================
// 1. إدارة حسابات المستخدمين (مسح التقدم لحساب جديد)
// ==========================================
const currentUser = localStorage.getItem('userFullName');
const lastUser = localStorage.getItem('lastLoggedUser');

if (currentUser !== lastUser) {
    // إذا دخل شخص جديد، نمسح كل البيانات القديمة عشان يبدأ من الصفر
    localStorage.removeItem('surveyDone');
    localStorage.removeItem('surveyAnswers');
    localStorage.removeItem('preTests');
    localStorage.removeItem('postTests');
    localStorage.removeItem('pmos_completed');
    localStorage.setItem('lastLoggedUser', currentUser);
}

// ==========================================
// 2. بيانات الاستبيان الديموغرافي (29 سؤال)
// ==========================================
const surveyQuestions = [
    { q: "1. العمر (سنة):", type: "number" },
    { q: "2. المستوى التعليمي:", type: "select", options: ["غير متعلم", "إعدادية أو أقل", "دبلوم", "بكالوريوس", "دراسات عليا"] },
    { q: "3. ما تخصصك الدراسي أو المهني؟", type: "text" },
    { q: "4. الحالة الاجتماعية:", type: "select", options: ["عزباء", "متزوجة"] },
    { q: "5. الطول (سم):", type: "number" },
    { q: "6. الوزن (كغم):", type: "number" },
    { q: "7. الحالة الاقتصادية (الدخل الشهري):", type: "select", options: ["لا يكفي", "يكفي إلى حد ما", "يكفي"] },
    { q: "8. السكن:", type: "select", options: ["مركز مدينة", "أطراف المدينة", "قرية وأرياف"] },
    { q: "9. طول الدورة الشهرية:", type: "select", options: ["أقل من 28 يوم", "28–35 يوم", "أكثر من 35 يوم"] },
    { q: "10. هل الدورة الشهرية منتظمة؟", type: "select", options: ["نعم", "كلا"] },
    { q: "11. مدة نزيف الدورة الشهرية:", type: "select", options: ["أقل من 5 أيام", "5–7 أيام", "أكثر من 7 أيام"] },
    { q: "12. عدد مرات الحمل:", type: "number" },
    { q: "13. عدد مرات الإجهاض:", type: "number" },
    { q: "14. هل تستخدمين موانع حمل هرمونية لتنظيم الدورة الشهرية؟", type: "select", options: ["نعم", "لا"] },
    { q: "15. هل تعانين من مشاكل أو تأخر في الحمل؟", type: "select", options: ["نعم", "لا"] },
    { q: "16. هل يوجد تاريخ عائلي للإصابة بمتلازمة تكيس المبايض الأيضي؟", type: "select", options: ["نعم", "لا"] },
    { q: "17. هل تم تشخيصك بواسطة طبيب سابقاً بمتلازمة تكيس المبايض الأيضي؟", type: "select", options: ["نعم", "لا"] },
    { q: "18. هل سمعت من قبل عن متلازمة تكيس المبايض؟", type: "select", options: ["نعم", "لا"] },
    { q: "19. إذا كانت الإجابة نعم، ما مصدر معلوماتك؟", type: "select", options: ["مواقع التواصل الاجتماعي", "الإنترنت", "الطبيب أو الكادر الصحي", "المحاضرات الدراسية", "الأهل أو الصديقات", "مصدر آخر"] },
    { q: "20. هل لاحظتِ حدوث زيادة مفاجئة في وزنك؟", type: "select", options: ["نعم", "لا"] },
    { q: "21. هل تعتقدين أن متلازمة تكيس المبايض قد تؤثر في الحياة اليومية للمرأة؟", type: "select", options: ["نعم", "لا"] },
    { q: "22. هل تتبعين نظاماً غذائياً أو نمط حياة صحياً للمحافظة على صحتك؟", type: "select", options: ["نعم", "لا"] },
    { q: "23. هل واجهتِ مشكلات في النوم؟", type: "select", options: ["نعم", "لا"] },
    { q: "24. هل تشعرين بوجود دعم من عائلتك أو الأشخاص المقربين بخصوص المتلازمة؟", type: "select", options: ["نعم", "لا"] },
    { q: "25. هل تشعرين بوجود دعم نفسي وعاطفي من الأشخاص المحيطين بك؟", type: "select", options: ["نعم", "لا"] }
];

// ==========================================
// 3. بيانات الوحدات (الفيديوهات + أسئلة قبلي وبعدي)
// ==========================================
const unitsData = {
    1: { 
        title: "المعرفة العامة بمتلازمة تكيس المبايض", 
        videoId: "0rlto-F0NdI",
        preTest: [
            { q: "ما المقصود بمتلازمة تكيس المبايض؟", options: ["حالة صحية ترتبط باضطراب الهرمونات وقد تؤثر في الدورة الشهرية وصحة الجسم", "مرض ينتقل من امرأة إلى أخرى", "مرض يصيب النساء الحوامل فقط", "لا أعرف"], correct: 0 },
            { q: "هل يمكن أن تصاب المرأة بتكيس المبايض حتى لو كان وزنها طبيعياً؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "هل تظهر الأعراض نفسها عند جميع النساء المصابات بتكيس المبايض؟", options: ["نعم، الأعراض نفسها عند الجميع", "لا، تختلف الأعراض من امرأة إلى أخرى", "لا أعرف"], correct: 1 },
            { q: "هل يعني تكيس المبايض أن المرأة لن تستطيع الحمل مطلقاً؟", options: ["نعم، لا يمكنها الحمل أبداً", "لا، يمكن لكثير من المصابات الحمل، وقد يحتجن إلى مساعدة طبية أحياناً", "لا أعرف"], correct: 1 }
        ],
        postTest: [
            { q: "ما المقصود بمتلازمة تكيس المبايض؟", options: ["حالة صحية ترتبط باضطراب الهرمونات وقد تؤثر في الدورة الشهرية وصحة الجسم", "مرض ينتقل من امرأة إلى أخرى", "مرض يصيب النساء الحوامل فقط", "لا أعرف"], correct: 0 },
            { q: "هل يمكن أن تصاب المرأة بتكيس المبايض حتى لو كان وزنها طبيعياً؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "هل تظهر الأعراض نفسها عند جميع النساء المصابات بتكيس المبايض؟", options: ["نعم، الأعراض نفسها عند الجميع", "لا، تختلف الأعراض من امرأة إلى أخرى", "لا أعرف"], correct: 1 },
            { q: "هل يعني تكيس المبايض أن المرأة لن تستطيع الحمل مطلقاً؟", options: ["نعم، لا يمكنها الحمل أبداً", "لا، يمكن لكثير من المصابات الحمل، وقد يحتجن إلى مساعدة طبية أحياناً", "لا أعرف"], correct: 1 }
        ]
    },
    2: { 
        title: "العلامات والأعراض", 
        videoId: "J1HizKD-MN8",
        preTest: [
            { q: "أي من الأعراض التالية قد يظهر عند المرأة المصابة بتكيس المبايض؟", options: ["عدم انتظام الدورة الشهرية", "زيادة نمو الشعر في الوجه أو الجسم", "ظهور حب الشباب أو خفة شعر الرأس", "جميع ما سبق"], correct: 3 },
            { q: "أي من الحالات التالية تستدعي مراجعة الطبيبة؟", options: ["تأخر الدورة الشهرية لفترات طويلة أو عدم انتظامها باستمرار", "انتظام الدورة الشهرية بشكل طبيعي", "لا توجد أي حالة تستدعي المراجعة", "لا أعرف"], correct: 0 },
            { q: "هل يمكن أن تواجه بعض النساء المصابات بتكيس المبايض صعوبة في التحكم بالوزن؟", options: ["نعم، قد يحدث ذلك لدى بعض النساء", "لا، لا علاقة للمتلازمة بالوزن", "لا أعرف"], correct: 0 },
            { q: "إذا لم تظهر على المرأة أعراض واضحة، فهل يعني ذلك أنها بالتأكيد غير مصابة بتكيس المبايض؟", options: ["نعم، عدم وجود الأعراض ينفي الإصابة دائماً", "لا، فقد تكون بعض الأعراض خفيفة أو غير واضحة", "لا أعرف"], correct: 1 },
            { q: "هل يمكن أن تسبب اضطرابات الغدة الدرقية أعراضاً تشبه أعراض تكيس المبايض؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 }
        ],
        postTest: [
            { q: "أي من الأعراض التالية قد يظهر عند المرأة المصابة بتكيس المبايض؟", options: ["عدم انتظام الدورة الشهرية", "زيادة نمو الشعر في الوجه أو الجسم", "ظهور حب الشباب أو خفة شعر الرأس", "جميع ما سبق"], correct: 3 },
            { q: "أي من الحالات التالية تستدعي مراجعة الطبيبة؟", options: ["تأخر الدورة الشهرية لفترات طويلة أو عدم انتظامها باستمرار", "انتظام الدورة الشهرية بشكل طبيعي", "لا توجد أي حالة تستدعي المراجعة", "لا أعرف"], correct: 0 },
            { q: "هل يمكن أن تواجه بعض النساء المصابات بتكيس المبايض صعوبة في التحكم بالوزن؟", options: ["نعم، قد يحدث ذلك لدى بعض النساء", "لا، لا علاقة للمتلازمة بالوزن", "لا أعرف"], correct: 0 },
            { q: "إذا لم تظهر على المرأة أعراض واضحة، فهل يعني ذلك أنها بالتأكيد غير مصابة بتكيس المبايض؟", options: ["نعم، عدم وجود الأعراض ينفي الإصابة دائماً", "لا، فقد تكون بعض الأعراض خفيفة أو غير واضحة", "لا أعرف"], correct: 1 },
            { q: "هل يمكن أن تسبب اضطرابات الغدة الدرقية أعراضاً تشبه أعراض تكيس المبايض؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 }
        ]
    },
    3: { 
        title: "التشخيص والفحوصات", 
        videoId: "9HWzoFWjMFk",
        preTest: [
            { q: "كيف تعرف المرأة إذا كانت مصابة بتكيس المبايض؟", options: ["من خلال الأعراض وحدها دائماً", "بمراجعة الطبيبة لتقييم الأعراض والتاريخ الصحي وإجراء الفحوصات المناسبة", "من خلال الوزن فقط", "لا أعرف"], correct: 1 },
            { q: "ما الأمور التي قد تستخدمها الطبيبة لتقييم تكيس المبايض؟", options: ["السؤال عن الدورة الشهرية والأعراض والتاريخ الصحي", "الفحص السريري وبعض تحاليل الدم", "التصوير بالموجات فوق الصوتية (سونار) عند الحاجة", "جميع ما سبق، حسب حالة المرأة"], correct: 3 },
            { q: "هل تحتاج كل امرأة بالغة يُشتبه بإصابتها بتكيس المبايض إلى تصوير المبايض بالموجات فوق الصوتية (سونار)؟", options: ["نعم، في جميع الحالات", "لا، فقد يكون التشخيص ممكناً دون التصوير إذا توفرت معايير التشخيص المناسبة", "لا أعرف"], correct: 1 },
            { q: "ماذا ينبغي أن تفعل المرأة إذا كانت تعاني من تأخر الدورة باستمرار أو أعراض توحي بتكيس المبايض؟", options: ["تشخّص نفسها من خلال مواقع التواصل الاجتماعي", "تتجاهل الأعراض", "تراجع طبيبة أو مختصاً صحياً لتقييم حالتها", "تستخدم الأدوية من دون استشارة طبية"], correct: 2 }
        ],
        postTest: [
            { q: "كيف تعرف المرأة إذا كانت مصابة بتكيس المبايض؟", options: ["من خلال الأعراض وحدها دائماً", "بمراجعة الطبيبة لتقييم الأعراض والتاريخ الصحي وإجراء الفحوصات المناسبة", "من خلال الوزن فقط", "لا أعرف"], correct: 1 },
            { q: "ما الأمور التي قد تستخدمها الطبيبة لتقييم تكيس المبايض؟", options: ["السؤال عن الدورة الشهرية والأعراض والتاريخ الصحي", "الفحص السريري وبعض تحاليل الدم", "التصوير بالموجات فوق الصوتية (سونار) عند الحاجة", "جميع ما سبق، حسب حالة المرأة"], correct: 3 },
            { q: "هل تحتاج كل امرأة بالغة يُشتبه بإصابتها بتكيس المبايض إلى تصوير المبايض بالموجات فوق الصوتية (سونار)؟", options: ["نعم، في جميع الحالات", "لا، فقد يكون التشخيص ممكناً دون التصوير إذا توفرت معايير التشخيص المناسبة", "لا أعرف"], correct: 1 },
            { q: "ماذا ينبغي أن تفعل المرأة إذا كانت تعاني من تأخر الدورة باستمرار أو أعراض توحي بتكيس المبايض؟", options: ["تشخّص نفسها من خلال مواقع التواصل الاجتماعي", "تتجاهل الأعراض", "تراجع طبيبة أو مختصاً صحياً لتقييم حالتها", "تستخدم الأدوية من دون استشارة طبية"], correct: 2 }
        ]
    },
    4: { 
        title: "الرعاية والعلاج", 
        videoId: "slI_o2kv-IU",
        preTest: [
            { q: "ما الأمور التي تساعد على دعم صحة المرأة المصابة بتكيس المبايض؟", options: ["تناول طعام متوازن", "ممارسة نشاط بدني مناسب", "النوم الكافي واتباع عادات صحية", "جميع ما سبق"], correct: 3 },
            { q: "هل يوجد علاج واحد يناسب جميع النساء المصابات بتكيس المبايض؟", options: ["نعم، العلاج نفسه يناسب الجميع", "لا، يختلف العلاج حسب الأعراض والحالة الصحية واحتياجات كل امرأة", "لا أعرف"], correct: 1 },
            { q: "ما العبارة الصحيحة بشأن الأدوية المستخدمة لعلاج تكيس المبايض؟", options: ["يجب أن تستخدم جميع المصابات الدواء نفسه", "تحدد الطبيبة العلاج المناسب حسب حالة المرأة وأعراضها", "يمكن استخدام أي دواء من دون استشارة", "لا أعرف"], correct: 1 },
            { q: "لماذا تحتاج المرأة المصابة بتكيس المبايض إلى المتابعة الصحية؟", options: ["لمتابعة الأعراض وصحتها العامة", "لمعرفة ما إذا كانت تحتاج إلى تغيير العلاج أو خطة الرعاية", "لمتابعة المخاطر الصحية المحتملة", "جميع ما سبق"], correct: 3 }
        ],
        postTest: [
            { q: "ما الأمور التي تساعد على دعم صحة المرأة المصابة بتكيس المبايض؟", options: ["تناول طعام متوازن", "ممارسة نشاط بدني مناسب", "النوم الكافي واتباع عادات صحية", "جميع ما سبق"], correct: 3 },
            { q: "هل يوجد علاج واحد يناسب جميع النساء المصابات بتكيس المبايض؟", options: ["نعم، العلاج نفسه يناسب الجميع", "لا، يختلف العلاج حسب الأعراض والحالة الصحية واحتياجات كل امرأة", "لا أعرف"], correct: 1 },
            { q: "ما العبارة الصحيحة بشأن الأدوية المستخدمة لعلاج تكيس المبايض؟", options: ["يجب أن تستخدم جميع المصابات الدواء نفسه", "تحدد الطبيبة العلاج المناسب حسب حالة المرأة وأعراضها", "يمكن استخدام أي دواء من دون استشارة", "لا أعرف"], correct: 1 },
            { q: "لماذا تحتاج المرأة المصابة بتكيس المبايض إلى المتابعة الصحية؟", options: ["لمتابعة الأعراض وصحتها العامة", "لمعرفة ما إذا كانت تحتاج إلى تغيير العلاج أو خطة الرعاية", "لمتابعة المخاطر الصحية المحتملة", "جميع ما سبق"], correct: 3 }
        ]
    },
    5: { 
        title: "التأثيرات الهرمونية والغدد الصماء", 
        videoId: "6w0TsarkfkY",
        preTest: [
            { q: "هل يمكن أن يؤثر تكيس المبايض في الحالة النفسية للمرأة ونوعية حياتها؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "لماذا تعد المتابعة الصحية مهمة للمرأة المصابة بتكيس المبايض؟", options: ["لمتابعة صحة الجسم والهرمونات", "للكشف عن المشكلات الصحية المحتملة مبكراً", "للمساعدة على اختيار الرعاية والعلاج المناسبين", "جميع ما سبق"], correct: 3 },
            { q: "يمكن أن يؤدي الارتفاع المستمر في مستويات الأنسولين إلى تحفيز المبيضين والغدد الصماء على إنتاج كميات زائدة من الهرمونات الذكرية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "تؤدي متلازمة PMOS أعراضاً مثل نمو الشعر الزائد وحب الشباب.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "يمكن أن تتشابه بعض أعراض ارتفاع هرمون الحليب (البرولاكتين) مع أعراض متلازمة PMOS.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "قد يؤثر ارتفاع هرمون التوتر (الكورتيزول) المفرز من الغدة الكظرية في التوازن الهرموني للهرمونات الجنسية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "قد يؤدي الخلل الهرموني المصاحب للمتلازمة إلى عدم اكتمال نضج البويضات، مما قد يسبب صعوبات في الخصوبة والإنجاب.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 }
        ],
        postTest: [
            { q: "هل يمكن أن يؤثر تكيس المبايض في الحالة النفسية للمرأة ونوعية حياتها؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "لماذا تعد المتابعة الصحية مهمة للمرأة المصابة بتكيس المبايض؟", options: ["لمتابعة صحة الجسم والهرمونات", "للكشف عن المشكلات الصحية المحتملة مبكراً", "للمساعدة على اختيار الرعاية والعلاج المناسبين", "جميع ما سبق"], correct: 3 },
            { q: "يمكن أن يؤدي الارتفاع المستمر في مستويات الأنسولين إلى تحفيز المبيضين والغدد الصماء على إنتاج كميات زائدة من الهرمونات الذكرية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "تؤدي متلازمة PMOS أعراضاً مثل نمو الشعر الزائد وحب الشباب.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "يمكن أن تتشابه بعض أعراض ارتفاع هرمون الحليب (البرولاكتين) مع أعراض متلازمة PMOS.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "قد يؤثر ارتفاع هرمون التوتر (الكورتيزول) المفرز من الغدة الكظرية في التوازن الهرموني للهرمونات الجنسية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "قد يؤدي الخلل الهرموني المصاحب للمتلازمة إلى عدم اكتمال نضج البويضات، مما قد يسبب صعوبات في الخصوبة والإنجاب.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 }
        ]
    },
    6: { 
        title: "المعرفة بالجانب الأيضي", 
        videoId: "Wp2CiybENRo",
        preTest: [
            { q: "يرتبط تكيس المبايض بمقاومة الإنسولين وزيادة خطر الإصابة بالسكري من النوع الثاني؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "تُعد مقاومة الإنسولين من العوامل الأيضية الرئيسية المرتبطة بمتلازمة PMOS، إذ تؤثر في قدرة الجسم على استخدام السكر بفاعلية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "يُعد تراكم الدهون في منطقة البطن (السمنة الحشوية) مؤشراً مهماً على وجود خلل أيضي، حتى إذا كان الوزن الإجمالي ضمن المعدل الطبيعي.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "تساهم التغيرات في نمط الحياة، مثل اتباع نظام غذائي منخفض المؤشر الجلايسيمي وممارسة الرياضة، في تحسين حساسية الجسم للإنسولين.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "هل يمكن أن يزيد قصور الغدة الدرقية من مقاومة الإنسولين لدى النساء المصابات بتكيس المبايض؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 }
        ],
        postTest: [
            { q: "يرتبط تكيس المبايض بمقاومة الإنسولين وزيادة خطر الإصابة بالسكري من النوع الثاني؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 },
            { q: "تُعد مقاومة الإنسولين من العوامل الأيضية الرئيسية المرتبطة بمتلازمة PMOS، إذ تؤثر في قدرة الجسم على استخدام السكر بفاعلية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "يُعد تراكم الدهون في منطقة البطن (السمنة الحشوية) مؤشراً مهماً على وجود خلل أيضي، حتى إذا كان الوزن الإجمالي ضمن المعدل الطبيعي.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "تساهم التغيرات في نمط الحياة، مثل اتباع نظام غذائي منخفض المؤشر الجلايسيمي وممارسة الرياضة، في تحسين حساسية الجسم للإنسولين.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "هل يمكن أن يزيد قصور الغدة الدرقية من مقاومة الإنسولين لدى النساء المصابات بتكيس المبايض؟", options: ["نعم", "لا", "لا أعرف"], correct: 0 }
        ]
    }
};

let currentUnit = 0;
let player = null;
let isReviewing = false;

// ==========================================
// 4. تشغيل الصفحة (Onload)
// ==========================================
window.onload = function() {
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
// 5. القائمة الجانبية والوضع الليلي
// ==========================================
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// ==========================================
// 6. دوال الاستبيان
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
    alert("شكراً لك! تم استلام إجاباتك. تظهر الوحدات الآن.");
    localStorage.setItem('surveyDone', 'true');
    document.getElementById('surveyContainer').style.display = 'none';
    document.getElementById('unitsGrid').style.display = 'grid';
    renderUnits();
    updateProgress();
}

// ==========================================
// 7. دوال الوحدات (التعلم والمراجعة)
// ==========================================
function renderUnits() {
    const grid = document.getElementById('unitsGrid');
    let html = "";
    for (let i = 1; i <= 6; i++) {
        const unit = unitsData[i];
        html += `
            <div class="unit-card" id="unit-${i}">
                <div class="card-icon">${i === 1 ? '📖' : i === 2 ? '🔍' : i === 3 ? '🩺' : i === 4 ? '💊' : i === 5 ? '⚖️' : '🧪'}</div>
                <h3>${unit.title}</h3>
                <button class="start-btn" onclick="openUnit(${i}, false)">ابدأ التعلم</button>
            </div>
        `;
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
        // وضع المراجعة (الوحدة مكتملة)
        let postData = JSON.parse(localStorage.getItem('postTests')) || {};
        
        document.getElementById('videoSection').style.display = 'block';
        document.getElementById('popupTitle').innerText = `مراجعة: ${data.title}`;
        document.getElementById('videoStatus').innerText = "✅ لقد أكملت هذه الوحدة مسبقاً. هذه مراجعة فقط.";
        document.getElementById('videoStatus').style.color = "#4caf50";

        const resultText = document.getElementById('resultText');
        if(postData[unitId]) {
            resultText.innerHTML = `<h4>نتيجتك السابقة في هذه الوحدة:</h4><p>${postData[unitId].score} من ${postData[unitId].total}</p>`;
        }
        document.getElementById('resultSection').style.display = 'block';
        document.getElementById('nextBtn').style.display = 'none'; 

        startYoutubePlayer(data.videoId);
    } else {
        // وضع التعلم الجديد
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

    document.getElementById('postTestSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';

    const resultText = document.getElementById('resultText');
    let msg = `<h4>أحسنت! لقد أكملت الوحدة.</h4>
               <p>النتيجة: ${score} من ${data.postTest.length}</p>`;
    
    if (mistakes.length > 0) {
        msg += `<div style="text-align: right; margin-top: 15px; background: #fff3cd; padding: 15px; border-radius: 10px; color: #856404;">
                    <strong>تنبيه (بدون تصحيح تلقائي):</strong> <br> ${mistakes.join('<br>')}
                </div>`;
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
        <p style="margin-top:10px;">تهانينا! يمكنك الآن استلام شهادة الإنجاز الخاصة بك.</p>
        <button class="main-btn" onclick="showCertificate()" style="margin-top:15px; background:var(--gold); color:#000; font-weight:bold;">استلام شهادة الإنجاز 🏆</button>`;
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
            btn.onclick = () => openUnit(i, true); // فتح وضع المراجعة
        } else {
            card.classList.remove('completed');
            btn.innerText = "ابدأ التعلم";
            btn.onclick = () => openUnit(i, false); // فتح وضع التعلم
        }
    }
    const percent = Math.round((completed.length / 6) * 100);
    document.getElementById('progressText').innerText = percent + "%";
    document.getElementById('progressFill').style.width = percent + "%";
    document.getElementById('progressStatus').innerText = `أكملي ${completed.length} من 6 وحدات`;
}

// ==========================================
// 8. الشهادة
// ==========================================
function showCertificate() {
    const name = localStorage.getItem('userFullName') || "طالب";
    const role = localStorage.getItem('userRole') || "متعلم";
    
    let allPost = JSON.parse(localStorage.getItem('postTests')) || {};
    let totalScore = 0; let totalQuestions = 0;
    for(let i=1; i<=6; i++) {
        if(allPost[i]) {
            totalScore += allPost[i].score;
            totalQuestions += allPost[i].total;
        }
    }
    let percentage = Math.round((totalScore / totalQuestions) * 100);

    document.getElementById('resultSection').innerHTML = `
        <div class="certificate">
            <h1>شهادة إنجاز</h1>
            <h2>NURSEED - منصة التوعية الصحية</h2>
            <p>تشهد المنصة بأن</p>
            <div class="name">${role} ${name}</div>
            <p>قد أكمل بنجاح جميع الوحدات التعليمية لقسم متلازمة تكيس المبايض (PCOS).</p>
            <p>بمعدل نهائي: <strong>${percentage}%</strong></p>
            <div class="footer">
                <div>
                    <p>التاريخ: ${new Date().toLocaleDateString('ar-EG')}</p>
                </div>
                <div>
                    <p>مديرة المنصة</p>
                    <p>althlath046@gmail.com</p>
                </div>
            </div>
        </div>
        <p style="margin-top:20px; font-size:0.9em; color:#666;">تم حفظ النتيجة في ملفك. (لاحقاً سيتم إرسالها تلقائياً للمدير)</p>
    `;
    }

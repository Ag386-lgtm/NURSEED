// ==========================================
// 1. إدارة الحساب
// ==========================================
const currentEmail = localStorage.getItem('currentEmail');
if (!currentEmail) {
    window.location.href = "index.html"; 
}

// ==========================================
// 2. البيانات (الاستبيان والوحدات) - معدلة
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
    { q: "18. هل سمعت من قبل عن متلازمة تكيس المبايض الأيضي؟", type: "select", options: ["نعم", "لا"] },
    { q: "19. إذا كانت الإجابة نعم، ما مصدر معلوماتك؟", type: "select", options: ["مواقع التواصل الاجتماعي", "الإنترنت", "الطبيب أو الكادر الصحي", "المحاضرات الدراسية", "الأهل أو الصديقات", "مصدر آخر"] },
    { q: "20. هل لاحظت حدوث زيادة مفاجئة في وزنك؟", type: "select", options: ["نعم", "لا"] },
    { q: "21. هل تعتقدين أن متلازمة تكيس المبايض الأيضي قد تؤثر في الحياة اليومية للمرأة؟", type: "select", options: ["نعم", "لا"] },
    { q: "22. هل تتبعين نظاماً غذائياً أو نمط حياة صحياً للمحافظة على صحتك؟", type: "select", options: ["نعم", "لا"] },
    { q: "23. هل واجهت مشكلات في النوم؟", type: "select", options: ["نعم", "لا"] },
    { q: "24. هل تشعرين بوجود دعم من عائلتك أو الأشخاص المقربين منك بخصوص متلازمة تكيس المبايض الأيضي؟", type: "select", options: ["نعم", "لا"] },
    { q: "25. هل تشعرين بوجود دعم نفسي وعاطفي من الأشخاص المحيطين بك؟", type: "select", options: ["نعم", "لا"] }
];

const unitsData = {
    1: { 
        title: "المعرفة العامة بمتلازمة تكيس المبايض الأيضي", 
        videoId: "0rlto-F0NdI",
        preTest: [
            { q: "ما المقصود بمتلازمة تكيس المبايض الأيضي؟", options: ["حالة صحية ترتبط باضطراب الهرمونات وقد تؤثر في الدورة الشهرية وصحة الجسم.", "مرض ينتقل من امرأة إلى أخرى.", "مرض يصيب النساء الحوامل فقط.", "لا أعرف."], correct: 0 },
            { q: "هل يمكن أن تصاب المرأة بتكيس المبايض حتى لو كان وزنها طبيعياً؟", options: ["نعم.", "لا.", "لا أعرف."], correct: 0 },
            { q: "هل تظهر الأعراض نفسها عند جميع النساء المصابات بتكيس المبايض؟", options: ["نعم، الأعراض نفسها عند الجميع.", "لا، تختلف الأعراض من امرأة إلى أخرى.", "لا أعرف."], correct: 1 },
            { q: "هل يعني تكيس المبايض أن المرأة لن تحمل مطلقاً؟", options: ["نعم، لا يمكنها الحمل.", "لا، يمكن لكثير منهن الحمل.", "لا أعرف."], correct: 1 }
        ],
        postTest: [
            { q: "ما المقصود بمتلازمة تكيس المبايض الأيضي؟", options: ["حالة صحية ترتبط باضطراب الهرمونات وقد تؤثر في الدورة الشهرية وصحة الجسم.", "مرض ينتقل من امرأة إلى أخرى.", "مرض يصيب النساء الحوامل فقط.", "لا أعرف."], correct: 0 },
            { q: "هل يمكن أن تصاب المرأة بتكيس المبايض حتى لو كان وزنها طبيعياً؟", options: ["نعم.", "لا.", "لا أعرف."], correct: 0 },
            { q: "هل تظهر الأعراض نفسها عند جميع النساء المصابات بتكيس المبايض؟", options: ["نعم، الأعراض نفسها عند الجميع.", "لا، تختلف الأعراض من امرأة إلى أخرى.", "لا أعرف."], correct: 1 },
            { q: "هل يعني تكيس المبايض أن المرأة لن تحمل مطلقاً؟", options: ["نعم، لا يمكنها الحمل.", "لا، يمكن لكثير منهن الحمل.", "لا أعرف."], correct: 1 }
        ]
    },
    2: { 
        title: "العلامات والأعراض", 
        videoId: "J1HizKD-MN8",
        preTest: [
            { q: "أي من الأعراض التالية قد تظهر عند المصابة بتكيس المبايض؟", options: ["عدم انتظام الدورة الشهرية.", "زيادة نمو الشعر.", "حب الشباب.", "جميع ما سبق."], correct: 3 },
            { q: "متى تستدعي الحالة مراجعة الطبيبة؟", options: ["عند تأخر الدورة الشهرية باستمرار.", "عند انتظامها.", "لا داعي للمراجعة.", "لا أعرف."], correct: 0 },
            { q: "هل تواجه المصابات بتكيس المبايض صعوبة في التحكم بالوزن؟", options: ["نعم.", "لا.", "لا أعرف."], correct: 0 },
            { q: "إذا لم تظهر أعراض واضحة، هل يعني ذلك عدم الإصابة؟", options: ["نعم.", "لا، قد تكون الأعراض خفيفة.", "لا أعرف."], correct: 1 },
            { q: "هل يمكن أن تتشابه أعراض اضطرابات الغدة الدرقية مع أعراض تكيس المبايض؟", options: ["نعم.", "لا.", "لا أعرف."], correct: 0 }
        ],
        postTest: [
            { q: "أي من الأعراض التالية قد تظهر عند المصابة بتكيس المبايض؟", options: ["عدم انتظام الدورة الشهرية.", "زيادة نمو الشعر.", "حب الشباب.", "جميع ما سبق."], correct: 3 },
            { q: "متى تستدعي الحالة مراجعة الطبيبة؟", options: ["عند تأخر الدورة الشهرية باستمرار.", "عند انتظامها.", "لا داعي للمراجعة.", "لا أعرف."], correct: 0 },
            { q: "هل تواجه المصابات بتكيس المبايض صعوبة في التحكم بالوزن؟", options: ["نعم.", "لا.", "لا أعرف."], correct: 0 },
            { q: "إذا لم تظهر أعراض واضحة، هل يعني ذلك عدم الإصابة؟", options: ["نعم.", "لا، قد تكون الأعراض خفيفة.", "لا أعرف."], correct: 1 },
            { q: "هل يمكن أن تتشابه أعراض اضطرابات الغدة الدرقية مع أعراض تكيس المبايض؟", options: ["نعم.", "لا.", "لا أعرف."], correct: 0 }
        ]
    },
    3: { 
        title: "التشخيص والفحوصات", 
        videoId: "9HWzoFWjMFk",
        preTest: [
            { q: "كيف تعرف المرأة إصابتها بتكيس المبايض؟", options: ["بالأعراض فقط.", "بمراجعة الطبيبة وإجراء الفحوصات.", "بالوزن فقط.", "لا أعرف."], correct: 1 },
            { q: "ما الأمور التي قد تستخدمها الطبيبة لتقييم تكيس المبايض؟", options: ["السؤال عن الدورة الشهرية والأعراض والتاريخ الصحي.", "الفحص السريري وبعض تحاليل الدم.", "التصوير بالموجات فوق الصوتية (سونار) عند الحاجة.", "جميع ما سبق، حسب حالة المرأة."], correct: 3 },
            { q: "هل تحتاج كل امرأة بالغة يُشتبه بإصابتها بتكيس المبايض إلى تصوير المبايض بالموجات فوق الصوتية (سونار)؟", options: ["نعم، في جميع الحالات.", "لا، فقد يكون التشخيص ممكناً دون التصوير إذا توفرت معايير التشخيص المناسبة.", "لا أعرف."], correct: 1 },
            { q: "ماذا ينبغي أن تفعل المرأة إذا كانت تعاني من تأخر الدورة باستمرار أو أعراض توحي بتكيس المبايض؟", options: ["تشخص نفسها من خلال مواقع التواصل الاجتماعي.", "تتجاهل الأعراض.", "تراجع طبيبة أو مختصاً صحياً لتقييم حالتها.", "تستخدم الأدوية من دون استشارة طبية."], correct: 2 }
        ],
        postTest: [
            { q: "كيف تعرف المرأة إصابتها بتكيس المبايض؟", options: ["بالأعراض فقط.", "بمراجعة الطبيبة وإجراء الفحوصات.", "بالوزن فقط.", "لا أعرف."], correct: 1 },
            { q: "ما الأمور التي قد تستخدمها الطبيبة لتقييم تكيس المبايض؟", options: ["السؤال عن الدورة الشهرية والأعراض والتاريخ الصحي.", "الفحص السريري وبعض تحاليل الدم.", "التصوير بالموجات فوق الصوتية (سونار) عند الحاجة.", "جميع ما سبق، حسب حالة المرأة."], correct: 3 },
            { q: "هل تحتاج كل امرأة بالغة يُشتبه بإصابتها بتكيس المبايض إلى تصوير المبايض بالموجات فوق الصوتية (سونار)؟", options: ["نعم، في جميع الحالات.", "لا، فقد يكون التشخيص ممكناً دون التصوير إذا توفرت معايير التشخيص المناسبة.", "لا أعرف."], correct: 1 },
            { q: "ماذا ينبغي أن تفعل المرأة إذا كانت تعاني من تأخر الدورة باستمرار أو أعراض توحي بتكيس المبايض؟", options: ["تشخص نفسها من خلال مواقع التواصل الاجتماعي.", "تتجاهل الأعراض.", "تراجع طبيبة أو مختصاً صحياً لتقييم حالتها.", "تستخدم الأدوية من دون استشارة طبية."], correct: 2 }
        ]
    },
    4: { 
        title: "الرعاية والعلاج", 
        videoId: "slI_o2kv-IU",
        preTest: [
            { q: "ما الأمور التي تساعد على دعم صحة المرأة المصابة بتكيس المبايض؟", options: ["تناول طعام متوازن.", "ممارسة نشاط بدني مناسب.", "النوم الكافي واتباع عادات صحية.", "جميع ما سبق."], correct: 3 },
            { q: "هل يوجد علاج واحد يناسب جميع النساء المصابات بتكيس المبايض؟", options: ["نعم، العلاج نفسه يناسب الجميع.", "لا، يختلف العلاج حسب الأعراض والحالة الصحية واحتياجات كل امرأة.", "لا أعرف."], correct: 1 },
            { q: "ما الصحيح بشأن الأدوية لعلاج تكيس المبايض؟", options: ["يوجد دواء واحد يناسب الجميع.", "تحدد الطبيبة العلاج المناسب حسب الحالة.", "يمكن استخدام أي دواء من الصيدلية.", "لا أعرف."], correct: 1 },
            { q: "لماذا تعد المتابعة الصحية مهمة للمرأة المصابة بتكيس المبايض؟", options: ["لمتابعة صحة الجسم والهرمونات.", "للكشف عن المشكلات الصحية المحتملة مبكراً.", "للمساعدة على اختيار الرعاية والعلاج المناسبين.", "جميع ما سبق."], correct: 3 }
        ],
        postTest: [
            { q: "ما الأمور التي تساعد على دعم صحة المرأة المصابة بتكيس المبايض؟", options: ["تناول طعام متوازن.", "ممارسة نشاط بدني مناسب.", "النوم الكافي واتباع عادات صحية.", "جميع ما سبق."], correct: 3 },
            { q: "هل يوجد علاج واحد يناسب جميع النساء المصابات بتكيس المبايض؟", options: ["نعم، العلاج نفسه يناسب الجميع.", "لا، يختلف العلاج حسب الأعراض والحالة الصحية واحتياجات كل امرأة.", "لا أعرف."], correct: 1 },
            { q: "ما الصحيح بشأن الأدوية لعلاج تكيس المبايض؟", options: ["يوجد دواء واحد يناسب الجميع.", "تحدد الطبيبة العلاج المناسب حسب الحالة.", "يمكن استخدام أي دواء من الصيدلية.", "لا أعرف."], correct: 1 },
            { q: "لماذا تعد المتابعة الصحية مهمة للمرأة المصابة بتكيس المبايض؟", options: ["لمتابعة صحة الجسم والهرمونات.", "للكشف عن المشكلات الصحية المحتملة مبكراً.", "للمساعدة على اختيار الرعاية والعلاج المناسبين.", "جميع ما سبق."], correct: 3 }
        ]
    },
    5: { 
        title: "التأثيرات الهرمونية والغدد الصماء", 
        videoId: "6w0TsarkfkY",
        preTest: [
            { q: "هل يؤثر تكيس المبايض في الحالة النفسية للمرأة؟", options: ["نعم.", "لا.", "لا أعرف."], correct: 0 },
            { q: "لماذا تعد المتابعة الصحية مهمة للمرأة المصابة بتكيس المبايض؟", options: ["لمتابعة صحة الجسم والهرمونات.", "للكشف عن المشكلات الصحية المحتملة مبكراً.", "للمساعدة على اختيار الرعاية والعلاج المناسبين.", "جميع ما سبق."], correct: 3 },
            { q: "يمكن أن يؤدي الارتفاع المستمر في مستويات الأنسولين إلى تحفيز المبيضين والغدد الصماء على إنتاج كميات زائدة من الهرمونات الذكرية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "تؤدي متلازمة تكيس المبايض الأيضي إلى أعراض مثل نمو الشعر الزائد وحب الشباب.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "يمكن أن تتشابه بعض أعراض ارتفاع هرمون الحليب (البرولاكتين) مع أعراض متلازمة تكيس المبايض الأيضي.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "قد يؤثر ارتفاع هرمون التوتر (الكورتيزول) المفرز من الغدة الكظرية في توازن الهرمونات الجنسية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "قد يؤدي الخلل الهرموني المصاحب للمتلازمة إلى عدم اكتمال نضج البويضات، مما قد يسبب صعوبات في الخصوبة والإنجاب.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 }
        ],
        postTest: [
            { q: "هل يؤثر تكيس المبايض في الحالة النفسية للمرأة؟", options: ["نعم.", "لا.", "لا أعرف."], correct: 0 },
            { q: "لماذا تعد المتابعة الصحية مهمة للمرأة المصابة بتكيس المبايض؟", options: ["لمتابعة صحة الجسم والهرمونات.", "للكشف عن المشكلات الصحية المحتملة مبكراً.", "للمساعدة على اختيار الرعاية والعلاج المناسبين.", "جميع ما سبق."], correct: 3 },
            { q: "يمكن أن يؤدي الارتفاع المستمر في مستويات الأنسولين إلى تحفيز المبيضين والغدد الصماء على إنتاج كميات زائدة من الهرمونات الذكرية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "تؤدي متلازمة تكيس المبايض الأيضي إلى أعراض مثل نمو الشعر الزائد وحب الشباب.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "يمكن أن تتشابه بعض أعراض ارتفاع هرمون الحليب (البرولاكتين) مع أعراض متلازمة تكيس المبايض الأيضي.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "قد يؤثر ارتفاع هرمون التوتر (الكورتيزول) المفرز من الغدة الكظرية في توازن الهرمونات الجنسية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "قد يؤدي الخلل الهرموني المصاحب للمتلازمة إلى عدم اكتمال نضج البويضات، مما قد يسبب صعوبات في الخصوبة والإنجاب.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 }
        ]
    },
    6: { 
        title: "المعرفة بالجانب الأيضي", 
        videoId: "Wp2CiybENRo",
        preTest: [
            { q: "هل يرتبط تكيس المبايض بمقاومة الإنسولين وزيادة خطر الإصابة بالسكري من النوع الثاني؟", options: ["نعم.", "لا.", "لا أعرف."], correct: 0 },
            { q: "تعد مقاومة الإنسولين من العوامل الأيضية الرئيسية المرتبطة بمتلازمة تكيس المبايض الأيضي، إذ تؤثر في قدرة الجسم على استخدام السكر بفاعلية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "يعد تراكم الدهون في منطقة البطن (السمنة الحشوية) مؤشراً مهماً على وجود خلل أيضي، حتى إذا كان الوزن الإجمالي ضمن المعدل الطبيعي.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "تساهم التغيرات في نمط الحياة، مثل اتباع نظام غذائي منخفض المؤشر الجلايسيمي وممارسة الرياضة، في تحسين حساسية الجسم للأنسولين.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "هل يمكن أن يزيد قصور الغدة الدرقية من مقاومة الإنسولين لدى النساء المصابات بتكيس المبايض؟", options: ["نعم.", "لا.", "لا أعرف."], correct: 0 }
        ],
        postTest: [
            { q: "هل يرتبط تكيس المبايض بمقاومة الإنسولين وزيادة خطر الإصابة بالسكري من النوع الثاني؟", options: ["نعم.", "لا.", "لا أعرف."], correct: 0 },
            { q: "تعد مقاومة الإنسولين من العوامل الأيضية الرئيسية المرتبطة بمتلازمة تكيس المبايض الأيضي، إذ تؤثر في قدرة الجسم على استخدام السكر بفاعلية.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "يعد تراكم الدهون في منطقة البطن (السمنة الحشوية) مؤشراً مهماً على وجود خلل أيضي، حتى إذا كان الوزن الإجمالي ضمن المعدل الطبيعي.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "تساهم التغيرات في نمط الحياة، مثل اتباع نظام غذائي منخفض المؤشر الجلايسيمي وممارسة الرياضة، في تحسين حساسية الجسم للأنسولين.", options: ["صحيح", "خطأ", "لا أعرف"], correct: 0 },
            { q: "هل يمكن أن يزيد قصور الغدة الدرقية من مقاومة الإنسولين لدى النساء المصابات بتكيس المبايض؟", options: ["نعم.", "لا.", "لا أعرف."], correct: 0 }
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
    if (unitId === 1 && !reviewMode && !localStorage.getItem('seenFirstUnitAlert')) {
        localStorage.setItem('seenFirstUnitAlert', 'true');
        alert("مرحباً بك في رحلتك التعليمية! 🎓\nمع إكمالك لكل وحدة، ستمتلئ شهادتك تدريجياً. في النهاية، ستحصل على شهادة إنجاز كاملة يمكنك مشاركتها مع الجميع.");
    }

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

    setTimeout(() => {
        showCertificatePopup();
    }, 1500);

    const nextBtn = document.getElementById('nextBtn');
    if (currentUnit < 6) {
        nextBtn.style.display = 'block';
        nextBtn.innerText = "الانتقال للوحدة التالية ➡️";
    } else {
        nextBtn.style.display = 'none';
        resultText.innerHTML += `<h3 style="color:var(--success); margin-top:20px;">🎓 لقد أكملت جميع الوحدات بنجاح!</h3>
        <p style="margin-top:10px;">تهانينا! يمكنك الآن الانتقال لصفحة "شهاداتي" لاستلام شهادتك النهائية.</p>
        <button class="main-btn" onclick="window.location.href='certificates.html'" style="margin-top:15px; background:var(--gold); color:#000; font-weight:bold;">الانتقال لشهاداتي 🏆</button>`;
    }
}

function showCertificatePopup() {
    const completed = JSON.parse(localStorage.getItem('pmos_completed')) || [];
    const postTests = JSON.parse(localStorage.getItem('postTests')) || {};
    const name = localStorage.getItem('userFullName');
    
    let totalScore = 0;
    let totalQuestions = 0;
    for (let i = 1; i <= 6; i++) {
        if (postTests[i]) {
            totalScore += postTests[i].score;
            totalQuestions += postTests[i].total;
        }
    }

    let popupHtml = `
        <div id="certPopup" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; justify-content: center; align-items: center; padding: 20px;">
            <div style="background: #fff; padding: 30px; border-radius: 15px; text-align: center; max-width: 500px; width: 100%; border: 5px solid var(--primary); position: relative;">
                <span onclick="document.getElementById('certPopup').remove()" style="position: absolute; top: 10px; right: 15px; font-size: 24px; cursor: pointer; color: #888;">&times;</span>
                
                <h2 style="color: var(--primary); margin-bottom: 10px;">🏆 شهادة إنجاز</h2>
                <p style="font-size: 1.1em; margin-bottom: 15px;">تُمنح إلى: <strong style="color: var(--gold); font-size: 1.3em;">${name}</strong></p>
                
                <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                    <p style="margin-bottom: 5px;">الوحدات المكتملة: <strong>${completed.length} / 6</strong></p>
                    <div style="width: 100%; background: #ddd; height: 10px; border-radius: 5px; overflow: hidden;">
                        <div style="width: ${(completed.length / 6) * 100}%; background: var(--success); height: 100%;"></div>
                    </div>
                    <p style="margin-top: 10px;">النتيجة الإجمالية الحالية: <strong>${totalScore} / ${totalQuestions}</strong></p>
                </div>
                
                <p style="font-size: 0.9em; color: #666;">استمر في التعلم! الشهادة تكتمل مع كل وحدة تنهيها.</p>
                <button class="main-btn" onclick="document.getElementById('certPopup').remove()" style="margin-top: 15px; width: auto; padding: 10px 30px;">متابعة التعلم</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHtml);
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

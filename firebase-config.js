// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCoDLpvPnJ58aL8-pHwHtMBMgRdZY6NVgU",
    authDomain: "nurseed-c2aa4.firebaseapp.com",
    projectId: "nurseed-c2aa4",
    storageBucket: "nurseed-c2aa4.firebasestorage.app",
    messagingSenderId: "593899467317",
    appId: "1:593899467317:web:ee5a1e029f0afeee70b77c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// تصدير دالة الحفظ لاستخدامها في الملفات الأخرى
export async function saveToFirebase(data) {
    try {
        await addDoc(collection(db, "nurseed_data"), data);
        console.log("✅ تم الحفظ في Firebase بنجاح:", data.action);
    } catch (e) {
        console.error("❌ خطأ في الحفظ في Firebase: ", e);
    }
}

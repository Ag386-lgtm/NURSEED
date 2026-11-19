// 1. دالة تسجيل الدخول
function loginUser() {
    const name = document.getElementById('studentName').value;
    const role = document.getElementById('userRole').value;

    if (name.trim() === "") {
        alert("الرجاء إدخال اسمك أولاً!");
        return;
    }

    document.getElementById('loginModal').style.display = 'none';
    const welcomeMsg = document.getElementById('welcomeMessage');
    welcomeMsg.innerText = `أهلاً بك ${role} ${name}، يرجى اختيار الوحدة العلمية للبدء`;

    localStorage.setItem('userName', name);
    localStorage.setItem('userRole', role);
}

window.onload = function() {
    const savedName = localStorage.getItem('userName');
    const savedRole = localStorage.getItem('userRole');
    
    if (savedName) {
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('welcomeMessage').innerText = `أهلاً بعودتك ${savedRole} ${savedName}`;
    }
};

// 2. دالة فتح الفيديو (النافذة المنبثقة)
function openVideo(videoUrl) {
    const popup = document.getElementById('videoPopup');
    const iframe = document.getElementById('videoFrame');
    
    // نغير رابط الفيديو اللي بالكود
    iframe.src = videoUrl;
    
    // نظهر النافذة
    popup.style.display = 'flex';
}

// 3. دالة تسكير الفيديو
function closeVideo() {
    const popup = document.getElementById('videoPopup');
    const iframe = document.getElementById('videoFrame');
    
    // نوقف الفيديو (عشان ما يظل شغال بالخلفية)
    iframe.src = "";
    
    // نخفي النافذة
    popup.style.display = 'none';
}

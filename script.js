/* =========================================
   1. DATE NIGHT GAME LOGIC
========================================= */
const gameContainer = document.getElementById('game-container');
const mainContent = document.getElementById('main-content');

// Load saved stage or start at 1
let currentStage = parseInt(localStorage.getItem('dateStage')) || 1;

window.onload = () => {
    if(currentStage > 4) {
        // If game finished, show main content immediately
        gameContainer.style.display = 'none';
        mainContent.style.display = 'block';
        setTimeout(() => { mainContent.style.opacity = 1; initializeTimer(); }, 50);
        checkCoupons();
    } else {
        // Show current game step
        showGameStep(currentStage);
    }
};

function showGameStep(step) {
    document.querySelectorAll('.game-step').forEach(el => el.classList.remove('active'));
    document.getElementById(`game-step-${step}`).classList.add('active');
}

function nextGameStep(nextStep) {
    currentStage = nextStep;
    localStorage.setItem('dateStage', currentStage);
    showGameStep(currentStage);
}

// STEP 2: Rating
function rateStar(star) {
    const stars = document.querySelectorAll('.star-rating span');
    stars.forEach((s, index) => {
        if (index < star) s.classList.add('active');
        else s.classList.remove('active');
    });
    
    document.getElementById('rating-text').innerText = `哇！${star} 星好评！😋`;
    document.getElementById('btn-step-2').classList.remove('hidden');
}

// STEP 3: Tasks
let tasksCompleted = 0;
function toggleTask(element) {
    if (!element.classList.contains('checked')) {
        element.classList.add('checked');
        tasksCompleted++;
        if (tasksCompleted === 3) {
            const btn = document.getElementById('btn-step-3');
            btn.classList.remove('disabled');
            btn.innerText = "全部完成！点击解锁 🎁";
        }
    }
}

// FINISH GAME
function finishGame() {
    nextGameStep(5); // Mark as complete
    gameContainer.style.transition = "opacity 1s";
    gameContainer.style.opacity = 0;
    
    // Instant switch for cleaner feel
    mainContent.style.display = 'block';
    
    setTimeout(() => {
        gameContainer.style.display = 'none';
        mainContent.style.opacity = 1;
        initializeTimer(); 
        checkCoupons();
    }, 800); // Wait for fade out
}

// =========================================
// 4. GLOBAL RESET (For Testing/Re-locking)
// =========================================
function fullReset() {
    const confirmReset = confirm("确定要重置整个游戏吗？\n这将清除所有进度，回到第一关。");
    if (confirmReset) {
        localStorage.removeItem('dateStage');
        localStorage.removeItem('redeemedCoupons');
        location.reload();
    }
}

/* =========================================
   2. MAIN SITE LOGIC
========================================= */

// --- TIMER LOGIC ---
function initializeTimer() {
    const startDate = new Date(2023, 0, 26, 0, 0).getTime(); 

    function updateTimer() {
        const now = new Date().getTime();
        const distance = now - startDate;

        if (distance < 0) {
            document.getElementById("timer").innerHTML = "Our journey hasn't started yet!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = 
            `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
    }

    setInterval(updateTimer, 1000);
    updateTimer(); 
}

// --- LETTER INTERACTION ---
function openLetter(element) {
    const card = element.querySelector('.letter-card');
    card.classList.toggle('open');
}

// --- PHOTO GALLERY 1: MEMORIES ---
const memoriesData = [
    { src: "images/FirstImage.jpeg", title: "The Beginning", desc: "第一张找你拍照" },
    { src: "images/SecondImage.jpeg", title: "Unwavering You", desc: "第一次鼓起勇气，约你跨年的合照" },
    { src: "images/ThirdImage.jpeg", title: "Future Road", desc: "第一次和你在一起后的合照" }
];
let memIndex = 0;

function nextMemory() {
    memIndex++;
    if (memIndex < memoriesData.length) {
        const frame = document.querySelector('.photo-frame[onclick="nextMemory()"]');
        const img = document.getElementById('mem-img');
        const title = document.getElementById('mem-title');
        const desc = document.getElementById('mem-desc');

        frame.classList.add('fade-out');
        setTimeout(() => {
            const nextData = memoriesData[memIndex];
            img.src = nextData.src;
            title.innerText = nextData.title;
            desc.innerText = nextData.desc;
            frame.classList.remove('fade-out');
        }, 300);
    } else {
        document.getElementById('mem-frame').style.display = 'none';
        document.getElementById('mem-grid').style.display = 'flex';
        document.getElementById('mem-instruction').innerText = "All memories unlocked! ❤️";
    }
}

// --- PHOTO GALLERY 2: HOLDING HANDS ---
const handsData = [
    { src: "images/FirstHold.jpeg", title: "第一次牵手", desc: "心跳加速的那一刻" },
    { src: "images/SecondHold.jpeg", title: "日常温度", desc: "出门时自然的紧握" },
    { src: "images/ThirdHold.jpeg", title: "坚定相伴", desc: "未来的路也要这样走" }
];
let handIndex = 0;

function nextHand() {
    handIndex++;
    if (handIndex < handsData.length) {
        const frame = document.querySelector('.photo-frame[onclick="nextHand()"]');
        const img = document.getElementById('hand-img');
        const title = document.getElementById('hand-title');
        const desc = document.getElementById('hand-desc');

        frame.classList.add('fade-out');
        setTimeout(() => {
            const nextData = handsData[handIndex];
            img.src = nextData.src;
            title.innerText = nextData.title;
            desc.innerText = nextData.desc;
            frame.classList.remove('fade-out');
        }, 300);
    } else {
        document.getElementById('hand-frame').style.display = 'none';
        document.getElementById('hand-grid').style.display = 'flex';
        document.getElementById('hand-instruction').innerText = "Hold my hand forever 🤝";
    }
}

// --- PHOTO GALLERY 3: COMPANIONSHIP (Corrected Data) ---
const dateData = [
    { src: "images/firstmeal.jpeg", title: "跨年的第一餐", desc: "勇气的开始" },
    { src: "images/walk.jpeg", title: "背影杀", desc: "心动得没话说" },
    { src: "images/secondmeal.jpeg", title: "第一次单独约会", desc: "简单的快乐" },
    { src: "images/cantik.jpeg", title: "男友视角", desc: "可爱死了" },
    { src: "images/thirdmeal.jpeg", title: "单独约你吃饭", desc: "因为有你" },
    { src: "images/fourthmeal.jpeg", title: "第一次带你从羽毛球练习", desc: "平淡也浪漫" },
    { src: "images/fifthmeal.jpeg", title: "第三次的约会", desc: "每一个瞬间" },
    { src: "images/sixthmeal.jpeg", title: "正式告白的前夕", desc: "确定你是那个人的瞬间" },
    { src: "images/firstcompetition.jpeg", title: "偷偷去支持你比赛", desc: "我的宝真的很强" },
    { src: "images/badmintonteman.jpeg", title: "在一起后第一次跟你打球", desc: "我们的故事还在继续" }
];
let dateIndex = 0;

function nextDate() {
    dateIndex++;
    if (dateIndex < dateData.length) {
        const frame = document.querySelector('.photo-frame[onclick="nextDate()"]');
        const img = document.getElementById('date-img');
        const title = document.getElementById('date-title');
        const desc = document.getElementById('date-desc');

        frame.classList.add('fade-out');
        setTimeout(() => {
            const nextData = dateData[dateIndex];
            img.src = nextData.src;
            title.innerText = nextData.title;
            desc.innerText = nextData.desc;
            frame.classList.remove('fade-out');
        }, 300);
    } else {
        document.getElementById('date-frame').style.display = 'none';
        document.getElementById('date-grid').style.display = 'flex';
        document.getElementById('date-instruction').innerText = "陪伴是最长情的告白 🌹";
    }
}

// --- REASONS GENERATOR ---
const reasons = [
    "因为你是 VLT1923 最棒的女车主 🚗",
    "因为那两条 Apollo，是你让我相信了一见钟情。",
    "因为你当初坚定地挡在我面前，替我挡住了那些流言蜚语。",
    "因为接受了那么不完美的我。",
    "因为那 20 天的暧昧期，一切都值得。",
    "因为你让这块‘木头’感受到了被爱的幸福。",
    "因为你笑起来的样子，真的很好看。",
    "因为在所有人里，你坚定地选择了我。",
    "我喜欢你身上独特的 Vibes，和你在一起真的很舒服。",
    "因为你是我的 Cingcing，独一无二的张晓晴 ❤️"
];

function generateReason() {
    const displayElement = document.getElementById("reason-display");
    displayElement.classList.remove("show");
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        const randomReason = reasons[randomIndex];
        displayElement.innerText = randomReason;
        displayElement.classList.add("show");
    }, 300);
}

/* =========================================
   3. COUPON CAROUSEL & DATABASE
========================================= */
let currentSlide = 0;
let currentCouponId = null;

function moveSlide(direction) {
    const track = document.getElementById('coupon-track');
    const totalSlides = 12; 
    let itemsPerView = 4; 

    if (window.innerWidth <= 600) {
        itemsPerView = 1;
    } else if (window.innerWidth <= 900) {
        itemsPerView = 2;
    }

    const maxSlide = totalSlides - itemsPerView;

    currentSlide += direction;

    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide > maxSlide) currentSlide = maxSlide;

    const shiftPercent = -(currentSlide * (100 / itemsPerView));
    track.style.transform = `translateX(${shiftPercent}%)`;
}

function checkCoupons() {
    const redeemedList = JSON.parse(localStorage.getItem('redeemedCoupons')) || [];
    redeemedList.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            markAsRedeemed(element);
        }
    });
}

function openCouponModal(id, title, desc) {
    const element = document.getElementById(id);
    if (element.classList.contains('redeemed')) return;

    currentCouponId = id;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    
    const modal = document.getElementById('coupon-modal');
    modal.style.display = 'flex';
}

function closeCouponModal() {
    document.getElementById('coupon-modal').style.display = 'none';
}

function confirmRedeem() {
    if (currentCouponId) {
        const element = document.getElementById(currentCouponId);
        markAsRedeemed(element);
        saveToDatabase(currentCouponId);
        closeCouponModal();
        alert("兑换成功！截图发给我吧。❤️");
    }
}

function markAsRedeemed(element) {
    element.classList.add('redeemed');
    const statusBtn = element.querySelector('.coupon-status');
    statusBtn.innerText = "已使用";
}

function saveToDatabase(id) {
    let redeemedList = JSON.parse(localStorage.getItem('redeemedCoupons')) || [];
    if (!redeemedList.includes(id)) {
        redeemedList.push(id);
        localStorage.setItem('redeemedCoupons', JSON.stringify(redeemedList));
    }
}

function resetCoupons() {
    const confirmReset = confirm("确定要重置所有优惠券吗？");
    if (confirmReset) {
        localStorage.removeItem('redeemedCoupons');
        document.querySelectorAll('.coupon').forEach(coupon => {
            coupon.classList.remove('redeemed');
            coupon.querySelector('.coupon-status').innerText = "使用";
        });
        alert("所有优惠券已重置！✨");
    }
}
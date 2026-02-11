/* =========================================
   1. PASSWORD / LOCK SCREEN LOGIC
========================================= */
const CORRECT_CODE = "260123"; 

const inputs = document.querySelectorAll('.pass-digit');
const lockScreen = document.getElementById('lock-screen');
const mainContent = document.getElementById('main-content');
const errorMsg = document.getElementById('pass-error_msg');

window.onload = () => {
    if(inputs.length > 0) inputs[0].focus();
    checkCoupons(); // Init Database
};

inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        if (!/^\d+$/.test(value)) {
            e.target.value = "";
            return;
        }
        if (value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
        checkPasscode();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" && index > 0 && e.target.value === "") {
            inputs[index - 1].focus();
        }
    });
});

function checkPasscode() {
    let enteredCode = "";
    inputs.forEach(input => enteredCode += input.value);

    if (enteredCode.length === 6) {
        if (enteredCode === CORRECT_CODE) {
            errorMsg.classList.remove('show');
            lockScreen.classList.add('unlock-success');
            setTimeout(() => {
                lockScreen.style.display = 'none';
                mainContent.style.display = 'block';
                setTimeout(() => {
                    mainContent.style.opacity = 1;
                    initializeTimer(); 
                }, 50);
            }, 1000); 
        } else {
            errorMsg.classList.add('show');
            setTimeout(() => {
                 inputs.forEach(input => input.value = "");
                 inputs[0].focus();
                 errorMsg.classList.remove('show');
            }, 1500);
        }
    }
}

/* =========================================
   2. MAIN SITE LOGIC 
========================================= */

// --- TIMER LOGIC ---
function initializeTimer() {
    // Start Date: Jan 26, 2023
    const startDate = new Date(2026, 0, 23, 0, 0).getTime(); 

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

// --- PHOTO GALLERY 1: MEMORIES (Updated descriptions) ---
const memoriesData = [
    { src: "images/FirstImage.jpeg", title: "The Beginning", desc: "第一张找你拍照" },
    { src: "images/SecondImage.jpeg", title: "Unwavering You", desc: "第一次鼓起勇气，约你跨年的合照" },
    { src: "images/ThirdImage.jpeg", title: "Future Road", desc: "第一次和你在一起后的合照" },
    { src: "images/FourthImage.jpeg", title: "奔赴", desc: "第一次飞去 Rawang 找你" },
    { src: "images/FifthImage.jpeg", title: "Date Night", desc: "第一次正式约会" },
    { src: "images/SixthImage.jpeg", title: "OOTD", desc: "第一次的全身照" },
    { src: "images/SeventhImage.jpeg", title: "Campus Love", desc: "第一次在 UM 的合照" }
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

// --- PHOTO GALLERY 2: HOLDING HANDS (New Descriptions Added) ---
const handsData = [
    { src: "images/FirstHold.jpeg", title: "第一次牵手", desc: "心跳加速的那一刻" },
    { src: "images/SecondHold.jpeg", title: "日常温度", desc: "出门时自然的紧握" },
    { src: "images/ThirdHold.jpeg", title: "坚定相伴", desc: "未来的路也要这样走" },
    // New Descriptions below:
    { src: "images/FourthHold.jpeg", title: "专属司机", desc: "开车时也要偷偷牵着你。" },
    { src: "images/FifthHold.jpeg", title: "安全感", desc: "有你抓紧的手，真的很安心。" },
    { src: "images/SixthHold.jpeg", title: "依赖", desc: "喜欢你指尖传来的温度。" },
    { src: "images/SeventhHold.jpeg", title: "未来", desc: "就这样一直牵着走下去吧。" }
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

// --- PHOTO GALLERY 3: THE CHASE (Synced with HTML) ---
const dateData = [
    { src: "images/firstmeal.jpeg", title: "跨年的第一餐", desc: "勇气的开始" },
    { src: "images/walk.jpeg", title: "背影杀", desc: "心动得没话说" },
    { src: "images/secondmeal.jpeg", title: "第一次单独约会", desc: "简单的快乐" },
    { src: "images/cantik.jpeg", title: "男友视角", desc: "可爱死了" },
    { src: "images/thirdmeal.jpeg", title: "单独约你吃饭", desc: "因为有你" },
    { src: "images/fourthmeal.jpeg", title: "第一次带你从羽毛球练习", desc: "平淡也浪漫" },
    { src: "images/fifthmeal.jpeg", title: "第三次的约会", desc: "每一个瞬间" },
    { src: "images/sixthmeal.jpeg", title: "正式告白的前夕", desc: "确定你是那个人的瞬间" },
    { src: "images/firstcompetition.jpeg", title: "偷偷去支持你比赛", desc: "我的宝真的很强" }
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
        document.getElementById('date-instruction').innerText = "追你，是我做过最正确的决定 🌹";
    }
}

// --- REASONS GENERATOR ---
const reasons = [
    "因为你是我的全世界。",
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
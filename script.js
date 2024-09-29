// Firebase 配置
  const firebaseConfig = {
    apiKey: "AIzaSyDad42WGAcv55jZXh-HaEAQmntqZqw6mPE",
    authDomain: "message-5a214.firebaseapp.com",
    databaseURL: "https://message-5a214-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "message-5a214",
    storageBucket: "message-5a214.appspot.com",
    messagingSenderId: "531581384231",
    appId: "1:531581384231:web:61a3847d3c7dd28fe88002",
    measurementId: "G-2K9HBCHMJW"
  };

// 初始化 Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const correctPassword = "zyanga666"; // 设置的进入密码
const clearPassword = "zyanga123";    // 设置的清除密码

function checkPassword() {
    const inputPassword = document.getElementById('password').value;
    if (inputPassword === correctPassword) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
        loadMessages(); // 进入主界面时加载消息
    } else {
        alert("密码错误");
    }
}

function sendMessage() {
    const message = document.getElementById('userInput').value;
    if (message) {
        const timestamp = new Date().toLocaleString();
        const deviceInfo = `来自：${navigator.userAgent}`;

        // 将消息存入 Firebase
        database.ref('messages').push({
            message: message,
            timestamp: timestamp,
            device: deviceInfo
        });

        // 清空输入框
        document.getElementById('userInput').value = '';
    }
}

function clearMessages() {
    const inputPassword = prompt("输入清除密码");
    if (inputPassword === clearPassword) {
        database.ref('messages').remove(); // 清除 Firebase 中的消息
        document.getElementById('messages').innerHTML = ''; // 清空页面中的消息
    } else {
        alert("密码错误");
    }
}

function loadMessages() {
    database.ref('messages').on('value', (snapshot) => {
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = ''; // 清空之前的消息
        snapshot.forEach((childSnapshot) => {
            const messageData = childSnapshot.val();
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            messageDiv.textContent = messageData.message;

            // 显示时间和设备信息
            const timestampDiv = document.createElement('div');
            timestampDiv.className = 'timestamp';
            timestampDiv.textContent = `${messageData.timestamp} | ${messageData.device}`;
            
            messageDiv.appendChild(timestampDiv);
            messagesContainer.appendChild(messageDiv);
        });
    });
}

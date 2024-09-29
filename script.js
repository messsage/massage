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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const correctPassword = "zyanga666";
const clearPassword = "zyanga123";

// 检查密码并显示聊天界面
function checkPassword() {
    const inputPassword = document.getElementById('password').value.trim();
    if (inputPassword === correctPassword) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
        loadMessages(); // 加载消息
    } else {
        alert("密码错误");
    }
}

// 发送消息
function sendMessage() {
    const message = document.getElementById('userInput').value.trim();
    if (message) {
        const messageObj = {
            text: message,
            timestamp: Date.now()
        };
        // 将消息存储到 Firebase
        database.ref('messages').push(messageObj);
        document.getElementById('userInput').value = '';
    }
}

// 清除消息
function clearMessages() {
    const inputPassword = prompt("输入清除密码");
    if (inputPassword === clearPassword) {
        database.ref('messages').remove(); // 从 Firebase 删除所有消息
        document.getElementById('messages').innerHTML = '';
    } else {
        alert("密码错误");
    }
}

// 加载消息
function loadMessages() {
    // 从 Firebase 加载消息
    database.ref('messages').on('child_added', function(snapshot) {
        const message = snapshot.val();
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message.text;
        document.getElementById('messages').appendChild(messageDiv);
    });
}

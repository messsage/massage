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

// 初始化Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 设置密码
const correctPassword = "zyanga666";
const clearPassword = "zyanga123";

// 在页面加载时显示当前密码
document.getElementById('displayPassword').textContent = correctPassword;

// 验证密码
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
    const message = document.getElementById('userInput').value;
    if (message) {
        database.ref('messages').push().set({
            text: message
        });
        document.getElementById('userInput').value = '';
    }
}

// 清除消息
function clearMessages() {
    const inputPassword = prompt("输入清除密码");
    if (inputPassword === clearPassword) {
        database.ref('messages').remove();
        document.getElementById('messages').innerHTML = '';
    } else {
        alert("密码错误");
    }
}

// 加载消息
function loadMessages() {
    database.ref('messages').on('value', (snapshot) => {
        document.getElementById('messages').innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val().text;
            displayMessage(message);
        });
    });
}

// 显示消息
function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    document.getElementById('messages').appendChild(messageDiv);
}

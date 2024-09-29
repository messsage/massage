const correctPassword = "your_password";
const clearPassword = "clear_password";

function checkPassword() {
    const inputPassword = document.getElementById('password').value;
    if (inputPassword === correctPassword) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
    } else {
        alert("密码错误");
    }
}

function sendMessage() {
    const message = document.getElementById('userInput').value;
    if (message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        document.getElementById('messages').appendChild(messageDiv);
        document.getElementById('userInput').value = '';
    }
}

function clearMessages() {
    const inputPassword = prompt("输入清除密码");
    if (inputPassword === clearPassword) {
        document.getElementById('messages').innerHTML = '';
    } else {
        alert("密码错误");
    }
}

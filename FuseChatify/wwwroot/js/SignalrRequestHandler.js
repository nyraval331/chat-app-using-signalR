var connection = new signalR.HubConnectionBuilder()
    .withUrl('/Home/Index')
    .build();

var onlineOfflineStatus = null;
connection.on('MessageRecieve', addMessageToChat);

connection.start().then(res => {
    console.log("connection established with server!");
}).catch(error => {
    console.error(error.message);
});

setTimeout(function () {
    if (connection.connection.connectionState == 1) {
        onlineOfflineStatus = setInterval(function () {
            if (connection.connection.connectionState == 1) {
                checkUserConnectedStatus();
            }
            else {
                clearInterval(onlineOfflineStatus);
            }
        }, (1000 * 30));
    }
    else {
        clearInterval(onlineOfflineStatus)
    }
}, 5000);

function sendMessageToHub(messageDTO) {
    connection.invoke('SendMessage', messageDTO);
}

function checkUserConnectedStatus() {
    connection.invoke('CheckUserConnectedStatus', currentUserId);
}

connection.on('UpdateUserConnectedStatus', updateUserConnectedStatus);

function isUserTyping(fromUserId = "", toUserId = "") {
    connection.invoke('UserTypingStart', fromUserId, toUserId);
}

connection.on('UserTypingInProgress', userTypingInProgress);

function isUserTypingStopped(fromUserId = "", toUserId = "") {
    connection.invoke('UserTypingStop', fromUserId, toUserId);
}

connection.on('UserTypingStopped', userTypingStopped);
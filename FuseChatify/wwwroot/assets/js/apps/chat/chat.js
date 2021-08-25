var currentToUserId = "";

$(document).on('click', '.chat-list .contact', function () {
    changeView('#chat-content-views', '#chat-view');
});

$(document).on('click', '#contacts-button', function () {
    changeView('#chat-left-sidebar-views', '#contacts-view');
});

$(document).on('click', '.back-to-chats-button', function () {
    changeView('#chat-left-sidebar-views', '#chats-view');
});

$(document).on('click', '#user-avatar-button', function () {
    changeView('#chat-left-sidebar-views', '#user-view');
});

function changeView(wrapper, view) {
    var wrapper = $(wrapper);
    wrapper.find('.view').removeClass('d-none d-flex');
    wrapper.find('.view').not(view).addClass('d-none');
    wrapper.find(view).addClass('d-flex');
}

$(document).ready(function () {
    showLoader();
    bindContactList();
    getUserFriendList();
});

function updateUserConnectedStatus(userConnections) {
    console.log('status updated');
    for (var i = 0; i < userConnections.length; i++) {
        if (userConnections[i].isConnected)
            $(`i[data-user-status=${userConnections[i].userId}]`).removeClass('offline').addClass('online');
        else
            $(`i[data-user-status=${userConnections[i].userId}]`).removeClass('online').addClass('offline');
    }
}

function bindContactList() {
    $.ajax({
        url: '/Chatify/BindContactList',
        type: 'GET',
        success: function (res) {
            if (res.isSuccess) {
                var contactList = JSON.parse(res.contactList);
                var htmlString = "";
                for (var i = 0; i < contactList.length; i++) {
                    htmlString += `<div class="contact row no-gutters align-items-center pl-4 add-user-to-friend-list" data-user-id="${contactList[i].UserId}">
                                            <div class="avatar-wrapper">
                                                <img src="/assets/images/avatars/profile.jpg" class="avatar" alt="${contactList[i].UserName}" />
                                            </div>

                                            <div class="col pl-4">
                                                <div class="h6 name">${contactList[i].UserName}</div>
                                                <div class="mood text-muted">${contactList[i].Email}</div>
                                            </div>
                                    </div>`;
                }
                $('.append-user-contact-list').html(htmlString);
            }
            else {
                notifyError("Failed to bind contact list");
            }
        }
    })
}

function getUserFriendList() {
    $.ajax({
        url: '/Chatify/GetUserFriendList',
        type: 'GET',
        success: function (res) {
            if (res.isSuccess) {
                var friendList = JSON.parse(res.friendList);
                checkUserConnectedStatus();
                var htmlString = "";
                for (var i = 0; i < friendList.length; i++) {
                    htmlString += `<div class="contact ripple flex-wrap flex-sm-nowrap row p-4 no-gutters align-items-center show-chats" data-user-id="${friendList[i].UserId}">
                                            <div class="col-auto avatar-wrapper">
                                                <img src="/assets/images/avatars/profile.jpg" class="avatar" alt="${friendList[i].UserName}" />
                                                <i class="icon- status offline s-4" data-user-status="${friendList[i].UserId}"></i>
                                            </div>
                                            <div class="col px-4">
                                                <span class="name h6">${friendList[i].UserName}</span>
                                                <p class="last-message text-truncate text-muted">${friendList[i].Email}</p>
                                            </div>
                                            <div class="col-12 col-sm-auto d-flex flex-column align-items-end">
                                                <div class="last-message-time"></div>
                                            </div>
                                        </div>
                                        <div class="divider"></div>`;
                }
                $('.users-friend-list').html(htmlString);
            }
            else {
                notifyError("Failed to get friend list");
            }
            hideLoader();
        }
    })
}

$(document).on('click', '.add-user-to-friend-list', function () {
    addUserToFriendList($(this).attr('data-user-id'))
});

function addUserToFriendList(toUserId) {
    if (toUserId == undefined) {
        return;
    }
    $.ajax({
        url: '/Chatify/AddUserToFriendList',
        data: {
            toUserId: toUserId
        },
        success: function (res) {
            if (res.isSuccess) {
                getUserFriendList();
                $('.back-to-chats-button:visible').trigger('click');
            }
            else if (res.alreadyFriend == true) {
                notifyInfo("This user is already added in friend list");
            }
            else {
                notifyError("Failed to add friend");
            }
        }
    })
}

$(document).on('click', '.show-chats', function () {
    getMessageListByUser($(this).attr('data-user-id'), $(this).find('span.h6').text().trim())
});

function getMessageListByUser(toUserId, chatName) {
    if (toUserId == undefined) {
        return;
    }
    showLoader();
    currentToUserId = toUserId;
    $('.chat-contact-name').html(chatName);
    $('.chat-contact-is-typing').attr('data-typing', currentToUserId);
    $.ajax({
        url: '/Chatify/GetMessageListByUser',
        data: {
            toUserId: toUserId
        },
        success: function (res) {
            if (res.isSuccess) {
                var messageList = JSON.parse(res.messageList);
                var htmlString = "";
                $('.user-chat-messages').empty();
                $('.scrolldata').scrollTop(0);
                for (var i = 0; i < messageList.length; i++) {
                    htmlString += `<div class="row flex-nowrap message-row ${(messageList[i].FromUserId == currentUserId ? "user" : "contact")} p-4">
                                        <img class="avatar mr-4" src="/assets/images/avatars/profile.jpg" alt="NA">
                                        <div class="bubble">
                                            <div class="message">${messageList[i].MessageText}</div>
                                            <div class="time text-muted text-right mt-2">${formatDate(messageList[i].MessageTime)}</div>
                                        </div>
                                   </div>`;
                }
                $('.user-chat-messages').html(htmlString);
                scrollView();
            }
            else {
                notifyError("Failed to get messages");
            }
            hideLoader();
        }
    })
}

var messageTextArea = document.getElementById('messageTextArea');

class MessageDTO {
    constructor(FromUserId, ToUserId, MessageText, MessageTime) {
        this.FromUserId = FromUserId;
        this.ToUserId = ToUserId;
        this.MessageText = MessageText;
        this.MessageTime = MessageTime;
    }
}

$(document).on('click', '#btnSendMessage', function () {
    var textMessage = $('#messageTextArea').val().trim();
    if (textMessage == "") {
        notifyError("Please enter message");
        return;
    }
    $('#messageTextArea').val('');
    let messageDTO = new MessageDTO(currentUserId, currentToUserId, textMessage, new Date());
    $.ajax({
        url: '/Chatify/AddMessageFromUser',
        data: messageDTO,
        type: 'POST',
        success: function (res) {
            if (res.isSuccess) {
                sendMessageToHub(messageDTO);
            }
            else {
                notifyError("Failed to send message, please try again");
            }
        }
    });
});

$(document).on('keydown', '#messageTextArea', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        $('#btnSendMessage').trigger('click');
    }

});

$(document).on('focusin', '#messageTextArea', function (e) {
    isUserTyping(currentUserId, currentToUserId);
});

$(document).on('focusout', '#messageTextArea', function (e) {
    isUserTypingStopped(currentUserId, currentToUserId);
});

function addMessageToChat(messageDTO) {
    console.log(messageDTO)
    $('.user-chat-messages').append(`<div class="row flex-nowrap message-row ${(messageDTO.fromUserId == currentUserId ? "user" : "contact")} p-4">
                                        <img class="avatar mr-4" src="/assets/images/avatars/profile.jpg" alt="NA">
                                        <div class="bubble">
                                            <div class="message">${messageDTO.messageText}</div>
                                            <div class="time text-muted text-right mt-2">${formatDate(messageDTO.messageTime)}</div>
                                        </div>
                                   </div>`);
    scrollView();
}

function scrollView() {
    setTimeout(function () {
        $('.scrolldata').animate({ scrollTop: $('.user-chat-messages').prop("scrollHeight") }, 500);
    }, 250);
}

function formatDate(currentdate) {
    currentdate = new Date(currentdate);
    return (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " " + currentdate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

function userTypingInProgress(typingUser) {
    $(`.chat-contact-is-typing[data-typing=${typingUser}]`).text('typing...');
    console.log("typing start:" + typingUser);
}

function userTypingStopped(typingUser) {
    $(`.chat-contact-is-typing[data-typing=${typingUser}]`).text('');
    console.log("typing stopped:" + typingUser);
}